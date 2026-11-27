// Archivo de Panem · punto de entrada de la Web. Direcciones estables (/distritos/12) con el historial
// del navegador; Render sirve index.html para cualquier ruta. Las direcciones antiguas «#/…» se convierten.
// No carga ningún módulo del videojuego: solo datos compartidos y las vistas del archivo.
import { parseRuta, render, tituloDe, SECCIONES, enlace } from './archivo-vistas.js';

const main = document.querySelector('#contenido');
const nav = document.querySelector('#navegacion');
let filtros = {};

// Imágenes propias: se prueba .jpg, .png, .webp y .jpeg; si no hay ninguna, se quita y se ve lo de siempre.
const EXT = ['jpg', 'png', 'webp', 'jpeg'];
document.addEventListener('error', e => {
  const im = e.target;
  if (!(im instanceof HTMLImageElement) || !im.dataset.propia) return;
  const i = Number(im.dataset.ext) + 1;
  if (i < EXT.length) { im.dataset.ext = i; im.src = `/imagenes-propias/${im.dataset.propia}.${EXT[i]}`; } else im.remove();
}, true);
document.addEventListener('load', e => {
  const im = e.target;
  if (!(im instanceof HTMLImageElement) || !im.dataset.propia) return;
  im.classList.add('ok');
  im.closest('.con-propia')?.classList.add('tiene-propia');
}, true);

nav.innerHTML = SECCIONES.map(s => `<a href="${enlace(s.id)}" data-seccion="${s.id}">${s.label}</a>`).join('');

// Menú a pantalla completa en el móvil.
const menuBoton = document.querySelector('#menu-boton');
const menu = abierto => { document.documentElement.classList.toggle('menu-abierto', abierto); menuBoton?.setAttribute('aria-expanded', String(abierto)); };
menuBoton?.addEventListener('click', () => menu(!document.documentElement.classList.contains('menu-abierto')));
nav.addEventListener('click', () => menu(false));

// Aparición suave de los bloques al entrar en pantalla.
const observador = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observador.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' }) : null;
const revelar = () => main.querySelectorAll('.revela:not(.visible)').forEach(el => observador ? observador.observe(el) : el.classList.add('visible'));

if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));

// Navegación inmersiva:
//  · «Volver» en cada página: retrocede en el historial si se llegó desde el Archivo; si no, sube al nivel anterior.
//  · Cada página recuerda dónde estabas leyendo: al volver atrás, el scroll se restaura.
//  · Transición suave entre páginas (View Transitions si el navegador la tiene; si no, fundido CSS).
//  · Barra de lectura y cabecera que se compacta al bajar. Tecla Escape = volver.
history.scrollRestoration = 'manual';
const POS = 'archivo:pos:';
const guardarPos = () => { try { sessionStorage.setItem(POS + location.pathname, String(window.scrollY)); } catch {} };
const leerPos = () => { try { return Number(sessionStorage.getItem(POS + location.pathname)) || 0; } catch { return 0; } };
const padre = ruta => ruta.id ? enlace(ruta.seccion) : '/';
const reduce = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function pintar(ruta, enfocar, restaurar) {
  if (ruta.seccion !== 'personajes') filtros = {};
  const volver = ruta.seccion ? `<p class="volver-barra"><a class="volver" href="${padre(ruta)}" data-volver>← Volver</a></p>` : '';
  main.innerHTML = volver + render(ruta, filtros);
  document.title = tituloDe(ruta);
  for (const a of nav.querySelectorAll('a')) {
    a.removeAttribute('aria-current');
    if (a.dataset.seccion === ruta.seccion) a.setAttribute('aria-current', 'page');
  }
  document.documentElement.dataset.ruta = ruta.seccion || 'inicio';
  revelar();
  if (enfocar) main.focus({ preventScroll: true });
  window.scrollTo(0, restaurar ? leerPos() : 0);
  progreso();
}

function mostrar({ enfocar = true, restaurar = false, animar = true } = {}) {
  const ruta = parseRuta(location.pathname);
  if (animar && !reduce() && document.startViewTransition) { document.startViewTransition(() => pintar(ruta, enfocar, restaurar)); return; }
  pintar(ruta, enfocar, restaurar);
  if (animar && !reduce()) { main.classList.remove('entrando'); void main.offsetWidth; main.classList.add('entrando'); }
}

function ir(url) {
  guardarPos();
  if (url !== location.pathname) history.pushState({ interno: true }, '', url);
  mostrar();
}
function volver() {
  if (history.state?.interno) history.back();
  else { const r = parseRuta(location.pathname); history.replaceState(null, '', padre(r)); mostrar(); }
}

// Enlaces internos: sin recargar la página.
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="/"]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
  const url = new URL(a.href);
  if (url.origin !== location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;
  e.preventDefault();
  if (a.hasAttribute('data-volver')) return volver();
  ir(url.pathname);
});
window.addEventListener('popstate', () => mostrar({ restaurar: true }));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.documentElement.classList.contains('menu-abierto')) return menu(false);
  if (e.key === 'Escape' && location.pathname !== '/' && !e.target.closest('input,textarea,select')) volver();
});

// Barra de lectura y cabecera compacta.
const barra = document.createElement('div');
barra.className = 'progreso-lectura'; barra.setAttribute('aria-hidden', 'true');
document.body.prepend(barra);
function progreso() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  barra.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
  document.documentElement.classList.toggle('compacta', window.scrollY > 80);
  document.documentElement.classList.toggle('sobre-heroe', location.pathname === '/' && window.scrollY < window.innerHeight * .7);
}
let pendiente = false;
window.addEventListener('scroll', () => { if (!pendiente) { pendiente = true; requestAnimationFrame(() => { pendiente = false; progreso(); }); } }, { passive: true });
window.addEventListener('pagehide', guardarPos);

// Filtros de personajes: se aplican al escribir o cambiar, sin recargar.
main.addEventListener('input', e => {
  const form = e.target.closest('[data-filtros]');
  if (!form) return;
  const datos = new FormData(form);
  filtros = { q: datos.get('q') || '', distrito: datos.get('distrito') || '', rol: datos.get('rol') || 'todos' };
  const foco = e.target.name, pos = e.target.selectionStart;
  mostrar({ enfocar: false, animar: false });
  const campo = main.querySelector(`[name="${foco}"]${foco === 'rol' ? ':checked' : ''}`);
  if (campo) { campo.focus(); if (pos != null && campo.setSelectionRange) campo.setSelectionRange(pos, pos); }
});
main.addEventListener('click', e => { if (e.target.closest('[data-bajar]')) document.querySelector('#indice-portada')?.scrollIntoView({ behavior: reduce() ? 'auto' : 'smooth' }); });
main.addEventListener('submit', e => { if (e.target.closest('[data-filtros]')) e.preventDefault(); });

mostrar({ enfocar: false, animar: false });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
