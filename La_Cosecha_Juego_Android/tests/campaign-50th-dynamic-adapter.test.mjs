// Prueba el adaptador 5.5 contra los acontecimientos reales del motor (app.js y campaigns.js sin modificar).
// app.js ya aplica el adaptador dentro de triggerCampaignEvent(). Aquí el motor recibe una función
// identidad para obtener los acontecimientos originales y compararlos con los adaptados.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as data from '../js/data.js';
import * as campaigns from '../js/campaigns.js';
import * as WI from '../js/whatif.js';
import * as PR from '../js/presidency.js';
import {adaptDynamic50Event,inventoryState} from '../js/campaign-50th-dynamic-adapter.js';
import * as PRE from '../js/campaign-50th-prearena.js';
import * as ST from '../js/settings.js';
import * as SV from '../js/saves.js';
import * as DS from '../js/durable-storage.js';
import {GAME_VERSION} from '../js/version.js';
const _real=adaptDynamic50Event;

function engine(){
  const el={textContent:'',innerHTML:''};
  const ctx={...data,...campaigns,...PRE,ST,SV,DS,GAME_VERSION,adaptDynamic50Event:(g,ev)=>ev,WI,PR,Proxy,document:{querySelector:()=>el},console,Math,Date,JSON,Number,String,Array,Object,Map,Set,
    localStorage:{setItem(){},getItem(){return null}},alert(){},navigator:{},window:{},setTimeout};
  let src=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'');
  src=src.slice(0,src.indexOf("document.addEventListener('click'"));
  src+=`\nrenderGame=()=>{};globalThis.api={g:()=>game,set:v=>{game=v},triggerCampaignEvent,resolveStoryChoice};`;
  vm.runInNewContext(src,ctx,{filename:'app.js'});
  return ctx.api;
}
const newGame=extra=>({mode:'story',edition:50,arenaTurn:0,day:0,health:100,hunger:0,thirst:0,fatigue:0,skill:8,stealth:0,support:12,rebellion:0,
  flags:{},relationships:{},inventory:[],log:[],playerSector:1,phase:'arena',equippedWeapon:'ninguna',
  tributes:[{id:'p',name:'Haymitch Abernathy',district:12,alive:true,player:true,sector:1},{id:'m',name:'Maysilee Donner',district:12,alive:true,sector:1}],...extra});
// Devuelve el acontecimiento real del turno indicado, tal como lo genera el motor.
function realEvent(turn,extra){const api=engine();const g=newGame(extra);api.set(g);g.arenaTurn=turn;api.triggerCampaignEvent();return {api,g:api.g(),ev:api.g().pendingStoryEvent};}
const ids=ev=>ev.choices.map(c=>Array.isArray(c)?c[0]:c.id);

test('los 8 acontecimientos reales conservan identificadores al adaptarse',()=>{
  for(let t=1;t<=8;t++){
    const {g,ev}=realEvent(t,{skill:6,relationships:{maysilee:-1},inventory:['cuchillo','mochila de suministros']});
    assert.ok(ev,`turno ${t}: el motor genera un acontecimiento`);
    const out=adaptDynamic50Event(g,ev);
    assert.deepEqual(ids(out),ids(ev),`turno ${t}: mismos identificadores`);
    assert.equal(out.title,ev.title,`turno ${t}: mismo título`);
  }
});

test('las etiquetas de las variantes apuntan a opciones que existen',()=>{
  const cases=[[1,{skill:12}],[2,{relationships:{maysilee:4}}],[2,{relationships:{maysilee:-2}}],[5,{flags:{forcefieldStudied:true}}],[6,{support:40}],[7,{}],[7,{relationships:{maysilee:4}}],[8,{flags:{forcefieldTested:true}}]];
  for(const [t,extra] of cases){
    const {g,ev}=realEvent(t,extra);const out=adaptDynamic50Event(g,ev);
    const changed=out.choices.filter((c,i)=>c[1]!==ev.choices[i][1]);
    assert.ok(changed.length>=1,`turno ${t}: alguna etiqueta cambia (${JSON.stringify(extra)})`);
  }
});

test('corrección 1: el turno 1 varía con el estado real (salud 100)',()=>{
  const low=realEvent(1,{skill:6});const outLow=adaptDynamic50Event(low.g,low.ev);
  assert.ok(outLow.dynamic50.variants.includes('cornucopia-inexperienced'));
  const high=realEvent(1,{skill:12});assert.ok(adaptDynamic50Event(high.g,high.ev).dynamic50.variants.includes('cornucopia-prepared'));
});

test('corrección 1: el turno 4 reconoce lo conseguido antes (mochila del turno 1)',()=>{
  const r=realEvent(4,{inventory:['mochila de suministros']});const out=adaptDynamic50Event(r.g,r.ev);
  assert.ok(out.dynamic50.variants.includes('water-supplies'));
  assert.ok(!out.dynamic50.variants.includes('water-reserve'),'la mochila no es agua');
});

test('corrección 2: la etiqueta de los pájaros se aplica aunque no haya otra variante',()=>{
  const r=realEvent(7,{health:100,relationships:{maysilee:0}});const out=adaptDynamic50Event(r.g,r.ev);
  const shield=out.choices.find(c=>c[0]==='shield');
  assert.equal(shield[1],'Intentar proteger a Maysilee sin una alianza consolidada');
});

test('corrección 3: el inventario del 50.º se reconoce',()=>{
  assert.deepEqual(inventoryState(['cuchillo','mochila de suministros','agua de patrocinador']),{water:1,food:0,medicine:0,tools:1,supplies:1});
  assert.deepEqual(inventoryState(undefined),{water:0,food:0,medicine:0,tools:0,supplies:0});
});

test('otras ediciones, modos y turnos fuera de rango no cambian',()=>{
  const ev={title:'x',body:'y',choices:[['a','A']]};
  assert.equal(adaptDynamic50Event({mode:'story',edition:74,arenaTurn:3},ev),ev);
  assert.equal(adaptDynamic50Event({mode:'free',edition:50,arenaTurn:3},ev),ev);
  assert.equal(adaptDynamic50Event({mode:'story',edition:50,arenaTurn:9},ev),ev);
  assert.equal(adaptDynamic50Event(null,ev),ev);
});

test('campaña completa del 50.º con el adaptador: mismas consecuencias y mismo final',()=>{
  for(const pick of [()=>0,t=>({7:1}[t]??0),t=>2]){
    const play=adapt=>{const api=engine();api.set(newGame({skill:12}));
      for(let t=1;t<=8;t++){const g=api.g();if(g.phase==='ending')break;g.arenaTurn=t;Math.random=()=>0.99;api.triggerCampaignEvent();
        let ev=api.g().pendingStoryEvent;if(!ev)continue;if(adapt){ev=adaptDynamic50Event(api.g(),ev);api.g().pendingStoryEvent=ev;}
        api.resolveStoryChoice(ids(ev)[Math.min(pick(t),ev.choices.length-1)]);}
      const g=api.g();return {end:g.endingTitle,flags:g.flags,alive:g.tributes.map(t=>t.alive),health:g.health};};
    const a=play(false),b=play(true);
    assert.equal(b.end,a.end);assert.deepEqual(b.alive,a.alive);assert.equal(b.health,a.health);
    assert.deepEqual(Object.keys(b.flags).sort(),Object.keys(a.flags).sort());
  }
});

test('el acontecimiento adaptado se guarda y se recupera en JSON',()=>{
  const r=realEvent(5,{flags:{forcefieldStudied:true}});const out=adaptDynamic50Event(r.g,r.ev);
  const json=JSON.stringify(out);assert.equal(JSON.stringify(JSON.parse(json)),json);assert.ok(json.includes("forcefield-studied"));
});
