# Contrato de assets y localización

## Identidad de recurso
Cada recurso debe tener:
`asset_id`, `path`, `type`, `campaign_tags[]`, `role_tags[]`, `resolution`, `aspect_ratio`, `format`, `license`, `creator`, `source`, `status`, `alt_text`, `checksum`.

## Estados
`CONCEPT`, `DRAFT`, `APPROVED`, `OPTIMIZED`, `INTEGRATED`, `VERIFIED`, `REJECTED`.

## Reglas
- No referenciar un asset por nombre de archivo sin manifest.
- No sobrescribir el original al optimizar.
- Mantener master y derivados separados.
- Los textos dentro de carteles conceptuales no son textos de interfaz.
- Los recursos temporales deben marcarse `PLACEHOLDER`.
- Cada asset visible debe tener descripción accesible.
- El audio requiere licencia y volumen normalizado.
- Los archivos WAV master no se empaquetan en APK si existe OGG optimizado y autorizado.

## Localización
Los textos narrativos deben vivir fuera del código. Cada clave debe tener `text_id`, idioma, texto, versión, escena, autoría y estado. No fragmentar una frase narrativa en concatenaciones técnicas.
