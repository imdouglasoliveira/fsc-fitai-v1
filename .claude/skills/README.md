# Skills — Guia de Uso

Skills são slash commands que ativam um modo especializado no Claude Code. Cada skill carrega contexto, regras e checklist específicos do projeto A8Z para a tarefa em questão.

---

## Referência Rápida

| Skill | Comando | Ativa automaticamente quando... |
|-------|---------|----------------------------------|
| Frontend Developer | `/fe [descrição]` | Você pede para criar/modificar componente, página, hook React |
| Backend Developer | `/be [descrição]` | Você pede para criar/modificar rota, endpoint, lógica de banco |
| QA & Testes | `/qa [módulo]` | Você pede para escrever testes, revisar cobertura, validar feature |
| Plano → Tasks | `/plan-to-tasks <arquivo>` | Você pede para quebrar um plano/ADR/PRD em tasks |
| Test-Driven Dev | `/tdd [task ou feature]` | Você pede para implementar algo com TDD / "escrever testes primeiro" |
| Model Router | `/route [task description]` | Quer saber qual modelo usar antes de gastar tokens |

> **Ativação automática:** O Claude detecta pelo contexto da conversa e carrega a skill sem precisar do comando explícito. Use o comando explícito quando quiser **forçar** o modo ou passar um argumento específico.

---

## `/fe` — Frontend Developer

**Arquivo:** `.claude/skills/fe/SKILL.md`

### Quando usar
- Criar novo componente, modal, ou página React
- Modificar layout, estilos, ou comportamento de UI existente
- Implementar novo hook (`useXxx`)
- Adicionar nova rota no TanStack Router
- Integrar um endpoint novo no frontend

### Exemplos de invocação
```
/fe criar modal de criação de empresa RFCL com campos CNPJ, razão social e UF
/fe adicionar paginação no componente EmpresasTable
/fe novo hook useRFCLEmpresas que consome /api/rfcl/v1/empresas
```

### O que a skill garante
- Dark mode desabilitado (sem `dark:` classes)
- `ResponsiveModal` em vez de Dialog direta
- Toast com variantes corretas e sem emojis
- Botões async com loading state
- `h-full` em vez de `h-screen` para split view
- `MODULES_REGISTRY` atualizado ao adicionar páginas
- TypeScript check (`npx tsc --noEmit`) antes de finalizar

---

## `/be` — Backend Developer

**Arquivo:** `.claude/skills/be/SKILL.md`

### Quando usar
- Criar nova rota Fastify
- Modificar query no Supabase ou SQLite (RFCL)
- Adicionar migration de banco
- Implementar middleware de auth/permissão
- Criar novo módulo de rotas

### Exemplos de invocação
```
/be criar endpoint GET /api/rfcl/v1/empresas/export com suporte a CSV e XLSX
/be adicionar campo `dominio_corporativo` nos filtros de queryEmpresas
/be nova migration para adicionar índice em rf_empresa.cnpj_basico
```

### O que a skill garante
- Imports ESM com `.js` obrigatório (Railway quebraria sem)
- `// @ts-ignore` antes de `.update()` / `.insert()` Supabase
- Schema Fastify com `tags`, `description`, `security` no Swagger
- `withAuth` aplicado corretamente por escopo
- Build local antes de considerar pronto (`npm run build`)
- Testes passando (`npm run test`)

---

## `/qa` — QA & Testes

**Arquivo:** `.claude/skills/qa/SKILL.md`

### Quando usar
- Escrever testes para um módulo que não tem cobertura
- Auditar cobertura atual e identificar gaps
- Validar que uma feature implementada está correta
- Reproduzir um bug em teste antes de corrigir

### Exemplos de invocação
```
/qa módulo financeiro — receitas e status transitions
/qa lib rfcl-queries — filtros e paginação
/qa verificar cobertura geral e listar o que está abaixo de 70%
```

### O que a skill garante
- Priorização correta: lógica de negócio > edge cases > happy path
- Padrão Arrange-Act-Assert
- SQLite in-memory para testes RFCL (sem arquivo real)
- Mock do Supabase client para rotas
- Cobertura mínima 70% linhas/funções/branches
- Sem testes flaky (datas via `vi.useFakeTimers()`)

---

## `/plan-to-tasks` — Plano → Tasks

**Arquivo:** `.claude/skills/plan-to-tasks/SKILL.md`

### Quando usar
- Você tem um ADR, PRD, spec ou plano em `.temp/`, `docs/`, ou `database/migrations/`
- Você descreveu verbalmente uma feature e quer quebrar em tasks
- Você precisa de um backlog estruturado antes de começar a codar

### Exemplos de invocação
```
/plan-to-tasks docs/rfcl-migracao-sqlite-para-supabase.md
/plan-to-tasks .temp/migrations/002-adequacoes-backend.md
/plan-to-tasks "criar módulo frontend RFCL com listagem de empresas, filtros e exportação"
```

### O que a skill produz
- Arquivos `TASK-YYYYMM-NNN.md` em `.claude/tasks/`
- Cada task com: título imperativo, área, agente responsável, prioridade, estimativa, plano de execução e DoD mensurável
- Tabela de dependências entre tasks
- Sugestão de qual task executar primeiro com `/tdd`

### Regras de decomposição
- 1 task = 1 entregável revisável de forma isolada
- Tamanho máximo: 1 dia (`1d`). Tarefas maiores são divididas.
- DoD sempre com métrica concreta (ex: `cobertura ≥ 70%`, `endpoint < 200ms`)
- Camadas separadas: migration ≠ route ≠ frontend component

---

## `/tdd` — Test-Driven Development

**Arquivo:** `.claude/skills/tdd/SKILL.md`

### Quando usar
- Implementar qualquer lógica de negócio nova no backend
- Corrigir um bug (reproduzir em teste antes de corrigir)
- Refatorar código que precisa de garantias de comportamento
- Implementar uma task gerada pelo `/plan-to-tasks`

### Exemplos de invocação
```
/tdd TASK-202602-001
/tdd implementar função queryEmpresas com filtro por dominio_corporativo
/tdd corrigir bug onde export CSV ignora filtro de UF
```

### O ciclo obrigatório
```
RED   → Escreve teste que falha (comportamento esperado documentado)
GREEN → Escreve mínimo de código para o teste passar
REFACTOR → Limpa sem quebrar nada
```

> A skill **bloqueia** implementação antes do teste. Se um teste passar sem código, o teste está errado.

### O que a skill garante
- Nomenclatura: `it('should <behavior> when <condition>')`
- Fases RED → GREEN → REFACTOR explícitas
- Coverage checkpoint no final (≥70%)
- Suite completa rodando sem regressões
- Build TypeScript compilando

---

## `/route` — Model Router (economizar tokens)

**Arquivo:** `.claude/skills/route/SKILL.md`

### Quando usar
- Antes de uma tarefa grande, quando quer economizar
- Na duvida entre usar Haiku, Sonnet ou Opus
- Quando quer validar se precisa mesmo de Opus

### Exemplos de invocacao
```
/route Preciso renomear uma variavel em 3 arquivos
/route Quero criar um modulo inteiro de RFCL no frontend com 5 componentes
/route Preciso debugar um bug que envolve frontend, backend e banco
```

### Como funciona
1. A skill roda em **Haiku** (custo minimo para a analise)
2. Classifica sua tarefa
3. Recomenda: `haiku`, `sonnet` ou `opus`
4. Voce troca manualmente com `/model <nome>`

### Cheat sheet rapido (sem precisar invocar `/route`)

| Tarefa | Modelo |
|--------|--------|
| Pergunta curta, fix typo, rename, lookup | `haiku` |
| Feature, debug, testes, CRUD, 1-3 arquivos | `sonnet` |
| Arquitetura, refactor grande, security, multi-modulo | `opus` |

> **Regra de ouro:** Na duvida, use `sonnet`. So escale para `opus` quando a tarefa tem risco alto ou cruza muitos modulos.

---

## Fluxo combinado (AIOS-style)

Para features novas de ponta a ponta:

```
1. /plan-to-tasks docs/minha-feature.md
   → Gera TASK-202602-001 (migration), TASK-002 (backend), TASK-003 (frontend)

2. /tdd TASK-202602-001
   → Implementa a migration com TDD

3. /be TASK-202602-002
   → Cria as rotas Fastify seguindo as regras do projeto

4. /qa financeiro
   → Valida cobertura e escreve testes faltando

5. /fe TASK-202602-003
   → Implementa o componente React com as regras de UI
```

---

## Onde ficam os arquivos

```
.claude/
├── skills/
│   ├── README.md          ← este arquivo
│   ├── fe/SKILL.md        → /fe
│   ├── be/SKILL.md        → /be
│   ├── qa/SKILL.md        → /qa
│   ├── plan-to-tasks/SKILL.md  → /plan-to-tasks
│   ├── tdd/SKILL.md       → /tdd
│   └── route/SKILL.md     → /route (roda em Haiku)
├── agents/                ← personas dos especialistas (referenciados pelas skills)
├── tasks/                 ← tasks geradas pelo /plan-to-tasks
└── templates/
    └── taskTemplate.md    ← template usado pelo /plan-to-tasks
```
