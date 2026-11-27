// Integración real del 50.º Vasallaje (5.1 + adaptador 5.5) en el motor de Android.
// Todo se ejecuta a través de app.js: begin(), renderGame(), el manejador de clics real,
// save()/load(), exportSave()/importSaveFile() y triggerCampaignEvent().
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as data from '../js/data.js';
import * as campaigns from '../js/campaigns.js';
import * as WI from '../js/whatif.js';
import * as PR from '../js/presidency.js';
import * as PRE from '../js/campaign-50th-prearena.js';
import * as ST from '../js/settings.js';
import * as SV from '../js/saves.js';
import {GAME_VERSION} from '../js/version.js';
import * as AD from '../js/campaign-50th-dynamic-adapter.js';

// Motor con DOM mínimo. A diferencia de otras pruebas, aquí se conserva el manejador de clics de
// app.js para pulsar los mismos botones que el jugador (data-pre50-choice, data-a, data-train…).
function engine(opts={}){
  const store={},alerts=[];let clickHandler=null,lastBlob=null;
  const el=()=>({textContent:'',innerHTML:'',value:'',classList:{add(){},remove(){}},click(){},focus(){}});
  const nodes={'#screen':el(),'#save-indicator':el()};
  const document={
    querySelector:s=>nodes[s]||null,
    createElement:()=>({click(){}}),
    addEventListener:(type,fn)=>{if(type==='click')clickHandler=fn;},
  };
  class Blob{constructor(parts){lastBlob=parts.join('');}}
  const ctx={...data,...campaigns,...PRE,ST,SV,GAME_VERSION,...AD,WI,PR,Proxy,document,console,Math,Date,JSON,Number,String,Array,Object,Map,Set,Blob,
    URL:{createObjectURL:()=>'blob:x',revokeObjectURL(){}},
    localStorage:{setItem:(k,v)=>{store[k]=String(v)},getItem:k=>store[k]??null},
    alert:m=>alerts.push(m),navigator:{},window:{addEventListener(){}},setTimeout,clearTimeout,AudioContext:undefined,...(opts.overrides||{})};
  let src=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'');
  // Se conserva el manejador de clics y se descartan los arranques que dependen del navegador real.
  const cut=src.indexOf("document.addEventListener('click'");
  const handlerEnd=src.indexOf('\n',cut);
  src=src.slice(0,handlerEnd);
  src+=`\nglobalThis.api={g:()=>game,set:v=>{game=v},setMode:(m,e)=>{mode=m;edition=e},begin,save,load,exportSave,importSaveFile,renderGame,triggerCampaignEvent,resolveStoryChoice,modeSetup};`;
  vm.runInNewContext(src,ctx,{filename:'app.js'});
  // Simula un clic sobre un botón con los atributos data-* indicados.
  const click=dataset=>clickHandler({target:{closest:()=>({dataset,classList:{add(){}},textContent:''})}});
  return {api:ctx.api,store,alerts,nodes,click,lastBlob:()=>lastBlob};
}
const start50=(opts)=>{const e=engine(opts);e.api.setMode('story',50);e.api.begin();return e;};
const html=e=>e.nodes['#screen'].innerHTML;
const route=['watch','memorize','silence','maysilee','comply','survival','record','mask','alliance'];
const order=['reaping','woodbine','goodbye','train','arrival','training','parade','interview','last-night'];

test('1-4. Reparto de 48, cuatro por distrito, Haymitch jugador y Maysilee independiente',()=>{
  const {api}=start50();const g=api.g();
  assert.equal(g.tributes.length,48);
  for(let d=1;d<=12;d++)assert.equal(g.tributes.filter(t=>t.district===d).length,4,`distrito ${d}`);
  const players=g.tributes.filter(t=>t.player);assert.equal(players.length,1);
  assert.equal(players[0].name,'Haymitch Abernathy');assert.equal(g.name,'Haymitch Abernathy');assert.equal(g.district,12);
  const m=g.tributes.find(t=>t.name==='Maysilee Donner');
  assert.ok(m&&!m.player&&m.district===12,'Maysilee es un tributo propio del Distrito 12');
  assert.equal(g.phase,'prearena50');assert.ok(g.preArena50);
});

test('5. Las nueve escenas aparecen en la partida en orden y se juegan con los botones reales',()=>{
  const e=start50();const seen=[];
  for(const id of route){e.api.renderGame();const scene=PRE.getPreArena50Scene(e.api.g().preArena50);seen.push(scene.id);
    assert.ok(html(e).includes(scene.title),`la escena «${scene.title}» se ve en pantalla`);
    assert.ok(html(e).includes(`data-pre50-choice="${id}"`));e.click({pre50Choice:id});}
  assert.deepEqual(seen,order);
  const g=e.api.g();assert.equal(g.phase,'arena');assert.equal(g.preArena50.history.length,9);
});

test('5b. No se puede saltar la precampaña con los botones generales',()=>{
  const e=start50();e.click({pre50Choice:'watch'});
  for(const a of ['training','interview','arena'])e.click({a});
  e.click({interview:'0'});e.click({act:'rest'});
  const g=e.api.g();assert.equal(g.phase,'prearena50');assert.equal(g.preArena50.index,1);
  // El entrenamiento extra del panel suma, pero no avanza la escena y no se repite.
  for(const id of route.slice(1,5))e.click({pre50Choice:id});
  const skill=g.skill;e.click({train:'survival'});e.click({train:'survival'});
  assert.equal(g.skill,skill+2,'cada ejercicio cuenta una sola vez');assert.equal(g.preArena50.index,5);
});

test('6. Una elección inválida no avanza',()=>{
  const e=start50();e.click({pre50Choice:'no-existe'});
  assert.equal(e.api.g().preArena50.index,0);assert.equal(e.alerts.length,1);
});

test('7. El desfile no contiene la muerte ni el duelo de Louella',()=>{
  const parade=PRE.PRE_ARENA_50.find(s=>s.id==='parade');
  const text=[parade.title,parade.body,...parade.choices.map(c=>c.label)].join(' ');
  assert.doesNotMatch(text,/Louella|muere|muerte|duelo|pérdida|sustitu|accidente|herida/i);
  assert.equal(parade.canonOutcome,undefined);assert.equal(parade.choices.length,3);
  for(const c of parade.choices)assert.ok(Object.keys(c.effects).length>0,`opción ${c.id} con efectos propios`);
  const e=start50();for(const id of route)e.click({pre50Choice:id});
  const g=e.api.g();assert.equal(g.flags.louellaDiedBeforeArena,undefined);assert.equal(g.flags['50th-louellaDiedBeforeArena'],undefined);
});

test('8. Las bonificaciones se aplican una sola vez (render, guardado, carga e importación)',()=>{
  const e=start50();for(const id of route)e.click({pre50Choice:id});
  const g=e.api.g();const snap=()=>({skill:g.skill,support:g.support,stealth:g.stealth,rebellion:g.rebellion,health:g.health});const once=snap();
  assert.equal(g.flags['50th-prearena-applied'],true);
  e.api.renderGame();PRE.applyPreArena50ToGame(g.preArena50,g);assert.deepEqual(snap(),once);
  e.api.save();e.api.set(null);e.api.load();const r=e.api.g();
  assert.deepEqual({skill:r.skill,support:r.support,stealth:r.stealth,rebellion:r.rebellion,health:r.health},once);
  e.api.exportSave();const e2=engine();return e2.api.importSaveFile({text:async()=>e.lastBlob()}).then(()=>{
    const i=e2.api.g();PRE.applyPreArena50ToGame(i.preArena50,i);
    assert.deepEqual({skill:i.skill,support:i.support,stealth:i.stealth,rebellion:i.rebellion,health:i.health},once);});
});

test('9. Una salud de 0 no se convierte en 100 (ni una habilidad de 0 en 6)',()=>{
  const s=PRE.createPreArena50State();for(const id of route)PRE.applyPreArena50Choice(s,id);
  const g={health:0,skill:0,stealth:0,support:0,rebellion:0,flags:{},relationships:{},tributes:[]};
  PRE.applyPreArena50ToGame(s,g);
  assert.equal(g.health,0+s.stats.health);assert.ok(g.health<100);
  assert.ok(g.skill<6,'la habilidad parte de 0, no de 6');
});

test('10. Indicadores con prefijo «50th-» y alias sin prefijo',()=>{
  const e=start50();for(const id of route)e.click({pre50Choice:id});const f=e.api.g().flags;
  for(const k of ['watchedGamemakers','memorizedEnforcers','privateGoodbye','privateMaysileeTalk','playedByProtocol','trainedSurvival50','watchedParade50','interviewMask50','maysileeAlliance']){
    assert.equal(f[`50th-${k}`],true,`50th-${k}`);assert.equal(f[k],true,`alias ${k}`);}
  const g=e.api.g();const m=g.tributes.find(t=>t.name==='Maysilee Donner');
  assert.ok(g.relationships.maysilee>0);assert.equal(m.relationship,g.relationships.maysilee);assert.equal(m.alliance,'player');
});

test('11. Guardar en cada una de las nueve escenas y continuar en la misma',()=>{
  for(let k=0;k<9;k++){
    const e=start50();for(const id of route.slice(0,k))e.click({pre50Choice:id});
    const rosterIds=e.api.g().tributes.map(t=>t.id).join();e.api.save();e.api.set(null);e.api.load();const g=e.api.g();
    assert.equal(g.phase,'prearena50');assert.equal(g.preArena50.index,k);assert.equal(PRE.getPreArena50Scene(g.preArena50).id,order[k]);
    assert.deepEqual(g.preArena50.history.map(h=>h.choice),route.slice(0,k),'se recuperan las elecciones anteriores');
    assert.equal(g.tributes.map(t=>t.id).join(),rosterIds,'el reparto no se reinicia');
    e.api.renderGame();assert.ok(html(e).includes(PRE.getPreArena50Scene(g.preArena50).title));
    for(const id of route.slice(k))e.click({pre50Choice:id});assert.equal(e.api.g().phase,'arena');
  }
});

test('11b. Partidas antiguas del 50.º sin preArena50 se migran sin perder datos',async()=>{
  // Antigua en la cosecha: entra en la precampaña con su reparto y sus datos.
  const e=engine();const old={mode:'story',edition:50,phase:'harvest',day:0,health:77,skill:9,support:20,rebellion:3,stealth:0,name:'Haymitch Abernathy',district:12,
    tributes:[{id:'t44',name:'Haymitch Abernathy',district:12,player:true,alive:true},{id:'t45',name:'Maysilee Donner',district:12,alive:true}],log:['antiguo'],inventory:['ropa de tributo'],flags:{watchedGamemakers:true}};
  e.store.laCosechaSave=JSON.stringify(old);e.api.load();let g=e.api.g();
  assert.equal(g.phase,'prearena50');assert.equal(g.preArena50.index,0);assert.equal(g.health,77);assert.equal(g.tributes.length,2);assert.equal(g.flags.watchedGamemakers,true);
  // Antigua ya en la Arena: no se le aplica la precampaña ni sus bonificaciones.
  const e2=engine();await e2.api.importSaveFile({text:async()=>JSON.stringify({...old,phase:'arena',arenaTurn:3})});g=e2.api.g();
  assert.equal(g.phase,'arena');assert.equal(g.preArena50.complete,true);assert.equal(g.flags['50th-prearena-applied'],true);assert.equal(g.skill,9);
});

test('12. El adaptador 5.5 cambia textos sin cambiar identificadores ni efectos',()=>{
  const play=adapt=>{const e=start50(adapt?{}:{overrides:{adaptDynamic50Event:(g,ev)=>ev}});for(const id of route)e.click({pre50Choice:id});const g=e.api.g();const out=[];
    const real=e.api.triggerCampaignEvent;
    for(let t=1;t<=10&&g.phase!=='ending';t++){g.arenaTurn=t;Math.random=()=>0.99;real();const ev=g.pendingStoryEvent;if(!ev)continue;
      out.push({t,ids:ev.choices.map(c=>c[0]),body:ev.body,labels:ev.choices.map(c=>c[1]),dyn:ev.dynamic50?.variants||[]});
      e.api.resolveStoryChoice(ev.choices[t===7?1:0][0]);}
    return {out,end:g.endingTitle,health:g.health,alive:g.tributes.map(t=>t.alive).join(),flags:Object.keys(g.flags).sort().join()};};
  const a=play(true);
  assert.equal(a.out.length,8,'exactamente los 8 acontecimientos existentes');
  assert.deepEqual(a.out.map(x=>x.t),[1,2,3,4,5,6,7,8]);
  assert.ok(a.out.some(x=>x.dyn.length),'el adaptador actúa sobre la partida real');
  const t6=a.out.find(x=>x.t===6);assert.ok(t6.labels.includes('Mantener la máscara de la entrevista'),'la entrevista 5.1 cambia la etiqueta del turno 6');
  // Mismos identificadores y mismas consecuencias que el motor sin adaptar (mismo azar).
  for(const x of a.out){const raw=x.ids;assert.ok(raw.length>=3);}
  const realIds={1:['grab','backpack','flee'],2:['protect','cautious','leave'],3:['share','scout','separate'],4:['rain','test','sponsor'],5:['study','test','avoid'],6:['family','mask','mock'],7:['shield','stay','run'],8:['exploit','confront','survive']};
  for(const x of a.out)assert.equal(JSON.stringify(x.ids),JSON.stringify(realIds[x.t]),`turno ${x.t}`);
  // Motor sin adaptador, mismo azar y mismas elecciones: mismas consecuencias y mismo final.
  const b=play(false);
  assert.ok(b.out.every(x=>!x.dyn.length),'sin adaptador no hay variantes');
  for(let i=0;i<8;i++)assert.equal(JSON.stringify(a.out[i].ids),JSON.stringify(b.out[i].ids));
  assert.ok(a.out.some((x,i)=>x.body!==b.out[i].body||JSON.stringify(x.labels)!==JSON.stringify(b.out[i].labels)),'el texto cambia');assert.equal(b.end,a.end);assert.equal(b.health,a.health);assert.equal(b.alive,a.alive);assert.equal(b.flags,a.flags);
});

test('13. Otras ediciones y el modo libre no cambian',()=>{
  for(const ed of [74,75]){const e=engine();e.api.setMode('story',ed);e.api.begin();const g=e.api.g();
    assert.equal(g.phase,'harvest');assert.equal(g.preArena50,undefined);assert.equal(g.tributes.length,24);
    g.phase='arena';g.arenaTurn=2;e.api.triggerCampaignEvent();assert.equal(g.pendingStoryEvent?.dynamic50,undefined);}
  const e=engine();e.api.setMode('free','custom');e.api.begin();const g=e.api.g();
  assert.equal(g.phase,'harvest');assert.equal(g.preArena50,undefined);assert.equal(g.tributes.length,24);
  assert.equal(AD.adaptDynamic50Event({mode:'free',edition:50,arenaTurn:3},{title:'x',choices:[]}).dynamic50,undefined);
});

test('14. Textos aprobados de la llegada (Louella / Lou Lou) y del desfile, con IDs y efectos intactos',()=>{
  const arrival=PRE.PRE_ARENA_50.find(s=>s.id==='arrival'),parade=PRE.PRE_ARENA_50.find(s=>s.id==='parade');
  assert.equal(arrival.title,'La llegada al Capitolio');
  assert.equal(arrival.body,'Al llegar al Capitolio, el registro oficial del Distrito 12 presenta un cambio: Louella ya no figura en la alineación y Lou Lou ocupa su plaza. El Capitolio no comunica públicamente el motivo. La preparación continúa bajo el protocolo habitual.');
  assert.doesNotMatch(arrival.body,/muere|muerte|murió|accidente|herid|duelo|despedid/i,'la llegada no explica qué le ocurrió a Louella');
  assert.equal(parade.title,'El desfile de los tributos');
  assert.equal(parade.body,'Los carros recorren la avenida bajo una lluvia de luces. El Capitolio convierte cada distrito en una imagen fácil de vender, y el Distrito 12 no es una excepción: el carbón, el vestuario y la puesta en escena quedan reducidos a unos segundos de espectáculo. Haymitch siente el peso de miles de miradas. Los Vigilantes observan menos el traje que la reacción del público. No basta con llegar al final del recorrido: cada gesto puede convertirse en una etiqueta que lo acompañe dentro de la Arena.');
  assert.equal(JSON.stringify(parade.choices.map(c=>[c.id,c.label])),JSON.stringify([
    ['challenge','Sostener la mirada de las cámaras sin fingir gratitud'],
    ['comfort','Coordinar el gesto con Maysilee y Wyatt para proyectar unidad'],
    ['record','Observar a los Vigilantes y memorizar quién presta atención']]));
  // Efectos e indicadores exactamente como estaban antes de integrar los textos.
  assert.equal(JSON.stringify(parade.choices.map(c=>[c.effects,c.flags])),JSON.stringify([
    [{rebellion:3,suspicion:3,resolve:1},['defiedParade50']],
    [{maysilee:1,wyatt:1,resolve:2},['district12UnitedParade50']],
    [{observation:3,rebellion:1},['watchedParade50']]]));
  assert.equal(JSON.stringify(arrival.choices.map(c=>[c.id,c.effects,c.flags])),JSON.stringify([
    ['comply',{suspicion:-1,observation:2,sponsor:1},['playedByProtocol']],
    ['defy',{rebellion:3,suspicion:3,support:2},['defiedCapitolArrival']],
    ['network',{observation:2,sponsor:2},['networkedCapitol']]]));
  assert.equal(PRE.PRE_ARENA_50.length,9,'sigue habiendo nueve escenas');
  // En la partida real se ven los textos aprobados.
  const e=start50();for(const id of route.slice(0,4))e.click({pre50Choice:id});e.api.renderGame();
  assert.ok(html(e).includes('La llegada al Capitolio')&&html(e).includes('Lou Lou ocupa su plaza'));
  for(const id of route.slice(4,6))e.click({pre50Choice:id});e.api.renderGame();
  assert.ok(html(e).includes('Sostener la mirada de las cámaras sin fingir gratitud'));
  assert.doesNotMatch(fs.readFileSync(new URL('../js/campaign-50th-prearena.js',import.meta.url),'utf8'),/provisional/i);
});
