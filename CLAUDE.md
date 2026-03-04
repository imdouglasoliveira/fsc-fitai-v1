# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sistema de Gestao de Treinos (Workout Management System) — fullstack bootcamp project from Fullstack Club. Backend API with Fastify, frontend with Next.js, PostgreSQL via Prisma ORM.

## Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server with watch mode (tsx --watch src/index.ts)
```

### Database (when Prisma is set up)

```bash
docker compose up -d                  # Start PostgreSQL container
npx prisma migrate dev                # Run migrations
npx prisma generate                   # Generate Prisma client
npx prisma studio                     # Open DB GUI
```

### Linting & Formatting

```bash
npx eslint .              # Lint (ESLint 9 flat config)
npx prettier --check .    # Check formatting
npx prettier --write .    # Fix formatting
```

No test framework is configured yet.

## Tech Stack

- **Runtime**: Node.js (ESM modules, `"type": "module"`)
- **Language**: TypeScript 5.9 (strict mode, target ES2024, module nodenext)
- **Package Manager**: pnpm 10.30
- **Backend**: Fastify with Zod type provider for validation
- **Database**: PostgreSQL 16 (Docker) + Prisma ORM with `@prisma/adapter-pg`
- **Auth**: better-auth library
- **API Docs**: Swagger via `@fastify/swagger` + Scalar API Reference at `/docs`
- **Frontend**: Next.js (planned, not yet scaffolded)

## Architecture (reference from .backups/)

The `.backups/bootcamp-treinos-aula-00/` directory contains the instructor's reference implementation. The target architecture follows this pattern:

```
src/
├── index.ts              # Fastify server setup, plugin registration, route mounting
├── lib/
│   ├── auth.ts           # better-auth configuration
│   └── db.ts             # Prisma client singleton (with PrismaPg adapter)
├── routes/               # Fastify route plugins (registered with prefix)
├── usecases/             # Business logic (one file per use case, PascalCase)
├── schemas/              # Zod schemas for validation
├── errors/               # Custom error types
└── generated/prisma/     # Auto-generated Prisma client (from prisma generate)
```

Key patterns:
- Routes are Fastify plugins registered with `app.register(routes, { prefix })`.
- Validation uses `fastify-type-provider-zod` — schemas defined with Zod, type-safe request/response.
- Use cases are standalone functions that receive dependencies and return results.
- Prisma client uses the PostgreSQL adapter (`@prisma/adapter-pg`) with a global singleton pattern.
- Auth routes are proxied through Fastify to better-auth at `/api/auth/*`.
- Imports use `.js` extensions (required for ESM with nodenext resolution).

## Conventions

- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)
- **Branches**: `master` (prod), `dev` (development), `feature/*`, `fix/*`, `hotfix/*`
- **Imports**: Sorted by `eslint-plugin-simple-import-sort` (auto-sorted, errors on unsorted)
- **Formatting**: Prettier (no custom config — uses defaults)
- **ESM**: All imports must use `.js` extension for local files (TypeScript nodenext requirement)

## Environment Variables

```
DATABASE_URL=postgresql://user:password@localhost:5432/sgt?schema=public
JWT_SECRET=...
PORT=8081
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## A8Z Framework (`.a8z/`)

Para listar agents disponíveis: `npx a8z agent`

Skills disponíveis em `.a8z/skills/`:

| Skill | Uso |
|-------|-----|
| **ralph** | Exploração iterativa de requisitos ambíguos (< 60% clareza) |
| **bmad** | Otimização de prompts (Brazilian Method of AI Development) |
| **compose** | Orquestração automática de múltiplos skills em sequência |
| **be** | Implementação backend (APIs, rotas, banco) |
| **fe** | Implementação frontend (React, componentes, UI) |
| **tdd** | Desenvolvimento orientado a testes |
| **qa** | Testes de qualidade e validação de cobertura |
| **plan-to-tasks** | Converte planos/PRDs em tarefas acionáveis |
| **commit-dev** | Commits estruturados com Conventional Commits |
| **route** | Encontra modelo Claude mais econômico para a tarefa |
| **status** | Dashboard e métricas do framework |
| **audit** | Log de decisões e rastreabilidade |
| **session-handover** | Transfere contexto para nova sessão |
| **react-doctor** | Diagnóstico de saúde de projetos React |
| **workflow-select** | Recomenda melhor workflow (Ralph/SDD/Rapid/Escalate) |

Outros recursos em `.a8z/`:
- `agents/` — Perfis de agentes especializados (dev, pm, po, qa, architect, etc.)
- `rules/` — Regras de governança do framework
- `playbooks/` — Templates de execução de fluxos
- `checklists/` — Checklists de qualidade por fase
- `memory/` — Decision log e aprendizado (`decision-log.json`)
- `prompts/` — Prompts versionados
- `templates/` — Templates de tarefas e PRDs
- `stacks/` — Definições de stacks tecnológicas

## Important Notes

- The `*/.backups/` directory is gitignored and contains reference code from the bootcamp instructor — use it for guidance on the target implementation patterns.
- The `*/.a8z/` directory is gitignored. It contains the A8Z framework for workflow orchestration (agents, rules, playbooks, skills). Not part of the application code.
- The project is in early stages — `src/index.ts` currently only has a Hello World. The backend/frontend structure from README is the planned architecture.
- Docker Compose provides PostgreSQL: `postgres:16-alpine` on port 5432 (user: postgres, password: password).