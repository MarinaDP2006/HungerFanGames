// Recorrido real del APK en un emulador o dispositivo Android (se ejecuta en GitHub Actions).
// Controla el WebView de la app con Playwright (protocolo de depuración de Chrome, APK de depuración).
// Comprueba: arranque y versión, navegación, Ajustes (persisten tras reiniciar la app), sonido,
// guardado automático, reinicio, carga desde la ranura y la campaña del 50.º completa hasta el final.
// Deja capturas e informe en device-report/. Sale con código 1 si falla cualquier comprobación.
import fs from 'node:fs';
import path from 'node:path';
import { _android as android } from 'playwright-core';

const PKG = 'com.lacosecha.panem';
const OUT = path.resolve('device-report');
fs.mkdirSync(OUT, { recursive: true });
const version = JSON.parse(fs.readFileSync('La_Cosecha_Juego_Android/package.json', 'utf8')).version;
const results = [];
const errors = [];
let shot = 0;

const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail: String(detail) }); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' · ' + detail : ''}`); };

const [device] = await android.devices();
if (!device) { console.error('No hay ningún dispositivo Android conectado'); process.exit(1); }
const prop = async p => (await device.shell(`getprop ${p}`)).toString().trim();
const info = { modelo: await prop('ro.product.model'), android: await prop('ro.build.version.release'), api: await prop('ro.build.version.sdk'), abi: await prop('ro.product.cpu.abi') };
const pkgInfo = (await device.shell(`dumpsys package ${PKG}`)).toString();
info.versionName = /versionName=([^\s]+)/.exec(pkgInfo)?.[1];
info.versionCode = /versionCode=(\d+)/.exec(pkgInfo)?.[1];
info.webview = /versionName=([^\s]+)/.exec((await device.shell('dumpsys package com.google.android.webview')).toString())?.[1] || 'desconocido';
console.log('Dispositivo:', info);

async function launch() {
  await device.shell(`am force-stop ${PKG}`);
  await device.shell(`monkey -p ${PKG} -c android.intent.category.LAUNCHER 1`);
  const webview = await device.webView({ pkg: PKG }, { timeout: 120000 });
  const page = await webview.page();
  page.setDefaultTimeout(60000);
  page.on('pageerror', e => errors.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`console: ${m.text()}`); });
  page.on('dialog', d => d.accept().catch(() => {}));
  await page.waitForSelector('#game-version:not(:empty)', { timeout: 120000 });
  return page;
}
const snap = async name => { const f = path.join(OUT, `${String(++shot).padStart(2, '0')}-${name}.png`); await device.screenshot({ path: f }); return f; };
// Pulsación normal; si Playwright no puede calcular el punto (zoom CSS heredado en WebViews antiguos), se hace clic en el elemento y se anota.
const directClicks = new Set();
async function tap(page, sel) {
  try { await page.click(sel, { timeout: 5000 }); }
  catch { await page.$eval(sel, el => el.click()); directClicks.add(sel); }
}
const home = async page => { await tap(page, '.topbar [data-a="home"]'); await page.waitForSelector('[data-a="story"]'); };

try {
  check('APK instalado con la versión del juego', info.versionName === version, `versionName ${info.versionName}, versionCode ${info.versionCode}`);

  // 1. Arranque
  let page = await launch();
  check('La app arranca y muestra la versión', (await page.textContent('#game-version')).includes(version), await page.textContent('#game-version'));
  await snap('inicio');

  // 2. Navegación por los modos y vuelta al inicio
  for (const [a, expect] of [['story', 'ELIGE TU CAMPAÑA'], ['free', 'CONFIGURA LOS JUEGOS'], ['president', 'PRESIDENTE'], ['codex', 'CÓDICE']]) {
    await tap(page, `[data-a="${a}"]`);
    const text = (await page.textContent('#screen')).toUpperCase();
    check(`Navegación: ${a}`, text.includes(expect), expect);
    if (a === 'free') await snap('modo-libre');
    await home(page);
  }

  // 3. Ajustes
  await tap(page, '.topbar [data-a="settings"]');
  await page.waitForSelector('#set-volume');
  await tap(page, '[data-setting="reducedMotion"]');
  await tap(page, '[data-text-scale="1.15"]');
  await page.fill('#set-volume', '40');
  await page.dispatchEvent('#set-volume', 'change');
  await tap(page, '[data-a="test-sound"]');
  const audio = await page.evaluate(() => ({ lastSound: document.documentElement.dataset.lastSound, hasAudioContext: !!(window.AudioContext || window.webkitAudioContext) }));
  check('Sonido: el motor de audio del WebView reproduce el efecto de prueba', audio.hasAudioContext && audio.lastSound === 'anthem', JSON.stringify(audio));
  await snap('ajustes');
  await tap(page, '[data-setting="sound"]');
  await tap(page, '[data-setting="sound"]');
  const prefs = await page.evaluate(() => JSON.parse(localStorage.getItem('laCosechaSettings')));
  check('Ajustes guardados', prefs && prefs.reducedMotion === true && prefs.textScale === 1.15 && prefs.volume === 0.4 && prefs.sound === true, JSON.stringify(prefs));
  await tap(page, '[data-a="settings-back"]');

  // 4. 50.º Vasallaje: cuatro escenas (guardado automático en la ranura 1)
  await tap(page, '[data-a="story"]');
  await tap(page, '[data-ed="50"]');
  await tap(page, '[data-a="begin"]');
  const scenes = [];
  for (let i = 0; i < 4; i++) { scenes.push(await page.textContent('.story-box h2')); await tap(page, '[data-pre50-choice]'); }
  const nextTitle = await page.textContent('.story-box h2');
  const slot1 = await page.evaluate(() => !!localStorage.getItem('laCosechaSave:1'));
  check('50.º: cuatro escenas jugadas y guardado automático en la ranura 1', scenes.length === 4 && slot1, scenes.join(' → '));
  await snap('50-precampana');

  // 5. Reinicio completo de la app
  page = await launch();
  const after = await page.evaluate(() => ({ prefs: JSON.parse(localStorage.getItem('laCosechaSettings')), reduce: document.documentElement.classList.contains('reduce-motion'), scale: getComputedStyle(document.documentElement).getPropertyValue('--text-scale').trim() }));
  check('Tras reiniciar: los ajustes persisten y se aplican', after.reduce && after.scale === '1.15' && after.prefs?.volume === 0.4, JSON.stringify(after));
  await tap(page, '[data-a="load"]');
  await page.waitForSelector('[data-slot-load="1"]');
  await snap('partidas');
  await tap(page, '[data-slot-load="1"]');
  const resumed = await page.textContent('.story-box h2');
  check('Tras reiniciar: se carga la ranura 1 en la misma escena', resumed === nextTitle, `${resumed}`);

  // 6. Resto del 50.º hasta el final
  for (let i = 0; i < 5; i++) { scenes.push(await page.textContent('.story-box h2')); await tap(page, '[data-pre50-choice]'); }
  check('50.º: las nueve escenas de la precampaña', scenes.length === 9, `${scenes.length}`);
  let arenaEvents = 0;
  for (let i = 0; i < 60; i++) {
    if (await page.$('.epilogue')) break;
    const choice = await page.$('[data-story-choice]');
    if (choice) { arenaEvents++; if (arenaEvents === 1) await snap('50-arena'); await choice.evaluate(el => el.scrollIntoView({ block: 'center' })); await choice.click({ timeout: 5000 }).catch(() => choice.evaluate(el => el.click())); continue; }
    const act = (await page.$('[data-act="rest"]')) || (await page.$('[data-act]'));
    if (!act) break;
    await act.click({ timeout: 5000 }).catch(() => act.evaluate(el => el.click()));
  }
  const ending = (await page.$('.epilogue')) ? await page.textContent('h1.display') : null;
  check('50.º: ocho acontecimientos de Arena y final', arenaEvents === 8 && !!ending, `${arenaEvents} acontecimientos · final «${ending}»`);
  await snap('50-final');

  // 7. Borrar partida con confirmación
  await tap(page, '.topbar [data-a="settings"]');
  await tap(page, '[data-slot-delete="1"]');
  const warned = !!(await page.$('[data-slot-delete-confirm="1"]'));
  await tap(page, '[data-slot-delete-confirm="1"]');
  const gone = await page.evaluate(() => localStorage.getItem('laCosechaSave:1') === null);
  check('Borrar partida pide confirmación y borra solo esa ranura', warned && gone);
} catch (e) {
  check('Recorrido sin excepciones', false, e.message);
  await snap('error').catch(() => {});
}

const crash = (await device.shell('logcat -d -b crash')).toString();
check('Sin cierres inesperados (logcat crash)', !/FATAL EXCEPTION/.test(crash), crash.trim().split('\n').slice(0, 3).join(' | '));
check('Sin errores de JavaScript en el WebView', errors.length === 0, errors.slice(0, 5).join(' | '));

if (directClicks.size) results.push({ name: 'Aviso: clic directo en el elemento (sin coordenadas)', ok: true, detail: [...directClicks].join(', ') });
const failed = results.filter(r => !r.ok);
const md = [`# Prueba del APK en Android`, ``, `- Dispositivo: ${info.modelo} · Android ${info.android} (API ${info.api}) · ${info.abi}`, `- WebView del sistema: ${info.webview}`, `- APK: versionName ${info.versionName} · versionCode ${info.versionCode}`, `- Resultado: ${failed.length ? `${failed.length} comprobaciones fallidas` : 'todas las comprobaciones superadas'}`, ``, `| Comprobación | Resultado | Detalle |`, `|---|---|---|`, ...results.map(r => `| ${r.name} | ${r.ok ? '✅' : '❌'} | ${r.detail.replace(/\|/g, '/')} |`)].join('\n');
fs.writeFileSync(path.join(OUT, 'informe.md'), md + '\n');
fs.writeFileSync(path.join(OUT, 'informe.json'), JSON.stringify({ device: info, results, errors }, null, 2));
console.log('\n' + md);
await device.close();
process.exit(failed.length ? 1 : 0);
