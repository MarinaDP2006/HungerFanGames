# Esquema de variables, condiciones y efectos

## Tipos
- `int`: puntuaciones, contadores y valores discretos.
- `float`: medidores continuos con límites explícitos.
- `bool`: flags.
- `enum`: estados finitos.
- `string`: IDs y textos breves.
- `array`: listas ordenadas de IDs.
- `object`: estructuras versionadas.

## Namespaces
`rel.*` relaciones; `skill.*` habilidades; `resource.*` recursos; `public.*` imagen pública; `sponsor.*` patrocinadores; `politics.*` política; `campaign.*` estado de campaña; `continuity.*` continuidad.

## Registro inicial de variables 74.º
- `rel.katniss_prim` (int, default 0)
- `rel.katniss_peeta` (int, default 0)
- `rel.katniss_haymitch` (int, default 0)
- `public.image_capitol` (int, default 0)
- `sponsor.interest` (int, default 0)
- `skill.archery` (int, default 0)
- `skill.survival` (int, default 0)
- `skill.observation` (int, default 0)
- `campaign.training_focus` (enum: `balanced`, `observation`, `archery`, `survival`)
- `campaign.private_session_result` (enum: `unknown`, `strong`, `exceptional`)
- `campaign.interview_tone` (enum: `unknown`, `guarded`, `warm`, `defiant`)
- `campaign.launch_plan` (enum: `unknown`, `survival`, `family`, `observation`)
- Flags source: conservar exactamente los nombres `flag` usados por el guion fuente o mapearlos en una capa adaptadora.

## Operadores de condición
`EQ`, `NEQ`, `GT`, `GTE`, `LT`, `LTE`, `IN`, `HAS_FLAG`, `NOT_FLAG`, `ALL`, `ANY`, `NOT`.

## Operadores de efecto
`ADD`, `SET`, `MIN`, `MAX`, `CLAMP`, `SET_FLAG`, `CLEAR_FLAG`, `APPEND_UNIQUE`, `EMIT_JOURNAL`.

## Ejemplo conceptual (no sustituye la estructura real del motor)
```json
{
  "option_id": "74_reaping_o1",
  "effects": [
    {"op": "ADD", "path": "rel.katniss_prim", "value": 2},
    {"op": "SET_FLAG", "path": "prim_saw_katniss_protect"}
  ],
  "journal_tag": "family_protection"
}
```

## Idempotencia
Cada efecto debe tener `decision_event_id`. Si el mismo evento se procesa al cargar/reanudar, no volver a aplicarlo. Las migraciones deben ser transaccionales y conservar el estado anterior en caso de fallo.
