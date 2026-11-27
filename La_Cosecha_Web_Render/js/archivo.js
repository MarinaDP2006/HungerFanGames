// Archivo de Panem · punto de entrada de la Web. Navegación por secciones (#/seccion/id).
// No carga ningún módulo del videojuego: solo datos compartidos y las vistas del archivo.
import { parseRuta, render, tituloDe, SECCIONES, enlace } from './archivo-vistas.js';

const main = document.querySelector('#contenido');
const nav = document.querySelector('#navegacion');
let filtros = {};

nav.innerHTML = SECCIONES.map(s => `<a href="${enlace(s.id)}" data-seccion="${s.id}">${s.label}</a>`).join('');

function mostrar({ enfocar = true } = {}) {
  const ruta = parseRuta(location.hash);
  if (ruta.seccion !== 'personajes') filtros = {};
  main.innerHTML = render(ruta, filtros);
  document.title = tituloDe(ruta);
  const activa = ruta.seccion === 'capitolio' ? 'distritos' : ruta.seccion;
  for (const a of nav.querySelectorAll('a')) a.removeAttribute('aria-current');
  for (const a of nav.querySelectorAll('a')) if (a.dataset.seccion === activa) a.setAttribute('aria-current', 'page');
  document.documentElement.dataset.ruta = ruta.seccion || 'portada';
  if (enfocar) { main.focus({ preventScroll: true }); window.scrollTo(0, 0); }
}

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

window.addEventListener('hashchange', () => mostrar());
mostrar({ enfocar: false });

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
