// Ranuras de guardado de La Cosecha.
//
// Formato de cada ranura (saveVersion 5):
//   { format: 'la-cosecha-save', saveVersion: 5, slot, savedAt, gameVersion, checksum, game }
//   game.timeline y game.decisionLog: registro de decisiones (js/decisiones.js), desde la versión 5.
// Al leer una ranura de las versiones 1–4 se migra en una copia (si la migración falla, se devuelve
// la partida tal cual estaba). La primera vez que se sobrescribe, el texto anterior se guarda en
// laCosechaSaveBackup:<n> y no se vuelve a tocar.
//   `checksum` (desde 4.9.1, opcional) detecta una copia dañada; las ranuras sin él se siguen leyendo.
// Versiones anteriores que se siguen leyendo:
//   - Ranura única antigua: clave 'laCosechaSave' con el objeto de partida sin envoltorio.
//     Se migra a la ranura 1 la primera vez; la clave antigua NO se borra.
//   - Exportaciones anteriores: { format:'la-cosecha-save', version: 3, game }.
export const SAVE_FORMAT = 'la-cosecha-save';
import { migrateGame } from './decisiones.js';

export const SAVE_VERSION = 5;
export const SLOTS = [1, 2, 3];
export const LEGACY_KEY = 'laCosechaSave';
export const MIGRATED_KEY = 'laCosechaSaveMigrated';
export const slotKey = n => `laCosechaSave:${n}`;
export const backupKey = n => `laCosechaSaveBackup:${n}`;

const MODES = ['story', 'free', 'president'];
const isGame = g => !!g && typeof g === 'object' && MODES.includes(g.mode);

// Huella FNV-1a de la partida serializada: si no coincide al leer, la copia está dañada.
export function checksum(text) {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(16).padStart(8, '0');
}

export function wrapSave(game, slot, gameVersion) {
  return { format: SAVE_FORMAT, saveVersion: SAVE_VERSION, slot, savedAt: new Date().toISOString(), gameVersion: gameVersion || null, checksum: checksum(JSON.stringify(game)), game };
}

// ¿El texto guardado en una clave de ranura es una partida íntegra?
export function isValidSlotText(text) {
  try {
    const raw = JSON.parse(text);
    if (!unwrapSave(raw)) return false;
    return !(raw.format === SAVE_FORMAT && raw.checksum && raw.checksum !== checksum(JSON.stringify(raw.game)));
  } catch { return false; }
}

// Acepta un registro nuevo, una exportación antigua o una partida sin envoltorio.
export function unwrapSave(raw) {
  if (!raw || typeof raw !== 'object') return null;
  if (raw.format === SAVE_FORMAT && isGame(raw.game)) return raw.game;
  if (isGame(raw)) return raw;
  return null;
}

// Lleva un registro al formato actual en una copia. Si algo falla, devuelve el original intacto.
export function migrateRecord(record) {
  if (!record || (record.saveVersion >= SAVE_VERSION && Array.isArray(record.game?.decisionLog))) return record;
  try {
    const game = migrateGame(JSON.parse(JSON.stringify(record.game)));
    return { ...record, game, migratedFrom: record.saveVersion, saveVersion: SAVE_VERSION };
  } catch (e) {
    return { ...record, migrationError: String(e && e.message || e) };
  }
}

function migrateLegacy(storage) {
  const legacy = storage.getItem(LEGACY_KEY);
  if (legacy == null || storage.getItem(MIGRATED_KEY) === '1') return null;
  let game;
  try { game = unwrapSave(JSON.parse(legacy)); } catch { return { status: 'corrupt', slot: 1, legacy: true }; }
  if (!game) return { status: 'corrupt', slot: 1, legacy: true };
  const record = wrapSave(migrateGame(game), 1, null);
  record.migratedFrom = LEGACY_KEY;
  storage.setItem(slotKey(1), JSON.stringify(record));
  storage.setItem(MIGRATED_KEY, '1');
  return { status: 'ok', slot: 1, record, migrated: true };
}

// Lee una ranura: { status: 'ok' | 'empty' | 'corrupt', slot, record? }.
export function readSlot(storage, slot) {
  if (!SLOTS.includes(Number(slot))) return { status: 'invalid', slot };
  slot = Number(slot);
  const text = storage.getItem(slotKey(slot));
  if (text == null) {
    if (slot === 1) { const m = migrateLegacy(storage); if (m) return m; }
    return { status: 'empty', slot };
  }
  try {
    const raw = JSON.parse(text);
    const game = unwrapSave(raw);
    if (!game) return { status: 'corrupt', slot };
    if (raw.format === SAVE_FORMAT && raw.checksum && raw.checksum !== checksum(JSON.stringify(raw.game))) return { status: 'corrupt', slot };
    const record = raw.format === SAVE_FORMAT ? { ...raw, saveVersion: raw.saveVersion ?? raw.version ?? 1, game } : wrapSave(game, slot, null);
    return { status: 'ok', slot, record: migrateRecord(record) };
  } catch { return { status: 'corrupt', slot }; }
}

export function writeSlot(storage, slot, game, gameVersion) {
  if (!SLOTS.includes(Number(slot))) throw new Error(`Ranura no válida: ${slot}`);
  const record = wrapSave(game, Number(slot), gameVersion);
  // Copia de seguridad de la partida en formato anterior antes de sobrescribirla por primera vez.
  const prev = storage.getItem(slotKey(record.slot));
  if (prev != null && storage.getItem(backupKey(record.slot)) == null) {
    try { const v = JSON.parse(prev).saveVersion ?? JSON.parse(prev).version ?? 1; if (v < SAVE_VERSION) storage.setItem(backupKey(record.slot), prev); } catch { storage.setItem(backupKey(record.slot), prev); }
  }
  storage.setItem(slotKey(record.slot), JSON.stringify(record));
  return record;
}

export function deleteSlot(storage, slot) {
  if (!SLOTS.includes(Number(slot))) return false;
  storage.removeItem?.(slotKey(Number(slot)));
  storage.removeItem?.(backupKey(Number(slot)));
  // Si se borra la ranura 1, la partida antigua no debe volver a aparecer por migración.
  if (Number(slot) === 1 && storage.getItem(LEGACY_KEY) != null) storage.setItem(MIGRATED_KEY, '1');
  return true;
}

export function firstEmptySlot(storage) {
  return SLOTS.find(n => readSlot(storage, n).status === 'empty') ?? null;
}

// Resumen legible de una ranura para la pantalla de partidas.
export function slotSummary(record) {
  const g = record?.game || {};
  const mode = { story: 'Historia', free: 'Modo libre', president: 'Presidencia' }[g.mode] || g.mode;
  const edition = g.mode === 'story' ? `${g.edition}.º` : g.mode === 'free' ? 'Personalizada' : '';
  const where = g.mode === 'president' ? `Día ${g.day ?? 1}` : g.phase === 'arena' ? `Arena · día ${g.day ?? 1}` : g.phase === 'ending' ? 'Final' : 'Antes de la Arena';
  return { mode, edition, where, name: g.president?.name || g.name || '', savedAt: record?.savedAt || null };
}

// Claves que deben sobrevivir a un cierre de la app (las copia el almacenamiento duradero).
export const DURABLE_SAVE_KEYS = [...SLOTS.map(slotKey), ...SLOTS.map(backupKey), LEGACY_KEY, MIGRATED_KEY];
