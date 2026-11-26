// Modo Presidente: efectos visibles, crisis y finales del mandato.
import assert from 'node:assert/strict';
import * as PR from '../js/presidency.js';
import {districts} from '../js/data.js';

const newGame=(extra={})=>({mode:'president',president:{name:'Prueba',personality:'just'},day:1,approval:55,order:65,economy:60,rebellion:15,peacekeepers:50,arenaBudget:60,resources:65,rebellionArc:'control',events:[],
  districts:districts.slice(0,13).map(d=>({id:d.id,stability:55,production:60,food:55,peacekeepers:35,population:1e6,morale:50,hidden:d.id===13})),...extra});

// El texto del botón coincide con el efecto real.
const fx=PR.governEffects('fear').peace[1];
assert.equal(PR.describeEffects(fx),'Orden +10 · Aprobación −6 · Rebelión +5');
assert.equal(PR.effectTone(PR.governEffects('just').reform[1]),'good');
assert.equal(PR.effectTone(PR.governEffects('just').emergency[1]),'bad');

// Las crisis aparecen cada 3 días, bloquean y se resuelven con efectos.
{const g=newGame({day:2});assert.equal(PR.maybeCrisis(g),null,'día 2: sin crisis');
 g.day=3;const c=PR.maybeCrisis(g);assert.ok(c,'día 3: crisis');assert.equal(c.choices.length,3);
 assert.equal(PR.maybeCrisis(g),null,'no se apila otra crisis');assert.equal(g.pendingCrisis,c);
 assert.ok(!c.choices.some(x=>/d\./.test(x.effects)),'efectos legibles');
 const before={...g};PR.resolveCrisis(g,c.choices[0].id);
 assert.equal(g.pendingCrisis,null);assert.ok(['approval','order','economy','rebellion','resources','arenaBudget'].some(k=>g[k]!==before[k])||g.districts.some(d=>d.food!==55||d.stability!==55),'la decisión cambia algo');
 assert.equal(g.decisionsLog.length,1);}

// Ninguna crisis se repite en un mandato.
{const g=newGame({rebellion:40,economy:50,resources:40});const seen=new Set();
 for(let d=3;d<=39;d+=3){g.day=d;const c=PR.maybeCrisis(g);if(c){assert.ok(!seen.has(c.id),'crisis repetida '+c.id);seen.add(c.id);PR.resolveCrisis(g,c.choices[2].id);}}
 assert.ok(seen.size>=6,`al menos 6 crisis distintas (${seen.size})`);}

// El Distrito 13 se puede descubrir mediante una crisis.
{const g=newGame({day:9});g.crisisSeen=['mockingjay','strike','famine','gamemaker','victor','peacekeepers','capitol','refugees'];
 const c=PR.maybeCrisis(g);assert.equal(c?.id,'district13');PR.resolveCrisis(g,'investigate');assert.equal(g.districts.find(d=>d.id===13).hidden,false);}

// Finales del mandato.
const end=extra=>{const g=newGame({day:PR.MANDATE_DAYS,...extra});PR.checkMandateEnd(g);return g;};
assert.equal(newGame({day:10}).mandateEnding,undefined);
assert.equal(PR.checkMandateEnd(newGame({day:10})),false,'no termina antes de tiempo');
assert.equal(end({rebellion:10,approval:75}).mandateEnding.title,'EL REFORMISTA');
assert.equal(end({order:80,approval:20,rebellion:40}).mandateEnding.title,'EL PUÑO DE HIERRO');
assert.equal(end({economy:80,approval:45,rebellion:40,order:50}).mandateEnding.title,'LA PROSPERIDAD DEL CAPITOLIO');
{const g=newGame({day:20,ended:true,rebellionArc:'postwar',rebellion:100});PR.checkMandateEnd(g);assert.equal(g.mandateEnding.title,'EL RÉGIMEN CAE');}
assert.ok(end({}).mandateEnding.lines.some(l=>l.startsWith('Balance final')));

console.log('La Cosecha presidencia: OK');
