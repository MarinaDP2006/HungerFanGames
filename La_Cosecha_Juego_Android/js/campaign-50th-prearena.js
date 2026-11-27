/**
 * La Cosecha 5.1 · expansión narrativa del Segundo Vasallaje.
 * Contenido original redactado para el juego. No reproduce pasajes del libro.
 *
 * Integración prevista:
 *  - buildRoster50() sustituye el bloque Array.from(48) de begin() en app.js.
 *  - createPreArena50State() inicializa game.preArena50 al crear la partida.
 *  - getPreArena50Scene() y applyPreArena50Choice() gestionan las escenas antes de la Arena.
 *
 * Los tributos cuyo nombre no está confirmado se mantienen como plazas anónimas.
 */

const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, n));

const knownArenaTributes = [
  { id: 'haymitch-abernathy-50', name: 'Haymitch Abernathy', district: 12, role: 'player', known: true },
  { id: 'maysilee-donner', name: 'Maysilee Donner', district: 12, role: 'ally', known: true },
  { id: 'wyatt-callow', name: 'Wyatt Callow', district: 12, role: 'tribute', known: true },
  // Louella no compite en la Arena: el Capitolio la sustituye por Lou Lou.
  { id: 'lou-lou', name: 'Lou Lou', district: 12, role: 'replacement', known: true },
  { id: 'panache', name: 'Panache', district: 1, role: 'career', known: true },
  { id: 'silka', name: 'Silka', district: 1, role: 'career', known: true },
  { id: 'ampert-latier', name: 'Ampert Latier', district: 3, role: 'tribute', known: true },
  { id: 'maritte', name: 'Maritte', district: 4, role: 'tribute', known: true },
  { id: 'wellie', name: 'Wellie', district: 6, role: 'tribute', known: true },
];

export function buildRoster50() {
  const roster = knownArenaTributes.map(t => ({
    ...t, alive: true, hp: 100, skill: 5, x: 50, y: 50,
    portrait: null, canon: true, alliance: null, player: false
  }));
  for (let district = 1; district <= 12; district++) {
    const current = roster.filter(t => t.district === district).length;
    for (let slot = current + 1; slot <= 4; slot++) {
      roster.push({
        id: `unknown-d${district}-${slot}`,
        name: `Tributo/a no identificado/a · Distrito ${district} · Plaza ${slot}`,
        district, role: 'unknown', known: false,
        alive: true, hp: 100, skill: 5, x: 50, y: 50,
        portrait: null, canon: true, alliance: null, player: false
      });
    }
  }
  return roster.sort((a, b) => a.district - b.district || a.id.localeCompare(b.id));
}

export const PRE_ARENA_50 = [
  {
    id: 'reaping',
    phase: 'harvest',
    title: 'La cosecha del Segundo Vasallaje',
    body: 'La plaza del Distrito 12 está llena mucho antes de que comience la ceremonia. Cuatro nombres saldrán de las urnas este año. Haymitch intenta mantener la atención en las personas que quiere proteger, no en las cámaras.',
    choices: [
      { id: 'watch', label: 'Observar a los agentes y las cámaras', effects: { observation: 2, suspicion: 1 }, flags: ['watchedGamemakers'] },
      { id: 'lenore', label: 'Buscar a Lenore Dove entre la multitud', effects: { lenore: 2, resolve: 1 }, flags: ['lookedForLenore'] },
      { id: 'family', label: 'Permanecer junto a tu familia', effects: { family: 2, resolve: 2 }, flags: ['stayedWithFamily'] }
    ]
  },
  {
    id: 'woodbine',
    phase: 'harvest',
    title: 'El nombre que no debía cambiar',
    body: 'La selección provoca una reacción que desborda el protocolo. Woodbine Chance intenta escapar y la autoridad responde con violencia. En medio del caos, Haymitch comprende que la lista de tributos puede cambiar delante de todos.',
    choices: [
      { id: 'intervene', label: 'Intentar intervenir', effects: { resolve: 2, suspicion: 2, health: -4 }, flags: ['intervenedAtReaping'] },
      { id: 'protect', label: 'Apartar a Sid y a tu madre del tumulto', effects: { family: 3, resolve: 1 }, flags: ['protectedFamilyAtReaping'] },
      { id: 'memorize', label: 'Memorizar quién dio la orden', effects: { observation: 3, rebellion: 1 }, flags: ['memorizedEnforcers'] }
    ]
  },
  {
    id: 'goodbye',
    phase: 'harvest',
    title: 'Antes de abandonar el Distrito 12',
    body: 'El tiempo concedido para despedirse parece una crueldad calculada. Lenore no acepta que el Capitolio tenga la última palabra sobre lo que significa querer a alguien.',
    choices: [
      { id: 'promise', label: 'Prometer que intentarás volver', effects: { lenore: 3, resolve: 2 }, flags: ['promisedLenore'] },
      { id: 'truth', label: 'Contarle lo que temes de verdad', effects: { lenore: 2, resolve: 1, support: 2 }, flags: ['trustedLenore'] },
      { id: 'silence', label: 'No convertir la despedida en una escena para las cámaras', effects: { stealth: 2, suspicion: -1 }, flags: ['privateGoodbye'] }
    ]
  },
  {
    id: 'train',
    phase: 'training',
    title: 'Cuatro tributos en un mismo vagón',
    body: 'El trayecto reúne a Haymitch, Maysilee, Louella y Wyatt. Ninguno ha elegido compartir este viaje. Maysilee observa cada gesto; Wyatt calcula posibilidades; Louella intenta no mostrar miedo.',
    choices: [
      { id: 'unite', label: 'Proponer que compartáis información', effects: { maysilee: 2, louella: 2, wyatt: 1 }, flags: ['district12Cooperation'] },
      { id: 'maysilee', label: 'Hablar a solas con Maysilee', effects: { maysilee: 3, observation: 1 }, flags: ['privateMaysileeTalk'] },
      { id: 'wyatt', label: 'Pedir a Wyatt que explique sus cálculos', effects: { wyatt: 3, observation: 2 }, flags: ['learnedOdds'] },
      { id: 'louella', label: 'Ayudar a Louella a prepararse', effects: { louella: 3, resolve: 1 }, flags: ['comfortedLouella'] }
    ]
  },
  {
    id: 'arrival',
    phase: 'training',
    title: 'La llegada al Capitolio',
    body: 'Al llegar al Capitolio, el registro oficial del Distrito 12 presenta un cambio: Louella ya no figura en la alineación y Lou Lou ocupa su plaza. El Capitolio no comunica públicamente el motivo. La preparación continúa bajo el protocolo habitual.',
    choices: [
      { id: 'comply', label: 'Cumplir el protocolo y observar', effects: { suspicion: -1, observation: 2, sponsor: 1 }, flags: ['playedByProtocol'] },
      { id: 'defy', label: 'Dejar claro que no estás agradecido', effects: { rebellion: 3, suspicion: 3, support: 2 }, flags: ['defiedCapitolArrival'] },
      { id: 'network', label: 'Buscar una conversación útil con el equipo técnico', effects: { observation: 2, sponsor: 2 }, flags: ['networkedCapitol'] }
    ]
  },
  {
    id: 'training',
    phase: 'training',
    title: 'El centro de entrenamiento',
    body: 'Las estaciones de entrenamiento ofrecen una ventaja visible, pero también revelan qué teme cada tributo. La fuerza impresiona a los patrocinadores; la observación puede mantenerte vivo cuando las cámaras dejan de mirar.',
    choices: [
      { id: 'survival', label: 'Priorizar supervivencia, plantas y orientación', effects: { survival: 3, observation: 1 }, flags: ['trainedSurvival50'] },
      { id: 'combat', label: 'Practicar combate y defensa', effects: { combat: 3, suspicion: 1 }, flags: ['trainedCombat50'] },
      { id: 'observe', label: 'Estudiar a los tributos profesionales', effects: { observation: 3, stealth: 1 }, flags: ['studiedCareers50'] },
      { id: 'team', label: 'Coordinar ejercicios con los tributos del Distrito 12', effects: { maysilee: 1, louella: 1, wyatt: 1, support: 2 }, flags: ['trainedAsDistrict12'] }
    ]
  },
  {
    id: 'parade',
    phase: 'training',
    title: 'El desfile de los tributos',
    body: 'Los carros recorren la avenida bajo una lluvia de luces. El Capitolio convierte cada distrito en una imagen fácil de vender, y el Distrito 12 no es una excepción: el carbón, el vestuario y la puesta en escena quedan reducidos a unos segundos de espectáculo. Haymitch siente el peso de miles de miradas. Los Vigilantes observan menos el traje que la reacción del público. No basta con llegar al final del recorrido: cada gesto puede convertirse en una etiqueta que lo acompañe dentro de la Arena.',
    choices: [
      { id: 'challenge', label: 'Sostener la mirada de las cámaras sin fingir gratitud', effects: { rebellion: 3, suspicion: 3, resolve: 1 }, flags: ['defiedParade50'] },
      { id: 'comfort', label: 'Coordinar el gesto con Maysilee y Wyatt para proyectar unidad', effects: { maysilee: 1, wyatt: 1, resolve: 2 }, flags: ['district12UnitedParade50'] },
      { id: 'record', label: 'Observar a los Vigilantes y memorizar quién presta atención', effects: { observation: 3, rebellion: 1 }, flags: ['watchedParade50'] }
    ]
  },
  {
    id: 'interview',
    phase: 'interview',
    title: 'Una historia para la audiencia',
    body: 'La entrevista no es una conversación libre. Cada respuesta se convierte en material para el Capitolio. Puedes intentar conseguir apoyo, proteger a quienes siguen en el Distrito 12 o dejar una grieta en el relato oficial.',
    choices: [
      { id: 'charm', label: 'Ser ingenioso y conquistar al público', effects: { sponsor: 3, support: 3 }, flags: ['interviewCharm50'] },
      { id: 'human', label: 'Hablar de las personas que quieres proteger', effects: { support: 3, lenore: 1, suspicion: 1 }, flags: ['interviewHuman50'] },
      { id: 'defy', label: 'Cuestionar la legitimidad del espectáculo', effects: { rebellion: 4, support: 1, suspicion: 4 }, flags: ['interviewDefiance50'] },
      { id: 'mask', label: 'No revelar nada que puedan utilizar contra ti', effects: { stealth: 2, suspicion: -1 }, flags: ['interviewMask50'] }
    ]
  },
  {
    id: 'last-night',
    phase: 'interview',
    title: 'La última noche antes de las plataformas',
    body: 'La víspera de la Arena no trae descanso. Maysilee y Haymitch tienen motivos para desconfiar el uno del otro, pero también saben que el Capitolio se beneficia cuando los distritos compiten entre sí.',
    choices: [
      { id: 'alliance', label: 'Sellar una alianza con Maysilee', effects: { maysilee: 3, support: 2 }, flags: ['maysileeAlliance'] },
      { id: 'conditional', label: 'Acordar señales, sin prometer obediencia', effects: { maysilee: 2, observation: 1, stealth: 1 }, flags: ['maysileeSignals'] },
      { id: 'solo', label: 'Decidir que entrarás solo en la Arena', effects: { stealth: 2, maysilee: -2 }, flags: ['enteredArenaAlone'] }
    ]
  }
];

export function createPreArena50State() {
  return {
    version: 1,
    index: 0,
    complete: false,
    relationships: { lenore: 0, family: 0, maysilee: 0, louella: 0, wyatt: 0 },
    stats: { observation: 0, resolve: 0, stealth: 0, survival: 0, combat: 0, sponsor: 0, support: 0, rebellion: 0, suspicion: 0, health: 0 },
    flags: {},
    history: []
  };
}

export function getPreArena50Scene(state) {
  if (!state || state.complete) return null;
  return PRE_ARENA_50[state.index] || null;
}

export function applyPreArena50Choice(state, choiceId) {
  const scene = getPreArena50Scene(state);
  if (!scene) return { ok: false, reason: 'campaign-complete' };
  const choice = scene.choices.find(c => c.id === choiceId);
  if (!choice) return { ok: false, reason: 'invalid-choice' };

  for (const [key, delta] of Object.entries(choice.effects || {})) {
    if (key in state.relationships) state.relationships[key] = clamp(state.relationships[key] + delta, -10, 10);
    else if (key in state.stats) state.stats[key] = clamp(state.stats[key] + delta, -10, 20);
  }
  for (const flag of choice.flags || []) state.flags[flag] = true;

  if (scene.canonOutcome) {
    state.flags[scene.canonOutcome.flag] = true;
    state.flags.louellaReplacement = scene.canonOutcome.replacement;
  }

  state.history.push({
    scene: scene.id,
    title: scene.title,
    choice: choice.id,
    phase: scene.phase
  });
  state.index += 1;
  if (state.index >= PRE_ARENA_50.length) state.complete = true;
  return { ok: true, scene, choice, next: getPreArena50Scene(state), complete: state.complete };
}

/**
 * Aplica el estado acumulado a la partida existente sin reemplazar su motor.
 * La integración debe ejecutarse una sola vez al pasar a la Arena.
 */
export function applyPreArena50ToGame(state, game) {
  if (!state || !game) return game;
  game.flags ??= {};
  game.relationships ??= {};
  // Se aplica una sola vez: cargar una partida o volver a renderizar no repite las bonificaciones.
  // El indicador persistente viaja en game.flags y, por tanto, en el guardado y en la exportación JSON.
  if (state.appliedToGame || game.preArena50Applied || game.flags['50th-prearena-applied']) {
    game.preArena50 = state;
    return game;
  }
  state.appliedToGame = true;
  game.preArena50Applied = true;
  game.flags['50th-prearena-applied'] = true;
  game.preArena50 = state;
  // `??` y no `||`: un valor 0 (salud, habilidad…) es un valor real, no un hueco.
  const num = (v, fallback) => (typeof v === 'number' && Number.isFinite(v) ? v : fallback);
  game.relationships.maysilee = Math.max(num(game.relationships.maysilee, 0), state.relationships.maysilee);
  game.relationships.lenore = state.relationships.lenore;
  game.relationships.louella = state.relationships.louella;
  game.relationships.wyatt = state.relationships.wyatt;
  game.skill = clamp(num(game.skill, 6) + Math.max(0, Math.floor(state.stats.observation / 3)) + Math.max(0, Math.floor(state.stats.survival / 3)) + Math.max(0, Math.floor(state.stats.combat / 4)) + Math.max(0, Math.floor(state.stats.resolve / 4)), 0, 20);
  game.health = clamp(num(game.health, 100) + state.stats.health, 0, 100);
  game.stealth = clamp(num(game.stealth, 0) + Math.max(0, state.stats.stealth), 0, 100);
  game.support = clamp(num(game.support, 0) + state.stats.support + state.stats.sponsor, 0, 100);
  game.rebellion = clamp(num(game.rebellion, 0) + state.stats.rebellion, 0, 100);
  // Indicadores: clave con prefijo «50th-» y alias sin prefijo para el adaptador 5.5.
  for (const [key, value] of Object.entries(state.flags)) {
    if (!value) continue;
    game.flags[`50th-${key}`] = true;
    if (game.flags[key] === undefined) game.flags[key] = true;
  }
  const maysilee = game.tributes?.find(t => t.name === 'Maysilee Donner');
  if (maysilee) {
    maysilee.relationship = game.relationships.maysilee;
    if (state.flags.maysileeAlliance || state.flags.maysileeSignals) {
      maysilee.alliance = 'player';
      maysilee.sector = game.playerSector;
    }
  }
  return game;
}


function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

export function renderPreArena50Panel(state, phase = 'harvest') {
  const scene = getPreArena50Scene(state);
  if (!scene) return '<div class="story-box"><h2 class="section-title">Preparación completada</h2><p>La campaña está lista para entrar en la Arena.</p></div>';
  const progress = Math.round((state.index / PRE_ARENA_50.length) * 100);
  const choices = scene.choices.map(choice =>
    `<button class="choice" data-pre50-choice="${escapeHtml(choice.id)}">${escapeHtml(choice.label)}</button>`
  ).join('');
  const training = phase === 'training' ? `
    <div class="panel" style="margin-top:12px">
      <h3 class="section-title">ENTRENAMIENTO ADICIONAL</h3>
      <div class="cards">
        <button class="choice" data-train="survival">Supervivencia<small>Mejora la lectura del entorno.</small></button>
        <button class="choice" data-train="combat">Combate<small>Practica defensa y control de distancia.</small></button>
        <button class="choice" data-train="stealth">Sigilo<small>Reduce la exposición.</small></button>
        <button class="choice" data-train="observe">Observar rivales<small>Estudia patrones y debilidades.</small></button>
        <button class="choice" data-train="social">Relaciones públicas<small>Busca apoyo sin revelar tus intenciones.</small></button>
      </div>
    </div>` : '';
  return `
    <div class="eyebrow">SEGUNDO VASALLAJE · DISTRITO 12 · ${state.index + 1}/${PRE_ARENA_50.length}</div>
    <div class="progress"><i style="width:${progress}%"></i></div>
    <div class="story-box">
      <div class="eyebrow">${escapeHtml(({ harvest: 'COSECHA', training: 'CAPITOLIO', interview: 'VÍSPERA DE LA ARENA' })[scene.phase] || scene.phase.toUpperCase())}</div>
      <h2 class="section-title">${escapeHtml(scene.title)}</h2>
      <p>${escapeHtml(scene.body)}</p>
      <div class="cards">${choices}</div>
    </div>
    ${training}
    <div class="panel" style="margin-top:12px">
      <h3 class="section-title">VÍNCULOS Y PREPARACIÓN</h3>
      <div class="stat-grid">
        <div class="stat"><strong>${state.relationships.maysilee}</strong><span>CONFIANZA · MAYSILEE</span></div>
        <div class="stat"><strong>${state.relationships.lenore}</strong><span>VÍNCULO · LENORE</span></div>
        <div class="stat"><strong>${state.stats.observation}</strong><span>OBSERVACIÓN</span></div>
        <div class="stat"><strong>${state.stats.resolve}</strong><span>DETERMINACIÓN</span></div>
      </div>
    </div>
    <div class="button-row">
      <button class="btn ghost" data-a="save">Guardar partida</button>
    </div>`;
}
