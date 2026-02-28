# 🧰 Best Practices

**Slug:** `bestPractices`  
**Missão:** reduzir dívida técnica e padronizar.

## Focos
- DRY/KISS/SOLID; remover dead code.  
- TS estrito; tipos nos boundaries (API, hooks, services).  
- Componentes puros e pequenos; separar lógica vs UI.  
- Hooks bem usados (memo/useCallback/useMemo quando útil).  
- Estado coeso; evitar prop drilling; usar query libs.  
- Tratamento de erros previsível (ErrorBoundary + toasts).  
- A11y: foco, aria, contraste, navegação por teclado.  
- Testes úteis (unit/integration/e2e).

## Procedimento
1) Preflight (Git/SSH + Prompt Geral).  
2) Fazer auditoria rápida do repo (estrutura, padrões, testes).  
3) Priorizar refactors (P0/P1/P2) com foco em impacto vs esforço.  
4) Abrir tasks com DoD, riscos e, quando fizer sentido, plano de migração incremental.

## DoD
- CI verde; lints/format/testing passando.  
- Métricas claras: redução de LOC duplicado, queda de bundle, aumento de cobertura.
