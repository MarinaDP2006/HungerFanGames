// Convierte la producción narrativa de la Gira y el 75.º (v1.0, borrador) en datos del motor común,
// sin tocar ni completar su texto. Todo queda en DRAFT_FOR_REVIEW y no se puede jugar.
//   Fuente: docs/paquetes/gira_75_v1/La_Cosecha_Gira_75_Produccion_Narrativa_v1.md
//   Salida: La_Cosecha_Juego_Android/js/campanas/campana-gira-75.js (no se edita a mano)
//   Informe: docs/GIRA_75_CORRESPONDENCIAS_Y_PENDIENTES.md
//   node scripts/importar-gira-75.mjs              → genera los dos
//   node scripts/importar-gira-75.mjs --comprobar  → falla si no corresponden a la fuente
// Decisiones de dirección aplicadas (27-11-2026): canon cinematográfico; las escenas 75-07 a 75-15 no son
// escenas nuevas sino contenido para los acontecimientos de Arena del 75.º que ya existen.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const FUENTE = 'docs/paquetes/gira_75_v1/La_Cosecha_Gira_75_Produccion_Narrativa_v1.md';
export const SALIDA = 'La_Cosecha_Juego_Android/js/campanas/campana-gira-75.js';
export const INFORME = 'docs/GIRA_75_CORRESPONDENCIAS_Y_PENDIENTES.md';

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
// IDs de la estructura anterior sin escena en este borrador.
export const SIN_CONTENIDO = ['tour_capitol_return', '75_aftermath_tour', '75_departure', '75_capitol_arrival', '75_prep', '75_private_session'];

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

export function generar(md) {
  const { gira, c75, arena, despues } = construir(md);
  return `// GENERADO por scripts/importar-gira-75.mjs desde ${FUENTE}.
// No editar a mano. BORRADOR (DRAFT_FOR_REVIEW): efectos sin cifras y variables sin equivalente; no se puede jugar.
export const GIRA_BORRADOR = Object.freeze(${JSON.stringify({ ...gira, variables: [] }, null, 1)});
export const CAMPANA_75_BORRADOR = Object.freeze(${JSON.stringify({ ...c75, variables: [] }, null, 1)});
// Escenas 75-07 a 75-15: contenido para los acontecimientos de Arena del 75.º que ya existen (no son escenas nuevas).
export const ARENA_75_BORRADOR = Object.freeze(${JSON.stringify(arena, null, 1)});
// Escenas posteriores a la Arena (extracción y Distrito 12): sin lugar todavía en el motor.
export const DESPUES_ARENA_75_BORRADOR = Object.freeze(${JSON.stringify(despues, null, 1)});
`;
}

export function informe(md) {
  const { gira, c75, arena, despues, escenas } = construir(md);
  const todas = [...gira.scenes, ...c75.scenes];
  const L = [];
  L.push(`# Gira de la Victoria y 75.º · correspondencias y pendientes

Generado con \`node scripts/importar-gira-75.mjs\` desde \`${FUENTE}\` (v1.0, borrador). **Nada de esto es jugable:** estado \`DRAFT_FOR_REVIEW\`.

Decisiones de dirección aplicadas (27-11-2026):
- **Canon:** manda la continuidad de las películas.
- **Arena del 75.º:** las escenas 75-07 a 75-15 se reparten dentro de los acontecimientos de Arena que ya existen.
- **Sin variables nuevas:** se reutilizan las existentes.
- **Cifras y frases:** las escribe ChatGPT.

Resumen:
- ${escenas.length} escenas leídas: ${gira.scenes.length} de la Gira, ${c75.scenes.length} de la precampaña del 75.º, ${arena.reduce((n, a) => n + a.escenas.length, 0) - 1} de Arena (75-08 cubre dos acontecimientos) y ${despues.length} posteriores a la Arena.

## 1. Escenas → IDs del repositorio
| Documento | Título | ID en el juego | Origen del ID |
|---|---|---|---|
${escenas.map(e => `| ${e.narrative_id} | ${e.title} | ${ESCENAS[e.narrative_id] ? `\`${ESCENAS[e.narrative_id][0]}\`` : 'Arena (ver 2)'} | ${ESCENAS[e.narrative_id]?.[1] ?? 'acontecimiento existente'} |`).join('\n')}

**IDs de la estructura anterior que se quedan sin escena:** ${SIN_CONTENIDO.map(x => `\`${x}\``).join(', ')}. Se conservan registrados; ¿se retiran o tendrán escena?

## 2. Arena del 75.º: escenas → acontecimientos existentes
En el juego, la Arena del 75.º tiene **ocho acontecimientos**: tres capítulos en \`campaigns.js\` y cinco eventos en \`app.js\` (esto resuelve la discrepancia de los «ocho acontecimientos»). Se conservan sus IDs técnicos; las escenas amplían su contenido.

| Turno | Acontecimiento existente | ID técnico | Escenas del documento |
|---|---|---|---|
${arena.map(a => `| ${a.turno} | ${a.titulo} | ${a.id} | ${a.escenas.join(', ') || '— (sin escena: se mantiene tal cual)'} |`).join('\n')}

Conflictos que tenéis que revisar:
- **75-12** dice que Wiress ayuda a descubrir el reloj, y el capítulo existente «Los charlajos» (turno 7) dice que Wiress ya ha muerto: hay que comprobar el orden.
- **75-10:** el documento fija que Mags muere sin remedio, pero el capítulo «La niebla» permite salvarla con la opción «Cargar tú con Mags». Con el canon cinematográfico, esa opción debería desaparecer o cambiar.
- **75-07:** el documento coloca la decisión inicial en la playa (arma, herramienta o Peeta), pero el capítulo existente la sitúa en las plataformas de agua (Finnick, Peeta o armas). Hay que unificar.

## 3. Variables → sistema real
| Variable del documento | Equivale a | Dónde | Nota |
|---|---|---|---|
${Object.entries(VARIABLES).map(([k, v]) => `| \`${k}\` | ${v.ruta ? `\`${v.ruta}\`` : '**sin equivalente**'} | ${v.donde} | ${v.nota} |`).join('\n')}

Las variables **sin equivalente** necesitan que ChatGPT diga qué hacen (valor inicial, rango y efecto en el juego) antes de crear nada.

## 4. Pendientes exactos por escena
`);
  for (const s of [...todas, ...despues, ...arena.flatMap(a => a.contenido.filter(Boolean).map(c => ({ ...c, scene_id: `Arena turno ${a.turno}` })))]) {
    const p = [];
    for (const o of s.options) {
      const id = o.option_id || `${s.narrative_id} ${o.letra}`;
      for (const e of o.effects) if (e.pendiente) p.push(`\`${id}\` (${o.label}): ${e.fuente} → ${e.pendiente}${e.variable && !VARIABLES[e.variable]?.ruta ? `; \`${e.variable}\` sin equivalente` : ''}`);
      if (!o.efecto_fuente) p.push(`\`${id}\` (${o.label}): sin efecto escrito`);
      if (o.echo_note) p.push(`\`${id}\`: eco solo descrito («${limpio(o.echo_note)}»), falta la frase`);
      p.push(`\`${id}\`: falta la respuesta inmediata`);
      if (!o.journal_text) p.push(`\`${id}\`: falta su frase de diario (solo hay la base de la escena)`);
    }
    if (s.journal_variation_note && !/^Sin variación/.test(s.journal_variation_note)) p.push(`Diario: la variación está descrita («${limpio(s.journal_variation_note)}»), falta la frase`);
    if (!s.journal_base) p.push('Diario: falta la entrada base');
    L.push(`### ${s.narrative_id} · ${s.title}${s.scene_id ? ` (\`${s.scene_id}\`)` : ''}\n${p.map(x => `- ${x}`).join('\n') || '- Nada pendiente'}\n`);
  }
  L.push(`## 5. Antes de activar
1. ChatGPT completa todo lo anterior: cifras, condiciones, respuestas, frases del diario y comportamiento de las variables sin equivalente.
2. Tú apruebas la Gira y el 75.º.
3. Claude regenera los datos, integra la Arena en los acontecimientos existentes (sin añadir ninguno) y añade las pruebas de continuidad 74 → Gira → 75 y de carga.
`);
  return L.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const md = fs.readFileSync(path.join(root, FUENTE), 'utf8');
  const salidas = [[SALIDA, generar(md)], [INFORME, informe(md)]];
  if (process.argv.includes('--comprobar')) {
    for (const [f, t] of salidas) if (!fs.existsSync(path.join(root, f)) || fs.readFileSync(path.join(root, f), 'utf8') !== t) { console.error(`${f} no corresponde a la fuente: ejecuta node scripts/importar-gira-75.mjs`); process.exit(1); }
    console.log('Gira y 75.º: datos e informe idénticos a la fuente');
  } else {
    for (const [f, t] of salidas) fs.writeFileSync(path.join(root, f), t);
    console.log(`Generados ${SALIDA} y ${INFORME}`);
  }
}
