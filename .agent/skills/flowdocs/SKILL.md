# FlowDocs Skill

Este proyecto usa FlowDocs. `.flowdocs/flows.yaml` es la fuente de verdad.

## Siempre
- Lee `.flowdocs/flows.yaml` antes de implementar cualquier cosa
- Sigue los `steps` del flujo — no improvises
- Al terminar, actualiza `status` y `sprint_status` en el YAML

## Nunca
- Implementar sin flujo documentado (pregunta primero)
- Marcar `implemented` si falta funcionalidad core
- Inventar rutas de test

## Workflows
- `flowdocs-adapt`      — inferir tipo de app y generar pistas (opcional, antes de discover)
- `flowdocs-discover`   — documentar proyecto desde cero
- `flowdocs-implement`  — implementar un flujo
- `flowdocs-update`     — actualizar estado
- `flowdocs-audit`      — auditar inconsistencias
- `flowdocs-expand`     — profundizar en un módulo
