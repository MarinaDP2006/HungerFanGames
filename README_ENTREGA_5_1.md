# La Cosecha · Entrega 5.1

Esta entrega continúa el paquete 5.0 e incorpora una expansión funcional de la campaña del 50.º Vasallaje antes de la Arena.

## Contenido

- Música ambiental original WAV y OGG.
- Controlador de audio del juego.
- Fichas y notas de continuidad del 50.º Vasallaje.
- Nueve escenas narrativas pre-Arena con decisiones ramificadas.
- Roster de 48 plazas con cuatro por distrito y sustitución de Louella por Lou Lou.
- Integración automatizada con el `app.js` existente.
- Pruebas específicas para roster, escenas, continuidad y efectos.

## Instalación en el repositorio

Copia el contenido de esta carpeta en la raíz de `MarinaDP2006/HungerFanGames`, conservando las rutas. Después ejecuta:

```bash
node scripts/apply-5.1-campaign50.mjs
node La_Cosecha_Juego_Android/tests/campaign-50th-prearena.mjs
```

Consulta `docs/CAMPANA_50_PREARENA_5_1.md` para el procedimiento completo.

## Importante

La prueba incluida ha sido ejecutada localmente sobre el módulo narrativo. La integración en el repositorio, las pruebas existentes y la compilación Android deben verificarse después de aplicar el paquete. No se debe declarar un Release final sin esa validación.
