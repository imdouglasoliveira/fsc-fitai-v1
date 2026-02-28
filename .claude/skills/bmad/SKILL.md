# Skill: `/bmad` — BMAD Meta-Prompting

**Invocação:** `/bmad {phase}`

---

## 📌 O que faz

Executa **BMAD evaluation** — testa múltiplas versões de um prompt em paralelo e **recomenda a melhor** baseado em scores de:
- **Coverage** (0.0-1.0): Atende todos os requisitos?
- **Clarity** (0.0-1.0): Está claro e unambíguo?
- **Efficiency** (0.0-1.0): Eficiência tokens-para-valor?

---

## 🚀 Como usar

### Invocação Simples
```bash
/bmad 02-spec
# Testa v1.0 vs v1.1-beta automaticamente
# Retorna scores + recomendação
```

### Resultado Esperado
```
╔════════════════════════════════════════════════════╗
║ PROMPT EVALUATION: 02-spec                        ║
╠════════════════════════════════════════════════════╣
║                                                    ║
║ v1.0 (Current)                                   ║
│  Coverage:  ▓▓▓▓▓▓▓▓░░  0.85                     ║
│  Clarity:   ▓▓▓▓▓▓▓░░░  0.75                     ║
│  Efficiency:▓▓▓▓▓▓░░░░  0.77                     ║
│  Overall:   ▓▓▓▓▓▓▓░░░  0.79                     ║
║                                                    ║
║ v1.1-beta (Testing)                              ║
│  Coverage:  ▓▓▓▓▓▓▓▓▓░  0.88 ✓                  ║
│  Clarity:   ▓▓▓▓▓▓▓▓▓░  0.89 ✓                  ║
│  Efficiency:▓▓▓▓▓▓▓▓░░  0.82 ✓                  ║
│  Overall:   ▓▓▓▓▓▓▓▓░░  0.86 ✓  ← WINNER      ║
║                                                    ║
║ Recommendation: SWITCH to v1.1-beta               ║
║ Improvement: +0.07 overall score (+8.9%)          ║
║                                                    ║
║ Strengths v1.1-beta:                             ║
│ ✓ More concise (better efficiency)               ║
│ ✓ Clearer structure (YAML + MD)                 ║
│ ✓ Better organized (checklist format)            ║
║                                                    ║
║ Action: Type 'confirm' to promote v1.1-beta → v1.0
║         Type 'cancel' to keep current version
╚════════════════════════════════════════════════════╝
```

---

## 🎯 Workflow

### Step 1: Run BMAD
```bash
/bmad 02-spec
# Compares all available variants
```

### Step 2: Review Scores
```
v1.0:      0.79 (baseline)
v1.1-beta: 0.86 (winner +0.07)
```

### Step 3: Decide
```bash
# Option A: Accept recommendation
confirm

# Option B: Reject recommendation
cancel

# Option C: Keep both for next test
keep-both
```

### Step 4: Update Registry
```
If confirmed:
- v1.0 moved to archive
- v1.1-beta becomes new v1.0
- REGISTRY.md updated
- Decision logged

If rejected:
- v1.0 continues as current
- v1.1-beta retains as variant
```

---

## 📊 Scoring Details

### Coverage (Addresses Requirements)
```
Checks:
- ✓ Has introduction/objective
- ✓ Has step-by-step process
- ✓ Has expected output
- ✓ Has examples
- ✓ Has error handling

+0.05 per element (max 1.0)
```

### Clarity (Readability & Structure)
```
Checks:
- ✓ Has headers/sections
- ✓ Has bullet points
- ✓ Has code blocks
- ✓ Average line length OK
- ✓ Formatting consistent

Baseline: 0.7 + bonuses
```

### Efficiency (Token-to-Value)
```
Checks:
- Ideal: 70-150 words per content unit
- Too verbose: 200+ words/unit → 0.60
- Too terse: <50 words/unit → 0.60
- Optimal: 70-150 words/unit → 0.85
```

---

## 🔄 Continuous Improvement

### Weekly Cycle
```
Monday:    /bmad 01-search (test variant)
Tuesday:   /bmad 02-spec
Wednesday: /bmad 03-tasks
Thursday:  /bmad 04-code
Friday:    /bmad 05-reviews
```

### Measure Impact
```
Before: v1.0 score = 0.79
After:  v1.1-beta = 0.86
Impact: +8.9% improvement in prompt quality
```

### Track Learning
```
Record in decision-log.json:
{
  "timestamp": "2026-03-01",
  "phase": "02-spec",
  "action": "promoted v1.1-beta to v1.0",
  "score_delta": +0.07,
  "reason": "Better clarity + efficiency"
}
```

---

## 💡 Creating New Variants

### Step 1: Copy Current
```bash
cp 02-spec/v1.0.md 02-spec/v1.1-beta.md
```

### Step 2: Modify
```
Edit v1.1-beta.md with improvements:
- More structured format
- Add checklist
- Reduce verbosity
- Better examples
```

### Step 3: Mark as Beta
```
# Spec para {objective}

**Versão:** 1.1-beta
**Status:** Testing
```

### Step 4: Test
```bash
/bmad 02-spec
# Automatically finds and tests v1.1-beta
```

### Step 5: If Wins
```bash
confirm
# v1.1-beta → v1.0 (promoted)
# REGISTRY updated
```

---

## 🧪 Test Results Example

### 02-spec Evaluation

**v1.0 (Current)**
```
Coverage:   0.85  ← Good but could cover edge cases
Clarity:    0.75  ← Narrative style, less scannable
Efficiency: 0.77  ← Some redundant sections
Overall:    0.79  (Baseline)
```

**v1.1-beta (Candidate)**
```
Coverage:   0.88  ← ✓ Added checklist, clearer AC
Clarity:    0.89  ← ✓ YAML + MD structure, easier to scan
Efficiency: 0.82  ← ✓ Removed prose, more concise
Overall:    0.86  (Better by +0.07)
```

**Decision:** ✅ PROMOTE v1.1-beta to v1.0

---

## ⚙️ Configuration

Stored in `.claude/prompts/REGISTRY.md`:

```yaml
phases:
  01-search:
    current: v1.0
    variants: [v1.1-beta]
    score: 0.82
    tested: 2026-02-28

  02-spec:
    current: v1.0
    variants: [v1.1-beta]
    score: 0.79
    tested: 2026-02-28
```

---

## 🎯 Success Metrics

**Goal:** 10% improvement across all prompts in 1 month

```
Current average: (0.82 + 0.79 + 0.85 + 0.81 + 0.74) / 5 = 0.80
Target:         0.80 × 1.10 = 0.88
```

**Tracks:**
- ✓ Weekly variance testing
- ✓ Monthly promotion decisions
- ✓ Impact on final output quality
- ✓ Token savings (more efficient prompts)

---

## 🔗 References

- REGISTRY.md: Index de prompts (versionado)
- prompt-evaluator.py: Engine de avaliação
- Phase 2 BMAD: Plano 7 fases
- Decision log: Learning tracking

---

*Version:* 1.0
*Created:* 2026-02-28
*Tested:* ✅ Happy path, variant detection, winner promotion
