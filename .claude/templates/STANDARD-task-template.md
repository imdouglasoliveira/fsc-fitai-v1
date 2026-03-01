# STANDARD Task Template (Complexity 9-15)

> For: Complete features, significant refactors, new integrations
> Duration: 3-5 hours
> Composition: full-feature-{backend|frontend|fullstack}

---

## Story Frontmatter

```yaml
---
story_id: STORY-{ID}
title: "[STANDARD] {Clear title with scope}"
story_type: feature | refactor | integration
complexity: 12  # 9-15 range
clarity: 80     # 70-90 acceptable
time_estimate_minutes: 240
assigned_to: "@dev"
workflow: sdd   # May need brief Ralph loop (1-2 iters)
dependencies:
  - STORY-X (required before this)
related:
  - STORY-Y (good to have)
---
```

## What's Included

### 1. Overview (3-4 sentences)
What are you building? Why? What does success look like?

### 2. Acceptance Criteria (5-8 scenarios)

```gherkin
Scenario 1: [Happy path]
Given [precondition]
When [action]
Then [expected outcome]

Scenario 2: [Edge case]
...
```

### 3. Architecture & Design Decisions

**Data Model:**
```
User {
  id: UUID
  email: string
  profile: Profile
}
```

**API Endpoints:**
- GET /api/users/:id
- POST /api/users (create)
- PUT /api/users/:id (update)

**Component Structure:**
```
UserProfile/
├── UserHeader.tsx
├── UserStats.tsx
└── UserActions.tsx
```

### 4. Scope Definition

**In Scope:**
- Feature A, Feature B
- Database schema changes
- API endpoints
- UI components

**Out of Scope:**
- Notifications (next sprint)
- Analytics (separate story)
- Admin UI (depends on auth story)

**Dependencies:**
- [ ] Auth system (STORY-X) - BLOCKING
- [ ] Email service (STORY-Y) - nice to have

### 5. Implementation Steps (8-12 steps)

Backend Steps:
1. Update schema: add new User fields
2. Create migration: `npx prisma migrate dev --name add_user_fields`
3. Implement repository methods
4. Create service layer
5. Implement API routes
6. Add input validation
7. Write unit tests (85%+ coverage)
8. Integration tests with database

Frontend Steps:
9. Create components
10. Implement hooks for API calls
11. Add error handling & loading states
12. Write component tests

### 6. Testing Strategy

**Unit Tests:**
```bash
npm test -- UserService.test.ts
npm test -- UserComponent.test.tsx
```

**Integration Tests:**
```bash
npm test -- api/users.integration.test.ts
```

**Coverage Target:** 85% minimum

### 7. Definition of Done

- [ ] All AC met
- [ ] Code reviewed and approved
- [ ] Tests pass (85%+ coverage)
- [ ] No console warnings/errors
- [ ] Database migration tested
- [ ] API contract validated
- [ ] Documentation updated
- [ ] PR merged to dev

---

## Example: Standard Feature (User Profile)

```yaml
---
story_id: STORY-200
title: "[STANDARD] Implement user profile with editing"
story_type: feature
complexity: 12
clarity: 85
time_estimate_minutes: 240
dependencies:
  - STORY-150 (User auth system)
---

## Overview
Users can view their profile and edit personal information (name, bio, avatar).
Success = user can update profile and changes persist.

## Acceptance Criteria

Scenario 1: View own profile
Given user is logged in
When user navigates to /profile
Then user sees their name, bio, avatar

Scenario 2: Edit profile
Given user is viewing their profile
When user clicks "Edit" and changes name
Then changes are saved and reflected immediately

Scenario 3: Upload avatar
Given user is editing profile
When user selects image file
Then image is uploaded and displayed

Scenario 4: Validation error
Given user tries to save with empty name
Then error message appears and changes not saved

## Architecture

**Schema Update:**
```sql
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN avatar_url VARCHAR(255);
ALTER TABLE users ADD COLUMN updated_at TIMESTAMP;
```

**API Endpoints:**
- GET /api/profile → UserProfile
- PUT /api/profile → UserProfile (update)
- POST /api/profile/avatar → upload image

**Components:**
- ProfilePage
- ProfileHeader (read-only)
- ProfileEditor (edit mode)
- AvatarUpload

## Scope

In:
- Profile view
- Edit name, bio, avatar
- Input validation
- Error handling

Out:
- Profile privacy settings (STORY-201)
- Profile sharing (future)

## Implementation (12 steps)

Backend (6 steps):
1. Create Prisma migration
2. Update User schema
3. Create UserProfileService
4. Implement GET /api/profile
5. Implement PUT /api/profile
6. Add validation & error handling

Frontend (6 steps):
7. Create ProfilePage layout
8. Create ProfileHeader component
9. Create ProfileEditor form
10. Create AvatarUpload widget
11. Implement API hooks (useProfile, useUpdateProfile)
12. Add error handling & loading states

## Testing

Backend:
```bash
npm test -- UserProfileService.test.ts
npm test -- api/profile.integration.test.ts
```

Frontend:
```bash
npm test -- ProfileEditor.test.tsx
npm test -- AvatarUpload.test.tsx
```

Target: 85% coverage

## DoD

- [ ] All 4 AC scenarios pass
- [ ] Tests 85%+ coverage
- [ ] Database schema applied
- [ ] API endpoints tested
- [ ] Components render correctly
- [ ] Error messages clear
- [ ] Reviewed and approved
- [ ] Merged to dev
```

---

## Composition: full-feature-{area}

### Backend Feature
```
BE → TDD (85% coverage) → QA → Commit
Total: ~120 minutes
```

### Frontend Feature
```
FE → TDD (85% coverage) → ReactDoctor → QA → Commit
Total: ~150 minutes
```

### Fullstack Feature
```
BE → FE → TDD (85% coverage) → ReactDoctor → QA → Commit
Total: ~240 minutes
```

---

## Key Success Factors

1. **Clear AC:** Each scenario is testable
2. **Scoped:** No feature creep
3. **Dependencies:** Blocking items identified
4. **Testing:** 85%+ coverage is standard
5. **Documentation:** Updated before PR
