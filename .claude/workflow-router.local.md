---
# Workflow Router Configuration
version: 1.0
routing_mode: "intelligent"
use_historical_data: true
min_confidence_threshold: 0.70
allow_user_override: true
log_routing_decisions: true
scoring_weights:
  clarity: 0.35
  complexity: 0.30
  time: 0.20
  resources: 0.15
---

# Workflow Router — Configuração Local

## Modo de Roteamento

**Atual:** `intelligent` (baseado em dados)

- **intelligent**: Analisa dados + histórico, recomenda melhor workflow
- **simple**: Matriz pré-definida (mais rápido, menos flexível)
- **manual**: Usuário sempre escolhe (não recomendado)

## Thresholds de Confiança

- **Min confidence para aceitar recomendação:** 0.70
- **Abaixo disso:** Requer revisão manual

## Pesos de Scoring

- **Clarity:** 35% (mais importante)
- **Complexity:** 30%
- **Time pressure:** 20%
- **Resources:** 15%

## Histórico & Dados

- **use_historical_data**: true
  - Queries decision-log.json para padrões
  - Ajusta confiança baseado em taxa de sucesso
- **allow_user_override**: true
  - Usuário pode escolher diferente
  - Override é registrado com reasoning
- **log_routing_decisions**: true
  - Toda decisão de routing é capturada

## Integração

Workflow Router trabalha com:
- Ralph Governor (confirms workflow selection)
- Skill Composer (selects composition)
- Memory Manager (logs decision + outcome)
