# Skill: `/ralph` — Ralph Loop Integration

**Invocação:** `/ralph {story-id}`

---

## 📌 O que faz

Executa um **autonomous loop iterativo** (Ralph) para exploração e refinamento de histórias ambíguas.

Diferente do SDD linear (Spec → Code → QA → Done), Ralph:
- ✅ Roda iterativamente até conversa
- ✅ Explora hipóteses autonomamente
- ✅ Registra progresso em git
- ✅ Escala automaticamente se ficar travado

---

## 🚀 Como usar

### Pré-requisito
```bash
# Story deve estar em Draft
# Recomendação: chamar ralph-governor primeiro para confirmar Ralph é melhor

/ralph STORY-42
```

### Exemplo Real
```
Usuário: /ralph STORY-42
Claude: Ralph Governor análise...
        "STORY-42 clarity: 35%, iterations: 4, complexity: 14"
        "Recomendação: Ralph (score: 78/100)"

        Iniciando Ralph loop autônomo...

        [Iteration 1/5]
        PRD draft criado: .claude/plans/STORY-42-prd-v1.json
        Progress: ████░░░░░░ 20%

        [Iteration 2/5]
        Spec refinado
        Progress: ████████░░ 40%

        [Iteration 3/5]
        Converged! Spec finalizada
        Progress: ██████████ 100%

        ✅ Ralph completo em 3 iterações
        📄 Outputs:
           - .claude/specs/STORY-42-spec.md (final spec)
           - .claude/worktrees/STORY-42-ralph/ (code attempt)
           - .claude/plans/STORY-42-decision-log.json
```

---

## ⚙️ Processo Interno

### Step 1: Pré-flight Checks
```bash
✅ Story existe?
✅ Story em Draft?
✅ PRD disponível?
✅ Complexity score OK para Ralph?
```

### Step 2: Initialize Ralph Loop
```bash
# Criar worktree limpo
git worktree add .claude/worktrees/STORY-{id}-ralph

# Criar progress tracking
echo {
  "story_id": "STORY-42",
  "iteration": 0,
  "status": "initializing",
  "prd_versions": [],
  "spec_versions": []
} > .claude/worktrees/STORY-{id}-ralph/progress.json
```

### Step 3: Autonomous Iterations (Max 5)
```bash
FOR each iteration (1 to 5):
  1. Read PRD + previous attempts
  2. Hypothesis: "What if we do X?"
  3. Generate spec draft
  4. Validate: Is this better than v(n-1)?
  5. If converged: BREAK
  6. If stuck (error 3x): ESCALATE
  7. Else: Continue iteration
```

### Step 4: Convergence Detection
```
Converged when:
  ✅ Spec hasn't changed > 10% from v(n-1)
  ✅ No new insights from exploration
  ✅ Clear acceptance criteria defined
  ✅ Or: Max iterations reached
```

### Step 5: Post-Process
```bash
# Copy final spec to canonical location
cp .claude/worktrees/STORY-{id}-ralph/spec-final.md \
   .claude/specs/STORY-{id}-spec.md

# Update story status
Status: Draft → Ready (spec approved)

# Save decision log
.claude/memory/decision-log.json += {
  "story": "STORY-42",
  "workflow": "ralph",
  "iterations": 3,
  "outcome": "converged",
  "duration_minutes": 45
}
```

---

## 📊 Monitoramento

Durante execução:
```
/status STORY-42

OUTPUT:
─────────────────────────
STORY-42: Autenticação JWT
Phase: Ralph Loop
Progress: ████████░░ 75% (iteration 3/5)
Current focus: "Definir token refresh strategy"
Next step: "Validar com @po"
ETA: 15 minutos
─────────────────────────
```

---

## 🛑 Escalation Rules

### Quando Ralph Para
```
Situação              | Ação
──────────────────────┼──────────────────────────
Converged (spec OK)   | ✅ Save spec, update status
Max iterations (5)    | ⚠️ Save best attempt, flag for manual review
Stuck 3x (error)      | 🔴 Escalate: human review needed
Clarity improved      | Switch to SDD (spec clear, não precisa mais Ralph)
New blockers found    | 🔴 Escalate: external dependency discovered
```

### Manual Escalation
```bash
# Se detectar problema:
/ralph-escalate STORY-42 "Ficou claro que precisa de integração OAuth"

→ Gera issue para @architect
→ Salva estado de Ralph
→ Story volta para Draft (para redesign)
```

---

## 💾 Artefatos Gerados

### After Ralph Success
```
.claude/
├── specs/
│   └── STORY-42-spec.md          ← FINAL spec (ready for @dev)
├── worktrees/
│   └── STORY-42-ralph/
│       ├── progress.json         ← iteration history
│       ├── prd-v1.md
│       ├── prd-v2.md
│       ├── prd-v3.md
│       ├── spec-v1.md
│       ├── spec-v2.md
│       ├── spec-v3.md (final)
│       └── decision-log.json
└── memory/
    └── decision-log.json
        ├── story: STORY-42
        ├── workflow: ralph
        ├── iterations: 3
        ├── outcome: converged
        └── duration: 45 min
```

---

## ⏱️ Timing

| Fase | Duração | O que acontece |
|------|---------|---|
| Pre-flight | < 1 min | Validações |
| Init | < 1 min | Setup worktree |
| Iteration 1-3 | 30-45 min | Exploração autônoma |
| Convergence | < 5 min | Detecção + save |
| Post-process | < 2 min | Cleanup + status update |
| **TOTAL** | **45 min** | Story pronta para @dev |

Vs SDD Linear: (que levaria 2-3h de especificação manual)

---

## 🧪 Teste Manual

### Scenario 1: Happy Path
```bash
/ralph STORY-AMBIGUO
# Resultado esperado:
# ✅ Converge em 3-4 iterações
# ✅ Spec claro gerado
# ✅ Status Update: Draft → Ready
```

### Scenario 2: Stuck Detection
```bash
/ralph STORY-VERYAMBIGUO
# Resultado esperado:
# ⚠️ Max iterations atingido
# 📄 Best attempt salvo
# 🔴 Flag para revisão manual
```

### Scenario 3: Should be SDD
```bash
/ralph STORY-CLEAR (clarity 90%)
# Resultado esperado:
# ⚠️ Ralph Governor detecta clarity alta
# 💡 "Essa história é clara. Recomendação: use /SDD em vez de Ralph"
# Usuário continua com SDD normal
```

---

## 🔗 Integração com Story Lifecycle

```
Story Draft
  ↓
[Decision: Ralph ou SDD?]
  ├─ SDD: → Spec → Code → QA → Done
  └─ Ralph: → /ralph STORY-X
              → 3-5 iterações autônomas
              → Spec finalizada
              → Status: Ready
              → Agora continua com Dev/QA normal
```

---

## 🎯 Success Criteria

✅ Ralph executa sem erros
✅ Progresso registrado em progress.json
✅ Spec final criado em .claude/specs/
✅ Story status atualizado para Ready
✅ Decision log registrado para futuro learning

---

## ⚡ Próximos Passos

1. **Usar ralph-governor** para confirmar Ralph é melhor
2. **Invocar `/ralph STORY-X`** quando história for ambígua
3. **Monitorar com `/status`** durante execução
4. **Revisar spec final** gerado
5. **Continuar com @dev** (implementação)

---

*Version:* 1.0
*Created:* 2026-02-28
*Tested:* ✅ Happy path, Stuck detection, SDD detection
