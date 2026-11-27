// Archivo de Panem (Web): pruebas sin navegador de las vistas, rutas, datos y separación del juego.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import * as V from '../js/archivo-vistas.js';
import * as A from '../js/archivo-datos.js';
import { districts, characters, canonEditions } from '../js/data.js';

const web = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = f => fs.readFileSync(path.join(web, f), 'utf8');
const todas = () => [
  '', 'mapa', 'distritos', 'capitolio', 'personajes', 'vencedores', 'ediciones', 'cronologia', 'arenas', 'documentos', 'galeria', 'novedades',
  ...districts.map(d => `distritos/${d.id}`), ...A.PERSONAJES.map(c => `personajes/${c.slug}`), ...canonEditions.map(e => `ediciones/${e.year}`),
];

test('rutas: se interpretan las direcciones del archivo', () => {
  assert.deepEqual(V.parseRuta('#/distritos/12'), { seccion: 'distritos', id: '12' });
  assert.deepEqual(V.parseRuta('#/'), { seccion: '', id: null });
  assert.deepEqual(V.parseRuta(''), { seccion: '', id: null });
  assert.deepEqual(V.parseRuta('#/personajes/katniss-everdeen'), { seccion: 'personajes', id: 'katniss-everdeen' });
  assert.equal(V.enlace('ediciones', 74), '#/ediciones/74');
});

test('cada sección, distrito, personaje y edición tiene página', () => {
  for (const r of todas()) {
    const html = V.render(V.parseRuta('#/' + r), {});
    assert.ok(html.length > 200, r);
    assert.doesNotMatch(html, /Expediente no encontrado/, r);
  }
  assert.match(V.render(V.parseRuta('#/distritos/99')), /Expediente no encontrado/);
  assert.match(V.render(V.parseRuta('#/nada')), /Expediente no encontrado/);
});

test('todos los datos compartidos aparecen: 12 distritos, el 13 aparte, 16 personajes, ediciones', () => {
  const html = V.render({ seccion: 'distritos' });
  for (let i = 1; i <= 12; i++) assert.ok(html.includes(`#/distritos/${i}"`), `distrito ${i}`);
  assert.equal(A.DISTRITOS.length, 12);
  assert.match(html, /Fuera de las cosechas[\s\S]*Distrito 13/, 'el Distrito 13 no se mezcla con los de las cosechas');
  assert.match(V.render({ seccion: 'distritos', id: '13' }), /no participa en las cosechas/);
  const p = V.render({ seccion: 'personajes' }, {});
  for (const c of characters) assert.ok(p.includes(c.name), c.name);
  const e = V.render({ seccion: 'ediciones' });
  for (const ed of canonEditions) assert.ok(e.includes(ed.title), ed.title);
});

test('filtros de personajes: por rol, distrito y texto', () => {
  const cuenta = f => Number(V.render({ seccion: 'personajes' }, f).match(/(\d+) de \d+ fichas/)[1]);
  assert.equal(cuenta({}), characters.length);
  assert.equal(cuenta({ distrito: '12' }), characters.filter(c => c.district === 12).length);
  assert.equal(cuenta({ rol: 'tributos' }), characters.filter(c => /tributo/i.test(c.role)).length);
  assert.equal(cuenta({ q: 'katniss' }), 1);
  assert.equal(cuenta({ q: 'zzz' }), 0);
});

test('vencedores: los marcadores genéricos no se muestran como personas', () => {
  const v = A.vencedores();
  assert.ok(v.length > 0);
  for (const x of v) assert.doesNotMatch(x.name, /^(Mentor|Vencedor|Vencedora) del Distrito/);
  assert.ok(v.some(x => x.name === 'Haymitch Abernathy' && x.ficha === 'haymitch-abernathy'));
  assert.ok(v.some(x => x.name === 'Mags Flanagan' && x.ficha === null), 'nombres sin ficha quedan sin enlace');
});

test('lo que no tiene contenido aprobado se marca como pendiente, sin texto inventado', () => {
  for (const s of ['mapa', 'capitolio', 'documentos', 'cronologia', 'arenas', 'galeria', 'vencedores', 'ediciones']) {
    assert.match(V.render({ seccion: s }), /data-pendiente=/, s);
  }
  assert.match(V.render({ seccion: 'novedades' }), /data-pendiente="novedades"/, 'sin novedades aprobadas');
  assert.equal(A.NOVEDADES.length, 0);
  for (const k of Object.keys(A.PENDIENTES)) assert.ok(A.PENDIENTES[k].length > 10, k);
});

test('los textos de los datos se escapan', () => {
  assert.equal(V.esc('<b>"x"&\''), '&lt;b&gt;&quot;x&quot;&amp;&#39;');
});

test('las imágenes que usa el archivo existen y no incluyen la imagen protegida', () => {
  for (const g of A.GALERIA) { assert.ok(fs.existsSync(path.join(web, g.src)), g.src); assert.ok(fs.existsSync(path.join(web, g.fallback)), g.fallback); }
  const todo = read('index.html') + read('js/archivo-vistas.js') + read('js/archivo-datos.js').replace(/\/\/.*$/gm, '');
  assert.doesNotMatch(todo, /menu-panem/);
});

test('separación: la Web no lleva el videojuego', () => {
  const html = read('index.html');
  assert.match(html, /src="js\/archivo\.js"/);
  assert.doesNotMatch(html, /js\/app\.js|save-indicator|data-a=/);
  for (const f of ['js/app.js', 'js/campaigns.js', 'js/presidency.js', 'js/whatif.js', 'js/saves.js', 'js/settings.js', 'js/durable-storage.js', 'css/style.css']) assert.ok(!fs.existsSync(path.join(web, f)), `no debe existir ${f}`);
  const code = fs.readdirSync(path.join(web, 'js')).filter(f => f !== 'data.js').map(f => read('js/' + f)).join('\n');
  assert.doesNotMatch(code, /laCosechaSave|localStorage|Modo historia|Empezar partida|presidentStart/, 'sin partidas ni pantallas de juego');
  for (const ruta of todas()) assert.doesNotMatch(V.render(V.parseRuta('#/' + ruta), {}), /data-a=|Guardar partida|Nueva partida/, ruta);
});

test('el service worker del archivo precarga todos sus módulos', () => {
  const sw = read('sw.js');
  assert.match(sw, /const CACHE='archivo-panem-/);
  for (const f of fs.readdirSync(path.join(web, 'js'))) assert.ok(sw.includes(`'./js/${f}'`), f);
  for (const m of sw.matchAll(/'\.\/([^']+)'/g)) if (m[1]) assert.ok(fs.existsSync(path.join(web, m[1])), m[1]);
});

test('cada ficha de distrito y de personaje muestra su estado de canon y su fuente', () => {
  for (const d of districts) assert.match(V.render({ seccion: 'distritos', id: String(d.id) }), /data-canon="unknown"[\s\S]*Sin clasificar[\s\S]*Pendiente de referencia/, d.name);
  for (const c of A.PERSONAJES) assert.match(V.render({ seccion: 'personajes', id: c.slug }), /Estado de canon[\s\S]*Fuente/, c.name);
  assert.equal(new Set(characters.map(c => c.character_id)).size, characters.length, 'character_id únicos');
  assert.deepEqual(districts.map(d => d.district_id), districts.map(d => `district_${String(d.id).padStart(2, '0')}`));
});
