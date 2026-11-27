// Archivo de Panem · vistas. Funciones puras: reciben la ruta y devuelven HTML.
// Así se pueden probar sin navegador (tests/archivo.test.mjs).
import * as A from './archivo-datos.js';

export const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const SECCIONES = [
  { id: '', label: 'Portada' },
  { id: 'mapa', label: 'Mapa' },
  { id: 'distritos', label: 'Distritos' },
  { id: 'personajes', label: 'Personajes' },
  { id: 'vencedores', label: 'Vencedores' },
  { id: 'ediciones', label: 'Ediciones' },
  { id: 'cronologia', label: 'Cronología' },
  { id: 'arenas', label: 'Arenas' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'galeria', label: 'Galería' },
  { id: 'novedades', label: 'Novedades' },
];

// «#/distritos/12» → { seccion: 'distritos', id: '12' }
export function parseRuta(hash = '') {
  const partes = String(hash).replace(/^#?\/?/, '').split('/').map(decodeURIComponent);
  return { seccion: partes[0] || '', id: partes[1] || null };
}
export const enlace = (seccion, id) => `#/${seccion}${id != null ? '/' + encodeURIComponent(id) : ''}`;

const pendiente = (clave, titulo = 'Pendiente de contenido aprobado') => `
  <aside class="pendiente" data-pendiente="${esc(clave)}">
    <p class="pendiente-sello">${esc(titulo)}</p>
    <p>${esc(A.PENDIENTES[clave])}</p>
    <p class="pendiente-nota">Esta sección se completará con el material de la dirección creativa. El Archivo no rellena huecos con textos provisionales.</p>
  </aside>`;

const cabecera = (antetitulo, titulo, entradilla = '') => `
  <header class="cabecera">
    <p class="antetitulo">${esc(antetitulo)}</p>
    <h1>${esc(titulo)}</h1>
    ${entradilla ? `<p class="entradilla">${esc(entradilla)}</p>` : ''}
  </header>`;

const migas = (...pasos) => `<nav class="migas" aria-label="Estás en"><a href="#/">Archivo</a>${pasos.map(([t, h]) => ` <span aria-hidden="true">›</span> ${h ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}`).join('')}</nav>`;

const sello = d => `<span class="sello-distrito" style="--c:${esc(d.color)}" aria-hidden="true">${d.id}</span>`;
const nombreDistrito = id => A.distrito(id)?.name || `Distrito ${id}`;

const imagen = (g, cls = '', loading = 'lazy') => `<picture class="${cls}"><source srcset="${esc(g.src)}" type="image/webp"><img src="${esc(g.fallback)}" width="${g.w}" height="${g.h}" alt="${esc(g.titulo)}" loading="${loading}" decoding="async"></picture>`;

function portada() {
  const cifras = [
    ['Distritos', A.DISTRITOS.length, 'distritos'],
    ['Personajes', A.PERSONAJES.length, 'personajes'],
    ['Ediciones', A.EDICIONES.length, 'ediciones'],
    ['Ilustraciones', A.GALERIA.length, 'galeria'],
  ];
  return `
  <section class="portada">
    <div class="portada-texto">
      <p class="antetitulo">Proyecto fan no oficial · Registro del universo de La Cosecha</p>
      <h1>Archivo de Panem</h1>
      <p class="entradilla">Consulta los distritos, los personajes, las ediciones de los Juegos y las arenas que forman el mundo de La Cosecha. Cada sección indica qué está documentado y qué falta por completar.</p>
      <ul class="cifras">${cifras.map(([t, n, s]) => `<li><a href="${enlace(s)}"><b>${n}</b><span>${esc(t)}</span></a></li>`).join('')}</ul>
    </div>
    ${imagen(A.GALERIA[0], 'portada-imagen', 'eager')}
  </section>
  <section class="indice" aria-label="Secciones del archivo">
    ${SECCIONES.slice(1).map((s, i) => `<a class="indice-item" href="${enlace(s.id)}"><span class="indice-num">${String(i + 1).padStart(2, '0')}</span><span>${esc(s.label)}</span>${A.PENDIENTES[s.id] && ['mapa', 'documentos', 'novedades'].includes(s.id) ? '<em>pendiente</em>' : ''}</a>`).join('')}
  </section>
  <section class="bloque">
    <h2>Ediciones registradas</h2>
    <ol class="lista-ediciones">${A.EDICIONES.map(e => `<li><a href="${enlace('ediciones', e.year)}"><span class="anio">Año ${e.year}</span><span>${esc(e.title)}</span></a></li>`).join('')}</ol>
  </section>
  <section class="bloque juego">
    <h2>El videojuego</h2>
    <p>La Cosecha es también un videojuego para Android, en desarrollo. El Archivo es un sitio de consulta: aquí no se juega ni se guardan partidas.</p>
  </section>`;
}

function mapa() {
  const celda = d => `<a class="mapa-celda" href="${enlace('distritos', d.id)}" style="--c:${esc(d.color)}"><span class="mapa-num">${d.id}</span><span class="mapa-ind">${esc(d.industry)}</span></a>`;
  return `${migas(['Mapa'])}${cabecera('Panem', 'Mapa de Panem', 'Índice de los distritos y el Capitolio. Es un esquema de navegación: no representa la geografía.')}
  ${pendiente('mapa', 'Mapa ilustrado pendiente')}
  <div class="mapa-esquema" role="list">
    <a class="mapa-celda capitolio" role="listitem" href="${enlace('capitolio')}"><span class="mapa-num">C</span><span class="mapa-ind">El Capitolio</span></a>
    ${A.DISTRITOS.map(d => celda(d).replace('<a ', '<a role="listitem" ')).join('')}
  </div>
  ${A.DISTRITO_13 ? `<p class="nota-13">El <a href="${enlace('distritos', 13)}">Distrito 13</a> figura aparte: no forma parte de las cosechas.</p>` : ''}`;
}

function distritos(id) {
  if (id != null) return fichaDistrito(id);
  return `${migas(['Distritos'])}${cabecera('Panem', 'Los doce distritos y el Capitolio')}
  <div class="rejilla-distritos">
    <a class="tarjeta-distrito capitolio" href="${enlace('capitolio')}"><span class="sello-distrito" aria-hidden="true">C</span><h2>El Capitolio</h2><p>Sede del gobierno de Panem.</p><em>Ficha pendiente</em></a>
    ${A.DISTRITOS.map(d => `<a class="tarjeta-distrito" href="${enlace('distritos', d.id)}">${sello(d)}<h2>${esc(d.name)}</h2><p class="industria">${esc(d.industry)}</p><p>${esc(d.description)}</p></a>`).join('')}
  </div>
  ${A.DISTRITO_13 ? `<section class="bloque historico"><h2>Fuera de las cosechas</h2><a class="tarjeta-distrito d13" href="${enlace('distritos', 13)}">${sello(A.DISTRITO_13)}<h2>${esc(A.DISTRITO_13.name)}</h2><p class="industria">${esc(A.DISTRITO_13.industry)}</p><p>${esc(A.DISTRITO_13.description)}</p></a></section>` : ''}`;
}

function fichaDistrito(id) {
  const d = A.distrito(id);
  if (!d) return noEncontrado();
  const gente = A.personajesDe(d.id);
  const m = A.MENTORES.find(x => x.district === d.id);
  return `${migas(['Distritos', enlace('distritos')], [d.name])}
  <article class="ficha" style="--c:${esc(d.color)}">
    ${cabecera(d.id === 13 ? 'Expediente histórico · no participa en las cosechas' : `Expediente D-${String(d.id).padStart(2, '0')}`, d.name, d.description)}
    <dl class="datos"><div><dt>Industria</dt><dd>${esc(d.industry)}</dd></div>${m ? `<div><dt>Mentores y vencedores registrados</dt><dd>${m.nombres.length ? m.nombres.map(esc).join(', ') : 'Sin identificar'}${m.nombres.length && m.sinIdentificar ? ' y otros sin identificar' : ''}</dd></div>` : ''}</dl>
    <section class="bloque"><h2>Personajes del distrito</h2>${gente.length ? `<ul class="lista-personajes">${gente.map(tarjetaPersonaje).join('')}</ul>` : '<p class="vacio">No hay fichas de personajes de este distrito.</p>'}</section>
    ${pendiente('distrito')}
    <nav class="paginacion">${d.id > 1 && d.id <= 13 ? `<a href="${enlace('distritos', d.id - 1)}">← ${esc(nombreDistrito(d.id - 1))}</a>` : '<span></span>'}${d.id < 12 ? `<a href="${enlace('distritos', d.id + 1)}">${esc(nombreDistrito(d.id + 1))} →</a>` : ''}</nav>
  </article>`;
}

function capitolio() {
  return `${migas(['Distritos', enlace('distritos')], ['El Capitolio'])}
  <article class="ficha capitolio">${cabecera('Sede del gobierno de Panem', 'El Capitolio')}
    ${imagen(A.GALERIA[0], 'ficha-imagen')}
    ${pendiente('capitolio')}
  </article>`;
}

const tarjetaPersonaje = c => `<li><a class="tarjeta-personaje" href="${enlace('personajes', c.slug)}"><span class="sello-distrito" style="--c:${esc(A.distrito(c.district)?.color || '#777')}" aria-hidden="true">${c.district}</span><span><b>${esc(c.name)}</b><small>${esc(c.role)} · ${esc(nombreDistrito(c.district))}</small></span></a></li>`;

function personajes(id, filtros = {}) {
  if (id != null) return fichaPersonaje(id);
  const rol = A.ROLES.find(r => r.id === filtros.rol) || A.ROLES[0];
  const dist = filtros.distrito ? Number(filtros.distrito) : null;
  const q = (filtros.q || '').trim().toLowerCase();
  const lista = A.PERSONAJES.filter(c => rol.test(c) && (!dist || c.district === dist) && (!q || `${c.name} ${c.role} ${c.traits.join(' ')}`.toLowerCase().includes(q)));
  return `${migas(['Personajes'])}${cabecera('Registro de personajes', 'Personajes, tributos y vencedores')}
  <form class="filtros" data-filtros role="search">
    <label>Buscar <input type="search" name="q" value="${esc(filtros.q || '')}" placeholder="Nombre, rol o rasgo"></label>
    <label>Distrito <select name="distrito"><option value="">Todos</option>${A.DISTRITOS.map(d => `<option value="${d.id}" ${dist === d.id ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}</select></label>
    <fieldset><legend>Rol</legend>${A.ROLES.map(r => `<label class="chip"><input type="radio" name="rol" value="${r.id}" ${r.id === rol.id ? 'checked' : ''}> ${esc(r.label)}</label>`).join('')}</fieldset>
  </form>
  <p class="recuento" aria-live="polite">${lista.length} de ${A.PERSONAJES.length} fichas</p>
  ${lista.length ? `<ul class="lista-personajes">${lista.map(tarjetaPersonaje).join('')}</ul>` : '<p class="vacio">Ninguna ficha coincide con la búsqueda.</p>'}
  ${pendiente('personajes')}`;
}

function fichaPersonaje(s) {
  const c = A.personaje(s);
  if (!c) return noEncontrado();
  const d = A.distrito(c.district);
  return `${migas(['Personajes', enlace('personajes')], [c.name])}
  <article class="ficha" style="--c:${esc(d?.color || '#777')}">
    ${cabecera(`${c.role} · ${d ? d.name : ''}`, c.name, c.bio)}
    <dl class="datos">
      <div><dt>Distrito</dt><dd>${d ? `<a href="${enlace('distritos', d.id)}">${esc(d.name)}</a>` : '—'}</dd></div>
      <div><dt>Papel</dt><dd>${esc(c.role)}</dd></div>
      <div><dt>Rasgos</dt><dd><ul class="rasgos">${c.traits.map(t => `<li>${esc(t)}</li>`).join('')}</ul></dd></div>
      <div><dt>Retrato</dt><dd>Pendiente de un retrato aprobado</dd></div>
    </dl>
  </article>`;
}

function vencedoresVista() {
  const v = A.vencedores();
  return `${migas(['Vencedores'])}${cabecera('Registro de vencedores', 'Mentores y vencedores', 'Nombres registrados por distrito. Solo enlazan a ficha los que la tienen.')}
  <table class="tabla"><thead><tr><th scope="col">Distrito</th><th scope="col">Nombre</th><th scope="col">Ficha</th></tr></thead><tbody>
  ${v.map(x => `<tr><td>${x.district}</td><td>${esc(x.name)}</td><td>${x.ficha ? `<a href="${enlace('personajes', x.ficha)}">Ver ficha</a>` : '<span class="vacio">Pendiente</span>'}</td></tr>`).join('')}
  </tbody></table>
  <p class="nota">Distritos sin vencedores identificados en el registro: ${A.MENTORES.filter(m => !m.nombres.length).map(m => m.district).join(', ') || 'ninguno'}.</p>
  ${pendiente('vencedores')}`;
}

function ediciones(id) {
  if (id != null) {
    const e = A.edicion(id);
    if (!e) return noEncontrado();
    const i = A.EDICIONES.indexOf(e);
    return `${migas(['Ediciones', enlace('ediciones')], [e.title])}
    <article class="ficha">${cabecera(`Edición ${e.year}`, e.title, e.note)}
      <dl class="datos"><div><dt>Año de los Juegos</dt><dd>${e.year}.º</dd></div><div><dt>Arena</dt><dd>${esc(e.arena)}</dd></div></dl>
      ${pendiente('ediciones')}
      <nav class="paginacion">${i > 0 ? `<a href="${enlace('ediciones', A.EDICIONES[i - 1].year)}">← ${A.EDICIONES[i - 1].year}.º</a>` : '<span></span>'}${i < A.EDICIONES.length - 1 ? `<a href="${enlace('ediciones', A.EDICIONES[i + 1].year)}">${A.EDICIONES[i + 1].year}.º →</a>` : ''}</nav>
    </article>`;
  }
  return `${migas(['Ediciones'])}${cabecera('Los Juegos del Hambre', 'Ediciones de los Juegos')}
  <ul class="tarjetas-ediciones">${A.EDICIONES.map(e => `<li><a href="${enlace('ediciones', e.year)}"><span class="anio">${e.year}.º</span><h2>${esc(e.title)}</h2><p>${esc(e.note)}</p><p class="arena">Arena: ${esc(e.arena)}</p></a></li>`).join('')}</ul>
  ${pendiente('ediciones')}`;
}

function cronologia() {
  return `${migas(['Cronología'])}${cabecera('Panem', 'Cronología', 'Hitos registrados en el archivo, por año de los Juegos.')}
  <ol class="linea-tiempo">${A.EDICIONES.map(e => `<li><span class="anio">Año ${e.year}</span><div><h2><a href="${enlace('ediciones', e.year)}">${esc(e.title)}</a></h2><p>${esc(e.note)}</p></div></li>`).join('')}</ol>
  ${pendiente('cronologia')}`;
}

function arenas() {
  return `${migas(['Arenas'])}${cabecera('Los Juegos del Hambre', 'Arenas')}
  <section class="bloque"><h2>Arenas de las ediciones registradas</h2>
    <ul class="lista-simple">${A.EDICIONES.map(e => `<li><a href="${enlace('ediciones', e.year)}">${e.year}.º</a> — ${esc(e.arena)}</li>`).join('')}</ul>
    <figure class="figura">${imagen(A.GALERIA[1])}<figcaption>Arena del bosque · ilustración del proyecto</figcaption></figure>
  </section>
  <section class="bloque"><h2>Tipos de arena del videojuego</h2><p class="nota">Plantillas del modo libre del videojuego, no arenas de ediciones concretas.</p>
    <ul class="tarjetas-arenas">${A.TIPOS_ARENA.map(a => `<li><h3>${esc(a.name)}</h3><p>${esc(a.description)}</p><p class="peligros">Peligros: ${a.danger.map(esc).join(', ')}</p></li>`).join('')}</ul>
  </section>
  ${pendiente('arenas')}`;
}

function documentos() {
  return `${migas(['Documentos'])}${cabecera('Archivo documental', 'Documentos y acontecimientos')}${pendiente('documentos', 'Archivo documental vacío')}`;
}

function galeria() {
  return `${migas(['Galería'])}${cabecera('Ilustraciones originales del proyecto', 'Galería')}
  <ul class="galeria">${A.GALERIA.map(g => `<li><figure>${imagen(g)}<figcaption><b>${esc(g.titulo)}</b><small>${esc(g.nota)}</small></figcaption></figure></li>`).join('')}</ul>
  ${pendiente('galeria')}`;
}

function novedades() {
  return `${migas(['Novedades'])}${cabecera('Para la comunidad', 'Novedades')}
  ${A.NOVEDADES.length ? `<ol class="novedades">${A.NOVEDADES.map(n => `<li><time datetime="${esc(n.fecha)}">${esc(n.fecha)}</time><h2>${esc(n.titulo)}</h2><p>${esc(n.texto)}</p></li>`).join('')}</ol>` : pendiente('novedades', 'Sin novedades publicadas')}`;
}

function noEncontrado() {
  return `${cabecera('Archivo de Panem', 'Expediente no encontrado', 'No hay ninguna ficha en esa dirección.')}<p><a href="#/">Volver a la portada</a></p>`;
}

const VISTAS = { '': portada, mapa, distritos, capitolio, personajes, vencedores: vencedoresVista, ediciones, cronologia, arenas, documentos, galeria, novedades };

export function render(ruta, filtros) {
  const v = VISTAS[ruta.seccion];
  return v ? v(ruta.id, filtros) : noEncontrado();
}
export function tituloDe(ruta) {
  const s = SECCIONES.find(x => x.id === ruta.seccion);
  const extra = ruta.seccion === 'distritos' && ruta.id ? A.distrito(ruta.id)?.name
    : ruta.seccion === 'personajes' && ruta.id ? A.personaje(ruta.id)?.name
    : ruta.seccion === 'ediciones' && ruta.id ? A.edicion(ruta.id)?.title
    : ruta.seccion === 'capitolio' ? 'El Capitolio' : null;
  return [extra, s && s.id ? s.label : null, 'Archivo de Panem'].filter(Boolean).join(' · ');
}
