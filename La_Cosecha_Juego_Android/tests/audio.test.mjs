// Director de audio: contextos, resolución de pistas, volumen, silencio y que la música siga desactivada.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as AU from '../js/audio.js';
import { DEFAULT_SETTINGS } from '../js/settings.js';

const fakeAudio = log => src => ({ src, loop: false, volume: 1, play() { log.push(['play', src, this.volume]); return Promise.resolve(); }, pause() { log.push(['pause', src]); } });

test('la música no está activada: no hay pistas', () => {
  assert.deepEqual(Object.keys(AU.PISTAS), []);
  const log = [];
  const d = AU.createAudioDirector({ crearAudio: fakeAudio(log), getPrefs: () => DEFAULT_SETTINGS });
  d.desbloquear();
  for (const c of ['menu', 'historia:74', 'historia:74:arena', 'presidencia', 'libre:arena']) d.setContexto(c);
  assert.deepEqual(log, []);
  assert.equal(d.estado().pista, null);
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

test('resolución de pistas: del contexto más concreto al más general', () => {
  const pistas = { historia: { src: 'h.ogg' }, 'historia:74': { src: 'h74.ogg' }, 'historia:74:arena': { src: 'arena74.ogg' } };
  assert.equal(AU.resolverPista('historia:74:arena', pistas).src, 'arena74.ogg');
  assert.equal(AU.resolverPista('historia:74:final', pistas).src, 'h74.ogg');
  assert.equal(AU.resolverPista('historia:50', pistas).src, 'h.ogg');
  assert.equal(AU.resolverPista('presidencia', pistas), null);
});

test('volumen y silencio según las preferencias', () => {
  assert.equal(AU.volumenMusica({ ...DEFAULT_SETTINGS, musicVolume: 0.5 }, { volumen: 0.5 }), 0.25);
  assert.equal(AU.volumenMusica({ ...DEFAULT_SETTINGS, muted: true }), 0);
  assert.equal(AU.volumenMusica({ ...DEFAULT_SETTINGS, music: false }), 0);
});

test('con pistas: solo suena tras un gesto, cambia por contexto y respeta el silencio', () => {
  const log = [];
  let prefs = { ...DEFAULT_SETTINGS, musicVolume: 0.5 };
  const d = AU.createAudioDirector({ pistas: { menu: { src: 'menu.ogg' }, presidencia: { src: 'pres.ogg', volumen: 0.8 } }, crearAudio: fakeAudio(log), getPrefs: () => prefs });
  d.setContexto('menu');
  d.aplicarPreferencias();
  assert.equal(log.filter(x => x[0] === 'play').length, 0, 'sin reproducción automática');
  d.desbloquear();
  assert.deepEqual(log.at(-1), ['play', 'menu.ogg', 0.5]);
  d.setContexto('presidencia');
  assert.deepEqual(log.slice(-2), [['pause', 'menu.ogg'], ['play', 'pres.ogg', 0.4]]);
  prefs = { ...prefs, muted: true }; d.aplicarPreferencias();
  assert.deepEqual(log.at(-1), ['pause', 'pres.ogg']);
  assert.equal(d.estado().sonando, false);
  prefs = { ...prefs, muted: false }; d.aplicarPreferencias();
  assert.deepEqual(log.at(-1), ['play', 'pres.ogg', 0.4]);
});

test('no se usa audio de las películas: el único audio del proyecto es el OGG original, sin conectar', () => {
  const dir = new URL('../assets/audio/', import.meta.url);
  const archivos = fs.readdirSync(dir).sort();
  assert.deepEqual(archivos, ['ambiente-capitolio-master.wav', 'ambiente-capitolio-original.ogg']);
  assert.equal(Object.values(AU.PISTAS).length, 0, 'el OGG sigue sin activarse hasta que lo decida la dirección musical');
});
