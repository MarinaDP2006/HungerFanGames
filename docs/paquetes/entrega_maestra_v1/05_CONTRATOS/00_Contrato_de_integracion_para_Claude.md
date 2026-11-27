# Contrato de integración creativa para Claude

## Autoridad
Este paquete es fuente creativa y especificación. ChatGPT no ha realizado cambios en el repositorio. Claude no debe tratar las estructuras como guiones finales.

## Prohibiciones
- No inventar, completar ni reescribir narrativa para cubrir huecos.
- No cambiar IDs de escenas/opciones existentes.
- No alterar efectos narrativos sin aprobación.
- No introducir contenido de módulos rechazados.
- No ampliar 50.º ni crear nuevos turnos/eventos.
- No mezclar Web editorial con el motor de juego Android.
- No sustituir assets por placeholders sin marcarlo.
- No usar material oficial protegido sin derechos/licencia.
- No mergear PR, modificar `main`, crear Release ni desplegar sin aprobación.

## Flujo de integración
1. Inventariar cada archivo y su estado.
2. Comparar IDs y variables con el código actual.
3. Entregar un mapa de correspondencias antes de tocar datos.
4. Marcar los huecos como `BLOCKED_CREATIVE`.
5. Integrar únicamente escenas `APPROVED`.
6. Separar contenido, lógica y presentación.
7. Añadir pruebas de carga, persistencia, flags y migración.
8. Reportar cualquier discrepancia antes de corregirla.
9. Mantener commits pequeños y trazables en rama de integración.
10. Actualizar CHANGELOG y PENDIENTES con estado verificable.

## Estados permitidos
`STRUCTURE_ONLY`, `DRAFT`, `APPROVED`, `INTEGRATED_UNVERIFIED`, `VERIFIED`, `BLOCKED_CREATIVE`, `DEPRECATED`.

## Entrega de Claude por bloque
- Archivos tocados.
- IDs añadidos/modificados.
- Correspondencia de variables.
- Pruebas ejecutadas (CI o local, distinguidas).
- Resultados y logs.
- Riesgos y pendientes.
- Confirmación explícita de que `main` no cambió.
