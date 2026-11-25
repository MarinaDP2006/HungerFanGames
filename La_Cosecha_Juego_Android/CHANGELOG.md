# Changelog

## 4.1 — revisión de sistemas
- Correcciones de coherencia canónica y selección de personajes.
- Nombres no identificados preservados como anónimos en las campañas.
- Aliados excluidos de objetivos de combate.
- Exportación de partidas JSON y registro presidencial de investigación del Distrito 13.
- Actualización de caché PWA.

# Registro de cambios

## 4.0.0 — expansión de la experiencia
- Arena de bosque con ilustración panorámica original integrada como terreno visual.
- Marcadores tácticos seleccionables para tributos, con animación de pulso y leyenda.
- Movimiento autónomo básico de rivales y seguimiento de aliados en el mapa.
- Sucesos dinámicos de Arena y variación de frecuencia de eliminaciones según dificultad.
- Sistema de señales sonoras sintetizadas con Web Audio: interfaz, alerta, fanfarria abstracta y cañonazo. No contiene grabaciones de las películas.
- Animaciones de entrada, estados y botones; diseño adaptable a móvil.
- Se conserva el guardado local y la configuración PWA/Capacitor.

## Limitaciones conocidas
- Es un juego web 2D de simulación narrativa, no un videojuego 3D de producción cinematográfica.
- La campaña de Haymitch necesita ampliar los nombres y biografías canónicas de los 48 tributos; no se inventan como si fueran oficiales.
- Las campañas 74 y 75 contienen personajes canónicos identificados, pero sus ramas narrativas aún no cubren todos los capítulos de las novelas.
- Los marcadores se dibujan sobre un mapa ilustrado; el terreno no es todavía un mapa navegable con colisiones ni pathfinding real.
- Las heridas son estados simplificados de juego, no un modelo médico exhaustivo.
- APK: se genera como artefacto de GitHub Actions al subir el repositorio y ejecutar el workflow. No se incluye un APK compilado en este ZIP.
