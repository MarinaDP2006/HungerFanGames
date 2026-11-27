# Decisiones de dirección

Registro de las decisiones de la directora (Nina) que afectan al código. Las más recientes van arriba.

## 27-11-2026
| # | Decisión | Aplicación técnica |
|---|---|---|
| 1 | Retirar el 50.º del selector y de las rutas activas, de forma reversible | `RETIRADAS` / `edicionActiva` en `js/campanas/indice.js`; el selector lo filtra y `begin()` lo bloquea. Se conservan código, pruebas y carga de partidas antiguas. Para reactivarlo basta con quitarlo de `RETIRADAS` |
| 2 | El 10.º queda excluido | No hay código del 10.º; no se crea |
| 3 | Canon: continuidad de las películas de la saga de Katniss; los libros son complementarios | Las diferencias se documentan y se aplica la versión de las películas (ver conflictos en `GIRA_75_CORRESPONDENCIAS_Y_PENDIENTES.md`, apartado 2) |
| 4 | Importar las 25 escenas de Gira/75.º como borrador, sin activar | `scripts/importar-gira-75.mjs` → `js/campanas/campana-gira-75.js` (`DRAFT_FOR_REVIEW`, no lo carga el juego) |
| 5 | Arena del 75.º: 75-07..75-15 se reparten en los acontecimientos existentes, manteniendo sus IDs | Tabla en el apartado 2 del informe; no se añade ningún acontecimiento |
| 6 | Sin sistema de variables nuevo | Tabla de equivalencias; 6 variables sin equivalente esperan a ChatGPT |
| 7 | ChatGPT completa cifras de efectos y variaciones del diario | Todos los valores quedan en `null` hasta entonces |
| 8 | El 74.º sigue sin aprobar hasta cerrar las 9 preguntas de `REVISION_74_PARA_CHATGPT.md` | `DRAFT_FOR_REVIEW`, no se juega |
| 9 | Reglas de GitHub sin cambios | Rama `integracion-cosecha-5x`, PR #1 en borrador, sin merge, sin Releases, sin despliegue |
