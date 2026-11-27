/**
 * La Cosecha 5.2 · acontecimientos adicionales de la Arena del Segundo Vasallaje.
 * Escenas originales basadas en el marco canónico; no reproduce texto protegido.
 * Los tributos sin identidad confirmada permanecen anónimos.
 */
const clamp=(n,min=0,max=100)=>Math.max(min,Math.min(max,n));
const alive=(g,name)=>(g.tributes||[]).some(t=>t.name===name&&t.alive);
const find=(g,name)=>(g.tributes||[]).find(t=>t.name===name);

const scenes={
  2:{
    title:'La primera noche del Vasallaje',
    body:'La pradera pierde el color bajo la luz del atardecer. Los cañonazos de la Cornucopia todavía resuenan en tu memoria. A lo lejos, una señal acordada con Maysilee podría indicar que sigue viva. También podría ser una trampa de otro tributo.',
    choices:[
      ['signal','Responder con la señal de Maysilee',(g,a)=>{if(alive(g,'Maysilee Donner')){a.rel('maysilee',2);a.flag('maysileeSignalConfirmed');a.stat('support',2);a.log('La señal vuelve desde el límite del claro. Maysilee sigue viva y sabe que no estás lejos.');}else{a.stat('stealth',1);a.log('No recibes respuesta. No sabes si Maysilee ha muerto o si ha decidido guardar silencio.');}}],
      ['shelter','Buscar refugio antes de que anochezca',(g,a)=>{a.stat('fatigue',-8);a.stat('stealth',2);a.flag('nightShelter50');a.log('Encuentras un hueco entre raíces y piedra. No es cómodo, pero rompe tu silueta frente a las cámaras.');}],
      ['fire','Encender una pequeña señal de fuego',(g,a)=>{a.stat('support',4);a.stat('stealth',-2);a.flag('visibleFire50');a.log('El fuego atrae miradas. Puede que también atraiga un patrocinador, o a alguien con un cuchillo.');}]
    ]
  },
  3:{
    title:'El precio de los suministros',
    body:'Un paquete de suministros ha quedado atrapado entre dos sectores. Las huellas alrededor indican que alguien lo ha reclamado, pero todavía no ha regresado. La Arena convierte cada objeto en una invitación a exponerte.',
    choices:[
      ['approach','Acercarte con cautela y estudiar las huellas',(g,a)=>{a.stat('skill',2);a.stat('stealth',1);a.flag('readTracks50');a.log('Distingues dos rutas de salida y evitas la más reciente. La información vale más que una lata de comida.');}],
      ['take','Correr hacia el paquete',(g,a)=>{a.item('raciones del Vasallaje');a.stat('health',-9);a.stat('support',2);a.log('Consigues las raciones, pero una trampa de alambre te abre la pierna.');}],
      ['leave','Dejarlo y seguir hacia el bosque',(g,a)=>{a.stat('stealth',3);a.stat('hunger',4);a.log('Renuncias a los suministros. No le das a los Vigilantes el enfrentamiento que esperan.');}]
    ]
  },
  5:{
    title:'Una voz al otro lado de la pradera',
    body:'Un grito corta el silencio. No reconoces la voz, pero sí el miedo. Los Vigilantes han colocado cámaras en los árboles y la ruta más directa cruza una zona abierta. Ayudar puede costarte la partida; ignorarlo también dejará una marca.',
    choices:[
      ['investigate','Acercarte sin revelar tu posición',(g,a)=>{a.stat('stealth',1);a.stat('skill',1);a.flag('investigatedCry50');a.log('Encuentras señales de una pelea reciente, pero ningún superviviente. Te llevas una venda abandonada.');a.item('venda limpia');}],
      ['call','Responder desde la cobertura',(g,a)=>{a.stat('support',3);a.stat('rebellion',2);a.flag('answeredCry50');a.log('Tu respuesta demuestra que no todos los tributos han aceptado el aislamiento. También revela aproximadamente dónde estás.');}],
      ['ignore','No responder y cambiar de sector',(g,a)=>{a.stat('stealth',3);a.stat('fatigue',5);a.log('Te alejas. Sobrevivir exige decisiones que no podrás explicar cuando regreses, si regresas.');}]
    ]
  },
  9:{
    title:'El campo de fuerza',
    body:'El límite de la Arena zumba con una vibración casi imperceptible. Haymitch ha observado que la barrera no se comporta igual en todos los puntos. La Cornucopia está cerca. El último tributo que queda entre tú y la salida no piensa rendirse.',
    choices:[
      ['test','Comprobar el patrón de la barrera antes de actuar',(g,a)=>{a.flag('forcefieldStudied');a.flag('forcefieldTested');a.stat('skill',2);a.stat('health',-4);a.log('Una descarga breve confirma el intervalo. Ahora sabes dónde puede fallar el campo de fuerza.');}],
      ['bait','Provocar que tu rival se acerque al límite',(g,a)=>{a.flag('forcefieldStudied');a.stat('stealth',1);a.stat('rebellion',4);a.log('Finges una retirada y conduces el enfrentamiento hacia la barrera. Las cámaras siguen cada paso.');}],
      ['direct','Enfrentarte directamente y buscar una salida',(g,a)=>{a.stat('skill',1);a.stat('health',-12);a.log('El combate te deja herido. Sobrevives al encuentro, pero pierdes la oportunidad de estudiar la barrera.');}]
    ]
  }
};

export function getArena50Event(game,turn){
  if(!game||game.mode!=='story'||game.edition!==50)return null;
  const scene=scenes[turn];
  if(!scene)return null;
  return {title:scene.title,body:scene.body,chapter:true,custom:'arena50',turn,choices:scene.choices.map(([id,label])=>[id,label])};
}

export function applyArena50Choice(game,event,choiceId,api){
  if(!game||!event||event.custom!=='arena50')return false;
  const scene=scenes[event.turn];
  const choice=scene?.choices.find(([id])=>id===choiceId);
  if(!choice)return false;
  choice[2](game,api);
  game.campaignJournal??=[];
  game.campaignJournal.push({turn:event.turn,title:scene.title,choice:choiceId});
  return true;
}

export function arena50Turns(){return Object.keys(scenes).map(Number).sort((a,b)=>a-b);}
