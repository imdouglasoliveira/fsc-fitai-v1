# Workflow Routing — Detailed Rules

Status: **LIVE** (Phase 5 Implementation)

---

## Overview

Workflow Routing é um sistema de **roteamento inteligente** que recomenda o melhor workflow para cada história baseado em análise de dados e histórico.

Ao invés de assumir todos stories seguem o mesmo caminho:
- Ralph Loop: Para requisitos ambíguos (< 50% clarity)
- SDD Linear: Para requisitos claros (> 80% clarity)
- Rapid Bug Fix: Para bugs simples (< 8 complexity)
- Escalation: Para complexidade alta ou decisões arquiteturais

---

## Routing Lifecycle

```
Story Created
  ↓
/workflow-select STORY-X
  ↓
[Workflow Router analyzes]
  ├─ Extract: clarity, complexity, type, time pressure
  ├─ Calculate: routing score for each workflow
  ├─ Query: historical patterns and success rates
  └─ Recommend: best workflow + confidence + alternatives
  ↓
User reviews recommendation
  ├─ Approve recommended workflow
  ├─ Ask questions/clarifications
  └─ Request alternative if needed
  ↓
Execute selected workflow
  └─ Ralph/SDD/Rapid/Escalate
  ↓
/audit captures decision + outcome
  ↓
Memory updated → future routing improves
```

---

## Routing Decision Matrix

### Story Type × Clarity × Complexity

#### Bug Stories

| Complexity | Workflow | Duration | Success | Threshold |
|-----------|----------|----------|---------|-----------|
| 1-5 | Rapid Bug Fix | 45-60m | 94% | Always |
| 6-10 | Rapid Bug Fix | 60-90m | 92% | Always |
| 11+ | Escalate | 2-4h | 85% | Complex investigation needed |

#### Feature Stories (Clarity >= 80%)

| Complexity | Workflow | Duration | Success | Note |
|-----------|----------|----------|---------|------|
| 1-10 | SDD → composition | 2-4h | 96% | Clear requirements |
| 11-15 | SDD → composition | 3-5h | 94% | Pre-arch review recommended |
| 16+ | Escalate to @architect | 4-8h | 85% | Needs architectural decision |

#### Feature Stories (50-80% Clarity)

| Complexity | Workflow | Duration | Success | Note |
|-----------|----------|----------|---------|------|
| 1-10 | SDD + clarification | 3-5h | 85% | Need 1-2 clarification rounds |
| 11-15 | Ralph → SDD | 2-4h | 88% | Explore, then specify |
| 16+ | Ralph + architect | 3-6h | 82% | Complex + ambiguous |

#### Feature Stories (Clarity < 50%)

| Complexity | Workflow | Duration | Success | Note |
|-----------|----------|----------|---------|------|
| 1-10 | Ralph → composition | 1.5-3h | 91% | Autonomous exploration |
| 11-15 | Ralph → composition | 2-4h | 89% | More iterations expected |
| 16+ | Ralph + architect | 3-6h | 85% | Complex ambiguous case |

---

## Routing Scoring Algorithm

### Clarity Factor (0.0-1.0)

```
IF clarity >= 90%:    factor = 0.95  (favor SDD)
ELIF clarity >= 80%:  factor = 0.90
ELIF clarity >= 70%:  factor = 0.75
ELIF clarity >= 60%:  factor = 0.60
ELIF clarity >= 50%:  factor = 0.50  (neutral)
ELIF clarity >= 40%:  factor = 0.30
ELIF clarity >= 30%:  factor = 0.15  (favor Ralph)
ELSE:                 factor = 0.05
```

### Complexity Factor (0.0-1.0)

```
IF complexity <= 5:    factor = 0.70  (favor rapid/simple)
ELIF complexity <= 8:  factor = 0.75
ELIF complexity <= 12: factor = 0.85  (favor standard)
ELIF complexity <= 15: factor = 0.90
ELSE:                  factor = 1.00  (favor escalation)
```

### Time Pressure Factor (0.0-1.0)

```
IF time_available < 1h:  factor = 0.60  (favor rapid)
ELIF time_available < 2h: factor = 0.75
ELIF time_available < 4h: factor = 0.85  (favor standard)
ELIF time_available < 8h: factor = 0.95
ELSE:                     factor = 1.00  (can be thorough)
```

### Resource Factor (0.0-1.0)

```
IF all_skills_available:       factor = 1.00
ELIF 1_skill_missing:         factor = 0.80
ELIF 2_skills_missing:        factor = 0.60
ELIF critical_skill_missing:  factor = 0.40
```

### Final Routing Score

```
workflow_score = (
    clarity_factor * 0.35 +
    complexity_factor * 0.30 +
    time_factor * 0.20 +
    resource_factor * 0.15
)
```

### Selection Rule

```
IF max_score >= 0.85:
  recommendation_confidence = 0.90+

ELSIF max_score >= 0.75:
  recommendation_confidence = 0.80+

ELSIF max_score >= 0.65:
  recommendation_confidence = 0.70+

ELSE:
  recommendation_confidence = 0.60 (needs manual review)
```

---

## Workflow Types

### 1. Ralph Loop

**Triggers:**
- Clarity < 60%
- Multiple interpretations possible
- Time available >= 1.5 hours
- Complexity <= 15

**Success Rate:** 91%

**Composition:** full-feature-{area}

**Duration:** 1-2 hours

**When to switch to SDD:** Clarity improves to > 70%

---

### 2. SDD Linear

**Triggers:**
- Clarity >= 80%
- Clear acceptance criteria
- Complexity <= 15
- Any time pressure

**Success Rate:** 96%

**Composition:** full-feature-{area}

**Duration:** 2-4 hours

**When to switch to Ralph:** New blockers found (clarity drops)

---

### 3. Rapid Bug Fix

**Triggers:**
- Story type: bug
- Complexity <= 10
- Time pressure: any
- Root cause known or suspected

**Success Rate:** 94%

**Composition:** bug-fix-minimal

**Duration:** 45-90 minutes

**When to escalate:** Root cause unknown or systemic issue

---

### 4. Escalation to Architecture

**Triggers:**
- Complexity > 15
- Major architectural implications
- External dependencies
- Security/performance critical

**Success Rate:** 85% (eventually needed)

**Owner:** @architect team

**Duration:** 4+ hours

**Prevents:** Rework, architectural debt

---

## Historical Pattern Integration

### Querying Memory for Predictions

```
Before recommending workflow:
  1. Query decision-log.json
  2. Find similar past decisions
  3. Check success rates by clarity/complexity
  4. Adjust recommendation confidence

Example Query:
  "Stories with 35% clarity + 14 complexity"
  Result: Ralph selected 40 times, succeeded 38 times (95%)
  Action: Confidence boosted from 0.91 to 0.95
```

### Learning from Deviations

```
If actual outcome differs from prediction:
  1. Log deviation in memory
  2. Analyze root cause
  3. Update model if systematic pattern

Example:
  Predicted: Ralph 92% success
  Actual: 88% (lower than expected)
  Reason: Team less familiar with Ralph loop
  Action: Consider team experience in future scoring
```

---

## Error Handling

### When Routing Fails

```
Situation: Recommended workflow selected, but story escalates
Action:
  1. Log to decision-log.json (outcome: "escalated")
  2. Analyze why recommendation was wrong
  3. If systematic: update thresholds
  4. If one-off: document as edge case

Example:
  Ralph recommended (clarity 45%)
  After iteration 3: External API integration discovered
  Root cause: Hidden dependency not in spec
  Learning: Add "check for external dependencies" to Ralph process
```

### Low Confidence Handling

```
IF recommendation_confidence < 0.70:
  1. Flag for manual review
  2. Offer user to pick from alternatives
  3. Document rationale for chosen workflow
  4. Log decision regardless

This prevents "wrong" recommendation from biasing learning
```

---

## User Override Policy

### When User Can Override

```
Allowed Overrides:
- "Team prefers SDD" (valid: team familiarity)
- "Time constraint changed" (valid: new info)
- "Stakeholder requires escalation" (valid: business)

Not Allowed:
- "Just want to try this" (invalid: no reason)
- "Router usually wrong" (invalid: statistically wrong)
- Contradicting clear data (invalid: ignoring evidence)
```

### Logging Overrides

```
{
  "type": "workflow_selection",
  "original_recommendation": "Ralph",
  "user_selected": "SDD",
  "override_reason": "Team prefers SDD methodology",
  "override_confidence": 0.5,
  "accepted": true
}
```

---

## Integration with Other Phases

### Ralph Governor Integration

```
Workflow Router recommends Ralph
  ↓
Ralph Governor confirms (or adjusts confidence)
  ↓
Both log decision with combined confidence
  ↓
If different recommendation: escalate for review
```

### Skill Composer Integration

```
Workflow selected (e.g., Ralph)
  ↓
Skill Composer auto-detects composition
  ↓
Composer recommends full-feature-fullstack
  ↓
Both decisions logged together
```

### Memory Manager Integration

```
Routing decision made
  ↓
Memory Manager captures: clarity, complexity, chosen workflow
  ↓
Execution happens
  ↓
Outcome recorded
  ↓
Learning extracted for next routing decision
```

---

## Success Metrics

### Individual Routing Success

✅ **Routing is successful if:**
- Analysis complete and reasonable
- Confidence score >= 0.70
- User approves or provides feedback
- Recommendation matches actual chosen workflow (90%+ of time)

### System-Level Success

✅ **Routing system works if:**
- 90%+ of routed stories succeed
- Escalations caught early (< 5% rate)
- Duration estimates within ±15%
- Learning improves future recommendations (trending up)

---

## Configuration

File: `.claude/workflow-router.local.md`

```yaml
---
routing_mode: "intelligent"
use_historical_data: true
min_confidence_threshold: 0.70
allow_user_override: true
log_routing_decisions: true
scoring_weights:
  clarity: 0.35
  complexity: 0.30
  time: 0.20
  resources: 0.15
---
```

---

## References

- **Workflow Router Agent:** `.claude/agents/workflow-router.system.md`
- **Workflow Select Skill:** `.claude/skills/workflow-select/SKILL.md`
- **Decision Log:** `.claude/memory/decision-log.json`
- **Ralph Governor:** `.claude/agents/ralph-governor.system.md`
- **Skill Composer:** `.claude/agents/skill-composer.system.md`

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
