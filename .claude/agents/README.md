# Índice de Agentes

Este arquivo serve como referência rápida para o Orchestrator e outros agentes localizarem o especialista correto para cada tarefa.

| Agente | Slug | Missão / Descrição | Prioridade de Consulta |
| :--- | :--- | :--- | :--- |
| **Orchestrator** | `orchestrator` | Interpretar pedidos, rotear para agentes, criar tasks e despachar. | **1 (Entrada)** |
| **Backend** | `backend` | Modelagem segura, APIs estáveis e observáveis. Banco, filas e integração. | Alta (APIs/DB) |
| **Security** | `security` | Auditor de segurança. Localizar riscos, priorizar e validar proteções. | Alta (Crítico) |
| **UI/UX Planner** | `uiuxPlanner` | Diagnosticar e propor melhorias de UX, acessibilidade e consistência visual. | Alta (Frontend) |
| **Debugger** | `debugger` | Achar causa-raiz de erros, formular hipóteses e planejar correção. | Alta (Bugs) |
| **Best Practices** | `bestPractices` | Reduzir dívida técnica, padronizar código (DRY/SOLID) e melhorar qualidade. | Média |
| **Component Architect** | `componentArchitect` | Eliminar duplicações criando componentes reutilizáveis (Design System). | Média |
| **TanStack Migrator** | `tanstackMigrator` | Migrar rotas para TanStack Router com mínimo risco e paridade funcional. | Específica |
| **Tests** | `tests` | Aumentar confiabilidade e cobertura útil (Unit, E2E, Contract). | Média |
| **Performance** | `perf` | Medir baseline (Lighthouse/Bundle) e entregar otimizações verificáveis. | Específica |
| **DevOps** | `devops` | Pipelines CI/CD rápidos, preview apps e rollbacks testados. | Infra |
| **Tasks Writer** | `tasksWriter` | Transformar pedidos difusos em tasks claras e acionáveis. | Suporte |
| **Tasks Executor** | `tasksExecutor` | Executar tasks (P0->P2) com PRs pequenos e validáveis. | Execução |
| **Desk Manager** | `deskManager` | Gerenciar ciclo de vida das DESKs (criação, compactação, índice). | Gestão |
| **Desk Compactor** | `deskCompactor` | Gerar resumos (`compact.md`) de DESKs para economizar contexto. | Gestão |

## Como usar este Índice

1. **Identifique a natureza da tarefa** (ex: criar uma API, corrigir um bug visual, melhorar performance).
2. **Localize o Agente** correspondente na tabela acima.
3. **Leia o arquivo do agente** (`.claude/agents/<slug>.system.md`) para entender seu **Procedimento** e **DoD** específicos.
4. **Incorpore as regras** desse agente no seu plano (SPEC) ou código.
