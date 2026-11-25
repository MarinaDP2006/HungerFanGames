# La Cosecha · Web para Render

## Publicación
1. Crea un repositorio para este paquete y sube el contenido de esta carpeta a su raíz.
2. En Render crea un **Static Site** conectado al repositorio.
3. Render detectará `render.yaml`; la carpeta publicada es la raíz (`.`).
4. Tras el despliegue, abre la URL HTTPS. La PWA y el service worker requieren HTTPS (o localhost).

No necesita servidor Node ni variables de entorno. Para desarrollo local, sirve esta carpeta mediante cualquier servidor HTTP estático; no abras `index.html` como `file://`.

## Contenido
- `index.html`, `css/`, `js/`: interfaz y lógica cliente.
- `assets/`: ilustraciones originales, iconos y retratos generados.
- `manifest.webmanifest`, `sw.js`: instalación PWA y caché.

## Alcance real
Es una versión web jugable/prototipo ampliado. Las campañas canónicas, el sistema de combate, la simulación presidencial y los mapas aún no equivalen a un videojuego comercial completo. Los retratos incluidos son originales generados y no representan a los actores. Los fotogramas de películas no se redistribuyen.
