// Genera los datos jugables del 74.º a partir de la fuente creativa, sin tocar ni completar su texto.
//   Fuente: docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md
//   Salida: La_Cosecha_Juego_Android/js/campanas/campana-74.js (no se edita a mano)
//   node scripts/importar-campana-74.mjs              → genera
//   node scripts/importar-campana-74.mjs --comprobar  → falla si la salida no corresponde a la fuente
// Lo que la fuente no trae (respuesta a cada opción, textos del diario) queda en null.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const FUENTE = 'docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md';
export const SALIDA = 'La_Cosecha_Juego_Android/js/campanas/campana-74.js';
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

export function generar(md) {
  const scenes = parse(md);
  const campaign = {
    campaign_id: '74', title: '74.º Juegos del Hambre · precampaña', status: 'DRAFT_FOR_REVIEW',
    source_version: 'Producción creativa 74 v1 · Versión creativa 1.0', source_ref: FUENTE,
    scenes,
  };
  return `// GENERADO por scripts/importar-campana-74.mjs desde ${FUENTE}.\n// No editar a mano. Estado DRAFT_FOR_REVIEW: no se puede jugar hasta su aprobación.\n// response_text, journal_tag y journal_text están vacíos porque la fuente no los incluye.\nimport { VARIABLES_74 } from '../precampana.js';\n\nexport const CAMPANA_74 = Object.freeze({ ...${JSON.stringify(campaign, null, 2)}, variables: VARIABLES_74 });\n`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const out = generar(fs.readFileSync(path.join(root, FUENTE), 'utf8'));
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
