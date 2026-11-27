# Archivo de Panem · Web

Sitio editorial del universo de La Cosecha: distritos, personajes, vencedores, ediciones de los Juegos, cronología, arenas, documentos, galería y novedades.

**No es el videojuego.** El juego está en `La_Cosecha_Juego_Android/`. Esta carpeta no contiene el motor, las partidas ni las pantallas de juego, y el detector de contratos (`scripts/paridad.mjs`) falla si vuelven a entrar.

## Estructura
| Archivo | Qué hace |
|---|---|
| `index.html` | Entrada: cabecera, menú de secciones, contenido y pie |
| `js/archivo.js` | Navegación por secciones (`#/distritos/12`) y filtros |
| `js/archivo-vistas.js` | Vistas: funciones que convierten los datos en páginas (sin navegador, probables en Node) |
| `js/archivo-datos.js` | Índices sobre los datos compartidos y la lista de contenidos **pendientes** |
| `js/data.js` | **Copia** de `compartido/data.js`. No se edita aquí: se edita el original y se ejecuta `node scripts/sincronizar-compartido.mjs` |
| `css/archivo.css` | Estilo editorial propio (papel, tinta y sello), distinto del videojuego |
| `sw.js` | Consulta sin conexión |

## Contenido
- **Solo se publica contenido existente o aprobado.** Lo que falta aparece marcado como «Pendiente de contenido aprobado», con lo que se necesita (`PENDIENTES` en `js/archivo-datos.js`).
- **Novedades:** se añaden en `NOVEDADES` (`js/archivo-datos.js`) cuando estén redactadas y aprobadas.
- **Imágenes:** solo ilustraciones originales del proyecto. `assets/menu-panem.png` se conserva en el repositorio pero no se usa (contiene elementos protegidos).

## Pruebas
```bash
node --test La_Cosecha_Web_Render/tests/archivo.test.mjs   # vistas, rutas, datos, separación
npm install --no-save playwright-core@1.49.1
node La_Cosecha_Web_Render/tests/navegador.mjs             # Chrome, móvil y escritorio, capturas en web-report/
```
En GitHub: workflow «Archivo de Panem (Web)».

Publicación: `README_RENDER.md`. **No está desplegado.** Render sigue sirviendo la versión anterior hasta que se autorice.
