---
description: Create a new git branch following GitHub Flow naming conventions
argument-hint: <type>/<name> (e.g., feat/button-loading, fix/input-validation)
allowed-tools: Bash(git branch:*), Bash(git checkout:*), Bash(git fetch:*), Bash(git status:*), Bash(git stash:*)
---

## Context

- Current branch: !`git branch --show-current`
- Git status: !`git status --short`

## Task

Create a new git branch with the name: `$ARGUMENTS`

### Branch naming conventions

- `feat/<name>` - New feature
- `fix/<name>` - Bug fix
- `hotfix/<name>` - Urgent production fix
- `refactor/<name>` - Code refactoring
- `docs/<name>` - Documentation only
- `test/<name>` - Adding tests
- `chore/<name>` - Maintenance tasks

### Steps

1. If there are uncommitted changes, warn me and ask if I want to stash them
2. Fetch latest from origin: `git fetch origin`
3. Create branch from main: `git checkout -b $ARGUMENTS origin/main`
4. Confirm the branch was created successfully

If no argument is provided, ask me what type of branch I want to create and suggest a name based on recent conversation context.
