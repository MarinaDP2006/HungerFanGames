# Changelog

## Archivo de Panem 1.4 — Navegación inmersiva
- **Volver:**
  - cada página tiene un botón «← Volver» que retrocede en el historial si llegaste desde el Archivo y, si no, sube al nivel anterior;
  - la tecla Escape hace lo mismo.
- **Memoria de lectura:** al volver atrás, la página recupera la posición en la que estabas.
- **Transiciones suaves entre páginas:** con View Transitions si el navegador las tiene y, si no, con un fundido. Se respeta «reducir movimiento».
- **Barra de lectura** en lo alto y **cabecera que se compacta** al bajar.
- **Papel con grano** y tarjetas que reaccionan al pasar por encima.

## Archivo de Panem 1.3 — sin publicar
- **Solo la saga de Katniss:** fuera las ediciones 10.º y 50.º de Juegos, de la cronología y de los contadores.
- **Imágenes propias:** la carpeta `imagenes-propias/` tiene la lista de nombres en `LEEME.md`. Lo que subas aparece solo en su ficha:
  - retratos en las fichas y miniaturas de personajes;
  - bandas en distritos, Capitolio y ediciones;
  - imágenes en las tarjetas de lugares.

  Si falta alguna, no se ve nada roto.

## Archivo de Panem 1.2 — sin publicar (rama `integracion-cosecha-5x`)
- **Contenido completo, sin avisos de pendiente.** Textos originales del proyecto, basados en la continuidad de las películas (`js/archivo-contenido.js`):
  - expediente de los 13 distritos: territorio, vida cotidiana, símbolos y nombres destacados;
  - ficha del Capitolio y ampliación de las ediciones 10.º, 50.º, 74.º y 75.º;
  - 11 personajes nuevos (Prim, Gale, Effie, Cinna, Caesar, Snow, Seneca Crane, Plutarch, Coin, Mags y Boggs). El filtro de personajes incluye «El Capitolio»;
  - cronología completa, 14 lugares, Gira de la Victoria (5 etapas), Rebelión y Guerra (6 fases) y 5 documentos.
- **Etiquetas:** cada ficha indica su estado de canon (hecho de las películas, compatible o interpretación del proyecto) y su fuente.
- **Imágenes:** solo ilustraciones originales; no se usa ninguna de las películas.
- Service worker `archivo-panem-1.2.0`.

## Archivo de Panem 1.1 — sin publicar (rama `integracion-cosecha-5x`)
- **Menú definitivo:** Inicio, Distritos, Capitolio, Personajes, Juegos, Cronología, Gira de la Victoria, Rebelión y Guerra, Lugares, Galería, Documentos y Acerca. Sin Novedades.
- **Direcciones estables sin «#»:** `/distritos/12`, `/personajes/katniss-everdeen`, `/juegos/74`. Las antiguas `#/…` se convierten solas. Render ya sirve `index.html` en cualquier ruta.
- **Contenido movido, no inventado:**
  - el mapa esquemático pasa a Distritos;
  - la tabla de mentores y vencedores, a Personajes;
  - las arenas, a Lugares.
- **Páginas nuevas:**
  - Gira de la Victoria y Rebelión y Guerra, marcadas como pendientes de guion aprobado;
  - Acerca, con el aviso de proyecto fan y la leyenda de estados de canon.
- Pruebas: 14 de páginas y 69 comprobaciones en Chrome (incluidos el menú, el botón Atrás y la página no encontrada).

## Archivo de Panem 1.0 — sin publicar
- La Web deja de ser una copia del videojuego y pasa a ser el **Archivo de Panem**, un sitio editorial propio:
  - entrada, navegación, vistas y estilo nuevos;
  - secciones: portada, mapa (esquema), distritos y Capitolio, personajes con filtros, vencedores, ediciones, cronología, arenas, documentos, galería y novedades.
- Retirados de la Web el motor y las pantallas del juego (`js/app.js`, `campaigns.js`, `presidency.js`, `whatif.js`, `css/style.css`) y sus pruebas. Siguen en Android, que es el producto del juego; el historial de Git conserva las versiones web.
- Datos: `js/data.js` es una copia de `compartido/data.js`.
- Lo que no tiene contenido aprobado aparece como pendiente; no se ha escrito contenido nuevo.
- Cada ficha de distrito y de personaje muestra su estado de canon y su fuente. Hoy todas aparecen como «Sin clasificar» y «Pendiente de referencia»: los valores los aporta la dirección creativa.
- Pruebas propias: `tests/archivo.test.mjs` (10 casos) y `tests/navegador.mjs` (Chrome, móvil y escritorio).
- No se ha desplegado en Render.

## Sin publicar, anterior a la separación
- Corregido: los botones de la cabecera (inicio y ⚙ Ajustes) no respondían.

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
