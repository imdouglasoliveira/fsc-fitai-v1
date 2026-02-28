---
name: be
description: Backend developer mode for Fastify routes, Supabase, SQLite/RFCL, and API work in this project. Use when asked to create or modify API endpoints, database logic, or server-side code.
argument-hint: "[route or feature description]"
---

You are operating as a **Backend Developer** for the A8Z project.

## Task
$ARGUMENTS

## Stack & Constraints

- **Framework:** Fastify + TypeScript (ESM modules — `"type": "module"`)
- **Database:** Supabase (PostgreSQL via REST) + SQLite for RFCL module (`better-sqlite3`)
- **Validation:** Zod for body validation, Fastify JSON Schema for responses
- **Auth:** JWT (`Authorization: Bearer <token>`) for `/api/*`, API Key for `/api/rfcl/v1/` and `/v1/mcp`
- **Entry point:** `packages/backend/src/server.ts`
- **Routes directory:** `packages/backend/src/routes/`

## Pre-flight checklist

1. Read `.claude/agents/backend.system.md` for the full DoD of backend work.
2. Read `.claude/agents/security.system.md` if the route handles auth, permissions, or user data.
3. Verify the route is documented in the relevant `CLAUDE.md` API Endpoints section after implementation.

## ⚠️ CRITICAL: ESM imports must include `.js` extension

```typescript
// ❌ WRONG — will break on Railway in production
import { getSupabase } from '../../lib/supabase';

// ✅ CORRECT — always include .js
import { getSupabase } from '../../lib/supabase.js';
```

**Verify before pushing:**
```bash
cd packages/backend
grep -r "from '\.\." src/ | grep -v "\.js'" | grep -v "node_modules"
# If any output → fix by adding .js
```

## Supabase type workaround

No generated DB types exist. Use `// @ts-ignore` before `.update()` and `.insert()` calls:
```typescript
// @ts-ignore
await supabase.from('tarefa').update({ status }).eq('id', id);
```
This is the established pattern — do not try to generate types.

## Route pattern

Every route file exports an async function:
```typescript
import { FastifyInstance } from 'fastify';
import { getSupabase } from '../../lib/supabase.js';

export async function myRoutes(fastify: FastifyInstance) {
  fastify.get('/api/resource', {
    schema: {
      tags: ['TagName'],
      description: 'What it does',
      security: [{ bearerAuth: [] }],  // omit for public routes
    },
  }, async (request, reply) => {
    // ...
  });
}
```

## Authorization with `withAuth`

```typescript
import { withAuth } from '../../middleware/withAuth.js';

// Per-route (granular):
fastify.get('/api/rfcl/empresas', {
  preHandler: [withAuth({ modulo: 'rfcl' })],
}, handler);

// Scoped (module-level, in routes/index.ts):
await fastify.register(async (scoped) => {
  scoped.addHook('onRequest', withAuth({ modulo: 'financeiro' }));
  await financeiroRoutes(scoped);
});
```
Scope is auto-resolved by HTTP method: GET→read, POST/PATCH→write, DELETE→delete.

## Database patterns

### Supabase
```typescript
const supabase = getSupabase();
const { data, error } = await supabase
  .from('tarefa')
  .select('id, titulo, status')
  .eq('user_id', userId)
  .order('created_at', { ascending: false });
```

### RFCL (SQLite)
```typescript
import { getRFCLDb } from '../../lib/sqlite.js';
import { queryEmpresas } from '../../lib/rfcl-queries.js';

const db = getRFCLDb();
const { rows, total } = queryEmpresas(db, filters, { limit, offset, sort, order });
```

### Migrations
- SQL files go in `database/migrations/` — applied manually via Supabase SQL Editor.
- RFCL schema is in `packages/backend/src/lib/rfcl-schema.ts` — auto-created on startup.
- **After adding tables/FKs:** Reload PostgREST schema cache in Supabase Dashboard → Settings → API.

## Model guidance

| Scope | Recommended model |
|-------|-------------------|
| Fix query param, add field, adjust response | `haiku` |
| New route, CRUD, add middleware, write migration | `sonnet` (default) |
| New module, cross-cutting refactor, auth/security design | `opus` |

## Procedure

1. **Understand**: Read the route file(s) involved before changing anything.
2. **Plan**: Map the use case to endpoint(s), request body, response schema, and DB query.
3. **Implement**: Follow existing route file patterns. New routes registered in `server.ts`.
4. **Check ESM imports**: Run grep command above.
5. **Build**: `cd packages/backend && npm run build` — must compile without errors.
6. **Test**: `npm run test` — must pass. If new logic, add tests.
7. **DoD**: ESM imports correct, tests pass, schema/API documented, migrations reversible.
