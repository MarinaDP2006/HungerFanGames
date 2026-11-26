# Changelog

## 4.5 — imágenes y pulido de la web
- Imágenes optimizadas en `assets/optimized/` (WebP + JPG de respaldo): la portada pasa de ~5,4 MB en PNG a ~170 KB.
- Nueva portada del Capitolio sin los botones dibujados dentro de la imagen, sin la figura del menú y sin el emblema de la saga en el estandarte; versión 2× más nítida.
- Retratos de tributos en WebP con carga diferida, texto alternativo y tamaños fijos (sin saltos de diseño).
- Tarjetas del inicio con imágenes distintas por modo (Arena, tributo, Capitolio) y ligero zoom al pasar el ratón.
- Nuevo icono original (gavilla de trigo) con variante *maskable* para Android e icono para iOS.
- Animación suave de la portada, foco visible para teclado y respeto a «reducir movimiento».
- Service worker v4-5: precarga las imágenes nuevas y ya no devuelve el HTML cuando falla una imagen.
- Corregido: el modo libre mostraba el texto y las decisiones del 75.º Vasallaje (Haymitch, vencedores).
- Corregido: errata «CORNucopia» en el mapa.
- Pruebas: regresión del modo libre y comprobación de que existen todos los recursos referenciados.
- No se ha borrado ninguna imagen original; `menu-panem.png` y los iconos antiguos se conservan aunque ya no se usan.

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
