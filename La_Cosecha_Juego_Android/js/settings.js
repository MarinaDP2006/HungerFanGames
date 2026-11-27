// Preferencias del jugador (Ajustes). Se guardan aparte de las partidas, en su propia clave,
// para que borrar o cargar una partida no las cambie.
export const SETTINGS_KEY = 'laCosechaSettings';
export const TEXT_SCALES = [0.9, 1, 1.15, 1.3];
// sound/volume: efectos. music/musicVolume: música. ambience/ambienceVolume: ambiente. muted: silencia todo.
// Las preferencias guardadas antes no tienen los campos nuevos: toman estos valores.
export const DEFAULT_SETTINGS = Object.freeze({ sound: true, volume: 0.7, music: true, musicVolume: 0.6, ambience: true, ambienceVolume: 0.5, muted: false, reducedMotion: false, textScale: 1 });

const isObj = v => v && typeof v === 'object' && !Array.isArray(v);

// Normaliza cualquier valor guardado: tipos correctos, volumen entre 0 y 1 y tamaño de texto permitido.
export function normalizeSettings(raw) {
  const s = { ...DEFAULT_SETTINGS };
  if (!isObj(raw)) return s;
  if (typeof raw.sound === 'boolean') s.sound = raw.sound;
  for (const k of ['reducedMotion', 'music', 'ambience', 'muted']) if (typeof raw[k] === 'boolean') s[k] = raw[k];
  for (const k of ['volume', 'musicVolume', 'ambienceVolume']) {
    const v = raw[k] == null ? NaN : Number(raw[k]);
    if (Number.isFinite(v)) s[k] = Math.round(Math.max(0, Math.min(1, v)) * 100) / 100;
  }
  const t = Number(raw.textScale);
  if (TEXT_SCALES.includes(t)) s.textScale = t;
  return s;
}

export function loadSettings(storage) {
  try { return normalizeSettings(JSON.parse(storage.getItem(SETTINGS_KEY))); }
  catch { return { ...DEFAULT_SETTINGS }; }
}

export function saveSettings(storage, settings) {
  const s = normalizeSettings(settings);
  storage.setItem(SETTINGS_KEY, JSON.stringify(s));
  return s;
}

// Aplica las preferencias al documento: clase para reducir movimiento y variable de escala de texto.
export function applySettings(settings, doc) {
  const root = doc?.documentElement;
  if (!root) return;
  root.classList?.toggle?.('reduce-motion', !!settings.reducedMotion);
  root.style?.setProperty?.('--text-scale', String(settings.textScale));
  if (root.dataset) {
    root.dataset.textScale = String(settings.textScale);
    root.dataset.sound = settings.sound && !settings.muted ? 'on' : 'off';
    root.dataset.music = settings.music && !settings.muted ? 'on' : 'off';
  }
}
