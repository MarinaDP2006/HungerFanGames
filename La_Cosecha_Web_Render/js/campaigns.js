// La Cosecha · capítulos de las campañas canónicas (50.º, 74.º y 75.º) y finales alternativos.
// Cada capítulo parte de un acontecimiento de los libros/películas; las decisiones pueden respetarlo o romperlo.
// Los tributos sin nombre canónico siguen siendo anónimos: aquí no se les inventa identidad.

const clamp=(v,min=0,max=100)=>Math.max(min,Math.min(max,v));

// Herramientas que reciben los capítulos para modificar la partida.
export function makeApi(g,log){
  const find=name=>(g.tributes||[]).find(t=>t.name===name);
  return {
    log,
    find,
    alive:name=>!!find(name)?.alive,
    kill(name,reason){const t=find(name);if(t&&t.alive&&!t.player){t.alive=false;log(`Cañonazo: ${t.name}, Distrito ${t.district}.${reason?' '+reason:''}`);return true;}return false;},
    ally(name){const t=find(name);if(t&&t.alive){t.alliance='player';t.sector=g.playerSector;}},
    stat(key,delta,max=100){g[key]=clamp((g[key]||0)+delta,0,key==='skill'?20:max);},
    flag(name,value=true){g.flags??={};g.flags[name]=value;},
    has(name){return !!g.flags?.[name];},
    rel(name,delta){g.relationships??={};g.relationships[name]=(g.relationships[name]||0)+delta;},
    relOf(name){return g.relationships?.[name]||0;},
    item(name){g.inventory??=[];if(!g.inventory.includes(name))g.inventory.push(name);},
    hasItem(name){return (g.inventory||[]).includes(name);},
  };
}

// Personajes que el azar de la Arena no puede eliminar antes de su momento narrativo.
const protectedCast={
  50:{'Maysilee Donner':7},
  74:{'Rue':6,'Peeta Mellark':99,'Cato':99,'Thresh':99,'Clove':8,'Glimmer':4,'Marvel':6},
  75:{'Finnick Odair':99,'Peeta Mellark':99,'Johanna Mason':99,'Beetee Latier':99,'Mags Flanagan':4,'Wiress':7,'Gloss':99,'Cashmere':99,'Brutus':99,'Enobaria':99}
};
export function isProtected(g,t){
  if(g.mode!=='story'||t.player)return false;
  const until=protectedCast[g.edition]?.[t.name];
  return until!==undefined&&(g.arenaTurn||0)<until;
}

// ---------------------------------------------------------------------------
// Capítulos nuevos: se usan en los turnos que la versión 4.4 dejaba vacíos.
// ---------------------------------------------------------------------------
const chapters={
  50:{
    1:{title:'La Cornucopia del Vasallaje',body:'Cuarenta y ocho tributos alrededor de la Cornucopia, en una pradera tan hermosa que parece una burla. Los Vigilantes han diseñado un paisaje donde casi todo puede matar.',choices:[
      ['grab','Correr hacia la Cornucopia a por armas',(g,a)=>{const hurt=g.skill<7;a.item('cuchillo');a.stat('health',hurt?-14:-6);a.stat('support',4);a.log(hurt?'Consigues un cuchillo, pero sales de la Cornucopia con un corte profundo.':'Consigues un cuchillo y sales del baño de sangre con heridas leves.');}],
      ['backpack','Coger una mochila del borde y huir',(g,a)=>{a.item('mochila de suministros');a.stat('stealth',2);a.log('Alcanzas una mochila del perímetro y te alejas antes de que empiece la matanza.');}],
      ['flee','Huir sin mirar atrás',(g,a)=>{a.stat('stealth',3);a.stat('thirst',6);a.log('Huyes con las manos vacías. Sigues vivo, pero sin nada.');}],
    ]},
    4:{title:'Agua que no se puede beber',body:'El arroyo es cristalino, la fruta brilla en los árboles y las flores perfuman el aire. Sospechas que nada de eso es lo que parece.',choices:[
      ['rain','Esperar a la lluvia y recogerla',(g,a)=>{a.stat('thirst',-25);a.stat('fatigue',6);a.flag('poisonKnown');a.log('Recoges agua de lluvia. Es lenta, pero es la única fuente en la que confías.');}],
      ['test','Probar una pequeña cantidad del arroyo',(g,a)=>{a.stat('health',-15);a.stat('thirst',-10);a.flag('poisonKnown');a.log('El agua está envenenada. Lo descubres a tiempo, pero el veneno te deja débil.');}],
      ['sponsor','Esperar a que los patrocinadores envíen algo',(g,a)=>{if(g.support>=25){a.item('agua de patrocinador');a.stat('thirst',-30);a.log('Un paracaídas plateado trae agua limpia. Alguien en el Capitolio apuesta por ti.');}else{a.stat('thirst',10);a.log('No llega nada. Aún no has dado al público motivos para apostar por ti.');}}],
    ]},
    7:{title:'Los pájaros rosas',body:'Una bandada de pájaros de color caramelo cae sobre el claro. Tienen picos como agujas y vienen directos hacia Maysilee.',choices:[
      ['shield','Lanzarte a protegerla',(g,a)=>{if(a.relOf('maysilee')>=3&&a.alive('Maysilee Donner')){a.stat('health',-22);a.flag('maysileeSaved');a.rel('maysilee',2);a.log('Llegas a tiempo. Los picos te desgarran los brazos, pero Maysilee sigue viva. El canon acaba de romperse.');}else{a.stat('health',-12);a.kill('Maysilee Donner','Los pájaros llegan antes que tú.');a.log('Corres, pero estabas demasiado lejos. Llegas a tiempo de sostener su mano.');a.flag('heldMaysilee');}}],
      ['stay','Quedarte con ella hasta el final',(g,a)=>{a.kill('Maysilee Donner','Los pájaros la alcanzan en el cuello.');a.flag('heldMaysilee');a.stat('support',6);a.log('No puedes detenerlos, pero no la dejas morir sola. El público lo ve.');}],
      ['run','Huir antes de que te alcancen',(g,a)=>{a.kill('Maysilee Donner','Muere sola en el claro.');a.stat('stealth',2);a.rel('maysilee',-3);a.log('Huyes. El cañonazo suena a tu espalda.');}],
    ]},
    6:{title:'Lo que el Capitolio emite',body:'Una cámara te enfoca mientras curas tus heridas. Al otro lado, el Distrito 12 está mirando. Y el presidente también.',choices:[
      ['family','Mirar a la cámara y hablarle a los tuyos',(g,a)=>{a.stat('support',6);a.log('Hablas a tu familia en voz baja. Es un gesto pequeño, y el Capitolio lo apunta.');}],
      ['mask','No mostrar nada',(g,a)=>{a.stat('stealth',2);a.log('No das ni una emoción. Para el Capitolio eres ilegible.');}],
      ['mock','Burlarte de los Vigilantes',(g,a)=>{a.stat('rebellion',8);a.stat('support',3);a.flag('mockedCapitol');a.log('Te ríes de su Arena en directo. A alguien en el Capitolio no le hace gracia.');}],
    ]},
  },
  74:{
    1:{title:'El baño de sangre',body:'El gong suena. Haymitch te dijo que corrieras, pero el arco está a la vista, en la boca de la Cornucopia, y Peeta te hace un gesto con la cabeza: no.',choices:[
      ['run','Hacer caso a Haymitch y correr al bosque',(g,a)=>{a.stat('stealth',3);a.flag('obeyedHaymitch');a.log('Corres hacia los árboles. Sin armas, pero sin heridas.');}],
      ['pack','Coger la mochila naranja y huir',(g,a)=>{a.item('mochila naranja');a.item('saco de dormir');a.stat('health',-5);a.log('Peleas por una mochila con otro tributo. Un cuchillo de Clove se clava en ella en lugar de en tu espalda.');}],
      ['bow','Ir a por el arco',(g,a)=>{if(g.skill>=9){a.item('arco');g.equippedWeapon='arco';a.stat('health',-12);a.log('Alcanzas el arco. Los profesionales ya saben exactamente quién eres.');a.flag('earlyBow');}else{a.stat('health',-24);a.log('Los profesionales llegan antes. Escapas de milagro con una herida en el costado.');}}],
    ]},
    4:{title:'El nido de rastrevíspulas',body:'Los profesionales te han acorralado en un árbol y esperan abajo a que amanezca. Peeta está con ellos. Entre las ramas, Rue señala en silencio un nido sobre tu cabeza.',choices:[
      ['drop','Serrar la rama y dejar caer el nido',(g,a)=>{a.kill('Glimmer','Las rastrevíspulas no dejan escapar a nadie.');a.item('arco');g.equippedWeapon='arco';a.stat('health',-14);a.stat('skill',3);a.flag('peetaSavedYou');a.log('El nido cae sobre el campamento. Recuperas el arco de Glimmer y, entre las alucinaciones, Peeta te grita que corras y se enfrenta a Cato por ti.');}],
      ['wait','Esperar a que se cansen',(g,a)=>{a.stat('hunger',10);a.stat('fatigue',10);a.log('Esperas. Los profesionales no se van: solo has ganado tiempo.');}],
      ['talk','Llamar a Peeta para negociar',(g,a)=>{a.stat('health',-10);a.rel('peeta',1);a.log('Peeta te mira, pero no puede ayudarte delante de Cato. Escapas al anochecer, herida.');}],
    ]},
    7:{title:'Las reglas cambian',body:'La voz de Claudius Templesmith anuncia una novedad: dos tributos del mismo distrito podrán ganar juntos. Peeta está herido en algún lugar junto al río. Y los Vigilantes convocan un banquete.',choices:[
      ['find','Buscar a Peeta en la orilla',(g,a)=>{a.ally('Peeta Mellark');a.flag('peetaFound');a.rel('peeta',3);a.stat('support',10);a.log('Lo encuentras camuflado en el barro, con la pierna infectada. Los amantes trágicos vuelven a estar juntos.');}],
      ['feast','Ir al banquete a por medicinas',(g,a)=>{a.flag('peetaFound');a.ally('Peeta Mellark');if(a.relOf('rue')>0||a.has('rueSignals')){a.kill('Clove','Thresh te reconoce por lo que hiciste por Rue y te deja marchar.');a.flag('threshSpared');a.item('medicina');a.log('Clove te inmoviliza en el banquete, pero Thresh la detiene. «Solo esta vez, por la pequeña».');}else{a.stat('health',-25);a.item('medicina');a.log('Consigues la medicina, pero Clove te marca la frente con un cuchillo.');}}],
      ['hide','Mantenerte escondida y dejar que otros se maten',(g,a)=>{a.stat('stealth',3);a.rel('peeta',-3);a.log('Te ocultas. La audiencia no entiende por qué no vas a buscarle.');a.stat('support',-8);}],
    ]},
  },
  75:{
    1:{title:'Las plataformas de agua',body:'Las plataformas se elevan sobre un lago salado. Peeta no sabe nadar. Finnick Odair ya está en el agua, mirándote, con un tridente al alcance de la mano.',choices:[
      ['finnick','Aceptar la ayuda de Finnick',(g,a)=>{a.ally('Finnick Odair');a.flag('finnickTrusted');a.rel('victors',1);a.log('Finnick lleva el brazalete de Haymitch. Es la señal: aliados.');}],
      ['peeta','Nadar primero hacia Peeta',(g,a)=>{a.ally('Peeta Mellark');a.flag('guardedPeeta');a.rel('peeta',2);a.stat('health',-6);a.log('Llegas hasta Peeta y le sacas del agua. Finnick os sigue sin atacar.');}],
      ['alone','Ir sola a por armas',(g,a)=>{a.item('arco');g.equippedWeapon='arco';a.stat('health',-10);a.rel('victors',-1);a.log('Te haces con un arco. Finnick no ataca, pero toma nota.');}],
    ]},
    4:{title:'La niebla',body:'Una niebla espesa avanza por la jungla y quema la piel. Mags no puede correr. Finnick no puede cargar con los dos.',choices:[
      ['carry','Cargar tú con Mags',(g,a)=>{if(a.relOf('victors')>=2&&g.health>=60){a.stat('health',-25);a.flag('magsSaved');a.rel('victors',2);a.log('Cargas con Mags hasta el agua. Tienes la piel en carne viva, pero Mags vive. No era así como tenía que terminar.');}else{a.stat('health',-18);a.kill('Mags Flanagan','Se adentra en la niebla para no retrasaros.');a.log('Lo intentas, pero no puedes con ella. Mags te besa en la frente y camina hacia la niebla.');}}],
      ['let','Dejar que Mags elija',(g,a)=>{a.kill('Mags Flanagan','Se adentra en la niebla para no retrasaros.');a.stat('health',-8);a.rel('victors',1);a.log('Mags besa a Finnick y camina hacia la niebla. Nadie la detiene.');}],
      ['run','Correr sin mirar atrás',(g,a)=>{a.kill('Mags Flanagan','La niebla la alcanza.');a.rel('victors',-2);a.log('Corres. Cuando la niebla se disipa, Finnick no te mira a los ojos.');}],
    ]},
    7:{title:'Los charlajos',body:'Unos pájaros negros llenan el sector con gritos que conoces: es la voz de Prim. Sabes que no puede ser real. No te sirve de nada saberlo. Wiress ya no está: Gloss la mató junto al árbol.',pre:(g,a)=>a.kill('Wiress','Gloss la alcanza junto al árbol.'),choices:[
      ['endure','Taparos los oídos y esperar juntos',(g,a)=>{a.rel('victors',2);a.stat('fatigue',8);a.log('Finnick y tú os tapáis los oídos el uno al otro hasta que el sector se calla.');}],
      ['chase','Ir tras la voz',(g,a)=>{a.stat('health',-15);a.log('Golpeas el muro invisible del sector y caes, ensangrentada. Prim no estaba allí.');}],
      ['map','Usar los gritos para cronometrar el reloj',(g,a)=>{a.flag('clockObserved');a.stat('skill',2);a.log('Cuentas los segundos entre sector y sector. Ya sabes que la Arena es un reloj.');}],
    ]},
  },
};

export function chapterEvent(g,turn){
  if(g.mode!=='story')return null;
  const c=chapters[g.edition]?.[turn];
  if(!c)return null;
  return {title:c.title,body:c.body,chapter:true,turn,choices:c.choices.map(([id,label])=>[id,label])};
}

// Ajusta acontecimientos de la versión 4.4 según lo que ya ha pasado en la partida.
export function adaptCampaignEvent(g,event,a){
  if(g.mode!=='story')return event;
  // 74.º: la muerte de Rue ocurre salvo que la alianza haya sido real y constante.
  if(g.edition===74&&event.thread==='memory'){
    const strong=a.relOf('rue')>=3&&a.find('Rue')?.alliance==='player';
    if(strong&&a.alive('Rue')){
      a.flag('rueSaved');
      return {title:'La red que resiste',body:'Marvel tiende una red para atrapar a Rue, pero vuestras señales funcionan: llegas antes que él. Rue sigue viva. El Capitolio no tenía preparada esta retransmisión.',chapter:true,custom:'rueSaved',choices:variants.rueSaved.map(([id,label])=>[id,label])};
    }
    a.kill('Marvel','Le alcanza una flecha.');
    a.kill('Rue','Marvel la alcanza con una lanza antes de que llegues.');
  }
  return event;
}

const variants={
  rueSaved:[
    ['shelter','Esconder a Rue y seguir juntas',(g,a)=>{a.ally('Rue');a.rel('rue',2);a.stat('stealth',1);a.log('Rue y tú volvéis a la red de señales. Ahora sois dos contra la Arena.');}],
    ['fight','Acabar con Marvel antes de que vuelva',(g,a)=>{a.kill('Marvel','Una flecha le alcanza entre los árboles.');a.stat('support',6);a.log('Marvel no volverá a tender redes.');}],
    ['split','Separaros para que no os encuentren juntas',(g,a)=>{a.stat('stealth',3);a.log('Os separáis con una señal acordada. Rue sabe cómo encontrarte.');}],
  ],
};

export function applyChapterChoice(g,event,choiceId,a){
  const c=event.custom?{choices:variants[event.custom]}:chapters[g.edition]?.[event.turn];
  if(!c)return;
  const choice=c.choices.find(x=>x[0]===choiceId);
  if(choice)choice[2](g,a);
}

export function runChapterPre(g,turn,a){
  const c=chapters[g.edition]?.[turn];
  if(c?.pre)c.pre(g,a);
}

// ---------------------------------------------------------------------------
// Finales: dependen de la decisión final y de todo lo acumulado.
// ---------------------------------------------------------------------------
export function composeEnding(g,finalChoice){
  const f=g.flags||{},r=g.relationships||{};const out=[];const dead=g.health<=0;
  const alive=n=>!!(g.tributes||[]).find(t=>t.name===n&&t.alive);
  let title=dead?'TU HISTORIA TERMINA':'FIN DE LOS JUEGOS';
  if(g.edition===50){
    if(dead){title='EL DISTRITO 12 PIERDE A OTRO TRIBUTO';out.push('Haymitch no sale de la Arena. El Segundo Vasallaje tendrá otro vencedor y el Distrito 12 seguirá sin uno durante años.');}
    else if(finalChoice==='exploit'&&(f.forcefieldStudied||f.forcefieldTested)){title='EL VENCEDOR DEL SEGUNDO VASALLAJE';out.push('Haymitch usa el campo de fuerza para devolver el hacha a su rival. Gana, como en el canon, y deja en ridículo a los Vigilantes.');out.push('El Capitolio no perdona la humillación: en pocas semanas, su madre, su hermano y la chica a la que quería mueren. Haymitch aprende a beber.');}
    else{title='UNA VICTORIA DISTINTA';out.push('Haymitch sale de la Arena sin haber usado el campo de fuerza contra el Capitolio. Es un vencedor que no les ha humillado.');out.push(f.mockedCapitol?'Aun así, se burló de ellos en directo. El presidente no lo olvida: su familia vive vigilada.':'Su familia sigue viva. Quizá el Haymitch de esta historia no necesite la botella.');}
    if(f.maysileeSaved&&alive('Maysilee Donner'))out.push('Maysilee Donner sobrevive a los pájaros. Las reglas solo permiten un vencedor: el Capitolio tendrá que decidir qué hacer con ella, y esa decisión será pública.');
    else if(f.heldMaysilee)out.push('Haymitch estuvo con Maysilee hasta el final. Años después, su sinsajo dorado acabará en manos de Katniss Everdeen.');
  }
  if(g.edition===74){
    const peeta=alive('Peeta Mellark');
    if(dead){title='LOS JUEGOS CONTINÚAN SIN TI';out.push('Katniss cae en la Arena. Prim queda sola en el Distrito 12, y la chispa que podría haber prendido Panem no llega a encenderse.');}
    else if(finalChoice==='berries'&&peeta){title='LOS AMANTES TRÁGICOS';out.push('Las bayas de jaula nocturna obligan a los Vigilantes a ceder: dos vencedores del Distrito 12. Seneca Crane pagará el error con su vida.');out.push('Para el Capitolio fue un acto de amor; para los distritos, un desafío. Snow sabe cuál de las dos lecturas es la verdadera.');}
    else if(finalChoice==='solo'){title='UNA VENCEDORA OBEDIENTE';out.push('Katniss gana sola. El Capitolio recupera el control del relato y el Distrito 12 entierra a Peeta.');out.push('Sin las bayas no hay símbolo. La rebelión tardará mucho más en llegar, si llega.');}
    else{title='EL FINAL QUE NO EMITIERON';out.push('Katniss se niega a representar el final que esperaban. La retransmisión se corta, pero en los distritos ya lo han visto.');}
    if(f.rueSaved&&alive('Rue'))out.push('Rue sobrevive a los Juegos. En el Distrito 11, su nombre se convierte en una contraseña.');
    else if(f.publicMourning)out.push('Las flores que dejaste junto a Rue desataron disturbios en el Distrito 11. Allí ya nadie lo olvida.');
    if(f.threshSpared)out.push('Thresh saldó su deuda en el banquete. En el Distrito 11 saben por qué.');
  }
  if(g.edition===75){
    if(dead){title='EL SINSAJO CAE';out.push('Katniss muere en el reloj. Los rebeldes pierden a su símbolo antes de poder usarlo.');}
    else if(finalChoice==='breakout'&&f.clockPlan){title='LA ARENA SE ROMPE';out.push('La flecha con el cable de Beetee atraviesa el campo de fuerza y la cúpula estalla. Un aerodeslizador del Distrito 13 te saca de la Arena.');out.push(alive('Peeta Mellark')&&(f.guardedPeeta||finalChoice==='rescue')?'Esta vez Peeta sube al aerodeslizador contigo. El Capitolio pierde su mejor arma contra el Sinsajo.':'Peeta y Johanna caen en manos del Capitolio, como en el canon.');out.push('Esa misma noche, el Capitolio bombardea el Distrito 12. Gale saca a cientos de personas de las llamas.');}
    else if(finalChoice==='rescue'){title='NADIE SE QUEDA ATRÁS';out.push('Priorizas a tus aliados. El plan pierde precisión, pero el aerodeslizador recoge a más vencedores de los que el canon salvó.');if(alive('Peeta Mellark'))out.push('Peeta escapa contigo. Snow tendrá que buscar otra forma de quebrarte.');}
    else{title='UNA HUIDA EN SOLITARIO';out.push('Actúas por tu cuenta. La Arena se rompe, pero sin coordinación: no sabes quién ha salido y quién no.');}
    if(f.magsSaved&&alive('Mags Flanagan'))out.push('Mags sale viva del Vasallaje. Finnick no olvidará lo que hiciste.');
  }
  if(!out.length)out.push(g.storyEnding||'La Arena ha cerrado su registro.');
  const reb=g.rebellion||0;
  out.push(reb>=60?'En los distritos, la rebelión ya no se puede contener.':reb>=30?'En los distritos crece algo que el Capitolio todavía cree que puede controlar.':'Panem sigue en calma. Por ahora.');
  return {endingTitle:title,storyEpilogue:out};
}
