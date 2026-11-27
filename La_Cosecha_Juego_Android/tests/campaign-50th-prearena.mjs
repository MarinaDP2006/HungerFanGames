import assert from 'node:assert/strict';
import {
  buildRoster50, PRE_ARENA_50, createPreArena50State,
  getPreArena50Scene, applyPreArena50Choice, applyPreArena50ToGame,
  renderPreArena50Panel
} from '../js/campaign-50th-prearena.js';

const roster = buildRoster50();
assert.equal(roster.length, 48, 'La Arena debe tener 48 plazas');
for (let district = 1; district <= 12; district++) {
  assert.equal(roster.filter(t => t.district === district).length, 4, `Distrito ${district}: cuatro plazas`);
}
assert.ok(roster.some(t => t.name === 'Haymitch Abernathy' && t.district === 12));
assert.ok(roster.some(t => t.name === 'Maysilee Donner' && t.district === 12));
assert.ok(roster.some(t => t.name === 'Wyatt Callow' && t.district === 12));
assert.ok(roster.some(t => t.name === 'Lou Lou' && t.district === 12));
assert.ok(!roster.some(t => t.name === 'Louella McCoy'), 'Louella muere antes de la Arena');
assert.ok(!roster.some(t => t.name === 'Woodbine Chance'), 'Woodbine no compite en la Arena');

assert.equal(PRE_ARENA_50.length, 9);
const state = createPreArena50State();
assert.equal(getPreArena50Scene(state).id, 'reaping');
assert.equal(applyPreArena50Choice(state, 'not-a-choice').ok, false);
assert.equal(state.index, 0, 'Una opción inválida no avanza la campaña');

const route = ['lenore','protect','promise','maysilee','network','observe','record','human','alliance'];
for (const choice of route) {
  const result = applyPreArena50Choice(state, choice);
  assert.equal(result.ok, true, `Elección ${choice}`);
}
assert.equal(state.complete, true);
assert.equal(getPreArena50Scene(state), null);
assert.ok(state.flags.lookedForLenore);
assert.ok(state.flags.protectedFamilyAtReaping);
// Requisito del proyecto (finalización técnica): el desfile no introduce la muerte de Louella
// ni consecuencias de muertes de tributos secundarios. Antes se comprobaba lo contrario.
assert.equal(state.flags.louellaDiedBeforeArena, undefined);
assert.ok(state.flags.watchedParade50, 'la opción del desfile registra su indicador');
assert.ok(!/muere|muerte|pérdida/i.test(PRE_ARENA_50.find(s => s.id === 'parade').title + PRE_ARENA_50.find(s => s.id === 'parade').body));
assert.ok(roster.some(t => t.name === 'Lou Lou') && !roster.some(t => t.name === 'Louella McCoy'), 'el reparto de 48 se mantiene');
assert.ok(state.flags.maysileeAlliance);
assert.ok(state.relationships.maysilee > 0);
assert.equal(state.history.length, 9);

const game = {
  health: 100, skill: 6, stealth: 0, support: 12, rebellion: 0,
  flags: {}, relationships: {}, playerSector: 6,
  tributes: roster
};
const haymitch = roster.find(t => t.name === 'Haymitch Abernathy');
haymitch.player = true;
applyPreArena50ToGame(state, game);
assert.equal(game.preArena50, state);
assert.equal(game.flags['50th-louellaDiedBeforeArena'], undefined);
assert.ok(game.flags['50th-watchedParade50']);
assert.equal(roster.find(t => t.name === 'Maysilee Donner').alliance, 'player');
assert.ok(game.relationships.maysilee > 0);
assert.ok(game.skill >= 6);
// Las bonificaciones se aplican una sola vez (p. ej. al cargar una partida).
const once = { skill: game.skill, support: game.support, stealth: game.stealth, rebellion: game.rebellion, health: game.health };
applyPreArena50ToGame(state, game);
applyPreArena50ToGame(JSON.parse(JSON.stringify(state)), game);
assert.deepEqual({ skill: game.skill, support: game.support, stealth: game.stealth, rebellion: game.rebellion, health: game.health }, once);
assert.ok(renderPreArena50Panel(createPreArena50State(), 'harvest').includes('La cosecha del Segundo Vasallaje'));

console.log('Campaña 50.º Vasallaje pre-Arena: OK (48 tributos, 9 escenas, continuidad y efectos).');
