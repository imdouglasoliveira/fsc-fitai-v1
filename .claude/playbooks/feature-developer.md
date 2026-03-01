# Feature Developer Playbook

**Purpose:** Implement a feature end-to-end (backend, frontend, or both) following the project architecture and patterns.

**Success Criteria:**
- ✅ All acceptance criteria met
- ✅ Tests pass (85%+ coverage)
- ✅ Code follows project patterns
- ✅ No console errors/warnings
- ✅ Ready for code review

---

## Step 1: Preparation

### 1.1 Understand the Task
```
[ ] Story ID and link
[ ] Title and description read
[ ] Acceptance Criteria (AC) clear
[ ] Definition of Done (DoD) understood
[ ] Scope confirmed (in/out)
```

### 1.2 Environment Setup
```bash
# Ensure dev environment is clean
pnpm install
pnpm run lint
pnpm run type-check

# Create feature branch
git checkout -b feature/story-{ID}-{short-description}
```

### 1.3 Read Architecture Patterns
```
[ ] CLAUDE.md — Architecture & patterns
[ ] Backend patterns (controllers, services, repos)
[ ] Frontend patterns (components, hooks, services)
[ ] Database changes (if needed)
[ ] API changes (if needed)
```

### 1.4 Review Dependencies
```
[ ] Blocking stories completed?
[ ] Database schema ready?
[ ] API contracts defined?
[ ] Design finalized?
```

---

## Step 2: Design & Planning

### 2.1 Backend Design (if needed)

```typescript
// Example: User service structure

// 1. Repository (Data access)
class UserRepository {
  async create(data: CreateUserInput): Promise<User>
  async findById(id: UUID): Promise<User | null>
  async update(id: UUID, data: UpdateUserInput): Promise<User>
}

// 2. Service (Business logic)
class UserService {
  async createUser(data: CreateUserInput): Promise<UserDTO>
  async getUser(id: UUID): Promise<UserDTO>
  async updateUser(id: UUID, data: UpdateUserInput): Promise<UserDTO>
}

// 3. Controller (HTTP layer)
class UserController {
  async create(req: FastifyRequest, reply: FastifyReply)
  async get(req: FastifyRequest, reply: FastifyReply)
  async update(req: FastifyRequest, reply: FastifyReply)
}

// 4. Routes (Endpoints)
export async function userRoutes(fastify) {
  fastify.post('/users', controller.create)
  fastify.get('/users/:id', controller.get)
  fastify.put('/users/:id', controller.update)
}
```

### 2.2 Frontend Design (if needed)

```typescript
// Example: User profile component structure

// 1. Service (API calls)
export const userService = {
  getProfile: () => api.get('/api/profile'),
  updateProfile: (data) => api.put('/api/profile', data)
}

// 2. Hook (State & logic)
export const useUserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    // Fetch and set state
  }

  return { user, loading, error }
}

// 3. Component (UI)
export const UserProfile = () => {
  const { user, loading, error } = useUserProfile()

  if (loading) return <Spinner />
  if (error) return <ErrorBoundary error={error} />

  return <div>{/* Render user */}</div>
}
```

### 2.3 Planning Checklist

```
[ ] Database schema changes (if needed)
[ ] API endpoints (backend)
[ ] Component structure (frontend)
[ ] State management approach
[ ] Error handling strategy
[ ] Testing approach
```

---

## Step 3: Implementation

### 3.1 Backend Implementation

```bash
# 1. Database migration
npx prisma migrate dev --name add_user_profile
# Review schema in prisma/schema.prisma

# 2. Implement Repository
src/repositories/UserRepository.ts

# 3. Implement Service
src/services/UserService.ts

# 4. Implement Controller
src/controllers/UserController.ts

# 5. Add Routes
src/routes/users.ts

# 6. Test each layer
npm test -- UserRepository.test.ts
npm test -- UserService.test.ts
npm test -- UserController.test.ts
```

### 3.2 Frontend Implementation

```bash
# 1. Create service
src/services/userService.ts

# 2. Create hook (if complex logic)
src/hooks/useUserProfile.ts

# 3. Create components
src/components/UserProfile.tsx
src/components/UserForm.tsx

# 4. Test components
npm test -- UserProfile.test.tsx
npm test -- UserForm.test.tsx
```

### 3.3 Code Quality Checks

```bash
# During development
pnpm run lint --fix     # Auto-fix style issues
pnpm run type-check     # TypeScript validation
pnpm run test           # Run tests

# Before committing
pnpm run lint           # Final lint check
pnpm run build          # Verify build passes
```

---

## Step 4: Testing

### 4.1 Unit Tests (85% minimum coverage)

**Backend:**
```typescript
// UserService.test.ts
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      const input = { email: 'test@example.com', ... }
      const result = await userService.createUser(input)
      expect(result.email).toBe(input.email)
    })

    it('should fail with invalid email', async () => {
      const input = { email: 'invalid', ... }
      await expect(userService.createUser(input)).rejects.toThrow()
    })
  })
})
```

**Frontend:**
```typescript
// UserProfile.test.tsx
describe('UserProfile', () => {
  it('should render user data', () => {
    const { getByText } = render(<UserProfile />)
    expect(getByText(/User Name/)).toBeInTheDocument()
  })

  it('should handle loading state', () => {
    const { getByRole } = render(<UserProfile />, { loading: true })
    expect(getByRole('progressbar')).toBeInTheDocument()
  })
})
```

### 4.2 Integration Tests (if applicable)

```bash
npm test -- --testPathPattern=integration

# Test: API endpoint → Service → Repository → Database
# Verify data flows correctly end-to-end
```

### 4.3 Manual Testing

Checklist for manual verification:
```
[ ] Happy path works (user sees expected result)
[ ] Error handling works (error messages show)
[ ] Loading states appear/disappear
[ ] Data persists (database/API call verified)
[ ] UI responsive (desktop/tablet/mobile)
[ ] No console errors/warnings
[ ] Accessibility basic check (tab navigation, labels)
```

---

## Step 5: Code Review Preparation

### 5.1 Self-Review

Before creating PR, review your own code:

```
[ ] Follows project naming conventions
[ ] No commented-out code
[ ] No console.log/debugger left behind
[ ] Error messages are clear
[ ] TypeScript types complete (no `any`)
[ ] Tests have meaningful names
[ ] Documentation updated (README, API docs)
[ ] Commit messages follow Conventional Commits
```

### 5.2 PR Description

```markdown
## What
Brief description of what was implemented

## Why
Explain business value or problem solved

## How
High-level description of approach

## Testing
- [ ] All tests pass
- [ ] Coverage >= 85%
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project patterns
- [ ] Documentation updated
- [ ] No breaking changes
```

### 5.3 Commit Message

```
feat: implement user profile with editing

- Add UserService with create/update/delete
- Create ProfilePage component
- Implement profile validation
- Add 85% test coverage

Closes #123
```

---

## Step 6: Common Pitfalls

### ❌ Do NOT:
1. **Skip tests** — Tests are required, not optional
2. **Leave console.log** — Remove before PR
3. **Use `any` type** — TypeScript strict mode is enabled
4. **Make unrelated changes** — One feature per PR
5. **Forget error handling** — Handle both happy and error paths
6. **Update unrelated files** — Keep PR focused
7. **Copy-paste code** — Refactor duplicates into shared logic

### ✅ DO:
1. **Read existing patterns** — Copy from similar features
2. **Ask questions** — If unclear, clarify before coding
3. **Test edge cases** — Not just happy path
4. **Write clear messages** — Commit messages and code comments
5. **Keep PRs focused** — One feature, logically grouped commits

---

## Step 7: Output Format

After implementation, provide summary:

```json
{
  "story_id": "STORY-42",
  "status": "ready_for_review",

  "implementation": {
    "backend": {
      "files_created": ["UserService.ts", "UserController.ts"],
      "database_changes": true,
      "api_endpoints": 3
    },
    "frontend": {
      "files_created": ["UserProfile.tsx", "useUserProfile.ts"],
      "components": 2,
      "hooks": 1
    }
  },

  "testing": {
    "unit_tests": 42,
    "integration_tests": 3,
    "coverage": "87%"
  },

  "quality": {
    "lint_warnings": 0,
    "type_errors": 0,
    "console_errors": 0
  },

  "pr_link": "https://github.com/.../pull/123",

  "notes": "Ready for code review. All AC met.",
  "blockers": []
}
```

---

## Useful Commands

```bash
# Development
pnpm run dev                  # Start frontend + backend
pnpm run lint --fix          # Auto-fix linting
pnpm run type-check          # TypeScript check
pnpm run test                # Run all tests
pnpm run test:watch          # Tests in watch mode

# Git
git status                    # See changes
git diff                      # View changes
git add src/...               # Stage files
git commit -m "feat: ..."    # Commit
git push origin feature/...   # Push

# Database (if needed)
npx prisma studio            # Open Prisma UI
npx prisma migrate dev        # Create + apply migration
```

---

## Resources

- **CLAUDE.md** — Project architecture & patterns
- **README.md** — Project overview
- **.claude/templates/** — Task templates by complexity

---

*Version:* 1.0
*Created:* 2026-02-28
*Last Updated:* 2026-02-28
*Status:* 🟢 Ready for use
