# 74.º · respuesta técnica a la revisión de ChatGPT (27-11-2026)

Fuente: `docs/paquetes/74_revision_chatgpt/La_Cosecha_Respuesta_Revision_74_y_Correspondencias_Gira_75_v1.md`.

**El 74.º sigue en `DRAFT_FOR_REVIEW` y no se puede jugar.**

Respuesta punto por punto al apartado 5 de la revisión («Qué debe devolver Claude»).

## 1. Ecos añadidos
Hay **31 ecos con frase**: 2 del anexo 1.1 y 29 de la revisión (28 sencillos y la promesa a Gale combinada). Ninguno queda como nota.

Cada eco:
- es **solo texto**: no aplica efectos ni toca atributos, relaciones, patrocinio, imagen, inventario o resultados (lo comprueba una prueba);
- tiene un ID estable `74.echo.<flags>` y se deduplica por ID y por grupo;
- se calcula con funciones puras: repetir la pantalla o cargar la partida no lo duplica.

La promesa a Gale tiene grupo `gale_promise`:
- El eco de `74_goodbyes_o1` aparece al empezar `74_launch`.
- El eco combinado (`launch_family_focus` y `gale_promise_explicit`) va tras la respuesta de `74_launch_o2`. Solo se muestra si el del grupo no apareció ya en la escena.

**Consecuencia que conviene saber:** las dos frases dependen de `gale_promise_explicit` y las dos se muestran en `74_launch`. Por tanto, con la regla «mostrarlo una sola vez», la frase combinada **no llega a verse nunca**: siempre se adelanta la de despedida. Si queréis que se vea, decidid cuál de las dos manda.

**Ubicación:** 14 ecos nombran su escena o lugar sin ambigüedad y quedan fijados en ella. Los otros 15 dan el momento en palabras; los he colocado así, pero **es una interpretación técnica y hay que confirmarla**:

| Eco (flag) | Momento según la revisión | Escena asignada |
|---|---|---|
| `capitol_layout_observed` | mostrar durante la exploración del complejo. | `74_prep` |
| `arrival_stayed_near_peeta` | mostrar en una escena compartida con Peeta. | `74_prep` |
| `arrival_guarded` | mostrar en la primera interacción pública posterior a la llegada. | `74_parade` |
| `parade_confident` | mostrar al recordar la reacción del público. | `74_training` |
| `parade_pair_identity` | mostrar en la siguiente escena pública compartida con Peeta. | `74_training` |
| `parade_trust_team` | mostrar al terminar el desfile. | `74_training` |
| `trained_archery` | mostrar al volver a practicar o al hablar del entrenamiento. | `74_private_session` |
| `trained_survival` | mostrar al hablar de preparación para la Arena. | `74_launch` |
| `training_observed_others` | mostrar durante una observación posterior del Centro de Entrenamiento. | `74_private_session` |
| `private_archery_display` | mostrar al recordar la sesión privada. | `74_interview` |
| `private_tactical_display` | mostrar al recordar la sesión privada. | `74_interview` |
| `private_controlled_display` | mostrar al recordar la sesión privada. | `74_interview` |
| `interview_honest` | mostrar al recordar la entrevista. | `74_launch` |
| `interview_warm` | mostrar al recordar la entrevista o al tratar con el público. | `74_launch` |
| `interview_defiant` | mostrar al recordar la entrevista. | `74_launch` |

## 2. `location_id` y `participants[]`
**No hay ningún registro técnico de lugares en el proyecto.** Ninguno de los 11 IDs propuestos existe en el código: `district_12_square`, `district_12_justice_building`, `district_12_station`, `victory_train`, `capitol_station`, `capitol_prep_center`, `capitol_parade_avenue`, `capitol_training_center`, `gamemakers_private_room`, `capitol_interview_stage` y `arena_launch_room`. Tampoco hay IDs equivalentes que elegir: los lugares solo existen como texto (`location`) en cada escena. Por eso `location_id` sigue en `null`. Para validarlos hay que crear antes el registro de lugares, y eso necesita vuestra autorización.

**Personajes:** el único registro con IDs es `compartido/data.js` (16 personajes): `katniss_everdeen`, `peeta_mellark`, `rue`, `cato`, `thresh`, `clove`, `glimmer`, `marvel`, `finnick_odair`, `johanna_mason`, `haymitch_abernathy`, `annie_cresta`, `beetee_latier`, `wiress`, `cecelia`, `chaff`.

| Escena | IDs existentes | Sin ID en el registro |
|---|---|---|
| `74_reaping` | katniss_everdeen, haymitch_abernathy, peeta_mellark | Prim, Effie |
| `74_goodbyes` | katniss_everdeen | Prim, madre de Katniss, Gale |
| `74_departure` | katniss_everdeen, peeta_mellark | escolta |
| `74_train` | katniss_everdeen, peeta_mellark, haymitch_abernathy | Effie |
| `74_arrival` | katniss_everdeen, peeta_mellark, haymitch_abernathy | Effie |
| `74_prep` | katniss_everdeen, peeta_mellark | equipo de preparación, Cinna, Effie |
| `74_parade` | katniss_everdeen, peeta_mellark | Cinna, tributos, público |
| `74_training` | katniss_everdeen, peeta_mellark, haymitch_abernathy | tributos, entrenadores, Vigilantes |
| `74_private_session` | katniss_everdeen | Vigilantes |
| `74_interview` | katniss_everdeen, peeta_mellark, haymitch_abernathy | Caesar Flickerman, público |
| `74_launch` | katniss_everdeen | personal técnico, voz de control |

`participant_ids` sigue en `null` hasta que se decida si se añaden al registro Prim, Effie, Gale, la madre, Cinna y Caesar, y los grupos (tributos, Vigilantes, público…). No he inventado ningún ID.

## 3. `district_memory` y `canon_route`
**No hay ninguna referencia en el código del juego:**
- no están en `VARIABLES_74` (`js/precampana.js`) ni en ningún otro módulo, ni en guardados o pruebas;
- solo aparecen en la documentación: `docs/REVISION_74_PARA_CHATGPT.md`, `docs/ENTREGA_MAESTRA_V1_INVENTARIO.md` y el generador `scripts/documento-revision-74.mjs`, que las citan como «declaradas sin uso»;
- también en la lista de variables del guion de la fuente 1.0, que no se edita.

Quedan fuera del contrato de este bloque. No había nada técnico que retirar.

## 4. Esquema real de `support` y `sponsorTrust` (no se activa ninguna conversión)
| | `support` (apoyo del público) | `sponsorTrust` (favor de patrocinadores) |
|---|---|---|
| Valor inicial | 12 | 0 |
| Rango | 0–100: todas las escrituras lo limitan (`Math.min(100, …)`, `Math.max(0, …)` o `stat()`, que limita a 0–100) | Sin límite: solo se suma, nunca se limita ni baja |
| Lo modifican | cosecha (+6 o +2), entrenamiento social (+4), entrevista (+`support` de la respuesta), eventos y capítulos de Arena (entre −8 y +10 por acontecimiento), paracaídas (−4) | entrevista (+5, +7 o +9 según la respuesta), entrenamiento social (+3), paracaídas de medicina (+5) |
| Desde la precampaña | No: el motor nuevo no lo toca (`MAPEO_NUMERICO_ACTIVO = false`) | No |
| Al entrar en la Arena | No se normaliza ni se limita en ese momento | No se normaliza |

`image_capitol` y `sponsor_interest` siguen solo en la instantánea `game.continuity.campaign_74`.

## 5. Habilidades
`skill.archery`, `skill.survival` y `skill.observation` son variables propias de la precampaña. Viajan solo en la instantánea y **no tocan `game.skill`**, la habilidad genérica de la Arena (0–20, inicial 6). Una prueba lo comprueba tras la transferencia. No hay ningún atributo nuevo.

## 6. Propuesta para `dialogue[]` y `player_prompt` (sin activar)
Cada escena tiene ya los campos `dialogue: null` y `player_prompt: null`: pendientes, sin extraer nada de la prosa. Estructura propuesta para cuando ChatGPT los escriba:

```
dialogue: [
  { line_id: '74_reaping.d1', speaker_id: 'effie_trinket' | 'katniss_everdeen' | …, text: '…', delivery_note: '…' | null }
]
player_prompt: '…'   // la pregunta o indicación que precede a las tres opciones
```

`speaker_id` necesita el registro de personajes del punto 2. La validación exigirá:
- que cada `speaker_id` exista;
- `line_id` únicos;
- `text` no vacío.

Si `dialogue` es `null`, el juego no muestra nada.

## 7–8. Arena del 75.º
La tabla final, aprobada, y la verificación de Wiress, Mags y las plataformas de agua están en `docs/GIRA_75_CORRESPONDENCIAS_Y_PENDIENTES.md`, apartado 2.

## 9. Pruebas
- **Regeneración:** `importar-campana-74.mjs --comprobar` y la prueba de igualdad con las tres fuentes.
- **Ecos:** literales, IDs únicos, orden posterior a la opción, deduplicación de Gale y sin efectos.
- **Enmienda:** `74_private_o3` pasa a `exceptional` y se conserva el efecto original, con su motivo.
- **Guardado e idempotencia:** las pruebas existentes de transferencia, formato 5 y no duplicar decisiones siguen pasando.

## 10. GitHub
Todo sigue así:
- trabajo en `integracion-cosecha-5x`;
- PR #1 en Draft;
- `main` intacta;
- sin merge, Release ni despliegue.
