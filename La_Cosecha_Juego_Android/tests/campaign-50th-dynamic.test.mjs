import assert from "node:assert/strict";
import { getDynamicArenaEvent, applyDynamicArenaChoice, DYNAMIC_ARENA_TURNS } from "../js/campaign-50th-dynamic.js";

const base = {
  mode: "story", edition: 50, turn: 11,
  stats: { health: 90, fatigue: 10, stealth: 50, skill: 60 },
  inventory: { water: 2, food: 2, medicine: 1, tools: 1 },
  relationships: { Maysilee: 70 }, allies: ["Maysilee"], flags: {}
};

assert.deepEqual(DYNAMIC_ARENA_TURNS, [11, 13, 16, 18, 21, 24]);
assert.equal(getDynamicArenaEvent({ ...base, mode: "free" }), null);
assert.equal(getDynamicArenaEvent({ ...base, edition: 74 }), null);

const thirsty = getDynamicArenaEvent({ ...base, inventory: { ...base.inventory, water: 0 } });
assert.ok(thirsty.context.variantIds.includes("thirst"));
assert.ok(!thirsty.choices.some(c => c.id === "ration"));

const wounded = getDynamicArenaEvent({ ...base, turn: 24, stats: { ...base.stats, health: 20 }, inventory: { ...base.inventory, medicine: 0 } });
assert.ok(wounded.context.variantIds.includes("wounded"));
assert.ok(wounded.context.variantIds.includes("no-medicine"));
assert.ok(!wounded.choices.some(c => c.id === "climb" || c.id === "treat"));

const alone = getDynamicArenaEvent({ ...base, turn: 18, allies: [] });
assert.ok(alone.context.variantIds.includes("alone"));
assert.ok(!alone.choices.some(c => c.id === "guard"));

const stocked = getDynamicArenaEvent({ ...base, turn: 21, inventory: { ...base.inventory, food: 5 } });
assert.ok(stocked.context.variantIds.includes("stocked"));
assert.ok(stocked.choices.some(c => c.id === "conserve"));

const outcome = applyDynamicArenaChoice(base, "waterline", "filter");
assert.equal(outcome.ok, true);
assert.equal(outcome.state.inventory.water, 1);
assert.equal(outcome.state.health, 95);

const invalid = applyDynamicArenaChoice(base, "waterline", "not-a-choice");
assert.deepEqual(invalid, { ok: false, reason: "choice_unavailable" });

const original = structuredClone(base);
getDynamicArenaEvent(base);
assert.deepEqual(base, original, "El selector no debe mutar el estado original");

console.log("La Cosecha 5.5: OK (6 turnos, variantes por estado, requisitos, efectos y aislamiento de modos).");
