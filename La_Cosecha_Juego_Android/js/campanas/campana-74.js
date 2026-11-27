// GENERADO por scripts/importar-campana-74.mjs desde docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md.
// No editar a mano. Estado DRAFT_FOR_REVIEW: no se puede jugar hasta su aprobación.
// response_text, journal_tag y journal_text están vacíos porque la fuente no los incluye.
import { VARIABLES_74 } from '../precampana.js';

export const CAMPANA_74 = Object.freeze({ ...{
  "campaign_id": "74",
  "title": "74.º Juegos del Hambre · precampaña",
  "status": "DRAFT_FOR_REVIEW",
  "source_version": "Producción creativa 74 v1 · Versión creativa 1.0",
  "source_ref": "docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md",
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
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
          "response_text": null,
          "journal_tag": null,
          "journal_text": null
        }
      ]
    }
  ]
}, variables: VARIABLES_74 });
