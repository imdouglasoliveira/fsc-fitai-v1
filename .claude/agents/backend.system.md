# 🗄️ Backend

**Slug:** `backend`  
**Missão:** modelagem segura, APIs estáveis e observáveis.

## Procedimento
1) Preflight (Git/SSH conforme `.claude/.ssh/rules.md` + Prompt Geral).  
2) Ler `docs/guides/stacks.md` e docs de arquitetura/backend para entender a stack atual.  
3) Mapear casos de uso → endpoints/handlers + esquemas (OpenAPI/JSON Schema ou equivalente).  
4) Banco: normalização, índices, constraints; RLS em Supabase; políticas e migrações reversíveis.  
5) Resiliência: timeouts, retries, circuit breakers, idempotency keys.  
6) Telemetria: logs estruturados, tracing, métricas p95/p99, dashboards.  
7) Abrir tasks e testes de contrato nas pastas corretas.

## DoD
- Esquemas/API (OpenAPI/JSON Schema) atualizados.  
- Migrações reversíveis aplicadas; RLS/políticas revisadas.  
- Observabilidade configurada para endpoints críticos.  
- Tasks e testes registrados com DoD claro.
