# COMPLEX Task Template (Complexity 16+)

> For: Major features, system redesigns, large integrations
> Duration: 5-10+ hours
> Composition: full-feature-fullstack + /compose with gates
> May require: Ralph Loop for specification, @architect review

---

## Story Frontmatter

```yaml
---
story_id: STORY-{ID}
title: "[COMPLEX] {Scope-inclusive title}"
story_type: epic_story | major_refactor | platform_work
complexity: 18  # 16+ range
clarity: 70     # May need Ralph loop if <60%
time_estimate_minutes: 480
epic: EPIC-{ID}
assigned_to: "@architect + @dev"
workflow: ralph | sdd
dependencies:
  - STORY-X (BLOCKING)
  - STORY-Y (BLOCKING)
  - STORY-Z (nice to have)
architecture_review: required
security_review: "if auth/encryption involved"
performance_review: "if data volume > 100k records"
---
```

## What's Included

### 1. Executive Summary (1 paragraph)
High-level context: What problem are we solving? Why now? What's the business impact?

### 2. Detailed Problem Statement (3-5 sections)
- **Current State:** How things work today
- **Problem:** What's broken or missing
- **Impact:** How does this affect users/business
- **Success Metrics:** How we measure success
- **Constraints:** Budget, time, technical limits

### 3. Acceptance Criteria (10-15 scenarios)

Organize by feature area, not just happy path:

```gherkin
Feature: User Authentication System

  Scenario 1: Sign up via email
  Given user is on signup page
  When user enters email and password
  Then account created, verification email sent

  Scenario 2: Email verification
  Given user received verification email
  When user clicks verification link
  Then email marked verified, can login

  Scenario 3: Login with valid credentials
  ...

Feature: Password Management

  Scenario 4: Reset forgotten password
  ...
```

### 4. Architecture & System Design

**System Architecture Diagram:**
```
┌─────────────────────────────────┐
│  Next.js Frontend (React)        │
│  - Auth pages                     │
│  - Protected routes              │
└──────────────┬────────────────────┘
               │ HTTPS
┌──────────────▼────────────────────┐
│  Fastify Backend (API Layer)       │
│  - /api/auth/* endpoints          │
│  - JWT validation middleware      │
└──────────────┬────────────────────┘
               │ SQL
┌──────────────▼────────────────────┐
│  PostgreSQL + Prisma              │
│  - users table                    │
│  - sessions table                 │
│  - audit_logs table              │
└─────────────────────────────────┘
```

**Data Models:**
```typescript
// User
{
  id: UUID
  email: string (unique)
  password_hash: string
  email_verified: boolean
  email_verified_at?: timestamp
  created_at: timestamp
  updated_at: timestamp
}

// Session
{
  id: UUID
  user_id: UUID (FK)
  token: string (hashed, unique)
  expires_at: timestamp
  created_at: timestamp
}

// AuditLog
{
  id: UUID
  user_id: UUID
  action: string
  timestamp: timestamp
  ip_address?: string
}
```

**API Contract:**
```
POST /api/auth/signup
  Body: { email, password, confirm_password }
  Response: { user, message }
  Status: 201 (success), 400 (validation error), 409 (email exists)

POST /api/auth/login
  Body: { email, password }
  Response: { user, token, expires_in }
  Status: 200 (success), 401 (invalid credentials)

POST /api/auth/logout
  Headers: { Authorization: Bearer {token} }
  Response: { message }
  Status: 200

POST /api/auth/refresh-token
  Body: { refresh_token }
  Response: { access_token, expires_in }
  Status: 200
```

### 5. Technology & Dependencies

**Backend:**
- Framework: Fastify
- ORM: Prisma
- Auth: JWT (jsonwebtoken)
- Validation: Zod
- Email: Nodemailer (for verification)
- Security: bcryptjs (password hashing)

**Frontend:**
- Framework: Next.js 14+
- State: React Context / Zustand
- Form: React Hook Form
- Validation: Zod
- Storage: secure localStorage / httpOnly cookies

**Infrastructure:**
- Database: PostgreSQL 15+
- Email Provider: SendGrid / Mailgun
- Environment: .env with secrets management

### 6. Scope Definition

**In Scope (Epic features):**
- [ ] User signup with email/password
- [ ] Email verification workflow
- [ ] Login with credentials
- [ ] JWT token management
- [ ] Password reset via email
- [ ] Session management
- [ ] Logout
- [ ] Audit logging

**Out of Scope (Future stories):**
- OAuth / Social login (STORY-X)
- 2FA / MFA (STORY-Y)
- Passwordless auth (STORY-Z)
- Admin panel (STORY-W)

**Dependencies (Must have before start):**
- [ ] Database schema designed ✓
- [ ] API contract finalized ✓
- [ ] Email service configured ✓
- [ ] Security review completed ✓

### 7. Implementation Phases

**Phase 1: Backend Core (24 hours)**
- [ ] Database setup & migrations
- [ ] Prisma models
- [ ] Password hashing service
- [ ] JWT token service
- [ ] Auth routes (signup, login, logout)
- [ ] Error handling middleware
- [ ] Unit & integration tests (90%+ coverage)

**Phase 2: Frontend Core (24 hours)**
- [ ] Auth context/store
- [ ] Login page component
- [ ] Signup page component
- [ ] Protected route wrapper
- [ ] API hooks (useLogin, useSignup, etc.)
- [ ] Error handling & UX
- [ ] Component tests (85%+ coverage)

**Phase 3: Advanced Features (12 hours)**
- [ ] Email verification workflow
- [ ] Password reset flow
- [ ] Session management
- [ ] Audit logging
- [ ] Rate limiting
- [ ] CORS configuration

**Phase 4: Security & Polish (12 hours)**
- [ ] Security review
- [ ] Penetration testing
- [ ] Performance optimization
- [ ] Documentation
- [ ] Deployment prep

**Total Duration:** ~72 hours (3-5 days with breaks)

### 8. Risk Analysis

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Email provider downtime | Low | High | Use fallback provider |
| Performance on 1M users | Low | High | Database indexing, caching |
| Security vulnerability found | Medium | Critical | Security review before launch |
| Scope creep | High | Medium | Clear boundaries, separate stories |

### 9. Testing Strategy

**Unit Tests (Backend):**
```bash
npm test -- src/services/AuthService.test.ts
npm test -- src/routes/auth.test.ts
```
Target: 90%+ coverage

**Integration Tests (API):**
```bash
npm test -- api/auth.integration.test.ts
```
Test: signup → verification → login → logout flow

**E2E Tests (Frontend):**
```bash
npm run test:e2e -- auth.e2e.ts
```
Test: full user journeys in browser

**Security Tests:**
- [ ] SQL injection attempts
- [ ] XSS payload handling
- [ ] JWT validation
- [ ] Rate limiting
- [ ] CORS enforcement

### 10. Definition of Done

**Code:**
- [ ] All AC scenarios pass
- [ ] Backend tests 90%+ coverage
- [ ] Frontend tests 85%+ coverage
- [ ] E2E tests passing
- [ ] No console warnings/errors
- [ ] Code reviewed & approved

**Database:**
- [ ] Migrations applied
- [ ] Indexes created
- [ ] Schema validated

**Security:**
- [ ] Security review completed
- [ ] Sensitive data encrypted
- [ ] Audit logging functional

**Documentation:**
- [ ] API docs updated
- [ ] Architecture diagram included
- [ ] Setup guide created
- [ ] Deployment guide written

**DevOps:**
- [ ] CI/CD pipeline green
- [ ] Environment variables configured
- [ ] Ready for staging deployment

---

## Example: Authentication System

```yaml
---
story_id: STORY-500
title: "[COMPLEX] Implement user authentication system"
story_type: epic_story
complexity: 20
clarity: 85
time_estimate_minutes: 480
epic: EPIC-CORE-AUTH
dependencies:
  - Database infrastructure ready
  - Email service configured
architecture_review: required
security_review: required
---

[Full template applied above with:
- Email/password signup
- JWT auth
- Session management
- Password reset
- Email verification]
```

---

## Composition: full-feature-fullstack

```
Ralph Loop (if needed)
  ↓ (generates clear spec)
BE → FE → TDD (90% coverage) → ReactDoctor → QA → Security Review → Commit
Total: ~480 minutes + review
```

## Quality Gates

```
After Phase 1 (Backend):
  - [ ] API contract complete
  - [ ] 90%+ test coverage
  - [ ] Security review passed

After Phase 2 (Frontend):
  - [ ] UI components functional
  - [ ] 85%+ test coverage
  - [ ] API integration working

After Phase 3 (Advanced):
  - [ ] Email verification working
  - [ ] Audit logging functional

After Phase 4 (Security):
  - [ ] Security review PASS
  - [ ] Performance acceptable
  - [ ] Ready for production
```

---

## Key Success Factors

1. **Clear Architecture:** System design documented
2. **Phased Delivery:** Break into manageable phases
3. **Test Coverage:** High standards (90% backend)
4. **Security First:** Review early, not late
5. **Documentation:** Complete before production
6. **Team Alignment:** @architect review required
