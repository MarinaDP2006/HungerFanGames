# La Cosecha 5.1 · Campaña del 50.º Vasallaje

## Qué añade esta entrega

Esta ampliación desarrolla la parte anterior a la Arena del Segundo Vasallaje mediante nueve escenas originales:

1. La cosecha.
2. El incidente de Woodbine Chance.
3. La despedida en el Distrito 12.
4. El viaje en tren y la relación entre los cuatro tributos del distrito.
5. La llegada al Capitolio.
6. El entrenamiento.
7. El accidente del desfile y la sustitución de Louella por Lou Lou.
8. La entrevista televisada.
9. La última noche y la alianza con Maysilee.

Las decisiones registran vínculos, observación, determinación, sigilo, preparación, apoyo, rebelión y sospecha. Al terminar la última escena, sus consecuencias se aplican a la partida y el juego entra en la Arena.

## Reparto y continuidad

- La Arena contiene 48 plazas: cuatro tributos por distrito.
- El grupo del Distrito 12 que llega a la Arena está formado por Haymitch, Maysilee, Wyatt y Lou Lou.
- Louella McCoy no aparece como tributo vivo de la Arena: su muerte ocurre antes de los Juegos y el Capitolio la sustituye por Lou Lou.
- Woodbine Chance participa en el incidente de la cosecha, pero no ocupa una de las 48 plazas de la Arena.
- Los tributos secundarios cuyo nombre no se ha podido confirmar se mantienen como plazas anónimas. No se inventan nombres para completar la lista.
- El archivo `campaign-50th-prearena.js` conserva los datos narrativos separados del motor de interfaz.

## Integración

Desde la raíz del repositorio:

```bash
# 1. Copiar el contenido de esta entrega en la raíz del repositorio.
# 2. Aplicar las modificaciones de integración:
node scripts/apply-5.1-campaign50.mjs

# 3. Ejecutar la prueba específica:
node La_Cosecha_Juego_Android/tests/campaign-50th-prearena.mjs

# 4. Ejecutar también las pruebas existentes:
cd La_Cosecha_Juego_Android
node tests/smoke.mjs
node tests/campaigns.mjs
node tests/presidency.mjs
node tests/saves.mjs
```

El script de integración:
- importa el módulo narrativo en `app.js`;
- sustituye el roster genérico de 48 plazas por uno de 48 tributos con cuatro por distrito;
- añade la interfaz de las nueve escenas pre-Arena;
- aplica las decisiones a las relaciones y estadísticas;
- limita a una vez cada ejercicio de entrenamiento;
- incorpora la prueba específica al workflow Android.

Es idempotente: si ya está aplicado, no vuelve a duplicar las modificaciones. Si el código base no coincide con la versión esperada, se detiene con un error en lugar de modificar a ciegas.

## Archivos

- `La_Cosecha_Juego_Android/js/campaign-50th-prearena.js`: roster, escenas, decisiones, efectos y renderizado de la expansión.
- `La_Cosecha_Juego_Android/tests/campaign-50th-prearena.mjs`: pruebas de roster, continuidad y efectos.
- `scripts/apply-5.1-campaign50.mjs`: integración controlada en el `app.js` existente y en el workflow.
- `La_Cosecha_Juego_Android/js/music.js` y `assets/audio/`: audio original de la entrega 5.0.
- `docs/`: fuentes, canon y notas de derechos.

## Límites conocidos

Esta entrega amplía la campaña previa a la Arena, pero no completa todavía la totalidad del videojuego. No afirma que los 48 tributos tengan retratos individuales oficiales, ni incorpora fotografías de actores o música comercial protegida. Los retratos y materiales oficiales deben utilizarse únicamente desde fuentes autorizadas y con los derechos correspondientes.

La prueba local de este paquete verifica el módulo narrativo. La integración con el motor y la compilación Android deben ejecutarse en el repositorio real antes de declarar la versión lista.
