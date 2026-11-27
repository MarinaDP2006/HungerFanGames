# Checklist de aceptación creativa para Claude

## A. Recepción
- [ ] Todos los archivos del ZIP se han inventariado.
- [ ] Se han conservado los originales.
- [ ] Se han identificado documentos de estructura frente a guiones completos.
- [ ] Se ha registrado checksum y versión.
- [ ] No se ha asumido aprobación por el mero hecho de recibir un archivo.

## B. Narrativa
- [ ] Cada campaña tiene textos jugables, diálogos, opciones y efectos.
- [ ] No se han rellenado huecos mediante invención técnica.
- [ ] Los IDs aprobados se conservan.
- [ ] Los hitos canónicos no se contradicen.
- [ ] Las rutas alternativas están etiquetadas.
- [ ] Cada elección produce un efecto o se marca COSMETIC_ONLY.
- [ ] Diario y flags se actualizan sin duplicación.
- [ ] No hay escenas huérfanas ni referencias rotas.

## C. Protección 50.º
- [ ] No se han añadido eventos, turnos ni escenas.
- [ ] No se han añadido crónicas de muertes secundarias.
- [ ] No se han inventado encuentros entre rivales.
- [ ] El adaptador 5.5 solo modifica texto/etiquetas en eventos existentes.
- [ ] IDs, efectos y consecuencias permanecen idénticos.
- [ ] Módulos rechazados no se cargan ni se empaquetan como activos.

## D. Datos y continuidad
- [ ] Todos los IDs son únicos.
- [ ] Las relaciones apuntan a entidades existentes.
- [ ] La cronología no usa fechas inventadas.
- [ ] Cada registro tiene fuente y estado de canon.
- [ ] Distrito 13 está excluido de cosechas ordinarias.
- [ ] Mentores, vencedores, parentescos y estados vitales coinciden con la edición.
- [ ] El conocimiento de cada personaje es temporalmente válido.

## E. Roles
- [ ] Cada rol tiene ciclo jugable definido.
- [ ] Variables tienen tipo, rango y valor inicial.
- [ ] No se activan roles sin contenido suficiente.
- [ ] Las decisiones tienen consecuencias visibles.
- [ ] La perspectiva del rol no altera hechos base sin ruta alternativa explícita.

## F. Arte y audio
- [ ] Cada asset tiene ID, formato, dimensiones, licencia y alt text.
- [ ] Los conceptos no se presentan como assets finales.
- [ ] No se imitan actores ni fotogramas.
- [ ] Audio tiene licencia, loop, mezcla y fallback.
- [ ] WAV master no se empaqueta innecesariamente.
- [ ] No hay referencias rotas ni placeholders sin etiquetar.

## G. Web
- [ ] Web es archivo editorial, no copia del juego.
- [ ] No hay motor de Arena ni guardados de partidas.
- [ ] Todas las fichas muestran estado de canon y fuentes.
- [ ] Rutas, enlaces, búsqueda y 404 funcionan.
- [ ] No se incluyen capturas de juego ni secciones Android/servidor.

## H. Integración y QA
- [ ] Claude ha entregado mapa de correspondencias antes de integrar.
- [ ] Pruebas distinguen CI, local, emulador y dispositivo físico.
- [ ] Guardado/carga conserva flags y decisiones.
- [ ] No se duplican efectos tras reanudar.
- [ ] Android y Web comparten solo datos que realmente deban compartir.
- [ ] PR sigue en rama autorizada y `main` intacta.
- [ ] No hay Release ni despliegue sin autorización.

## Criterio de aceptación
Una sección solo pasa si todas sus casillas obligatorias están verificadas con evidencia. `STRUCTURE_ONLY` nunca equivale a `COMPLETE`.
