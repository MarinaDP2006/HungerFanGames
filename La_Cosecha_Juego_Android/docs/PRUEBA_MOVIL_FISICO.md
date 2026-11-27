# Prueba en un móvil Android físico

La compatibilidad móvil **no está validada** hasta completar esta prueba en al menos un teléfono real. El emulador de CI no cubre:
- el tacto real;
- el texto ampliado con el dedo;
- el altavoz;
- el WebView actualizado del teléfono;
- el ahorro de batería del fabricante.

## Qué hace falta
- Un móvil con Android 6.0 o superior.
- El APK de depuración del último CI en verde: artefacto «La-Cosecha-Android-debug», archivo `app-debug.apk`.
- Opcional, para la prueba automática: un ordenador con Node 22 y las Android platform-tools (`adb`), y un cable USB.

## A. Instalación
1. Pasa `app-debug.apk` al móvil (por cable, Drive o correo).
2. Ábrelo. Si Android lo pide, permite «Instalar apps desconocidas» para esa app (Archivos, Chrome…).
3. Si había una versión anterior instalada, instala encima. Si Android dice que el paquete no es compatible (firma distinta), lee `FIRMA_APK.md` antes de desinstalar: desinstalar borra las partidas.

## B. Prueba manual (unos 15 minutos)
Apunta en cada casilla ✅ o ❌ y lo que veas raro.

| # | Paso | Resultado esperado |
|---|---|---|
| 1 | Abrir la app | El pie dice «Versión 4.10.0» |
| 2 | Tocar Modo historia, Modo libre, Presidente y Códice, volviendo con «LA COSECHA» arriba | Cada pantalla abre y se vuelve al inicio |
| 3 | ⚙ Ajustes: bajar el volumen, activar «Reducir movimiento», tamaño «Grande» | Se aplica al momento; el texto crece |
| 4 | Con el texto en «Grande» o «Muy grande», tocar botones de varias pantallas | Cada toque acierta el botón que se ve |
| 5 | «Probar sonido» con el volumen del móvil alto | Se oye |
| 6 | Historia → 50.º → Empezar, jugar 4 escenas | El indicador dice «GUARDADO · RANURA 1» |
| 7 | **Justo después de la 4.ª elección**, cerrar la app desde Recientes (deslizar) | — |
| 8 | Abrir de nuevo → Cargar → Ranura 1 | Sigue en la escena 5 y con los ajustes del paso 3 |
| 9 | Terminar el 50.º hasta el final | 9 escenas, 8 acontecimientos de Arena y un final |
| 10 | Ajustes → borrar la ranura 1 | Pide confirmación y la ranura queda vacía |
| 11 | Girar el móvil a horizontal en una escena | Se lee bien y nada queda tapado |
| 12 | Exportar una partida e importarla | Vuelve a aparecer |

Anota también:
- **Modelo y Android:** Ajustes → Información del teléfono.
- **Versión del WebView:** Ajustes → Aplicaciones → Android System WebView.

## C. Prueba automática por USB (la misma que el emulador de CI)
1. En el móvil, activa las Opciones de desarrollador: toca 7 veces «Número de compilación». Después activa «Depuración USB».
2. Conecta el cable y acepta la huella del ordenador.
3. En la carpeta del repositorio:
   ```bash
   adb devices                     # debe salir el móvil como «device»
   adb install -r app-debug.apk
   npm install --no-save playwright-core@1.49.1
   node La_Cosecha_Juego_Android/tests/device/android-e2e.mjs
   ```
4. El resultado queda en `device-report/`:
   - `informe.md`
   - `informe.json`
   - capturas y `logcat.txt`
5. Envía esa carpeta para documentarlo.

Aviso: la prueba automática juega una partida y al final **borra la ranura 1**. Úsala en un móvil sin partidas que quieras conservar, o exporta antes.
