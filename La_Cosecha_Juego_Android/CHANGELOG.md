# Changelog

## 4.4
- Ampliación de eventos y relaciones de las campañas 50, 74 y 75.
- Sistema estratégico de guerra civil con frentes, mando, suministros, evacuación, negociación y ayuda humanitaria.
- Transición de la guerra a posguerra según el resultado de los frentes.

## 4.3 — combate, campañas y crisis nacional
- Sistema de lesiones tipificadas con gravedad, penalizaciones, fatiga, evolución y tratamiento con botiquín o reposo.
- Posturas de combate y selección de armas disponibles en inventario; resolución de enfrentamientos con rivales del mismo sector.
- Entrevistas televisadas con decisiones que afectan al apoyo público y a la confianza de patrocinadores.
- Acontecimientos ramificados para las campañas 50, 74 y 75, con decisiones sobre Maysilee, Rue, Finnick, la barrera de la Arena y el reloj.
- Decisiones de desenlace diferenciadas para las tres campañas.
- Simulación presidencial con evolución diaria de alimentos, estabilidad, moral, población, economía y recursos.
- Escalada de resistencia, levantamientos, guerra civil y fase de posguerra con opciones de reconstrucción, verdad y reconciliación.
- Nuevas políticas de distrito: infraestructura y racionamiento.
- Importación y exportación de partidas en JSON, con validación básica del archivo y renovación de caché PWA.

## 4.2 - Simulación táctica por sectores
- Arena dividida en doce sectores conectados, con terreno, riesgo y recursos definidos.
- Movimiento limitado a sectores contiguos y descubrimiento progresivo del mapa.
- Recursos por sector, agotamiento de puntos de recolección y amenazas activadas por Vigilantes.
- IA rival con desplazamiento sectorial, encuentros locales, alianzas y combate limitado a rivales presentes.
- Turnos de Arena unificados con hambre, sed, salud, amenazas y eliminaciones.

## 4.1 — revisión de sistemas
- Correcciones de coherencia canónica y selección de personajes.
- Nombres no identificados preservados como anónimos en las campañas.
- Aliados excluidos de objetivos de combate.
- Exportación de partidas JSON y registro presidencial de investigación del Distrito 13.
- Actualización de caché PWA.

## 4.0.0 — expansión de la experiencia
- Arena de bosque con ilustración panorámica original integrada como terreno visual.
- Marcadores tácticos seleccionables para tributos, con animación de pulso y leyenda.
- Movimiento autónomo básico de rivales y seguimiento de aliados en el mapa.
- Sucesos dinámicos de Arena y variación de frecuencia de eliminaciones según dificultad.
- Sistema de señales sonoras sintetizadas con Web Audio: interfaz, alerta, fanfarria abstracta y cañonazo. No contiene grabaciones de las películas.
- Animaciones de entrada, estados y botones; diseño adaptable a móvil.
- Se conserva el guardado local y la configuración PWA/Capacitor.

### Limitaciones conocidas (4.0.0)
- Es un juego web 2D de simulación narrativa, no un videojuego 3D de producción cinematográfica.
- La campaña de Haymitch necesita ampliar los nombres y biografías canónicas de los 48 tributos; no se inventan como si fueran oficiales.
- Las campañas 74 y 75 contienen personajes canónicos identificados, pero sus ramas narrativas aún no cubren todos los capítulos de las novelas.
- Los marcadores se dibujan sobre un mapa ilustrado; el terreno no es todavía un mapa navegable con colisiones ni pathfinding real.
- Las heridas son estados simplificados de juego, no un modelo médico exhaustivo.
- APK: se genera como artefacto de GitHub Actions al subir el repositorio y ejecutar el workflow. No se incluye un APK compilado en este ZIP.
