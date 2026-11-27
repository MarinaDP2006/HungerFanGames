# Entrega Maestra de Producción Creativa v1.0 · inventario, discrepancias y orden de integración

Recepción del 27-11-2026. Rama `integracion-cosecha-5x`. **`main` sin cambios** (`d52b655`). PR #1 en borrador.

## A. Recepción
- **Archivos:** el ZIP contiene **51**: los **45** del `manifest.json` raíz, ese mismo `manifest.json` y 5 `manifest.json` de los anexos.
- **Huellas:** los 45 archivos listados coinciden en tamaño y SHA-256 con el manifiesto. No falta ninguno y ninguno está alterado.
- **Imágenes duplicadas:** las 2 imágenes de `06_ARTE/conceptos/` son **copias exactas** de los 2 carteles de `00_FUENTES_APROBADAS/74_v1/arte/`. Hay 2 imágenes distintas, no 4.
- **Textos conservados en el repositorio:** los 41 textos listados y los 6 manifiestos están en `docs/paquetes/entrega_maestra_v1/`, sin cambios.
- **Carteles NO subidos (4 PNG, 2 distintos).** El repositorio es **público** y los carteles:
  - muestran rostros que imitan a los actores de las películas;
  - usan el emblema del sinsajo y el título «Los Juegos del Hambre».

  Esto contradice las propias reglas del paquete («no imitar retratos de actores», «no usar material oficial protegido»). Se conservan solo en el ZIP original. Sus huellas están en la tabla. **No se usan en el juego ni en la Web.**

| Archivo | Contenido | Tipo / estado real | Bytes | SHA-256 (inicio) |
|---|---|---|---|---|
| `10_INSTRUCCIONES_CLAUDE.md` | Instrucciones para Claude | Instrucciones | 1.486 | `5e99d00bb500` |
| `README_LEEME_PRIMERO.md` | Guía de recepción | Instrucciones | 2.500 | `11f18fbe3cdd` |
| `08_WEB/01_Modelo_editorial_y_rutas.md` | Rutas y modelo de contenido | Contrato | 884 | `8f09c8ef2c1b` |
| `08_WEB/00_Archivo_de_Panem_Contenido_editorial.md` | Navegación. plantillas y textos base | Base editorial (no APPROVED) | 2.597 | `2ecfe651bc99` |
| `07_AUDIO/00_Guia_de_musica_y_sonido.md` | Catálogo de cues y requisitos | Especificación | 2.052 | `7dd76c9eecfb` |
| `03_BASE_DATOS/00_Modelo_de_datos_maestro.md` | Modelo de datos | Contrato | 1.740 | `bb9d8e65bd7c` |
| `03_BASE_DATOS/01_Distritos_y_Capitolio.md` | Atlas: plantilla e IDs | Estructura (campos POR_VALIDAR) | 2.177 | `418d5d379895` |
| `03_BASE_DATOS/02_Personajes_y_relaciones.md` | Índice de personajes del 74.º | Estructura (sin fichas) | 2.133 | `09ab9cbeab53` |
| `03_BASE_DATOS/03_Localizaciones_y_cronologia.md` | IDs de lugares del 74.º | Estructura | 1.263 | `37954635356b` |
| `09_QA/00_Checklist_de_aceptacion_creativa.md` | Checklist de aceptación | Contrato | 3.180 | `6594a7fb1a3d` |
| `00_FUENTES_APROBADAS/04_Web_Archivo_de_Panem_v1/README_PRIMERO.md` | Web: objetivo | Instrucciones | 410 | `87c4158c26f8` |
| `00_FUENTES_APROBADAS/04_Web_Archivo_de_Panem_v1/web/Modelo_de_Datos_y_Pruebas.md` | Web: entidades y pruebas obligatorias | Contrato | 813 | `b19c3b234007` |
| `00_FUENTES_APROBADAS/04_Web_Archivo_de_Panem_v1/web/Arquitectura_Editorial.md` | Web: navegación (versión anterior) | Especificación (superada por 08_WEB) | 989 | `b86071a49def` |
| `00_FUENTES_APROBADAS/04_Web_Archivo_de_Panem_v1/web/Contenido_Portada_y_Secciones.md` | Web: textos base y aviso | Base editorial (no APPROVED) | 1.088 | `636a9ecca285` |
| `00_FUENTES_APROBADAS/74_v1/README_PRIMERO.md` | 74 v1: presentación | Instrucciones | 847 | `d645a0358526` |
| `00_FUENTES_APROBADAS/74_v1/diseno/Direccion_Arte_y_Diseno_v1.md` | Dirección de arte por modo | Especificación | 2.463 | `7e761e1e102e` |
| `00_FUENTES_APROBADAS/74_v1/arte/La_Cosecha_Poster_Concepto_02.png` | Cartel conceptual | Concepto visual · no subido | 2.716.554 | `4022aa11a1ae` |
| `00_FUENTES_APROBADAS/74_v1/arte/La_Cosecha_Poster_Concepto_01.png` | Cartel conceptual | Concepto visual · no subido | 2.711.614 | `f83dc9ef49df` |
| `00_FUENTES_APROBADAS/74_v1/narrativa/74_PreArena_11_Escenas_v1.md` | 74.º: 11 escenas con opciones y efectos | Fuente redactada · DRAFT_FOR_REVIEW | 12.972 | `020fc9dbdfdc` |
| `00_FUENTES_APROBADAS/03_Rebelion_y_Guerra_v1/README_PRIMERO.md` | Rebelión y Guerra: presentación | Instrucciones | 279 | `0c64a809572d` |
| `00_FUENTES_APROBADAS/03_Rebelion_y_Guerra_v1/diseno/Modo_Presidente_y_Campanas.md` | Ciclo e interfaz del Presidente | Especificación | 697 | `f7587a89f2e3` |
| `00_FUENTES_APROBADAS/03_Rebelion_y_Guerra_v1/narrativa/Rebelion.md` | Rebelión: 7 capítulos con sinopsis | Estructura | 1.073 | `45fba25dddb3` |
| `00_FUENTES_APROBADAS/03_Rebelion_y_Guerra_v1/narrativa/Guerra_y_Caida.md` | Guerra: 8 capítulos con sinopsis | Estructura | 981 | `811746ad5fcd` |
| `00_FUENTES_APROBADAS/05_Arte_Audio_Diseno_v1/README_PRIMERO.md` | Arte y audio: presentación | Instrucciones | 290 | `07627dff9c4f` |
| `00_FUENTES_APROBADAS/05_Arte_Audio_Diseno_v1/arte/Inventario_de_Assets.md` | Recursos visuales priorizados | Especificación | 1.411 | `78c23eb788ff` |
| `00_FUENTES_APROBADAS/05_Arte_Audio_Diseno_v1/audio/Direccion_Musical_y_Sonora.md` | Dirección musical por modo | Especificación | 1.264 | `f3754fde047f` |
| `00_FUENTES_APROBADAS/02_Gira_y_75_v1/README_PRIMERO.md` | Gira y 75: presentación | Instrucciones | 713 | `e5610c785e86` |
| `00_FUENTES_APROBADAS/02_Gira_y_75_v1/integracion/Contrato_para_Claude.md` | Contrato Gira/75 | Contrato | 477 | `1139fbefc476` |
| `00_FUENTES_APROBADAS/02_Gira_y_75_v1/narrativa/Gira_de_la_Victoria_Estructura_y_Escenas.md` | Gira: 7 IDs con sinopsis | Estructura | 1.525 | `feb6c01fe957` |
| `00_FUENTES_APROBADAS/02_Gira_y_75_v1/narrativa/75_Vasallaje_Estructura_y_Escenas.md` | 75.º: 10 IDs con sinopsis | Estructura | 1.381 | `1cd9f20d885f` |
| `06_ARTE/00_Manual_visual_maestro.md` | Manual visual | Especificación | 2.371 | `c8250e8f7428` |
| `06_ARTE/01_Manifiesto_de_assets.md` | Recursos por producir | Especificación | 1.457 | `8d02fe80b38a` |
| `06_ARTE/conceptos/a_cinematic_high_detail_promotional_poster_style.png` | Cartel (copia exacta del Concepto_02) | Concepto visual · no subido | 2.716.554 | `4022aa11a1ae` |
| `06_ARTE/conceptos/a_cinematic_high_detail_promotional_collage_poste.png` | Cartel (copia exacta del Concepto_01) | Concepto visual · no subido | 2.711.614 | `f83dc9ef49df` |
| `01_BIBLIA/01_Cronologia_Maestra.md` | Cronología (esquema. sin fechas) | Especificación | 1.522 | `faf44bb49bbe` |
| `01_BIBLIA/00_Principios_de_continuidad.md` | Biblia de continuidad | Especificación | 3.180 | `86146dfc3e2c` |
| `05_CONTRATOS/01_Esquema_de_variables_y_efectos.md` | Variables. condiciones y efectos | Contrato | 2.084 | `99f2b0d81c3c` |
| `05_CONTRATOS/02_Contrato_de_assets_y_localizacion.md` | Recursos y textos localizados | Contrato | 1.053 | `32909c353e58` |
| `05_CONTRATOS/00_Contrato_de_integracion_para_Claude.md` | Flujo y estados de integración | Contrato | 1.719 | `0da15a4349b4` |
| `04_ROLES/00_Roles_jugables.md` | Diseño de roles | Especificación | 2.849 | `085099d0be1c` |
| `02_NARRATIVA/01_Especificacion_de_guion.md` | Formato obligatorio de escena | Contrato | 1.347 | `92c4cb965502` |
| `02_NARRATIVA/00_Matriz_de_campanas_y_estado.md` | Estado por campaña | Especificación | 1.615 | `d1a7283c0d92` |
| `02_NARRATIVA/02_74_Contrato_de_contenido.md` | Reglas del 74.º | Contrato | 937 | `099a79b6fad6` |
| `02_NARRATIVA/04_Rebelion_y_Guerra_Plan_de_guion.md` | Plan Rebelión y Guerra | Estructura | 1.189 | `39aeb812b14c` |
| `02_NARRATIVA/03_Gira_y_75_Plan_de_guion.md` | Plan Gira y 75.º | Estructura | 1.707 | `18f7c512d2a3` |

### Resumen por tipo
| Tipo | Archivos | Se puede integrar tal cual |
|---|---|---|
| Fuente redactada | 1 (74.º, 11 escenas) | Solo cuando la apruebes: el contrato la marca `DRAFT_FOR_REVIEW` |
| Estructura (sinopsis e IDs, sin guion) | 8 (Gira, 75.º, Rebelión, Guerra, atlas, personajes, lugares, planes) | No: `BLOCKED_CREATIVE` |
| Base editorial Web | 2 | Solo con estado `APPROVED` (regla del propio paquete) |
| Contratos y especificaciones | 21 | Sí, como reglas técnicas |
| Instrucciones | 7 | — |
| Conceptos visuales | 4 PNG (2 distintos) | No: conceptos con imitación de actores y emblema oficial |

## B. Discrepancias con el código y entre documentos
| # | Discrepancia | Dónde | Qué hace falta |
|---|---|---|---|
| 1 | **El 74.º del juego no usa estas escenas.** Hoy pasa por las fases genéricas (cosecha, entrenamiento, entrevista). Además, `compartido/data.js` guarda 3 escenas antiguas en `storyBeats[74]` con otro texto, aunque **ningún módulo las usa** (datos muertos) | `js/app.js`, `compartido/data.js` | Aprobación del 74.º y del motor común de precampaña (fase 2) |
| 2 | **Tres esquemas de nombres para las variables del 74.º:**<ul><li>guion: `rel_katniss_prim`, `image_capitol`, `skill_archery`…</li><li>contrato maestro: `rel.katniss_prim`, `public.image_capitol`, `skill.archery`…</li><li>paquete anterior: `public_image`, `peeta_trust`…</li></ul> | `05_CONTRATOS/01`, guion 74, paquete narrativo v1 | Propuesta: el guion se integra con sus nombres y un adaptador los traduce al contrato maestro, como pide el propio contrato. Confirmar |
| 3 | El guion declara `district_memory` y `canon_route`, pero ninguna opción los usa. `launch_plan` sí se usa y no figura en su lista | Guion 74 | Confirmar si sobran o faltan efectos |
| 4 | **Faltan campos para escenas completas según la especificación de guion:** sin `dialogue[]`, `response_text` por opción, `journal_entry`, `player_prompt` ni `next_scene_id`. El diario se pide «desde flags», pero sus textos no existen | Guion 74 frente a `02_NARRATIVA/01` | Se puede jugar como el 50.º (prosa y opciones). Los textos del diario y las respuestas son `BLOCKED_CREATIVE`, y **no los escribo yo** |
| 5 | **Paso a la Arena del 74.º sin reglas.** No está definido cómo afectan `launch_plan`, `training_focus`, `sponsor_interest` o `skill.*` a la Arena existente | Guion 74 (criterio 6) | Decisión de diseño: cómo se traducen esas variables a la Arena |
| 6 | **Arena del 75.º:** el anexo exige «no modificar los **ocho** acontecimientos de Arena del 75.º». El código tiene **4** capítulos del 75.º (los 8 son del 50.º, con el adaptador 5.5) | Anexo Gira/75, `js/campaigns.js` | Aclarar si se refiere a los 4 existentes o a 8 que todavía no existen |
| 7 | **Variables de Gira y 75.º distintas en cada documento:**<ul><li>plan maestro: `victory_identity`, `tour_public_support`…</li><li>anexo: `public_image`, `district_sympathy`, `katniss_peeta_trust`…</li></ul> | `02_NARRATIVA/03` frente al anexo | Elegir una lista |
| 8 | **Navegación de la Web.** El maestro pide Inicio, Panem, Distritos, Capitolio, Personajes, Los Juegos, Cronología, Lugares, Expedientes, Galería y Acerca, con rutas tipo `/juegos/:id`. El anexo anterior da otra lista. Tu orden pedía además «Novedades» y «Vencedores». La Web actual (1.0) usa tu lista con rutas `#/…` | `08_WEB/01`, anexo Web, `js/archivo-vistas.js` | Elegir la lista definitiva. Las rutas sin `#` son técnicas y están listas para hacerse en cuanto decidas |
| 9 | **Estado de canon en las fichas.** La Web debe mostrar `canon_status` y fuentes en cada ficha, pero `compartido/data.js` no tiene esos campos ni IDs estables (`character_id`, `district_01`…) | `03_BASE_DATOS/00`, `08_WEB/00` | Técnico: añadir IDs y campos `canon_status`/`source_ref` vacíos (`unknown`). Los valores los aporta la dirección creativa |
| 10 | Textos base de la Web (portada, artículos, aviso): el paquete dice «solo `APPROVED` puede publicarse» y la matriz los marca «BASE EDITORIAL» | `08_WEB/00` y anexo Web | Tu aprobación. Hasta entonces la Web mantiene los textos de interfaz propios y los avisos de pendiente |
| 11 | **Audio:** se piden tres controles (música, **ambiente** y efectos) y cues con ID (`mus_*`, `amb_*`, `sfx_*`). Android 4.11 tiene música y efectos, sin ambiente. Los efectos actuales son 4 sonidos sintetizados sin ID de cue | `07_AUDIO`, `js/audio.js` | Técnico, se puede hacer ya (sección C) |
| 12 | Las 8 personas del 74.º sin ficha (Prim, Effie, Gale, Cinna, Caesar, la madre…) no están en los datos compartidos | `03_BASE_DATOS/02` | Fichas aprobadas |
| 13 | El juego enlaza a material oficial externo («Ver referencia visual real de la cosecha»: un vídeo de YouTube y artículos de prensa) | `campaignSource()` en `js/app.js` | Decidir si se quita. No se ha tocado |
| 14 | Roles Mentor, Habitante de distrito y Habitante del Capitolio: diseño sin campaña ni escenas. «No activar roles sin contenido suficiente» | `04_ROLES` | `BLOCKED_CREATIVE` |
| 15 | Partidas con `timeline_id`, `route_type` y registro de decisiones con `decision_event_id` (efectos sin duplicar al cargar) | Biblia, contrato de variables | Técnico, pero cambia el formato de guardado (`saveVersion` 5 con migración): **necesita tu autorización** |

## C. Matriz de integración
| Bloque | Estado | Quién desbloquea |
|---|---|---|
| Guardar el paquete y el inventario con huellas | ✅ Hecho | — |
| Audio: bus de ambiente, ajuste «Ambiente» y registro de IDs de cue sin archivos (nada suena) | 🟢 Listo para integración técnica | — |
| Asociar cada contexto de audio a su cue (`historia:74` → `mus_capitol`/`mus_training`…) | 🟡 La guía da el catálogo, no la asociación exacta por escena | Dirección musical |
| Rutas sin `#` y secciones de la Web según el maestro | 🟡 Técnico, pendiente de elegir la lista (discrepancia 8) | Tú |
| IDs estables y campos `canon_status`/`source_ref` en los datos compartidos (valores `unknown`) | 🟢 Listo para integración técnica | — |
| Motor común de precampaña (para el 74.º, el 75.º y la Gira) | 🟡 Técnico, pero es la **fase 2**, aún sin autorizar | Tú |
| 74.º: 11 escenas con sus opciones y efectos | 🔴 Bloqueado: `DRAFT_FOR_REVIEW` y faltan los textos del diario (4) y el traspaso a la Arena (5) | Tu aprobación y ChatGPT |
| Registro de decisiones e idempotencia (`saveVersion` 5) | 🟡 Técnico, cambia el formato de guardado | Tú |
| Gira, 75.º, Rebelión y Guerra | 🔴 `BLOCKED_CREATIVE` (solo estructura) | ChatGPT y tu aprobación |
| Fichas de distritos, Capitolio, personajes, lugares y cronología | 🔴 `BLOCKED_CREATIVE` (plantillas con campos `POR_VALIDAR`) | ChatGPT y tu aprobación |
| Arte: fondos, retratos, mapas y emblema | 🔴 Sin recursos finales; los carteles no son utilizables | ChatGPT (originales, sin imitar actores) |
| Música, ambientes y efectos | 🔴 Sin archivos. El OGG actual sigue sin activar («no activar hasta confirmar procedencia y licencia») | ChatGPT y licencia |
| Roles Mentor y Habitante | 🔴 `BLOCKED_CREATIVE` | ChatGPT |
| 50.º | 🔒 Protegido: sin cambios | — |

## D. Orden de integración propuesto
1. **Ya (técnico, sin contenido nuevo):**
   - audio de ambiente y registro de cues;
   - IDs y campos de canon en los datos compartidos;
   - comprobaciones del checklist que ya cumple el código (Distrito 13 fuera de las cosechas, Web sin motor, pruebas separadas).
2. **Con tu decisión:**
   - navegación definitiva de la Web (discrepancia 8);
   - textos base de la Web aprobados o no (discrepancia 10);
   - quitar o no los enlaces externos (discrepancia 13).
3. **Con tu autorización técnica:**
   - fase 2, el motor común de precampaña, sin contenido;
   - `saveVersion` 5 con registro de decisiones y migración probada.
4. **Con el 74.º aprobado y los textos que faltan:**
   - integrar las 11 escenas con el adaptador de variables;
   - migrar las partidas del 74.º en fases genéricas;
   - pruebas de recorrido, opciones, guardado y carga sin duplicar efectos;
   - emulador.
5. **Según vayan llegando** guiones, fichas y recursos: Gira → 75.º → Rebelión → Guerra; Archivo de la Web; arte y audio.

## E. Riesgos de continuidad
- **Partidas del 74.º en curso.** Las partidas guardadas en las fases genéricas necesitarán una migración que no pierda progreso al pasar a las 11 escenas.
- **`storyBeats[74]` antiguo (sin uso).** Su texto contradice la fuente nueva: por ejemplo, «Mantenerte en silencio y observar» en la cosecha permitiría no presentarse voluntaria. No se muestra en el juego. Conviene retirarlo al integrar el 74.º para que nadie lo reutilice; hasta entonces no se toca.
- **Tres esquemas de variables (2 y 7).** Si no se fija uno, la continuidad 74 → Gira → 75 se rompe.
- **Ocho frente a cuatro acontecimientos del 75.º (6).** Riesgo de crear o borrar eventos de Arena sin querer.
