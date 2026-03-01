# Checklist: Pre-Push Code Quality

**Use this checklist BEFORE running `git push`.**

Copie e preencha. Não pule itens. Se algum falhar, FIX antes de push.

---

## Code Quality

- [ ] `pnpm run lint` → ✅ Zero errors, zero warnings
- [ ] `pnpm run lint --fix` → Executed (auto-fix applied)
- [ ] `pnpm run format` → Code formatted per Prettier
- [ ] `pnpm run type-check` → ✅ Zero TypeScript errors
- [ ] `pnpm run build` → ✅ Build succeeded
- [ ] Nenhum `any` type sem justificativa
- [ ] Nenhum `console.log` ou `debugger` deixado

---

## Testing

- [ ] `pnpm run test` → ✅ All tests passing
- [ ] Test coverage >= target (85% para features, 70-80% para bugs)
- [ ] `pnpm run test -- --coverage` → Reviewed coverage report
- [ ] Casos edge cobertes (não só happy path)
- [ ] Nenhum test skipped (`skip`, `xtest`)

---

## CodeRabbit Self-Healing

- [ ] CodeRabbit executado com `--auto-fix`
- [ ] Iteration 1 completed
- [ ] CRITICAL issues: ✅ Fixed ou ⚠️ Documented
- [ ] Iteration <= 2 (máximo permitido)
- [ ] Se CRITICAL persiste: **ESCALATE** (não push)

---

## Documentation & Comments

- [ ] API routes documentadas (se backend)
- [ ] Component props documentadas (se frontend)
- [ ] Função complexa tem comentário explicativo
- [ ] Database migration testada (rollback works)
- [ ] README atualizado (se necessário)

---

## Git & Story Management

- [ ] Feature branch nome correto: `feature/STORY-X` ou `fix/STORY-X`
- [ ] Commits seguem Conventional Commits (feat:, fix:, refactor:, etc.)
- [ ] Commit messages são descritivos
- [ ] Nenhum commit acidental (secrets, node_modules, .env)
- [ ] Git history clean (squash commits if needed)
- [ ] Story file atualizado com progresso

---

## Security & Performance

- [ ] Sem SQL injection (Prisma queries used)
- [ ] Sem XSS (output escaped em React)
- [ ] Sem secrets em código (use env vars)
- [ ] Senhas hashed (bcrypt ou similar)
- [ ] API tokens não logados
- [ ] Performance: sem N+1 queries, lazy loading onde apropriado

---

## Manual Testing

- [ ] Feature funciona localmente (desktop)
- [ ] Responsive em mobile (testar)
- [ ] Sem console errors/warnings
- [ ] Loading states aparecem/desaparecem
- [ ] Validação de formulário funciona
- [ ] Mensagens de erro são claras
- [ ] Tab navigation acessível (basicamente)

---

## Final Readiness

### All Passing?

```
Lint:           ✅
Type-check:     ✅
Tests:          ✅
Build:          ✅
CodeRabbit:     ✅
Manual testing: ✅
Story updated:  ✅

→ READY TO PUSH
```

### Anything failing?

```
❌ Stop. Don't push yet.
   1. Fix the issue
   2. Re-run that check
   3. Come back here
   4. Mark as ✅
   5. Continue
```

---

## Push Command

```bash
# Only when all checkboxes are ✅:
git push -u origin feature/STORY-42

# GitHub Actions will:
# - Run lint, typecheck, test, build
# - Run CodeRabbit again
# - Auto-merge to dev (if all pass)
```

---

## If Something Breaks After Push

1. GitHub Actions email alert → click to view
2. Fix locally
3. Commit fix
4. Push again
5. Actions re-run
6. Should merge this time

---

*Remember: Better to catch issues now than in code review.*

*Última atualização: 2026-02-28*
