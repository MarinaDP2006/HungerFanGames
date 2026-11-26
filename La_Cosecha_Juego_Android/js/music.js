/**
 * Música ambiental original de La Cosecha.
 * No contiene samples ni melodías extraídas de las películas.
 * Uso: import { createMusicController } from './music.js';
 */
export function createMusicController({
  src = 'assets/audio/ambiente-capitolio-original.ogg',
  volume = 0.22,
  enabled = true,
} = {}) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = Math.max(0, Math.min(1, volume));
  let wanted = Boolean(enabled);
  let unlocked = false;

  async function playIfAllowed() {
    if (!wanted || !unlocked) return false;
    try {
      await audio.play();
      return true;
    } catch {
      // El navegador/Android puede exigir otro gesto explícito del usuario.
      return false;
    }
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    void playIfAllowed();
  }

  function setEnabled(value) {
    wanted = Boolean(value);
    if (wanted) {
      if (!unlocked) unlock();
      else void playIfAllowed();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    return wanted;
  }

  function toggle() { return setEnabled(!wanted); }

  function setVolume(value) {
    const n = Number(value);
    if (Number.isFinite(n)) audio.volume = Math.max(0, Math.min(1, n));
    return audio.volume;
  }

  function stop() {
    audio.pause();
    audio.currentTime = 0;
  }

  // La música solo comienza tras interacción real, nunca por autoplay forzado.
  document.addEventListener('pointerdown', unlock, { once: true, passive: true });
  document.addEventListener('keydown', unlock, { once: true });

  return {
    unlock,
    start: () => { wanted = true; unlock(); return playIfAllowed(); },
    pause: () => { audio.pause(); },
    stop,
    toggle,
    setEnabled,
    setVolume,
    get enabled() { return wanted; },
    get volume() { return audio.volume; },
    get playing() { return !audio.paused; },
    destroy() {
      stop();
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
      audio.removeAttribute('src');
      audio.load();
    },
  };
}
