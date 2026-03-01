# SIMPLE Task Template (Complexity 1-8)

> For: Bug fixes, small features, simple refactors
> Duration: 1-3 hours
> Composition: bug-fix-minimal or full-feature-{area}

---

## Story Frontmatter

```yaml
---
story_id: STORY-{ID}
title: "[SIMPLE] {Clear, concise title}"
story_type: bug | feature | refactor
complexity: 5  # 1-8 range
clarity: 90    # >=80 for SIMPLE
time_estimate_minutes: 120
assigned_to: "@dev"
workflow: sdd   # No Ralph needed
---
```

## What's Included

### 1. Problem Statement (1-2 sentences)
What's the issue? What's the expected behavior?

### 2. Acceptance Criteria (Given/When/Then)

```gherkin
Given [precondition]
When [action]
Then [expected outcome]
```

### 3. Scope

**In Scope:**
- Minimal changes
- Single file or component likely

**Out of Scope:**
- Refactoring unrelated code
- Performance optimization
- Breaking changes

### 4. Implementation Path

Step-by-step guide (usually 3-5 steps):
1. [First step]
2. [Second step]
3. [Add tests]
4. [Verify]

### 5. Testing

```bash
# Quick test command
npm test -- --testNamePattern="your test"
```

### 6. Definition of Done

- [ ] Code written
- [ ] Tests pass (70%+ coverage acceptable for bug fixes)
- [ ] No new warnings
- [ ] PR reviewable

---

## Example: Simple Bug Fix

```yaml
---
story_id: STORY-100
title: "[SIMPLE] Fix login button color on mobile"
story_type: bug
complexity: 3
clarity: 95
time_estimate_minutes: 45
workflow: sdd
---

## Problem
Login button appears invisible on mobile because text color matches background.

## Acceptance Criteria

Given user is on mobile device (< 480px)
When user navigates to login page
Then login button text is visible and contrasts with background

## Scope

In:
- Fix button CSS for mobile breakpoint
- Verify in Chrome DevTools mobile view

Out:
- Desktop redesign
- Button animation improvements
- Other form elements

## Implementation

1. Open `src/components/LoginButton.tsx`
2. Update mobile CSS breakpoint for color contrast
3. Test in DevTools mobile view
4. Update snapshot test
5. Commit and create PR

## Testing

```bash
npm test -- LoginButton.test.tsx
```

## DoD

- [ ] Button visible on mobile
- [ ] Accessibility: color contrast >= 4.5:1
- [ ] Tests pass
- [ ] No other elements affected
```

---

## Composition: bug-fix-minimal

```
Fix → TDD (70-80% coverage) → QA → Commit
Total: ~60 minutes
```

---

## Key Success Factor

**Keep it focused.** One problem, one solution.
