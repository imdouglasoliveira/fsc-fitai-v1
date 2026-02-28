# Skill: `/workflow-select` — Intelligent Workflow Routing

**Invocação:** `/workflow-select {story-id}` ou `/workflow-select {story-id} --force {workflow}`

---

## 📌 O que faz

Executa **roteamento inteligente de fluxos** — analisa uma história e recomenda o melhor workflow:
- Ralph Loop (ambiguidade)
- SDD Linear (clareza)
- Rapid Bug Fix (bugs simples)
- Escalation (complexidade)

Diferente de workflow manual:
- ✅ Análise automática baseada em dados
- ✅ Histórico considerado (padrões de sucesso)
- ✅ Múltiplas alternativas oferecidas
- ✅ Confiança quantificada

---

## 🚀 Como usar

### Opção 1: Auto-Routing (Recomendado)
```bash
/workflow-select STORY-42
# Análise completa: qual é o melhor workflow?
```

### Opção 2: Force Specific Workflow
```bash
/workflow-select STORY-42 --force ralph
# Override router recommendation
# Use only if you have specific reasons
```

### Opção 3: Alternative Analysis
```bash
/workflow-select STORY-42 --alternatives
# Compare all workflows, not just top recommendation
```

---

## 📋 Workflow Routing Process

### Step 1: Analyze Story

```
Extract story metadata:
├─ Story type: feature | bug | refactor | docs
├─ Requirements clarity: 0-100%
├─ Complexity score: 1-20
├─ Time available: hours/days
└─ Resource constraints: none | specific
```

### Step 2: Calculate Routing Scores

```
For each workflow:
  score = (clarity_factor * 0.3) +
          (complexity_factor * 0.25) +
          (time_factor * 0.25) +
          (resource_factor * 0.2)

Clarity factor:
  >= 80%:  0.90 (favor SDD)
  50-80%:  0.50 (neutral)
  < 50%:   0.15 (favor Ralph)

Complexity factor:
  1-8:     0.60 (favor rapid)
  9-15:    0.80 (favor standard)
  > 15:    1.00 (favor escalation)

Time factor:
  < 2h:    0.60 (favor rapid)
  2-8h:    0.85 (favor standard)
  > 8h:    1.00 (favor detailed)

Resource factor:
  All available: 1.0
  Missing 1:     0.8
  Missing 2+:    0.5
```

### Step 3: Rank Workflows

```
Ranking:
1. Ralph Loop:         score 0.82
2. SDD Linear:         score 0.71
3. Rapid Bug Fix:      score 0.55
4. Escalate:           score 0.32

Recommendation: Ralph Loop (0.82 confidence)
```

### Step 4: Generate Recommendation

```
## Workflow Recommendation

**Story:** STORY-42
**Type:** Feature

### Primary Recommendation
**Workflow:** Ralph Loop
**Confidence:** 82%
**Duration:** ~90 minutes

**Why this workflow:**
- Clarity: 35% (ambiguous)
- Expected iterations: 3-4
- Time available: 2+ hours
- Complexity: manageable

**Skill sequence:**
1. /ralph STORY-42 (30-45 min)
2. /compose STORY-42 (auto-select)
3. Execute composition
4. /audit STORY-42

### Alternatives
2. SDD Linear (71% confidence)
   - Requires 2-3 clarification rounds first
   - Total time: 2.5-3 hours
   - Better if clarity improves to 60%+

3. Escalate (32% confidence)
   - Only if @architect input needed
   - Complexity manageable within framework

### Approval
[✓] Approve Ralph Loop
[?] Try SDD instead
[!] Force different workflow
```

---

## 🎯 Routing Modes

### Mode 1: Feature Routing

**When:** New feature story

```
Input:
  Clarity 35% + Complexity 14 + Time 2h

Routing:
  → Ralph Loop (for ambiguity)
  → full-feature-fullstack (composition)
  → 90-120 min total

Success: 91%
```

### Mode 2: Bug Fix Routing

**When:** Bug story

```
Input:
  Type bug + Complexity 5 + Time 1h

Routing:
  → Rapid Bug Fix
  → bug-fix-minimal (composition)
  → 45-60 min total

Success: 94%
```

### Mode 3: Refactor Routing

**When:** Refactor story

```
Input:
  Type refactor + Clarity 70% + Complexity 12

Routing:
  → SDD Linear
  → full-feature-{area} (composition)
  → 120-150 min total

Success: 91%
```

### Mode 4: Escalation Routing

**When:** Complex story

```
Input:
  Complexity 18 + Ambiguity high

Routing:
  → Escalate to @architect
  → Requires architectural review
  → External team + 4+ hours

Success: 85%
```

---

## 📊 Historical Data Integration

### Using Memory for Better Predictions

```
Query: How successful is Ralph for clarity 35%?
Data: Ralph selected 40 times at clarity 30-40%
      Succeeded: 38 times (95%)
      Failed: 2 times (5%)
      Avg iterations: 3.2

Insight: Ralph very reliable for this clarity level
→ Increase confidence to 92%
```

---

## 🛑 When to Override Router

**Good reasons to override:**
```
"Stakeholder prefers SDD (even though Ralph recommended)"
"External dependency forces tight timeline"
"Team not trained on Ralph yet"
```

**Bad reasons to override:**
```
"I have a hunch"
"Just want to try Ralph"
"SDD always worked before"
```

---

## ⚙️ Configuration

File: `.claude/workflow-router.local.md`

```yaml
---
routing_mode: "intelligent"
use_historical_data: true
min_confidence_threshold: 0.70
allow_user_override: true
log_routing_decisions: true
---
```

---

## 🔄 Workflow Diagram

```
/workflow-select STORY-X
  ↓
[Workflow Router analyzes]
  ├─ Clarity: 35%
  ├─ Complexity: 14
  ├─ Time: 2 hours
  ├─ Type: feature
  └─ Resources: available
  ↓
[Calculate scores]
  Ralph: 0.82 ← WINNER
  SDD:   0.71
  Rapid: 0.55
  Escalate: 0.32
  ↓
[Generate recommendation]
  Primary: Ralph Loop (82%)
  Alternative: SDD (71%)
  Alternative: Escalate (32%)
  ↓
User approves → Story Status: Ready
  ↓
Execute recommended workflow
  /ralph STORY-X (if Ralph chosen)
  /compose STORY-X (auto-composition)
  ↓
Composition executes
  Skills run → gates checked → code committed
  ↓
/audit captures decision outcome
  Learning logged → memory updated
```

---

## 💡 Best Practices

1. **Use auto-routing first**
   - Router usually picks correctly
   - Override only when you have good reason

2. **Review alternatives**
   - At least consider 2nd choice
   - Understand tradeoffs

3. **Trust historical data**
   - Ralph works 96% of time for clarity < 50%
   - Data beats intuition

4. **Confidence scores matter**
   - 0.85+: Very likely to work
   - 0.70-0.85: Good choice
   - < 0.70: Reconsider

5. **Document overrides**
   - If you force different workflow
   - Explain why (helps learning)

---

## 🧪 Test Scenarios

### Scenario 1: Feature with Ambiguous Requirements
```bash
/workflow-select STORY-1
# Clarity: 35%, Complexity: 14, Time: 2h
# Expected: Ralph Loop (0.82)
# Actual: Ralph Loop ✓
```

### Scenario 2: Simple Bug Fix
```bash
/workflow-select STORY-2
# Type: bug, Complexity: 5, Time: 1h
# Expected: Rapid Bug Fix (0.94)
# Actual: Rapid Bug Fix ✓
```

### Scenario 3: Clear Feature
```bash
/workflow-select STORY-3
# Clarity: 85%, Complexity: 10, Time: 2h
# Expected: SDD Linear (0.95)
# Actual: SDD Linear ✓
```

### Scenario 4: Very Complex
```bash
/workflow-select STORY-4
# Complexity: 20, Ambiguity: high
# Expected: Escalate to @architect (0.78)
# Actual: Escalate ✓
```

---

## 🔗 Integration with Story Lifecycle

```
Story Draft
  ↓
/workflow-select STORY-X
  (Workflow Router analyzes & recommends)
  ↓
User approves workflow
  ↓
Story Status: Ready
  ↓
Execute recommended workflow
  (Ralph / SDD / Rapid / Escalate)
  ↓
Skills run sequentially
  ↓
/audit logs decision + outcome
  ↓
Story Status: Done
```

---

## 📈 Success Metrics

✅ **Routing Success = All of:**
- Workflow analysis complete
- Recommendation reasonable (score >= 0.70)
- User approves or provides feedback
- Actual workflow matches recommendation
- Decision captured in audit log

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
