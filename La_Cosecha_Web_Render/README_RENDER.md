# La Cosecha · Despliegue en Render

## Recomendado: usar el Blueprint incluido
1. Sube el repositorio `HungerFanGames` a tu cuenta de GitHub.
2. En Render, abre **New + → Blueprint** y conecta ese repositorio.
3. Render leerá el `render.yaml` de la raíz del repositorio.
4. Comprueba que el servicio `la-cosecha-web` usa `La_Cosecha_Web_Render` como directorio raíz y `.` como directorio publicado.
5. Confirma la creación del Static Site. Render publicará la web y podrá desplegar automáticamente los siguientes commits de `main`.

## Alternativa: crear el Static Site manualmente
- Repository: `MarinaDP2006/HungerFanGames`
- Branch: `main`
- Root Directory: `La_Cosecha_Web_Render`
- Build Command: dejar vacío
- Publish Directory: `.`

No necesita servidor Node ni variables de entorno. La PWA y el service worker requieren HTTPS (o localhost). No abras `index.html` como `file://`; usa un servidor HTTP local.

## Contenido
- `index.html`, `css/`, `js/`: interfaz y lógica cliente.
- `assets/`: ilustraciones originales, iconos y retratos generados.
- `manifest.webmanifest`, `sw.js`: instalación PWA y caché.

## Alcance real
Es una versión web jugable/prototipo ampliado. Las campañas canónicas, el sistema de combate, la simulación presidencial y los mapas aún no equivalen a un videojuego comercial completo. Los retratos incluidos son originales generados y no representan a los actores. Los fotogramas de películas no se redistribuyen.
