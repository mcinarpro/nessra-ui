---
description: Run all pre-commit checks (lint, format, types, tests)
allowed-tools: Bash(pnpm check:*), Bash(pnpm lint:*), Bash(pnpm format:check:*), Bash(pnpm types:check:*), Bash(pnpm test:*), Bash(pnpm registry:validate:*), Bash(git diff:*), Bash(git branch:*)
---

## Context

- Current branch: !`git branch --show-current`
- Modified files: !`git diff --name-only HEAD`
- Staged files: !`git diff --cached --name-only`

## Task

Run all quality checks before committing or creating a PR.

### Checks to run

```bash
pnpm check
```

This runs:
1. `pnpm lint` - ESLint
2. `pnpm format:check` - Prettier
3. `pnpm types:check` - TypeScript
4. `pnpm registry:validate` - Registry type check
5. `pnpm test` - Vitest tests

### On failure

If any check fails:
1. Show the specific error
2. Suggest fix command if available:
   - Lint: `pnpm lint:fix`
   - Format: `pnpm format`
3. Ask if I should attempt auto-fix

### On success

Confirm all checks passed and the code is ready for commit/PR.
