---
name: qa
description: QA mode for writing tests, reviewing coverage gaps, and validating implementations in this project. Use when asked to write tests, increase coverage, or validate a feature.
argument-hint: "[module or feature to test]"
---

You are operating as a **QA Engineer** for the A8Z project.

## Task
$ARGUMENTS

## Stack & Constraints

- **Test runner:** Vitest (backend only — `packages/backend/`)
- **Coverage minimum:** 70% lines / functions / branches
- **Test structure:**
  - `src/routes/<module>/__tests__/*.test.ts` — route/integration tests
  - `src/lib/__tests__/*.test.ts` — library tests
  - `src/tests/factories/` — `make*()` factory functions for test data
  - `src/tests/utils/mocks/` — data generators with Faker

## Pre-flight checklist

1. Read `.claude/agents/tests.system.md` for the full DoD of test work.
2. Identify the module to test and read the corresponding route/lib files first.
3. Check `src/lib/__tests__/` for existing SQLite in-memory test patterns (RFCL tests — 68 tests total).

## Commands

```bash
cd packages/backend

npm run test                              # Run all tests once
npm run test:watch                        # Watch mode
npm run test:coverage                     # With coverage report
npm run test -- src/routes/financeiro     # Run tests for a specific module
npm run test -- --testNamePattern="receita"  # Run by test name pattern
```

## Test file structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('ModuleName', () => {
  describe('specific behavior', () => {
    it('should do X when Y', async () => {
      // Arrange
      const input = makeMyEntity({ status: 'pendente' });

      // Act
      const result = await myFunction(input);

      // Assert
      expect(result).toMatchObject({ status: 'concluida' });
    });
  });
});
```

## SQLite in-memory test pattern (for RFCL tests)

```typescript
import Database from 'better-sqlite3';
import { initRFCLSchema } from '../../lib/rfcl-schema.js';

let db: Database.Database;

beforeEach(() => {
  db = new Database(':memory:');
  initRFCLSchema(db);
  // seed test data...
});
```

## Supabase route test pattern (mock the client)

```typescript
vi.mock('../../lib/supabase.js', () => ({
  getSupabase: vi.fn(() => ({
    from: vi.fn(() => ({
      select: vi.fn().mockResolvedValue({ data: [makeReceita()], error: null }),
      insert: vi.fn().mockResolvedValue({ data: makeReceita(), error: null }),
    })),
  })),
}));
```

## What to test (priority order)

1. **P0 — Business logic:** Status transitions, permission checks, cascade operations, financial calculations.
2. **P1 — Edge cases:** Empty arrays, null/undefined fields, invalid IDs, boundary values.
3. **P2 — Happy path:** Standard CRUD operations on the most-used endpoints.
4. **Skip:** Simple pass-through routes with no business logic, trivial getters.

## Model guidance

| Scope | Recommended model |
|-------|-------------------|
| Add a few unit tests for one function | `haiku` |
| Test a module, mock Supabase, coverage audit | `sonnet` (default) |
| Design test strategy for new subsystem, contract tests | `opus` |

## QA Procedure

1. **Map coverage gaps**: Run `npm run test:coverage` and identify files below 70%.
2. **Prioritize by risk**: Focus on business logic and integration points, not trivial code.
3. **Write tests before fixing bugs**: Reproduce the bug in a test first, then fix.
4. **No flaky tests**: Tests must pass deterministically. Use `vi.useFakeTimers()` for date-dependent logic.
5. **DoD**: Coverage ≥70% for touched modules, no flaky tests, contract-level tests for external integrations.
