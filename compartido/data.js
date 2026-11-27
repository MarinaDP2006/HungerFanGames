// Datos de Panem compartidos por el videojuego (Android) y el Archivo de Panem (Web).
// Fuente única: compartido/data.js. Las copias en La_Cosecha_*/js/data.js se generan con
// `node scripts/sincronizar-compartido.mjs` y el detector de contratos exige que sean idénticas.
// Solo datos: nada de interfaz ni lógica de juego.
// IDs estables (district_id, character_id) y campos canon_status/source_ref según el modelo de datos de la
// Entrega Maestra v1. «unknown» y null significan «sin clasificar»: los valores los aporta la dirección creativa.
export const districts=[
{id:1,district_id:"district_01",canon_status:"unknown",source_ref:null,name:"Distrito 1",industry:"Artículos de lujo",description:"Distrito rico, estrechamente vinculado al Capitolio. Sus tributos suelen recibir entrenamiento privilegiado.",color:"#b88d4d"},
{id:2,district_id:"district_02",canon_status:"unknown",source_ref:null,name:"Distrito 2",industry:"Cantería y defensa",description:"Centro de cantería, armamento y formación militar. Produce muchos profesionales.",color:"#8f7660"},
{id:3,district_id:"district_03",canon_status:"unknown",source_ref:null,name:"Distrito 3",industry:"Tecnología",description:"Electrónica, ingeniería y sistemas. La inteligencia puede compensar la falta de fuerza.",color:"#6e8c92"},
{id:4,district_id:"district_04",canon_status:"unknown",source_ref:null,name:"Distrito 4",industry:"Pesca",description:"Costa y pesca. Algunos tributos reciben preparación desde jóvenes.",color:"#4e8290"},
{id:5,district_id:"district_05",canon_status:"unknown",source_ref:null,name:"Distrito 5",industry:"Energía",description:"Infraestructura energética y centrales.",color:"#b5a15f"},
{id:6,district_id:"district_06",canon_status:"unknown",source_ref:null,name:"Distrito 6",industry:"Transporte",description:"Trenes, vehículos y transporte de Panem.",color:"#7c7d86"},
{id:7,district_id:"district_07",canon_status:"unknown",source_ref:null,name:"Distrito 7",industry:"Madera",description:"Bosques, tala y trabajo con herramientas.",color:"#6d8a5a"},
{id:8,district_id:"district_08",canon_status:"unknown",source_ref:null,name:"Distrito 8",industry:"Textiles",description:"Fábricas textiles y producción industrial.",color:"#9b6d75"},
{id:9,district_id:"district_09",canon_status:"unknown",source_ref:null,name:"Distrito 9",industry:"Grano",description:"Campos de cereal y procesado de grano.",color:"#a58d55"},
{id:10,district_id:"district_10",canon_status:"unknown",source_ref:null,name:"Distrito 10",industry:"Ganadería",description:"Ganadería y producción animal.",color:"#9b795c"},
{id:11,district_id:"district_11",canon_status:"unknown",source_ref:null,name:"Distrito 11",industry:"Agricultura",description:"Grandes campos agrícolas, vigilancia estricta y pobreza extrema.",color:"#66804f"},
{id:12,district_id:"district_12",canon_status:"unknown",source_ref:null,name:"Distrito 12",industry:"Minería",description:"Cuenca minera de carbón, pobreza y una larga historia de resistencia.",color:"#77736d"},
{id:13,district_id:"district_13",canon_status:"unknown",source_ref:null,name:"Distrito 13",industry:"Grafito y defensa nuclear",description:"Distrito oficialmente destruido tras la Primera Rebelión; su supervivencia se revela más tarde.",color:"#64747e"}
];
export const characters=[
{character_id:"katniss_everdeen",canon_status:"unknown",source_ref:null,name:"Katniss Everdeen",district:12,role:"Tributo · Sinsajo",portrait:1,canon:true,traits:["Supervivencia","Arquería","Desconfianza"],bio:"Cazadora del Distrito 12. Su acto de desafío con las bayas altera el relato que el Capitolio pretende controlar."},
{character_id:"peeta_mellark",canon_status:"unknown",source_ref:null,name:"Peeta Mellark",district:12,role:"Tributo · Vencedor",portrait:2,canon:true,traits:["Persuasión","Resistencia","Empatía"],bio:"Panadero y estratega social. Su capacidad para conectar con el público será decisiva."},
{character_id:"rue",canon_status:"unknown",source_ref:null,name:"Rue",district:11,role:"Tributo",portrait:3,canon:true,traits:["Agilidad","Observación","Sigilo"],bio:"Joven tributo del Distrito 11, rápida y experta en moverse entre los árboles."},
{character_id:"cato",canon_status:"unknown",source_ref:null,name:"Cato",district:2,role:"Tributo profesional",portrait:4,canon:true,traits:["Combate","Fuerza","Agresividad"],bio:"Uno de los tributos profesionales más peligrosos de la 74.ª edición."},
{character_id:"thresh",canon_status:"unknown",source_ref:null,name:"Thresh",district:11,role:"Tributo",portrait:5,canon:true,traits:["Fuerza","Resistencia","Prudencia"],bio:"Tributo poderoso del Distrito 11, reservado y difícil de intimidar."},
{character_id:"clove",canon_status:"unknown",source_ref:null,name:"Clove",district:2,role:"Tributo profesional",portrait:6,canon:true,traits:["Cuchillos","Velocidad","Precisión"],bio:"Especialista en cuchillos y una amenaza directa en la arena."},
{character_id:"glimmer",canon_status:"unknown",source_ref:null,name:"Glimmer",district:1,role:"Tributo profesional",portrait:7,canon:true,traits:["Carisma","Combate","Capitolio"],bio:"Tributo del Distrito 1, preparada para el espectáculo de los Juegos."},
{character_id:"marvel",canon_status:"unknown",source_ref:null,name:"Marvel",district:1,role:"Tributo profesional",portrait:8,canon:true,traits:["Lanza","Fuerza","Disciplina"],bio:"Tributo del Distrito 1 y miembro de la alianza profesional."},
{character_id:"finnick_odair",canon_status:"unknown",source_ref:null,name:"Finnick Odair",district:4,role:"Vencedor · Mentor",portrait:9,canon:true,traits:["Tridente","Carisma","Estrategia"],bio:"Vencedor del Distrito 4, convertido en mentor y pieza clave de la rebelión."},
{character_id:"johanna_mason",canon_status:"unknown",source_ref:null,name:"Johanna Mason",district:7,role:"Vencedora · Mentoría",portrait:10,canon:true,traits:["Hacha","Astucia","Resistencia"],bio:"Vencedora del Distrito 7, conocida por su carácter feroz y su desprecio por el Capitolio."},
{character_id:"haymitch_abernathy",canon_status:"unknown",source_ref:null,name:"Haymitch Abernathy",district:12,role:"Vencedor · Mentor",portrait:11,canon:true,traits:["Estrategia","Manipulación","Supervivencia"],bio:"Único vencedor vivo del Distrito 12 antes de Katniss y Peeta. Mentor marcado por los Juegos."},
{character_id:"annie_cresta",canon_status:"unknown",source_ref:null,name:"Annie Cresta",district:4,role:"Vencedora",portrait:12,canon:true,traits:["Resistencia","Natación","Sensibilidad"],bio:"Vencedora del Distrito 4, cuya vida queda profundamente marcada por la arena."},
{character_id:"beetee_latier",canon_status:"unknown",source_ref:null,name:"Beetee Latier",district:3,role:"Vencedor · Mentor",portrait:2,canon:true,traits:["Ingeniería","Electricidad","Análisis"],bio:"Vencedor del Distrito 3, brillante con circuitos y tecnología."},
{character_id:"wiress",canon_status:"unknown",source_ref:null,name:"Wiress",district:3,role:"Vencedora · Mentoría",portrait:5,canon:true,traits:["Patrones","Observación","Ingenio"],bio:"Vencedora del Distrito 3, capaz de detectar patrones que otros pasan por alto."},
{character_id:"cecelia",canon_status:"unknown",source_ref:null,name:"Cecelia",district:8,role:"Vencedora · Mentoría",portrait:6,canon:true,traits:["Resistencia","Empatía","Experiencia"],bio:"Vencedora del Distrito 8 y antigua mentora."},
{character_id:"chaff",canon_status:"unknown",source_ref:null,name:"Chaff",district:11,role:"Vencedor · Mentor",portrait:8,canon:true,traits:["Fuerza","Experiencia","Ironía"],bio:"Vencedor del Distrito 11, veterano de los Juegos."}
];
export const mentors={
1:["Mentor del Distrito 1","Gloss","Cashmere"],2:["Mentor del Distrito 2","Brutus","Enobaria"],3:["Beetee Latier","Wiress"],4:["Finnick Odair","Mags Flanagan"],5:["Vencedor del Distrito 5"],6:["Vencedor del Distrito 6"],7:["Johanna Mason"],8:["Cecelia","Woof"],9:["Vencedor del Distrito 9"],10:["Vencedor del Distrito 10"],11:["Chaff","Seeder"],12:["Haymitch Abernathy"]
};
export const canonEditions=[
{year:10,title:"10.º Juegos del Hambre",note:"La era de los primeros Juegos televisados. El Capitolio todavía está definiendo el espectáculo.",arena:"anfiteatro temprano"},
{year:50,title:"50.º Vasallaje de los Veinticinco",note:"Haymitch Abernathy vence en una arena con el doble de tributos.",arena:"paisaje letal"},
{year:74,title:"74.º Juegos del Hambre",note:"Katniss Everdeen y Peeta Mellark desafían al Capitolio con la amenaza de un doble suicidio.",arena:"bosque y lago"},
{year:75,title:"75.º Vasallaje de los Veinticinco",note:"Los vencedores vuelven a la arena. La edición es una pieza del plan rebelde.",arena:"reloj de peligros"}
];
export const arenaTypes=[
{name:"Bosque templado",description:"Arroyos, árboles altos, claros y zonas de caza.",danger:["incendio","depredadores","tormenta"]},
{name:"Desierto de cristal",description:"Dunas, espejismos, calor y depósitos de agua escasos.",danger:["deshidratación","tormenta de arena","criaturas"]},
{name:"Reloj de peligros",description:"Sectores que activan amenazas distintas a cada hora.",danger:["niebla tóxica","ola gigante","relámpagos"]},
{name:"Ruinas inundadas",description:"Una ciudad abandonada con edificios semisumergidos.",danger:["corrientes","derrumbes","frío"]},
{name:"Selva venenosa",description:"Vegetación densa, frutos engañosos y fauna hostil.",danger:["veneno","parásitos","depredadores"]}
];
export const storyBeats={
74:[
{title:"La cosecha",text:"En el Distrito 12, la plaza contiene la respiración mientras Effie Trinket se acerca a las urnas. Una elección puede cambiar la vida de dos familias.",choices:[{label:"Ofrecerte voluntariamente por Prim",effects:{rebellion:2,resolve:10},next:"training"},{label:"Mantenerte en silencio y observar",effects:{caution:8},next:"training"}]},
{title:"El tren al Capitolio",text:"Haymitch llega tarde, con olor a alcohol y una sonrisa que no promete nada. Peeta intenta hablar contigo. La confianza no se regala.",choices:[{label:"Aceptar la ayuda de Haymitch",effects:{mentor:8},next:"training"},{label:"Entrenar por tu cuenta",effects:{skill:5,caution:4},next:"training"},{label:"Hablar con Peeta",effects:{bond:10},next:"training"}]},
{title:"La arena",text:"El gong rompe el silencio. La Cornucopia está rodeada de armas, mochilas y cuerpos que aún no han decidido correr.",choices:[{label:"Correr a por suministros",effects:{risk:8,gear:1},next:"arena"},{label:"Huir hacia el bosque",effects:{caution:10},next:"arena"},{label:"Buscar a tu aliado",effects:{bond:8},next:"arena"}]}
],
75:[
{title:"El Vasallaje",text:"El Capitolio anuncia que los tributos serán elegidos entre los vencedores vivos. El pasado vuelve a reclamar su precio.",choices:[{label:"Aceptar el destino y preparar una estrategia",effects:{resolve:10},next:"training"},{label:"Buscar contactos en los distritos",effects:{rebellion:8},next:"training"}]}
]
};
