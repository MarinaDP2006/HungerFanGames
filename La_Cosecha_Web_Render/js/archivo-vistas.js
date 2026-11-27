// Archivo de Panem · vistas. Funciones puras: reciben la ruta y devuelven HTML.
// Así se pueden probar sin navegador (tests/archivo.test.mjs).
import * as A from './archivo-datos.js';

export const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Menú definitivo (decisión de la directora, 27-11-2026).
export const SECCIONES = [
  { id: '', label: 'Inicio' },
  { id: 'distritos', label: 'Distritos' },
  { id: 'capitolio', label: 'Capitolio' },
  { id: 'personajes', label: 'Personajes' },
  { id: 'juegos', label: 'Juegos' },
  { id: 'cronologia', label: 'Cronología' },
  { id: 'gira', label: 'Gira de la Victoria' },
  { id: 'rebelion-y-guerra', label: 'Rebelión y Guerra' },
  { id: 'lugares', label: 'Lugares' },
  { id: 'galeria', label: 'Galería' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'acerca', label: 'Acerca' },
];

// «#/distritos/12» → { seccion: 'distritos', id: '12' }
// Direcciones estables sin «#»: /distritos/12, /personajes/katniss-everdeen, /juegos/74.
// Se aceptan también las antiguas con «#/…».
export function parseRuta(ruta = '/') {
  const partes = String(ruta).replace(/^#/, '').replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { seccion: partes[0] || '', id: partes[1] || null };
}
export const enlace = (seccion, id) => `/${seccion}${id != null ? '/' + encodeURIComponent(id) : ''}`;

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

const migas = (...pasos) => `<nav class="migas" aria-label="Estás en"><a href="/">Archivo</a>${pasos.map(([t, h]) => ` <span aria-hidden="true">›</span> ${h ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}`).join('')}</nav>`;

const sello = d => `<span class="sello-distrito" style="--c:${esc(d.color)}" aria-hidden="true">${d.id}</span>`;
// Estado de canon y fuente de cada ficha (modelo de datos de la Entrega Maestra v1).
const CANON = { CANON_FACT: 'Hecho canónico', CANON_COMPATIBLE: 'Compatible con el canon', INTERPRETATION: 'Interpretación del proyecto', ALT_ROUTE: 'Ruta alternativa' };
const canon = r => `<div class="canon" data-canon="${esc(r.canon_status || 'unknown')}"><dt>Estado de canon</dt><dd>${esc(CANON[r.canon_status] || 'Sin clasificar')}</dd></div><div><dt>Fuente</dt><dd>${r.source_ref ? esc(r.source_ref) : 'Pendiente de referencia'}</dd></div>`;
const nombreDistrito = id => A.distrito(id)?.name || `Distrito ${id}`;

const imagen = (g, cls = '', loading = 'lazy') => `<picture class="${cls}"><source srcset="${esc(g.src)}" type="image/webp"><img src="${esc(g.fallback)}" width="${g.w}" height="${g.h}" alt="${esc(g.titulo)}" loading="${loading}" decoding="async"></picture>`;

function portada() {
  const cifras = [
    ['Distritos', A.DISTRITOS.length, 'distritos'],
    ['Personajes', A.PERSONAJES.length, 'personajes'],
    ['Juegos', A.EDICIONES.length, 'juegos'],
    ['Ilustraciones', A.GALERIA.length, 'galeria'],
  ];
  return `
  <section class="portada">
    <div class="portada-texto">
      <p class="antetitulo">Proyecto fan no oficial · Registro del universo de La Cosecha</p>
      <h1>Archivo de Panem</h1>
      <p class="entradilla">Consulta los distritos, el Capitolio, los personajes, las ediciones de los Juegos y los lugares que forman el mundo de La Cosecha. Cada sección indica qué está documentado y qué falta por completar.</p>
      <ul class="cifras">${cifras.map(([t, n, s]) => `<li><a href="${enlace(s)}"><b>${n}</b><span>${esc(t)}</span></a></li>`).join('')}</ul>
    </div>
    ${imagen(A.GALERIA[0], 'portada-imagen', 'eager')}
  </section>
  <section class="indice" aria-label="Secciones del archivo">
    ${SECCIONES.slice(1).map((s, i) => `<a class="indice-item" href="${enlace(s.id)}"><span class="indice-num">${String(i + 1).padStart(2, '0')}</span><span>${esc(s.label)}</span>${['capitolio', 'gira', 'rebelion-y-guerra', 'lugares', 'documentos'].includes(s.id) ? '<em>pendiente</em>' : ''}</a>`).join('')}
  </section>
  <section class="bloque">
    <h2>Juegos registrados</h2>
    <ol class="lista-ediciones">${A.EDICIONES.map(e => `<li><a href="${enlace('juegos', e.year)}"><span class="anio">Año ${e.year}</span><span>${esc(e.title)}</span></a></li>`).join('')}</ol>
  </section>
  <section class="bloque juego">
    <h2>El videojuego</h2>
    <p>La Cosecha es también un videojuego para Android, en desarrollo. El Archivo es un sitio de consulta: aquí no se juega ni se guardan partidas. <a href="/acerca">Acerca del proyecto</a></p>
  </section>`;
}

function mapa() {
  const celda = d => `<a class="mapa-celda" href="${enlace('distritos', d.id)}" style="--c:${esc(d.color)}"><span class="mapa-num">${d.id}</span><span class="mapa-ind">${esc(d.industry)}</span></a>`;
  return `<section class="bloque" aria-labelledby="t-mapa"><h2 id="t-mapa">Mapa de Panem</h2><p class="nota">Esquema de navegación: no representa la geografía.</p>
  ${pendiente('mapa', 'Mapa ilustrado pendiente')}
  <div class="mapa-esquema" role="list">
    <a class="mapa-celda capitolio" role="listitem" href="${enlace('capitolio')}"><span class="mapa-num">C</span><span class="mapa-ind">El Capitolio</span></a>
    ${A.DISTRITOS.map(d => celda(d).replace('<a ', '<a role="listitem" ')).join('')}
  </div>
  </section>`;
}

function distritos(id) {
  if (id != null) return fichaDistrito(id);
  return `${migas(['Distritos'])}${cabecera('Panem', 'Los doce distritos y el Capitolio')}
  <div class="rejilla-distritos">
    <a class="tarjeta-distrito capitolio" href="${enlace('capitolio')}"><span class="sello-distrito" aria-hidden="true">C</span><h2>El Capitolio</h2><p>Sede del gobierno de Panem.</p><em>Ficha pendiente</em></a>
    ${A.DISTRITOS.map(d => `<a class="tarjeta-distrito" href="${enlace('distritos', d.id)}">${sello(d)}<h2>${esc(d.name)}</h2><p class="industria">${esc(d.industry)}</p><p>${esc(d.description)}</p></a>`).join('')}
  </div>
  ${A.DISTRITO_13 ? `<section class="bloque historico"><h2>Fuera de las cosechas</h2><a class="tarjeta-distrito d13" href="${enlace('distritos', 13)}">${sello(A.DISTRITO_13)}<h2>${esc(A.DISTRITO_13.name)}</h2><p class="industria">${esc(A.DISTRITO_13.industry)}</p><p>${esc(A.DISTRITO_13.description)}</p></a></section>` : ''}
  ${mapa()}`;
}

function fichaDistrito(id) {
  const d = A.distrito(id);
  if (!d) return noEncontrado();
  const gente = A.personajesDe(d.id);
  const m = A.MENTORES.find(x => x.district === d.id);
  return `${migas(['Distritos', enlace('distritos')], [d.name])}
  <article class="ficha" style="--c:${esc(d.color)}">
    ${cabecera(d.id === 13 ? 'Expediente histórico · no participa en las cosechas' : `Expediente D-${String(d.id).padStart(2, '0')}`, d.name, d.description)}
    <dl class="datos"><div><dt>Industria</dt><dd>${esc(d.industry)}</dd></div>${m ? `<div><dt>Mentores y vencedores registrados</dt><dd>${m.nombres.length ? m.nombres.map(esc).join(', ') : 'Sin identificar'}${m.nombres.length && m.sinIdentificar ? ' y otros sin identificar' : ''}</dd></div>` : ''}${canon(d)}</dl>
    <section class="bloque"><h2>Personajes del distrito</h2>${gente.length ? `<ul class="lista-personajes">${gente.map(tarjetaPersonaje).join('')}</ul>` : '<p class="vacio">No hay fichas de personajes de este distrito.</p>'}</section>
    ${pendiente('distrito')}
    <nav class="paginacion">${d.id > 1 && d.id <= 13 ? `<a href="${enlace('distritos', d.id - 1)}">← ${esc(nombreDistrito(d.id - 1))}</a>` : '<span></span>'}${d.id < 12 ? `<a href="${enlace('distritos', d.id + 1)}">${esc(nombreDistrito(d.id + 1))} →</a>` : ''}</nav>
  </article>`;
}

function capitolio() {
  return `${migas(['Capitolio'])}
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
  ${pendiente('personajes')}
  ${vencedoresVista()}`;
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
      ${canon(c)}
    </dl>
  </article>`;
}

function vencedoresVista() {
  const v = A.vencedores();
  return `<section class="bloque" aria-labelledby="t-vencedores"><h2 id="t-vencedores">Mentores y vencedores</h2><p class="nota">Nombres registrados por distrito. Solo enlazan a ficha los que la tienen.</p>
  <table class="tabla"><thead><tr><th scope="col">Distrito</th><th scope="col">Nombre</th><th scope="col">Ficha</th></tr></thead><tbody>
  ${v.map(x => `<tr><td>${x.district}</td><td>${esc(x.name)}</td><td>${x.ficha ? `<a href="${enlace('personajes', x.ficha)}">Ver ficha</a>` : '<span class="vacio">Pendiente</span>'}</td></tr>`).join('')}
  </tbody></table>
  <p class="nota">Distritos sin vencedores identificados en el registro: ${A.MENTORES.filter(m => !m.nombres.length).map(m => m.district).join(', ') || 'ninguno'}.</p>
  ${pendiente('vencedores')}</section>`;
}

function ediciones(id) {
  if (id != null) {
    const e = A.edicion(id);
    if (!e) return noEncontrado();
    const i = A.EDICIONES.indexOf(e);
    return `${migas(['Juegos', enlace('juegos')], [e.title])}
    <article class="ficha">${cabecera(`Edición ${e.year}`, e.title, e.note)}
      <dl class="datos"><div><dt>Año de los Juegos</dt><dd>${e.year}.º</dd></div><div><dt>Arena</dt><dd>${esc(e.arena)}</dd></div></dl>
      ${pendiente('ediciones')}
      <nav class="paginacion">${i > 0 ? `<a href="${enlace('juegos', A.EDICIONES[i - 1].year)}">← ${A.EDICIONES[i - 1].year}.º</a>` : '<span></span>'}${i < A.EDICIONES.length - 1 ? `<a href="${enlace('juegos', A.EDICIONES[i + 1].year)}">${A.EDICIONES[i + 1].year}.º →</a>` : ''}</nav>
    </article>`;
  }
  return `${migas(['Juegos'])}${cabecera('Archivo de los Juegos', 'Ediciones de los Juegos')}
  <ul class="tarjetas-ediciones">${A.EDICIONES.map(e => `<li><a href="${enlace('juegos', e.year)}"><span class="anio">${e.year}.º</span><h2>${esc(e.title)}</h2><p>${esc(e.note)}</p><p class="arena">Arena: ${esc(e.arena)}</p></a></li>`).join('')}</ul>
  ${pendiente('ediciones')}`;
}

function cronologia() {
  return `${migas(['Cronología'])}${cabecera('Panem', 'Cronología', 'Hitos registrados en el archivo, por año de los Juegos.')}
  <ol class="linea-tiempo">${A.EDICIONES.map(e => `<li><span class="anio">Año ${e.year}</span><div><h2><a href="${enlace('juegos', e.year)}">${esc(e.title)}</a></h2><p>${esc(e.note)}</p></div></li>`).join('')}</ol>
  ${pendiente('cronologia')}`;
}

function lugares() {
  return `${migas(['Lugares'])}${cabecera('Panem', 'Lugares', 'Arenas, Capitolio, distritos y escenarios de los Juegos.')}
  ${pendiente('lugares')}
  <section class="bloque"><h2>Arenas de las ediciones registradas</h2>
    <ul class="lista-simple">${A.EDICIONES.map(e => `<li><a href="${enlace('juegos', e.year)}">${e.year}.º</a> — ${esc(e.arena)}</li>`).join('')}</ul>
    <figure class="figura">${imagen(A.GALERIA[1])}<figcaption>Arena del bosque · ilustración del proyecto</figcaption></figure>
  </section>
  <section class="bloque"><h2>Tipos de arena del videojuego</h2><p class="nota">Plantillas del modo libre del videojuego, no arenas de ediciones concretas.</p>
    <ul class="tarjetas-arenas">${A.TIPOS_ARENA.map(a => `<li><h3>${esc(a.name)}</h3><p>${esc(a.description)}</p><p class="peligros">Peligros: ${a.danger.map(esc).join(', ')}</p></li>`).join('')}</ul>
  </section>
  ${pendiente('arenas')}`;
}

function gira() {
  return `${migas(['Gira de la Victoria'])}${cabecera('Después de los Juegos', 'Gira de la Victoria')}${pendiente('gira', 'Archivo pendiente de guion aprobado')}`;
}

function rebelion() {
  return `${migas(['Rebelión y Guerra'])}${cabecera('Panem', 'Rebelión y Guerra')}${pendiente('rebelion', 'Archivo pendiente de guion aprobado')}`;
}

function acerca() {
  return `${migas(['Acerca'])}${cabecera('Archivo de Panem', 'Acerca del proyecto')}
  <section class="bloque">
    <p>El Archivo de Panem es la parte de consulta de <b>La Cosecha</b>, un proyecto fan no oficial y sin ánimo de lucro. Reúne los distritos, personajes, Juegos y lugares que aparecen en el videojuego.</p>
    <p>No está afiliado a los titulares de los derechos de la saga ni cuenta con su respaldo. Los nombres de la saga se usan como referencia. Las ilustraciones del Archivo son originales del proyecto; no se reproducen imágenes de las películas.</p>
    <p>El videojuego se desarrolla aparte, para Android. En el Archivo no se juega ni se guardan partidas.</p>
  </section>
  <section class="bloque"><h2>Cómo leer las fichas</h2>
    <dl class="datos">
      <div><dt>Hecho canónico</dt><dd>Establecido en la saga.</dd></div>
      <div><dt>Compatible con el canon</dt><dd>Detalle del proyecto que no contradice la saga.</dd></div>
      <div><dt>Interpretación del proyecto</dt><dd>Lectura propia de La Cosecha.</dd></div>
      <div><dt>Ruta alternativa</dt><dd>Lo que cambia por las decisiones del videojuego; no forma parte del canon.</dd></div>
      <div><dt>Sin clasificar</dt><dd>Ficha aún sin revisar.</dd></div>
    </dl>
    <p class="nota">Las secciones marcadas como pendientes esperan contenido aprobado. El Archivo no las completa con textos provisionales.</p>
  </section>`;
}

function documentos() {
  return `${migas(['Documentos'])}${cabecera('Archivo documental', 'Documentos y acontecimientos')}${pendiente('documentos', 'Archivo documental vacío')}`;
}

function galeria() {
  return `${migas(['Galería'])}${cabecera('Ilustraciones originales del proyecto', 'Galería')}
  <ul class="galeria">${A.GALERIA.map(g => `<li><figure>${imagen(g)}<figcaption><b>${esc(g.titulo)}</b><small>${esc(g.nota)}</small></figcaption></figure></li>`).join('')}</ul>
  ${pendiente('galeria')}`;
}

function noEncontrado() {
  return `${cabecera('Archivo de Panem', 'Expediente no encontrado', 'No hay ninguna ficha en esa dirección.')}<p><a href="/">Volver al inicio</a></p>`;
}

const VISTAS = { '': portada, distritos, capitolio, personajes, juegos: ediciones, cronologia, gira, 'rebelion-y-guerra': rebelion, lugares, galeria, documentos, acerca };

export function render(ruta, filtros) {
  const v = VISTAS[ruta.seccion];
  return v ? v(ruta.id, filtros) : noEncontrado();
}
export function tituloDe(ruta) {
  const s = SECCIONES.find(x => x.id === ruta.seccion);
  const extra = ruta.seccion === 'distritos' && ruta.id ? A.distrito(ruta.id)?.name
    : ruta.seccion === 'personajes' && ruta.id ? A.personaje(ruta.id)?.name
    : ruta.seccion === 'juegos' && ruta.id ? A.edicion(ruta.id)?.title : null;
  return [extra, s && s.id ? s.label : null, 'Archivo de Panem'].filter(Boolean).join(' · ');
}
