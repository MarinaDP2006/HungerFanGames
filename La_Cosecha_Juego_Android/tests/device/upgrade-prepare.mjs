// Prepara la prueba de actualización: con el APK ANTERIOR instalado (4.9.0, sin copia nativa),
// juega cuatro escenas del 50.º para que quede una partida en la ranura 1 y anota en qué escena está.
// Después, el flujo de CI instala el APK nuevo encima y android-e2e.mjs comprueba que esa partida
// sigue ahí, se carga en la misma escena y pasa a la copia nativa.
import fs from 'node:fs';
import path from 'node:path';
import { _android as android } from 'playwright-core';

const PKG = 'com.lacosecha.panem';
const OUT = path.resolve('device-report');
fs.mkdirSync(OUT, { recursive: true });

const [device] = await android.devices();
const pkgInfo = (await device.shell(`dumpsys package ${PKG}`)).toString();
const version = /versionName=([^\s]+)/.exec(pkgInfo)?.[1];
await device.shell(`am force-stop ${PKG}`);
await device.shell(`monkey -p ${PKG} -c android.intent.category.LAUNCHER 1`);
const page = await (await device.webView({ pkg: PKG }, { timeout: 120000 })).page();
page.setDefaultTimeout(60000);
await page.waitForSelector('#game-version:not(:empty)', { timeout: 120000 });
const tap = async sel => { try { await page.click(sel, { timeout: 5000 }); } catch { await page.$eval(sel, el => el.click()); } };
await tap('[data-a="story"]');
await tap('[data-ed="50"]');
await tap('[data-a="begin"]');
for (let i = 0; i < 4; i++) await tap('[data-pre50-choice]');
const title = await page.textContent('.story-box h2');
const saved = await page.evaluate(() => !!localStorage.getItem('laCosechaSave:1'));
// La versión anterior solo guarda en el WebView: se le da tiempo a escribir en disco antes de actualizar.
await device.shell('input keyevent KEYCODE_HOME');
await new Promise(r => setTimeout(r, 6000));
fs.writeFileSync(path.join(OUT, 'anterior.json'), JSON.stringify({ version, title, saved }, null, 2));
console.log(`APK anterior ${version}: partida en la ranura 1, escena «${title}»`);
await device.close();
process.exit(saved ? 0 : 1);
