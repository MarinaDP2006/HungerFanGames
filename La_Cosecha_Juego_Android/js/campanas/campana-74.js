// GENERADO por scripts/importar-campana-74.mjs desde docs/fuentes/74_PreArena_11_Escenas_v1.md y docs/fuentes/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md y docs/fuentes/74_Revision_y_Ecos_v1.md.
// No editar a mano.
import { VARIABLES_74 } from '../precampana.js';

export const CAMPANA_74 = Object.freeze({ ...{
  "campaign_id": "campaign_74",
  "title": "74.º Juegos del Hambre · precampaña",
  "status": "APPROVED",
  "approval": "Activado el 27-11-2026 para la prueba de Nina; la aprobación definitiva es la suya en el PR",
  "source_version": "74-prearena-1.2-borrador",
  "source_ref": "docs/fuentes/74_PreArena_11_Escenas_v1.md",
  "annex_ref": "docs/fuentes/74_Diario_Respuestas_y_Transferencia_Arena_v1_1.md",
  "revision_ref": "docs/fuentes/74_Revision_y_Ecos_v1.md",
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
            "text": "Prim todavía intenta entender por qué lo hice. No tengo una explicación que pueda aliviarla.",
            "echo_id": "74.echo.prim_saw_katniss_protect",
            "flags": [
              "prim_saw_katniss_protect"
            ],
            "moment": "scene_start",
            "group": null,
            "placement_confirmed": true,
            "source": "anexo-1.1"
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
          "echo": {
            "echo_id": "74.echo.katniss_observed_ceremony",
            "scene_id": "74_arrival",
            "flags": [
              "katniss_observed_ceremony"
            ],
            "text": "La plaza del Distrito 12 no tenía nada de aquel orden brillante. Allí todos sabían quién los vigilaba; aquí, en cambio, hasta los pasillos parecen diseñados para que olvides que alguien está mirando.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al llegar al Capitolio.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
            "text": "No era la primera vez que lo veía aquel día. Eso no significa que sepa qué piensa.",
            "echo_id": "74.echo.first_recognition_peeta",
            "flags": [
              "first_recognition_peeta"
            ],
            "moment": "scene_start",
            "group": null,
            "placement_confirmed": true,
            "source": "anexo-1.1"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Buscar a Peeta entre la multitud"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_reaping.d1",
          "speaker": "Effie Trinket",
          "text": "Las damas primero.",
          "delivery_note": "sonriendo hacia la urna"
        },
        {
          "line_id": "74_reaping.d2",
          "speaker": "Effie Trinket",
          "text": "Primrose Everdeen.",
          "delivery_note": null
        },
        {
          "line_id": "74_reaping.d3",
          "speaker": "Katniss",
          "text": "¡Me ofrezco! ¡Me ofrezco voluntaria!",
          "delivery_note": "corriendo hacia el escenario"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.gale_promise_explicit",
            "scene_id": "74_launch",
            "flags": [
              "gale_promise_explicit"
            ],
            "text": "Pienso en Gale y en lo que le pedí antes de marcharme. Le confié a mi familia porque no tenía otra forma de protegerlas desde aquí. No sé qué habrá ocurrido desde entonces.",
            "moment": "scene_start",
            "group": "gale_promise",
            "placement": "mostrar en 74_launch.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.mother_responsibility_named",
            "scene_id": "74_launch",
            "flags": [
              "mother_responsibility_named"
            ],
            "text": "Le pedí a mi madre que volviera a estar junto a Prim. No sé si el miedo la dejará hacerlo, pero necesitaba pedírselo antes de que se cerrara aquella puerta.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en 74_launch.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.goodbye_without_words",
            "scene_id": "74_launch",
            "flags": [
              "goodbye_without_words"
            ],
            "text": "No dije nada más. Todavía recuerdo el abrazo y el momento en que tuvieron que separarnos. Hay despedidas que siguen pesando incluso cuando ya no queda nadie a quien abrazar.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en 74_launch.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Abrazar a Prim sin decir nada"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_goodbyes.d1",
          "speaker": "Prim",
          "text": "No tenías que hacerlo.",
          "delivery_note": "llorando"
        },
        {
          "line_id": "74_goodbyes.d2",
          "speaker": "Katniss",
          "text": "Sí tenía. Escúchame: no te apuntes a más teselas. Prométemelo.",
          "delivery_note": null
        },
        {
          "line_id": "74_goodbyes.d3",
          "speaker": "Gale",
          "text": "Me encargaré de que no les falte comida. Tú preocúpate de volver.",
          "delivery_note": "en voz baja"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.departure_observant",
            "scene_id": "74_arrival",
            "flags": [
              "departure_observant"
            ],
            "text": "Recuerdo el camino desde el Edificio de Justicia hasta la estación: los agentes, las salidas y los rostros que alcancé a distinguir. No sé si esos detalles servirán, pero no quiero olvidarlos.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante la llegada o el primer recorrido por el Capitolio.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.departure_composure",
            "scene_id": "74_train",
            "flags": [
              "departure_composure"
            ],
            "text": "Conté la respiración para no dejar que el miedo decidiera por mí. No hizo que desapareciera. Solo me permitió seguir caminando sin que se notara cuánto me costaba.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en el tren.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.departure_noticed_peeta",
            "scene_id": "74_train",
            "flags": [
              "departure_noticed_peeta"
            ],
            "text": "Vi a Peeta antes de subir. Ya había reparado en él durante la cosecha, aunque todavía no sé qué piensa de todo esto ni qué espera de mí.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en el tren.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Observar a Peeta sin hablar"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_departure.d1",
          "speaker": "Escolta",
          "text": "Por aquí. No se detenga.",
          "delivery_note": null
        },
        {
          "line_id": "74_departure.d2",
          "speaker": "Katniss",
          "text": "Solo un segundo.",
          "delivery_note": "mirando atrás"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.haymitch_practical_questions",
            "scene_id": "74_training",
            "flags": [
              "haymitch_practical_questions"
            ],
            "text": "En el tren le pedí a Haymitch respuestas concretas. No se convirtió por eso en alguien fácil de confiar, pero al menos entendió que no necesitaba consuelo: necesitaba aprender.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante el entrenamiento o una conversación posterior con Haymitch.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.train_peeta_opening",
            "scene_id": "74_training",
            "flags": [
              "train_peeta_opening"
            ],
            "text": "Le pregunté a Peeta cómo pensaba afrontar los Juegos. Aquella conversación no resolvió lo que nos esperaba, pero fue la primera vez que intenté conocer su manera de pensar en lugar de limitarme a verlo como al otro tributo.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante el entrenamiento.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.katniss_keeps_advantage_private",
            "scene_id": "74_training",
            "flags": [
              "katniss_keeps_advantage_private"
            ],
            "text": "En el tren preferí escuchar antes de enseñar mis cartas. Sigo pensando que no todos necesitan saber de qué soy capaz, y mucho menos antes de que empiecen los Juegos.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante el entrenamiento.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Escuchar sin revelar tus habilidades"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_train.d1",
          "speaker": "Effie Trinket",
          "text": "Mañana hay que causar buena impresión. Todo cuenta.",
          "delivery_note": null
        },
        {
          "line_id": "74_train.d2",
          "speaker": "Haymitch",
          "text": "Si queréis un consejo, ahí va: aceptad que vais a morir. Es más fácil.",
          "delivery_note": "con una copa en la mano"
        },
        {
          "line_id": "74_train.d3",
          "speaker": "Peeta",
          "text": "Entonces no nos sirve de nada. Dinos algo que sí nos sirva.",
          "delivery_note": null
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.capitol_layout_observed",
            "scene_id": "74_prep",
            "flags": [
              "capitol_layout_observed"
            ],
            "text": "Me fijé en los accesos, los pasillos y la distribución del complejo. Recordar cómo estaba organizado me ayuda a orientarme, aunque no significa que conozca rutas que nunca he recorrido.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante la exploración del complejo.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.arrival_stayed_near_peeta",
            "scene_id": "74_prep",
            "flags": [
              "arrival_stayed_near_peeta"
            ],
            "text": "Me mantuve cerca de Peeta al llegar. En medio de aquel lugar desconocido, reconocer a alguien del Distrito 12 resultaba más sencillo que decidir si podía confiar en él.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en una escena compartida con Peeta.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.arrival_guarded",
            "scene_id": "74_parade",
            "flags": [
              "arrival_guarded"
            ],
            "text": "En el Capitolio aprendí a contestar solo lo necesario. Una respuesta cortés podía bastar; no tenía por qué entregarles también lo que estaba pensando.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en la primera interacción pública posterior a la llegada.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Responder con cortesía breve"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_arrival.d1",
          "speaker": "Effie Trinket",
          "text": "Sonreíd. Os están mirando.",
          "delivery_note": null
        },
        {
          "line_id": "74_arrival.d2",
          "speaker": "Haymitch",
          "text": "Que os miren. Vosotros mirad todo lo demás.",
          "delivery_note": "aparte, a Katniss"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.cinna_trust",
            "scene_id": "74_parade",
            "flags": [
              "cinna_trust"
            ],
            "text": "Cinna no intentó convertirme en alguien distinta. Confié en su criterio porque parecía entender que la imagen que el Capitolio vería no tenía por qué borrar quién era yo.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante el desfile.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.district_identity_visible",
            "scene_id": "74_parade",
            "flags": [
              "district_identity_visible"
            ],
            "text": "Quise conservar algo que recordara de dónde venía. No sé si los demás lo notarán, pero no quiero que el espectáculo haga desaparecer al Distrito 12 detrás del vestuario.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en el diario o recuerdo previo al desfile.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.prep_controlled",
            "scene_id": "74_parade",
            "flags": [
              "prep_controlled"
            ],
            "text": "Dejé que terminaran la preparación sin fingir entusiasmo. Podía colaborar con el equipo sin olvidar que aquella presentación estaba pensada para convertirnos en algo que el Capitolio pudiera consumir.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar justo antes del desfile.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Aceptar el trabajo sin mostrar entusiasmo"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_prep.d1",
          "speaker": "Cinna",
          "text": "No voy a cambiar quién eres. Solo quiero que no puedan olvidarte.",
          "delivery_note": null
        },
        {
          "line_id": "74_prep.d2",
          "speaker": "Katniss",
          "text": "¿Y cómo piensas conseguirlo?",
          "delivery_note": null
        },
        {
          "line_id": "74_prep.d3",
          "speaker": "Cinna",
          "text": "Con fuego. No te preocupes, es de mentira.",
          "delivery_note": "sonriendo"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.parade_confident",
            "scene_id": "74_training",
            "flags": [
              "parade_confident"
            ],
            "text": "Sostuve la mirada de la multitud. No podía decidir lo que pensarían de mí, pero durante aquellos segundos sí pude decidir que no iba a bajar la cabeza.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la reacción del público.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.parade_pair_identity",
            "scene_id": "74_training",
            "flags": [
              "parade_pair_identity"
            ],
            "text": "Peeta y yo aparecimos juntos ante todos. No significaba que confiáramos el uno en el otro sin reservas, pero el Capitolio ya había encontrado una imagen que podía vender.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar en la siguiente escena pública compartida con Peeta.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.parade_trust_team",
            "scene_id": "74_training",
            "flags": [
              "parade_trust_team"
            ],
            "text": "Seguí las indicaciones de Cinna. Él sabía cómo funcionaba aquel espectáculo y yo necesitaba concentrarme en atravesarlo sin perderme dentro de la imagen que habían preparado.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al terminar el desfile.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Seguir las indicaciones de Cinna"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_parade.d1",
          "speaker": "Cinna",
          "text": "Levanta la barbilla. Que te vean.",
          "delivery_note": null
        },
        {
          "line_id": "74_parade.d2",
          "speaker": "Peeta",
          "text": "Si nos agarramos de la mano, no se fijarán en lo que tiemblan.",
          "delivery_note": "tendiéndole la mano"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.trained_archery",
            "scene_id": "74_private_session",
            "flags": [
              "trained_archery"
            ],
            "text": "Elegí practicar con el arco. Era algo que ya conocía, pero hacerlo delante de los demás significaba aceptar que los Vigilantes y los otros tributos podían fijarse en cada movimiento.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al volver a practicar o al hablar del entrenamiento.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.trained_survival",
            "scene_id": "74_launch",
            "flags": [
              "trained_survival"
            ],
            "text": "Dediqué tiempo a pensar en rastreo y supervivencia. No todo se resolvería enfrentándome a alguien; encontrar agua, leer el terreno y saber cuándo avanzar también importaría.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al hablar de preparación para la Arena.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.training_observed_others",
            "scene_id": "74_private_session",
            "flags": [
              "training_observed_others"
            ],
            "text": "Preferí observar las estaciones y a los demás tributos antes de acercarme. Vi cómo se movían, pero no puedo saber lo que piensan ni convertir unas pocas miradas en certezas.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar durante una observación posterior del Centro de Entrenamiento.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Observar estaciones y comportamientos"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_training.d1",
          "speaker": "Haymitch",
          "text": "No enseñes lo que sabes hacer con el arco. Guárdatelo para los Vigilantes.",
          "delivery_note": null
        },
        {
          "line_id": "74_training.d2",
          "speaker": "Peeta",
          "text": "Puedo levantar sacos de harina de cincuenta kilos. Algo es algo.",
          "delivery_note": "a medias en broma"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.private_archery_display",
            "scene_id": "74_interview",
            "flags": [
              "private_archery_display"
            ],
            "text": "Elegí demostrar mi precisión con el arco. Los Vigilantes no aplaudieron ni dieron explicaciones; solo anotaron lo que habían visto. La puntuación que vino después fue mucho más alta de lo que esperaba.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la sesión privada.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.private_tactical_display",
            "scene_id": "74_interview",
            "flags": [
              "private_tactical_display"
            ],
            "text": "Intenté demostrar que podía leer una situación además de acertar a un objetivo. No sé qué parte valoraron más los Vigilantes. Solo sé que mi actuación terminó con una puntuación extraordinariamente alta.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la sesión privada.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Combinar precisión y lectura táctica"
        },
        {
          "option_id": "74_private_o3",
          "label": "Mantener la calma y reservar capacidades.",
          "source_effect": "private_session_result = exceptional; flag private_controlled_display",
          "effects": [
            {
              "op": "SET",
              "path": "campaign.private_session_result",
              "value": "exceptional"
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
          "echo": {
            "echo_id": "74.echo.private_controlled_display",
            "scene_id": "74_interview",
            "flags": [
              "private_controlled_display"
            ],
            "text": "Reservé parte de mis capacidades y mantuve la calma. Aun así, los Vigilantes me dieron una puntuación extraordinariamente alta. Mostrar menos no cambió el resultado que ahora todos conocen.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la sesión privada.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Mantener la calma y reservar capacidades",
          "source_effect_original": "private_session_result = strong; flag private_controlled_display",
          "amendment": "Revisión 27-11-2026, pregunta 2: las tres opciones conservan la puntuación extraordinaria"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_private_session.d1",
          "speaker": "Vigilante",
          "text": "Katniss Everdeen, Distrito 12. Cuando quiera.",
          "delivery_note": "sin levantar la vista"
        },
        {
          "line_id": "74_private_session.d2",
          "speaker": "Katniss",
          "text": "Gracias por su atención.",
          "delivery_note": "con la flecha aún vibrando"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.interview_honest",
            "scene_id": "74_launch",
            "flags": [
              "interview_honest"
            ],
            "text": "Intenté responder con sinceridad sin contar más de lo necesario. Las cámaras podían convertir cualquier palabra en una historia, pero al menos procuré que aquella no fuera completamente ajena a mí.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la entrevista.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.interview_warm",
            "scene_id": "74_launch",
            "flags": [
              "interview_warm"
            ],
            "text": "Dejé que vieran algo más que mi desconfianza. Mostrar calidez no significaba confiar en el Capitolio; significaba decidir qué parte de mí podían conocer.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la entrevista o al tratar con el público.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
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
          "echo": {
            "echo_id": "74.echo.interview_defiant",
            "scene_id": "74_launch",
            "flags": [
              "interview_defiant"
            ],
            "text": "Respondí con firmeza y no intenté disfrazarlo. No estaba buscando una pelea con Caesar ni con el público, pero tampoco iba a aceptar cada papel que quisieran asignarme.",
            "moment": "scene_start",
            "group": null,
            "placement": "mostrar al recordar la entrevista.",
            "placement_confirmed": false,
            "source": "revision-74-2026-11-27"
          },
          "echo_note": null,
          "transfer_note": null,
          "label_anexo": "Responder con firmeza"
        }
      ],
      "dialogue": [
        {
          "line_id": "74_interview.d1",
          "speaker": "Caesar Flickerman",
          "text": "Katniss, la chica en llamas. ¿Qué te ha parecido el Capitolio?",
          "delivery_note": "al público"
        },
        {
          "line_id": "74_interview.d2",
          "speaker": "Katniss",
          "text": "Que todo huele a flores. Y que la comida es mucho mejor que en casa.",
          "delivery_note": null
        },
        {
          "line_id": "74_interview.d3",
          "speaker": "Caesar Flickerman",
          "text": "Háblanos de Prim. Todos la vimos aquel día.",
          "delivery_note": "bajando la voz"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
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
          "echo": {
            "echo_id": "74.echo.launch_family_focus+gale_promise_explicit",
            "scene_id": "74_launch",
            "flags": [
              "launch_family_focus",
              "gale_promise_explicit"
            ],
            "text": "También recuerdo lo que le pedí a Gale: que cuidara de Prim y de mi madre. No sé si podrá mantenerlas a salvo, pero esa promesa sigue conmigo.",
            "moment": "after_response",
            "group": "gale_promise",
            "placement": "añadir después del texto base del recuerdo familiar.",
            "placement_confirmed": true,
            "source": "revision-74-2026-11-27"
          },
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
      ],
      "dialogue": [
        {
          "line_id": "74_launch.d1",
          "speaker": "Voz de control",
          "text": "Sesenta segundos. Tributos, a sus plataformas.",
          "delivery_note": null
        },
        {
          "line_id": "74_launch.d2",
          "speaker": "Katniss",
          "text": "Prim, voy a volver.",
          "delivery_note": "en voz muy baja"
        }
      ],
      "player_prompt": null,
      "participant_ids": null
    }
  ]
}, variables: VARIABLES_74 });
