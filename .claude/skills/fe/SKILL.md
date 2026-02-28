---
name: fe
description: Frontend developer mode for React/Vite/shadcn-ui components, hooks, and UI work in this project. Use when asked to build or modify frontend components, pages, or hooks.
argument-hint: "[component or feature description]"
---

You are operating as a **Frontend Developer** for the A8Z project.

## Task
$ARGUMENTS

## Stack & Constraints

- **Framework:** React 19 + Vite + TypeScript
- **Routing:** TanStack Router v1 (`src/App.tsx`)
- **UI:** shadcn/ui primitives + Tailwind CSS (CSS variables for theming)
- **State/Data:** Supabase JS client + custom hooks in `src/hooks/`
- **Tables:** TanStack Table

## Pre-flight checklist (always run before writing code)

1. Read `.claude/agents/best-practices.system.md` and `.claude/agents/uiux-planner.system.md` for the DoD of this work.
2. Check `src/lib/modulesRegistry.ts` — if adding a new page/route, **update `MODULES_REGISTRY`** first. `TAB_CONFIG` and `PAGE_REGISTRY` are derived from it.
3. Check `src/lib/types.ts` for existing interfaces before defining new ones.
4. Check `src/lib/hover-styles.ts` for interaction styles (`hover.ghost`, `hover.listItem`, `hover.card`).

## Critical rules

### Dark mode
Dark mode is **DISABLED** (`DARK_MODE_ENABLED = false` in `useTheme.ts`). Do not add `dark:` Tailwind variants. Use CSS variable classes:
```tsx
className="bg-card text-foreground border-border"
className="bg-muted text-muted-foreground"
```

### Responsive modals
Always use `ResponsiveModal` (Dialog on desktop ≥640px, BottomSheet on mobile):
```tsx
import { ResponsiveModal } from '@/components/ui/responsive-modal';
```

### Toast notifications
Use the 5 variants — **no emojis in titles** (icons render automatically):
```tsx
toast({ title: 'Criado com sucesso', variant: 'success' });
toast({ title: 'Erro ao salvar', variant: 'destructive' });
// variants: success | destructive | warning | info | default
```

### Async buttons
Always add loading state to prevent double-clicks:
```tsx
const [loading, setLoading] = useState(false);
const handleClick = async () => {
  if (loading) return;
  setLoading(true);
  try { /* ... */ } finally { setLoading(false); }
};
<Button disabled={loading}>
  {loading ? <Loader2 className="animate-spin" /> : <Icon />} Label
</Button>
```

### Split view compatibility
Pages that can appear in split view must use `h-full` (not `h-screen`):
```tsx
<div className="h-full overflow-auto"> {/* NOT h-screen */}
```

### Localhost-only features
Gate scraping/validation features:
```tsx
const isLocal = (import.meta.env.VITE_API_URL || 'http://localhost:7001').includes('localhost');
```

### Permission gates
Use `<PermissionGate>` to guard restricted UI:
```tsx
import { WriteGate, DeleteGate } from '@/components/PermissionGate';
<WriteGate modulo="tarefas"><Button>Save</Button></WriteGate>
```

### npm on Windows
```bash
npm.cmd install <pkg>  # NOT npm install (may silently fail in Git Bash)
```

## Model guidance

| Scope | Recommended model |
|-------|-------------------|
| Fix label, adjust spacing, rename prop | `haiku` |
| New component, add hook, connect API, feature work | `sonnet` (default) |
| New module with routing + state + multiple components | `opus` |

## Procedure

1. **Understand**: Read the relevant page/component files before proposing changes.
2. **Plan**: Identify what files to create or modify. Never create files unless necessary.
3. **Implement**: Follow existing patterns in the codebase. Prefer editing existing files.
4. **Check types**: Run `cd packages/frontend && npx tsc --noEmit` to verify.
5. **DoD**: Component works on both desktop and mobile. No TypeScript errors. Uses existing design system tokens.
