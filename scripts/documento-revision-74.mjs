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
**Estado:** \`DRAFT_FOR_REVIEW\`. Versión de contenido: \`${CAMPANA_74.source_version}\`.
- Escenas: \`${CAMPANA_74.source_ref}\` (fuente 1.0).
- Respuestas, diario, ecos y transferencia: \`${CAMPANA_74.annex_ref}\` (anexo 1.1).

## Cómo usar este documento
- **Escenas, opciones y efectos:** copiados **literalmente** de la fuente 1.0. Las respuestas, los diarios y los ecos, **literalmente** del anexo 1.1. Claude no ha añadido ni cambiado una palabra; el documento se genera desde los datos del juego con \`node scripts/documento-revision-74.mjs\`.
- **Huecos ${P}:** lo que todavía no está escrito. Claude no los rellena.
- **Transferencia a la Arena:** implementada según el anexo (instantánea idempotente, guardada antes de la Arena). Los valores numéricos quedan **sin aplicar** hasta que se confirmen los límites (ver preguntas).
- **Para cerrar el bloque:**
  - rellenar los huecos;
  - responder las preguntas del final;
  - cambiar el estado a \`APPROVED\` (lo decide la directora).

  Con eso, Claude vuelve a generar los datos y el 74.º pasa a ser jugable.

## Resumen
| # | Escena | Opciones | Respuestas | Diario | Ecos con frase |
|---|---|---|---|---|---|
${CAMPANA_74.scenes.map(s => `| ${s.sequence} | \`${s.scene_id}\` · ${s.title} | ${s.options.length} | ${s.options.filter(o => o.response_text).length} de ${s.options.length} | ${s.options.filter(o => o.journal_text).length} de ${s.options.length} | ${s.options.filter(o => o.echo).length} |`).join('\n')}
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

### Opciones
${s.options.map(o => `#### \`${o.option_id}\` — ${o.label}
- **Efecto (fuente):** \`${o.source_effect}\` → ${o.effects.map(efecto).join('; ')}
- **Respuesta inmediata (anexo):** ${o.response_text ? `«${o.response_text}»` : P}
- **Diario** (\`${o.journal_entry_id || '—'}\`): ${o.journal_text ? `«${o.journal_text}»` : P}
- **Eco:** ${o.echo ? `en \`${o.echo.scene_id}\` si \`${o.echo.flag}\`: «${o.echo.text}» (se muestra)` : o.echo_note ? `${o.echo_note} — **sin frase escrita: no se muestra** ${P}` : o.transfer_note ? `${o.transfer_note}` : '—'}`).join('\n')}
`);
});
L.push(`---

## Variables
| Variable en el guion | Variable en el contrato maestro | Tipo | Inicial | Valores |
|---|---|---|---|---|
${VARIABLES_74.map(v => `| \`${Object.keys(ADAPTADOR_74).find(k => ADAPTADOR_74[k] === v.path)}\` | \`${v.path}\` | ${v.type} | \`${v.default}\` | ${v.values ? v.values.map(x => `\`${x}\``).join(', ') : 'entero'} |`).join('\n')}

## Transferencia a la Arena (anexo 1.1, implementada)
Al terminar \`74_launch\` (y leer su respuesta), el juego:
1. crea la instantánea \`${CAMPANA_74.transfer_id}\`, con:
   - versión de contenido, \`timeline_id\` y \`route_type\`;
   - las once escenas completadas, las variables y los flags;
   - los \`decision_ids\` y los \`diary_entry_ids\`;
2. la **guarda antes** de entrar en la Arena. Si no se puede guardar, no se entra;
3. si se reintenta, devuelve la misma instantánea **sin sumar nada otra vez**;
4. abre únicamente la Arena del 74.º existente.

| Dato | Uso según el anexo | Estado en el juego |
|---|---|---|
| \`training_focus\` | Contexto descriptivo | Guardado en la instantánea; sin efecto mecánico |
| Habilidades (arco, supervivencia, observación) | Solo atributos existentes | El juego solo tiene una habilidad genérica (\`skill\`), sin arco, supervivencia ni observación por separado. **Sin aplicar** (pregunta 6) |
| \`private_session_result\` | Registro narrativo; no concede objetos | Guardado; sin efecto mecánico |
| \`image_capitol\` | Perfil público inicial | **Sin aplicar** hasta confirmar límites (pregunta 5). Candidato: \`support\` (0–100, empieza en 12) |
| \`sponsor_interest\` | Valor inicial del patrocinio existente, con sus límites | **Sin aplicar** hasta confirmar límites (pregunta 5). Candidato: \`sponsorTrust\` (empieza en 0) |
| Relaciones | Contexto; no fuerza alianzas | Guardadas; sin efecto mecánico |
| \`launch_plan\` | Texto o prioridad narrativa; no crea turno | Guardado; sin efecto mecánico |
| Flags familiares | Recuerdos del diario | Guardados; ninguno se convierte en ventaja |

## Preguntas abiertas (para cerrar el bloque)
1. **Aprobación:** ¿se aprueban las escenas 1.0 y el anexo 1.1 **tal como están**? Si cambia alguna palabra, cambiad la fuente o el anexo: los datos se regeneran desde ellos.
2. **\`74_private_o3\`:**
   - el efecto de la fuente deja \`private_session_result = strong\`;
   - el hito y el anexo dicen que la puntuación sigue siendo «extraordinariamente alta» en las tres opciones;
   - ¿se cambia el efecto a \`exceptional\` o se mantiene \`strong\` como matiz?
3. **Ecos descritos sin frase:** 28 ecos del anexo describen lo que debería decir el eco, pero no traen la frase (p. ej. «reflexión breve sobre…», «recuerdo silencioso»). Tampoco está escrita la frase de \`74_launch_o2\` sobre la promesa a Gale. El juego **no muestra** ninguno. ¿Se escriben, o se quedan solo como guía?
4. **Variables declaradas sin uso:** \`district_memory\` y \`canon_route\` aparecen en la lista del guion, pero ninguna opción las usa. ¿Faltan efectos o se quitan?
5. **Límites del patrocinio:** ¿cuánto suma cada punto de \`sponsor_interest\` a \`sponsorTrust\` y cada punto de \`image_capitol\` a \`support\`? Con eso se activan los valores.
6. **Habilidades:** el juego no tiene atributos separados de arco, supervivencia y observación. ¿Se quedan solo en la instantánea, o \`skill\` sube al tener alguna?
7. **Diálogos:** ¿se mantienen dentro de la prosa o se entregan separados como \`dialogue[]\`?
8. **\`location_id\` y \`participants[]\`:** ¿se confirman los IDs propuestos?
9. **Identificadores:** el juego ya usa los del anexo (\`campaign_74\`, \`campaign_74:<escena>:<opción>:1\`, \`74.diary.<escena>.<opción>\`). Confirmad que son los definitivos.
`);
fs.writeFileSync(path.join(root, 'docs/REVISION_74_PARA_CHATGPT.md'), L.join('\n'));
console.log('Generado docs/REVISION_74_PARA_CHATGPT.md');
