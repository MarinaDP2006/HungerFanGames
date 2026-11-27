// Gira de la Victoria y 75.º Vasallaje: solo la estructura entregada (IDs de escena y orden).
// STRUCTURE_ONLY: no hay texto, opciones ni efectos aprobados, así que el motor no permite jugarlas.
// Fuente: docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/02_Gira_y_75_v1/narrativa/.
// Las variables de continuidad están pendientes de unificar (inventario, discrepancia 7).
const escena = (scene_id, sequence) => Object.freeze({ scene_id, sequence, title: null, text: null, options: [], status: 'BLOCKED_CREATIVE' });
const fuente = 'docs/paquetes/entrega_maestra_v1/00_FUENTES_APROBADAS/02_Gira_y_75_v1/narrativa/';

export const GIRA = Object.freeze({
  campaign_id: 'gira', title: 'Gira de la Victoria', status: 'STRUCTURE_ONLY', source_version: '02_Gira_y_75_v1', source_ref: fuente + 'Gira_de_la_Victoria_Estructura_y_Escenas.md',
  variables: [],
  scenes: ['tour_departure', 'tour_train', 'tour_district_11', 'tour_districts', 'tour_capitol_return', 'tour_private_pressure', 'tour_aftermath'].map((id, i) => escena(id, i + 1)),
});

export const CAMPANA_75 = Object.freeze({
  campaign_id: '75', title: '75.º Vasallaje · precampaña', status: 'STRUCTURE_ONLY', source_version: '02_Gira_y_75_v1', source_ref: fuente + '75_Vasallaje_Estructura_y_Escenas.md',
  variables: [],
  scenes: ['75_aftermath_tour', '75_reaping', '75_departure', '75_train', '75_capitol_arrival', '75_prep', '75_training', '75_private_session', '75_interview', '75_arena_launch'].map((id, i) => escena(id, i + 1)),
});
