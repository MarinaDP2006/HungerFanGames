// Paridad Web / Android de La Cosecha.
//
// La Web y el Juego Android son dos productos con funciones distintas. Esta comprobación NO exige
// que tengan los mismos archivos: protege lo que de verdad comparten y permite, de forma explícita
// y documentada, lo que es propio de cada plataforma. Cualquier archivo que no encaje en una de
// estas categorías es un error, para seguir detectando divergencias accidentales.
//
//   1. COMPARTIDO OBLIGATORIO  → debe existir en los dos productos y ser idéntico.
//   2. COMPARTIDO SI EXISTE    → si está en los dos, debe ser idéntico; puede faltar en uno.
//   3. PROPIO DE PLATAFORMA    → existe en los dos y puede diferir (motivo documentado).
//   4. SOLO ANDROID / SOLO WEB → lista cerrada y justificada.
//   5. Comprobaciones de integridad propias de cada plataforma.
//
// `node scripts/paridad.mjs --explicar` muestra las reglas y sus motivos.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// PARIDAD_ROOT permite ejecutar la comprobación sobre una copia (lo usa scripts/paridad.test.mjs).
const root = process.env.PARIDAD_ROOT || path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const WEB = path.join(root, 'La_Cosecha_Web_Render');
const APP = path.join(root, 'La_Cosecha_Juego_Android');
const SCOPE = ['index.html', 'sw.js', 'manifest.webmanifest', 'css', 'js', 'assets', 'tests'];

// 1. Datos canónicos y recursos visuales: una sola fuente de verdad para los dos productos.
const SHARED_REQUIRED = [
  [/^js\/data\.js$/, 'Datos canónicos de Panem (distritos, personajes, ediciones).'],
  [/^assets\/[^/]+\.(png|jpe?g|webp)$/, 'Imágenes originales del proyecto.'],
  [/^assets\/optimized\//, 'Versiones optimizadas de las imágenes.'],
  [/^assets\/tributes\//, 'Retratos originales de tributos.'],
  [/^assets\/icons\//, 'Iconos y favicon.'],
];

// 2. Código y pruebas comunes mientras ambos productos los usen. Si uno deja de usarlos
//    (p. ej. la Web cuando se separe del motor), pueden faltar en ese producto.
const SHARED_IF_PRESENT = [
  [/^js\/(campaigns|whatif|presidency)\.js$/, 'Módulos de juego comunes mientras la Web los conserve.'],
  [/^css\/style\.css$/, 'Estilos comunes mientras la Web conserve la misma identidad visual.'],
  [/^tests\/presidency\.mjs$/, 'Prueba independiente del entorno de cada producto.'],
];

// 3. Propios de cada plataforma: existen en los dos y pueden diferir.
const PLATFORM_SPECIFIC = [
  [/^js\/app\.js$/, 'Punto de entrada de cada producto. Android integra la campaña del 50.º (5.1 + 5.5).'],
  [/^index\.html$/, 'Página de entrada de cada producto.'],
  [/^sw\.js$/, 'Service worker con identificador de caché y lista de precarga propios.'],
  [/^manifest\.webmanifest$/, 'Manifiesto de instalación de cada plataforma.'],
  [/^tests\/(smoke|campaigns|saves)\.mjs$/, 'Cargan app.js en un entorno aislado e inyectan los módulos que importa cada producto.'],
];

// 4. Solo en Android (lista cerrada).
const ONLY_ANDROID = [
  [/^js\/campaign-50th-(prearena|dynamic-adapter|dynamic|arena)\.js$/, 'Campaña del 50.º Vasallaje (5.1, 5.5 y módulos de referencia 5.x).'],
  [/^js\/canon-50th\.js$/, 'Datos canónicos de la campaña del 50.º.'],
  [/^js\/music\.js$/, 'Módulo de música del juego (todavía sin conectar).'],
  [/^js\/(version|settings|saves)\.js$/, 'Versión del juego, Ajustes y ranuras de guardado (fase 1). La Web no los usa.'],
  [/^assets\/audio\/[^/]+\.(ogg|wav)$/, 'Audio original del juego. El WAV es el máster y no viaja en el APK.'],
  [/^tests\/campaign-50th-[a-z-]+(\.test)?\.mjs$/, 'Pruebas de la campaña del 50.º.'],
  [/^tests\/bundle-android\.test\.mjs$/, 'Prueba del empaquetado del APK (www/): exclusión del WAV y caché de Android.'],
  [/^tests\/(version|settings|saves-slots)\.test\.mjs$/, 'Pruebas de la versión, los Ajustes y las ranuras de guardado de Android.'],
  [/^tests\/device\/[\w.-]+\.mjs$/, 'Prueba del APK en un emulador o dispositivo Android.'],
];
const ONLY_WEB = [];

// Configuración y documentación de cada plataforma (fuera del alcance comparado).
const PLATFORM_FILES = {
  web: ['README_RENDER.md'],
  android: ['package.json', 'capacitor.config.json', 'scripts/build-web.mjs', 'scripts/android-version.mjs', 'README_ANDROID.md', 'CHANGELOG.md', 'docs/VERSIONADO.md'],
};

const list = (base, rel) => {
  const full = path.join(base, rel);
  if (!fs.existsSync(full)) return [];
  if (fs.statSync(full).isFile()) return [rel];
  return fs.readdirSync(full).flatMap(f => list(base, path.posix.join(rel, f)));
};
const hash = f => crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const match = (rules, f) => rules.find(([re]) => re.test(f));
const read = (base, f) => fs.readFileSync(path.join(base, f), 'utf8');

const problems = [];
const report = { shared: 0, sharedIfPresent: 0, platform: 0, onlyAndroid: 0, onlyWeb: 0 };
const web = new Set(SCOPE.flatMap(r => list(WEB, r)));
const app = new Set(SCOPE.flatMap(r => list(APP, r)));

for (const f of [...new Set([...web, ...app])].sort()) {
  const inWeb = web.has(f), inApp = app.has(f);
  const same = inWeb && inApp && hash(path.join(WEB, f)) === hash(path.join(APP, f));
  if (match(SHARED_REQUIRED, f)) {
    if (!inWeb) problems.push(`Compartido obligatorio que falta en la Web: ${f}`);
    else if (!inApp) problems.push(`Compartido obligatorio que falta en Android: ${f}`);
    else if (!same) problems.push(`Compartido obligatorio con contenido distinto: ${f}`);
    else report.shared++;
  } else if (match(SHARED_IF_PRESENT, f)) {
    if (inWeb && inApp && !same) problems.push(`Compartido con contenido distinto: ${f}`);
    else report.sharedIfPresent++;
  } else if (match(PLATFORM_SPECIFIC, f)) {
    if (!inWeb || !inApp) problems.push(`Archivo de plataforma que falta en ${inWeb ? 'Android' : 'la Web'}: ${f}`);
    else report.platform++;
  } else if (inApp && !inWeb && match(ONLY_ANDROID, f)) {
    report.onlyAndroid++;
  } else if (inWeb && !inApp && match(ONLY_WEB, f)) {
    report.onlyWeb++;
  } else if (inWeb && inApp && same) {
    report.sharedIfPresent++;
  } else {
    problems.push(inWeb && inApp
      ? `Archivo sin categoría con contenido distinto: ${f}`
      : `Archivo sin categoría que solo está en ${inWeb ? 'la Web' : 'Android'}: ${f}`);
  }
}

// 5. Integridad de cada plataforma.
const caches = {};
for (const [name, base] of [['Web', WEB], ['Android', APP]]) {
  const sw = read(base, 'sw.js');
  const appJs = read(base, 'js/app.js');
  caches[name] = sw.match(/const CACHE='([^']+)'/)?.[1];
  if (!caches[name]) problems.push(`${name}: sw.js sin identificador de caché`);
  // Todo módulo que importa app.js debe precargarse para funcionar sin conexión.
  for (const m of appJs.matchAll(/from '\.\/([\w.-]+\.js)'/g))
    if (!sw.includes(`./js/${m[1]}`)) problems.push(`${name}: sw.js no precarga js/${m[1]}, que importa app.js`);
  // Todo lo que precarga sw.js debe existir.
  for (const m of sw.matchAll(/'\.\/([^']+)'/g))
    if (m[1] && !fs.existsSync(path.join(base, m[1]))) problems.push(`${name}: sw.js precarga ${m[1]}, que no existe`);
  if (/\.wav'/i.test(sw)) problems.push(`${name}: sw.js no debe precargar másteres WAV`);
}
if (caches.Web && caches.Web === caches.Android)
  problems.push(`La Web y Android usan el mismo identificador de caché (${caches.Web})`);

// La Web no puede depender de archivos que solo existen en Android.
const androidOnly = [...app].filter(a => !web.has(a));
for (const f of [...web].filter(f => /\.(html|js|css|webmanifest)$/.test(f))) {
  const text = read(WEB, f);
  for (const a of androidOnly) if (text.includes(path.posix.basename(a))) problems.push(`La Web referencia ${a}, que solo existe en Android (${f})`);
}
for (const f of PLATFORM_FILES.web) if (!fs.existsSync(path.join(WEB, f))) problems.push(`Falta en la Web: ${f}`);
for (const f of PLATFORM_FILES.android) if (!fs.existsSync(path.join(APP, f))) problems.push(`Falta en Android: ${f}`);
const ry = fs.existsSync(path.join(root, 'render.yaml')) ? fs.readFileSync(path.join(root, 'render.yaml'), 'utf8') : '';
if (!/rootDir:\s*La_Cosecha_Web_Render/.test(ry)) problems.push('render.yaml (raíz) no apunta a La_Cosecha_Web_Render');
// Versión de Android: se compara con el CHANGELOG de Android.
const pkg = JSON.parse(read(APP, 'package.json'));
const last = read(APP, 'CHANGELOG.md').match(/^## (\d+\.\d+)/m)?.[1];
if (last && !pkg.version.startsWith(last)) problems.push(`Android: package.json dice ${pkg.version} y su CHANGELOG ${last}`);

if (process.argv.includes('--explicar')) {
  const show = (t, rules) => console.log(`\n${t}\n` + rules.map(([re, why]) => `  ${re.source}  →  ${why}`).join('\n'));
  show('1. Compartido obligatorio (idéntico en los dos):', SHARED_REQUIRED);
  show('2. Compartido si existe en los dos (idéntico si está en ambos):', SHARED_IF_PRESENT);
  show('3. Propio de cada plataforma (puede diferir):', PLATFORM_SPECIFIC);
  show('4. Solo Android (lista cerrada):', ONLY_ANDROID);
  console.log('');
}
if (problems.length) {
  console.error(`Paridad: ${problems.length} problemas\n- ` + problems.join('\n- '));
  process.exit(1);
}
console.log(`Paridad Web / Android: OK (${report.shared} compartidos obligatorios idénticos, ${report.sharedIfPresent} compartidos idénticos, ${report.platform} propios de plataforma, ${report.onlyAndroid} solo Android, ${report.onlyWeb} solo Web)`);
