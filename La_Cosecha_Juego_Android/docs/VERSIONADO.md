# Criterio de versionado · La Cosecha (juego Android)

## Fuente única
`La_Cosecha_Juego_Android/package.json` → campo `version`, con formato `MAYOR.MENOR.PARCHE` (por ejemplo, `4.9.0`).

Todo lo demás se deriva de ese valor y se comprueba automáticamente:

| Dónde | Valor | Quién lo comprueba |
|---|---|---|
| `js/version.js` (`GAME_VERSION`) | igual que `package.json` | `scripts/build-web.mjs` (el build falla) y `tests/version.test.mjs` |
| Pie de la app y pantalla de Ajustes | «Versión 4.9.0» | Se lee de `GAME_VERSION` |
| Caché del service worker (`sw.js`) | `la-cosecha-android-<versión>` | `scripts/build-web.mjs` y `tests/version.test.mjs` |
| APK: `versionName` | la versión (`4.9.0`) | `scripts/android-version.mjs` + `aapt` en GitHub Actions |
| APK: `versionCode` | `MAYOR*10000 + MENOR*100 + PARCHE` (4.9.0 → 40900) | `scripts/android-version.mjs` + `aapt` en GitHub Actions |
| `CHANGELOG.md` | la primera entrada es `## MAYOR.MENOR …` | `tests/version.test.mjs` y `scripts/paridad.mjs` |

`MENOR` y `PARCHE` van de 0 a 99, para que `versionCode` siempre crezca (Google Play exige que aumente).

## Cuándo sube cada número
- **PARCHE:** correcciones sin funciones nuevas ni cambios en el formato de guardado.
- **MENOR:** funciones nuevas, campañas o contenido integrado. Una fase del plan suele cerrar con una versión MENOR.
- **MAYOR:** cambios que rompen la compatibilidad (por ejemplo, partidas antiguas que ya no se pueden migrar). Hasta ahora no ha ocurrido: todas las partidas antiguas se migran.

## Cómo publicar una versión nueva
1. Cambia `version` en `package.json`.
2. Cambia `GAME_VERSION` en `js/version.js`.
3. Cambia `CACHE` en `sw.js` a `la-cosecha-android-<versión>`.
4. Añade la entrada en `CHANGELOG.md`.
5. Ejecuta las pruebas: si algo no coincide, el build y `tests/version.test.mjs` fallan.

## Versión del formato de guardado
Es independiente de la versión del juego: `saveVersion` en `js/saves.js` (actualmente 4). Solo sube si cambia la estructura de los datos guardados, y cada subida necesita su migración y su prueba.

## La Web
La Web es un producto independiente y tiene su propio CHANGELOG. Este criterio no se aplica a la Web.
