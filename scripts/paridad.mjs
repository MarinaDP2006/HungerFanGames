// Contratos entre los dos productos de La Cosecha.
//
// Desde la separación, Android (el videojuego) y la Web (Archivo de Panem) NO comparten interfaz
// ni funcionamiento. Esta comprobación ya no exige archivos iguales: protege solo lo que de verdad
// es común y vigila que los productos no se vuelvan a mezclar.
//
//   1. Datos compartidos: cada módulo de compartido/ está copiado, idéntico, en los dos productos.
//   2. Imágenes originales: si un archivo de assets/ está en los dos productos, es idéntico.
//   3. Separación de la Web: entra por js/archivo.js, no contiene módulos ni pantallas del juego,
//      ni partidas, ni guardado.
//   4. Separación de Android: el juego no carga nada del Archivo.
//   5. Cada producto se sostiene solo: todo lo que importa existe en su propia carpeta y ninguno
//      referencia archivos de la otra.
//   6. Service workers: la Web precarga sus módulos; Android no intercepta peticiones (los archivos
//      van en el APK); ninguno precarga el WAV máster; identificadores distintos.
//
// `node scripts/paridad.mjs --explicar` muestra las reglas.
import fs from 'node:fs';
import path from 'node:path';
import { check as checkShared, sharedFiles, destino } from './sincronizar-compartido.mjs';

// PARIDAD_ROOT permite ejecutar la comprobación sobre una copia (lo usa scripts/paridad.test.mjs).
const root = process.env.PARIDAD_ROOT || path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WEB = path.join(root, 'La_Cosecha_Web_Render');
const APP = path.join(root, 'La_Cosecha_Juego_Android');
const ENTRADA = { Web: 'js/archivo.js', Android: 'js/app.js' };

const exists = (base, f) => fs.existsSync(path.join(base, f));
const read = (base, f) => fs.readFileSync(path.join(base, f), 'utf8');
const list = (base, rel) => {
  const full = path.join(base, rel);
  if (!fs.existsSync(full)) return [];
  if (fs.statSync(full).isFile()) return [rel];
  return fs.readdirSync(full).flatMap(f => list(base, path.posix.join(rel, f)));
};
const problems = [];

// Grafo de módulos desde la entrada (imports estáticos y dinámicos relativos).
function modulos(base, entrada) {
  const vistos = new Set();
  const pila = [entrada];
  while (pila.length) {
    const f = pila.pop();
    if (vistos.has(f)) continue;
    vistos.add(f);
    if (!exists(base, f)) continue;
    for (const m of read(base, f).matchAll(/(?:from\s*|import\s*\(?\s*)['"](\.{1,2}\/[^'"]+)['"]/g))
      pila.push(path.posix.normalize(path.posix.join(path.posix.dirname(f), m[1])));
  }
  return [...vistos];
}

// 1. Datos compartidos
const compartidos = sharedFiles(root).map(destino);
problems.push(...checkShared(root));

// 2. Imágenes comunes
let imagenesComunes = 0;
const assetsWeb = new Set(list(WEB, 'assets'));
for (const f of list(APP, 'assets')) {
  if (!assetsWeb.has(f)) continue;
  if (!fs.readFileSync(path.join(APP, f)).equals(fs.readFileSync(path.join(WEB, f)))) problems.push(`Imagen común con contenido distinto: ${f}`);
  else imagenesComunes++;
}

// 3. Separación de la Web
const modWeb = modulos(WEB, ENTRADA.Web);
const modApp = modulos(APP, ENTRADA.Android);
const html = exists(WEB, 'index.html') ? read(WEB, 'index.html') : '';
if (!/<script[^>]+src="js\/archivo\.js"/.test(html)) problems.push('La Web debe entrar por js/archivo.js');
const juego = list(APP, 'js').filter(f => !compartidos.includes(f));             // módulos propios del videojuego
for (const f of juego) if (exists(WEB, f)) problems.push(`La Web contiene un módulo del videojuego: ${f}`);
if (exists(WEB, 'css/style.css')) problems.push('La Web contiene la hoja de estilos del videojuego (css/style.css)');
const textoWeb = [...list(WEB, 'js').filter(f => !compartidos.includes(f)), 'index.html'].filter(f => exists(WEB, f)).map(f => [f, read(WEB, f)]);
for (const [f, t] of textoWeb) {
  for (const g of juego) if (t.includes(path.posix.basename(g))) problems.push(`La Web referencia el módulo del videojuego ${g} (${f})`);
  if (/laCosechaSave|laCosechaSettings/.test(t)) problems.push(`La Web usa claves de partidas o ajustes del videojuego (${f})`);
  if (/\bdata-a=|save-indicator/.test(t)) problems.push(`La Web contiene controles de las pantallas del juego (${f})`);
}

// 4. Separación de Android
for (const f of modApp) if (/archivo[\w-]*\.js$/.test(f)) problems.push(`El videojuego carga un módulo del Archivo: ${f}`);
if (exists(APP, 'index.html') && /archivo\.js|archivo\.css/.test(read(APP, 'index.html'))) problems.push('El videojuego referencia la entrada o el estilo del Archivo');

// 5. Cada producto se sostiene solo
for (const [nombre, base, mods] of [['Web', WEB, modWeb], ['Android', APP, modApp]]) {
  for (const f of mods) if (!exists(base, f)) problems.push(`${nombre}: ${f} se importa pero no existe`);
  for (const f of list(base, '.').filter(f => /\.(html|js|css|webmanifest)$/.test(f) && !/(^|\/)(node_modules|www|android)\//.test(f)))
    if (/La_Cosecha_(Web_Render|Juego_Android)\//.test(read(base, f))) problems.push(`${nombre}: ${f} apunta a la carpeta del otro producto`);
}

// 6. Service workers
const ids = {};
for (const [nombre, base, mods] of [['Web', WEB, modWeb], ['Android', APP, modApp]]) {
  if (!exists(base, 'sw.js')) { problems.push(`${nombre}: falta sw.js`); continue; }
  const sw = read(base, 'sw.js');
  ids[nombre] = sw.match(/const CACHE='([^']+)'/)?.[1];
  if (!ids[nombre]) problems.push(`${nombre}: sw.js sin identificador`);
  const intercepta = /addEventListener\('fetch'/.test(sw);
  if (nombre === 'Android' && intercepta) problems.push('Android: sw.js no debe interceptar peticiones (los archivos van en el APK)');
  if (nombre === 'Web') {
    if (!intercepta) problems.push('Web: sw.js debe servir el Archivo sin conexión');
    for (const f of [...mods, 'index.html']) if (!sw.includes(`'./${f}'`)) problems.push(`Web: sw.js no precarga ${f}`);
  }
  for (const m of sw.matchAll(/'\.\/([^']+)'/g)) if (m[1] && !exists(base, m[1])) problems.push(`${nombre}: sw.js precarga ${m[1]}, que no existe`);
  if (/\.wav'/i.test(sw)) problems.push(`${nombre}: sw.js no debe precargar másteres WAV`);
}
if (ids.Web && ids.Web === ids.Android) problems.push(`La Web y Android usan el mismo identificador de service worker (${ids.Web})`);

// Configuración de cada producto
const ry = exists(root, 'render.yaml') ? read(root, 'render.yaml') : '';
if (!/rootDir:\s*La_Cosecha_Web_Render/.test(ry)) problems.push('render.yaml (raíz) no apunta a La_Cosecha_Web_Render');
if (exists(APP, 'package.json')) {
  const pkg = JSON.parse(read(APP, 'package.json'));
  const last = read(APP, 'CHANGELOG.md').match(/^## (\d+\.\d+(?:\.\d+)?)/m)?.[1];
  if (last && !pkg.version.startsWith(last)) problems.push(`Android: package.json dice ${pkg.version} y su CHANGELOG ${last}`);
}

if (process.argv.includes('--explicar')) {
  console.log(fs.readFileSync(new URL(import.meta.url), 'utf8').split('\n').filter(l => l.startsWith('//')).slice(0, 18).join('\n'));
  console.log(`\nDatos compartidos: ${compartidos.join(', ')}\nMódulos del Archivo (Web): ${modWeb.join(', ')}\nMódulos del videojuego (Android): ${modApp.join(', ')}\n`);
}
if (problems.length) {
  console.error(`Contratos Android / Web: ${problems.length} problemas\n- ` + problems.join('\n- '));
  process.exit(1);
}
console.log(`Contratos Android / Web: OK (${compartidos.length} módulo de datos compartido idéntico, ${imagenesComunes} imágenes comunes idénticas, Web con ${modWeb.length} módulos propios sin juego, Android con ${modApp.length} módulos sin el Archivo)`);
