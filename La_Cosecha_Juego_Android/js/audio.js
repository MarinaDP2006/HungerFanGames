// Director de audio del videojuego: qué música corresponde a cada momento y con qué volumen.
//
// La música todavía NO está activada: PISTAS está vacío. Qué suena en cada contexto lo decide la
// dirección musical; cuando llegue, basta con rellenar PISTAS (o pasarlas al crear el director).
// No se usa música ni audio extraído de las películas.
//
// Contextos (de más general a más concreto, separados por «:»):
//   menu · historia · historia:50 · historia:50:arena · historia:74:final · libre · libre:arena
//   presidencia · presidencia:crisis · escena:<id>
// Si no hay pista para «historia:74:arena», se busca «historia:74» y después «historia».

export const CONTEXTOS = Object.freeze({
  menu: 'Menú principal, Ajustes, Partidas y Códice',
  historia: 'Modo Historia: selección y campañas',
  libre: 'Modo Libre',
  presidencia: 'Modo Presidente',
  arena: 'Arena (como sufijo: historia:74:arena, libre:arena)',
  final: 'Finales (como sufijo: historia:50:final)',
  escena: 'Escenas especiales, con su identificador (escena:desfile-50)',
});

// contexto → { src, volumen (0–1, relativo a la música), bucle }. Vacío hasta que haya dirección musical.
export const PISTAS = Object.freeze({});

// Contexto de audio a partir del estado de la partida.
export function contextoDeJuego(game) {
  if (!game) return 'menu';
  if (game.mode === 'president') return game.pendingCrisis ? 'presidencia:crisis' : 'presidencia';
  const base = game.mode === 'story' ? `historia:${game.edition}` : 'libre';
  if (game.phase === 'arena') return `${base}:arena`;
  if (game.phase === 'ending') return `${base}:final`;
  return base;
}

export function resolverPista(contexto, pistas = PISTAS) {
  let c = String(contexto || '');
  while (c) {
    if (pistas[c]) return { contexto: c, ...pistas[c] };
    c = c.includes(':') ? c.slice(0, c.lastIndexOf(':')) : '';
  }
  return null;
}

// Volumen final de la música (0–1) según las preferencias del jugador.
export function volumenMusica(prefs, pista) {
  if (!prefs || prefs.muted || !prefs.music) return 0;
  const v = Number(prefs.musicVolume) * (pista?.volumen ?? 1);
  return Math.max(0, Math.min(1, Number.isFinite(v) ? v : 0));
}

// crearAudio(src) devuelve un objeto con play(), pause(), volume, loop (un HTMLAudioElement en el juego).
// La música solo empieza tras un gesto del jugador (desbloquear), nunca por reproducción automática.
export function createAudioDirector({ pistas = PISTAS, crearAudio = src => new Audio(src), getPrefs = () => ({}) } = {}) {
  let contexto = 'menu', actual = null, audio = null, desbloqueado = false;
  const parar = () => { if (audio) { try { audio.pause(); } catch {} } audio = null; actual = null; };
  function actualizar() {
    const pista = resolverPista(contexto, pistas);
    const vol = volumenMusica(getPrefs(), pista);
    if (!pista || vol === 0) return parar();
    if (!actual || actual.src !== pista.src) {
      parar();
      audio = crearAudio(pista.src);
      audio.loop = pista.bucle !== false;
      actual = pista;
    }
    audio.volume = vol;
    if (desbloqueado) Promise.resolve(audio.play?.()).catch(() => {});
  }
  return {
    setContexto(c) { if (c !== contexto) { contexto = c; actualizar(); } return contexto; },
    aplicarPreferencias: actualizar,
    desbloquear() { if (!desbloqueado) { desbloqueado = true; actualizar(); } },
    estado: () => ({ contexto, pista: actual?.src ?? null, sonando: !!audio && desbloqueado, volumen: audio ? audio.volume : 0 }),
  };
}
