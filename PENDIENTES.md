# Matriz de funcionalidades (Android 4.10.1)
Leyenda: ✅ sí · ⏳ pendiente · — no aplica. «Emulador» = Android 14 en GitHub Actions. «Móvil físico» = teléfono real (guía en `La_Cosecha_Juego_Android/docs/PRUEBA_MOVIL_FISICO.md`).

| Funcionalidad | Implementado | Pruebas automáticas (CI) | Probado en emulador | Validado en móvil físico |
|---|---|---|---|---|
| Arranque y versión visible | ✅ | ✅ `version.test` | ✅ | ⏳ (guía: `La_Cosecha_Juego_Android/docs/PRUEBA_MOVIL_FISICO.md`, plantilla: `PLANTILLA_RESULTADOS_MOVIL.md`) |
| Navegación Historia / Libre / Presidente / Códice | ✅ | ✅ `smoke` | ✅ | ⏳ |
| Botones de cabecera (inicio, Ajustes) | ✅ | ✅ `bundle-android.test` | ✅ | ⏳ |
| Ajustes: sonido, volumen, movimiento, texto, persistencia | ✅ | ✅ `settings.test` | ✅ | ⏳ |
| Texto ampliado pulsado con el dedo | ✅ | — | ⚠️ solo con clic directo (WebView 113) | ⏳ |
| Sonido audible | ✅ | — | ✅ motor de audio (el emulador no tiene altavoz) | ⏳ |
| 3 ranuras, borrar con confirmación | ✅ | ✅ `saves-slots.test` | ✅ | ⏳ |
| Guardado nativo + recuperación tras cierre forzado | ✅ | ✅ `durable-storage.test` | ✅ cierre a los 0,5 s, sin segundo plano | ⏳ |
| Migración de partidas de 4.9 | ✅ | ✅ `durable-storage.test` | ✅ APK 4.9.0 → 4.10.0 con partida a medias | ⏳ |
| Actualizar el APK sin quedarse con la versión vieja | ✅ | ✅ `bundle-android.test`, paridad | ✅ la 4.9 se retira sola en ~2 s | ⏳ |
| Margen residual de pérdida medido | ✅ instrumentado | ✅ `durable-storage.test` (tiempos) | ✅ se pierde si Android mata la app a ≤50 ms de guardar; se conserva a ≥100 ms (`docs/GUARDADO.md`). **No es infalible** | ⏳ preparado (`ventana-perdida.mjs` por USB) |
| Instalar encima sin desinstalar (misma firma) | ⚠️ falta el secreto `ANDROID_DEBUG_KEYSTORE_B64` | — | ✅ con firma de prueba | ⏳ |
| Exportar / importar | ✅ | ✅ `saves` | — | ⏳ |
| 50.º completo (9 escenas, 8 de Arena, final) | ✅ | ✅ integración 50.º | ✅ | ⏳ |
| 74.º y 75.º (fases genéricas y 4 capítulos de Arena) | ✅ | ✅ `campaigns` | ⏳ | ⏳ |
| Presidencia | ✅ | ✅ `presidency` | solo navegación | ⏳ |
| «¿Y si…?» | ✅ | ✅ `saves` | ⏳ | ⏳ |
| Música original (OGG) | ⏸️ el archivo va en el APK; nada lo reproduce. La dirección musical es de ChatGPT | — | — | — |
| Narrativa del paquete v1 (74.º en 11 escenas, Gira, Rebelión) | ⏳ esperando textos y autorización de fase 2 | — | — | — |

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
| APK Android 4.10.1 (CI) | ✅ GitHub Actions, ejecución 45997548463: 17 suites en verde, APK 4.10.1 / 41001, emulador 22 de 22 comprobaciones más 2 avisos (incluida la actualización desde 4.9.0) y medición del margen de pérdida |
| APK Android 4.10 (CI) | ✅ GitHub Actions, ejecución 45994235588: 17 suites en verde, APK 4.10.0 / 41000, prueba en emulador: 22 de 22 comprobaciones más 2 avisos informativos (incluida la actualización desde 4.9.0) |
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
- [x] Guardado en Android: el WebView escribía `localStorage` con segundos de retraso y se perdía lo último si Android mataba la app. Resuelto en 4.10 con copia nativa (`docs/GUARDADO.md`). Queda una ventana de milisegundos (puente asíncrono de Capacitor).
- [ ] Firma estable del APK: crear el secreto `ANDROID_DEBUG_KEYSTORE_B64` (lo tiene que hacer la dueña del repositorio, guía en `La_Cosecha_Juego_Android/docs/FIRMA_APK.md`). Sin él, cada APK del CI tiene otra firma y no se instala encima del anterior.
- [ ] El OGG original se conserva en el proyecto y en el APK, pero ningún módulo activo lo reproduce (`js/music.js` está fuera del bundle). No se activa ni se elimina: lo decide la dirección musical (ChatGPT).
- [ ] Margen residual del guardado: unas décimas de segundo medidas en el emulador (`docs/GUARDADO.md`). Para estrecharlo haría falta un plugin nativo con `commit()`; necesita autorización.
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
