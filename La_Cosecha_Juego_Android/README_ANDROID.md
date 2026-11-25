# La Cosecha · Proyecto de juego y Android

Este ZIP contiene la base del juego, los datos, recursos y el flujo de compilación Android.

## Generar APK con GitHub Actions
1. El workflow está en `.github/workflows/android-apk.yml`, en la raíz del repositorio `HungerFanGames`, y trabaja dentro de `La_Cosecha_Juego_Android/`.
2. En GitHub abre **Actions** y habilita los workflows si lo solicita.
3. Ejecuta `Build Android APK` manualmente, o haz push a `main` con cambios en esta carpeta.
4. Descarga el artefacto `La-Cosecha-Android-debug` cuando termine correctamente.

`www/` y `android/` se generan en la compilación y no se guardan en el repositorio (ver `.gitignore`).

## Compilación local
Requisitos: Node.js 22, JDK 21 y Android SDK configurado.

```bash
npm install
npm run build:web
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

El APK no está incluido: debe compilarse en GitHub Actions o en un equipo con Android SDK.

## Estado honesto del proyecto
La base incluye tres accesos de juego (Historia, Libre y Presidencia), simulación inicial, gestión de distritos, fichas, guardado local, efectos de sonido sintetizados y recursos gráficos originales. No es todavía un juego completo ni una adaptación exhaustiva: faltan capítulos narrativos completos y ramificados, mapas tácticos por sectores con pathfinding, IA avanzada, combate/heridas con profundidad, balance, pruebas de dispositivo y más arte/animación.

Las imágenes son ilustraciones generadas, no fotogramas ni fotografías de actores. No se incluyen bandas sonoras ni audios extraídos de las películas.

## Revisión 4.4
Consulta `docs/ESTADO_IMPLEMENTACION_4_4.md` para las novedades de campañas, guerra civil, validación y límites conocidos. El APK se genera mediante GitHub Actions; no se distribuye como archivo precompilado en este paquete.
