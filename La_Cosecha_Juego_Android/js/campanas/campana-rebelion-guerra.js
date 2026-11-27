// Rebelión y Guerra: las dos últimas campañas del modo Historia (continuidad de las películas Sinsajo 1 y 2).
// Texto original del proyecto (Claude, 27-11-2026), aprobado por Nina en el PR. Las dos primeras escenas de la
// Rebelión son las 75-16 y 75-17 del documento narrativo de la Gira y el 75.º.
// Son precampañas sin Arena: la Rebelión encadena con la Guerra, y la Guerra cierra la historia con su final.
// Hitos fijos de las películas (no cambian con las decisiones): la destrucción del 12, el bombardeo del 13,
// el rescate de Peeta condicionado, la muerte de Boggs y Finnick, la muerte de Prim y la flecha contra Coin.
import { DESPUES_ARENA_75_BORRADOR } from './campana-gira-75.js';

const VARIABLES = [
  { path: 'rel.katniss_peeta', type: 'int', default: 0 },
  { path: 'rel.katniss_haymitch', type: 'int', default: 0 },
  { path: 'rel.katniss_gale', type: 'int', default: 0 },
];
const mas = (r, n = 1) => ({ op: 'ADD', path: `rel.katniss_${r}`, value: n });
const flag = f => ({ op: 'SET_FLAG', path: f });
const limpio = t => String(t || '').replace(/\*\*([^*]+?):\*\*/g, '$1:').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/(^|\s)\*([^*\n]+)\*(?=\s|[.,;:]|$)/g, '$1$2').replace(/[ \t]+\n/g, '\n').trim();

// Escena compacta: [id, título, lugar, texto, [[etiqueta, efectos, respuesta, diario], ×3]]
function escenas(prefijo, lista) {
  return lista.map(([scene_id, title, location, text, ops], i) => ({
    scene_id, sequence: i + 1, title, location, participants: null, text: limpio(text),
    options: ops.map(([label, effects, response_text, journal_text], k) => ({
      option_id: `${scene_id}_o${k + 1}`, label, effects, response_text, journal_text,
      journal_entry_id: `${prefijo}.diary.${scene_id}.${scene_id}_o${k + 1}`,
    })),
  }));
}

const [despertar, ruinas] = DESPUES_ARENA_75_BORRADOR;

export const REBELION = Object.freeze({
  campaign_id: 'campaign_rebelion', title: 'Rebelión · El Sinsajo', status: 'APPROVED', transfer_id: 'campaign_rebelion:v1',
  source_version: 'rebelion-1.0', next: 'campaign_guerra', variables: VARIABLES,
  approval: 'Escrita por Claude el 27-11-2026; aprobación de Nina en el PR',
  scenes: escenas('rebelion', [
    [despertar.scene_id, despertar.title, despertar.location || 'Aerodeslizador rebelde', despertar.text, [
      [despertar.options[0].label, [flag('demands_rescue'), mas('peeta')], 'Haymitch aguanta el golpe sin apartarse. «Lo intentaremos. Pero no hoy, y no tú sola.»', 'Peeta se quedó atrás. No pienso olvidarlo, ni dejar que ellos lo olviden.'],
      [despertar.options[1].label, [flag('knows_plutarch'), mas('haymitch')], 'Plutarch sonríe como quien ha ganado una apuesta. Era rebelde desde antes del Vasallaje. Tú eras el plan.', 'Todo fue un plan. Hasta yo.'],
      [despertar.options[2].label, [flag('asked_victors')], 'Beetee está herido pero vivo. Johanna, Peeta y Enobaria se los llevó el Capitolio.', 'Algunos llegamos. Otros pagan por ello en el Capitolio.'],
    ]],
    [ruinas.scene_id, ruinas.title, ruinas.location || 'Aerodeslizador rumbo al Distrito 13', ruinas.text, [
      [ruinas.options[0].label, [flag('family_status_question')], 'Gale sacó a tu madre y a Prim, y a unos pocos cientos más. El resto del distrito ya no existe.', 'Prim está viva. Mamá está viva. Gale las sacó de allí.'],
      [ruinas.options[1].label, [mas('peeta')], 'Nadie sabe nada de él. Solo que el Capitolio lo tiene y que lo usará.', 'Peeta sigue allí. Esa es la única guerra que me importa ahora.'],
      [ruinas.options[2].label, [flag('silent_witness')], 'Miras las ruinas hasta que se pierden de vista. Nadie se atreve a hablarte.', 'El hogar puede desaparecer en una noche. La memoria no.'],
    ]],
    ['reb_coin', 'La presidenta Coin', 'Distrito 13 · Mando',
      'El Distrito 13 vive bajo tierra, con horarios impresos en el brazo y raciones exactas. La presidenta Alma Coin te recibe en la sala de mando: la rebelión necesita un rostro y ha decidido que sea el tuyo.\n\nPlutarch ya ha preparado cámaras, vestuario y un equipo de grabación. Solo falta que digas que sí.', [
      ['Aceptar a cambio de inmunidad para Peeta y los vencedores capturados.', [flag('immunity_deal'), mas('peeta')], 'Coin tarda en responder. Al final accede, delante de todo el distrito, para que no pueda echarse atrás.', 'Seré su Sinsajo. A cambio, Peeta no pagará por lo que hicimos.'],
      ['Aceptar sin condiciones: la rebelión es más grande que tú.', [flag('mockingjay_unconditional')], 'Coin asiente satisfecha. Plutarch, en cambio, te mira como si acabaras de regalar algo valioso.', 'Si tengo que ser un símbolo, que sirva para algo.'],
      ['Pedir ver primero lo que queda del Distrito 12.', [flag('visited_12'), mas('gale')], 'Gale te acompaña entre las cenizas. Allí encuentras la rosa blanca que Snow ha dejado en tu casa.', 'Snow estuvo en mi casa. Dejó una rosa para que lo supiera.'],
    ]],
    ['reb_hospital_8', 'El hospital del Distrito 8', 'Distrito 8 · Hospital de campaña',
      'Plutarch te lleva al Distrito 8 para grabar entre los heridos. Los pacientes te reconocen y se levantan para verte. Minutos después, los bombarderos del Capitolio arrasan el hospital.', [
      ['Subir a un tejado y disparar a los bombarderos.', [flag('shot_bombers'), mas('gale')], 'Gale y tú derribáis dos aviones. La cámara de Cressida no se pierde ni un segundo.', 'Disparé hasta que no quedaron flechas. No bastó.'],
      ['Ayudar a sacar heridos de entre los escombros.', [flag('saved_wounded')], 'Sacas a una niña con vida. No sabes su nombre, pero no olvidarás su cara.', 'Hay gente que no sale en ninguna propaganda. Esa niña es una de ellas.'],
      ['Mirar a la cámara y hablarle directamente a Snow.', [flag('defiant_propo'), mas('haymitch')], 'Le dices a Snow que, si los distritos arden, el Capitolio arderá con ellos. En pocas horas, todo Panem lo ha oído.', 'Le hablé a Snow delante de todo Panem. Ya no hay vuelta atrás.'],
    ]],
    ['reb_presa', 'La presa', 'Distrito 13 · Sala de mando',
      'Los rebeldes del Distrito 5 se preparan para volar la presa que da luz al Capitolio. Esa misma noche, el Capitolio vuelve a sacar a Peeta en televisión, más delgado y con la mirada perdida.', [
      ['Mirar la entrevista de Peeta hasta el final.', [flag('watched_peeta'), mas('peeta')], 'Al final, Peeta grita un aviso: el Capitolio atacará el 13 esta noche. Le golpean antes de que se corte la señal.', 'Peeta nos ha avisado. Sé lo que le costará.'],
      ['Seguir la operación de la presa con Gale.', [flag('dam_operation'), mas('gale')], 'La presa cae y el Capitolio se queda a oscuras. Gale sonríe. Tú no puedes.', 'Una ciudad a oscuras. Gale lo llama victoria.'],
      ['Pedirle a Haymitch que te cuente qué le están haciendo a Peeta.', [mas('haymitch')], 'Haymitch no te miente: «Lo están rompiendo para usarlo contra ti».', 'Están rompiendo a Peeta para usarlo contra mí.'],
    ]],
    ['reb_bombardeo_13', 'El bombardeo del 13', 'Distrito 13 · Refugio profundo',
      'Gracias al aviso de Peeta, el Distrito 13 baja a los refugios antes de que caigan las bombas. Las puertas blindadas se cierran mientras el techo tiembla.', [
      ['Quedarte junto a Prim y tu madre.', [flag('family_shelter')], 'Prim ha vuelto a por su gato y la encuentras justo antes de que cierren las puertas. Pasáis la noche abrazadas.', 'Prim volvió por el gato. Claro que volvió.'],
      ['Ayudar a los guardias a cerrar las compuertas.', [flag('helped_bunker')], 'Empujas una compuerta con otros diez. Se cierra a tiempo por segundos.', 'Unos segundos más y no lo contamos.'],
      ['Hablar con Gale de lo que significa esto.', [mas('gale')], 'Gale habla de responder golpe por golpe. Le escuchas y no le das la razón.', 'Gale quiere devolver cada bomba. Me asusta entenderle.'],
    ]],
    ['reb_rescate', 'Real o no real', 'Distrito 13 · Hospital',
      'Un equipo rebelde rescata a Peeta, a Johanna y a Annie del Capitolio. Corres a verlo. En cuanto te ve, Peeta se lanza a tu cuello: el Capitolio le ha enseñado a odiarte.', [
      ['Volver cada día, aunque no quiera verte.', [flag('patient_with_peeta'), mas('peeta', 2)], 'Te sientas al otro lado del cristal. Un día, Peeta te pregunta si algo de lo que recuerda es real.', 'Voy a esperar a que vuelva, aunque tarde.'],
      ['Mantenerte lejos para no hacerle daño.', [flag('distance_from_peeta')], 'Los médicos aprueban tu distancia. A ti no te sirve de nada.', 'Me aparto para que se cure. Duele más que el golpe.'],
      ['Pedir a Haymitch que te ayude a entender qué le hicieron.', [mas('haymitch')], 'Haymitch te habla del veneno de las rastrevíspulas y de los recuerdos falsos. Te enseña a preguntar «real o no real».', 'Real o no real. Así vamos a reconstruirlo.'],
    ]],
    ['reb_hueso', 'El Hueso', 'Distrito 2 · La fortaleza de la montaña',
      'La guerra llega al Distrito 2. El Capitolio defiende la fortaleza del Hueso, excavada en la montaña. Gale propone provocar avalanchas para encerrar a todos dentro.', [
      ['Aceptar el plan de Gale.', [flag('accepted_gale_plan'), mas('gale')], 'La montaña se derrumba. Los que salen vivos te encuentran en la plaza, y uno te dispara.', 'Ganamos. No sé si eso es lo mismo que tener razón.'],
      ['Pedir que dejen una salida abierta.', [flag('left_an_exit')], 'Dejan libre el túnel del tren. Los supervivientes salen a la plaza y uno te dispara a quemarropa.', 'Quise darles una salida. Uno de ellos me la devolvió con una bala.'],
      ['Bajar a la plaza a hablar con los que salen.', [flag('spoke_in_2'), mas('haymitch')], 'Pides que bajen las armas. Un hombre te apunta, duda y dispara. Despiertas en el hospital.', 'Hablé con el enemigo. Algunos bajaron las armas.'],
    ]],
  ]),
});

export const GUERRA = Object.freeze({
  campaign_id: 'campaign_guerra', title: 'Guerra · La caída del Capitolio', status: 'APPROVED', transfer_id: 'campaign_guerra:v1',
  source_version: 'guerra-1.0', next: null, ends_story: true, variables: VARIABLES,
  approval: 'Escrita por Claude el 27-11-2026; aprobación de Nina en el PR',
  scenes: escenas('guerra', [
    ['gue_unidad', 'La unidad Estrella', 'Capitolio · Afueras',
      'Coin te asigna a una unidad de propaganda lejos del frente, bajo el mando de Boggs. Peeta llega días después, enviado por Coin. Nadie sabe si viene a luchar o a matarte.', [
      ['Aceptar a Peeta en la unidad.', [flag('trusted_peeta_unit'), mas('peeta')], 'Peeta te pide que le esposen por la noche. Duerme cerca, aunque no del todo contigo.', 'Peeta está aquí. Todavía no sé si es él.'],
      ['Pedir a Boggs que lo vigilen.', [flag('guarded_peeta')], 'Boggs asigna a dos soldados. Peeta lo entiende mejor que tú.', 'Lo vigilan por mí. Odio que haga falta.'],
      ['Decirle a Gale que no te separe de él.', [mas('gale')], 'Gale promete cubrirte. Su mirada dice que no confía en Peeta.', 'Gale me cubre. Peeta me mira. Los dos tienen miedo por mí.'],
    ]],
    ['gue_vainas', 'Las vainas', 'Capitolio · Calles evacuadas',
      'El Capitolio ha sembrado sus calles de trampas: géiseres de brea, ráfagas de ametralladora y redes. Una vaina destroza a Boggs. Antes de morir, te entrega el holo con el mapa de las trampas.', [
      ['Tomar el mando y seguir hacia la mansión de Snow.', [flag('own_mission'), mas('haymitch')], 'Dices que Coin te ha enviado a matar a Snow. Es mentira, pero la unidad te sigue.', 'Mentí a la unidad. Ahora soy responsable de todos.'],
      ['Proteger a Peeta durante su crisis.', [flag('protected_peeta'), mas('peeta', 2)], 'Peeta mata a un compañero en un ataque de pánico. Lo sujetas hasta que vuelve en sí.', 'Lo sostuve hasta que volvió. Volvió.'],
      ['Seguir el holo paso a paso, sin arriesgar.', [flag('careful_route')], 'Avanzáis despacio, casilla a casilla. Detrás de vosotros, las calles se llenan de agentes.', 'Boggs me dejó el mapa. No voy a desperdiciarlo.'],
    ]],
    ['gue_alcantarillas', 'Las alcantarillas', 'Capitolio · Túneles',
      'Huís por los túneles de servicio. En la oscuridad os persiguen los mutos que Snow ha soltado, criaturas pálidas que susurran tu nombre.', [
      ['Quedarte atrás para cubrir la huida.', [flag('covered_retreat')], 'Finnick pelea a tu lado hasta el último momento. Al final, tienes que activar el holo y dejarlo atrás.', 'Finnick se quedó. Le debo la vida dos veces.'],
      ['Guiar al grupo hacia la salida.', [flag('led_escape'), mas('gale')], 'Llegáis a la escalera. Arriba, Gale cuenta a los que faltan. Finnick no está.', 'Llegamos arriba. No todos.'],
      ['Agarrar a Peeta y no soltarlo.', [mas('peeta', 2)], 'Peeta te saca del agua cuando resbalas. Te mira y dice tu nombre como antes.', 'En el peor momento, Peeta me salvó a mí.'],
    ]],
    ['gue_tigris', 'La tienda de Tigris', 'Capitolio · Tienda de pieles',
      'Una antigua estilista de los Juegos os esconde en el sótano de su tienda. Ahí, entre pieles y silencio, esperáis a que los refugiados os abran paso hasta la mansión.', [
      ['Jugar con Peeta a «real o no real».', [flag('real_or_not_real'), mas('peeta', 2)], 'Peeta pregunta si le quieres. Le respondes la verdad, aunque todavía no sepas decirla entera.', 'Real.'],
      ['Planear con Gale cómo entrar en la mansión.', [flag('gale_plan_mansion'), mas('gale')], 'Os mezclaréis con los refugiados que Snow acoge en su puerta. Gale ya ha pensado en todo.', 'Mañana entramos con los refugiados. No hay otro camino.'],
      ['Escribir lo que recuerdas de los que ya no están.', [flag('remembered_fallen')], 'Escribes nombres: Rue, Mags, Wiress, Boggs, Finnick. La lista te pesa en las manos.', 'Escribo sus nombres para que no se queden solo en mi memoria.'],
    ]],
    ['gue_mansion', 'Los paracaídas', 'Capitolio · Ante la mansión presidencial',
      'Ante la mansión, los niños del Capitolio esperan protegidos por agentes. Un aerodeslizador con el sello del Capitolio deja caer paracaídas plateados. Explotan. Los sanitarios rebeldes corren a ayudar y entre ellos ves a Prim.', [
      ['Gritar su nombre y correr hacia ella.', [flag('ran_to_prim')], 'Prim se gira al oírte. La segunda explosión llega antes que tú.', 'Gritó mi nombre. O yo el suyo. Ya no lo sé.'],
      ['Intentar apartar a los niños de la plaza.', [flag('helped_children')], 'Sacas a dos niños. Cuando te das la vuelta, la segunda explosión ya ha caído donde estaba Prim.', 'Salvé a dos niños que no eran míos. Perdí a la mía.'],
      ['Buscar a Gale entre el humo.', [flag('saw_the_bombs'), mas('gale', -1)], 'Gale mira los paracaídas como quien reconoce algo. Tú también lo reconoces: era su trampa.', 'La trampa era de Gale. La usó otro, pero era suya.'],
    ]],
    ['gue_snow', 'El invernadero', 'Mansión presidencial · Invernadero',
      'Los rebeldes ganan la guerra. Snow, prisionero, pide verte entre sus rosas. Te dice que él no ordenó los paracaídas: que fue Coin, para quedarse con el poder y con tu odio.', [
      ['Creerle: Snow nunca te ha mentido.', [flag('believes_snow')], 'Snow sonríe. Acordasteis no mentiros nunca, y él lo ha cumplido.', 'Snow no me mintió. Eso es lo peor.'],
      ['Preguntarle a Gale directamente.', [flag('asked_gale'), mas('gale', -1)], 'Gale no lo niega. Dice que no sabe si fue su bomba. Con eso basta.', 'Gale no supo decirme que no.'],
      ['Callar y guardártelo.', [flag('kept_silent')], 'Sales del invernadero sin decir nada. Haymitch te ve la cara y no pregunta.', 'Guardo lo que sé. Lo usaré una sola vez.'],
    ]],
    ['gue_votacion', 'Los últimos Juegos', 'Capitolio · Sala del consejo',
      'Coin reúne a los vencedores vivos. Propone celebrar unos últimos Juegos del Hambre con los hijos del Capitolio. Necesita sus votos.', [
      ['Votar que sí, por Prim.', [flag('voted_yes')], 'Haymitch vota contigo, mirándote fijamente. Coin sonríe: ha ganado.', 'Voté que sí. Haymitch entendió por qué.'],
      ['Votar que no.', [flag('voted_no'), mas('peeta')], 'Peeta, Beetee y Annie votan que no contigo. Coin gana igualmente.', 'Voté que no. No cambió nada, salvo a mí.'],
      ['Mirar a Haymitch antes de votar.', [mas('haymitch', 2)], 'Haymitch asiente apenas. Votáis lo mismo. Coin no ve lo que acabáis de decidir.', 'Haymitch me leyó sin palabras.'],
    ]],
    ['gue_flecha', 'La flecha', 'Capitolio · Plaza de la ejecución',
      'Una multitud llena la plaza. Snow está atado a un poste. Coin te da el honor de la ejecución. Tensas el arco, apuntas a Snow y, en el último instante, desvías la flecha hacia Coin.', [
      ['Disparar sin dudar.', [flag('shot_without_doubt')], 'La flecha atraviesa a Coin. Snow ríe hasta ahogarse entre la multitud.', 'Disparé a quien iba a repetirlo todo.'],
      ['Disparar pensando en Prim.', [flag('shot_for_prim')], 'Cuando cae Coin, solo oyes tu propio corazón. Prim no vuelve.', 'Lo hice por Prim. No me la devuelve.'],
      ['Disparar pensando en los Juegos que no habrá.', [flag('shot_for_future'), mas('peeta')], 'Peeta te detiene antes de que puedas hacerte daño. Te sujeta como tú lo sujetaste a él.', 'No habrá más Juegos. Ese es el precio y lo pago yo.'],
    ]],
  ]),
});

// Final de la historia: hitos fijos de las películas y matices según la partida.
export function finalDeLaHistoria(vars = {}, flags = {}) {
  const lineas = ['El juicio te declara trastornada y te envían de vuelta al Distrito 12. Paylor es elegida presidenta. No habrá más Juegos.'];
  if ((vars['rel.katniss_haymitch'] || 0) >= 3) lineas.push('Haymitch vive al lado. Cría gansos, bebe menos y te trae la comida cuando no te levantas.');
  else lineas.push('Haymitch vuelve a la casa de al lado. Se ven poco, pero se ven.');
  if ((vars['rel.katniss_peeta'] || 0) >= 6) lineas.push('Una mañana, Peeta vuelve al Distrito 12 y planta prímulas junto a tu casa. Con los años, os casáis y tenéis dos hijos. Cuando tienes pesadillas, juegas a recordar todo lo bueno que has visto hacer a alguien.');
  else lineas.push('Peeta vuelve al Distrito 12 meses después y planta prímulas junto a tu casa. Os reconstruís despacio, juntos.');
  if (flags.saw_the_bombs || flags.asked_gale) lineas.push('Gale se marcha al Distrito 2. No volvéis a hablar de los paracaídas.');
  else lineas.push('Gale acepta un puesto en el Distrito 2. A veces le ves en la televisión.');
  return { titulo: 'EL SINSAJO', texto: 'La guerra ha terminado. Panem empieza de nuevo sin Juegos del Hambre.', epilogo: lineas };
}
