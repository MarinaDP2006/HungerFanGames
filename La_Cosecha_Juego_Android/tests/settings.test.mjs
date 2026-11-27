// Ajustes: sonido, volumen, reducir movimiento y tamaño de texto. Persistencia tras reiniciar la app.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as data from '../js/data.js';
import * as campaigns from '../js/campaigns.js';
import * as WI from '../js/whatif.js';
import * as PR from '../js/presidency.js';
import * as PRE from '../js/campaign-50th-prearena.js';
import * as AD from '../js/campaign-50th-dynamic-adapter.js';
import * as ST from '../js/settings.js';
import * as SV from '../js/saves.js';
import * as DS from '../js/durable-storage.js';
import { GAME_VERSION } from '../js/version.js';

// Almacenamiento compartido entre «arranques»: simula que el dispositivo conserva localStorage.
const memoryStorage = () => { const m = new Map(); return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k), dump: () => Object.fromEntries(m) }; };

// Arranca app.js completo (incluido el arranque: aplica ajustes y muestra la versión).
function boot(storage) {
  const gains = [];
  const classes = new Set(), styleVars = {}, dataset = {};
  const root = { classList: { toggle: (c, on) => (on ? classes.add(c) : classes.delete(c)), contains: c => classes.has(c) }, style: { setProperty: (k, v) => (styleVars[k] = v) }, dataset };
  const el = () => ({ textContent: '', innerHTML: '', value: '' });
  const nodes = { '#screen': el(), '#save-indicator': el(), '#game-version': el() };
  let click = null, change = null;
  const document = { documentElement: root, querySelector: s => nodes[s] || null, createElement: () => ({ click() {} }), addEventListener: (t, fn) => { if (t === 'click') click = fn; if (t === 'change') change = fn; } };
  class AudioContext { constructor() { this.currentTime = 0; this.destination = {}; } createOscillator() { return { connect() {}, type: '', frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} }, start() {}, stop() {} }; } createGain() { return { connect() {}, gain: { setValueAtTime: v => gains.push(v), exponentialRampToValueAtTime() {} } }; } }
  const ctx = { ...data, ...campaigns, ...PRE, ...AD, ST, SV, DS, GAME_VERSION, WI, PR, Proxy, document, console, Math, Date, JSON, Number, String, Array, Object, Map, Set,
    localStorage: storage, alert() {}, navigator: {}, window: { AudioContext, addEventListener() {} }, setTimeout, clearTimeout };
  let src = fs.readFileSync(new URL('../js/app.js', import.meta.url), 'utf8').replace(/^import .*\n/gm, '');
  src += `\nglobalThis.api={g:()=>game,set:v=>{game=v},prefs:()=>prefs,settings,sound,setMode:(m,e)=>{mode=m;edition=e},begin,save,load};`;
  vm.runInNewContext(src, ctx, { filename: 'app.js' });
  const press = dataset2 => click({ target: { closest: () => ({ dataset: dataset2, classList: { add() {} }, textContent: '' }) } });
  const slide = value => change({ target: { id: 'set-volume', value: String(value) } });
  return { api: ctx.api, nodes, root, classes, styleVars, gains, press, slide, html: () => nodes['#screen'].innerHTML };
}

test('normalizeSettings: valores por defecto y saneado de datos guardados', () => {
  assert.deepEqual(ST.normalizeSettings(null), ST.DEFAULT_SETTINGS);
  assert.deepEqual(ST.normalizeSettings({ sound: 'sí', volume: 7, reducedMotion: 1, textScale: 2 }), { ...ST.DEFAULT_SETTINGS, volume: 1 });
  assert.equal(ST.normalizeSettings({ volume: -1 }).volume, 0);
  assert.equal(ST.normalizeSettings({ textScale: 1.15 }).textScale, 1.15);
  const s = memoryStorage(); s.setItem(ST.SETTINGS_KEY, '{roto'); assert.deepEqual(ST.loadSettings(s), ST.DEFAULT_SETTINGS);
});

test('la pantalla de Ajustes muestra todos los controles, la versión y las partidas', () => {
  const a = boot(memoryStorage()); a.press({ a: 'settings' }); const h = a.html();
  for (const s of ['data-setting="sound"', 'id="set-volume"', 'data-setting="reducedMotion"', 'data-text-scale="0.9"', 'data-text-scale="1.3"', 'PARTIDAS GUARDADAS', `versión ${GAME_VERSION}`])
    assert.ok(h.includes(s), s);
  assert.equal(a.nodes['#game-version'].textContent, `Versión ${GAME_VERSION}`, 'versión en el pie');
});

test('cada ajuste se aplica y persiste tras reiniciar la app', () => {
  const storage = memoryStorage();
  let a = boot(storage);
  a.press({ a: 'settings' });
  a.press({ setting: 'reducedMotion' }); a.press({ textScale: '1.3' }); a.slide(35); a.press({ setting: 'sound' });
  assert.deepEqual(a.api.prefs(), { sound: false, volume: 0.35, reducedMotion: true, textScale: 1.3 });
  assert.ok(a.classes.has('reduce-motion')); assert.equal(a.styleVars['--text-scale'], '1.3');
  // Reinicio: nueva instancia de la app sobre el mismo almacenamiento.
  a = boot(storage);
  assert.deepEqual(a.api.prefs(), { sound: false, volume: 0.35, reducedMotion: true, textScale: 1.3 }, 'se recuperan');
  assert.ok(a.classes.has('reduce-motion'), 'se aplican al arrancar'); assert.equal(a.styleVars['--text-scale'], '1.3');
  a.press({ a: 'settings' }); assert.ok(a.html().includes('aria-checked="true"'), 'la pantalla refleja el estado');
});

test('sonido: desactivado no suena; el volumen escala la ganancia', () => {
  const storage = memoryStorage();
  let a = boot(storage); a.api.sound('click'); const full = a.gains.slice();
  assert.ok(full.length > 0, 'con sonido activado se generan tonos');
  a.slide(50); a.gains.length = 0; a.api.sound('click');
  assert.ok(Math.abs(a.gains[0] - full[0] * (0.5 / 0.7)) < 1e-9, 'la ganancia es proporcional al volumen');
  a.slide(0); a.gains.length = 0; a.api.sound('click'); assert.equal(a.gains.length, 0, 'volumen 0: silencio');
  a.slide(70); a.press({ a: 'settings' }); a.press({ setting: 'sound' }); a.gains.length = 0; a.api.sound('click');
  assert.equal(a.gains.length, 0, 'sonido desactivado: silencio');
  a = boot(storage); a.gains.length = 0; a.api.sound('click'); assert.equal(a.gains.length, 0, 'sigue desactivado tras reiniciar');
});

test('los ajustes no se tocan al guardar, cargar o borrar partidas', () => {
  const storage = memoryStorage(); const a = boot(storage);
  a.press({ a: 'settings' }); a.press({ textScale: '1.15' });
  a.api.setMode('story', 74); a.api.begin(); a.api.save(); a.press({ slotDelete: '1' }); a.press({ slotDeleteConfirm: '1' });
  assert.equal(boot(storage).api.prefs().textScale, 1.15);
});
