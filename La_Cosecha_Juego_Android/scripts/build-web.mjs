// Genera www/ (lo que Capacitor empaqueta en el APK) con SOLO lo que la aplicación usa.
//
// En lugar de copiar carpetas enteras, sigue el uso real:
//   1. index.html, manifest.webmanifest y sw.js.
//   2. Las hojas de estilo enlazadas desde index.html.
//   3. Los módulos JS que se cargan desde index.html y todo lo que importan (imports estáticos y
//      dinámicos), de forma recursiva.
//   4. Los recursos de assets/ referenciados desde esos archivos, incluidos los que el código compone
//      con plantillas (p. ej. `assets/tributes/tribute-${id}.jpg`).
// Así no viajan en el APK los módulos que se conservan solo como referencia (5.2, campaign-50th-dynamic,
// canon-50th, music mientras no se conecte), ni imágenes sin uso, ni los másteres WAV.
// Los archivos excluidos siguen en el repositorio.
//
// `node scripts/build-web.mjs --informe` muestra qué se incluye y qué se deja fuera.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const out = path.join(root, 'www');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const exists = f => fs.existsSync(path.join(root, f));
const walk = d => fs.readdirSync(path.join(root, d)).flatMap(f => {
  const p = path.posix.join(d, f);
  return fs.statSync(path.join(root, p)).isDirectory() ? walk(p) : [p];
});
const norm = (from, ref) => path.posix.normalize(path.posix.join(path.posix.dirname(from), ref.replace(/^\.\//, '')));

// La versión visible (js/version.js) y la del caché del service worker deben coincidir con package.json.
const pkgVersion = JSON.parse(read('package.json')).version;
const jsVersion = read('js/version.js').match(/GAME_VERSION\s*=\s*'([^']+)'/)?.[1];
if (jsVersion !== pkgVersion) throw new Error(`build-web: js/version.js dice ${jsVersion} y package.json ${pkgVersion}`);
if (!read('sw.js').includes(`const CACHE='la-cosecha-android-${pkgVersion}'`)) throw new Error(`build-web: el identificador de caché de sw.js no corresponde a la versión ${pkgVersion}`);

const include = new Set(['index.html', 'manifest.webmanifest', 'sw.js']);
// Música original aprobada: viaja en el APK aunque hoy ningún módulo activo la reproduce
// (js/music.js está fuera del bundle). Antes entraba porque la precargaba el service worker.
const AUDIO_CONSERVADO = ['assets/audio/ambiente-capitolio-original.ogg'];
for (const f of AUDIO_CONSERVADO) include.add(f);
const html = read('index.html');

// 2. Hojas de estilo enlazadas.
for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g))
  if (!/^https?:/.test(m[1])) include.add(norm('index.html', m[1]));

// 3. Grafo de módulos desde los <script src> de index.html.
const queue = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map(m => norm('index.html', m[1]));
const modules = new Set();
while (queue.length) {
  const f = queue.shift();
  if (modules.has(f)) continue;
  if (!exists(f)) throw new Error(`build-web: ${f} se carga pero no existe`);
  modules.add(f);
  const src = read(f);
  for (const m of src.matchAll(/(?:\bimport\s[^'"]*?\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)['"](\.{1,2}\/[^'"]+)['"]/g))
    queue.push(norm(f, m[1]));
}
modules.forEach(f => include.add(f));

// 4. Recursos referenciados desde los archivos incluidos.
const assets = walk('assets').filter(a => !/-master\.wav$/i.test(a));
const text = [...include].filter(f => /\.(html|js|css|webmanifest)$/.test(f)).map(read).join('\n');
const usedAssets = new Set();
for (const a of assets) {
  const name = path.posix.basename(a);
  if (text.includes(a) || text.includes(name)) usedAssets.add(a);
}
// Plantillas del tipo `assets/carpeta/prefijo${…}sufijo`.
for (const m of text.matchAll(/assets\/([\w/-]+\/)?([\w-]*)\$\{[^}]+\}([\w.-]*)/g)) {
  const [, dir = '', prefix, suffix] = m;
  for (const a of assets)
    if (a.startsWith(`assets/${dir}${prefix}`) && a.endsWith(suffix) && !a.slice(`assets/${dir}`.length).includes('/')) usedAssets.add(a);
}
usedAssets.forEach(a => include.add(a));

// Todo lo que precarga el service worker tiene que estar en el bundle.
for (const m of read('sw.js').matchAll(/'\.\/([^']+)'/g))
  if (m[1] && !include.has(m[1])) throw new Error(`build-web: sw.js precarga ${m[1]}, que no está en el bundle`);

fs.rmSync(out, { recursive: true, force: true });
for (const f of include) {
  fs.mkdirSync(path.join(out, path.dirname(f)), { recursive: true });
  fs.copyFileSync(path.join(root, f), path.join(out, f));
}

const left = [...walk('js'), ...walk('assets'), ...walk('css')].filter(f => !include.has(f));
if (process.argv.includes('--informe')) {
  console.log('Incluidos:\n  ' + [...include].sort().join('\n  '));
  console.log('Fuera del bundle (se conservan en el repositorio):\n  ' + left.sort().join('\n  '));
}
console.log(`Web bundle copied to www/: ${include.size} archivos (${modules.size} módulos JS, ${usedAssets.size} recursos); ${left.length} archivos sin uso fuera del bundle (másteres WAV excluidos)`);
