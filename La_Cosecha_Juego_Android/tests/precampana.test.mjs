// Motor común de precampañas (fase 2) y datos del 74.º generados desde la fuente creativa.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as PC from '../js/precampana.js';
import * as PCI from '../js/campanas/indice.js';
import * as DEC from '../js/decisiones.js';
import { CAMPANA_74 } from '../js/campanas/campana-74.js';
import { GIRA, CAMPANA_75 } from '../js/campanas/estructuras.js';
import { generar, parse, FUENTE, SALIDA } from '../../scripts/importar-campana-74.mjs';

const root = new URL('../../', import.meta.url);
const fuente = fs.readFileSync(new URL(FUENTE, root), 'utf8');
const ORDEN = ['74_reaping', '74_goodbyes', '74_departure', '74_train', '74_arrival', '74_prep', '74_parade', '74_training', '74_private_session', '74_interview', '74_launch'];

test('74.º: los datos del juego son exactamente los generados desde la fuente (nadie los ha editado)', () => {
  assert.equal(fs.readFileSync(new URL(SALIDA, root), 'utf8'), generar(fuente));
});

test('74.º: once escenas en el orden del contrato, tres opciones cada una, textos íntegros', () => {
  assert.deepEqual(CAMPANA_74.scenes.map(s => s.scene_id), ORDEN);
  for (const s of CAMPANA_74.scenes) {
    assert.equal(s.options.length, 3, s.scene_id);
    assert.ok(fuente.includes(s.text), `${s.scene_id}: el texto es literal de la fuente`);
    assert.ok(fuente.includes(s.milestone), `${s.scene_id}: hito literal`);
    for (const o of s.options) {
      assert.ok(fuente.includes(`\`${o.option_id}\` **${o.label}** Efecto: \`${o.source_effect}\``), `${o.option_id} literal`);
      assert.equal(o.response_text, null, 'la fuente no trae respuesta: no se inventa');
      assert.equal(o.journal_text, null, 'la fuente no trae texto de diario: no se inventa');
    }
  }
  assert.deepEqual(PC.validateCampaign(CAMPANA_74), []);
});

test('74.º: cada efecto de la fuente se traduce al contrato maestro sin perder ninguno', () => {
  for (const s of parse(fuente)) for (const o of s.options) {
    const partes = o.source_effect.split(';').map(x => x.trim()).filter(Boolean);
    assert.equal(o.effects.length, partes.length, o.option_id);
  }
  const reaping = CAMPANA_74.scenes[0].options[0];
  assert.deepEqual(reaping.effects, [{ op: 'ADD', path: 'rel.katniss_prim', value: 2 }, { op: 'SET_FLAG', path: 'prim_saw_katniss_protect' }]);
  const priv = CAMPANA_74.scenes[8].options.map(o => o.option_id);
  assert.deepEqual(priv, ['74_private_o1', '74_private_o2', '74_private_o3'], 'los IDs se conservan tal cual, aunque no sigan el patrón de la escena');
});

test('74.º, Gira y 75.º no se pueden jugar todavía', () => {
  assert.equal(CAMPANA_74.status, 'DRAFT_FOR_REVIEW');
  assert.equal(PCI.campanaJugable(74), null);
  assert.equal(PCI.campanaJugable(75), null);
  assert.equal(PCI.campanaJugable('gira'), null);
  assert.equal(PCI.campanaJugable(50), null, 'el 50.º no pasa por el motor común');
  for (const c of [GIRA, CAMPANA_75]) {
    assert.equal(c.status, 'STRUCTURE_ONLY');
    assert.ok(c.scenes.every(s => s.text === null && s.options.length === 0 && s.status === 'BLOCKED_CREATIVE'), c.campaign_id);
    assert.deepEqual(PC.validateCampaign(c), []);
  }
  assert.equal(GIRA.scenes.length, 7);
  assert.equal(CAMPANA_75.scenes.length, 10);
});

test('motor: recorre las once escenas con cada una de las tres opciones y aplica sus efectos', () => {
  for (const k of [0, 1, 2]) {
    const st = PC.createState(CAMPANA_74);
    const game = {};
    for (const s of CAMPANA_74.scenes) {
      const o = s.options[k];
      const r = PC.choose(CAMPANA_74, st, o.option_id, { game });
      assert.ok(r.ok, o.option_id);
      for (const e of o.effects) if (e.op === 'SET_FLAG') assert.equal(st.flags[e.path], true, `${o.option_id} → ${e.path}`);
    }
    assert.equal(st.complete, true);
    assert.equal(game.decisionLog.length, 11);
    assert.deepEqual(DEC.validateDecisions({ ...game, timeline: { timeline_id: 'tl_x', route_type: 'CANON' } }), []);
  }
  const st = PC.createState(CAMPANA_74);
  for (const s of CAMPANA_74.scenes) PC.choose(CAMPANA_74, st, s.options[0].option_id);
  assert.equal(st.vars['rel.katniss_prim'], 2);
  assert.equal(st.vars['campaign.launch_plan'], 'survival');
  assert.equal(st.vars['campaign.private_session_result'], 'exceptional');
});

test('motor: una decisión ya registrada no vuelve a aplicar efectos', () => {
  const st = PC.createState(CAMPANA_74), game = {};
  assert.ok(PC.choose(CAMPANA_74, st, '74_reaping_o1', { game }).ok);
  const antes = JSON.stringify(st);
  st.index = 0; // como si la escena se volviera a mostrar tras cargar
  const r = PC.choose(CAMPANA_74, st, '74_reaping_o1', { game });
  assert.equal(r.reason, 'duplicate');
  st.index = 1;
  assert.equal(JSON.stringify(st), antes);
  assert.equal(st.vars['rel.katniss_prim'], 2);
});

test('motor: opciones inválidas, valores no permitidos y efectos transaccionales', () => {
  const st = PC.createState(CAMPANA_74);
  assert.equal(PC.choose(CAMPANA_74, st, 'no_existe').reason, 'invalid-option');
  const mala = { ...CAMPANA_74, scenes: [{ ...CAMPANA_74.scenes[0], options: [{ option_id: 'x', label: 'x', effects: [{ op: 'ADD', path: 'rel.katniss_prim', value: 1 }, { op: 'SET', path: 'campaign.launch_plan', value: 'inventado' }] }] }] };
  const s2 = PC.createState(mala);
  assert.throws(() => PC.choose(mala, s2, 'x'), /no permitido/);
  assert.equal(s2.vars['rel.katniss_prim'], 0, 'si un efecto falla no se aplica ninguno');
  assert.ok(PC.validateCampaign(mala).some(p => /inventado/.test(p)));
});

test('motor: condiciones de disponibilidad', () => {
  const st = { vars: { 'rel.katniss_peeta': 3, 'campaign.interview_tone': 'warm' }, flags: { cinna_trust: true } };
  const ok = c => PC.evaluate(c, st);
  assert.ok(ok({ op: 'GTE', path: 'rel.katniss_peeta', value: 3 }));
  assert.ok(!ok({ op: 'LT', path: 'rel.katniss_peeta', value: 3 }));
  assert.ok(ok({ op: 'IN', path: 'campaign.interview_tone', value: ['warm', 'defiant'] }));
  assert.ok(ok({ op: 'HAS_FLAG', path: 'cinna_trust' }));
  assert.ok(ok({ op: 'NOT_FLAG', path: 'otra' }));
  assert.ok(ok({ op: 'ALL', of: [{ op: 'HAS_FLAG', path: 'cinna_trust' }, { op: 'EQ', path: 'campaign.interview_tone', value: 'warm' }] }));
  assert.ok(ok({ op: 'NOT', of: { op: 'ANY', of: [{ op: 'HAS_FLAG', path: 'x' }] } }));
  assert.throws(() => ok({ op: 'RARO' }), /desconocida/);
});

test('transferencia: el estado final se entrega completo y la Arena no lo usa todavía', () => {
  const st = PC.createState(CAMPANA_74);
  for (const s of CAMPANA_74.scenes) PC.choose(CAMPANA_74, st, s.options[2].option_id);
  const t = PC.transferState(CAMPANA_74, st);
  assert.equal(t.complete, true);
  assert.equal(t.vars['campaign.launch_plan'], 'observation');
  assert.equal(t.flags.launch_observation_focus, true);
  const campaigns = fs.readFileSync(new URL('../js/campaigns.js', import.meta.url), 'utf8');
  assert.doesNotMatch(campaigns, /continuity/, 'la Arena existente no lee la continuidad hasta aprobar la tabla');
});
