// Motor común de precampañas (fase 2): escenas, opciones, efectos, condiciones y diario a partir de datos.
// Lo usarán el 74.º, la Gira y el 75.º. El 50.º conserva su propio módulo aprobado y no pasa por aquí.
//
// Una campaña es un objeto de datos:
//   { campaign_id, title, status, source_version, source_ref, variables[], scenes[] }
//   scene:  { scene_id, sequence, title, location_id, participants[], text, milestone, options[] }
//   option: { option_id, label, effects[], source_effect, response_text, journal_text, journal_entry_id, echo?, conditions? }
//   echo:   { echo_id, scene_id, flags[], text, moment, group? }: frase condicional (ver echoesFor).
//   effect: { op: 'ADD'|'SET'|'MIN'|'MAX'|'CLAMP'|'SET_FLAG'|'CLEAR_FLAG'|'APPEND_UNIQUE', path, value?, min?, max? }
//
// status: solo las campañas APPROVED se pueden jugar en el juego. DRAFT_FOR_REVIEW y STRUCTURE_ONLY se
// cargan para pruebas y revisión, nunca en una partida normal. El motor no inventa texto: si falta
// response_text o un texto de diario, no muestra nada en su lugar.
import { recordDecision, hasDecision } from './decisiones.js';

export const STATUS = ['STRUCTURE_ONLY', 'DRAFT_FOR_REVIEW', 'APPROVED', 'BLOCKED_CREATIVE', 'DEPRECATED'];
export const JUGABLE = s => s === 'APPROVED';

// Registro de variables del contrato maestro (05_CONTRATOS/01_Esquema_de_variables_y_efectos.md).
export const VARIABLES_74 = Object.freeze([
  { path: 'rel.katniss_prim', type: 'int', default: 0 },
  { path: 'rel.katniss_peeta', type: 'int', default: 0 },
  { path: 'rel.katniss_haymitch', type: 'int', default: 0 },
  { path: 'public.image_capitol', type: 'int', default: 0 },
  { path: 'sponsor.interest', type: 'int', default: 0 },
  { path: 'skill.archery', type: 'int', default: 0 },
  { path: 'skill.survival', type: 'int', default: 0 },
  { path: 'skill.observation', type: 'int', default: 0 },
  { path: 'campaign.training_focus', type: 'enum', values: ['balanced', 'observation', 'archery', 'survival'], default: 'balanced' },
  { path: 'campaign.private_session_result', type: 'enum', values: ['unknown', 'strong', 'exceptional'], default: 'unknown' },
  { path: 'campaign.interview_tone', type: 'enum', values: ['unknown', 'guarded', 'warm', 'defiant'], default: 'unknown' },
  { path: 'campaign.launch_plan', type: 'enum', values: ['unknown', 'survival', 'family', 'observation'], default: 'unknown' },
]);

// Nombres del guion del 74.º → rutas del contrato maestro (el texto fuente no se cambia: se traduce aquí).
export const ADAPTADOR_74 = Object.freeze({
  rel_katniss_prim: 'rel.katniss_prim',
  rel_katniss_peeta: 'rel.katniss_peeta',
  rel_katniss_haymitch: 'rel.katniss_haymitch',
  image_capitol: 'public.image_capitol',
  sponsor_interest: 'sponsor.interest',
  skill_archery: 'skill.archery',
  skill_survival: 'skill.survival',
  skill_observation: 'skill.observation',
  training_focus: 'campaign.training_focus',
  private_session_result: 'campaign.private_session_result',
  interview_tone: 'campaign.interview_tone',
  launch_plan: 'campaign.launch_plan',
});

export function createState(campaign) {
  const vars = {};
  for (const v of campaign.variables || []) vars[v.path] = v.default;
  return { campaign_id: campaign.campaign_id, source_version: campaign.source_version, index: 0, complete: false, vars, flags: {}, journal: [], pendingResponse: null };
}

export const currentScene = (campaign, state) => (state && !state.complete ? campaign.scenes[state.index] || null : null);

// Condiciones (EQ, NEQ, GT, GTE, LT, LTE, IN, HAS_FLAG, NOT_FLAG, ALL, ANY, NOT).
export function evaluate(cond, state) {
  if (!cond) return true;
  const v = cond.path != null ? state.vars[cond.path] : undefined;
  switch (cond.op) {
    case 'EQ': return v === cond.value;
    case 'NEQ': return v !== cond.value;
    case 'GT': return v > cond.value;
    case 'GTE': return v >= cond.value;
    case 'LT': return v < cond.value;
    case 'LTE': return v <= cond.value;
    case 'IN': return Array.isArray(cond.value) && cond.value.includes(v);
    case 'HAS_FLAG': return !!state.flags[cond.path];
    case 'NOT_FLAG': return !state.flags[cond.path];
    case 'ALL': return (cond.of || []).every(c => evaluate(c, state));
    case 'ANY': return (cond.of || []).some(c => evaluate(c, state));
    case 'NOT': return !evaluate(cond.of, state);
    default: throw new Error(`Condición desconocida: ${cond.op}`);
  }
}

export const availableOptions = (scene, state) => (scene?.options || []).filter(o => (o.conditions || []).every(c => evaluate(c, state)));

function applyEffect(e, state, varsByPath) {
  const def = varsByPath[e.path];
  switch (e.op) {
    case 'ADD': state.vars[e.path] = (Number(state.vars[e.path]) || 0) + Number(e.value); break;
    case 'SET':
      if (def?.type === 'enum' && !def.values.includes(e.value)) throw new Error(`Valor no permitido para ${e.path}: ${e.value}`);
      state.vars[e.path] = e.value; break;
    case 'MIN': state.vars[e.path] = Math.min(Number(state.vars[e.path]) || 0, Number(e.value)); break;
    case 'MAX': state.vars[e.path] = Math.max(Number(state.vars[e.path]) || 0, Number(e.value)); break;
    case 'CLAMP': state.vars[e.path] = Math.max(e.min, Math.min(e.max, Number(state.vars[e.path]) || 0)); break;
    case 'SET_FLAG': state.flags[e.path] = true; break;
    case 'CLEAR_FLAG': delete state.flags[e.path]; break;
    case 'APPEND_UNIQUE': { const a = Array.isArray(state.vars[e.path]) ? state.vars[e.path] : []; if (!a.includes(e.value)) a.push(e.value); state.vars[e.path] = a; break; }
    default: throw new Error(`Efecto desconocido: ${e.op}`);
  }
}

// Aplica una opción. Si la partida (game) ya registró una decisión en esta escena, no aplica nada otra vez.
// Los efectos se aplican sobre una copia y solo se confirman si todos son válidos (transaccional).
export function choose(campaign, state, optionId, { game } = {}) {
  const scene = currentScene(campaign, state);
  if (!scene) return { ok: false, reason: 'campaign-complete' };
  if (game && hasDecision(game, campaign.campaign_id, scene.scene_id)) return { ok: false, reason: 'duplicate', scene };
  const option = availableOptions(scene, state).find(o => o.option_id === optionId);
  if (!option) return { ok: false, reason: 'invalid-option', scene };
  const varsByPath = Object.fromEntries((campaign.variables || []).map(v => [v.path, v]));
  const next = JSON.parse(JSON.stringify(state));
  for (const e of option.effects || []) applyEffect(e, next, varsByPath);
  // Entrada de diario (contrato del anexo 74 v1.1): una por decisión, con ID determinista.
  next.journal.push({
    entry_id: option.journal_entry_id || `${campaign.campaign_id}.diary.${scene.scene_id}.${option.option_id}`,
    campaign_id: campaign.campaign_id, scene_id: scene.scene_id, option_id: option.option_id, text: option.journal_text || null,
    timeline_id: game?.timeline?.timeline_id ?? null, route_type: game?.timeline?.route_type ?? null,
    source_version: campaign.source_version, effects_applied: option.effects || [], seen: false,
  });
  // La respuesta inmediata se muestra después de elegir y antes de avanzar (si la hay).
  next.pendingResponse = option.response_text ? { scene_id: scene.scene_id, option_id: option.option_id } : null;
  next.index += 1;
  if (next.index >= campaign.scenes.length) next.complete = true;
  Object.assign(state, next);
  if (game) recordDecision(game, { campaign_id: campaign.campaign_id, scene_id: scene.scene_id, option_id: option.option_id, effects_applied: option.effects || [], source_text_version: campaign.source_version });
  return { ok: true, scene, option, next: currentScene(campaign, state), complete: state.complete };
}

export const optionById = (campaign, optionId) => campaign.scenes.flatMap(s => s.options).find(o => o.option_id === optionId) || null;

// Respuesta pendiente de mostrar tras la última elección.
export function pendingResponse(campaign, state) {
  if (!state?.pendingResponse) return null;
  const o = optionById(campaign, state.pendingResponse.option_id);
  return o?.response_text ? { ...state.pendingResponse, text: o.response_text } : null;
}
export function acknowledgeResponse(state) { state.pendingResponse = null; return state; }

// Ecos: frases condicionadas por flags de escenas anteriores. Son solo texto: no aplican efectos.
//   echo: { echo_id, scene_id, flags[] (todos deben estar activos), text, moment: 'scene_start'|'after_response', group? }
// Funciones puras: el mismo estado da siempre los mismos ecos, así que repetir la pantalla no los duplica.
// Se deduplican por echo_id y por grupo (p. ej. la promesa a Gale se muestra una sola vez en la escena).
const flagsDe = e => e.flags || (e.flag ? [e.flag] : []);
const ecoActivo = (e, state) => e && e.text && flagsDe(e).length && flagsDe(e).every(f => state.flags[f]);
export function echoesFor(campaign, state, scene) {
  if (!scene) return [];
  const ids = new Set(), grupos = new Set(), out = [];
  for (const o of campaign.scenes.flatMap(s => s.options)) {
    const e = o.echo;
    if (!ecoActivo(e, state) || e.scene_id !== scene.scene_id || (e.moment || 'scene_start') !== 'scene_start') continue;
    const id = e.echo_id || e.text;
    if (ids.has(id) || (e.group && grupos.has(e.group))) continue;
    ids.add(id); if (e.group) grupos.add(e.group); out.push(e.text);
  }
  return out;
}
// Eco que se añade tras la respuesta inmediata de una opción (moment 'after_response'). No se muestra si
// un eco del mismo grupo ya apareció al empezar esa escena.
export function responseEchoes(campaign, state, optionId) {
  const o = optionById(campaign, optionId), e = o?.echo;
  if (!ecoActivo(e, state) || e.moment !== 'after_response') return [];
  if (e.group) {
    const escena = campaign.scenes.find(s => s.scene_id === e.scene_id);
    const yaMostrado = campaign.scenes.flatMap(s => s.options).some(x => x !== o && x.echo?.group === e.group && x.echo.scene_id === e.scene_id && (x.echo.moment || 'scene_start') === 'scene_start' && ecoActivo(x.echo, state));
    if (escena && yaMostrado) return [];
  }
  return [e.text];
}

// Transferencia a la Arena (anexo 74 v1.1, sección 4). Instantánea completa e idempotente: si ya se
// aplicó, devuelve la existente sin sumar nada otra vez. No convierte flags en ventajas, no crea objetos,
// alianzas ni conocimiento del mapa. Patrocinio e imagen pública (4.19, decisión de Nina): se aplican una
// sola vez al entrar en la Arena, con límites para no desequilibrarla:
//   apoyo del público (support, 0–100)   += public.image_capitol × 2, entre −6 y +10
//   patrocinadores (sponsorTrust, ≥ 0)    += sponsor.interest × 3, entre 0 y +15
export const MAPEO_NUMERICO_ACTIVO = true;
const lim = (v, a, b) => Math.max(a, Math.min(b, v));
export function mapeoNumerico(vars = {}) {
  return { support: lim(Math.round((vars['public.image_capitol'] || 0) * 2), -6, 10), sponsorTrust: lim(Math.round((vars['sponsor.interest'] || 0) * 3), 0, 15) };
}
export function buildTransfer(campaign, state, game = {}) {
  return {
    transfer_id: campaign.transfer_id || `${campaign.campaign_id}:prearena:v1`,
    campaign_id: campaign.campaign_id, campaign_content_version: campaign.source_version,
    timeline_id: game.timeline?.timeline_id ?? null, route_type: game.timeline?.route_type ?? null,
    prearena_complete: !!state.complete,
    scenes_completed: state.journal.map(j => j.scene_id),
    vars: { ...state.vars }, flags: { ...state.flags },
    decision_ids: (game.decisionLog || []).filter(d => d.campaign_id === campaign.campaign_id).map(d => d.decision_id),
    diary_entry_ids: state.journal.map(j => j.entry_id),
    // Solo las precampañas que desembocan en una Arena (sin campaña siguiente ni final de historia).
    numeric_mapping: MAPEO_NUMERICO_ACTIVO && !campaign.next && !campaign.ends_story ? mapeoNumerico(state.vars) : null,
    transfer_applied: true,
  };
}
export function applyTransfer(game, campaign, state) {
  game.continuity ??= {};
  const prev = game.continuity[campaign.campaign_id];
  const snapshot = buildTransfer(campaign, state, game);
  if (prev?.transfer_applied && prev.transfer_id === snapshot.transfer_id) return { applied: false, snapshot: prev };
  if (!state.complete) throw new Error('La precampaña no está terminada');
  game.continuity[campaign.campaign_id] = snapshot;
  const m = snapshot.numeric_mapping;
  if (m) {
    if (typeof game.support === 'number') game.support = lim(game.support + m.support, 0, 100);
    if (typeof game.sponsorTrust === 'number') game.sponsorTrust = Math.max(0, game.sponsorTrust + m.sponsorTrust);
  }
  return { applied: true, snapshot };
}
// Compatibilidad con la versión anterior del motor.
export const transferState = (campaign, state, game) => buildTransfer(campaign, state, game);

// Validación estructural de una campaña (IDs únicos, efectos sobre variables registradas, enums válidos).
export function validateCampaign(campaign) {
  const problems = [];
  if (!STATUS.includes(campaign.status)) problems.push(`estado desconocido: ${campaign.status}`);
  const varsByPath = Object.fromEntries((campaign.variables || []).map(v => [v.path, v]));
  const sceneIds = new Set(), optionIds = new Set();
  (campaign.scenes || []).forEach((s, i) => {
    if (sceneIds.has(s.scene_id)) problems.push(`escena repetida: ${s.scene_id}`);
    sceneIds.add(s.scene_id);
    if (s.sequence !== i + 1) problems.push(`orden roto en ${s.scene_id}`);
    if (campaign.status !== 'STRUCTURE_ONLY' && !s.text) problems.push(`${s.scene_id} sin texto`);
    for (const o of s.options || []) {
      if (optionIds.has(o.option_id)) problems.push(`opción repetida: ${o.option_id}`);
      optionIds.add(o.option_id);
      if (!(o.effects || []).length) problems.push(`${o.option_id} sin efectos`);
      for (const e of o.effects || []) {
        if (['SET_FLAG', 'CLEAR_FLAG'].includes(e.op)) continue;
        const v = varsByPath[e.path];
        if (!v) problems.push(`${o.option_id}: variable no registrada ${e.path}`);
        else if (e.op === 'SET' && v.type === 'enum' && !v.values.includes(e.value)) problems.push(`${o.option_id}: ${e.value} no es válido para ${e.path}`);
      }
    }
  });
  return problems;
}
