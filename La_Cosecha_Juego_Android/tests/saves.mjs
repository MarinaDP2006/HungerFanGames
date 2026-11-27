// Guardado, carga, exportación e importación de partidas, y modo «¿Y si…?» de principio a fin.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import * as data from '../js/data.js';
import * as campaigns from '../js/campaigns.js';
import * as WI from '../js/whatif.js';
import * as PR from '../js/presidency.js';
import * as PRE from '../js/campaign-50th-prearena.js';
import * as ST from '../js/settings.js';
import * as SV from '../js/saves.js';
import * as DS from '../js/durable-storage.js';
import * as AU from '../js/audio.js';
import * as DEC from '../js/decisiones.js';
import * as PC from '../js/precampana.js';
import * as PCI from '../js/campanas/indice.js';
import {GAME_VERSION} from '../js/version.js';
import * as AD from '../js/campaign-50th-dynamic-adapter.js';

function engine(){
  const store={},alerts=[],downloads=[];
  const el=()=>({textContent:'',innerHTML:'',value:'',click(){},focus(){}});
  const nodes={'#screen':el(),'#save-indicator':el()};
  const document={querySelector:s=>nodes[s]||null,createElement:()=>({click(){downloads.push(this.href)},set href(v){this._h=v},get href(){return this._h}})};
  let lastBlob=null;
  class Blob{constructor(parts){this.text=parts.join('');lastBlob=this.text;}}
  const ctx={...data,...campaigns,...PRE,ST,SV,DS,AU,DEC,PC,PCI,GAME_VERSION,...AD,WI,PR,Proxy,document,console,Math,Date,JSON,Number,String,Array,Object,Map,Set,Blob,
    URL:{createObjectURL:()=>'blob:prueba',revokeObjectURL(){}},
    localStorage:{setItem:(k,v)=>{store[k]=String(v)},getItem:k=>store[k]??null},
    alert:m=>alerts.push(m),navigator:{},window:{},setTimeout,clearTimeout};
  let src=fs.readFileSync(new URL('../js/app.js',import.meta.url),'utf8').replace(/^import .*\n/gm,'');
  src=src.slice(0,src.indexOf("document.addEventListener('click'"));
  src+=`\nglobalThis.api={g:()=>game,set:v=>{game=v},setMode:(m,e)=>{mode=m;edition=e},setWhatIf:w=>{whatIf=w},begin,save,load,exportSave,importSaveFile,presidentStart,govern,triggerCampaignEvent,resolveStoryChoice};`;
  vm.runInNewContext(src,ctx,{filename:'app.js'});
  return {api:ctx.api,store,alerts,lastBlob:()=>lastBlob,nodes};
}
const file=text=>({text:async()=>text});

// 1) Partida de historia: guardar y cargar conserva todo el estado.
{const e=engine();e.api.setMode('story',74);e.api.begin();const g=e.api.g();
 assert.equal(g.mode,'story');assert.equal(g.name,'Katniss Everdeen');
 g.phase='arena';g.arenaTurn=4;g.health=63;g.flags={peetaSavedYou:true};g.relationships={rue:3};g.inventory.push('arco');
 e.api.save();// 4.9: el guardado va a una ranura (laCosechaSave:<n>); antes iba a la clave única laCosechaSave.
 assert.ok(e.store['laCosechaSave:1'],'se guarda en la ranura 1 de localStorage');
 e.api.set(null);e.api.load();const r=e.api.g();
 assert.equal(r.health,63);assert.equal(r.arenaTurn,4);assert.deepEqual(r.flags,{peetaSavedYou:true});assert.equal(r.relationships.rue,3);
 assert.ok(r.inventory.includes('arco'));assert.equal(r.tributes.length,24);assert.match(e.nodes['#save-indicator'].textContent,/^CARGADO · RANURA 1$/);}

// 2) Cargar sin partida guardada avisa y no rompe nada.
{const e=engine();e.api.load();assert.equal(e.alerts.length,1);assert.equal(e.api.g(),null);}

// 3) Partida guardada dañada: aviso, sin excepción.
{const e=engine();e.store.laCosechaSave='{esto no es json';e.api.load();assert.match(e.alerts[0],/dañado|compatible/);}

// 4) Exportar → importar devuelve la misma partida.
{const e=engine();e.api.setMode('story',75);e.api.begin();const g=e.api.g();g.flags={clockPlan:true};g.rebellion=44;
 e.api.exportSave();const json=JSON.parse(e.lastBlob());
 assert.equal(json.format,'la-cosecha-save');assert.equal(json.game.edition,75);
 const e2=engine();await e2.api.importSaveFile(file(e.lastBlob()));const r=e2.api.g();
 assert.equal(r.edition,75);assert.equal(r.rebellion,44);assert.equal(r.flags.clockPlan,true);assert.equal(e2.alerts.length,0);}

// 5) Importar archivos inválidos: se rechazan y la partida actual sigue intacta.
{const e=engine();e.api.setMode('story',74);e.api.begin();const before=JSON.stringify(e.api.g());
 for(const bad of ['no es json','{"mode":"otro"}','{"game":{"mode":"story"}}','{"mode":"president"}']){await e.api.importSaveFile(file(bad));}
 assert.equal(e.alerts.length,4,'cuatro avisos');assert.equal(JSON.stringify(e.api.g()),before,'la partida actual no cambia');}

// 6) Presidencia: guardar a mitad de una crisis y cargar conserva crisis, día y distritos.
{const e=engine();
 e.nodes['#p-name']={value:'Prueba'};e.nodes['#p-bio']={value:''};e.nodes['#p-personality']={value:'just'};e.nodes['#p-avatar']={value:'1'};
 e.api.presidentStart();const g=e.api.g();assert.equal(g.mode,'president');
 for(let i=0;i<3;i++)e.api.govern('propaganda');
 assert.ok(g.pendingCrisis,'aparece una crisis el día 3+');
 e.api.save();e.api.set(null);e.api.load();const r=e.api.g();
 assert.equal(r.pendingCrisis.id,g.pendingCrisis.id);assert.equal(r.day,g.day);assert.equal(r.districts.length,13);
 PR.resolveCrisis(r,r.pendingCrisis.choices[0].id);assert.equal(r.pendingCrisis,null);}

// 7) «¿Y si…?»: Haymitch en lugar de Peeta en el 75.º, con un tributo nuevo, de la configuración a la Arena.
{const w=WI.newWhatIf(['Aren Voss','Mira Sol','Tavian Rusk']);
 WI.applyPreset(w,'haymitch75',[]);
 assert.ok(w.roster.some(t=>t.name==='Haymitch Abernathy'&&t.district===12));
 assert.ok(!w.roster.some(t=>t.name==='Peeta Mellark'));
 assert.ok(WI.addTribute(w,'Nova Ashcroft',5));assert.equal(w.roster.length,25);
 assert.ok(!WI.addTribute(w,'   ',5),'nombre vacío rechazado');
 const target=w.roster.find(t=>t.name==='Blight');WI.replaceTribute(w,target.id,'Annie Cresta',1);
 assert.equal(w.roster.find(t=>t.id===target.id).district,4,'un personaje canónico conserva su distrito');
 const e=engine();e.api.setMode('free','custom');e.api.setWhatIf({...w,edited:true});e.api.begin();const g=e.api.g();
 assert.equal(g.tributes.length,25);assert.equal(g.name,'Katniss Everdeen','juegas con el personaje del escenario');
 assert.ok(g.tributes.find(t=>t.player).name==='Katniss Everdeen');
 assert.match(g.whatIf.text,/Haymitch en lugar de Peeta/);
 e.api.save();e.api.set(null);e.api.load();assert.equal(e.api.g().tributes.length,25,'la alineación alterada se guarda');}
// 8) Escenarios: todos generan una alineación válida y un jugador que existe.
for(const p of WI.whatIfPresets){const w=WI.newWhatIf([]);WI.applyPreset(w,p.id,[]);
 assert.ok(w.playerId&&w.roster.some(t=>t.id===w.playerId),`escenario ${p.id}: jugador válido`);
 assert.equal(new Set(w.roster.map(t=>t.name)).size,w.roster.length,`escenario ${p.id}: sin nombres duplicados`);}
// 9) No se puede dejar la Arena con menos de 2 tributos.
{const w=WI.newWhatIf(['A','B']);w.roster=w.roster.slice(0,2);assert.equal(WI.removeTribute(w,w.roster[0].id),false);}

console.log('La Cosecha guardado e ¿Y si…?: OK (9 bloques)');
