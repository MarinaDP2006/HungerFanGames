// Archivo de Panem · punto de entrada de la Web. Direcciones estables (/distritos/12) con el historial
// del navegador; Render sirve index.html para cualquier ruta. Las direcciones antiguas «#/…» se convierten.
// No carga ningún módulo del videojuego: solo datos compartidos y las vistas del archivo.
import { parseRuta, render, tituloDe, SECCIONES, enlace } from './archivo-vistas.js';

const main = document.querySelector('#contenido');
const nav = document.querySelector('#navegacion');
let filtros = {};

nav.innerHTML = SECCIONES.map(s => `<a href="${enlace(s.id)}" data-seccion="${s.id}">${s.label}</a>`).join('');

if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));

function mostrar({ enfocar = true } = {}) {
  const ruta = parseRuta(location.pathname);
  if (ruta.seccion !== 'personajes') filtros = {};
  main.innerHTML = render(ruta, filtros);
  document.title = tituloDe(ruta);
  for (const a of nav.querySelectorAll('a')) {
    a.removeAttribute('aria-current');
    if (a.dataset.seccion === ruta.seccion) a.setAttribute('aria-current', 'page');
  }
  document.documentElement.dataset.ruta = ruta.seccion || 'inicio';
  if (enfocar) { main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

// Enlaces internos: sin recargar la página.
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="/"]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target) return;
  const url = new URL(a.href);
  if (url.origin !== location.origin || /\.[a-z0-9]+$/i.test(url.pathname)) return;
  e.preventDefault();
  if (url.pathname !== location.pathname) history.pushState(null, '', url.pathname);
  mostrar();
});
window.addEventListener('popstate', () => mostrar());

// Filtros de personajes: se aplican al escribir o cambiar, sin recargar.
main.addEventListener('input', e => {
  const form = e.target.closest('[data-filtros]');
  if (!form) return;
  const datos = new FormData(form);
  filtros = { q: datos.get('q') || '', distrito: datos.get('distrito') || '', rol: datos.get('rol') || 'todos' };
  const foco = e.target.name, pos = e.target.selectionStart;
  mostrar({ enfocar: false });
  const campo = main.querySelector(`[name="${foco}"]${foco === 'rol' ? ':checked' : ''}`);
  if (campo) { campo.focus(); if (pos != null && campo.setSelectionRange) campo.setSelectionRange(pos, pos); }
});
main.addEventListener('submit', e => { if (e.target.closest('[data-filtros]')) e.preventDefault(); });

mostrar({ enfocar: false });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
