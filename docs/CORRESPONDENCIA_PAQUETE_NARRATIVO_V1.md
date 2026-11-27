# Paquete de Dirección Narrativa y Visual v1: correspondencia con el juego real

Respuesta técnica a `04_Entrega_Claude/INSTRUCCIONES_DE_INTEGRACION.md`. El paquete está copiado sin cambios en `docs/paquetes/direccion_narrativa_visual_v1/`.

**No se ha implementado nada narrativo.** Este documento solo compara lo propuesto con lo que existe y lista lo que hace falta para empezar. La fase 2 (motor genérico de precampaña) sigue **sin autorizar**.

Aviso: la directiva «La Cosecha debe ser un juego completo» llegó **cortada en la sección 7**. Lo que venga después no está reflejado aquí.

## 1. Qué existe hoy (rama `integracion-cosecha-5x`, versión 4.9.0)

| Pieza | Dónde | Estado |
|---|---|---|
| Fases genéricas del modo historia: `harvest` → `training` → `interview` → `arena` → `ending` | `js/app.js` | Iguales para 50.º, 74.º, 75.º y modo libre |
| Precampaña propia del 50.º (9 escenas aprobadas, fase `prearena50`) | `js/campaign-50th-prearena.js` | Solo 50.º. Estado guardado en `game.preArena50` (índice, relaciones, atributos) |
| Capítulos de Arena por edición | `js/campaigns.js` | 50.º: 4 · 74.º: 4 (baño de sangre, rastrevíspulas, cambio de reglas, banquete) · 75.º: 4 (plataformas, niebla, charlajos, la red) |
| Presidencia (órdenes, 9 crisis, 40 días, 6 finales) | `js/presidency.js` | Funciona; no es una campaña de Rebelión/Guerra |
| Guerra civil abstracta | `warAction`, `warRound` en `js/app.js` | Sin mapa ni unidades |
| Estado transversal | `game.flags`, `game.relationships`, `game.inventory` | Sin campaña ni línea temporal asociada |
| Guardado | `js/saves.js`, `saveVersion` 4, 3 ranuras, migración | Preparado para añadir campos con migración |

## 2. Escenas propuestas frente a contenido implementado

### 74.º Juegos del Hambre

| ID del paquete | En el juego | Situación |
|---|---|---|
| `74_reaping` | Fase `harvest` (genérica) | Parcial: no es una escena propia del 74.º |
| `74_goodbyes` | — | No existe |
| `74_departure` | — | No existe |
| `74_train` | — | No existe |
| `74_arrival` | — | No existe |
| `74_prep` | — | No existe |
| `74_parade` | — | No existe |
| `74_training` | Fase `training` (genérica) | Parcial |
| `74_private_session` | — | No existe |
| `74_interview` | Fase `interview` (genérica) | Parcial |
| `74_launch` | Paso directo de `interview` a `arena` | No existe como escena |
| Arena del 74.º | `campaigns.js`, 4 capítulos | Existe; el paquete pide no añadir acontecimientos |

Variables del 74.º que pide el paquete y su estado: `public_image`, `capitol_attention`, `haymitch_trust`, `peeta_trust`, `training_profile`, `sponsor_interest`, `known_skills`, `injury_state` y `continuity_74`. **Ninguna existe** con ese nombre. Hay datos parecidos y dispersos: `game.relationships`, `game.flags`, heridas e inventario.

### Gira de la Victoria
No existe nada. Tampoco ninguna de sus variables (`public_pressure`, `capitol_suspicion`, `district_sympathy`, `victor_relationship`, `speech_control`, `propaganda_exposure`).

### 75.º Vasallaje

| Acto del paquete | En el juego |
|---|---|
| 1. Anuncio del Vasallaje | No existe |
| 2. Cosecha de vencedores | Fase `harvest` genérica (no distingue vencedores) |
| 3. Preparación | No existe |
| 4. Entrenamiento | Fase `training` genérica |
| 5. Entrevistas | Fase `interview` genérica |
| 6. Entrada en la Arena | No existe como escena |
| 7. Arena | `campaigns.js`, 4 capítulos (existe) |
| 8. Conspiración y extracción | No existe |

### Rebelión y Guerra
No existen como campañas. Lo más cercano es la guerra civil abstracta y la Presidencia, que son otro modo. Ninguna variable de Rebelión/Guerra existe (`district_support`, `rebel_legitimacy`, `civilian_risk`, `military_capacity`, `capitol_control`, `information_integrity`, `leadership_trust`, `postwar_policy`).

### Roles de la directiva
- **Existen:** tributo (modo historia/libre) y Presidente.
- **No existen:** mentor, ciudadano, organizador de los Juegos y modo libre con editores y vista previa (solo hay el editor de alineaciones «¿Y si…?»).

### Componentes de interfaz
De `AppShell`, `ModeSelector`, `SceneHeader`, `CharacterPortrait`, `DialoguePanel`, `ChoiceCard`, `RelationshipPanel`, `SaveSlotCard`, `SettingsPanel`, `ConfirmDialog` y `TimelineBadge`:
- **Existen como piezas reutilizables:** ranuras (`slot-card`), ajustes (`settings-panel`) y confirmación en dos pasos al borrar.
- **El resto** se pinta con plantillas dentro de `app.js`.

## 3. Contradicciones y decisiones pendientes (necesitan respuesta antes de tocar narrativa)

1. **74.º aprobado vs paquete.** Implementar las 11 escenas sustituye las fases genéricas del 74.º. La regla vigente dice no modificar la campaña aprobada del 74.º hasta aprobar su paquete. ¿Este paquete es esa aprobación, o falta el paquete con los textos escena a escena?
2. **Orden de escenas.** El paquete pone el desfile (`74_parade`) antes del entrenamiento (`74_training`). El 50.º aprobado va al revés: llegada → entrenamiento → desfile. ¿El 74.º sigue el orden del paquete? El 50.º no se toca.
3. **Motor común.** Para el 74.º y el 75.º lo razonable es generalizar el motor de precampaña del 50.º. Eso es la fase 2, sin autorizar. Sin ella, cada campaña sería código duplicado.
4. **Nombres de variables.** El paquete usa nombres en inglés (`public_image`…). Propuesta: usarlos tal cual como claves de datos en `game.campaignState[campaign_id]`. Así los textos de ChatGPT y el código hablan el mismo idioma.
5. **Continuidad entre campañas.** `continuity_74` debe pasar a la Gira y al 75.º. Hay que decidir si una partida del 75.º puede empezar sin una del 74.º (con valores de referencia) o solo desde una partida guardada.
6. **Arena del 50.º.** Sigue reutilizando el mapa del bosque. El paquete pide arenas diferenciadas para el 75.º; para el 50.º hace falta un mapa propio.
7. **Identidad visual por modo.** Historia, Libre y Presidente comparten hoy estilo. Separarlos necesita los recursos de la sección 4.
8. **Directiva cortada.** Falta todo lo que va después de la sección 7.

## 4. Recursos gráficos necesarios (los crea ChatGPT; nombres y medidas propuestos)

Formato: WebP con respaldo JPG, igual que los actuales de `assets/optimized/`. Se generan dos tamaños de cada fondo. Ninguno puede reproducir fotogramas, carteles ni actores de las películas.

| Recurso | Medidas | Nombre | Pantalla |
|---|---|---|---|
| Fondos de escena del 74.º (11) | 1600×900 y 960×540 | `escena-74-<id>-1600.webp` (p. ej. `escena-74-reaping-1600.webp`) | Escena de precampaña del 74.º |
| Fondos de la Gira (Acto I–IV + uno por distrito visitado) | 1600×900 y 960×540 | `escena-gira-<acto o distrito>-1600.webp` | Gira de la Victoria |
| Fondos del 75.º (8 actos) | 1600×900 y 960×540 | `escena-75-<acto>-1600.webp` | 75.º Vasallaje |
| Mapa de la Arena del reloj | 1600×900 y 960×540 | `arena-reloj-1600.webp` | Arena del 75.º |
| Mapa de la Arena de la pradera | 1600×900 y 960×540 | `arena-pradera-1600.webp` | Arena del 50.º |
| Retratos de personajes canónicos | 300×437 (como los actuales) | `retrato-<personaje>.webp` | `CharacterPortrait`, diálogos |
| Portadas de modo (Historia, Libre, Presidente) | 960×1240 y 480×643 (como `capitolio`) | `modo-<historia/libre/presidente>-960.webp` | Selector de modo |
| Fondos de los 12 distritos y el Capitolio | 1600×900 y 960×540 | `distrito-<n>-1600.webp`, `capitolio-ciudad-1600.webp` | Mapa de Panem y exploración |
| Emblemas de distrito (13) | 256×256, SVG o WebP | `emblema-distrito-<n>.svg` | Mapa, fichas, Presidencia |

## 5. Plan por commits pequeños (solo tras autorización y textos finales)

1. **Esquema de rutas sin contenido.** `campaign_id`, `timeline_id`, `scene_id`, `choice_id`, `state_changes`, `relationship_changes`, `knowledge_flags`, `continuity_flags` y `ending_flags`. Lleva validador y pruebas; ningún texto.
2. **Estado por campaña.** `game.campaignState` con las variables del paquete, `saveVersion` 5 y migración desde la 4. Pruebas de migración e ida y vuelta.
3. **Motor común de precampaña** (fase 2). Generalizar el del 50.º sin cambiar su comportamiento. Las 13 pruebas del 50.º, que siguen en verde, sirven de red.
4. **74.º:** cargar las escenas desde los textos finales de ChatGPT, sin redactar nada.
5. **Continuidad 74 → Gira → 75:** traspaso de variables, más pruebas de rutas y banderas.
6. **Identidad visual por modo** cuando lleguen los recursos.
7. **Capturas de cada modo** e informe.

## 6. Pruebas que acompañarán a cada paso

- **Persistencia:** guardar y cargar en mitad de cada escena; reinicio de la app (en el emulador de CI).
- **Rutas:** cada elección lleva a la escena declarada; no hay escenas inalcanzables ni bucles.
- **Banderas:** `knowledge_flags` y `continuity_flags` se fijan una vez y llegan a la campaña siguiente.
- **Migraciones:** una partida 4.9 (`saveVersion` 4) carga sin perder nada en la versión nueva.
- **Navegación:** volver al inicio, a Ajustes y a Partidas desde cada pantalla nueva.
- **CI:** cada suite como paso propio. El recorrido en el emulador se amplía con la campaña nueva.

## 7. Limitaciones y deuda técnica actuales

Ver `PENDIENTES.md`, sección «Deuda técnica detectada en la fase 1»:
- Retraso de escritura de `localStorage` en Android.
- `zoom` de CSS en WebView antiguos.
- `app.js` monolítico.
