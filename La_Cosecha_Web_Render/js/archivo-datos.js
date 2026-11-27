// Archivo de Panem · índices derivados de los datos compartidos (js/data.js).
// Aquí no se escribe contenido nuevo: solo se ordena y relaciona lo que ya existe.
// Lo que falta se registra en PENDIENTES para que la Web lo muestre como pendiente.
import { districts, characters, canonEditions, arenaTypes, mentors } from './data.js';

export const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Los doce distritos de las cosechas. El 13 se trata aparte: no participa en las cosechas canónicas.
export const DISTRITOS = districts.filter(d => d.id >= 1 && d.id <= 12);
export const DISTRITO_13 = districts.find(d => d.id === 13) || null;
export const distrito = id => districts.find(d => d.id === Number(id)) || null;

export const PERSONAJES = characters.map(c => ({ ...c, slug: slug(c.name) }));
export const personaje = s => PERSONAJES.find(c => c.slug === s) || null;
export const personajesDe = id => PERSONAJES.filter(c => c.district === Number(id));

// Rol tal como figura en los datos, agrupado para filtrar.
export const esVencedor = c => /vencedor/i.test(c.role);
export const esTributo = c => /tributo/i.test(c.role);
export const ROLES = [
  { id: 'todos', label: 'Todos', test: () => true },
  { id: 'tributos', label: 'Tributos', test: esTributo },
  { id: 'vencedores', label: 'Vencedores y mentores', test: c => esVencedor(c) || /mentor/i.test(c.role) },
];

// Mentores por distrito: los datos incluyen marcadores genéricos («Mentor del Distrito 1»).
// Esos no son personas: se muestran como plaza sin identificar, no como nombres.
const GENERICO = /^(mentor|vencedor|vencedora) del distrito/i;
export const MENTORES = Object.entries(mentors).map(([id, list]) => ({
  district: Number(id),
  nombres: list.filter(n => !GENERICO.test(n)),
  sinIdentificar: list.some(n => GENERICO.test(n)),
}));
// Vencedores y mentores con nombre: los de la lista de personajes y los citados en la de mentores.
export function vencedores() {
  const out = new Map();
  for (const c of PERSONAJES) if (esVencedor(c) || /mentor/i.test(c.role)) out.set(c.name, { name: c.name, district: c.district, ficha: c.slug });
  for (const m of MENTORES) for (const n of m.nombres) {
    const ficha = PERSONAJES.find(c => c.name === n);
    if (!out.has(n)) out.set(n, { name: n, district: m.district, ficha: ficha ? ficha.slug : null });
  }
  return [...out.values()].sort((a, b) => a.district - b.district || a.name.localeCompare(b.name, 'es'));
}

export const EDICIONES = [...canonEditions].sort((a, b) => a.year - b.year);
export const edicion = y => EDICIONES.find(e => e.year === Number(y)) || null;
export const TIPOS_ARENA = arenaTypes;

// Ilustraciones originales del proyecto disponibles. No se incluye menu-panem.png (contiene
// elementos protegidos) ni ninguna imagen de las películas.
export const GALERIA = [
  { src: 'assets/optimized/capitolio-960.webp', fallback: 'assets/optimized/capitolio-960.jpg', w: 926, h: 1240, titulo: 'El Capitolio', nota: 'Portada del proyecto' },
  { src: 'assets/optimized/arena-bosque-1600.webp', fallback: 'assets/optimized/arena-bosque-1600.jpg', w: 1600, h: 900, titulo: 'Arena del bosque', nota: 'Mapa de Arena del videojuego' },
  ...Array.from({ length: 12 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return { src: `assets/optimized/tribute-${n}.webp`, fallback: `assets/tributes/tribute-${n}.jpg`, w: 300, h: 437, titulo: `Retrato de tributo ${n}`, nota: 'Retrato genérico del videojuego; no representa a un personaje concreto' };
  }),
];

// Novedades para la comunidad: entradas aprobadas, de la más reciente a la más antigua.
// { fecha: 'AAAA-MM-DD', titulo, texto }. Vacío hasta que se aprueben.
export const NOVEDADES = [];

// Contenido pendiente de la dirección creativa (lo que la Web no inventa).
export const PENDIENTES = {
  mapa: 'Mapa ilustrado de Panem con la situación de cada distrito y del Capitolio.',
  capitolio: 'Ficha del Capitolio: descripción, lugares y papel en los Juegos.',
  distrito: 'Ficha ampliada de cada distrito: geografía, vida cotidiana, símbolos y tributos destacados.',
  personajes: 'Fichas de más personajes canónicos y retratos aprobados.',
  vencedores: 'Fichas de los mentores y vencedores que hoy solo aparecen con su nombre o sin identificar.',
  ediciones: 'Fichas completas de las ediciones: tributos, mentores, arena, acontecimientos y vencedor.',
  cronologia: 'Cronología aprobada de Panem: los Días Oscuros, la Primera Rebelión, los Juegos y la Segunda Rebelión.',
  arenas: 'Fichas y mapas de las arenas canónicas (pradera del 50.º, bosque y lago del 74.º, reloj del 75.º).',
  documentos: 'Archivo documental: textos del universo aprobados (proclamas, comunicados, registros).',
  galeria: 'Nuevas ilustraciones originales: distritos, Capitolio, arenas y retratos aprobados.',
  novedades: 'Primeras novedades para la comunidad, redactadas y aprobadas.',
};
