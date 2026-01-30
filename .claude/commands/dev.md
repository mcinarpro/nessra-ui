---
description: Start development server and show useful info
allowed-tools: Bash(pnpm dev:*), Bash(git branch:*), Bash(git status:*), Bash(node:*), Bash(pnpm:*)
---

## Context

- Current branch: !`git branch --show-current`
- Node version: !`node -v`
- pnpm version: !`pnpm -v`

## Task

Start the development environment.

### Steps

1. Show current branch and any uncommitted changes
2. Start the dev server: `pnpm dev`
3. Inform that the server is running at http://localhost:3000

### Tips

- Press `Ctrl+C` to stop the server
- Use `/check` before committing
- Use `/status` to see git state
