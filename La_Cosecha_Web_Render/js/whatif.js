// La Cosecha · Modo «¿Y si…?»: ediciones alternativas dentro del modo libre.
// Parte de una alineación canónica (74.º o 75.º) o de tributos originales y permite
// sustituir, añadir y elegir con quién se juega. Los anónimos del canon siguen siendo anónimos.

const rosters={
  74:{1:['Glimmer','Marvel'],2:['Clove','Cato'],11:['Rue','Thresh'],12:['Katniss Everdeen','Peeta Mellark']},
  75:{1:['Cashmere','Gloss'],2:['Enobaria','Brutus'],3:['Wiress','Beetee Latier'],4:['Mags Flanagan','Finnick Odair'],7:['Johanna Mason','Blight'],8:['Cecelia','Woof'],11:['Seeder','Chaff'],12:['Katniss Everdeen','Peeta Mellark']},
};

// Personajes canónicos que se pueden meter en cualquier edición.
export const canonPool=[
  ['Katniss Everdeen',12],['Peeta Mellark',12],['Haymitch Abernathy',12],['Primrose Everdeen',12],['Gale Hawthorne',12],['Madge Undersee',12],
  ['Rue',11],['Thresh',11],['Chaff',11],['Seeder',11],
  ['Finnick Odair',4],['Annie Cresta',4],['Mags Flanagan',4],
  ['Johanna Mason',7],['Blight',7],['Beetee Latier',3],['Wiress',3],
  ['Cato',2],['Clove',2],['Brutus',2],['Enobaria',2],['Glimmer',1],['Marvel',1],['Gloss',1],['Cashmere',1],['Cecelia',8],['Woof',8],
];

export const whatIfBases=[
  {id:'original',title:'Tributos originales',desc:'24 tributos inventados. Puedes añadir personajes canónicos.'},
  {id:'74',title:'Alineación del 74.º',desc:'Los tributos de los 74.º Juegos del Hambre.'},
  {id:'75',title:'Alineación del 75.º',desc:'Los vencedores del Tercer Vasallaje.'},
];

const swap=(from,to,district)=>r=>r.map(t=>t.name===from?{...t,name:to,district:district??t.district,canon:true,portrait:null}:t);
export const whatIfPresets=[
  {id:'prim74',base:'74',title:'Prim es cosechada',desc:'Katniss no se ofrece voluntaria. Prim entra en la Arena con Peeta.',apply:swap('Katniss Everdeen','Primrose Everdeen'),player:'Primrose Everdeen'},
  {id:'sisters74',base:'74',title:'Katniss y Prim, juntas',desc:'Las dos hermanas Everdeen en la misma Arena. Peeta se queda en el Distrito 12.',apply:swap('Peeta Mellark','Primrose Everdeen'),player:'Katniss Everdeen'},
  {id:'gale74',base:'74',title:'Gale en lugar de Peeta',desc:'El chico de la Veta acompaña a Katniss en lugar del hijo del panadero.',apply:swap('Peeta Mellark','Gale Hawthorne'),player:'Katniss Everdeen'},
  {id:'haymitch75',base:'75',title:'Haymitch en lugar de Peeta',desc:'Peeta no se ofrece voluntario: Haymitch vuelve a la Arena con Katniss.',apply:swap('Peeta Mellark','Haymitch Abernathy'),player:'Katniss Everdeen'},
  {id:'annie75',base:'75',title:'Annie en lugar de Mags',desc:'Mags no se ofrece por Annie. Finnick entra en la Arena con la persona a la que quiere.',apply:swap('Mags Flanagan','Annie Cresta'),player:'Finnick Odair'},
  {id:'peeta75',base:'75',title:'Peeta, sin Katniss',desc:'Katniss se queda fuera: Haymitch y Peeta representan al Distrito 12.',apply:r=>swap('Katniss Everdeen','Haymitch Abernathy')(r),player:'Peeta Mellark'},
];

let seq=0;
const tribute=(name,district,canon,portrait=null)=>({id:`w${++seq}`,name,district,canon,portrait});

export function baseRoster(base,originalNames){
  const out=[];
  const pool=[...originalNames];let k=0;
  for(let d=1;d<=12;d++)for(let n=0;n<2;n++){
    const known=base!=='original'&&rosters[base]?.[d]?.[n];
    if(known)out.push(tribute(known,d,true));
    else if(base==='original')out.push(tribute(pool[k++%pool.length],d,false,1+((d*2+n)%12)));
    else out.push(tribute(base==='75'?(n?`Vencedor no identificado · Distrito ${d}`:`Vencedora no identificada · Distrito ${d}`):`Tributo ${n?'masculino':'femenino'} del Distrito ${d}`,d,true));
  }
  return out;
}

export function newWhatIf(originalNames){
  return {base:'original',preset:null,roster:baseRoster('original',originalNames),playerId:null};
}
export function applyBase(state,base,originalNames){
  state.base=base;state.preset=null;state.roster=baseRoster(base,originalNames);state.playerId=null;
}
export function applyPreset(state,presetId,originalNames){
  const p=whatIfPresets.find(x=>x.id===presetId);if(!p)return;
  applyBase(state,p.base,originalNames);
  state.roster=p.apply(state.roster);state.preset=p.id;
  state.playerId=state.roster.find(t=>t.name===p.player)?.id||null;
}
export function replaceTribute(state,id,name,district){
  name=String(name||'').trim().slice(0,30);if(!name)return false;
  const canon=canonPool.find(c=>c[0]===name);
  state.roster=state.roster.map(t=>t.id===id?{...t,name,district:canon?canon[1]:Number(district)||t.district,canon:!!canon,portrait:canon?null:1+Math.floor(Math.random()*12)}:t);
  state.preset=null;return true;
}
export function addTribute(state,name,district){
  name=String(name||'').trim().slice(0,30);if(!name)return false;
  const canon=canonPool.find(c=>c[0]===name);
  state.roster.push(tribute(name,canon?canon[1]:Math.min(12,Math.max(1,Number(district)||12)),!!canon,canon?null:1+Math.floor(Math.random()*12)));
  return true;
}
export function removeTribute(state,id){
  if(state.roster.length<=2)return false;
  state.roster=state.roster.filter(t=>t.id!==id);if(state.playerId===id)state.playerId=null;return true;
}

// Convierte la alineación en tributos de partida.
export function buildTributes(state){
  return state.roster.map(t=>({id:t.id,name:t.name,district:t.district,alive:true,hp:100,skill:4+Math.floor(Math.random()*6),x:12+Math.random()*76,y:12+Math.random()*76,portrait:t.portrait,canon:t.canon,alliance:null}));
}
export function describe(state){
  const p=whatIfPresets.find(x=>x.id===state.preset);
  if(p)return `¿Y si…? ${p.title}. ${p.desc}`;
  if(state.base==='original')return null;
  return `¿Y si…? Una versión alterada de los ${state.base}.º Juegos del Hambre, con ${state.roster.length} tributos.`;
}
