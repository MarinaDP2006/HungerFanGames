# La Cosecha · Despliegue en Render

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
- `index.html`, `css/`, `js/`: interfaz y lógica cliente.
- `assets/`: ilustraciones originales, iconos y retratos generados.
- `manifest.webmanifest`, `sw.js`: instalación PWA y caché.

## Alcance real
Es una versión web jugable/prototipo ampliado. Las campañas canónicas, el sistema de combate, la simulación presidencial y los mapas aún no equivalen a un videojuego comercial completo. Los retratos incluidos son originales generados y no representan a los actores. Los fotogramas de películas no se redistribuyen.
