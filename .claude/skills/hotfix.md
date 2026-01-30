---
name: hotfix
description: Urgent bug fix workflow for critical production issues. Triggers on "hotfix", "urgent fix", "critical bug", "production issue". Minimal changes only.
allowed-tools: Bash, Read, Write, Edit, Grep, Glob
---

# Hotfix Workflow

Fast-track workflow for urgent bug fixes.

## Principles

- **Minimal changes**: Fix only the bug, nothing else
- **Fast**: Skip non-essential steps
- **Safe**: Still run critical checks

## Workflow Steps

### 1. Create Hotfix Branch
```bash
git fetch origin
git checkout -b hotfix/<bug-name> origin/main
```

### 2. Investigate
- Use the **debugger** agent to find root cause
- Identify the minimal fix needed

### 3. Fix
- Apply the smallest possible change
- No refactoring, no "while I'm here" improvements

### 4. Verify
```bash
pnpm test
pnpm types:check
```

### 5. Commit & PR
- Update CHANGELOG.md: `### Fixed`
- Commit: `fix(<scope>): <description>`
- Create PR with:
  - Bug description
  - Root cause
  - Fix explanation

## Checklist

- [ ] Fix is minimal and focused
- [ ] Tests pass
- [ ] No unrelated changes
- [ ] CHANGELOG updated
- [ ] PR created with context
