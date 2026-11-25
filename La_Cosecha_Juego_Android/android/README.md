# Aplicación Android

El proyecto web es una PWA instalable desde Chrome en Android (menú ⋮ → Instalar aplicación / Añadir a pantalla de inicio), siempre que se publique en HTTPS.

Para generar un APK Android reproducible se incluye `package.json`, `capacitor.config.json` y el workflow `.github/workflows/android-apk.yml`. Al subir el proyecto a GitHub, la acción **Build Android APK** genera `app-debug.apk` como artefacto descargable. También se puede ejecutar en un equipo con Node 22, JDK 21 y Android SDK:

```bash
npm install
npx cap add android
npx cap sync android
cd android
./gradlew assembleDebug
```

El entorno de preparación usado para este ZIP no dispone de Android SDK ni Gradle, por lo que no se ha podido compilar ni firmar un APK aquí. No se incluye un APK falso o vacío.
