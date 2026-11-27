// Motor común de precampañas (fase 2): escenas, opciones, efectos, condiciones y diario a partir de datos.
// Lo usarán el 74.º, la Gira y el 75.º. El 50.º conserva su propio módulo aprobado y no pasa por aquí.
//
// Una campaña es un objeto de datos:
//   { campaign_id, title, status, source_version, source_ref, variables[], scenes[] }
//   scene:  { scene_id, sequence, title, location_id, participants[], text, milestone, options[] }
//   option: { option_id, label, effects[], source_effect, response_text, journal_tag, conditions? }
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
  return { campaign_id: campaign.campaign_id, source_version: campaign.source_version, index: 0, complete: false, vars, flags: {}, journal: [] };
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
  next.journal.push({ scene_id: scene.scene_id, option_id: option.option_id, journal_tag: option.journal_tag || null, text: option.journal_text || null });
  next.index += 1;
  if (next.index >= campaign.scenes.length) next.complete = true;
  Object.assign(state, next);
  if (game) recordDecision(game, { campaign_id: campaign.campaign_id, scene_id: scene.scene_id, option_id: option.option_id, effects_applied: option.effects || [], source_text_version: campaign.source_version });
  return { ok: true, scene, option, next: currentScene(campaign, state), complete: state.complete };
}

// Estado que la precampaña entrega al terminar. Se guarda en game.continuity[campaign_id].
// Cómo afecta a la Arena NO está decidido: la Arena existente no lee estos valores hasta que
// se apruebe la tabla de transferencia (docs/REVISION_74_PARA_CHATGPT.md, sección «Transferencia»).
export function transferState(campaign, state) {
  return { campaign_id: campaign.campaign_id, source_version: campaign.source_version, complete: state.complete, vars: { ...state.vars }, flags: { ...state.flags } };
}

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
