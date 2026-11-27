// Ranuras de guardado: migración de la ranura única, aislamiento, recuperación, borrado con
// confirmación, exportación e importación. Se usa el juego real (app.js y su manejador de clics).
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
import * as AU from '../js/audio.js';
import { GAME_VERSION } from '../js/version.js';

const memoryStorage = () => { const m = new Map(); return { getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k), keys: () => [...m.keys()] }; };
function boot(storage) {
  const alerts = []; let click = null, lastBlob = null;
  const el = () => ({ textContent: '', innerHTML: '', value: '' });
  const nodes = { '#screen': el(), '#save-indicator': el() };
  const document = { documentElement: { classList: { toggle() {} }, style: { setProperty() {} }, dataset: {} }, querySelector: s => nodes[s] || null, createElement: () => ({ click() {} }), addEventListener: (t, fn) => { if (t === 'click') click = fn; } };
  class Blob { constructor(p) { lastBlob = p.join(''); } }
  const ctx = { ...data, ...campaigns, ...PRE, ...AD, ST, SV, DS, AU, GAME_VERSION, WI, PR, Proxy, document, console, Math, Date, JSON, Number, String, Array, Object, Map, Set, Blob,
    URL: { createObjectURL: () => 'blob:x', revokeObjectURL() {} }, localStorage: storage, alert: m => alerts.push(m), navigator: {}, window: { addEventListener() {} }, setTimeout, clearTimeout };
  let src = fs.readFileSync(new URL('../js/app.js', import.meta.url), 'utf8').replace(/^import .*\n/gm, '');
  src += `\nglobalThis.api={g:()=>game,set:v=>{game=v},setMode:(m,e)=>{mode=m;edition=e},begin,save,load,exportSave,importSaveFile,triggerCampaignEvent};`;
  vm.runInNewContext(src, ctx, { filename: 'app.js' });
  const press = d => click({ target: { closest: () => ({ dataset: d, classList: { add() {} }, textContent: '' }) } });
  return { api: ctx.api, alerts, nodes, press, html: () => nodes['#screen'].innerHTML, blob: () => lastBlob };
}
const newStory = (a, ed) => { a.api.setMode('story', ed); a.api.begin(); return a.api.g(); };

test('formato del registro: versión de guardado, versión del juego y ranura', () => {
  const s = memoryStorage(); const a = boot(s); const g = newStory(a, 74); a.api.save();
  const rec = JSON.parse(s.getItem('laCosechaSave:1'));
  assert.equal(rec.format, 'la-cosecha-save'); assert.equal(rec.saveVersion, SV.SAVE_VERSION); assert.equal(rec.gameVersion, GAME_VERSION);
  assert.equal(rec.slot, 1); assert.ok(Date.parse(rec.savedAt)); assert.equal(rec.game.edition, g.edition);
});

test('migración: la ranura única antigua pasa a la ranura 1 sin perder datos ni borrar la clave antigua', () => {
  const s = memoryStorage();
  // Partida real de la versión anterior (objeto de juego sin envoltorio en la clave única).
  const prev = boot(memoryStorage()); const old = newStory(prev, 75); old.health = 61; old.flags = { clockPlan: true }; old.inventory = ['arco'];
  s.setItem('laCosechaSave', JSON.stringify(old));
  const a = boot(s); assert.equal(a.api.load(1), true);
  const g = a.api.g(); assert.equal(g.edition, 75); assert.equal(g.health, 61); assert.equal(g.flags.clockPlan, true); assert.deepEqual([...g.inventory], ['arco']);
  assert.ok(s.getItem('laCosechaSave'), 'la clave antigua se conserva'); assert.equal(s.getItem('laCosechaSaveMigrated'), '1');
  const rec = JSON.parse(s.getItem('laCosechaSave:1')); assert.equal(rec.migratedFrom, 'laCosechaSave'); assert.equal(rec.saveVersion, SV.SAVE_VERSION);
  // Una vez migrada, una partida nueva no la pisa: va a la primera ranura libre.
  newStory(a, 74); a.api.save(); assert.equal(a.api.g().saveSlot, 2);
  assert.equal(JSON.parse(s.getItem('laCosechaSave:1')).game.edition, 75);
});

test('migración: se respeta en el panel de partidas aunque no se cargue', () => {
  const s = memoryStorage(); s.setItem('laCosechaSave', JSON.stringify({ mode: 'president', day: 9, districts: [], president: { name: 'Prueba' } }));
  const a = boot(s); a.press({ a: 'load' });
  assert.match(a.html(), /Ranura 1[\s\S]*Presidencia[\s\S]*Día 9/); assert.match(a.html(), /data-slot-load="1"/);
});

test('aislamiento: tres partidas en tres ranuras no se mezclan', () => {
  const s = memoryStorage(); const a = boot(s);
  const games = [50, 74, 75].map(ed => { const g = newStory(a, ed); g.health = 40 + ed % 10; a.api.save(); return { ed, slot: a.api.g().saveSlot, health: g.health }; });
  assert.deepEqual(games.map(x => x.slot), [1, 2, 3]);
  for (const x of games) { const b = boot(s); assert.equal(b.api.load(x.slot), true); assert.equal(b.api.g().edition, x.ed); assert.equal(b.api.g().health, x.health); }
  // Guardar en una no cambia las otras.
  const b = boot(s); b.api.load(2); b.api.g().health = 1; b.api.save();
  assert.equal(JSON.parse(s.getItem('laCosechaSave:1')).game.health, games[0].health);
  assert.equal(JSON.parse(s.getItem('laCosechaSave:3')).game.health, games[2].health);
  assert.equal(JSON.parse(s.getItem('laCosechaSave:2')).game.health, 1);
});

test('recuperación: cargar tras reiniciar continúa exactamente donde se guardó', () => {
  const s = memoryStorage(); const a = boot(s); const g = newStory(a, 50);
  for (const id of ['watch', 'memorize', 'silence']) a.press({ pre50Choice: id });
  assert.equal(g.saveSlot, 1, 'el autoguardado del 50.º usa la primera ranura libre');
  const b = boot(s); b.press({ a: 'load' }); b.press({ slotLoad: '1' });
  const r = b.api.g(); assert.equal(r.phase, 'prearena50'); assert.equal(r.preArena50.index, 3); assert.equal(r.tributes.length, 48);
  assert.match(b.nodes['#save-indicator'].textContent, /CARGADO · RANURA 1/);
});

test('borrar exige confirmación y solo borra esa ranura', () => {
  const s = memoryStorage(); const a = boot(s);
  newStory(a, 74); a.api.save(); newStory(a, 75); a.api.save();
  a.press({ a: 'load' }); a.press({ slotDelete: '1' });
  assert.ok(s.getItem('laCosechaSave:1'), 'el primer clic no borra'); assert.match(a.html(), /Esta acción no se puede deshacer/); assert.match(a.html(), /data-slot-delete-confirm="1"/);
  a.press({ slotDeleteCancel: '1' }); assert.ok(s.getItem('laCosechaSave:1'), 'cancelar no borra');
  a.press({ slotDelete: '1' }); a.press({ slotDeleteConfirm: '2' }); assert.ok(s.getItem('laCosechaSave:2'), 'confirmar otra ranura no borra');
  a.press({ slotDelete: '1' }); a.press({ slotDeleteConfirm: '1' });
  assert.equal(s.getItem('laCosechaSave:1'), null, 'borrada'); assert.ok(s.getItem('laCosechaSave:2'), 'la ranura 2 sigue');
});

test('borrar la ranura 1 no hace reaparecer la partida antigua migrada', () => {
  const s = memoryStorage(); s.setItem('laCosechaSave', JSON.stringify({ mode: 'story', edition: 74, phase: 'arena', tributes: [] }));
  const a = boot(s); a.api.load(1); a.press({ slotDelete: '1' }); a.press({ slotDeleteConfirm: '1' });
  assert.equal(SV.readSlot(s, 1).status, 'empty'); assert.ok(s.getItem('laCosechaSave'), 'la clave antigua sigue sin borrarse');
});

test('una ranura dañada no afecta a las demás', () => {
  const s = memoryStorage(); const a = boot(s); newStory(a, 74); a.api.save({ slot: 2 }); s.setItem('laCosechaSave:1', '{dañado');
  const b = boot(s); assert.equal(b.api.load(1), false); assert.match(b.alerts[0], /dañado/);
  assert.equal(b.api.load(2), true); assert.equal(b.api.g().edition, 74);
  b.press({ a: 'load' }); assert.match(b.html(), /Dañada o no compatible/);
});

test('con las tres ranuras llenas no se sobrescribe nada sin elegir', () => {
  const s = memoryStorage(); const a = boot(s);
  for (const ed of [50, 74, 75]) { newStory(a, ed); a.api.save(); }
  const before = ['1', '2', '3'].map(n => s.getItem('laCosechaSave:' + n));
  const g = newStory(a, 74); assert.equal(a.api.save(), false, 'no guarda solo');
  assert.match(a.html(), /PARTIDAS/); assert.deepEqual(['1', '2', '3'].map(n => s.getItem('laCosechaSave:' + n)), before);
  newStory(a, 50); a.press({ pre50Choice: 'watch' }); assert.deepEqual(['1', '2', '3'].map(n => s.getItem('laCosechaSave:' + n)), before, 'el autoguardado tampoco sobrescribe');
  a.api.set(g); a.press({ slotSave: '2' }); assert.equal(JSON.parse(s.getItem('laCosechaSave:2')).game.edition, 74, 'sobrescribir solo si se elige');
});

test('exportar e importar siguen funcionando y la importación no pisa ninguna ranura', async () => {
  const s = memoryStorage(); const a = boot(s); const g = newStory(a, 75); g.rebellion = 33; a.api.save();
  a.api.exportSave(); const json = JSON.parse(a.blob());
  assert.equal(json.format, 'la-cosecha-save'); assert.equal(json.saveVersion, SV.SAVE_VERSION); assert.equal(json.gameVersion, GAME_VERSION); assert.equal(json.game.edition, 75);
  // Destino con la ranura 1 ocupada: la importación se guarda en la primera libre (2) y no toca la 1.
  const t = memoryStorage(); const b = boot(t); newStory(b, 50); b.api.save(); const slot1 = t.getItem('laCosechaSave:1');
  await b.api.importSaveFile({ text: async () => a.blob() });
  assert.equal(b.api.g().rebellion, 33); assert.equal(b.api.g().saveSlot, 2); assert.equal(t.getItem('laCosechaSave:1'), slot1, 'la ranura 1 no cambia');
  // Con las tres llenas, importar no sobrescribe nada y lo indica.
  for (const ed of [74, 75]) { newStory(b, ed); b.api.save(); }
  const full = ['1', '2', '3'].map(n => t.getItem('laCosechaSave:' + n));
  await b.api.importSaveFile({ text: async () => a.blob() });
  assert.deepEqual(['1', '2', '3'].map(n => t.getItem('laCosechaSave:' + n)), full); assert.match(b.nodes['#save-indicator'].textContent, /SIN GUARDAR/);
  // Exportaciones anteriores (version 3, sin saveVersion) siguen importándose.
  const c = boot(memoryStorage()); await c.api.importSaveFile({ text: async () => JSON.stringify({ format: 'la-cosecha-save', version: 3, game: json.game }) });
  assert.equal(c.api.g().edition, 75); assert.equal(c.alerts.length, 0);
});
