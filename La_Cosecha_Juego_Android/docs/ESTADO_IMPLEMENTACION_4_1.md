# La Cosecha 4.1 — estado de implementación

## Cambios de esta revisión
- En modo historia, el personaje jugable queda fijado al Distrito 12 para las campañas de Haymitch y Katniss.
- Las plazas canónicas cuyos nombres no están identificados se etiquetan expresamente como desconocidas; no se inventan nombres y se presentan como oficiales.
- El generador libre evita repetir nombres dentro de una edición.
- El combate no permite seleccionar como objetivo a un aliado.
- Se protege el movimiento de los agentes cuando dos posiciones coinciden.
- Se añade exportación JSON del estado de la partida.
- La presidencia incluye un registro clasificado para investigar la supervivencia del Distrito 13; la revelación depende del avance del mandato.
- Se incrementa la versión de caché de la PWA para forzar la actualización del código.

## Límites que siguen vigentes
- Las campañas 50, 74 y 75 son prototipos ramificados parciales, no adaptaciones completas capítulo por capítulo.
- Los mapas son mapas 2D esquemáticos con posiciones abstractas; no hay pathfinding de navegación real ni simulación espacial 3D.
- El combate sigue siendo simplificado: no existe todavía un inventario táctico completo, anatomía detallada de heridas, infecciones modeladas ni cirugía.
- La presidencia usa variables agregadas; no simula cada habitante individual ni una economía completa.
- El sonido es síntesis original mediante Web Audio, no audio extraído de las películas.
- El APK necesita compilarse en un entorno Android SDK/Gradle o mediante el workflow de GitHub Actions. No se incluye un APK precompilado en esta entrega.

## Comprobaciones
- Sintaxis JavaScript con `node --check`.
- Integridad de ambos ZIP con `unzip -t`.
- Los recursos locales y rutas se conservan en sus respectivas carpetas de proyecto.
