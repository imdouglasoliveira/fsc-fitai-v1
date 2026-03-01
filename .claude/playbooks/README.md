# Agent Playbooks — Structured Task Templates

These playbooks provide reusable instruction templates for different agent roles.

## Overview

A **playbook** is a structured prompt template that guides an agent through a specific type of task.

Instead of:
```
"Review this code"
```

We use:
```
[Code Review Playbook]
├─ Code Quality Checklist
├─ Security Considerations
├─ Performance Implications
├─ Documentation Review
└─ Recommendation Summary
```

---

## Available Playbooks

### Core Development
- **[Feature Developer]** — Implement features end-to-end
- **[Backend Developer]** — API design, database work
- **[Frontend Developer]** — React components, UI/UX
- **[Test Writer]** — Unit and integration tests

### Quality & Review
- **[Code Reviewer]** — Code quality, style, best practices
- **[Bug Fixer]** — Diagnose and fix defects
- **[QA Tester]** — Test validation, gates, reports

### Support & Optimization
- **[Documentation Writer]** — Create clear docs
- **[Performance Optimizer]** — Identify bottlenecks
- **[Refactoring Specialist]** — Improve code structure
- **[Security Reviewer]** — OWASP, encryption, auth

---

## How to Use a Playbook

### 1. **Identify Agent Role**
   What's the task?
   - Building? → Feature Developer
   - Reviewing? → Code Reviewer
   - Testing? → QA Tester
   - Fixing? → Bug Fixer

### 2. **Load Playbook**
   ```bash
   # Copy playbook content as context
   cat .claude/playbooks/code-reviewer.md
   ```

### 3. **Customize with Context**
   ```markdown
   [Code Reviewer Playbook]

   Project: Bootcamp SGT
   PR: #42
   File: src/services/UserService.ts

   [Rest of template...]
   ```

### 4. **Execute Task**
   Share the customized playbook with AI agent
   Agent follows the structured steps
   Agent produces output aligned with template

### 5. **Capture Learning**
   ```json
   {
     "playbook": "code-reviewer",
     "outcome": "2 issues found, 1 blocker",
     "time_saved": "15 minutes vs. unstructured review",
     "feedback": "Template helped catch SQL injection issue"
   }
   ```

---

## Playbook Structure

Each playbook follows this format:

```markdown
# [Role] Playbook

**Purpose:** [One sentence - what this agent does]

**Success Criteria:** [How you know it worked]

## Process

### Step 1: [Preparation]
[What to do first]

### Step 2: [Analysis]
[Deep dive]

### Step 3: [Decision]
[Recommendations]

### Step 4: [Documentation]
[Output format]

## Checklist

- [ ] Required item 1
- [ ] Required item 2
- [ ] Optional item 3

## Output Format

```json
{
  "agent": "role",
  "task": "description",
  "findings": [...],
  "recommendations": [...],
  "confidence": 0.85,
  "blockers": [...]
}
```

## Resources

- **Link 1:** [Reference]
- **Link 2:** [Reference]
```

---

## Project-Specific Customization

### Before Using in Bootcamp SGT

Customize each playbook with:

1. **Tech Stack Context**
   ```
   Backend: Fastify + TypeScript
   Frontend: Next.js 14 + React
   Database: PostgreSQL + Prisma
   ```

2. **Code Quality Standards**
   ```
   - ESLint rules: .eslintrc.js
   - Prettier config: .prettierrc
   - Test coverage: 85% minimum
   ```

3. **Workflow Integrations**
   ```
   - Commits: Conventional Commits
   - Branches: feature/* fix/* hotfix/*
   - PRs: Code review required
   ```

---

## Updating Playbooks

### When to Update
- New best practice discovered
- Tool version changed
- Team decision made
- Lessons learned logged

### How to Update
1. Edit playbook file
2. Note change in footer:
   ```
   ---
   Updated: 2026-02-28
   Change: Added security-specific checklist
   By: @architect
   ```
3. Commit to git
4. Share update with team

---

## Learning & Iteration

### What Works Well ✅
- Consistent output format
- Step-by-step guidance
- Checklist prevents mistakes
- Faster onboarding

### Improvement Ideas 🔄
- Record time savings
- Track quality metrics
- Capture unusual findings
- Share insights with team

---

## File Organization

```
.claude/playbooks/
├── README.md                    # This file
├── feature-developer.md          # For implementing features
├── backend-developer.md          # For API/DB work
├── frontend-developer.md         # For React work
├── code-reviewer.md              # For code reviews
├── bug-fixer.md                  # For fixing bugs
├── qa-tester.md                  # For testing
├── test-writer.md                # For test creation
├── documentation-writer.md       # For docs
├── performance-optimizer.md      # For optimization
├── refactoring-specialist.md     # For refactoring
└── security-reviewer.md          # For security review
```

---

*Version:* 1.0
*Created:* 2026-02-28
*Status:* 🟢 Ready for use
*Inspired by:* ai-coders-context AGENTS.md structure
