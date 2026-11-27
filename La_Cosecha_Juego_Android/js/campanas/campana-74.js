// GENERADO por scripts/importar-campana-74.mjs desde docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md y docs/paquetes/74_anexo_1_1/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md.
// No editar a mano. Estado DRAFT_FOR_REVIEW: no se puede jugar hasta su aprobación.
import { VARIABLES_74 } from '../precampana.js';

export const CAMPANA_74 = Object.freeze({ ...{
  "campaign_id": "campaign_74",
  "title": "74.º Juegos del Hambre · precampaña",
  "status": "DRAFT_FOR_REVIEW",
  "source_version": "74-prearena-1.1",
  "source_ref": "docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md",
  "annex_ref": "docs/paquetes/74_anexo_1_1/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md",
  "transfer_id": "campaign_74:prearena:v1",
  "scenes": [
    {
      "scene_id": "74_reaping",
      "sequence": 1,
      "title": "La cosecha",
      "location": "Plaza del Distrito 12.",
      "participants": "Katniss, Prim, Effie, Haymitch, Peeta.",
      "location_id": null,
      "text": "La plaza está dividida por edades y por un silencio que nadie se atreve a romper. Katniss mantiene a Prim a la vista. Effie presenta el sorteo con una alegría teatral que contrasta con los rostros de las familias. Extrae el nombre de Primrose Everdeen. Por un instante, Katniss no oye nada más. Prim da un paso hacia el escenario. Katniss rompe la fila y grita que se ofrece voluntaria. La autoridad confirma el voluntariado. Después se extrae el nombre masculino: Peeta Mellark.",
      "milestone": "Prim es seleccionada; Katniss se ofrece voluntaria; Peeta es seleccionado como tributo masculino.",
      "options": [
        {
          "option_id": "74_reaping_o1",
          "label": "No apartarte de Prim.",
          "source_effect": "rel_katniss_prim +2; flag prim_saw_katniss_protect",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_prim",
              "value": 2
            },
            {
              "op": "SET_FLAG",
              "path": "prim_saw_katniss_protect"
            }
          ],
          "response_text": "No voy a dejar que atraviese esto sin verme a su lado. Si tiene miedo, al menos sabrá que no está sola.",
          "journal_tag": null,
          "journal_text": "Cuando pronunciaron el nombre de Prim, todo lo demás desapareció. Me mantuve pendiente de ella hasta el instante en que di un paso al frente. No recuerdo haber pensado en las consecuencias. Solo en impedir que se la llevaran.",
          "journal_entry_id": "74.diary.74_reaping.74_reaping_o1",
          "echo": {
            "scene_id": "74_goodbyes",
            "flag": "prim_saw_katniss_protect",
            "text": "Prim todavía intenta entender por qué lo hice. No tengo una explicación que pueda aliviarla."
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "No apartarte de Prim"
        },
        {
          "option_id": "74_reaping_o2",
          "label": "Observar cada detalle de la ceremonia.",
          "source_effect": "flag katniss_observed_ceremony",
          "effects": [
            {
              "op": "SET_FLAG",
              "path": "katniss_observed_ceremony"
            }
          ],
          "response_text": "Mira las salidas. Recuerda quién está en el escenario y cómo se desarrolla el sorteo. No puedes permitirte perder el control.",
          "journal_tag": null,
          "journal_text": "Me obligué a mirar la ceremonia como si observarla pudiera mantenerme a salvo. La plaza, el escenario, los agentes, las papeletas. Nada cambió lo que ocurrió, pero recordar los detalles era algo que todavía podía controlar.",
          "journal_entry_id": "74.diary.74_reaping.74_reaping_o2",
          "echo": null,
          "echo_note": "al llegar al Capitolio: reflexión breve sobre la diferencia entre la plaza del Distrito 12 y los espacios vigilados.",
          "transfer_note": null,
          "label_anexo": "Observar cada detalle"
        },
        {
          "option_id": "74_reaping_o3",
          "label": "Buscar a Peeta entre la multitud.",
          "source_effect": "rel_katniss_peeta +1; flag first_recognition_peeta",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_peeta",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "first_recognition_peeta"
            }
          ],
          "response_text": "Vi a Peeta entre la gente. Su nombre todavía no había sido pronunciado, pero ya no pude dejar de pensar en él.",
          "journal_tag": null,
          "journal_text": "Después de ofrecerme voluntaria, busqué rostros conocidos entre la multitud. Encontré a Peeta. No hablamos. Aún no sabía qué significaría que su nombre saliera del otro recipiente.",
          "journal_entry_id": "74.diary.74_reaping.74_reaping_o3",
          "echo": {
            "scene_id": "74_train",
            "flag": "first_recognition_peeta",
            "text": "No era la primera vez que lo veía aquel día. Eso no significa que sepa qué piensa."
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Buscar a Peeta entre la multitud"
        }
      ]
    },
    {
      "scene_id": "74_goodbyes",
      "sequence": 2,
      "title": "Lo que queda atrás",
      "location": "Sala de despedidas del Edificio de Justicia.",
      "participants": "Katniss, Prim, madre de Katniss, Gale.",
      "location_id": null,
      "text": "La sala es demasiado limpia para una despedida. Prim se aferra a Katniss y le dice que no tenía que hacerlo. Katniss responde que sí. Le pide que cuide de su madre y que no se culpe. Su madre intenta hablar, pero el miedo la deja sin palabras. Gale llega con una promesa práctica: se ocupará de que la familia tenga comida y protección. Katniss entiende que no puede llevarse a su familia, solo las promesas que deja.",
      "milestone": "Katniss se despide de su familia y de Gale antes del traslado.",
      "options": [
        {
          "option_id": "74_goodbyes_o1",
          "label": "Pedir a Gale que cuide de Prim y de tu madre.",
          "source_effect": "flag gale_promise_explicit",
          "effects": [
            {
              "op": "SET_FLAG",
              "path": "gale_promise_explicit"
            }
          ],
          "response_text": "No puedo pedirte que arregles todo. Solo que no las dejes solas.",
          "journal_tag": null,
          "journal_text": "Le pedí a Gale que cuidara de Prim y de mi madre. No era justo dejarle una responsabilidad así, pero era la única persona a quien podía pedírselo sin explicar cada detalle.",
          "journal_entry_id": "74.diary.74_goodbyes.74_goodbyes_o1",
          "echo": null,
          "echo_note": "en el lanzamiento, si `gale_promise_explicit`: recuerdo de la promesa, sin afirmar que Katniss sabe si se está cumpliendo.",
          "transfer_note": null,
          "label_anexo": "Pedir a Gale que cuide de Prim y de tu madre"
        },
        {
          "option_id": "74_goodbyes_o2",
          "label": "Pedir a tu madre que vuelva a cuidar de Prim.",
          "source_effect": "flag mother_responsibility_named",
          "effects": [
            {
              "op": "SET_FLAG",
              "path": "mother_responsibility_named"
            }
          ],
          "response_text": "Necesito que estés aquí para ella. No tienes que prometerme nada más ahora.",
          "journal_tag": null,
          "journal_text": "Intenté que mi madre entendiera que Prim la necesitaría. No podía resolver su miedo ni el mío. Solo podía pedirle que permaneciera junto a mi hermana.",
          "journal_entry_id": "74.diary.74_goodbyes.74_goodbyes_o2",
          "echo": null,
          "echo_note": "en el lanzamiento, si `mother_responsibility_named`: recuerdo breve de la petición.",
          "transfer_note": null,
          "label_anexo": "Pedir a tu madre que vuelva a cuidar de Prim"
        },
        {
          "option_id": "74_goodbyes_o3",
          "label": "Abrazar a Prim sin decir nada.",
          "source_effect": "rel_katniss_prim +2; flag goodbye_without_words",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_prim",
              "value": 2
            },
            {
              "op": "SET_FLAG",
              "path": "goodbye_without_words"
            }
          ],
          "response_text": "No encontré palabras que pudieran servirle. La abracé y traté de memorizar aquel momento.",
          "journal_tag": null,
          "journal_text": "No dije nada. Cualquier promesa habría sonado pequeña frente a lo que estaba ocurriendo. Me limité a abrazarla todo el tiempo que me permitieron.",
          "journal_entry_id": "74.diary.74_goodbyes.74_goodbyes_o3",
          "echo": null,
          "echo_note": "en el lanzamiento, si `goodbye_without_words`: recuerdo silencioso.",
          "transfer_note": null,
          "label_anexo": "Abrazar a Prim sin decir nada"
        }
      ]
    },
    {
      "scene_id": "74_departure",
      "sequence": 3,
      "title": "El último umbral",
      "location": "Salida del Edificio de Justicia y estación.",
      "participants": "Katniss, escolta, Peeta a distancia.",
      "location_id": null,
      "text": "La puerta se cierra detrás de Katniss. El aire exterior todavía huele a carbón. La escolta la conduce hacia el tren. Katniss mira una última vez los edificios que conoce. Ve a Peeta acompañado por otra escolta; no hablan. El trayecto convierte el Distrito 12 en algo que ya empieza a quedar atrás.",
      "milestone": "Salida del Distrito 12 y transición al tren.",
      "options": [
        {
          "option_id": "74_departure_o1",
          "label": "Memorizar el camino y los rostros.",
          "source_effect": "training_focus = observation; flag departure_observant",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "observation"
            },
            {
              "op": "SET_FLAG",
              "path": "departure_observant"
            }
          ],
          "response_text": "Guarda cada detalle. Los lugares y las personas pueden decirte más de lo que dicen en voz alta.",
          "journal_tag": null,
          "journal_text": "Antes de subir al tren memoricé el camino, las posiciones de los agentes y los rostros que pude reconocer. No sabía si esos detalles servirían de algo, pero observar era mejor que dejar que el miedo ocupara todo el espacio.",
          "journal_entry_id": "74.diary.74_departure.74_departure_o1",
          "echo": null,
          "echo_note": "inclinación descriptiva a observar el entorno; no concede conocimiento automático del mapa.",
          "transfer_note": null,
          "label_anexo": "Memorizar el camino y los rostros"
        },
        {
          "option_id": "74_departure_o2",
          "label": "Controlar la respiración.",
          "source_effect": "training_focus = balanced; flag departure_composure",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "balanced"
            },
            {
              "op": "SET_FLAG",
              "path": "departure_composure"
            }
          ],
          "response_text": "Inspira. Cuenta. Vuelve a hacerlo. No tienes que resolver el futuro en este instante.",
          "journal_tag": null,
          "journal_text": "Me concentré en respirar mientras me conducían a la estación. El miedo seguía allí, pero al menos podía impedir que decidiera cada uno de mis movimientos.",
          "journal_entry_id": "74.diary.74_departure.74_departure_o2",
          "echo": null,
          "echo_note": "recuerdo de autocontrol; no concede inmunidad al miedo ni bonificaciones ocultas.",
          "transfer_note": null,
          "label_anexo": "Controlar la respiración"
        },
        {
          "option_id": "74_departure_o3",
          "label": "Observar a Peeta sin hablar.",
          "source_effect": "rel_katniss_peeta +1; flag departure_noticed_peeta",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_peeta",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "departure_noticed_peeta"
            }
          ],
          "response_text": "Lo vi a cierta distancia. Ninguno de los dos se acercó.",
          "journal_tag": null,
          "journal_text": "Peeta caminaba acompañado por su escolta. Quise saber qué estaba pensando, pero no tenía forma de preguntárselo. Seguimos caminos separados hacia el mismo tren.",
          "journal_entry_id": "74.diary.74_departure.74_departure_o3",
          "echo": null,
          "echo_note": "familiaridad visual, sin asumir confianza.",
          "transfer_note": null,
          "label_anexo": "Observar a Peeta sin hablar"
        }
      ]
    },
    {
      "scene_id": "74_train",
      "sequence": 4,
      "title": "Un vagón hacia el Capitolio",
      "location": "Tren del Distrito 12 al Capitolio.",
      "participants": "Katniss, Peeta, Haymitch, Effie.",
      "location_id": null,
      "text": "El tren avanza con una suavidad que no corresponde a lo que transporta. La comida sobre la mesa parece pertenecer a otra vida. Effie habla de horarios y de causar una buena impresión. Haymitch aparece con aspecto agotado y advierte que sobrevivir exigirá escuchar y aprender el juego que el Capitolio ha construido. Peeta intenta rebajar la tensión. Katniss no sabe si confiar en él.",
      "milestone": "Haymitch asume la orientación de ambos tributos.",
      "options": [
        {
          "option_id": "74_train_o1",
          "label": "Exigir instrucciones concretas a Haymitch.",
          "source_effect": "rel_katniss_haymitch +2; flag haymitch_practical_questions",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_haymitch",
              "value": 2
            },
            {
              "op": "SET_FLAG",
              "path": "haymitch_practical_questions"
            }
          ],
          "response_text": "No necesito que me tranquilices. Necesito saber qué esperan de nosotros y qué podemos hacer para seguir vivos.",
          "journal_tag": null,
          "journal_text": "Le pedí a Haymitch respuestas prácticas. No sabía cuánto podía confiar en él, pero era nuestro mentor y necesitaba entender qué podía enseñarnos antes de llegar.",
          "journal_entry_id": "74.diary.74_train.74_train_o1",
          "echo": null,
          "echo_note": "Haymitch puede ofrecer explicaciones más directas; no se crea una alianza automática.",
          "transfer_note": null,
          "label_anexo": "Exigir instrucciones concretas a Haymitch"
        },
        {
          "option_id": "74_train_o2",
          "label": "Preguntar a Peeta por su estrategia.",
          "source_effect": "rel_katniss_peeta +2; flag train_peeta_opening",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_peeta",
              "value": 2
            },
            {
              "op": "SET_FLAG",
              "path": "train_peeta_opening"
            }
          ],
          "response_text": "Quería saber cómo pensaba afrontar los Juegos. Su respuesta no resolvió todas mis dudas, pero abrió una conversación.",
          "journal_tag": null,
          "journal_text": "Le pregunté a Peeta por su estrategia. Hablar con él no borró el hecho de que ambos éramos tributos del mismo distrito, pero me permitió conocer un poco mejor cómo afrontaba la situación.",
          "journal_entry_id": "74.diary.74_train.74_train_o2",
          "echo": null,
          "echo_note": "referencia a esa conversación durante el entrenamiento.",
          "transfer_note": null,
          "label_anexo": "Preguntar a Peeta por su estrategia"
        },
        {
          "option_id": "74_train_o3",
          "label": "Escuchar sin revelar tus habilidades.",
          "source_effect": "training_focus = observation; flag katniss_keeps_advantage_private",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "observation"
            },
            {
              "op": "SET_FLAG",
              "path": "katniss_keeps_advantage_private"
            }
          ],
          "response_text": "Escucha primero. No tienes por qué entregar toda la información que tienes.",
          "journal_tag": null,
          "journal_text": "Dejé que Haymitch y Peeta hablaran. No expliqué qué sabía hacer ni qué pensaba intentar. Todavía no tenía motivos para mostrar todas mis cartas.",
          "journal_entry_id": "74.diary.74_train.74_train_o3",
          "echo": null,
          "echo_note": "reflexión de entrenamiento más reservada; no oculta habilidades ya conocidas por el sistema.",
          "transfer_note": null,
          "label_anexo": "Escuchar sin revelar tus habilidades"
        }
      ]
    },
    {
      "scene_id": "74_arrival",
      "sequence": 5,
      "title": "La ciudad que mira",
      "location": "Estación y complejo de preparación del Capitolio.",
      "participants": "Katniss, Peeta, Effie, Haymitch.",
      "location_id": null,
      "text": "El tren se detiene en una estación construida para recibir celebridades. Más allá de los ventanales se extienden fachadas pulidas, torres y vehículos silenciosos. Effie conduce a los tributos por el complejo. Katniss siente que la observan como si fuera material que puede moldearse. Haymitch permanece cerca, atento a las intenciones del equipo.",
      "milestone": "Llegada al Capitolio.",
      "options": [
        {
          "option_id": "74_arrival_o1",
          "label": "Observar arquitectura y rutas.",
          "source_effect": "training_focus = observation; flag capitol_layout_observed",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "observation"
            },
            {
              "op": "SET_FLAG",
              "path": "capitol_layout_observed"
            }
          ],
          "response_text": "Las fachadas, los accesos y los pasillos. Intenta recordar cómo está organizado el lugar.",
          "journal_tag": null,
          "journal_text": "Al llegar al Capitolio presté atención a la distribución del complejo. Todo parecía diseñado para impresionar y controlar el movimiento de quienes entraban.",
          "journal_entry_id": "74.diary.74_arrival.74_arrival_o1",
          "echo": null,
          "echo_note": "descripción de orientación; no concede rutas secretas ni ventajas de navegación.",
          "transfer_note": null,
          "label_anexo": "Observar arquitectura y rutas"
        },
        {
          "option_id": "74_arrival_o2",
          "label": "Permanecer cerca de Peeta.",
          "source_effect": "rel_katniss_peeta +1; flag arrival_stayed_near_peeta",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_peeta",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "arrival_stayed_near_peeta"
            }
          ],
          "response_text": "Su presencia hacía que el lugar resultara un poco menos desconocido.",
          "journal_tag": null,
          "journal_text": "Me mantuve cerca de Peeta mientras nos conducían por el complejo. No sabía si aquello era confianza o simplemente la necesidad de reconocer a alguien del Distrito 12.",
          "journal_entry_id": "74.diary.74_arrival.74_arrival_o2",
          "echo": null,
          "echo_note": "referencia de familiaridad, sin alianza incondicional.",
          "transfer_note": null,
          "label_anexo": "Permanecer cerca de Peeta"
        },
        {
          "option_id": "74_arrival_o3",
          "label": "Responder con cortesía breve.",
          "source_effect": "flag arrival_guarded",
          "effects": [
            {
              "op": "SET_FLAG",
              "path": "arrival_guarded"
            }
          ],
          "response_text": "Contesté lo necesario y no ofrecí más de lo que me habían preguntado.",
          "journal_tag": null,
          "journal_text": "Decidí ser correcta sin mostrar demasiado. En el Capitolio incluso una respuesta sencilla podía convertirse en parte de la imagen que otros construyeran de mí.",
          "journal_entry_id": "74.diary.74_arrival.74_arrival_o3",
          "echo": null,
          "echo_note": "primera impresión más reservada.",
          "transfer_note": null,
          "label_anexo": "Responder con cortesía breve"
        }
      ]
    },
    {
      "scene_id": "74_prep",
      "sequence": 6,
      "title": "La imagen que fabrican",
      "location": "Centro de preparación y vestuario.",
      "participants": "Katniss, equipo de preparación, Cinna, Peeta, Effie.",
      "location_id": null,
      "text": "El equipo de preparación trabaja con rapidez. Katniss soporta el proceso sin regalarles una reacción. Cinna es distinto: no propone borrar su origen, sino convertirlo en presencia. Le explica que no necesita parecer otra persona; necesita que el público la recuerde. Katniss no sabe si es una promesa o una estrategia, quizá ambas.",
      "milestone": "Cinna prepara la presentación de Katniss para el desfile.",
      "options": [
        {
          "option_id": "74_prep_o1",
          "label": "Confiar en la propuesta de Cinna.",
          "source_effect": "image_capitol +2; sponsor_interest +1; flag cinna_trust",
          "effects": [
            {
              "op": "ADD",
              "path": "public.image_capitol",
              "value": 2
            },
            {
              "op": "ADD",
              "path": "sponsor.interest",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "cinna_trust"
            }
          ],
          "response_text": "No tienes que convertirte en otra persona. Si el público va a mirarte, al menos que recuerde quién eres.",
          "journal_tag": null,
          "journal_text": "Cinna no me pidió que fingiera ser alguien distinta. Su propuesta consistía en hacer visible algo que ya formaba parte de mí. Decidí confiar en su criterio.",
          "journal_entry_id": "74.diary.74_prep.74_prep_o1",
          "echo": null,
          "echo_note": "coordinación con Cinna durante el desfile.",
          "transfer_note": null,
          "label_anexo": "Confiar en la propuesta de Cinna"
        },
        {
          "option_id": "74_prep_o2",
          "label": "Conservar una referencia visible al Distrito 12.",
          "source_effect": "flag district_identity_visible",
          "effects": [
            {
              "op": "SET_FLAG",
              "path": "district_identity_visible"
            }
          ],
          "response_text": "No quiero que el Capitolio borre de dónde vengo.",
          "journal_tag": null,
          "journal_text": "Acepté la preparación, pero quise conservar una señal de mi procedencia. No sabía cómo interpretaría el público aquel detalle; para mí era importante no desaparecer dentro del espectáculo.",
          "journal_entry_id": "74.diary.74_prep.74_prep_o2",
          "echo": null,
          "echo_note": "el diario conserva la intención. Solo se refleja en el atuendo si el diseño aprobado lo permite; no altera por sí solo el atuendo canónico.",
          "transfer_note": null,
          "label_anexo": "Conservar una referencia visible al Distrito 12"
        },
        {
          "option_id": "74_prep_o3",
          "label": "Aceptar el trabajo sin mostrar entusiasmo.",
          "source_effect": "image_capitol +1; flag prep_controlled",
          "effects": [
            {
              "op": "ADD",
              "path": "public.image_capitol",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "prep_controlled"
            }
          ],
          "response_text": "Deja que hagan su trabajo. No tienes que regalarles también tus reacciones.",
          "journal_tag": null,
          "journal_text": "Permití que el equipo terminara la preparación sin fingir entusiasmo. Podía colaborar sin olvidar que aquello era una presentación organizada para el Capitolio.",
          "journal_entry_id": "74.diary.74_prep.74_prep_o3",
          "echo": null,
          "echo_note": "descripción contenida antes del desfile.",
          "transfer_note": null,
          "label_anexo": "Aceptar el trabajo sin mostrar entusiasmo"
        }
      ]
    },
    {
      "scene_id": "74_parade",
      "sequence": 7,
      "title": "Bajo las luces",
      "location": "Avenida del desfile.",
      "participants": "Katniss, Peeta, Cinna, tributos, público.",
      "location_id": null,
      "text": "La avenida está llena de luces, música y gritos. Los carros avanzan bajo balcones abarrotados. Katniss siente el calor del vestuario y miles de miradas. Cinna le recuerda que no necesita comprender al Capitolio para controlar unos segundos de su atención. Peeta está junto a ella. El gesto compartido de los tributos del Distrito 12 atrae la atención del público.",
      "milestone": "El desfile precede al entrenamiento y convierte al Distrito 12 en centro de atención.",
      "options": [
        {
          "option_id": "74_parade_o1",
          "label": "Sostener la mirada del público.",
          "source_effect": "image_capitol +2; sponsor_interest +2; flag parade_confident",
          "effects": [
            {
              "op": "ADD",
              "path": "public.image_capitol",
              "value": 2
            },
            {
              "op": "ADD",
              "path": "sponsor.interest",
              "value": 2
            },
            {
              "op": "SET_FLAG",
              "path": "parade_confident"
            }
          ],
          "response_text": "No aparté la mirada. Durante unos segundos, decidí que no serían ellos quienes me hicieran bajar la cabeza.",
          "journal_tag": null,
          "journal_text": "La avenida estaba llena de voces y luces. Sostuve la mirada del público y sentí cómo cambiaba su atención. No podía controlar lo que pensaban, pero sí cómo me presentaba ante ellos.",
          "journal_entry_id": "74.diary.74_parade.74_parade_o1",
          "echo": null,
          "echo_note": "refuerza la descripción de reacción pública ya contemplada por el juego.",
          "transfer_note": null,
          "label_anexo": "Sostener la mirada del público"
        },
        {
          "option_id": "74_parade_o2",
          "label": "Compartir el momento con Peeta.",
          "source_effect": "rel_katniss_peeta +2; image_capitol +1; flag parade_pair_identity",
          "effects": [
            {
              "op": "ADD",
              "path": "rel.katniss_peeta",
              "value": 2
            },
            {
              "op": "ADD",
              "path": "public.image_capitol",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "parade_pair_identity"
            }
          ],
          "response_text": "No estábamos allí por las mismas razones, pero en aquel instante compartimos el centro de todas las miradas.",
          "journal_tag": null,
          "journal_text": "Compartí el momento con Peeta. El gesto nos presentó juntos ante el público y convirtió a los dos tributos del Distrito 12 en una imagen que el Capitolio podía recordar.",
          "journal_entry_id": "74.diary.74_parade.74_parade_o2",
          "echo": null,
          "echo_note": "imagen pública conjunta y contexto para el sistema de patrocinadores existente.",
          "transfer_note": null,
          "label_anexo": "Compartir el momento con Peeta"
        },
        {
          "option_id": "74_parade_o3",
          "label": "Seguir las indicaciones de Cinna.",
          "source_effect": "flag parade_trust_team",
          "effects": [
            {
              "op": "SET_FLAG",
              "path": "parade_trust_team"
            }
          ],
          "response_text": "Confié en las indicaciones de Cinna y me concentré en mantener la compostura.",
          "journal_tag": null,
          "journal_text": "Seguí las indicaciones de Cinna durante el desfile. Él conocía el espectáculo mejor que yo. Mi tarea era sostener la presentación sin perder de vista quién era.",
          "journal_entry_id": "74.diary.74_parade.74_parade_o3",
          "echo": null,
          "echo_note": "reconocimiento del trabajo del equipo al terminar el desfile.",
          "transfer_note": null,
          "label_anexo": "Seguir las indicaciones de Cinna"
        }
      ]
    },
    {
      "scene_id": "74_training",
      "sequence": 8,
      "title": "Aprender delante de todos",
      "location": "Centro de Entrenamiento.",
      "participants": "Katniss, Peeta, Haymitch, tributos, entrenadores, Vigilantes.",
      "location_id": null,
      "text": "El Centro de Entrenamiento está dividido en estaciones. Katniss comprende que entrenar no consiste solo en mejorar: también debe decidir qué mostrar y qué reservar. Haymitch le aconseja que no convierta cada ejercicio en una demostración. Peeta se mueve entre las estaciones con facilidad social. Katniss observa a los tributos profesionales y estudia el espacio sin iniciar encuentros inventados.",
      "milestone": "El entrenamiento permite a los Vigilantes evaluar a los tributos.",
      "options": [
        {
          "option_id": "74_training_o1",
          "label": "Practicar tiro con arco.",
          "source_effect": "skill_archery +1; training_focus = archery; flag trained_archery",
          "effects": [
            {
              "op": "ADD",
              "path": "skill.archery",
              "value": 1
            },
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "archery"
            },
            {
              "op": "SET_FLAG",
              "path": "trained_archery"
            }
          ],
          "response_text": "El arco era una habilidad que conocía. Practicar delante de todos significaba decidir cuánto quería mostrar.",
          "journal_tag": null,
          "journal_text": "Elegí practicar tiro con arco. La familiaridad con el arma me dio cierta seguridad, aunque sabía que cada movimiento podía ser observado por otros tributos y por los Vigilantes.",
          "journal_entry_id": "74.diary.74_training.74_training_o1",
          "echo": null,
          "echo_note": "referencia a la práctica y atributo de arco solo si ya existe en el sistema.",
          "transfer_note": null,
          "label_anexo": "Practicar tiro con arco"
        },
        {
          "option_id": "74_training_o2",
          "label": "Practicar supervivencia y rastreo.",
          "source_effect": "skill_survival +1; training_focus = survival; flag trained_survival",
          "effects": [
            {
              "op": "ADD",
              "path": "skill.survival",
              "value": 1
            },
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "survival"
            },
            {
              "op": "SET_FLAG",
              "path": "trained_survival"
            }
          ],
          "response_text": "Quería concentrarme en lo que podía mantenerme viva fuera de una pelea.",
          "journal_tag": null,
          "journal_text": "Dediqué la sesión a supervivencia y rastreo. En la Arena no todo dependería de enfrentarse a alguien. Encontrar recursos y leer el entorno también podía marcar la diferencia.",
          "journal_entry_id": "74.diary.74_training.74_training_o2",
          "echo": null,
          "echo_note": "atributo de supervivencia solo si ya existe; no crear mecánica nueva.",
          "transfer_note": null,
          "label_anexo": "Practicar supervivencia y rastreo"
        },
        {
          "option_id": "74_training_o3",
          "label": "Observar estaciones y comportamientos.",
          "source_effect": "skill_observation +1; training_focus = observation; flag training_observed_others",
          "effects": [
            {
              "op": "ADD",
              "path": "skill.observation",
              "value": 1
            },
            {
              "op": "SET",
              "path": "campaign.training_focus",
              "value": "observation"
            },
            {
              "op": "SET_FLAG",
              "path": "training_observed_others"
            }
          ],
          "response_text": "Antes de decidir qué mostrar, preferí entender cómo se movían los demás.",
          "journal_tag": null,
          "journal_text": "Observé las estaciones y los comportamientos de los otros tributos. No inicié encuentros ni saqué conclusiones definitivas. Solo intenté aprender cómo funcionaba aquel espacio.",
          "journal_entry_id": "74.diary.74_training.74_training_o3",
          "echo": null,
          "echo_note": "inclinación de observación descriptiva; no revela estadísticas privadas de otros tributos.",
          "transfer_note": null,
          "label_anexo": "Observar estaciones y comportamientos"
        }
      ]
    },
    {
      "scene_id": "74_private_session",
      "sequence": 9,
      "title": "La sala de los Vigilantes",
      "location": "Sala de evaluación privada.",
      "participants": "Katniss, Vigilantes.",
      "location_id": null,
      "text": "La sala parece más grande cuando no hay público. Los Vigilantes esperan detrás de una mesa. Katniss recibe un tiempo limitado para mostrar lo que sabe hacer. No hay aplausos, solo observadores que anotan. Comprende que su actuación será convertida en una cifra que la seguirá hasta la Arena.",
      "milestone": "Katniss obtiene una puntuación extraordinariamente alta. La elección modifica la descripción de su actuación, no el hito canónico.",
      "options": [
        {
          "option_id": "74_private_o1",
          "label": "Demostrar precisión con el arco.",
          "source_effect": "private_session_result = exceptional; flag private_archery_display",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.private_session_result",
              "value": "exceptional"
            },
            {
              "op": "SET_FLAG",
              "path": "private_archery_display"
            }
          ],
          "response_text": "Elegí mostrar una habilidad que dominaba. El resultado sería de ellos, pero la demostración era mía.",
          "journal_tag": null,
          "journal_text": "En la sesión privada utilicé el arco para demostrar precisión. Los Vigilantes no reaccionaron como un público normal. Anotaron el resultado y me dejaron sin saber qué habían decidido.",
          "journal_entry_id": "74.diary.74_private_session.74_private_o1",
          "echo": null,
          "echo_note": "conserva el método de demostración. La puntuación canónica extraordinariamente alta se mantiene.",
          "transfer_note": null,
          "label_anexo": "Demostrar precisión con el arco"
        },
        {
          "option_id": "74_private_o2",
          "label": "Combinar precisión y lectura táctica.",
          "source_effect": "private_session_result = exceptional; flag private_tactical_display",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.private_session_result",
              "value": "exceptional"
            },
            {
              "op": "SET_FLAG",
              "path": "private_tactical_display"
            }
          ],
          "response_text": "No bastaba con acertar. Quería demostrar que también sabía evaluar una situación.",
          "journal_tag": null,
          "journal_text": "Combiné precisión y lectura táctica durante la sesión. Intenté mostrar que podía tomar decisiones y no limitarme a ejecutar un movimiento.",
          "journal_entry_id": "74.diary.74_private_session.74_private_o2",
          "echo": null,
          "echo_note": "modifica la descripción, no el valor canónico de la puntuación.",
          "transfer_note": null,
          "label_anexo": "Combinar precisión y lectura táctica"
        },
        {
          "option_id": "74_private_o3",
          "label": "Mantener la calma y reservar capacidades.",
          "source_effect": "private_session_result = strong; flag private_controlled_display",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.private_session_result",
              "value": "strong"
            },
            {
              "op": "SET_FLAG",
              "path": "private_controlled_display"
            }
          ],
          "response_text": "Mostré lo suficiente para que entendieran que no era una presa fácil, pero no todo lo que podía hacer.",
          "journal_tag": null,
          "journal_text": "Mantuve la calma y reservé parte de mis capacidades. Los Vigilantes tendrían que evaluar lo que habían visto. Yo no podía controlar su interpretación.",
          "journal_entry_id": "74.diary.74_private_session.74_private_o3",
          "echo": null,
          "echo_note": "matiza el recuerdo. La puntuación sigue siendo extraordinariamente alta en la ruta canónica.",
          "transfer_note": null,
          "label_anexo": "Mantener la calma y reservar capacidades"
        }
      ]
    },
    {
      "scene_id": "74_interview",
      "sequence": 10,
      "title": "Una historia ante millones",
      "location": "Escenario de entrevistas.",
      "participants": "Katniss, Caesar Flickerman, Peeta, Haymitch, público.",
      "location_id": null,
      "text": "Las luces convierten cada gesto en una declaración. Caesar recibe a Katniss con entusiasmo y formula preguntas aparentemente ligeras. Katniss sabe que cada respuesta puede convertirse en una etiqueta pública. No quiere ser una caricatura. Haymitch le ha explicado que la audiencia debe encontrar algo a lo que aferrarse.",
      "milestone": "La entrevista precede a la entrada en la Arena y construye imagen pública.",
      "options": [
        {
          "option_id": "74_interview_o1",
          "label": "Responder con sinceridad contenida.",
          "source_effect": "interview_tone = guarded; image_capitol +1; flag interview_honest",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.interview_tone",
              "value": "guarded"
            },
            {
              "op": "ADD",
              "path": "public.image_capitol",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "interview_honest"
            }
          ],
          "response_text": "Contesté sin adornar demasiado mis palabras. No quería que la entrevista hablara por mí.",
          "journal_tag": null,
          "journal_text": "Intenté responder con sinceridad sin entregar más de lo que estaba dispuesta a contar. Cada pregunta parecía sencilla hasta que recordaba cuántas personas estaban escuchando.",
          "journal_entry_id": "74.diary.74_interview.74_interview_o1",
          "echo": null,
          "echo_note": "tono público `guarded`.",
          "transfer_note": null,
          "label_anexo": "Responder con sinceridad contenida"
        },
        {
          "option_id": "74_interview_o2",
          "label": "Mostrar calidez.",
          "source_effect": "interview_tone = warm; sponsor_interest +2; flag interview_warm",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.interview_tone",
              "value": "warm"
            },
            {
              "op": "ADD",
              "path": "sponsor.interest",
              "value": 2
            },
            {
              "op": "SET_FLAG",
              "path": "interview_warm"
            }
          ],
          "response_text": "Permití que el público viera algo más que mi miedo y mi desconfianza.",
          "journal_tag": null,
          "journal_text": "Mostré calidez durante la entrevista. No significaba que confiara en el Capitolio, pero sí que podía decidir qué parte de mí quería presentar ante la audiencia.",
          "journal_entry_id": "74.diary.74_interview.74_interview_o2",
          "echo": null,
          "echo_note": "puede reflejarse en el interés de patrocinadores ya existente.",
          "transfer_note": null,
          "label_anexo": "Mostrar calidez"
        },
        {
          "option_id": "74_interview_o3",
          "label": "Responder con firmeza.",
          "source_effect": "interview_tone = defiant; image_capitol +1; flag interview_defiant",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.interview_tone",
              "value": "defiant"
            },
            {
              "op": "ADD",
              "path": "public.image_capitol",
              "value": 1
            },
            {
              "op": "SET_FLAG",
              "path": "interview_defiant"
            }
          ],
          "response_text": "No iba a permitir que cada pregunta me colocara en el papel que otros habían elegido.",
          "journal_tag": null,
          "journal_text": "Respondí con firmeza. Sabía que podían interpretar mis palabras como desafío, pero preferí no fingir una docilidad que no sentía.",
          "journal_entry_id": "74.diary.74_interview.74_interview_o3",
          "echo": null,
          "echo_note": "tono público `defiant`; no inicia una confrontación ni una consecuencia política nueva.",
          "transfer_note": null,
          "label_anexo": "Responder con firmeza"
        }
      ]
    },
    {
      "scene_id": "74_launch",
      "sequence": 11,
      "title": "El último ascensor",
      "location": "Sala de lanzamiento y plataforma.",
      "participants": "Katniss, personal técnico, voz de control.",
      "location_id": null,
      "text": "La sala de lanzamiento está fría. El uniforme ya no parece un vestuario. Katniss ocupa su plataforma. La cuenta atrás comienza. No hay público visible ni música de desfile, solo instrucciones y el sonido mecánico del sistema. Piensa en Prim. Después mira al frente. La plataforma empieza a elevarse.",
      "milestone": "Katniss entra en la Arena. Transición al módulo de Arena del 74.º ya existente; no añadir acontecimientos nuevos.",
      "options": [
        {
          "option_id": "74_launch_o1",
          "label": "Repasar prioridades de supervivencia.",
          "source_effect": "launch_plan = survival; flag launch_survival_focus",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.launch_plan",
              "value": "survival"
            },
            {
              "op": "SET_FLAG",
              "path": "launch_survival_focus"
            }
          ],
          "response_text": "Piensa en lo esencial. Mantenerte viva es lo primero; todo lo demás tendrá que esperar.",
          "journal_tag": null,
          "journal_text": "Mientras la plataforma se preparaba, repasé mis prioridades de supervivencia. No podía anticipar todo lo que encontraría, así que intenté concentrarme en las decisiones inmediatas.",
          "journal_entry_id": "74.diary.74_launch.74_launch_o1",
          "echo": null,
          "echo_note": null,
          "transfer_note": "`launch_plan=survival`.",
          "label_anexo": "Repasar prioridades de supervivencia"
        },
        {
          "option_id": "74_launch_o2",
          "label": "Recordar la promesa a tu familia.",
          "source_effect": "launch_plan = family; flag launch_family_focus",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.launch_plan",
              "value": "family"
            },
            {
              "op": "SET_FLAG",
              "path": "launch_family_focus"
            }
          ],
          "response_text": "Primero pensé en Prim y en mi madre. La promesa que había dejado atrás seguía conmigo.",
          "journal_tag": null,
          "journal_text": "Recordé a mi familia y las promesas que había hecho. No sabía qué podría cumplir desde la Arena, pero necesitaba conservar una razón para seguir adelante.",
          "journal_entry_id": "74.diary.74_launch.74_launch_o2",
          "echo": null,
          "echo_note": null,
          "transfer_note": "`launch_plan=family`. Si existe `gale_promise_explicit`, añadir una sola frase sobre esa promesa.",
          "label_anexo": "Recordar la promesa a tu familia"
        },
        {
          "option_id": "74_launch_o3",
          "label": "Prepararte para observar el terreno.",
          "source_effect": "launch_plan = observation; flag launch_observation_focus",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.launch_plan",
              "value": "observation"
            },
            {
              "op": "SET_FLAG",
              "path": "launch_observation_focus"
            }
          ],
          "response_text": "Mira antes de moverte. El terreno puede decidir tanto como cualquier adversario.",
          "journal_tag": null,
          "journal_text": "Me preparé para observar el terreno en cuanto la plataforma terminara de elevarse. No sabía qué encontraría, pero quería evitar actuar sin mirar.",
          "journal_entry_id": "74.diary.74_launch.74_launch_o3",
          "echo": null,
          "echo_note": null,
          "transfer_note": "`launch_plan=observation`.",
          "label_anexo": "Prepararte para observar el terreno"
        }
      ]
    }
  ]
}, variables: VARIABLES_74 });
