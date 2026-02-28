# Prompt Registry — Versioning & Evaluation

**Last Updated:** 2026-02-28
**Status:** Active (Phase 2 BMAD Implementation)

---

## 📊 Registry Index

| Prompt | Current | Score | Status | Type | Link |
|--------|---------|-------|--------|------|------|
| **01-search** | v1.0 | 0.82 | Production | Research Phase | [v1.0](./01-search/v1.0.md) |
| **02-spec** | v1.0 | 0.79 | Testing v1.1 | Specification | [v1.0](./02-spec/v1.0.md), [v1.1-beta](./02-spec/v1.1-beta.md) |
| **03-tasks** | v1.0 | 0.85 | Production | Task Breakdown | [v1.0](./03-tasks/v1.0.md) |
| **04-code** | v1.0 | 0.81 | Testing v1.1 | Implementation | [v1.0](./04-code/v1.0.md), [v1.1-beta](./04-code/v1.1-beta.md) |
| **05-reviews** | v1.0 | 0.74 | Needs Improvement | Quality Review | [v1.0](./05-reviews/v1.0.md) |

---

## 🎯 Scoring Methodology

Each prompt evaluated on 3 dimensions (0.0-1.0 scale):

### 1. **Coverage** (Requirement Completeness)
- Does output address all necessary requirements?
- Are edge cases handled?
- Is output actionable?

### 2. **Clarity** (Readability & Unambiguity)
- Is output easy to understand?
- Minimal jargon/confusion?
- Structure clear and logical?

### 3. **Efficiency** (Token-to-Value Ratio)
- Tokens used vs useful information delivered
- No redundancy?
- Concise yet complete?

**Overall Score = (Coverage + Clarity + Efficiency) / 3**

---

## 📈 Version History

### 01-search

| Version | Date | Score | Changes | Status |
|---------|------|-------|---------|--------|
| v1.0 | 2026-02-28 | 0.82 | Initial | Production |
| v1.1-beta | TBD | TBD | [See variant] | Testing |

**Current:** v1.0 (production)
**Testing:** v1.1-beta (leaner, more structured)

---

### 02-spec

| Version | Date | Score | Changes | Status |
|---------|------|-------|---------|--------|
| v1.0 | 2026-02-28 | 0.79 | Initial | Production |
| v1.1-beta | TBD | TBD | [See variant] | Testing |

**Current:** v1.0 (detailed, narrative)
**Testing:** v1.1-beta (more structured JSON + markdown hybrid)

---

### 03-tasks

| Version | Date | Score | Changes | Status |
|---------|------|-------|---------|--------|
| v1.0 | 2026-02-28 | 0.85 | Initial | Production |

**Current:** v1.0 (high quality, no variants planned)

---

### 04-code

| Version | Date | Score | Changes | Status |
|---------|------|-------|---------|--------|
| v1.0 | 2026-02-28 | 0.81 | Initial | Production |
| v1.1-beta | TBD | TBD | [See variant] | Testing |

**Current:** v1.0 (detailed, example-heavy)
**Testing:** v1.1-beta (more concise, checklist-based)

---

### 05-reviews

| Version | Date | Score | Changes | Status |
|---------|------|-------|---------|--------|
| v1.0 | 2026-02-28 | 0.74 | Initial | Production |
| v1.1-beta | TBD | TBD | Needs rework | Planned |

**Current:** v1.0 (needs improvement)
**Priority:** Improve review prompt scoring

---

## 🧪 How to Test Variants

### Step 1: Run both versions
```bash
/bmad 02-spec
→ Runs v1.0 (current) and v1.1-beta (variant) in parallel
→ Evaluates both with prompt-evaluator.py
```

### Step 2: Compare scores
```
v1.0:      Coverage: 0.85  Clarity: 0.82  Efficiency: 0.75  → Overall: 0.81
v1.1-beta: Coverage: 0.88  Clarity: 0.89  Efficiency: 0.82  → Overall: 0.86 ✓

Recommendation: Switch to v1.1-beta (score improvement +0.05)
```

### Step 3: Update registry
```
If v1.1-beta wins:
  - v1.0 moved to archive
  - v1.1-beta becomes new v1.0 (released)
  - Registry updated with new date/score
```

---

## 📊 Scoring Spreadsheet

### 01-search (v1.0)
- Coverage: 0.88 (addresses all search aspects)
- Clarity: 0.80 (clear but could be more structured)
- Efficiency: 0.78 (some verbose sections)
- **Score: 0.82**

### 02-spec (v1.0)
- Coverage: 0.85 (good, but edge cases unclear)
- Clarity: 0.75 (narrative style, less structured)
- Efficiency: 0.77 (could be more concise)
- **Score: 0.79**

### 03-tasks (v1.0)
- Coverage: 0.90 (comprehensive task breakdown)
- Clarity: 0.85 (clear structure)
- Efficiency: 0.80 (well-organized)
- **Score: 0.85**

### 04-code (v1.0)
- Coverage: 0.85 (good examples)
- Clarity: 0.82 (clear patterns)
- Efficiency: 0.76 (verbose in places)
- **Score: 0.81**

### 05-reviews (v1.0)
- Coverage: 0.70 (missing some review aspects)
- Clarity: 0.78 (decent but unclear priorities)
- Efficiency: 0.74 (some redundancy)
- **Score: 0.74** ⚠️ Low score

---

## 🔄 Continuous Improvement Cycle

1. **Weekly eval:** Run `/bmad {phase}` on all prompts
2. **Monthly rotation:** Test new variants
3. **Quarterly review:** Archive old versions, promote winners
4. **Learning:** Track which prompts improve output quality most

---

## 📝 How to Add Variant

### Create variant
```bash
# Copy current to variant
cp 02-spec/v1.0.md 02-spec/v1.1-beta.md

# Modify v1.1-beta with improvements
# Example: Make more structured, add JSON template, etc.
```

### Update registry
```markdown
| 02-spec | v1.0 | 0.79 | Testing v1.1 | Specification | [v1.0](...), [v1.1-beta](...) |
```

### Test with `/bmad`
```bash
/bmad 02-spec
# Tests both automatically
# Returns scores + recommendation
```

---

## 🎯 Next Priorities

1. **v1.1-beta 02-spec:** More structured, hybrid JSON/markdown format
2. **v1.1-beta 04-code:** More concise, checklist-based (reduce verbosity)
3. **v1.1-beta 05-reviews:** Rework entirely (lowest score: 0.74)
4. **Measure impact:** Track if better prompts → better outputs

---

## 🔗 References

- Phase 2: BMAD Meta-Prompting (7-phase roadmap)
- Skill: `/bmad {phase}` (run evaluation)
- Tool: `prompt-evaluator.py` (scoring engine)
- Feedback: Log results in `decision-log.json` for learning

---

*Registry Version:* 1.0
*Maintained by:* BMAD System
*Last Update:* 2026-02-28
*Next Review:* 2026-03-07 (weekly)
