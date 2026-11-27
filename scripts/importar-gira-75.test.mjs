import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse, construir, FUENTE, ESCENAS, ARENA_75 } from './importar-gira-75.mjs';
import * as D from '../La_Cosecha_Juego_Android/js/campanas/campana-gira-75.js';
import { CAMPANAS, campanaJugable } from '../La_Cosecha_Juego_Android/js/campanas/indice.js';

const md = fs.readFileSync(new URL('../' + FUENTE, import.meta.url), 'utf8');

test('las 25 escenas del documento, con 3 opciones cada una', () => {
  const e = parse(md);
  assert.equal(e.length, 25);
  for (const s of e) assert.equal(s.options.length, 3, s.narrative_id);
});

test('todo queda en borrador y no se puede jugar', () => {
  for (const c of [D.GIRA_BORRADOR, D.CAMPANA_75_BORRADOR]) assert.equal(c.status, 'DRAFT_FOR_REVIEW');
  for (const k of Object.keys(CAMPANAS)) assert.ok(!campanaJugable(k)); for (const c of Object.values(CAMPANAS)) assert.ok(!campanaJugable(c.campaign_id));
  const app = fs.readFileSync(new URL('../La_Cosecha_Juego_Android/js/app.js', import.meta.url), 'utf8');
  assert.ok(!app.includes('campana-gira-75'), 'el juego no carga los borradores');
});

test('ninguna cifra inventada: los «+» del documento quedan en null', () => {
  for (const s of [...D.GIRA_BORRADOR.scenes, ...D.CAMPANA_75_BORRADOR.scenes])
    for (const o of s.options) for (const ef of o.effects) if (ef.op === 'ADD') assert.equal(ef.value, null);
});

test('Arena del 75.º: 75-07 a 75-15 van a los 8 acontecimientos existentes, sin escenas nuevas', () => {
  assert.equal(ARENA_75.length, 8);
  const usadas = new Set(ARENA_75.flatMap(a => a.escenas));
  for (let n = 7; n <= 15; n++) assert.ok(usadas.has(`75-${String(n).padStart(2, '0')}`));
  for (const id of Object.keys(ESCENAS)) assert.ok(!/^75-(0[7-9]|1[0-5])$/.test(id));
  assert.equal(construir(md).arena.length, 8);
});

test('el texto se copia tal cual de la fuente', () => {
  for (const s of [...D.GIRA_BORRADOR.scenes, ...D.CAMPANA_75_BORRADOR.scenes]) {
    for (const o of s.options) assert.ok(md.includes(`**${o.letra}. ${o.label}**`), o.option_id);
    for (const d of s.dialogue) assert.ok(md.includes(d.text), s.scene_id);
    if (s.journal_base) assert.ok(md.includes(s.journal_base));
  }
});
