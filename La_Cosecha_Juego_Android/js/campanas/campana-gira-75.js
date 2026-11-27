// GENERADO por scripts/importar-gira-75.mjs desde docs/fuentes/Gira_75_Produccion_Narrativa_v1.md.
// No editar a mano. *_BORRADOR: el documento tal cual. GIRA y CAMPANA_75: versiones jugables con el complemento.
export const GIRA_BORRADOR = Object.freeze({
 "campaign_id": "campaign_gira",
 "title": "Gira de la Victoria",
 "status": "DRAFT_FOR_REVIEW",
 "source_version": "gira-75-narrativa-1.0",
 "source_ref": "docs/fuentes/Gira_75_Produccion_Narrativa_v1.md",
 "canon": "cinematográfico",
 "scenes": [
  {
   "scene_id": "tour_after_victory",
   "sequence": 1,
   "narrative_id": "GIRA-01",
   "title": "Después de la victoria",
   "location": "residencia de los vencedores, Distrito 12.",
   "participants": null,
   "moment": "días antes de partir.",
   "text": "La casa está demasiado silenciosa. Los objetos nuevos parecen pertenecer a otra familia. Katniss contempla el jardín desde una ventana. En el reflejo del cristal apenas reconoce a la muchacha que regresó de la Arena.\n\nPeeta llega con una caja pequeña: dentro hay pan recién hecho.\n\n**Peeta:** «No sabía qué traer. Pensé que quizá algo que no viniera envuelto en terciopelo sería un buen comienzo».  \n**Katniss:** «Aquí todo parece nuevo. Incluso el silencio».  \n**Peeta:** «No tienes que fingir conmigo».  \n**Katniss:** «No sé cuándo estoy fingiendo y cuándo no».\n\nHaymitch interrumpe para recordarles que la Gira no es una celebración. Cada gesto será observado y cada palabra puede ser usada contra ellos.",
   "dialogue": [
    {
     "speaker": "Peeta",
     "text": "No sabía qué traer. Pensé que quizá algo que no viniera envuelto en terciopelo sería un buen comienzo"
    },
    {
     "speaker": "Katniss",
     "text": "Aquí todo parece nuevo. Incluso el silencio"
    },
    {
     "speaker": "Peeta",
     "text": "No tienes que fingir conmigo"
    },
    {
     "speaker": "Katniss",
     "text": "No sé cuándo estoy fingiendo y cuándo no"
    }
   ],
   "options": [
    {
     "option_id": "tour_after_victory_o1",
     "letra": "A",
     "label": "Aceptar el pan y sentarse con Peeta.",
     "efecto_fuente": "`peeta_trust +`; diario: *Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.*",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "diario: *Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.*",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": "Peeta ofrece apoyo con mayor naturalidad en la preparación de la Gira.",
     "response_text": null
    },
    {
     "option_id": "tour_after_victory_o2",
     "letra": "B",
     "label": "Preguntar a Haymitch qué espera Snow.",
     "efecto_fuente": "`haymitch_trust +`; `capitol_suspicion` sin cambio.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion` sin cambio.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "Antes de cada respuesta, hay que averiguar quién está haciendo la pregunta.",
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_after_victory_o3",
     "letra": "C",
     "label": "Apartarse y revisar el equipo personal.",
     "efecto_fuente": "preparación emocional más fría; `journal_flags: self_reliance`.",
     "effects": [
      {
       "op": null,
       "fuente": "preparación emocional más fría",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "`journal_flags: self_reliance`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": "Katniss tiende a responder con más cautela en escenas públicas.",
     "response_text": null
    }
   ],
   "closing_text": "Haymitch deja claro que no pueden improvisar. El Capitolio necesita una historia convincente y ellos tendrán que representarla.",
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "La casa está llena de cosas nuevas y de silencios que no sé llenar",
   "journal_variation_note": "Añadir recuerdo de Peeta si se acepta el pan."
  },
  {
   "scene_id": "tour_departure",
   "sequence": 2,
   "narrative_id": "GIRA-02",
   "title": "La versión oficial",
   "location": "sala privada de preparación.",
   "participants": "Katniss, Peeta, Haymitch, Effie.",
   "moment": null,
   "text": "Effie ha preparado una lista de apariciones, vestuario y discursos. Haymitch insiste en que la historia del amor debe sostenerse sin fisuras.\n\n**Haymitch:** «No necesitan que os queráis. Necesitan que crean que os queréis. La diferencia puede manteneros vivos».  \n**Peeta:** «Y si no quiero mentir sobre todo?»  \n**Haymitch:** «Entonces aprende a elegir qué verdad puedes permitirte decir».",
   "dialogue": [
    {
     "speaker": "Haymitch",
     "text": "No necesitan que os queráis. Necesitan que crean que os queréis. La diferencia puede manteneros vivos"
    },
    {
     "speaker": "Peeta",
     "text": "Y si no quiero mentir sobre todo?"
    },
    {
     "speaker": "Haymitch",
     "text": "Entonces aprende a elegir qué verdad puedes permitirte decir"
    }
   ],
   "options": [
    {
     "option_id": "tour_departure_o1",
     "letra": "A",
     "label": "Acordar con Peeta una señal privada para apoyarse durante los actos.",
     "efecto_fuente": "`peeta_trust +`; desbloquea una línea de apoyo en Distrito 11 y Capitolio.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "desbloquea una línea de apoyo en Distrito 11 y Capitolio.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_departure_o2",
     "letra": "B",
     "label": "Pedir a Haymitch respuestas concretas para preguntas difíciles.",
     "efecto_fuente": "`haymitch_trust +`; desbloquea una opción de respuesta prudente en la entrevista pública.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "desbloquea una opción de respuesta prudente en la entrevista pública.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_departure_o3",
     "letra": "C",
     "label": "Rechazar ensayar sentimientos.",
     "efecto_fuente": "`journal_flags: refuses_script`; aumenta la tensión interpersonal, sin alterar la obligación de participar.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "refuses_script",
       "fuente": "`journal_flags: refuses_script`"
      },
      {
       "op": null,
       "fuente": "aumenta la tensión interpersonal, sin alterar la obligación de participar.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": "Effie guarda sus notas. Peeta mira a Katniss, esperando una señal. La gira empieza antes de subir al tren.",
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "El Capitolio quiere una historia sencilla. Mi vida nunca lo ha sido",
   "journal_variation_note": "Añadir señal privada si se acuerda con Peeta."
  },
  {
   "scene_id": "tour_district_11",
   "sequence": 3,
   "narrative_id": "GIRA-03",
   "title": "El Distrito 11 recuerda",
   "location": "plaza del Distrito 11.",
   "participants": "Katniss, Peeta, Effie, Haymitch, autoridades y habitantes.",
   "moment": null,
   "text": "La plaza está llena. La multitud no celebra. Katniss ve rostros agotados y comprende que el silencio no significa aceptación. Durante el acto, recuerda a Rue y Thresh.\n\nKatniss se aparta del discurso preparado.\n\n**Katniss:** «No estaría aquí si Rue no hubiera confiado en mí. No voy a fingir que su nombre es una parte más del espectáculo. Ella merecía volver a casa».  \n**Peeta:** «Y Thresh también. No olvidaremos lo que hicieron ni a quienes los esperaban».\n\nKatniss realiza un gesto de respeto hacia la multitud. Un habitante responde con el saludo de los tres dedos. La plaza lo imita. La reacción de los agentes es inmediata.",
   "dialogue": [
    {
     "speaker": "Katniss",
     "text": "No estaría aquí si Rue no hubiera confiado en mí. No voy a fingir que su nombre es una parte más del espectáculo. Ella merecía volver a casa"
    },
    {
     "speaker": "Peeta",
     "text": "Y Thresh también. No olvidaremos lo que hicieron ni a quienes los esperaban"
    }
   ],
   "options": [
    {
     "option_id": "tour_district_11_o1",
     "letra": "A",
     "label": "Hablar desde el recuerdo de Rue.",
     "efecto_fuente": "`public_sympathy +`; `district_solidarity +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "public_sympathy",
       "path": null,
       "value": null,
       "fuente": "`public_sympathy +`",
       "pendiente": "sin cifra"
      },
      {
       "op": "ADD",
       "variable": "district_solidarity",
       "path": null,
       "value": null,
       "fuente": "`district_solidarity +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion +`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "El nombre de Rue no pertenece al Capitolio.",
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_district_11_o2",
     "letra": "B",
     "label": "Incluir también el recuerdo de Thresh y su decisión de dejarla vivir.",
     "efecto_fuente": "`public_sympathy +`; `district_solidarity +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "public_sympathy",
       "path": null,
       "value": null,
       "fuente": "`public_sympathy +`",
       "pendiente": "sin cifra"
      },
      {
       "op": "ADD",
       "variable": "district_solidarity",
       "path": null,
       "value": null,
       "fuente": "`district_solidarity +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion +`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": "Peeta menciona la dignidad de ambos en una conversación posterior.",
     "response_text": null
    },
    {
     "option_id": "tour_district_11_o3",
     "letra": "C",
     "label": "Mantener el discurso breve para evitar que la multitud quede expuesta más tiempo.",
     "efecto_fuente": "reduce el incremento de `capitol_suspicion`; la solidaridad pública es más contenida.",
     "effects": [
      {
       "op": null,
       "fuente": "reduce el incremento de `capitol_suspicion`",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "la solidaridad pública es más contenida.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "A veces proteger a alguien significa no darle al poder una excusa inmediata.",
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": "La multitud expresa respeto y los agentes reprimen la respuesta. El acto deja de ser una ceremonia cómoda. El Capitolio registra el gesto como una señal peligrosa.",
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Rue merecía volver a casa. No permitiré que su nombre desaparezca",
   "journal_variation_note": "Añadir mención a Thresh si se elige la opción B."
  },
  {
   "scene_id": "tour_train",
   "sequence": 4,
   "narrative_id": "GIRA-04",
   "title": "El tren no es un refugio",
   "location": "tren de la Gira.",
   "participants": "Katniss, Peeta, Haymitch, Effie.",
   "moment": null,
   "text": "El tren avanza mientras los tres intentan comprender lo ocurrido. Peeta no quiere que el recuerdo de Rue se convierta en una herramienta política, pero sabe que el Capitolio ya lo ha convertido en una amenaza.\n\n**Peeta:** «No hiciste nada malo».  \n**Katniss:** «No es eso lo que me preocupa».  \n**Haymitch:** «Lo que importa ahora es lo que Snow crea que harás después».",
   "dialogue": [
    {
     "speaker": "Peeta",
     "text": "No hiciste nada malo"
    },
    {
     "speaker": "Katniss",
     "text": "No es eso lo que me preocupa"
    },
    {
     "speaker": "Haymitch",
     "text": "Lo que importa ahora es lo que Snow crea que harás después"
    }
   ],
   "options": [
    {
     "option_id": "tour_train_o1",
     "letra": "A",
     "label": "Reconocer ante Peeta que tienes miedo.",
     "efecto_fuente": "`peeta_trust +`; vínculo emocional más sólido.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "vínculo emocional más sólido.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_train_o2",
     "letra": "B",
     "label": "Pedir a Haymitch que explique qué señales está observando.",
     "efecto_fuente": "`haymitch_trust +`; añade una pista al diario sobre vigilancia.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "añade una pista al diario sobre vigilancia.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_train_o3",
     "letra": "C",
     "label": "Cambiar de tema y preparar el siguiente acto.",
     "efecto_fuente": "mantiene la compostura pública; diario: *El miedo no desaparece por no nombrarlo.*",
     "effects": [
      {
       "op": null,
       "fuente": "mantiene la compostura pública",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "diario: *El miedo no desaparece por no nombrarlo.*",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "El tren avanza, pero no nos aleja de lo que ha ocurrido",
   "journal_variation_note": "Añadir temor compartido si se habla con Peeta."
  },
  {
   "scene_id": "tour_districts",
   "sequence": 5,
   "narrative_id": "GIRA-05",
   "title": "El Distrito 8",
   "location": "zona industrial y plaza del Distrito 8.",
   "participants": "Katniss, Peeta, autoridades, habitantes.",
   "moment": null,
   "text": "El distrito está exhausto. El acto oficial transcurre bajo una vigilancia desproporcionada. Katniss distingue señales de descontento entre la multitud.\n\nTras la ceremonia, el recorrido permite ver la dureza de las condiciones de vida. La visita termina en un ambiente de tensión abierta.",
   "dialogue": [],
   "options": [
    {
     "option_id": "tour_districts_o1",
     "letra": "A",
     "label": "Responder con una frase de solidaridad, sin llamar a la rebelión.",
     "efecto_fuente": "`district_solidarity +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "district_solidarity",
       "path": null,
       "value": null,
       "fuente": "`district_solidarity +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion +`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "No hace falta pronunciar una consigna para que un distrito entienda que no está solo.",
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_districts_o2",
     "letra": "B",
     "label": "Dejar que Peeta hable y respaldarlo públicamente.",
     "efecto_fuente": "`peeta_trust +`; mejora la coordinación pública de la pareja.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "mejora la coordinación pública de la pareja.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_districts_o3",
     "letra": "C",
     "label": "Guardar silencio y observar la respuesta de los agentes.",
     "efecto_fuente": "se registra información de vigilancia en `journal_flags`; no altera el conocimiento de la Arena.",
     "effects": [
      {
       "op": null,
       "fuente": "se registra información de vigilancia en `journal_flags`",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "no altera el conocimiento de la Arena.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "El Capitolio también revela sus intenciones cuando cree que nadie lo mira.",
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": "La situación se vuelve violenta. El Capitolio responde con fuerza y la Gira deja de parecer una sucesión de actos ceremoniales.",
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "El silencio de un distrito puede ser más claro que cualquier discurso",
   "journal_variation_note": "Añadir observación sobre agentes si se elige C."
  },
  {
   "scene_id": "tour_private_pressure",
   "sequence": 6,
   "narrative_id": "GIRA-06",
   "title": "La advertencia de Snow",
   "location": "estancia privada del Capitolio.",
   "participants": "Katniss y el presidente Snow.",
   "moment": null,
   "text": "Snow recibe a Katniss en privado. Su cortesía es calculada. Le explica que la versión romántica de los Juegos debe resultar creíble para todos los distritos. No acepta que la muchacha se convierta en símbolo de desafío.\n\n**Snow:** «Una historia puede ser más peligrosa que un arma. Sobre todo cuando la gente decide creer en ella».  \n**Katniss:** «Yo solo quería salir viva».  \n**Snow:** «Y ahora hay personas que creen que les has enseñado algo».",
   "dialogue": [
    {
     "speaker": "Snow",
     "text": "Una historia puede ser más peligrosa que un arma. Sobre todo cuando la gente decide creer en ella"
    },
    {
     "speaker": "Katniss",
     "text": "Yo solo quería salir viva"
    },
    {
     "speaker": "Snow",
     "text": "Y ahora hay personas que creen que les has enseñado algo"
    }
   ],
   "options": [
    {
     "option_id": "tour_private_pressure_o1",
     "letra": "A",
     "label": "Insistir en que las acciones fueron por amor a Peeta.",
     "efecto_fuente": "sostiene la versión oficial; `capitol_suspicion` aumenta menos en esta escena.",
     "effects": [
      {
       "op": null,
       "fuente": "sostiene la versión oficial",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion` aumenta menos en esta escena.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "La mentira más peligrosa es la que otros necesitan que repitas.",
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_private_pressure_o2",
     "letra": "B",
     "label": "Preguntar qué ocurrirá con las personas que respondieron al saludo.",
     "efecto_fuente": "revela preocupación por los distritos; `capitol_suspicion +`.",
     "effects": [
      {
       "op": null,
       "fuente": "revela preocupación por los distritos",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion +`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": "Snow no necesita levantar la voz para demostrar que puede alcanzar a cualquiera.",
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_private_pressure_o3",
     "letra": "C",
     "label": "No ofrecerle ninguna explicación adicional.",
     "efecto_fuente": "tensión elevada; Haymitch deberá intervenir en una conversación posterior.",
     "effects": [
      {
       "op": null,
       "fuente": "tensión elevada",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "Haymitch deberá intervenir en una conversación posterior.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": "Snow deja claro que la supervivencia de Katniss y de quienes ama depende de que la historia pública se mantenga bajo control.",
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Snow no amenaza como los demás. Hace que la amenaza parezca una conversación",
   "journal_variation_note": "Variación según respuesta."
  },
  {
   "scene_id": "tour_aftermath",
   "sequence": 7,
   "narrative_id": "GIRA-07",
   "title": "Volver a casa no significa estar a salvo",
   "location": "Distrito 12.",
   "participants": "Katniss, Peeta, Haymitch, familia de Katniss.",
   "moment": null,
   "text": "La Gira termina, pero el Distrito 12 ya no parece igual. La presencia de agentes y la tensión social han aumentado. Katniss intenta volver a una rutina que ya no existe.",
   "dialogue": [],
   "options": [
    {
     "option_id": "tour_aftermath_o1",
     "letra": "A",
     "label": "Buscar a Peeta para hablar de lo que Snow ha exigido.",
     "efecto_fuente": "`peeta_trust +`; Peeta conoce el alcance de la amenaza.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "Peeta conoce el alcance de la amenaza.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_aftermath_o2",
     "letra": "B",
     "label": "Hablar con Haymitch sobre cómo proteger a sus familias.",
     "efecto_fuente": "`haymitch_trust +`; activa una nota de protección y cautela.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "activa una nota de protección y cautela.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_aftermath_o3",
     "letra": "C",
     "label": "Pasar tiempo con su familia sin hablar de política.",
     "efecto_fuente": "refuerza el ancla emocional; `journal_flags: family_anchor`.",
     "effects": [
      {
       "op": null,
       "fuente": "refuerza el ancla emocional",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "`journal_flags: family_anchor`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": "La noticia del anuncio presidencial interrumpe la aparente calma: el Capitolio va a revelar una decisión extraordinaria.",
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Volver a casa no significa recuperar la vida que tenía",
   "journal_variation_note": "Añadir ancla familiar si se elige C."
  },
  {
   "scene_id": "tour_quell_announcement",
   "sequence": 8,
   "narrative_id": "GIRA-08",
   "title": "El Vasallaje de los Veinticinco",
   "location": "emisión oficial del Capitolio.",
   "participants": "Katniss, Peeta, Haymitch, Effie, Snow en la emisión.",
   "moment": null,
   "text": "El Capitolio anuncia que, por tratarse del tercer Vasallaje de los Veinticinco, los tributos serán elegidos entre los vencedores vivos de cada distrito.\n\nKatniss comprende que la amenaza de Snow no era una advertencia vacía.\n\n**Peeta:** «No voy a dejar que vuelvas ahí sola».  \n**Katniss:** «No sabemos qué van a hacer».  \n**Haymitch:** «Sí lo sabemos. Solo falta saber a quién van a elegir».",
   "dialogue": [
    {
     "speaker": "Peeta",
     "text": "No voy a dejar que vuelvas ahí sola"
    },
    {
     "speaker": "Katniss",
     "text": "No sabemos qué van a hacer"
    },
    {
     "speaker": "Haymitch",
     "text": "Sí lo sabemos. Solo falta saber a quién van a elegir"
    }
   ],
   "options": [
    {
     "option_id": "tour_quell_announcement_o1",
     "letra": "A",
     "label": "Acordar con Peeta que intentaréis protegeros mutuamente.",
     "efecto_fuente": "`peeta_trust +`; marca `journal_flags: mutual_promise`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "marca `journal_flags: mutual_promise`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_quell_announcement_o2",
     "letra": "B",
     "label": "Pedir a Haymitch que busque cualquier resquicio en las reglas.",
     "efecto_fuente": "`haymitch_trust +`; marca `journal_flags: search_for_loophole`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "marca `journal_flags: search_for_loophole`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "tour_quell_announcement_o3",
     "letra": "C",
     "label": "Permanecer en silencio y prepararte para la cosecha.",
     "efecto_fuente": "marca `journal_flags: accepts_inevitable`; tono más introspectivo.",
     "effects": [
      {
       "op": null,
       "fuente": "marca `journal_flags: accepts_inevitable`",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "tono más introspectivo.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": "La pantalla se funde con la imagen de la papeleta de vencedores. El siguiente capítulo comienza con la cosecha del 75.º.",
   "scene_journal": null,
   "journal_base": "El Capitolio ha encontrado una forma de convertir la victoria en otra condena",
   "journal_variation_note": "Añadir promesa a Peeta o búsqueda de una salida."
  }
 ],
 "variables": []
});
export const CAMPANA_75_BORRADOR = Object.freeze({
 "campaign_id": "campaign_75",
 "title": "75.º Vasallaje de los Veinticinco · precampaña",
 "status": "DRAFT_FOR_REVIEW",
 "source_version": "gira-75-narrativa-1.0",
 "source_ref": "docs/fuentes/Gira_75_Produccion_Narrativa_v1.md",
 "canon": "cinematográfico",
 "scenes": [
  {
   "scene_id": "75_reaping",
   "sequence": 1,
   "narrative_id": "75-01",
   "title": "La cosecha de los vencedores",
   "location": "plaza del Distrito 12.",
   "participants": "Katniss, Peeta, Haymitch, Effie, autoridades.",
   "moment": null,
   "text": "La plaza está llena de vencedores y agentes. El sorteo ya no es una lotería ordinaria. Cada nombre representa una vida que el Capitolio vuelve a reclamar.\n\nHaymitch es seleccionado como vencedor masculino. Katniss sabe que no puede permitir que él vuelva a la Arena. Se ofrece voluntaria en su lugar. Peeta se presenta para ocupar el lugar de Haymitch.",
   "dialogue": [],
   "options": [
    {
     "option_id": "75_reaping_o1",
     "letra": "A",
     "label": "Buscar la mirada de Peeta antes de ofrecerte.",
     "efecto_fuente": "`peeta_trust +`; diálogo posterior más íntimo.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "diálogo posterior más íntimo.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_reaping_o2",
     "letra": "B",
     "label": "Mirar directamente a los agentes del Capitolio.",
     "efecto_fuente": "`capitol_suspicion +`; `public_sympathy +`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "capitol_suspicion",
       "path": null,
       "value": null,
       "fuente": "`capitol_suspicion +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`public_sympathy +`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_reaping_o3",
     "letra": "C",
     "label": "Concentrarte en Haymitch y en la decisión que acabas de tomar.",
     "efecto_fuente": "`haymitch_trust +`; diario: *No permitiré que otra persona pague por mí.*",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "diario: *No permitiré que otra persona pague por mí.*",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": "Katniss se ofrece por Haymitch. Peeta se presenta como tributo masculino. Ambos vuelven a ser enviados a los Juegos.",
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Me ofrecí antes de poder pensar en otra cosa",
   "journal_variation_note": "Variación según a quién mira Katniss."
  },
  {
   "scene_id": "75_train",
   "sequence": 2,
   "narrative_id": "75-02",
   "title": "Prepararse con los vencedores",
   "location": "tren hacia el Capitolio.",
   "participants": "Katniss, Peeta, Haymitch.",
   "moment": null,
   "text": "El ambiente es distinto al del 74.º. Todos los tributos conocen la Arena y saben lo que significa matar para sobrevivir. Haymitch explica que no deben confundir experiencia con seguridad.",
   "dialogue": [],
   "options": [
    {
     "option_id": "75_train_o1",
     "letra": "A",
     "label": "Preguntar a Haymitch qué vencedores podrían ser aliados.",
     "efecto_fuente": "`haymitch_trust +`; añade criterios de observación al diario.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "añade criterios de observación al diario.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_train_o2",
     "letra": "B",
     "label": "Hablar con Peeta sobre cómo manteneros coordinados.",
     "efecto_fuente": "`peeta_trust +`; activa apoyo mutuo.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "activa apoyo mutuo.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_train_o3",
     "letra": "C",
     "label": "Observar a los demás vencedores sin acercarte.",
     "efecto_fuente": "marca `journal_flags: victor_observation`; habilita descripciones adicionales al conocer a Finnick y Johanna.",
     "effects": [
      {
       "op": null,
       "fuente": "marca `journal_flags: victor_observation`",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "habilita descripciones adicionales al conocer a Finnick y Johanna.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Los vencedores conocen el precio. Eso no significa que puedan pagarlo otra vez",
   "journal_variation_note": "Variación según preparación."
  },
  {
   "scene_id": "75_training",
   "sequence": 3,
   "narrative_id": "75-03",
   "title": "Finnick Odair",
   "location": "centro de entrenamiento.",
   "participants": "Katniss, Finnick, Peeta.",
   "moment": null,
   "text": "Finnick se acerca con una actitud despreocupada que contrasta con la atención con la que observa cada movimiento. Su tridente parece una extensión de su brazo.\n\n**Finnick:** «La gente suele pensar que una sonrisa significa que no estás prestando atención».  \n**Katniss:** «Y tú pareces disfrutar de que lo piensen».  \n**Finnick:** «A veces es útil que te subestimen».",
   "dialogue": [
    {
     "speaker": "Finnick",
     "text": "La gente suele pensar que una sonrisa significa que no estás prestando atención"
    },
    {
     "speaker": "Katniss",
     "text": "Y tú pareces disfrutar de que lo piensen"
    },
    {
     "speaker": "Finnick",
     "text": "A veces es útil que te subestimen"
    }
   ],
   "options": [
    {
     "option_id": "75_training_o1",
     "letra": "A",
     "label": "Responder con ironía y mantener la distancia.",
     "efecto_fuente": "`finnick_trust` neutral; mantiene cautela.",
     "effects": [
      {
       "op": null,
       "fuente": "`finnick_trust` neutral",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "mantiene cautela.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_training_o2",
     "letra": "B",
     "label": "Preguntarle directamente qué busca.",
     "efecto_fuente": "`finnick_trust +` si el jugador ya mostró observación; de lo contrario, respuesta evasiva.",
     "effects": [
      {
       "op": "ADD",
       "variable": "finnick_trust",
       "path": null,
       "value": null,
       "fuente": "`finnick_trust +` si el jugador ya mostró observación",
       "pendiente": "sin cifra; condición o matiz: «si el jugador ya mostró observación»"
      },
      {
       "op": null,
       "fuente": "de lo contrario, respuesta evasiva.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_training_o3",
     "letra": "C",
     "label": "Preguntarle por Mags.",
     "efecto_fuente": "`finnick_trust +`; marca `journal_flags: noticed_mags_bond`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "finnick_trust",
       "path": null,
       "value": null,
       "fuente": "`finnick_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "marca `journal_flags: noticed_mags_bond`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": null,
   "consequence": "Finnick queda establecido como un vencedor complejo: carismático, hábil y difícil de leer. No se revela todavía todo lo que sabe.",
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Finnick sonríe como si el mundo no pudiera tocarlo. No le creo",
   "journal_variation_note": "Añadir nota sobre Mags si se pregunta por ella."
  },
  {
   "scene_id": "75_training_johanna",
   "sequence": 4,
   "narrative_id": "75-04",
   "title": "Johanna Mason",
   "location": "centro de entrenamiento, zona de armas.",
   "participants": "Katniss, Johanna, Peeta.",
   "moment": null,
   "text": "Johanna no intenta caer bien. Evalúa a Katniss con una franqueza agresiva y deja claro que no confía en las apariencias del Capitolio.\n\n**Johanna:** «No confundas mi mal humor con falta de criterio».  \n**Katniss:** «No estaba haciendo ninguna de las dos cosas».  \n**Johanna:** «Entonces quizá podamos soportarnos».",
   "dialogue": [
    {
     "speaker": "Johanna",
     "text": "No confundas mi mal humor con falta de criterio"
    },
    {
     "speaker": "Katniss",
     "text": "No estaba haciendo ninguna de las dos cosas"
    },
    {
     "speaker": "Johanna",
     "text": "Entonces quizá podamos soportarnos"
    }
   ],
   "options": [
    {
     "option_id": "75_training_johanna_o1",
     "letra": "A",
     "label": "Contestar con firmeza.",
     "efecto_fuente": "`journal_flags: johanna_respects_directness`.",
     "effects": [
      {
       "op": null,
       "fuente": "`journal_flags: johanna_respects_directness`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_training_johanna_o2",
     "letra": "B",
     "label": "No entrar en su provocación.",
     "efecto_fuente": "reduce tensión inmediata; Johanna sigue desconfiando.",
     "effects": [
      {
       "op": null,
       "fuente": "reduce tensión inmediata",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "Johanna sigue desconfiando.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_training_johanna_o3",
     "letra": "C",
     "label": "Preguntarle qué sabe de la Arena.",
     "efecto_fuente": "obtiene una advertencia general: los vencedores no deben confiar en que el escenario sea lo que parece.",
     "effects": [
      {
       "op": null,
       "fuente": "obtiene una advertencia general: los vencedores no deben confiar en que el escenario sea lo que parece.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Johanna no pide confianza. Quizá por eso resulta más fácil creerle",
   "journal_variation_note": "Variación según respuesta."
  },
  {
   "scene_id": "75_interview",
   "sequence": 5,
   "narrative_id": "75-05",
   "title": "La entrevista y el vestido",
   "location": "Capitolio, preparación de entrevistas.",
   "participants": "Katniss, Peeta, Cinna, Caesar Flickerman.",
   "moment": null,
   "text": "Cinna prepara a Katniss para una aparición que el Capitolio quiere convertir en espectáculo. El vestido no es solo vestuario: será una declaración visual. La entrevista reúne a los vencedores y hace visible su rechazo al destino que les han impuesto.",
   "dialogue": [],
   "options": [
    {
     "option_id": "75_interview_o1",
     "letra": "A",
     "label": "Aceptar el diseño de Cinna y confiar en su intención.",
     "efecto_fuente": "`journal_flags: trusts_cinna`; refuerza el vínculo con Cinna.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "trusts_cinna",
       "fuente": "`journal_flags: trusts_cinna`"
      },
      {
       "op": null,
       "fuente": "refuerza el vínculo con Cinna.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_interview_o2",
     "letra": "B",
     "label": "Preguntar qué mensaje puede transmitir el vestido sin ponerlo todo en palabras.",
     "efecto_fuente": "`public_sympathy +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "public_sympathy",
       "path": null,
       "value": null,
       "fuente": "`public_sympathy +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`capitol_suspicion +`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_interview_o3",
     "letra": "C",
     "label": "Pedir que la atención se centre en los vencedores como grupo.",
     "efecto_fuente": "`district_solidarity +`; fortalece la lectura colectiva de la escena.",
     "effects": [
      {
       "op": "ADD",
       "variable": "district_solidarity",
       "path": null,
       "value": null,
       "fuente": "`district_solidarity +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "fortalece la lectura colectiva de la escena.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": "La aparición de Katniss se convierte en un acto de desafío simbólico. El Capitolio responde con violencia contra Cinna antes de que Katniss entre en la Arena.",
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "Cinna sabe decir con tela lo que yo no puedo decir en voz alta",
   "journal_variation_note": "Añadir lectura política del vestido."
  },
  {
   "scene_id": "75_arena_launch",
   "sequence": 6,
   "narrative_id": "75-06",
   "title": "La última conversación",
   "location": "sala de preparación antes del lanzamiento.",
   "participants": "Katniss, Peeta, Haymitch.",
   "moment": null,
   "text": "Peeta intenta que Katniss no se consuma pensando en todas las posibilidades. Haymitch, por su parte, evita revelar más de lo que puede decir bajo vigilancia.\n\n**Peeta:** «No puedo prometerte que todo saldrá bien».  \n**Katniss:** «No te lo he pedido».  \n**Peeta:** «Entonces prométeme que no vas a decidir por los dos».  \n**Katniss:** «Lo intentaré».",
   "dialogue": [
    {
     "speaker": "Peeta",
     "text": "No puedo prometerte que todo saldrá bien"
    },
    {
     "speaker": "Katniss",
     "text": "No te lo he pedido"
    },
    {
     "speaker": "Peeta",
     "text": "Entonces prométeme que no vas a decidir por los dos"
    },
    {
     "speaker": "Katniss",
     "text": "Lo intentaré"
    }
   ],
   "options": [
    {
     "option_id": "75_arena_launch_o1",
     "letra": "A",
     "label": "Prometer a Peeta que escucharás sus decisiones.",
     "efecto_fuente": "`peeta_trust +`; `journal_flags: shared_decisions`.",
     "effects": [
      {
       "op": "ADD",
       "variable": "peeta_trust",
       "path": "rel.katniss_peeta",
       "value": null,
       "fuente": "`peeta_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "`journal_flags: shared_decisions`.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_arena_launch_o2",
     "letra": "B",
     "label": "Pedir a Haymitch que te diga qué no estás viendo.",
     "efecto_fuente": "`haymitch_trust +`; deja una pista sobre aliados potenciales.",
     "effects": [
      {
       "op": "ADD",
       "variable": "haymitch_trust",
       "path": "rel.katniss_haymitch",
       "value": null,
       "fuente": "`haymitch_trust +`",
       "pendiente": "sin cifra"
      },
      {
       "op": null,
       "fuente": "deja una pista sobre aliados potenciales.",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    },
    {
     "option_id": "75_arena_launch_o3",
     "letra": "C",
     "label": "No prometer nada que no puedas garantizar.",
     "efecto_fuente": "respuesta más contenida; diario: *Una promesa no sirve si se convierte en otra cadena.*",
     "effects": [
      {
       "op": null,
       "fuente": "respuesta más contenida",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      },
      {
       "op": null,
       "fuente": "diario: *Una promesa no sirve si se convierte en otra cadena.*",
       "pendiente": "efecto descrito en texto, sin regla aplicable"
      }
     ],
     "journal_text": null,
     "echo_note": null,
     "response_text": null
    }
   ],
   "closing_text": null,
   "fixed_consequence": null,
   "consequence": null,
   "campaign_end": null,
   "scene_journal": null,
   "journal_base": "No sé si las promesas sirven en la Arena. Aun así, algunas importan",
   "journal_variation_note": "Variación según compromiso."
  }
 ],
 "variables": []
});
// Escenas 75-07 a 75-15: contenido para los acontecimientos de Arena del 75.º que ya existen (no son escenas nuevas).
export const ARENA_75_BORRADOR = Object.freeze([
 {
  "turno": 1,
  "id": "campaigns.js · chapters[75][1]",
  "titulo": "Las plataformas de agua",
  "escenas": [
   "75-07"
  ],
  "contenido": [
   {
    "narrative_id": "75-07",
    "title": "La Arena del reloj",
    "location": "plataforma de lanzamiento y playa central.",
    "participants": "Katniss, tributos.",
    "moment": null,
    "text": "La plataforma emerge alrededor de una isla rodeada de agua. La playa parece abierta y expuesta. Katniss identifica la cornucopia, las zonas de vegetación y el anillo de sectores.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Priorizar un arma y salir de la playa.",
      "efecto_fuente": "recurso inicial ofensivo; aumenta exposición durante la salida.",
      "effects": [
       {
        "op": null,
        "fuente": "recurso inicial ofensivo",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "aumenta exposición durante la salida.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Priorizar una herramienta de supervivencia.",
      "efecto_fuente": "recurso utilitario; mejora la preparación para explorar.",
      "effects": [
       {
        "op": null,
        "fuente": "recurso utilitario",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "mejora la preparación para explorar.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Buscar primero la posición de Peeta.",
      "efecto_fuente": "refuerza `peeta_trust`; puede sacrificar una oportunidad de equipo.",
      "effects": [
       {
        "op": null,
        "fuente": "refuerza `peeta_trust`",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "puede sacrificar una oportunidad de equipo.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "La Arena se convierte en un espacio de supervivencia inmediata. La primera prioridad es salir de la zona abierta y entender el terreno.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "La playa parece abierta. La Arena nunca ofrece libertad",
    "journal_variation_note": "Registrar prioridad de equipo."
   }
  ]
 },
 {
  "turno": 2,
  "id": "app.js · evento 75, turno 2",
  "titulo": "Una conversación cifrada",
  "escenas": [
   "75-08"
  ],
  "contenido": [
   {
    "narrative_id": "75-08",
    "title": "La alianza",
    "location": "borde de la playa y zona selvática.",
    "participants": "Katniss, Peeta, Finnick, Mags.",
    "moment": null,
    "text": "Finnick propone una alianza. Katniss desconfía de su facilidad para hablar y de su aparente seguridad. Peeta entiende que sobrevivir puede depender de aceptar ayuda.\n\n**Finnick:** «No tenemos que gustarnos. Solo tenemos que seguir respirando el tiempo suficiente».  \n**Katniss:** «Y cuando ya no nos necesitemos?»  \n**Finnick:** «Entonces tendremos un problema para otro día».",
    "dialogue": [
     {
      "speaker": "Finnick",
      "text": "No tenemos que gustarnos. Solo tenemos que seguir respirando el tiempo suficiente"
     },
     {
      "speaker": "Katniss",
      "text": "Y cuando ya no nos necesitemos?"
     },
     {
      "speaker": "Finnick",
      "text": "Entonces tendremos un problema para otro día"
     }
    ],
    "options": [
     {
      "letra": "A",
      "label": "Aceptar la alianza provisional.",
      "efecto_fuente": "`alliance_cohesion +`; acceso a apoyo de Finnick y Mags.",
      "effects": [
       {
        "op": "ADD",
        "variable": "alliance_cohesion",
        "path": null,
        "value": null,
        "fuente": "`alliance_cohesion +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "acceso a apoyo de Finnick y Mags.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Aceptarla con condiciones claras.",
      "efecto_fuente": "`alliance_cohesion +` moderado; `finnick_trust +` si la conversación previa fue favorable.",
      "effects": [
       {
        "op": "ADD",
        "variable": "alliance_cohesion",
        "path": null,
        "value": null,
        "fuente": "`alliance_cohesion +` moderado",
        "pendiente": "sin cifra; condición o matiz: «moderado»"
       },
       {
        "op": "ADD",
        "variable": "finnick_trust",
        "path": null,
        "value": null,
        "fuente": "`finnick_trust +` si la conversación previa fue favorable.",
        "pendiente": "sin cifra; condición o matiz: «si la conversación previa fue favorable.»"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Rechazarla y mantener distancia.",
      "efecto_fuente": "conserva autonomía; reduce ayudas disponibles y dificulta escenas cooperativas.",
      "effects": [
       {
        "op": null,
        "fuente": "conserva autonomía",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "reduce ayudas disponibles y dificulta escenas cooperativas.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "La alianza con Finnick y Mags es la vía narrativa principal de esta versión. Si el jugador la rechaza, el grupo sigue coincidiendo por las circunstancias de la Arena, pero la cooperación será más fría y menos eficiente.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "Una alianza no es amistad. Hoy puede bastar",
    "journal_variation_note": "Registrar condiciones y confianza."
   }
  ]
 },
 {
  "turno": 3,
  "id": "app.js · evento 75, turno 3",
  "titulo": "La alianza de los vencedores",
  "escenas": [
   "75-08"
  ],
  "contenido": [
   {
    "narrative_id": "75-08",
    "title": "La alianza",
    "location": "borde de la playa y zona selvática.",
    "participants": "Katniss, Peeta, Finnick, Mags.",
    "moment": null,
    "text": "Finnick propone una alianza. Katniss desconfía de su facilidad para hablar y de su aparente seguridad. Peeta entiende que sobrevivir puede depender de aceptar ayuda.\n\n**Finnick:** «No tenemos que gustarnos. Solo tenemos que seguir respirando el tiempo suficiente».  \n**Katniss:** «Y cuando ya no nos necesitemos?»  \n**Finnick:** «Entonces tendremos un problema para otro día».",
    "dialogue": [
     {
      "speaker": "Finnick",
      "text": "No tenemos que gustarnos. Solo tenemos que seguir respirando el tiempo suficiente"
     },
     {
      "speaker": "Katniss",
      "text": "Y cuando ya no nos necesitemos?"
     },
     {
      "speaker": "Finnick",
      "text": "Entonces tendremos un problema para otro día"
     }
    ],
    "options": [
     {
      "letra": "A",
      "label": "Aceptar la alianza provisional.",
      "efecto_fuente": "`alliance_cohesion +`; acceso a apoyo de Finnick y Mags.",
      "effects": [
       {
        "op": "ADD",
        "variable": "alliance_cohesion",
        "path": null,
        "value": null,
        "fuente": "`alliance_cohesion +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "acceso a apoyo de Finnick y Mags.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Aceptarla con condiciones claras.",
      "efecto_fuente": "`alliance_cohesion +` moderado; `finnick_trust +` si la conversación previa fue favorable.",
      "effects": [
       {
        "op": "ADD",
        "variable": "alliance_cohesion",
        "path": null,
        "value": null,
        "fuente": "`alliance_cohesion +` moderado",
        "pendiente": "sin cifra; condición o matiz: «moderado»"
       },
       {
        "op": "ADD",
        "variable": "finnick_trust",
        "path": null,
        "value": null,
        "fuente": "`finnick_trust +` si la conversación previa fue favorable.",
        "pendiente": "sin cifra; condición o matiz: «si la conversación previa fue favorable.»"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Rechazarla y mantener distancia.",
      "efecto_fuente": "conserva autonomía; reduce ayudas disponibles y dificulta escenas cooperativas.",
      "effects": [
       {
        "op": null,
        "fuente": "conserva autonomía",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "reduce ayudas disponibles y dificulta escenas cooperativas.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "La alianza con Finnick y Mags es la vía narrativa principal de esta versión. Si el jugador la rechaza, el grupo sigue coincidiendo por las circunstancias de la Arena, pero la cooperación será más fría y menos eficiente.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "Una alianza no es amistad. Hoy puede bastar",
    "journal_variation_note": "Registrar condiciones y confianza."
   }
  ]
 },
 {
  "turno": 4,
  "id": "campaigns.js · chapters[75][4]",
  "titulo": "La niebla",
  "escenas": [
   "75-09",
   "75-10"
  ],
  "contenido": [
   {
    "narrative_id": "75-09",
    "title": "El primer sector",
    "location": "sector de la jungla.",
    "participants": "Katniss, Peeta, Finnick, Mags.",
    "moment": null,
    "text": "La humedad y el calor vuelven difícil avanzar. El grupo debe administrar agua, energía y heridas. Katniss empieza a notar que los sectores no se comportan como un entorno natural.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Mantener el ritmo del grupo.",
      "efecto_fuente": "`alliance_cohesion +`; menor desgaste colectivo.",
      "effects": [
       {
        "op": "ADD",
        "variable": "alliance_cohesion",
        "path": null,
        "value": null,
        "fuente": "`alliance_cohesion +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "menor desgaste colectivo.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Explorar el límite del sector.",
      "efecto_fuente": "`arena_knowledge +`; riesgo de fatiga.",
      "effects": [
       {
        "op": "ADD",
        "variable": "arena_knowledge",
        "path": null,
        "value": null,
        "fuente": "`arena_knowledge +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "riesgo de fatiga.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Priorizar el estado de Peeta.",
      "efecto_fuente": "`peeta_trust +`; el grupo pierde tiempo de exploración.",
      "effects": [
       {
        "op": "ADD",
        "variable": "peeta_trust",
        "path": "rel.katniss_peeta",
        "value": null,
        "fuente": "`peeta_trust +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "el grupo pierde tiempo de exploración.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": null,
    "consequence": "Se registra la primera sospecha de que la Arena funciona mediante un patrón. No se revela aún el mecanismo completo.",
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "El bosque tiene un ritmo que todavía no comprendo",
    "journal_variation_note": "Añadir observación del sector."
   },
   {
    "narrative_id": "75-10",
    "title": "La niebla",
    "location": "sector de la jungla, avance hacia terreno abierto.",
    "participants": "Katniss, Peeta, Finnick, Mags.",
    "moment": null,
    "text": "Una niebla venenosa avanza por la vegetación. El grupo corre, pero el terreno dificulta mantener a todos juntos. La exposición provoca dolor y lesiones.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Ayudar a Peeta a mantener el ritmo.",
      "efecto_fuente": "`peeta_trust +`; `injury_state` puede empeorar si el jugador ya está herido.",
      "effects": [
       {
        "op": "ADD",
        "variable": "peeta_trust",
        "path": "rel.katniss_peeta",
        "value": null,
        "fuente": "`peeta_trust +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "`injury_state` puede empeorar si el jugador ya está herido.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Seguir las indicaciones de Finnick para salir del área.",
      "efecto_fuente": "`finnick_trust +`; mejora la cohesión.",
      "effects": [
       {
        "op": "ADD",
        "variable": "finnick_trust",
        "path": null,
        "value": null,
        "fuente": "`finnick_trust +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "mejora la cohesión.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Buscar una ruta menos directa.",
      "efecto_fuente": "puede reducir la exposición si `arena_knowledge` es alto; de lo contrario, añade desgaste.",
      "effects": [
       {
        "op": null,
        "fuente": "puede reducir la exposición si `arena_knowledge` es alto",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "de lo contrario, añade desgaste.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "Mags se sacrifica para que los demás puedan escapar de la niebla. Su muerte es un acontecimiento canónico y no puede evitarse en esta versión.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": "Hay personas que toman una decisión en un instante y cambian para siempre la vida de quienes siguen caminando.",
    "journal_base": "Mags tomó una decisión por nosotros. No olvidaré lo que nos permitió hacer",
    "journal_variation_note": "Sin variación en el hecho central."
   }
  ]
 },
 {
  "turno": 5,
  "id": "app.js · evento 75, turno 5",
  "titulo": "El mecanismo del reloj",
  "escenas": [
   "75-11",
   "75-12"
  ],
  "contenido": [
   {
    "narrative_id": "75-11",
    "title": "Los otros vencedores",
    "location": "zona de árboles y borde de la playa.",
    "participants": "Katniss, Peeta, Finnick, Johanna, Beetee, Wiress.",
    "moment": null,
    "text": "El grupo se reúne con otros vencedores. Johanna desconfía de todos, Beetee observa la estructura de la Arena y Wiress intenta explicar que el lugar funciona como un reloj.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Escuchar a Wiress y observar los sectores.",
      "efecto_fuente": "`arena_knowledge +`; desbloquea una explicación más clara del ciclo.",
      "effects": [
       {
        "op": "ADD",
        "variable": "arena_knowledge",
        "path": null,
        "value": null,
        "fuente": "`arena_knowledge +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "desbloquea una explicación más clara del ciclo.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Preguntar a Beetee por el campo de fuerza.",
      "efecto_fuente": "`wire_plan_ready` en preparación; requiere cooperación posterior.",
      "effects": [
       {
        "op": null,
        "fuente": "`wire_plan_ready` en preparación",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "requiere cooperación posterior.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Pedir a Johanna que explique por qué ha decidido ayudar.",
      "efecto_fuente": "`journal_flags: johanna_motive_questioned`; su respuesta no revela todo el plan.",
      "effects": [
       {
        "op": "SET_FLAG",
        "path": "johanna_motive_questioned",
        "fuente": "`journal_flags: johanna_motive_questioned`"
       },
       {
        "op": null,
        "fuente": "su respuesta no revela todo el plan.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": null,
    "consequence": "La idea del reloj se vuelve una hipótesis operativa. Los sectores tienen peligros vinculados a franjas horarias.",
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "Los vencedores han aprendido a desconfiar. También han aprendido a reconocer el miedo",
    "journal_variation_note": "Añadir observación sobre Wiress o Beetee."
   },
   {
    "narrative_id": "75-12",
    "title": "El reloj se revela",
    "location": "playa y sectores adyacentes.",
    "participants": "Katniss, Peeta, Finnick, Beetee, Wiress, Johanna.",
    "moment": null,
    "text": "El grupo observa cómo los peligros se repiten en una secuencia. Wiress ayuda a identificar que cada sector corresponde a una hora. La Arena no es un bosque arbitrario: es una máquina diseñada para castigar a los tributos con precisión.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Confiar en la interpretación de Wiress.",
      "efecto_fuente": "`arena_knowledge +`; `alliance_cohesion +`.",
      "effects": [
       {
        "op": "ADD",
        "variable": "arena_knowledge",
        "path": null,
        "value": null,
        "fuente": "`arena_knowledge +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "`alliance_cohesion +`.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Pedir a Beetee que convierta la observación en un plan.",
      "efecto_fuente": "`wire_plan_ready +`; abre preparación táctica.",
      "effects": [
       {
        "op": "ADD",
        "variable": "wire_plan_ready",
        "path": null,
        "value": null,
        "fuente": "`wire_plan_ready +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "abre preparación táctica.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Mantener una ruta de retirada por si la teoría falla.",
      "efecto_fuente": "conserva una opción defensiva; consume tiempo y recursos.",
      "effects": [
       {
        "op": null,
        "fuente": "conserva una opción defensiva",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "consume tiempo y recursos.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "El grupo comprende la estructura temporal de la Arena. La información debe conservarse en el diario para futuras partidas y reanudaciones.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "La Arena es un reloj. Cada hora tiene dientes",
    "journal_variation_note": "Añadir descubrimiento del ciclo."
   }
  ]
 },
 {
  "turno": 6,
  "id": "app.js · evento 75, turno 6",
  "titulo": "El relámpago y el árbol",
  "escenas": [
   "75-13"
  ],
  "contenido": [
   {
    "narrative_id": "75-13",
    "title": "La propuesta de Beetee",
    "location": "sector de la playa, cerca del árbol y del campo de fuerza.",
    "participants": "Katniss, Beetee, Finnick, Peeta, Johanna.",
    "moment": null,
    "text": "Beetee plantea utilizar el cable y la tormenta para conducir una descarga hacia el campo de fuerza. La propuesta requiere coordinación y una ruta precisa. No todos conocen el objetivo real del plan.\n\n**Beetee:** «No hace falta destruir toda la Arena. Basta con encontrar el punto donde el sistema deja de protegerse a sí mismo».  \n**Katniss:** «Y si no funciona?»  \n**Beetee:** «Entonces habremos descubierto demasiado tarde que el Capitolio tenía razón sobre una cosa: aquí todo está diseñado para matarnos».",
    "dialogue": [
     {
      "speaker": "Beetee",
      "text": "No hace falta destruir toda la Arena. Basta con encontrar el punto donde el sistema deja de protegerse a sí mismo"
     },
     {
      "speaker": "Katniss",
      "text": "Y si no funciona?"
     },
     {
      "speaker": "Beetee",
      "text": "Entonces habremos descubierto demasiado tarde que el Capitolio tenía razón sobre una cosa: aquí todo está diseñado para matarnos"
     }
    ],
    "options": [
     {
      "letra": "A",
      "label": "Ayudar a Beetee a preparar el cable.",
      "efecto_fuente": "`wire_plan_ready +`; `arena_knowledge +`.",
      "effects": [
       {
        "op": "ADD",
        "variable": "wire_plan_ready",
        "path": null,
        "value": null,
        "fuente": "`wire_plan_ready +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "`arena_knowledge +`.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Mantenerte cerca de Peeta y proteger la retirada.",
      "efecto_fuente": "`peeta_trust +`; la preparación del cable depende más de Beetee y los aliados.",
      "effects": [
       {
        "op": "ADD",
        "variable": "peeta_trust",
        "path": "rel.katniss_peeta",
        "value": null,
        "fuente": "`peeta_trust +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "la preparación del cable depende más de Beetee y los aliados.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Vigilar a los demás vencedores mientras Beetee trabaja.",
      "efecto_fuente": "`alliance_cohesion +` si hay confianza; detecta tensiones antes del desenlace.",
      "effects": [
       {
        "op": "ADD",
        "variable": "alliance_cohesion",
        "path": null,
        "value": null,
        "fuente": "`alliance_cohesion +` si hay confianza",
        "pendiente": "sin cifra; condición o matiz: «si hay confianza»"
       },
       {
        "op": null,
        "fuente": "detecta tensiones antes del desenlace.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": null,
    "consequence": "El plan queda preparado, aunque Katniss no conoce todas sus implicaciones. La campaña debe mantener el misterio sobre quién está cooperando con los rebeldes.",
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "Beetee habla de electricidad. Yo solo puedo pensar en quién tendrá que acercarse al rayo",
    "journal_variation_note": "Registrar preparación del cable."
   }
  ]
 },
 {
  "turno": 7,
  "id": "campaigns.js · chapters[75][7]",
  "titulo": "Los charlajos",
  "escenas": [],
  "contenido": []
 },
 {
  "turno": 8,
  "id": "app.js · evento 75, turno 8",
  "titulo": "La ruptura del reloj",
  "escenas": [
   "75-14",
   "75-15"
  ],
  "contenido": [
   {
    "narrative_id": "75-14",
    "title": "Separación",
    "location": "distintos sectores de la Arena.",
    "participants": "Katniss, Peeta, Finnick, Johanna, Beetee.",
    "moment": null,
    "text": "La situación se desordena. Los aliados deben separarse para ejecutar el plan. Johanna actúa con urgencia y Katniss pierde el control de la situación. Peeta queda fuera de su alcance.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Intentar volver con Peeta.",
      "efecto_fuente": "`peeta_trust +`; aumenta el riesgo personal.",
      "effects": [
       {
        "op": "ADD",
        "variable": "peeta_trust",
        "path": "rel.katniss_peeta",
        "value": null,
        "fuente": "`peeta_trust +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "aumenta el riesgo personal.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Seguir la ruta acordada con Beetee.",
      "efecto_fuente": "`wire_plan_ready` se conserva; prioriza el objetivo colectivo.",
      "effects": [
       {
        "op": null,
        "fuente": "`wire_plan_ready` se conserva",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "prioriza el objetivo colectivo.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Buscar a Finnick para confirmar dónde está el grupo.",
      "efecto_fuente": "`finnick_trust +`; mejora la claridad de la escena final.",
      "effects": [
       {
        "op": "ADD",
        "variable": "finnick_trust",
        "path": null,
        "value": null,
        "fuente": "`finnick_trust +`",
        "pendiente": "sin cifra"
       },
       {
        "op": null,
        "fuente": "mejora la claridad de la escena final.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "Katniss acaba separada de Peeta. La extracción no se puede evitar y el destino de Peeta queda fuera de su control.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "El plan nos separa justo cuando más necesito saber dónde está Peeta",
    "journal_variation_note": "Variación según decisión."
   },
   {
    "narrative_id": "75-15",
    "title": "El rayo",
    "location": "árbol central y campo de fuerza.",
    "participants": "Katniss; presencia de los aliados según las rutas anteriores.",
    "moment": null,
    "text": "La tormenta se acerca. Katniss comprende que el cable y el rayo son parte de un plan que supera la supervivencia inmediata. Conecta el cable al punto indicado y dirige la descarga hacia el campo de fuerza.",
    "dialogue": [],
    "options": [
     {
      "letra": "A",
      "label": "Ejecutar el plan sin desviarte.",
      "efecto_fuente": "resolución principal; `wire_plan_ready` consumido de forma idempotente.",
      "effects": [
       {
        "op": null,
        "fuente": "resolución principal",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "`wire_plan_ready` consumido de forma idempotente.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "B",
      "label": "Detenerte un instante para confirmar la dirección del cable.",
      "efecto_fuente": "línea de tensión adicional; el resultado canónico se mantiene.",
      "effects": [
       {
        "op": null,
        "fuente": "línea de tensión adicional",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       },
       {
        "op": null,
        "fuente": "el resultado canónico se mantiene.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     },
     {
      "letra": "C",
      "label": "Pensar en Peeta antes de actuar.",
      "efecto_fuente": "`journal_flags: thinks_of_peeta`; añade una línea emocional al despertar.",
      "effects": [
       {
        "op": "SET_FLAG",
        "path": "thinks_of_peeta",
        "fuente": "`journal_flags: thinks_of_peeta`"
       },
       {
        "op": null,
        "fuente": "añade una línea emocional al despertar.",
        "pendiente": "efecto descrito en texto, sin regla aplicable"
       }
      ],
      "journal_text": null,
      "echo_note": null,
      "response_text": null
     }
    ],
    "closing_text": null,
    "fixed_consequence": "El campo de fuerza se rompe. Katniss es alcanzada por la explosión y pierde el conocimiento.",
    "consequence": null,
    "campaign_end": null,
    "scene_journal": null,
    "journal_base": "El cielo se abrió. No sé qué ha quedado en pie",
    "journal_variation_note": "Añadir pensamiento final sobre Peeta."
   }
  ]
 }
]);
// Escenas posteriores a la Arena (extracción y Distrito 12): sin lugar todavía en el motor.
export const DESPUES_ARENA_75_BORRADOR = Object.freeze([
 {
  "scene_id": "75_extraction_awakening",
  "narrative_id": "75-16",
  "title": "Despertar",
  "location": "aeronave rebelde.",
  "participants": "Katniss, Plutarch, Finnick, Haymitch.",
  "moment": null,
  "text": "Katniss despierta confundida. El entorno no pertenece al Capitolio. Haymitch está allí. Finnick también. Katniss comprende que algunos vencedores formaban parte de una operación para sacarla de la Arena.\n\n**Katniss:** «Peeta. ¿Dónde está Peeta?»  \nHaymitch no responde de inmediato.  \n**Katniss:** «No me mires así. Dime dónde está».  \n**Haymitch:** «No pudimos sacarlo».  \n**Katniss:** «Entonces volved».  \n**Haymitch:** «No podemos».",
  "dialogue": [
   {
    "speaker": "Katniss",
    "text": "Peeta. ¿Dónde está Peeta?"
   },
   {
    "speaker": "Katniss",
    "text": "No me mires así. Dime dónde está"
   },
   {
    "speaker": "Haymitch",
    "text": "No pudimos sacarlo"
   },
   {
    "speaker": "Katniss",
    "text": "Entonces volved"
   },
   {
    "speaker": "Haymitch",
    "text": "No podemos"
   }
  ],
  "options": [
   {
    "letra": "A",
    "label": "Exigir que intenten rescatar a Peeta inmediatamente.",
    "efecto_fuente": "`journal_flags: demands_rescue`; expresa el conflicto central.",
    "effects": [
     {
      "op": "SET_FLAG",
      "path": "demands_rescue",
      "fuente": "`journal_flags: demands_rescue`"
     },
     {
      "op": null,
      "fuente": "expresa el conflicto central.",
      "pendiente": "efecto descrito en texto, sin regla aplicable"
     }
    ],
    "journal_text": null,
    "echo_note": null,
    "response_text": null
   },
   {
    "letra": "B",
    "label": "Preguntar quién organizó la extracción.",
    "efecto_fuente": "abre información sobre la rebelión y Plutarch.",
    "effects": [
     {
      "op": null,
      "fuente": "abre información sobre la rebelión y Plutarch.",
      "pendiente": "efecto descrito en texto, sin regla aplicable"
     }
    ],
    "journal_text": null,
    "echo_note": null,
    "response_text": null
   },
   {
    "letra": "C",
    "label": "Preguntar por los demás vencedores.",
    "efecto_fuente": "obtiene información sobre los aliados rescatados y las pérdidas.",
    "effects": [
     {
      "op": null,
      "fuente": "obtiene información sobre los aliados rescatados y las pérdidas.",
      "pendiente": "efecto descrito en texto, sin regla aplicable"
     }
    ],
    "journal_text": null,
    "echo_note": null,
    "response_text": null
   }
  ],
  "closing_text": null,
  "fixed_consequence": "Katniss descubre que ha sido extraída por los rebeldes, pero Peeta ha sido capturado por el Capitolio.",
  "consequence": null,
  "campaign_end": null,
  "scene_journal": null,
  "journal_base": "Estoy fuera. Peeta no",
  "journal_variation_note": "Variación según reacción."
 },
 {
  "scene_id": "75_district12_destroyed",
  "narrative_id": "75-17",
  "title": "El Distrito 12 ya no existe",
  "location": "aeronave rebelde, observación aérea.",
  "participants": "Katniss, Haymitch, Finnick.",
  "moment": null,
  "text": "La aeronave se dirige hacia el Distrito 13. Katniss ve imágenes del Distrito 12 destruido. La escala de la represalia supera todo lo que había imaginado.",
  "dialogue": [],
  "options": [
   {
    "letra": "A",
    "label": "Preguntar por su familia.",
    "efecto_fuente": "`journal_flags: family_status_question`; la respuesta confirma la evacuación de quienes pudieron salir.",
    "effects": [
     {
      "op": "SET_FLAG",
      "path": "family_status_question",
      "fuente": "`journal_flags: family_status_question`"
     },
     {
      "op": null,
      "fuente": "la respuesta confirma la evacuación de quienes pudieron salir.",
      "pendiente": "efecto descrito en texto, sin regla aplicable"
     }
    ],
    "journal_text": null,
    "echo_note": null,
    "response_text": null
   },
   {
    "letra": "B",
    "label": "Preguntar por Peeta.",
    "efecto_fuente": "refuerza el objetivo emocional de la siguiente campaña.",
    "effects": [
     {
      "op": null,
      "fuente": "refuerza el objetivo emocional de la siguiente campaña.",
      "pendiente": "efecto descrito en texto, sin regla aplicable"
     }
    ],
    "journal_text": null,
    "echo_note": null,
    "response_text": null
   },
   {
    "letra": "C",
    "label": "No hablar y observar las ruinas.",
    "efecto_fuente": "diario: *El hogar puede desaparecer en una noche. La memoria no.*",
    "effects": [
     {
      "op": null,
      "fuente": "diario: *El hogar puede desaparecer en una noche. La memoria no.*",
      "pendiente": "efecto descrito en texto, sin regla aplicable"
     }
    ],
    "journal_text": null,
    "echo_note": null,
    "response_text": null
   }
  ],
  "closing_text": null,
  "fixed_consequence": null,
  "consequence": null,
  "campaign_end": "La aeronave continúa hacia el Distrito 13. Katniss ya no es solo una vencedora que el Capitolio quiere controlar. Se ha convertido en el símbolo que los rebeldes necesitan y que ella todavía no sabe si puede ser.\n\n**Pantalla final:** `CONTINUARÁ — REBELIÓN`.",
  "scene_journal": null,
  "journal_base": "El Distrito 12 ya no es un lugar al que pueda volver",
  "journal_variation_note": "Variación según pregunta final."
 }
]);
// Versiones JUGABLES (APPROVED): borrador + complemento (scripts/gira-75-complemento.mjs). La Gira encadena con el 75.º.
const VARIABLES = [{"path":"rel.katniss_peeta","type":"int","default":0},{"path":"rel.katniss_haymitch","type":"int","default":0},{"path":"sponsor.interest","type":"int","default":0}];
export const GIRA = Object.freeze({ ...{
 "campaign_id": "campaign_gira",
 "title": "Gira de la Victoria",
 "status": "APPROVED",
 "source_version": "gira-75-narrativa-1.0+complemento-1",
 "source_ref": "docs/fuentes/Gira_75_Produccion_Narrativa_v1.md",
 "approval": "Completado por Claude el 27-11-2026; aprobación de Nina en el PR",
 "transfer_id": "campaign_gira:v1",
 "next": "campaign_75",
 "scenes": [
  {
   "scene_id": "tour_after_victory",
   "narrative_id": "GIRA-01",
   "sequence": 1,
   "title": "Después de la victoria",
   "location": "residencia de los vencedores, Distrito 12.",
   "participants": null,
   "text": "La casa está demasiado silenciosa. Los objetos nuevos parecen pertenecer a otra familia. Katniss contempla el jardín desde una ventana. En el reflejo del cristal apenas reconoce a la muchacha que regresó de la Arena.\n\nPeeta llega con una caja pequeña: dentro hay pan recién hecho.\n\nPeeta: «No sabía qué traer. Pensé que quizá algo que no viniera envuelto en terciopelo sería un buen comienzo».\nKatniss: «Aquí todo parece nuevo. Incluso el silencio».\nPeeta: «No tienes que fingir conmigo».\nKatniss: «No sé cuándo estoy fingiendo y cuándo no».\n\nHaymitch interrumpe para recordarles que la Gira no es una celebración. Cada gesto será observado y cada palabra puede ser usada contra ellos.",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "La casa está llena de cosas nuevas y de silencios que no sé llenar",
   "options": [
    {
     "option_id": "tour_after_victory_o1",
     "label": "Aceptar el pan y sentarse con Peeta.",
     "source_effect": "`peeta_trust +`; diario: *Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.*",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Peeta deja el pan sobre la mesa y se sienta a tu lado sin decir nada. Por primera vez en semanas, el silencio no pesa.",
     "journal_text": "Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.",
     "journal_entry_id": "gira.diary.tour_after_victory.tour_after_victory_o1"
    },
    {
     "option_id": "tour_after_victory_o2",
     "label": "Preguntar a Haymitch qué espera Snow.",
     "source_effect": "`haymitch_trust +`; `capitol_suspicion` sin cambio.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch se sirve una copa antes de contestar. «Espera que le des las gracias. Y que sonrías mientras lo haces.»",
     "journal_text": "Antes de cada respuesta, hay que averiguar quién está haciendo la pregunta.",
     "journal_entry_id": "gira.diary.tour_after_victory.tour_after_victory_o2"
    },
    {
     "option_id": "tour_after_victory_o3",
     "label": "Apartarse y revisar el equipo personal.",
     "source_effect": "preparación emocional más fría; `journal_flags: self_reliance`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "self_reliance"
      }
     ],
     "response_text": "Revisas el arco, las cuerdas y las botas. Las manos saben qué hacer aunque la cabeza no lo sepa.",
     "journal_text": "Prefiero preparar lo que puedo tocar que pensar en lo que no puedo controlar.",
     "journal_entry_id": "gira.diary.tour_after_victory.tour_after_victory_o3"
    }
   ]
  },
  {
   "scene_id": "tour_departure",
   "narrative_id": "GIRA-02",
   "sequence": 2,
   "title": "La versión oficial",
   "location": "sala privada de preparación.",
   "participants": "Katniss, Peeta, Haymitch, Effie.",
   "text": "Effie ha preparado una lista de apariciones, vestuario y discursos. Haymitch insiste en que la historia del amor debe sostenerse sin fisuras.\n\nHaymitch: «No necesitan que os queráis. Necesitan que crean que os queréis. La diferencia puede manteneros vivos».\nPeeta: «Y si no quiero mentir sobre todo?»\nHaymitch: «Entonces aprende a elegir qué verdad puedes permitirte decir».",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "El Capitolio quiere una historia sencilla. Mi vida nunca lo ha sido",
   "options": [
    {
     "option_id": "tour_departure_o1",
     "label": "Acordar con Peeta una señal privada para apoyarse durante los actos.",
     "source_effect": "`peeta_trust +`; desbloquea una línea de apoyo en Distrito 11 y Capitolio.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Peeta te roza los dedos dos veces. «Así sabrás que sigo aquí.» Lo repites para no olvidarlo.",
     "journal_text": "Tenemos una señal que el Capitolio no puede leer.",
     "journal_entry_id": "gira.diary.tour_departure.tour_departure_o1"
    },
    {
     "option_id": "tour_departure_o2",
     "label": "Pedir a Haymitch respuestas concretas para preguntas difíciles.",
     "source_effect": "`haymitch_trust +`; desbloquea una opción de respuesta prudente en la entrevista pública.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch te hace preguntas incómodas hasta que tus respuestas dejan de sonar a defensa.",
     "journal_text": "Haymitch me ha enseñado a contestar sin entregar nada.",
     "journal_entry_id": "gira.diary.tour_departure.tour_departure_o2"
    },
    {
     "option_id": "tour_departure_o3",
     "label": "Rechazar ensayar sentimientos.",
     "source_effect": "`journal_flags: refuses_script`; aumenta la tensión interpersonal, sin alterar la obligación de participar.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "refuses_script"
      }
     ],
     "response_text": "Effie suspira; Haymitch no. «Ensaya o no, vas a subir al escenario igual.»",
     "journal_text": "No voy a fingir que siento lo que me ordenan sentir.",
     "journal_entry_id": "gira.diary.tour_departure.tour_departure_o3"
    }
   ]
  },
  {
   "scene_id": "tour_district_11",
   "narrative_id": "GIRA-03",
   "sequence": 3,
   "title": "El Distrito 11 recuerda",
   "location": "plaza del Distrito 11.",
   "participants": "Katniss, Peeta, Effie, Haymitch, autoridades y habitantes.",
   "text": "La plaza está llena. La multitud no celebra. Katniss ve rostros agotados y comprende que el silencio no significa aceptación. Durante el acto, recuerda a Rue y Thresh.\n\nKatniss se aparta del discurso preparado.\n\nKatniss: «No estaría aquí si Rue no hubiera confiado en mí. No voy a fingir que su nombre es una parte más del espectáculo. Ella merecía volver a casa».\nPeeta: «Y Thresh también. No olvidaremos lo que hicieron ni a quienes los esperaban».\n\nKatniss realiza un gesto de respeto hacia la multitud. Un habitante responde con el saludo de los tres dedos. La plaza lo imita. La reacción de los agentes es inmediata.",
   "milestone": "La multitud expresa respeto y los agentes reprimen la respuesta. El acto deja de ser una ceremonia cómoda. El Capitolio registra el gesto como una señal peligrosa.",
   "canon_correction": null,
   "journal_base": "Rue merecía volver a casa. No permitiré que su nombre desaparezca",
   "options": [
    {
     "option_id": "tour_district_11_o1",
     "label": "Hablar desde el recuerdo de Rue.",
     "source_effect": "`public_sympathy +`; `district_solidarity +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "public_sympathy"
      },
      {
       "op": "SET_FLAG",
       "path": "district_solidarity"
      },
      {
       "op": "SET_FLAG",
       "path": "capitol_suspicion"
      }
     ],
     "response_text": "Tu voz tiembla al decir su nombre, pero no se rompe. Alguien en la multitud empieza a silbar cuatro notas.",
     "journal_text": "El nombre de Rue no pertenece al Capitolio.",
     "journal_entry_id": "gira.diary.tour_district_11.tour_district_11_o1"
    },
    {
     "option_id": "tour_district_11_o2",
     "label": "Incluir también el recuerdo de Thresh y su decisión de dejarla vivir.",
     "source_effect": "`public_sympathy +`; `district_solidarity +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "public_sympathy"
      },
      {
       "op": "SET_FLAG",
       "path": "district_solidarity"
      },
      {
       "op": "SET_FLAG",
       "path": "capitol_suspicion"
      }
     ],
     "response_text": "La familia de Thresh levanta la vista. Sabes que acabas de pagar una deuda y de abrir otra.",
     "journal_text": "Thresh me dejó vivir. Su distrito también merecía oírlo.",
     "journal_entry_id": "gira.diary.tour_district_11.tour_district_11_o2"
    },
    {
     "option_id": "tour_district_11_o3",
     "label": "Mantener el discurso breve para evitar que la multitud quede expuesta más tiempo.",
     "source_effect": "reduce el incremento de `capitol_suspicion`; la solidaridad pública es más contenida.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_tour_district_11_o3"
      }
     ],
     "response_text": "Cortas el discurso a tiempo. Aun así, un anciano levanta tres dedos. Los agentes ya se mueven.",
     "journal_text": "A veces proteger a alguien significa no darle al poder una excusa inmediata.",
     "journal_entry_id": "gira.diary.tour_district_11.tour_district_11_o3"
    }
   ]
  },
  {
   "scene_id": "tour_train",
   "narrative_id": "GIRA-04",
   "sequence": 4,
   "title": "El tren no es un refugio",
   "location": "tren de la Gira.",
   "participants": "Katniss, Peeta, Haymitch, Effie.",
   "text": "El tren avanza mientras los tres intentan comprender lo ocurrido. Peeta no quiere que el recuerdo de Rue se convierta en una herramienta política, pero sabe que el Capitolio ya lo ha convertido en una amenaza.\n\nPeeta: «No hiciste nada malo».\nKatniss: «No es eso lo que me preocupa».\nHaymitch: «Lo que importa ahora es lo que Snow crea que harás después».",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "El tren avanza, pero no nos aleja de lo que ha ocurrido",
   "options": [
    {
     "option_id": "tour_train_o1",
     "label": "Reconocer ante Peeta que tienes miedo.",
     "source_effect": "`peeta_trust +`; vínculo emocional más sólido.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Peeta no intenta convencerte de que todo irá bien. Solo se queda contigo hasta que el temblor pasa.",
     "journal_text": "Decirlo en voz alta no lo hizo más pequeño, pero ya no lo cargo sola.",
     "journal_entry_id": "gira.diary.tour_train.tour_train_o1"
    },
    {
     "option_id": "tour_train_o2",
     "label": "Pedir a Haymitch que explique qué señales está observando.",
     "source_effect": "`haymitch_trust +`; añade una pista al diario sobre vigilancia.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch señala a los agentes nuevos en cada estación. «Cuando el Capitolio cambia la guardia, es que tiene miedo.»",
     "journal_text": "Más agentes en cada estación. El Capitolio está asustado.",
     "journal_entry_id": "gira.diary.tour_train.tour_train_o2"
    },
    {
     "option_id": "tour_train_o3",
     "label": "Cambiar de tema y preparar el siguiente acto.",
     "source_effect": "mantiene la compostura pública; diario: *El miedo no desaparece por no nombrarlo.*",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_tour_train_o3"
      }
     ],
     "response_text": "Repasas el siguiente discurso hasta sabértelo de memoria. Las palabras sirven de muro.",
     "journal_text": "El miedo no desaparece por no nombrarlo.",
     "journal_entry_id": "gira.diary.tour_train.tour_train_o3"
    }
   ]
  },
  {
   "scene_id": "tour_districts",
   "narrative_id": "GIRA-05",
   "sequence": 5,
   "title": "El Distrito 8",
   "location": "zona industrial y plaza del Distrito 8.",
   "participants": "Katniss, Peeta, autoridades, habitantes.",
   "text": "El distrito está exhausto. El acto oficial transcurre bajo una vigilancia desproporcionada. Katniss distingue señales de descontento entre la multitud.\n\nTras la ceremonia, el recorrido permite ver la dureza de las condiciones de vida. La visita termina en un ambiente de tensión abierta.",
   "milestone": "La situación se vuelve violenta. El Capitolio responde con fuerza y la Gira deja de parecer una sucesión de actos ceremoniales.",
   "canon_correction": null,
   "journal_base": "El silencio de un distrito puede ser más claro que cualquier discurso",
   "options": [
    {
     "option_id": "tour_districts_o1",
     "label": "Responder con una frase de solidaridad, sin llamar a la rebelión.",
     "source_effect": "`district_solidarity +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "district_solidarity"
      },
      {
       "op": "SET_FLAG",
       "path": "capitol_suspicion"
      }
     ],
     "response_text": "La frase apenas dura un instante, pero ves a una mujer apretar la mano de su hija.",
     "journal_text": "No hace falta pronunciar una consigna para que un distrito entienda que no está solo.",
     "journal_entry_id": "gira.diary.tour_districts.tour_districts_o1"
    },
    {
     "option_id": "tour_districts_o2",
     "label": "Dejar que Peeta hable y respaldarlo públicamente.",
     "source_effect": "`peeta_trust +`; mejora la coordinación pública de la pareja.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Peeta habla con calma y tú asientes a su lado. La multitud ve a dos vencedores que se sostienen.",
     "journal_text": "Cuando Peeta habla, la multitud respira.",
     "journal_entry_id": "gira.diary.tour_districts.tour_districts_o2"
    },
    {
     "option_id": "tour_districts_o3",
     "label": "Guardar silencio y observar la respuesta de los agentes.",
     "source_effect": "se registra información de vigilancia en `journal_flags`; no altera el conocimiento de la Arena.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_tour_districts_o3"
      }
     ],
     "response_text": "Cuentas los agentes, las salidas y los que no aplauden. Lo guardas todo.",
     "journal_text": "El Capitolio también revela sus intenciones cuando cree que nadie lo mira.",
     "journal_entry_id": "gira.diary.tour_districts.tour_districts_o3"
    }
   ]
  },
  {
   "scene_id": "tour_private_pressure",
   "narrative_id": "GIRA-06",
   "sequence": 6,
   "title": "La advertencia de Snow",
   "location": "estancia privada del Capitolio.",
   "participants": "Katniss y el presidente Snow.",
   "text": "Snow recibe a Katniss en privado. Su cortesía es calculada. Le explica que la versión romántica de los Juegos debe resultar creíble para todos los distritos. No acepta que la muchacha se convierta en símbolo de desafío.\n\nSnow: «Una historia puede ser más peligrosa que un arma. Sobre todo cuando la gente decide creer en ella».\nKatniss: «Yo solo quería salir viva».\nSnow: «Y ahora hay personas que creen que les has enseñado algo».",
   "milestone": "Snow deja claro que la supervivencia de Katniss y de quienes ama depende de que la historia pública se mantenga bajo control.",
   "canon_correction": null,
   "journal_base": "Snow no amenaza como los demás. Hace que la amenaza parezca una conversación",
   "options": [
    {
     "option_id": "tour_private_pressure_o1",
     "label": "Insistir en que las acciones fueron por amor a Peeta.",
     "source_effect": "sostiene la versión oficial; `capitol_suspicion` aumenta menos en esta escena.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_tour_private_pressure_o1"
      }
     ],
     "response_text": "Snow sonríe como quien escucha una respuesta correcta en un examen. «Convénceme también a mí.»",
     "journal_text": "La mentira más peligrosa es la que otros necesitan que repitas.",
     "journal_entry_id": "gira.diary.tour_private_pressure.tour_private_pressure_o1"
    },
    {
     "option_id": "tour_private_pressure_o2",
     "label": "Preguntar qué ocurrirá con las personas que respondieron al saludo.",
     "source_effect": "revela preocupación por los distritos; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "capitol_suspicion"
      }
     ],
     "response_text": "Snow no contesta enseguida. Esa pausa es la respuesta.",
     "journal_text": "Snow no necesita levantar la voz para demostrar que puede alcanzar a cualquiera.",
     "journal_entry_id": "gira.diary.tour_private_pressure.tour_private_pressure_o2"
    },
    {
     "option_id": "tour_private_pressure_o3",
     "label": "No ofrecerle ninguna explicación adicional.",
     "source_effect": "tensión elevada; Haymitch deberá intervenir en una conversación posterior.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_tour_private_pressure_o3"
      }
     ],
     "response_text": "Sostienes su mirada en silencio. Snow se marcha dejando tras de sí el olor de las rosas.",
     "journal_text": "No le di nada. Ni siquiera miedo, aunque lo tenía.",
     "journal_entry_id": "gira.diary.tour_private_pressure.tour_private_pressure_o3"
    }
   ]
  },
  {
   "scene_id": "tour_aftermath",
   "narrative_id": "GIRA-07",
   "sequence": 7,
   "title": "Volver a casa no significa estar a salvo",
   "location": "Distrito 12.",
   "participants": "Katniss, Peeta, Haymitch, familia de Katniss.",
   "text": "La Gira termina, pero el Distrito 12 ya no parece igual. La presencia de agentes y la tensión social han aumentado. Katniss intenta volver a una rutina que ya no existe.",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "Volver a casa no significa recuperar la vida que tenía",
   "options": [
    {
     "option_id": "tour_aftermath_o1",
     "label": "Buscar a Peeta para hablar de lo que Snow ha exigido.",
     "source_effect": "`peeta_trust +`; Peeta conoce el alcance de la amenaza.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Le cuentas a Peeta la amenaza entera. Él no se aparta. «Entonces lo afrontamos juntos.»",
     "journal_text": "Peeta ya sabe todo lo que Snow me exigió.",
     "journal_entry_id": "gira.diary.tour_aftermath.tour_aftermath_o1"
    },
    {
     "option_id": "tour_aftermath_o2",
     "label": "Hablar con Haymitch sobre cómo proteger a sus familias.",
     "source_effect": "`haymitch_trust +`; activa una nota de protección y cautela.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch se pone serio de verdad. «Primero, que nadie os vea asustados. Después, un plan.»",
     "journal_text": "Haymitch tiene un plan para nuestras familias. Aún no me lo ha contado entero.",
     "journal_entry_id": "gira.diary.tour_aftermath.tour_aftermath_o2"
    },
    {
     "option_id": "tour_aftermath_o3",
     "label": "Pasar tiempo con su familia sin hablar de política.",
     "source_effect": "refuerza el ancla emocional; `journal_flags: family_anchor`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "family_anchor"
      }
     ],
     "response_text": "Prim te enseña a la cabra nueva y tu madre prepara té. Durante una tarde, la Veta vuelve a ser casa.",
     "journal_text": "Mi familia es lo que no estoy dispuesta a perder.",
     "journal_entry_id": "gira.diary.tour_aftermath.tour_aftermath_o3"
    }
   ]
  },
  {
   "scene_id": "tour_quell_announcement",
   "narrative_id": "GIRA-08",
   "sequence": 8,
   "title": "El Vasallaje de los Veinticinco",
   "location": "emisión oficial del Capitolio.",
   "participants": "Katniss, Peeta, Haymitch, Effie, Snow en la emisión.",
   "text": "El Capitolio anuncia que, por tratarse del tercer Vasallaje de los Veinticinco, los tributos serán elegidos entre los vencedores vivos de cada distrito.\n\nKatniss comprende que la amenaza de Snow no era una advertencia vacía.\n\nPeeta: «No voy a dejar que vuelvas ahí sola».\nKatniss: «No sabemos qué van a hacer».\nHaymitch: «Sí lo sabemos. Solo falta saber a quién van a elegir».",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "El Capitolio ha encontrado una forma de convertir la victoria en otra condena",
   "options": [
    {
     "option_id": "tour_quell_announcement_o1",
     "label": "Acordar con Peeta que intentaréis protegeros mutuamente.",
     "source_effect": "`peeta_trust +`; marca `journal_flags: mutual_promise`.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      },
      {
       "op": "SET_FLAG",
       "path": "mutual_promise"
      }
     ],
     "response_text": "Peeta te coge las manos. «Uno de los dos va a salir de ahí, y no voy a ser yo.» No le contestas.",
     "journal_text": "Nos prometimos protegernos. Ninguno de los dos piensa cumplirlo a medias.",
     "journal_entry_id": "gira.diary.tour_quell_announcement.tour_quell_announcement_o1"
    },
    {
     "option_id": "tour_quell_announcement_o2",
     "label": "Pedir a Haymitch que busque cualquier resquicio en las reglas.",
     "source_effect": "`haymitch_trust +`; marca `journal_flags: search_for_loophole`.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      },
      {
       "op": "SET_FLAG",
       "path": "search_for_loophole"
      }
     ],
     "response_text": "Haymitch ya está leyendo el reglamento cuando llegas. «Siempre hay una grieta. Solo hay que encontrarla.»",
     "journal_text": "Haymitch busca un resquicio en las reglas.",
     "journal_entry_id": "gira.diary.tour_quell_announcement.tour_quell_announcement_o2"
    },
    {
     "option_id": "tour_quell_announcement_o3",
     "label": "Permanecer en silencio y prepararte para la cosecha.",
     "source_effect": "marca `journal_flags: accepts_inevitable`; tono más introspectivo.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "accepts_inevitable"
      }
     ],
     "response_text": "Te sientas en el suelo de la cocina y respiras. Si tienes que volver, volverás sabiendo lo que es.",
     "journal_text": "Vuelvo a la Arena. Esta vez sé lo que me espera.",
     "journal_entry_id": "gira.diary.tour_quell_announcement.tour_quell_announcement_o3"
    }
   ]
  }
 ]
}, variables: VARIABLES });
export const CAMPANA_75 = Object.freeze({ ...{
 "campaign_id": "campaign_75",
 "title": "75.º Vasallaje de los Veinticinco · precampaña",
 "status": "APPROVED",
 "source_version": "gira-75-narrativa-1.0+complemento-1",
 "source_ref": "docs/fuentes/Gira_75_Produccion_Narrativa_v1.md",
 "approval": "Completado por Claude el 27-11-2026; aprobación de Nina en el PR",
 "transfer_id": "campaign_75:v1",
 "next": null,
 "scenes": [
  {
   "scene_id": "75_reaping",
   "narrative_id": "75-01",
   "sequence": 1,
   "title": "La cosecha de los vencedores",
   "location": "plaza del Distrito 12.",
   "participants": "Katniss, Peeta, Haymitch, Effie, autoridades.",
   "text": "La plaza está llena de vencedores y agentes. El sorteo ya no es una lotería ordinaria. Cada nombre representa una vida que el Capitolio vuelve a reclamar.\n\nEffie saca el único nombre posible de la urna de las mujeres: Katniss Everdeen. Después lee el de Haymitch. Antes de que él dé un paso, Peeta se ofrece voluntario para ocupar su lugar.",
   "milestone": "Katniss se ofrece por Haymitch. Peeta se presenta como tributo masculino. Ambos vuelven a ser enviados a los Juegos.",
   "canon_correction": "En la película, Katniss es la única vencedora del Distrito 12: no se ofrece voluntaria. Peeta se ofrece por Haymitch.",
   "journal_base": "Mi nombre era el único en la urna. Lo sabía, y aun así oírlo me dejó sin aire",
   "options": [
    {
     "option_id": "75_reaping_o1",
     "label": "Buscar la mirada de Peeta cuando se ofrece.",
     "source_effect": "`peeta_trust +`; diálogo posterior más íntimo.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Peeta te mira un segundo antes de avanzar. En ese segundo cabe todo lo que no podéis decir.",
     "journal_text": "Peeta eligió volver por mí antes de que nadie pudiera impedírselo.",
     "journal_entry_id": "75.diary.75_reaping.75_reaping_o1"
    },
    {
     "option_id": "75_reaping_o2",
     "label": "Mirar directamente a los agentes del Capitolio.",
     "source_effect": "`capitol_suspicion +`; `public_sympathy +`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "capitol_suspicion"
      },
      {
       "op": "SET_FLAG",
       "path": "public_sympathy"
      }
     ],
     "response_text": "Miras a los agentes de frente. Alguien en la plaza levanta tres dedos y lo bajan a golpes.",
     "journal_text": "Esta vez miré al Capitolio a los ojos.",
     "journal_entry_id": "75.diary.75_reaping.75_reaping_o2"
    },
    {
     "option_id": "75_reaping_o3",
     "label": "Concentrarte en Haymitch y en lo que Peeta acaba de hacer.",
     "source_effect": "`haymitch_trust +`; diario: *No permitiré que otra persona pague por mí.*",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch maldice en voz baja, pero no se mueve. Sabe que Peeta lo ha decidido hace tiempo.",
     "journal_text": "No permitiré que otra persona pague por mí.",
     "journal_entry_id": "75.diary.75_reaping.75_reaping_o3"
    }
   ]
  },
  {
   "scene_id": "75_train",
   "narrative_id": "75-02",
   "sequence": 2,
   "title": "Prepararse con los vencedores",
   "location": "tren hacia el Capitolio.",
   "participants": "Katniss, Peeta, Haymitch.",
   "text": "El ambiente es distinto al del 74.º. Todos los tributos conocen la Arena y saben lo que significa matar para sobrevivir. Haymitch explica que no deben confundir experiencia con seguridad.",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "Los vencedores conocen el precio. Eso no significa que puedan pagarlo otra vez",
   "options": [
    {
     "option_id": "75_train_o1",
     "label": "Preguntar a Haymitch qué vencedores podrían ser aliados.",
     "source_effect": "`haymitch_trust +`; añade criterios de observación al diario.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch nombra a Finnick, a Johanna, a Beetee y a Wiress. «No te gustarán. Pero te mantendrán viva.»",
     "journal_text": "Haymitch tiene una lista de aliados. No me gusta ninguno.",
     "journal_entry_id": "75.diary.75_train.75_train_o1"
    },
    {
     "option_id": "75_train_o2",
     "label": "Hablar con Peeta sobre cómo manteneros coordinados.",
     "source_effect": "`peeta_trust +`; activa apoyo mutuo.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      }
     ],
     "response_text": "Peeta propone una señal para cada peligro. Acabáis riéndoos de lo absurdo que suena, y eso ayuda.",
     "journal_text": "Peeta y yo tenemos un plan. Pequeño, pero nuestro.",
     "journal_entry_id": "75.diary.75_train.75_train_o2"
    },
    {
     "option_id": "75_train_o3",
     "label": "Observar a los demás vencedores sin acercarte.",
     "source_effect": "marca `journal_flags: victor_observation`; habilita descripciones adicionales al conocer a Finnick y Johanna.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "victor_observation"
      }
     ],
     "response_text": "Observas a los vencedores desde lejos: quién bebe, quién no duerme y quién sonríe demasiado.",
     "journal_text": "Todos los vencedores esconden algo. Yo también.",
     "journal_entry_id": "75.diary.75_train.75_train_o3"
    }
   ]
  },
  {
   "scene_id": "75_training",
   "narrative_id": "75-03",
   "sequence": 3,
   "title": "Finnick Odair",
   "location": "centro de entrenamiento.",
   "participants": "Katniss, Finnick, Peeta.",
   "text": "Finnick se acerca con una actitud despreocupada que contrasta con la atención con la que observa cada movimiento. Su tridente parece una extensión de su brazo.\n\nFinnick: «La gente suele pensar que una sonrisa significa que no estás prestando atención».\nKatniss: «Y tú pareces disfrutar de que lo piensen».\nFinnick: «A veces es útil que te subestimen».",
   "milestone": "Finnick queda establecido como un vencedor complejo: carismático, hábil y difícil de leer. No se revela todavía todo lo que sabe.",
   "canon_correction": null,
   "journal_base": "Finnick sonríe como si el mundo no pudiera tocarlo. No le creo",
   "options": [
    {
     "option_id": "75_training_o1",
     "label": "Responder con ironía y mantener la distancia.",
     "source_effect": "`finnick_trust` neutral; mantiene cautela.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_75_training_o1"
      }
     ],
     "response_text": "Finnick se ríe. «Me gusta. No te fías de nadie.» Se aleja sin dejar de mirarte.",
     "journal_text": "Finnick parece sincero. Eso me preocupa más.",
     "journal_entry_id": "75.diary.75_training.75_training_o1"
    },
    {
     "option_id": "75_training_o2",
     "label": "Preguntarle directamente qué busca.",
     "source_effect": "`finnick_trust +` si el jugador ya mostró observación; de lo contrario, respuesta evasiva.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "finnickTrusted"
      }
     ],
     "response_text": "Finnick deja de sonreír un instante. «Lo mismo que tú: salir de aquí con lo que queremos.»",
     "journal_text": "Finnick no respondió del todo, pero tampoco mintió.",
     "journal_entry_id": "75.diary.75_training.75_training_o2"
    },
    {
     "option_id": "75_training_o3",
     "label": "Preguntarle por Mags.",
     "source_effect": "`finnick_trust +`; marca `journal_flags: noticed_mags_bond`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "finnickTrusted"
      },
      {
       "op": "SET_FLAG",
       "path": "noticed_mags_bond"
      }
     ],
     "response_text": "Su voz cambia al hablar de Mags. «Ella me enseñó a nadar. Y a sobrevivir.»",
     "journal_text": "Finnick quiere a Mags. Ese es su punto débil y su verdad.",
     "journal_entry_id": "75.diary.75_training.75_training_o3"
    }
   ]
  },
  {
   "scene_id": "75_training_johanna",
   "narrative_id": "75-04",
   "sequence": 4,
   "title": "Johanna Mason",
   "location": "centro de entrenamiento, zona de armas.",
   "participants": "Katniss, Johanna, Peeta.",
   "text": "Johanna no intenta caer bien. Evalúa a Katniss con una franqueza agresiva y deja claro que no confía en las apariencias del Capitolio.\n\nJohanna: «No confundas mi mal humor con falta de criterio».\nKatniss: «No estaba haciendo ninguna de las dos cosas».\nJohanna: «Entonces quizá podamos soportarnos».",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "Johanna no pide confianza. Quizá por eso resulta más fácil creerle",
   "options": [
    {
     "option_id": "75_training_johanna_o1",
     "label": "Contestar con firmeza.",
     "source_effect": "`journal_flags: johanna_respects_directness`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "johanna_respects_directness"
      }
     ],
     "response_text": "Johanna levanta una ceja. «Vaya. Tiene dientes.» No sabes si es un insulto o un cumplido.",
     "journal_text": "Johanna respeta a quien le contesta.",
     "journal_entry_id": "75.diary.75_training_johanna.75_training_johanna_o1"
    },
    {
     "option_id": "75_training_johanna_o2",
     "label": "No entrar en su provocación.",
     "source_effect": "reduce tensión inmediata; Johanna sigue desconfiando.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_75_training_johanna_o2"
      }
     ],
     "response_text": "Johanna se aburre de ti en cuanto ve que no entras al trapo y se va a provocar a otro.",
     "journal_text": "No entré en el juego de Johanna. No sé si eso la convence o la aleja.",
     "journal_entry_id": "75.diary.75_training_johanna.75_training_johanna_o2"
    },
    {
     "option_id": "75_training_johanna_o3",
     "label": "Preguntarle qué sabe de la Arena.",
     "source_effect": "obtiene una advertencia general: los vencedores no deben confiar en que el escenario sea lo que parece.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_75_training_johanna_o3"
      }
     ],
     "response_text": "«Que nada es lo que parece», responde. «Ni la Arena, ni los aliados, ni los Vigilantes.»",
     "journal_text": "Johanna sabe algo de la Arena y no lo dice.",
     "journal_entry_id": "75.diary.75_training_johanna.75_training_johanna_o3"
    }
   ]
  },
  {
   "scene_id": "75_interview",
   "narrative_id": "75-05",
   "sequence": 5,
   "title": "La entrevista y el vestido",
   "location": "Capitolio, preparación de entrevistas.",
   "participants": "Katniss, Peeta, Cinna, Caesar Flickerman.",
   "text": "Cinna prepara a Katniss para una aparición que el Capitolio quiere convertir en espectáculo. El vestido no es solo vestuario: será una declaración visual. La entrevista reúne a los vencedores y hace visible su rechazo al destino que les han impuesto.",
   "milestone": "La aparición de Katniss se convierte en un acto de desafío simbólico. El Capitolio responde con violencia contra Cinna antes de que Katniss entre en la Arena.",
   "canon_correction": null,
   "journal_base": "Cinna sabe decir con tela lo que yo no puedo decir en voz alta",
   "options": [
    {
     "option_id": "75_interview_o1",
     "label": "Aceptar el diseño de Cinna y confiar en su intención.",
     "source_effect": "`journal_flags: trusts_cinna`; refuerza el vínculo con Cinna.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "trusts_cinna"
      }
     ],
     "response_text": "Cinna te coloca el vestido de novia y te pide que gires cuando llegue el momento. Confías en él.",
     "journal_text": "Cinna tiene un plan con el vestido. Me basta con eso.",
     "journal_entry_id": "75.diary.75_interview.75_interview_o1"
    },
    {
     "option_id": "75_interview_o2",
     "label": "Preguntar qué mensaje puede transmitir el vestido sin ponerlo todo en palabras.",
     "source_effect": "`public_sympathy +`; `capitol_suspicion +`.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "public_sympathy"
      },
      {
       "op": "SET_FLAG",
       "path": "capitol_suspicion"
      }
     ],
     "response_text": "«Que no te pueden quemar dos veces», responde Cinna. Sonríe, pero tiene los ojos tristes.",
     "journal_text": "Un vestido puede decir lo que yo no puedo.",
     "journal_entry_id": "75.diary.75_interview.75_interview_o2"
    },
    {
     "option_id": "75_interview_o3",
     "label": "Pedir que la atención se centre en los vencedores como grupo.",
     "source_effect": "`district_solidarity +`; fortalece la lectura colectiva de la escena.",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "district_solidarity"
      }
     ],
     "response_text": "Los vencedores se dan la mano en el escenario, en fila, delante de todo Panem. Las cámaras no saben dónde mirar.",
     "journal_text": "Por una noche, los vencedores fuimos un solo distrito.",
     "journal_entry_id": "75.diary.75_interview.75_interview_o3"
    }
   ]
  },
  {
   "scene_id": "75_arena_launch",
   "narrative_id": "75-06",
   "sequence": 6,
   "title": "La última conversación",
   "location": "sala de preparación antes del lanzamiento.",
   "participants": "Katniss, Peeta, Haymitch.",
   "text": "Peeta intenta que Katniss no se consuma pensando en todas las posibilidades. Haymitch, por su parte, evita revelar más de lo que puede decir bajo vigilancia.\n\nPeeta: «No puedo prometerte que todo saldrá bien».\nKatniss: «No te lo he pedido».\nPeeta: «Entonces prométeme que no vas a decidir por los dos».\nKatniss: «Lo intentaré».",
   "milestone": "",
   "canon_correction": null,
   "journal_base": "No sé si las promesas sirven en la Arena. Aun así, algunas importan",
   "options": [
    {
     "option_id": "75_arena_launch_o1",
     "label": "Prometer a Peeta que escucharás sus decisiones.",
     "source_effect": "`peeta_trust +`; `journal_flags: shared_decisions`.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_peeta",
       "value": 1
      },
      {
       "op": "SET_FLAG",
       "path": "shared_decisions"
      }
     ],
     "response_text": "Peeta asiente despacio. «Entonces decidiremos juntos.» El tubo se cierra antes de que puedas añadir nada.",
     "journal_text": "Le prometí a Peeta escucharle. Pienso cumplirlo.",
     "journal_entry_id": "75.diary.75_arena_launch.75_arena_launch_o1"
    },
    {
     "option_id": "75_arena_launch_o2",
     "label": "Pedir a Haymitch que te diga qué no estás viendo.",
     "source_effect": "`haymitch_trust +`; deja una pista sobre aliados potenciales.",
     "effects": [
      {
       "op": "ADD",
       "path": "rel.katniss_haymitch",
       "value": 1
      }
     ],
     "response_text": "Haymitch habla en voz baja: «Pase lo que pase, no te equivoques de enemigo.» No te dice nada más.",
     "journal_text": "No te equivoques de enemigo. Haymitch lo repitió dos veces.",
     "journal_entry_id": "75.diary.75_arena_launch.75_arena_launch_o2"
    },
    {
     "option_id": "75_arena_launch_o3",
     "label": "No prometer nada que no puedas garantizar.",
     "source_effect": "respuesta más contenida; diario: *Una promesa no sirve si se convierte en otra cadena.*",
     "effects": [
      {
       "op": "SET_FLAG",
       "path": "decision_75_arena_launch_o3"
      }
     ],
     "response_text": "No prometes nada. Peeta lo entiende, y eso duele más que una discusión.",
     "journal_text": "Una promesa no sirve si se convierte en otra cadena.",
     "journal_entry_id": "75.diary.75_arena_launch.75_arena_launch_o3"
    }
   ]
  }
 ]
}, variables: VARIABLES });
// Crónica de la Arena del 75.º por turno (amplía los acontecimientos existentes; no crea ninguno).
export const CRONICA_ARENA_75 = Object.freeze({
 "1": "La plataforma se eleva en mitad de un lago salado. En el centro, una isla con la Cornucopia y radios de tierra que se abren como las agujas de un reloj. El agua os rodea a todos, y Peeta no sabe nadar.",
 "2": "Finnick propone una alianza. Katniss desconfía de su facilidad para hablar y de su aparente seguridad. Peeta entiende que sobrevivir puede depender de aceptar ayuda.\n\nFinnick: «No tenemos que gustarnos. Solo tenemos que seguir respirando el tiempo suficiente».\nKatniss: «Y cuando ya no nos necesitemos?»\nFinnick: «Entonces tendremos un problema para otro día».",
 "4": "La humedad y el calor vuelven difícil avanzar. El grupo debe administrar agua, energía y heridas. Katniss empieza a notar que los sectores no se comportan como un entorno natural.\n\nUna niebla venenosa avanza por la vegetación. El grupo corre, pero el terreno dificulta mantener a todos juntos. La exposición provoca dolor y lesiones.",
 "5": "El grupo se reúne con otros vencedores. Johanna desconfía de todos, Beetee observa la estructura de la Arena y Wiress intenta explicar que el lugar funciona como un reloj.\n\nEl grupo observa cómo los peligros se repiten en una secuencia. Wiress ayuda a identificar que cada sector corresponde a una hora. La Arena no es un bosque arbitrario: es una máquina diseñada para castigar a los tributos con precisión.",
 "6": "Beetee plantea utilizar el cable y la tormenta para conducir una descarga hacia el campo de fuerza. La propuesta requiere coordinación y una ruta precisa. No todos conocen el objetivo real del plan.\n\nBeetee: «No hace falta destruir toda la Arena. Basta con encontrar el punto donde el sistema deja de protegerse a sí mismo».\nKatniss: «Y si no funciona?»\nBeetee: «Entonces habremos descubierto demasiado tarde que el Capitolio tenía razón sobre una cosa: aquí todo está diseñado para matarnos».",
 "8": "La situación se desordena. Los aliados deben separarse para ejecutar el plan. Johanna actúa con urgencia y Katniss pierde el control de la situación. Peeta queda fuera de su alcance."
});
