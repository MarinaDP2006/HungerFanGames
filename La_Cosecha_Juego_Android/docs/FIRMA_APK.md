# Firma del APK de depuración

## El problema
Android solo deja instalar una versión nueva **encima** de la anterior si las dos están firmadas con la misma clave. Si la firma cambia:
- hay que desinstalar la versión anterior;
- **al desinstalar se borran las partidas** de las dos copias, la del WebView y la nativa.

GitHub Actions crea una clave de depuración nueva en cada ejecución. Por eso cada APK del CI lleva una firma distinta. El emulador lo detectó al instalar 4.10.0 encima de 4.9.0: `INSTALL_FAILED_UPDATE_INCOMPATIBLE`.

## La solución: una clave estable guardada como secreto del repositorio
El workflow ya está preparado. Si existe el secreto `ANDROID_DEBUG_KEYSTORE_B64`, firma siempre con esa clave; si no, avisa en el CI.

Pasos (una sola vez; lo tiene que hacer la dueña del repositorio):
1. Crea la clave. Necesitas Java, que trae `keytool`:
   ```bash
   keytool -genkeypair -keystore la-cosecha-debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Android Debug,O=Android,C=US"
   ```
   Contraseña y alias son los estándar de depuración de Android; Gradle los usa sin configurar nada.
2. Pásala a texto:
   - macOS/Linux: `base64 -i la-cosecha-debug.keystore | tr -d '\n'`
   - Windows (PowerShell): `[Convert]::ToBase64String([IO.File]::ReadAllBytes("la-cosecha-debug.keystore"))`
3. En GitHub, ve a **Settings → Secrets and variables → Actions → New repository secret**:
   - Name: `ANDROID_DEBUG_KEYSTORE_B64`
   - Secret: el texto del paso 2.
4. Guarda el archivo `.keystore` en un sitio seguro. **No lo subas al repositorio.**

A partir de la siguiente compilación, todos los APK se instalan encima del anterior sin perder partidas.

## Una vez, al pasar a la firma estable
Un APK instalado con la firma vieja (cualquiera de antes del secreto) no se puede actualizar al nuevo. Antes de desinstalarlo:
1. Exporta cada partida: cárgala y pulsa «Exportar JSON» (en Presidencia, «Exportar partida»).
2. Desinstala, instala el APK nuevo e importa las partidas.

## Publicación en Google Play
Es otra clave: la de **publicación**, que no es la de depuración. No hace falta hasta que se decida publicar.
