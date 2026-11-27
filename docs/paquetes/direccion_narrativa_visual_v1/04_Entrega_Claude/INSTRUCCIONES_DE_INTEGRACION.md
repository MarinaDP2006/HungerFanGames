# Instrucciones para Claude — La Cosecha

## Alcance autorizado de este paquete
Este paquete es material de dirección creativa. No es autorización para fusionar el PR, publicar, modificar `main` ni ejecutar automáticamente scripts que alteren campañas.

## Orden
1. Leer todos los documentos.
2. Comparar IDs propuestos con los IDs reales del juego.
3. Entregar una tabla de correspondencia entre escenas propuestas y contenido implementado.
4. Identificar contradicciones con la implementación y pedir aclaración antes de alterar contenido narrativo existente.
5. Implementar únicamente estructura técnica no destructiva cuando esté dentro de la fase autorizada.
6. Para integrar narrativa nueva, esperar el paquete de textos finales escena por escena y su aprobación.
7. Mantener el modo Historia, Libre y Presidente visualmente diferenciados.
8. Crear una lista de recursos gráficos requeridos con dimensiones, formato, nombre y pantalla destino.
9. Añadir pruebas para persistencia, rutas, flags, migraciones y navegación.

## Restricciones
- Trabajar solo en `integracion-cosecha-5x`.
- PR #1 permanece Draft.
- No merge, Release ni Render.
- No tocar `main`.
- No reescribir los textos aprobados del 50.º.
- No añadir escenas ni turnos al 50.º.
- No integrar los módulos rechazados 5.2, 5.3 y 5.4.
- No inventar contenido canónico ni diálogos de personajes.
- No sustituir recursos por imágenes protegidas sin autorización.
- No declarar una función terminada por el mero hecho de que exista un archivo.

## Entregables de Claude
- Correspondencia entre este diseño y el código existente.
- Lista de conflictos / decisiones pendientes.
- Plan técnico por commits pequeños.
- Capturas de cada modo cuando esté implementado.
- Resultado de CI con suites identificadas.
- Pruebas locales diferenciadas de CI.
- APK instalado y recorrido real en emulador o dispositivo.
- Informe de limitaciones y deuda técnica.
