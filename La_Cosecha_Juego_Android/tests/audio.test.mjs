// Director de audio: catálogo de cues, contextos, canales de música y ambiente, volumen, silencio,
// y que nada suene todavía (sin archivos ni asignaciones aprobadas).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as AU from '../js/audio.js';
import { DEFAULT_SETTINGS } from '../js/settings.js';

const fakeAudio = log => src => ({ src, loop: false, volume: 1, play() { log.push(['play', src, this.volume]); return Promise.resolve(); }, pause() { log.push(['pause', src]); } });
const tick = () => new Promise(r => setTimeout(r, 0));

test('catálogo de cues de la Entrega Maestra registrado, sin archivos ni asignaciones', () => {
  const ids = Object.keys(AU.CUES);
  assert.equal(ids.filter(i => i.startsWith('mus_')).length, 12);
  assert.equal(ids.filter(i => i.startsWith('amb_')).length, 9);
  assert.equal(ids.filter(i => i.startsWith('sfx_')).length, 9);
  for (const [id, c] of Object.entries(AU.CUES)) { assert.equal(c.src, null, id); assert.equal(c.estado, 'POR_PRODUCIR', id); }
  assert.deepEqual(AU.ASIGNACION, { musica: {}, ambiente: {} });
});

test('nada suena en ningún contexto', async () => {
  const log = [];
  const d = AU.createAudioDirector({ crearAudio: fakeAudio(log), getPrefs: () => DEFAULT_SETTINGS });
  d.desbloquear();
  for (const c of ['menu', 'historia:74', 'historia:74:arena', 'presidencia', 'libre:arena']) d.setContexto(c);
  await tick();
  assert.deepEqual(log, []);
  assert.equal(d.estado().musica.cue, null);
  assert.equal(d.estado().ambiente.cue, null);
});

test('contexto de audio a partir de la partida', () => {
  assert.equal(AU.contextoDeJuego(null), 'menu');
  assert.equal(AU.contextoDeJuego({ mode: 'story', edition: 74, phase: 'training' }), 'historia:74');
  assert.equal(AU.contextoDeJuego({ mode: 'story', edition: 50, phase: 'arena' }), 'historia:50:arena');
  assert.equal(AU.contextoDeJuego({ mode: 'story', edition: 75, phase: 'ending' }), 'historia:75:final');
  assert.equal(AU.contextoDeJuego({ mode: 'free', phase: 'arena' }), 'libre:arena');
  assert.equal(AU.contextoDeJuego({ mode: 'president' }), 'presidencia');
  assert.equal(AU.contextoDeJuego({ mode: 'president', pendingCrisis: {} }), 'presidencia:crisis');
});

// Asignación y archivos de prueba (no son del juego).
const CUES = { m_menu: { tipo: 'musica', src: 'menu.ogg' }, m_pres: { tipo: 'musica', src: 'pres.ogg', volumen: 0.8 }, a_tren: { tipo: 'ambiente', src: 'tren.ogg' }, m_vacio: { tipo: 'musica', src: null } };
const ASIG = { musica: { menu: 'm_menu', presidencia: 'm_pres', historia: 'm_vacio' }, ambiente: { 'historia:74': 'a_tren' } };

test('resolución: del contexto más concreto al más general, y solo cues con archivo', () => {
  assert.equal(AU.resolverPista('presidencia:crisis', 'musica', ASIG, CUES).id, 'm_pres');
  assert.equal(AU.resolverPista('historia:74', 'musica', ASIG, CUES), null, 'cue sin archivo = silencio');
  assert.equal(AU.resolverPista('historia:74:arena', 'ambiente', ASIG, CUES).id, 'a_tren');
  assert.equal(AU.resolverPista('libre', 'musica', ASIG, CUES), null);
});

test('volumen por canal y silencio', () => {
  const p = { ...DEFAULT_SETTINGS, musicVolume: 0.5, ambienceVolume: 0.4 };
  assert.equal(AU.volumenCanal(p, 'musica', { volumen: 0.5 }), 0.25);
  assert.equal(AU.volumenCanal(p, 'ambiente'), 0.4);
  assert.equal(AU.volumenCanal({ ...p, muted: true }, 'ambiente'), 0);
  assert.equal(AU.volumenCanal({ ...p, ambience: false }, 'ambiente'), 0);
  assert.equal(AU.volumenCanal({ ...p, music: false }, 'musica'), 0);
});

test('con archivos de prueba: solo tras un gesto, cambia por contexto, canales independientes y silencio', async () => {
  const log = [];
  let prefs = { ...DEFAULT_SETTINGS, musicVolume: 0.5, ambienceVolume: 0.4 };
  const d = AU.createAudioDirector({ asignacion: ASIG, cues: CUES, crearAudio: fakeAudio(log), getPrefs: () => prefs });
  d.aplicarPreferencias(); await tick();
  assert.equal(log.length, 0, 'sin reproducción automática');
  d.desbloquear(); await tick();
  assert.deepEqual(log.at(-1), ['play', 'menu.ogg', 0.5]);
  d.setContexto('historia:74'); await tick();
  assert.ok(log.some(x => x[0] === 'pause' && x[1] === 'menu.ogg'));
  assert.deepEqual(log.at(-1), ['play', 'tren.ogg', 0.4], 'el ambiente suena aunque la música no tenga archivo');
  prefs = { ...prefs, ambience: false }; d.aplicarPreferencias(); await tick();
  assert.deepEqual(log.at(-1), ['pause', 'tren.ogg']);
  d.setContexto('presidencia'); await tick();
  assert.deepEqual(log.at(-1), ['play', 'pres.ogg', 0.4]);
  prefs = { ...prefs, muted: true }; d.aplicarPreferencias(); await tick();
  assert.deepEqual(log.at(-1), ['pause', 'pres.ogg']);
  assert.equal(d.estado().musica.sonando, false);
});

test('si el audio falla, no rompe el juego', () => {
  const d = AU.createAudioDirector({ asignacion: ASIG, cues: CUES, crearAudio: () => { throw new Error('sin audio'); }, getPrefs: () => DEFAULT_SETTINGS });
  assert.doesNotThrow(() => { d.desbloquear(); d.setContexto('presidencia'); });
});

test('el único audio del proyecto es el OGG original (sin activar) y su máster WAV', () => {
  const archivos = fs.readdirSync(new URL('../assets/audio/', import.meta.url)).sort();
  assert.deepEqual(archivos, ['ambiente-capitolio-master.wav', 'ambiente-capitolio-original.ogg']);
  assert.ok(!Object.values(AU.CUES).some(c => c.src && c.src.includes('ambiente-capitolio')), 'el OGG no está asignado a ningún cue');
});
