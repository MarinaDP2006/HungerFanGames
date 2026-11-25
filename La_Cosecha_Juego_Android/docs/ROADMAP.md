# Estado del proyecto — versión 4.2

## Implementado
- PWA adaptable y estructura Capacitor para Android.
- Tres modalidades: campañas de historia (50, 74 y 75), edición libre y presidencia de Panem.
- Roster conocido para campañas 74/75 y 48 plazas en el Segundo Vasallaje; los participantes no identificados se mantienen anónimos.
- Fases de cosecha, entrenamiento y Arena.
- Arena 2D ilustrada con doce sectores conectados, movimiento entre sectores adyacentes, descubrimiento, recursos locales agotables y amenazas con riesgo sectorial.
- IA rival con movimiento por sectores, encuentros locales, alianzas y combate limitado a tributos presentes en el mismo sector.
- Supervivencia con hambre, sed, salud, heridas, recuperación, apoyo y patrocinio simplificados.
- Presidencia con indicadores agregados y acciones de gobierno; Distrito 13 tiene una revelación narrativa básica.
- Guardado local, exportación JSON y sonidos originales sintetizados.
- Prueba de humo automatizada de navegación: campaña 50, preparación, entrada a Arena, movimiento sectorial y acción de supervivencia.

## Pendiente para una versión realmente completa
1. Campañas 50, 74 y 75 desarrolladas como capítulos completos, con escenas, personajes, diálogos y ramificaciones persistentes.
2. Auditoría canónica exhaustiva de nombres, acontecimientos, reglas y cronología.
3. Arena con navegación espacial real, colisiones, rutas/pathfinding, línea de visión, clima y sectores específicos por edición.
4. Combate táctico profundo: inventario utilizable, armas, alcance, iniciativa, defensa, heridas localizadas, infecciones, tratamientos y secuelas.
5. Entrevistas, puntuaciones, mentores, patrocinadores y gestión audiovisual de la retransmisión.
6. Presidencia sistémica: población dinámica, economía y logística, leyes, facciones, operaciones rebeldes y crisis políticas.
7. Campaña de rebelión y posguerra con operaciones y consecuencias persistentes.
8. Guardados múltiples e importación JSON, sincronización opcional y batería amplia de pruebas.
9. Pruebas en navegadores y dispositivos Android reales, accesibilidad, rendimiento y balance.
10. Compilar y probar el APK debug en CI; preparar firma release si se va a distribuir.

## Límites conocidos
- La Arena es una simulación táctica abstracta 2D, no una recreación 3D ni un sistema físico de pathfinding.
- Los efectos de riesgo y encuentros usan probabilidades simplificadas.
- El combate no sustituye todavía un sistema completo de armas, inventario y lesiones.
- El arte incluido es original; no se redistribuyen fotografías de actores, fotogramas ni música de las películas.
- El APK no está compilado dentro del ZIP: el workflow de GitHub Actions genera el artefacto.
