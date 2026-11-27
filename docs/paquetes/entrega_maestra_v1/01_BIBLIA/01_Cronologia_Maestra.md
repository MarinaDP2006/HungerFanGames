# Cronología maestra y ventanas de continuidad

## Ediciones y arcos cubiertos
- 50.º Vasallaje: edición especial ya implementada parcialmente. Contenido narrativo protegido.
- 74.º Juegos: precampaña de once escenas suministrada; módulo Arena existente.
- Gira de la Victoria: arco posterior a una victoria, previo a la edición siguiente. Su duración y escenas concretas deben quedar asociadas al estado de la partida y no inventarse como canon universal.
- 75.º Vasallaje: edición especial posterior a la Gira; debe conservar su condición de edición con tributos vencedores y Arena del reloj en la continuidad correspondiente.
- Rebelión: arco político y social que se desarrolla a partir de tensiones y decisiones previas.
- Guerra y caída: arco de conflicto, desenlace y consecuencias políticas.

## Esquema temporal ejecutable
Cada evento narrativo tendrá:
`event_id`, `timeline_id`, `campaign_id`, `sequence`, `time_anchor`, `location_id`, `participants[]`, `prerequisites[]`, `outcomes[]`, `canon_status`.

`time_anchor` puede ser:
- `RELATIVE_TO_CAMPAIGN_START`
- `AFTER_EVENT:<event_id>`
- `BEFORE_CAMPAIGN:<campaign_id>`
- `PLAYER_TRIGGERED`

No asignar fechas exactas si no están confirmadas por una fuente aprobada. Usar `date_precision: "relative"`.

## Hitos no negociables
El canon de referencia no se altera por omisión accidental. Si el jugador elige una divergencia, crear un `ALT_ROUTE` explícito, registrar el punto de divergencia y recalcular únicamente los eventos dependientes.
