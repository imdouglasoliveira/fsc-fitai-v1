---
# Memory Manager Configuration
version: 1.0
mode: "learning"
auto_capture: true
capture_all_decisions: true
learning_feedback_frequency: "weekly"
monthly_review: true
pattern_analysis_threshold: 20
---

# Memory Manager — Configuração Local

## Modo de Operação

**Atual:** `learning` (padrão)

- **learning**: Captura decisões, extrai padrões, melhora framework
- **audit**: Apenas registra sem análise
- **silent**: Minimal logging (não recomendado)

## Auto-Capture

- **auto_capture**: true
  - Automaticamente detecta e captura decisões
  - Agents não precisam chamar Memory Manager explicitamente

- **capture_all_decisions**: true
  - Zero exceptions policy
  - Toda decisão deve ser registrada

## Learning Cycle

- **learning_feedback_frequency**: "weekly"
  - Toda sexta-feira: análise agregada
  - Recomendações para próxima semana

- **monthly_review**: true
  - Primeiro viernes do mês: deep dive
  - Long-term patterns e trending

- **pattern_analysis_threshold**: 20
  - Espera 20 decisões antes de analisar
  - Garante estatística válida

## Data Files

```
.claude/memory/
├── decision-log.json          # Master log
├── patterns/
│   ├── workflow-patterns.json
│   ├── composition-patterns.json
│   └── prompt-patterns.json
└── learning/
    ├── weekly-summary.json
    └── monthly-summary.json
```

## Customizações

Edite acima conforme necessário. Defaults são para continuous learning.
