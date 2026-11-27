// Guardado duradero en Android.
//
// El juego lee y escribe de forma síncrona (como con localStorage). Este módulo mantiene dos copias:
//   1. localStorage del WebView: lecturas inmediatas. Android lo graba en disco con unos segundos
//      de retraso, así que si el sistema mata la app justo después de guardar puede perderse.
//   2. Copia nativa con Capacitor Preferences (SharedPreferences de Android): se escribe a la vez,
//      fuera del WebView, y sobrevive al cierre del proceso de Chromium. SharedPreferences escribe
//      con un archivo de respaldo, así que un cierre a mitad no deja el archivo a medias.
// Al arrancar, `hydrate` compara las dos copias clave a clave y se queda con la buena:
//   - si solo hay copia local (partidas de versiones anteriores), se copia a la nativa (migración);
//   - si solo hay copia nativa (lo local se perdió), se restaura en local;
//   - si difieren, gana la copia válida (checksum correcto); si las dos lo son, la más reciente.
// En la Web y en las pruebas no existe Capacitor: el módulo se comporta como localStorage sin más.

export function nativePreferences(win) {
  const cap = win && win.Capacitor;
  if (!cap || typeof cap.isNativePlatform !== 'function' || !cap.isNativePlatform()) return null;
  const p = cap.Plugins && cap.Plugins.Preferences;
  return p && typeof p.get === 'function' && typeof p.set === 'function' ? p : null;
}

export function createDurableStorage(local, native, { keys = [], onError } = {}) {
  const tracked = new Set(keys);
  const pending = new Set();
  const track = promise => {
    const p = Promise.resolve(promise).catch(e => { onError && onError(e); }).finally(() => pending.delete(p));
    pending.add(p);
  };
  return {
    native: !!native,
    getItem: k => local.getItem(k),
    setItem(k, v) {
      const value = String(v);
      let localError = null;
      try { local.setItem(k, value); } catch (e) { localError = e; }
      if (native && tracked.has(k)) track(native.set({ key: k, value }));
      if (localError && !(native && tracked.has(k))) throw localError;
    },
    removeItem(k) {
      if (typeof local.removeItem === 'function') local.removeItem(k);
      if (native && tracked.has(k)) track(native.remove({ key: k }));
    },
    flush: () => Promise.all([...pending]),
    pendingCount: () => pending.size,
  };
}

// Decide qué copia gana cuando local y nativa difieren. `isValid(key, text)` dice si un texto es usable.
export function pickWinner(key, localText, nativeText, isValid = () => true) {
  const lv = localText != null && isValid(key, localText);
  const nv = nativeText != null && isValid(key, nativeText);
  if (lv && !nv) return 'local';
  if (nv && !lv) return 'native';
  if (!lv && !nv) return 'native';
  const time = t => { try { return Date.parse(JSON.parse(t).savedAt) || 0; } catch { return 0; } };
  return time(localText) > time(nativeText) ? 'local' : 'native';
}

export async function hydrate(local, native, keys, isValid) {
  const report = { native: !!native, migrated: [], restored: [], resolved: [], errors: [] };
  if (!native) return report;
  for (const key of keys) {
    try {
      const nativeText = (await native.get({ key }))?.value ?? null;
      const localText = local.getItem(key);
      if (nativeText === localText) continue;
      if (nativeText == null) { await native.set({ key, value: localText }); report.migrated.push(key); continue; }
      if (localText == null) { local.setItem(key, nativeText); report.restored.push(key); continue; }
      const winner = pickWinner(key, localText, nativeText, isValid);
      if (winner === 'native') local.setItem(key, nativeText);
      else await native.set({ key, value: localText });
      report.resolved.push(`${key}:${winner}`);
    } catch (e) { report.errors.push(`${key}: ${e && e.message || e}`); }
  }
  return report;
}
