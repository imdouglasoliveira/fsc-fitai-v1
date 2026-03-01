# Ralph Loop Patterns — Memento + Context Reset

Status: **ACTIVE** (based on Memento pattern from Half Loops research)

---

## Overview

Ralph Loop implementa o **padrão Memento** (do filme Memento, Christopher Nolan) combinado com:
- ✅ Context reset após cada tarefa
- ✅ `progress.txt` como "fonte da verdade"
- ✅ PRD (Product Requirements Document) imutável
- ✅ Iterações máximas com fallback

**Metáfora:** "Um homem que caminha 1000 milhas, toda manhã acorda esquecendo seu objetivo e diz: 'Hoje vou andar 25 milhas, depois durmo e acordo'."

---

## File Structure

```
.claude/ralph-loops/
├── STORY-X/                    # Isolado por story
│   ├── prd.md                 # PRD imutável (fonte da verdade)
│   ├── progress.txt           # Progress atualizado a cada iteração
│   ├── iteration-logs/        # Logs de cada iteração (1-N)
│   │   ├── iteration-001.json
│   │   ├── iteration-002.json
│   │   └── ...
│   └── state-dumps/           # Context snapshots (opcional)
│       ├── before-iteration-001.md
│       └── after-iteration-N.md
└── STORY-Y/
    └── ...
```

---

## Initialization

### PRD Creation

**Agent:** Ralph Governor

**Output:** `prd.md` (immutable)

```markdown
---
story_id: STORY-42
created: ISO8601
source: user | auto-generated
clarity_percent: 35
complexity_score: 14
---

# Product Requirements Document

## Objective
[Clear, single-sentence objective]

## Background
[Why this is needed, business context]

## Scope

### In Scope
- [ ] Feature A
- [ ] Feature B

### Out of Scope
- X (explain why)

## Requirements

### Functional
- REQ-1: [Clear, testable requirement]
- REQ-2: ...

### Non-Functional
- PERF: [Performance requirement]
- SEC: [Security requirement]

## Success Criteria

- [ ] All REQs implemented
- [ ] AC (acceptance criteria) met
- [ ] Code quality acceptable
- [ ] No regressions

## Acceptance Criteria (AC)

Given [context]
When [action]
Then [outcome]

## Definition of Done (DoD)

- [ ] Code written and tested
- [ ] PR reviewed
- [ ] Merged to dev
- [ ] CI/CD passing
```

---

## Iteration Lifecycle

### Before Each Iteration

**File:** `progress.txt`

```
STORY: STORY-42
PRD_SOURCE: prd.md
ITERATION: 3 of 5

STATUS: In Progress
LAST_UPDATE: ISO8601

## Completed
- [x] Iteration 1: Initial exploration
- [x] Iteration 2: Identify blockers

## Current (Iteration 3)
- [ ] Task A
- [ ] Task B
- [ ] Task C

## Blocked By
- External API not ready
- Design decision pending

## Next Steps
If Iteration 3 succeeds:
  → Iteration 4: Integration testing
If blocked:
  → Escalate to @architect
```

### During Iteration

**Context Reset Pattern:**
```bash
# OLD (BAD - context rot)
Cloud Code session continues for hours
Context grows unbounded
Output quality degrades

# NEW (GOOD - Memento pattern)
Start iteration N:
  1. Read PRD from prd.md
  2. Read progress.txt
  3. Run Cloud Code task
  4. Save output
  5. Update progress.txt
  6. Increment iteration counter
  7. RESET Claude context completely
  8. Go to step 1
```

### Iteration Log

**File:** `iteration-logs/iteration-001.json`

```json
{
  "story_id": "STORY-42",
  "iteration": 1,
  "timestamp_start": "2026-02-28T10:00:00Z",
  "timestamp_end": "2026-02-28T10:15:00Z",
  "duration_seconds": 900,

  "context_size_before": 2048,
  "context_size_after": 4096,
  "context_rot_detected": false,

  "task_assigned": "Explore and clarify ambiguous requirement #3",
  "task_completed": true,
  "task_success": true,

  "findings": [
    "Requirement #3 has 2 possible interpretations",
    "Team prefers interpretation A",
    "Impacts design decision X"
  ],

  "output_files": [
    "exploration-notes.md",
    "clarification-questions.md"
  ],

  "next_iteration_plan": "Refine spec based on findings",
  "should_continue": true,
  "confidence": 0.85,

  "errors": [],
  "warnings": ["Design decision still pending"]
}
```

---

## Convergence Criteria

Ralph Loop STOPS when ANY of these is true:

### ✅ HAPPY PATH: Spec Converged
```
Condition:
  - Spec hasn't changed >10% from previous iteration
  - All AC (acceptance criteria) defined
  - DoD (definition of done) clear
  - No more blockers
  - Iteration count < max

Action:
  - Mark status CONVERGED
  - Move to Ready for @dev
  - Log learning to memory
```

### ⚠️ MAX ITERATIONS: Reached limit
```
Condition:
  - Iteration count = 5 (or configured max)

Action:
  - Save best attempt
  - Create escalation issue
  - Flag for @po/@architect manual review
  - Status: ESCALATED
```

### ❌ ERROR LOOP: Stuck
```
Condition:
  - Same error 3 iterations in a row
  - Example: "Cannot integrate with OAuth provider"

Action:
  - Escalate immediately
  - Document error context
  - Status: BLOCKED
```

### 🔄 CLARITY IMPROVED: No longer needs Ralph
```
Condition:
  - During Ralph, discovers: "Actually, this IS clear (>80%)"

Action:
  - Switch to SDD (faster from here)
  - Cancel Ralph loop
  - Status: DELEGATED_TO_SDD
```

### 🚧 EXTERNAL BLOCKER: New dependency found
```
Condition:
  - "Need API from other team first"
  - "Design decision required from @architect"

Action:
  - Block on external item
  - Escalate with blocker documented
  - Status: BLOCKED_EXTERNAL
  - Resume when blocker removed
```

---

## Memory Integration

### Decision Capture

**Every Ralph loop logs:**

```json
{
  "id": "DECISION-ralph-20260228-001",
  "type": "ralph_loop_execution",
  "story_id": "STORY-42",

  "context": {
    "initial_clarity": 35,
    "initial_complexity": 14,
    "time_available": "2 hours",
    "team_experience": "medium"
  },

  "execution": {
    "iterations_completed": 3,
    "total_duration_minutes": 45,
    "convergence": "happy_case",
    "final_clarity": 82
  },

  "outcomes": {
    "spec_quality_score": 0.88,
    "acceptance_criteria_count": 7,
    "blockers_identified": 0
  },

  "lessons_learned": [
    "Clarity improved from 35% to 82% in 3 iterations",
    "Iteration 2 was most productive (found 3 critical requirements)",
    "External API blocker found early - good!"
  ],

  "success": true
}
```

---

## Configuration

### `.claude/ralph-loop.local.md`

```yaml
---
mode: "learning"
enabled: true
max_iterations: 5
iteration_timeout_minutes: 20
total_timeout_minutes: 120
context_reset_strategy: "complete"  # complete | partial | none
save_state_snapshots: true
log_to_memory: true
escalation_on_error_repeats: 3
---

## Default Settings

- **Max iterations:** 5 (configurable per story)
- **Iteration timeout:** 20 minutes (detect infinite loops)
- **Total timeout:** 120 minutes (2 hours max for full loop)
- **Context reset:** Complete (clear everything between iterations)
- **Learning:** Automatic decision logging
- **Escalation:** On 3x same error OR max iterations reached
```

---

## Best Practices

### ✅ DO:
1. **Read PRD first** - always start from PRD, not context
2. **Update progress.txt** - after every iteration
3. **Save iteration logs** - JSON with structured data
4. **Reset context** - completely between iterations
5. **Document findings** - what you learned this iteration

### ❌ DON'T:
1. **Assume context persists** - it doesn't, plan for resets
2. **Modify PRD** - treat it as immutable source of truth
3. **Skip progress.txt updates** - it's your recovery point
4. **Continue past blockers** - escalate when blocked
5. **Iterate without learning** - log outcomes for memory

---

## Example: Ralph Loop for STORY-42

### Initial State

**clarity:** 35% (ambiguous)
**complexity:** 14 (standard)
**time:** 2 hours available

### Iteration 1: Initial Exploration
```
Input: PRD + empty progress.txt
Task: "Identify 3 possible interpretations of requirement #3"
Output: exploration-notes.md with 3 options
Finding: Team preference for Option A not documented
Progress: ✓ clarified #3, still ambiguous on design impact
Next: Get design feedback
```

### Iteration 2: Design Feedback
```
Input: PRD + progress.txt + exploration notes
Task: "Design impact analysis for Option A"
Output: design-impact.md with architecture implications
Finding: Option A impacts 4 services, needs @architect review
Progress: ✓ design impact clear, but needs approval
Next: Get @architect sign-off
```

### Iteration 3: Spec Refinement
```
Input: PRD + progress.txt + design feedback
Task: "Refine AC and DoD based on design feedback"
Output: updated-ac.md + updated-dod.md
Finding: All AC now testable, DoD clear
Progress: ✓ spec converged, ready for dev
Status: CONVERGED → Ready for @dev
```

---

## Integration with Story Lifecycle

```
Draft Story
  ↓
[Analyze clarity/complexity]
  ├─ If clear (>80%) → SDD path
  └─ If ambiguous (<60%) → Ralph Loop path
       ↓
    Ralph Loop (1-5 iterations)
       ↓
       ├─ Converged? → Story Ready
       ├─ Max iters? → Escalate
       ├─ Blocked? → Escalate
       └─ Clarity improved? → Switch to SDD
       ↓
    Ready Story
       ↓
    @dev Implements
```

---

## References

- **Memento Pattern:** https://refactoring.guru/design-patterns/memento
- **Christopher Nolan - Memento (2000):** Memory and forgetting
- **Half Loops Research:** Claude Code documentation on context management
- **Memory System:** `.claude/rules/memory-system.md`
- **Ralph Governor Agent:** `.claude/agents/ralph-governor.system.md`

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for implementation
*Inspired by:* Memento pattern + Half Loops + Claude Code context management
