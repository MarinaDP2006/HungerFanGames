# Modelo editorial y rutas Web

## Rutas propuestas
`/` portada
`/panem`
`/distritos`
`/distritos/:districtId`
`/capitolio`
`/personajes`
`/personajes/:characterId`
`/juegos`
`/juegos/:editionId`
`/cronologia`
`/lugares`
`/lugares/:locationId`
`/expedientes`
`/expedientes/:documentId`
`/galeria`
`/acerca`

## Modelo de contenido
`content_id`, `slug`, `content_type`, `title`, `summary`, `body_blocks[]`, `related_ids[]`, `image_asset_ids[]`, `canon_status`, `source_refs[]`, `published_status`, `updated_at`.

## Estados editoriales
`DRAFT`, `REVIEW`, `APPROVED`, `PUBLISHED`, `ARCHIVED`.
Solo `APPROVED` puede publicarse.

## Componentes editoriales
Header, breadcrumb, hero, entity card, timeline, relation graph, fact panel, source note, gallery grid, filter bar, search results, footer.
No reutilizar el componente de decisiones del juego como si fuera un componente editorial.
