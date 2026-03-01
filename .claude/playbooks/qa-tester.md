# QA Tester Playbook

**Purpose:** Validate that completed code meets acceptance criteria, is well-tested, and is production-ready.

**Success Criteria:**
- ✅ All AC (acceptance criteria) verified
- ✅ No critical/high issues found
- ✅ Code meets quality standards
- ✅ Verdict documented (PASS/CONCERNS/FAIL)
- ✅ Ready for merge or identified blockers

---

## Step 1: Review Story & Requirements

### 1.1 Understand Requirements

```
[ ] Story ID and description read
[ ] Acceptance Criteria (AC) fully understood
[ ] Scope confirmed (what's in/out)
[ ] Dependencies checked
[ ] Edge cases identified
```

### 1.2 Setup Test Environment

```bash
# Get latest code
git fetch origin
git checkout feature/story-{ID}-...

# Install and build
pnpm install
pnpm run build

# Verify no build errors
pnpm run type-check
pnpm run lint
```

---

## Step 2: Code Quality Review

### 2.1 Code Structure Check

```
[ ] Follows project naming conventions
  - camelCase for functions/variables
  - PascalCase for classes/components
  - Files: kebab-case or camelCase

[ ] File organization makes sense
  - Components in src/components/
  - Services in src/services/
  - Routes in src/routes/

[ ] No code smells
  - No commented-out code
  - No console.log/debugger statements
  - No TODO/FIXME without issue ref
  - No hardcoded values (use config)

[ ] Error handling present
  - Try/catch blocks for async code
  - User-friendly error messages
  - Logging for debugging
```

### 2.2 TypeScript & Type Safety

```
[ ] No `any` types (unless explicitly approved)
[ ] All function parameters typed
[ ] All function returns typed
[ ] No type errors in build
[ ] Interfaces properly defined
```

### 2.3 Best Practices

```
[ ] DRY (Don't Repeat Yourself)
  - No duplicate code (would refactor repeated 3+ times)
  - Extracted common logic to shared functions

[ ] SOLID Principles
  - Single Responsibility: each file has one job
  - No tightly coupled dependencies
  - Testable components/functions

[ ] Security
  - No SQL injection vectors
  - No hardcoded secrets/credentials
  - Input validation present
  - No XSS vulnerabilities
```

---

## Step 3: Test Coverage & Quality

### 3.1 Test Execution

```bash
# Run all tests
pnpm run test

# Check coverage report
# Look for: coverage >= 85% (or project standard)

# Run specific test file
npm test -- UserService.test.ts

# Run tests in watch mode (for debugging)
npm test -- --watch
```

### 3.2 Coverage Analysis

```
Component               Coverage    Status
─────────────────────────────────────────
UserService.ts          92%         ✓ GOOD
UserController.ts       78%         ⚠ LOW (target: 85%)
UserProfile.tsx         81%         ✓ OK
useUserProfile.ts       88%         ✓ GOOD
─────────────────────────────────────────
TOTAL                   85%         ✓ PASS
```

### 3.3 Test Quality

```
[ ] Tests have meaningful names
  ✓ "should return user when ID is valid"
  ✗ "test works" (too vague)

[ ] Tests cover happy path AND error cases
  - Success scenario tested
  - Error scenario tested
  - Edge cases considered

[ ] Tests don't test implementation, test behavior
  ✓ expect(result.email).toBe('test@example.com')
  ✗ expect(service.getUserCalls).toBe(1)

[ ] Tests are isolated (no flaky tests)
  - Mock dependencies properly
  - No test order dependencies
  - No timing issues
```

### 3.4 Run Full Test Suite

```bash
# Ensure all tests pass
pnpm run test

# Example output should show:
# PASS  src/services/UserService.test.ts
# PASS  src/components/UserProfile.test.tsx
# ────────────────────────────────────────
# Test Suites: 8 passed, 8 total
# Tests:       142 passed, 142 total
# Coverage:    85%+ required
```

---

## Step 4: Manual Testing

### 4.1 Functional Testing (Happy Path)

Follow AC step-by-step:

```
Story AC Example:
"Given user is on login page
 When user enters valid credentials
 Then user is logged in and redirected to dashboard"

Test Steps:
1. [ ] Navigate to /login
2. [ ] Enter email: test@example.com
3. [ ] Enter password: correct-password
4. [ ] Click "Sign In"
5. [ ] Verify redirect to /dashboard
6. [ ] Verify user name displayed
```

### 4.2 Error Path Testing

```
Edge Cases & Error Scenarios:
[ ] Empty inputs
  - Click submit with empty fields
  - Verify validation messages shown

[ ] Invalid inputs
  - Email: "not-an-email"
  - Password: less than 8 chars
  - Verify clear error messages

[ ] Boundary conditions
  - Very long inputs (max length)
  - Special characters in inputs
  - SQL injection attempts (should fail safely)

[ ] Concurrent actions
  - Rapid button clicks
  - Multiple form submissions
  - Navigation while loading
```

### 4.3 UI/UX Verification

```
[ ] Responsive Design
  - [ ] Desktop (1920px+)
  - [ ] Tablet (768-1024px)
  - [ ] Mobile (<480px)
  - [ ] No broken layout

[ ] Accessibility
  - [ ] Tab navigation works
  - [ ] Form labels present
  - [ ] Error messages announced
  - [ ] Color contrast acceptable

[ ] Performance
  - [ ] Page loads in <3 seconds
  - [ ] No janky animations
  - [ ] Smooth interactions

[ ] Styling/Polish
  - [ ] Consistent with design
  - [ ] No layout shifts
  - [ ] Proper spacing/alignment
```

### 4.4 Browser Testing (if applicable)

```
Browsers to Test (Bootcamp SGT):
[ ] Chrome (latest)
[ ] Firefox (latest)
[ ] Safari (if on macOS)
[ ] Edge (if on Windows)

Mobile Testing:
[ ] iOS Safari (iPhone/iPad)
[ ] Chrome Android
```

---

## Step 5: Integration & Data Persistence

### 5.1 API Integration Check

```
For backend changes:
[ ] Endpoint is accessible
[ ] Request validation works
[ ] Response format correct
[ ] Status codes appropriate
  - 200 for success
  - 400 for bad request
  - 401 for unauthorized
  - 404 for not found
  - 500 for server error

[ ] Error responses have clear messages
[ ] CORS configured correctly (if applicable)
```

### 5.2 Database Testing

```
For database changes:
[ ] Schema migration applied successfully
[ ] Data persists after save
[ ] Read after write verification
[ ] Constraints enforced
  - Unique constraints working
  - Foreign key constraints working
  - Default values applied

[ ] No orphaned data
[ ] Indexes created (if needed)
```

### 5.3 State Management

```
[ ] State persists on page reload (if applicable)
[ ] State cleared on logout
[ ] No memory leaks (DevTools → Performance)
[ ] Context/store updates properly
```

---

## Step 6: Issue Documentation

### 6.1 Critical Issues

```json
{
  "severity": "CRITICAL",
  "issue": "Login crashes app",
  "steps": "1. Go to /login\n2. Click submit\n3. App crashes",
  "expected": "Show validation error",
  "actual": "Page crashes with error",
  "must_fix_before_merge": true
}
```

### 6.2 High Priority Issues

```json
{
  "severity": "HIGH",
  "issue": "Email validation missing",
  "steps": "Enter 'invalid-email' in form",
  "expected": "Validation error shown",
  "actual": "No validation, form submits",
  "recommended_action": "Add email regex validation"
}
```

### 6.3 Medium Issues (Tech Debt)

```json
{
  "severity": "MEDIUM",
  "issue": "Missing error handling in useUserProfile hook",
  "code_location": "src/hooks/useUserProfile.ts:45",
  "recommendation": "Add try/catch block",
  "can_merge_with": "documented as tech debt"
}
```

### 6.4 Low Issues (Style/Polish)

```json
{
  "severity": "LOW",
  "issue": "Button text could be clearer",
  "current": "Submit",
  "suggestion": "Create Account",
  "can_merge_with": "considered polish"
}
```

---

## Step 7: Final Verdict

### 7.1 Gate Decision

```
PASS ✅
├─ All AC met
├─ No critical/high issues
├─ Tests pass (85%+ coverage)
├─ Code quality good
└─ Ready to merge

CONCERNS ⚠️
├─ Minor issues documented
├─ Tech debt noted (won't block)
├─ Performance acceptable
└─ Merge approved with notes

FAIL ❌
├─ AC not met
├─ Critical issues found
├─ Test coverage too low
└─ Return to developer
```

### 7.2 QA Report

```markdown
## QA Gate Report - STORY-42

**Date:** 2026-02-28
**Tester:** @qa
**Story:** Implement user profile editing

### Verdict: **PASS** ✅

### Test Coverage
- Backend: 92% ✅
- Frontend: 87% ✅
- Integration: 3 tests ✅

### AC Verification
- [x] View profile scenario
- [x] Edit profile scenario
- [x] Upload avatar scenario
- [x] Validation error scenario

### Issues Found
**Critical:** 0
**High:** 0
**Medium:** 0
**Low:** 1 (cosmetic - button label)

### Recommendations
All acceptance criteria met. Code quality excellent.
Ready for production deployment.

### Next Steps
1. Approve PR
2. Merge to dev
3. Prepare for staging deployment
```

---

## Step 8: Output Format

```json
{
  "story_id": "STORY-42",
  "qa_verdict": "PASS",
  "qa_date": "2026-02-28",

  "coverage": {
    "backend_coverage": 92,
    "frontend_coverage": 87,
    "total_coverage": 89,
    "target": 85,
    "status": "PASS"
  },

  "ac_verification": {
    "total_scenarios": 4,
    "passed": 4,
    "failed": 0,
    "status": "PASS"
  },

  "issues": {
    "critical": 0,
    "high": 0,
    "medium": 0,
    "low": 1
  },

  "manual_testing": {
    "happy_path": "PASS",
    "error_paths": "PASS",
    "ui_responsive": true,
    "accessibility_basic": true,
    "performance": "acceptable"
  },

  "recommendation": "APPROVE - Ready for production",
  "blockers": [],

  "report_link": "https://github.com/.../issues/qa-42"
}
```

---

## Useful Tools

```bash
# Code coverage report
npm test -- --coverage

# Browser DevTools
# Open DevTools → Performance → Record
# Execute user actions
# Analyze performance metrics

# Lighthouse (if web app)
# Audits performance, accessibility, SEO

# Color Contrast Checker
# For accessibility validation
```

---

## Common Issues to Watch For

### Backend
- [ ] N+1 query problems
- [ ] Missing input validation
- [ ] No error handling
- [ ] SQL injection vectors
- [ ] Missing CORS headers

### Frontend
- [ ] Memory leaks (listeners not removed)
- [ ] Unhandled promise rejections
- [ ] XSS vulnerabilities
- [ ] Missing loading states
- [ ] Accessibility (labels, alt text)

### General
- [ ] No tests for new code
- [ ] Coverage below standard
- [ ] Merge conflicts not resolved
- [ ] Secrets in code
- [ ] Breaking changes without docs

---

## Resources

- **CLAUDE.md** — Project standards
- **Test examples** — existing test files
- **Feature Checklist** — acceptance criteria template

---

*Version:* 1.0
*Created:* 2026-02-28
*Last Updated:* 2026-02-28
*Status:* 🟢 Ready for use
