# Modelo de datos editorial
Entidades recomendadas:
- `district`: id, name, industry, description, canonicalStatus, image.
- `character`: id, name, districtId, role, biography, relationships, appearances, canonicalStatus, portrait.
- `edition`: id, number, victorIds, arenaId, knownTributes, events, sources, canonicalStatus.
- `place`: id, name, type, districtId, description, gallery.
- `timelineEvent`: id, dateLabel, title, summary, relatedCharacterIds, relatedEditionIds, canonicalStatus.

Pruebas obligatorias:
- La Web no importa módulos de Android ni `game-engine`.
- Las rutas editoriales cargan sin inicializar campañas.
- Filtros de personajes/distritos funcionan.
- Todas las imágenes tienen texto alternativo.
- Enlaces internos válidos y rutas 404.
- El aviso de proyecto fan permanece visible.
