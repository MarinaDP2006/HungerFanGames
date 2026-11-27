// Guardado duradero (copia local + copia nativa de Android): escritura, cierre forzado,
// recuperación, migración de partidas anteriores y copias dañadas.
import test from 'node:test';
import assert from 'node:assert/strict';
import * as DS from '../js/durable-storage.js';
import * as SV from '../js/saves.js';
import { SETTINGS_KEY, saveSettings, loadSettings } from '../js/settings.js';

const KEYS = [...SV.DURABLE_SAVE_KEYS, SETTINGS_KEY];
const isValid = (k, t) => k === SETTINGS_KEY || k === SV.MIGRATED_KEY || SV.isValidSlotText(t);

function memLocal(init = {}) {
  const m = new Map(Object.entries(init));
  return { m, getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k) };
}
function fakeNative(init = {}, { failSet = false } = {}) {
  const m = new Map(Object.entries(init));
  return {
    m,
    async get({ key }) { return { value: m.has(key) ? m.get(key) : null }; },
    async set({ key, value }) { if (failSet) throw new Error('disco lleno'); m.set(key, value); },
    async remove({ key }) { m.delete(key); },
  };
}
const game = (n, extra = {}) => ({ mode: 'story', edition: 50, phase: 'prearena50', name: 'Tributo ' + n, preArena50: { index: n }, ...extra });
const indexIn = (storage, slot = 1) => SV.readSlot(storage, slot).record?.game?.preArena50?.index;
const sleep = ms => new Promise(r => setTimeout(r, ms));

test('sin Capacitor (Web y pruebas) no hay copia nativa', () => {
  assert.equal(DS.nativePreferences(undefined), null);
  assert.equal(DS.nativePreferences({}), null);
  assert.equal(DS.nativePreferences({ Capacitor: { isNativePlatform: () => false, Plugins: { Preferences: fakeNative() } } }), null);
  const p = fakeNative();
  assert.equal(DS.nativePreferences({ Capacitor: { isNativePlatform: () => true, Plugins: { Preferences: p } } }), p);
});

test('cada guardado y cada borrado se hacen en las dos copias', async () => {
  const local = memLocal(), native = fakeNative();
  const store = DS.createDurableStorage(local, native, { keys: KEYS });
  SV.writeSlot(store, 2, game(3), '4.10.0');
  saveSettings(store, { volume: 0.3 });
  await store.flush();
  assert.equal(native.m.get(SV.slotKey(2)), local.getItem(SV.slotKey(2)));
  assert.equal(native.m.get(SETTINGS_KEY), local.getItem(SETTINGS_KEY));
  SV.deleteSlot(store, 2);
  await store.flush();
  assert.equal(native.m.has(SV.slotKey(2)), false);
  assert.equal(local.getItem(SV.slotKey(2)), null);
});

test('claves ajenas al guardado no se copian a la nativa', async () => {
  const local = memLocal(), native = fakeNative();
  const store = DS.createDurableStorage(local, native, { keys: KEYS });
  store.setItem('otraCosa', '1');
  await store.flush();
  assert.equal(native.m.size, 0);
});

test('cierre forzado: lo último que el WebView no grabó se recupera de la copia nativa', async () => {
  const local = memLocal(), native = fakeNative();
  const store = DS.createDurableStorage(local, native, { keys: KEYS });
  SV.writeSlot(store, 1, game(2), '4.10.0');
  const discoDelWebView = new Map(local.m); // lo que llegó a disco antes del cierre
  await sleep(5);
  SV.writeSlot(store, 1, game(5), '4.10.0');
  saveSettings(store, { textScale: 1.3 });
  await store.flush();
  // Android mata la app: el WebView vuelve con lo que tenía en disco.
  const reabierto = memLocal(Object.fromEntries(discoDelWebView));
  assert.equal(indexIn(reabierto), 2);
  const r = await DS.hydrate(reabierto, native, KEYS, isValid);
  assert.equal(indexIn(reabierto), 5, 'se carga la última partida');
  assert.equal(loadSettings(reabierto).textScale, 1.3, 'y los últimos ajustes');
  assert.ok(r.resolved.includes(`${SV.slotKey(1)}:native`) && r.restored.includes(SETTINGS_KEY));
});

test('si el WebView perdió todo, se restauran las tres ranuras', async () => {
  const native = fakeNative();
  const store = DS.createDurableStorage(memLocal(), native, { keys: KEYS });
  for (const n of SV.SLOTS) SV.writeSlot(store, n, game(n), '4.10.0');
  await store.flush();
  const vacio = memLocal();
  await DS.hydrate(vacio, native, KEYS, isValid);
  assert.deepEqual(SV.SLOTS.map(n => indexIn(vacio, n)), [1, 2, 3]);
});

test('migración: las partidas de 4.9 (solo en el WebView) se copian a la nativa sin tocarlas', async () => {
  const anterior = memLocal();
  SV.writeSlot(anterior, 1, game(4), '4.9.0');
  const sinHuella = JSON.parse(anterior.getItem(SV.slotKey(1))); delete sinHuella.checksum;
  anterior.setItem(SV.slotKey(1), JSON.stringify(sinHuella)); // formato 4.9: sin checksum
  anterior.setItem(SV.LEGACY_KEY, JSON.stringify(game(1))); // partida de la ranura única antigua
  const copia = new Map(anterior.m);
  const native = fakeNative();
  const r = await DS.hydrate(anterior, native, KEYS, isValid);
  assert.deepEqual([...anterior.m], [...copia], 'lo local no cambia');
  assert.ok(r.migrated.includes(SV.slotKey(1)) && r.migrated.includes(SV.LEGACY_KEY));
  assert.equal(native.m.get(SV.slotKey(1)), copia.get(SV.slotKey(1)));
  assert.equal(indexIn(anterior), 4, 'la partida sin checksum se sigue cargando');
});

test('migración de la ranura única antigua sigue funcionando con la copia nativa', async () => {
  const local = memLocal({ [SV.LEGACY_KEY]: JSON.stringify(game(7)) });
  const native = fakeNative();
  await DS.hydrate(local, native, KEYS, isValid);
  const store = DS.createDurableStorage(local, native, { keys: KEYS });
  assert.equal(indexIn(store, 1), 7);
  await store.flush();
  assert.ok(native.m.get(SV.slotKey(1)), 'la ranura 1 migrada también queda en la nativa');
  assert.equal(native.m.get(SV.MIGRATED_KEY), '1');
  assert.ok(local.getItem(SV.LEGACY_KEY), 'la clave antigua no se borra');
});

test('copia dañada: gana la íntegra, sea local o nativa', async () => {
  const buena = memLocal();
  SV.writeSlot(buena, 1, game(6), '4.10.0');
  const texto = buena.getItem(SV.slotKey(1));
  const cortado = texto.slice(0, texto.length - 20);              // escritura a medias
  const alterado = texto.replace('"index":6', '"index":9');         // contenido que no cuadra con la huella
  assert.equal(SV.readSlot(memLocal({ [SV.slotKey(1)]: alterado }), 1).status, 'corrupt');

  const l1 = memLocal({ [SV.slotKey(1)]: cortado });
  await DS.hydrate(l1, fakeNative({ [SV.slotKey(1)]: texto }), KEYS, isValid);
  assert.equal(indexIn(l1), 6);

  const n2 = fakeNative({ [SV.slotKey(1)]: alterado });
  const l2 = memLocal({ [SV.slotKey(1)]: texto });
  await DS.hydrate(l2, n2, KEYS, isValid);
  assert.equal(indexIn(l2), 6);
  assert.equal(n2.m.get(SV.slotKey(1)), texto, 'la nativa se repara con la local');
});

test('las dos copias íntegras: gana la más reciente', async () => {
  const a = memLocal(), b = memLocal();
  SV.writeSlot(a, 1, game(1), '4.10.0'); await sleep(5); SV.writeSlot(b, 1, game(8), '4.10.0');
  const local = memLocal({ [SV.slotKey(1)]: b.getItem(SV.slotKey(1)) });
  const native = fakeNative({ [SV.slotKey(1)]: a.getItem(SV.slotKey(1)) });
  await DS.hydrate(local, native, KEYS, isValid);
  assert.equal(indexIn(local), 8);
  assert.equal(native.m.get(SV.slotKey(1)), b.getItem(SV.slotKey(1)));
});

test('si la copia nativa falla, la partida se guarda igual en local y no se rompe el juego', async () => {
  const errores = [];
  const local = memLocal();
  const store = DS.createDurableStorage(local, fakeNative({}, { failSet: true }), { keys: KEYS, onError: e => errores.push(e.message) });
  assert.doesNotThrow(() => SV.writeSlot(store, 1, game(2), '4.10.0'));
  await store.flush();
  assert.equal(indexIn(local), 2);
  assert.deepEqual(errores, ['disco lleno']);
});

test('si el WebView no puede escribir (cuota), la copia nativa la conserva', async () => {
  const native = fakeNative();
  const lleno = { getItem: () => null, setItem() { throw new Error('QuotaExceededError'); }, removeItem() {} };
  const store = DS.createDurableStorage(lleno, native, { keys: KEYS });
  assert.doesNotThrow(() => SV.writeSlot(store, 1, game(3), '4.10.0'));
  await store.flush();
  const reabierto = memLocal();
  await DS.hydrate(reabierto, native, KEYS, isValid);
  assert.equal(indexIn(reabierto), 3);
  assert.throws(() => DS.createDurableStorage(lleno, null).setItem(SV.slotKey(1), 'x'), /Quota/, 'sin copia nativa el error no se oculta');
});

test('exportar e importar no cambian: la huella no estorba al importar', () => {
  const local = memLocal();
  const rec = SV.writeSlot(local, 1, game(5), '4.10.0');
  const exportada = { format: SV.SAVE_FORMAT, saveVersion: SV.SAVE_VERSION, gameVersion: '4.10.0', game: rec.game };
  assert.equal(SV.unwrapSave(JSON.parse(JSON.stringify(exportada))).preArena50.index, 5);
  assert.equal(SV.unwrapSave({ format: SV.SAVE_FORMAT, version: 3, game: game(2) }).preArena50.index, 2, 'exportaciones antiguas');
});

test('mide cuánto tarda Android en confirmar cada escritura nativa', async () => {
  let t = 1000; const acks = [];
  const lento = { ...fakeNative(), async set() { await null; t += 7; } };
  const store = DS.createDurableStorage(memLocal(), lento, { keys: KEYS, now: () => t, onAck: ms => acks.push(ms) });
  SV.writeSlot(store, 1, game(1), '4.10.1');
  await store.flush();
  assert.deepEqual(acks, [7]);
  assert.equal(store.stats.writes, 1);
  assert.equal(store.stats.acked, 1);
  assert.equal(store.stats.maxAckMs, 7);
  const fallo = DS.createDurableStorage(memLocal(), fakeNative({}, { failSet: true }), { keys: KEYS });
  fallo.setItem(SV.slotKey(1), 'x'); await fallo.flush();
  assert.equal(fallo.stats.failed, 1);
});
