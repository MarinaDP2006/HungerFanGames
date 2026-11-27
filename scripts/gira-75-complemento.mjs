// Complemento narrativo y técnico de la Gira y la precampaña del 75.º (Claude, 27-11-2026), aprobado por Nina en el PR.
// Completa lo que el documento v1.0 dejaba pendiente sin tocar su texto: respuesta inmediata de cada opción,
// diario de las opciones que no lo tenían, efectos con cifras y correcciones de canon cinematográfico.
//
// Reglas de efectos (sin variables nuevas, según la decisión de dirección):
//   peeta_trust +   → ADD rel.katniss_peeta 1     haymitch_trust + → ADD rel.katniss_haymitch 1
//   finnick_trust + → SET_FLAG finnickTrusted (el flag que ya usa la Arena del 75.º)
//   public_sympathy, capitol_suspicion, district_solidarity → SET_FLAG con ese nombre (sin medidores)
//   journal_flags: x → SET_FLAG x.  Una opción sin efecto aplicable deja su propio flag de decisión.
export const VALOR_ADD = 1;
export const FLAG_DE_VARIABLE = { finnick_trust: 'finnickTrusted', public_sympathy: 'public_sympathy', capitol_suspicion: 'capitol_suspicion', district_solidarity: 'district_solidarity', alliance_cohesion: 'alliance_cohesion', arena_knowledge: 'clockObserved' };

// Correcciones de canon (continuidad de las películas).
export const CORRECCIONES = {
  '75_reaping': {
    motivo: 'En la película, Katniss es la única vencedora del Distrito 12: no se ofrece voluntaria. Peeta se ofrece por Haymitch.',
    text: 'La plaza está llena de vencedores y agentes. El sorteo ya no es una lotería ordinaria. Cada nombre representa una vida que el Capitolio vuelve a reclamar.\n\nEffie saca el único nombre posible de la urna de las mujeres: Katniss Everdeen. Después lee el de Haymitch. Antes de que él dé un paso, Peeta se ofrece voluntario para ocupar su lugar.',
    journal_base: 'Mi nombre era el único en la urna. Lo sabía, y aun así oírlo me dejó sin aire',
    labels: { '75_reaping_o1': 'Buscar la mirada de Peeta cuando se ofrece.', '75_reaping_o3': 'Concentrarte en Haymitch y en lo que Peeta acaba de hacer.' },
  },
};

// option_id → [respuesta inmediata, diario (null si el documento ya lo trae)]
export const TEXTOS = {
  tour_after_victory_o1: ['Peeta deja el pan sobre la mesa y se sienta a tu lado sin decir nada. Por primera vez en semanas, el silencio no pesa.', 'Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.'],
  tour_after_victory_o2: ['Haymitch se sirve una copa antes de contestar. «Espera que le des las gracias. Y que sonrías mientras lo haces.»', null],
  tour_after_victory_o3: ['Revisas el arco, las cuerdas y las botas. Las manos saben qué hacer aunque la cabeza no lo sepa.', 'Prefiero preparar lo que puedo tocar que pensar en lo que no puedo controlar.'],
  tour_departure_o1: ['Peeta te roza los dedos dos veces. «Así sabrás que sigo aquí.» Lo repites para no olvidarlo.', 'Tenemos una señal que el Capitolio no puede leer.'],
  tour_departure_o2: ['Haymitch te hace preguntas incómodas hasta que tus respuestas dejan de sonar a defensa.', 'Haymitch me ha enseñado a contestar sin entregar nada.'],
  tour_departure_o3: ['Effie suspira; Haymitch no. «Ensaya o no, vas a subir al escenario igual.»', 'No voy a fingir que siento lo que me ordenan sentir.'],
  tour_district_11_o1: ['Tu voz tiembla al decir su nombre, pero no se rompe. Alguien en la multitud empieza a silbar cuatro notas.', null],
  tour_district_11_o2: ['La familia de Thresh levanta la vista. Sabes que acabas de pagar una deuda y de abrir otra.', 'Thresh me dejó vivir. Su distrito también merecía oírlo.'],
  tour_district_11_o3: ['Cortas el discurso a tiempo. Aun así, un anciano levanta tres dedos. Los agentes ya se mueven.', null],
  tour_train_o1: ['Peeta no intenta convencerte de que todo irá bien. Solo se queda contigo hasta que el temblor pasa.', 'Decirlo en voz alta no lo hizo más pequeño, pero ya no lo cargo sola.'],
  tour_train_o2: ['Haymitch señala a los agentes nuevos en cada estación. «Cuando el Capitolio cambia la guardia, es que tiene miedo.»', 'Más agentes en cada estación. El Capitolio está asustado.'],
  tour_train_o3: ['Repasas el siguiente discurso hasta sabértelo de memoria. Las palabras sirven de muro.', 'El miedo no desaparece por no nombrarlo.'],
  tour_districts_o1: ['La frase apenas dura un instante, pero ves a una mujer apretar la mano de su hija.', null],
  tour_districts_o2: ['Peeta habla con calma y tú asientes a su lado. La multitud ve a dos vencedores que se sostienen.', 'Cuando Peeta habla, la multitud respira.'],
  tour_districts_o3: ['Cuentas los agentes, las salidas y los que no aplauden. Lo guardas todo.', null],
  tour_private_pressure_o1: ['Snow sonríe como quien escucha una respuesta correcta en un examen. «Convénceme también a mí.»', null],
  tour_private_pressure_o2: ['Snow no contesta enseguida. Esa pausa es la respuesta.', null],
  tour_private_pressure_o3: ['Sostienes su mirada en silencio. Snow se marcha dejando tras de sí el olor de las rosas.', 'No le di nada. Ni siquiera miedo, aunque lo tenía.'],
  tour_aftermath_o1: ['Le cuentas a Peeta la amenaza entera. Él no se aparta. «Entonces lo afrontamos juntos.»', 'Peeta ya sabe todo lo que Snow me exigió.'],
  tour_aftermath_o2: ['Haymitch se pone serio de verdad. «Primero, que nadie os vea asustados. Después, un plan.»', 'Haymitch tiene un plan para nuestras familias. Aún no me lo ha contado entero.'],
  tour_aftermath_o3: ['Prim te enseña a la cabra nueva y tu madre prepara té. Durante una tarde, la Veta vuelve a ser casa.', 'Mi familia es lo que no estoy dispuesta a perder.'],
  tour_quell_announcement_o1: ['Peeta te coge las manos. «Uno de los dos va a salir de ahí, y no voy a ser yo.» No le contestas.', 'Nos prometimos protegernos. Ninguno de los dos piensa cumplirlo a medias.'],
  tour_quell_announcement_o2: ['Haymitch ya está leyendo el reglamento cuando llegas. «Siempre hay una grieta. Solo hay que encontrarla.»', 'Haymitch busca un resquicio en las reglas.'],
  tour_quell_announcement_o3: ['Te sientas en el suelo de la cocina y respiras. Si tienes que volver, volverás sabiendo lo que es.', 'Vuelvo a la Arena. Esta vez sé lo que me espera.'],
  '75_reaping_o1': ['Peeta te mira un segundo antes de avanzar. En ese segundo cabe todo lo que no podéis decir.', 'Peeta eligió volver por mí antes de que nadie pudiera impedírselo.'],
  '75_reaping_o2': ['Miras a los agentes de frente. Alguien en la plaza levanta tres dedos y lo bajan a golpes.', 'Esta vez miré al Capitolio a los ojos.'],
  '75_reaping_o3': ['Haymitch maldice en voz baja, pero no se mueve. Sabe que Peeta lo ha decidido hace tiempo.', 'No permitiré que otra persona pague por mí.'],
  '75_train_o1': ['Haymitch nombra a Finnick, a Johanna, a Beetee y a Wiress. «No te gustarán. Pero te mantendrán viva.»', 'Haymitch tiene una lista de aliados. No me gusta ninguno.'],
  '75_train_o2': ['Peeta propone una señal para cada peligro. Acabáis riéndoos de lo absurdo que suena, y eso ayuda.', 'Peeta y yo tenemos un plan. Pequeño, pero nuestro.'],
  '75_train_o3': ['Observas a los vencedores desde lejos: quién bebe, quién no duerme y quién sonríe demasiado.', 'Todos los vencedores esconden algo. Yo también.'],
  '75_training_o1': ['Finnick se ríe. «Me gusta. No te fías de nadie.» Se aleja sin dejar de mirarte.', 'Finnick parece sincero. Eso me preocupa más.'],
  '75_training_o2': ['Finnick deja de sonreír un instante. «Lo mismo que tú: salir de aquí con lo que queremos.»', 'Finnick no respondió del todo, pero tampoco mintió.'],
  '75_training_o3': ['Su voz cambia al hablar de Mags. «Ella me enseñó a nadar. Y a sobrevivir.»', 'Finnick quiere a Mags. Ese es su punto débil y su verdad.'],
  '75_training_johanna_o1': ['Johanna levanta una ceja. «Vaya. Tiene dientes.» No sabes si es un insulto o un cumplido.', 'Johanna respeta a quien le contesta.'],
  '75_training_johanna_o2': ['Johanna se aburre de ti en cuanto ve que no entras al trapo y se va a provocar a otro.', 'No entré en el juego de Johanna. No sé si eso la convence o la aleja.'],
  '75_training_johanna_o3': ['«Que nada es lo que parece», responde. «Ni la Arena, ni los aliados, ni los Vigilantes.»', 'Johanna sabe algo de la Arena y no lo dice.'],
  '75_interview_o1': ['Cinna te coloca el vestido de novia y te pide que gires cuando llegue el momento. Confías en él.', 'Cinna tiene un plan con el vestido. Me basta con eso.'],
  '75_interview_o2': ['«Que no te pueden quemar dos veces», responde Cinna. Sonríe, pero tiene los ojos tristes.', 'Un vestido puede decir lo que yo no puedo.'],
  '75_interview_o3': ['Los vencedores se dan la mano en el escenario, en fila, delante de todo Panem. Las cámaras no saben dónde mirar.', 'Por una noche, los vencedores fuimos un solo distrito.'],
  '75_arena_launch_o1': ['Peeta asiente despacio. «Entonces decidiremos juntos.» El tubo se cierra antes de que puedas añadir nada.', 'Le prometí a Peeta escucharle. Pienso cumplirlo.'],
  '75_arena_launch_o2': ['Haymitch habla en voz baja: «Pase lo que pase, no te equivoques de enemigo.» No te dice nada más.', 'No te equivoques de enemigo. Haymitch lo repitió dos veces.'],
  '75_arena_launch_o3': ['No prometes nada. Peeta lo entiende, y eso duele más que una discusión.', 'Una promesa no sirve si se convierte en otra cadena.'],
};

// Arena del 75.º: crónica que precede a cada acontecimiento existente (turno → escenas del documento).
// El turno 1 se reescribe para las plataformas de agua (decisión de dirección: no hay comienzo en la playa).
// El 3 no repite la alianza del 2, el 7 (Los charlajos) se mantiene sin escena y el 8 usa solo 75-14 para no adelantar la decisión.
export const CRONICA_ARENA_75 = {
  1: { propio: 'La plataforma se eleva en mitad de un lago salado. En el centro, una isla con la Cornucopia y radios de tierra que se abren como las agujas de un reloj. El agua os rodea a todos, y Peeta no sabe nadar.' },
  2: { escenas: ['75-08'] },
  4: { escenas: ['75-09', '75-10'] },
  5: { escenas: ['75-11', '75-12'] },
  6: { escenas: ['75-13'] },
  8: { escenas: ['75-14'] },
};
