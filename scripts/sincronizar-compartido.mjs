// Copia los módulos de compartido/ a cada producto (La Cosecha Android y Archivo de Panem Web).
// Cada producto se publica por separado (Render solo ve La_Cosecha_Web_Render/, el APK solo
// La_Cosecha_Juego_Android/), así que llevan una copia; esta es la única forma de actualizarla.
//   node scripts/sincronizar-compartido.mjs              → copia
//   node scripts/sincronizar-compartido.mjs --comprobar  → falla si alguna copia no es idéntica
import fs from 'node:fs';
import path from 'node:path';

const root = process.env.PARIDAD_ROOT || path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
export const SHARED_DIR = 'compartido';
export const PRODUCTS = ['La_Cosecha_Juego_Android', 'La_Cosecha_Web_Render'];
// Archivo de compartido/ → ruta dentro de cada producto.
export const destino = f => `js/${f}`;

export function sharedFiles(base = root) {
  return fs.readdirSync(path.join(base, SHARED_DIR)).filter(f => f.endsWith('.js')).sort();
}

export function check(base = root) {
  const problems = [];
  for (const f of sharedFiles(base)) {
    const src = fs.readFileSync(path.join(base, SHARED_DIR, f));
    for (const p of PRODUCTS) {
      const dst = path.join(base, p, destino(f));
      if (!fs.existsSync(dst)) problems.push(`${p}: falta ${destino(f)} (copia de ${SHARED_DIR}/${f})`);
      else if (!fs.readFileSync(dst).equals(src)) problems.push(`${p}: ${destino(f)} no es idéntico a ${SHARED_DIR}/${f}; edita ${SHARED_DIR}/${f} y sincroniza`);
    }
  }
  return problems;
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  if (process.argv.includes('--comprobar')) {
    const p = check();
    if (p.length) { console.error(p.join('\n')); process.exit(1); }
    console.log(`Módulos compartidos sincronizados: ${sharedFiles().join(', ')}`);
  } else {
    for (const f of sharedFiles()) for (const p of PRODUCTS) fs.copyFileSync(path.join(root, SHARED_DIR, f), path.join(root, p, destino(f)));
    console.log(`Copiados a ${PRODUCTS.join(' y ')}: ${sharedFiles().join(', ')}`);
  }
}
