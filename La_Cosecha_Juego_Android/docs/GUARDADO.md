# Guardado en Android (desde 4.10)

## Qué se guarda y dónde
| Dato | Claves | Copia local (WebView) | Copia nativa (Android) |
|---|---|---|---|
| Partidas | `laCosechaSave:1`, `:2`, `:3` | `localStorage` | `@capacitor/preferences` → SharedPreferences `CapacitorStorage` |
| Partida antigua de ranura única | `laCosechaSave`, `laCosechaSaveMigrated` | sí | sí |
| Ajustes | `laCosechaSettings` | sí | sí |

El código está en `js/durable-storage.js` y `js/saves.js`. En la Web no hay Capacitor: todo sigue igual, solo con `localStorage`.

## Por qué dos copias
El WebView de Android escribe `localStorage` en disco con unos segundos de retraso. En la versión 4.9 el emulador lo demostró: si Android mataba la app justo después de guardar, al volver faltaban las últimas escenas.

La copia nativa se escribe a la vez, fuera del WebView, y no depende de ese retraso.

## Cómo se guarda
1. El juego escribe la ranura en la copia local, que es inmediata y síncrona, y la manda a la copia nativa.
2. Cada ranura lleva `savedAt` y una huella `checksum` (FNV-1a de la partida).
3. SharedPreferences escribe con archivo de respaldo, así que un cierre en mitad de una escritura no deja el archivo a medias.
4. Si la copia nativa falla, la partida queda guardada en local y el juego sigue: el error se anota en la consola.
5. Si falla la local (por ejemplo, por falta de espacio), queda la nativa.

## Cómo se recupera al abrir la app
Para cada clave se comparan las dos copias:
| Situación | Resultado |
|---|---|
| Iguales | Nada |
| Solo local (partidas de 4.9 o anteriores) | Se copian a la nativa. **Migración: no se borra ni se cambia nada local** |
| Solo nativa (el WebView perdió el dato) | Se restaura en local |
| Distintas | Gana la copia íntegra (JSON válido y huella correcta); si las dos lo son, la de `savedAt` más reciente |

Las pantallas de Partidas y Ajustes esperan a que termine esta comparación, que dura unos milisegundos.

## Formato
- `saveVersion` sigue en **4**. `checksum` es un campo opcional: las partidas sin él (4.9) se leen igual.
- Una ranura cuya huella no cuadra se marca como dañada; si la otra copia está bien, se usa esa.
- Exportar e importar no cambian, y se siguen aceptando las exportaciones antiguas (`version: 3`).

## Pruebas
| Dónde | Qué |
|---|---|
| `tests/durable-storage.test.mjs` (CI) | 12 casos: doble escritura y borrado; cierre forzado con pérdida en el WebView; WebView vacío; migración desde 4.9 sin tocar lo local; ranura única antigua; copia cortada o alterada; la más reciente gana; fallo de la copia nativa; falta de espacio en local; exportar e importar |
| `tests/device/android-e2e.mjs` (CI, emulador) | Guardado nativo activo. Cierre forzado medio segundo después de guardar, sin pasar a segundo plano, y la partida carga en la misma escena. La copia nativa se lee con `run-as`. Borrar quita las dos copias |
| `tests/device/upgrade-prepare.mjs` (CI, emulador) | Instala el APK 4.9.0, deja una partida, instala el nuevo encima y comprueba que la partida sigue, carga y pasa a la copia nativa |

## Limitaciones
- **Margen residual.** Si Android mata la app en las primeras décimas de segundo después de guardar, esa última partida se pierde. Ver la sección siguiente. **El guardado no es infalible.**
- **Borrado con cierre inmediato.** Si se borra una partida y Android mata la app en ese mismo instante, la partida puede volver a aparecer. Se prefiere eso a perder datos.
- **Primer arranque tras actualizar.** Si se empieza una partida nueva en los primeros milisegundos del arranque, antes de la comparación, la elección de ranura libre usa lo local. En la práctica no da tiempo.
- **Desinstalar borra las dos copias.** Para conservar partidas, usa Exportar.

## Margen residual de pérdida (medido)

### Por qué existe
Entre «el juego guarda» y «la partida está en el disco del móvil» hay tres pasos, y ninguno es instantáneo:
1. **Puente de Capacitor.** El WebView pasa la escritura a Android de forma asíncrona.
2. **SharedPreferences `apply()`.** El plugin oficial (`@capacitor/preferences` 7.0.4, `Preferences.java`) usa `editor.apply()`. Deja el dato en memoria al momento y lo escribe en disco poco después, en un hilo aparte, reescribiendo el archivo entero (`CapacitorStorage.xml`, unos 28 KB por partida).
3. **Copia del WebView.** Chromium la graba con un retraso de segundos; no sirve como red en este margen.

Si el proceso muere (cierre forzado, falta de memoria, un fallo, el ahorro de batería de algunos fabricantes) antes del paso 2, la partida nueva se pierde. Al abrir la app se carga la **anterior**: no se corrompe nada, porque SharedPreferences escribe con archivo de respaldo y cada ranura lleva su huella.

### Medición (CI, emulador Android 14, ejecución 45996263112)
`tests/device/ventana-perdida.mjs`:
- Cierra la app con `am force-stop` a distintos milisegundos de un guardado, 3 veces cada uno.
- Lee la copia nativa del disco y abre la app para ver qué se recupera.
- La confirmación de Android (pasos 1 y 2 en memoria) tardó **16–20 ms**.

| Orden de cierre tras guardar | Copia nativa ya en disco | Partida recuperada |
|---|---|---|
| 0–50 ms | 0/15 | 0/15 (se carga la partida anterior) |
| 100 ms | 3/3 | 3/3 |
| 250 ms | 3/3 | 3/3 |
| 1000 ms | 3/3 | 3/3 |

`am force-stop` tarda además entre 56 y 119 ms en matar el proceso. Así que el límite real en este emulador está entre **unos 50 y unos 200 ms** después de guardar. En la 4.9, sin copia nativa, se perdían escenas guardadas varios segundos antes.

### Qué no está medido
- **Un móvil físico.** El almacenamiento, la carga y el fabricante cambian el margen. La medición está preparada para lanzarla por USB (`docs/PRUEBA_MOVIL_FISICO.md`).
- **Pasar a segundo plano o cambiar de app justo después de guardar.** Android espera a las escrituras `apply()` pendientes cuando la actividad se detiene (`onStop`), así que en ese caso no debería perderse nada. Es comportamiento documentado de Android, **no comprobado** aquí.
- **Varias partidas grandes.** Con las tres ranuras llenas el archivo crece y su escritura puede tardar algo más.

### Cómo se podría estrechar (sin implementar; necesita autorización)
- **Plugin nativo propio** que escriba con `commit()` (síncrono) dentro de la llamada del puente. Quedaría solo el viaje por el puente (unos 17 ms medidos).
- **Un archivo por ranura** en lugar de un único XML, para escribir menos datos en cada guardado.

Ninguna de las dos lleva el margen a cero: el puente entre el WebView y Android siempre es asíncrono.
