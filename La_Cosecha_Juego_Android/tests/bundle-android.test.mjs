// Empaquetado del juego Android: ejecuta scripts/build-web.mjs (el mismo paso que usa el APK)
// en una copia temporal y comprueba qué viaja realmente en www/.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const app = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WAV = 'assets/audio/ambiente-capitolio-master.wav', OGG = 'assets/audio/ambiente-capitolio-original.ogg';
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bundle-'));
fs.cpSync(app, dir, {recursive: true, filter: s => !/[/\\](node_modules|www|android)([/\\]|$)/.test(s.slice(app.length))});
const build = spawnSync(process.execPath, ['scripts/build-web.mjs'], {cwd: dir, encoding: 'utf8'});
const www = path.join(dir, 'www');
const sw = fs.readFileSync(path.join(app, 'sw.js'), 'utf8');
const appJs = fs.readFileSync(path.join(app, 'js/app.js'), 'utf8');
test.after(() => fs.rmSync(dir, {recursive: true, force: true}));

test('el build termina correctamente', () => { assert.equal(build.status, 0, build.stderr); assert.match(build.stdout, /másteres WAV excluidos/); });
test('los módulos rechazados o inactivos no viajan en el bundle, pero siguen en el repositorio', () => {
  for (const f of ['js/campaign-50th-arena.js', 'js/campaign-50th-dynamic.js', 'js/canon-50th.js', 'js/music.js']) {
    assert.ok(fs.existsSync(path.join(app, f)), `${f} se conserva en el repositorio`);
    assert.ok(!fs.existsSync(path.join(www, f)), `${f} no está en www/`);
  }
});
test('las imágenes sin uso no viajan en el bundle', () => {
  for (const f of ['assets/menu-panem.png', 'assets/arena-bosque.png', 'assets/icons/icon-192.png', 'assets/icons/icon-512.png', 'assets/optimized/arena-bosque-1600.jpg']) {
    assert.ok(fs.existsSync(path.join(app, f)), `${f} se conserva`);
    assert.ok(!fs.existsSync(path.join(www, f)), `${f} fuera del bundle`);
  }
});
test('solo viajan los módulos que se cargan desde index.html', () => {
  const walk = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
  const inBundle = walk(path.join(www, 'js')).map(f => path.relative(path.join(www, 'js'), f)).sort();
  // Grafo de módulos desde app.js (incluye subcarpetas como js/campanas/).
  const seen = new Set(), stack = ['app.js'];
  while (stack.length) {
    const f = stack.pop(); if (seen.has(f)) continue; seen.add(f);
    const src = fs.readFileSync(path.join(app, 'js', f), 'utf8');
    for (const m of src.matchAll(/from '(\.{1,2}\/[^']+\.js)'/g)) stack.push(path.posix.normalize(path.posix.join(path.posix.dirname(f), m[1])));
  }
  assert.deepEqual(inBundle, [...seen].sort());
});
test('el build falla si index.html carga un módulo que no existe', () => {
  const bad = fs.mkdtempSync(path.join(os.tmpdir(), 'bundle-bad-'));
  try {
    fs.cpSync(dir, bad, {recursive: true, filter: s => !/[/\\\\]www([/\\\\]|$)/.test(s.slice(dir.length))});
    fs.writeFileSync(path.join(bad, 'index.html'), fs.readFileSync(path.join(bad, 'index.html'), 'utf8').replace('</body>', '<script type="module" src="js/no-existe.js"></script></body>'));
    const r = spawnSync(process.execPath, ['scripts/build-web.mjs'], {cwd: bad, encoding: 'utf8'});
    assert.notEqual(r.status, 0);
    assert.match(r.stderr, /no-existe\.js se carga pero no existe/);
  } finally { fs.rmSync(bad, {recursive: true, force: true}); }
});

test('el WAV máster se conserva en el repositorio pero no viaja en el bundle', () => {
  assert.ok(fs.existsSync(path.join(app, WAV)), 'el WAV sigue en el repositorio');
  assert.ok(fs.statSync(path.join(app, WAV)).size > 10e6, 'es el máster completo');
  assert.ok(!fs.existsSync(path.join(www, WAV)), 'el WAV no está en www/');
  const wavs = []; const walk = d => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : /\.wav$/i.test(f) && wavs.push(p); } }; walk(www);
  assert.deepEqual(wavs, [], 'ningún WAV en el bundle');
});
test('el OGG sí viaja en el bundle y es idéntico al del repositorio', () => {
  assert.ok(fs.existsSync(path.join(www, OGG)));
  assert.equal(fs.readFileSync(path.join(www, OGG)).compare(fs.readFileSync(path.join(app, OGG))), 0);
});
test('el bundle contiene la entrada y todos los módulos que importa app.js', () => {
  for (const f of ['index.html', 'sw.js', 'manifest.webmanifest', 'css/style.css', 'js/app.js']) assert.ok(fs.existsSync(path.join(www, f)), f);
  const imports = [...appJs.matchAll(/from '\.\/([\w.-]+\.js)'/g)].map(m => m[1]);
  assert.ok(imports.includes('campaign-50th-prearena.js') && imports.includes('campaign-50th-dynamic-adapter.js'));
  for (const m of imports) assert.ok(fs.existsSync(path.join(www, 'js', m)), `js/${m}`);
});
test('service worker de Android: retira el de 4.9 y no guarda nada en caché', () => {
  const id = sw.match(/const CACHE='([^']+)'/)[1];
  const version = JSON.parse(fs.readFileSync(path.join(app, 'package.json'), 'utf8')).version;
  assert.equal(id, `la-cosecha-android-${version}`, 'el identificador va ligado a la versión (sw.js cambia en cada versión)');
  const web = fs.readFileSync(path.join(app, '../La_Cosecha_Web_Render/sw.js'), 'utf8').match(/const CACHE='([^']+)'/)[1];
  assert.notEqual(id, web, 'distinto del de la Web');
  assert.match(sw, /skipWaiting\(\)/, 'se activa sin esperar a que se cierre la versión anterior');
  assert.match(sw, /caches\.delete/, 'borra las cachés de versiones anteriores');
  assert.match(sw, /registration\.unregister\(\)/, 'se da de baja');
  assert.match(sw, /\.navigate\(/, 'recarga la app con los archivos del APK');
  assert.doesNotMatch(sw, /addEventListener\('fetch'/, 'no intercepta peticiones');
  assert.doesNotMatch(sw, /addAll|caches\.open/, 'no precarga nada');
  assert.doesNotMatch(appJs, /serviceWorker\.register\(/, 'la app Android no registra service worker');
  assert.match(appJs, /getRegistrations\(\)/, 'y retira los que hubiera');
});
test('los botones de la cabecera (inicio y ajustes) usan acciones que el juego atiende', () => {
  const html = fs.readFileSync(path.join(app, 'index.html'), 'utf8');
  const header = html.match(/<header class="topbar">[\s\S]*?<\/header>/)[0];
  assert.doesNotMatch(header, /data-action=/, 'data-action no tiene ningún manejador');
  for (const a of ['home', 'settings']) {
    assert.ok(header.includes(`data-a="${a}"`), `cabecera: ${a}`);
    assert.ok(appJs.includes(`a==='${a}'`), `app.js atiende ${a}`);
  }
});
