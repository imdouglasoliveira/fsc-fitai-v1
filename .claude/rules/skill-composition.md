# Skill Composition — Detailed Rules

Status: **LIVE** (Phase 3 Implementation)

---

## Overview

Skill Composition é um sistema para **orquestração automática de múltiplos skills em sequences** (workflows).

Ao invés de chamar skills individualmente:
```bash
/be STORY-X
# espera terminar
/tdd --test STORY-X
# espera terminar
/qa STORY-X
# espera terminar
/commit-dev STORY-X
```

Use composição:
```bash
/compose STORY-X
# Automatically runs: be → tdd → qa → commit
# With decision gates between each
```

---

## Composição Lifecycle

```
/compose {story-id}
  ↓
Skill Composer analyzes (agent: skill-composer)
  ├─ Story type? (feature/bug/refactor)
  ├─ Available skills?
  ├─ Time constraints?
  └─ Quality requirements?
  ↓
Generates Execution Plan
  ├─ Selected composition
  ├─ Skill sequence
  ├─ Decision gates
  └─ Estimated duration
  ↓
User approves
  ├─ Approve & execute
  ├─ Modify composition
  └─ Cancel
  ↓
Executes Composition
  ├─ Run skill 1
  ├─ Check gate 1
  ├─ Run skill 2
  ├─ Check gate 2
  ├─ ... (repeat)
  └─ Skill N
  ↓
Completes
  ├─ All gates passed? → Success
  ├─ Gate failed? → Rollback / Escalate
  └─ Logs composition result
```

---

## Built-in Compositions

### 1. bug-fix-minimal

**Template File:** `.claude/skills/_compositions/bug-fix-minimal.yaml`

**Skills:** Fix → TDD → QA → Commit

**Duration:** ~60 minutes

**When to use:**
- Simple bug fixes
- Time pressure (< 1 hour)
- Regression testing focused

**Decision gates:**
```
After Fix:        bug_root_cause_fixed
After TDD:        coverage >= 80% AND no regressions
After QA:         verdict == PASS
After Commit:     changes_successfully_pushed
```

---

### 2. full-feature-backend

**Template File:** `.claude/skills/_compositions/full-feature-backend.yaml`

**Skills:** BE → TDD → QA → Commit

**Duration:** ~120 minutes

**When to use:**
- New backend feature (API routes + DB)
- No frontend component
- Standard complexity

**Decision gates:**
```
After BE:         routes_defined AND migrations_valid
After TDD:        coverage >= 85% AND all_tests_pass
After QA:         verdict == PASS
After Commit:     changes_successfully_pushed
```

---

### 3. full-feature-frontend

**Template File:** `.claude/skills/_compositions/full-feature-frontend.yaml`

**Skills:** FE → TDD → ReactDoctor → QA → Commit

**Duration:** ~150 minutes

**When to use:**
- New frontend feature (components + hooks)
- No backend changes
- React best practices validation needed

**Decision gates:**
```
After FE:         components_structured AND styles_done
After TDD:        coverage >= 85% AND all_tests_pass
After ReactDoctor: no_critical_issues
After QA:         verdict == PASS
After Commit:     changes_successfully_pushed
```

---

### 4. full-feature-fullstack

**Template File:** `.claude/skills/_compositions/full-feature-fullstack.yaml`

**Skills:** BE → FE → TDD → ReactDoctor → QA → Commit

**Duration:** ~240 minutes

**When to use:**
- Complete feature (backend + frontend)
- API integration required
- Database schema changes + UI changes

**Decision gates:**
```
After BE:         routes_defined AND migrations_valid
After FE:         components_structured AND api_integrated
After TDD:        coverage >= 85% AND all_tests_pass
After ReactDoctor: no_critical_issues
After QA:         verdict == PASS
After Commit:     changes_successfully_pushed
```

---

## Composition Selection Logic

### Decision Matrix

| Story Type | Backend | Frontend | Time | Composition |
|-----------|---------|----------|------|-------------|
| Bug | ✓ | ✗ | < 1h | bug-fix-minimal |
| Bug | ✗ | ✓ | < 1h | bug-fix-minimal |
| Feature | ✓ | ✗ | 1-3h | full-feature-backend |
| Feature | ✗ | ✓ | 1-3h | full-feature-frontend |
| Feature | ✓ | ✓ | 3-5h | full-feature-fullstack |
| Refactor | ✓ | ✗ | 1-3h | full-feature-backend |
| Refactor | ✗ | ✓ | 1-3h | full-feature-frontend |
| Refactor | ✓ | ✓ | 2-4h | full-feature-fullstack |

### Scoring Algorithm

**Skill Composer calculates:**

```
composition_score = (
    clarity_factor * 0.3 +
    complexity_factor * 0.25 +
    time_pressure_factor * 0.25 +
    skill_availability_factor * 0.2
) * 100
```

**Clarity factor:**
- Very clear (95%+) → 1.0 (SDD-like)
- Clear (80-94%) → 0.8
- Medium (60-79%) → 0.6
- Unclear (< 60%) → 0.4

**Complexity factor:**
- Simple (1-8) → 0.6
- Standard (9-15) → 0.8
- Complex (16+) → 1.0

**Time pressure factor:**
- Urgent (< 2h) → 0.6 (use minimal)
- Normal (2-8h) → 0.8 (use standard)
- Relaxed (8+h) → 1.0 (use full)

**Skill availability factor:**
- All required skills available → 1.0
- Missing 1 skill → 0.7
- Missing 2+ skills → 0.4

**Selection rule:**
```
IF score >= 0.85:
  composition = "standard" (full-feature-{area})
ELSIF score >= 0.60:
  composition = "standard"
ELSE:
  composition = "custom" (ask user to define)
```

---

## Decision Gates

### Structure of Gate

```yaml
gate_name: "after_skill_x"
condition: "{validation_expression}"
action_on_pass: "proceed_to_skill_y"
action_on_fail:
  - retry: max_attempts
  - escalate: condition
  - alternative: other_composition
  - manual_review: required
```

### Standard Gates

**After Backend Skill:**
```yaml
condition: |
  routes_defined = true AND
  migrations_valid = true

on_fail:
  - Offer: Retry backend with improved inputs
  - Offer: Manual code review
  - Offer: Switch to interactive /be mode
```

**After Frontend Skill:**
```yaml
condition: |
  components_structured = true AND
  api_integration_correct = true

on_fail:
  - Offer: Retry frontend with better spec
  - Offer: Review API contract
  - Offer: Manual component review
```

**After TDD Skill:**
```yaml
condition: |
  coverage >= target AND
  all_tests_pass = true

on_fail:
  - Offer: Add more tests (specific areas)
  - Offer: Fix failing tests (auto-identify)
  - Offer: Lower coverage target (document)
```

**After React Doctor:**
```yaml
condition: |
  critical_issues = 0 AND
  (high_issues <= 2 OR high_issues_fixed = true)

on_fail:
  - Offer: Auto-fix high issues
  - Offer: Review and fix manually
  - Offer: Proceed with waiver (document)
```

**After QA Skill:**
```yaml
condition: |
  verdict = PASS OR
  verdict = CONCERNS AND
  all_concerns_documented = true

on_fail:
  - Offer: Return to dev for fixes
  - Offer: Review issues and address
  - Offer: Escalate to @architect
```

**After Commit:**
```yaml
condition: |
  commit_successful = true AND
  push_successful = true

on_fail:
  - Offer: Retry commit
  - Offer: Manual commit + push
  - Offer: Escalate to @devops
```

---

## Rollback Strategy

### When Rollback Triggered

```
IF gate_failed AND retry_count >= max_retries:
  1. Save current state → .claude/compositions/failed-{story-id}.json
  2. Revert to last known good state
  3. Create escalation issue
  4. Notify team
  5. Offer alternatives:
     - Try different composition
     - Manual intervention
     - Split into smaller tasks
```

### Rollback Safeguards

```
- Never delete uncommitted code
- Always save progress to state files
- Git worktrees ensure clean isolated state
- Composition state tracked in JSON
```

---

## Custom Compositions

### When to Create Custom

- Non-standard workflow
- Special requirements
- Unique sequence not in built-ins
- Experimental workflow

### How to Create

**Step 1: Define YAML**
```yaml
# .claude/skills/_compositions/my-custom.yaml
version: 1.0
name: "My Custom Composition"
skills:
  - skill: "/skill-1"
    inputs: {}
    outputs: []
  - skill: "/skill-2"
    inputs:
      data_from: "previous"
    outputs: []

decision_gates:
  after_skill_1:
    condition: "success_criteria"
    action: "proceed"
```

**Step 2: Invoke**
```bash
/compose STORY-X --composition my-custom
```

**Step 3: Register**
- Save YAML to `.claude/skills/_compositions/`
- Document in REGISTRY.md
- Add to this rules file

---

## Integration with Story Lifecycle

### Complete Flow

```
[Story Draft]
  ↓
[Story Ready (validated by @po)]
  ↓
/compose STORY-X
  ├─ Skill Composer analyzes
  ├─ Generates execution plan
  ├─ User approves
  └─ Composition executes
      ├─ Backend skill
      ├─ Gate 1: PASS
      ├─ Frontend skill (if needed)
      ├─ Gate 2: PASS
      ├─ TDD skill
      ├─ Gate 3: PASS
      ├─ QA skill
      ├─ Gate 4: PASS/FAIL
      └─ If PASS: Commit
         If FAIL: Return to dev

[Story Done or InReview]
  ↓
[Deployment via @devops]
```

---

## Configuration

### File: `.claude/skill-composer.local.md`

```yaml
---
# Composition defaults
mode: "interactive"              # interactive | auto | yolo
max_retries_per_skill: 2         # How many times retry if gate fails
default_coverage_target: 85      # TDD coverage requirement (%)
timeout_per_skill_minutes: 120   # Max time per individual skill
timeout_total_minutes: 300       # Max total composition time
auto_approve_same_composition: false  # Approve if running same composition twice
allow_parallel_skills: false     # Can skills run in parallel? (default no)
---

## Defaults

- **Coverage target for bugs:** 70-80%
- **Coverage target for features:** 85%
- **Coverage target for critical:** 95%+
- **Max composition time:** 5 hours
- **Timeout per skill:** 2 hours
- **Retry strategy:** Linear backoff (wait 2-4-8 min between retries)
```

---

## Metrics & Tracking

### Per-Composition Metrics

```json
{
  "composition_id": "STORY-42-comp-20260228",
  "story_id": "STORY-42",
  "composition_name": "full-feature-fullstack",
  "skills_executed": ["be", "fe", "tdd", "react-doctor", "qa", "commit"],
  "gates_passed": 6,
  "gates_failed": 0,
  "duration_actual_minutes": 215,
  "duration_estimated_minutes": 240,
  "accuracy_percent": 89.6,
  "timestamp": "2026-02-28T14:30:00Z",
  "status": "completed_successfully"
}
```

### Monthly Report

```
Total compositions: {N}
Success rate: {%}
Average duration: {Xh Ym}
Most common composition: {name}
Slowest gate: {gate_name}
Fastest composition: {name}
Lessons learned: {list}
```

---

## Best Practices

1. **Use auto-detection** (`/compose STORY-X`)
   - Composer is usually right
   - Override only if you know better

2. **Understand each skill**
   - Review skill outputs before next gate
   - Ask questions if anything seems wrong

3. **Don't skip gates**
   - Gates ensure quality
   - If gate fails, fix root cause (not the gate)

4. **Adjust coverage targets per story type**
   - Bug fixes: 70-80% (regression-focused)
   - Features: 85% (comprehensive)
   - Critical: 95%+ (exhaustive)

5. **Document custom compositions**
   - If creating custom, add to registry
   - Explain why it's needed
   - Re-use if similar needs arise

6. **Learn from failures**
   - When gate fails, understand why
   - Log lessons learned
   - Improve composition if needed

---

## Error Handling

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Coverage < 85%" | Insufficient tests | Add tests, lower target, or accept with doc |
| "React best practice violation" | Code pattern issue | Fix pattern or escalate for review |
| "QA FAIL" | Requirements not met | Return to dev, fix, re-run |
| "Commit failed" | Git state issue | Resolve conflicts, retry |
| "Timeout exceeded" | Skill takes too long | Check skill logs, increase timeout, escalate |

---

## Success Metrics

✅ **Composition Success = All of:**
- Every skill completes
- Every gate passes (or waived with doc)
- Code properly tested
- Code committed to dev
- Story status updated
- Execution logged

---

## References

- **Built-in Compositions:** `.claude/skills/_compositions/`
- **Skill Composer Agent:** `.claude/agents/skill-composer.system.md`
- **Composer Skill:** `.claude/skills/composer/SKILL.md`
- **Configuration:** `.claude/skill-composer.local.md`
- **Execution Log:** `.claude/compositions/`

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
