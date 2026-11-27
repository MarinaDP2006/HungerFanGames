# 74.º Juegos del Hambre · documento único de revisión

**Para:** ChatGPT (dirección creativa). **Aprueba:** la directora del proyecto.
**Estado:** `DRAFT_FOR_REVIEW`. Fuente: `docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md` (Producción creativa 74 v1 · Versión creativa 1.0).

## Cómo usar este documento
- **Escenas y opciones:** el título, el lugar, los personajes, el texto, las opciones, los efectos y los hitos están copiados **literalmente** de la fuente, sin una palabra añadida. Sale de los datos del juego con `node scripts/documento-revision-74.mjs`.
- **Huecos [PENDIENTE · ChatGPT]:** es lo que la fuente no trae y exige la especificación de guion (`02_NARRATIVA/01_Especificacion_de_guion.md`). Claude no los escribe.
- **Sección «Transferencia a la Arena»:** es una **propuesta técnica** para que la apruebes o la cambies. No está activa en el juego.
- **Para cerrar el bloque:**
  - rellenar los huecos;
  - responder las preguntas del final;
  - cambiar el estado a `APPROVED` (lo decide la directora).

  Con eso, Claude vuelve a generar los datos y el 74.º pasa a ser jugable.

## Resumen
| # | Escena | Opciones | Respuestas escritas | Diario escrito |
|---|---|---|---|---|
| 1 | `74_reaping` · La cosecha | 3 | 0 de 3 | No |
| 2 | `74_goodbyes` · Lo que queda atrás | 3 | 0 de 3 | No |
| 3 | `74_departure` · El último umbral | 3 | 0 de 3 | No |
| 4 | `74_train` · Un vagón hacia el Capitolio | 3 | 0 de 3 | No |
| 5 | `74_arrival` · La ciudad que mira | 3 | 0 de 3 | No |
| 6 | `74_prep` · La imagen que fabrican | 3 | 0 de 3 | No |
| 7 | `74_parade` · Bajo las luces | 3 | 0 de 3 | No |
| 8 | `74_training` · Aprender delante de todos | 3 | 0 de 3 | No |
| 9 | `74_private_session` · La sala de los Vigilantes | 3 | 0 de 3 | No |
| 10 | `74_interview` · Una historia ante millones | 3 | 0 de 3 | No |
| 11 | `74_launch` · El último ascensor | 3 | 0 de 3 | No |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_reaping_o1` | No apartarte de Prim. | `rel_katniss_prim +2; flag prim_saw_katniss_protect` | `rel.katniss_prim` +2; flag `prim_saw_katniss_protect` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_reaping_o2` | Observar cada detalle de la ceremonia. | `flag katniss_observed_ceremony` | flag `katniss_observed_ceremony` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_reaping_o3` | Buscar a Peeta entre la multitud. | `rel_katniss_peeta +1; flag first_recognition_peeta` | `rel.katniss_peeta` +1; flag `first_recognition_peeta` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_goodbyes_o1` | Pedir a Gale que cuide de Prim y de tu madre. | `flag gale_promise_explicit` | flag `gale_promise_explicit` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_goodbyes_o2` | Pedir a tu madre que vuelva a cuidar de Prim. | `flag mother_responsibility_named` | flag `mother_responsibility_named` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_goodbyes_o3` | Abrazar a Prim sin decir nada. | `rel_katniss_prim +2; flag goodbye_without_words` | `rel.katniss_prim` +2; flag `goodbye_without_words` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_departure_o1` | Memorizar el camino y los rostros. | `training_focus = observation; flag departure_observant` | `campaign.training_focus` = `observation`; flag `departure_observant` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_departure_o2` | Controlar la respiración. | `training_focus = balanced; flag departure_composure` | `campaign.training_focus` = `balanced`; flag `departure_composure` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_departure_o3` | Observar a Peeta sin hablar. | `rel_katniss_peeta +1; flag departure_noticed_peeta` | `rel.katniss_peeta` +1; flag `departure_noticed_peeta` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_train_o1` | Exigir instrucciones concretas a Haymitch. | `rel_katniss_haymitch +2; flag haymitch_practical_questions` | `rel.katniss_haymitch` +2; flag `haymitch_practical_questions` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_train_o2` | Preguntar a Peeta por su estrategia. | `rel_katniss_peeta +2; flag train_peeta_opening` | `rel.katniss_peeta` +2; flag `train_peeta_opening` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_train_o3` | Escuchar sin revelar tus habilidades. | `training_focus = observation; flag katniss_keeps_advantage_private` | `campaign.training_focus` = `observation`; flag `katniss_keeps_advantage_private` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_arrival_o1` | Observar arquitectura y rutas. | `training_focus = observation; flag capitol_layout_observed` | `campaign.training_focus` = `observation`; flag `capitol_layout_observed` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_arrival_o2` | Permanecer cerca de Peeta. | `rel_katniss_peeta +1; flag arrival_stayed_near_peeta` | `rel.katniss_peeta` +1; flag `arrival_stayed_near_peeta` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_arrival_o3` | Responder con cortesía breve. | `flag arrival_guarded` | flag `arrival_guarded` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_prep_o1` | Confiar en la propuesta de Cinna. | `image_capitol +2; sponsor_interest +1; flag cinna_trust` | `public.image_capitol` +2; `sponsor.interest` +1; flag `cinna_trust` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_prep_o2` | Conservar una referencia visible al Distrito 12. | `flag district_identity_visible` | flag `district_identity_visible` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_prep_o3` | Aceptar el trabajo sin mostrar entusiasmo. | `image_capitol +1; flag prep_controlled` | `public.image_capitol` +1; flag `prep_controlled` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_parade_o1` | Sostener la mirada del público. | `image_capitol +2; sponsor_interest +2; flag parade_confident` | `public.image_capitol` +2; `sponsor.interest` +2; flag `parade_confident` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_parade_o2` | Compartir el momento con Peeta. | `rel_katniss_peeta +2; image_capitol +1; flag parade_pair_identity` | `rel.katniss_peeta` +2; `public.image_capitol` +1; flag `parade_pair_identity` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_parade_o3` | Seguir las indicaciones de Cinna. | `flag parade_trust_team` | flag `parade_trust_team` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_training_o1` | Practicar tiro con arco. | `skill_archery +1; training_focus = archery; flag trained_archery` | `skill.archery` +1; `campaign.training_focus` = `archery`; flag `trained_archery` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_training_o2` | Practicar supervivencia y rastreo. | `skill_survival +1; training_focus = survival; flag trained_survival` | `skill.survival` +1; `campaign.training_focus` = `survival`; flag `trained_survival` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_training_o3` | Observar estaciones y comportamientos. | `skill_observation +1; training_focus = observation; flag training_observed_others` | `skill.observation` +1; `campaign.training_focus` = `observation`; flag `training_observed_others` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_private_o1` | Demostrar precisión con el arco. | `private_session_result = exceptional; flag private_archery_display` | `campaign.private_session_result` = `exceptional`; flag `private_archery_display` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_private_o2` | Combinar precisión y lectura táctica. | `private_session_result = exceptional; flag private_tactical_display` | `campaign.private_session_result` = `exceptional`; flag `private_tactical_display` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_private_o3` | Mantener la calma y reservar capacidades. | `private_session_result = strong; flag private_controlled_display` | `campaign.private_session_result` = `strong`; flag `private_controlled_display` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_interview_o1` | Responder con sinceridad contenida. | `interview_tone = guarded; image_capitol +1; flag interview_honest` | `campaign.interview_tone` = `guarded`; `public.image_capitol` +1; flag `interview_honest` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_interview_o2` | Mostrar calidez. | `interview_tone = warm; sponsor_interest +2; flag interview_warm` | `campaign.interview_tone` = `warm`; `sponsor.interest` +2; flag `interview_warm` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_interview_o3` | Responder con firmeza. | `interview_tone = defiant; image_capitol +1; flag interview_defiant` | `campaign.interview_tone` = `defiant`; `public.image_capitol` +1; flag `interview_defiant` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

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

**`journal_entry` de la escena:** [PENDIENTE · ChatGPT]

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | `response_text` | `journal_tag` | Texto del diario |
|---|---|---|---|---|---|---|
| `74_launch_o1` | Repasar prioridades de supervivencia. | `launch_plan = survival; flag launch_survival_focus` | `campaign.launch_plan` = `survival`; flag `launch_survival_focus` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_launch_o2` | Recordar la promesa a tu familia. | `launch_plan = family; flag launch_family_focus` | `campaign.launch_plan` = `family`; flag `launch_family_focus` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |
| `74_launch_o3` | Prepararte para observar el terreno. | `launch_plan = observation; flag launch_observation_focus` | `campaign.launch_plan` = `observation`; flag `launch_observation_focus` | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] | [PENDIENTE · ChatGPT] |

---

## Diario de continuidad
La fuente pide generar el diario desde los flags, sin duplicar entradas al cargar (el motor ya lo garantiza: cada escena registra una sola decisión). Falta el texto de cada entrada:

| Flag | Lo fija | Escena | Texto del diario |
|---|---|---|---|
| `prim_saw_katniss_protect` | `74_reaping_o1` | `74_reaping` | [PENDIENTE · ChatGPT] |
| `katniss_observed_ceremony` | `74_reaping_o2` | `74_reaping` | [PENDIENTE · ChatGPT] |
| `first_recognition_peeta` | `74_reaping_o3` | `74_reaping` | [PENDIENTE · ChatGPT] |
| `gale_promise_explicit` | `74_goodbyes_o1` | `74_goodbyes` | [PENDIENTE · ChatGPT] |
| `mother_responsibility_named` | `74_goodbyes_o2` | `74_goodbyes` | [PENDIENTE · ChatGPT] |
| `goodbye_without_words` | `74_goodbyes_o3` | `74_goodbyes` | [PENDIENTE · ChatGPT] |
| `departure_observant` | `74_departure_o1` | `74_departure` | [PENDIENTE · ChatGPT] |
| `departure_composure` | `74_departure_o2` | `74_departure` | [PENDIENTE · ChatGPT] |
| `departure_noticed_peeta` | `74_departure_o3` | `74_departure` | [PENDIENTE · ChatGPT] |
| `haymitch_practical_questions` | `74_train_o1` | `74_train` | [PENDIENTE · ChatGPT] |
| `train_peeta_opening` | `74_train_o2` | `74_train` | [PENDIENTE · ChatGPT] |
| `katniss_keeps_advantage_private` | `74_train_o3` | `74_train` | [PENDIENTE · ChatGPT] |
| `capitol_layout_observed` | `74_arrival_o1` | `74_arrival` | [PENDIENTE · ChatGPT] |
| `arrival_stayed_near_peeta` | `74_arrival_o2` | `74_arrival` | [PENDIENTE · ChatGPT] |
| `arrival_guarded` | `74_arrival_o3` | `74_arrival` | [PENDIENTE · ChatGPT] |
| `cinna_trust` | `74_prep_o1` | `74_prep` | [PENDIENTE · ChatGPT] |
| `district_identity_visible` | `74_prep_o2` | `74_prep` | [PENDIENTE · ChatGPT] |
| `prep_controlled` | `74_prep_o3` | `74_prep` | [PENDIENTE · ChatGPT] |
| `parade_confident` | `74_parade_o1` | `74_parade` | [PENDIENTE · ChatGPT] |
| `parade_pair_identity` | `74_parade_o2` | `74_parade` | [PENDIENTE · ChatGPT] |
| `parade_trust_team` | `74_parade_o3` | `74_parade` | [PENDIENTE · ChatGPT] |
| `trained_archery` | `74_training_o1` | `74_training` | [PENDIENTE · ChatGPT] |
| `trained_survival` | `74_training_o2` | `74_training` | [PENDIENTE · ChatGPT] |
| `training_observed_others` | `74_training_o3` | `74_training` | [PENDIENTE · ChatGPT] |
| `private_archery_display` | `74_private_o1` | `74_private_session` | [PENDIENTE · ChatGPT] |
| `private_tactical_display` | `74_private_o2` | `74_private_session` | [PENDIENTE · ChatGPT] |
| `private_controlled_display` | `74_private_o3` | `74_private_session` | [PENDIENTE · ChatGPT] |
| `interview_honest` | `74_interview_o1` | `74_interview` | [PENDIENTE · ChatGPT] |
| `interview_warm` | `74_interview_o2` | `74_interview` | [PENDIENTE · ChatGPT] |
| `interview_defiant` | `74_interview_o3` | `74_interview` | [PENDIENTE · ChatGPT] |
| `launch_survival_focus` | `74_launch_o1` | `74_launch` | [PENDIENTE · ChatGPT] |
| `launch_family_focus` | `74_launch_o2` | `74_launch` | [PENDIENTE · ChatGPT] |
| `launch_observation_focus` | `74_launch_o3` | `74_launch` | [PENDIENTE · ChatGPT] |

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

## Transferencia a la Arena — PROPUESTA TÉCNICA (no activa)
Al terminar `74_launch`, el motor guarda todo el estado en `game.continuity['74']` y la partida entra en la Arena del 74.º existente (cuatro capítulos, sin acontecimientos nuevos).

Hoy la Arena **no lee** ese estado. Esta es la traducción que propongo a las estadísticas que la Arena ya usa. Solo se activará cuando la aprobéis o la cambiéis:

| Variable | Propuesta | Estadística de la Arena | Motivo |
|---|---|---|---|
| `public.image_capitol` | +2 por punto (máx. +10) | `support` (apoyo del público) | La imagen pública ya alimenta el apoyo |
| `sponsor.interest` | +1 por punto | `sponsorTrust` (envíos de patrocinadores) | Correspondencia directa |
| `campaign.private_session_result` | `exceptional` +3 · `strong` +1 | `sponsorTrust` | La puntuación atrae patrocinadores |
| `skill.archery` | +1 si ≥ 1 | `skill` (combate) | |
| `skill.observation` | +2 si ≥ 1 | `stealth` | |
| `skill.survival` | −5 al empezar, si ≥ 1 | `thirst` y `hunger` | |
| `campaign.interview_tone` | `warm` apoyo +5 · `guarded` apoyo +2 · `defiant` rebelión +3 | `support` / `rebellion` | Igual que la entrevista genérica actual |
| `campaign.launch_plan` | `observation`: tributos visibles en el mapa · `survival`: fatiga −5 · `family`: [PENDIENTE · ChatGPT] | Mapa / `fatigue` | `family` no tiene equivalente mecánico: ¿efecto narrativo solo? |
| `rel.katniss_peeta`, `rel.katniss_prim`, `rel.katniss_haymitch` | Sin efecto mecánico propuesto | — | Cualquier efecto sobre alianzas o escenas de la Arena es narrativo: decidid si lo tiene |
| `campaign.training_focus` | Sin efecto propuesto (ya se refleja en `skill.*`) | — | |
| Flags | Se conservan para la Gira y el 75.º | — | Continuidad |

## Preguntas abiertas (para cerrar el bloque)
1. ¿Se aprueban los textos de la fuente **tal como están**? Si cambia alguna palabra, cambiad la fuente: los datos se regeneran desde ella.
2. **Variables declaradas sin uso:** `district_memory` y `canon_route` aparecen en la lista del guion, pero ninguna opción las usa. ¿Faltan efectos o se quitan?
3. **`74_private_o3`:** deja `private_session_result = strong`, pero el hito dice que la puntuación es «extraordinariamente alta». ¿Se mantiene `strong` o el hito cambia en esta ruta?
4. **Diálogos:** ¿se mantienen dentro de la prosa o se entregan separados como `dialogue[]`?
5. **Transferencia a la Arena:** ¿se aprueba la propuesta técnica? ¿Qué hace `launch_plan = family`?
6. **`location_id` y `participants[]`:** ¿se confirman los IDs propuestos?
