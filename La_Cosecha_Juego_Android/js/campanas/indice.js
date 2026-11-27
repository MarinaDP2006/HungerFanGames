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
