// Archivo de Panem en un navegador real (Chrome): recorre todas las secciones en móvil y escritorio,
// navega con el menú, usa los filtros y comprueba que no hay errores ni recursos rotos.
// Deja capturas en web-report/. Uso: node La_Cosecha_Web_Render/tests/navegador.mjs
// CHROME=/ruta/a/chrome para elegir el navegador (por defecto, el Chrome del sistema).
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { chromium } from 'playwright-core';

const web = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.resolve('web-report');
fs.mkdirSync(OUT, { recursive: true });
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let f = path.join(web, p === '/' ? 'index.html' : p);
  if (!f.startsWith(web) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, r));
const base = `http://localhost:${server.address().port}/`;

const rutas = ['', 'mapa', 'distritos', 'distritos/12', 'distritos/13', 'capitolio', 'personajes', 'personajes/katniss-everdeen', 'vencedores', 'ediciones', 'ediciones/74', 'cronologia', 'arenas', 'documentos', 'galeria', 'novedades'];
const capturas = new Set(['', 'mapa', 'distritos', 'distritos/12', 'personajes', 'personajes/katniss-everdeen', 'ediciones', 'cronologia', 'galeria']);
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail: String(detail) }); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' · ' + detail : ''}`); };

const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome' });
try {
  for (const [nombre, viewport] of [['movil', { width: 390, height: 844 }], ['escritorio', { width: 1280, height: 900 }]]) {
    const page = await browser.newPage({ viewport, serviceWorkers: 'block', reducedMotion: 'reduce' });
    const errores = [], rotos = [];
    page.on('pageerror', e => errores.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errores.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400) rotos.push(`${r.status()} ${r.url()}`); });
    for (const r of rutas) {
      await page.goto(base + '#/' + r);
      await page.waitForSelector('#contenido h1');
      const titulo = await page.textContent('#contenido h1');
      check(`${nombre} · #/${r}`, titulo && !/no encontrado/i.test(titulo), titulo);
      if (capturas.has(r)) await page.screenshot({ path: path.join(OUT, `${nombre}-${(r || 'portada').replace(/\//g, '-')}.png`), fullPage: true });
    }
    // Navegar con el menú: cada enlace lleva a su sección y la marca como actual.
    await page.goto(base + '#/');
    for (const s of ['distritos', 'personajes', 'ediciones', 'galeria']) {
      await page.click(`#navegacion a[data-seccion="${s}"]`);
      await page.waitForFunction(x => document.documentElement.dataset.ruta === x, s);
      check(`${nombre} · menú → ${s}`, await page.getAttribute(`#navegacion a[data-seccion="${s}"]`, 'aria-current') === 'page');
    }
    // Filtros de personajes
    await page.goto(base + '#/personajes');
    await page.fill('input[name=q]', 'haymitch');
    check(`${nombre} · búsqueda de personajes`, /^1 de/.test(await page.textContent('.recuento')), await page.textContent('.recuento'));
    await page.fill('input[name=q]', '');
    await page.selectOption('select[name=distrito]', '12');
    check(`${nombre} · filtro por distrito`, /^3 de/.test(await page.textContent('.recuento')), await page.textContent('.recuento'));
    await page.click('a.tarjeta-personaje');
    check(`${nombre} · ficha desde el listado`, /#\/personajes\/.+/.test(page.url()));
    // Separación: nada del videojuego en el documento.
    const juego = await page.evaluate(() => ({ app: [...document.scripts].some(s => /app\.js/.test(s.src)), botones: document.querySelectorAll('[data-a]').length, partidas: Object.keys(localStorage).filter(k => /laCosecha/.test(k)) }));
    check(`${nombre} · sin motor ni partidas del videojuego`, !juego.app && juego.botones === 0 && juego.partidas.length === 0, JSON.stringify(juego));
    // Sin desbordamiento horizontal en móvil.
    if (nombre === 'movil') {
      const ancho = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check('movil · sin desplazamiento horizontal', ancho <= 0, `${ancho}px`);
    }
    check(`${nombre} · sin errores de JavaScript`, errores.length === 0, errores.slice(0, 3).join(' | '));
    check(`${nombre} · sin recursos rotos`, rotos.length === 0, rotos.slice(0, 3).join(' | '));
    await page.close();
  }
} catch (e) {
  check('Recorrido sin excepciones', false, e.message);
} finally {
  await browser.close();
  server.close();
}
const failed = results.filter(r => !r.ok);
const md = ['# Archivo de Panem en Chrome', '', `- Resultado: ${failed.length ? `${failed.length} comprobaciones fallidas` : `${results.length} comprobaciones superadas`}`, '', '| Comprobación | Resultado | Detalle |', '|---|---|---|', ...results.map(r => `| ${r.name} | ${r.ok ? '✅' : '❌'} | ${r.detail.replace(/\|/g, '/')} |`)].join('\n');
fs.writeFileSync(path.join(OUT, 'informe.md'), md + '\n');
process.exit(failed.length ? 1 : 0);
