# 74.º Juegos del Hambre · documento único de revisión

**Para:** ChatGPT (dirección creativa). **Aprueba:** la directora del proyecto.
**Estado:** `DRAFT_FOR_REVIEW`. Versión de contenido: `74-prearena-1.1`.
- Escenas: `docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md` (fuente 1.0).
- Respuestas, diario, ecos y transferencia: `docs/paquetes/74_anexo_1_1/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md` (anexo 1.1).

## Cómo usar este documento
- **Escenas, opciones y efectos:** copiados **literalmente** de la fuente 1.0. Las respuestas, los diarios y los ecos, **literalmente** del anexo 1.1. Claude no ha añadido ni cambiado una palabra; el documento se genera desde los datos del juego con `node scripts/documento-revision-74.mjs`.
- **Huecos [PENDIENTE · ChatGPT]:** lo que todavía no está escrito. Claude no los rellena.
- **Transferencia a la Arena:** implementada según el anexo (instantánea idempotente, guardada antes de la Arena). Los valores numéricos quedan **sin aplicar** hasta que se confirmen los límites (ver preguntas).
- **Para cerrar el bloque:**
  - rellenar los huecos;
  - responder las preguntas del final;
  - cambiar el estado a `APPROVED` (lo decide la directora).

  Con eso, Claude vuelve a generar los datos y el 74.º pasa a ser jugable.

## Resumen
| # | Escena | Opciones | Respuestas | Diario | Ecos con frase |
|---|---|---|---|---|---|
| 1 | `74_reaping` · La cosecha | 3 | 3 de 3 | 3 de 3 | 2 |
| 2 | `74_goodbyes` · Lo que queda atrás | 3 | 3 de 3 | 3 de 3 | 0 |
| 3 | `74_departure` · El último umbral | 3 | 3 de 3 | 3 de 3 | 0 |
| 4 | `74_train` · Un vagón hacia el Capitolio | 3 | 3 de 3 | 3 de 3 | 0 |
| 5 | `74_arrival` · La ciudad que mira | 3 | 3 de 3 | 3 de 3 | 0 |
| 6 | `74_prep` · La imagen que fabrican | 3 | 3 de 3 | 3 de 3 | 0 |
| 7 | `74_parade` · Bajo las luces | 3 | 3 de 3 | 3 de 3 | 0 |
| 8 | `74_training` · Aprender delante de todos | 3 | 3 de 3 | 3 de 3 | 0 |
| 9 | `74_private_session` · La sala de los Vigilantes | 3 | 3 de 3 | 3 de 3 | 0 |
| 10 | `74_interview` · Una historia ante millones | 3 | 3 de 3 | 3 de 3 | 0 |
| 11 | `74_launch` · El último ascensor | 3 | 3 de 3 | 3 de 3 | 0 |

---

## 1. `74_reaping` — La cosecha
| Campo | Valor |
|---|---|
| Lugar (fuente) | Plaza del Distrito 12. |
| `location_id` propuesto | `district_12_square` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Prim, Effie, Haymitch, Peeta. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Prim es seleccionada; Katniss se ofrece voluntaria; Peeta es seleccionado como tributo masculino. |
| Condiciones de entrada | Haber terminado la selección de campaña |
| Salida | `74_goodbyes` |

**Texto de la escena (fuente):**

> La plaza está dividida por edades y por un silencio que nadie se atreve a romper. Katniss mantiene a Prim a la vista. Effie presenta el sorteo con una alegría teatral que contrasta con los rostros de las familias. Extrae el nombre de Primrose Everdeen. Por un instante, Katniss no oye nada más. Prim da un paso hacia el escenario. Katniss rompe la fila y grita que se ofrece voluntaria. La autoridad confirma el voluntariado. Después se extrae el nombre masculino: Peeta Mellark.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_reaping_o1` — No apartarte de Prim.
- **Efecto (fuente):** `rel_katniss_prim +2; flag prim_saw_katniss_protect` → `rel.katniss_prim` +2; flag `prim_saw_katniss_protect`
- **Respuesta inmediata (anexo):** «No voy a dejar que atraviese esto sin verme a su lado. Si tiene miedo, al menos sabrá que no está sola.»
- **Diario** (`74.diary.74_reaping.74_reaping_o1`): «Cuando pronunciaron el nombre de Prim, todo lo demás desapareció. Me mantuve pendiente de ella hasta el instante en que di un paso al frente. No recuerdo haber pensado en las consecuencias. Solo en impedir que se la llevaran.»
- **Eco:** en `74_goodbyes` si `prim_saw_katniss_protect`: «Prim todavía intenta entender por qué lo hice. No tengo una explicación que pueda aliviarla.» (se muestra)
#### `74_reaping_o2` — Observar cada detalle de la ceremonia.
- **Efecto (fuente):** `flag katniss_observed_ceremony` → flag `katniss_observed_ceremony`
- **Respuesta inmediata (anexo):** «Mira las salidas. Recuerda quién está en el escenario y cómo se desarrolla el sorteo. No puedes permitirte perder el control.»
- **Diario** (`74.diary.74_reaping.74_reaping_o2`): «Me obligué a mirar la ceremonia como si observarla pudiera mantenerme a salvo. La plaza, el escenario, los agentes, las papeletas. Nada cambió lo que ocurrió, pero recordar los detalles era algo que todavía podía controlar.»
- **Eco:** al llegar al Capitolio: reflexión breve sobre la diferencia entre la plaza del Distrito 12 y los espacios vigilados. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_reaping_o3` — Buscar a Peeta entre la multitud.
- **Efecto (fuente):** `rel_katniss_peeta +1; flag first_recognition_peeta` → `rel.katniss_peeta` +1; flag `first_recognition_peeta`
- **Respuesta inmediata (anexo):** «Vi a Peeta entre la gente. Su nombre todavía no había sido pronunciado, pero ya no pude dejar de pensar en él.»
- **Diario** (`74.diary.74_reaping.74_reaping_o3`): «Después de ofrecerme voluntaria, busqué rostros conocidos entre la multitud. Encontré a Peeta. No hablamos. Aún no sabía qué significaría que su nombre saliera del otro recipiente.»
- **Eco:** en `74_train` si `first_recognition_peeta`: «No era la primera vez que lo veía aquel día. Eso no significa que sepa qué piensa.» (se muestra)

---

## 2. `74_goodbyes` — Lo que queda atrás
| Campo | Valor |
|---|---|
| Lugar (fuente) | Sala de despedidas del Edificio de Justicia. |
| `location_id` propuesto | `district_12_justice_building` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Prim, madre de Katniss, Gale. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Katniss se despide de su familia y de Gale antes del traslado. |
| Condiciones de entrada | Haber terminado `74_reaping` |
| Salida | `74_departure` |

**Texto de la escena (fuente):**

> La sala es demasiado limpia para una despedida. Prim se aferra a Katniss y le dice que no tenía que hacerlo. Katniss responde que sí. Le pide que cuide de su madre y que no se culpe. Su madre intenta hablar, pero el miedo la deja sin palabras. Gale llega con una promesa práctica: se ocupará de que la familia tenga comida y protección. Katniss entiende que no puede llevarse a su familia, solo las promesas que deja.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_goodbyes_o1` — Pedir a Gale que cuide de Prim y de tu madre.
- **Efecto (fuente):** `flag gale_promise_explicit` → flag `gale_promise_explicit`
- **Respuesta inmediata (anexo):** «No puedo pedirte que arregles todo. Solo que no las dejes solas.»
- **Diario** (`74.diary.74_goodbyes.74_goodbyes_o1`): «Le pedí a Gale que cuidara de Prim y de mi madre. No era justo dejarle una responsabilidad así, pero era la única persona a quien podía pedírselo sin explicar cada detalle.»
- **Eco:** en el lanzamiento, si `gale_promise_explicit`: recuerdo de la promesa, sin afirmar que Katniss sabe si se está cumpliendo. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_goodbyes_o2` — Pedir a tu madre que vuelva a cuidar de Prim.
- **Efecto (fuente):** `flag mother_responsibility_named` → flag `mother_responsibility_named`
- **Respuesta inmediata (anexo):** «Necesito que estés aquí para ella. No tienes que prometerme nada más ahora.»
- **Diario** (`74.diary.74_goodbyes.74_goodbyes_o2`): «Intenté que mi madre entendiera que Prim la necesitaría. No podía resolver su miedo ni el mío. Solo podía pedirle que permaneciera junto a mi hermana.»
- **Eco:** en el lanzamiento, si `mother_responsibility_named`: recuerdo breve de la petición. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_goodbyes_o3` — Abrazar a Prim sin decir nada.
- **Efecto (fuente):** `rel_katniss_prim +2; flag goodbye_without_words` → `rel.katniss_prim` +2; flag `goodbye_without_words`
- **Respuesta inmediata (anexo):** «No encontré palabras que pudieran servirle. La abracé y traté de memorizar aquel momento.»
- **Diario** (`74.diary.74_goodbyes.74_goodbyes_o3`): «No dije nada. Cualquier promesa habría sonado pequeña frente a lo que estaba ocurriendo. Me limité a abrazarla todo el tiempo que me permitieron.»
- **Eco:** en el lanzamiento, si `goodbye_without_words`: recuerdo silencioso. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 3. `74_departure` — El último umbral
| Campo | Valor |
|---|---|
| Lugar (fuente) | Salida del Edificio de Justicia y estación. |
| `location_id` propuesto | `district_12_station` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, escolta, Peeta a distancia. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Salida del Distrito 12 y transición al tren. |
| Condiciones de entrada | Haber terminado `74_goodbyes` |
| Salida | `74_train` |

**Texto de la escena (fuente):**

> La puerta se cierra detrás de Katniss. El aire exterior todavía huele a carbón. La escolta la conduce hacia el tren. Katniss mira una última vez los edificios que conoce. Ve a Peeta acompañado por otra escolta; no hablan. El trayecto convierte el Distrito 12 en algo que ya empieza a quedar atrás.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_departure_o1` — Memorizar el camino y los rostros.
- **Efecto (fuente):** `training_focus = observation; flag departure_observant` → `campaign.training_focus` = `observation`; flag `departure_observant`
- **Respuesta inmediata (anexo):** «Guarda cada detalle. Los lugares y las personas pueden decirte más de lo que dicen en voz alta.»
- **Diario** (`74.diary.74_departure.74_departure_o1`): «Antes de subir al tren memoricé el camino, las posiciones de los agentes y los rostros que pude reconocer. No sabía si esos detalles servirían de algo, pero observar era mejor que dejar que el miedo ocupara todo el espacio.»
- **Eco:** inclinación descriptiva a observar el entorno; no concede conocimiento automático del mapa. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_departure_o2` — Controlar la respiración.
- **Efecto (fuente):** `training_focus = balanced; flag departure_composure` → `campaign.training_focus` = `balanced`; flag `departure_composure`
- **Respuesta inmediata (anexo):** «Inspira. Cuenta. Vuelve a hacerlo. No tienes que resolver el futuro en este instante.»
- **Diario** (`74.diary.74_departure.74_departure_o2`): «Me concentré en respirar mientras me conducían a la estación. El miedo seguía allí, pero al menos podía impedir que decidiera cada uno de mis movimientos.»
- **Eco:** recuerdo de autocontrol; no concede inmunidad al miedo ni bonificaciones ocultas. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_departure_o3` — Observar a Peeta sin hablar.
- **Efecto (fuente):** `rel_katniss_peeta +1; flag departure_noticed_peeta` → `rel.katniss_peeta` +1; flag `departure_noticed_peeta`
- **Respuesta inmediata (anexo):** «Lo vi a cierta distancia. Ninguno de los dos se acercó.»
- **Diario** (`74.diary.74_departure.74_departure_o3`): «Peeta caminaba acompañado por su escolta. Quise saber qué estaba pensando, pero no tenía forma de preguntárselo. Seguimos caminos separados hacia el mismo tren.»
- **Eco:** familiaridad visual, sin asumir confianza. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 4. `74_train` — Un vagón hacia el Capitolio
| Campo | Valor |
|---|---|
| Lugar (fuente) | Tren del Distrito 12 al Capitolio. |
| `location_id` propuesto | `victory_train` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Peeta, Haymitch, Effie. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Haymitch asume la orientación de ambos tributos. |
| Condiciones de entrada | Haber terminado `74_departure` |
| Salida | `74_arrival` |

**Texto de la escena (fuente):**

> El tren avanza con una suavidad que no corresponde a lo que transporta. La comida sobre la mesa parece pertenecer a otra vida. Effie habla de horarios y de causar una buena impresión. Haymitch aparece con aspecto agotado y advierte que sobrevivir exigirá escuchar y aprender el juego que el Capitolio ha construido. Peeta intenta rebajar la tensión. Katniss no sabe si confiar en él.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_train_o1` — Exigir instrucciones concretas a Haymitch.
- **Efecto (fuente):** `rel_katniss_haymitch +2; flag haymitch_practical_questions` → `rel.katniss_haymitch` +2; flag `haymitch_practical_questions`
- **Respuesta inmediata (anexo):** «No necesito que me tranquilices. Necesito saber qué esperan de nosotros y qué podemos hacer para seguir vivos.»
- **Diario** (`74.diary.74_train.74_train_o1`): «Le pedí a Haymitch respuestas prácticas. No sabía cuánto podía confiar en él, pero era nuestro mentor y necesitaba entender qué podía enseñarnos antes de llegar.»
- **Eco:** Haymitch puede ofrecer explicaciones más directas; no se crea una alianza automática. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_train_o2` — Preguntar a Peeta por su estrategia.
- **Efecto (fuente):** `rel_katniss_peeta +2; flag train_peeta_opening` → `rel.katniss_peeta` +2; flag `train_peeta_opening`
- **Respuesta inmediata (anexo):** «Quería saber cómo pensaba afrontar los Juegos. Su respuesta no resolvió todas mis dudas, pero abrió una conversación.»
- **Diario** (`74.diary.74_train.74_train_o2`): «Le pregunté a Peeta por su estrategia. Hablar con él no borró el hecho de que ambos éramos tributos del mismo distrito, pero me permitió conocer un poco mejor cómo afrontaba la situación.»
- **Eco:** referencia a esa conversación durante el entrenamiento. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_train_o3` — Escuchar sin revelar tus habilidades.
- **Efecto (fuente):** `training_focus = observation; flag katniss_keeps_advantage_private` → `campaign.training_focus` = `observation`; flag `katniss_keeps_advantage_private`
- **Respuesta inmediata (anexo):** «Escucha primero. No tienes por qué entregar toda la información que tienes.»
- **Diario** (`74.diary.74_train.74_train_o3`): «Dejé que Haymitch y Peeta hablaran. No expliqué qué sabía hacer ni qué pensaba intentar. Todavía no tenía motivos para mostrar todas mis cartas.»
- **Eco:** reflexión de entrenamiento más reservada; no oculta habilidades ya conocidas por el sistema. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 5. `74_arrival` — La ciudad que mira
| Campo | Valor |
|---|---|
| Lugar (fuente) | Estación y complejo de preparación del Capitolio. |
| `location_id` propuesto | `capitol_station` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Peeta, Effie, Haymitch. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Llegada al Capitolio. |
| Condiciones de entrada | Haber terminado `74_train` |
| Salida | `74_prep` |

**Texto de la escena (fuente):**

> El tren se detiene en una estación construida para recibir celebridades. Más allá de los ventanales se extienden fachadas pulidas, torres y vehículos silenciosos. Effie conduce a los tributos por el complejo. Katniss siente que la observan como si fuera material que puede moldearse. Haymitch permanece cerca, atento a las intenciones del equipo.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_arrival_o1` — Observar arquitectura y rutas.
- **Efecto (fuente):** `training_focus = observation; flag capitol_layout_observed` → `campaign.training_focus` = `observation`; flag `capitol_layout_observed`
- **Respuesta inmediata (anexo):** «Las fachadas, los accesos y los pasillos. Intenta recordar cómo está organizado el lugar.»
- **Diario** (`74.diary.74_arrival.74_arrival_o1`): «Al llegar al Capitolio presté atención a la distribución del complejo. Todo parecía diseñado para impresionar y controlar el movimiento de quienes entraban.»
- **Eco:** descripción de orientación; no concede rutas secretas ni ventajas de navegación. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_arrival_o2` — Permanecer cerca de Peeta.
- **Efecto (fuente):** `rel_katniss_peeta +1; flag arrival_stayed_near_peeta` → `rel.katniss_peeta` +1; flag `arrival_stayed_near_peeta`
- **Respuesta inmediata (anexo):** «Su presencia hacía que el lugar resultara un poco menos desconocido.»
- **Diario** (`74.diary.74_arrival.74_arrival_o2`): «Me mantuve cerca de Peeta mientras nos conducían por el complejo. No sabía si aquello era confianza o simplemente la necesidad de reconocer a alguien del Distrito 12.»
- **Eco:** referencia de familiaridad, sin alianza incondicional. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_arrival_o3` — Responder con cortesía breve.
- **Efecto (fuente):** `flag arrival_guarded` → flag `arrival_guarded`
- **Respuesta inmediata (anexo):** «Contesté lo necesario y no ofrecí más de lo que me habían preguntado.»
- **Diario** (`74.diary.74_arrival.74_arrival_o3`): «Decidí ser correcta sin mostrar demasiado. En el Capitolio incluso una respuesta sencilla podía convertirse en parte de la imagen que otros construyeran de mí.»
- **Eco:** primera impresión más reservada. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 6. `74_prep` — La imagen que fabrican
| Campo | Valor |
|---|---|
| Lugar (fuente) | Centro de preparación y vestuario. |
| `location_id` propuesto | `capitol_prep_center` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, equipo de preparación, Cinna, Peeta, Effie. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Cinna prepara la presentación de Katniss para el desfile. |
| Condiciones de entrada | Haber terminado `74_arrival` |
| Salida | `74_parade` |

**Texto de la escena (fuente):**

> El equipo de preparación trabaja con rapidez. Katniss soporta el proceso sin regalarles una reacción. Cinna es distinto: no propone borrar su origen, sino convertirlo en presencia. Le explica que no necesita parecer otra persona; necesita que el público la recuerde. Katniss no sabe si es una promesa o una estrategia, quizá ambas.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_prep_o1` — Confiar en la propuesta de Cinna.
- **Efecto (fuente):** `image_capitol +2; sponsor_interest +1; flag cinna_trust` → `public.image_capitol` +2; `sponsor.interest` +1; flag `cinna_trust`
- **Respuesta inmediata (anexo):** «No tienes que convertirte en otra persona. Si el público va a mirarte, al menos que recuerde quién eres.»
- **Diario** (`74.diary.74_prep.74_prep_o1`): «Cinna no me pidió que fingiera ser alguien distinta. Su propuesta consistía en hacer visible algo que ya formaba parte de mí. Decidí confiar en su criterio.»
- **Eco:** coordinación con Cinna durante el desfile. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_prep_o2` — Conservar una referencia visible al Distrito 12.
- **Efecto (fuente):** `flag district_identity_visible` → flag `district_identity_visible`
- **Respuesta inmediata (anexo):** «No quiero que el Capitolio borre de dónde vengo.»
- **Diario** (`74.diary.74_prep.74_prep_o2`): «Acepté la preparación, pero quise conservar una señal de mi procedencia. No sabía cómo interpretaría el público aquel detalle; para mí era importante no desaparecer dentro del espectáculo.»
- **Eco:** el diario conserva la intención. Solo se refleja en el atuendo si el diseño aprobado lo permite; no altera por sí solo el atuendo canónico. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_prep_o3` — Aceptar el trabajo sin mostrar entusiasmo.
- **Efecto (fuente):** `image_capitol +1; flag prep_controlled` → `public.image_capitol` +1; flag `prep_controlled`
- **Respuesta inmediata (anexo):** «Deja que hagan su trabajo. No tienes que regalarles también tus reacciones.»
- **Diario** (`74.diary.74_prep.74_prep_o3`): «Permití que el equipo terminara la preparación sin fingir entusiasmo. Podía colaborar sin olvidar que aquello era una presentación organizada para el Capitolio.»
- **Eco:** descripción contenida antes del desfile. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 7. `74_parade` — Bajo las luces
| Campo | Valor |
|---|---|
| Lugar (fuente) | Avenida del desfile. |
| `location_id` propuesto | `capitol_parade_avenue` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Peeta, Cinna, tributos, público. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | El desfile precede al entrenamiento y convierte al Distrito 12 en centro de atención. |
| Condiciones de entrada | Haber terminado `74_prep` |
| Salida | `74_training` |

**Texto de la escena (fuente):**

> La avenida está llena de luces, música y gritos. Los carros avanzan bajo balcones abarrotados. Katniss siente el calor del vestuario y miles de miradas. Cinna le recuerda que no necesita comprender al Capitolio para controlar unos segundos de su atención. Peeta está junto a ella. El gesto compartido de los tributos del Distrito 12 atrae la atención del público.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_parade_o1` — Sostener la mirada del público.
- **Efecto (fuente):** `image_capitol +2; sponsor_interest +2; flag parade_confident` → `public.image_capitol` +2; `sponsor.interest` +2; flag `parade_confident`
- **Respuesta inmediata (anexo):** «No aparté la mirada. Durante unos segundos, decidí que no serían ellos quienes me hicieran bajar la cabeza.»
- **Diario** (`74.diary.74_parade.74_parade_o1`): «La avenida estaba llena de voces y luces. Sostuve la mirada del público y sentí cómo cambiaba su atención. No podía controlar lo que pensaban, pero sí cómo me presentaba ante ellos.»
- **Eco:** refuerza la descripción de reacción pública ya contemplada por el juego. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_parade_o2` — Compartir el momento con Peeta.
- **Efecto (fuente):** `rel_katniss_peeta +2; image_capitol +1; flag parade_pair_identity` → `rel.katniss_peeta` +2; `public.image_capitol` +1; flag `parade_pair_identity`
- **Respuesta inmediata (anexo):** «No estábamos allí por las mismas razones, pero en aquel instante compartimos el centro de todas las miradas.»
- **Diario** (`74.diary.74_parade.74_parade_o2`): «Compartí el momento con Peeta. El gesto nos presentó juntos ante el público y convirtió a los dos tributos del Distrito 12 en una imagen que el Capitolio podía recordar.»
- **Eco:** imagen pública conjunta y contexto para el sistema de patrocinadores existente. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_parade_o3` — Seguir las indicaciones de Cinna.
- **Efecto (fuente):** `flag parade_trust_team` → flag `parade_trust_team`
- **Respuesta inmediata (anexo):** «Confié en las indicaciones de Cinna y me concentré en mantener la compostura.»
- **Diario** (`74.diary.74_parade.74_parade_o3`): «Seguí las indicaciones de Cinna durante el desfile. Él conocía el espectáculo mejor que yo. Mi tarea era sostener la presentación sin perder de vista quién era.»
- **Eco:** reconocimiento del trabajo del equipo al terminar el desfile. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 8. `74_training` — Aprender delante de todos
| Campo | Valor |
|---|---|
| Lugar (fuente) | Centro de Entrenamiento. |
| `location_id` propuesto | `capitol_training_center` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Peeta, Haymitch, tributos, entrenadores, Vigilantes. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | El entrenamiento permite a los Vigilantes evaluar a los tributos. |
| Condiciones de entrada | Haber terminado `74_parade` |
| Salida | `74_private_session` |

**Texto de la escena (fuente):**

> El Centro de Entrenamiento está dividido en estaciones. Katniss comprende que entrenar no consiste solo en mejorar: también debe decidir qué mostrar y qué reservar. Haymitch le aconseja que no convierta cada ejercicio en una demostración. Peeta se mueve entre las estaciones con facilidad social. Katniss observa a los tributos profesionales y estudia el espacio sin iniciar encuentros inventados.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_training_o1` — Practicar tiro con arco.
- **Efecto (fuente):** `skill_archery +1; training_focus = archery; flag trained_archery` → `skill.archery` +1; `campaign.training_focus` = `archery`; flag `trained_archery`
- **Respuesta inmediata (anexo):** «El arco era una habilidad que conocía. Practicar delante de todos significaba decidir cuánto quería mostrar.»
- **Diario** (`74.diary.74_training.74_training_o1`): «Elegí practicar tiro con arco. La familiaridad con el arma me dio cierta seguridad, aunque sabía que cada movimiento podía ser observado por otros tributos y por los Vigilantes.»
- **Eco:** referencia a la práctica y atributo de arco solo si ya existe en el sistema. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_training_o2` — Practicar supervivencia y rastreo.
- **Efecto (fuente):** `skill_survival +1; training_focus = survival; flag trained_survival` → `skill.survival` +1; `campaign.training_focus` = `survival`; flag `trained_survival`
- **Respuesta inmediata (anexo):** «Quería concentrarme en lo que podía mantenerme viva fuera de una pelea.»
- **Diario** (`74.diary.74_training.74_training_o2`): «Dediqué la sesión a supervivencia y rastreo. En la Arena no todo dependería de enfrentarse a alguien. Encontrar recursos y leer el entorno también podía marcar la diferencia.»
- **Eco:** atributo de supervivencia solo si ya existe; no crear mecánica nueva. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_training_o3` — Observar estaciones y comportamientos.
- **Efecto (fuente):** `skill_observation +1; training_focus = observation; flag training_observed_others` → `skill.observation` +1; `campaign.training_focus` = `observation`; flag `training_observed_others`
- **Respuesta inmediata (anexo):** «Antes de decidir qué mostrar, preferí entender cómo se movían los demás.»
- **Diario** (`74.diary.74_training.74_training_o3`): «Observé las estaciones y los comportamientos de los otros tributos. No inicié encuentros ni saqué conclusiones definitivas. Solo intenté aprender cómo funcionaba aquel espacio.»
- **Eco:** inclinación de observación descriptiva; no revela estadísticas privadas de otros tributos. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 9. `74_private_session` — La sala de los Vigilantes
| Campo | Valor |
|---|---|
| Lugar (fuente) | Sala de evaluación privada. |
| `location_id` propuesto | `gamemakers_private_room` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Vigilantes. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Katniss obtiene una puntuación extraordinariamente alta. La elección modifica la descripción de su actuación, no el hito canónico. |
| Condiciones de entrada | Haber terminado `74_training` |
| Salida | `74_interview` |

**Texto de la escena (fuente):**

> La sala parece más grande cuando no hay público. Los Vigilantes esperan detrás de una mesa. Katniss recibe un tiempo limitado para mostrar lo que sabe hacer. No hay aplausos, solo observadores que anotan. Comprende que su actuación será convertida en una cifra que la seguirá hasta la Arena.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_private_o1` — Demostrar precisión con el arco.
- **Efecto (fuente):** `private_session_result = exceptional; flag private_archery_display` → `campaign.private_session_result` = `exceptional`; flag `private_archery_display`
- **Respuesta inmediata (anexo):** «Elegí mostrar una habilidad que dominaba. El resultado sería de ellos, pero la demostración era mía.»
- **Diario** (`74.diary.74_private_session.74_private_o1`): «En la sesión privada utilicé el arco para demostrar precisión. Los Vigilantes no reaccionaron como un público normal. Anotaron el resultado y me dejaron sin saber qué habían decidido.»
- **Eco:** conserva el método de demostración. La puntuación canónica extraordinariamente alta se mantiene. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_private_o2` — Combinar precisión y lectura táctica.
- **Efecto (fuente):** `private_session_result = exceptional; flag private_tactical_display` → `campaign.private_session_result` = `exceptional`; flag `private_tactical_display`
- **Respuesta inmediata (anexo):** «No bastaba con acertar. Quería demostrar que también sabía evaluar una situación.»
- **Diario** (`74.diary.74_private_session.74_private_o2`): «Combiné precisión y lectura táctica durante la sesión. Intenté mostrar que podía tomar decisiones y no limitarme a ejecutar un movimiento.»
- **Eco:** modifica la descripción, no el valor canónico de la puntuación. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_private_o3` — Mantener la calma y reservar capacidades.
- **Efecto (fuente):** `private_session_result = strong; flag private_controlled_display` → `campaign.private_session_result` = `strong`; flag `private_controlled_display`
- **Respuesta inmediata (anexo):** «Mostré lo suficiente para que entendieran que no era una presa fácil, pero no todo lo que podía hacer.»
- **Diario** (`74.diary.74_private_session.74_private_o3`): «Mantuve la calma y reservé parte de mis capacidades. Los Vigilantes tendrían que evaluar lo que habían visto. Yo no podía controlar su interpretación.»
- **Eco:** matiza el recuerdo. La puntuación sigue siendo extraordinariamente alta en la ruta canónica. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 10. `74_interview` — Una historia ante millones
| Campo | Valor |
|---|---|
| Lugar (fuente) | Escenario de entrevistas. |
| `location_id` propuesto | `capitol_interview_stage` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, Caesar Flickerman, Peeta, Haymitch, público. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | La entrevista precede a la entrada en la Arena y construye imagen pública. |
| Condiciones de entrada | Haber terminado `74_private_session` |
| Salida | `74_launch` |

**Texto de la escena (fuente):**

> Las luces convierten cada gesto en una declaración. Caesar recibe a Katniss con entusiasmo y formula preguntas aparentemente ligeras. Katniss sabe que cada respuesta puede convertirse en una etiqueta pública. No quiere ser una caricatura. Haymitch le ha explicado que la audiencia debe encontrar algo a lo que aferrarse.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_interview_o1` — Responder con sinceridad contenida.
- **Efecto (fuente):** `interview_tone = guarded; image_capitol +1; flag interview_honest` → `campaign.interview_tone` = `guarded`; `public.image_capitol` +1; flag `interview_honest`
- **Respuesta inmediata (anexo):** «Contesté sin adornar demasiado mis palabras. No quería que la entrevista hablara por mí.»
- **Diario** (`74.diary.74_interview.74_interview_o1`): «Intenté responder con sinceridad sin entregar más de lo que estaba dispuesta a contar. Cada pregunta parecía sencilla hasta que recordaba cuántas personas estaban escuchando.»
- **Eco:** tono público `guarded`. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_interview_o2` — Mostrar calidez.
- **Efecto (fuente):** `interview_tone = warm; sponsor_interest +2; flag interview_warm` → `campaign.interview_tone` = `warm`; `sponsor.interest` +2; flag `interview_warm`
- **Respuesta inmediata (anexo):** «Permití que el público viera algo más que mi miedo y mi desconfianza.»
- **Diario** (`74.diary.74_interview.74_interview_o2`): «Mostré calidez durante la entrevista. No significaba que confiara en el Capitolio, pero sí que podía decidir qué parte de mí quería presentar ante la audiencia.»
- **Eco:** puede reflejarse en el interés de patrocinadores ya existente. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]
#### `74_interview_o3` — Responder con firmeza.
- **Efecto (fuente):** `interview_tone = defiant; image_capitol +1; flag interview_defiant` → `campaign.interview_tone` = `defiant`; `public.image_capitol` +1; flag `interview_defiant`
- **Respuesta inmediata (anexo):** «No iba a permitir que cada pregunta me colocara en el papel que otros habían elegido.»
- **Diario** (`74.diary.74_interview.74_interview_o3`): «Respondí con firmeza. Sabía que podían interpretar mis palabras como desafío, pero preferí no fingir una docilidad que no sentía.»
- **Eco:** tono público `defiant`; no inicia una confrontación ni una consecuencia política nueva. — **sin frase escrita: no se muestra** [PENDIENTE · ChatGPT]

---

## 11. `74_launch` — El último ascensor
| Campo | Valor |
|---|---|
| Lugar (fuente) | Sala de lanzamiento y plataforma. |
| `location_id` propuesto | `arena_launch_room` (de `03_BASE_DATOS/03`; confirmar) |
| Personajes (fuente) | Katniss, personal técnico, voz de control. |
| `participants[]` con IDs | [PENDIENTE · ChatGPT] |
| Hito de continuidad (fuente) | Katniss entra en la Arena. Transición al módulo de Arena del 74.º ya existente; no añadir acontecimientos nuevos. |
| Condiciones de entrada | Haber terminado `74_interview` |
| Salida | Arena del 74.º existente (sin acontecimientos nuevos) |

**Texto de la escena (fuente):**

> La sala de lanzamiento está fría. El uniforme ya no parece un vestuario. Katniss ocupa su plataforma. La cuenta atrás comienza. No hay público visible ni música de desfile, solo instrucciones y el sonido mecánico del sistema. Piensa en Prim. Después mira al frente. La plataforma empieza a elevarse.

**`dialogue[]`** (intervenciones con `speaker_id`, `text`, `delivery_note`): [PENDIENTE · ChatGPT]. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**`player_prompt`** (la pregunta antes de decidir): [PENDIENTE · ChatGPT]

### Opciones
#### `74_launch_o1` — Repasar prioridades de supervivencia.
- **Efecto (fuente):** `launch_plan = survival; flag launch_survival_focus` → `campaign.launch_plan` = `survival`; flag `launch_survival_focus`
- **Respuesta inmediata (anexo):** «Piensa en lo esencial. Mantenerte viva es lo primero; todo lo demás tendrá que esperar.»
- **Diario** (`74.diary.74_launch.74_launch_o1`): «Mientras la plataforma se preparaba, repasé mis prioridades de supervivencia. No podía anticipar todo lo que encontraría, así que intenté concentrarme en las decisiones inmediatas.»
- **Eco:** `launch_plan=survival`.
#### `74_launch_o2` — Recordar la promesa a tu familia.
- **Efecto (fuente):** `launch_plan = family; flag launch_family_focus` → `campaign.launch_plan` = `family`; flag `launch_family_focus`
- **Respuesta inmediata (anexo):** «Primero pensé en Prim y en mi madre. La promesa que había dejado atrás seguía conmigo.»
- **Diario** (`74.diary.74_launch.74_launch_o2`): «Recordé a mi familia y las promesas que había hecho. No sabía qué podría cumplir desde la Arena, pero necesitaba conservar una razón para seguir adelante.»
- **Eco:** `launch_plan=family`. Si existe `gale_promise_explicit`, añadir una sola frase sobre esa promesa.
#### `74_launch_o3` — Prepararte para observar el terreno.
- **Efecto (fuente):** `launch_plan = observation; flag launch_observation_focus` → `campaign.launch_plan` = `observation`; flag `launch_observation_focus`
- **Respuesta inmediata (anexo):** «Mira antes de moverte. El terreno puede decidir tanto como cualquier adversario.»
- **Diario** (`74.diary.74_launch.74_launch_o3`): «Me preparé para observar el terreno en cuanto la plataforma terminara de elevarse. No sabía qué encontraría, pero quería evitar actuar sin mirar.»
- **Eco:** `launch_plan=observation`.

---

## Variables
| Variable en el guion | Variable en el contrato maestro | Tipo | Inicial | Valores |
|---|---|---|---|---|
| `rel_katniss_prim` | `rel.katniss_prim` | int | `0` | entero |
| `rel_katniss_peeta` | `rel.katniss_peeta` | int | `0` | entero |
| `rel_katniss_haymitch` | `rel.katniss_haymitch` | int | `0` | entero |
| `image_capitol` | `public.image_capitol` | int | `0` | entero |
| `sponsor_interest` | `sponsor.interest` | int | `0` | entero |
| `skill_archery` | `skill.archery` | int | `0` | entero |
| `skill_survival` | `skill.survival` | int | `0` | entero |
| `skill_observation` | `skill.observation` | int | `0` | entero |
| `training_focus` | `campaign.training_focus` | enum | `balanced` | `balanced`, `observation`, `archery`, `survival` |
| `private_session_result` | `campaign.private_session_result` | enum | `unknown` | `unknown`, `strong`, `exceptional` |
| `interview_tone` | `campaign.interview_tone` | enum | `unknown` | `unknown`, `guarded`, `warm`, `defiant` |
| `launch_plan` | `campaign.launch_plan` | enum | `unknown` | `unknown`, `survival`, `family`, `observation` |

## Transferencia a la Arena (anexo 1.1, implementada)
Al terminar `74_launch` (y leer su respuesta), el juego:
1. crea la instantánea `campaign_74:prearena:v1`, con:
   - versión de contenido, `timeline_id` y `route_type`;
   - las once escenas completadas, las variables y los flags;
   - los `decision_ids` y los `diary_entry_ids`;
2. la **guarda antes** de entrar en la Arena. Si no se puede guardar, no se entra;
3. si se reintenta, devuelve la misma instantánea **sin sumar nada otra vez**;
4. abre únicamente la Arena del 74.º existente.

| Dato | Uso según el anexo | Estado en el juego |
|---|---|---|
| `training_focus` | Contexto descriptivo | Guardado en la instantánea; sin efecto mecánico |
| Habilidades (arco, supervivencia, observación) | Solo atributos existentes | El juego solo tiene una habilidad genérica (`skill`), sin arco, supervivencia ni observación por separado. **Sin aplicar** (pregunta 6) |
| `private_session_result` | Registro narrativo; no concede objetos | Guardado; sin efecto mecánico |
| `image_capitol` | Perfil público inicial | **Sin aplicar** hasta confirmar límites (pregunta 5). Candidato: `support` (0–100, empieza en 12) |
| `sponsor_interest` | Valor inicial del patrocinio existente, con sus límites | **Sin aplicar** hasta confirmar límites (pregunta 5). Candidato: `sponsorTrust` (empieza en 0) |
| Relaciones | Contexto; no fuerza alianzas | Guardadas; sin efecto mecánico |
| `launch_plan` | Texto o prioridad narrativa; no crea turno | Guardado; sin efecto mecánico |
| Flags familiares | Recuerdos del diario | Guardados; ninguno se convierte en ventaja |

## Preguntas abiertas (para cerrar el bloque)
1. **Aprobación:** ¿se aprueban las escenas 1.0 y el anexo 1.1 **tal como están**? Si cambia alguna palabra, cambiad la fuente o el anexo: los datos se regeneran desde ellos.
2. **`74_private_o3`:**
   - el efecto de la fuente deja `private_session_result = strong`;
   - el hito y el anexo dicen que la puntuación sigue siendo «extraordinariamente alta» en las tres opciones;
   - ¿se cambia el efecto a `exceptional` o se mantiene `strong` como matiz?
3. **Ecos descritos sin frase:** 28 ecos del anexo describen lo que debería decir el eco, pero no traen la frase (p. ej. «reflexión breve sobre…», «recuerdo silencioso»). Tampoco está escrita la frase de `74_launch_o2` sobre la promesa a Gale. El juego **no muestra** ninguno. ¿Se escriben, o se quedan solo como guía?
4. **Variables declaradas sin uso:** `district_memory` y `canon_route` aparecen en la lista del guion, pero ninguna opción las usa. ¿Faltan efectos o se quitan?
5. **Límites del patrocinio:** ¿cuánto suma cada punto de `sponsor_interest` a `sponsorTrust` y cada punto de `image_capitol` a `support`? Con eso se activan los valores.
6. **Habilidades:** el juego no tiene atributos separados de arco, supervivencia y observación. ¿Se quedan solo en la instantánea, o `skill` sube al tener alguna?
7. **Diálogos:** ¿se mantienen dentro de la prosa o se entregan separados como `dialogue[]`?
8. **`location_id` y `participants[]`:** ¿se confirman los IDs propuestos?
9. **Identificadores:** el juego ya usa los del anexo (`campaign_74`, `campaign_74:<escena>:<opción>:1`, `74.diary.<escena>.<opción>`). Confirmad que son los definitivos.
