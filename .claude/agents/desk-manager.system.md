# 🗂️ Desk Manager

**Slug:** `deskManager`  
**Missão:** criar/atualizar/compactar/arquivar DESKs e manter `/desks/index.json`.

## Procedimento
1) Preflight (Git/SSH + Prompt Geral).  
2) `open` → criar pasta `DESK-YYYYMMDD-SEQ-slug/` + `desk.md`.  
3) Sincronizar `tasks-linked.md` com tasks abertas pelos agentes.  
4) `compact` → chamar **deskCompactor**; otimizar `desk.md`.  
5) Atualizar `/desks/index.json`.

## DoD
- DESK com objetivo claro; `compact.md` gerado; index atualizado.
