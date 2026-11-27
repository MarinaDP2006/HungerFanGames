import assert from 'node:assert/strict';
import {getArena50Event,applyArena50Choice,arena50Turns} from '../js/campaign-50th-arena.js';
const game={mode:'story',edition:50,health:100,skill:6,stealth:0,support:10,rebellion:0,fatigue:10,hunger:0,inventory:[],flags:{},relationships:{},tributes:[{name:'Maysilee Donner',alive:true}]};
const log=[];
const api={
 log:s=>log.push(s),find:n=>game.tributes.find(t=>t.name===n),alive:n=>!!game.tributes.find(t=>t.name===n)?.alive,
 kill:()=>false,ally:n=>{const t=game.tributes.find(t=>t.name===n);if(t)t.alliance='player';},
 stat:(k,d)=>{game[k]=Math.max(0,Math.min(k==='skill'?20:100,(game[k]||0)+d));},
 flag:(k,v=true)=>{game.flags[k]=v;},has:k=>!!game.flags[k],rel:(n,d)=>{game.relationships[n]=(game.relationships[n]||0)+d;},
 relOf:n=>game.relationships[n]||0,item:n=>{if(!game.inventory.includes(n))game.inventory.push(n);},hasItem:n=>game.inventory.includes(n)
};
assert.deepEqual(arena50Turns(),[2,3,5,9]);
assert.equal(getArena50Event({...game,mode:'free'},2),null);
assert.equal(getArena50Event({...game,edition:74},2),null);
for(const turn of arena50Turns()) assert.ok(getArena50Event(game,turn));
const night=getArena50Event(game,2);
assert.equal(applyArena50Choice(game,night,'signal',api),true);
assert.equal(game.relationships.maysilee,2);
assert.equal(game.flags.maysileeSignalConfirmed,true);
assert.equal(applyArena50Choice(game,night,'not-a-choice',api),false);
const supplies=getArena50Event(game,3);
assert.equal(applyArena50Choice(game,supplies,'take',api),true);
assert.ok(game.inventory.includes('raciones del Vasallaje'));
const final=getArena50Event(game,9);
assert.equal(applyArena50Choice(game,final,'test',api),true);
assert.equal(game.flags.forcefieldStudied,true);
assert.equal(game.flags.forcefieldTested,true);
assert.ok(game.campaignJournal.length===3);
console.log('OK: 4 escenas 50.º, restricciones de modo/edición, decisiones, efectos y diario.');
