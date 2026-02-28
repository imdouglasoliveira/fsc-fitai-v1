# Skill: `/compose` — Skill Composition & Orchestration

**Invocação:** `/compose {story-id}` ou `/compose {story-id} --composition {name}`

---

## 📌 O que faz

Executa uma **composição automática de skills** — uma sequence pré-definida de skills executados sequencialmente com gates de decisão entre cada um.

Diferente de skills individuais:
- ✅ Orquestra múltiplos skills em sequência
- ✅ Decision gates garantem qualidade entre passos
- ✅ Rollback automático se algum gate falhar
- ✅ Logging completo de execution
- ✅ Suporta composições customizadas

---

## 🚀 Como usar

### Opção 1: Auto-Detect (Recomendado)
```bash
/compose STORY-42
# Skill Composer analisa tipo de story
# Seleciona melhor composition automaticamente
# Ex: Feature backend → full-feature-backend
```

### Opção 2: Especificar Composition
```bash
/compose STORY-42 --composition full-feature-backend
# Força execução de composition específica
```

### Opção 3: Customizar
```bash
/compose STORY-42 --composition custom --skills "be, tdd, qa, commit"
# Define sequence de skills customizada
```

---

## 📋 Composições Disponíveis

### 1. `bug-fix-minimal`
**Quando usar:** Bug simples, bugfix rápido, < 1h
```
Fix → Test → QA → Commit
Duração: ~60 minutos
```

### 2. `full-feature-backend`
**Quando usar:** Nova feature backend, API routes + DB
```
Backend → Unit/Int Tests → QA → Commit
Duração: ~120 minutos
```

### 3. `full-feature-frontend`
**Quando usar:** Nova feature frontend, componentes + hooks
```
Frontend → Tests → React Doctor → QA → Commit
Duração: ~150 minutos
```

### 4. `full-feature-fullstack`
**Quando usar:** Feature completa (FE + BE), integração
```
Backend → Frontend → Tests → ReactDoctor → QA → Commit
Duração: ~240 minutos
```

### 5. `custom`
**Quando usar:** Workflow não-padrão, composição ad-hoc
```
Define sua própria sequence de skills
Duração: customizável
```

---

## 🎯 Workflow Completo

### Step 1: Invoke Composer
```bash
/compose STORY-42
```

### Step 2: Composer Analyzes
```
✓ Story type: feature
✓ Backend + Frontend: YES
✓ Recommendation: full-feature-fullstack
✓ Estimated duration: 4 hours
```

### Step 3: Review & Approve
```
Composition Plan:
1. /be (Backend)          → ~50m
2. /fe (Frontend)         → ~60m
3. /tdd (All Tests)       → ~40m
4. /react-doctor          → ~20m
5. /qa (Full QA)          → ~30m
6. /commit-dev            → ~5m

[✓] Approve and execute
[✗] Modify composition
[?] Ask questions
```

### Step 4: Execute
```
[1/6] Running Backend skill...
      ✓ Routes created
      ✓ DB migrations ready
      → Proceed to Frontend

[2/6] Running Frontend skill...
      ✓ Components created
      ✓ Integration done
      → Proceed to Testing

[3/6] Running TDD skill...
      ✓ Unit tests: 95% coverage
      ✓ Integration tests: all pass
      → Proceed to React Doctor

[4/6] Running React Doctor...
      ✓ No critical issues
      ✓ Best practices: OK
      → Proceed to QA

[5/6] Running QA skill...
      ✓ Verdict: PASS
      ✓ All requirements met
      → Proceed to Commit

[6/6] Running Commit skill...
      ✓ Changes committed
      ✓ Pushed to dev branch
      ✓ Story marked: Done

✅ Composition completed successfully!
   Total duration: 3h 45m
   Story status: Done
```

---

## 🛑 Decision Gates

### After Each Skill

**Backend Skill:**
- ✓ Condition: Routes defined + migrations valid
- ✗ Condition: Incomplete or invalid code
- Action: Fix and retry, or proceed with manual review

**Frontend Skill:**
- ✓ Condition: Components structured + API integrated
- ✗ Condition: Integration issues or poor structure
- Action: Fix and retry

**TDD Skill:**
- ✓ Condition: Coverage ≥ 85% + all tests green
- ✗ Condition: Coverage < 85% or tests failing
- Action: Add more tests, fix failing tests

**React Doctor:**
- ✓ Condition: No critical issues
- ✗ Condition: Critical React pattern violations
- Action: Fix issues before proceeding

**QA Skill:**
- ✓ Condition: Verdict = PASS
- ✗ Condition: Verdict = FAIL or CONCERNS
- Action: Return to dev fixes or accept with issues

**Commit:**
- ✓ Condition: All changes staged and committed
- ✗ Condition: Commit failure
- Action: Investigate, fix, retry

---

## 📊 Composição Customizada

### Criar Composição Custom
```bash
/compose STORY-X --composition custom \
  --skills "/be, /tdd, /qa, /commit-dev"
```

### Exemplo: Refactor com Testes Extras
```bash
/compose STORY-REFACTOR --composition custom \
  --skills "/be, /tdd --coverage 95, /react-doctor, /qa, /commit-dev"
```

---

## 💾 Artefatos Gerados

### Depois de Successful Composition

```
.claude/
├── compositions/
│   └── STORY-42-composition-2026-02-28.json
│       ├── story_id: "STORY-42"
│       ├── composition: "full-feature-fullstack"
│       ├── skills_executed: [be, fe, tdd, react-doctor, qa, commit]
│       ├── gates_passed: [be→fe, fe→tdd, tdd→react-doctor, react-doctor→qa, qa→commit]
│       ├── total_duration_minutes: 225
│       ├── timestamp: "2026-02-28T14:30:00Z"
│       └── status: "completed_successfully"

├── memory/
│   └── composition-log.json
│       ├── timestamp: "2026-02-28"
│       ├── story_id: "STORY-42"
│       ├── composition: "full-feature-fullstack"
│       ├── duration_minutes: 225
│       ├── gates_passed: 6/6
│       ├── gates_failed: 0
│       ├── lessons_learned: [...]
│       └── status: "success"
```

---

## 🚨 Failure Handling

### Gate Failed: What Happens?

**Example: Backend skill fails gate**
```
❌ Backend skill completed
   But: Routes incomplete

Decision:
├─ Retry backend
├─ Fix issue manually then resume
└─ Escalate to @dev
```

**Automatic Rollback:**
```
If QA gate fails after 5 gate checks:
1. Copy latest good state
2. Mark composition as "failed"
3. Return to developer
4. Offer alternative composition
```

---

## ⚙️ Configuration

Stored in `.claude/skill-composer.local.md`:

```yaml
---
mode: "interactive"  # interactive | auto | yolo
max_retries_per_skill: 2
default_coverage_target: 85
timeout_per_skill_minutes: 120
timeout_total_composition_minutes: 300
auto_rollback_on_gate_fail: true
---
```

---

## 🔄 Continuous Improvement

### After Composition Completes

**Skill Composer logs:**
```
✓ Which composition was best for this story type?
✓ How long actually took vs estimated?
✓ Which gates took longest?
✓ Any gate failures? What caused them?
```

**Learning:**
```
Skills (/be + /fe + /tdd + /react-doctor + /qa)
for fullstack features consistently take ~4 hours.

Frontend-only features take ~150 minutes.
Bug fixes take ~60 minutes.

These metrics inform future estimates.
```

---

## 🎯 Success Criteria

✅ Composition executes without manual intervention
✅ All decision gates pass
✅ All skills complete successfully
✅ Code properly tested (coverage target met)
✅ Code committed to dev branch
✅ Story status updated appropriately
✅ Execution logged for future learning

---

## 💡 Best Practices

1. **Start with auto-detect** (`/compose STORY-X`)
   - Composer usually picks right composition
   - Only override if you have specific needs

2. **Monitor gates closely**
   - If a gate fails, understand why
   - Don't skip gates (they exist for quality)

3. **Adjust coverage targets**
   - Bug fixes: 70-80% (regression focused)
   - Features: 85% (comprehensive)
   - Critical paths: 95%+

4. **Use custom compositions sparingly**
   - Standard compositions are battle-tested
   - Custom is for special cases

5. **Review composition results**
   - Check execution log after completion
   - Learn what worked, what didn't
   - Suggest improvements to Composer

---

## 🔗 Integração com Story Lifecycle

```
Story Status: Ready

↓

/compose STORY-X
(Composer analyzes & plans)

↓

User approves composition

↓

Composition executes:
Story: Ready → InProgress → InReview → Done

↓

Story Status: Done
(All gates passed, code committed)
```

---

## ⏱️ Timing Reference

| Composition | Duration | Best For |
|-------------|----------|----------|
| bug-fix-minimal | 60m | Simple bugs |
| full-feature-backend | 120m | Backend features |
| full-feature-frontend | 150m | Frontend features |
| full-feature-fullstack | 240m | Full features |

---

## 🧪 Test Scenarios

### Scenario 1: Happy Path
```bash
/compose STORY-SIMPLE
# Full execution, all gates pass
# Result: Story Done in expected time
```

### Scenario 2: Gate Failure
```bash
/compose STORY-COMPLEX
# TDD gate fails (coverage < 85%)
# Composer offers retry or fix
```

### Scenario 3: Custom Composition
```bash
/compose STORY-REFACTOR \
  --composition custom \
  --skills "/be, /tdd --coverage 95, /qa, /commit-dev"
# Custom sequence executes
```

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
