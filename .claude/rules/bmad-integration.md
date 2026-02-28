# BMAD Integration — Detailed Rules

Status: **LIVE** (Phase 2 Implementation)

---

## Overview

BMAD (Brazilian Method of AI Development) is a **lightweight, iterative prompt optimization system** that:
- ✅ Tests prompt variants in parallel
- ✅ Scores them on Coverage, Clarity, Efficiency
- ✅ Recommends best version
- ✅ Tracks improvements over time

---

## Prompt Lifecycle

```
Initial Prompt (v1.0)
  ↓
Create variant (v1.1-beta)
  ↓
Test both with /bmad
  ↓
Compare scores
  ├─ If variant wins → Promote to v1.0
  ├─ If current wins → Keep testing
  └─ If tie → Keep both, test more
  ↓
Update REGISTRY.md
  ↓
Log learning
```

---

## Evaluation Dimensions

### 1. Coverage (0.0-1.0)
**Question:** Does prompt address ALL requirements?

**Criteria:**
- ✅ Has clear objective/introduction
- ✅ Has step-by-step process
- ✅ Defines expected output
- ✅ Includes examples
- ✅ Mentions error/edge cases

**Scoring:**
- 0.8 baseline + 0.05 per criterion (max 1.0)

---

### 2. Clarity (0.0-1.0)
**Question:** Is prompt clear and unambiguous?

**Criteria:**
- ✅ Good structural organization (headers, sections)
- ✅ Uses bullet points for scannability
- ✅ Consistent formatting
- ✅ Clear vocabulary (no jargon)
- ✅ Reasonable line length (not too long)

**Scoring:**
- 0.7 baseline + bonuses for structure

---

### 3. Efficiency (0.0-1.0)
**Question:** What's the token-to-value ratio?

**Criteria:**
- ✅ No redundancy (avoid repeating concepts)
- ✅ Concise yet complete
- ✅ Ideal: 70-150 words per "content unit"
  - Content unit = paragraph + bullet + code block

**Scoring:**
- Optimal (70-150 words/unit): 0.85
- Acceptable (50-70 or 150-200): 0.75
- Poor (<50 or >200): 0.60

---

## Registry Management

### Location
```
.claude/prompts/REGISTRY.md
```

### Structure
```markdown
| Prompt | Current | Score | Status | Type | Link |
|--------|---------|-------|--------|------|------|
| 02-spec | v1.0 | 0.79 | Testing v1.1 | Spec | [v1.0](...), [v1.1-beta](...) |
```

### Versioning Convention
```
v1.0     = Current production version
v1.1     = First variant (released if won)
v1.1-beta = Testing variant (not yet released)
v2.0     = Major redesign

Archive: v1.0-archived, v1.0-old
```

---

## Promotion Logic

### When to Promote Variant to Current

**Automatic promotion if:**
```
variant_score > current_score + 0.05  (5% improvement)
AND
variant_clarity >= 0.80  (minimum clarity threshold)
```

**Manual review if:**
```
variant_score = current_score ± 0.05
OR
variant breaks expected output format
```

### Promotion Process
1. Confirm in `/bmad` output
2. Rename: `v1.1-beta.md` → `v1.1.md`
3. Archive: `v1.0.md` → `v1.0-archived.md`
4. Rename: `v1.1.md` → `v1.0.md` (make it current)
5. Update REGISTRY.md with new scores + date
6. Log decision in memory/decision-log.json

---

## Weekly Testing Schedule

```
Monday:    /bmad 01-search
Tuesday:   /bmad 02-spec
Wednesday: /bmad 03-tasks
Thursday:  /bmad 04-code
Friday:    /bmad 05-reviews
```

---

## Monthly Review

**First Friday of month:**
1. Review all REGISTRY scores
2. Identify low performers (<0.75)
3. Plan variants for next month
4. Calculate average improvement

---

## Integration with Other Phases

### Impact on Phase 1 (Ralph)
```
Ralph outputs depend on spec clarity.
Better spec prompt (via BMAD)
  → Better specs from Ralph
  → Better implementations
```

### Impact on Phase 3 (Skill Composition)
```
Skills composed together.
Better prompts (via BMAD)
  → Each skill performs better
  → Better compositions
```

### Impact on Phase 4 (Memory)
```
Decision logs track:
- Which prompts improved
- Why variants worked better
- Learning for future variants
```

---

## Metrics & Tracking

### Per-Prompt Metrics
```json
{
  "prompt": "02-spec",
  "baseline_score": 0.79,
  "current_score": 0.79,
  "best_variant_score": 0.86,
  "improvement_potential": 0.07,
  "last_tested": "2026-02-28",
  "promotions": 0,
  "tests_run": 1
}
```

### Team Metrics
```
Total prompts: 5
Average score: 0.80
Lowest score: 0.74 (05-reviews - needs work)
Highest score: 0.85 (03-tasks - stable)
Improvement rate: +0.02/month target
```

---

## Error Handling

### If Variant Fails to Execute
```
Log: "v1.1-beta failed to generate valid output"
Action: Revert to v1.0, debug variant
```

### If Scores Are Very Close
```
Tie-breaking rules:
1. Prefer simpler/shorter variant
2. Prefer variant with better Clarity
3. Keep both if no clear winner
```

### If Variant Breaks Output Format
```
Score it but flag: "WARNING: Incompatible output format"
Manual review required before promotion
```

---

## Learning & Iteration

### What We Track
```
✓ Each variant test result
✓ Which improvements worked
✓ Correlation between clarity and output quality
✓ Cost of variants (token increase/decrease)
```

### Quarterly Review
```
Q1: Baseline and first improvements
Q2: Trends analysis ("clarity improved quality by X%")
Q3: Test new hypothesis (e.g., "structure helps coverage")
Q4: Plan next year's variants
```

---

## Best Practices

1. **Create variants incrementally**
   - One change per variant
   - Example: "Make more structured" vs "Add checklist"
   - Easier to understand what worked

2. **Always have a baseline**
   - v1.0 should be current production
   - Variants tested against it
   - Never orphan a production version

3. **Document why you changed**
   - v1.1-beta header explains the variant goal
   - "More structured" vs "Testing lean approach"

4. **Test regularly**
   - Weekly /bmad runs
   - Monthly decisions
   - Quarterly reviews

5. **Archive old versions**
   - Don't delete, archive
   - May need to revert
   - Keeps history clean

---

## Configuration

### .claude/prompts/REGISTRY.md
Main source of truth for all prompt versions and scores.

### .claude/tools/prompt-evaluator.py
Scoring engine with Coverage/Clarity/Efficiency logic.

### .claude/memory/decision-log.json
Tracks every BMAD decision for learning.

---

## Success Metrics

**Goal:** 10% average improvement in 8 weeks

```
Week 1-2: Baseline all prompts (avg 0.80)
Week 3-4: First variants, test 02-spec + 04-code
Week 5-6: Promote winners, test 01-search + 05-reviews
Week 7-8: Monitor improvements, plan next batch

Target: 0.80 → 0.88 average (+10%)
```

---

*Version:* 1.0
*Created:* 2026-02-28
*Next Review:* 2026-03-07 (weekly)
