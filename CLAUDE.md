# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 🏗️ Architecture Overview

**Bootcamp SGT** is a fullstack training management system with a **monorepo structure**:

```
bootcamp-sgt/
├── src/                 # Root-level shared code (utilities, types)
├── backend/             # Fastify + Node.js API (planned)
│   ├── src/
│   │   ├── routes/      # API endpoints
│   │   ├── controllers/ # Business logic
│   │   ├── services/    # Domain logic
│   │   ├── repositories/# Data access (Prisma)
│   │   └── middlewares/ # Auth, logging, error handling
│   ├── prisma/          # Schema + migrations
│   └── package.json
│
├── frontend/            # Next.js + React app (planned)
│   ├── src/
│   │   ├── app/         # Pages & layouts (App Router)
│   │   ├── components/  # Reusable React components
│   │   ├── services/    # API client code
│   │   ├── hooks/       # Custom React hooks
│   │   ├── types/       # TypeScript interfaces
│   │   └── styles/      # Global styles
│   └── package.json
│
├── .claude/             # Claude Code framework (A8Z)
│   ├── agents/          # Intelligent agents
│   ├── skills/          # Custom skills (/ralph, /bmad, /compose, etc.)
│   ├── rules/           # Framework rules
│   ├── memory/          # Decision audit trail
│   └── prompts/         # Prompt versions & BMAD variants
│
└── .github/workflows/   # CI/CD pipelines
```

**Key Design Decisions:**
- **Monorepo**: Single repo for backend + frontend (easier for full-stack changes)
- **TypeScript everywhere**: Strict mode for type safety
- **Database-first**: Prisma for type-safe ORM
- **API-first**: Backend as independent service
- **A8Z Framework**: AI-driven development system in `.claude/`

---

## 🚀 Common Development Commands

### Development (Root)
```bash
pnpm install              # Install dependencies
pnpm run dev              # Watch & run with tsx (if src/index.ts exists)
```

### Backend Development (when created)
```bash
cd backend
pnpm install              # Install backend deps
pnpm run dev              # Dev server with hot reload
pnpm run build            # Compile TypeScript → dist/
pnpm start                # Run production build
pnpm run test             # Run unit tests
pnpm run test:watch       # Watch mode for tests
npx prisma migrate dev    # Create + apply DB migration
npx prisma studio        # Open database UI
```

### Frontend Development (when created)
```bash
cd frontend
pnpm install              # Install frontend deps
pnpm run dev              # Dev server (localhost:3000)
pnpm run build            # Production build
pnpm run lint             # ESLint check
pnpm run lint:fix         # Auto-fix lint issues
```

### Linting & Formatting
```bash
pnpm run lint             # ESLint across workspace
pnpm run format           # Prettier format (at workspace level)
pnpm run type-check       # TypeScript type checking
```

### Testing
```bash
pnpm run test             # Run all tests
pnpm run test --watch     # Watch mode
pnpm run test PATTERN     # Run matching tests
```

---

## 💻 Tech Stack Details

| Layer | Technology | Notes |
|-------|-----------|-------|
| **Runtime** | Node.js v18+ | ES modules enabled |
| **Backend Framework** | Fastify | High-performance API server |
| **Frontend Framework** | Next.js 14+ | React with App Router (not Pages Router) |
| **Language** | TypeScript 5.9.3 | Strict mode enabled |
| **Database** | PostgreSQL + Prisma | Type-safe ORM |
| **Package Manager** | pnpm 10.30.3 | Fast, lockfile-focused |
| **Linting** | ESLint 9.39.3 | Code quality |
| **Formatting** | Prettier 3.8.1 | Code style |
| **Git Hooks** | Husky 9.1.7 | Pre-commit validation |

---

## 🔧 Important Files & Configuration

### Root Level
- **package.json** — Workspace package manager configuration
- **tsconfig.json** — TypeScript compiler options (strict mode)
- **pnpm-lock.yaml** — Dependency lock file (commit this!)
- **README.md** — Project overview & setup instructions

### Environment Configuration
- **backend/.env** — Backend secrets (DATABASE_URL, JWT_SECRET, PORT)
- **frontend/.env.local** — Frontend config (NEXT_PUBLIC_API_URL)
- **.env.example** — Template for environment variables

### Development Tools
- **eslintrc.js** — Linting rules (workspace)
- **.prettierrc** — Code formatting rules
- **.husky/** — Git hooks (run on commit)

### A8Z Framework
- **.claude/CLAUDE.md** — Portuguese development guide
- **.claude/FRAMEWORK-STATUS.md** — Framework completion status
- **.claude/agents/** — Ralph Governor, Skill Composer, Memory Manager, Workflow Router
- **.claude/skills/** — `/ralph`, `/bmad`, `/compose`, `/audit`, `/workflow-select`, `/status`
- **.claude/memory/decision-log.json** — Decision audit trail (127+ decisions logged)
- **.claude/prompts/REGISTRY.md** — Prompt versions with scores

---

## 🏛️ Backend Architecture (Fastify)

When implementing backend features:

1. **Routes** (`src/routes/`) — Define HTTP endpoints
   - Structure: `router.get('/resource', controller.action)`
   - Return consistent JSON responses

2. **Controllers** (`src/controllers/`) — Handle HTTP layer
   - Parse requests, validate input
   - Call services, return responses
   - Keep thin—delegate to services

3. **Services** (`src/services/`) — Business logic
   - Domain rules, calculations, workflows
   - Call repositories for data access
   - Handle errors & edge cases

4. **Repositories** (`src/repositories/`) — Data access layer
   - Prisma-based database operations
   - Type-safe queries
   - No business logic here

5. **Middlewares** (`src/middlewares/`) — Cross-cutting concerns
   - Authentication, logging, error handling
   - CORS, request parsing

**Example structure for a feature:**
```
backend/src/
├── routes/users.ts         (GET /users, POST /users)
├── controllers/userController.ts
├── services/userService.ts
└── repositories/userRepository.ts (Prisma queries)
```

---

## ⚛️ Frontend Architecture (Next.js)

When implementing frontend features:

1. **App Router** (`src/app/`) — Page routes (NOT Pages Router)
   - `app/page.tsx` → `/`
   - `app/dashboard/page.tsx` → `/dashboard`
   - Supports layouts, nested routes

2. **Components** (`src/components/`) — Reusable UI
   - Small, focused, single responsibility
   - Props over state when possible
   - Use Server Components by default, `'use client'` when needed

3. **Hooks** (`src/hooks/`) — Reusable logic
   - Custom React hooks for shared behavior
   - API calling, state management, animations
   - Extracted from components for reusability

4. **Services** (`src/services/`) — API integration
   - API client functions (fetch/axios)
   - Base URL from `NEXT_PUBLIC_API_URL`
   - Error handling & response typing

5. **Types** (`src/types/`) — TypeScript definitions
   - API request/response types
   - Domain models
   - Shared interfaces

**Example file structure for a feature:**
```
frontend/src/
├── app/
│   └── users/
│       └── page.tsx              (Page route)
├── components/
│   ├── UserCard.tsx              (Presentational)
│   └── UserForm.tsx              (Form with hooks)
├── hooks/
│   ├── useUsers.ts               (API calls)
│   └── useUserForm.ts            (Form state)
├── services/
│   └── userService.ts            (API client)
└── types/
    └── user.ts                   (User type definitions)
```

---

## 📝 Code Naming Conventions

- **Variables/Functions**: `camelCase` (`userName`, `getUserById()`)
- **Constants**: `UPPER_SNAKE_CASE` (`API_BASE_URL`, `MAX_RETRIES`)
- **Classes/Types**: `PascalCase` (`User`, `UserService`, `IUserRepository`)
- **Files**: `kebab-case` for components/routes (`user-card.tsx`), `camelCase` for utilities
- **Exports**: Named exports preferred over default (easier refactoring)

---

## 🔐 Environment & Secrets

**Never commit sensitive data.** Use environment variables:

```bash
# Backend .env (git-ignored)
DATABASE_URL="postgresql://user:pass@localhost/dbname"
JWT_SECRET="your-secret-key"
PORT=3001

# Frontend .env.local (git-ignored)
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

**Note**: `NEXT_PUBLIC_*` variables are exposed to the browser. Only public config here.

---

## 🔄 Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/user-authentication
   ```

2. **Make changes** — follow architecture patterns above

3. **Test locally**
   ```bash
   pnpm run test                    # Unit tests
   pnpm run lint                    # Code quality
   cd backend && pnpm run dev       # Run backend
   cd frontend && pnpm run dev      # Run frontend (separate terminal)
   ```

4. **Commit with Conventional Commits**
   ```bash
   git commit -m "feat: add user authentication"
   git commit -m "fix: resolve login validation bug"
   ```

5. **Push & create PR**
   ```bash
   git push origin feature/user-authentication
   ```

---

## 🤖 a8z Framework (Claude Code Integration)

This project includes the **a8z Framework** — an AI-driven development system:

### Available Skills
- **/ralph** {story-id} — Autonomous exploration of ambiguous requirements
- **/bmad** {phase} — Prompt optimization & variant testing
- **/compose** {story-id} — Automatic skill orchestration
- **/audit** {story-id|--monthly} — Decision audit trail & learning
- **/workflow-select** {story-id} — Intelligent workflow routing
- **/status** {story-id|--full} — System dashboard

### Framework Features
- ✅ **Autonomous Loops** — Ralph explores ambiguous specs iteratively
- ✅ **Prompt Optimization** — BMAD tests & promotes prompt variants
- ✅ **Skill Composition** — Auto-orchestrates workflow sequences
- ✅ **Memory System** — Captures decisions & learns from outcomes
- ✅ **Workflow Routing** — Recommends Ralph vs SDD vs Rapid paths

### How to Use
```bash
# For ambiguous requirements:
/workflow-select STORY-42        # Get workflow recommendation
/ralph STORY-42                  # Run autonomous exploration

# For prompt testing:
/bmad 02-spec                    # Test & compare prompt variants

# For implementation:
/compose STORY-42                # Auto-detect best composition

# For learning:
/audit STORY-42                  # Capture decision + outcome
/audit --monthly                 # Monthly learning review
```

See `.claude/FRAMEWORK-STATUS.md` for detailed a8z framework status.

---

## 📚 Key Patterns

### Error Handling
- Backend: Use Fastify error plugins + typed exceptions
- Frontend: Try/catch around API calls, show user-friendly errors
- Never expose sensitive details to client

### Authentication
- JWT tokens in Authorization header
- Backend validates on protected routes
- Frontend stores token in secure storage (NOT localStorage if possible)

### Database Migrations
```bash
# Create migration after schema change
npx prisma migrate dev --name add_user_fields

# Always commit prisma/migrations/
```

### TypeScript Strict Mode
- No `any` types without good reason
- Explicit return types on functions
- Use discriminated unions for complex types

---

## ⚙️ Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `pnpm install` | Install dependencies |
| `pnpm run dev` | Start development servers |
| `pnpm run build` | Production build |
| `pnpm run test` | Run test suite |
| `pnpm run lint` | ESLint check |
| `npx prisma studio` | Open database UI |
| `npx prisma migrate dev` | Create DB migration |
| `git log --oneline` | View commit history |
| `/commit` | Claude skill for structured commits |
| `/status` | a8z dashboard |

---

## 🔗 Documentation & Resources

- **[README.md](README.md)** — Project overview
- **[.claude/CLAUDE.md](.claude/CLAUDE.md)** — Detailed development guide (Portuguese)
- **[.claude/FRAMEWORK-STATUS.md](.claude/FRAMEWORK-STATUS.md)** — a8z Framework status
- **[Fastify Docs](https://www.fastify.io/)** — Backend framework
- **[Next.js Docs](https://nextjs.org/)** — Frontend framework
- **[Prisma Docs](https://www.prisma.io/)** — Database ORM
- **[Conventional Commits](https://www.conventionalcommits.org/)** — Commit format

---

## 🎯 When to Ask for Help

- **Architecture questions** → Check existing patterns in backend/frontend folders
- **Database schema** → Review `prisma/schema.prisma`
- **API contract** → Check controllers & routes for expected request/response
- **Style questions** → Look at existing code in the same layer
- **Framework help** → Read `.claude/FRAMEWORK-STATUS.md` or use `/status`

---

*Last Updated: 2026-02-28*
*Framework: a8z v1.0 (Operational)*
