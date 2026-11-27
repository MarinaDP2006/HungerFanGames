# Modelo de datos maestro

## Convenciones
- IDs en `snake_case`, únicos, estables y nunca reutilizados.
- Referencias entre entidades por ID, no por nombre visible.
- Textos localizados en recursos separados; no hardcodear contenido narrativo en lógica.
- Los campos desconocidos se guardan como `null` o `unknown`, nunca se rellenan por intuición.
- Cada registro tiene `source_ref`, `canon_status`, `review_status` y `version`.

## Esquema de entidades
### Character
`character_id`, `display_name`, `aliases[]`, `district_id`, `birth_year`, `age_by_campaign`, `status_by_timeline`, `role_tags[]`, `personality_summary`, `voice_notes`, `relationships[]`, `appearance_brief`, `knowledge_scope[]`, `source_ref`, `canon_status`.

### District
`district_id`, `number`, `name`, `industry`, `environment`, `living_conditions`, `capitol_relation`, `culture_notes`, `locations[]`, `source_ref`, `canon_status`.

### Location
`location_id`, `name`, `district_id`, `location_type`, `visual_identity`, `sensory_profile`, `connected_locations[]`, `campaign_uses[]`, `source_ref`.

### Campaign
`campaign_id`, `title`, `timeline_id`, `entry_conditions[]`, `scene_ids[]`, `exit_conditions[]`, `route_type`, `status`.

### Scene
Usar `02_NARRATIVA/01_Especificacion_de_guion.md`.

### Event
`event_id`, `campaign_id`, `scene_id`, `sequence`, `participants[]`, `prerequisites[]`, `effects[]`, `canon_status`.

### Relationship
`relationship_id`, `from_character_id`, `to_character_id`, `type`, `value`, `visibility`, `valid_from`, `valid_until`, `source_ref`.

## Campos de trazabilidad
`created_by`, `reviewed_by`, `approved_by`, `created_at`, `updated_at`, `source_version`.
No usar `approved_by: ChatGPT` como sustituto de aprobación del usuario.
