// Genera los datos jugables del 74.º a partir de la fuente creativa, sin tocar ni completar su texto.
//   Fuente (escenas 1.0): docs/fuentes/74_PreArena_11_Escenas_v1.md
//   Anexo 1.1 (respuestas, diario, ecos): docs/fuentes/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md
//   Salida: La_Cosecha_Juego_Android/js/campanas/campana-74.js (no se edita a mano)
//   node scripts/importar-campana-74.mjs              → genera
//   node scripts/importar-campana-74.mjs --comprobar  → falla si la salida no corresponde a la fuente
// Del anexo se toman literalmente la respuesta y el diario de cada opción, y los ecos que traen su frase entre «».
// Los ecos que el anexo describe sin escribir la frase se guardan como nota (no se muestran). Lo que falte queda en null.
import fs from 'node:fs';
import path from 'node:path';
import { DIALOGOS_74 } from './dialogos-74.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const FUENTE = 'docs/fuentes/74_PreArena_11_Escenas_v1.md';
export const SALIDA = 'La_Cosecha_Juego_Android/js/campanas/campana-74.js';
export const ANEXO = 'docs/fuentes/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md';
// Revisión creativa de ChatGPT (27-11-2026): ecos completos y decisiones sobre las nueve preguntas.
export const REVISION = 'docs/fuentes/74_Revision_y_Ecos_v1.md';
// Dónde se muestra cada eco de la revisión. La revisión da el momento en palabras; aquí se fija la escena.
// confirmado: la revisión nombra la escena o el lugar sin ambigüedad. false: interpretación técnica, a confirmar.
export const UBICACION_ECOS = {
  katniss_observed_ceremony: ['74_arrival', true], gale_promise_explicit: ['74_launch', true],
  mother_responsibility_named: ['74_launch', true], goodbye_without_words: ['74_launch', true],
  departure_observant: ['74_arrival', true], departure_composure: ['74_train', true], departure_noticed_peeta: ['74_train', true],
  haymitch_practical_questions: ['74_training', true], train_peeta_opening: ['74_training', true], katniss_keeps_advantage_private: ['74_training', true],
  capitol_layout_observed: ['74_prep', false], arrival_stayed_near_peeta: ['74_prep', false], arrival_guarded: ['74_parade', false],
  cinna_trust: ['74_parade', true], district_identity_visible: ['74_parade', true], prep_controlled: ['74_parade', true],
  parade_confident: ['74_training', false], parade_pair_identity: ['74_training', false], parade_trust_team: ['74_training', false],
  trained_archery: ['74_private_session', false], trained_survival: ['74_launch', false], training_observed_others: ['74_private_session', false],
  private_archery_display: ['74_interview', false], private_tactical_display: ['74_interview', false], private_controlled_display: ['74_interview', false],
  interview_honest: ['74_launch', false], interview_warm: ['74_launch', false], interview_defiant: ['74_launch', false],
};
// Cambios de efecto que decide la revisión (pregunta 2). La fuente 1.0 no se edita: se corrige aquí, con su motivo.
export const ENMIENDAS = { '74_private_o3': { from: 'private_session_result = strong', to: 'private_session_result = exceptional', motivo: 'Revisión 27-11-2026, pregunta 2: las tres opciones conservan la puntuación extraordinaria' } };

// Ecos de la revisión: [{ flags[], momento, text }] en el orden del documento.
export function parseRevision(md) {
  const sec = md.slice(md.indexOf('2. Ecos completos'), md.indexOf('3. Reglas de implementación'));
  return [...sec.matchAll(/^- Condición: (.+?); (.+?)\n\s+Eco: «(.+?)»\s*$/gm)].map(m => ({
    flags: m[1].split(/\s+y\s+/).map(f => f.trim()), momento: m[2].trim(), text: m[3],
  }));
}
// Dónde se muestra cada eco, según la expresión del anexo («Eco en despedida», «Eco en el tren»…).
const ECO_ESCENA = { 'despedida': '74_goodbyes', 'el tren': '74_train', 'el lanzamiento': '74_launch', 'llegar al capitolio': '74_arrival' };
// Mismo adaptador que js/precampana.js (ADAPTADOR_74); se repite aquí para que el script no dependa del juego.
const ADAPTADOR = { rel_katniss_prim: 'rel.katniss_prim', rel_katniss_peeta: 'rel.katniss_peeta', rel_katniss_haymitch: 'rel.katniss_haymitch', image_capitol: 'public.image_capitol', sponsor_interest: 'sponsor.interest', skill_archery: 'skill.archery', skill_survival: 'skill.survival', skill_observation: 'skill.observation', training_focus: 'campaign.training_focus', private_session_result: 'campaign.private_session_result', interview_tone: 'campaign.interview_tone', launch_plan: 'campaign.launch_plan' };

export function efectos(fuente) {
  return fuente.split(';').map(t => t.trim()).filter(Boolean).map(t => {
    let m;
    if ((m = t.match(/^flag\s+([a-z0-9_]+)$/))) return { op: 'SET_FLAG', path: m[1] };
    if ((m = t.match(/^([a-z_]+)\s*\+\s*(\d+)$/))) { if (!ADAPTADOR[m[1]]) throw new Error(`Variable sin adaptador: ${m[1]}`); return { op: 'ADD', path: ADAPTADOR[m[1]], value: Number(m[2]) }; }
    if ((m = t.match(/^([a-z_]+)\s*=\s*([a-z_]+)$/))) { if (!ADAPTADOR[m[1]]) throw new Error(`Variable sin adaptador: ${m[1]}`); return { op: 'SET', path: ADAPTADOR[m[1]], value: m[2] }; }
    throw new Error(`Efecto no reconocido en la fuente: «${t}»`);
  });
}

export function parse(md) {
  const bloques = md.split(/\n---\n/).filter(b => /^\s*## 74_/m.test(b));
  return bloques.map((b, i) => {
    const cab = b.match(/^## (74_[a-z_]+) — (.+)$/m);
    const lugar = b.match(/^\*\*Lugar:\*\* (.+?)\s*$/m)[1];
    const personajes = b.match(/^\*\*Personajes:\*\* (.+?)\s*$/m)[1];
    const despuesPersonajes = b.slice(b.indexOf(b.match(/^\*\*Personajes:\*\*.*$/m)[0]) + b.match(/^\*\*Personajes:\*\*.*$/m)[0].length);
    const texto = despuesPersonajes.slice(0, despuesPersonajes.indexOf('**Decisiones:**')).trim();
    const opciones = [...b.matchAll(/^- `(74_[a-z_]+_o\d)` \*\*(.+?)\*\* Efecto: `([^`]+)`\.\s*$/gm)].map(m => ({
      option_id: m[1], label: m[2], source_effect: m[3], effects: efectos(m[3]), response_text: null, journal_tag: null, journal_text: null,
    }));
    const hito = b.match(/^\*\*Hito\/continuidad:\*\* (.+?)\s*$/m)[1];
    return { scene_id: cab[1], sequence: i + 1, title: cab[2].trim(), location: lugar, participants: personajes, location_id: null, text: texto, milestone: hito, options: opciones };
  });
}

// Anexo 1.1: { option_id → { label_anexo, response_text, journal_text, echo, echo_note, transfer_note } }
export function parseAnexo(md) {
  const sec = md.slice(md.indexOf('## 3. Respuestas'), md.indexOf('## 4. Transferencia'));
  const plano = sec.replace(/\\\n/g, ' ').replace(/\s+/g, ' ');
  const out = {};
  for (const b of plano.split(/(?=\*\*`74_[a-z_]+_o\d`)/).slice(1)) {
    const id = b.match(/^\*\*`(74_[a-z_]+_o\d)` --- (.+?)\*\*/);
    const resp = b.match(/Respuesta: «(.+?)»/), diario = b.match(/Diario: «(.+?)»/);
    const resto = b.slice(diario ? b.indexOf(diario[0]) + diario[0].length : 0).replace(/\*\*Hito inalterable:\*\*.*$/, '').replace(/#+ .*$/, '').trim().replace(/^- /, '');
    let echo = null, echo_note = null, transfer_note = null;
    const eco = resto.match(/^Eco (?:en|al) ([^,]+), si `([a-z0-9_]+)`: «(.+?)»/i);
    if (eco) echo = { scene_id: ECO_ESCENA[eco[1].trim().toLowerCase()] || null, flag: eco[2], text: eco[3] };
    else if (resto.startsWith('Eco')) echo_note = resto.replace(/^Eco:?\s*/, '');
    else if (resto.startsWith('Transferencia')) transfer_note = resto.replace(/^Transferencia:\s*/, '');
    out[id[1]] = { label_anexo: id[2].trim(), response_text: resp ? resp[1] : null, journal_text: diario ? diario[1] : null, echo, echo_note, transfer_note };
  }
  return out;
}

export function generar(md, anexoMd = null, revisionMd = null) {
  const scenes = parse(md);
  const anexo = anexoMd ? parseAnexo(anexoMd) : {};
  for (const s of scenes) for (const o of s.options) {
    const a = anexo[o.option_id];
    if (!a) continue;
    Object.assign(o, { response_text: a.response_text, journal_text: a.journal_text, journal_entry_id: `74.diary.${s.scene_id}.${o.option_id}`, echo: a.echo, echo_note: a.echo_note, transfer_note: a.transfer_note, label_anexo: a.label_anexo });
  }
  if (revisionMd) {
    const ecos = parseRevision(revisionMd);
    const todas = scenes.flatMap(sc => sc.options.map(o => ({ sc, o })));
    for (const e of ecos) {
      // El eco pertenece a la opción que activa su primer flag (en «A y B», la opción de A, que es la escena donde se muestra).
      const propio = e.flags[0];
      const { sc, o } = todas.find(x => x.o.effects.some(f => f.op === 'SET_FLAG' && f.path === propio)) || {};
      if (!o) throw new Error(`Eco sin opción: ${e.flags.join(' y ')}`);
      const combinado = e.flags.length > 1;
      const [scene_id, confirmado] = combinado ? [sc.scene_id, true] : (UBICACION_ECOS[propio] || [null, false]);
      o.echo = { echo_id: `74.echo.${e.flags.join('+')}`, scene_id, flags: e.flags, text: e.text, moment: combinado ? 'after_response' : 'scene_start',
        group: e.flags.includes('gale_promise_explicit') ? 'gale_promise' : null, placement: e.momento, placement_confirmed: confirmado, source: 'revision-74-2026-11-27' };
      o.echo_note = null;
    }
    for (const sc of scenes) for (const o of sc.options) {
      if (o.echo && !o.echo.echo_id) Object.assign(o.echo, { echo_id: `74.echo.${o.echo.flag}`, flags: [o.echo.flag], moment: 'scene_start', group: null, placement_confirmed: true, source: 'anexo-1.1' });
      const en = ENMIENDAS[o.option_id];
      if (en) { if (o.source_effect.includes(en.from)) { o.source_effect_original = o.source_effect; o.source_effect = o.source_effect.replace(en.from, en.to); o.effects = efectos(o.source_effect); o.amendment = en.motivo; } else throw new Error(`Enmienda sin efecto original: ${o.option_id}`); }
    }
    for (const sc of scenes) Object.assign(sc, { dialogue: (DIALOGOS_74[sc.scene_id] || []).map(([speaker, text, delivery_note], i) => ({ line_id: `${sc.scene_id}.d${i + 1}`, speaker, text, delivery_note })), player_prompt: null, participant_ids: null });
  }
  const campaign = {
    campaign_id: 'campaign_74', title: '74.º Juegos del Hambre · precampaña', status: revisionMd ? 'APPROVED' : 'DRAFT_FOR_REVIEW', approval: revisionMd ? 'Activado el 27-11-2026 para la prueba de Nina; la aprobación definitiva es la suya en el PR' : null,
    source_version: revisionMd ? '74-prearena-1.2-borrador' : anexoMd ? '74-prearena-1.1' : '74-prearena-1.0', source_ref: FUENTE, annex_ref: anexoMd ? ANEXO : null, revision_ref: revisionMd ? REVISION : null,
    transfer_id: 'campaign_74:prearena:v1',
    scenes,
  };
  return `// GENERADO por scripts/importar-campana-74.mjs desde ${FUENTE}${anexoMd ? ` y ${ANEXO}` : ''}${revisionMd ? ` y ${REVISION}` : ''}.\n// No editar a mano.\nimport { VARIABLES_74 } from '../precampana.js';\n\nexport const CAMPANA_74 = Object.freeze({ ...${JSON.stringify(campaign, null, 2)}, variables: VARIABLES_74 });\n`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const out = generar(fs.readFileSync(path.join(root, FUENTE), 'utf8'), fs.readFileSync(path.join(root, ANEXO), 'utf8'), fs.readFileSync(path.join(root, REVISION), 'utf8'));
  const dest = path.join(root, SALIDA);
  if (process.argv.includes('--comprobar')) {
    if (!fs.existsSync(dest) || fs.readFileSync(dest, 'utf8') !== out) { console.error(`${SALIDA} no corresponde a la fuente: ejecuta node scripts/importar-campana-74.mjs`); process.exit(1); }
    console.log('Campaña 74.º: datos idénticos a la fuente');
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, out);
    console.log(`Generado ${SALIDA}`);
  }
}
