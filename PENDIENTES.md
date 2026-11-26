# Estado real (probado)
| Área | Estado |
|---|---|
| Web publicada en Render (`la-cosecha-web.onrender.com`) | ✅ Carga sin errores de JavaScript ni recursos rotos (Chrome, escritorio y móvil 390 px) |
| Inicio, modo historia y modo libre hasta la cosecha | ✅ Navegación probada en navegador |
| Guerra civil, eventos de campañas 50/74/75, modo libre | ✅ Cubiertos por `tests/smoke.mjs` |
| Campañas 50/74/75 completas (8 capítulos y finales alternativos) | ✅ `tests/campaigns.mjs` (9 recorridos) y jugadas de principio a fin en Chrome |
| Imágenes y recursos referenciados | ✅ Comprobados por las pruebas |
| APK Android | ⏳ Workflow corregido; pendiente de ver una ejecución verde en GitHub Actions |

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
- [ ] Modo libre: creación completa de tributos, arenas y reglas.
- [ ] Modo Presidente: Pacificadores, Capitolio y política con más profundidad.
- [ ] IA de tributos: alianzas, rivalidades, movimiento y combate.
- [ ] Heridas, hambre, sed y consecuencias persistentes: probar partidas largas.
- [ ] Guardado, carga, importación y exportación: prueba de ida y vuelta automatizada.
- [ ] Música original (ahora solo hay efectos sintetizados).
- [ ] Ver el APK compilado en Actions y probarlo en un móvil Android.

### Web
- [ ] Recorrer en navegador el modo Presidente y una partida completa hasta el final.
- [ ] Probar en Safari/iOS y Firefox.
- [ ] Mapas de Arena propios para el 50.º (pradera) y el 75.º (reloj): ahora el 50.º reutiliza el bosque.
- [ ] Retratos propios para personajes canónicos (ahora se muestra el número de distrito).

### GitHub
- [ ] Crear un Release cuando la versión esté probada de principio a fin.

## Errores encontrados y corregidos
| Versión | Error | Estado |
|---|---|---|
| 4.6 | El azar podía matar a Rue, Peeta o Maysilee antes de su escena | ✅ Corregido y con prueba |
| 4.5 | El modo libre mostraba el texto y las decisiones del 75.º Vasallaje | ✅ Corregido y con prueba |
| 4.5 | Errata «CORNucopia» en el mapa | ✅ Corregido |
| 4.5 | El service worker devolvía el HTML cuando fallaba una imagen | ✅ Corregido |
| 4.5 | La portada usaba una imagen con botones dibujados que no eran clicables | ✅ Sustituida por una versión limpia |
| 4.5 | Icono ilegible (era la captura del menú reducida) | ✅ Icono nuevo |
| 4.4→repo | `render.yaml` dentro de la subcarpeta (Render no lo leía) | ✅ Movido a la raíz |
| 4.4→repo | Workflow del APK en la subcarpeta, con caché npm sin lockfile y `cap add` bloqueado | ✅ Corregido |
| 4.4→repo | CHANGELOG desordenados y con cabeceras duplicadas | ✅ Corregido |
