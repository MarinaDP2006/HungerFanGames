# HECHO

Estado a 27-11-2026 · rama `integracion-cosecha-5x` · Android 4.18.0 · Archivo de Panem 1.2

## Juego Android
- **App:** APK con Capacitor 7. CI compila, prueba en emulador (Android 14) y comprueba la actualización desde 4.9.
- **Guardado:**
  - formato 5, con doble copia (navegador y almacenamiento nativo) y suma de comprobación;
  - copia de seguridad antes de migrar;
  - exportar e importar;
  - registro de decisiones sin efectos duplicados;
  - pérdida medida: solo si la app se cierra antes de 100 ms tras guardar.
- **Modos:**
  - Historia: 74.º y 75.º en el selector; el 50.º está retirado de forma reversible;
  - Libre;
  - Presidente, con rebelión y guerra.
- **Arena (rediseñada en 4.15):** HUD fijo con barras, acciones en rejilla, postura segmentada; sectores, turnos, combate, inventario, heridas, patrocinadores y acontecimientos de campaña (8 en el 74.º y 8 en el 75.º) con finales.
- **Motor común de precampañas:**
  - escenas, opciones, efectos, condiciones y diario;
  - respuesta antes de avanzar;
  - ecos puros y deduplicados;
  - transferencia a la Arena idempotente.
- **74.º (jugable desde 4.16):**
  - 11 escenas, 33 opciones con respuesta y diario y 31 ecos;
  - `74_private_o3` pasa a `exceptional`.
- **Gira y 75.º (jugables desde 4.17):** la historia sigue del 74.º a la Gira, al 75.º y a su Arena con crónica en cada acontecimiento.
- **Ajustes:** texto, sonido, música y ambiente. El catálogo de audio está preparado, pero sin pistas.

## Web · Archivo de Panem
- **Navegación:** 12 secciones con rutas limpias (`/distritos/12`), menú definitivo y sin enlaces externos.
- **Contenido completo (1.2):** 13 distritos con expediente, Capitolio, 27 personajes, ediciones 74.º y 75.º, cronología, 14 lugares, Gira, Rebelión y Guerra y documentos; cada ficha con su estado de canon y su fuente.
- **Funcionamiento:** service worker y manifiesto.
- **Separación:** la web no contiene código del juego, y una prueba lo vigila.

## Común
- **Datos compartidos:** distritos y personajes, sincronizados en los dos productos.
- **Contratos Android/Web:** se comprueban en CI.
- **CI:** «Build Android APK» y «Archivo de Panem (Web)» en verde (último: 4.14.0).
- **Reglas de GitHub:** `main` intacta, PR #1 en borrador, sin merge, sin Release y sin despliegue.
