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
];

// «#/distritos/12» → { seccion: 'distritos', id: '12' }
// Direcciones estables sin «#»: /distritos/12, /personajes/katniss-everdeen, /juegos/74.
// Se aceptan también las antiguas con «#/…».
export function parseRuta(ruta = '/') {
  const partes = String(ruta).replace(/^#/, '').replace(/[?#].*$/, '').replace(/^\/+|\/+$/g, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { seccion: partes[0] || '', id: partes[1] || null };
}
export const enlace = (seccion, id) => `/${seccion}${id != null ? '/' + encodeURIComponent(id) : ''}`;

const C = A.CONTENIDO;
// Imagen propia (imagenes-propias/<ruta>.jpg|png|webp|jpeg). Si no existe, js/archivo.js la quita y se ve lo de siempre.
const propia = (ruta, alt, cls = '') => `<img class="propia ${cls}" src="/imagenes-propias/${esc(ruta)}.jpg" data-propia="${esc(ruta)}" data-ext="0" alt="${esc(alt)}" loading="lazy" decoding="async">`;
const parrafos = ps => ps.map(p => `<p>${esc(p)}</p>`).join('');
const etiquetaCanon = c => `<span class="etiqueta-canon" data-canon="${esc(c)}">${esc(CANON[c] || 'Sin clasificar')}</span>`;

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
const enlaceDistrito = id => Number(id) === 0 ? enlace('capitolio') : enlace('distritos', id);

const imagen = (g, cls = '', loading = 'lazy') => `<picture class="${cls}"><source srcset="${esc(g.src)}" type="image/webp"><img src="${esc(g.fallback)}" width="${g.w}" height="${g.h}" alt="${esc(g.titulo)}" loading="${loading}" decoding="async"></picture>`;

function portada() {
  const cifras = [
    ['Distritos', A.DISTRITOS.length, 'distritos'],
    ['Personajes', A.PERSONAJES.length, 'personajes'],
    ['Juegos', A.EDICIONES.length, 'juegos'],
    ['Ilustraciones', A.GALERIA.length, 'galeria'],
  ];
  const DESC = {
    distritos: 'Trece expedientes: territorio, vida y símbolos de cada distrito.', capitolio: 'La capital de Panem y su maquinaria de espectáculo.',
    personajes: 'Tributos, vencedores, mentores y rebeldes.', juegos: 'Los 74.º Juegos y el 75.º Vasallaje.',
    cronologia: 'De los Días Oscuros al fin de los Juegos.', gira: 'Seis meses después: el país empieza a arder.',
    'rebelion-y-guerra': 'Del Sinsajo a la caída del Capitolio.', lugares: 'Arenas, plazas, trenes y fortalezas.',
    galeria: 'Ilustraciones originales del proyecto.', documentos: 'Bandos, comunicados y registros.',
  };
  const fondo = A.GALERIA.find(g => /arena/i.test(g.titulo)) || A.GALERIA[0];
  return `
  <section class="heroe" aria-label="Portada">
    <picture class="heroe-fondo"><source srcset="${esc(fondo.src)}" type="image/webp"><img src="${esc(fondo.fallback)}" alt="${esc(fondo.titulo)} · ilustración del proyecto" fetchpriority="high" decoding="async"></picture>
    <div class="heroe-texto">
      <p class="heroe-pre">Archivo de Panem · Registro fan no oficial</p>
      <h1>Panem<span>recuerda</span></h1>
      <p class="heroe-entradilla">El mundo de Katniss Everdeen, expediente a expediente: distritos, personajes, Juegos, guerra y los lugares donde todo ocurrió.</p>
      <div class="heroe-botones"><a class="boton boton-claro" href="${enlace('distritos')}">Explorar los distritos</a><a class="boton boton-linea" href="${enlace('cronologia')}">Ver la cronología</a></div>
    </div>
    <button class="heroe-bajar" type="button" data-bajar aria-label="Bajar al índice">↓</button>
    <ul class="cifras heroe-cifras">${cifras.map(([t, n, s]) => `<li><a href="${enlace(s)}"><b>${n}</b><span>${esc(t)}</span></a></li>`).join('')}</ul>
  </section>
  <section class="indice-grande revela" id="indice-portada" aria-label="Secciones del archivo">
    ${SECCIONES.slice(1).map((s, i) => `<a class="indice-item" href="${enlace(s.id)}"><span class="indice-num">${String(i + 1).padStart(2, '0')}</span><span class="indice-titulo">${esc(s.label)}</span><span class="indice-desc">${esc(DESC[s.id] || '')}</span><span class="indice-flecha" aria-hidden="true">→</span></a>`).join('')}
  </section>
  <section class="franja-distritos revela" aria-label="Distritos">
    ${A.DISTRITOS.map(d => `<a href="${enlace('distritos', d.id)}" style="--c:${esc(d.color)}"><b>${d.id}</b><span>${esc(d.industry)}</span></a>`).join('')}
  </section>
  <section class="bloque revela">
    <h2>Juegos registrados</h2>
    <ol class="lista-ediciones">${A.EDICIONES.map(e => `<li><a href="${enlace('juegos', e.year)}"><span class="anio">Año ${e.year}</span><span>${esc(e.title)}</span></a></li>`).join('')}</ol>
  </section>
  <section class="bloque juego">
    <h2>El videojuego</h2>
    <p>La Cosecha es también un videojuego para Android, en desarrollo. El Archivo es un sitio de consulta: aquí no se juega ni se guardan partidas.</p>
  </section>`;
}

function mapa() {
  const celda = d => `<a class="mapa-celda" href="${enlace('distritos', d.id)}" style="--c:${esc(d.color)}"><span class="mapa-num">${d.id}</span><span class="mapa-ind">${esc(d.industry)}</span></a>`;
  return `<section class="bloque" aria-labelledby="t-mapa"><h2 id="t-mapa">Mapa de Panem</h2><p class="nota">${esc(C.MAPA_NOTA)}</p>
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
    <a class="tarjeta-distrito capitolio" href="${enlace('capitolio')}"><span class="sello-distrito" aria-hidden="true">C</span><h2>El Capitolio</h2><p>Sede del gobierno de Panem y escenario de los Juegos.</p><em>Ver expediente</em></a>
    ${A.DISTRITOS.map(d => `<a class="tarjeta-distrito" href="${enlace('distritos', d.id)}">${sello(d)}<h2>${esc(d.name)}</h2><p class="industria">${esc(d.industry)}</p><p>${esc(d.description)}</p></a>`).join('')}
  </div>
  ${A.DISTRITO_13 ? `<section class="bloque historico"><h2>Fuera de las cosechas</h2><a class="tarjeta-distrito d13" href="${enlace('distritos', 13)}">${sello(A.DISTRITO_13)}<h2>${esc(A.DISTRITO_13.name)}</h2><p class="industria">${esc(A.DISTRITO_13.industry)}</p><p>${esc(A.DISTRITO_13.description)}</p></a></section>` : ''}
  ${mapa()}`;
}

function fichaDistrito(id) {
  const d = A.distritoCompleto(id);
  if (!d || d.id === 0) return noEncontrado();
  const gente = A.personajesDe(d.id);
  const m = A.MENTORES.find(x => x.district === d.id);
  return `${migas(['Distritos', enlace('distritos')], [d.name])}
  <article class="ficha" style="--c:${esc(d.color)}">
    ${cabecera(d.id === 13 ? 'Expediente histórico · no participa en las cosechas' : `Expediente D-${String(d.id).padStart(2, '0')}`, d.name, d.description)}
    ${propia(`distritos/distrito-${String(d.id).padStart(2, '0')}`, d.name, 'banda')}
    <dl class="datos"><div><dt>Industria</dt><dd>${esc(d.industry)}</dd></div>${m ? `<div><dt>Mentores y vencedores registrados</dt><dd>${m.nombres.length ? m.nombres.map(esc).join(', ') : 'Sin identificar'}${m.nombres.length && m.sinIdentificar ? ' y otros sin identificar' : ''}</dd></div>` : ''}${canon(d)}</dl>
    <section class="bloque"><h2>Personajes del distrito</h2>${gente.length ? `<ul class="lista-personajes">${gente.map(tarjetaPersonaje).join('')}</ul>` : '<p class="vacio">No hay fichas de personajes de este distrito.</p>'}</section>
    ${d.geografia ? `<section class="bloque expediente">
      <div><h2>Territorio</h2><p>${esc(d.geografia)}</p></div>
      <div><h2>Vida cotidiana</h2><p>${esc(d.vida)}</p></div>
      <div><h2>Símbolos</h2><p>${esc(d.simbolos)}</p></div>
      <div><h2>Nombres destacados</h2><p>${esc(d.destacados)}</p></div>
    </section>` : ''}
    <nav class="paginacion">${d.id > 1 && d.id <= 13 ? `<a href="${enlace('distritos', d.id - 1)}">← ${esc(nombreDistrito(d.id - 1))}</a>` : '<span></span>'}${d.id < 12 ? `<a href="${enlace('distritos', d.id + 1)}">${esc(nombreDistrito(d.id + 1))} →</a>` : ''}</nav>
  </article>`;
}

function capitolio() {
  return `${migas(['Capitolio'])}
  <article class="ficha capitolio">${cabecera('Sede del gobierno de Panem', 'El Capitolio')}
    <div class="con-propia">${propia('distritos/capitolio', 'El Capitolio', 'banda')}<div class="si-no-propia">${imagen(A.GALERIA[0], 'ficha-imagen')}</div></div>
    <dl class="datos">${canon({ canon_status: C.CAPITOLIO.canon, source_ref: C.FUENTE_PELICULAS })}</dl>
    <section class="bloque">${parrafos(C.CAPITOLIO.parrafos)}</section>
    <section class="bloque"><h2>Lugares del Capitolio</h2><ul class="lista-simple">${C.CAPITOLIO.lugares.map(l => `<li>${esc(l)}</li>`).join('')}</ul><p><a href="${enlace('lugares')}">Todos los lugares →</a></p></section>
    <section class="bloque"><h2>Personajes del Capitolio</h2><ul class="lista-personajes">${A.PERSONAJES.filter(c => c.district === 0).map(tarjetaPersonaje).join('')}</ul></section>
  </article>`;
}

function tarjetaPersonaje(c) { return tarjetaP(c); }
const tarjetaP = c => `<li><a class="tarjeta-personaje" href="${enlace('personajes', c.slug)}"><span class="sello-distrito con-propia" style="--c:${esc(A.distrito(c.district)?.color || '#777')}" aria-hidden="true">${c.district === 0 ? 'C' : c.district}${propia('personajes/' + c.slug, c.name, 'miniatura')}</span><span><b>${esc(c.name)}</b><small>${esc(c.role)} · ${esc(nombreDistrito(c.district))}</small></span></a></li>`;

function personajes(id, filtros = {}) {
  if (id != null) return fichaPersonaje(id);
  const rol = A.ROLES.find(r => r.id === filtros.rol) || A.ROLES[0];
  const dist = filtros.distrito !== undefined && filtros.distrito !== '' && filtros.distrito !== null ? Number(filtros.distrito) : null;
  const q = (filtros.q || '').trim().toLowerCase();
  const lista = A.PERSONAJES.filter(c => rol.test(c) && (dist === null || c.district === dist) && (!q || `${c.name} ${c.role} ${c.traits.join(' ')}`.toLowerCase().includes(q)));
  return `${migas(['Personajes'])}${cabecera('Registro de personajes', 'Personajes, tributos y vencedores')}
  <form class="filtros" data-filtros role="search">
    <label>Buscar <input type="search" name="q" value="${esc(filtros.q || '')}" placeholder="Nombre, rol o rasgo"></label>
    <label>Distrito <select name="distrito"><option value="">Todos</option><option value="0" ${dist === 0 ? 'selected' : ''}>El Capitolio</option>${A.DISTRITOS.map(d => `<option value="${d.id}" ${dist === d.id ? 'selected' : ''}>${esc(d.name)}</option>`).join('')}</select></label>
    <fieldset><legend>Rol</legend>${A.ROLES.map(r => `<label class="chip"><input type="radio" name="rol" value="${r.id}" ${r.id === rol.id ? 'checked' : ''}> ${esc(r.label)}</label>`).join('')}</fieldset>
  </form>
  <p class="recuento" aria-live="polite">${lista.length} de ${A.PERSONAJES.length} fichas</p>
  ${lista.length ? `<ul class="lista-personajes">${lista.map(tarjetaPersonaje).join('')}</ul>` : '<p class="vacio">Ninguna ficha coincide con la búsqueda.</p>'}
  ${vencedoresVista()}`;
}

function fichaPersonaje(s) {
  const c = A.personaje(s);
  if (!c) return noEncontrado();
  const d = A.distrito(c.district);
  return `${migas(['Personajes', enlace('personajes')], [c.name])}
  <article class="ficha" style="--c:${esc(d?.color || '#777')}">
    <div class="ficha-cabecera">${propia('personajes/' + c.slug, c.name, 'retrato')}${cabecera(`${c.role} · ${d ? d.name : ''}`, c.name, c.bio)}</div>
    <dl class="datos">
      <div><dt>${c.district === 0 ? 'Procedencia' : 'Distrito'}</dt><dd>${d ? `<a href="${enlaceDistrito(d.id)}">${esc(d.name)}</a>` : '—'}</dd></div>
      <div><dt>Papel</dt><dd>${esc(c.role)}</dd></div>
      <div><dt>Rasgos</dt><dd><ul class="rasgos">${c.traits.map(t => `<li>${esc(t)}</li>`).join('')}</ul></dd></div>
      
      ${canon(c)}
    </dl>
  </article>`;
}

function vencedoresVista() {
  const v = A.vencedores();
  return `<section class="bloque" aria-labelledby="t-vencedores"><h2 id="t-vencedores">Mentores y vencedores</h2><p class="nota">Nombres registrados por distrito. Solo enlazan a ficha los que la tienen.</p>
  <table class="tabla"><thead><tr><th scope="col">Distrito</th><th scope="col">Nombre</th><th scope="col">Ficha</th></tr></thead><tbody>
  ${v.map(x => `<tr><td>${x.district}</td><td>${esc(x.name)}</td><td>${x.ficha ? `<a href="${enlace('personajes', x.ficha)}">Ver ficha</a>` : '<span class="vacio">—</span>'}</td></tr>`).join('')}
  </tbody></table>
  <p class="nota">Distritos sin vencedores identificados en el registro: ${A.MENTORES.filter(m => !m.nombres.length).map(m => m.district).join(', ') || 'ninguno'}.</p></section>`;
}

function ediciones(id) {
  if (id != null) {
    const e = A.edicion(id);
    if (!e) return noEncontrado();
    const i = A.EDICIONES.indexOf(e);
    return `${migas(['Juegos', enlace('juegos')], [e.title])}
    <article class="ficha">${cabecera(`Edición ${e.year}`, e.title, e.note)}${propia(`juegos/edicion-${e.year}`, e.title, 'banda')}
      <dl class="datos"><div><dt>Año de los Juegos</dt><dd>${e.year}.º</dd></div><div><dt>Arena</dt><dd>${esc(e.arena)}</dd></div></dl>
      ${C.EDICIONES[e.year] ? `<dl class="datos">${canon({ canon_status: C.EDICIONES[e.year].canon, source_ref: C.FUENTE_PELICULAS })}</dl><section class="bloque">${parrafos(C.EDICIONES[e.year].parrafos)}</section>${C.EDICIONES[e.year].hitos ? `<section class="bloque"><h2>Momentos clave</h2><ol class="hitos">${C.EDICIONES[e.year].hitos.map(h => `<li>${esc(h)}</li>`).join('')}</ol></section>` : ''}` : ''}
      <nav class="paginacion">${i > 0 ? `<a href="${enlace('juegos', A.EDICIONES[i - 1].year)}">← ${A.EDICIONES[i - 1].year}.º</a>` : '<span></span>'}${i < A.EDICIONES.length - 1 ? `<a href="${enlace('juegos', A.EDICIONES[i + 1].year)}">${A.EDICIONES[i + 1].year}.º →</a>` : ''}</nav>
    </article>`;
  }
  return `${migas(['Juegos'])}${cabecera('Archivo de los Juegos', 'Ediciones de los Juegos')}
  <ul class="tarjetas-ediciones">${A.EDICIONES.map(e => `<li><a href="${enlace('juegos', e.year)}"><span class="anio">${e.year}.º</span><h2>${esc(e.title)}</h2><p>${esc(e.note)}</p><p class="arena">Arena: ${esc(e.arena)}</p></a></li>`).join('')}</ul>`;
}

function cronologia() {
  const destino = h => h.juego ? enlace('juegos', h.juego) : h.seccion ? enlace(h.seccion) : null;
  return `${migas(['Cronología'])}${cabecera('Panem', 'Cronología', 'De los Días Oscuros al fin de los Juegos, según la continuidad de las películas.')}
  <ol class="linea-tiempo">${C.CRONOLOGIA.map(h => `<li><span class="anio">${esc(h.cuando)}</span><div><h2>${destino(h) ? `<a href="${destino(h)}">${esc(h.titulo)}</a>` : esc(h.titulo)}</h2><p>${esc(h.texto)}</p></div></li>`).join('')}</ol>`;
}

function lugares() {
  const grupos = [...new Set(C.LUGARES.map(l => l.grupo))];
  return `${migas(['Lugares'])}${cabecera('Panem', 'Lugares', 'Arenas, Capitolio, distritos y escenarios de los Juegos.')}
  ${grupos.map(g => `<section class="bloque"><h2>${esc(g)}</h2><ul class="tarjetas-lugares">${C.LUGARES.filter(l => l.grupo === g).map(l => `<li id="${esc(l.id)}">${propia('lugares/' + l.id, l.nombre, 'tarjeta-img')}<h3>${esc(l.nombre)}</h3><p>${esc(l.texto)}</p>${l.juego ? `<p><a href="${enlace('juegos', l.juego)}">Ver la edición ${l.juego}.º</a></p>` : ''}${etiquetaCanon(l.canon)}</li>`).join('')}</ul></section>`).join('')}
  <figure class="figura">${imagen(A.GALERIA[1])}<figcaption>Arena del bosque · ilustración del proyecto</figcaption></figure>
  <section class="bloque"><h2>Tipos de arena del videojuego</h2><p class="nota">Plantillas del modo libre del videojuego, no arenas de ediciones concretas.</p>
    <ul class="tarjetas-arenas">${A.TIPOS_ARENA.map(a => `<li><h3>${esc(a.name)}</h3><p>${esc(a.description)}</p><p class="peligros">Peligros: ${a.danger.map(esc).join(', ')}</p></li>`).join('')}</ul>
  </section>`;
}

const relato = (t, x) => `<ol class="relato">${x.map((e, i) => `<li><span class="relato-n">${String(i + 1).padStart(2, '0')}</span><div><h2>${esc(e.titulo)}</h2><p>${esc(e.texto)}</p></div></li>`).join('')}</ol>`;

function gira() {
  return `${migas(['Gira de la Victoria'])}${cabecera('Después de los Juegos', 'Gira de la Victoria', C.GIRA.entradilla)}
  <dl class="datos">${canon({ canon_status: C.GIRA.canon, source_ref: C.FUENTE_PELICULAS })}</dl>${relato('gira', C.GIRA.etapas)}`;
}

function rebelion() {
  return `${migas(['Rebelión y Guerra'])}${cabecera('Panem', 'Rebelión y Guerra', C.REBELION.entradilla)}
  <dl class="datos">${canon({ canon_status: C.REBELION.canon, source_ref: C.FUENTE_PELICULAS })}</dl>${relato('rebelion', C.REBELION.fases)}`;
}

function documentos() {
  return `${migas(['Documentos'])}${cabecera('Archivo documental', 'Documentos y acontecimientos', 'Bandos, comunicados y registros de Panem.')}
  <div class="documentos">${C.DOCUMENTOS.map(d => `<article class="documento" id="${esc(d.id)}"><header><p class="antetitulo">${esc(d.tipo)} · ${esc(d.fecha)}</p><h2>${esc(d.titulo)}</h2></header>${parrafos(d.texto)}${etiquetaCanon(d.canon)}</article>`).join('')}</div>`;
}

function galeria() {
  return `${migas(['Galería'])}${cabecera('Ilustraciones originales del proyecto', 'Galería')}
  <p class="nota">${esc(C.GALERIA_NOTA)}</p>
  <ul class="galeria">${A.GALERIA.map(g => `<li><figure>${imagen(g)}<figcaption><b>${esc(g.titulo)}</b><small>${esc(g.nota)}</small></figcaption></figure></li>`).join('')}</ul>`;
}

function noEncontrado() {
  return `${cabecera('Archivo de Panem', 'Expediente no encontrado', 'No hay ninguna ficha en esa dirección.')}<p><a href="/">Volver al inicio</a></p>`;
}

const VISTAS = { '': portada, distritos, capitolio, personajes, juegos: ediciones, cronologia, gira, 'rebelion-y-guerra': rebelion, lugares, galeria, documentos };

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
