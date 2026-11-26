# La Cosecha 5.5 — Variaciones dinámicas de la Arena

## Alcance
Este módulo adapta seis situaciones del 50.º Vasallaje a las condiciones reales de la partida. No añade crónica, reacciones a muertes de tributos secundarios ni encuentros entre rivales.

## Variables consideradas
- Alianzas disponibles y nivel de relación con el primer aliado.
- Salud y heridas.
- Cansancio.
- Sigilo y habilidad.
- Agua, comida, medicinas y herramientas.
- Decisiones previas registradas en `flags`.

## Turnos adaptados
| Turno | Situación | Variables principales |
|---|---|---|
| 11 | La línea de agua | Agua, salud, sigilo |
| 13 | Un paquete del Capitolio | Salud, comida, medicina, decisión previa |
| 16 | El límite del bosque | Cansancio, herramientas, habilidad |
| 18 | Una noche difícil | Alianzas, confianza, cansancio |
| 21 | Reservas escasas | Comida, habilidad, relación |
| 24 | El terreno cambia | Salud, medicina, agua, habilidad |

## API
- `getDynamicArenaEvent(state)`: devuelve la situación y las opciones válidas para el estado actual.
- `applyDynamicArenaChoice(state, eventId, choiceId)`: devuelve un nuevo estado con efectos aplicados; no persiste por sí mismo.
- `DYNAMIC_ARENA_TURNS`: turnos cubiertos.

Formato de estado aceptado:
```js
{
  mode: "story",
  edition: 50,
  turn: 11,
  stats: { health: 80, fatigue: 20, stealth: 50, skill: 60 },
  inventory: { water: 2, food: 1, medicine: 1, tools: 1 },
  relationships: { Maysilee: 65 },
  allies: ["Maysilee"],
  flags: {}
}
```

## Integración pendiente
El módulo es independiente y probado. Antes de conectarlo a la interfaz real, comprobar la estructura actual de `app.js`, el sistema de turnos, los nombres de estadísticas e inventario y el renderizado de decisiones. No sustituir eventos existentes ni alterar otras ediciones/modos. Persistir `result.state` mediante el mecanismo de guardado ya existente.

## Pruebas
Ejecutar:
```bash
node --test La_Cosecha_Juego_Android/tests/campaign-50th-dynamic.test.mjs
```
