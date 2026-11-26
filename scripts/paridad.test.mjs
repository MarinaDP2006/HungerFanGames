// Comprueba que scripts/paridad.mjs sigue detectando divergencias accidentales tras admitir
// diferencias de plataforma. Trabaja sobre copias temporales; no toca el repositorio.
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
  return dir;
}
const W = 'La_Cosecha_Web_Render', A = 'La_Cosecha_Juego_Android';
const edit = (dir, f, fn) => { const p = path.join(dir, f); fs.writeFileSync(p, fn(fs.readFileSync(p, 'utf8'))); };
function expectFail(mutate, pattern) {
  const dir = copy();
  try { mutate(dir); const r = run(dir); assert.equal(r.status, 1, 'debe fallar'); assert.match(r.stderr, pattern); }
  finally { fs.rmSync(dir, {recursive: true, force: true}); }
}

test('el repositorio actual pasa la paridad', () => {
  const r = run(repo); assert.equal(r.status, 0, r.stderr); assert.match(r.stdout, /Paridad Web \/ Android: OK/);
});
test('detecta un cambio en los datos compartidos (data.js)', () =>
  expectFail(d => edit(d, `${A}/js/data.js`, s => s + '\n// cambio accidental\n'), /Compartido obligatorio con contenido distinto: js\/data\.js/));
test('detecta una imagen compartida que falta en un producto', () =>
  expectFail(d => fs.rmSync(path.join(d, W, 'assets/icons/la-cosecha-192.png')), /falta en la Web: assets\/icons\/la-cosecha-192\.png/));
test('detecta una edición en un solo producto de un módulo común (campaigns.js)', () =>
  expectFail(d => edit(d, `${W}/js/campaigns.js`, s => s + '\n// edición solo en la Web\n'), /Compartido con contenido distinto: js\/campaigns\.js/));
test('detecta un archivo nuevo sin categoría en un solo producto', () =>
  expectFail(d => fs.writeFileSync(path.join(d, A, 'js/accidental.js'), 'export {}\n'), /sin categoría que solo está en Android: js\/accidental\.js/));
test('detecta que la Web referencia un archivo exclusivo de Android', () =>
  expectFail(d => edit(d, `${W}/index.html`, s => s.replace('</body>', '<script src="js/campaign-50th-prearena.js"></script></body>')), /La Web referencia .*campaign-50th-prearena\.js/));
test('detecta un módulo importado por app.js que el service worker no precarga', () =>
  expectFail(d => edit(d, `${A}/sw.js`, s => s.replace("'./js/campaign-50th-dynamic-adapter.js',", '')), /Android: sw\.js no precarga js\/campaign-50th-dynamic-adapter\.js/));
test('detecta que el service worker precargue el WAV máster', () =>
  expectFail(d => edit(d, `${A}/sw.js`, s => s.replace("'./manifest.webmanifest'", "'./assets/audio/ambiente-capitolio-master.wav','./manifest.webmanifest'")), /no debe precargar másteres WAV/));
test('detecta que Web y Android compartan identificador de caché', () =>
  expectFail(d => edit(d, `${A}/sw.js`, s => s.replace(/const CACHE='[^']+'/, "const CACHE='la-cosecha-v4-8'")), /mismo identificador de caché/));
