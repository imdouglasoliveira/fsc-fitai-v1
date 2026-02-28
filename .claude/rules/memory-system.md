# Memory System — Detailed Rules

Status: **LIVE** (Phase 4 Implementation)

---

## Overview

Memory System é um framework para **aprendizado contínuo** do A8Z framework.

Ao invés de tomar as mesmas decisões repetidamente, o sistema:
- ✅ Captura todas as decisões arquiteturais
- ✅ Registra contexto e outcomes
- ✅ Identifica padrões de sucesso/falha
- ✅ Recommenda melhorias baseado em dados
- ✅ Incrementalmente evolui o framework

---

## Memory Architecture

```
Decision Event
  ↓
[Memory Manager]
  ├─ Capture context
  ├─ Record to decision-log.json
  └─ Identify decision type
  ↓
Execution Phase
  ├─ Skill runs
  ├─ Composer orchestrates
  └─ Outcomes collected
  ↓
Post-Execution
  ├─ Update decision record with outcome
  ├─ Calculate success/failure
  └─ Extract lessons learned
  ↓
[Learning System]
  ├─ Weekly pattern analysis
  ├─ Monthly insights
  └─ Recommendations to teams
  ↓
[Framework Improvement]
  ├─ Ralph thresholds adjusted
  ├─ Prompt variants created
  ├─ Composition estimates updated
  └─ Next decisions informed by learning
```

---

## Decision Lifecycle

### Phase 1: Capture

**When:** Decision is about to be made

**What:** Capture context before committing

```json
{
  "id": "DECISION-{timestamp}",
  "timestamp": "ISO8601",
  "type": "workflow_selection",
  "story_id": "STORY-42",
  "title": "Determine Ralph vs SDD",

  "context": {
    "clarity_percent": 35,
    "complexity_score": 14,
    "time_pressure": "medium",
    "iteration_estimate": 4
  },

  "decision": "Ralph Loop",
  "alternatives_considered": [
    "SDD (would require more clarification)",
    "Escalate to @architect (too slow)"
  ],
  "rationale": "35% clarity optimal for Ralph exploration",
  "confidence": 0.78,

  "decision_maker": "ralph-governor",
  "timestamp_decided": "ISO8601",
  "outcome": null
}
```

**Who captures:** Each agent/skill auto-captures when making decisions

### Phase 2: Execute

**What:** Framework executes the decision

```
Ralph loop starts
  → iterations 1-3
  → converge on spec
  → success
```

### Phase 3: Record Outcome

**When:** Execution completes

**What:** Update decision record with results

```json
{
  ...
  "outcome": "successful",
  "timestamp_completed": "ISO8601",

  "execution_data": {
    "actual_iterations": 3,
    "convergence_time_minutes": 45,
    "spec_quality_score": 0.88,
    "clarity_improvement": 65
  },

  "lessons_learned": "Ralph was 25% faster than estimated",
  "impact_assessment": {
    "time_saved": 15,
    "quality_improved": "+65% clarity",
    "complexity_delta": -2
  }
}
```

### Phase 4: Pattern Extraction

**When:** Monthly or after N decisions

**What:** Analyze patterns across decisions

```
Question: What's Ralph's accuracy?
Data:
  - Ralph selected: 42 times
  - Successful: 40 times
  - Failed: 2 times

Success rate: 95%
Confidence by clarity level:
  - 20-30% clarity: 92% success
  - 30-50% clarity: 96% success  ← SWEET SPOT
  - 50-70% clarity: 88% success

Insight: Ralph is well-calibrated for 30-50% clarity
```

### Phase 5: Learning Application

**What:** Improve future decisions based on patterns

```
Previous: Ralph threshold was clarity < 50%
Learning: Ralph succeeds 96% at clarity 30-50%
Action: Keep threshold at 50% (still accurate)

Previous: Fullstack composition estimated 240m
Learning: Average actual 217m (90% accurate)
Action: Update estimate to 220m

Previous: No prompt variant for 03-tasks
Learning: Structure improvements work (+8.9% on 02-spec)
Action: Create 03-tasks v1.1-beta with better structure
```

---

## Decision Types

### 1. Workflow Selection

**Agent:** ralph-governor

**Decision:** Ralph Loop vs SDD

**Captured context:**
```yaml
clarity_percent: 0-100
complexity_score: 1-20
time_pressure: low | medium | high
iteration_estimate: 1-5+
```

**Success metrics:**
- Did Ralph converge within estimated iterations?
- Did SDD produce sufficient spec?
- Was choice appropriate?

---

### 2. Composition Selection

**Agent:** skill-composer

**Decision:** Which composition (bug-fix-minimal, full-feature-backend, etc.)

**Captured context:**
```yaml
story_type: bug | feature | refactor
backend_needed: true | false
frontend_needed: true | false
complexity_score: 1-20
```

**Success metrics:**
- Did all gates pass?
- Was time estimate accurate?
- Quality score acceptable?

---

### 3. Prompt Variant Promotion

**Agent:** BMAD

**Decision:** Promote v1.1-beta to v1.0 or keep current?

**Captured context:**
```yaml
prompt_phase: 01-search | 02-spec | ...
variant: v1.1-beta | v1.2-beta | ...
score_v1_0: 0.79
score_variant: 0.86
delta: +0.07
```

**Success metrics:**
- Does new version actually work better?
- Coverage/clarity/efficiency improvement sustained?
- Did it improve downstream quality?

---

### 4. Architecture Decision

**Agent:** @architect, @data-engineer, etc.

**Decision:** Design choice (JWT vs OAuth, PostgreSQL schema, etc.)

**Captured context:**
```yaml
domain: authentication | database | api | ...
chosen_option: JWT
alternatives: [OAuth2, Session, API keys]
rationale: "Stateless, scalable, standard"
```

**Success metrics:**
- Does chosen option scale well?
- Any regressions or issues?
- Would alternative have been better?

---

### 5. Escalation

**Trigger:** Gate fails, blockers found, external dependency

**Captured context:**
```yaml
reason: "TDD coverage < 85%"
escalated_to: "@dev"
blocking: true
resolution: null
```

**Success metrics:**
- Was escalation necessary?
- How was it resolved?
- Could it have been prevented?

---

## Decision Log Schema

### File: `.claude/memory/decision-log.json`

```json
{
  "metadata": {
    "version": "1.0",
    "created": "ISO8601",
    "last_updated": "ISO8601",
    "total_decisions": N
  },

  "decisions": [
    {
      "id": "DECISION-{timestamp}",
      "timestamp": "ISO8601",
      "type": "workflow_selection | composition_selection | ...",

      "story_id": "STORY-42",
      "title": "Selected Ralph for ambiguous story",

      "context": { /* decision-specific context */ },

      "decision": "Ralph Loop",
      "rationale": "Requirements 35% clear...",
      "alternatives_considered": ["SDD", "Escalate"],
      "decision_maker": "ralph-governor",
      "confidence": 0.78,

      "outcome": "successful | failed | escalated | pending",
      "timestamp_completed": "ISO8601",
      "execution_data": { /* actual outcomes */ },
      "lessons_learned": "string"
    }
  ],

  "statistics": {
    "by_type": { /* counts */ },
    "by_status": { /* counts */ },
    "confidence_histogram": { /* distribution */ }
  },

  "learning_patterns": {
    "most_effective_workflows": [],
    "most_common_escalations": [],
    "prompt_improvements": [],
    "composition_insights": [],
    "story_type_patterns": {}
  },

  "monthly_summary": {
    "february_2026": {
      "total_decisions": N,
      "success_rate": 0.938,
      "key_insights": [],
      "recommendations": []
    }
  }
}
```

---

## Pattern Analysis

### Weekly Analysis

**Trigger:** Every Friday

**What:** Quick summary of week's decisions

```markdown
## Weekly Summary: Week of Feb 24-28

Decisions made: 12
Success rate: 92%
Most common type: composition_selection (7)
Most escalated: TDD gate failures (2)

Action items: None immediate
```

### Monthly Analysis

**Trigger:** First Friday of month

**What:** Deep dive into all month's decisions

```
1. Success rate by type
2. Confidence accuracy
3. Timing estimates vs actuals
4. Failure analysis
5. Prompt improvements
6. Framework recommendations
```

### Quarterly Trends

**Trigger:** End of quarter

**What:** Long-term patterns and evolution

```
Q1 2026 Trends:
- Success rate: 91% → 93% (improving)
- Ralph accuracy: 94% → 96% (calibrating well)
- Composition timing: 85% → 93% accurate (learning)
- Prompt improvements: +0% → +8.9% (finding good variants)
```

---

## Integration with Framework

### Ralph Governor Uses Memory

```
Before deciding workflow:
  1. Query decision-log.json
  2. Find similar past decisions
  3. Check success rate for this clarity level
  4. Adjust recommendation confidence based on history

Example:
  "For clarity 35%, Ralph succeeded 96% of time (40/42 cases)"
  → Use that data to calibrate recommendation
```

### BMAD Uses Memory

```
Before promoting variant:
  1. Look at past prompt variants
  2. Which improvement strategies worked?
  3. Are we improving on known weak dimensions?

Example:
  "02-spec: structure helped (+8.9%)"
  "03-tasks: should also focus on structure"
  → Design 03-tasks variant with better structure
```

### Composer Uses Memory

```
When selecting composition:
  1. Query success rates by story type
  2. Check timing estimates vs actuals
  3. Adjust estimates based on real data

Example:
  "fullstack compositions: avg 240m estimated, 217m actual"
  → Update estimate to 220m in composition selection
```

---

## Learning Rules

### Rule 1: Document Decisions
**Every decision must be captured** — no exceptions.

If you can't document why you decided something, the decision is unclear.

### Rule 2: Record Outcomes
**Every decision must have an outcome recorded** — after execution completes.

Can't learn if you don't know if the decision was right.

### Rule 3: Extract Patterns
**Monthly pattern extraction is mandatory** — not optional.

Patterns drive improvement. No patterns = no learning.

### Rule 4: Apply Learning
**If data suggests improvement, propose it** — don't ignore data.

Framework improves by acting on lessons learned.

### Rule 5: No Surprises
**If decision succeeds unexpectedly well, investigate why.**

Surprises reveal unknown factors (positive or negative).

---

## Escalation & Root Cause Analysis

### When Escalation Occurs

```
Gate fails
  ↓
Log: "TDD coverage < 85%"
  ↓
Return to dev
  ↓
[After resolution]
  ↓
Escalation analysis:
  - Was it preventable?
  - What was root cause?
  - How to prevent next time?

Example:
  Cause: Missing edge case tests
  Prevention: Add edge case requirement to TDD checklist
  Learning: Better upfront test requirement definition
```

---

## Success Metrics

### Individual Decision Level
✅ Confidence score reasonable (0.5-0.95)
✅ Outcome recorded after execution
✅ Success/failure clear
✅ Lessons extracted

### System Level
✅ 90%+ success rate overall
✅ Escalation rate < 10%
✅ Monthly pattern analysis completed
✅ Recommendations applied each month
✅ Framework metrics trending upward

---

## Configuration

File: `.claude/memory-manager.local.md`

```yaml
---
mode: "learning"
auto_capture: true  # Automatically capture decisions
capture_all_decisions: true  # No exceptions
learning_feedback_frequency: "weekly"
monthly_review: true
pattern_analysis_threshold: 20  # Analyze after 20 decisions
---
```

---

## References

- **Decision Log:** `.claude/memory/decision-log.json`
- **Memory Manager Agent:** `.claude/agents/memory-manager.system.md`
- **Audit Skill:** `.claude/skills/audit/SKILL.md`
- **Memory Configuration:** `.claude/memory-manager.local.md`

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
