# Checklist: Dev Implementation Phase

**Use this checklist as you work through development.**

Copy, paste, and check items as you complete them.

---

## Phase 1: Preparation

```
[ ] Feature branch created: git checkout -b feature/STORY-42
[ ] Latest code pulled: git pull origin dev
[ ] Story file opened and fully read
[ ] Acceptance Criteria understood (all AC clear)
[ ] Scope IN and OUT confirmed
[ ] Dependencies verified (all blocking stories done)
[ ] CLAUDE.md patterns reviewed
[ ] Environment clean (no uncommitted changes)
```

---

## Phase 2: Choose Execution Mode

```
[ ] Story clarity assessed (80%+ = INTERACTIVE, <80% = PRE-FLIGHT)
[ ] Story complexity checked (<=15 = standard, >15 = ask architect)
[ ] Execution mode decided:
    [ ] INTERACTIVE (recommended, 85% of stories)
    [ ] YOLO (for simple bugs only)
    [ ] PRE-FLIGHT (for ambiguous/complex)
```

---

## Phase 3: Backend Implementation (if needed)

```
[ ] Ran skill: /be STORY-42 [--mode]
[ ] Review outputs:
    [ ] Routes created in backend/src/routes/
    [ ] Controllers in backend/src/controllers/
    [ ] Services in backend/src/services/
    [ ] Repositories in backend/src/repositories/
    [ ] Prisma migrations (if DB change)
    [ ] Unit tests generated
[ ] Tested locally:
    [ ] npx prisma migrate dev (if migration)
    [ ] pnpm run dev --filter backend
    [ ] Manual API testing (Postman / curl)
[ ] No errors in console
```

---

## Phase 4: CodeRabbit Self-Healing (CRITICAL GATE)

```
[ ] Ran CodeRabbit with --auto-fix flag:
    wsl bash -c 'cd /path && ~/.local/bin/coderabbit --severity CRITICAL,HIGH --auto-fix'

[ ] Iteration 1:
    [ ] CodeRabbit report reviewed
    [ ] Issues fixed (or auto-fixed)
    [ ] Changes reviewed

[ ] Re-scan for remaining issues:
    [ ] No CRITICAL remaining? → ✅ PASS (proceed)
    [ ] CRITICAL still there? → ❌ ESCALATE
        - Comment on story: "CodeRabbit CRITICAL issue needs @architect review"
        - Do NOT proceed without fixing
```

---

## Phase 5: Frontend Implementation (if needed)

```
[ ] Ran skill: /fe STORY-42 [--mode]
[ ] Review outputs:
    [ ] Components created in frontend/src/components/
    [ ] Hooks created in frontend/src/hooks/
    [ ] Services in frontend/src/services/
    [ ] Types in frontend/src/types/
    [ ] Basic tests generated
[ ] Tested locally:
    [ ] pnpm run dev --filter frontend
    [ ] http://localhost:3000 opens correctly
    [ ] Components render without errors
    [ ] No console errors
    [ ] Mobile responsive (quick test)
```

---

## Phase 6: TDD - Write Tests

```
[ ] Ran skill: /tdd STORY-42
[ ] Tests created for uncovered code
[ ] Test file review:
    [ ] Meaningful test names
    [ ] Both happy path and error cases
    [ ] Assertions are clear
[ ] Run tests:
    [ ] pnpm run test → all passing
    [ ] pnpm run test --watch (to debug if needed)
[ ] Coverage check:
    [ ] pnpm run test -- --coverage
    [ ] Coverage >= target:
        [ ] Features: >= 85%
        [ ] Bugs: >= 70-80%
    [ ] If below target: add more tests until hit
```

---

## Phase 7: Code Quality Gates

### Lint
```
[ ] pnpm run lint
    Result: ✅ Zero errors, zero warnings
[ ] pnpm run lint --fix
    (if auto-fix helped)
```

### TypeScript
```
[ ] pnpm run type-check
    Result: ✅ Zero type errors
```

### Build
```
[ ] pnpm run build
    Result: ✅ Build succeeded
```

### All Quality Checks
```
[ ] Lint: ✅
[ ] Type-check: ✅
[ ] Build: ✅
[ ] Tests: ✅
[ ] Coverage: ✅
```

---

## Phase 8: Git Commit & Push

```
[ ] Review all changes:
    [ ] git status (what's changed?)
    [ ] git diff (line-by-line review)

[ ] Stage files:
    [ ] git add backend/src/... (specific files)
    [ ] git add frontend/src/... (specific files)
    [ ] (Avoid: git add -A unless certain)

[ ] Create commit using skill:
    [ ] /commit-dev STORY-42
    (Generates Conventional Commits format)

[ ] Verify commit:
    [ ] git log --oneline -n 1
    (Your commit should be at top)

[ ] Push to remote:
    [ ] git push -u origin feature/STORY-42
    Result: Branch pushed, GitHub Actions triggered
```

---

## Phase 9: Update Story File

```
[ ] Open: .claude/stories/01.42.story.md

[ ] Add Implementation Section:
    - [x] Backend implemented
    - [x] Frontend implemented (if needed)
    - [x] CodeRabbit self-healing passed
    - [x] Tests written (coverage %)
    - [x] Git commit and push completed

[ ] Add PR Link:
    PR: https://github.com/.../pull/123

[ ] Add Implementation Notes:
    - Mode used: INTERACTIVE
    - CodeRabbit iterations: 1
    - Coverage achieved: 87%
    - Blockers: None

[ ] Update Change Log:
    - **2026-02-28 16:00:** Dev implementation completed by @dev (Douglas)

[ ] Save and commit:
    [ ] git add .claude/stories/01.42.story.md
    [ ] git commit -m "docs: update STORY-42 implementation status"
    [ ] git push
```

---

## Phase 10: Ready for QA

```
[ ] All checkboxes above: ✅
[ ] Story file updated: ✅
[ ] PR created and linked: ✅
[ ] No pending changes: git status is clean
[ ] Ready to notify @qa for review: YES

Notify @qa:
  "STORY-42 ready for review. PR: #123"
```

---

## Escalation Checkpoints

| If This Happens | Do This |
|---|---|
| Don't understand AC | Ask @po, don't assume |
| CodeRabbit: CRITICAL won't fix | Escalate to @architect |
| Coverage stuck < target | Escalate to @qa for strategy |
| External dependency blocked | Escalate to @pm |
| Need to change architecture | Escalate to @architect |
| Git conflict | Ask @devops for help |
| Something weird in CodeRabbit output | Ask @dev-lead |

---

## Success Criteria

When you reach "Phase 10" with all checkboxes done:

✅ Feature implementation complete
✅ All tests passing (85%+ coverage)
✅ Code quality gates passed
✅ CodeRabbit CRITICAL issues fixed
✅ Git commit and push done
✅ Story file updated
✅ Ready for @qa review

You succeeded! 🎉

---

*Version:* 1.0
*Last Updated:* 2026-02-28
