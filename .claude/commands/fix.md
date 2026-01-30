---
description: Auto-fix linting and formatting issues
allowed-tools: Bash(pnpm lint:*), Bash(pnpm format:*), Bash(git diff:*)
---

## Context

- Lint issues: !`pnpm lint 2>&1 | tail -20 || echo "No lint output"`
- Format issues: !`pnpm format:check 2>&1 | tail -10 || echo "No format output"`

## Task

Automatically fix linting and formatting issues.

### Steps

1. **Fix ESLint issues**:
   ```bash
   pnpm lint:fix
   ```

2. **Fix Prettier formatting**:
   ```bash
   pnpm format
   ```

3. **Verify fixes**:
   ```bash
   pnpm lint && pnpm format:check
   ```

### After fixing

Show which files were modified:
```bash
git diff --name-only
```

Suggest staging the fixes if there are changes.
