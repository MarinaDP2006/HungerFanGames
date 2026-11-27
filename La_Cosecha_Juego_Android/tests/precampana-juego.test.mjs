// Motor común de precampañas dentro del juego real (app.js) con el 74.º (APPROVED desde el 27-11-2026).
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
const PCI_PRUEBA = { edicionActiva: PCI.edicionActiva, campana: id => (['74', 'campaign_74'].includes(String(id)) ? aprobada : null), campanaJugable: e => (Number(e) === 74 ? aprobada : null) };
const start74 = (approved = true) => { const e = engine({ overrides: { PCI: approved ? PCI_PRUEBA : { ...PCI_PRUEBA, campanaJugable: () => null } } }); e.api.setMode('story', 74); e.api.begin(); return e; };
const html = e => e.nodes['#screen'].innerHTML;

test('si una campaña no está aprobada, la edición sigue con las fases de siempre', () => {
  const e = start74(false);
  assert.notEqual(e.api.g().phase, 'precampana');
  assert.equal(e.api.g().precampana, undefined);
});

const jugar = (e, k, desde = 0, hasta = 11) => { for (const s of CAMPANA_74.scenes.slice(desde, hasta)) { e.click({ pcOption: s.options[k].option_id }); e.click({ pcContinue: '1' }); } };

test('aprobado: las once escenas, las 33 opciones con su respuesta y su diario, y paso a la Arena', () => {
  for (const k of [0, 1, 2]) {
    const e = start74();
    assert.equal(e.api.g().phase, 'precampana');
    for (const s of CAMPANA_74.scenes) {
      e.api.renderGame();
      assert.ok(html(e).includes(`data-scene="${s.scene_id}"`), s.scene_id);
      for (const o of s.options) assert.ok(html(e).includes(`data-pc-option="${o.option_id}"`), o.option_id);
      const o = s.options[k];
      e.click({ pcOption: o.option_id });
      assert.ok(html(e).includes('data-response="1"'), `${o.option_id}: se muestra la respuesta antes de avanzar`);
      assert.ok(html(e).includes(o.response_text.replace(/"/g, '&quot;').replace(/'/g, '&#39;')), `${o.option_id}: texto de la respuesta`);
      e.click({ pcOption: s.options[(k + 1) % 3].option_id });
      e.click({ pcContinue: '1' });
      assert.ok(html(e).includes(`data-entry="74.diary.${s.scene_id}.${o.option_id}"`) || e.api.g().phase === 'arena', `${o.option_id}: entrada de diario`);
    }
    const g = e.api.g();
    assert.equal(g.phase, 'arena', 'solo se abre la Arena existente');
    assert.equal(g.decisionLog.length, 11);
    assert.deepEqual(g.precampana.journal.map(j => j.option_id), CAMPANA_74.scenes.map(s => s.options[k].option_id), 'cada entrada es la de la opción elegida');
    assert.equal(g.continuity.campaign_74.transfer_id, 'campaign_74:prearena:v1');
    assert.equal(g.continuity.campaign_74.vars['campaign.launch_plan'], ['survival', 'family', 'observation'][k]);
    const rec = JSON.parse(e.store[`laCosechaSave:${g.saveSlot}`]);
    assert.equal(rec.game.phase, 'arena');
    assert.equal(rec.game.continuity.campaign_74.transfer_applied, true, 'la instantánea está guardada');
  }
});

test('ruta canónica: la puntuación de la sesión privada sigue siendo alta y los hitos no cambian con ninguna opción', () => {
  for (const s of CAMPANA_74.scenes) assert.ok(s.milestone.length > 10);
  const priv = CAMPANA_74.scenes.find(s => s.scene_id === '74_private_session');
  assert.match(priv.milestone, /extraordinariamente alta/);
  assert.deepEqual(priv.options.map(o => o.effects.find(e => e.path === 'campaign.private_session_result').value), ['exceptional', 'exceptional', 'exceptional'], 'revisión 27-11, pregunta 2');
});

test('ecos: aparecen una vez en la escena indicada si el flag está activo', () => {
  const e = start74();
  e.click({ pcOption: '74_reaping_o1' }); e.click({ pcContinue: '1' });
  e.api.renderGame();
  const eco = CAMPANA_74.scenes[0].options[0].echo.text;
  assert.equal(html(e).split(eco.replace(/'/g, '&#39;')).length - 1, 1);
  const e2 = start74();
  e2.click({ pcOption: '74_reaping_o2' }); e2.click({ pcContinue: '1' });
  e2.api.renderGame();
  assert.ok(!html(e2).includes('class="eco"'));
});

test('doble pulsación, otra opción mientras se lee la respuesta y botones de otra escena no aplican nada dos veces', () => {
  const e = start74();
  e.click({ pcOption: '74_reaping_o1' });
  e.click({ pcOption: '74_reaping_o1' });
  e.click({ pcOption: '74_reaping_o3' });
  e.click({ pcContinue: '1' });
  e.click({ pcContinue: '1' });
  e.click({ pcOption: '74_reaping_o2' });
  const g = e.api.g();
  assert.equal(g.precampana.vars['rel.katniss_prim'], 2);
  assert.equal(g.precampana.index, 1);
  assert.equal(g.decisionLog.length, 1);
  assert.equal(g.precampana.journal.length, 1);
});

test('guardar y cargar a mitad, incluso con la respuesta en pantalla: sin duplicar efectos ni diario', () => {
  const e = start74();
  jugar(e, 0, 0, 3);
  e.click({ pcOption: '74_train_o1' }); // respuesta en pantalla, sin pulsar Continuar
  const slot = e.api.g().saveSlot;
  const rec = JSON.parse(e.store[`laCosechaSave:${slot}`]);
  assert.equal(rec.saveVersion, 5);
  assert.equal(rec.game.decisionLog.length, 4);
  const e2 = engine({ overrides: { PCI: PCI_PRUEBA } });
  Object.assign(e2.store, e.store);
  e2.api.load(slot);
  assert.ok(html(e2).includes('data-response="1"'), 'al cargar se ve la respuesta pendiente');
  e2.click({ pcOption: '74_train_o2' });
  e2.click({ pcContinue: '1' });
  e2.click({ pcOption: '74_train_o2' });
  const g = e2.api.g();
  assert.equal(PC.currentScene(aprobada, g.precampana).scene_id, '74_arrival');
  assert.equal(g.decisionLog.length, 4);
  assert.equal(g.precampana.journal.length, 4);
  assert.equal(g.precampana.vars['rel.katniss_haymitch'], 2);
});

test('si no se puede guardar antes de la Arena, no se entra en ella', () => {
  const e = start74();
  jugar(e, 0, 0, 10);
  const slot = e.api.g().saveSlot;
  for (const n of [1, 2, 3]) if (n !== slot) e.store[`laCosechaSave:${n}`] = e.store[`laCosechaSave:${slot}`];
  // Fuerza un fallo de escritura justo en el paso a la Arena.
  const g = e.api.g();
  e.click({ pcOption: '74_launch_o1' });
  delete g.saveSlot;
  e.click({ pcContinue: '1' });
  assert.equal(g.phase, 'precampana', 'sin guardado no hay Arena');
  assert.ok(e.alerts.some(a => /No se pudo guardar/.test(a)));
  assert.equal(g.continuity.campaign_74.transfer_applied, true);
  g.saveSlot = slot;
  e.click({ pcContinue: '1' });
  e.api.renderGame();
  assert.equal(g.phase, 'arena', 'al reintentar con ranura entra, sin repetir la transferencia');
  assert.equal(g.continuity.campaign_74.decision_ids.length, 11);
});

test('50.º retirado del juego activo: no sale en el selector ni se puede empezar, pero sus partidas siguen cargando', () => {
  assert.equal(PCI.edicionActiva(50), false);
  assert.equal(PCI.edicionActiva(74), true);
  assert.equal(PCI.edicionActiva(75), true);
  const e = engine();
  e.api.modeSetup('story');
  assert.ok(!html(e).includes('data-ed="50"'), 'no aparece en el selector');
  assert.ok(html(e).includes('data-ed="74"') && html(e).includes('data-ed="75"'));
  assert.ok(!/data-ed="10"/.test(html(e)), 'el 10.º no existe como campaña');
  e.api.setMode('story', 50); e.api.begin();
  assert.equal(e.api.g(), null, 'no se puede empezar');
  assert.ok(e.alerts.some(a => /no está disponible/.test(a)));
  // Una partida del 50.º guardada antes se carga y se juega.
  // Partida del 50.º anterior a 5.1 (fase genérica de cosecha): al cargar se migra a su precampaña.
  const viejo = { mode: 'story', edition: 50, phase: 'harvest', day: 0, health: 100, skill: 6, support: 12, rebellion: 0, tributes: [{ name: 'Haymitch Abernathy', district: 12, player: true, alive: true }], log: [], decisions: [], inventory: [], wounds: [], injuries: [], flags: {}, name: 'Haymitch Abernathy', district: 12 };
  e.store['laCosechaSave:1'] = JSON.stringify({ format: 'la-cosecha-save', saveVersion: 4, slot: 1, savedAt: new Date().toISOString(), game: viejo });
  assert.equal(e.api.load(1), true);
  assert.equal(e.api.g().edition, 50);
  assert.equal(e.api.g().phase, 'prearena50');
});

test('historia encadenada: 74.º → final → Gira (8) → precampaña del 75.º (6) → Arena del 75.º, conservando la continuidad', () => {
  const e = engine();
  e.api.setMode('story', 74); e.api.begin();
  for (let i = 0; i < 11; i++) { const s = PCI.campana(74).scenes[i]; e.click({ pcOption: s.options[1].option_id }); e.click({ pcContinue: '1' }); }
  const g74 = e.api.g();
  assert.equal(g74.phase, 'arena');
  const peeta74 = g74.continuity.campaign_74.vars['rel.katniss_peeta'];
  g74.phase = 'ending';
  e.click({ a: 'continuar-historia' });
  const g = e.api.g();
  assert.notEqual(g, g74);
  assert.equal(g.edition, 75);
  assert.equal(g.precampana.campaign_id, 'campaign_gira');
  assert.equal(g.precampana.vars['rel.katniss_peeta'], peeta74, 'la Gira empieza con la relación del 74.º');
  assert.ok(g.continuity.campaign_74, 'la continuidad del 74.º viaja');
  for (const s of PCI.campana('gira').scenes) { e.click({ pcOption: s.options[0].option_id }); e.click({ pcContinue: '1' }); }
  assert.equal(g.precampana.campaign_id, 'campaign_75');
  assert.equal(g.phase, 'precampana');
  for (const s of PCI.campana(75).scenes) { e.click({ pcOption: s.options[2].option_id }); e.click({ pcContinue: '1' }); }
  assert.equal(g.phase, 'arena');
  assert.deepEqual(Object.keys(g.continuity).sort(), ['campaign_74', 'campaign_75', 'campaign_gira']);
  assert.equal(new Set(g.decisionLog.map(d => d.decision_id)).size, g.decisionLog.length, 'sin decisiones duplicadas');
});

test('si Peeta muere en el 74.º, no se ofrece continuar (la Gira exige la continuidad de las películas)', () => {
  const e = engine();
  e.api.setMode('story', 74); e.api.begin();
  const g = e.api.g();
  g.phase = 'ending'; g.tributes.find(t => t.name === 'Peeta Mellark').alive = false;
  e.click({ a: 'continuar-historia' });
  assert.equal(e.api.g(), g);
});

test('tras el 75.º: Rebelión (8) → Guerra (8) → final de la historia, sin más botón de continuar', () => {
  const e = engine();
  e.api.setMode('story', 75); e.api.begin();
  const g = e.api.g();
  for (const c of ['gira', 75]) for (const s of PCI.campana(c).scenes) { e.click({ pcOption: s.options[0].option_id }); e.click({ pcContinue: '1' }); }
  assert.equal(g.phase, 'arena');
  g.phase = 'ending'; g.health = 40;
  e.click({ a: 'continuar-historia' });
  assert.equal(e.api.g(), g, 'la Rebelión sigue en la misma partida');
  assert.equal(g.precampana.campaign_id, 'campaign_rebelion');
  for (const c of ['rebelion', 'guerra']) for (const s of PCI.campana(c).scenes) { e.click({ pcOption: s.options[1].option_id }); e.click({ pcContinue: '1' }); }
  assert.equal(g.phase, 'ending');
  assert.equal(g.storyFinished, true);
  assert.equal(g.endingTitle, 'EL SINSAJO');
  assert.ok(g.storyEpilogue.some(l => /prímulas/.test(l)));
  assert.deepEqual(Object.keys(g.continuity).sort(), ['campaign_75', 'campaign_gira', 'campaign_guerra', 'campaign_rebelion']);
  assert.match(html(e), /FIN DE LA HISTORIA/);
  assert.doesNotMatch(html(e), /continuar-historia/);
});

test('Rebelión y Guerra: campañas válidas, hitos de las películas presentes', () => {
  for (const k of ['rebelion', 'guerra']) assert.deepEqual(PC.validateCampaign(PCI.campana(k)), [], k);
  const texto = ['rebelion', 'guerra'].flatMap(k => PCI.campana(k).scenes.map(s => s.text)).join(' ');
  for (const hito of [/Distrito 12/, /Coin/, /Boggs/, /Prim/, /desvías la flecha hacia Coin/]) assert.match(texto, hito);
});
