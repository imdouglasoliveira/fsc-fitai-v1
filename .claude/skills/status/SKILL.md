# Skill: `/status` — A8Z Framework Orchestration Dashboard

**Invocação:** `/status` ou `/status {story-id}` ou `/status --full`

---

## 📌 O que faz

Exibe **dashboard da orquestração A8Z** — status do framework, histórias em andamento, métricas de sucesso, e recomendações.

```
╔════════════════════════════════════════════════════════════════╗
║              A8Z Framework Orchestration Dashboard             ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║ 📊 System Status: OPERATIONAL ✓                               ║
║ Uptime: 28 days, Success Rate: 93.8%                          ║
║                                                                ║
║ ⚙️ Framework Phases:                                           ║
║  [████████████████████░░] Phase 1-5 Complete (71%)             ║
║  - Ralph Integration:        ✓ v1.0 (Stable)                 ║
║  - BMAD Meta-Prompting:      ✓ v1.0 (Learning)               ║
║  - Skill Composition:        ✓ v1.0 (Production)             ║
║  - Memory System:            ✓ v1.0 (Capturing)              ║
║  - Workflow Router:          ✓ v1.0 (Active)                 ║
║  - Orchestration Dashboard:  ✓ v1.0 (You are here)           ║
║  - Cleanup & Docs:          ⏳ Phase 7 (Next)                ║
║                                                                ║
║ 📈 Framework Metrics (Feb 2026):                              ║
║  ├─ Stories processed: 42                                     ║
║  ├─ Success rate: 93.8%                                       ║
║  ├─ Avg decision confidence: 0.81                             ║
║  ├─ Ralph accuracy: 96% (40/42)                               ║
║  ├─ Composition timing accuracy: 93%                          ║
║  └─ Prompt improvements: +2.1% avg                            ║
║                                                                ║
║ 🚀 Skills Available: 9                                        ║
║  ✓ /ralph {story}       Ralph Loop orchestration              ║
║  ✓ /bmad {phase}        Prompt evaluation & promotion         ║
║  ✓ /compose {story}     Auto composition orchestration        ║
║  ✓ /audit {story|--monthly}  Decision audit trail            ║
║  ✓ /workflow-select {story}  Workflow routing                ║
║  ✓ /status              Dashboard (this skill)               ║
║  + 3 standard skills (be, fe, qa)                             ║
║                                                                ║
║ 🎯 Active Stories:                                            ║
║  STORY-42: Feature Backend              [████████░░] 75%     ║
║  STORY-43: Bug Fix Frontend             [██████████] 100%    ║
║  STORY-44: Refactor API                 [██████░░░░] 45%     ║
║                                                                ║
║ 📋 Framework Status:                                          ║
║  ├─ Auto-capture: ON (all decisions logged)                   ║
║  ├─ Learning cycle: Weekly (every Friday)                     ║
║  ├─ Pattern analysis: Monthly (next: 2026-03-07)             ║
║  ├─ Prompt variants: Testing (02-spec v1.1-beta +8.9%)       ║
║  └─ Next improvements: Full Phase 6 completion               ║
║                                                                ║
║ ⚠️  Attention Points:                                         ║
║  - Phase 6 in progress (dashboard + monitoring)               ║
║  - 2 escalations this week (TDD coverage)                     ║
║  - Consider Ralph threshold adjustment (clarity < 60%)        ║
║                                                                ║
║ 💡 Recommendations:                                           ║
║  1. Continue current Ralph/SDD balance                        ║
║  2. Create 03-tasks variant (structure like 02-spec)         ║
║  3. Add edge case requirement to TDD skill                   ║
║  4. Schedule Phase 7 cleanup (week of Mar 10)                ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
```

---

## 🚀 Como usar

### Opção 1: System Overview
```bash
/status
# Exibe dashboard geral do framework
```

### Opção 2: Story Status
```bash
/status STORY-42
# Status detalhado de uma história específica
```

### Opção 3: Full Report
```bash
/status --full
# Dashboard completo + histórico + análises
```

---

## 📊 Seções do Dashboard

### 1. System Health

```
📊 System Status: OPERATIONAL ✓
Uptime: 28 days
Success Rate: 93.8%
Last update: 2026-02-28 14:30 UTC
```

### 2. Framework Phases Progress

```
[████████████████████░░] Phase 1-5 Complete (71%)

✓ Ralph Integration        v1.0 (Stable)
✓ BMAD Meta-Prompting     v1.0 (Learning)
✓ Skill Composition       v1.0 (Production)
✓ Memory System           v1.0 (Capturing)
✓ Workflow Router         v1.0 (Active)
✓ Orchestration Dashboard v1.0 (Live)
⏳ Cleanup & Docs         Phase 7 (Next)
```

### 3. Metrics & KPIs

```
Stories: 42 | Success: 93.8% | Confidence: 0.81
Ralph: 96% accurate | Compositions: 93% timing | Prompts: +2.1%
```

### 4. Active Stories

```
STORY-42: Feature Backend    [████████░░] 75%
STORY-43: Bug Fix Frontend   [██████████] 100%
STORY-44: Refactor API       [██████░░░░] 45%
```

### 5. Framework Status

```
Auto-capture: ON
Learning: Weekly (Friday)
Patterns: Monthly (Mar 7)
Next: Phase 7 (Mar 10)
```

### 6. Alerts & Recommendations

```
⚠️  2 escalations (TDD coverage)
💡 Create 03-tasks variant
💡 Adjust Ralph threshold
💡 Add edge case requirement
```

---

## 💾 Data Sources

- **decision-log.json** — Decision history
- **REGISTRY.md** — Prompt versions & scores
- **Story files** — Current progress
- **Memory patterns** — Learning insights

---

## 🎯 Use Cases

### Case 1: Quick System Check
```bash
/status
# "Is the framework healthy?"
# "Any issues I should know about?"
```

### Case 2: Story Progress
```bash
/status STORY-42
# "How far is this story?"
# "Are there blockers?"
```

### Case 3: Framework Analysis
```bash
/status --full
# "How is the framework performing?"
# "What should we improve next?"
```

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
