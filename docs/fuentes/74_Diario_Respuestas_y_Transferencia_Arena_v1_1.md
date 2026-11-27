# 74.º Juegos --- Diario narrativo, respuestas y transferencia a Arena

## Anexo creativo 1.1

**Estado:** complemento creativo para revisión. No sustituye ni modifica
las once escenas fuente v1.0.\
**Alcance:** respuestas inmediatas, diario, ecos narrativos y
transferencia de estado al módulo de Arena 74.º existente.

## 1. Reglas obligatorias

-   Conservar exactamente los IDs de escena y opción de la fuente 74
    v1.0.
-   Registrar cada elección una sola vez. Cargar una partida nunca
    vuelve a aplicar sus efectos.
-   Mostrar la respuesta inmediata después de elegir y antes de avanzar.
-   Crear una entrada de diario por decisión, con ID determinista:
    `74.diary.<scene_id>.<option_id>`.
-   Los ecos posteriores dependen de flags ya guardados. No repetir
    párrafos ni revelar información que Katniss desconoce.
-   Las opciones matizan relaciones, preparación e imagen pública; no
    eliminan hitos canónicos.
-   No añadir escenas, encuentros, turnos ni acontecimientos de Arena.
-   Mapear atributos al sistema existente. No crear un segundo sistema
    de habilidades o patrocinio.
-   La transferencia a Arena se aplica una sola vez, de forma
    transaccional e idempotente.

## 2. Contrato del diario

Cada registro contiene: `entry_id`, `campaign_id=campaign_74`,
`scene_id`, `option_id`, `text`, `timeline_id`, `route_type`,
`source_version=74-prearena-1.1`, `effects_applied` y `seen`.

`decision_id` recomendado: `campaign_74:<scene_id>:<option_id>:1`.

Si el `decision_id` ya existe, no volver a aplicar efectos ni crear otra
entrada. El diario conserva el historial aunque la interfaz marque una
entrada como vista.

## 3. Respuestas y entradas del diario

### 3.1 `74_reaping` --- La cosecha

**`74_reaping_o1` --- No apartarte de Prim** - Respuesta: «No voy a
dejar que atraviese esto sin verme a su lado. Si tiene miedo, al menos
sabrá que no está sola.» - Diario: «Cuando pronunciaron el nombre de
Prim, todo lo demás desapareció. Me mantuve pendiente de ella hasta el
instante en que di un paso al frente. No recuerdo haber pensado en las
consecuencias. Solo en impedir que se la llevaran.» - Eco en despedida,
si `prim_saw_katniss_protect`: «Prim todavía intenta entender por qué lo
hice. No tengo una explicación que pueda aliviarla.»

**`74_reaping_o2` --- Observar cada detalle** - Respuesta: «Mira las
salidas. Recuerda quién está en el escenario y cómo se desarrolla el
sorteo. No puedes permitirte perder el control.» - Diario: «Me obligué a
mirar la ceremonia como si observarla pudiera mantenerme a salvo. La
plaza, el escenario, los agentes, las papeletas. Nada cambió lo que
ocurrió, pero recordar los detalles era algo que todavía podía
controlar.» - Eco al llegar al Capitolio: reflexión breve sobre la
diferencia entre la plaza del Distrito 12 y los espacios vigilados.

**`74_reaping_o3` --- Buscar a Peeta entre la multitud** - Respuesta:
«Vi a Peeta entre la gente. Su nombre todavía no había sido pronunciado,
pero ya no pude dejar de pensar en él.» - Diario: «Después de ofrecerme
voluntaria, busqué rostros conocidos entre la multitud. Encontré a
Peeta. No hablamos. Aún no sabía qué significaría que su nombre saliera
del otro recipiente.» - Eco en el tren, si `first_recognition_peeta`:
«No era la primera vez que lo veía aquel día. Eso no significa que sepa
qué piensa.»

**Hito inalterable:** Prim es seleccionada, Katniss se ofrece voluntaria
y Peeta es seleccionado como tributo masculino.

### 3.2 `74_goodbyes` --- Lo que queda atrás

**`74_goodbyes_o1` --- Pedir a Gale que cuide de Prim y de tu madre** -
Respuesta: «No puedo pedirte que arregles todo. Solo que no las dejes
solas.» - Diario: «Le pedí a Gale que cuidara de Prim y de mi madre. No
era justo dejarle una responsabilidad así, pero era la única persona a
quien podía pedírselo sin explicar cada detalle.» - Eco en el
lanzamiento, si `gale_promise_explicit`: recuerdo de la promesa, sin
afirmar que Katniss sabe si se está cumpliendo.

**`74_goodbyes_o2` --- Pedir a tu madre que vuelva a cuidar de Prim** -
Respuesta: «Necesito que estés aquí para ella. No tienes que prometerme
nada más ahora.» - Diario: «Intenté que mi madre entendiera que Prim la
necesitaría. No podía resolver su miedo ni el mío. Solo podía pedirle
que permaneciera junto a mi hermana.» - Eco en el lanzamiento, si
`mother_responsibility_named`: recuerdo breve de la petición.

**`74_goodbyes_o3` --- Abrazar a Prim sin decir nada** - Respuesta: «No
encontré palabras que pudieran servirle. La abracé y traté de memorizar
aquel momento.» - Diario: «No dije nada. Cualquier promesa habría sonado
pequeña frente a lo que estaba ocurriendo. Me limité a abrazarla todo el
tiempo que me permitieron.» - Eco en el lanzamiento, si
`goodbye_without_words`: recuerdo silencioso.

### 3.3 `74_departure` --- El último umbral

**`74_departure_o1` --- Memorizar el camino y los rostros** - Respuesta:
«Guarda cada detalle. Los lugares y las personas pueden decirte más de
lo que dicen en voz alta.» - Diario: «Antes de subir al tren memoricé el
camino, las posiciones de los agentes y los rostros que pude reconocer.
No sabía si esos detalles servirían de algo, pero observar era mejor que
dejar que el miedo ocupara todo el espacio.» - Eco: inclinación
descriptiva a observar el entorno; no concede conocimiento automático
del mapa.

**`74_departure_o2` --- Controlar la respiración** - Respuesta:
«Inspira. Cuenta. Vuelve a hacerlo. No tienes que resolver el futuro en
este instante.» - Diario: «Me concentré en respirar mientras me
conducían a la estación. El miedo seguía allí, pero al menos podía
impedir que decidiera cada uno de mis movimientos.» - Eco: recuerdo de
autocontrol; no concede inmunidad al miedo ni bonificaciones ocultas.

**`74_departure_o3` --- Observar a Peeta sin hablar** - Respuesta: «Lo
vi a cierta distancia. Ninguno de los dos se acercó.» - Diario: «Peeta
caminaba acompañado por su escolta. Quise saber qué estaba pensando,
pero no tenía forma de preguntárselo. Seguimos caminos separados hacia
el mismo tren.» - Eco: familiaridad visual, sin asumir confianza.

### 3.4 `74_train` --- Un vagón hacia el Capitolio

**`74_train_o1` --- Exigir instrucciones concretas a Haymitch** -
Respuesta: «No necesito que me tranquilices. Necesito saber qué esperan
de nosotros y qué podemos hacer para seguir vivos.» - Diario: «Le pedí a
Haymitch respuestas prácticas. No sabía cuánto podía confiar en él, pero
era nuestro mentor y necesitaba entender qué podía enseñarnos antes de
llegar.» - Eco: Haymitch puede ofrecer explicaciones más directas; no se
crea una alianza automática.

**`74_train_o2` --- Preguntar a Peeta por su estrategia** - Respuesta:
«Quería saber cómo pensaba afrontar los Juegos. Su respuesta no resolvió
todas mis dudas, pero abrió una conversación.» - Diario: «Le pregunté a
Peeta por su estrategia. Hablar con él no borró el hecho de que ambos
éramos tributos del mismo distrito, pero me permitió conocer un poco
mejor cómo afrontaba la situación.» - Eco: referencia a esa conversación
durante el entrenamiento.

**`74_train_o3` --- Escuchar sin revelar tus habilidades** - Respuesta:
«Escucha primero. No tienes por qué entregar toda la información que
tienes.» - Diario: «Dejé que Haymitch y Peeta hablaran. No expliqué qué
sabía hacer ni qué pensaba intentar. Todavía no tenía motivos para
mostrar todas mis cartas.» - Eco: reflexión de entrenamiento más
reservada; no oculta habilidades ya conocidas por el sistema.

### 3.5 `74_arrival` --- La ciudad que mira

**`74_arrival_o1` --- Observar arquitectura y rutas** - Respuesta: «Las
fachadas, los accesos y los pasillos. Intenta recordar cómo está
organizado el lugar.» - Diario: «Al llegar al Capitolio presté atención
a la distribución del complejo. Todo parecía diseñado para impresionar y
controlar el movimiento de quienes entraban.» - Eco: descripción de
orientación; no concede rutas secretas ni ventajas de navegación.

**`74_arrival_o2` --- Permanecer cerca de Peeta** - Respuesta: «Su
presencia hacía que el lugar resultara un poco menos desconocido.» -
Diario: «Me mantuve cerca de Peeta mientras nos conducían por el
complejo. No sabía si aquello era confianza o simplemente la necesidad
de reconocer a alguien del Distrito 12.» - Eco: referencia de
familiaridad, sin alianza incondicional.

**`74_arrival_o3` --- Responder con cortesía breve** - Respuesta:
«Contesté lo necesario y no ofrecí más de lo que me habían
preguntado.» - Diario: «Decidí ser correcta sin mostrar demasiado. En el
Capitolio incluso una respuesta sencilla podía convertirse en parte de
la imagen que otros construyeran de mí.» - Eco: primera impresión más
reservada.

### 3.6 `74_prep` --- La imagen que fabrican

**`74_prep_o1` --- Confiar en la propuesta de Cinna** - Respuesta: «No
tienes que convertirte en otra persona. Si el público va a mirarte, al
menos que recuerde quién eres.» - Diario: «Cinna no me pidió que
fingiera ser alguien distinta. Su propuesta consistía en hacer visible
algo que ya formaba parte de mí. Decidí confiar en su criterio.» - Eco:
coordinación con Cinna durante el desfile.

**`74_prep_o2` --- Conservar una referencia visible al Distrito 12** -
Respuesta: «No quiero que el Capitolio borre de dónde vengo.» - Diario:
«Acepté la preparación, pero quise conservar una señal de mi
procedencia. No sabía cómo interpretaría el público aquel detalle; para
mí era importante no desaparecer dentro del espectáculo.» - Eco: el
diario conserva la intención. Solo se refleja en el atuendo si el diseño
aprobado lo permite; no altera por sí solo el atuendo canónico.

**`74_prep_o3` --- Aceptar el trabajo sin mostrar entusiasmo** -
Respuesta: «Deja que hagan su trabajo. No tienes que regalarles también
tus reacciones.» - Diario: «Permití que el equipo terminara la
preparación sin fingir entusiasmo. Podía colaborar sin olvidar que
aquello era una presentación organizada para el Capitolio.» - Eco:
descripción contenida antes del desfile.

### 3.7 `74_parade` --- Bajo las luces

**`74_parade_o1` --- Sostener la mirada del público** - Respuesta: «No
aparté la mirada. Durante unos segundos, decidí que no serían ellos
quienes me hicieran bajar la cabeza.» - Diario: «La avenida estaba llena
de voces y luces. Sostuve la mirada del público y sentí cómo cambiaba su
atención. No podía controlar lo que pensaban, pero sí cómo me presentaba
ante ellos.» - Eco: refuerza la descripción de reacción pública ya
contemplada por el juego.

**`74_parade_o2` --- Compartir el momento con Peeta** - Respuesta: «No
estábamos allí por las mismas razones, pero en aquel instante
compartimos el centro de todas las miradas.» - Diario: «Compartí el
momento con Peeta. El gesto nos presentó juntos ante el público y
convirtió a los dos tributos del Distrito 12 en una imagen que el
Capitolio podía recordar.» - Eco: imagen pública conjunta y contexto
para el sistema de patrocinadores existente.

**`74_parade_o3` --- Seguir las indicaciones de Cinna** - Respuesta:
«Confié en las indicaciones de Cinna y me concentré en mantener la
compostura.» - Diario: «Seguí las indicaciones de Cinna durante el
desfile. Él conocía el espectáculo mejor que yo. Mi tarea era sostener
la presentación sin perder de vista quién era.» - Eco: reconocimiento
del trabajo del equipo al terminar el desfile.

### 3.8 `74_training` --- Aprender delante de todos

**`74_training_o1` --- Practicar tiro con arco** - Respuesta: «El arco
era una habilidad que conocía. Practicar delante de todos significaba
decidir cuánto quería mostrar.» - Diario: «Elegí practicar tiro con
arco. La familiaridad con el arma me dio cierta seguridad, aunque sabía
que cada movimiento podía ser observado por otros tributos y por los
Vigilantes.» - Eco: referencia a la práctica y atributo de arco solo si
ya existe en el sistema.

**`74_training_o2` --- Practicar supervivencia y rastreo** - Respuesta:
«Quería concentrarme en lo que podía mantenerme viva fuera de una
pelea.» - Diario: «Dediqué la sesión a supervivencia y rastreo. En la
Arena no todo dependería de enfrentarse a alguien. Encontrar recursos y
leer el entorno también podía marcar la diferencia.» - Eco: atributo de
supervivencia solo si ya existe; no crear mecánica nueva.

**`74_training_o3` --- Observar estaciones y comportamientos** -
Respuesta: «Antes de decidir qué mostrar, preferí entender cómo se
movían los demás.» - Diario: «Observé las estaciones y los
comportamientos de los otros tributos. No inicié encuentros ni saqué
conclusiones definitivas. Solo intenté aprender cómo funcionaba aquel
espacio.» - Eco: inclinación de observación descriptiva; no revela
estadísticas privadas de otros tributos.

### 3.9 `74_private_session` --- La sala de los Vigilantes

**`74_private_o1` --- Demostrar precisión con el arco** - Respuesta:
«Elegí mostrar una habilidad que dominaba. El resultado sería de ellos,
pero la demostración era mía.» - Diario: «En la sesión privada utilicé
el arco para demostrar precisión. Los Vigilantes no reaccionaron como un
público normal. Anotaron el resultado y me dejaron sin saber qué habían
decidido.» - Eco: conserva el método de demostración. La puntuación
canónica extraordinariamente alta se mantiene.

**`74_private_o2` --- Combinar precisión y lectura táctica** -
Respuesta: «No bastaba con acertar. Quería demostrar que también sabía
evaluar una situación.» - Diario: «Combiné precisión y lectura táctica
durante la sesión. Intenté mostrar que podía tomar decisiones y no
limitarme a ejecutar un movimiento.» - Eco: modifica la descripción, no
el valor canónico de la puntuación.

**`74_private_o3` --- Mantener la calma y reservar capacidades** -
Respuesta: «Mostré lo suficiente para que entendieran que no era una
presa fácil, pero no todo lo que podía hacer.» - Diario: «Mantuve la
calma y reservé parte de mis capacidades. Los Vigilantes tendrían que
evaluar lo que habían visto. Yo no podía controlar su interpretación.» -
Eco: matiza el recuerdo. La puntuación sigue siendo extraordinariamente
alta en la ruta canónica.

### 3.10 `74_interview` --- Una historia ante millones

**`74_interview_o1` --- Responder con sinceridad contenida** -
Respuesta: «Contesté sin adornar demasiado mis palabras. No quería que
la entrevista hablara por mí.» - Diario: «Intenté responder con
sinceridad sin entregar más de lo que estaba dispuesta a contar. Cada
pregunta parecía sencilla hasta que recordaba cuántas personas estaban
escuchando.» - Eco: tono público `guarded`.

**`74_interview_o2` --- Mostrar calidez** - Respuesta: «Permití que el
público viera algo más que mi miedo y mi desconfianza.» - Diario:
«Mostré calidez durante la entrevista. No significaba que confiara en el
Capitolio, pero sí que podía decidir qué parte de mí quería presentar
ante la audiencia.» - Eco: puede reflejarse en el interés de
patrocinadores ya existente.

**`74_interview_o3` --- Responder con firmeza** - Respuesta: «No iba a
permitir que cada pregunta me colocara en el papel que otros habían
elegido.» - Diario: «Respondí con firmeza. Sabía que podían interpretar
mis palabras como desafío, pero preferí no fingir una docilidad que no
sentía.» - Eco: tono público `defiant`; no inicia una confrontación ni
una consecuencia política nueva.

### 3.11 `74_launch` --- El último ascensor

**`74_launch_o1` --- Repasar prioridades de supervivencia** - Respuesta:
«Piensa en lo esencial. Mantenerte viva es lo primero; todo lo demás
tendrá que esperar.» - Diario: «Mientras la plataforma se preparaba,
repasé mis prioridades de supervivencia. No podía anticipar todo lo que
encontraría, así que intenté concentrarme en las decisiones
inmediatas.» - Transferencia: `launch_plan=survival`.

**`74_launch_o2` --- Recordar la promesa a tu familia** - Respuesta:
«Primero pensé en Prim y en mi madre. La promesa que había dejado atrás
seguía conmigo.» - Diario: «Recordé a mi familia y las promesas que
había hecho. No sabía qué podría cumplir desde la Arena, pero necesitaba
conservar una razón para seguir adelante.» - Transferencia:
`launch_plan=family`. Si existe `gale_promise_explicit`, añadir una sola
frase sobre esa promesa.

**`74_launch_o3` --- Prepararte para observar el terreno** - Respuesta:
«Mira antes de moverte. El terreno puede decidir tanto como cualquier
adversario.» - Diario: «Me preparé para observar el terreno en cuanto la
plataforma terminara de elevarse. No sabía qué encontraría, pero quería
evitar actuar sin mirar.» - Transferencia: `launch_plan=observation`.

## 4. Transferencia al módulo de Arena existente

Al completar `74_launch`, crear una instantánea con: -
`campaign_id=campaign_74` - `campaign_content_version=74-prearena-1.1` -
`timeline_id` y `route_type` actuales - `prearena_complete=true` - las
once escenas completadas - valores actuales de `rel_katniss_prim`,
`rel_katniss_peeta`, `rel_katniss_haymitch` - `image_capitol`,
`sponsor_interest`, `interview_tone` - `training_focus`, atributos
existentes de arco/supervivencia/observación -
`private_session_result` - `launch_plan` - lista ordenada de
`decision_ids`, flags y `diary_entry_ids` - `transfer_applied`

Los nombres y tipos deben adaptarse al esquema real del juego. Los
marcadores de este documento nunca deben guardarse literalmente.

### Mapeo permitido

  -----------------------------------------------------------------------
  Dato                                Uso
  ----------------------------------- -----------------------------------
  `training_focus`                    Contexto descriptivo y preferencia
                                      inicial si ya existe

  Habilidades                         Atributos existentes únicamente

  `private_session_result`            Registro narrativo; no concede
                                      objetos

  `image_capitol`                     Perfil público inicial

  `sponsor_interest`                  Valor inicial del sistema de
                                      patrocinio existente, sujeto a sus
                                      límites

  Relaciones                          Contexto; no fuerza alianzas ni
                                      obediencia

  `launch_plan`                       Texto/prioridad narrativa; no crea
                                      turno

  Flags familiares                    Recuerdos del diario; no simulan
                                      mensajes desde la Arena
  -----------------------------------------------------------------------

### Integridad y reintentos

-   Usar `transfer_id=campaign_74:prearena:v1`.
-   Si ya se aplicó, devolver la instantánea existente sin sumar valores
    otra vez.
-   Guardar la instantánea antes de cambiar a Arena.
-   Si falla el guardado, no iniciar Arena con estado parcial.
-   Mantener `decision_ids` como fuente de verdad.
-   No convertir flags narrativos en ventajas numéricas.
-   No inventar objetos, recursos, posiciones, alianzas ni conocimiento
    del mapa.
-   El módulo de Arena conserva sus acontecimientos y orden. Este
    contrato solo entrega el estado inicial.

## 5. Aceptación

1.  Las once escenas conservan IDs y orden.
2.  Las 33 opciones muestran su respuesta y generan una entrada única.
3.  La entrada corresponde exactamente a la opción elegida.
4.  Recargar no duplica elecciones ni efectos.
5.  Los ecos dependen de flags y no se acumulan en párrafos repetidos.
6.  La ruta canónica conserva selección de Prim, voluntariado, selección
    de Peeta, desfile, puntuación alta, entrevista y lanzamiento.
7.  La puntuación de sesión privada sigue siendo extraordinariamente
    alta en las tres opciones.
8.  Las habilidades se mapean al sistema real; no se inventan atributos.
9.  La transferencia es idempotente y transaccional.
10. La última escena abre únicamente la Arena 74.º existente.
11. No se añaden escenas, turnos ni acontecimientos de Arena.
12. Las pruebas cubren las 33 opciones, persistencia, recarga, diario,
    transferencia y ruta canónica.

## 6. Pendientes de revisión creativa

-   Revisar la voz final en el contexto de la campaña completa.
-   Confirmar qué atributos de entrenamiento existen en el esquema
    actual.
-   Confirmar límites del sistema de patrocinio antes de asignar
    valores.
-   Revisar los ecos en pantalla para evitar redundancia con la
    narración principal.

**Instrucción para Claude:** este anexo complementa la fuente 1.0 y
permanece en revisión creativa. No activar la campaña como aprobada
hasta recibir confirmación expresa. Puede implementarse el contrato
técnico de forma compatible con el sistema de guardado autorizado, sin
alterar los textos fuente ni inventar contenido.
