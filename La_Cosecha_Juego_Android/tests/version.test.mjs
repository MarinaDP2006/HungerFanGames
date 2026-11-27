// Versión única del juego: package.json → js/version.js, caché del service worker y versionName del APK.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { GAME_VERSION } from '../js/version.js';
import { versionCodeOf, patchGradle } from '../scripts/android-version.mjs';

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const sw = fs.readFileSync(new URL('../sw.js', import.meta.url), 'utf8');
const changelog = fs.readFileSync(new URL('../CHANGELOG.md', import.meta.url), 'utf8');

test('js/version.js coincide con package.json', () => assert.equal(GAME_VERSION, pkg.version));
test('el identificador de caché del service worker incluye la versión', () => assert.match(sw, new RegExp(`const CACHE='la-cosecha-android-${pkg.version.replace(/\./g, '\\.')}'`)));
test('la última entrada del CHANGELOG corresponde a la versión', () => {
  const [maj, min] = pkg.version.split('.');
  assert.match(changelog.match(/^## .*/m)[0], new RegExp(`^## ${maj}\\.${min}\\b`));
});
test('versionCode = MAYOR*10000 + MENOR*100 + PARCHE', () => {
  assert.equal(versionCodeOf('4.9.0'), 40900);
  assert.equal(versionCodeOf('4.10.2'), 41002);
  assert.equal(versionCodeOf('5.0.0'), 50000);
  assert.ok(versionCodeOf('4.10.0') > versionCodeOf('4.9.9'), 'siempre crece');
  assert.throws(() => versionCodeOf('4.9'));
  assert.throws(() => versionCodeOf('4.100.0'));
});
test('patchGradle cambia versionName y versionCode del build.gradle de Capacitor', () => {
  const gradle = 'android {\n  defaultConfig {\n    applicationId "com.lacosecha.panem"\n    versionCode 1\n    versionName "1.0"\n  }\n}\n';
  const out = patchGradle(gradle, pkg.version);
  assert.match(out, new RegExp(`versionName "${pkg.version.replace(/\./g, '\\.')}"`));
  assert.match(out, new RegExp(`versionCode ${versionCodeOf(pkg.version)}\\b`));
  assert.ok(out.includes('applicationId "com.lacosecha.panem"'), 'el resto no cambia');
  assert.throws(() => patchGradle('android {}', pkg.version), /no contiene versionCode/);
});
