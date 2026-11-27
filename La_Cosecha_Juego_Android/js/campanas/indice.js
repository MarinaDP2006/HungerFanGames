// Registro de precampañas del motor común. Solo se juegan las que tienen estado APPROVED.
import { CAMPANA_74 } from './campana-74.js';
import { GIRA, CAMPANA_75 } from './estructuras.js';
import { JUGABLE } from '../precampana.js';

export const CAMPANAS = Object.freeze({ 74: CAMPANA_74, gira: GIRA, 75: CAMPANA_75 });

// Por clave del registro (74, 'gira', 75) o por campaign_id ('campaign_74').
export const campana = id => CAMPANAS[id] || Object.values(CAMPANAS).find(c => c.campaign_id === id) || null;
// Precampaña jugable para una edición del modo Historia, o null (entonces se usan las fases de siempre).
export function campanaJugable(edicion, registro = CAMPANAS) {
  const c = registro[edicion];
  return c && JUGABLE(c.status) ? c : null;
}

// Ediciones retiradas del juego activo (decisión de dirección del 27-11-2026). Retirada REVERSIBLE:
// no aparecen en el selector ni se pueden empezar, pero su código, pruebas y documentación se conservan
// y las partidas guardadas se siguen cargando y jugando. Para reactivar una, basta con quitarla de aquí.
export const RETIRADAS = Object.freeze({
  50: '50.º Vasallaje: retirado del juego activo; se conservan código, pruebas y partidas guardadas.',
});
// El 10.º Vasallaje no se desarrolla: no existe como campaña jugable.
export const edicionActiva = e => !(e in RETIRADAS);
