// Genera los datos jugables del 74.º a partir de la fuente creativa, sin tocar ni completar su texto.
//   Fuente (escenas 1.0): docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md
//   Anexo 1.1 (respuestas, diario, ecos): docs/paquetes/74_anexo_1_1/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md
//   Salida: La_Cosecha_Juego_Android/js/campanas/campana-74.js (no se edita a mano)
//   node scripts/importar-campana-74.mjs              → genera
//   node scripts/importar-campana-74.mjs --comprobar  → falla si la salida no corresponde a la fuente
// Del anexo se toman literalmente la respuesta y el diario de cada opción, y los ecos que traen su frase entre «».
// Los ecos que el anexo describe sin escribir la frase se guardan como nota (no se muestran). Lo que falte queda en null.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const FUENTE = 'docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md';
export const SALIDA = 'La_Cosecha_Juego_Android/js/campanas/campana-74.js';
export const ANEXO = 'docs/paquetes/74_anexo_1_1/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md';
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

export function generar(md, anexoMd = null) {
  const scenes = parse(md);
  const anexo = anexoMd ? parseAnexo(anexoMd) : {};
  for (const s of scenes) for (const o of s.options) {
    const a = anexo[o.option_id];
    if (!a) continue;
    Object.assign(o, { response_text: a.response_text, journal_text: a.journal_text, journal_entry_id: `74.diary.${s.scene_id}.${o.option_id}`, echo: a.echo, echo_note: a.echo_note, transfer_note: a.transfer_note, label_anexo: a.label_anexo });
  }
  const campaign = {
    campaign_id: 'campaign_74', title: '74.º Juegos del Hambre · precampaña', status: 'DRAFT_FOR_REVIEW',
    source_version: anexoMd ? '74-prearena-1.1' : '74-prearena-1.0', source_ref: FUENTE, annex_ref: anexoMd ? ANEXO : null,
    transfer_id: 'campaign_74:prearena:v1',
    scenes,
  };
  return `// GENERADO por scripts/importar-campana-74.mjs desde ${FUENTE}${anexoMd ? ` y ${ANEXO}` : ''}.\n// No editar a mano. Estado DRAFT_FOR_REVIEW: no se puede jugar hasta su aprobación.\nimport { VARIABLES_74 } from '../precampana.js';\n\nexport const CAMPANA_74 = Object.freeze({ ...${JSON.stringify(campaign, null, 2)}, variables: VARIABLES_74 });\n`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const out = generar(fs.readFileSync(path.join(root, FUENTE), 'utf8'), fs.readFileSync(path.join(root, ANEXO), 'utf8'));
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
