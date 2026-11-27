// Canon cinematográfico del 75.º: Mags muere en la niebla con cualquier elección; Wiress muere en los charlajos (turno 7),
// después del descubrimiento del reloj (turno 5).
import test from 'node:test';
import assert from 'node:assert/strict';
import { makeApi, chapterEvent, applyChapterChoice, runChapterPre, composeEnding } from '../js/campaigns.js';

const partida = (extra = {}) => ({ mode: 'story', edition: 75, health: 100, flags: {}, relationships: { victors: 5 }, arenaTurn: 4,
  tributes: [{ name: 'Mags Flanagan', district: 4, alive: true }, { name: 'Wiress', district: 3, alive: true }, { name: 'Katniss Everdeen', district: 12, alive: true, player: true }], ...extra });

test('Mags muere en «La niebla» con las tres opciones, incluida cargar con ella', () => {
  for (const op of ['carry', 'let', 'run']) {
    const g = partida(), log = [];
    const ev = chapterEvent(g, 4);
    assert.equal(ev.title, 'La niebla');
    applyChapterChoice(g, ev, op, makeApi(g, m => log.push(m)));
    assert.equal(g.tributes[0].alive, false, op);
    assert.ok(!g.flags.magsSaved, op);
  }
});

test('el final no ofrece que Mags sobreviva', () => {
  const g = partida({ flags: { carriedMags: true, magsSaved: true } });
  const fin = composeEnding ? composeEnding(g, 'breakout') : null;
  if (fin) assert.ok(!fin.storyEpilogue.some(t => /Mags sale viva/.test(t)));
});

test('Wiress sigue viva en el turno 5 y muere al empezar «Los charlajos» (turno 7)', () => {
  const g = partida({ arenaTurn: 5 });
  assert.equal(chapterEvent(g, 5), null, 'el turno 5 es un evento de app.js, no un capítulo');
  assert.equal(g.tributes[1].alive, true);
  runChapterPre(g, 7, makeApi(g, () => {}));
  assert.equal(g.tributes[1].alive, false);
});
