# LA COSECHA — PRODUCCIÓN NARRATIVA
## Gira de la Victoria y 75.º Vasallaje
**Versión:** 1.0 — borrador narrativo completo para revisión creativa  
**Alcance:** continuidad cinematográfica principal de Katniss Everdeen  
**Campañas incluidas:** Gira de la Victoria y 75.º Vasallaje  
**Campañas excluidas:** 50.º Vasallaje y 10.º Vasallaje  
**Estado:** contenido original de fan game; requiere revisión y aprobación de dirección creativa antes de integrarse.

---

# 0. Reglas de continuidad e implementación

## 0.1. Principio narrativo

La historia sigue los acontecimientos esenciales mostrados en las películas. Las decisiones del jugador modifican la intimidad de las relaciones, la percepción pública, los recursos, el tono de las escenas y determinadas ayudas disponibles, pero no deben borrar los hitos cinematográficos que sostienen la continuidad:

- Katniss y Peeta realizan la Gira de la Victoria como vencedores del 74.º.
- La visita al Distrito 11 honra a Rue y Thresh y desencadena una respuesta represiva.
- La tensión en los distritos aumenta y la visita al Distrito 8 acaba marcada por la violencia del Capitolio.
- Snow obliga a Katniss a sostener públicamente la ficción de que sus actos anteriores nacieron del amor y no de un desafío político.
- Se anuncia el Vasallaje de los Veinticinco y los vencedores deben regresar a la Arena.
- Katniss y Peeta son enviados de nuevo a los Juegos.
- En la Arena del reloj se forman alianzas, se descubren sus ciclos y el plan de Beetee permite destruir el campo de fuerza.
- Katniss es extraída de la Arena por los rebeldes. Peeta queda en manos del Capitolio.
- La campaña termina con Katniss despertando a bordo de la aeronave rebelde y descubriendo que el Distrito 12 ha sido destruido.

## 0.2. Decisiones y canon

Las elecciones no crean una cronología alternativa completa en esta versión. Se dividen en:

- **Decisiones de vínculo:** cambian confianza, cercanía y respuestas posteriores.
- **Decisiones públicas:** cambian simpatía, miedo, propaganda y reacción de los distritos.
- **Decisiones tácticas:** cambian recursos, información, preparación y apoyos dentro de los sistemas ya existentes.
- **Decisiones de interpretación:** cambian el diario y las líneas de diálogo sin alterar el hecho canónico.

Ninguna elección permite evitar el Vasallaje, impedir la entrada de Katniss en la Arena o rescatar a Peeta antes del final de esta campaña.

## 0.3. Convención de variables

Los nombres siguientes son etiquetas narrativas propuestas. Claude debe mapearlos al sistema real de guardado y a los atributos ya existentes. No debe crear un segundo sistema paralelo si existe una variable equivalente.

| Variable narrativa | Uso |
|---|---|
| `public_sympathy` | Percepción favorable de la población |
| `capitol_suspicion` | Atención y vigilancia del Capitolio |
| `district_solidarity` | Solidaridad percibida entre distritos |
| `peeta_trust` | Confianza y coordinación con Peeta |
| `haymitch_trust` | Confianza en el criterio de Haymitch |
| `finnick_trust` | Confianza inicial y cooperación con Finnick |
| `alliance_cohesion` | Cohesión del grupo aliado |
| `arena_knowledge` | Información sobre ciclos y sectores |
| `wire_plan_ready` | Preparación narrativa del plan del cable |
| `injury_state` | Estado de heridas del personaje jugador |
| `sponsor_interest` | Interés de patrocinadores, si el sistema lo contempla |
| `journal_flags` | Registro de recuerdos, promesas y decisiones |

Los valores, rangos y persistencia deben ajustarse a la arquitectura real. No se deben duplicar efectos al cargar una partida ni volver a conceder recompensas por reproducir una escena.

---

# PARTE I — CAMPAÑA: LA GIRA DE LA VICTORIA

## Premisa

Katniss y Peeta han sobrevivido a los Juegos, pero el Capitolio no considera que la historia haya terminado. La Gira debe convertirlos en símbolos obedientes de una victoria romántica. Para los distritos, sin embargo, cada aparición pública recuerda que dos jóvenes fueron obligados a matarse y que el Capitolio teme incluso el gesto de una chica con un arco.

**Personaje jugador recomendado:** Katniss.  
**Acompañantes centrales:** Peeta, Haymitch, Effie, Cinna y, en escenas concretas, Snow.  
**Tono:** duelo contenido, tensión política, vigilancia, culpa y resistencia bajo apariencia de ceremonia.

---

## GIRA-01 — Después de la victoria

**Localización:** residencia de los vencedores, Distrito 12.  
**Momento:** días antes de partir.

### Apertura

La casa está demasiado silenciosa. Los objetos nuevos parecen pertenecer a otra familia. Katniss contempla el jardín desde una ventana. En el reflejo del cristal apenas reconoce a la muchacha que regresó de la Arena.

Peeta llega con una caja pequeña: dentro hay pan recién hecho.

**Peeta:** «No sabía qué traer. Pensé que quizá algo que no viniera envuelto en terciopelo sería un buen comienzo».  
**Katniss:** «Aquí todo parece nuevo. Incluso el silencio».  
**Peeta:** «No tienes que fingir conmigo».  
**Katniss:** «No sé cuándo estoy fingiendo y cuándo no».

Haymitch interrumpe para recordarles que la Gira no es una celebración. Cada gesto será observado y cada palabra puede ser usada contra ellos.

### Decisión del jugador

**A. Aceptar el pan y sentarse con Peeta.**  
- Efecto: `peeta_trust +`; diario: *Un gesto sencillo puede sostenerte cuando todo lo demás pesa demasiado.*  
- Eco: Peeta ofrece apoyo con mayor naturalidad en la preparación de la Gira.

**B. Preguntar a Haymitch qué espera Snow.**  
- Efecto: `haymitch_trust +`; `capitol_suspicion` sin cambio.  
- Diario: *Antes de cada respuesta, hay que averiguar quién está haciendo la pregunta.*

**C. Apartarse y revisar el equipo personal.**  
- Efecto: preparación emocional más fría; `journal_flags: self_reliance`.  
- Eco: Katniss tiende a responder con más cautela en escenas públicas.

### Cierre

Haymitch deja claro que no pueden improvisar. El Capitolio necesita una historia convincente y ellos tendrán que representarla.

---

## GIRA-02 — La versión oficial

**Localización:** sala privada de preparación.  
**Personajes:** Katniss, Peeta, Haymitch, Effie.

Effie ha preparado una lista de apariciones, vestuario y discursos. Haymitch insiste en que la historia del amor debe sostenerse sin fisuras.

**Haymitch:** «No necesitan que os queráis. Necesitan que crean que os queréis. La diferencia puede manteneros vivos».  
**Peeta:** «Y si no quiero mentir sobre todo?»  
**Haymitch:** «Entonces aprende a elegir qué verdad puedes permitirte decir».

### Decisión

**A. Acordar con Peeta una señal privada para apoyarse durante los actos.**  
- Efecto: `peeta_trust +`; desbloquea una línea de apoyo en Distrito 11 y Capitolio.

**B. Pedir a Haymitch respuestas concretas para preguntas difíciles.**  
- Efecto: `haymitch_trust +`; desbloquea una opción de respuesta prudente en la entrevista pública.

**C. Rechazar ensayar sentimientos.**  
- Efecto: `journal_flags: refuses_script`; aumenta la tensión interpersonal, sin alterar la obligación de participar.

### Cierre

Effie guarda sus notas. Peeta mira a Katniss, esperando una señal. La gira empieza antes de subir al tren.

---

## GIRA-03 — El Distrito 11 recuerda

**Localización:** plaza del Distrito 11.  
**Personajes:** Katniss, Peeta, Effie, Haymitch, autoridades y habitantes.

La plaza está llena. La multitud no celebra. Katniss ve rostros agotados y comprende que el silencio no significa aceptación. Durante el acto, recuerda a Rue y Thresh.

### Escena central

Katniss se aparta del discurso preparado.

**Katniss:** «No estaría aquí si Rue no hubiera confiado en mí. No voy a fingir que su nombre es una parte más del espectáculo. Ella merecía volver a casa».  
**Peeta:** «Y Thresh también. No olvidaremos lo que hicieron ni a quienes los esperaban».

Katniss realiza un gesto de respeto hacia la multitud. Un habitante responde con el saludo de los tres dedos. La plaza lo imita. La reacción de los agentes es inmediata.

### Decisión

**A. Hablar desde el recuerdo de Rue.**  
- Efecto: `public_sympathy +`; `district_solidarity +`; `capitol_suspicion +`.  
- Diario: *El nombre de Rue no pertenece al Capitolio.*

**B. Incluir también el recuerdo de Thresh y su decisión de dejarla vivir.**  
- Efecto: `public_sympathy +`; `district_solidarity +`; `capitol_suspicion +`.  
- Eco: Peeta menciona la dignidad de ambos en una conversación posterior.

**C. Mantener el discurso breve para evitar que la multitud quede expuesta más tiempo.**  
- Efecto: reduce el incremento de `capitol_suspicion`; la solidaridad pública es más contenida.  
- Diario: *A veces proteger a alguien significa no darle al poder una excusa inmediata.*

### Consecuencia fija

La multitud expresa respeto y los agentes reprimen la respuesta. El acto deja de ser una ceremonia cómoda. El Capitolio registra el gesto como una señal peligrosa.

---

## GIRA-04 — El tren no es un refugio

**Localización:** tren de la Gira.  
**Personajes:** Katniss, Peeta, Haymitch, Effie.

El tren avanza mientras los tres intentan comprender lo ocurrido. Peeta no quiere que el recuerdo de Rue se convierta en una herramienta política, pero sabe que el Capitolio ya lo ha convertido en una amenaza.

**Peeta:** «No hiciste nada malo».  
**Katniss:** «No es eso lo que me preocupa».  
**Haymitch:** «Lo que importa ahora es lo que Snow crea que harás después».

### Decisión

**A. Reconocer ante Peeta que tienes miedo.**  
- Efecto: `peeta_trust +`; vínculo emocional más sólido.

**B. Pedir a Haymitch que explique qué señales está observando.**  
- Efecto: `haymitch_trust +`; añade una pista al diario sobre vigilancia.

**C. Cambiar de tema y preparar el siguiente acto.**  
- Efecto: mantiene la compostura pública; diario: *El miedo no desaparece por no nombrarlo.*

---

## GIRA-05 — El Distrito 8

**Localización:** zona industrial y plaza del Distrito 8.  
**Personajes:** Katniss, Peeta, autoridades, habitantes.

El distrito está exhausto. El acto oficial transcurre bajo una vigilancia desproporcionada. Katniss distingue señales de descontento entre la multitud.

Tras la ceremonia, el recorrido permite ver la dureza de las condiciones de vida. La visita termina en un ambiente de tensión abierta.

### Decisión

**A. Responder con una frase de solidaridad, sin llamar a la rebelión.**  
- Efecto: `district_solidarity +`; `capitol_suspicion +`.  
- Diario: *No hace falta pronunciar una consigna para que un distrito entienda que no está solo.*

**B. Dejar que Peeta hable y respaldarlo públicamente.**  
- Efecto: `peeta_trust +`; mejora la coordinación pública de la pareja.

**C. Guardar silencio y observar la respuesta de los agentes.**  
- Efecto: se registra información de vigilancia en `journal_flags`; no altera el conocimiento de la Arena.  
- Diario: *El Capitolio también revela sus intenciones cuando cree que nadie lo mira.*

### Consecuencia fija

La situación se vuelve violenta. El Capitolio responde con fuerza y la Gira deja de parecer una sucesión de actos ceremoniales.

---

## GIRA-06 — La advertencia de Snow

**Localización:** estancia privada del Capitolio.  
**Personajes:** Katniss y el presidente Snow.

Snow recibe a Katniss en privado. Su cortesía es calculada. Le explica que la versión romántica de los Juegos debe resultar creíble para todos los distritos. No acepta que la muchacha se convierta en símbolo de desafío.

**Snow:** «Una historia puede ser más peligrosa que un arma. Sobre todo cuando la gente decide creer en ella».  
**Katniss:** «Yo solo quería salir viva».  
**Snow:** «Y ahora hay personas que creen que les has enseñado algo».

### Decisión

**A. Insistir en que las acciones fueron por amor a Peeta.**  
- Efecto: sostiene la versión oficial; `capitol_suspicion` aumenta menos en esta escena.  
- Diario: *La mentira más peligrosa es la que otros necesitan que repitas.*

**B. Preguntar qué ocurrirá con las personas que respondieron al saludo.**  
- Efecto: revela preocupación por los distritos; `capitol_suspicion +`.  
- Diario: *Snow no necesita levantar la voz para demostrar que puede alcanzar a cualquiera.*

**C. No ofrecerle ninguna explicación adicional.**  
- Efecto: tensión elevada; Haymitch deberá intervenir en una conversación posterior.

### Consecuencia fija

Snow deja claro que la supervivencia de Katniss y de quienes ama depende de que la historia pública se mantenga bajo control.

---

## GIRA-07 — Volver a casa no significa estar a salvo

**Localización:** Distrito 12.  
**Personajes:** Katniss, Peeta, Haymitch, familia de Katniss.

La Gira termina, pero el Distrito 12 ya no parece igual. La presencia de agentes y la tensión social han aumentado. Katniss intenta volver a una rutina que ya no existe.

### Decisión

**A. Buscar a Peeta para hablar de lo que Snow ha exigido.**  
- Efecto: `peeta_trust +`; Peeta conoce el alcance de la amenaza.

**B. Hablar con Haymitch sobre cómo proteger a sus familias.**  
- Efecto: `haymitch_trust +`; activa una nota de protección y cautela.

**C. Pasar tiempo con su familia sin hablar de política.**  
- Efecto: refuerza el ancla emocional; `journal_flags: family_anchor`.

### Cierre

La noticia del anuncio presidencial interrumpe la aparente calma: el Capitolio va a revelar una decisión extraordinaria.

---

## GIRA-08 — El Vasallaje de los Veinticinco

**Localización:** emisión oficial del Capitolio.  
**Personajes:** Katniss, Peeta, Haymitch, Effie, Snow en la emisión.

El Capitolio anuncia que, por tratarse del tercer Vasallaje de los Veinticinco, los tributos serán elegidos entre los vencedores vivos de cada distrito.

Katniss comprende que la amenaza de Snow no era una advertencia vacía.

**Peeta:** «No voy a dejar que vuelvas ahí sola».  
**Katniss:** «No sabemos qué van a hacer».  
**Haymitch:** «Sí lo sabemos. Solo falta saber a quién van a elegir».

### Decisión

**A. Acordar con Peeta que intentaréis protegeros mutuamente.**  
- Efecto: `peeta_trust +`; marca `journal_flags: mutual_promise`.

**B. Pedir a Haymitch que busque cualquier resquicio en las reglas.**  
- Efecto: `haymitch_trust +`; marca `journal_flags: search_for_loophole`.

**C. Permanecer en silencio y prepararte para la cosecha.**  
- Efecto: marca `journal_flags: accepts_inevitable`; tono más introspectivo.

### Final de campaña

La pantalla se funde con la imagen de la papeleta de vencedores. El siguiente capítulo comienza con la cosecha del 75.º.

---

# PARTE II — CAMPAÑA: EL 75.º VASALLAJE

## Premisa

El Capitolio convierte la victoria de los vencedores en una nueva condena. Katniss regresa a la Arena junto a otros supervivientes de los Juegos. Esta vez no se enfrenta a jóvenes desconocidos, sino a personas que conocen el precio de sobrevivir y que pueden convertirse tanto en aliadas como en amenazas.

**Personaje jugador recomendado:** Katniss.  
**Acompañantes principales:** Peeta, Haymitch, Finnick, Mags, Johanna, Beetee, Wiress y los demás vencedores.  
**Tono:** paranoia, alianzas frágiles, estrategia, sacrificio y revelación gradual de un plan mayor.

---

## 75-01 — La cosecha de los vencedores

**Localización:** plaza del Distrito 12.  
**Personajes:** Katniss, Peeta, Haymitch, Effie, autoridades.

La plaza está llena de vencedores y agentes. El sorteo ya no es una lotería ordinaria. Cada nombre representa una vida que el Capitolio vuelve a reclamar.

Haymitch es seleccionado como vencedor masculino. Katniss sabe que no puede permitir que él vuelva a la Arena. Se ofrece voluntaria en su lugar. Peeta se presenta para ocupar el lugar de Haymitch.

### Decisión

**A. Buscar la mirada de Peeta antes de ofrecerte.**  
- Efecto: `peeta_trust +`; diálogo posterior más íntimo.

**B. Mirar directamente a los agentes del Capitolio.**  
- Efecto: `capitol_suspicion +`; `public_sympathy +`.

**C. Concentrarte en Haymitch y en la decisión que acabas de tomar.**  
- Efecto: `haymitch_trust +`; diario: *No permitiré que otra persona pague por mí.*

### Consecuencia fija

Katniss se ofrece por Haymitch. Peeta se presenta como tributo masculino. Ambos vuelven a ser enviados a los Juegos.

---

## 75-02 — Prepararse con los vencedores

**Localización:** tren hacia el Capitolio.  
**Personajes:** Katniss, Peeta, Haymitch.

El ambiente es distinto al del 74.º. Todos los tributos conocen la Arena y saben lo que significa matar para sobrevivir. Haymitch explica que no deben confundir experiencia con seguridad.

### Decisión

**A. Preguntar a Haymitch qué vencedores podrían ser aliados.**  
- Efecto: `haymitch_trust +`; añade criterios de observación al diario.

**B. Hablar con Peeta sobre cómo manteneros coordinados.**  
- Efecto: `peeta_trust +`; activa apoyo mutuo.

**C. Observar a los demás vencedores sin acercarte.**  
- Efecto: marca `journal_flags: victor_observation`; habilita descripciones adicionales al conocer a Finnick y Johanna.

---

## 75-03 — Finnick Odair

**Localización:** centro de entrenamiento.  
**Personajes:** Katniss, Finnick, Peeta.

Finnick se acerca con una actitud despreocupada que contrasta con la atención con la que observa cada movimiento. Su tridente parece una extensión de su brazo.

**Finnick:** «La gente suele pensar que una sonrisa significa que no estás prestando atención».  
**Katniss:** «Y tú pareces disfrutar de que lo piensen».  
**Finnick:** «A veces es útil que te subestimen».

### Decisión

**A. Responder con ironía y mantener la distancia.**  
- Efecto: `finnick_trust` neutral; mantiene cautela.

**B. Preguntarle directamente qué busca.**  
- Efecto: `finnick_trust +` si el jugador ya mostró observación; de lo contrario, respuesta evasiva.

**C. Preguntarle por Mags.**  
- Efecto: `finnick_trust +`; marca `journal_flags: noticed_mags_bond`.

### Consecuencia

Finnick queda establecido como un vencedor complejo: carismático, hábil y difícil de leer. No se revela todavía todo lo que sabe.

---

## 75-04 — Johanna Mason

**Localización:** centro de entrenamiento, zona de armas.  
**Personajes:** Katniss, Johanna, Peeta.

Johanna no intenta caer bien. Evalúa a Katniss con una franqueza agresiva y deja claro que no confía en las apariencias del Capitolio.

**Johanna:** «No confundas mi mal humor con falta de criterio».  
**Katniss:** «No estaba haciendo ninguna de las dos cosas».  
**Johanna:** «Entonces quizá podamos soportarnos».

### Decisión

**A. Contestar con firmeza.**  
- Efecto: `journal_flags: johanna_respects_directness`.

**B. No entrar en su provocación.**  
- Efecto: reduce tensión inmediata; Johanna sigue desconfiando.

**C. Preguntarle qué sabe de la Arena.**  
- Efecto: obtiene una advertencia general: los vencedores no deben confiar en que el escenario sea lo que parece.

---

## 75-05 — La entrevista y el vestido

**Localización:** Capitolio, preparación de entrevistas.  
**Personajes:** Katniss, Peeta, Cinna, Caesar Flickerman.

Cinna prepara a Katniss para una aparición que el Capitolio quiere convertir en espectáculo. El vestido no es solo vestuario: será una declaración visual. La entrevista reúne a los vencedores y hace visible su rechazo al destino que les han impuesto.

### Decisión

**A. Aceptar el diseño de Cinna y confiar en su intención.**  
- Efecto: `journal_flags: trusts_cinna`; refuerza el vínculo con Cinna.

**B. Preguntar qué mensaje puede transmitir el vestido sin ponerlo todo en palabras.**  
- Efecto: `public_sympathy +`; `capitol_suspicion +`.

**C. Pedir que la atención se centre en los vencedores como grupo.**  
- Efecto: `district_solidarity +`; fortalece la lectura colectiva de la escena.

### Consecuencia fija

La aparición de Katniss se convierte en un acto de desafío simbólico. El Capitolio responde con violencia contra Cinna antes de que Katniss entre en la Arena.

---

## 75-06 — La última conversación

**Localización:** sala de preparación antes del lanzamiento.  
**Personajes:** Katniss, Peeta, Haymitch.

Peeta intenta que Katniss no se consuma pensando en todas las posibilidades. Haymitch, por su parte, evita revelar más de lo que puede decir bajo vigilancia.

**Peeta:** «No puedo prometerte que todo saldrá bien».  
**Katniss:** «No te lo he pedido».  
**Peeta:** «Entonces prométeme que no vas a decidir por los dos».  
**Katniss:** «Lo intentaré».

### Decisión

**A. Prometer a Peeta que escucharás sus decisiones.**  
- Efecto: `peeta_trust +`; `journal_flags: shared_decisions`.

**B. Pedir a Haymitch que te diga qué no estás viendo.**  
- Efecto: `haymitch_trust +`; deja una pista sobre aliados potenciales.

**C. No prometer nada que no puedas garantizar.**  
- Efecto: respuesta más contenida; diario: *Una promesa no sirve si se convierte en otra cadena.*

---

## 75-07 — La Arena del reloj

**Localización:** plataforma de lanzamiento y playa central.  
**Personajes:** Katniss, tributos.

La plataforma emerge alrededor de una isla rodeada de agua. La playa parece abierta y expuesta. Katniss identifica la cornucopia, las zonas de vegetación y el anillo de sectores.

### Decisión inicial

**A. Priorizar un arma y salir de la playa.**  
- Efecto: recurso inicial ofensivo; aumenta exposición durante la salida.

**B. Priorizar una herramienta de supervivencia.**  
- Efecto: recurso utilitario; mejora la preparación para explorar.

**C. Buscar primero la posición de Peeta.**  
- Efecto: refuerza `peeta_trust`; puede sacrificar una oportunidad de equipo.

### Consecuencia fija

La Arena se convierte en un espacio de supervivencia inmediata. La primera prioridad es salir de la zona abierta y entender el terreno.

---

## 75-08 — La alianza

**Localización:** borde de la playa y zona selvática.  
**Personajes:** Katniss, Peeta, Finnick, Mags.

Finnick propone una alianza. Katniss desconfía de su facilidad para hablar y de su aparente seguridad. Peeta entiende que sobrevivir puede depender de aceptar ayuda.

**Finnick:** «No tenemos que gustarnos. Solo tenemos que seguir respirando el tiempo suficiente».  
**Katniss:** «Y cuando ya no nos necesitemos?»  
**Finnick:** «Entonces tendremos un problema para otro día».

### Decisión

**A. Aceptar la alianza provisional.**  
- Efecto: `alliance_cohesion +`; acceso a apoyo de Finnick y Mags.

**B. Aceptarla con condiciones claras.**  
- Efecto: `alliance_cohesion +` moderado; `finnick_trust +` si la conversación previa fue favorable.

**C. Rechazarla y mantener distancia.**  
- Efecto: conserva autonomía; reduce ayudas disponibles y dificulta escenas cooperativas.

### Consecuencia fija

La alianza con Finnick y Mags es la vía narrativa principal de esta versión. Si el jugador la rechaza, el grupo sigue coincidiendo por las circunstancias de la Arena, pero la cooperación será más fría y menos eficiente.

---

## 75-09 — El primer sector

**Localización:** sector de la jungla.  
**Personajes:** Katniss, Peeta, Finnick, Mags.

La humedad y el calor vuelven difícil avanzar. El grupo debe administrar agua, energía y heridas. Katniss empieza a notar que los sectores no se comportan como un entorno natural.

### Decisión

**A. Mantener el ritmo del grupo.**  
- Efecto: `alliance_cohesion +`; menor desgaste colectivo.

**B. Explorar el límite del sector.**  
- Efecto: `arena_knowledge +`; riesgo de fatiga.

**C. Priorizar el estado de Peeta.**  
- Efecto: `peeta_trust +`; el grupo pierde tiempo de exploración.

### Consecuencia

Se registra la primera sospecha de que la Arena funciona mediante un patrón. No se revela aún el mecanismo completo.

---

## 75-10 — La niebla

**Localización:** sector de la jungla, avance hacia terreno abierto.  
**Personajes:** Katniss, Peeta, Finnick, Mags.

Una niebla venenosa avanza por la vegetación. El grupo corre, pero el terreno dificulta mantener a todos juntos. La exposición provoca dolor y lesiones.

### Decisión

**A. Ayudar a Peeta a mantener el ritmo.**  
- Efecto: `peeta_trust +`; `injury_state` puede empeorar si el jugador ya está herido.

**B. Seguir las indicaciones de Finnick para salir del área.**  
- Efecto: `finnick_trust +`; mejora la cohesión.

**C. Buscar una ruta menos directa.**  
- Efecto: puede reducir la exposición si `arena_knowledge` es alto; de lo contrario, añade desgaste.

### Consecuencia fija

Mags se sacrifica para que los demás puedan escapar de la niebla. Su muerte es un acontecimiento canónico y no puede evitarse en esta versión.

### Diario

*Hay personas que toman una decisión en un instante y cambian para siempre la vida de quienes siguen caminando.*

---

## 75-11 — Los otros vencedores

**Localización:** zona de árboles y borde de la playa.  
**Personajes:** Katniss, Peeta, Finnick, Johanna, Beetee, Wiress.

El grupo se reúne con otros vencedores. Johanna desconfía de todos, Beetee observa la estructura de la Arena y Wiress intenta explicar que el lugar funciona como un reloj.

### Decisión

**A. Escuchar a Wiress y observar los sectores.**  
- Efecto: `arena_knowledge +`; desbloquea una explicación más clara del ciclo.

**B. Preguntar a Beetee por el campo de fuerza.**  
- Efecto: `wire_plan_ready` en preparación; requiere cooperación posterior.

**C. Pedir a Johanna que explique por qué ha decidido ayudar.**  
- Efecto: `journal_flags: johanna_motive_questioned`; su respuesta no revela todo el plan.

### Consecuencia

La idea del reloj se vuelve una hipótesis operativa. Los sectores tienen peligros vinculados a franjas horarias.

---

## 75-12 — El reloj se revela

**Localización:** playa y sectores adyacentes.  
**Personajes:** Katniss, Peeta, Finnick, Beetee, Wiress, Johanna.

El grupo observa cómo los peligros se repiten en una secuencia. Wiress ayuda a identificar que cada sector corresponde a una hora. La Arena no es un bosque arbitrario: es una máquina diseñada para castigar a los tributos con precisión.

### Decisión

**A. Confiar en la interpretación de Wiress.**  
- Efecto: `arena_knowledge +`; `alliance_cohesion +`.

**B. Pedir a Beetee que convierta la observación en un plan.**  
- Efecto: `wire_plan_ready +`; abre preparación táctica.

**C. Mantener una ruta de retirada por si la teoría falla.**  
- Efecto: conserva una opción defensiva; consume tiempo y recursos.

### Consecuencia fija

El grupo comprende la estructura temporal de la Arena. La información debe conservarse en el diario para futuras partidas y reanudaciones.

---

## 75-13 — La propuesta de Beetee

**Localización:** sector de la playa, cerca del árbol y del campo de fuerza.  
**Personajes:** Katniss, Beetee, Finnick, Peeta, Johanna.

Beetee plantea utilizar el cable y la tormenta para conducir una descarga hacia el campo de fuerza. La propuesta requiere coordinación y una ruta precisa. No todos conocen el objetivo real del plan.

**Beetee:** «No hace falta destruir toda la Arena. Basta con encontrar el punto donde el sistema deja de protegerse a sí mismo».  
**Katniss:** «Y si no funciona?»  
**Beetee:** «Entonces habremos descubierto demasiado tarde que el Capitolio tenía razón sobre una cosa: aquí todo está diseñado para matarnos».

### Decisión

**A. Ayudar a Beetee a preparar el cable.**  
- Efecto: `wire_plan_ready +`; `arena_knowledge +`.

**B. Mantenerte cerca de Peeta y proteger la retirada.**  
- Efecto: `peeta_trust +`; la preparación del cable depende más de Beetee y los aliados.

**C. Vigilar a los demás vencedores mientras Beetee trabaja.**  
- Efecto: `alliance_cohesion +` si hay confianza; detecta tensiones antes del desenlace.

### Consecuencia

El plan queda preparado, aunque Katniss no conoce todas sus implicaciones. La campaña debe mantener el misterio sobre quién está cooperando con los rebeldes.

---

## 75-14 — Separación

**Localización:** distintos sectores de la Arena.  
**Personajes:** Katniss, Peeta, Finnick, Johanna, Beetee.

La situación se desordena. Los aliados deben separarse para ejecutar el plan. Johanna actúa con urgencia y Katniss pierde el control de la situación. Peeta queda fuera de su alcance.

### Decisión

**A. Intentar volver con Peeta.**  
- Efecto: `peeta_trust +`; aumenta el riesgo personal.

**B. Seguir la ruta acordada con Beetee.**  
- Efecto: `wire_plan_ready` se conserva; prioriza el objetivo colectivo.

**C. Buscar a Finnick para confirmar dónde está el grupo.**  
- Efecto: `finnick_trust +`; mejora la claridad de la escena final.

### Consecuencia fija

Katniss acaba separada de Peeta. La extracción no se puede evitar y el destino de Peeta queda fuera de su control.

---

## 75-15 — El rayo

**Localización:** árbol central y campo de fuerza.  
**Personajes:** Katniss; presencia de los aliados según las rutas anteriores.

La tormenta se acerca. Katniss comprende que el cable y el rayo son parte de un plan que supera la supervivencia inmediata. Conecta el cable al punto indicado y dirige la descarga hacia el campo de fuerza.

### Decisión

**A. Ejecutar el plan sin desviarte.**  
- Efecto: resolución principal; `wire_plan_ready` consumido de forma idempotente.

**B. Detenerte un instante para confirmar la dirección del cable.**  
- Efecto: línea de tensión adicional; el resultado canónico se mantiene.

**C. Pensar en Peeta antes de actuar.**  
- Efecto: `journal_flags: thinks_of_peeta`; añade una línea emocional al despertar.

### Consecuencia fija

El campo de fuerza se rompe. Katniss es alcanzada por la explosión y pierde el conocimiento.

---

## 75-16 — Despertar

**Localización:** aeronave rebelde.  
**Personajes:** Katniss, Plutarch, Finnick, Haymitch.

Katniss despierta confundida. El entorno no pertenece al Capitolio. Haymitch está allí. Finnick también. Katniss comprende que algunos vencedores formaban parte de una operación para sacarla de la Arena.

**Katniss:** «Peeta. ¿Dónde está Peeta?»  
Haymitch no responde de inmediato.  
**Katniss:** «No me mires así. Dime dónde está».  
**Haymitch:** «No pudimos sacarlo».  
**Katniss:** «Entonces volved».  
**Haymitch:** «No podemos».

### Decisión

**A. Exigir que intenten rescatar a Peeta inmediatamente.**  
- Efecto: `journal_flags: demands_rescue`; expresa el conflicto central.

**B. Preguntar quién organizó la extracción.**  
- Efecto: abre información sobre la rebelión y Plutarch.

**C. Preguntar por los demás vencedores.**  
- Efecto: obtiene información sobre los aliados rescatados y las pérdidas.

### Consecuencia fija

Katniss descubre que ha sido extraída por los rebeldes, pero Peeta ha sido capturado por el Capitolio.

---

## 75-17 — El Distrito 12 ya no existe

**Localización:** aeronave rebelde, observación aérea.  
**Personajes:** Katniss, Haymitch, Finnick.

La aeronave se dirige hacia el Distrito 13. Katniss ve imágenes del Distrito 12 destruido. La escala de la represalia supera todo lo que había imaginado.

### Decisión

**A. Preguntar por su familia.**  
- Efecto: `journal_flags: family_status_question`; la respuesta confirma la evacuación de quienes pudieron salir.

**B. Preguntar por Peeta.**  
- Efecto: refuerza el objetivo emocional de la siguiente campaña.

**C. No hablar y observar las ruinas.**  
- Efecto: diario: *El hogar puede desaparecer en una noche. La memoria no.*

### Final de campaña

La aeronave continúa hacia el Distrito 13. Katniss ya no es solo una vencedora que el Capitolio quiere controlar. Se ha convertido en el símbolo que los rebeldes necesitan y que ella todavía no sabe si puede ser.

**Pantalla final:** `CONTINUARÁ — REBELIÓN`.

---

# PARTE III — DIARIO NARRATIVO

El diario debe registrar las decisiones sin convertirlas en un resumen omnisciente. Cada entrada se redacta desde la perspectiva de Katniss, con frases breves y concretas.

| ID de escena | Entrada base | Variación |
|---|---|---|
| GIRA-01 | «La casa está llena de cosas nuevas y de silencios que no sé llenar». | Añadir recuerdo de Peeta si se acepta el pan. |
| GIRA-02 | «El Capitolio quiere una historia sencilla. Mi vida nunca lo ha sido». | Añadir señal privada si se acuerda con Peeta. |
| GIRA-03 | «Rue merecía volver a casa. No permitiré que su nombre desaparezca». | Añadir mención a Thresh si se elige la opción B. |
| GIRA-04 | «El tren avanza, pero no nos aleja de lo que ha ocurrido». | Añadir temor compartido si se habla con Peeta. |
| GIRA-05 | «El silencio de un distrito puede ser más claro que cualquier discurso». | Añadir observación sobre agentes si se elige C. |
| GIRA-06 | «Snow no amenaza como los demás. Hace que la amenaza parezca una conversación». | Variación según respuesta. |
| GIRA-07 | «Volver a casa no significa recuperar la vida que tenía». | Añadir ancla familiar si se elige C. |
| GIRA-08 | «El Capitolio ha encontrado una forma de convertir la victoria en otra condena». | Añadir promesa a Peeta o búsqueda de una salida. |
| 75-01 | «Me ofrecí antes de poder pensar en otra cosa». | Variación según a quién mira Katniss. |
| 75-02 | «Los vencedores conocen el precio. Eso no significa que puedan pagarlo otra vez». | Variación según preparación. |
| 75-03 | «Finnick sonríe como si el mundo no pudiera tocarlo. No le creo». | Añadir nota sobre Mags si se pregunta por ella. |
| 75-04 | «Johanna no pide confianza. Quizá por eso resulta más fácil creerle». | Variación según respuesta. |
| 75-05 | «Cinna sabe decir con tela lo que yo no puedo decir en voz alta». | Añadir lectura política del vestido. |
| 75-06 | «No sé si las promesas sirven en la Arena. Aun así, algunas importan». | Variación según compromiso. |
| 75-07 | «La playa parece abierta. La Arena nunca ofrece libertad». | Registrar prioridad de equipo. |
| 75-08 | «Una alianza no es amistad. Hoy puede bastar». | Registrar condiciones y confianza. |
| 75-09 | «El bosque tiene un ritmo que todavía no comprendo». | Añadir observación del sector. |
| 75-10 | «Mags tomó una decisión por nosotros. No olvidaré lo que nos permitió hacer». | Sin variación en el hecho central. |
| 75-11 | «Los vencedores han aprendido a desconfiar. También han aprendido a reconocer el miedo». | Añadir observación sobre Wiress o Beetee. |
| 75-12 | «La Arena es un reloj. Cada hora tiene dientes». | Añadir descubrimiento del ciclo. |
| 75-13 | «Beetee habla de electricidad. Yo solo puedo pensar en quién tendrá que acercarse al rayo». | Registrar preparación del cable. |
| 75-14 | «El plan nos separa justo cuando más necesito saber dónde está Peeta». | Variación según decisión. |
| 75-15 | «El cielo se abrió. No sé qué ha quedado en pie». | Añadir pensamiento final sobre Peeta. |
| 75-16 | «Estoy fuera. Peeta no». | Variación según reacción. |
| 75-17 | «El Distrito 12 ya no es un lugar al que pueda volver». | Variación según pregunta final. |

---

# PARTE IV — CONTRATO DE TRANSFERENCIA A SISTEMAS

## 4.1. Fin de la Gira hacia el 75.º

Al terminar `GIRA-08`, la partida debe conservar:

- decisiones públicas de la Gira;
- nivel de vigilancia del Capitolio;
- confianza en Peeta y Haymitch;
- recuerdos del Distrito 11 y del Distrito 8;
- promesas y anclas emocionales del diario.

La cosecha del 75.º no debe reiniciar estos datos. La campaña nueva debe leerlos para modular diálogos, diarios y descripciones.

## 4.2. Inicio del 75.º

La campaña debe cargar las variables de continuidad del 74.º y de la Gira cuando existan. Si la campaña se inicia de forma independiente, debe usar valores iniciales coherentes, sin simular decisiones que el jugador no tomó.

## 4.3. Arena

La Arena debe recibir:

- estado de salud y heridas existente;
- recursos iniciales según las decisiones de lanzamiento;
- estado de alianzas;
- información descubierta sobre los sectores;
- preparación del plan de Beetee;
- recuerdos y promesas relevantes.

La IA de tributos debe seguir siendo responsabilidad del motor. Este documento no autoriza a inventar resultados aleatorios que contradigan los hitos fijos de la película.

## 4.4. Idempotencia y guardado

- Cada efecto narrativo se aplica una sola vez por partida.
- Reanudar una escena no repite cambios de confianza, recursos o diario.
- Volver a abrir el diario no vuelve a conceder efectos.
- Exportar e importar conserva IDs de decisiones, variables y banderas.
- Una migración de partidas antiguas debe asignar valores por defecto explícitos a los campos nuevos.
- Si falta una bandera opcional, la escena utiliza la línea neutral; nunca debe bloquear la campaña.

## 4.5. IDs

Los IDs `GIRA-01` a `GIRA-08` y `75-01` a `75-17` son identificadores narrativos propuestos para este documento. Claude debe cotejarlos con los IDs reales del repositorio antes de integrarlos. Si ya existen IDs estables, se conservan los del repositorio y se mantiene una tabla de correspondencia. No se deben renombrar escenas existentes sin migración.

---

# PARTE V — CRITERIOS DE ACEPTACIÓN

## Narrativa

- [ ] Las ocho escenas de la Gira tienen apertura, diálogo, decisión, consecuencias y cierre.
- [ ] Las diecisiete escenas del 75.º tienen apertura, diálogo, decisión, consecuencias y cierre.
- [ ] Los hitos cinematográficos fijos se mantienen.
- [ ] Las opciones cambian tono, vínculos o preparación sin borrar los hitos centrales.
- [ ] El diario recoge las decisiones y no inventa recuerdos.
- [ ] No se añaden escenas ni acontecimientos al 50.º porque queda fuera del producto.
- [ ] No se introduce el 10.º Vasallaje.

## Técnica

- [ ] Claude mapea las variables a los sistemas existentes.
- [ ] No crea sistemas paralelos de relaciones o atributos.
- [ ] Las decisiones persisten al guardar, cerrar y reanudar.
- [ ] No se duplican efectos al reabrir escenas.
- [ ] Los datos se conservan al exportar e importar.
- [ ] Las campañas independientes reciben valores iniciales coherentes.
- [ ] Las pruebas cubren rutas de confianza alta, baja y neutral.
- [ ] La Arena conserva sus hitos narrativos aunque cambien recursos y relaciones.

## Dirección creativa

- [ ] Revisar la voz de cada personaje antes de aprobar.
- [ ] Revisar la continuidad con el documento definitivo del 74.º.
- [ ] Aprobar las escenas y variables antes de integrarlas como contenido definitivo.
- [ ] Mantener separados los hechos cinematográficos, las interpretaciones y las variaciones del jugador.

---

# NOTA DE ENTREGA A CLAUDE

Este documento es contenido narrativo original para revisión e integración. No autoriza a alterar campañas ya aprobadas ni a reactivar el 50.º o el 10.º Vasallaje.

La instrucción de producto es retirar el 50.º del selector y de las rutas activas del juego, y no desarrollar el 10.º. Antes de borrar archivos, Claude debe identificar dependencias, guardados, pruebas, referencias y recursos reutilizables. La retirada debe hacerse de forma reversible en la rama de integración, conservando una copia de archivo y sin tocar `main`, fusionar el PR, publicar una Release ni desplegar.

Claude puede implementar el motor común, los guardados y la integración técnica autorizada. No debe inventar diálogos, acontecimientos, personajes, decisiones ni consecuencias narrativas para rellenar huecos. Las dudas de continuidad se documentan y se devuelven a dirección creativa.
