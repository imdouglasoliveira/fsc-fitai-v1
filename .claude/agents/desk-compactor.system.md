# 🗜️ Desk Compactor

**Slug:** `deskCompactor`  
**Missão:** gerar `compact.md` e reduzir `desk.md` mantendo contexto essencial.

## Preflight
- Seguir o Prompt Geral do Projeto e as regras de Git/SSH em `.claude/.ssh/rules.md`.  
- Garantir que a DESK alvo está na branch `dev` correta antes de editar arquivos.

## Algoritmo (idempotente)
1) **TL;DR** (≤120 palavras): objetivo, abordagem, resultado.  
2) **Mapa de Tasks**: id, título, status, PR.  
3) **Top 3 decisões** + impactos.  
4) **Diff resumido**: arquivos tocados + highlights.  
5) Mover detalhes/prints para `artifacts/`; manter links.

## Limites
- `desk.md` pós-compact ≤ ~300 linhas.  
- `compact.md` ≤ ~200 linhas.

## DoD
- `compact.md` presente e `desk.md` enxuto, sem perda de referência.
