---
name: tdd
description: Test-driven development mode. Write failing tests first, then implement code to make them pass. Use when starting a new feature, bug fix, or refactor where correctness must be proven.
argument-hint: "[task ID, feature, or function to implement]"
---

You are operating in **Test-Driven Development (TDD)** mode for the A8Z project.

## Task
$ARGUMENTS

## The TDD Cycle (strictly enforced)

```
RED → GREEN → REFACTOR → repeat
```

**You MUST follow this order. Never write implementation before the test.**

---

## Phase 1 — RED (Write failing tests)

### Before writing any implementation code:

1. **Understand the requirement** from `$ARGUMENTS` (task file, feature description, or bug report).
   - If a task file is provided (e.g., `TASK-202601-001`), read it from `.claude/tasks/`.
2. **Identify what to test** — focus on behavior, not implementation details:
   - What inputs → what outputs?
   - What side effects? (DB writes, HTTP calls, state changes)
   - What error cases must be handled?
3. **Write the test file** in the correct location:
   - Backend: `src/routes/<module>/__tests__/<name>.test.ts` or `src/lib/__tests__/<name>.test.ts`
   - Use `describe` / `it('should <behavior> when <condition>')` naming
4. **Run the tests** — they MUST fail (red):
   ```bash
   cd packages/backend && npm run test -- <test-file-path>
   ```
   If a test passes without implementation, the test is wrong — rewrite it.

### Test structure
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('<Module>: <feature>', () => {
  beforeEach(() => {
    // setup mocks, in-memory DB, etc.
  });

  it('should <expected behavior> when <given condition>', async () => {
    // Arrange
    const input = { /* ... */ };

    // Act
    const result = await functionUnderTest(input);

    // Assert
    expect(result).toMatchObject({ /* ... */ });
  });

  it('should throw/return error when <invalid condition>', async () => {
    // ...
  });
});
```

---

## Phase 2 — GREEN (Write minimum implementation)

1. Write the **minimum code** to make the failing tests pass.
   - No gold-plating. No extra features. No premature abstractions.
   - If a test passes with `return hardcodedValue`, that's fine for now — the next test will force real implementation.
2. Run tests after each small change:
   ```bash
   npm run test -- --watch <test-file-path>
   ```
3. All tests must be **green** before moving to refactor.

---

## Phase 3 — REFACTOR (Clean without breaking)

1. Improve code quality **without changing behavior**:
   - Extract duplicated logic into helpers
   - Improve naming
   - Simplify conditionals
   - Add missing ESM `.js` extensions (backend)
2. Run tests after every change. If any go red, undo and try again.
3. Run full test suite to check for regressions:
   ```bash
   cd packages/backend && npm run test
   ```

---

## Coverage checkpoint

After the green phase, run coverage:
```bash
npm run test:coverage
```

- Minimum: **70% lines / functions / branches** for touched files
- If below 70%, add more tests before considering the task done

---

## Model guidance

| Scope | Recommended model |
|-------|-------------------|
| TDD for a single helper function | `sonnet` |
| TDD for a new route/module with edge cases | `sonnet` (default) |
| TDD for complex business logic (financial, auth, cross-module) | `opus` |

> TDD always requires at least `sonnet` — Haiku doesn't reason well enough for the RED→GREEN cycle.

## DoD for TDD session

- [ ] All tests written **before** implementation (RED phase documented)
- [ ] All tests pass (GREEN)
- [ ] Code is clean (REFACTOR done)
- [ ] Coverage ≥70% for the implemented module
- [ ] No regressions in full test suite (`npm run test`)
- [ ] ESM imports have `.js` extension (backend)
- [ ] TypeScript compiles (`npm run build`)

---

## Quick reference: Project test utilities

```typescript
// Factory functions (packages/backend/src/tests/factories/)
import { makeTarefa } from '../../tests/factories/tarefa.js';
import { makeReceita } from '../../tests/factories/receita.js';

// SQLite in-memory (for RFCL tests)
import Database from 'better-sqlite3';
import { initRFCLSchema } from '../../lib/rfcl-schema.js';
const db = new Database(':memory:');
initRFCLSchema(db);

// Supabase mock
vi.mock('../../lib/supabase.js', () => ({
  getSupabase: vi.fn(() => ({
    from: vi.fn(() => ({ select: vi.fn().mockResolvedValue({ data: [], error: null }) })),
  })),
}));
```
