# Dev Implementation Playbook

**Purpose:** Implementar um story pronto (Ready) desde o início até código testado e pronto para QA.

**Success Criteria:**
- ✅ Feature branch criada
- ✅ Código implementado (backend, frontend, ou ambos)
- ✅ CodeRabbit self-healing executado (≤ 2 iterações)
- ✅ Testes escritos e passando (coverage ≥ 85%)
- ✅ Lint/type-check/build sem erros
- ✅ Git commit e push completado
- ✅ Story file atualizado
- ✅ Pronto para @qa revisar

---

## Step 1: Preparação (10-15 min)

### 1.1 Validar Pré-requisitos

```
[ ] Story está marcado "Ready" (validado por @po)?
[ ] Todas as dependências foram completadas?
[ ] Feature branch pode ser criada?
[ ] Ambiente dev clean (sem uncommitted changes)?
```

### 1.2 Criar Feature Branch

```bash
# Checkout para branch dev (base)
git checkout dev

# Puxar updates
git pull origin dev

# Criar feature branch
git checkout -b feature/STORY-42
# Naming: feature/{story-id} ou feature/{story-id}-{short-desc}
```

### 1.3 Ler Story Completamente

```
[ ] Story file aberto: .claude/stories/01.42.story.md
[ ] AC (Acceptance Criteria) entendidos
[ ] Scope IN e OUT claros
[ ] Definition of Done lido
[ ] Dependências verificadas
[ ] Blockers listados (se houver)
```

### 1.4 Entender Arquitetura

```
[ ] CLAUDE.md lido (patterns do projeto)
[ ] Backend patterns conhecido (se feature de backend)
[ ] Frontend patterns conhecido (se feature de frontend)
[ ] Database schema (se houver mudança)
```

---

## Step 2: Escolher Execution Mode (5 min)

Existem 3 modos. Escolha baseado na complexity do story:

### Mode A: INTERACTIVE (Recomendado - 85% dos casos)

```bash
/be STORY-42          # Se for backend
/fe STORY-42          # Se for frontend
/be STORY-42 && /fe STORY-42  # Se for fullstack
```

**Quando usar:**
- Clarity >= 80% (bem especificado)
- Complexity <= 15 (não é mega-feature)
- Quer checkpoints e confirmações

**O que esperar:**
- Skills fazem perguntas de confirmação
- Você aprova/rejeita cada passo
- Tempo: 2-4 horas

### Mode B: YOLO (Rápido - bugs simples, 10% dos casos)

```bash
/be STORY-42 --yolo
/fe STORY-42 --yolo
```

**Quando usar:**
- Complexity <= 8 (muito simples)
- Padrão bem conhecido (não tem surpresa)
- Confiança alta

**O que esperar:**
- Zero prompts; AI toma todas as decisões
- Tempo: 1-2 horas
- Risco: Menos revisão de decisões

### Mode C: PRE-FLIGHT (Planejado - ambíguo, 5% dos casos)

```bash
/be STORY-42 --pre-flight
/fe STORY-42 --pre-flight
```

**Quando usar:**
- Clarity < 80% (ambíguo)
- Complexity >= 15 (complexo)
- Quer plano detalhado ANTES de código

**O que esperar:**
- 15-20 perguntas upfront
- Gera plano de execução
- Depois: zero-ambiguity implementation
- Tempo: 3-5 horas

---

## Step 3: Implementação Backend (variável)

### 3.1 Rodar Skill /be

```bash
/be STORY-42 [--mode]
```

Skill criará:
- ✅ Routes em `backend/src/routes/`
- ✅ Controllers em `backend/src/controllers/`
- ✅ Services em `backend/src/services/`
- ✅ Repositories em `backend/src/repositories/`
- ✅ Prisma migrations (se DB change)
- ✅ Unit tests básicos

### 3.2 Review do Output

```
[ ] Routes criadas corretamente?
[ ] Controllers delegam a services?
[ ] Services têm business logic?
[ ] Repositories usam Prisma?
[ ] Migrations estão válidas?
```

### 3.3 Testar Localmente

```bash
# Rodar migrations (se houver)
npx prisma migrate dev

# Testar manualmente
pnpm run dev --filter backend

# Testar endpoints (use Postman, Thunder Client, ou curl)
curl -X GET http://localhost:3001/api/treinos
```

---

## Step 4: CodeRabbit Self-Healing (10-15 min)

**IMPORTANTE:** Este é o gate de qualidade. Máximo 2 iterações.

### 4.1 Rodar CodeRabbit

```bash
# WSL (Windows)
wsl bash -c 'cd /mnt/c/.../bootcamp-sgt && \
  ~/.local/bin/coderabbit --severity CRITICAL,HIGH --auto-fix'

# Linux/Mac
~/.local/bin/coderabbit --severity CRITICAL,HIGH --auto-fix
```

### 4.2 Entender Saída

```
Iteration 1:
  CRITICAL: SQL injection in query builder → auto-fix applied
  HIGH: Missing error handling → auto-fix applied
  Review changes...

Iteration 2:
  Scan code again...
  No CRITICAL found? → ✅ PASS
  Still CRITICAL? → ❌ HALT - manual review needed
```

### 4.3 Decision Gate

```
If CodeRabbit output:
  ✅ "No CRITICAL/HIGH found" → Proceed to TDD

  ⚠️ "HIGH issues found, fixed" → Review fixes, then proceed

  ❌ "CRITICAL persists after iteration 2" → ESCALATE
      - Comment on story: "CodeRabbit CRITICAL issue, needs @architect review"
      - Save current state
      - Escalate to @architect
      - DO NOT proceed
```

---

## Step 5: Implementação Frontend (se needed, variável)

### 5.1 Rodar Skill /fe

```bash
/fe STORY-42 [--mode]
```

Skill criará:
- ✅ Components em `frontend/src/components/`
- ✅ Hooks em `frontend/src/hooks/`
- ✅ Services API em `frontend/src/services/`
- ✅ TypeScript types em `frontend/src/types/`
- ✅ Basic unit tests

### 5.2 Testar Localmente

```bash
# Dev server
pnpm run dev --filter frontend

# Navigate to http://localhost:3000
# Teste componentes manualmente
```

---

## Step 6: TDD Phase - Testes (20-30 min)

### 6.1 Rodar Skill /tdd

```bash
/tdd STORY-42
```

Skill:
- Avalia cobertura atual
- Sugere testes faltantes
- Cria testes para cenários não cobertos
- Target: 85% coverage (bugs: 70-80%, features: 85%+)

### 6.2 Rodar Testes

```bash
# Rodar todos
pnpm run test

# Watch mode (melhor para desenvolvimento)
pnpm run test --watch

# Verificar coverage
pnpm run test -- --coverage
```

### 6.3 Decision Gate: Coverage

```
Coverage result:
  ✅ >= 85% → Proceed

  ⚠️ 70-84% (acceptable for bugs) → Document reason, proceed

  ❌ < 70% → Return to TDD
     - Analyze missing lines
     - Add more tests
     - Re-run until target met
```

---

## Step 7: Code Quality Checks (5-10 min)

### 7.1 Lint

```bash
# Check
pnpm run lint

# Auto-fix
pnpm run lint:fix
```

**Resultado esperado:**
```
✅ No errors
✅ No warnings
```

### 7.2 TypeScript

```bash
pnpm run type-check
```

**Resultado esperado:**
```
✅ No type errors found
```

### 7.3 Build

```bash
pnpm run build
```

**Resultado esperado:**
```
✅ Build succeeded
```

### 7.4 All Green?

```
[ ] Lint: ✅
[ ] Type-check: ✅
[ ] Build: ✅
[ ] Tests: ✅
[ ] Coverage: ✅

If all YES → Proceed to Git
If any NO → Fix and re-run
```

---

## Step 8: Git Commit & Push (5-10 min)

### 8.1 Preparar Commit

```bash
# Ver mudanças
git status

# Review das mudanças
git diff

# Adicionar arquivos
git add backend/src/... frontend/src/... # Específico
# OU
git add -A  # Se tudo deve ir (cuidado!)
```

### 8.2 Usar Skill /commit-dev

```bash
/commit-dev STORY-42
```

Skill:
- Analisa mudanças
- Gera commit message (Conventional Commits)
- Exemplos:
  - `feat: implement JWT authentication`
  - `fix: resolve login token expiry bug`
  - `refactor: optimize database queries`

### 8.3 Verificar Commit

```bash
git log --oneline -n 3
# Deve ver seu novo commit no topo
```

### 8.4 Push para Remote

```bash
git push -u origin feature/STORY-42

# Resultado esperado:
# ✅ Branch pushed
# ✅ GitHub Actions triggered
```

---

## Step 9: Atualizar Story File (5 min)

```markdown
# STORY-42: [título]

...existing content...

## Implementation Status
- [x] Backend implemented
- [x] Frontend implemented
- [x] CodeRabbit self-healing passed
- [x] Tests written (85% coverage)
- [x] Lint/type-check/build passed
- [x] Git commit and push completed
- [x] Ready for QA

## PR Link
https://github.com/imdouglasoliveira/.../pull/123

## Implementation Notes
- Usou INTERACTIVE mode
- CodeRabbit: 1 HIGH issue fixed (error handling)
- Coverage: 87% (excedeu target de 85%)
- Sem blockers encontrados

## Change Log
- **2026-02-28 12:00:** Story created by @sm
- **2026-02-28 16:00:** Dev implementation completed by @dev (Douglas)
```

---

## Escalation Decision Points

| Situação | Ação |
|----------|------|
| Não entendo requirement | Ask @po to clarify + update story |
| CodeRabbit: CRITICAL persiste | Escalate to @architect |
| Coverage stuck < 70% | Escalate to @qa for strategy |
| Dependent story não pronta | Wait ou escalate to @pm |
| Bug encontrado em dependência | Open new story + escalate |
| Preciso mudar architecture | Escalate to @architect |

---

## Useful Commands

```bash
# Development
pnpm run dev                    # Run everything
pnpm run dev --filter backend   # Backend only
pnpm run dev --filter frontend  # Frontend only

# Testing
pnpm run test                   # All tests
pnpm run test --watch          # Watch mode
pnpm run test -- --coverage    # Coverage report

# Quality
pnpm run lint                   # Check linting
pnpm run lint --fix            # Auto-fix
pnpm run type-check            # TypeScript
pnpm run build                  # Build check

# Git
git status                      # See changes
git diff                        # Detailed changes
git log --oneline              # History
git push -u origin feature/X   # Push with tracking
```

---

## Dev Phase Checklist (Copy-Paste)

```markdown
- [ ] Feature branch created
- [ ] Story file reviewed and understood
- [ ] Execution mode chosen (INTERACTIVE recommended)
- [ ] /be STORY-42 completed (if backend needed)
- [ ] CodeRabbit auto-healing done (≤ 2 iterations, CRITICAL fixed)
- [ ] /fe STORY-42 completed (if frontend needed)
- [ ] /tdd STORY-42 completed (coverage ≥ target)
- [ ] pnpm run lint passed
- [ ] pnpm run type-check passed
- [ ] pnpm run build passed
- [ ] pnpm run test all passing
- [ ] /commit-dev STORY-42 executed
- [ ] git push completed to feature/STORY-42
- [ ] Story file updated with PR link + implementation notes
- [ ] Ready to notify @qa for review
```

---

## Common Pitfalls

### ❌ Mistakes

1. **Skip CodeRabbit** — Don't. It catches security issues.
2. **Force push without review** — Creates conflicts.
3. **Merge feature branch locally** — Let @devops merge.
4. **Forget to update story file** — QA won't know status.
5. **Leave console.log in code** — Will fail lint.

### ✅ Good Practices

1. **Use INTERACTIVE mode** — Better for learning
2. **Test locally first** — Before pushing
3. **Read lint/type errors carefully** — Don't just ignore
4. **Commit frequently** — Easier to track changes
5. **Ask for help early** — Don't wait til stuck

---

## Resources

- **Feature Developer Playbook:** [feature-developer.md](feature-developer.md)
- **CLAUDE.md:** Project patterns
- **Decision Log:** `.claude/memory/decision-log.json`

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
