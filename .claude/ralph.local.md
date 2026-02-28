# Ralph Configuration

```yaml
ralph:
  enabled: true
  maxIterations: 5
  iterationTimeoutMinutes: 15
  totalTimeoutMinutes: 90
  minClarityToSkip: 80
  minComplexity: 8
  maxComplexity: 25
  worktreeCleanupOnConverge: true
  worktreeDirectory: ".claude/worktrees/"
  decisionLogging: true
  learningCapture: true
```

---

## Settings Explanation

| Setting | Value | Purpose |
|---------|-------|---------|
| `enabled` | true | Ralph loops are active |
| `maxIterations` | 5 | Stop after 5 tries |
| `iterationTimeoutMinutes` | 15 | Each iteration < 15 min |
| `totalTimeoutMinutes` | 90 | Total Ralph < 90 min |
| `minClarityToSkip` | 80 | Use SDD if >80% clear |
| `minComplexity` | 8 | Use Ralph if complexity >8 |
| `maxComplexity` | 25 | Escalate if >25 |
| `worktreeCleanupOnConverge` | true | Delete worktree after success |
| `decisionLogging` | true | Log every Ralph run |
| `learningCapture` | true | Save patterns for future |

---

## Override per Story

In story YAML frontmatter:
```yaml
---
story_id: STORY-SPECIAL
workflow_preference: ralph
max_ralph_iterations: 7
min_clarity_threshold: 70
---
```

---

*Version 1.0 - 2026-02-28*
