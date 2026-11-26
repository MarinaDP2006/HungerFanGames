# Entrega 5.5 — Variaciones dinámicas

Entrega incremental para `La_Cosecha_Juego_Android/`.

1. Añade el módulo `js/campaign-50th-dynamic.js`.
2. Añade pruebas automatizadas.
3. Añade documentación de integración.

No incluye integración automática en `app.js`, porque debe verificarse primero el código real de la rama destino. No modifica campañas anteriores ni sobrescribe archivos existentes.

## Requisitos
Node.js 18+ para ejecutar pruebas. La integración final debe conservar el formato de estado y guardado de la versión del juego.

## Validación local
```bash
node --test La_Cosecha_Juego_Android/tests/campaign-50th-dynamic.test.mjs
node --check La_Cosecha_Juego_Android/js/campaign-50th-dynamic.js
```
