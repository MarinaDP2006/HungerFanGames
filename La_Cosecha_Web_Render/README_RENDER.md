# Archivo de Panem · Despliegue en Render

## Recomendado: usar el Blueprint incluido
1. En Render abre **New + → Blueprint** y conecta el repositorio `MarinaDP2006/HungerFanGames`.
2. Render lee el `render.yaml` de la **raíz** del repositorio. Ya trae `rootDir: La_Cosecha_Web_Render` y `staticPublishPath: .`.
3. Confirma la creación del Static Site `la-cosecha-web`.
4. Los siguientes commits a `main` que cambien `La_Cosecha_Web_Render/` se despliegan solos. Los cambios en el juego Android no relanzan la web.

El Blueprint también configura las cabeceras de seguridad, desactiva la caché de `sw.js` e `index.html` (para que las versiones nuevas lleguen al momento), guarda en caché las imágenes durante 7 días y redirige cualquier ruta a `index.html`.

## Alternativa: crear el Static Site manualmente
- Repository: `MarinaDP2006/HungerFanGames`
- Branch: `main`
- Root Directory: `La_Cosecha_Web_Render`
- Build Command: dejar vacío
- Publish Directory: `.`

No necesita servidor Node ni variables de entorno. La PWA y el service worker requieren HTTPS (o localhost). No abras `index.html` como `file://`; usa un servidor HTTP local (por ejemplo `npx serve .`).

## Contenido
- `index.html`, `css/archivo.css`, `js/archivo*.js`: el Archivo de Panem (sitio editorial, sin el videojuego).
- `js/data.js`: copia de los datos compartidos (`compartido/data.js`).
- `assets/`: ilustraciones originales, iconos y retratos generados.
- `manifest.webmanifest`, `sw.js`: instalación y consulta sin conexión. El service worker nuevo sustituye al del antiguo juego web y borra su caché.

## Al desplegar esta versión
- La dirección pasa de ser el juego web a ser el Archivo. Las partidas que alguien tuviera en el juego web siguen en su navegador, pero el Archivo no las abre: el juego está en Android.
- El nombre del servicio en Render (`la-cosecha-web`) no cambia; se puede renombrar en Render si se quiere.

## Alcance real
Es la primera versión del Archivo: estructura completa y datos existentes. Mapa, documentos, novedades, cronología ampliada y fichas completas esperan contenido aprobado y aparecen como pendientes. Los retratos incluidos son originales generados y no representan a los actores. Los fotogramas de películas no se redistribuyen.
