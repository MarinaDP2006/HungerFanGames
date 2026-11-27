# Guía de música, ambientes y efectos

## Principios
Audio original o con licencia compatible con distribución del juego. No usar melodías, leitmotivs ni grabaciones reconocibles de películas. No usar archivos cuya licencia no permita redistribución en APK/Web.

## Catálogo de cues
| ID | Contexto | Dirección |
|---|---|---|
| `mus_menu_panem` | Menú | Ceremonial contenido, tensión bajo superficie |
| `mus_district_ambient` | Distritos | Textura local, orgánica y discreta |
| `mus_reaping` | Cosecha | Pulso lento, tensión contenida |
| `mus_train` | Tren | Movimiento sostenido, transición |
| `mus_capitol` | Capitolio | Elegancia inquietante, precisión |
| `mus_parade` | Desfile | Espectáculo original, grandioso sin copiar franquicia |
| `mus_training` | Entrenamiento | Ritmo funcional, enfoque |
| `mus_interview` | Entrevista | Motivo ligero y mediático con tensión |
| `mus_arena` | Arena | Ambientes adaptativos, no saturar información |
| `mus_rebellion` | Rebelión | Percusión orgánica, tensión y esperanza |
| `mus_war` | Guerra | Capas sobrias, gravedad, sin glorificar daño |
| `mus_epilogue` | Final | Resolución emocional según desenlace |

## Ambientes
`amb_district_mining`, `amb_capitol_station`, `amb_train_interior`, `amb_training_center`, `amb_parade_crowd`, `amb_arena_forest`, `amb_arena_clock`, `amb_rebel_base`, `amb_war_city`.

## Efectos
` sfx_ui_confirm`, `sfx_ui_back`, `sfx_ui_error`, `sfx_reaping_name`, `sfx_train_door`, `sfx_platform_rise`, `sfx_map_select`, `sfx_resource_gain`, `sfx_notification`.

## Requisitos de entrega
Cada cue incluye duración, formato, loop, loudness objetivo, licencia, stems si aplica, fade-in/out, prioridad de mezcla y variante sin música.
- OGG para distribución cuando sea adecuado.
- WAV master fuera del APK.
- Control independiente de música, ambiente y efectos.
- Persistir preferencias.
- Respetar silencio del dispositivo y reduced motion no debe activar efectos visuales/audio inesperados.
- No bloquear decisiones o escenas si el audio falla.
