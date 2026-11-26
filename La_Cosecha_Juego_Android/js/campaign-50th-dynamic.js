/**
 * La Cosecha 5.5 — Variaciones dinámicas de la Arena (50.º Vasallaje)
 * Módulo independiente: no registra muertes, crónicas ni encuentros entre rivales.
 * Integra estados previos en la selección de variantes y opciones disponibles.
 */

const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));
const has = (list, value) => Array.isArray(list) && list.includes(value);

export function normalizeArenaState(input = {}) {
  const stats = input.stats || {};
  const inventory = input.inventory || {};
  return {
    turn: clamp(input.turn, 1, 99),
    mode: input.mode || "story",
    edition: Number(input.edition ?? 50),
    health: clamp(stats.health ?? input.health ?? 100, 0, 100),
    fatigue: clamp(stats.fatigue ?? input.fatigue ?? 0, 0, 100),
    stealth: clamp(stats.stealth ?? input.stealth ?? 50, 0, 100),
    skill: clamp(stats.skill ?? input.skill ?? 50, 0, 100),
    relationships: { ...(input.relationships || {}) },
    inventory: {
      water: clamp(inventory.water ?? 0, 0, 99),
      food: clamp(inventory.food ?? 0, 0, 99),
      medicine: clamp(inventory.medicine ?? 0, 0, 99),
      tools: clamp(inventory.tools ?? 0, 0, 99)
    },
    flags: { ...(input.flags || {}) },
    allies: Array.isArray(input.allies) ? [...input.allies] : []
  };
}

function event(id, title, description, choices, variant) {
  return { id, title, description, variant, choices };
}

function choice(id, label, requires, effects, result) {
  return { id, label, requires, effects, result };
}

const EVENTS = {
  11: {
    base: event("waterline", "La línea de agua", "El cauce se estrecha entre piedras resbaladizas. El agua parece limpia, pero el terreno cuenta otra historia.", [
      choice("filter", "Filtrar el agua antes de beber", { tools: 1 }, { water: -1, health: 5, fatigue: 2 }, "Evitas beber directamente del cauce y reduces el riesgo."),
      choice("ration", "Racionar lo que queda", { water: 1 }, { water: -1, fatigue: 4, stealth: 2 }, "Conservas fuerzas y avanzas con cautela."),
      choice("track", "Buscar un punto más seguro", {}, { fatigue: 7, stealth: 4 }, "El rodeo te cuesta tiempo, pero encuentras un acceso menos expuesto.")
    ]),
    variants: [
      { when: s => s.inventory.water === 0, id: "thirst", title: "La línea de agua: sed", description: "No te queda agua. El cauce es tentador, pero beber sin tratarla puede salir caro.", hide: ["ration"], effects: { fatigue: 4 } },
      { when: s => s.health <= 35, id: "weak", title: "La línea de agua: fuerzas al límite", description: "Las piernas apenas responden. Un rodeo largo puede empeorar tu estado.", hide: ["track"], add: [choice("rest", "Descansar y beber con cuidado", { water: 1 }, { water: -1, health: 8, fatigue: -10 }, "Recuperas algo de estabilidad antes de continuar.")] },
      { when: s => s.stealth >= 70, id: "quiet", title: "La línea de agua: paso silencioso", description: "Has aprendido a moverte sin alterar el entorno. Puedes aprovechar la cobertura del cauce.", add: [choice("conceal", "Cruzar usando la vegetación", {}, { stealth: 5, fatigue: 3 }, "Cruzas sin dejar un rastro evidente.")] }
    ]
  },
  13: {
    base: event("sponsor-package", "Un paquete del Capitolio", "Un pequeño contenedor aparece sujeto a una rama. Su contenido podría ayudarte, pero llegar hasta él exige exponerte.", [
      choice("open", "Abrirlo inmediatamente", {}, { health: 4, food: 1, medicine: 1, stealth: -5 }, "Aprovechas el contenido, aunque haces ruido."),
      choice("inspect", "Examinarlo antes de tocarlo", { skill: 35 }, { stealth: 3, tools: 1 }, "Detectas cómo está sujeto y lo recuperas con cuidado."),
      choice("leave", "Dejarlo y seguir", {}, { stealth: 5, fatigue: 1 }, "No arriesgas tu posición por una ayuda incierta.")
    ]),
    variants: [
      { when: s => s.health <= 40, id: "urgent", title: "Un paquete del Capitolio: necesidad", description: "Tus heridas hacen que cualquier medicina resulte valiosa. El paquete podría contener algo útil.", add: [choice("medical", "Priorizar el contenido médico", {}, { medicine: 2, health: 6, stealth: -4 }, "Encuentras suministros médicos y los guardas.")] },
      { when: s => s.inventory.food === 0, id: "hungry", title: "Un paquete del Capitolio: hambre", description: "Llevas demasiado tiempo sin comer. El paquete podría resolver parte del problema.", add: [choice("food", "Buscar comida en el paquete", {}, { food: 2, fatigue: -4, stealth: -3 }, "Consigues una pequeña reserva de alimento.")] },
      { when: s => s.flags.rejectedCapitolAid === true, id: "defiant", title: "Un paquete del Capitolio: desafío", description: "Ya rechazaste una ayuda anterior. Esta vez puedes mantener tu postura o aprovechar la oportunidad.", add: [choice("accept_reluctantly", "Aceptar solo lo imprescindible", {}, { medicine: 1, food: 1, stealth: -2 }, "Aceptas lo necesario sin confiar en la generosidad del Capitolio.")] }
    ]
  },
  16: {
    base: event("forest-edge", "El límite del bosque", "El viento cambia y las hojas empiezan a moverse en dirección contraria. La zona abierta ofrece visibilidad, pero poca protección.", [
      choice("hide", "Buscar cobertura y ocultarte", {}, { stealth: 8, fatigue: 3 }, "Te ocultas hasta que el entorno vuelve a calmarse."),
      choice("cross", "Cruzar ahora, antes de que empeore", { health: 25 }, { fatigue: 8, stealth: -3 }, "Cruzas deprisa y alcanzas terreno más protegido."),
      choice("prepare", "Asegurar una posición defensiva", { tools: 1 }, { tools: -1, stealth: 4, health: 3 }, "Preparas el terreno para protegerte de los peligros ambientales.")
    ]),
    variants: [
      { when: s => s.fatigue >= 70, id: "exhausted", title: "El límite del bosque: agotamiento", description: "El cansancio vuelve peligroso cualquier desplazamiento rápido.", hide: ["cross"], add: [choice("recover", "Recuperar el aliento bajo cobertura", {}, { fatigue: -12, stealth: 3 }, "Esperas a recuperar fuerzas sin exponerte.")] },
      { when: s => s.inventory.tools === 0, id: "unprepared", title: "El límite del bosque: sin herramientas", description: "No tienes herramientas para preparar una defensa. Tendrás que confiar en el terreno.", hide: ["prepare"] },
      { when: s => s.skill >= 75, id: "expert", title: "El límite del bosque: lectura del terreno", description: "Reconoces una ruta protegida entre las raíces y las rocas.", add: [choice("route", "Seguir la ruta protegida", {}, { fatigue: -3, stealth: 6 }, "Aprovechas el relieve y evitas la zona más expuesta.")] }
    ]
  },
  18: {
    base: event("night-watch", "Una noche difícil", "La temperatura cae. Si compartes el refugio con un aliado, coordinaros puede marcar la diferencia.", [
      choice("guard", "Organizar turnos de vigilancia", { ally: true }, { fatigue: 5, stealth: 3, relation: 2 }, "La vigilancia compartida reduce los riesgos del descanso."),
      choice("sleep", "Dormir mientras puedas", {}, { health: 3, fatigue: -10, stealth: -2 }, "Recuperas fuerzas, aunque bajas la guardia."),
      choice("move", "Cambiar de refugio", {}, { fatigue: 8, stealth: 5 }, "Te alejas de la zona antes de que amanezca.")
    ]),
    variants: [
      { when: s => s.allies.length === 0, id: "alone", title: "Una noche difícil: en solitario", description: "No hay nadie con quien repartir la vigilancia. Debes decidir entre descansar o mantenerte alerta.", hide: ["guard"] },
      { when: s => s.relationships[s.allies[0]] >= 60, id: "trusted", title: "Una noche difícil: confianza", description: "La confianza con tu aliado permite organizar turnos sin demasiadas palabras.", add: [choice("trust_watch", "Confiar la primera guardia al aliado", { ally: true }, { fatigue: -4, relation: 2, stealth: 2 }, "Puedes descansar un poco más mientras tu aliado vigila.")] },
      { when: s => s.fatigue >= 75, id: "collapse", title: "Una noche difícil: agotamiento extremo", description: "Estás demasiado cansado para mantener una guardia larga.", hide: ["move"], add: [choice("short_rest", "Dormir un rato bajo cobertura", {}, { health: 2, fatigue: -14, stealth: -1 }, "Un descanso breve te permite seguir adelante.")] }
    ]
  },
  21: {
    base: event("scarce-supplies", "Reservas escasas", "Tus provisiones empiezan a agotarse. Lo que decidas ahora condicionará cuánto podrás resistir después.", [
      choice("ration", "Reducir las raciones", { food: 1 }, { food: -1, fatigue: 4, stealth: 2 }, "Alargas las reservas a costa de pasar hambre."),
      choice("forage", "Buscar alimento sin alejarte demasiado", { skill: 30 }, { food: 1, fatigue: 5, stealth: -2 }, "Encuentras algo comestible y vuelves al refugio."),
      choice("share", "Compartir provisiones con un aliado", { ally: true, food: 1 }, { food: -1, relation: 5, fatigue: 2 }, "Compartir fortalece la alianza, pero reduce tus reservas.")
    ]),
    variants: [
      { when: s => s.inventory.food === 0, id: "empty", title: "Reservas escasas: sin comida", description: "No tienes reservas que racionar. Tendrás que buscar una alternativa.", hide: ["ration", "share"], add: [choice("search", "Buscar algo comestible", {}, { food: 1, fatigue: 8, stealth: -3 }, "Consigues una pequeña cantidad de alimento.")] },
      { when: s => s.inventory.food >= 4, id: "stocked", title: "Reservas escasas: provisiones suficientes", description: "Tus reservas son mejores de lo habitual. Puedes permitirte una decisión menos desesperada.", add: [choice("conserve", "Conservar las provisiones y descansar", {}, { fatigue: -5, stealth: 1 }, "Mantienes tus reservas y recuperas algo de energía.")] },
      { when: s => s.allies.length > 0 && (s.relationships[s.allies[0]] ?? 0) < 20, id: "strained", title: "Reservas escasas: alianza frágil", description: "La relación con tu aliado es tensa. Compartir comida podría no ser bien recibido.", hide: ["share"] }
    ]
  },
  24: {
    base: event("injury-and-weather", "El terreno cambia", "Una lluvia repentina vuelve resbaladiza la pendiente. La ruta más corta es también la más peligrosa.", [
      choice("climb", "Subir por la pendiente", { health: 35, skill: 45 }, { fatigue: 7, stealth: 2 }, "Superas la pendiente con cuidado."),
      choice("detour", "Tomar el camino largo", {}, { fatigue: 8, health: 2, stealth: 4 }, "El rodeo evita la zona más peligrosa."),
      choice("treat", "Tratar las heridas antes de moverte", { medicine: 1 }, { medicine: -1, health: 14, fatigue: -2 }, "Atiendes tus heridas antes de continuar.")
    ]),
    variants: [
      { when: s => s.health <= 30, id: "wounded", title: "El terreno cambia: herido", description: "Con las heridas actuales, subir por la pendiente sería demasiado arriesgado.", hide: ["climb"], add: [choice("crawl", "Avanzar lentamente por terreno bajo", {}, { fatigue: 4, stealth: 5 }, "Evitas la pendiente y avanzas despacio.")] },
      { when: s => s.inventory.medicine === 0, id: "no-medicine", title: "El terreno cambia: sin medicinas", description: "No te quedan medicinas. Debes elegir una ruta que no agrave tus heridas.", hide: ["treat"] },
      { when: s => s.inventory.water >= 2 && s.health >= 70, id: "prepared", title: "El terreno cambia: bien preparado", description: "Has conservado agua y te encuentras en buenas condiciones. Puedes afrontar el desvío con más margen.", add: [choice("steady", "Avanzar con ritmo constante", {}, { fatigue: 2, stealth: 3 }, "Mantienes un ritmo prudente sin gastar recursos.")] }
    ]
  }
};

function requirementsMet(req = {}, state) {
  if (req.ally && state.allies.length === 0) return false;
  if (req.health != null && state.health < req.health) return false;
  if (req.skill != null && state.skill < req.skill) return false;
  if (req.tools != null && state.inventory.tools < req.tools) return false;
  if (req.water != null && state.inventory.water < req.water) return false;
  if (req.food != null && state.inventory.food < req.food) return false;
  if (req.medicine != null && state.inventory.medicine < req.medicine) return false;
  return true;
}

/** Devuelve una situación adaptada. No modifica el estado recibido. */
export function getDynamicArenaEvent(input = {}) {
  const state = normalizeArenaState(input);
  if (state.mode !== "story" || state.edition !== 50) return null;
  const config = EVENTS[state.turn];
  if (!config) return null;

  let current = structuredClone(config.base);
  const applied = [];
  for (const variant of config.variants) {
    if (!variant.when(state)) continue;
    applied.push(variant.id);
    current.variant = applied.join("+");
    if (variant.title) current.title = variant.title;
    if (variant.description) current.description = variant.description;
    if (variant.hide) current.choices = current.choices.filter(c => !variant.hide.includes(c.id));
    if (variant.add) current.choices.push(...variant.add);
  }
  current.choices = current.choices.filter(c => requirementsMet(c.requires, state));
  current.context = {
    variantIds: applied,
    stateSnapshot: {
      health: state.health, fatigue: state.fatigue, stealth: state.stealth,
      skill: state.skill, inventory: { ...state.inventory },
      allies: [...state.allies]
    }
  };
  return current;
}

/** Aplica la elección a una copia del estado. El llamador persiste el resultado. */
export function applyDynamicArenaChoice(input = {}, eventId, choiceId) {
  const state = normalizeArenaState(input);
  const current = getDynamicArenaEvent(state);
  if (!current || current.id !== eventId) return { ok: false, reason: "event_unavailable" };
  const selected = current.choices.find(c => c.id === choiceId);
  if (!selected) return { ok: false, reason: "choice_unavailable" };

  const next = structuredClone(state);
  const e = selected.effects || {};
  next.health = clamp(next.health + (e.health || 0), 0, 100);
  next.fatigue = clamp(next.fatigue + (e.fatigue || 0), 0, 100);
  next.stealth = clamp(next.stealth + (e.stealth || 0), 0, 100);
  for (const key of ["water", "food", "medicine", "tools"]) {
    next.inventory[key] = clamp(next.inventory[key] + (e[key] || 0), 0, 99);
  }
  if (e.relation && next.allies.length) {
    const ally = next.allies[0];
    next.relationships[ally] = clamp((next.relationships[ally] || 0) + e.relation, 0, 100);
  }
  if (choiceId === "leave" && next.turn === 13) next.flags.rejectedCapitolAid = true;
  next.flags[`arena50_${eventId}_${choiceId}`] = true;
  return { ok: true, state: next, result: selected.result, eventId, choiceId };
}

export const DYNAMIC_ARENA_TURNS = Object.freeze(Object.keys(EVENTS).map(Number));
