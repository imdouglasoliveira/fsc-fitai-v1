# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Sistema de Gestão de Treinos (Workout Management System) — fullstack bootcamp project from Fullstack Club. Backend API with Fastify, PostgreSQL via Prisma ORM.

## Development Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server with watch mode (tsx --watch src/index.ts)
pnpm validate             # Run lint + typecheck + tests (all-in-one)
```

### Database

```bash
docker compose up -d      # Start PostgreSQL container
npx prisma migrate dev    # Run migrations
npx prisma generate       # Generate Prisma client (output: src/generated/prisma/)
npx prisma studio         # Open DB GUI
```

### Testing (Vitest)

```bash
pnpm test                 # Run all tests
pnpm test:unit            # Run unit tests only (tests/unit/)
pnpm test:e2e             # Run e2e tests only (tests/e2e/)
pnpm test:watch           # Watch mode
pnpm test:coverage        # Coverage report
```

### Linting & Formatting

```bash
pnpm lint                 # ESLint 9 flat config
pnpm format:check         # Check formatting (Prettier defaults)
pnpm format               # Fix formatting
pnpm typecheck            # tsc --noEmit
```

## Tech Stack

- **Runtime**: Node.js (ESM modules, `"type": "module"`)
- **Language**: TypeScript 5.9 (strict mode, target ES2024, module nodenext)
- **Package Manager**: pnpm 10.30
- **Backend**: Fastify 5 with Zod type provider for validation
- **Database**: PostgreSQL 16 (Docker) + Prisma 7 ORM with `@prisma/adapter-pg`
- **Auth**: better-auth with Prisma adapter
- **Validation**: Zod 4 + `fastify-type-provider-zod`
- **API Docs**: Swagger via `@fastify/swagger` + Scalar API Reference at `/docs`

## Architecture

```
src/
├── index.ts              # Fastify server setup, plugin registration, route mounting
├── lib/
│   ├── auth.ts           # better-auth configuration (Prisma adapter, email/password)
│   └── db.ts             # Prisma client singleton (PrismaPg adapter, global in dev)
├── routes/               # Fastify route plugins (registered with prefix)
├── usecases/             # Business logic classes (one file per use case, PascalCase)
├── schemas/              # Shared Zod schemas (ErrorSchema, WorkoutPlanSchema, etc.)
├── errors/               # Custom error types (NotFoundError)
└── generated/prisma/     # Auto-generated Prisma client (from prisma generate, gitignored)
```

### Key Patterns

- **Routes**: Fastify plugins registered with prefix — `app.register(workoutPlanRoutes, {prefix: "/workout-plan"})`. Use `ZodTypeProvider` for type-safe request/response schemas.
- **Use cases**: Class-based with constructor injection of Prisma client (defaults to singleton). Pure async `execute(dto)` methods. Use Prisma transactions for multi-model operations.
- **Schemas**: Shared Zod schemas in `src/schemas/` for reuse across routes (e.g., `ErrorSchema`, `WorkoutPlanSchema`).
- **Database**: Prisma client singleton in `lib/db.ts` using `@prisma/adapter-pg`. All DateTime fields use `@db.Timestamptz()`. Relations use `onDelete: Cascade`.
- **Auth**: Routes proxied through Fastify to better-auth at `/api/auth/*`. CORS configured for `http://localhost:3000`.

## Conventions

- **Commits**: Conventional Commits in Portuguese (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`)
- **Branches**: `master` (prod), `dev` (development), `feature/*`, `fix/*`, `hotfix/*`
- **Imports**: Sorted by `eslint-plugin-simple-import-sort` (errors on unsorted). All local imports must use `.js` extension (TypeScript nodenext ESM requirement).
- **Formatting**: Prettier defaults (no custom config)

## Environment Variables

```
PORT=7001
DATABASE_URL=postgresql://postgres:password@localhost:5432/bootcamp-treinos-api
BETTER_AUTH_SECRET=...
BETTER_AUTH_URL=http://localhost:8081
```

## Important Notes

- `.backups/` is gitignored — contains instructor's reference implementation for target patterns.
- `.a8z/` is gitignored — A8Z framework for workflow orchestration, not part of application code.
- Docker Compose provides PostgreSQL: `postgres:16-alpine` on port 5432 (user: postgres, password: password, db: bootcamp-treinos-api).
- Prisma client is generated to `src/generated/prisma/` — run `npx prisma generate` after schema changes.
- CI runs on GitHub Actions: lint, format:check, typecheck, unit tests, e2e tests, coverage.
