// Juega las tres campañas completas (turnos 1-8) con el motor real de app.js y comprueba los finales.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as data from '../js/data.js';
import * as campaigns from '../js/campaigns.js';
import * as WI from '../js/whatif.js';
import * as PR from '../js/presidency.js';

function engine(){
  const screen={innerHTML:''},indicator={textContent:''};
  const document={querySelector:s=>s==='#screen'?screen:s==='#save-indicator'?indicator:null};
  const context={...data,...campaigns,WI,PR,document,console,Math,Date,JSON,Number,String,Array,Object,Map,Set,Blob:class{},URL:{},
    localStorage:{setItem(){},getItem(){return null}},alert(){},navigator:{},window:{},setTimeout,clearTimeout};
  let src=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'');
  src=src.slice(0,src.indexOf("document.addEventListener('click'"));
  src+=`\nrenderGame=()=>{};globalThis.api={setGame(v){game=v},getGame(){return game},triggerCampaignEvent,resolveStoryChoice};`;
  vm.runInNewContext(src,context,{filename:'app.js'});
  return context.api;
}

const casts={
  50:[['Haymitch Abernathy',12],['Maysilee Donner',12]],
  74:[['Katniss Everdeen',12],['Peeta Mellark',12],['Rue',11],['Thresh',11],['Glimmer',1],['Marvel',1],['Clove',2],['Cato',2]],
  75:[['Katniss Everdeen',12],['Peeta Mellark',12],['Finnick Odair',4],['Mags Flanagan',4],['Wiress',3],['Beetee Latier',3],['Johanna Mason',7],['Gloss',1]],
};
function newGame(edition,extra={}){
  const tributes=casts[edition].map(([name,district],i)=>({id:'t'+i,name,district,alive:true,player:i===0,alliance:null,sector:1}));
  return {mode:'story',edition,arenaTurn:0,day:0,health:100,hunger:0,thirst:0,fatigue:0,skill:8,stealth:0,support:30,rebellion:0,
    flags:{},relationships:{},inventory:[],log:[],tributes,playerSector:1,phase:'arena',equippedWeapon:'ninguna',...extra};
}
// Juega 8 turnos; `pick(turn,event)` decide la opción (por defecto, la primera).
function play(edition,pick=()=>0,extra){
  const api=engine();api.setGame(newGame(edition,extra));
  const titles=[];
  for(let turn=1;turn<=8;turn++){
    const g=api.getGame();if(g.phase==='ending')break;
    g.arenaTurn=turn;api.triggerCampaignEvent();
    const ev=api.getGame().pendingStoryEvent;
    if(ev){titles.push(ev.title);const i=pick(turn,ev);api.resolveStoryChoice(ev.choices[Math.min(i,ev.choices.length-1)][0]);}
  }
  return {g:api.getGame(),titles};
}
const alive=(g,n)=>g.tributes.find(t=>t.name===n)?.alive;

// Cada campaña tiene ahora un acontecimiento en los 8 turnos.
for(const ed of [50,74,75]){const {titles,g}=play(ed);assert.equal(titles.length,8,`campaña ${ed}: 8 capítulos (${titles.join(' | ')})`);assert.equal(g.phase,'ending',`campaña ${ed} llega al final`);assert.ok(g.storyEpilogue?.length>=2,`campaña ${ed} tiene epílogo`);assert.ok(g.endingTitle,`campaña ${ed} tiene título de final`);}

// 50.º canónico: Maysilee muere y Haymitch gana con el campo de fuerza.
{const {g}=play(50,(t,ev)=>({7:1,5:0,8:0}[t]??0));
 assert.equal(alive(g,'Maysilee Donner'),false,'50 canon: Maysilee muere');
 assert.equal(g.endingTitle,'EL VENCEDOR DEL SEGUNDO VASALLAJE');
 assert.ok(g.storyEpilogue.some(x=>/sinsajo dorado/.test(x)),'50 canon: el sinsajo de Maysilee');}
// 50.º alternativo: refugio compartido + escudo = Maysilee vive.
{const {g}=play(50,(t)=>({2:0,3:0,7:0}[t]??0),{skill:12});
 assert.equal(alive(g,'Maysilee Donner'),true,'50 alt: Maysilee sobrevive');
 assert.ok(g.flags.maysileeSaved);}

// 74.º canónico: Rue muere, las bayas dan dos vencedores.
{const {g}=play(74,(t)=>({2:2,3:2,7:0}[t]??0));
 assert.equal(alive(g,'Rue'),false,'74 canon: Rue muere');
 assert.equal(alive(g,'Glimmer'),false,'74: las rastrevíspulas matan a Glimmer');
 assert.equal(g.endingTitle,'LOS AMANTES TRÁGICOS');}
// 74.º alternativo: alianza real con Rue = Rue vive.
{const {g}=play(74,(t)=>({2:0,3:0}[t]??0));
 assert.equal(alive(g,'Rue'),true,'74 alt: Rue sobrevive');
 assert.ok(g.storyEpilogue.some(x=>/Rue sobrevive/.test(x)));}
// 74.º: victoria en solitario.
{const {g}=play(74,(t)=>t===8?1:0);assert.equal(g.endingTitle,'UNA VENCEDORA OBEDIENTE');assert.equal(alive(g,'Peeta Mellark'),false);}

// 75.º canónico: Mags y Wiress mueren, la Arena se rompe.
{const {g}=play(75,(t)=>({4:1}[t]??0));
 assert.equal(alive(g,'Mags Flanagan'),false,'75 canon: Mags entra en la niebla');
 assert.equal(alive(g,'Wiress'),false,'75 canon: Wiress muere');
 assert.equal(g.endingTitle,'LA ARENA SE ROMPE');}
// 75.º alternativo: salvar a Mags.
{const {g}=play(75,(t)=>({1:0,2:0,3:0,4:0}[t]??0));
 assert.equal(alive(g,'Mags Flanagan'),true,'75 alt: Mags sobrevive');}

// Protección narrativa: el azar no mata a Rue antes de su capítulo.
{const g=newGame(74);g.arenaTurn=3;const rue=g.tributes.find(t=>t.name==='Rue');assert.ok(campaigns.isProtected(g,rue));g.arenaTurn=7;assert.ok(!campaigns.isProtected(g,rue));}
// Muerte del jugador: final propio.
{const api=engine();const g=newGame(74,{health:5});api.setGame(g);g.arenaTurn=1;api.triggerCampaignEvent();api.resolveStoryChoice('bow');
 const r=api.getGame();assert.equal(r.phase,'ending');assert.equal(r.endingTitle,'LOS JUEGOS CONTINÚAN SIN TI');}

console.log('La Cosecha campañas: OK (3 campañas completas, 9 recorridos)');
