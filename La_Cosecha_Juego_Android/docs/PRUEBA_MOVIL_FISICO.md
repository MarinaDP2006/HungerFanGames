# Validación en un móvil Android físico

La compatibilidad móvil **no está validada** hasta completar esta prueba en al menos un teléfono real. El emulador de CI no cubre:
- el tacto real;
- el texto ampliado con el dedo;
- el altavoz;
- el WebView actualizado del teléfono;
- el almacenamiento real ni el ahorro de batería del fabricante.

Apunta los resultados en `PLANTILLA_RESULTADOS_MOVIL.md`, que tiene una copia para rellenar.

## 0. Qué hace falta
- Un móvil con Android 6.0 o superior. Ideal, uno con Android 13–15 y otro más antiguo o de gama baja.
- Del último CI en verde («Build Android APK» en GitHub → Actions → la ejecución → *Artifacts*):
  - `La-Cosecha-Android-debug` → `app-debug.apk`, el APK normal.
  - `La-Cosecha-Android-prueba-actualizacion` → `app-debug-prueba-anterior.apk` (4.9.0) y `app-debug-prueba-nuevo.apk` (versión actual). Los dos llevan la misma firma de prueba: **solo sirven para la parte C**.
- Para la parte D (automática): un ordenador con [Node 22](https://nodejs.org) y las [Android platform-tools](https://developer.android.com/tools/releases/platform-tools) (`adb`), y un cable USB de datos.

Las partes A–C se hacen solo con el móvil. La D repite la prueba del emulador y mide el margen de pérdida en tu teléfono.

## A. Instalación limpia
1. Si tienes una versión anterior con partidas que quieras conservar, **expórtalas antes**: carga cada una y pulsa «Exportar JSON».
2. Desinstala la versión anterior. Hay que hacerlo porque las firmas no coinciden; ver `FIRMA_APK.md`.
3. Pasa `app-debug.apk` al móvil (por cable, Drive o correo) y ábrelo.
4. Si Android lo pide, permite «Instalar apps desconocidas» para la app desde la que lo abres.
5. Apunta en la plantilla:
   - el modelo y la versión de Android (Ajustes → Información del teléfono);
   - la versión de «Android System WebView» (Ajustes → Aplicaciones → Ver todas → menú ⋮ → Mostrar sistema).

## B. Prueba manual (unos 20 minutos)
| # | Área | Paso | Resultado esperado |
|---|---|---|---|
| B1 | Arranque | Abrir la app | El pie dice la versión del APK (p. ej. «Versión 4.10.1») |
| B2 | Navegación | Tocar Modo historia, Modo libre, Presidente y Códice, y volver con «LA COSECHA» arriba | Cada pantalla abre y vuelve al inicio |
| B3 | Navegación | Botón «Atrás» de Android en varias pantallas | Anota qué hace; no debe cerrar la app con una partida sin guardar |
| B4 | Ajustes | ⚙ → bajar el volumen, activar «Reducir movimiento», tamaño «Grande» | Se aplica al momento |
| B5 | Texto ampliado | Con «Grande» y luego «Muy grande», tocar botones en el inicio, Ajustes, una escena del 50.º y la Presidencia | Cada toque acierta el botón que se ve; nada queda tapado ni cortado |
| B6 | Sonido | Volumen multimedia alto → «Probar sonido» | Se oye. Repite con el volumen del juego al 0 % (no se oye) y con el sonido desactivado (el botón queda inactivo) |
| B7 | Guardado | Historia → 50.º → Empezar, jugar 3 escenas y esperar 2 segundos | Arriba pone «GUARDADO · RANURA 1» |
| B8 | Cierre forzado | Ajustes del móvil → Aplicaciones → La Cosecha → **Forzar detención** | — |
| B9 | Recuperación | Abrir → Cargar → Ranura 1 | Carga en la escena 4, con los ajustes de B4 |
| B10 | Cierre normal | Jugar 1 escena, ir al inicio del móvil y cerrar la app desde Recientes (deslizar) | Al abrir y cargar, está en la escena siguiente |
| B11 | Partida completa | Terminar el 50.º | 9 escenas, 8 acontecimientos de Arena y un final |
| B12 | Ranuras | Guardar en la ranura 2 desde Ajustes → Partidas; borrar la 1 | Pide confirmación; solo se borra la 1 |
| B13 | Exportar/importar | Exportar una partida, borrarla e importarla | Vuelve a aparecer |
| B14 | Pantalla | Girar a horizontal en una escena y en Ajustes | Se lee bien |
| B15 | Interrupción | Recibir una llamada o notificación en mitad de una escena | Al volver, la escena sigue igual |

## C. Actualización sin perder la partida
Sirve para comprobar la migración del guardado de 4.9 a la versión actual en tu móvil.
1. Desinstala La Cosecha (tras exportar lo que quieras conservar).
2. Instala `app-debug-prueba-anterior.apk`, la 4.9.0. Juega 4 escenas del 50.º y apunta el título de la escena en la que estás.
3. Pulsa el botón de inicio del móvil y espera 10 segundos. La 4.9 no tiene copia nativa y necesita ese tiempo.
4. Instala `app-debug-prueba-nuevo.apk` **encima, sin desinstalar**.
5. Abre la app y comprueba:
   - puede verse un momento la 4.9.0 y después se recarga sola con la versión nueva;
   - en Cargar → Ranura 1 aparece la escena que apuntaste.
6. Al acabar, desinstala y vuelve a la instalación limpia de la parte A. La firma de prueba no sirve para los APK normales.

## D. Prueba automática por USB (la misma del emulador)
1. En el móvil:
   - Ajustes → Información del teléfono → toca 7 veces «Número de compilación».
   - En Opciones de desarrollador, activa «Depuración USB».
2. Conecta el cable y acepta la huella del ordenador.
3. En la carpeta del repositorio (Windows: PowerShell; macOS/Linux: Terminal):
   ```bash
   adb devices                          # el móvil debe salir como «device»
   adb install -r app-debug.apk
   npm install --no-save playwright-core@1.49.1
   node La_Cosecha_Juego_Android/tests/device/android-e2e.mjs
   node La_Cosecha_Juego_Android/tests/device/ventana-perdida.mjs
   ```
4. Los resultados quedan en `device-report/`:
   - `informe.md`: la prueba completa (como en el emulador, con capturas y `logcat.txt`);
   - `ventana.md`: el margen de pérdida medido en tu móvil.
5. Envía esa carpeta para documentarlo.

⚠️ La parte D juega partidas y **borra las ranuras** de la app. Úsala con las partidas exportadas, o en un móvil donde no importen.

Además, las pulsaciones de la parte D no son de un dedo de verdad, así que no sustituye a B5.

## Qué cuenta como «validado en móvil físico»
- B1–B15 sin ❌ graves.
- C correcta.
- D: `informe.md` sin fallos.
- Todo en al menos un teléfono real, con modelo, versión de Android y del WebView apuntados.

Hasta entonces, la matriz de `PENDIENTES.md` sigue en ⏳.
