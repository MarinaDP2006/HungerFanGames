# La Cosecha 4.3 — estado de implementación

## Sistemas ampliados

### Arena y combate
- Combate con posturas ofensiva, defensiva, equilibrada y evasiva.
- Armas seleccionables si están presentes en el inventario.
- Lesiones diferenciadas (contusión, corte, esguince, fractura, quemadura e infección), gravedad, penalización y efectos con el paso de los turnos.
- Tratamiento con botiquín o reposo; fatiga acumulativa y penalización en combate.
- Entrevista con elección de enfoque, puntuación y efectos en apoyo y patrocinio.

### Campañas
- Se han añadido acontecimientos narrativos ramificados para las ediciones 50, 74 y 75.
- Se incluyen decisiones de cierre distintas para el Segundo Vasallaje, los 74.º Juegos y el 75.º Vasallaje.
- Los nombres canónicos desconocidos siguen siendo anónimos; no se han inventado identidades oficiales para completar listas.

### Presidencia
- La gestión diaria actualiza recursos alimentarios, estabilidad, moral y población por distrito, además de economía y orden nacionales.
- La rebelión escala por fases: control, resistencia, levantamientos, guerra civil y posguerra.
- La fase de posguerra permite reconstrucción, apertura de archivos, reconciliación o purga de mandos.
- Se añaden decisiones de inversión en infraestructura y racionamiento.

## Pruebas realizadas
- `node --check` sobre los archivos JavaScript de juego y web.
- Pruebas automatizadas de lógica para las tres campañas, eventos y desenlaces.
- Comprobación de consistencia de las copias del código en la web, el proyecto Android y su carpeta `www`.
- Integridad de los ZIP tras su generación.

## Límites conocidos
- Las campañas todavía no son adaptaciones completas capítulo por capítulo de las novelas; los eventos añadidos son una estructura ramificada jugable, no todo el guion.
- Los mapas siguen siendo 2D abstractos, sin colisiones físicas, navegación 3D ni pathfinding avanzado.
- La simulación presidencial es agregada y estratégica; no simula cada habitante, cadena logística, presupuesto granular ni todas las instituciones de Panem.
- Las lesiones tienen efectos de juego, no constituyen una simulación médica exhaustiva.
- No se incluyen fotografías de actores ni fotogramas de películas sin licencia.
- El APK aún debe compilarse en Android SDK/Gradle o mediante GitHub Actions y probarse en un dispositivo real.
