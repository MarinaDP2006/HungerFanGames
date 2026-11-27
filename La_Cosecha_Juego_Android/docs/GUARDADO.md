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
- **Ventana mínima.** La copia nativa viaja por el puente de Capacitor, que es asíncrono: queda una ventana de milisegundos entre pulsar y que Android la registre. Es mucho menor que la anterior (segundos), pero no es cero.
- **Borrado con cierre inmediato.** Si se borra una partida y Android mata la app en ese mismo instante, la partida puede volver a aparecer. Se prefiere eso a perder datos.
- **Primer arranque tras actualizar.** Si se empieza una partida nueva en los primeros milisegundos del arranque, antes de la comparación, la elección de ranura libre usa lo local. En la práctica no da tiempo.
- **Desinstalar borra las dos copias.** Para conservar partidas, usa Exportar.
