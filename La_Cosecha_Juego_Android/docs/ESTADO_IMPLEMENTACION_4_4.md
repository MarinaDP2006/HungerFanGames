# La Cosecha 4.4 — estado de implementación

## Novedades

### Campañas narrativas
- Se amplían los acontecimientos jugables de las campañas 50, 74 y 75.
- Se incorporan decisiones de refugio y confianza con Maysilee, redes de señales vinculadas a Rue, coordinación entre vencedores y decisiones alrededor del mecanismo del reloj.
- Se registra la relación con aliados y algunas decisiones quedan reflejadas en indicadores persistentes de la partida.

### Guerra y posguerra en Presidente de Panem
- Al alcanzar la guerra civil se inicializa un estado mayor con frentes activos, integridad del Capitolio, impulso rebelde, mando, suministro y riesgo civil.
- Órdenes operativas: reforzar defensas, evacuar civiles, negociar, obtener inteligencia, enviar ayuda humanitaria y lanzar ofensivas.
- Los frentes cambian de control según presión, estabilidad, alimentos y mando. Las decisiones consumen recursos y hacen avanzar rondas.
- La derrota del Capitolio o la recuperación de todos los frentes abre la posguerra.

## Validación
- Sintaxis JavaScript comprobada con Node.js.
- Se verifican las ramas de eventos y las acciones de guerra mediante pruebas estáticas de presencia y consistencia.
- Se sincronizan `js/app.js` entre web, proyecto Android y `www`.

## Límites conocidos
- La guerra es una simulación estratégica abstracta, no un wargame táctico con mapa geográfico, unidades individuales ni logística por rutas.
- Los eventos narrativos amplían la estructura ramificada, pero no equivalen a una adaptación completa capítulo por capítulo.
- La economía presidencial sigue siendo agregada y requiere más profundidad institucional y fiscal.
- La experiencia debe probarse en navegadores reales y en un dispositivo Android.
- El APK no está compilado en esta entrega.
