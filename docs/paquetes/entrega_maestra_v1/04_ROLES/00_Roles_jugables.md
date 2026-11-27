# Roles jugables y reglas narrativas

Los roles siguientes son diseño de producto. No deben confundirse con sistemas ya implementados.

## 1. Tributo
### Fantasía
Vivir los Juegos desde la vulnerabilidad del tributo, con decisiones sobre preparación, relaciones, recursos y supervivencia.
### Ciclo narrativo
Origen y distrito → cosecha → despedidas → traslado → preparación → desfile/entrevista → Arena → desenlace.
### Variables de rol
`tribute_skill_*`, `tribute_condition`, `public_image`, `sponsor_interest`, `alliance_state`, `resource_state`, `injury_state`.
### Límites
Las escenas canónicas deben conservar sus hitos; las rutas alternativas se etiquetan y registran.

## 2. Mentor
### Fantasía
Preparar y acompañar a uno o más tributos, gestionar recursos y construir una estrategia bajo presión.
### Ciclo narrativo
Asignación → evaluación del tributo → plan de entrenamiento → contactos → patrocinadores → decisiones durante la edición → resultado.
### Variables
`mentor_trust`, `training_plan`, `sponsor_network`, `public_strategy`, `tribute_readiness`.
### Límites
No conceder conocimiento omnisciente sobre la Arena. Las decisiones del mentor deben tener costes y límites de recursos.

## 3. Presidente
### Fantasía
Administrar el Capitolio y Panem, mantener poder y gestionar estabilidad, propaganda y crisis.
### Ciclo narrativo
Mandato → indicadores → crisis → decisión → reacción de distritos/instituciones → nueva situación.
### Variables
`regime_stability`, `district_unrest`, `capitol_support`, `security_pressure`, `supply_balance`, `propaganda_reach`, `war_risk`.
### Límites
No reducir toda la política a una puntuación. Registrar consecuencias civiles y contradicciones entre objetivos.

## 4. Habitante de distrito
### Fantasía
Experiencia narrativa local, centrada en trabajo, familia, comunidad, restricciones y decisiones cotidianas.
### Ciclo narrativo
Identidad y distrito → vida diaria → incidente → elección → consecuencias comunitarias.
### Variables
`household_security`, `local_trust`, `ration_state`, `surveillance_exposure`, `community_support`.
### Límites
No atribuir al personaje acceso a información secreta que no pueda conocer.

## 5. Habitante del Capitolio (extensión)
Diseño previsto, no requisito de primera integración: vida en el Capitolio, medios, instituciones, privilegio y disonancia moral. Debe mantenerse como `FUTURE_ROLE` hasta tener guion aprobado.

## Reglas compartidas
- El rol cambia la perspectiva, no los hechos base del mundo.
- Las decisiones se guardan como eventos inmutables de partida.
- Las relaciones tienen valores y etiquetas legibles.
- La muerte o desaparición de personajes requiere un evento narrativo aprobado.
- No activar roles que no tengan campaña/escenas y objetivos jugables suficientes.
