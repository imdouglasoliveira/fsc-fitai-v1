# Skill: `/audit` — Decision Audit Trail

**Invocação:** `/audit {story-id}` ou `/audit --monthly` ou `/audit --analyze`

---

## 📌 O que faz

Executa **auditoria de decisões e captura de aprendizado** — registra todas as decisões arquiteturais tomadas durante execução de uma história, captura outcomes, e extrai patterns.

Diferente de logging simples:
- ✅ Estrutura decisões arquivável
- ✅ Registra contexto completo
- ✅ Captura outcomes após execução
- ✅ Identifica padrões entre histórias
- ✅ Recommenda melhorias baseado em dados

---

## 🚀 Como usar

### Opção 1: Audit Specific Story
```bash
/audit STORY-42
# Análise completa: que decisões foram tomadas?
# Quais foram os outcomes?
# Aprendizado extraído?
```

### Opção 2: Monthly Review
```bash
/audit --monthly
# Resumo de todas decisões do mês
# Insights e recomendações
# Success rate e padrões
```

### Opção 3: Analyze Patterns
```bash
/audit --analyze
# Cruza dados de múltiplas histórias
# Identifica padrões de sucesso/falha
# Recomenda ajustes ao framework
```

---

## 📋 Story Audit

### Full Audit Report

```bash
/audit STORY-42
```

**Output:**

```markdown
## Audit Report: STORY-42

### Decisions Recorded
1. **Workflow Selection**
   - Date: 2026-02-28 10:30
   - Agent: ralph-governor
   - Decision: Use Ralph (vs SDD)
   - Confidence: 78%
   - Rationale: Requirements 35% clear, 4 iterations expected
   - Outcome: ✅ Converged in 3 iterations (better than expected)

2. **Composition Selection**
   - Date: 2026-02-28 11:45
   - Agent: skill-composer
   - Decision: full-feature-fullstack
   - Confidence: 92%
   - Rationale: FE + BE changes required
   - Outcome: ✅ All gates passed, 215m vs 240m estimated (89% accurate)

3. **Prompt Variant Applied**
   - Date: 2026-02-28 14:00
   - Variant: 02-spec v1.1-beta
   - Change: More structured (YAML + markdown)
   - Outcome: ✅ Better clarity, helped spec generation

### Statistics
- Total decisions: 3
- Success rate: 100% (3/3)
- Average confidence: 87%
- Total time: 3h 45m

### Insights
- Ralph was well-calibrated (expected 4 iterations, got 3)
- Fullstack composition timing slightly underestimated
- Structured prompts improved spec quality

### Recommendations
- Continue using Ralph for clarity < 50%
- Adjust fullstack estimate from 240m to 220m
- Apply v1.1-beta prompts to similar stories
```

---

## 📊 Monthly Review

### Aggregate Analysis

```bash
/audit --monthly
```

**Output:**

```markdown
## Monthly Audit Summary: February 2026

### Overview
- Stories processed: 42
- Total decisions: 127
- Success rate: 93.8%
- Average decision confidence: 0.81

### Decision Type Breakdown
| Type | Count | Success % | Avg Confidence |
|------|-------|-----------|---|
| Workflow selection | 42 | 96% | 0.84 |
| Composition selection | 51 | 94% | 0.82 |
| Prompt promotion | 12 | 91% | 0.76 |
| Escalations | 8 | 50% | 0.62 |
| Architecture decisions | 14 | 93% | 0.80 |

### Key Insights
1. **Ralph is well-calibrated**
   - Workflow selection accuracy: 96%
   - Ralph used 42 times, succeeded 40 times
   - SDD used when clarity > 80%, success rate 98%

2. **Composition timing improving**
   - Estimates now 93% accurate (vs 85% in Jan)
   - Fullstack consistently 5% faster than estimated
   - Bug-fix timing stable (97% accurate)

3. **Prompt improvements trending up**
   - 02-spec variant improved by +8.9%
   - 04-code variant improved by +4.9%
   - 01-search (no variant yet)

4. **TDD gate: pain point**
   - 4 TDD failures due to coverage < 85%
   - Root cause: edge cases not tested
   - Recommendation: Add edge case checklist to TDD

### Failures Analysis
| Failure Type | Count | Root Cause |
|---|---|---|
| TDD coverage gap | 4 | Missing edge case tests |
| QA requirement gap | 2 | Ambiguous spec |
| Escalation needed | 2 | External dependency |

### Recommendations
1. **Increase Ralph usage**
   - Current threshold: clarity < 50%
   - Proposed: clarity < 60%
   - Expected: +3-5% improvement in spec clarity

2. **Update composition estimates**
   - Fullstack: 240m → 220m
   - Frontend: 150m → 145m
   - Backend: 120m → 125m

3. **Improve TDD testing**
   - Add edge case requirement to /tdd skill
   - Review failing tests for pattern
   - Update test coverage checklist

4. **BMAD next iteration focus**
   - Priority: improve clarity dimension
   - Secondary: efficiency improvements
   - Avoid: over-engineering (diminishing returns)

### Next Month Goals
- Increase success rate to 95% (from 93.8%)
- Reduce escalations by 30%
- Achieve 98% composition estimate accuracy
- Promote prompt variants for 03-tasks and 05-reviews
```

---

## 🔍 Pattern Analysis

### Analyze Across Stories

```bash
/audit --analyze
```

**Output:**

```markdown
## Pattern Analysis: All Stories

### Success Factors
**Workflows that succeeded most:**
- Ralph (clarity 20-40%): 92% success
- SDD (clarity 80%+): 98% success
- Unclear split point: around 60% clarity

**Compositions that succeeded most:**
- bug-fix-minimal: 98% success (30 uses)
- full-feature-backend: 94% success (25 uses)
- full-feature-fullstack: 92% success (18 uses)
- full-feature-frontend: 89% success (8 uses)

### Failure Patterns
**What causes failures?**
1. Ambiguous specifications (6 failures)
   → Solution: Use Ralph more aggressively

2. Incomplete testing (4 failures)
   → Solution: Better TDD requirements

3. External dependencies (3 failures)
   → Solution: Better risk identification

4. Architectural issues (2 failures)
   → Solution: Pre-review with @architect

### Story Type Patterns
| Type | Avg Duration | Success % | Recommended Workflow |
|------|---|---|---|
| Bug (backend) | 55m | 96% | bug-fix-minimal |
| Bug (frontend) | 62m | 94% | bug-fix-minimal |
| Feature (backend) | 118m | 93% | full-feature-backend |
| Feature (frontend) | 148m | 91% | full-feature-frontend |
| Feature (fullstack) | 217m | 90% | full-feature-fullstack |

### Prompt Improvements
**Which prompts improved most?**
1. 02-spec: +8.9% (v1.0 0.79 → v1.1-beta 0.86)
2. 04-code: +4.9% (v1.0 0.81 → v1.1-beta 0.85)
3. 03-tasks: +2.1% (v1.0 0.85 → v1.1-beta 0.87)

**Effective improvement strategies:**
- Structure improvements: +6-9%
- Clarity improvements: +3-5%
- Efficiency tweaks: +1-2%

### Decision Confidence Analysis
**High confidence decisions (0.85+):** 89% success rate
**Medium confidence (0.60-0.85):** 91% success rate
**Low confidence (<0.60):** 58% success rate

**Insight:** Medium confidence often means "well-reasoned but uncertain"
Those succeed more than high confidence (overconfidence risk?)

### Team Patterns
**Agents making best decisions:**
1. skill-composer: 94% accuracy
2. ralph-governor: 96% accuracy
3. BMAD: 91% variant selection accuracy

### Quarterly Trend
```
Q1 2026:
- Week 1: Baseline (just tracking)
- Week 2-4: +2% improvement
- Week 5-8: +3.1% improvement
- Trend: Framework learning working!
```

### Next Experiment Proposal
**Hypothesis:** More aggressive Ralph usage (threshold 60% clarity) will improve overall success rate

**Experiment Plan:**
- Run for 2 weeks with new threshold
- Track: TDD gate pass rate, spec quality, iteration counts
- Expected: +1-2% overall success rate
- Risk: May waste time on non-converging Ralph loops

**Decision Confidence:** 0.74 (medium)
```

---

## 💾 Captured Decisions

### Types of Decisions Recorded

```yaml
Workflow Selection:
  - Which workflow (Ralph vs SDD)?
  - Triggers: /ralph command, ralph-governor analysis
  - Data: clarity%, complexity, time_pressure

Composition Selection:
  - Which composition (bug-fix vs fullstack)?
  - Triggers: /compose command, skill-composer analysis
  - Data: story_type, backend/frontend flags

Prompt Variant:
  - Promote v1.1-beta to v1.0?
  - Triggers: /bmad evaluation
  - Data: coverage/clarity/efficiency scores, improvement %

Architecture Decision:
  - Design choice (JWT vs OAuth, DB schema, etc.)
  - Triggers: @architect decision point
  - Data: alternatives, rationale, tradeoffs

Escalation:
  - Move to manual/different agent?
  - Triggers: gate failure, unknown scenario
  - Data: reason, blocking status, resolution
```

---

## ⚙️ Configuration

File: `.claude/memory-manager.local.md`

```yaml
---
mode: "learning"
auto_capture: true
capture_all_decisions: true
learning_feedback_frequency: "weekly"
monthly_review: true
---
```

---

## 🎯 Integration Points

### Ralph Governor
```
Ralph selects workflow
  ↓
Memory Manager captures: story_id, clarity%, complexity
  ↓
Ralph executes
  ↓
Outcome: converged? iterations?
  ↓
Learning: "Ralph accuracy for this clarity level: X%"
```

### Skill Composer
```
Composer selects composition
  ↓
Memory Manager captures: composition_type, flags
  ↓
Composition executes
  ↓
Outcome: gates passed? time accurate?
  ↓
Learning: "Composition timing accurate by X%"
```

### BMAD
```
BMAD evaluates variant
  ↓
Memory Manager captures: prompt_id, scores_v1/v1.1
  ↓
Decision: promote Y or keep X?
  ↓
Learning: "Clarity improvements effective by X%"
```

---

## 📈 Success Metrics

✅ **Audit Success = All of:**
- All decisions captured with full context
- Outcomes recorded post-execution
- Patterns identified monthly
- Learning applied to improve framework
- Success rate trending upward over time

---

## 🧪 Test Scenarios

### Scenario 1: Single Story Audit
```bash
/audit STORY-42
# Outputs: All decisions for this story + insights
```

### Scenario 2: Monthly Review
```bash
/audit --monthly
# Outputs: Aggregate report + recommendations
```

### Scenario 3: Pattern Analysis
```bash
/audit --analyze
# Outputs: Cross-story patterns + hypotheses
```

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
