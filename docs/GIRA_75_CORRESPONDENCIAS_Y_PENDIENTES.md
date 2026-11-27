# Gira de la Victoria y 75.º · correspondencias y pendientes

Generado con `node scripts/importar-gira-75.mjs` desde `docs/paquetes/gira_75_v1/La_Cosecha_Gira_75_Produccion_Narrativa_v1.md` (v1.0, borrador). **Nada de esto es jugable:** estado `DRAFT_FOR_REVIEW`.

Decisiones de dirección aplicadas (27-11-2026):
- **Canon:** manda la continuidad de las películas.
- **Arena del 75.º:** las escenas 75-07 a 75-15 se reparten dentro de los acontecimientos de Arena que ya existen.
- **Sin variables nuevas:** se reutilizan las existentes.
- **Cifras y frases:** las escribe ChatGPT.

Resumen:
- 25 escenas leídas: 8 de la Gira, 6 de la precampaña del 75.º, 9 de Arena (75-08 cubre dos acontecimientos) y 2 posteriores a la Arena.

## 1. Escenas → IDs del repositorio
| Documento | Título | ID en el juego | Origen del ID |
|---|---|---|---|
| GIRA-01 | Después de la victoria | `tour_after_victory` | nuevo |
| GIRA-02 | La versión oficial | `tour_departure` | existente |
| GIRA-03 | El Distrito 11 recuerda | `tour_district_11` | existente |
| GIRA-04 | El tren no es un refugio | `tour_train` | existente (en la estructura iba antes del Distrito 11) |
| GIRA-05 | El Distrito 8 | `tour_districts` | existente |
| GIRA-06 | La advertencia de Snow | `tour_private_pressure` | existente |
| GIRA-07 | Volver a casa no significa estar a salvo | `tour_aftermath` | existente |
| GIRA-08 | El Vasallaje de los Veinticinco | `tour_quell_announcement` | nuevo |
| 75-01 | La cosecha de los vencedores | `75_reaping` | existente |
| 75-02 | Prepararse con los vencedores | `75_train` | existente |
| 75-03 | Finnick Odair | `75_training` | existente |
| 75-04 | Johanna Mason | `75_training_johanna` | nuevo |
| 75-05 | La entrevista y el vestido | `75_interview` | existente |
| 75-06 | La última conversación | `75_arena_launch` | existente |
| 75-07 | La Arena del reloj | Arena (ver 2) | acontecimiento existente |
| 75-08 | La alianza | Arena (ver 2) | acontecimiento existente |
| 75-09 | El primer sector | Arena (ver 2) | acontecimiento existente |
| 75-10 | La niebla | Arena (ver 2) | acontecimiento existente |
| 75-11 | Los otros vencedores | Arena (ver 2) | acontecimiento existente |
| 75-12 | El reloj se revela | Arena (ver 2) | acontecimiento existente |
| 75-13 | La propuesta de Beetee | Arena (ver 2) | acontecimiento existente |
| 75-14 | Separación | Arena (ver 2) | acontecimiento existente |
| 75-15 | El rayo | Arena (ver 2) | acontecimiento existente |
| 75-16 | Despertar | `75_extraction_awakening` | nuevo · después de la Arena |
| 75-17 | El Distrito 12 ya no existe | `75_district12_destroyed` | nuevo · después de la Arena |

**IDs de la estructura anterior que se quedan sin escena:** `tour_capitol_return`, `75_aftermath_tour`, `75_departure`, `75_capitol_arrival`, `75_prep`, `75_private_session`. Se conservan registrados; ¿se retiran o tendrán escena?

## 2. Arena del 75.º: escenas → acontecimientos existentes
En el juego, la Arena del 75.º tiene **ocho acontecimientos**: tres capítulos en `campaigns.js` y cinco eventos en `app.js` (esto resuelve la discrepancia de los «ocho acontecimientos»). Se conservan sus IDs técnicos; las escenas amplían su contenido.

| Turno | Acontecimiento existente | ID técnico | Escenas del documento |
|---|---|---|---|
| 1 | Las plataformas de agua | campaigns.js · chapters[75][1] | 75-07 |
| 2 | Una conversación cifrada | app.js · evento 75, turno 2 | 75-08 |
| 3 | La alianza de los vencedores | app.js · evento 75, turno 3 | 75-08 |
| 4 | La niebla | campaigns.js · chapters[75][4] | 75-09, 75-10 |
| 5 | El mecanismo del reloj | app.js · evento 75, turno 5 | 75-11, 75-12 |
| 6 | El relámpago y el árbol | app.js · evento 75, turno 6 | 75-13 |
| 7 | Los charlajos | campaigns.js · chapters[75][7] | — (sin escena: se mantiene tal cual) |
| 8 | La ruptura del reloj | app.js · evento 75, turno 8 | 75-14, 75-15 |

Conflictos que tenéis que revisar:
- **75-12** dice que Wiress ayuda a descubrir el reloj, y el capítulo existente «Los charlajos» (turno 7) dice que Wiress ya ha muerto: hay que comprobar el orden.
- **75-10:** el documento fija que Mags muere sin remedio, pero el capítulo «La niebla» permite salvarla con la opción «Cargar tú con Mags». Con el canon cinematográfico, esa opción debería desaparecer o cambiar.
- **75-07:** el documento coloca la decisión inicial en la playa (arma, herramienta o Peeta), pero el capítulo existente la sitúa en las plataformas de agua (Finnick, Peeta o armas). Hay que unificar.

## 3. Variables → sistema real
| Variable del documento | Equivale a | Dónde | Nota |
|---|---|---|---|
| `peeta_trust` | `rel.katniss_peeta` | Precampaña (registro del 74.º) | Misma relación que el 74.º |
| `haymitch_trust` | `rel.katniss_haymitch` | Precampaña (registro del 74.º) | Misma relación que el 74.º |
| `sponsor_interest` | `sponsor.interest` | Precampaña (registro del 74.º) | Sus valores en la Arena siguen pendientes de límites |
| `journal_flags` | `flags` | Precampaña | Cada «journal_flags: x» es un flag |
| `injury_state` | `game.injuries / game.wounds` | Arena existente | Sistema de heridas actual |
| `public_sympathy` | **sin equivalente** | — | Candidatos: `public.image_capitol` (imagen ante el Capitolio, no es lo mismo) o `support` de la Arena |
| `capitol_suspicion` | **sin equivalente** | — | No hay ninguna variable de vigilancia del Capitolio fuera del modo Presidente |
| `district_solidarity` | **sin equivalente** | — | Los distritos solo tienen estadísticas en el modo Presidente |
| `finnick_trust` | **sin equivalente** | — | La Arena del 75.º usa el flag `finnickTrusted` (sí/no), no un valor |
| `alliance_cohesion` | **sin equivalente** | — | Candidato: `relationships.victors` de la Arena del 75.º |
| `arena_knowledge` | **sin equivalente** | — | Candidato: flag `clockObserved` de la Arena del 75.º (sí/no) |
| `wire_plan_ready` | **sin equivalente** | — | Sin equivalente |

Las variables **sin equivalente** necesitan que ChatGPT diga qué hacen (valor inicial, rango y efecto en el juego) antes de crear nada.

## 4. Pendientes exactos por escena

### GIRA-01 · Después de la victoria (`tour_after_victory`)
- `tour_after_victory_o1` (Aceptar el pan y sentarse con Peeta.): `peeta_trust +` → sin cifra
- `tour_after_victory_o1` (Aceptar el pan y sentarse con Peeta.): diario: *Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.* → efecto descrito en texto, sin regla aplicable
- `tour_after_victory_o1`: eco solo descrito («Peeta ofrece apoyo con mayor naturalidad en la preparación de la Gira.»), falta la frase
- `tour_after_victory_o1`: falta la respuesta inmediata
- `tour_after_victory_o1`: falta su frase de diario (solo hay la base de la escena)
- `tour_after_victory_o2` (Preguntar a Haymitch qué espera Snow.): `haymitch_trust +` → sin cifra
- `tour_after_victory_o2` (Preguntar a Haymitch qué espera Snow.): `capitol_suspicion` sin cambio. → efecto descrito en texto, sin regla aplicable
- `tour_after_victory_o2`: falta la respuesta inmediata
- `tour_after_victory_o3` (Apartarse y revisar el equipo personal.): preparación emocional más fría → efecto descrito en texto, sin regla aplicable
- `tour_after_victory_o3` (Apartarse y revisar el equipo personal.): `journal_flags: self_reliance`. → efecto descrito en texto, sin regla aplicable
- `tour_after_victory_o3`: eco solo descrito («Katniss tiende a responder con más cautela en escenas públicas.»), falta la frase
- `tour_after_victory_o3`: falta la respuesta inmediata
- `tour_after_victory_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir recuerdo de Peeta si se acepta el pan.»), falta la frase

### GIRA-02 · La versión oficial (`tour_departure`)
- `tour_departure_o1` (Acordar con Peeta una señal privada para apoyarse durante los actos.): `peeta_trust +` → sin cifra
- `tour_departure_o1` (Acordar con Peeta una señal privada para apoyarse durante los actos.): desbloquea una línea de apoyo en Distrito 11 y Capitolio. → efecto descrito en texto, sin regla aplicable
- `tour_departure_o1`: falta la respuesta inmediata
- `tour_departure_o1`: falta su frase de diario (solo hay la base de la escena)
- `tour_departure_o2` (Pedir a Haymitch respuestas concretas para preguntas difíciles.): `haymitch_trust +` → sin cifra
- `tour_departure_o2` (Pedir a Haymitch respuestas concretas para preguntas difíciles.): desbloquea una opción de respuesta prudente en la entrevista pública. → efecto descrito en texto, sin regla aplicable
- `tour_departure_o2`: falta la respuesta inmediata
- `tour_departure_o2`: falta su frase de diario (solo hay la base de la escena)
- `tour_departure_o3` (Rechazar ensayar sentimientos.): aumenta la tensión interpersonal, sin alterar la obligación de participar. → efecto descrito en texto, sin regla aplicable
- `tour_departure_o3`: falta la respuesta inmediata
- `tour_departure_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir señal privada si se acuerda con Peeta.»), falta la frase

### GIRA-03 · El Distrito 11 recuerda (`tour_district_11`)
- `tour_district_11_o1` (Hablar desde el recuerdo de Rue.): `public_sympathy +` → sin cifra; `public_sympathy` sin equivalente
- `tour_district_11_o1` (Hablar desde el recuerdo de Rue.): `district_solidarity +` → sin cifra; `district_solidarity` sin equivalente
- `tour_district_11_o1` (Hablar desde el recuerdo de Rue.): `capitol_suspicion +`. → efecto descrito en texto, sin regla aplicable
- `tour_district_11_o1`: falta la respuesta inmediata
- `tour_district_11_o2` (Incluir también el recuerdo de Thresh y su decisión de dejarla vivir.): `public_sympathy +` → sin cifra; `public_sympathy` sin equivalente
- `tour_district_11_o2` (Incluir también el recuerdo de Thresh y su decisión de dejarla vivir.): `district_solidarity +` → sin cifra; `district_solidarity` sin equivalente
- `tour_district_11_o2` (Incluir también el recuerdo de Thresh y su decisión de dejarla vivir.): `capitol_suspicion +`. → efecto descrito en texto, sin regla aplicable
- `tour_district_11_o2`: eco solo descrito («Peeta menciona la dignidad de ambos en una conversación posterior.»), falta la frase
- `tour_district_11_o2`: falta la respuesta inmediata
- `tour_district_11_o2`: falta su frase de diario (solo hay la base de la escena)
- `tour_district_11_o3` (Mantener el discurso breve para evitar que la multitud quede expuesta más tiempo.): reduce el incremento de `capitol_suspicion` → efecto descrito en texto, sin regla aplicable
- `tour_district_11_o3` (Mantener el discurso breve para evitar que la multitud quede expuesta más tiempo.): la solidaridad pública es más contenida. → efecto descrito en texto, sin regla aplicable
- `tour_district_11_o3`: falta la respuesta inmediata
- Diario: la variación está descrita («Añadir mención a Thresh si se elige la opción B.»), falta la frase

### GIRA-04 · El tren no es un refugio (`tour_train`)
- `tour_train_o1` (Reconocer ante Peeta que tienes miedo.): `peeta_trust +` → sin cifra
- `tour_train_o1` (Reconocer ante Peeta que tienes miedo.): vínculo emocional más sólido. → efecto descrito en texto, sin regla aplicable
- `tour_train_o1`: falta la respuesta inmediata
- `tour_train_o1`: falta su frase de diario (solo hay la base de la escena)
- `tour_train_o2` (Pedir a Haymitch que explique qué señales está observando.): `haymitch_trust +` → sin cifra
- `tour_train_o2` (Pedir a Haymitch que explique qué señales está observando.): añade una pista al diario sobre vigilancia. → efecto descrito en texto, sin regla aplicable
- `tour_train_o2`: falta la respuesta inmediata
- `tour_train_o2`: falta su frase de diario (solo hay la base de la escena)
- `tour_train_o3` (Cambiar de tema y preparar el siguiente acto.): mantiene la compostura pública → efecto descrito en texto, sin regla aplicable
- `tour_train_o3` (Cambiar de tema y preparar el siguiente acto.): diario: *El miedo no desaparece por no nombrarlo.* → efecto descrito en texto, sin regla aplicable
- `tour_train_o3`: falta la respuesta inmediata
- `tour_train_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir temor compartido si se habla con Peeta.»), falta la frase

### GIRA-05 · El Distrito 8 (`tour_districts`)
- `tour_districts_o1` (Responder con una frase de solidaridad, sin llamar a la rebelión.): `district_solidarity +` → sin cifra; `district_solidarity` sin equivalente
- `tour_districts_o1` (Responder con una frase de solidaridad, sin llamar a la rebelión.): `capitol_suspicion +`. → efecto descrito en texto, sin regla aplicable
- `tour_districts_o1`: falta la respuesta inmediata
- `tour_districts_o2` (Dejar que Peeta hable y respaldarlo públicamente.): `peeta_trust +` → sin cifra
- `tour_districts_o2` (Dejar que Peeta hable y respaldarlo públicamente.): mejora la coordinación pública de la pareja. → efecto descrito en texto, sin regla aplicable
- `tour_districts_o2`: falta la respuesta inmediata
- `tour_districts_o2`: falta su frase de diario (solo hay la base de la escena)
- `tour_districts_o3` (Guardar silencio y observar la respuesta de los agentes.): se registra información de vigilancia en `journal_flags` → efecto descrito en texto, sin regla aplicable
- `tour_districts_o3` (Guardar silencio y observar la respuesta de los agentes.): no altera el conocimiento de la Arena. → efecto descrito en texto, sin regla aplicable
- `tour_districts_o3`: falta la respuesta inmediata
- Diario: la variación está descrita («Añadir observación sobre agentes si se elige C.»), falta la frase

### GIRA-06 · La advertencia de Snow (`tour_private_pressure`)
- `tour_private_pressure_o1` (Insistir en que las acciones fueron por amor a Peeta.): sostiene la versión oficial → efecto descrito en texto, sin regla aplicable
- `tour_private_pressure_o1` (Insistir en que las acciones fueron por amor a Peeta.): `capitol_suspicion` aumenta menos en esta escena. → efecto descrito en texto, sin regla aplicable
- `tour_private_pressure_o1`: falta la respuesta inmediata
- `tour_private_pressure_o2` (Preguntar qué ocurrirá con las personas que respondieron al saludo.): revela preocupación por los distritos → efecto descrito en texto, sin regla aplicable
- `tour_private_pressure_o2` (Preguntar qué ocurrirá con las personas que respondieron al saludo.): `capitol_suspicion +`. → efecto descrito en texto, sin regla aplicable
- `tour_private_pressure_o2`: falta la respuesta inmediata
- `tour_private_pressure_o3` (No ofrecerle ninguna explicación adicional.): tensión elevada → efecto descrito en texto, sin regla aplicable
- `tour_private_pressure_o3` (No ofrecerle ninguna explicación adicional.): Haymitch deberá intervenir en una conversación posterior. → efecto descrito en texto, sin regla aplicable
- `tour_private_pressure_o3`: falta la respuesta inmediata
- `tour_private_pressure_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según respuesta.»), falta la frase

### GIRA-07 · Volver a casa no significa estar a salvo (`tour_aftermath`)
- `tour_aftermath_o1` (Buscar a Peeta para hablar de lo que Snow ha exigido.): `peeta_trust +` → sin cifra
- `tour_aftermath_o1` (Buscar a Peeta para hablar de lo que Snow ha exigido.): Peeta conoce el alcance de la amenaza. → efecto descrito en texto, sin regla aplicable
- `tour_aftermath_o1`: falta la respuesta inmediata
- `tour_aftermath_o1`: falta su frase de diario (solo hay la base de la escena)
- `tour_aftermath_o2` (Hablar con Haymitch sobre cómo proteger a sus familias.): `haymitch_trust +` → sin cifra
- `tour_aftermath_o2` (Hablar con Haymitch sobre cómo proteger a sus familias.): activa una nota de protección y cautela. → efecto descrito en texto, sin regla aplicable
- `tour_aftermath_o2`: falta la respuesta inmediata
- `tour_aftermath_o2`: falta su frase de diario (solo hay la base de la escena)
- `tour_aftermath_o3` (Pasar tiempo con su familia sin hablar de política.): refuerza el ancla emocional → efecto descrito en texto, sin regla aplicable
- `tour_aftermath_o3` (Pasar tiempo con su familia sin hablar de política.): `journal_flags: family_anchor`. → efecto descrito en texto, sin regla aplicable
- `tour_aftermath_o3`: falta la respuesta inmediata
- `tour_aftermath_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir ancla familiar si se elige C.»), falta la frase

### GIRA-08 · El Vasallaje de los Veinticinco (`tour_quell_announcement`)
- `tour_quell_announcement_o1` (Acordar con Peeta que intentaréis protegeros mutuamente.): `peeta_trust +` → sin cifra
- `tour_quell_announcement_o1` (Acordar con Peeta que intentaréis protegeros mutuamente.): marca `journal_flags: mutual_promise`. → efecto descrito en texto, sin regla aplicable
- `tour_quell_announcement_o1`: falta la respuesta inmediata
- `tour_quell_announcement_o1`: falta su frase de diario (solo hay la base de la escena)
- `tour_quell_announcement_o2` (Pedir a Haymitch que busque cualquier resquicio en las reglas.): `haymitch_trust +` → sin cifra
- `tour_quell_announcement_o2` (Pedir a Haymitch que busque cualquier resquicio en las reglas.): marca `journal_flags: search_for_loophole`. → efecto descrito en texto, sin regla aplicable
- `tour_quell_announcement_o2`: falta la respuesta inmediata
- `tour_quell_announcement_o2`: falta su frase de diario (solo hay la base de la escena)
- `tour_quell_announcement_o3` (Permanecer en silencio y prepararte para la cosecha.): marca `journal_flags: accepts_inevitable` → efecto descrito en texto, sin regla aplicable
- `tour_quell_announcement_o3` (Permanecer en silencio y prepararte para la cosecha.): tono más introspectivo. → efecto descrito en texto, sin regla aplicable
- `tour_quell_announcement_o3`: falta la respuesta inmediata
- `tour_quell_announcement_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir promesa a Peeta o búsqueda de una salida.»), falta la frase

### 75-01 · La cosecha de los vencedores (`75_reaping`)
- `75_reaping_o1` (Buscar la mirada de Peeta antes de ofrecerte.): `peeta_trust +` → sin cifra
- `75_reaping_o1` (Buscar la mirada de Peeta antes de ofrecerte.): diálogo posterior más íntimo. → efecto descrito en texto, sin regla aplicable
- `75_reaping_o1`: falta la respuesta inmediata
- `75_reaping_o1`: falta su frase de diario (solo hay la base de la escena)
- `75_reaping_o2` (Mirar directamente a los agentes del Capitolio.): `capitol_suspicion +` → sin cifra; `capitol_suspicion` sin equivalente
- `75_reaping_o2` (Mirar directamente a los agentes del Capitolio.): `public_sympathy +`. → efecto descrito en texto, sin regla aplicable
- `75_reaping_o2`: falta la respuesta inmediata
- `75_reaping_o2`: falta su frase de diario (solo hay la base de la escena)
- `75_reaping_o3` (Concentrarte en Haymitch y en la decisión que acabas de tomar.): `haymitch_trust +` → sin cifra
- `75_reaping_o3` (Concentrarte en Haymitch y en la decisión que acabas de tomar.): diario: *No permitiré que otra persona pague por mí.* → efecto descrito en texto, sin regla aplicable
- `75_reaping_o3`: falta la respuesta inmediata
- `75_reaping_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según a quién mira Katniss.»), falta la frase

### 75-02 · Prepararse con los vencedores (`75_train`)
- `75_train_o1` (Preguntar a Haymitch qué vencedores podrían ser aliados.): `haymitch_trust +` → sin cifra
- `75_train_o1` (Preguntar a Haymitch qué vencedores podrían ser aliados.): añade criterios de observación al diario. → efecto descrito en texto, sin regla aplicable
- `75_train_o1`: falta la respuesta inmediata
- `75_train_o1`: falta su frase de diario (solo hay la base de la escena)
- `75_train_o2` (Hablar con Peeta sobre cómo manteneros coordinados.): `peeta_trust +` → sin cifra
- `75_train_o2` (Hablar con Peeta sobre cómo manteneros coordinados.): activa apoyo mutuo. → efecto descrito en texto, sin regla aplicable
- `75_train_o2`: falta la respuesta inmediata
- `75_train_o2`: falta su frase de diario (solo hay la base de la escena)
- `75_train_o3` (Observar a los demás vencedores sin acercarte.): marca `journal_flags: victor_observation` → efecto descrito en texto, sin regla aplicable
- `75_train_o3` (Observar a los demás vencedores sin acercarte.): habilita descripciones adicionales al conocer a Finnick y Johanna. → efecto descrito en texto, sin regla aplicable
- `75_train_o3`: falta la respuesta inmediata
- `75_train_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según preparación.»), falta la frase

### 75-03 · Finnick Odair (`75_training`)
- `75_training_o1` (Responder con ironía y mantener la distancia.): `finnick_trust` neutral → efecto descrito en texto, sin regla aplicable
- `75_training_o1` (Responder con ironía y mantener la distancia.): mantiene cautela. → efecto descrito en texto, sin regla aplicable
- `75_training_o1`: falta la respuesta inmediata
- `75_training_o1`: falta su frase de diario (solo hay la base de la escena)
- `75_training_o2` (Preguntarle directamente qué busca.): `finnick_trust +` si el jugador ya mostró observación → sin cifra; condición o matiz: «si el jugador ya mostró observación»; `finnick_trust` sin equivalente
- `75_training_o2` (Preguntarle directamente qué busca.): de lo contrario, respuesta evasiva. → efecto descrito en texto, sin regla aplicable
- `75_training_o2`: falta la respuesta inmediata
- `75_training_o2`: falta su frase de diario (solo hay la base de la escena)
- `75_training_o3` (Preguntarle por Mags.): `finnick_trust +` → sin cifra; `finnick_trust` sin equivalente
- `75_training_o3` (Preguntarle por Mags.): marca `journal_flags: noticed_mags_bond`. → efecto descrito en texto, sin regla aplicable
- `75_training_o3`: falta la respuesta inmediata
- `75_training_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir nota sobre Mags si se pregunta por ella.»), falta la frase

### 75-04 · Johanna Mason (`75_training_johanna`)
- `75_training_johanna_o1` (Contestar con firmeza.): `journal_flags: johanna_respects_directness`. → efecto descrito en texto, sin regla aplicable
- `75_training_johanna_o1`: falta la respuesta inmediata
- `75_training_johanna_o1`: falta su frase de diario (solo hay la base de la escena)
- `75_training_johanna_o2` (No entrar en su provocación.): reduce tensión inmediata → efecto descrito en texto, sin regla aplicable
- `75_training_johanna_o2` (No entrar en su provocación.): Johanna sigue desconfiando. → efecto descrito en texto, sin regla aplicable
- `75_training_johanna_o2`: falta la respuesta inmediata
- `75_training_johanna_o2`: falta su frase de diario (solo hay la base de la escena)
- `75_training_johanna_o3` (Preguntarle qué sabe de la Arena.): obtiene una advertencia general: los vencedores no deben confiar en que el escenario sea lo que parece. → efecto descrito en texto, sin regla aplicable
- `75_training_johanna_o3`: falta la respuesta inmediata
- `75_training_johanna_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según respuesta.»), falta la frase

### 75-05 · La entrevista y el vestido (`75_interview`)
- `75_interview_o1` (Aceptar el diseño de Cinna y confiar en su intención.): refuerza el vínculo con Cinna. → efecto descrito en texto, sin regla aplicable
- `75_interview_o1`: falta la respuesta inmediata
- `75_interview_o1`: falta su frase de diario (solo hay la base de la escena)
- `75_interview_o2` (Preguntar qué mensaje puede transmitir el vestido sin ponerlo todo en palabras.): `public_sympathy +` → sin cifra; `public_sympathy` sin equivalente
- `75_interview_o2` (Preguntar qué mensaje puede transmitir el vestido sin ponerlo todo en palabras.): `capitol_suspicion +`. → efecto descrito en texto, sin regla aplicable
- `75_interview_o2`: falta la respuesta inmediata
- `75_interview_o2`: falta su frase de diario (solo hay la base de la escena)
- `75_interview_o3` (Pedir que la atención se centre en los vencedores como grupo.): `district_solidarity +` → sin cifra; `district_solidarity` sin equivalente
- `75_interview_o3` (Pedir que la atención se centre en los vencedores como grupo.): fortalece la lectura colectiva de la escena. → efecto descrito en texto, sin regla aplicable
- `75_interview_o3`: falta la respuesta inmediata
- `75_interview_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir lectura política del vestido.»), falta la frase

### 75-06 · La última conversación (`75_arena_launch`)
- `75_arena_launch_o1` (Prometer a Peeta que escucharás sus decisiones.): `peeta_trust +` → sin cifra
- `75_arena_launch_o1` (Prometer a Peeta que escucharás sus decisiones.): `journal_flags: shared_decisions`. → efecto descrito en texto, sin regla aplicable
- `75_arena_launch_o1`: falta la respuesta inmediata
- `75_arena_launch_o1`: falta su frase de diario (solo hay la base de la escena)
- `75_arena_launch_o2` (Pedir a Haymitch que te diga qué no estás viendo.): `haymitch_trust +` → sin cifra
- `75_arena_launch_o2` (Pedir a Haymitch que te diga qué no estás viendo.): deja una pista sobre aliados potenciales. → efecto descrito en texto, sin regla aplicable
- `75_arena_launch_o2`: falta la respuesta inmediata
- `75_arena_launch_o2`: falta su frase de diario (solo hay la base de la escena)
- `75_arena_launch_o3` (No prometer nada que no puedas garantizar.): respuesta más contenida → efecto descrito en texto, sin regla aplicable
- `75_arena_launch_o3` (No prometer nada que no puedas garantizar.): diario: *Una promesa no sirve si se convierte en otra cadena.* → efecto descrito en texto, sin regla aplicable
- `75_arena_launch_o3`: falta la respuesta inmediata
- `75_arena_launch_o3`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según compromiso.»), falta la frase

### 75-16 · Despertar (`75_extraction_awakening`)
- `75-16 A` (Exigir que intenten rescatar a Peeta inmediatamente.): expresa el conflicto central. → efecto descrito en texto, sin regla aplicable
- `75-16 A`: falta la respuesta inmediata
- `75-16 A`: falta su frase de diario (solo hay la base de la escena)
- `75-16 B` (Preguntar quién organizó la extracción.): abre información sobre la rebelión y Plutarch. → efecto descrito en texto, sin regla aplicable
- `75-16 B`: falta la respuesta inmediata
- `75-16 B`: falta su frase de diario (solo hay la base de la escena)
- `75-16 C` (Preguntar por los demás vencedores.): obtiene información sobre los aliados rescatados y las pérdidas. → efecto descrito en texto, sin regla aplicable
- `75-16 C`: falta la respuesta inmediata
- `75-16 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según reacción.»), falta la frase

### 75-17 · El Distrito 12 ya no existe (`75_district12_destroyed`)
- `75-17 A` (Preguntar por su familia.): la respuesta confirma la evacuación de quienes pudieron salir. → efecto descrito en texto, sin regla aplicable
- `75-17 A`: falta la respuesta inmediata
- `75-17 A`: falta su frase de diario (solo hay la base de la escena)
- `75-17 B` (Preguntar por Peeta.): refuerza el objetivo emocional de la siguiente campaña. → efecto descrito en texto, sin regla aplicable
- `75-17 B`: falta la respuesta inmediata
- `75-17 B`: falta su frase de diario (solo hay la base de la escena)
- `75-17 C` (No hablar y observar las ruinas.): diario: *El hogar puede desaparecer en una noche. La memoria no.* → efecto descrito en texto, sin regla aplicable
- `75-17 C`: falta la respuesta inmediata
- `75-17 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según pregunta final.»), falta la frase

### 75-07 · La Arena del reloj (`Arena turno 1`)
- `75-07 A` (Priorizar un arma y salir de la playa.): recurso inicial ofensivo → efecto descrito en texto, sin regla aplicable
- `75-07 A` (Priorizar un arma y salir de la playa.): aumenta exposición durante la salida. → efecto descrito en texto, sin regla aplicable
- `75-07 A`: falta la respuesta inmediata
- `75-07 A`: falta su frase de diario (solo hay la base de la escena)
- `75-07 B` (Priorizar una herramienta de supervivencia.): recurso utilitario → efecto descrito en texto, sin regla aplicable
- `75-07 B` (Priorizar una herramienta de supervivencia.): mejora la preparación para explorar. → efecto descrito en texto, sin regla aplicable
- `75-07 B`: falta la respuesta inmediata
- `75-07 B`: falta su frase de diario (solo hay la base de la escena)
- `75-07 C` (Buscar primero la posición de Peeta.): refuerza `peeta_trust` → efecto descrito en texto, sin regla aplicable
- `75-07 C` (Buscar primero la posición de Peeta.): puede sacrificar una oportunidad de equipo. → efecto descrito en texto, sin regla aplicable
- `75-07 C`: falta la respuesta inmediata
- `75-07 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Registrar prioridad de equipo.»), falta la frase

### 75-08 · La alianza (`Arena turno 2`)
- `75-08 A` (Aceptar la alianza provisional.): `alliance_cohesion +` → sin cifra; `alliance_cohesion` sin equivalente
- `75-08 A` (Aceptar la alianza provisional.): acceso a apoyo de Finnick y Mags. → efecto descrito en texto, sin regla aplicable
- `75-08 A`: falta la respuesta inmediata
- `75-08 A`: falta su frase de diario (solo hay la base de la escena)
- `75-08 B` (Aceptarla con condiciones claras.): `alliance_cohesion +` moderado → sin cifra; condición o matiz: «moderado»; `alliance_cohesion` sin equivalente
- `75-08 B` (Aceptarla con condiciones claras.): `finnick_trust +` si la conversación previa fue favorable. → sin cifra; condición o matiz: «si la conversación previa fue favorable.»; `finnick_trust` sin equivalente
- `75-08 B`: falta la respuesta inmediata
- `75-08 B`: falta su frase de diario (solo hay la base de la escena)
- `75-08 C` (Rechazarla y mantener distancia.): conserva autonomía → efecto descrito en texto, sin regla aplicable
- `75-08 C` (Rechazarla y mantener distancia.): reduce ayudas disponibles y dificulta escenas cooperativas. → efecto descrito en texto, sin regla aplicable
- `75-08 C`: falta la respuesta inmediata
- `75-08 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Registrar condiciones y confianza.»), falta la frase

### 75-08 · La alianza (`Arena turno 3`)
- `75-08 A` (Aceptar la alianza provisional.): `alliance_cohesion +` → sin cifra; `alliance_cohesion` sin equivalente
- `75-08 A` (Aceptar la alianza provisional.): acceso a apoyo de Finnick y Mags. → efecto descrito en texto, sin regla aplicable
- `75-08 A`: falta la respuesta inmediata
- `75-08 A`: falta su frase de diario (solo hay la base de la escena)
- `75-08 B` (Aceptarla con condiciones claras.): `alliance_cohesion +` moderado → sin cifra; condición o matiz: «moderado»; `alliance_cohesion` sin equivalente
- `75-08 B` (Aceptarla con condiciones claras.): `finnick_trust +` si la conversación previa fue favorable. → sin cifra; condición o matiz: «si la conversación previa fue favorable.»; `finnick_trust` sin equivalente
- `75-08 B`: falta la respuesta inmediata
- `75-08 B`: falta su frase de diario (solo hay la base de la escena)
- `75-08 C` (Rechazarla y mantener distancia.): conserva autonomía → efecto descrito en texto, sin regla aplicable
- `75-08 C` (Rechazarla y mantener distancia.): reduce ayudas disponibles y dificulta escenas cooperativas. → efecto descrito en texto, sin regla aplicable
- `75-08 C`: falta la respuesta inmediata
- `75-08 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Registrar condiciones y confianza.»), falta la frase

### 75-09 · El primer sector (`Arena turno 4`)
- `75-09 A` (Mantener el ritmo del grupo.): `alliance_cohesion +` → sin cifra; `alliance_cohesion` sin equivalente
- `75-09 A` (Mantener el ritmo del grupo.): menor desgaste colectivo. → efecto descrito en texto, sin regla aplicable
- `75-09 A`: falta la respuesta inmediata
- `75-09 A`: falta su frase de diario (solo hay la base de la escena)
- `75-09 B` (Explorar el límite del sector.): `arena_knowledge +` → sin cifra; `arena_knowledge` sin equivalente
- `75-09 B` (Explorar el límite del sector.): riesgo de fatiga. → efecto descrito en texto, sin regla aplicable
- `75-09 B`: falta la respuesta inmediata
- `75-09 B`: falta su frase de diario (solo hay la base de la escena)
- `75-09 C` (Priorizar el estado de Peeta.): `peeta_trust +` → sin cifra
- `75-09 C` (Priorizar el estado de Peeta.): el grupo pierde tiempo de exploración. → efecto descrito en texto, sin regla aplicable
- `75-09 C`: falta la respuesta inmediata
- `75-09 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir observación del sector.»), falta la frase

### 75-10 · La niebla (`Arena turno 4`)
- `75-10 A` (Ayudar a Peeta a mantener el ritmo.): `peeta_trust +` → sin cifra
- `75-10 A` (Ayudar a Peeta a mantener el ritmo.): `injury_state` puede empeorar si el jugador ya está herido. → efecto descrito en texto, sin regla aplicable
- `75-10 A`: falta la respuesta inmediata
- `75-10 A`: falta su frase de diario (solo hay la base de la escena)
- `75-10 B` (Seguir las indicaciones de Finnick para salir del área.): `finnick_trust +` → sin cifra; `finnick_trust` sin equivalente
- `75-10 B` (Seguir las indicaciones de Finnick para salir del área.): mejora la cohesión. → efecto descrito en texto, sin regla aplicable
- `75-10 B`: falta la respuesta inmediata
- `75-10 B`: falta su frase de diario (solo hay la base de la escena)
- `75-10 C` (Buscar una ruta menos directa.): puede reducir la exposición si `arena_knowledge` es alto → efecto descrito en texto, sin regla aplicable
- `75-10 C` (Buscar una ruta menos directa.): de lo contrario, añade desgaste. → efecto descrito en texto, sin regla aplicable
- `75-10 C`: falta la respuesta inmediata
- `75-10 C`: falta su frase de diario (solo hay la base de la escena)

### 75-11 · Los otros vencedores (`Arena turno 5`)
- `75-11 A` (Escuchar a Wiress y observar los sectores.): `arena_knowledge +` → sin cifra; `arena_knowledge` sin equivalente
- `75-11 A` (Escuchar a Wiress y observar los sectores.): desbloquea una explicación más clara del ciclo. → efecto descrito en texto, sin regla aplicable
- `75-11 A`: falta la respuesta inmediata
- `75-11 A`: falta su frase de diario (solo hay la base de la escena)
- `75-11 B` (Preguntar a Beetee por el campo de fuerza.): `wire_plan_ready` en preparación → efecto descrito en texto, sin regla aplicable
- `75-11 B` (Preguntar a Beetee por el campo de fuerza.): requiere cooperación posterior. → efecto descrito en texto, sin regla aplicable
- `75-11 B`: falta la respuesta inmediata
- `75-11 B`: falta su frase de diario (solo hay la base de la escena)
- `75-11 C` (Pedir a Johanna que explique por qué ha decidido ayudar.): su respuesta no revela todo el plan. → efecto descrito en texto, sin regla aplicable
- `75-11 C`: falta la respuesta inmediata
- `75-11 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir observación sobre Wiress o Beetee.»), falta la frase

### 75-12 · El reloj se revela (`Arena turno 5`)
- `75-12 A` (Confiar en la interpretación de Wiress.): `arena_knowledge +` → sin cifra; `arena_knowledge` sin equivalente
- `75-12 A` (Confiar en la interpretación de Wiress.): `alliance_cohesion +`. → efecto descrito en texto, sin regla aplicable
- `75-12 A`: falta la respuesta inmediata
- `75-12 A`: falta su frase de diario (solo hay la base de la escena)
- `75-12 B` (Pedir a Beetee que convierta la observación en un plan.): `wire_plan_ready +` → sin cifra; `wire_plan_ready` sin equivalente
- `75-12 B` (Pedir a Beetee que convierta la observación en un plan.): abre preparación táctica. → efecto descrito en texto, sin regla aplicable
- `75-12 B`: falta la respuesta inmediata
- `75-12 B`: falta su frase de diario (solo hay la base de la escena)
- `75-12 C` (Mantener una ruta de retirada por si la teoría falla.): conserva una opción defensiva → efecto descrito en texto, sin regla aplicable
- `75-12 C` (Mantener una ruta de retirada por si la teoría falla.): consume tiempo y recursos. → efecto descrito en texto, sin regla aplicable
- `75-12 C`: falta la respuesta inmediata
- `75-12 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir descubrimiento del ciclo.»), falta la frase

### 75-13 · La propuesta de Beetee (`Arena turno 6`)
- `75-13 A` (Ayudar a Beetee a preparar el cable.): `wire_plan_ready +` → sin cifra; `wire_plan_ready` sin equivalente
- `75-13 A` (Ayudar a Beetee a preparar el cable.): `arena_knowledge +`. → efecto descrito en texto, sin regla aplicable
- `75-13 A`: falta la respuesta inmediata
- `75-13 A`: falta su frase de diario (solo hay la base de la escena)
- `75-13 B` (Mantenerte cerca de Peeta y proteger la retirada.): `peeta_trust +` → sin cifra
- `75-13 B` (Mantenerte cerca de Peeta y proteger la retirada.): la preparación del cable depende más de Beetee y los aliados. → efecto descrito en texto, sin regla aplicable
- `75-13 B`: falta la respuesta inmediata
- `75-13 B`: falta su frase de diario (solo hay la base de la escena)
- `75-13 C` (Vigilar a los demás vencedores mientras Beetee trabaja.): `alliance_cohesion +` si hay confianza → sin cifra; condición o matiz: «si hay confianza»; `alliance_cohesion` sin equivalente
- `75-13 C` (Vigilar a los demás vencedores mientras Beetee trabaja.): detecta tensiones antes del desenlace. → efecto descrito en texto, sin regla aplicable
- `75-13 C`: falta la respuesta inmediata
- `75-13 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Registrar preparación del cable.»), falta la frase

### 75-14 · Separación (`Arena turno 8`)
- `75-14 A` (Intentar volver con Peeta.): `peeta_trust +` → sin cifra
- `75-14 A` (Intentar volver con Peeta.): aumenta el riesgo personal. → efecto descrito en texto, sin regla aplicable
- `75-14 A`: falta la respuesta inmediata
- `75-14 A`: falta su frase de diario (solo hay la base de la escena)
- `75-14 B` (Seguir la ruta acordada con Beetee.): `wire_plan_ready` se conserva → efecto descrito en texto, sin regla aplicable
- `75-14 B` (Seguir la ruta acordada con Beetee.): prioriza el objetivo colectivo. → efecto descrito en texto, sin regla aplicable
- `75-14 B`: falta la respuesta inmediata
- `75-14 B`: falta su frase de diario (solo hay la base de la escena)
- `75-14 C` (Buscar a Finnick para confirmar dónde está el grupo.): `finnick_trust +` → sin cifra; `finnick_trust` sin equivalente
- `75-14 C` (Buscar a Finnick para confirmar dónde está el grupo.): mejora la claridad de la escena final. → efecto descrito en texto, sin regla aplicable
- `75-14 C`: falta la respuesta inmediata
- `75-14 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Variación según decisión.»), falta la frase

### 75-15 · El rayo (`Arena turno 8`)
- `75-15 A` (Ejecutar el plan sin desviarte.): resolución principal → efecto descrito en texto, sin regla aplicable
- `75-15 A` (Ejecutar el plan sin desviarte.): `wire_plan_ready` consumido de forma idempotente. → efecto descrito en texto, sin regla aplicable
- `75-15 A`: falta la respuesta inmediata
- `75-15 A`: falta su frase de diario (solo hay la base de la escena)
- `75-15 B` (Detenerte un instante para confirmar la dirección del cable.): línea de tensión adicional → efecto descrito en texto, sin regla aplicable
- `75-15 B` (Detenerte un instante para confirmar la dirección del cable.): el resultado canónico se mantiene. → efecto descrito en texto, sin regla aplicable
- `75-15 B`: falta la respuesta inmediata
- `75-15 B`: falta su frase de diario (solo hay la base de la escena)
- `75-15 C` (Pensar en Peeta antes de actuar.): añade una línea emocional al despertar. → efecto descrito en texto, sin regla aplicable
- `75-15 C`: falta la respuesta inmediata
- `75-15 C`: falta su frase de diario (solo hay la base de la escena)
- Diario: la variación está descrita («Añadir pensamiento final sobre Peeta.»), falta la frase

## 5. Antes de activar
1. ChatGPT completa todo lo anterior: cifras, condiciones, respuestas, frases del diario y comportamiento de las variables sin equivalente.
2. Tú apruebas la Gira y el 75.º.
3. Claude regenera los datos, integra la Arena en los acontecimientos existentes (sin añadir ninguno) y añade las pruebas de continuidad 74 → Gira → 75 y de carga.
