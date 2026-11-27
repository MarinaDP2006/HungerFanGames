// Genera docs/REVISION_74_PARA_CHATGPT.md: el documento único del 74.º para la revisión creativa.
// Todo el texto de escenas y opciones sale literal de los datos (que a su vez salen de la fuente).
// Lo que falta se deja en huecos [PENDIENTE] para que lo escriba la dirección creativa.
import fs from 'node:fs';
import path from 'node:path';
import { CAMPANA_74 } from '../La_Cosecha_Juego_Android/js/campanas/campana-74.js';
import { VARIABLES_74, ADAPTADOR_74 } from '../La_Cosecha_Juego_Android/js/precampana.js';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const P = '[PENDIENTE · ChatGPT]';
// Lugares propuestos en 03_BASE_DATOS/03_Localizaciones_y_cronologia.md, en el mismo orden que las escenas.
const LUGARES = ['district_12_square', 'district_12_justice_building', 'district_12_station', 'victory_train', 'capitol_station', 'capitol_prep_center', 'capitol_parade_avenue', 'capitol_training_center', 'gamemakers_private_room', 'capitol_interview_stage', 'arena_launch_room'];
const efecto = e => e.op === 'SET_FLAG' ? `flag \`${e.path}\`` : e.op === 'ADD' ? `\`${e.path}\` +${e.value}` : `\`${e.path}\` = \`${e.value}\``;
const flags = CAMPANA_74.scenes.flatMap(s => s.options.flatMap(o => o.effects.filter(e => e.op === 'SET_FLAG').map(e => ({ flag: e.path, option: o.option_id, scene: s.scene_id }))));

const L = [];
L.push(`# 74.º Juegos del Hambre · documento único de revisión

**Para:** ChatGPT (dirección creativa). **Aprueba:** la directora del proyecto.
**Estado:** \`DRAFT_FOR_REVIEW\`. Fuente: \`${CAMPANA_74.source_ref}\` (${CAMPANA_74.source_version}).

## Cómo usar este documento
- **Escenas y opciones:** el título, el lugar, los personajes, el texto, las opciones, los efectos y los hitos están copiados **literalmente** de la fuente, sin una palabra añadida. Sale de los datos del juego con \`node scripts/documento-revision-74.mjs\`.
- **Huecos ${P}:** es lo que la fuente no trae y exige la especificación de guion (\`02_NARRATIVA/01_Especificacion_de_guion.md\`). Claude no los escribe.
- **Sección «Transferencia a la Arena»:** es una **propuesta técnica** para que la apruebes o la cambies. No está activa en el juego.
- **Para cerrar el bloque:**
  - rellenar los huecos;
  - responder las preguntas del final;
  - cambiar el estado a \`APPROVED\` (lo decide la directora).

  Con eso, Claude vuelve a generar los datos y el 74.º pasa a ser jugable.

## Resumen
| # | Escena | Opciones | Respuestas escritas | Diario escrito |
|---|---|---|---|---|
${CAMPANA_74.scenes.map(s => `| ${s.sequence} | \`${s.scene_id}\` · ${s.title} | ${s.options.length} | 0 de ${s.options.length} | No |`).join('\n')}
`);
CAMPANA_74.scenes.forEach((s, i) => {
  L.push(`---

## ${s.sequence}. \`${s.scene_id}\` — ${s.title}
| Campo | Valor |
|---|---|
| Lugar (fuente) | ${s.location} |
| \`location_id\` propuesto | \`${LUGARES[i]}\` (de \`03_BASE_DATOS/03\`; confirmar) |
| Personajes (fuente) | ${s.participants} |
| \`participants[]\` con IDs | ${P} |
| Hito de continuidad (fuente) | ${s.milestone} |
| Condiciones de entrada | Haber terminado ${i === 0 ? 'la selección de campaña' : `\`${CAMPANA_74.scenes[i - 1].scene_id}\``} |
| Salida | ${i < CAMPANA_74.scenes.length - 1 ? `\`${CAMPANA_74.scenes[i + 1].scene_id}\`` : 'Arena del 74.º existente (sin acontecimientos nuevos)'} |

**Texto de la escena (fuente):**

> ${s.text.replace(/\n+/g, '\n> ')}

**\`dialogue[]\`** (intervenciones con \`speaker_id\`, \`text\`, \`delivery_note\`): ${P}. La fuente narra los diálogos dentro de la prosa. Indicad si debe quedarse así o si hay que separarlos.

**\`player_prompt\`** (la pregunta antes de decidir): ${P}

**\`journal_entry\` de la escena:** ${P}

### Opciones
| ID | Texto del botón (fuente) | Efecto (fuente) | Efecto en el contrato maestro | \`response_text\` | \`journal_tag\` | Texto del diario |
|---|---|---|---|---|---|---|
${s.options.map(o => `| \`${o.option_id}\` | ${o.label} | \`${o.source_effect}\` | ${o.effects.map(efecto).join('; ')} | ${P} | ${P} | ${P} |`).join('\n')}
`);
});
L.push(`---

## Diario de continuidad
La fuente pide generar el diario desde los flags, sin duplicar entradas al cargar (el motor ya lo garantiza: cada escena registra una sola decisión). Falta el texto de cada entrada:

| Flag | Lo fija | Escena | Texto del diario |
|---|---|---|---|
${flags.map(f => `| \`${f.flag}\` | \`${f.option}\` | \`${f.scene}\` | ${P} |`).join('\n')}

## Variables
| Variable en el guion | Variable en el contrato maestro | Tipo | Inicial | Valores |
|---|---|---|---|---|
${VARIABLES_74.map(v => `| \`${Object.keys(ADAPTADOR_74).find(k => ADAPTADOR_74[k] === v.path)}\` | \`${v.path}\` | ${v.type} | \`${v.default}\` | ${v.values ? v.values.map(x => `\`${x}\``).join(', ') : 'entero'} |`).join('\n')}

## Transferencia a la Arena — PROPUESTA TÉCNICA (no activa)
Al terminar \`74_launch\`, el motor guarda todo el estado en \`game.continuity['74']\` y la partida entra en la Arena del 74.º existente (cuatro capítulos, sin acontecimientos nuevos).

Hoy la Arena **no lee** ese estado. Esta es la traducción que propongo a las estadísticas que la Arena ya usa. Solo se activará cuando la aprobéis o la cambiéis:

| Variable | Propuesta | Estadística de la Arena | Motivo |
|---|---|---|---|
| \`public.image_capitol\` | +2 por punto (máx. +10) | \`support\` (apoyo del público) | La imagen pública ya alimenta el apoyo |
| \`sponsor.interest\` | +1 por punto | \`sponsorTrust\` (envíos de patrocinadores) | Correspondencia directa |
| \`campaign.private_session_result\` | \`exceptional\` +3 · \`strong\` +1 | \`sponsorTrust\` | La puntuación atrae patrocinadores |
| \`skill.archery\` | +1 si ≥ 1 | \`skill\` (combate) | |
| \`skill.observation\` | +2 si ≥ 1 | \`stealth\` | |
| \`skill.survival\` | −5 al empezar, si ≥ 1 | \`thirst\` y \`hunger\` | |
| \`campaign.interview_tone\` | \`warm\` apoyo +5 · \`guarded\` apoyo +2 · \`defiant\` rebelión +3 | \`support\` / \`rebellion\` | Igual que la entrevista genérica actual |
| \`campaign.launch_plan\` | \`observation\`: tributos visibles en el mapa · \`survival\`: fatiga −5 · \`family\`: ${P} | Mapa / \`fatigue\` | \`family\` no tiene equivalente mecánico: ¿efecto narrativo solo? |
| \`rel.katniss_peeta\`, \`rel.katniss_prim\`, \`rel.katniss_haymitch\` | Sin efecto mecánico propuesto | — | Cualquier efecto sobre alianzas o escenas de la Arena es narrativo: decidid si lo tiene |
| \`campaign.training_focus\` | Sin efecto propuesto (ya se refleja en \`skill.*\`) | — | |
| Flags | Se conservan para la Gira y el 75.º | — | Continuidad |

## Preguntas abiertas (para cerrar el bloque)
1. ¿Se aprueban los textos de la fuente **tal como están**? Si cambia alguna palabra, cambiad la fuente: los datos se regeneran desde ella.
2. **Variables declaradas sin uso:** \`district_memory\` y \`canon_route\` aparecen en la lista del guion, pero ninguna opción las usa. ¿Faltan efectos o se quitan?
3. **\`74_private_o3\`:** deja \`private_session_result = strong\`, pero el hito dice que la puntuación es «extraordinariamente alta». ¿Se mantiene \`strong\` o el hito cambia en esta ruta?
4. **Diálogos:** ¿se mantienen dentro de la prosa o se entregan separados como \`dialogue[]\`?
5. **Transferencia a la Arena:** ¿se aprueba la propuesta técnica? ¿Qué hace \`launch_plan = family\`?
6. **\`location_id\` y \`participants[]\`:** ¿se confirman los IDs propuestos?
`);
fs.writeFileSync(path.join(root, 'docs/REVISION_74_PARA_CHATGPT.md'), L.join('\n'));
console.log('Generado docs/REVISION_74_PARA_CHATGPT.md');
