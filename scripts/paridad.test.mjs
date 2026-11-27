// Comprueba que scripts/paridad.mjs (contratos Android / Web) detecta que los productos se mezclen
// o que los datos compartidos diverjan. Trabaja sobre copias temporales; no toca el repositorio.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const repo = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const script = path.join(repo, 'scripts', 'paridad.mjs');
const run = root => spawnSync(process.execPath, [script], {env: {...process.env, PARIDAD_ROOT: root}, encoding: 'utf8'});
function copy() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'paridad-'));
  for (const d of ['La_Cosecha_Web_Render', 'La_Cosecha_Juego_Android'])
    fs.cpSync(path.join(repo, d), path.join(dir, d), {recursive: true, filter: s => !/[/\\](node_modules|www|android)([/\\]|$)/.test(s.slice(repo.length))});
  fs.copyFileSync(path.join(repo, 'render.yaml'), path.join(dir, 'render.yaml'));
  fs.cpSync(path.join(repo, 'compartido'), path.join(dir, 'compartido'), {recursive: true});
  return dir;
}
const W = 'La_Cosecha_Web_Render', A = 'La_Cosecha_Juego_Android';
const edit = (dir, f, fn) => { const p = path.join(dir, f); fs.writeFileSync(p, fn(fs.readFileSync(p, 'utf8'))); };
function expectFail(mutate, pattern) {
  const dir = copy();
  try { mutate(dir); const r = run(dir); assert.equal(r.status, 1, 'debe fallar'); assert.match(r.stderr, pattern); }
  finally { fs.rmSync(dir, {recursive: true, force: true}); }
}

test('el repositorio actual cumple los contratos', () => {
  const r = run(repo); assert.equal(r.status, 0, r.stderr); assert.match(r.stdout, /Contratos Android \/ Web: OK/);
});
test('detecta una copia de los datos compartidos editada a mano', () =>
  expectFail(d => edit(d, `${A}/js/data.js`, s => s + '\n// cambio accidental\n'), /La_Cosecha_Juego_Android: js\/data\.js no es idéntico a compartido\/data\.js/));
test('detecta que falte la copia de los datos compartidos en la Web', () =>
  expectFail(d => fs.rmSync(path.join(d, W, 'js/data.js')), /La_Cosecha_Web_Render: falta js\/data\.js/));
test('detecta una imagen común con contenido distinto', () =>
  expectFail(d => fs.writeFileSync(path.join(d, W, 'assets/icons/la-cosecha-192.png'), 'x'), /Imagen común con contenido distinto: assets\/icons\/la-cosecha-192\.png/));
test('detecta que la Web vuelva a llevar el motor del juego', () =>
  expectFail(d => fs.copyFileSync(path.join(d, A, 'js/campaigns.js'), path.join(d, W, 'js/campaigns.js')), /La Web contiene un módulo del videojuego: js\/campaigns\.js/));
test('detecta que la Web vuelva a entrar por el juego', () =>
  expectFail(d => edit(d, `${W}/index.html`, s => s.replace('js/archivo.js', 'js/app.js')), /La Web debe entrar por js\/archivo\.js/));
test('detecta que la Web use partidas del videojuego', () =>
  expectFail(d => edit(d, `${W}/js/archivo.js`, s => s + "\nlocalStorage.getItem('laCosechaSave:1');\n"), /claves de partidas o ajustes del videojuego/));
test('detecta pantallas del juego en la Web', () =>
  expectFail(d => edit(d, `${W}/js/archivo-vistas.js`, s => s.replace('<p class="antetitulo">', '<button data-a="begin">Empezar</button><p class="antetitulo">')), /controles de las pantallas del juego/));
test('detecta que el videojuego cargue el Archivo', () =>
  expectFail(d => { fs.copyFileSync(path.join(d, W, 'js/archivo-datos.js'), path.join(d, A, 'js/archivo-datos.js')); edit(d, `${A}/js/app.js`, s => "import * as AR from './archivo-datos.js';\n" + s); }, /El videojuego carga un módulo del Archivo/));
test('detecta un módulo importado que no existe', () =>
  expectFail(d => edit(d, `${W}/js/archivo.js`, s => "import './no-existe.js';\n" + s), /Web: js\/no-existe\.js se importa pero no existe/));
test('detecta que el service worker de la Web no precargue un módulo', () =>
  expectFail(d => edit(d, `${W}/sw.js`, s => s.replace("'./js/archivo-vistas.js',", '')), /Web: sw\.js no precarga js\/archivo-vistas\.js/));
test('detecta que el service worker de Android vuelva a servir archivos desde caché', () =>
  expectFail(d => edit(d, `${A}/sw.js`, s => s + "\nself.addEventListener('fetch',e=>{});\n"), /Android: sw\.js no debe interceptar peticiones/));
test('detecta que el service worker precargue el WAV máster', () =>
  expectFail(d => edit(d, `${W}/sw.js`, s => s.replace("'./manifest.webmanifest'", "'./assets/audio/ambiente-capitolio-master.wav','./manifest.webmanifest'")), /no debe precargar másteres WAV/));
test('detecta que Web y Android compartan identificador de service worker', () =>
  expectFail(d => edit(d, `${A}/sw.js`, s => s.replace(/const CACHE='[^']+'/, "const CACHE='archivo-panem-1.0.0'")), /mismo identificador de service worker/));
test('detecta que un producto apunte a la carpeta del otro', () =>
  expectFail(d => edit(d, `${W}/index.html`, s => s.replace('</body>', '<img src="../La_Cosecha_Juego_Android/assets/x.png"></body>')), /apunta a la carpeta del otro producto/));
