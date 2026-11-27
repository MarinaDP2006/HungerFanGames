// Registro de decisiones de la partida (formato de guardado 5).
//
// Cada decisión narrativa se anota una sola vez con un identificador estable: «<campaña>:<escena>».
// Si la misma decisión vuelve a procesarse (doble pulsación, partida recargada, importación), el
// registro la reconoce y los efectos NO se aplican otra vez.
//
//   game.timeline   = { timeline_id, route_type }
//   game.decisionLog  = [{ decision_id, campaign_id, scene_id, option_id, seq, effects_applied, source_text_version, migrated? }]
//
// route_type: CANON (campañas de la ruta de referencia), ALT_ROUTE (escenarios «¿Y si…?»), FREE (modo libre),
// PRESIDENCY (modo Presidente) o LEGACY (partida anterior al registro).

export const ROUTE_TYPES = ['CANON', 'ALT_ROUTE', 'FREE', 'PRESIDENCY', 'LEGACY'];

export const decisionKey = (campaignId, sceneId) => `${campaignId}:${sceneId}`;
export const decisionId = (campaignId, sceneId, optionId) => `${campaignId}:${sceneId}:${optionId}:1`;

function nuevoTimelineId(random = Math.random) {
  return 'tl_' + Math.floor(random() * 36 ** 8).toString(36).padStart(8, '0');
}

export function routeTypeOf(game) {
  if (!game) return 'LEGACY';
  if (game.mode === 'president') return 'PRESIDENCY';
  if (game.mode === 'free') return game.whatIf ? 'ALT_ROUTE' : 'FREE';
  return 'CANON';
}

// Prepara una partida nueva para el registro.
export function initDecisions(game, { random } = {}) {
  game.timeline = { timeline_id: nuevoTimelineId(random), route_type: routeTypeOf(game) };
  game.decisionLog ??= [];
  return game;
}

export const hasDecision = (game, campaignId, sceneId) => !!game?.decisionLog?.some(d => (d.decision_key || d.decision_id) === decisionKey(campaignId, sceneId));

// Anota una decisión. Devuelve { recorded: true, entry } o { recorded: false, duplicate: true, entry } si ya existía.
export function recordDecision(game, { campaign_id, scene_id, option_id, effects_applied = [], source_text_version = null }) {
  game.decisionLog ??= [];
  const key = decisionKey(campaign_id, scene_id);
  const prev = game.decisionLog.find(d => (d.decision_key || d.decision_id) === key);
  if (prev) return { recorded: false, duplicate: true, entry: prev };
  const entry = { decision_id: decisionId(campaign_id, scene_id, option_id), decision_key: key, campaign_id: String(campaign_id), scene_id, option_id, seq: game.decisionLog.length + 1, effects_applied, source_text_version };
  game.decisionLog.push(entry);
  return { recorded: true, entry };
}

// Migración de una partida de los formatos 1–4 al 5. No cambia nada de lo que ya había: solo añade
// la línea temporal y el registro. Las decisiones del 50.º ya tomadas se reconstruyen desde su historial,
// marcadas como migradas y sin volver a aplicar efectos.
export function migrateGame(game) {
  if (!game || typeof game !== 'object') return game;
  if (!game.timeline) game.timeline = { timeline_id: nuevoTimelineId(), route_type: 'LEGACY' };
  if (!Array.isArray(game.decisionLog)) {
    game.decisionLog = [];
    for (const h of game.preArena50?.history || []) {
      if (!h || !h.scene || !h.choice) continue;
      recordDecision(game, { campaign_id: '50', scene_id: h.scene, option_id: h.choice, effects_applied: 'aplicados antes del registro' });
    }
    for (const d of game.decisionLog) d.migrated = true;
  }
  return game;
}

// Comprueba la coherencia del registro (lo usan las pruebas y la carga).
export function validateDecisions(game) {
  const problems = [];
  if (!game?.timeline?.timeline_id) problems.push('sin timeline_id');
  if (!ROUTE_TYPES.includes(game?.timeline?.route_type)) problems.push(`route_type desconocido: ${game?.timeline?.route_type}`);
  const ids = new Set();
  (game?.decisionLog || []).forEach((d, i) => {
    const k = d.decision_key || d.decision_id;
    if (ids.has(k)) problems.push(`decisión repetida: ${k}`);
    ids.add(k);
    if (d.seq !== i + 1) problems.push(`secuencia rota en ${d.decision_id}`);
  });
  return problems;
}
