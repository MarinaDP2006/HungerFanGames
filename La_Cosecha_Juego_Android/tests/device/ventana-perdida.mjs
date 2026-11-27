// Medición del margen residual de pérdida: ¿cuánto tiempo después de guardar puede Android matar la app
// sin que se pierda la partida?
//
// Cada intento:
//   1. Carga la ranura 1 (una partida del 74.º) y pulsa «Guardar» (se escribe en las dos copias).
//   2. Espera D milisegundos y mata la app con `am force-stop`, que equivale a un cierre por el sistema.
//   3. Lee del disco la copia nativa (run-as) para ver si ya estaba escrita.
//   4. Abre la app y comprueba si la partida recuperada es la última guardada.
//
// Los tiempos se miden desde el ordenador que controla el móvil: entre el guardado real y la orden
// de cierre hay además el retardo del cable o del emulador, que se mide y se anota aparte.
// Es una medición, no una prueba de aprobado o suspenso: sale con error solo si algo falla al medir,
// o si se pierde una partida cuando ya había pasado 1 segundo o más desde el guardado.
import fs from 'node:fs';
import path from 'node:path';
import { _android as android } from 'playwright-core';

const PKG = 'com.lacosecha.panem';
const OUT = path.resolve('device-report');
fs.mkdirSync(OUT, { recursive: true });
const DELAYS = (process.env.VENTANA_RETARDOS || '0,5,10,25,50,100,250,1000').split(',').map(Number);
const REPS = Number(process.env.VENTANA_REPETICIONES || 3);
const sleep = ms => new Promise(r => setTimeout(r, ms));

const [device] = await android.devices();
if (!device) { console.error('No hay ningún dispositivo Android conectado'); process.exit(1); }
const prop = async p => (await device.shell(`getprop ${p}`)).toString().trim();
const info = { modelo: await prop('ro.product.model'), android: await prop('ro.build.version.release'), api: await prop('ro.build.version.sdk') };
const nativeXml = async () => (await device.shell(`run-as ${PKG} cat shared_prefs/CapacitorStorage.xml`).catch(() => '')).toString();
const SLOT_KEYS = ['laCosechaSave:1', 'laCosechaSave:2', 'laCosechaSave:3'];

async function launch() {
  await device.shell(`am force-stop ${PKG}`);
  await device.shell(`monkey -p ${PKG} -c android.intent.category.LAUNCHER 1`);
  const page = await (await device.webView({ pkg: PKG }, { timeout: 120000 })).page();
  page.setDefaultTimeout(60000);
  page.on('dialog', d => d.accept().catch(() => {}));
  await page.waitForSelector('[data-a="story"]', { timeout: 120000 });
  await page.waitForFunction(() => document.documentElement.dataset.storage === 'nativo', null, { timeout: 30000 });
  return page;
}
const click = (page, sel) => page.$eval(sel, el => el.click());
const slots = page => page.evaluate(keys => Object.fromEntries(keys.map(k => [k, localStorage.getItem(k)])), SLOT_KEYS);

// Deja una partida del 74.º cargada desde la ranura 1, con el botón «Guardar» en pantalla.
// (El 50.º está retirado del juego activo; antes esta medición usaba sus escenas con guardado automático.)
async function ensurePlayable(page) {
  const s = await slots(page);
  if (s['laCosechaSave:1']) {
    await click(page, '[data-a="load"]');
    await page.waitForSelector('[data-slot-load="1"]');
    await click(page, '[data-slot-load="1"]');
    if (await page.$('[data-a="save"]')) return page;
  }
  await click(page, '.topbar [data-a="settings"]');
  for (const n of [1, 2, 3]) {
    if (await page.$(`[data-slot-delete="${n}"]`)) { await click(page, `[data-slot-delete="${n}"]`); await click(page, `[data-slot-delete-confirm="${n}"]`); }
  }
  await click(page, '.topbar [data-a="home"]');
  await click(page, '[data-a="story"]');
  await click(page, '[data-ed="74"]');
  await click(page, '[data-a="begin"]');
  await click(page, '[data-a="save"]');
  await sleep(1500);
  return page;
}

// Retardo de ida y vuelta ordenador ↔ app (se suma a los tiempos medidos).
async function roundTrip(page) {
  const t = [];
  for (let i = 0; i < 10; i++) { const a = Date.now(); await page.evaluate(() => 1); t.push(Date.now() - a); }
  t.sort((a, b) => a - b);
  return t[Math.floor(t.length / 2)];
}

const trials = [];
const acks = [];
let rtt = null;
let failure = null;
try {
  let page = await launch();
  await ensurePlayable(page);
  rtt = await roundTrip(page);
  // Confirmación nativa sin cierre: cuánto tarda Android en aceptar una escritura.
  for (let i = 0; i < 5; i++) {
    if (!(await page.$('[data-a="save"]'))) { page = await launch(); await ensurePlayable(page); }
    const before = Number(await page.evaluate(() => document.documentElement.dataset.nativeAcks || 0));
    await click(page, '[data-a="save"]');
    await page.waitForFunction(n => Number(document.documentElement.dataset.nativeAcks || 0) > n, before, { timeout: 10000 });
    acks.push(Number(await page.evaluate(() => document.documentElement.dataset.nativeAckMs)));
  }

  for (const delay of DELAYS) {
    for (let r = 0; r < REPS; r++) {
      page = await launch();
      await ensurePlayable(page);
      const before = await slots(page);
      await click(page, '[data-a="save"]');
      const tSaved = Date.now(); // el guardado ya ha ocurrido (más medio viaje de ida y vuelta)
      const after = await slots(page);
      const changed = SLOT_KEYS.filter(k => after[k] !== before[k]);
      const tRead = Date.now();
      if (delay > tRead - tSaved) await sleep(delay - (tRead - tSaved));
      const tKill = Date.now();
      await device.shell(`am force-stop ${PKG}`);
      const killMs = Date.now() - tKill;
      const xml = await nativeXml();
      const expected = changed.map(k => JSON.parse(after[k]).savedAt);
      const nativeOnDisk = expected.every(s => xml.includes(s));
      page = await launch();
      const recovered = await slots(page);
      const survived = changed.length > 0 && changed.every(k => recovered[k] === after[k]);
      const trial = { delayPedido: delay, msDesdeGuardado: tKill - tSaved, msCierre: killMs, claves: changed, nativaEnDisco: nativeOnDisk, recuperada: survived };
      trials.push(trial);
      console.log(JSON.stringify(trial));
    }
  }
} catch (e) {
  failure = e.message;
  console.error('Fallo al medir:', e);
}

const rows = DELAYS.map(d => {
  const t = trials.filter(x => x.delayPedido === d);
  const ms = t.map(x => x.msDesdeGuardado);
  return { d, n: t.length, min: Math.min(...ms), max: Math.max(...ms), disco: t.filter(x => x.nativaEnDisco).length, ok: t.filter(x => x.recuperada).length };
});
const lateLoss = trials.filter(t => t.msDesdeGuardado >= 1000 && !t.recuperada);
const md = [
  '# Margen residual de pérdida (medición)',
  '',
  `- Dispositivo: ${info.modelo} · Android ${info.android} (API ${info.api})`,
  `- Ida y vuelta ordenador ↔ app (mediana): ${rtt ?? '?'} ms. Los tiempos de la tabla pueden quedarse cortos en hasta esa cantidad.`,
  `- Confirmación nativa de Android (puente + SharedPreferences en memoria), ${acks.length} escrituras: ${acks.length ? `${Math.min(...acks)}–${Math.max(...acks)} ms` : 'sin datos'}`,
  failure ? `- ⚠️ La medición se interrumpió: ${failure}` : '- Medición completa',
  '',
  '| Cierre pedido tras guardar | Intentos | Tiempo real hasta la orden de cierre | Copia nativa ya en disco | Partida recuperada |',
  '|---|---|---|---|---|',
  ...rows.map(r => `| ${r.d} ms | ${r.n} | ${r.n ? `${r.min}–${r.max} ms` : '—'} | ${r.disco}/${r.n} | ${r.ok}/${r.n} |`),
  '',
  lateLoss.length ? `❌ Se perdió alguna partida con 1 s o más desde el guardado: ${lateLoss.length}` : 'Ninguna pérdida con 1 s o más desde el guardado.',
].join('\n');
fs.writeFileSync(path.join(OUT, 'ventana.md'), md + '\n');
fs.writeFileSync(path.join(OUT, 'ventana.json'), JSON.stringify({ info, rtt, acks, trials, failure }, null, 2));
console.log('\n' + md);
await device.close();
process.exit(failure || lateLoss.length ? 1 : 0);
