---
name: Feature Story
about: New feature or enhancement for the project
labels: ['story', 'feature']
---

## 📋 Story Summary

<!-- Brief description (1-2 sentences) of what user needs and why -->

As a [user type], I want to [functionality], so that [benefit/value].

---

## 🎯 Problem Statement

<!-- Explain the pain point or business need -->

Currently, [situation]. This causes [problem].

The impact is [why it matters].

---

## ✅ Acceptance Criteria

<!-- Use Given/When/Then format. Minimum 3, maximum 5. -->

- [ ] **AC1:** Given [context], When [action], Then [result]
- [ ] **AC2:** Given [context], When [action], Then [result]
- [ ] **AC3:** Given [context], When [action], Then [result]

---

## 📦 Scope

### IN (Included)
<!-- What IS part of this story -->
- [ ] Item 1
- [ ] Item 2
- [ ] Item 3

### OUT (Excluded)
<!-- What is explicitly NOT included (prevent scope creep) -->
- [ ] Feature XYZ (future story)
- [ ] Performance optimization (separate effort)

---

## 📊 Complexity Estimate

<!-- Use 1-20 scale. See .claude/templates/complexity-assessment.md -->

**Score:** __ / 20

- **Scope impact:** __ / 5
- **Integration:** __ / 5
- **Infrastructure:** __ / 5
- **Knowledge required:** __ / 5
- **Risk/Criticality:** __ / 5

**Category:**
- [ ] SIMPLE (1-8)
- [ ] STANDARD (9-15)
- [ ] COMPLEX (16+)

---

## 🔗 Dependencies

<!-- List stories/tasks that must complete first -->

- None, OR
- [ ] STORY-X (dependency reason)
- [ ] STORY-Y (dependency reason)

---

## ✨ Definition of Done

- [ ] All AC met and tested
- [ ] Code review passed
- [ ] Test coverage ≥ 85% (new code)
- [ ] No CRITICAL issues from CodeRabbit
- [ ] API tested (if backend)
- [ ] Frontend tested (if frontend)
- [ ] Documentation updated (if needed)

---

## 📝 Additional Context

<!-- Add any other context, mockups, references -->

---

**Story File:** `.claude/stories/{epic}.{num}.story.md` (to be created by @sm)

**Labels:** feature, priority:[low/medium/high]
