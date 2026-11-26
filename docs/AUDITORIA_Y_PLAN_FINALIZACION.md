# La Cosecha · Auditoría integral y plan de finalización

Fecha: 26/11/2026 · Rama auditada: `integracion-cosecha-5x` en `ca77f4e` · `main` en `d52b655` (sin cambios).
Autor técnico: Claude. Este documento no contiene narrativa nueva: indica qué hay, qué funciona, qué falta y qué se necesita de ChatGPT.

**Leyenda de estado**
- ✅ **Funciona y está probado**: hay pruebas automáticas o se ha jugado en navegador o en el build.
- 🟡 **Parcial**: existe y funciona, pero es simplificado o le faltan partes previstas.
- 🔴 **No existe**: no hay código; como mucho, aparece mencionado en datos o documentos.
- ⚪ **Presente pero inactivo**: el archivo está en el repositorio, pero nada lo carga ni lo usa.

---

## 0. Estado general en una tabla

| Área | Estado | Comentario breve |
|---|---|---|
| 50.º Vasallaje | ✅ | Precampaña 5.1 (9 escenas) + 8 acontecimientos de Arena + adaptador 5.5 + finales. Falta probarlo en un móvil. |
| 74.º Juegos | 🟡 | Arena completa (8 acontecimientos, finales). La cosecha, el entrenamiento y la entrevista son genéricos, no son escenas propias. |
| Gira de la Victoria | 🔴 | No existe nada. |
| 75.º Vasallaje | 🟡 | Igual que el 74.º: Arena completa, fase previa genérica. |
| Rebelión (campaña) | 🔴 | Solo existe como indicador abstracto dentro del modo Presidente. |
| Guerra y caída del Capitolio (campaña) | 🔴 | Solo hay una simulación abstracta de guerra en el modo Presidente; no hay campaña jugable. |
| Modo historia | ✅ | 50.º, 74.º y 75.º se completan de principio a fin. |
| Modo libre | 🟡 | Configuración básica + editor «¿Y si…?». No hay creador completo de tributos, de arenas ni de reglas. |
| Simulación de Arena | 🟡 | Sectores, acciones y recursos funcionan. La IA de los tributos es solo una probabilidad de muerte. |
| Combate, heridas y recursos | 🟡 | Funcionan para el jugador. Los tributos controlados por el juego no combaten entre sí. |
| Alianzas | 🟡 | Solo las crean las campañas; no existe un sistema general. |
| Patrocinadores | 🟡 | Hay un valor de confianza y regalos en algunos acontecimientos; no es un sistema propio. |
| Entrenamiento | 🟡 | Cinco ejercicios genéricos. Solo en el 50.º se impide repetirlos. |
| Entrevistas | 🟡 | Tres respuestas genéricas con puntuación; solo el 50.º tiene una entrevista narrativa. |
| Desfile | 🟡 | Solo existe como escena del 50.º (5.1). |
| Guardado / carga / exportación / importación | ✅ | Probado, con migración de partidas del 50.º. Una sola ranura y sin número de versión del guardado. |
| Códice | 🟡 | 16 personajes con biografía, pero con las iniciales como retrato. Sin distritos ni ediciones. |
| Ajustes | 🔴 | Es un `alert()` que solo dice si el sonido está activado. |
| Accesibilidad | 🟡 | Foco visible, «reducir movimiento» y región `aria-live`. Sin auditoría con lector de pantalla. |
| Modo Presidente | ✅ | 40 días, 9 crisis, 6 finales, guerra y posguerra, con equilibrio simulado. La guerra casi nunca se alcanza. |
| Música | ⚪ | `music.js` y el OGG existen, pero no están conectados. |
| Web editorial | 🔴 | La Web actual es una copia del juego (`app.js` 4.8), sin páginas editoriales. |
| APK | ✅ / 🟡 | Compila en Actions desde la rama (13,5 MB, sin el WAV). No se ha probado en un dispositivo y dice «versión 1.0». |

---

## A. Campañas

### A1. 50.º Vasallaje (Haymitch)
1. **Implementado:**
   - Reparto de 48 tributos (cuatro por distrito) y Haymitch como jugador.
   - Precampaña 5.1 de 9 escenas, en una fase propia (`prearena50`), con los textos aprobados de la llegada y del desfile.
   - En la Arena, 8 acontecimientos: turnos 2, 3, 5 y 8 en `app.js`, y 1, 4, 6 y 7 en `campaigns.js`. El adaptador 5.5 varía los textos según el estado del jugador.
   - Finales compuestos según las decisiones (`composeEnding`) y protección de los personajes canónicos frente al azar.
2. **Funciona realmente:**
   - Las 9 escenas se juegan en orden y no se pueden saltar.
   - Se puede guardar en cualquier escena y continuar.
   - Las bonificaciones se aplican una sola vez y las partidas antiguas se migran.
   - La Arena llega al final; se ha jugado entera en Chrome, en móvil y en escritorio.
3. **Parcial:** el APK compila y contiene la campaña, pero **no se ha probado en un dispositivo**.
4. **Falta:** la música; la decisión sobre 5.2 (hoy es un módulo inactivo y no se debe integrar tal cual).
5. **Pruebas:**
   - `campaign-50th-integration.test.mjs` (13 casos), `campaign-50th-dynamic-adapter.test.mjs` (9) y `campaign-50th-prearena.mjs`.
   - Además, el recorrido del 50.º en `campaigns.mjs` y `bundle-android.test.mjs`.
6. **Dependencias:**
   - Código: `app.js`, `campaigns.js`, `campaign-50th-prearena.js`, `campaign-50th-dynamic-adapter.js` y `data.js`.
   - Guardado: `localStorage`.
7. **Necesita de ChatGPT:** nada obligatorio. Opcional: los retratos de Haymitch, Maysilee, Wyatt y Lou Lou, y la música de la campaña.

### A2. 74.º Juegos del Hambre (Katniss)
1. **Implementado:**
   - Una decisión de cosecha con 3 opciones; una de ellas activa `volunteeredForPrim`.
   - Entrenamiento y entrevista genéricos.
   - En la Arena, 8 acontecimientos: turnos 2, 3, 5, 6 y 8 en `app.js`, y 1, 4 y 7 en `campaigns.js`.
   - Variante en la que Rue sobrevive y finales («Los amantes trágicos», «Una vencedora obediente»…).
2. **Funciona realmente:** se completa de principio a fin; está probado por caminos canónicos y alternativos.
3. **Parcial:** todo lo previo a la Arena es genérico. No hay escenas propias de la cosecha (Prim), el tren, el desfile, la puntuación de los Vigilantes ni la entrevista con la confesión de Peeta.
4. **Falta:** una precampaña narrativa equivalente a la 5.1 del 50.º y la continuidad hacia la Gira de la Victoria.
5. **Pruebas:** `campaigns.mjs` (caminos canónico, Rue viva, victoria en solitario y muerte del jugador) y `smoke.mjs`.
6. **Dependencias:** `app.js` y `campaigns.js`. Reutilizaría el motor de precampaña que se propone en la fase 2.
7. **Necesita de ChatGPT:** el paquete narrativo de la precampaña del 74.º (escenas, opciones, efectos e indicadores) en el mismo formato que la 5.1.

### A3. Gira de la Victoria
1–3. **Implementado, funciona o parcial:** nada. No hay ninguna referencia en el código.
4. **Falta:** todo. Habría que decidir si es una fase entre el 74.º y el 75.º o una campaña propia.
5. **Pruebas:** ninguna.
6. **Dependencias:** los indicadores del final del 74.º (`composeEnding`) para heredar decisiones, y el motor de precampaña de la fase 2.
7. **Necesita de ChatGPT:** la estructura (cuántas paradas o escenas y en qué orden), los textos, las decisiones, cómo hereda lo hecho en el 74.º y qué deja preparado para el 75.º.

### A4. 75.º Vasallaje (vencedores)
1. **Implementado:**
   - Una decisión de cosecha (una opción activa `secretRebelContact`).
   - Entrenamiento y entrevista genéricos.
   - En la Arena, 8 acontecimientos: turnos 2, 3, 5, 6 y 8 en `app.js`, y 1, 4 y 7 en `campaigns.js`, con la niebla, Mags y los charlajos. Finales («La Arena se rompe»…).
2. **Funciona realmente:** se completa; está probado.
3. **Parcial:** todo lo previo a la Arena es genérico (anuncio del Vasallaje, cosecha de vencedores, entrevistas y alianzas previas).
4. **Falta:** la precampaña narrativa, heredar lo ocurrido en el 74.º y la Gira, y un mapa propio de la Arena del reloj (hoy se usa la imagen del bosque).
5. **Pruebas:** `campaigns.mjs` (canónico, Mags viva) y `smoke.mjs`.
6. **Dependencias:** `app.js`, `campaigns.js` y el motor de precampaña.
7. **Necesita de ChatGPT:** el paquete narrativo de la precampaña del 75.º y el diseño del mapa del reloj.

### A5. Rebelión (campaña)
1. **Implementado:** solo como indicador (`rebellion`) y como arco del modo Presidente (`rebellionArc`: control, levantamiento, guerra civil, posguerra).
2. **Funciona realmente:** dentro del modo Presidente, sí (está probado y simulado).
3. **Parcial:** no existe como campaña jugable del lado rebelde.
4. **Falta:** la campaña completa, con su protagonista, sus capítulos y sus decisiones.
5. **Pruebas:** solo las del modo Presidente (`presidency.mjs`).
6. **Dependencias:** podría reutilizar la simulación de guerra del modo Presidente (`initWarCampaign`, `warRound`) como motor.
7. **Necesita de ChatGPT:** el planteamiento completo: desde qué punto de vista se juega, en cuántos capítulos y cómo se conecta con el final del 75.º.

### A6. Guerra y caída del Capitolio (campaña)
1. **Implementado:** la guerra civil abstracta del modo Presidente (frentes por distrito, impulso rebelde, integridad del Capitolio y posguerra).
2. **Funciona realmente:** en el modo Presidente, sí, pero con el equilibrio actual casi nunca se llega a ella jugando normalmente.
3. **Parcial:** es una simulación de gestión; no hay una campaña narrativa del asalto al Capitolio.
4. **Falta:** la campaña, sus escenas, su mapa y sus finales.
5. **Pruebas:** solo los finales de presidencia que dependen de la guerra.
6. **Dependencias:** la campaña de Rebelión y el motor de guerra.
7. **Necesita de ChatGPT:** el paquete narrativo, el diseño del mapa del Capitolio y los finales.

---

## B. Sistemas

| Sistema | Implementado | Funciona realmente | Parcial / falta | Pruebas | Necesita de ChatGPT |
|---|---|---|---|---|---|
| **Modo historia** | Selector de campaña (50.º, 74.º, 75.º), fases y finales | ✅ Las tres campañas se completan | Fases previas genéricas en el 74.º y el 75.º | `campaigns.mjs`, integración del 50.º | Paquetes de precampaña |
| **Modo libre** | Nombre, distrito, dificultad, una de 5 arenas, editor «¿Y si…?» (6 escenarios, añadir, sustituir, quitar, elegir jugador) | ✅ Probado y jugado | Falta un creador completo de tributos (atributos, aspecto, retrato), un editor de arenas y un editor de reglas (número de tributos, banquete, patrocinadores) | `saves.mjs` (bloques del «¿Y si…?») | Diseño de pantallas de los editores; escenarios «¿Y si…?» nuevos |
| **Creación de tributos** | Nombre y distrito; los canónicos tienen su distrito fijo | ✅ | Sin atributos ni retrato elegibles | `saves.mjs` | Diseño y retratos |
| **Simulación de Arena** | Mapa por sectores (descubrimiento, adyacencia), acciones (agua, comida, ocultarse, descansar, combatir), recursos, hambre, sed y fatiga, cañonazos | ✅ para el jugador | La IA de los tributos es una probabilidad de muerte por turno: no se mueven ni deciden. Un solo mapa (bosque) para todas las arenas | `smoke.mjs`, `campaigns.mjs` | Mapas e imágenes de cada arena |
| **Combate** | `resolveCombat` con postura y arma equipada | ✅ | No hay combate entre tributos del juego | Indirectas | — |
| **Heridas y curación** | `inflictInjury`, penalizaciones, `treatInjuries` | ✅ | Sin consecuencias persistentes fuera de la partida | Indirectas | — |
| **Alianzas** | `alliance:'player'` desde las campañas | ✅ en campañas | Sin sistema general (proponer, romper, confiar, traicionar) | Integración del 50.º | Reglas narrativas de alianza, si se quieren |
| **Patrocinadores** | `sponsorTrust`, regalos en acontecimientos concretos | 🟡 | Sin un sistema propio (paracaídas, coste, frecuencia) | — | Lista de regalos y textos |
| **Entrenamiento** | 5 ejercicios genéricos | ✅ | Sin puntuación de los Vigilantes; solo el 50.º evita repetir ejercicios | Integración del 50.º | Escenas por edición |
| **Entrevistas** | 3 respuestas genéricas con puntuación | ✅ | Sin entrevistas por edición (salvo el 50.º) | — | Textos por edición |
| **Guardado** | Una ranura en `localStorage`, exportación e importación JSON, migración del 50.º, validación de archivos | ✅ | Sin varias ranuras, sin número de versión del guardado y sin autoguardado fuera del 50.º | `saves.mjs` (9), integración del 50.º | — |
| **Códice** | 16 personajes con distrito, papel y biografía | ✅ | Retratos con iniciales; sin distritos, ediciones ni cronología | — | Biografías revisadas y retratos autorizados |
| **Ajustes** | `alert()` con el estado del sonido | 🔴 | Falta la pantalla: volumen, música, tamaño de texto, reducir movimiento, contraste, borrar partida | — | Diseño de la pantalla |
| **Accesibilidad** | Foco visible, `prefers-reduced-motion`, `aria-live`, `alt` en las imágenes nuevas | 🟡 | Sin prueba con lector de pantalla, sin textos alternativos en el mapa SVG y sin tamaño de letra ajustable | — | — |
| **Modo Presidente** | Órdenes con efectos visibles, 9 crisis, 40 días, 6 finales, guerra y posguerra | ✅ | La guerra civil apenas se alcanza | `presidency.mjs`, 1000 mandatos simulados | Más crisis y personajes (Plutarch, Coin, Paylor) |
| **Música y sonido** | Efectos sintetizados (`sound()`); `music.js` y el OGG presentes | ⚪ Música no conectada | Conectar la música, el volumen y la música por escena | — | Pistas originales y dónde suena cada una |

---

## C. Diseño

**Pantallas existentes:**
- Inicio.
- Configuración de historia y configuración libre (con el panel «¿Y si…?»).
- Cosecha, entrenamiento y entrevista (genéricas).
- Precampaña del 50.º.
- Arena: mapa SVG por sectores, lista de tributos, inventario, combate y acontecimiento narrativo.
- Final, con epílogo y diario de decisiones.
- Configuración y panel del Presidente, con crisis, fin de mandato, guerra y posguerra.
- Códice.
- Ajustes, que hoy es solo un aviso.

**Componentes reutilizables:**
- `shell` (cabecera y estructura), tarjetas (`card`), cuadro narrativo (`story-box`).
- Botones de decisión (`choice`, con tonos según el efecto), rejilla de estadísticas (`stat`), chips y paneles.
- Registro de acontecimientos y barra de mandato.

**Recursos gráficos:**
- Imágenes originales: `arena-bosque.png` y `menu-panem.png`.
- `assets/optimized/`: versiones WebP y JPG de la portada del Capitolio y de la Arena.
- 12 retratos originales de tributos y los iconos de la gavilla.
- Audio: un OGG ambiental y su máster WAV.

**Elementos provisionales o incoherentes:**
1. Los retratos de los personajes canónicos son iniciales.
2. Hay un solo mapa (el bosque) para todas las arenas, incluidos la pradera del 50.º y el reloj del 75.º.
3. Ajustes es un `alert()`.
4. El APK dice «versión 1.0»; el juego va por la 4.8.
5. **`menu-panem.png` sigue referenciado en el CSS** (regla `.map-frame`, que ya no usa ninguna pantalla). Esa imagen contiene una figura muy parecida a la protagonista de las películas y el emblema de la saga. Conviene quitar la regla muerta; la imagen se conserva sin uso.
6. `app.js` ocupa 87 KB y muchas funciones están escritas en una sola línea, lo que dificulta el mantenimiento.
7. Viajan en el APK sin usarse: `campaign-50th-arena.js` (5.2), `campaign-50th-dynamic.js`, `canon-50th.js` y `music.js`.

**Diseños que faltan (todos de ChatGPT):**
- Retratos de los personajes canónicos.
- Mapas de arena por edición.
- Pantalla de ajustes.
- Editores del modo libre.
- Pantallas de la Gira, la Rebelión y la Guerra.
- Toda la Web editorial.

---

## D. Web

1. **Implementado:** la Web es hoy una **copia del juego**. Su `app.js` es idéntico al de Android en la versión 4.8 de `main`, con su service worker y su caché propios.
2. **Funciona realmente:** el juego en el navegador (comprobado en Chrome, en escritorio y en móvil, sin errores) y el despliegue en Render, que hoy se lanza a mano porque el despliegue automático no funciona.
3. **Parcial:** solo el códice se parece a contenido editorial.
4. **Falta todo el producto editorial:**
   - Portada, distritos, personajes, Juegos y cronología, archivos y galería.
   - Rutas propias y página 404.
   - SEO por página.
5. **Pruebas:** las mismas del juego (`smoke`, `campaigns`, `presidency` y `saves`). No hay pruebas de navegación editorial.
6. **Dependencias:** `js/data.js` y las imágenes. Ambos son compartidos y están protegidos por `scripts/paridad.mjs`.
7. **Necesita de ChatGPT:**
   - El mapa del sitio, la dirección visual y los textos de cada página.
   - La selección de imágenes autorizadas para la galería.
   - La decisión de qué hacer con el juego en la Web: retirarlo o enlazarlo.

---

## 1. Lista de funcionalidades

**Terminadas y probadas:**
- Las campañas 50.º, 74.º y 75.º se completan de principio a fin.
- Precampaña del 50.º y adaptador 5.5.
- Editor «¿Y si…?».
- Guardado, carga, exportación, importación y migración.
- Modo Presidente.
- Paridad Web/Android por categorías.
- Build del APK en Actions.

**Pendientes (técnicas):**
- Ajustes reales, varias ranuras de guardado con versión y versión del APK.
- IA de los tributos y combate entre ellos.
- Sistema de alianzas y sistema de patrocinadores.
- Editores del modo libre.
- Música conectada.
- Accesibilidad completa.
- Limpieza de CSS muerto y de módulos inactivos en el APK.
- Modularizar `app.js`.

**Pendientes (necesitan contenido):**
- Precampañas del 74.º y el 75.º.
- Gira de la Victoria, Rebelión y Guerra y caída del Capitolio.
- Retratos, mapas, música y toda la Web editorial.

## 2. Contenido que falta integrar (por recibir de ChatGPT)

| Paquete | Formato recomendado (el mismo que la 5.1) | Prioridad |
|---|---|---|
| Precampaña del 74.º | Escenas con `id`, `phase`, `title`, `body` y opciones (`id`, `label`, `effects`, `flags`) | Alta |
| Precampaña del 75.º | Igual | Alta |
| Gira de la Victoria | Igual, más qué indicadores hereda del 74.º y cuáles entrega al 75.º | Media |
| Rebelión | Estructura de capítulos y punto de vista; después, las escenas | Media |
| Guerra y caída | Estructura, escenas y finales | Media |
| Crisis y personajes del Presidente | Formato de `presidency.js` (crisis con 3 opciones y efectos) | Baja |
| Escenarios «¿Y si…?» | Formato de `whatif.js` (base, sustituciones, jugador) | Baja |

## 3. Plan técnico por fases

Cada fase se entrega en commits separados en la rama de integración, con sus pruebas. Ninguna fase toca `main`, hace merge, publica Releases ni despliega en Render.

### Fase 1 · Base técnica (no depende de contenido; puede empezar ya)
| Tarea | Archivos | Criterio de aceptación |
|---|---|---|
| Versión del APK = versión del juego | `capacitor.config.json` o configuración de Gradle en el workflow, `package.json` | `aapt` muestra `versionName` 4.x |
| Pantalla de ajustes real (sonido, volumen, reducir movimiento, tamaño de texto, borrar partida), guardada en `localStorage` | `app.js`, `css/style.css` | Prueba de que se guarda y se aplica, y prueba manual en Chrome |
| Guardado versionado (`saveVersion`) y varias ranuras, con migración de la ranura única actual | `app.js` | `saves.mjs` ampliado: las partidas antiguas siguen cargando |
| Quitar la regla CSS muerta que referencia `menu-panem.png` (la imagen se conserva) | `css/style.css` (en los dos productos; está protegido por la paridad) | La paridad sigue en verde y no aparece ninguna petición a `menu-panem.png` |
| Excluir del APK los módulos inactivos (5.2, `dynamic`, `canon-50th`; `music.js` hasta conectarlo) sin borrarlos del repositorio | `scripts/build-web.mjs`, `bundle-android.test.mjs` | La prueba del bundle confirma que no están en `www/` |
| Probar el APK en un emulador o en un dispositivo | — | La partida del 50.º completa en Android |

### Fase 2 · Motor de precampaña genérico (no depende de contenido)
- **Tarea:** convertir el mecanismo de la 5.1 (escenas, opciones, efectos e indicadores con prefijo, aplicación única de las consecuencias, guardado y migración) en un motor genérico. Así el 74.º, la Gira y el 75.º solo tendrán que aportar datos.
- **Archivos:** un módulo nuevo `js/prearena-engine.js`. `campaign-50th-prearena.js` pasa a usarlo sin cambiar sus textos, sus identificadores ni sus efectos.
- **Criterio de aceptación:** las 13 pruebas de integración del 50.º y la prueba 5.1 siguen pasando sin cambios en sus comprobaciones, y un paquete de prueba no narrativo se recorre entero.

### Fase 3 · Precampañas del 74.º y del 75.º (depende de los paquetes de ChatGPT)
- **Tarea:** integrar cada paquete con el motor de la fase 2 y conectar sus indicadores con los acontecimientos de Arena que ya existen, cambiando solo textos y etiquetas, como en el 5.5.
- **Criterio de aceptación:** pruebas de integración equivalentes a las del 50.º; las campañas se completan y los finales no cambian si no se ha decidido otra cosa.

### Fase 4 · Sistemas de Arena (técnica; las reglas finas se validan con ChatGPT)
| Tarea | Criterio de aceptación |
|---|---|
| IA de tributos: movimiento por sectores, búsqueda de recursos, combate entre tributos, alianzas entre tributos del juego | Simulación de 1000 Arenas con tasas razonables y sin bloqueos; los personajes protegidos de las campañas siguen protegidos |
| Sistema de patrocinadores (confianza, coste, regalos) | Pruebas unitarias; los regalos de las campañas no cambian |
| Mapas por edición (cuando lleguen los diseños) | Cada edición carga su mapa; prueba de recursos |

### Fase 5 · Modo libre completo (necesita el diseño de las pantallas)
- **Tareas:** creador de tributos (atributos y retrato de la galería original), editor de arenas (sectores y peligros) y editor de reglas (número de tributos, banquete, patrocinadores, Vasallaje).
- **Criterio de aceptación:** guardar, cargar y exportar una configuración personalizada, y una partida completa con ella.

### Fase 6 · Gira de la Victoria, Rebelión y Guerra (dependen de los paquetes de ChatGPT)
- **Tareas:** integrarlas como campañas encadenadas que hereden indicadores (74.º → Gira → 75.º → Rebelión → Guerra), reutilizando el motor de precampaña y el motor de guerra del Presidente.
- **Criterio de aceptación:** cada campaña se completa por separado y en cadena; los guardados conservan lo heredado.

### Fase 7 · Audio y arte (dependen de los recursos de ChatGPT)
- **Tareas:** conectar `music.js` (volumen desde Ajustes, música por escena) y los retratos canónicos en el códice y en la Arena.
- **Criterio de aceptación:** pruebas de recursos (todos existen, sin másteres en el APK), música desactivable y retratos con `alt`.

### Fase 8 · Web editorial (depende del diseño y los textos de ChatGPT)
- **Tareas:** producto independiente con portada, distritos, personajes, Juegos y cronología, archivos y galería; rutas, 404, SEO, `robots`, `sitemap` y favicon. Usará `data.js` y las imágenes compartidas. **No incluirá el motor del juego.**
- **Criterio de aceptación:**
  - Pruebas de navegación en Chrome (escritorio y móvil) y de enlaces y recursos.
  - Ningún archivo del motor en la Web.
  - La paridad pasa con los módulos de juego fuera de la Web, cosa que ya permite la categoría «compartido si existe».

### Fase 9 · Calidad y preparación de la publicación (necesita autorización expresa para publicar)
- **Tareas:** auditoría de accesibilidad, rendimiento, pruebas en dispositivo, actualizar las acciones de GitHub a Node 24, `PENDIENTES.md` y `CHANGELOG.md`, y preparar la Release sin publicarla.

### Orden recomendado
Las fases 1 y 2 pueden empezar ya. La 4 puede avanzar en paralelo con reglas validadas. Las fases 3, 5, 6, 7 y 8 se activan cuando llegue el contenido o el diseño aprobado de cada una.

## 4. Dependencias y pruebas

- **Pruebas que existen hoy (todas en verde):**
  - Android:
    - `smoke`, `campaigns`, `presidency`, `saves`.
    - `campaign-50th-prearena`, `campaign-50th-arena`, `campaign-50th-dynamic` y `campaign-50th-dynamic-adapter`.
    - `campaign-50th-integration` y `bundle-android`.
  - Web: `smoke`, `campaigns`, `presidency`, `saves`.
  - Raíz: `paridad.mjs` y `paridad.test.mjs`.
- **Pruebas que faltan:** ajustes, ranuras de guardado, IA de Arena (simulación), patrocinadores, precampañas del 74.º y el 75.º, campañas encadenadas, navegación de la Web editorial, accesibilidad y prueba en dispositivo Android.
- **Dependencias técnicas:**
  - Las precampañas (fase 3) y las campañas encadenadas (fase 6) dependen del motor genérico (fase 2).
  - La Web editorial (fase 8) depende de que los módulos del juego salgan de la Web, cosa que la paridad ya admite.
  - La música (fase 7) depende de los Ajustes (fase 1).

## 5. Riesgos y bloqueos

1. **Monolito `app.js`:** 87 KB con funciones de una sola línea. Cada integración nueva aumenta el riesgo de romper algo. Mitigación: modularizar por pantallas, con las pruebas actuales como red, dentro de la fase 2.
2. **Sin pruebas en un dispositivo real:** el APK compila y su contenido está verificado, pero nunca se ha ejecutado en Android.
3. **Recursos protegidos:** `menu-panem.png` (figura parecida a la actriz y emblema de la saga) sigue en el repositorio y en una regla CSS muerta. No debe usarse.
4. **Render:** el despliegue automático no se activa al subir a GitHub; hay que reconectar el repositorio en el panel de Render.
5. **GitHub Actions:** aviso de que las acciones con Node 20 quedarán obsoletas.
6. **Equilibrio del Presidente:** la guerra civil apenas se alcanza; hay que revisarlo antes de construir sobre ella la campaña de la Guerra.
7. **Bloqueos de contenido:** las fases 3, 5, 6, 7 y 8 no pueden avanzar sin los paquetes y diseños de ChatGPT.
8. **Módulos rechazados en el repositorio** (5.2, 5.3/5.4 excluidos, `campaign-50th-dynamic.js`): no deben conectarse por error. La fase 1 los saca del APK y la paridad ya los tiene en una lista cerrada.
