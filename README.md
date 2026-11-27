# HungerFanGames

Fangame de *Los Juegos del Hambre*: **La Cosecha**. Dos productos distintos que comparten universo y datos.

| Carpeta | Qué es | Cómo se publica |
|---|---|---|
| `La_Cosecha_Web_Render/` | **Archivo de Panem**: web editorial (distritos, personajes, ediciones, arenas, galería). No incluye el juego | Render Static Site mediante `render.yaml` → ver `La_Cosecha_Web_Render/README_RENDER.md` |
| `La_Cosecha_Juego_Android/` | **La Cosecha, el videojuego** (Android, Capacitor) | GitHub Actions `Build Android APK` → ver `La_Cosecha_Juego_Android/README_ANDROID.md` |
| `compartido/` | Datos de Panem comunes. Se copian a cada producto con `node scripts/sincronizar-compartido.mjs` | Va dentro de cada producto |

Tareas pendientes y errores corregidos: `PENDIENTES.md`.

Los dos productos son independientes: los cambios en uno no relanzan la publicación del otro. Arquitectura y reglas: `docs/SEPARACION_ANDROID_WEB.md`.
