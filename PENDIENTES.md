# Estado real (probado)
| Área | Estado |
|---|---|
| Web publicada en Render (`la-cosecha-web.onrender.com`) | ✅ Carga sin errores de JavaScript ni recursos rotos (Chrome, escritorio y móvil 390 px) |
| Inicio, modo historia y modo libre hasta la cosecha | ✅ Navegación probada en navegador |
| Guerra civil, eventos de campañas 50/74/75, modo libre | ✅ Cubiertos por `tests/smoke.mjs` |
| Campañas 50/74/75 completas (8 capítulos y finales alternativos) | ✅ `tests/campaigns.mjs` (9 recorridos) y jugadas de principio a fin en Chrome |
| Imágenes y recursos referenciados | ✅ Comprobados por las pruebas |
| Modo «¿Y si…?» | ✅ `tests/saves.mjs` (escenarios, editor, de la configuración a la Arena) y probado en Chrome (escritorio y móvil) |
| Guardar, cargar, exportar e importar | ✅ `tests/saves.mjs`: ida y vuelta, archivos dañados o inválidos, partida presidencial con crisis pendiente |
| Presidencia: órdenes, crisis y finales | ✅ `tests/presidency.mjs` y 1000 mandatos simulados con el motor real |
| Web y Android con el mismo juego | ✅ `scripts/paridad.mjs` (53 archivos idénticos), también en GitHub Actions |
| Despliegue automático en Render | ⚠️ No se lanza solo al subir a GitHub; se publica a mano desde la API. Hay que reconectar el repositorio en Render |
| APK Android 4.9 (CI) | ✅ GitHub Actions, ejecución 45982199817 sobre `integracion-cosecha-5x`: 16 suites en verde (13 Android, Web, paridad y detección de divergencias), APK de depuración de 7,2 MB con `versionName` 4.9.0 / `versionCode` 40900, 52 archivos de juego, sin WAV ni módulos rechazados |
| APK Android 4.9 instalado (CI, emulador) | ✅ Emulador Android 14 (API 34, x86_64, imagen AOSP, WebView 113): arranque y versión, navegación por los cuatro modos, ajustes, sonido, guardado automático, cierre y reapertura de la app, carga de la ranura, 50.º completo (9 escenas, 8 acontecimientos de Arena y final) y borrar partida con confirmación. 18/18 comprobaciones; informe y capturas en el artefacto «La-Cosecha-Android-emulador». ⏳ Falta un móvil físico |
| Pruebas locales (no CI) | Recorridos en Chrome de escritorio y móvil del bundle `www/` (50.º, ajustes y ranuras). Sirven de apoyo; la referencia es CI |
| Web publicada (versión 4.8) | ✅ Comprobada en Chrome contra `la-cosecha-web.onrender.com`: sin errores de JavaScript ni recursos rotos, service worker con caché `la-cosecha-v4-8`, presidencia y «¿Y si…?» funcionando (escritorio y móvil) |

## Qué es prototipo todavía
El código del juego ocupa ~77 KB (`js/app.js`) y `js/data.js` ~8,5 KB: la estructura de todos los modos existe, pero varios sistemas son simplificados. Según `docs/ESTADO_IMPLEMENTACION_4_4.md`:
- Guerra: simulación abstracta, sin mapa geográfico ni unidades.
- Campañas: ramificadas, pero no adaptación capítulo a capítulo.
- Economía presidencial: agregada, sin profundidad fiscal ni institucional.

## Pendiente
### Juego
- [x] Un capítulo por día de Arena y finales alternativos en las campañas 50, 74 y 75 (4.6).
- [ ] Ampliar las campañas fuera de la Arena: desfile, entrenamiento y entrevistas propias de cada edición.
- [ ] Más ramas en el 75.º (Johanna, Beetee) y consecuencias que continúen en el modo Presidente.
- [ ] Revisar fidelidad al canon de personajes, distritos y acontecimientos.
- [x] Modo libre: alineaciones «¿Y si…?», tributos nuevos y sustituciones (4.7).
- [ ] Modo libre: editor de arenas y reglas propias.
- [x] Modo Presidente: órdenes con efectos visibles, 9 crisis, mandato de 40 días y 6 finales (4.8).
- [ ] Modo Presidente: la guerra civil casi nunca se alcanza con juego normal; revisar su equilibrio. Más crisis y personajes canónicos (Plutarch, Coin, Paylor).
- [ ] IA de tributos: alianzas, rivalidades, movimiento y combate.
- [ ] Heridas, hambre, sed y consecuencias persistentes: probar partidas largas.
- [x] Guardado, carga, importación y exportación: prueba de ida y vuelta automatizada (4.8).
- [ ] Música original (ahora solo hay efectos sintetizados).
- [x] APK compilado en GitHub Actions y contenido verificado (4.8).
- [x] APK instalado y recorrido en un emulador Android 14 (4.9, en CI).
- [ ] Probarlo en un móvil físico.
- [x] El APK lleva la versión del juego (4.9.0 / 40900); criterio en `La_Cosecha_Juego_Android/docs/VERSIONADO.md`.
- [ ] Actualizar las acciones de GitHub a versiones con Node 24 (aviso de GitHub; ahora funcionan).

### Web
- [ ] Recorrer en navegador el modo Presidente con el equilibrio nuevo hasta el día 40.
- [ ] Probar en Safari/iOS y Firefox.
- [ ] Mapas de Arena propios para el 50.º (pradera) y el 75.º (reloj): ahora el 50.º reutiliza el bosque.
- [ ] Retratos propios para personajes canónicos (ahora se muestra el número de distrito).

### GitHub
- [ ] Crear un Release cuando el APK se haya probado en un móvil. **No se publica todavía.**

### Deuda técnica detectada en la fase 1
- [ ] Guardado en Android: el WebView escribe `localStorage` en disco con unos segundos de retraso. Si el sistema mata la app justo después de guardar, se pierde lo último (visto en el emulador). Propuesta: guardar también con el almacenamiento nativo de Capacitor (`@capacitor/preferences`). Necesita autorización.
- [ ] Tamaño de texto: usa `zoom` de CSS. En WebView antiguos (113) Playwright no calcula bien dónde pulsar con el texto ampliado; en el emulador se hizo clic directo en esos botones (queda anotado en el informe). Hay que comprobarlo con el dedo en un móvil y, si falla, pasar los tamaños a `rem`.
- [ ] `app.js` sigue siendo un único archivo de ~87 KB.

## Errores encontrados y corregidos
| Versión | Error | Estado |
|---|---|---|
| 4.9 | Los botones de la cabecera (inicio «LA COSECHA» y ⚙ Ajustes) no hacían nada en Web ni Android | ✅ Corregido y con prueba (lo detectó la prueba en el emulador) |
| 4.9 | El APK incluía módulos rechazados, el máster WAV e imágenes sin uso | ✅ Corregido y comprobado en CI |
| 4.9 | CI solo ejecutaba 4 suites | ✅ Corregido: 16 pasos separados |
| 4.8 | Presidencia: todas las órdenes tenían la misma descripción | ✅ Corregido |
| 4.8 | Presidencia: se perdía siempre en 8-16 días; el régimen caía con rebelión 0 si el orden llegaba a 0 | ✅ Corregido y simulado |
| 4.8 | Presidencia: el indicador decía «SIN PARTIDA» durante el mandato | ✅ Corregido |
| 4.8 | Las crisis mostraban «d.stability +8» en vez de texto legible | ✅ Corregido y con prueba |
| 4.8 | «¿Y si…?»: al editar un escenario se perdía su nombre en la partida | ✅ Corregido y con prueba |
| 4.8 | GitHub Actions: «Failed to find package 'tools'» en setup-android@v3 | ✅ Corregido: la compilación termina en verde |
| 4.7 | La lista de tributos vivos cortaba en 16 y escondía a parte de la alineación | ✅ Corregido |
| 4.7 | Retratos rotos para personajes canónicos en el modo libre | ✅ Corregido |
| 4.6 | El azar podía matar a Rue, Peeta o Maysilee antes de su escena | ✅ Corregido y con prueba |
| 4.5 | El modo libre mostraba el texto y las decisiones del 75.º Vasallaje | ✅ Corregido y con prueba |
| 4.5 | Errata «CORNucopia» en el mapa | ✅ Corregido |
| 4.5 | El service worker devolvía el HTML cuando fallaba una imagen | ✅ Corregido |
| 4.5 | La portada usaba una imagen con botones dibujados que no eran clicables | ✅ Sustituida por una versión limpia |
| 4.5 | Icono ilegible (era la captura del menú reducida) | ✅ Icono nuevo |
| 4.4→repo | `render.yaml` dentro de la subcarpeta (Render no lo leía) | ✅ Movido a la raíz |
| 4.4→repo | Workflow del APK en la subcarpeta, con caché npm sin lockfile y `cap add` bloqueado | ✅ Corregido |
| 4.4→repo | CHANGELOG desordenados y con cabeceras duplicadas | ✅ Corregido |
