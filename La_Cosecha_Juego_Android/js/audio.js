// Director de audio del videojuego: qué música y qué ambiente corresponden a cada momento, y con qué volumen.
//
// NADA SUENA TODAVÍA. El catálogo de cues (IDs de la Entrega Maestra v1, 07_AUDIO) está registrado sin
// archivos (src: null), y la asignación de cues a contextos está vacía: la decide la dirección musical.
// Cuando llegue un archivo con licencia, se rellena su `src` y su asignación; el código no cambia.
// No se usa música ni audio extraído de las películas. El OGG existente no se activa hasta confirmar
// procedencia y licencia (Entrega Maestra, 05_Arte_Audio_Diseno_v1).
//
// Contextos (de más general a más concreto, separados por «:»):
//   menu · historia · historia:50 · historia:50:arena · historia:74:final · libre · libre:arena
//   presidencia · presidencia:crisis · escena:<id>
// Si no hay cue para «historia:74:arena», se busca «historia:74» y después «historia».

export const CANALES = ['musica', 'ambiente'];

// Catálogo de la guía de música y sonido. estado: POR_PRODUCIR | APPROVED | INTEGRATED.
const cue = (tipo, uso) => Object.freeze({ tipo, uso, src: null, estado: 'POR_PRODUCIR' });
export const CUES = Object.freeze({
  mus_menu_panem: cue('musica', 'Menú'),
  mus_district_ambient: cue('musica', 'Distritos'),
  mus_reaping: cue('musica', 'Cosecha'),
  mus_train: cue('musica', 'Tren'),
  mus_capitol: cue('musica', 'Capitolio'),
  mus_parade: cue('musica', 'Desfile'),
  mus_training: cue('musica', 'Entrenamiento'),
  mus_interview: cue('musica', 'Entrevista'),
  mus_arena: cue('musica', 'Arena'),
  mus_rebellion: cue('musica', 'Rebelión'),
  mus_war: cue('musica', 'Guerra'),
  mus_epilogue: cue('musica', 'Final'),
  amb_district_mining: cue('ambiente', 'Distrito minero'),
  amb_capitol_station: cue('ambiente', 'Estación del Capitolio'),
  amb_train_interior: cue('ambiente', 'Interior del tren'),
  amb_training_center: cue('ambiente', 'Centro de Entrenamiento'),
  amb_parade_crowd: cue('ambiente', 'Público del desfile'),
  amb_arena_forest: cue('ambiente', 'Arena del bosque'),
  amb_arena_clock: cue('ambiente', 'Arena del reloj'),
  amb_rebel_base: cue('ambiente', 'Base rebelde'),
  amb_war_city: cue('ambiente', 'Ciudad en guerra'),
  sfx_ui_confirm: cue('efecto', 'Confirmar'),
  sfx_ui_back: cue('efecto', 'Volver'),
  sfx_ui_error: cue('efecto', 'Error'),
  sfx_reaping_name: cue('efecto', 'Nombre en la cosecha'),
  sfx_train_door: cue('efecto', 'Puerta del tren'),
  sfx_platform_rise: cue('efecto', 'Plataforma de lanzamiento'),
  sfx_map_select: cue('efecto', 'Selección en el mapa'),
  sfx_resource_gain: cue('efecto', 'Recurso obtenido'),
  sfx_notification: cue('efecto', 'Aviso'),
});

// Qué cue suena en cada contexto, por canal. Vacío hasta la dirección musical.
export const ASIGNACION = Object.freeze({ musica: Object.freeze({}), ambiente: Object.freeze({}) });

// Contexto de audio a partir del estado de la partida.
export function contextoDeJuego(game) {
  if (!game) return 'menu';
  if (game.mode === 'president') return game.pendingCrisis ? 'presidencia:crisis' : 'presidencia';
  const base = game.mode === 'story' ? `historia:${game.edition}` : 'libre';
  if (game.phase === 'arena') return `${base}:arena`;
  if (game.phase === 'ending') return `${base}:final`;
  return base;
}

// Cue reproducible para un contexto y canal: el más concreto con archivo; null si no hay.
export function resolverPista(contexto, canal = 'musica', asignacion = ASIGNACION, cues = CUES) {
  const mapa = asignacion[canal] || {};
  let c = String(contexto || '');
  while (c) {
    const id = mapa[c];
    if (id && cues[id]?.src) return { contexto: c, id, ...cues[id] };
    c = c.includes(':') ? c.slice(0, c.lastIndexOf(':')) : '';
  }
  return null;
}

// Volumen final (0–1) de un canal según las preferencias del jugador.
export function volumenCanal(prefs, canal, pista) {
  if (!prefs || prefs.muted) return 0;
  const [on, vol] = canal === 'ambiente' ? [prefs.ambience, prefs.ambienceVolume] : [prefs.music, prefs.musicVolume];
  if (!on) return 0;
  const v = Number(vol) * (pista?.volumen ?? 1);
  return Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0));
}
export const volumenMusica = (prefs, pista) => volumenCanal(prefs, 'musica', pista);

// crearAudio(src) devuelve un objeto con play(), pause(), volume y loop (HTMLAudioElement en el juego).
// Solo suena tras un gesto del jugador (desbloquear), nunca por reproducción automática.
// Si el audio falla, el juego sigue: los errores de reproducción se ignoran.
export function createAudioDirector({ asignacion = ASIGNACION, cues = CUES, crearAudio = src => new Audio(src), getPrefs = () => ({}) } = {}) {
  let contexto = 'menu', desbloqueado = false;
  const canal = Object.fromEntries(CANALES.map(c => [c, { actual: null, audio: null }]));
  const parar = c => { const k = canal[c]; if (k.audio) { try { k.audio.pause(); } catch {} } k.audio = null; k.actual = null; };
  function actualizar() {
    for (const c of CANALES) {
      const pista = resolverPista(contexto, c, asignacion, cues);
      const vol = volumenCanal(getPrefs(), c, pista);
      const k = canal[c];
      if (!pista || vol === 0) { parar(c); continue; }
      if (!k.actual || k.actual.src !== pista.src) {
        parar(c);
        try { k.audio = crearAudio(pista.src); k.audio.loop = pista.bucle !== false; k.actual = pista; } catch { k.audio = null; continue; }
      }
      k.audio.volume = vol;
      if (desbloqueado) Promise.resolve().then(() => k.audio?.play?.()).catch(() => {});
    }
  }
  return {
    setContexto(c) { if (c !== contexto) { contexto = c; actualizar(); } return contexto; },
    aplicarPreferencias: actualizar,
    desbloquear() { if (!desbloqueado) { desbloqueado = true; actualizar(); } },
    estado: () => ({
      contexto,
      ...Object.fromEntries(CANALES.map(c => [c, { cue: canal[c].actual?.id ?? null, sonando: !!canal[c].audio && desbloqueado, volumen: canal[c].audio ? canal[c].audio.volume : 0 }])),
    }),
  };
}
