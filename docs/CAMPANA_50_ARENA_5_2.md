# La Cosecha 5.2 · Expansión de la Arena del Segundo Vasallaje

## Alcance

Esta entrega amplía la fase de Arena de la campaña del 50.º Vasallaje con cuatro acontecimientos nuevos (turnos 2, 3, 5 y 9). Se apoya en el módulo de precampaña 5.1 y en el motor narrativo ya presente en `campaigns.js`.

## Escenas añadidas

- **Turno 2, La primera noche del Vasallaje:** señales con Maysilee, refugio o fuego visible.
- **Turno 3, El precio de los suministros:** estudiar huellas, arriesgarse por recursos o retirarse.
- **Turno 5, Una voz al otro lado de la pradera:** investigar, responder o proteger la posición.
- **Turno 9, El campo de fuerza:** comprobar la barrera, atraer al rival o combatir directamente.

Las decisiones modifican atributos, inventario, relaciones, banderas narrativas y diario de campaña. El módulo solo se activa en modo historia y edición 50. No modifica el modo libre ni las campañas 74 y 75.

## Integración

1. Aplicar primero `scripts/apply-5.1-campaign50.mjs`.
2. Copiar el nuevo módulo `js/campaign-50th-arena.js` y su prueba a las rutas correspondientes.
3. Ejecutar `node scripts/apply-5.2-arena50.mjs`.
4. Ejecutar `node tests/campaign-50th-prearena.mjs` y `node tests/campaign-50th-arena.mjs` desde `La_Cosecha_Juego_Android`.
5. Ejecutar el build Android y probar la campaña en un dispositivo real.

## Límites

Esta expansión no declara terminada la campaña. Quedan por desarrollar los encuentros dinámicos, la progresión completa de los 48 tributos, las escenas de cierre y la validación narrativa integral. Los tributos no identificados en fuentes canónicas permanecen anónimos; no se inventan nombres para rellenar el registro.
