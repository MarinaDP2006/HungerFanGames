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
| APK Android | ✅ Compila en GitHub Actions (ejecución 45729499528): 13 MB, `com.lacosecha.panem`, Android 6.0+ (SDK 23), compilado con SDK 35; contiene el mismo `app.js` que la web. ⏳ Falta probarlo instalado en un móvil |
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
- [ ] Instalar el APK en un móvil Android y probar los tres modos.
- [ ] El APK dice «versión 1.0»: pasar la versión del juego (4.8) a `versionName` en la compilación.
- [ ] Actualizar las acciones de GitHub a versiones con Node 24 (aviso de GitHub; ahora funcionan).

### Web
- [ ] Recorrer en navegador el modo Presidente con el equilibrio nuevo hasta el día 40.
- [ ] Probar en Safari/iOS y Firefox.
- [ ] Mapas de Arena propios para el 50.º (pradera) y el 75.º (reloj): ahora el 50.º reutiliza el bosque.
- [ ] Retratos propios para personajes canónicos (ahora se muestra el número de distrito).

### GitHub
- [ ] Crear un Release cuando el APK se haya probado en un móvil. **No se publica todavía.**

## Errores encontrados y corregidos
| Versión | Error | Estado |
|---|---|---|
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
