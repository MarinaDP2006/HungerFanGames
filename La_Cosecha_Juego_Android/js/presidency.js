// La Cosecha · Modo Presidente: efectos visibles de las órdenes, crisis con decisiones y finales del mandato.

export const MANDATE_DAYS=40;
const clamp=v=>Math.max(0,Math.min(100,v));
const LABELS={'d.stability':'Estabilidad del distrito','d.food':'Alimentos del distrito','d.production':'Producción del distrito',approval:'Aprobación',order:'Orden',economy:'Economía',rebellion:'Rebelión',resources:'Recursos',arenaBudget:'Arenas',peacekeepers:'Fuerzas de paz'};

// Órdenes nacionales: una sola fuente para el efecto real y para lo que se muestra en el botón.
export function governEffects(p){
  return {
    districts:['Se redistribuyen cuotas de producción. Algunos distritos protestan.',{economy:5,approval:-2,rebellion:3}],
    peace:['Se despliegan fuerzas de paz y se revisan los protocolos de seguridad.',{order:10,approval:-6,rebellion:5}],
    arena:['Se amplía el presupuesto de los Vigilantes y se introducen nuevas amenazas.',{arenaBudget:12,approval:3,rebellion:2}],
    games:['Se anuncia una nueva edición de los Juegos. El Capitolio prepara la retransmisión.',{order:4,approval:5,rebellion:4}],
    propaganda:['Se lanza una campaña nacional de propaganda.',{approval:p==='charming'?10:p==='kind'||p==='just'?7:5,order:p==='fear'?8:4,rebellion:p==='kind'||p==='just'?-4:p==='fear'?7:-3}],
    reform:['Se aprueba una reforma que reduce los abusos y mejora las condiciones de los distritos.',{approval:8,order:-5,rebellion:-10,economy:-4}],
    negotiation:['Se abren canales discretos con representantes de la resistencia.',{approval:4,order:-3,rebellion:-12,economy:-3}],
    emergency:['Se declara el estado de excepción y se militarizan los distritos.',{order:12,approval:-10,rebellion:12,economy:-5}],
    ceasefire:['Se propone un alto el fuego para proteger a la población civil.',{approval:7,order:-6,rebellion:-8,economy:-4}],
  };
}
// Texto corto con los efectos: «Orden +10 · Aprobación −6 · Rebelión +5».
export function describeEffects(fx){
  return Object.entries(fx).map(([k,v])=>`${LABELS[k]||k} ${v>0?'+':'−'}${Math.abs(v)}`).join(' · ');
}
// Para colorear: en «Rebelión», subir es malo.
export function effectTone(fx){
  let score=0;for(const [k,v] of Object.entries(fx))score+=k==='rebellion'?-v:v;
  return score>3?'good':score<-3?'bad':'mixed';
}
function apply(g,fx,district){
  for(const [k,v] of Object.entries(fx||{})){
    if(k.startsWith('d.')){if(district){const key=k.slice(2);district[key]=clamp((district[key]||0)+v);}}
    else g[k]=clamp((g[k]??50)+v);
  }
}

// ---------------------------------------------------------------------------
// Crisis: aparecen cada pocos días y bloquean las órdenes hasta que decides.
// ---------------------------------------------------------------------------
const crises=[
  {id:'mockingjay',when:g=>g.rebellion>=20,title:'Un sinsajo en los muros',body:'Aparece pintado un sinsajo en una fábrica del Distrito 8. Las fotos ya circulan por los distritos.',district:8,choices:[
    ['erase','Borrarlo en silencio',{order:3,rebellion:2},'Los Agentes de la Paz lo borran de noche. Alguien lo vuelve a pintar al día siguiente.'],
    ['punish','Castigo ejemplar a la fábrica',{order:8,approval:-4,rebellion:9,'d.stability':-12},'Cierran la fábrica y detienen a los turnos de noche. El miedo funciona... por ahora.'],
    ['ignore','No darle importancia',{rebellion:5,approval:2},'Lo ignoras. En el Capitolio nadie lo menciona. En los distritos, todos.'],
  ]},
  {id:'strike',when:g=>g.economy<70,title:'Huelga en los telares',body:'Los obreros textiles del Distrito 8 paran la producción y exigen raciones dignas.',district:8,choices:[
    ['raise','Subir las raciones',{economy:-5,rebellion:-6,'d.food':15,'d.stability':10},'La huelga termina. Los demás distritos toman nota de que protestar funciona.'],
    ['break','Romper la huelga',{order:6,rebellion:8,'d.stability':-15,'d.production':10},'Los Agentes de la Paz reabren los telares. La producción vuelve; la confianza, no.'],
    ['talk','Negociar con los capataces',{economy:-2,approval:3,rebellion:-2},'Concedes poco, pero lo concedes a tiempo.'],
  ]},
  {id:'famine',when:g=>g.districts?.some(d=>d.id===11&&d.food<50),title:'Hambre en el Distrito 11',body:'Las cosechas se van al Capitolio y en el 11 la gente se desmaya en los campos. Hay rumores de que alguien robará grano.',district:11,choices:[
    ['grain','Dejar parte del grano en el distrito',{economy:-6,rebellion:-5,'d.food':22,'d.stability':8},'El 11 come este invierno. El Capitolio, un poco menos.'],
    ['whip','Endurecer los castigos por robo',{order:5,approval:-3,rebellion:7,'d.stability':-10},'Se instalan postes de azotes en la plaza. Nadie roba. Nadie olvida.'],
    ['tesserae','Ampliar las teselas',{economy:-3,'d.food':10,rebellion:1},'Más grano a cambio de más papeletas para la cosecha. El hambre paga los Juegos.'],
  ]},
  {id:'gamemaker',when:()=>true,title:'Propuesta del Vigilante Jefe',body:'El Vigilante Jefe presenta una Arena espectacular para la próxima edición. Es cara, pero promete audiencias récord.',choices:[
    ['approve','Aprobarla',{arenaBudget:15,resources:-8,approval:6},'El Capitolio no habla de otra cosa.'],
    ['cheaper','Pedir una versión más barata',{arenaBudget:5,resources:-3,approval:1},'Tendréis Juegos. No serán memorables.'],
    ['reject','Rechazarla',{resources:3,approval:-4},'Los patrocinadores del Capitolio se quejan en las fiestas de esa noche.'],
  ]},
  {id:'district13',when:g=>g.districts?.find(d=>d.id===13)?.hidden&&g.day>=8,title:'Señales del Distrito 13',body:'Un aerodeslizador de reconocimiento detecta actividad en las ruinas del Distrito 13. Oficialmente, allí no queda nada.',choices:[
    ['investigate','Enviar una misión de inteligencia',{resources:-6,order:2},'La misión vuelve con fotos que nadie debería ver: el 13 está vivo.',g=>{const d=g.districts.find(x=>x.id===13);if(d)d.hidden=false;}],
    ['treaty','Mantener el pacto de silencio',{rebellion:2},'Hay cosas que el Capitolio prefiere no saber.'],
    ['bomb','Bombardear la zona',{order:4,approval:-5,rebellion:6,resources:-5},'Las bombas caen sobre ruinas. Bajo tierra, alguien toma nota.'],
  ]},
  {id:'victor',when:g=>g.day>=6,title:'Un vencedor incómodo',body:'Un vencedor popular hace un gesto ambiguo en directo. Para unos es un saludo; para otros, una señal.',choices:[
    ['tour','Enviarle a la Gira de la Victoria con guion',{approval:4,rebellion:-2},'Lee lo que le escriben. Sus ojos dicen otra cosa.'],
    ['threaten','Amenazar a su familia',{order:5,rebellion:6,approval:-2},'El vencedor deja de hacer gestos. Otros empiezan a hacerlos.'],
    ['ignore','Dejarlo pasar',{rebellion:4,approval:2},'Lo dejas pasar. Las cámaras lo repiten toda la semana.'],
  ]},
  {id:'peacekeepers',when:g=>g.peacekeepers>=40,title:'Abusos de los Agentes de la Paz',body:'Un comandante del Distrito 12 azota en público a un minero por cazar fuera de la alambrada.',district:12,choices:[
    ['replace','Relevar al comandante',{approval:3,order:-3,rebellion:-4,'d.stability':8},'El nuevo comandante es más discreto. El 12 lo agradece en silencio.'],
    ['support','Respaldarlo públicamente',{order:6,rebellion:7,'d.stability':-10},'La alambrada vuelve a estar electrificada todo el día.'],
    ['quiet','Investigar sin ruido',{order:1,rebellion:-1},'Abres un expediente. Nadie sabe si servirá de algo.'],
  ]},
  {id:'capitol',when:g=>g.economy<55||g.resources<45,title:'Malestar en el Capitolio',body:'Las familias ricas del Capitolio se quejan: faltan importaciones de lujo y suben los precios.',choices:[
    ['squeeze','Exprimir a los distritos',{economy:6,approval:5,rebellion:6},'Las fiestas vuelven al Capitolio. El hambre, a los distritos.'],
    ['austerity','Austeridad también en el Capitolio',{approval:-8,rebellion:-4,resources:4},'Por primera vez, el Capitolio aprieta el cinturón. No le gusta.'],
    ['spectacle','Distraer con un espectáculo',{approval:4,resources:-4},'Pan y circo. Sobre todo circo.'],
  ]},
  {id:'refugees',when:g=>g.rebellionArc==='uprising'||g.rebellionArc==='civil-war',title:'Columnas de refugiados',body:'Miles de personas huyen de los combates hacia los distritos vecinos.',choices:[
    ['corridors','Abrir corredores humanitarios',{approval:6,resources:-7,rebellion:-5},'Los corredores salvan vidas. Algunos rebeldes también los usan.'],
    ['close','Cerrar las fronteras entre distritos',{order:6,approval:-6,rebellion:6},'Las columnas se detienen en las vallas. Las imágenes dan la vuelta a Panem.'],
    ['camps','Campos vigilados',{order:3,approval:-2,resources:-3},'Techos, comida y Agentes de la Paz en cada puerta.'],
  ]},
];

export function maybeCrisis(g){
  if(g.ended||g.pendingCrisis||g.mode!=='president')return null;
  if(g.day<3||g.day%3!==0)return null;
  g.crisisSeen??=[];
  const pool=crises.filter(c=>!g.crisisSeen.includes(c.id)&&c.when(g));
  if(!pool.length)return null;
  const c=pool[Math.floor(Math.random()*pool.length)];
  g.crisisSeen.push(c.id);
  g.pendingCrisis={id:c.id,title:c.title,body:c.body,choices:c.choices.map(([id,label,fx])=>({id,label,effects:describeEffects(fx),tone:effectTone(fx)}))};
  g.events.push(`CRISIS: ${c.title}.`);
  return g.pendingCrisis;
}
export function resolveCrisis(g,choiceId){
  const c=crises.find(x=>x.id===g.pendingCrisis?.id);if(!c)return;
  const ch=c.choices.find(x=>x[0]===choiceId);if(!ch)return;
  const district=c.district?g.districts.find(d=>d.id===c.district):null;
  apply(g,ch[2],district);
  if(ch[4])ch[4](g);
  g.events.push(ch[3]);
  g.decisionsLog??=[];g.decisionsLog.push({day:g.day,title:c.title,choice:ch[1]});
  g.pendingCrisis=null;
}

// ---------------------------------------------------------------------------
// Fin del mandato: se evalúa al llegar al último día o al perder el control.
// ---------------------------------------------------------------------------
export function checkMandateEnd(g){
  if(g.mandateEnding)return true;
  if(!g.ended&&g.day<MANDATE_DAYS)return false;
  g.ended=true;
  const p=g.president||{},name=p.name||'El presidente';
  const lostControl=g.rebellionArc==='postwar'&&(g.rebellion>=100||(g.order<=0&&g.rebellion>=50)||(g.war&&(g.war.rebelMomentum>=100||g.war.capitalIntegrity<=0)));
  let title,lines=[];
  if(lostControl){title='EL RÉGIMEN CAE';lines.push(`${name} pierde el control de Panem. Los distritos ya no obedecen al Capitolio.`);lines.push(g.approval>=50?'Parte del Capitolio aún te defiende, pero ya no importa: la historia la escribirán otros.':'En el Capitolio nadie sale a defenderte.');}
  else if(g.rebellionArc==='postwar'){title='LA PAZ NEGOCIADA';lines.push(`${name} gana la guerra o la detiene a tiempo, pero Panem ya no es el mismo país.`);}
  else if(g.order>=65&&g.approval<40){title='EL PUÑO DE HIERRO';lines.push(`${name} completa el mandato con un Panem en silencio. Nadie protesta porque nadie se atreve.`);lines.push('El orden se sostiene con Agentes de la Paz en cada esquina. Basta una chispa.');}
  else if(g.rebellion<=15&&g.approval>=70){title='EL REFORMISTA';lines.push(`${name} completa el mandato con los distritos más tranquilos de su historia reciente.`);lines.push('Algunos ya preguntan si los Juegos del Hambre siguen teniendo sentido.');}
  else if(g.economy>=70){title='LA PROSPERIDAD DEL CAPITOLIO';lines.push(`${name} deja un Capitolio rico y unos distritos que pagan la factura.`);}
  else{title='UN MANDATO EN EQUILIBRIO';lines.push(`${name} llega al final del mandato sin una gran victoria ni una gran derrota.`);}
  const d13=g.districts?.find(d=>d.id===13);
  if(d13&&!d13.hidden)lines.push('El Distrito 13 ya no es un secreto. Su existencia cambia todo lo que viene después.');
  if(g.rebellion>=60&&!lostControl)lines.push('La rebelión no ha terminado: solo espera al siguiente presidente.');
  lines.push(`Balance final: aprobación ${Math.round(g.approval)}, orden ${Math.round(g.order)}, economía ${Math.round(g.economy)}, rebelión ${Math.round(g.rebellion)}.`);
  g.mandateEnding={title,lines,day:g.day};
  return true;
}
