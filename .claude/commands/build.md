---
description: Build the project (registry + Next.js)
allowed-tools: Bash(pnpm registry:generate:*), Bash(pnpm registry:build:*), Bash(pnpm build:*), Bash(pnpm types:check:*), Bash(ls:*)
---

## Context

- Current branch: !`git branch --show-current`
- Last build: !`ls -la .next 2>/dev/null | head -3 || echo "No .next folder"`

## Task

Build the project for production.

### Steps

1. **Generate registry**: `pnpm registry:generate`
2. **Build registry JSON**: `pnpm registry:build`
3. **Build Next.js**: `pnpm build`

Or run all at once:
```bash
pnpm build
```

(The `prebuild` script handles registry generation)

### On failure

- If registry fails: Check registry.json and component files
- If Next.js fails: Check for TypeScript errors with `pnpm types:check`
- If OOM: Increase Node memory with `NODE_OPTIONS="--max-old-space-size=4096"`

### On success

Confirm build completed and show output size if available.
