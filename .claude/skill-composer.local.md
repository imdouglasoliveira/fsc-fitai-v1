---
# Skill Composer Configuration
version: 1.0
mode: "interactive"
max_retries_per_skill: 2
default_coverage_target: 85
timeout_per_skill_minutes: 120
timeout_total_composition_minutes: 300
auto_approve_same_composition: false
allow_parallel_skills: false
---

# Skill Composer — Configuração Local

## Modo de Operação

**Atual:** `interactive` (padrão)

- **interactive**: Pede confirmação em cada gate
- **auto**: Aprova gates automaticamente se passarem
- **yolo**: Executa sem parar (não recomendado)

## Limites de Execução

- **Max retries por skill**: 2 tentativas
- **Timeout por skill**: 120 minutos
- **Timeout total**: 300 minutos (5 horas)

## Targets de Qualidade

### Coverage Padrão: 85%

- **Bug fixes**: 70-80% (regression focused)
- **Features**: 85% (comprehensive)
- **Critical paths**: 95%+ (exhaustive)

### Outros Targets

- **React Doctor**: zero critical issues allowed
- **QA Verdict**: PASS required (ou CONCERNS with doc)
- **Commit**: must succeed first try

## Approval Strategy

- **auto_approve_same_composition**: false
  - Se mesmo tipo de story, mesma composição? Requere confirmação sempre
  - Set to `true` para auto-aprovar repeats

## Parallel Execution

- **allow_parallel_skills**: false
  - Skills executam sequencialmente
  - Garante dependency resolution
  - Change to `true` apenas se skills são independentes

## Customizações

Edite acima conforme necessário. Defaults são conservadores.
