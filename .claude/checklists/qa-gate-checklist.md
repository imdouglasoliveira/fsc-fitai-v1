# Checklist: QA Gate Review

**Use this checklist when reviewing a completed story for QA.**

Copy and fill as you review. This is a quality gate before merging to main.

---

## Prerequisites

```
[ ] Story file exists and is accessible
[ ] PR link provided by @dev
[ ] PR shows "All checks passed" (GitHub Actions green)
[ ] All commits visible in PR
[ ] No merge conflicts
```

---

## Acceptance Criteria Validation

For each AC in the story file:

```
AC 1: [Given/When/Then statement]
[ ] Tested manually: [How tested?]
[ ] Result: ✅ PASS or ❌ FAIL or ⚠️ PARTIAL
[ ] Evidence: [screenshot, curl output, etc.]

AC 2: [...]
[ ] Tested manually
[ ] Result
[ ] Evidence

AC 3: [...]
[ ] Tested manually
[ ] Result
[ ] Evidence

AC 4: [...]
[ ] Tested manually
[ ] Result
[ ] Evidence

AC 5: [...]
[ ] Tested manually
[ ] Result
[ ] Evidence
```

---

## Code Review

### Architecture & Patterns

```
[ ] Code follows CLAUDE.md patterns
[ ] File structure correct (backend: controller → service → repo)
[ ] Naming conventions followed (camelCase, PascalCase, UPPER_SNAKE_CASE)
[ ] No over-engineering (YAGNI principle)
[ ] Error handling present (try/catch, validation, error messages)
```

### Backend (if applicable)

```
[ ] Routes properly structured
[ ] Controllers thin (no business logic)
[ ] Services contain business logic
[ ] Repositories use Prisma ORM correctly
[ ] Database migration tested (forward + rollback)
[ ] No N+1 queries
[ ] Input validation present
```

### Frontend (if applicable)

```
[ ] Components small and focused (single responsibility)
[ ] Props are typed (no `any`)
[ ] State management appropriate (hooks, context, not overused)
[ ] Error handling: error boundaries, fallbacks
[ ] Loading states: skeleton, spinners
[ ] No console errors/warnings
[ ] Responsive design (tested on mobile)
```

### Security

```
[ ] No SQL injection (Prisma used for queries)
[ ] No XSS (React escapes output)
[ ] No hardcoded secrets
[ ] Passwords hashed (bcrypt or similar)
[ ] Auth tokens not logged
[ ] Environment variables used for config
```

### Testing

```
[ ] Test coverage >= target (85% features, 70% bugs)
[ ] Tests are meaningful (not just hitting lines)
[ ] Both happy path and error paths tested
[ ] Edge cases covered (null, empty, invalid)
[ ] Test names are descriptive
[ ] No skipped tests
[ ] All tests passing
```

### Code Quality

```
[ ] No console.log or debugger statements
[ ] No commented-out code
[ ] No dead code
[ ] Formatting consistent (Prettier applied)
[ ] Line length reasonable (< 100 chars preferred)
[ ] No overly complex functions (cyclomatic complexity OK)
[ ] DRY principle followed (no copy-paste)
```

---

## Performance & Accessibility

```
[ ] No obvious performance bottlenecks
[ ] API response times acceptable (< 200ms)
[ ] Database queries optimized
[ ] Components don't have unnecessary re-renders
[ ] Basic accessibility: tab navigation, labels present
[ ] Mobile performance: not too slow
```

---

## Documentation

```
[ ] API endpoints documented (if backend)
[ ] Component props documented (if frontend)
[ ] Complex logic has comments
[ ] README updated (if user-facing feature)
[ ] Migration instructions clear (if DB changes)
[ ] Swagger/OpenAPI (if exists, updated)
```

---

## Definition of Done Checklist

From story file, verify each DoD item:

```
[ ] All AC met and tested
[ ] Code review passed (you're doing this now)
[ ] Test coverage >= target
[ ] No CRITICAL issues from CodeRabbit
[ ] API tested (if backend)
[ ] Frontend tested (if frontend)
[ ] Documentation updated (if needed)
```

---

## Issues Found?

### Minor Issues (Code style, docs, non-critical)

```
Issues: [List]
1. Missing comment on complex function
2. API docs missing endpoint X

Action: Request changes in PR comment
Wait for @dev to fix and push again
```

### Moderate Issues (Pattern violation, edge case uncovered)

```
Issues: [List]
1. Error handling missing for null case
2. Component doesn't handle loading state

Action: Request changes
Discuss with @dev if unclear
```

### Critical Issues (Security, breaking change, test failure)

```
Issues: [List]
1. SQL injection vulnerability in query
2. Test coverage only 50%
3. Breaking change not documented

Action: BLOCK merge
Escalate to @dev for immediate fix
Severity: CRITICAL → must fix before merge
```

---

## Final Verdict

```
Based on all reviews above:

[ ] All AC PASS
[ ] Code review: No blockers
[ ] Tests: Adequate coverage, all passing
[ ] Security: No issues
[ ] Performance: Acceptable
[ ] Documentation: Complete

VERDICT:
[ ] ✅ PASS → Approve & ready to merge
[ ] ⚠️ CONCERNS → Approve with comments (minor issues)
[ ] ❌ FAIL → Block & request fixes (issues must be resolved)
```

---

## QA Gate Report

Copy template below and fill:

```markdown
# QA Gate Report — STORY-42

## Reviewed By
@qa-engineer-name

## Date Reviewed
2026-02-28

## PR Reviewed
https://github.com/...#123

## AC Validation
- AC 1: ✅ PASS
- AC 2: ✅ PASS
- AC 3: ⚠️ PARTIAL (edge case uncovered)
- AC 4: ✅ PASS

## Code Review
- Architecture: ✅ Good
- Testing: ✅ 87% coverage
- Security: ✅ No issues
- Performance: ✅ Acceptable

## Issues Found
1. [Minor] API endpoint needs docs
2. [Minor] Mobile responsiveness: header breaks on iPhone 12

## Verdict
**✅ PASS** (with minor comments)

Approved for merge to main.

## Comments
- Good implementation following patterns
- Edge case in AC3 should be noted for future
- Otherwise ready to deploy
```

---

## After Approval

If PASS or PASS with CONCERNS:

```
[ ] Leave approval comment on PR
[ ] Request merge to @devops
[ ] Update story file: Status = Done
[ ] Archive in backlog
[ ] Log in decision-log.json (if memory enabled)
```

---

*Version:* 1.0
*Last Updated:* 2026-02-28
*Severity:* This is a quality gate. Take time to review carefully.
