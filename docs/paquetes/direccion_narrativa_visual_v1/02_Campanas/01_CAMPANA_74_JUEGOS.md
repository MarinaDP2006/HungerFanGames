# Campaña: 74.º Juegos — paquete narrativo de producción

## Función dramática
La campaña debe llevar al jugador desde la vida cotidiana de Katniss en el Distrito 12 hasta el umbral de la Arena. El eje no es solo sobrevivir: es proteger a Prim, gestionar la imagen pública, interpretar a quienes la rodean y descubrir qué significa convertirse en símbolo.

## Estructura propuesta de precampaña
Los IDs siguientes son identificadores de diseño. Claude debe mapearlos a los IDs reales existentes y no renombrar contenido integrado sin aprobación.

### Acto I — Distrito 12
1. `74_reaping`: la cosecha. Presentar el ritual, la tensión familiar y la selección de Prim. La decisión central es el voluntariado de Katniss, que en continuidad de referencia es un hecho fijo.
2. `74_goodbyes`: despedidas. Escenas separadas con familia, Gale y personas relevantes. No convertirlas en elecciones que borren el voluntariado.
3. `74_departure`: salida y transición. Mostrar la ruptura entre el entorno conocido y el aparato del Capitolio.

### Acto II — Traslado y Capitolio
4. `74_train`: tren. Primer contacto con el equipo de preparación; contraste entre lujo y desigualdad; relación con Peeta y Haymitch.
5. `74_arrival`: llegada. Registro, vigilancia, extrañeza y primera lectura del Capitolio.
6. `74_prep`: preparación. Construcción de presencia pública y coordinación del equipo.
7. `74_parade`: desfile. Presentación pública; opciones de actuación que afectan percepción y confianza, sin cambiar hechos canónicos esenciales.
8. `74_training`: entrenamiento. Aprendizaje, observación de habilidades y lectura de otros tributos. No forzar encuentros no establecidos.
9. `74_private_session`: sesión privada. Evaluación ante Vigilantes; la acción elegida puede alterar la puntuación y la atención recibida.
10. `74_interview`: entrevista. Construcción de imagen y tensión emocional antes de la Arena.
11. `74_launch`: preparación inmediata y entrada a la Arena. Cierre de precampaña y transferencia de variables al motor de Arena.

## Arcos de personajes
### Katniss
Objetivo externo: proteger a su familia y sobrevivir. Conflicto: mantener autonomía bajo observación constante. La campaña debe mostrar su capacidad práctica, reserva emocional y dificultad para interpretar el espectáculo social del Capitolio.

### Peeta
Objetivo externo: sobrevivir sin perder su identidad. Conflicto: sinceridad, estrategia y vulnerabilidad pública. No reducirlo a un interés romántico ni atribuirle conocimiento que todavía no posee.

### Haymitch
Objetivo externo: preparar a sus tributos para sobrevivir. Conflicto: desconfianza, desgaste y cálculo. Su conducta debe mantener la mezcla de dureza, inteligencia y vulnerabilidad que establece el canon.

### Effie y equipo de preparación
Representan la normalización del espectáculo y la distancia cultural. No deben escribirse como caricaturas planas: sus acciones nacen del entorno social que conocen.

## Diseño de decisiones
Las decisiones modificables se concentran en:
- Cómo Katniss interpreta y responde a la presión pública.
- Qué señales ofrece al equipo y qué información comparte.
- Cómo utiliza el entrenamiento y qué habilidades prioriza.
- Qué imagen construye durante el desfile y la entrevista.
- Qué riesgos acepta en la preparación.

Los hechos esenciales de la continuidad de referencia permanecen. Las rutas alternativas deben indicar claramente qué evento se ha alterado y qué efectos tiene.

## Variables transferidas a Arena
- `public_image`
- `capitol_attention`
- `haymitch_trust`
- `peeta_trust`
- `training_profile`
- `sponsor_interest`
- `known_skills`
- `injury_state`
- `continuity_74`

## Criterios de aceptación
- La precampaña tiene escenas diferenciadas y no una pantalla genérica.
- Cada escena tiene texto original y opciones con efectos comprobables.
- Las elecciones se conservan al entrar en Arena.
- Ningún personaje conoce información futura.
- Los IDs y efectos de acontecimientos de Arena existentes no se alteran sin aprobación.
- Las pruebas recorren al menos una ruta de referencia y dos variantes.
