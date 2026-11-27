// Motor común de precampañas (fase 2) y datos del 74.º generados desde la fuente creativa.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import * as PC from '../js/precampana.js';
import * as PCI from '../js/campanas/indice.js';
import * as DEC from '../js/decisiones.js';
import { CAMPANA_74 } from '../js/campanas/campana-74.js';
import { generar, parse, parseAnexo, parseRevision, FUENTE, SALIDA, ANEXO, REVISION, ENMIENDAS } from '../../scripts/importar-campana-74.mjs';

const root = new URL('../../', import.meta.url);
const fuente = fs.readFileSync(new URL(FUENTE, root), 'utf8');
const anexo = fs.readFileSync(new URL(ANEXO, root), 'utf8');
const revision = fs.readFileSync(new URL(REVISION, root), 'utf8');
const plano = t => t.replace(/\\\n/g, ' ').replace(/\s+/g, ' ');
const ORDEN = ['74_reaping', '74_goodbyes', '74_departure', '74_train', '74_arrival', '74_prep', '74_parade', '74_training', '74_private_session', '74_interview', '74_launch'];

test('74.º: los datos del juego son exactamente los generados desde la fuente (nadie los ha editado)', () => {
  assert.equal(fs.readFileSync(new URL(SALIDA, root), 'utf8'), generar(fuente, anexo, revision));
});

test('74.º: once escenas en el orden del contrato, tres opciones cada una, textos íntegros', () => {
  assert.deepEqual(CAMPANA_74.scenes.map(s => s.scene_id), ORDEN);
  for (const s of CAMPANA_74.scenes) {
    assert.equal(s.options.length, 3, s.scene_id);
    assert.ok(fuente.includes(s.text), `${s.scene_id}: el texto es literal de la fuente`);
    assert.ok(fuente.includes(s.milestone), `${s.scene_id}: hito literal`);
    for (const o of s.options) {
      assert.ok(fuente.includes(`\`${o.option_id}\` **${o.label}** Efecto: \`${o.source_effect_original || o.source_effect}\``), `${o.option_id} literal`);
      assert.ok(o.response_text && plano(anexo).includes(`Respuesta: «${o.response_text}»`), `${o.option_id}: respuesta literal del anexo`);
      assert.ok(o.journal_text && plano(anexo).includes(`Diario: «${o.journal_text}»`), `${o.option_id}: diario literal del anexo`);
      assert.equal(o.journal_entry_id, `74.diary.${s.scene_id}.${o.option_id}`);
    }
  }
  assert.deepEqual(PC.validateCampaign(CAMPANA_74), []);
  assert.equal(CAMPANA_74.campaign_id, 'campaign_74');
  assert.equal(CAMPANA_74.source_version, '74-prearena-1.2-borrador');
});

test('anexo 1.1: 33 respuestas y diarios; el texto del botón no cambia', () => {
  assert.equal(Object.keys(parseAnexo(anexo)).length, 33);
  for (const s of CAMPANA_74.scenes) for (const o of s.options) assert.ok(o.label.startsWith(o.label_anexo), `${o.option_id}: el anexo no cambia el texto del botón`);
});

test('revisión 27-11: 31 ecos con frase literal (2 del anexo y 29 de la revisión), ninguno queda como nota', () => {
  const rev = parseRevision(revision);
  assert.equal(rev.length, 29);
  const ops = CAMPANA_74.scenes.flatMap(s => s.options);
  const ecos = ops.filter(o => o.echo);
  assert.equal(ecos.length, 31);
  assert.ok(ops.every(o => !o.echo_note), 'no quedan ecos sin frase');
  const ids = new Set();
  for (const o of ecos) {
    assert.ok(plano(anexo).includes(`«${o.echo.text}»`) || revision.includes(`«${o.echo.text}»`), `${o.option_id}: frase literal`);
    assert.ok(!ids.has(o.echo.echo_id)); ids.add(o.echo.echo_id);
    assert.ok(CAMPANA_74.scenes.some(s => s.scene_id === o.echo.scene_id), `${o.option_id}: escena existente`);
    for (const f of o.echo.flags) assert.ok(ops.some(x => x.effects.some(e => e.op === 'SET_FLAG' && e.path === f)), `${f} lo activa una opción`);
    // El eco se muestra después de la opción que lo provoca (o en su misma escena, tras la respuesta).
    const desde = CAMPANA_74.scenes.findIndex(s => s.options.includes(o)), hasta = CAMPANA_74.scenes.findIndex(s => s.scene_id === o.echo.scene_id);
    assert.ok(o.echo.moment === 'after_response' ? hasta === desde : hasta > desde, `${o.option_id}: orden`);
  }
  const gale = ops.find(o => o.option_id === '74_launch_o2').echo;
  assert.deepEqual(gale.flags, ['launch_family_focus', 'gale_promise_explicit']);
  assert.equal(gale.moment, 'after_response');
  assert.equal(gale.group, 'gale_promise');
});

test('revisión 27-11, pregunta 2: 74_private_o3 pasa a exceptional; se conserva el efecto original', () => {
  const o = CAMPANA_74.scenes[8].options[2];
  assert.equal(o.source_effect_original, 'private_session_result = strong; flag private_controlled_display');
  assert.equal(o.source_effect, 'private_session_result = exceptional; flag private_controlled_display');
  assert.equal(o.amendment, ENMIENDAS['74_private_o3'].motivo);
});

test('revisión 27-11: diálogos, player_prompt y participantes quedan pendientes (null), sin extraerlos de la prosa', () => {
  for (const s of CAMPANA_74.scenes) { assert.equal(s.dialogue, null); assert.equal(s.player_prompt, null); assert.equal(s.participant_ids, null); assert.equal(s.location_id, null); }
});

test('ecos: puros, deduplicados por grupo y sin efectos mecánicos', () => {
  const c = CAMPANA_74, st = PC.createState(c);
  const launch = c.scenes.find(s => s.scene_id === '74_launch');
  st.flags = { gale_promise_explicit: true, launch_family_focus: true };
  const antes = JSON.stringify(st);
  const a = PC.echoesFor(c, st, launch), b = PC.echoesFor(c, st, launch);
  assert.deepEqual(a, b, 'repetir la pantalla no duplica');
  assert.equal(a.filter(t => /Gale/.test(t)).length, 1);
  assert.deepEqual(PC.responseEchoes(c, st, '74_launch_o2'), [], 'la promesa a Gale ya salió al empezar la escena: no se repite');
  assert.equal(JSON.stringify(st), antes, 'los ecos no cambian el estado');
  st.flags = { launch_family_focus: true };
  assert.deepEqual(PC.responseEchoes(c, st, '74_launch_o2'), [], 'sin la promesa explícita no hay eco');
  assert.deepEqual(PC.echoesFor(c, st, launch), []);
});

test('74.º: cada efecto de la fuente se traduce al contrato maestro sin perder ninguno', () => {
  for (const s of parse(fuente)) for (const o of s.options) {
    const partes = o.source_effect.split(';').map(x => x.trim()).filter(Boolean);
    assert.equal(o.effects.length, partes.length, o.option_id);
  }
  const reaping = CAMPANA_74.scenes[0].options[0];
  assert.equal(reaping.source_effect, 'rel_katniss_prim +2; flag prim_saw_katniss_protect');
  assert.deepEqual(reaping.effects, [{ op: 'ADD', path: 'rel.katniss_prim', value: 2 }, { op: 'SET_FLAG', path: 'prim_saw_katniss_protect' }]);
  const priv = CAMPANA_74.scenes[8].options.map(o => o.option_id);
  assert.deepEqual(priv, ['74_private_o1', '74_private_o2', '74_private_o3'], 'los IDs se conservan tal cual, aunque no sigan el patrón de la escena');
});

test('74.º, Gira y 75.º se juegan; el 75.º empieza por la Gira y la Gira encadena con el 75.º', () => {
  assert.equal(CAMPANA_74.status, 'APPROVED');
  assert.equal(PCI.campanaJugable(74), CAMPANA_74);
  assert.equal(PCI.campanaJugable('gira').campaign_id, 'campaign_gira');
  assert.equal(PCI.inicioDeEdicion(75).campaign_id, 'campaign_gira');
  assert.equal(PCI.siguiente(PCI.campanaJugable('gira')).campaign_id, 'campaign_75');
  assert.equal(PCI.siguiente(PCI.campanaJugable(75)), null);
  for (const c of [PCI.campanaJugable('gira'), PCI.campanaJugable(75)]) assert.deepEqual(PC.validateCampaign(c), [], c.campaign_id);
  assert.equal(PCI.campanaJugable(50), null, 'el 50.º no pasa por el motor común');
  assert.equal(PCI.campanaJugable('gira').scenes.length, 8);
  assert.equal(PCI.campanaJugable(75).scenes.length, 6);
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

test('respuesta inmediata, diario con el contrato del anexo y ecos sin repetir', () => {
  const game = DEC.initDecisions({ mode: 'story' }, { random: () => 0.1 });
  const st = PC.createState(CAMPANA_74);
  PC.choose(CAMPANA_74, st, '74_reaping_o1', { game });
  assert.equal(PC.pendingResponse(CAMPANA_74, st).text, CAMPANA_74.scenes[0].options[0].response_text);
  const j = st.journal[0];
  assert.deepEqual(Object.keys(j).sort(), ['campaign_id', 'effects_applied', 'entry_id', 'option_id', 'scene_id', 'seen', 'source_version', 'text', 'timeline_id', 'route_type'].sort());
  assert.equal(j.entry_id, '74.diary.74_reaping.74_reaping_o1');
  assert.equal(j.timeline_id, game.timeline.timeline_id);
  assert.equal(game.decisionLog[0].decision_id, 'campaign_74:74_reaping:74_reaping_o1:1');
  PC.acknowledgeResponse(st);
  const ecos = PC.echoesFor(CAMPANA_74, st, CAMPANA_74.scenes[1]);
  assert.equal(ecos.length, 1);
  assert.equal(PC.echoesFor(CAMPANA_74, st, CAMPANA_74.scenes[2]).length, 0);
});

test('transferencia: instantánea completa, idempotente y sin valores numéricos aplicados', () => {
  const st = PC.createState(CAMPANA_74);
  const game = DEC.initDecisions({ mode: 'story', support: 12, sponsorTrust: 0 });
  for (const s of CAMPANA_74.scenes) PC.choose(CAMPANA_74, st, s.options[2].option_id, { game });
  const r1 = PC.applyTransfer(game, CAMPANA_74, st);
  assert.equal(r1.applied, true);
  const t = r1.snapshot;
  assert.equal(t.transfer_id, 'campaign_74:prearena:v1');
  assert.equal(t.prearena_complete, true);
  assert.equal(t.decision_ids.length, 11);
  assert.equal(t.diary_entry_ids.length, 11);
  assert.deepEqual(t.scenes_completed, ORDEN);
  const r2 = PC.applyTransfer(game, CAMPANA_74, st);
  assert.equal(r2.applied, false, 'la segunda vez no aplica nada');
  assert.equal(r2.snapshot, r1.snapshot);
  assert.equal(game.support, 12);
  assert.equal(game.sponsorTrust, 0, 'patrocinio e imagen pública: pendientes de confirmar límites');
  assert.equal(PC.MAPEO_NUMERICO_ACTIVO, false);
  assert.throws(() => PC.applyTransfer({}, CAMPANA_74, PC.createState(CAMPANA_74)), /no está terminada/);
  assert.equal(t.vars['campaign.launch_plan'], 'observation');
  assert.equal(t.flags.launch_observation_focus, true);
  const campaigns = fs.readFileSync(new URL('../js/campaigns.js', import.meta.url), 'utf8');
  assert.doesNotMatch(campaigns, /continuity/, 'la Arena existente no lee la continuidad hasta aprobar la tabla');
});

test('revisión 27-11, pregunta 6: arco, supervivencia y observación no tocan la habilidad genérica de la Arena', () => {
  for (const i of [0, 1, 2]) {
    const st = PC.createState(CAMPANA_74);
    const game = DEC.initDecisions({ mode: 'story', skill: 6, support: 12, sponsorTrust: 0 });
    for (const s of CAMPANA_74.scenes) PC.choose(CAMPANA_74, st, s.options[i].option_id, { game });
    PC.applyTransfer(game, CAMPANA_74, st);
    assert.equal(game.skill, 6);
    assert.equal(game.support, 12);
    assert.equal(game.sponsorTrust, 0);
    assert.ok(!Object.keys(game).some(k => /archery|survival|observation/.test(k)), 'sin atributos nuevos en la partida');
  }
});
