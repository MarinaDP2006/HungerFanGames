// Motor común de precampañas dentro del juego real (app.js), con una copia del 74.º marcada como APPROVED
// SOLO en esta prueba. En el juego el 74.º sigue en DRAFT_FOR_REVIEW y no se puede jugar.
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
import * as DS from '../js/durable-storage.js';
import * as AU from '../js/audio.js';
import * as DEC from '../js/decisiones.js';
import * as PC from '../js/precampana.js';
import * as PCI from '../js/campanas/indice.js';
import {GAME_VERSION} from '../js/version.js';
import * as AD from '../js/campaign-50th-dynamic-adapter.js';

import { CAMPANA_74 } from '../js/campanas/campana-74.js';

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
  const ctx={...data,...campaigns,...PRE,ST,SV,DS,AU,DEC,PC,PCI,GAME_VERSION,...AD,WI,PR,Proxy,document,console,Math,Date,JSON,Number,String,Array,Object,Map,Set,Blob,
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
const aprobada = { ...CAMPANA_74, status: 'APPROVED' };
const PCI_PRUEBA = { campana: id => (String(id) === '74' ? aprobada : null), campanaJugable: e => (Number(e) === 74 ? aprobada : null) };
const start74 = (approved = true) => { const e = engine({ overrides: approved ? { PCI: PCI_PRUEBA } : {} }); e.api.setMode('story', 74); e.api.begin(); return e; };
const html = e => e.nodes['#screen'].innerHTML;

test('sin aprobación, el 74.º sigue con las fases de siempre', () => {
  const e = start74(false);
  assert.notEqual(e.api.g().phase, 'precampana');
  assert.equal(e.api.g().precampana, undefined);
});

test('aprobado: las once escenas se ven y se juegan con los botones reales, y pasan a la Arena', () => {
  const e = start74();
  assert.equal(e.api.g().phase, 'precampana');
  for (const s of CAMPANA_74.scenes) {
    e.api.renderGame();
    assert.ok(html(e).includes(`data-scene="${s.scene_id}"`), s.scene_id);
    assert.ok(html(e).includes(s.title));
    for (const o of s.options) assert.ok(html(e).includes(`data-pc-option="${o.option_id}"`), o.option_id);
    e.click({ pcOption: s.options[1].option_id });
  }
  const g = e.api.g();
  assert.equal(g.phase, 'arena');
  assert.equal(g.decisionLog.length, 11);
  assert.equal(g.continuity['74'].vars['campaign.launch_plan'], 'family');
  assert.equal(g.continuity['74'].complete, true);
});

test('doble pulsación y botones de otra escena no aplican nada dos veces', () => {
  const e = start74();
  e.click({ pcOption: '74_reaping_o1' });
  e.click({ pcOption: '74_reaping_o1' });
  e.click({ pcOption: '74_reaping_o3' });
  const g = e.api.g();
  assert.equal(g.precampana.vars['rel.katniss_prim'], 2);
  assert.equal(g.precampana.index, 1);
  assert.equal(g.decisionLog.length, 1);
});

test('guardar y cargar a mitad: sigue en la misma escena sin duplicar efectos', async () => {
  const e = start74();
  for (const s of CAMPANA_74.scenes.slice(0, 4)) e.click({ pcOption: s.options[0].option_id });
  const slot = e.api.g().saveSlot;
  assert.ok(slot, 'guardado automático');
  const rec = JSON.parse(e.store[`laCosechaSave:${slot}`]);
  assert.equal(rec.saveVersion, 5);
  assert.equal(rec.game.decisionLog.length, 4);
  const e2 = engine({ overrides: { PCI: PCI_PRUEBA } });
  Object.assign(e2.store, e.store);
  e2.api.load(slot);
  const g = e2.api.g();
  assert.equal(PC.currentScene(aprobada, g.precampana).scene_id, '74_arrival');
  e2.click({ pcOption: '74_departure_o1' });
  assert.equal(g.decisionLog.length, 4, 'una escena ya decidida no se repite');
  e2.click({ pcOption: '74_arrival_o2' });
  assert.equal(g.decisionLog.length, 5);
  assert.equal(g.precampana.vars['rel.katniss_prim'], 2, 'reaping_o1 una sola vez');
  assert.equal(g.precampana.vars['rel.katniss_haymitch'], 2, 'train_o1 una sola vez');
  assert.equal(g.precampana.vars['rel.katniss_peeta'], 1, 'arrival_o2');
});
