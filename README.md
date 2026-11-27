# La Cosecha

Fangame personal de *Los Juegos del Hambre* (continuidad de las películas de Katniss).

| Carpeta | Qué es |
|---|---|
| `La_Cosecha_Juego_Android/` | El videojuego (Android, Capacitor). Lo compila la acción **Build Android APK**. |
| `La_Cosecha_Web_Render/` | **Archivo de Panem**, la web enciclopédica. Sitio estático (Render, `render.yaml`). |
| `compartido/` | Datos comunes de Panem. Se copian a los dos con `node scripts/sincronizar-compartido.mjs`. |
| `docs/fuentes/` | Textos narrativos de los que se generan las campañas del juego. |
| `scripts/` | Importadores de campañas y comprobaciones entre juego y web. |

- Imágenes propias: `imagenes-propias/LEEME.md` de cada producto.
- Estado: `HECHO.md` y `PENDIENTE.md`.
- Cambios: `CHANGELOG.md` de cada producto.

## Probar en local
```
cd La_Cosecha_Web_Render && npx serve -s .     # la web
cd La_Cosecha_Juego_Android && npx serve .     # el juego en el navegador
```
