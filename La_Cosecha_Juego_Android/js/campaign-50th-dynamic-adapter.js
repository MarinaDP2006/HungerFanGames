// campaign-50th-dynamic-adapter.js
// Adaptación de las variaciones 5.5 al motor real de La Cosecha (diseño de la revisión técnica).
// Solo modifica textos y etiquetas de los 8 acontecimientos existentes del 50.º Vasallaje.
// No crea turnos, acontecimientos ni encuentros adicionales, y conserva identificadores y efectos.
//
// Correcciones sobre el borrador:
// 1. Variantes inalcanzables: en el turno 1 la salud siempre es 100 y en el turno 4 el agua solo
//    se consigue en ese mismo turno. Se mantienen esas variantes (servirán cuando 5.1 cambie el
//    estado previo) y se añaden otras que sí dependen de lo que el jugador ya ha hecho.
// 2. Las etiquetas alternativas se perdían si no había otra variante activa: ahora cuentan.
// 3. El inventario no reconocía la mochila de la Cornucopia: se cuenta como suministros.
//
// Conexión con 5.1: las decisiones previas a la Arena se guardan como indicadores «50th-…»
// (applyPreArena50ToGame) y como estadísticas en game.preArena50. El adaptador lee ambos.

const clamp = (n, min, max) => Math.max(min, Math.min(max, Number(n) || 0));

export function inventoryState(items = []) {
  const list = Array.isArray(items) ? items.map(String) : [];
  const count = pattern => list.filter(x => pattern.test(x)).length;
  return {
    water: count(/agua|cantimplora/i),
    food: count(/ración|comida|alimento|bayas/i),
    medicine: count(/botiquín|medicina|venda/i),
    tools: count(/cuchillo|herramienta|cable|kit/i),
    supplies: count(/mochila|saco/i)
  };
}

export function adaptDynamic50Event(game, event) {
  if (!game || !event || game.mode !== 'story' || Number(game.edition) !== 50) return event;

  const turn = Number(event.turn ?? game.arenaTurn ?? 0);
  if (turn < 1 || turn > 8) return event;

  const rawFlags = game.flags || {};
  // Un indicador cuenta tanto si lo puso el motor como si viene de la precampaña 5.1.
  const flags = new Proxy(rawFlags, { get: (f, k) => typeof k === 'string' ? (f[k] || f[`50th-${k}`]) : undefined });
  const pre = game.preArena50?.stats || {};
  const inventory = inventoryState(game.inventory);
  const maysilee = game.tributes?.find(t => t.name === 'Maysilee Donner');
  const state = {
    health: clamp(game.health, 0, 100),
    fatigue: clamp(game.fatigue, 0, 100),
    thirst: clamp(game.thirst, 0, 100),
    stealth: clamp(game.stealth, 0, 100),
    skill: clamp(game.skill, 0, 20),
    support: clamp(game.support, 0, 100),
    rebellion: clamp(game.rebellion, 0, 100),
    maysileeRelation: Number(game.relationships?.maysilee ?? 0),
    maysileeAlly: maysilee?.alliance === 'player',
    maysileeAlive: maysilee ? maysilee.alive !== false : false,
    observation: Number(pre.observation || 0),
    suspicion: Number(pre.suspicion || 0)
  };

  const variants = [];
  const notes = [];
  const labels = {};
  const add = (id, note) => { variants.push(id); if (note) notes.push(note); };

  switch (turn) {
    case 1:
      if (state.health <= 45) {
        add('cornucopia-wounded', 'Las heridas hacen que cualquier movimiento brusco pueda costarte fuerzas.');
        labels.grab = 'Intentar alcanzar un arma pese a las heridas';
      } else if (state.skill >= 9) {
        add('cornucopia-prepared', 'Tu entrenamiento te permite valorar mejor los riesgos de la Cornucopia.');
        labels.grab = 'Aprovechar tu entrenamiento para alcanzar un arma';
      } else if (state.skill <= 6) {
        add('cornucopia-inexperienced', 'Sabes que no estás preparado para pelear en el centro de la Cornucopia.');
      }
      if (flags.trainedCombat50 && state.health > 45) {
        add('cornucopia-combat-training', 'Lo que practicaste en el centro de entrenamiento vuelve a tus manos.');
        labels.grab = 'Usar lo que practicaste en combate para alcanzar un arma';
      } else if (flags.trainedSurvival50) {
        add('cornucopia-survival-training', 'El entrenamiento de supervivencia te recuerda que un arma no sirve de nada sin agua ni refugio.');
      }
      break;

    case 2:
      if (state.maysileeRelation >= 3 || state.maysileeAlly) {
        add('alliance-trust', 'La confianza que has construido con Maysilee influye en cómo interpretas sus señales.');
        labels.protect = 'Reforzar la alianza con Maysilee';
      } else if (state.maysileeRelation < 0) {
        add('alliance-distance', 'Las decisiones anteriores han dejado cierta distancia entre ambos.');
        labels.cautious = 'Mantener la distancia y dejar una advertencia';
      }
      if (flags.enteredArenaAlone && !state.maysileeAlly) {
        add('alliance-solo', 'Anoche decidiste entrar solo. Maysilee lo recuerda.');
      }
      if (inventory.tools > 0) {
        add('alliance-armed', 'Llevas un cuchillo de la Cornucopia: puedes ofrecer protección, o imponer condiciones.');
      }
      break;

    case 3:
      if (state.fatigue >= 60) {
        add('shelter-exhaustion', 'El cansancio acumulado vuelve más difícil mantener la vigilancia durante la noche.');
      }
      if (state.maysileeAlly) {
        add('shelter-alliance', 'La alianza permite plantear un refugio compartido.');
        labels.share = 'Compartir el refugio y organizar la vigilancia';
      }
      if (state.stealth >= 3) {
        add('shelter-stealth', 'Has aprendido a reducir tu exposición y puedes aprovechar mejor la cobertura.');
      }
      break;

    case 4:
      if (state.thirst >= 50 && inventory.water === 0) {
        add('water-depleted', 'La sed empieza a afectar a tus decisiones. El agua del arroyo sigue siendo peligrosa.');
      }
      if (inventory.water > 0) {
        add('water-reserve', 'Conservas una pequeña reserva y no dependes exclusivamente del arroyo.');
      } else if (inventory.supplies > 0) {
        add('water-supplies', 'La mochila de la Cornucopia te da algo de margen, pero no lleva agua en la que confíes.');
      }
      if (state.health <= 45) {
        add('water-wounded', 'Tu estado físico reduce el margen para asumir riesgos.');
      }
      if (flags.trainedSurvival50) {
        add('water-survival', 'Lo que aprendiste de plantas en el centro de entrenamiento te hace desconfiar de todo lo que brilla.');
      }
      if (state.support >= 25) {
        add('water-sponsors', 'Tu apoyo en el Capitolio hace pensar que un patrocinador podría responder.');
      }
      break;

    case 5:
      if (flags.forcefieldStudied || flags.forcefieldTested) {
        add('forcefield-studied', 'Ya has observado el comportamiento de la barrera. Puedes contrastar lo aprendido.');
        labels.study = 'Contrastar el patrón del campo de fuerza';
      } else if (state.skill >= 10 || state.observation >= 5 || flags.studiedCareers50 || flags.watchedParade50) {
        add('forcefield-observant', 'Tu habilidad y capacidad de observación te ayudan a detectar irregularidades.');
      }
      break;

    case 6:
      if (state.support >= 35) {
        add('broadcast-support', 'La audiencia ya conoce tu historia y tu comportamiento ante las cámaras tiene más peso.');
        labels.family = 'Hablar a la cámara con el respaldo de la audiencia';
      }
      if (state.rebellion >= 20 || flags.watchedGamemakers || flags.interviewDefiance50 || flags.defiedCapitolArrival || flags.defiedParade50 || state.suspicion >= 5) {
        add('broadcast-defiance', 'Tus decisiones anteriores han llamado la atención de los Vigilantes.');
      }
      if (flags.interviewHuman50) {
        add('broadcast-interview-human', 'En la entrevista hablaste de las personas que quieres proteger. La audiencia espera verlas en tus palabras.');
      } else if (flags.interviewMask50) {
        add('broadcast-interview-mask', 'En la entrevista no les diste nada. Las cámaras siguen buscando una grieta.');
        labels.mask = 'Mantener la máscara de la entrevista';
      }
      break;

    case 7:
      if (state.maysileeRelation >= 3) {
        add('birds-trust', 'La confianza construida con Maysilee condiciona tu reacción.');
        labels.shield = 'Proteger a Maysilee con la confianza que habéis construido';
      } else {
        add('birds-no-alliance');
        labels.shield = 'Intentar proteger a Maysilee sin una alianza consolidada';
      }
      if (state.health <= 45) {
        add('birds-injured', 'Tus heridas hacen que intervenir resulte todavía más peligroso.');
      }
      break;

    case 8:
      if (flags.forcefieldStudied || flags.forcefieldTested) {
        add('final-forcefield', 'Conoces parte del comportamiento de la barrera y puedes utilizar esa información.');
        labels.exploit = 'Aprovechar el patrón que has estudiado';
      } else {
        add('final-unknown', 'Todavía no conoces suficientemente el comportamiento del campo de fuerza.');
      }
      if (state.health <= 35) {
        add('final-wounded', 'Tu estado físico deja muy poco margen para un error.');
      }
      break;
  }

  if (!variants.length && !Object.keys(labels).length) return event;

  // Conserva todos los identificadores y efectos originales; solo cambia el texto visible.
  const choices = (event.choices || []).map(choice => {
    if (Array.isArray(choice)) return [choice[0], labels[choice[0]] || choice[1], ...choice.slice(2)];
    return { ...choice, label: labels[choice.id] || choice.label };
  });

  return {
    ...event,
    body: [event.body, ...notes].filter(Boolean).join(' '),
    choices,
    dynamic50: {
      turn,
      variants,
      state: {
        health: state.health, fatigue: state.fatigue, thirst: state.thirst, stealth: state.stealth,
        skill: state.skill, maysileeRelation: state.maysileeRelation, inventory
      }
    }
  };
}
