// Copia la versión del juego (package.json) al proyecto Android generado por Capacitor.
//   versionName = versión del juego, p. ej. "4.9.0"
//   versionCode = MAYOR*10000 + MENOR*100 + PARCHE, p. ej. 4.9.0 → 40900
// Se ejecuta después de `npx cap add android` y antes de compilar con Gradle.
// Criterio completo: docs/VERSIONADO.md.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function versionCodeOf(version) {
  const m = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(version));
  if (!m) throw new Error(`Versión no válida: ${version} (se espera MAYOR.MENOR.PARCHE)`);
  const [major, minor, patch] = m.slice(1).map(Number);
  if (minor > 99 || patch > 99) throw new Error(`MENOR y PARCHE deben ser ≤ 99: ${version}`);
  return major * 10000 + minor * 100 + patch;
}

export function patchGradle(text, version) {
  const code = versionCodeOf(version);
  if (!/versionCode\s+\d+/.test(text) || !/versionName\s+"[^"]*"/.test(text))
    throw new Error('build.gradle no contiene versionCode / versionName');
  return text.replace(/versionCode\s+\d+/, `versionCode ${code}`).replace(/versionName\s+"[^"]*"/, `versionName "${version}"`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = process.cwd();
  const version = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8')).version;
  const gradle = path.join(root, 'android', 'app', 'build.gradle');
  if (!fs.existsSync(gradle)) throw new Error(`No existe ${gradle}: ejecuta antes «npx cap add android»`);
  fs.writeFileSync(gradle, patchGradle(fs.readFileSync(gradle, 'utf8'), version));
  console.log(`android/app/build.gradle: versionName "${version}", versionCode ${versionCodeOf(version)}`);
}
