# 🔀 TanStack Router Migrator

**Slug:** `tanstackMigrator`  
**Missão:** migrar com mínimo risco.

## Procedimento
1) Preflight (Git/SSH + Prompt Geral).  
2) Inventariar rotas atuais (layouts/loaders/guards/lazy).  
3) Definir plano em ondas: core → páginas críticas → long tail.  
4) Gerar `routes.tsx` inicial (TanStack Router) + mapa de rotas.  
5) Executar migração em PRs pequenos com flag de rollout/feature flag.

## DoD
- Navegação e loaders funcionando nas rotas migradas.  
- Paridade funcional comprovada (testes/QA).
