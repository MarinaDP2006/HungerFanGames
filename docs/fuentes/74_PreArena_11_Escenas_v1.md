# LA COSECHA — PAQUETE DE PRODUCCIÓN NARRATIVA 74.º
## Precampaña completa · Versión creativa 1.0

**Alcance:** once escenas desde la cosecha hasta la entrada en la Arena.  
**Estado:** entrega creativa lista para revisión; no es implementación técnica.

## Reglas de continuidad
- Mantener el orden de las once escenas.
- En la ruta canónica: Prim es seleccionada; Katniss se ofrece voluntaria; Peeta es el tributo masculino; el desfile precede al entrenamiento; la sesión privada produce una puntuación excepcional; la entrevista precede a la entrada en la Arena.
- Las decisiones cambian relaciones, preparación, imagen pública, interés de patrocinadores y registros del diario. No alteran silenciosamente hitos canónicos.
- No añadir acontecimientos de Arena, encuentros inventados entre rivales ni consecuencias de muertes de tributos secundarios.
- Diálogos originales, sin reproducir diálogos de libros o películas.
- Cada opción debe persistir un efecto o flag. Los IDs son estables.

## Variables narrativas recomendadas
`rel_katniss_prim`, `rel_katniss_peeta`, `rel_katniss_haymitch`, `image_capitol`, `sponsor_interest`, `training_focus`, `private_session_result`, `interview_tone`, `district_memory`, `canon_route`.


---

## 74_reaping — La cosecha
**Lugar:** Plaza del Distrito 12.  
**Personajes:** Katniss, Prim, Effie, Haymitch, Peeta.  

La plaza está dividida por edades y por un silencio que nadie se atreve a romper. Katniss mantiene a Prim a la vista. Effie presenta el sorteo con una alegría teatral que contrasta con los rostros de las familias. Extrae el nombre de Primrose Everdeen. Por un instante, Katniss no oye nada más. Prim da un paso hacia el escenario. Katniss rompe la fila y grita que se ofrece voluntaria. La autoridad confirma el voluntariado. Después se extrae el nombre masculino: Peeta Mellark.

**Decisiones:**
- `74_reaping_o1` **No apartarte de Prim.** Efecto: `rel_katniss_prim +2; flag prim_saw_katniss_protect`.
- `74_reaping_o2` **Observar cada detalle de la ceremonia.** Efecto: `flag katniss_observed_ceremony`.
- `74_reaping_o3` **Buscar a Peeta entre la multitud.** Efecto: `rel_katniss_peeta +1; flag first_recognition_peeta`.

**Hito/continuidad:** Prim es seleccionada; Katniss se ofrece voluntaria; Peeta es seleccionado como tributo masculino.

---

## 74_goodbyes — Lo que queda atrás
**Lugar:** Sala de despedidas del Edificio de Justicia.  
**Personajes:** Katniss, Prim, madre de Katniss, Gale.  

La sala es demasiado limpia para una despedida. Prim se aferra a Katniss y le dice que no tenía que hacerlo. Katniss responde que sí. Le pide que cuide de su madre y que no se culpe. Su madre intenta hablar, pero el miedo la deja sin palabras. Gale llega con una promesa práctica: se ocupará de que la familia tenga comida y protección. Katniss entiende que no puede llevarse a su familia, solo las promesas que deja.

**Decisiones:**
- `74_goodbyes_o1` **Pedir a Gale que cuide de Prim y de tu madre.** Efecto: `flag gale_promise_explicit`.
- `74_goodbyes_o2` **Pedir a tu madre que vuelva a cuidar de Prim.** Efecto: `flag mother_responsibility_named`.
- `74_goodbyes_o3` **Abrazar a Prim sin decir nada.** Efecto: `rel_katniss_prim +2; flag goodbye_without_words`.

**Hito/continuidad:** Katniss se despide de su familia y de Gale antes del traslado.

---

## 74_departure — El último umbral
**Lugar:** Salida del Edificio de Justicia y estación.  
**Personajes:** Katniss, escolta, Peeta a distancia.  

La puerta se cierra detrás de Katniss. El aire exterior todavía huele a carbón. La escolta la conduce hacia el tren. Katniss mira una última vez los edificios que conoce. Ve a Peeta acompañado por otra escolta; no hablan. El trayecto convierte el Distrito 12 en algo que ya empieza a quedar atrás.

**Decisiones:**
- `74_departure_o1` **Memorizar el camino y los rostros.** Efecto: `training_focus = observation; flag departure_observant`.
- `74_departure_o2` **Controlar la respiración.** Efecto: `training_focus = balanced; flag departure_composure`.
- `74_departure_o3` **Observar a Peeta sin hablar.** Efecto: `rel_katniss_peeta +1; flag departure_noticed_peeta`.

**Hito/continuidad:** Salida del Distrito 12 y transición al tren.

---

## 74_train — Un vagón hacia el Capitolio
**Lugar:** Tren del Distrito 12 al Capitolio.  
**Personajes:** Katniss, Peeta, Haymitch, Effie.  

El tren avanza con una suavidad que no corresponde a lo que transporta. La comida sobre la mesa parece pertenecer a otra vida. Effie habla de horarios y de causar una buena impresión. Haymitch aparece con aspecto agotado y advierte que sobrevivir exigirá escuchar y aprender el juego que el Capitolio ha construido. Peeta intenta rebajar la tensión. Katniss no sabe si confiar en él.

**Decisiones:**
- `74_train_o1` **Exigir instrucciones concretas a Haymitch.** Efecto: `rel_katniss_haymitch +2; flag haymitch_practical_questions`.
- `74_train_o2` **Preguntar a Peeta por su estrategia.** Efecto: `rel_katniss_peeta +2; flag train_peeta_opening`.
- `74_train_o3` **Escuchar sin revelar tus habilidades.** Efecto: `training_focus = observation; flag katniss_keeps_advantage_private`.

**Hito/continuidad:** Haymitch asume la orientación de ambos tributos.

---

## 74_arrival — La ciudad que mira
**Lugar:** Estación y complejo de preparación del Capitolio.  
**Personajes:** Katniss, Peeta, Effie, Haymitch.  

El tren se detiene en una estación construida para recibir celebridades. Más allá de los ventanales se extienden fachadas pulidas, torres y vehículos silenciosos. Effie conduce a los tributos por el complejo. Katniss siente que la observan como si fuera material que puede moldearse. Haymitch permanece cerca, atento a las intenciones del equipo.

**Decisiones:**
- `74_arrival_o1` **Observar arquitectura y rutas.** Efecto: `training_focus = observation; flag capitol_layout_observed`.
- `74_arrival_o2` **Permanecer cerca de Peeta.** Efecto: `rel_katniss_peeta +1; flag arrival_stayed_near_peeta`.
- `74_arrival_o3` **Responder con cortesía breve.** Efecto: `flag arrival_guarded`.

**Hito/continuidad:** Llegada al Capitolio.

---

## 74_prep — La imagen que fabrican
**Lugar:** Centro de preparación y vestuario.  
**Personajes:** Katniss, equipo de preparación, Cinna, Peeta, Effie.  

El equipo de preparación trabaja con rapidez. Katniss soporta el proceso sin regalarles una reacción. Cinna es distinto: no propone borrar su origen, sino convertirlo en presencia. Le explica que no necesita parecer otra persona; necesita que el público la recuerde. Katniss no sabe si es una promesa o una estrategia, quizá ambas.

**Decisiones:**
- `74_prep_o1` **Confiar en la propuesta de Cinna.** Efecto: `image_capitol +2; sponsor_interest +1; flag cinna_trust`.
- `74_prep_o2` **Conservar una referencia visible al Distrito 12.** Efecto: `flag district_identity_visible`.
- `74_prep_o3` **Aceptar el trabajo sin mostrar entusiasmo.** Efecto: `image_capitol +1; flag prep_controlled`.

**Hito/continuidad:** Cinna prepara la presentación de Katniss para el desfile.

---

## 74_parade — Bajo las luces
**Lugar:** Avenida del desfile.  
**Personajes:** Katniss, Peeta, Cinna, tributos, público.  

La avenida está llena de luces, música y gritos. Los carros avanzan bajo balcones abarrotados. Katniss siente el calor del vestuario y miles de miradas. Cinna le recuerda que no necesita comprender al Capitolio para controlar unos segundos de su atención. Peeta está junto a ella. El gesto compartido de los tributos del Distrito 12 atrae la atención del público.

**Decisiones:**
- `74_parade_o1` **Sostener la mirada del público.** Efecto: `image_capitol +2; sponsor_interest +2; flag parade_confident`.
- `74_parade_o2` **Compartir el momento con Peeta.** Efecto: `rel_katniss_peeta +2; image_capitol +1; flag parade_pair_identity`.
- `74_parade_o3` **Seguir las indicaciones de Cinna.** Efecto: `flag parade_trust_team`.

**Hito/continuidad:** El desfile precede al entrenamiento y convierte al Distrito 12 en centro de atención.

---

## 74_training — Aprender delante de todos
**Lugar:** Centro de Entrenamiento.  
**Personajes:** Katniss, Peeta, Haymitch, tributos, entrenadores, Vigilantes.  

El Centro de Entrenamiento está dividido en estaciones. Katniss comprende que entrenar no consiste solo en mejorar: también debe decidir qué mostrar y qué reservar. Haymitch le aconseja que no convierta cada ejercicio en una demostración. Peeta se mueve entre las estaciones con facilidad social. Katniss observa a los tributos profesionales y estudia el espacio sin iniciar encuentros inventados.

**Decisiones:**
- `74_training_o1` **Practicar tiro con arco.** Efecto: `skill_archery +1; training_focus = archery; flag trained_archery`.
- `74_training_o2` **Practicar supervivencia y rastreo.** Efecto: `skill_survival +1; training_focus = survival; flag trained_survival`.
- `74_training_o3` **Observar estaciones y comportamientos.** Efecto: `skill_observation +1; training_focus = observation; flag training_observed_others`.

**Hito/continuidad:** El entrenamiento permite a los Vigilantes evaluar a los tributos.

---

## 74_private_session — La sala de los Vigilantes
**Lugar:** Sala de evaluación privada.  
**Personajes:** Katniss, Vigilantes.  

La sala parece más grande cuando no hay público. Los Vigilantes esperan detrás de una mesa. Katniss recibe un tiempo limitado para mostrar lo que sabe hacer. No hay aplausos, solo observadores que anotan. Comprende que su actuación será convertida en una cifra que la seguirá hasta la Arena.

**Decisiones:**
- `74_private_o1` **Demostrar precisión con el arco.** Efecto: `private_session_result = exceptional; flag private_archery_display`.
- `74_private_o2` **Combinar precisión y lectura táctica.** Efecto: `private_session_result = exceptional; flag private_tactical_display`.
- `74_private_o3` **Mantener la calma y reservar capacidades.** Efecto: `private_session_result = strong; flag private_controlled_display`.

**Hito/continuidad:** Katniss obtiene una puntuación extraordinariamente alta. La elección modifica la descripción de su actuación, no el hito canónico.

---

## 74_interview — Una historia ante millones
**Lugar:** Escenario de entrevistas.  
**Personajes:** Katniss, Caesar Flickerman, Peeta, Haymitch, público.  

Las luces convierten cada gesto en una declaración. Caesar recibe a Katniss con entusiasmo y formula preguntas aparentemente ligeras. Katniss sabe que cada respuesta puede convertirse en una etiqueta pública. No quiere ser una caricatura. Haymitch le ha explicado que la audiencia debe encontrar algo a lo que aferrarse.

**Decisiones:**
- `74_interview_o1` **Responder con sinceridad contenida.** Efecto: `interview_tone = guarded; image_capitol +1; flag interview_honest`.
- `74_interview_o2` **Mostrar calidez.** Efecto: `interview_tone = warm; sponsor_interest +2; flag interview_warm`.
- `74_interview_o3` **Responder con firmeza.** Efecto: `interview_tone = defiant; image_capitol +1; flag interview_defiant`.

**Hito/continuidad:** La entrevista precede a la entrada en la Arena y construye imagen pública.

---

## 74_launch — El último ascensor
**Lugar:** Sala de lanzamiento y plataforma.  
**Personajes:** Katniss, personal técnico, voz de control.  

La sala de lanzamiento está fría. El uniforme ya no parece un vestuario. Katniss ocupa su plataforma. La cuenta atrás comienza. No hay público visible ni música de desfile, solo instrucciones y el sonido mecánico del sistema. Piensa en Prim. Después mira al frente. La plataforma empieza a elevarse.

**Decisiones:**
- `74_launch_o1` **Repasar prioridades de supervivencia.** Efecto: `launch_plan = survival; flag launch_survival_focus`.
- `74_launch_o2` **Recordar la promesa a tu familia.** Efecto: `launch_plan = family; flag launch_family_focus`.
- `74_launch_o3` **Prepararte para observar el terreno.** Efecto: `launch_plan = observation; flag launch_observation_focus`.

**Hito/continuidad:** Katniss entra en la Arena. Transición al módulo de Arena del 74.º ya existente; no añadir acontecimientos nuevos.

---

## Diario de continuidad
Registrar voluntariado, despedidas, promesas, interacciones con Peeta y Haymitch, estrategia pública, entrenamiento elegido, resultado de sesión privada, tono de entrevista y prioridad de lanzamiento. Las entradas deben generarse desde flags y no duplicarse al cargar.

## Criterios de aceptación
1. Las once escenas existen y se recorren en el orden establecido.
2. Cada opción persiste sus efectos y se refleja en el diario o en una línea posterior.
3. Guardar y cargar en cualquier escena no duplica elecciones.
4. La ruta canónica conserva todos los hitos indicados.
5. No se crean acontecimientos nuevos de Arena.
6. La última escena transfiere el estado al módulo de Arena 74.º existente.
7. Las pruebas cubren el recorrido completo y las opciones de cada escena.
