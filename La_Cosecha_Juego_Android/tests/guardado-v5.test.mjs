// Formato de guardado 5: registro de decisiones, migración desde 1–4, copia de seguridad,
// integridad, exportación/importación y recuperación (copia nativa).
import test from 'node:test';
import assert from 'node:assert/strict';
import * as SV from '../js/saves.js';
import * as DEC from '../js/decisiones.js';
import * as DS from '../js/durable-storage.js';
import { SETTINGS_KEY } from '../js/settings.js';

const mem = (init = {}) => { const m = new Map(Object.entries(init)); return { m, getItem: k => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: k => m.delete(k) }; };
const juego50 = () => ({ mode: 'story', edition: 50, phase: 'prearena50', decisions: [0, 1], preArena50: { index: 2, complete: false, history: [{ scene: 'reaping', choice: 'watch' }, { scene: 'woodbine', choice: 'memorize' }], stats: { resolve: 2 } }, health: 100 });
// Registro tal como lo guardaba la versión 4.10 / 4.11 (saveVersion 4, sin registro de decisiones).
const registroV4 = (game, slot = 1) => { const r = SV.wrapSave(game, slot, '4.11.0'); r.saveVersion = 4; return r; };

test('formato 5 y registro de decisiones idempotente', () => {
  assert.equal(SV.SAVE_VERSION, 5);
  const g = DEC.initDecisions({ mode: 'story' }, { random: () => 0.5 });
  assert.equal(g.timeline.route_type, 'CANON');
  assert.ok(DEC.recordDecision(g, { campaign_id: '74', scene_id: '74_reaping', option_id: '74_reaping_o1' }).recorded);
  const dup = DEC.recordDecision(g, { campaign_id: '74', scene_id: '74_reaping', option_id: '74_reaping_o2' });
  assert.equal(dup.duplicate, true);
  assert.equal(g.decisionLog.length, 1);
  assert.equal(g.decisionLog[0].option_id, '74_reaping_o1', 'la primera decisión se conserva');
  assert.deepEqual(DEC.validateDecisions(g), []);
  assert.equal(DEC.routeTypeOf({ mode: 'free', whatIf: {} }), 'ALT_ROUTE');
  assert.equal(DEC.routeTypeOf({ mode: 'president' }), 'PRESIDENCY');
});

test('migración 4 → 5: nada cambia salvo lo añadido, y el 50.º se reconstruye sin reaplicar efectos', () => {
  const s = mem();
  s.setItem(SV.slotKey(1), JSON.stringify(registroV4(juego50())));
  const r = SV.readSlot(s, 1);
  assert.equal(r.status, 'ok');
  assert.equal(r.record.saveVersion, 5);
  assert.equal(r.record.migratedFrom, 4);
  const g = r.record.game;
  const { timeline, decisionLog, ...resto } = g;
  assert.deepEqual(resto, juego50(), 'la partida original queda intacta');
  assert.deepEqual(g.decisions, [0, 1], 'el campo antiguo «decisions» no se toca');
  assert.equal(timeline.route_type, 'LEGACY');
  assert.deepEqual(decisionLog.map(d => [d.decision_id, d.option_id, d.migrated]), [['50:reaping', 'watch', true], ['50:woodbine', 'memorize', true]]);
  assert.equal(g.preArena50.stats.resolve, 2, 'los efectos no se aplican otra vez');
  assert.equal(JSON.parse(s.getItem(SV.slotKey(1))).saveVersion, 4, 'leer no reescribe la ranura');
});

test('migración desde todos los formatos anteriores', () => {
  const base = { mode: 'free', phase: 'arena', tributes: [] };
  const casos = {
    'ranura única antigua (sin envoltorio)': mem({ [SV.LEGACY_KEY]: JSON.stringify(base) }),
    'versión 3': mem({ [SV.slotKey(1)]: JSON.stringify({ format: SV.SAVE_FORMAT, version: 3, game: base }) }),
    'sin envoltorio en la ranura': mem({ [SV.slotKey(1)]: JSON.stringify(base) }),
  };
  for (const [nombre, s] of Object.entries(casos)) {
    const r = SV.readSlot(s, 1);
    assert.equal(r.status, 'ok', nombre);
    assert.equal(r.record.saveVersion, 5, nombre);
    assert.ok(r.record.game.timeline && Array.isArray(r.record.game.decisionLog), nombre);
  }
});

test('migración transaccional: si falla, la partida se devuelve tal cual', () => {
  const rec = registroV4({ mode: 'story', preArena50: { history: [{ scene: 'a', choice: 'b' }] } });
  Object.defineProperty(rec, 'game', { value: { mode: 'story', toJSON() { throw new Error('dañada'); } }, enumerable: true });
  const m = SV.migrateRecord(rec);
  assert.match(m.migrationError, /dañada/);
  assert.equal(m.saveVersion, 4);
});

test('copia de seguridad: la ranura en formato antiguo se guarda antes de sobrescribirla, una sola vez', () => {
  const s = mem();
  const viejo = JSON.stringify(registroV4(juego50()));
  s.setItem(SV.slotKey(1), viejo);
  const g = SV.readSlot(s, 1).record.game;
  SV.writeSlot(s, 1, g, '4.12.0');
  assert.equal(s.getItem(SV.backupKey(1)), viejo);
  SV.writeSlot(s, 1, { ...g, health: 50 }, '4.12.0');
  assert.equal(s.getItem(SV.backupKey(1)), viejo, 'no se pisa con versiones nuevas');
  assert.equal(SV.readSlot(s, 1).record.saveVersion, 5);
  SV.deleteSlot(s, 1);
  assert.equal(s.getItem(SV.backupKey(1)), null, 'borrar la partida borra también su copia');
});

test('integridad: el formato 5 lleva huella y detecta copias alteradas', () => {
  const s = mem();
  const g = DEC.initDecisions({ mode: 'story', edition: 74 });
  DEC.recordDecision(g, { campaign_id: '74', scene_id: '74_reaping', option_id: '74_reaping_o1' });
  SV.writeSlot(s, 2, g, '4.12.0');
  const txt = s.getItem(SV.slotKey(2));
  assert.ok(SV.isValidSlotText(txt));
  assert.equal(SV.readSlot(mem({ [SV.slotKey(2)]: txt.replace('74_reaping_o1', '74_reaping_o3') }), 2).status, 'corrupt');
});

test('exportar e importar conservan el registro; importar una exportación antigua la migra', () => {
  const g = DEC.initDecisions({ mode: 'story', edition: 74, tributes: [] });
  DEC.recordDecision(g, { campaign_id: '74', scene_id: '74_reaping', option_id: '74_reaping_o2' });
  const exportada = JSON.parse(JSON.stringify({ format: SV.SAVE_FORMAT, version: 3, saveVersion: SV.SAVE_VERSION, gameVersion: '4.12.0', game: g }));
  const importada = DEC.migrateGame(SV.unwrapSave(exportada));
  assert.deepEqual(importada.decisionLog, g.decisionLog);
  assert.deepEqual(importada.timeline, g.timeline);
  const antigua = DEC.migrateGame(SV.unwrapSave({ format: SV.SAVE_FORMAT, version: 3, game: juego50() }));
  assert.equal(antigua.decisionLog.length, 2);
});

test('recuperación: la copia nativa y la de seguridad sobreviven a un cierre', async () => {
  const native = { m: new Map(), async get({ key }) { return { value: this.m.get(key) ?? null }; }, async set({ key, value }) { this.m.set(key, value); }, async remove({ key }) { this.m.delete(key); } };
  const keys = [...SV.DURABLE_SAVE_KEYS, SETTINGS_KEY];
  assert.ok(keys.includes(SV.backupKey(1)));
  const local = mem({ [SV.slotKey(1)]: JSON.stringify(registroV4(juego50())) });
  const store = DS.createDurableStorage(local, native, { keys });
  SV.writeSlot(store, 1, SV.readSlot(store, 1).record.game, '4.12.0');
  await store.flush();
  const reabierto = mem();
  await DS.hydrate(reabierto, native, keys, (k, t) => k === SETTINGS_KEY || k === SV.MIGRATED_KEY || SV.isValidSlotText(t));
  assert.equal(SV.readSlot(reabierto, 1).record.saveVersion, 5);
  assert.equal(JSON.parse(reabierto.getItem(SV.backupKey(1))).saveVersion, 4);
});
