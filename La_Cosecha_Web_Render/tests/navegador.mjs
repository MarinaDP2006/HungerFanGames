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
  // Como Render: cualquier ruta sin extensión devuelve index.html (direcciones /distritos/12).
  let f = path.join(web, p === '/' || !path.extname(p) ? 'index.html' : p);
  if (!f.startsWith(web) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end('no'); }
  res.writeHead(200, { 'Content-Type': TIPOS[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise(r => server.listen(0, r));
const base = `http://localhost:${server.address().port}/`;

const rutas = ['', 'distritos', 'distritos/12', 'distritos/13', 'capitolio', 'personajes', 'personajes/katniss-everdeen', 'juegos', 'juegos/74', 'cronologia', 'gira', 'rebelion-y-guerra', 'lugares', 'galeria', 'documentos', 'acerca'];
const capturas = new Set(['', 'distritos', 'distritos/12', 'capitolio', 'personajes', 'personajes/katniss-everdeen', 'juegos', 'cronologia', 'gira', 'lugares', 'galeria', 'acerca']);
const MENU = ['Inicio', 'Distritos', 'Capitolio', 'Personajes', 'Juegos', 'Cronología', 'Gira de la Victoria', 'Rebelión y Guerra', 'Lugares', 'Galería', 'Documentos', 'Acerca'];
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail: String(detail) }); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ' · ' + detail : ''}`); };

const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome' });
try {
  for (const [nombre, viewport] of [['movil', { width: 390, height: 844 }], ['escritorio', { width: 1280, height: 900 }]]) {
    const page = await browser.newPage({ viewport, serviceWorkers: 'block', reducedMotion: 'reduce' });
    const errores = [], rotos = [];
    page.on('pageerror', e => errores.push(e.message));
    page.on('console', m => { if (m.type() === 'error' && !(m.location()?.url || '').includes('/imagenes-propias/')) errores.push(m.text()); });
    page.on('response', r => { if (r.status() >= 400 && !r.url().includes('/imagenes-propias/')) rotos.push(`${r.status()} ${r.url()}`); });
    for (const r of rutas) {
      await page.goto(base + r);
      await page.waitForSelector('#contenido h1');
      const titulo = await page.textContent('#contenido h1');
      check(`${nombre} · #/${r}`, titulo && !/no encontrado/i.test(titulo), titulo);
      if (capturas.has(r)) await page.screenshot({ path: path.join(OUT, `${nombre}-${(r || 'portada').replace(/\//g, '-')}.png`), fullPage: true });
    }
    // Menú definitivo y navegación con él: cada enlace lleva a su dirección sin recargar y la marca como actual.
    await page.goto(base);
    const etiquetas = await page.$$eval('#navegacion a', as => as.map(a => a.textContent.trim()));
    check(`${nombre} · menú definitivo`, JSON.stringify(etiquetas) === JSON.stringify(MENU), etiquetas.join(' · '));
    await page.evaluate(() => { window.__sinRecargar = true; });
    for (const s of ['distritos', 'capitolio', 'personajes', 'juegos', 'gira', 'rebelion-y-guerra', 'lugares', 'acerca']) {
      await page.click(`#navegacion a[data-seccion="${s}"]`);
      await page.waitForFunction(x => document.documentElement.dataset.ruta === x, s);
      check(`${nombre} · menú → /${s}`, new URL(page.url()).pathname === `/${s}` && await page.getAttribute(`#navegacion a[data-seccion="${s}"]`, 'aria-current') === 'page');
    }
    await page.goBack();
    await page.waitForFunction(() => document.documentElement.dataset.ruta === 'lugares');
    check(`${nombre} · botón Atrás del navegador`, await page.evaluate(() => window.__sinRecargar === true), new URL(page.url()).pathname);
    await page.goto(base + '#/juegos/74');
    check(`${nombre} · direcciones antiguas «#/…» se convierten`, new URL(page.url()).pathname === '/juegos/74');
    await page.goto(base + 'no-existe');
    check(`${nombre} · página no encontrada`, /no encontrado/i.test(await page.textContent('#contenido h1')));
    // Filtros de personajes
    await page.goto(base + 'personajes');
    await page.fill('input[name=q]', 'haymitch');
    check(`${nombre} · búsqueda de personajes`, /^1 de/.test(await page.textContent('.recuento')), await page.textContent('.recuento'));
    await page.fill('input[name=q]', '');
    await page.selectOption('select[name=distrito]', '12');
    check(`${nombre} · filtro por distrito`, /^5 de/.test(await page.textContent('.recuento')), await page.textContent('.recuento'));
    await page.click('a.tarjeta-personaje');
    check(`${nombre} · ficha desde el listado`, /\/personajes\/.+/.test(new URL(page.url()).pathname));
    // Volver: regresa al listado sin recargar.
    await page.click('[data-volver]'); await page.waitForTimeout(500);
    check(`${nombre} · «Volver» regresa al listado`, new URL(page.url()).pathname === '/personajes', page.url());
    // Memoria de lectura: al volver atrás desde una ficha, la página recupera su posición.
    await page.goto(base + 'lugares'); await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 600)); await page.waitForTimeout(200);
    const y0 = await page.evaluate(() => window.scrollY);
    await page.$eval('a[href="/juegos/74"]', a => a.click()); await page.waitForTimeout(500);
    await page.goBack(); await page.waitForTimeout(600);
    const y1 = await page.evaluate(() => window.scrollY);
    check(`${nombre} · atrás recupera la posición de lectura`, y0 > 0 && Math.abs(y1 - y0) < 40, `${y0} → ${y1}`);
    check(`${nombre} · barra de lectura`, !!(await page.$('.progreso-lectura')));
    await page.goto(base + 'distritos/12'); await page.waitForTimeout(400); await page.keyboard.press('Escape'); await page.waitForTimeout(500);
    check(`${nombre} · Escape vuelve al nivel anterior`, new URL(page.url()).pathname === '/distritos', page.url());
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
