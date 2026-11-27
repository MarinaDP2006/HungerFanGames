# Especificación obligatoria para cada escena narrativa

Cada escena de campaña debe entregarse con este formato:

## Cabecera
- `scene_id` estable
- `campaign_id`
- `sequence`
- `title`
- `location_id`
- `participants[]`
- `canon_status`
- `source_version`
- `entry_conditions[]`
- `exit_conditions[]`

## Texto
- `opening_text`: prosa de escena.
- `dialogue[]`: cada intervención con `speaker_id`, `text`, `delivery_note`.
- `player_prompt`: pregunta o contexto de decisión.
- `options[]`: tres o más opciones cuando el diseño lo requiera; nunca añadir opciones por rellenar.
- `journal_entry`: texto breve derivado de lo ocurrido.
- `continuity_notes`: hechos que no pueden contradecirse.

## Opción
Cada opción contiene:
`option_id`, `label`, `response_text`, `effects[]`, `set_flags[]`, `clear_flags[]`, `next_scene_id`, `journal_tag`.

## Consecuencias
Las consecuencias deben ser observables y persistentes. No ofrecer elecciones cosméticas salvo que se etiqueten como `COSMETIC_ONLY` y se justifique su función.
No crear muerte, romance, parentesco, alianza o cambio de canon sin aprobación.

## Entrega de guion completo
Una campaña no se considera completa si solo tiene sinopsis, títulos de escenas, variables recomendadas o listas de eventos. Necesita texto jugable, diálogos, opciones, consecuencias y rutas de salida.
