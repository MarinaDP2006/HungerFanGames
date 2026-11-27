# Separación de productos: La Cosecha (Android) y Archivo de Panem (Web)

## Resultado
| | Android · La Cosecha | Web · Archivo de Panem |
|---|---|---|
| Qué es | El videojuego | Sitio editorial de consulta |
| Entrada | `js/app.js` | `js/archivo.js` |
| Estilo | `css/style.css` (oscuro, Cinzel, paneles de juego) | `css/archivo.css` (papel, tinta y sello lacre; tipografía serif del sistema) |
| Navegación | Pantallas de juego: modos, partidas, ajustes | Secciones con dirección propia: `#/distritos/12`, `#/personajes/<nombre>` |
| Partidas y guardado | Sí: 3 ranuras, copia nativa, exportar/importar | No |
| Service worker | Retira el antiguo y no guarda caché (los archivos van en el APK) | Consulta sin conexión (`archivo-panem-1.0.0`) |
| Pruebas | Workflow «Build Android APK»: suites, APK y emulador | Workflow «Archivo de Panem (Web)»: vistas, contratos y Chrome |

## Inventario antes de la separación
- **Idénticos en los dos productos (41 archivos):**
  - Datos: `js/data.js`.
  - Motor: `js/campaigns.js`, `presidency.js` y `whatif.js`.
  - Estilo: `css/style.css`.
  - Imágenes (40).
  - Pruebas: `tests/presidency.mjs`.
- **Distinto, pero el mismo juego:**
  - `js/app.js`: la Web tenía la versión anterior a la fase 1.
  - `index.html`, `sw.js` y `manifest.webmanifest`.
  - Pruebas `smoke`, `campaigns` y `saves`.
- **Solo Android:**
  - Campaña del 50.º.
  - Versión, ajustes, ranuras, guardado duradero y audio.
  - Pruebas de dispositivo y empaquetado.
- **Solo Web:** nada.

## Qué se ha hecho
1. **Datos compartidos.** `compartido/data.js` es la fuente única. Cada producto lleva una copia en `js/data.js` (Render solo publica la carpeta de la Web y el APK solo empaqueta la de Android). `scripts/sincronizar-compartido.mjs` copia, y con `--comprobar` falla si alguna copia difiere.
2. **Web nueva.** Entrada, navegación, vistas, componentes y estilo propios. Usa solo los datos existentes; lo que no tiene contenido aprobado se marca como pendiente (`PENDIENTES` en `js/archivo-datos.js`).
3. **Retirado de la Web.** `js/app.js`, `campaigns.js`, `presidency.js`, `whatif.js`, `css/style.css`, sus 4 pruebas y un documento duplicado. Justificación: todo es el videojuego, sigue en Android (que tiene su versión más reciente) y el historial de Git conserva las versiones web. No se ha borrado ningún dato ni imagen.
4. **Detector de contratos.** `scripts/paridad.mjs` ya no exige 41 archivos iguales. Comprueba:
   - datos compartidos idénticos;
   - imágenes comunes idénticas;
   - que la Web no lleve módulos, pantallas, partidas ni ajustes del juego;
   - que Android no cargue el Archivo;
   - que cada producto se sostenga solo;
   - los service workers.

   `scripts/paridad.test.mjs` provoca 14 mezclas o divergencias y comprueba que se detectan todas.
5. **Audio en Android.** `js/audio.js` decide la música por contexto: menú, Historia por edición, Arena, finales, Libre, Presidencia, crisis y escenas. Ajustes nuevos: Silenciar todo, Efectos y Música con volumen, guardados en las dos copias. **No hay pistas: no suena música.** El OGG original se conserva sin conectar.
6. **Guardado de Android intacto.** Mismo formato (`saveVersion` 4), mismas ranuras y misma copia nativa. Las preferencias anteriores se completan con los valores de música por defecto (con prueba).

## Riesgos y cómo se controlan
| Riesgo | Control |
|---|---|
| Editar `js/data.js` en un producto y no en el otro | Las copias se generan; el CI falla si difieren de `compartido/` |
| Que el motor del juego vuelva a la Web | `paridad.mjs`, `archivo.test.mjs` y el recorrido en Chrome |
| Usuarios de la Web antigua con caché | El nuevo `sw.js` de la Web se activa al momento y borra las cachés antiguas |
| Partidas del juego web antiguo | Siguen en el navegador de cada usuario; el Archivo no las lee ni las borra. El juego está en Android |
| Perder partidas de Android | Sin cambios en el guardado; pruebas de guardado, migración y emulador |
| Render | **No desplegado.** Al desplegar, la dirección actual pasará a mostrar el Archivo |

## Estado: implementado, probado y terminado
| Pieza | Implementado | Probado | Terminado |
|---|---|---|---|
| Separación de código (entradas, estilos, navegación) | ✅ | ✅ contratos, pruebas propias y Chrome | ✅ como estructura |
| Datos compartidos sincronizados | ✅ | ✅ | ✅ |
| Archivo: portada, distritos, personajes, vencedores, ediciones, cronología, arenas y galería con datos existentes | ✅ | ✅ Chrome móvil y escritorio | ❌ esperan contenido aprobado |
| Archivo: mapa ilustrado, documentos, novedades, Capitolio | Estructura y aviso de pendiente | ✅ | ❌ bloqueado por material creativo |
| Audio por contextos y preferencias | ✅ | ✅ unidad, Chrome y emulador | ❌ sin pistas (dirección musical) |
| Videojuego completo (mentor, IA de Arena, Presidencia profunda, campañas 74/75, etc.) | Parcial (el de la 4.10) | Parcial | ❌ |
