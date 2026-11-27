# Biblia maestra de La Cosecha

## 1. Premisa
La Cosecha es una experiencia narrativa y estratégica ambientada en Panem. El jugador puede recorrer campañas inspiradas en acontecimientos conocidos y, mediante decisiones explícitas, abrir líneas temporales alternativas. El juego distingue siempre entre **continuidad de referencia** y **continuidad alterada**.

## 2. Jerarquía de continuidad
1. Canon literario: referencia primaria para hechos, motivaciones y relaciones.
2. Adaptaciones cinematográficas: referencia visual y complementaria cuando no contradigan la base literaria.
3. Contenido original del juego: solo se incorpora cuando está identificado como creación propia y no se presenta como hecho canónico.
4. Ruta alternativa: consecuencia de una decisión del jugador; nunca se reescribe como si siempre hubiera sido canon.

Cuando libro y película difieran, registrar la diferencia en una ficha de continuidad. No resolver incertidumbres mediante invención silenciosa.

## 3. Reglas del mundo
- Panem está gobernado por el Capitolio y dividido en distritos sometidos a desigualdad, vigilancia y coerción.
- El Distrito 13 no participa en las cosechas ordinarias.
- Los Juegos son un instrumento político, propagandístico y de control.
- La información está distribuida de forma desigual: cada personaje solo puede actuar con lo que sabe o puede inferir razonablemente.
- La tecnología, seguridad y logística deben respetar el nivel de desarrollo mostrado en la obra de referencia.
- No convertir a personajes secundarios en protagonistas de subtramas no justificadas.
- La victoria compartida solo puede ocurrir cuando la continuidad o una ruta alternativa la hace posible y el sistema lo permite expresamente.

## 4. Cronología de campañas
### 50.º Vasallaje
Campaña centrada en Haymitch Abernathy. Su contenido aprobado se considera cerrado narrativamente. No añadir escenas, turnos ni acontecimientos nuevos. Solo se permiten las variaciones dinámicas ya delimitadas para acontecimientos existentes, conservando IDs, efectos y consecuencias.

### 74.º Juegos
Campaña de Katniss Everdeen. Debe cubrir cosecha, voluntariado, despedidas, traslado, preparación, desfile, entrenamiento, sesión privada, entrevistas y Arena. Las fases previas no pueden quedar reducidas a una introducción genérica.

### Gira de la Victoria
Puente narrativo entre el 74.º y el 75.º. Debe reflejar la condición de vencedores, el control del Capitolio, las visitas oficiales, la tensión política y el crecimiento de la resistencia. No es una campaña de combate.

### 75.º Vasallaje
Debe cubrir anuncio del Vasallaje, cosecha de vencedores, preparación, alianzas, entrevistas, Arena del reloj y conspiración. Las diferencias entre ruta de referencia y rutas alternativas deben quedar explícitas.

### Rebelión
Campaña político-narrativa centrada en la resistencia, los distritos, el Distrito 13, propaganda, confianza, operaciones y dilemas morales. Evitar convertirla en una sucesión de batallas sin contexto humano.

### Guerra y caída del Capitolio
Cierre de la saga. Debe representar decisiones estratégicas, operaciones, pérdidas, propaganda, fracturas internas, caída del régimen y reconstrucción. Los finales dependen de decisiones acumuladas y no de una única elección final.

## 5. Arquitectura de rutas
Cada campaña registra:
- `campaign_id`
- `timeline_id`
- `scene_id`
- `choice_id`
- `state_changes`
- `relationship_changes`
- `knowledge_flags`
- `continuity_flags`
- `ending_flags`

Las rutas alternativas deben etiquetarse. Nunca mezclar estados de partidas distintas ni trasladar consecuencias incompatibles.

## 6. Variables narrativas recomendadas
- Confianza por personaje.
- Exposición pública / atención del Capitolio.
- Percepción pública.
- Lealtad y estabilidad por distrito.
- Recursos disponibles.
- Heridas y limitaciones.
- Información conocida.
- Estado de alianzas.
- Apoyo / temor / descontento político.
- Estado de continuidad (referencia o alternativa).

No usar una sola variable genérica para representar emociones, política, habilidades y reputación.

## 7. Reglas de escritura
- Tercera persona o segunda persona según el formato de escena ya establecido en el juego; no alternar arbitrariamente.
- Diálogos breves, diferenciados por voz y motivación.
- No copiar pasajes ni diálogos de libros o películas.
- No inventar citas atribuidas a personajes.
- Las descripciones deben ser originales y funcionales al ritmo del juego.
- Cada escena debe terminar con una transición clara o una decisión significativa.
- Evitar exposición redundante de información que el jugador ya conoce.
- No narrar muertes de tributos secundarios con reacciones o consecuencias si el diseño aprobado del 50.º lo prohíbe.

## 8. Ficha obligatoria de escena
- ID estable
- Campaña y acto
- Ubicación y momento
- Personajes presentes
- Conocimiento de cada personaje
- Texto narrativo
- Diálogos
- Opciones
- Efectos de cada opción
- Condiciones de aparición
- Transición siguiente
- Flags de continuidad
- Pruebas de ruta

## 9. Finales
Los finales deben agruparse en:
- Continuidad de referencia.
- Variantes de supervivencia o relaciones.
- Variantes políticas.
- Líneas temporales profundamente alteradas.

Cada final debe explicar qué decisiones lo habilitaron y qué consecuencias quedan sin resolver. No presentar un final alternativo como canónico.
