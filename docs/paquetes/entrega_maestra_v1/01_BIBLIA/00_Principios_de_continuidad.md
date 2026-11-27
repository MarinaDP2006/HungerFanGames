# Biblia maestra de continuidad

## Jerarquía de fuentes
1. Canon literario de Los Juegos del Hambre como referencia narrativa principal.
2. Continuidad cinematográfica como referencia visual y de ambientación, cuando no contradiga la base literaria.
3. Material original de La Cosecha, identificado como fan-fiction/fan-game y separado del canon.
4. Decisiones del jugador, que crean rutas alternativas etiquetadas como `ALT_ROUTE`, nunca reescriben silenciosamente el canon de referencia.

Cuando dos fuentes difieran, no fusionarlas sin criterio: registrar la diferencia en `continuity_notes` y elegir explícitamente la referencia para esa campaña.

## Reglas inviolables
- El Distrito 13 no participa en las cosechas ordinarias.
- No atribuir victorias compartidas salvo que el canon o una ruta alternativa aprobada las justifique.
- No inventar parentescos, mentorías, romances, muertes, encuentros ni motivaciones como hechos canónicos.
- Diferenciar `CANON_FACT`, `CANON_COMPATIBLE`, `INTERPRETATION` y `ALT_ROUTE`.
- Los personajes canónicos deben conservar motivaciones, límites, voz y conocimiento coherentes con el momento cronológico.
- Ningún personaje conoce información que todavía no ha podido conocer.
- Mantener edad, distrito, edición, estado vital y relaciones coherentes en cada fecha.
- Los cambios del jugador deben persistir y tener trazabilidad.

## Restricciones específicas del 50.º
- No añadir reacciones ni consecuencias de muertes de tributos que no sean principales.
- No escribir crónica de Arena nueva.
- No inventar encuentros entre rivales.
- No crear eventos ni turnos adicionales.
- El adaptador dinámico 5.5 solo puede variar redacción y etiquetas de opciones en acontecimientos ya existentes, en función de alianzas, heridas, recursos, sigilo/habilidades y decisiones previas.
- Mantener IDs, efectos y consecuencias originales.
- No integrar 5.2, 5.3 ni 5.4 tal como están.
- El 50.º queda protegido frente a ampliaciones narrativas no aprobadas.

## Reglas del 74.º
La ruta canónica conserva los hitos ya escritos en las once escenas de `00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md`: Prim seleccionada, voluntariado de Katniss, Peeta seleccionado, despedidas, tren, llegada, preparación, desfile, entrenamiento, sesión privada, entrevista y lanzamiento.
Las opciones pueden matizar relaciones, enfoque y presentación, pero no borrar hitos canónicos de la ruta base.

## Continuidad entre campañas
La Gira debe depender del resultado de la edición precedente y de la situación política. El 75.º debe reconocer el estado heredado de vencedores y Capitolio. Rebelión y Guerra deben depender de decisiones previas y de flags de estado, no de una escena aislada que aparezca sin preparación.
No se debe asumir una única línea temporal cuando el jugador haya alterado acontecimientos. Cada partida lleva `timeline_id` y `route_type`.

## Registro de decisiones
Cada decisión importante registra:
- `decision_id`
- `campaign_id`
- `scene_id`
- `option_id`
- `timestamp_in_run`
- `effects_applied`
- `continuity_tags`
- `source_text_version`

No duplicar efectos al cargar una partida.
