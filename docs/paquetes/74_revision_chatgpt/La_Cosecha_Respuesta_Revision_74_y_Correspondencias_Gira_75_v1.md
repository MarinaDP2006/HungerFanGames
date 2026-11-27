# La Cosecha · Cierre creativo de revisión del 74.º Documento de respuesta para Claude
Fecha: 27-11-2026
Base: REVISION_74_PARA_CHATGPT.md y GIRA_75_CORRESPONDENCIAS_Y_PENDIENTES.md
Estado: decisiones de dirección creativa; el 74.º sigue en DRAFT_FOR_REVIEW hasta integrar y verificar los cambios.

1. Respuestas a las nueve preguntas del 74.º

1) Aprobación de las escenas 1.0 y del anexo 1.1

No se aprueban todavía como paquete jugable definitivo.

Se acepta la estructura de once escenas, su orden, los hitos cinematográficos principales, las opciones existentes y la transferencia a la Arena como base de trabajo. Sin embargo, no se debe cambiar el estado a APPROVED hasta:

- incorporar los ecos escritos en este documento;
- resolver los campos de diálogo y player_prompt;
- validar los IDs de localización y participantes contra los registros reales;
- aplicar las decisiones de las preguntas 2, 4, 5 y 6;
- regenerar el documento y comprobar que no se ha alterado el canon.

No activar la campaña todavía.

2) 74_private_o3

Cambiar campaign.private_session_result de strong a exceptional, igual que en las otras dos opciones.

Las tres elecciones deben conservar el hito canónico de puntuación extraordinariamente alta. La diferencia entre opciones queda únicamente en el método y la descripción de la demostración, registrados mediante sus flags:

- private_archery_display
- private_tactical_display
- private_controlled_display

No utilizar strong como una puntuación inferior ni como una ruta que contradiga el resultado cinematográfico.

3) Ecos sin frase y promesa a Gale

Sí: escribirlos. No deben quedarse como instrucciones internas ni como texto no visible. Las frases completas se encuentran en la sección 2.

La frase de la promesa a Gale solo se muestra si existe gale_promise_explicit. Debe recordar lo que Katniss pidió, sin afirmar que sabe si Gale está cumpliéndolo.

4) district_memory y canon_route

Eliminar ambas variables de la lista de variables activas del guion, porque ninguna opción las utiliza y no tienen un efecto definido en este bloque.

No crear efectos, flags ni mecánicas para justificar su presencia. Si Claude encuentra referencias reales a ellas en otra parte del juego, debe informar de la referencia exacta antes de retirarlas del contrato global.

5) Límites de patrocinio e imagen pública

No establecer una conversión numérica todavía.

Mantener image_capitol y sponsor_interest como valores narrativos de la campaña y guardarlos en la instantánea. No convertirlos automáticamente a support ni a sponsorTrust, ni alterar esos valores del sistema de Arena, hasta que Claude entregue:

- rango mínimo y máximo real de support;
- valor inicial real y reglas de modificación de support;
- rango mínimo y máximo real de sponsorTrust;
- valor inicial real y reglas de modificación de sponsorTrust;
- si los valores pueden modificarse desde precampaña y si se limitan o normalizan al entrar en Arena.

Después de recibir esos datos, ChatGPT definirá una equivalencia compatible. Hasta entonces, ambos valores quedan sin aplicar mecánicamente. No inventar escalas ni conversiones.

6) Habilidades de arco, supervivencia y observación

Se conservan únicamente como información narrativa dentro de la instantánea. No deben aumentar la habilidad genérica skill, ni conceder bonificaciones mecánicas.

El sistema no contiene atributos separados para arco, supervivencia y observación. No se deben simular tres atributos mediante la habilidad genérica ni crear un sistema nuevo. Las opciones pueden modificar training_focus y sus flags narrativos ya definidos, pero no habilidades inexistentes.

7) Diálogos

Separar los diálogos hablados en dialogue[], con speaker_id, text y delivery_note.

La prosa de cada escena se mantiene como descripción narrativa y no debe contener conversaciones resumidas en lugar de líneas habladas. No extraer automáticamente frases de la prosa como si fueran diálogos literales: ChatGPT redactará los parlamentos en la siguiente revisión narrativa. Hasta entonces, dialogue[] queda pendiente y el bloque no se aprueba.

8) location_id y participants[]

Los location_id propuestos son candidatos aceptados a nivel editorial, pero no quedan confirmados como IDs técnicos hasta que Claude compruebe que existen exactamente en el registro del proyecto. Validar estos once:

- district_12_square
- district_12_justice_building
- district_12_station
- victory_train
- capitol_station
- capitol_prep_center
- capitol_parade_avenue
- capitol_training_center
- gamemakers_private_room
- capitol_interview_stage
- arena_launch_room

No crear duplicados ni inventar IDs alternativos. Si alguno no existe, Claude debe informar del nombre y de los IDs equivalentes ya presentes para que se elija uno.

Los participants[] no pueden confirmarse con este documento porque no contiene el registro técnico de personajes ni sus IDs. Claude debe devolver la lista exacta de IDs existentes para cada escena, sin inventarlos. Los personajes narrativos de cada escena son los ya enumerados en la revisión.

9) Identificadores

Confirmados como contrato definitivo de este bloque:

- campaña: campaign_74
- decisiones: campaign_74:<scene_id>:<option_id>:1 (respetando el formato exacto que ya utiliza el anexo)
- diario: 74.diary.<scene_id>.<option_id>

Conservar los scene_id y option_id ya existentes. No renombrar escenas ni decisiones durante esta revisión. La transferencia idempotente debe seguir evitando duplicar efectos o entradas de diario.


---

2. Ecos completos del 74.º

Estas frases sustituyen las descripciones provisionales de los ecos que todavía no tenían texto. Deben mostrarse solo cuando se cumpla la condición indicada. No conceden bonificaciones, conocimientos, objetos ni cambios de canon que no estén expresamente descritos.

Escena 1 · 74_reaping

- Condición: katniss_observed_ceremony; mostrar al llegar al Capitolio.
  Eco: «La plaza del Distrito 12 no tenía nada de aquel orden brillante. Allí todos sabían quién los vigilaba; aquí, en cambio, hasta los pasillos parecen diseñados para que olvides que alguien está mirando.»

Escena 2 · 74_goodbyes

- Condición: gale_promise_explicit; mostrar en 74_launch.
  Eco: «Pienso en Gale y en lo que le pedí antes de marcharme. Le confié a mi familia porque no tenía otra forma de protegerlas desde aquí. No sé qué habrá ocurrido desde entonces.»
- Condición: mother_responsibility_named; mostrar en 74_launch.
  Eco: «Le pedí a mi madre que volviera a estar junto a Prim. No sé si el miedo la dejará hacerlo, pero necesitaba pedírselo antes de que se cerrara aquella puerta.»
- Condición: goodbye_without_words; mostrar en 74_launch.
  Eco: «No dije nada más. Todavía recuerdo el abrazo y el momento en que tuvieron que separarnos. Hay despedidas que siguen pesando incluso cuando ya no queda nadie a quien abrazar.»

Escena 3 · 74_departure

- Condición: departure_observant; mostrar durante la llegada o el primer recorrido por el Capitolio.
  Eco: «Recuerdo el camino desde el Edificio de Justicia hasta la estación: los agentes, las salidas y los rostros que alcancé a distinguir. No sé si esos detalles servirán, pero no quiero olvidarlos.»
- Condición: departure_composure; mostrar en el tren.
  Eco: «Conté la respiración para no dejar que el miedo decidiera por mí. No hizo que desapareciera. Solo me permitió seguir caminando sin que se notara cuánto me costaba.»
- Condición: departure_noticed_peeta; mostrar en el tren.
  Eco: «Vi a Peeta antes de subir. Ya había reparado en él durante la cosecha, aunque todavía no sé qué piensa de todo esto ni qué espera de mí.»

Escena 4 · 74_train

- Condición: haymitch_practical_questions; mostrar durante el entrenamiento o una conversación posterior con Haymitch.
  Eco: «En el tren le pedí a Haymitch respuestas concretas. No se convirtió por eso en alguien fácil de confiar, pero al menos entendió que no necesitaba consuelo: necesitaba aprender.»
- Condición: train_peeta_opening; mostrar durante el entrenamiento.
  Eco: «Le pregunté a Peeta cómo pensaba afrontar los Juegos. Aquella conversación no resolvió lo que nos esperaba, pero fue la primera vez que intenté conocer su manera de pensar en lugar de limitarme a verlo como al otro tributo.»
- Condición: katniss_keeps_advantage_private; mostrar durante el entrenamiento.
  Eco: «En el tren preferí escuchar antes de enseñar mis cartas. Sigo pensando que no todos necesitan saber de qué soy capaz, y mucho menos antes de que empiecen los Juegos.»

Escena 5 · 74_arrival

- Condición: capitol_layout_observed; mostrar durante la exploración del complejo.
  Eco: «Me fijé en los accesos, los pasillos y la distribución del complejo. Recordar cómo estaba organizado me ayuda a orientarme, aunque no significa que conozca rutas que nunca he recorrido.»
- Condición: arrival_stayed_near_peeta; mostrar en una escena compartida con Peeta.
  Eco: «Me mantuve cerca de Peeta al llegar. En medio de aquel lugar desconocido, reconocer a alguien del Distrito 12 resultaba más sencillo que decidir si podía confiar en él.»
- Condición: arrival_guarded; mostrar en la primera interacción pública posterior a la llegada.
  Eco: «En el Capitolio aprendí a contestar solo lo necesario. Una respuesta cortés podía bastar; no tenía por qué entregarles también lo que estaba pensando.»

Escena 6 · 74_prep

- Condición: cinna_trust; mostrar durante el desfile.
  Eco: «Cinna no intentó convertirme en alguien distinta. Confié en su criterio porque parecía entender que la imagen que el Capitolio vería no tenía por qué borrar quién era yo.»
- Condición: district_identity_visible; mostrar en el diario o recuerdo previo al desfile.
  Eco: «Quise conservar algo que recordara de dónde venía. No sé si los demás lo notarán, pero no quiero que el espectáculo haga desaparecer al Distrito 12 detrás del vestuario.»
- Condición: prep_controlled; mostrar justo antes del desfile.
  Eco: «Dejé que terminaran la preparación sin fingir entusiasmo. Podía colaborar con el equipo sin olvidar que aquella presentación estaba pensada para convertirnos en algo que el Capitolio pudiera consumir.»

Escena 7 · 74_parade

- Condición: parade_confident; mostrar al recordar la reacción del público.
  Eco: «Sostuve la mirada de la multitud. No podía decidir lo que pensarían de mí, pero durante aquellos segundos sí pude decidir que no iba a bajar la cabeza.»
- Condición: parade_pair_identity; mostrar en la siguiente escena pública compartida con Peeta.
  Eco: «Peeta y yo aparecimos juntos ante todos. No significaba que confiáramos el uno en el otro sin reservas, pero el Capitolio ya había encontrado una imagen que podía vender.»
- Condición: parade_trust_team; mostrar al terminar el desfile.
  Eco: «Seguí las indicaciones de Cinna. Él sabía cómo funcionaba aquel espectáculo y yo necesitaba concentrarme en atravesarlo sin perderme dentro de la imagen que habían preparado.»

Escena 8 · 74_training

- Condición: trained_archery; mostrar al volver a practicar o al hablar del entrenamiento.
  Eco: «Elegí practicar con el arco. Era algo que ya conocía, pero hacerlo delante de los demás significaba aceptar que los Vigilantes y los otros tributos podían fijarse en cada movimiento.»
- Condición: trained_survival; mostrar al hablar de preparación para la Arena.
  Eco: «Dediqué tiempo a pensar en rastreo y supervivencia. No todo se resolvería enfrentándome a alguien; encontrar agua, leer el terreno y saber cuándo avanzar también importaría.»
- Condición: training_observed_others; mostrar durante una observación posterior del Centro de Entrenamiento.
  Eco: «Preferí observar las estaciones y a los demás tributos antes de acercarme. Vi cómo se movían, pero no puedo saber lo que piensan ni convertir unas pocas miradas en certezas.»

Escena 9 · 74_private_session

- Condición: private_archery_display; mostrar al recordar la sesión privada.
  Eco: «Elegí demostrar mi precisión con el arco. Los Vigilantes no aplaudieron ni dieron explicaciones; solo anotaron lo que habían visto. La puntuación que vino después fue mucho más alta de lo que esperaba.»
- Condición: private_tactical_display; mostrar al recordar la sesión privada.
  Eco: «Intenté demostrar que podía leer una situación además de acertar a un objetivo. No sé qué parte valoraron más los Vigilantes. Solo sé que mi actuación terminó con una puntuación extraordinariamente alta.»
- Condición: private_controlled_display; mostrar al recordar la sesión privada.
  Eco: «Reservé parte de mis capacidades y mantuve la calma. Aun así, los Vigilantes me dieron una puntuación extraordinariamente alta. Mostrar menos no cambió el resultado que ahora todos conocen.»

Escena 10 · 74_interview

- Condición: interview_honest; mostrar al recordar la entrevista.
  Eco: «Intenté responder con sinceridad sin contar más de lo necesario. Las cámaras podían convertir cualquier palabra en una historia, pero al menos procuré que aquella no fuera completamente ajena a mí.»
- Condición: interview_warm; mostrar al recordar la entrevista o al tratar con el público.
  Eco: «Dejé que vieran algo más que mi desconfianza. Mostrar calidez no significaba confiar en el Capitolio; significaba decidir qué parte de mí podían conocer.»
- Condición: interview_defiant; mostrar al recordar la entrevista.
  Eco: «Respondí con firmeza y no intenté disfrazarlo. No estaba buscando una pelea con Caesar ni con el público, pero tampoco iba a aceptar cada papel que quisieran asignarme.»

Escena 11 · 74_launch

- Condición: launch_family_focus y gale_promise_explicit; añadir después del texto base del recuerdo familiar.
  Eco: «También recuerdo lo que le pedí a Gale: que cuidara de Prim y de mi madre. No sé si podrá mantenerlas a salvo, pero esa promesa sigue conmigo.»
- No crear una segunda entrada si el recuerdo de gale_promise_explicit ya se ha mostrado en la misma escena. Mostrarlo una sola vez.


---

3. Reglas de implementación narrativa para estos ecos

1. Cada eco es texto condicional, no un acontecimiento nuevo ni un turno de Arena.
2. Los ecos no modifican atributos, relaciones, patrocinio, imagen pública, inventario ni resultados canónicos.
3. No mostrar ecos incompatibles como si fueran simultáneos cuando dependen de elecciones distintas. Los flags determinan qué recuerdo corresponde a la partida.
4. Si el mismo eco puede activarse desde más de una entrada, deduplicar por ID de eco y mantener la idempotencia.
5. No añadir escenas ni cambiar los IDs existentes.


---

4. Observaciones sobre Gira y 75.º según el informe de correspondencias

El informe confirma que las 25 escenas se importaron como DRAFT_FOR_REVIEW, no jugables. Se mantiene esa condición.

4.1 Arena del 75.º

La tabla de correspondencias a los ocho acontecimientos existentes es la base de integración. No añadir nueve acontecimientos nuevos. Antes de activar, Claude debe entregar la tabla final con los IDs exactos y probar que el orden narrativo y el orden técnico coinciden.

Conflicto Wiress: la tabla sitúa 75-11 y 75-12 en el turno 5, y «Los charlajos» en el turno 7. Esa secuencia puede ser coherente si Wiress participa en el descubrimiento del reloj y muere antes del acontecimiento del turno 7. Claude debe verificar el orden real de ejecución y el punto exacto de su muerte; no mover su muerte antes del descubrimiento del reloj.

Mags: la muerte de Mags debe mantenerse como hito fijo de la continuidad cinematográfica. La opción que permite salvarla debe retirarse o reescribirse para que cambie la acción de Katniss, el desgaste o la ayuda al grupo, pero no el resultado de que Mags muere. No presentar una supervivencia de Mags como final alternativo de esta campaña.

Inicio de Arena (75-07): unificarlo con el acontecimiento técnico de las plataformas de agua. La decisión debe ocurrir en las plataformas, antes de abandonar la zona, y sus opciones deben corresponder al contexto y a los recursos realmente presentes en ese momento. Eliminar la contradicción entre la playa y las plataformas. No duplicar el turno.

4.2 Variables de Gira y 75.º sin equivalente

No crear atributos o medidores nuevos. Aplicar este criterio:

- finnick_trust: reutilizar únicamente el flag binario existente finnickTrusted cuando la condición narrativa lo justifique; no inventar una escala numérica.
- arena_knowledge: reutilizar clockObserved como conocimiento binario del reloj, sin crear una puntuación nueva.
- alliance_cohesion: usar relationships.victors solo si Claude confirma que el dato representa exactamente la cohesión/confianza de los vencedores y que admite los efectos requeridos. Si no, expresarlo con flags narrativos ya admitidos por el sistema.
- public_sympathy, capitol_suspicion y district_solidarity: no crear medidores. Resolver sus consecuencias mediante texto, flags narrativos existentes o variables actuales que representen exactamente el mismo concepto. No sustituirlos por public.image_capitol o support sin equivalencia semántica demostrada.
- wire_plan_ready: no crear una variable nueva. Usar un flag de evento existente si ya está disponible; si no existe, mantener la preparación del cable como condición narrativa dentro de los acontecimientos existentes y pedir a Claude que informe de la estructura disponible antes de implementarla.

Los valores iniciales, rangos y cifras de cualquier efecto que dependa de un sistema real quedan pendientes de la inspección técnica de Claude. No se inventan números a partir de este informe.

4.3 Escenas posteriores a la Arena

75-16 y 75-17 se mantienen como escenas narrativas posteriores a la extracción y al bombardeo del Distrito 12. Sus respuestas, diarios y condiciones deben completarse antes de activar la campaña. Deben servir de puente a Rebelión, sin anticipar acontecimientos que Katniss todavía desconoce.

4.4 IDs de la estructura anterior sin escena

Los IDs que el informe identifica como sin escena (tour_capitol_return, 75_aftermath_tour, 75_departure, 75_capitol_arrival, 75_prep, 75_private_session) se conservan registrados por ahora. Claude debe informar si tienen referencias, guardados o pruebas dependientes. No borrarlos ni reasignarlos hasta comprobarlo. Si son nodos redundantes sin referencias, proponer su retirada reversible en un informe separado.


---

5. Qué debe devolver Claude antes de la siguiente aprobación

1. Confirmación de que los ecos se han añadido exactamente con sus condiciones, sin efectos mecánicos nuevos.
2. Lista validada de location_id y participants[], con los IDs reales del registro.
3. Confirmación de que district_memory y canon_route se han retirado del contrato de este bloque o informe de referencias externas.
4. Esquema real y límites de support y sponsorTrust; no activar conversiones todavía.
5. Confirmación de que las habilidades específicas permanecen como contexto narrativo y no aumentan skill.
6. Propuesta de estructura dialogue[] y player_prompt para las once escenas, sin activar el 74.º.
7. Tabla final de correspondencia de las escenas 75-07 a 75-15 con los ocho acontecimientos existentes.
8. Verificación del orden de Wiress, la muerte fija de Mags y el comienzo en las plataformas de agua.
9. Pruebas de regeneración, guardado e idempotencia.
10. Confirmación de que todo sigue en integracion-cosecha-5x, PR #1 en Draft, main intacta, sin Release, merge ni despliegue.

Estado final: este documento resuelve decisiones narrativas y aporta los ecos del 74.º. No equivale a aprobación de campaña. El 74.º, la Gira y el 75.º continúan en borrador hasta revisión y aprobación explícita de la directora.
