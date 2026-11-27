# Changelog

## 4.15 — Arena rediseñada y Mags según el canon
- **Arena:**
  - HUD fijo con día, arena, tributos vivos y barras de salud, hambre, sed y fatiga, que se ponen en rojo cuando hay peligro;
  - acciones en una rejilla de iconos (el botiquín se desactiva si no tienes uno);
  - postura en un control segmentado y armas en etiquetas;
  - los acontecimientos se destacan como tarjeta.
- **75.º · La niebla:** cargar con Mags ya no la salva, como en las películas. Cuesta salud, mejora la relación con los vencedores y Finnick lo recuerda en el epílogo. Pruebas nuevas en `tests/canon-75.test.mjs`.

## 4.14 — Revisión creativa del 74.º integrada (sigue en borrador)
- **Ecos del 74.º:** hay 31 con frase, que se importan literalmente del anexo 1.1 y de la revisión de ChatGPT del 27-11-2026 (`docs/paquetes/74_revision_chatgpt/`).
  - Son solo texto: no aplican efectos.
  - Tienen ID estable, se deduplican por ID y por grupo (la promesa a Gale se muestra una sola vez) y se calculan con funciones puras.
  - Nuevo `responseEchoes` para el eco que va tras una respuesta.
- **`74_private_o3`:** su resultado pasa a `exceptional` (pregunta 2 de la revisión). Los datos conservan el efecto original y el motivo del cambio.
- **Campos pendientes:** `dialogue`, `player_prompt` y `participant_ids` quedan en `null`; no se extraen de la prosa.
- **Informe técnico** `docs/REVISION_74_RESPUESTA_TECNICA.md`:
  - lugares y personajes contra los registros reales;
  - esquema de `support` y `sponsorTrust`;
  - `district_memory` y `canon_route`;
  - propuesta de `dialogue[]`.
- **Arena del 75.º:** la tabla de ocho acontecimientos queda fijada como aprobada y una prueba la contrasta con los títulos y turnos del código. Están verificados el orden de Wiress y la contradicción de Mags (pendiente de texto) y el comienzo se unifica en las plataformas de agua.
- El 74.º, la Gira y el 75.º siguen sin poder jugarse.

## 4.13 — 50.º retirado, Gira y 75.º en borrador
- **50.º Vasallaje retirado del juego activo** (decisión de dirección). Ya no aparece en el selector y el juego no deja empezarlo. Es reversible: se conservan su código, sus pruebas y la carga de partidas antiguas (`RETIRADAS` en `js/campanas/indice.js`). Edición por defecto: 74.º.
- **Canon:** continuidad de las películas; los libros son complementarios. El 10.º queda fuera.
- **Gira y 75.º:** las 25 escenas del documento narrativo v1.0 se importan con `scripts/importar-gira-75.mjs` a `js/campanas/campana-gira-75.js`, **en borrador y sin activar** (el juego no carga ese archivo).
  - Las escenas 75-07 a 75-15 no son escenas nuevas: se asignan a los 8 acontecimientos de Arena del 75.º que ya existen, con sus IDs técnicos.
  - Los efectos sin cifra quedan en `null`; no se inventa ningún valor.
  - Correspondencias y lista exacta de pendientes: `docs/GIRA_75_CORRESPONDENCIAS_Y_PENDIENTES.md`.
- **Pruebas en dispositivo:** el recorrido del emulador y la medición de la ventana de pérdida usan ahora una partida del 74.º. La actualización desde 4.9 sigue cargando una partida antigua del 50.º.

## 4.12 — Motor común de precampañas, registro de decisiones y guardado 5
- **Motor común de precampañas (fase 2, `js/precampana.js`)**, para el 74.º, la Gira y el 75.º (el 50.º sigue con su módulo aprobado). Funciona con datos y no tiene texto propio:
  - escenas, opciones, condiciones y efectos (`ADD`, `SET`, `SET_FLAG`…);
  - efectos transaccionales y diario;
  - traspaso del estado final a `game.continuity`.
- **Solo se juegan las campañas `APPROVED`.** Hoy no hay ninguna, así que el juego sigue igual para el jugador.
- **74.º:** sus datos (`js/campanas/campana-74.js`) se **generan** con `scripts/importar-campana-74.mjs`; una prueba exige que coincidan con las fuentes. Siguen en estado `DRAFT_FOR_REVIEW`. Contenido:
  - las 11 escenas de la fuente 1.0;
  - del anexo 1.1, las 33 respuestas inmediatas, los 33 diarios y los 2 ecos que traen su frase. Los otros 28 ecos solo están descritos y no se muestran.
- **Motor y anexo 1.1:**
  - la respuesta se muestra antes de avanzar;
  - una entrada de diario por decisión (`74.diary.<escena>.<opción>`), con el contrato del anexo;
  - IDs de decisión `campaign_74:<escena>:<opción>:1`;
  - **transferencia a la Arena** idempotente (`campaign_74:prearena:v1`), guardada antes de entrar: si no se puede guardar, no se entra.
  - Los valores numéricos de patrocinio e imagen pública **no se aplican** hasta que se confirmen los límites.
- **Revisión:** documento único para ChatGPT en `docs/REVISION_74_PARA_CHATGPT.md`, generado desde los datos.
- **Gira y 75.º:** solo están registradas sus escenas (`STRUCTURE_ONLY`), sin texto.
- **Guardado formato 5:**
  - registro de decisiones (`game.decisionLog`) con identificador por escena: una decisión ya registrada no vuelve a aplicar efectos (doble pulsación, carga o importación);
  - `game.timeline` con `timeline_id` y `route_type`;
  - las partidas de los formatos 1–4 se migran al leerlas, en una copia: si algo falla, se devuelve la original;
  - antes de sobrescribir una ranura antigua se guarda una copia de seguridad (`laCosechaSaveBackup:<n>`), también en la copia nativa;
  - las decisiones del 50.º ya tomadas se reconstruyen sin volver a aplicar efectos.
- **Retirados los enlaces externos** (YouTube y artículos de prensa) del modo Historia.

## 4.11 — Separación del Archivo de Panem y sistema de audio
- La Web ya no es una copia del videojuego: ahora es el Archivo de Panem, un producto aparte. Android es el único que lleva el motor del juego.
- Los datos de Panem salen de `compartido/data.js` (raíz del repositorio) y se copian a cada producto con `scripts/sincronizar-compartido.mjs`. El detector de contratos exige que sean idénticos.
- Sistema de audio por contextos (`js/audio.js`): menú, Historia por edición, Arena, finales, Libre, Presidencia, crisis y escenas especiales. **La música no está activada:** no hay pistas hasta que llegue la dirección musical. El OGG original se conserva sin conectar.
- Ajustes: «Silenciar todo», «Efectos», «Música» y «Ambiente», cada uno con su volumen. Se guardan con las demás preferencias (copia local y nativa); las preferencias anteriores se completan con valores por defecto.
- Catálogo de cues de la Entrega Maestra v1 registrado sin archivos: 12 de música, 9 de ambiente y 9 de efectos. La asignación de cues a contextos está vacía: la decide la dirección musical.
- Datos compartidos: IDs estables (`district_01`…, `katniss_everdeen`…) y campos `canon_status`/`source_ref` sin clasificar.
- La cabecera dice «EL VIDEOJUEGO DE PANEM» (antes «ARCHIVO DE PANEM», que ahora es el nombre de la Web).

## 4.10.1 — Medición del margen de pérdida
- El guardado mide cuánto tarda Android en confirmar cada escritura nativa (sin cambiar el formato ni las ranuras).
- Nueva medición en el emulador (`tests/device/ventana-perdida.mjs`): cierra la app a distintos milisegundos de guardar y comprueba qué se recupera. Resultados en `docs/GUARDADO.md`.
- Guía y plantilla para validar en un móvil físico.

## 4.10 — Guardado nativo en Android
- Las partidas y los ajustes se guardan también con el almacenamiento nativo de Android (`@capacitor/preferences`, SharedPreferences), además de en el WebView. Antes, si Android cerraba la app pocos segundos después de guardar, se podía perder lo último.
- Al arrancar se comparan las dos copias: las partidas de versiones anteriores se copian a la nativa (migración sin borrar nada), lo perdido en el WebView se recupera de la nativa y, si las dos difieren, gana la copia íntegra y, entre íntegras, la más reciente.
- Cada ranura lleva una huella (`checksum`) para detectar copias dañadas. Es un campo opcional: las partidas sin él se siguen cargando (`saveVersion` sigue en 4). Exportar e importar no cambian.
- Ranuras, exportación e importación sin cambios. En la Web no cambia nada (no hay Capacitor).
- Corregido: al actualizar el APK, el service worker de 4.9 seguía sirviendo la versión anterior desde su caché. Android ya no usa caché (los archivos van en el APK) y el nuevo `sw.js` retira el antiguo y recarga la app: en el emulador, de 4.9.0 a 4.10.0 en unos 2 segundos.
- APK: si existe el secreto `ANDROID_DEBUG_KEYSTORE_B64`, todas las compilaciones se firman con la misma clave y se pueden instalar encima sin perder partidas (`docs/FIRMA_APK.md`).
- CI: prueba de guardado duradero (12 casos) y, en el emulador, cierre forzado medio segundo después de guardar y actualización real desde el APK 4.9.0 con una partida a medias.

## 4.9 — Fase 1: base técnica (Android)
- Versión única: `package.json` es la fuente; la app muestra la versión en el pie y en Ajustes, el service worker usa `la-cosecha-android-<versión>` y el APK recibe `versionName`/`versionCode` (criterio en `docs/VERSIONADO.md`).
- APK limpio: `scripts/build-web.mjs` empaqueta solo lo que la app carga desde `index.html` y los recursos referenciados. Quedan fuera (se conservan en el repositorio) los módulos 5.2, `campaign-50th-dynamic.js`, `canon-50th.js`, `music.js`, el máster WAV y cinco imágenes sin uso.
- Ajustes: sonido, volumen, reducir movimiento, tamaño de texto y partidas guardadas (borrar con confirmación). Se guardan aparte de las partidas.
- Guardados: tres ranuras, formato con versión (`saveVersion` 4) y migración automática de la ranura única anterior, que no se borra.
- CSS: eliminada la regla muerta `.map-frame`, que referenciaba `menu-panem.png`. La imagen se conserva.
- Corregido: los botones de la cabecera (inicio y ⚙ Ajustes) no respondían; también en la Web.
- CI: cada suite es un paso propio (16 en total) y el workflow falla si falla cualquiera; se comprueba el contenido y la versión del APK.
- Prueba en emulador (`tests/device/android-e2e.mjs`, en CI): instala el APK en Android 14 y recorre navegación, ajustes, sonido, guardado, reinicio, carga y el 50.º completo. Deja informe y capturas.

## 4.8 — Presidencia, APK y pruebas
- Presidencia (`js/presidency.js`): cada orden muestra su efecto real (antes todas decían lo mismo), en verde, rojo o ámbar según convenga.
- Presidencia: 9 crisis con decisión obligatoria cada 3 días (sinsajo en los muros, huelga en el 8, hambre en el 11, Vigilante Jefe, señales del 13, vencedor incómodo, abusos en el 12, malestar en el Capitolio, refugiados). Ninguna se repite en un mandato.
- Presidencia: mandato de 40 días con barra de progreso y seis finales (el reformista, el puño de hierro, la prosperidad del Capitolio, el equilibrio, la paz negociada y la caída del régimen).
- Presidencia: equilibrio revisado con 1000 mandatos simulados. Antes se perdía en 8-16 días hiciera lo que hiciera el jugador, y el régimen «caía» con la rebelión a 0 solo porque el orden llegaba a 0.
- Presidencia: el indicador superior decía «SIN PARTIDA» durante el mandato; ahora dice «MANDATO ACTIVO».
- «¿Y si…?»: si modificas un escenario, la introducción ya no pierde su nombre («Con cambios en la alineación»).
- Android: corregido el fallo de GitHub Actions «Failed to find package 'tools'» de `android-actions/setup-android@v3` (se indican los paquetes del SDK 35). El APK vuelve a compilar (13 MB, Android 6.0+). El workflow ejecuta todas las pruebas, comprueba la paridad y verifica que el APK contiene el juego. Aún no se ha probado instalado en un móvil.
- Nuevas pruebas: `tests/presidency.mjs`, `tests/saves.mjs` (guardar, cargar, exportar, importar, archivos dañados, presidencia y «¿Y si…?») y `scripts/paridad.mjs` (Web y Android idénticos).

## 4.7 — modo «¿Y si…?»
- Nuevo panel «¿Y si…?» en el modo libre (`js/whatif.js`): parte de tributos originales o de la alineación del 74.º o del 75.º.
- Escenarios listos: Prim es cosechada, Katniss y Prim juntas, Gale en lugar de Peeta, Haymitch en lugar de Peeta en el 75.º, Annie en lugar de Mags y Peeta sin Katniss.
- Alineación editable: sustituir cualquier tributo por un personaje canónico o inventado, añadir tributos nuevos, quitar tributos y elegir con quién juegas.
- Corregido: la lista de tributos vivos solo mostraba 16; ahora salen todos, con aliados y tu distrito primero.
- Corregido: los personajes canónicos del modo libre intentaban cargar un retrato inexistente.
- La postura de combate se muestra en español.

## 4.6 — campañas completas y finales alternativos
- Nuevo `js/campaigns.js`: las tres campañas tienen ahora un capítulo en cada uno de los 8 días de Arena.
- 50.º: la Cornucopia del Vasallaje, el agua envenenada, el mensaje a cámara y los pájaros rosas.
- 74.º: el baño de sangre, el nido de rastrevíspulas, el cambio de reglas y el banquete (Thresh salda su deuda si ayudaste a Rue).
- 75.º: las plataformas de agua, la niebla y Mags, y los charlajos.
- El canon se cumple por defecto, pero se puede romper: Maysilee, Rue y Mags pueden sobrevivir si tus decisiones anteriores lo hacen posible.
- Finales compuestos a partir de todo lo que has decidido: título propio, epílogo con consecuencias y lista de tus decisiones.
- Corregido: el azar de la Arena podía matar a Rue, Peeta o Maysilee antes de su escena; ahora están protegidos hasta su momento.
- Pruebas: `tests/campaigns.mjs` juega las tres campañas completas por 9 caminos distintos, incluida la muerte del jugador.

## 4.5 — imágenes y pulido de la web
- Imágenes optimizadas en `assets/optimized/` (WebP + JPG de respaldo): la portada pasa de ~5,4 MB en PNG a ~170 KB.
- Nueva portada del Capitolio sin los botones dibujados dentro de la imagen, sin la figura del menú y sin el emblema de la saga en el estandarte; versión 2× más nítida.
- Retratos de tributos en WebP con carga diferida, texto alternativo y tamaños fijos (sin saltos de diseño).
- Tarjetas del inicio con imágenes distintas por modo (Arena, tributo, Capitolio) y ligero zoom al pasar el ratón.
- Nuevo icono original (gavilla de trigo) con variante *maskable* para Android e icono para iOS.
- Animación suave de la portada, foco visible para teclado y respeto a «reducir movimiento».
- Service worker v4-5: precarga las imágenes nuevas y ya no devuelve el HTML cuando falla una imagen.
- Corregido: el modo libre mostraba el texto y las decisiones del 75.º Vasallaje (Haymitch, vencedores).
- Corregido: errata «CORNucopia» en el mapa.
- Pruebas: regresión del modo libre y comprobación de que existen todos los recursos referenciados.
- No se ha borrado ninguna imagen original; `menu-panem.png` y los iconos antiguos se conservan aunque ya no se usan.

## 4.4
- Ampliación de eventos y relaciones de las campañas 50, 74 y 75.
- Sistema estratégico de guerra civil con frentes, mando, suministros, evacuación, negociación y ayuda humanitaria.
- Transición de la guerra a posguerra según el resultado de los frentes.

## 4.3 — combate, campañas y crisis nacional
- Sistema de lesiones tipificadas con gravedad, penalizaciones, fatiga, evolución y tratamiento con botiquín o reposo.
- Posturas de combate y selección de armas disponibles en inventario; resolución de enfrentamientos con rivales del mismo sector.
- Entrevistas televisadas con decisiones que afectan al apoyo público y a la confianza de patrocinadores.
- Acontecimientos ramificados para las campañas 50, 74 y 75, con decisiones sobre Maysilee, Rue, Finnick, la barrera de la Arena y el reloj.
- Decisiones de desenlace diferenciadas para las tres campañas.
- Simulación presidencial con evolución diaria de alimentos, estabilidad, moral, población, economía y recursos.
- Escalada de resistencia, levantamientos, guerra civil y fase de posguerra con opciones de reconstrucción, verdad y reconciliación.
- Nuevas políticas de distrito: infraestructura y racionamiento.
- Importación y exportación de partidas en JSON, con validación básica del archivo y renovación de caché PWA.

## 4.2 - Simulación táctica por sectores
- Arena dividida en doce sectores conectados, con terreno, riesgo y recursos definidos.
- Movimiento limitado a sectores contiguos y descubrimiento progresivo del mapa.
- Recursos por sector, agotamiento de puntos de recolección y amenazas activadas por Vigilantes.
- IA rival con desplazamiento sectorial, encuentros locales, alianzas y combate limitado a rivales presentes.
- Turnos de Arena unificados con hambre, sed, salud, amenazas y eliminaciones.

## 4.1 — revisión de sistemas
- Correcciones de coherencia canónica y selección de personajes.
- Nombres no identificados preservados como anónimos en las campañas.
- Aliados excluidos de objetivos de combate.
- Exportación de partidas JSON y registro presidencial de investigación del Distrito 13.
- Actualización de caché PWA.

## 4.0.0 — expansión de la experiencia
- Arena de bosque con ilustración panorámica original integrada como terreno visual.
- Marcadores tácticos seleccionables para tributos, con animación de pulso y leyenda.
- Movimiento autónomo básico de rivales y seguimiento de aliados en el mapa.
- Sucesos dinámicos de Arena y variación de frecuencia de eliminaciones según dificultad.
- Sistema de señales sonoras sintetizadas con Web Audio: interfaz, alerta, fanfarria abstracta y cañonazo. No contiene grabaciones de las películas.
- Animaciones de entrada, estados y botones; diseño adaptable a móvil.
- Se conserva el guardado local y la configuración PWA/Capacitor.

### Limitaciones conocidas (4.0.0)
- Es un juego web 2D de simulación narrativa, no un videojuego 3D de producción cinematográfica.
- La campaña de Haymitch necesita ampliar los nombres y biografías canónicas de los 48 tributos; no se inventan como si fueran oficiales.
- Las campañas 74 y 75 contienen personajes canónicos identificados, pero sus ramas narrativas aún no cubren todos los capítulos de las novelas.
- Los marcadores se dibujan sobre un mapa ilustrado; el terreno no es todavía un mapa navegable con colisiones ni pathfinding real.
- Las heridas son estados simplificados de juego, no un modelo médico exhaustivo.
- APK: se genera como artefacto de GitHub Actions al subir el repositorio y ejecutar el workflow. No se incluye un APK compilado en este ZIP.
