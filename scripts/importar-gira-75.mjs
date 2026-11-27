// Convierte la producción narrativa de la Gira y el 75.º (v1.0, borrador) en datos del motor común,
// sin tocar ni completar su texto. Todo queda en DRAFT_FOR_REVIEW y no se puede jugar.
//   Fuente: docs/fuentes/Gira_75_Produccion_Narrativa_v1.md
//   Salida: La_Cosecha_Juego_Android/js/campanas/campana-gira-75.js (no se edita a mano)
//   node scripts/importar-gira-75.mjs              → genera los dos
//   node scripts/importar-gira-75.mjs --comprobar  → falla si no corresponden a la fuente
// Decisiones de dirección aplicadas (27-11-2026): canon cinematográfico; las escenas 75-07 a 75-15 no son
// escenas nuevas sino contenido para los acontecimientos de Arena del 75.º que ya existen.
import fs from 'node:fs';
import path from 'node:path';
import { VALOR_ADD, FLAG_DE_VARIABLE, CORRECCIONES, TEXTOS, CRONICA_ARENA_75 } from './gira-75-complemento.mjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const FUENTE = 'docs/fuentes/Gira_75_Produccion_Narrativa_v1.md';
export const SALIDA = 'La_Cosecha_Juego_Android/js/campanas/campana-gira-75.js';

// Escena del documento → ID del repositorio. Se reutilizan los IDs de la estructura anterior cuando la
// escena corresponde; las que no tienen equivalente reciben un ID nuevo (marcado «nuevo»).
export const ESCENAS = {
  'GIRA-01': ['tour_after_victory', 'nuevo'],
  'GIRA-02': ['tour_departure', 'existente'],
  'GIRA-03': ['tour_district_11', 'existente'],
  'GIRA-04': ['tour_train', 'existente (en la estructura iba antes del Distrito 11)'],
  'GIRA-05': ['tour_districts', 'existente'],
  'GIRA-06': ['tour_private_pressure', 'existente'],
  'GIRA-07': ['tour_aftermath', 'existente'],
  'GIRA-08': ['tour_quell_announcement', 'nuevo'],
  '75-01': ['75_reaping', 'existente'],
  '75-02': ['75_train', 'existente'],
  '75-03': ['75_training', 'existente'],
  '75-04': ['75_training_johanna', 'nuevo'],
  '75-05': ['75_interview', 'existente'],
  '75-06': ['75_arena_launch', 'existente'],
  '75-16': ['75_extraction_awakening', 'nuevo · después de la Arena'],
  '75-17': ['75_district12_destroyed', 'nuevo · después de la Arena'],
};

// Escenas de Arena → acontecimientos que ya existen en el 75.º (turno de Arena · ID técnico · título actual).
export const ARENA_75 = [
  { turno: 1, id: 'campaigns.js · chapters[75][1]', titulo: 'Las plataformas de agua', escenas: ['75-07'] },
  { turno: 2, id: 'app.js · evento 75, turno 2', titulo: 'Una conversación cifrada', escenas: ['75-08'] },
  { turno: 3, id: 'app.js · evento 75, turno 3', titulo: 'La alianza de los vencedores', escenas: ['75-08'] },
  { turno: 4, id: 'campaigns.js · chapters[75][4]', titulo: 'La niebla', escenas: ['75-09', '75-10'] },
  { turno: 5, id: 'app.js · evento 75, turno 5', titulo: 'El mecanismo del reloj', escenas: ['75-11', '75-12'] },
  { turno: 6, id: 'app.js · evento 75, turno 6', titulo: 'El relámpago y el árbol', escenas: ['75-13'] },
  { turno: 7, id: 'campaigns.js · chapters[75][7]', titulo: 'Los charlajos', escenas: [] },
  { turno: 8, id: 'app.js · evento 75, turno 8', titulo: 'La ruptura del reloj', escenas: ['75-14', '75-15'] },
];

// Variables del documento → sistema real. ruta null = sin equivalente: espera a que ChatGPT defina su comportamiento.
export const VARIABLES = {
  peeta_trust: { ruta: 'rel.katniss_peeta', donde: 'Precampaña (registro del 74.º)', nota: 'Misma relación que el 74.º' },
  haymitch_trust: { ruta: 'rel.katniss_haymitch', donde: 'Precampaña (registro del 74.º)', nota: 'Misma relación que el 74.º' },
  sponsor_interest: { ruta: 'sponsor.interest', donde: 'Precampaña (registro del 74.º)', nota: 'Sus valores en la Arena siguen pendientes de límites' },
  journal_flags: { ruta: 'flags', donde: 'Precampaña', nota: 'Cada «journal_flags: x» es un flag' },
  injury_state: { ruta: 'game.injuries / game.wounds', donde: 'Arena existente', nota: 'Sistema de heridas actual' },
  public_sympathy: { ruta: null, donde: '—', nota: 'Candidatos: `public.image_capitol` (imagen ante el Capitolio, no es lo mismo) o `support` de la Arena' },
  capitol_suspicion: { ruta: null, donde: '—', nota: 'No hay ninguna variable de vigilancia del Capitolio fuera del modo Presidente' },
  district_solidarity: { ruta: null, donde: '—', nota: 'Los distritos solo tienen estadísticas en el modo Presidente' },
  finnick_trust: { ruta: null, donde: '—', nota: 'La Arena del 75.º usa el flag `finnickTrusted` (sí/no), no un valor' },
  alliance_cohesion: { ruta: null, donde: '—', nota: 'Candidato: `relationships.victors` de la Arena del 75.º' },
  arena_knowledge: { ruta: null, donde: '—', nota: 'Candidato: flag `clockObserved` de la Arena del 75.º (sí/no)' },
  wire_plan_ready: { ruta: null, donde: '—', nota: 'Sin equivalente' },
};

const limpio = t => t.replace(/\s+/g, ' ').trim();

function efectos(texto) {
  return texto.split(';').map(t => t.trim()).filter(Boolean).map(t => {
    let m;
    if ((m = t.match(/^`journal_flags: ([a-z0-9_]+)`$/))) return { op: 'SET_FLAG', path: m[1], fuente: t };
    if ((m = t.match(/^`([a-z_]+) \+`$/))) return { op: 'ADD', variable: m[1], path: VARIABLES[m[1]]?.ruta ?? null, value: null, fuente: t, pendiente: 'sin cifra' };
    if ((m = t.match(/^`([a-z_]+) \+` (.+)$/))) return { op: 'ADD', variable: m[1], path: VARIABLES[m[1]]?.ruta ?? null, value: null, fuente: t, pendiente: `sin cifra; condición o matiz: «${m[2]}»` };
    return { op: null, fuente: t, pendiente: 'efecto descrito en texto, sin regla aplicable' };
  });
}

export function parse(md) {
  const bloques = md.split(/\n(?=## (?:GIRA|75)-\d\d — )/).slice(1);
  const tabla = {};
  for (const m of md.matchAll(/^\| ((?:GIRA|75)-\d\d) \| «(.+?)»\.? \| (.+?) \|\s*$/gm)) tabla[m[1]] = { base: m[2], variacion: m[3] };
  return bloques.map(b => {
    const parte = b.split(/\n---\n/)[0];
    const cab = parte.match(/^## ((?:GIRA|75)-\d\d) — (.+)$/m);
    const nid = cab[1];
    const campo = n => parte.match(new RegExp(`^\\*\\*${n}:\\*\\* (.+?)\\s*$`, 'm'))?.[1] ?? null;
    const secciones = {};
    for (const s of parte.split(/\n(?=### )/).slice(1)) { const t = s.match(/^### (.+)$/m)[1]; secciones[t] = s.slice(s.indexOf('\n') + 1).trim(); }
    // Texto antes de la primera sección (si la hay) y de las secciones de escena.
    const primera = parte.indexOf('\n### ');
    const cuerpoInicial = parte.slice(parte.indexOf('\n', parte.indexOf(cab[0])) + 1, primera > 0 ? primera : undefined)
      .split('\n').filter(l => !/^\*\*(Localización|Personajes|Momento):\*\*/.test(l)).join('\n').trim();
    const texto = [cuerpoInicial, secciones['Apertura'], secciones['Escena central']].filter(Boolean).join('\n\n');
    const decision = secciones['Decisión'] ?? secciones['Decisión del jugador'] ?? secciones['Decisión inicial'] ?? '';
    const opciones = [...decision.matchAll(/^\*\*([ABC])\. (.+?)\*\*\s*\n((?:- .*\n?)*)/gm)].map(m => {
      const lineas = m[3].trim().split('\n').map(l => l.replace(/^- /, '').trim());
      const ef = lineas.find(l => l.startsWith('Efecto:'));
      const di = lineas.find(l => l.startsWith('Diario:'));
      const eco = lineas.find(l => l.startsWith('Eco:'));
      return {
        letra: m[1], label: m[2],
        efecto_fuente: ef ? ef.replace(/^Efecto:\s*/, '') : null,
        effects: ef ? efectos(ef.replace(/^Efecto:\s*/, '')) : [],
        journal_text: di ? di.match(/\*(.+?)\*/)?.[1] ?? null : null,
        echo_note: eco ? eco.replace(/^Eco:\s*/, '') : null,
        response_text: null,
      };
    });
    const dialogo = [...texto.matchAll(/^\*\*([A-Za-zÁÉÍÓÚáéíóúñ ]+):\*\* «(.+)»\.?\s*$/gm)].map(m => ({ speaker: m[1], text: m[2] }));
    return {
      narrative_id: nid, title: cab[2].trim(),
      location: campo('Localización'), participants: campo('Personajes'), moment: campo('Momento'),
      text: texto, dialogue: dialogo,
      options: opciones,
      closing_text: secciones['Cierre'] ?? null,
      fixed_consequence: secciones['Consecuencia fija'] ?? null,
      consequence: secciones['Consecuencia'] ?? null,
      campaign_end: secciones['Final de campaña'] ?? null,
      scene_journal: secciones['Diario'] ? secciones['Diario'].match(/\*(.+?)\*/)?.[1] ?? null : null,
      journal_base: tabla[nid]?.base ?? null, journal_variation_note: tabla[nid]?.variacion ?? null,
    };
  });
}

export function construir(md) {
  const escenas = parse(md);
  const precampana = (prefijo, campaign_id, title) => {
    const lista = escenas.filter(e => e.narrative_id.startsWith(prefijo) && ESCENAS[e.narrative_id] && !/después de la Arena/.test(ESCENAS[e.narrative_id][1]));
    return {
      campaign_id, title, status: 'DRAFT_FOR_REVIEW', source_version: 'gira-75-narrativa-1.0', source_ref: FUENTE, canon: 'cinematográfico',
      scenes: lista.map((e, i) => ({
        scene_id: ESCENAS[e.narrative_id][0], sequence: i + 1, ...e,
        options: e.options.map((o, k) => ({ option_id: `${ESCENAS[e.narrative_id][0]}_o${k + 1}`, ...o })),
      })),
    };
  };
  const gira = precampana('GIRA', 'campaign_gira', 'Gira de la Victoria');
  const c75 = precampana('75', 'campaign_75', '75.º Vasallaje de los Veinticinco · precampaña');
  const arena = ARENA_75.map(a => ({ ...a, contenido: a.escenas.map(n => escenas.find(e => e.narrative_id === n)) }));
  const despues = escenas.filter(e => /después de la Arena/.test(ESCENAS[e.narrative_id]?.[1] || '')).map(e => ({ scene_id: ESCENAS[e.narrative_id][0], ...e }));
  return { gira, c75, arena, despues, escenas };
}

// Formato de pantalla: quita las marcas de Markdown del documento (negritas e itálicas) sin cambiar el texto.
const sinMarkdown = t => t == null ? t : String(t).replace(/\*\*([^*]+?):\*\*/g, '$1:').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|\s)\*([^*\n]+)\*(?=\s|[.,;:]|$)/g, '$1$2').replace(/[ \t]+\n/g, '\n').trim();

export const VARIABLES_GIRA_75 = [
  { path: 'rel.katniss_peeta', type: 'int', default: 0 },
  { path: 'rel.katniss_haymitch', type: 'int', default: 0 },
  { path: 'sponsor.interest', type: 'int', default: 0 },
];
// Efectos jugables a partir del borrador y de las reglas del complemento.
function efectosJugables(o) {
  const out = [];
  for (const e of o.effects) {
    if (e.op === 'SET_FLAG') out.push({ op: 'SET_FLAG', path: e.path });
    else if (e.op === 'ADD' && e.path && VARIABLES_GIRA_75.some(v => v.path === e.path)) out.push({ op: 'ADD', path: e.path, value: VALOR_ADD });
    else if (e.op === 'ADD' && FLAG_DE_VARIABLE[e.variable]) out.push({ op: 'SET_FLAG', path: FLAG_DE_VARIABLE[e.variable] });
    else if (!e.op) for (const m of String(e.fuente).matchAll(/`journal_flags: ([a-z0-9_]+)`/g)) out.push({ op: 'SET_FLAG', path: m[1] });
    if (!e.op) for (const m of String(e.fuente).matchAll(/`([a-z_]+) \+`/g)) {
      const ruta = VARIABLES[m[1]]?.ruta;
      if (ruta && VARIABLES_GIRA_75.some(v => v.path === ruta)) out.push({ op: 'ADD', path: ruta, value: VALOR_ADD });
      else if (FLAG_DE_VARIABLE[m[1]]) out.push({ op: 'SET_FLAG', path: FLAG_DE_VARIABLE[m[1]] });
    }
  }
  const unicos = out.filter((e, i) => out.findIndex(x => x.op === e.op && x.path === e.path) === i);
  return unicos.length ? unicos : [{ op: 'SET_FLAG', path: `decision_${o.option_id}` }];
}
export function construirJugables(md) {
  const { gira, c75 } = construir(md);
  const jugable = (c, prefijo, extra) => ({
    campaign_id: c.campaign_id, title: c.title, status: 'APPROVED', source_version: 'gira-75-narrativa-1.0+complemento-1', source_ref: FUENTE,
    approval: 'Completado por Claude el 27-11-2026; aprobación de Nina en el PR', transfer_id: `${c.campaign_id}:v1`, ...extra,
    scenes: c.scenes.map((sc, i) => {
      const cor = CORRECCIONES[sc.scene_id] || {};
      return {
        scene_id: sc.scene_id, narrative_id: sc.narrative_id, sequence: i + 1, title: sc.title, location: sc.location, participants: sc.participants,
        text: sinMarkdown(cor.text || sc.text), milestone: sinMarkdown(sc.fixed_consequence || sc.consequence || ''), canon_correction: cor.motivo || null,
        journal_base: cor.journal_base || sc.journal_base,
        options: sc.options.map(o => {
          const [resp, diario] = TEXTOS[o.option_id] || [];
          if (!resp) throw new Error(`Falta la respuesta de ${o.option_id}`);
          return { option_id: o.option_id, label: (cor.labels || {})[o.option_id] || o.label, source_effect: o.efecto_fuente, effects: efectosJugables(o),
            response_text: resp, journal_text: o.journal_text || diario, journal_entry_id: `${prefijo}.diary.${sc.scene_id}.${o.option_id}` };
        }),
      };
    }),
  });
  return { gira: jugable(gira, 'gira', { next: 'campaign_75' }), c75: jugable(c75, '75', { next: null }) };
}

export function cronica(md) {
  const escenas = parse(md);
  return Object.fromEntries(Object.entries(CRONICA_ARENA_75).map(([t, c]) => [t, c.propio || c.escenas.map(n => sinMarkdown(escenas.find(e => e.narrative_id === n).text)).join('\n\n')]));
}

export function generar(md) {
  const { gira, c75, arena, despues } = construir(md);
  const J = construirJugables(md);
  return `// GENERADO por scripts/importar-gira-75.mjs desde ${FUENTE}.
// No editar a mano. *_BORRADOR: el documento tal cual. GIRA y CAMPANA_75: versiones jugables con el complemento.
export const GIRA_BORRADOR = Object.freeze(${JSON.stringify({ ...gira, variables: [] }, null, 1)});
export const CAMPANA_75_BORRADOR = Object.freeze(${JSON.stringify({ ...c75, variables: [] }, null, 1)});
// Escenas 75-07 a 75-15: contenido para los acontecimientos de Arena del 75.º que ya existen (no son escenas nuevas).
export const ARENA_75_BORRADOR = Object.freeze(${JSON.stringify(arena, null, 1)});
// Escenas posteriores a la Arena (extracción y Distrito 12): sin lugar todavía en el motor.
export const DESPUES_ARENA_75_BORRADOR = Object.freeze(${JSON.stringify(despues, null, 1)});
// Versiones JUGABLES (APPROVED): borrador + complemento (scripts/gira-75-complemento.mjs). La Gira encadena con el 75.º.
const VARIABLES = ${JSON.stringify(VARIABLES_GIRA_75)};
export const GIRA = Object.freeze({ ...${JSON.stringify(J.gira, null, 1)}, variables: VARIABLES });
export const CAMPANA_75 = Object.freeze({ ...${JSON.stringify(J.c75, null, 1)}, variables: VARIABLES });
// Crónica de la Arena del 75.º por turno (amplía los acontecimientos existentes; no crea ninguno).
export const CRONICA_ARENA_75 = Object.freeze(${JSON.stringify(cronica(md), null, 1)});
`;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const md = fs.readFileSync(path.join(root, FUENTE), 'utf8');
  const salidas = [[SALIDA, generar(md)]];
  if (process.argv.includes('--comprobar')) {
    for (const [f, t] of salidas) if (!fs.existsSync(path.join(root, f)) || fs.readFileSync(path.join(root, f), 'utf8') !== t) { console.error(`${f} no corresponde a la fuente: ejecuta node scripts/importar-gira-75.mjs`); process.exit(1); }
    console.log('Gira y 75.º: datos idénticos a la fuente');
  } else {
    for (const [f, t] of salidas) fs.writeFileSync(path.join(root, f), t);
    console.log(`Generado ${SALIDA}`);
  }
}
