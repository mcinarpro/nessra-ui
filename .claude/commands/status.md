---
description: Show comprehensive git status and project state
allowed-tools: Bash(git branch:*), Bash(git status:*), Bash(git log:*), Bash(git rev-list:*), Bash(git stash:*)
---

## Git Status

### Branch info
!`git branch -vv`

### Working tree
!`git status --short`

### Recent commits (this branch)
!`git log --oneline -5`

### Commits ahead/behind main
!`git rev-list --left-right --count origin/main...HEAD 2>/dev/null || echo "Not tracking"`

### Stash list
!`git stash list`

## Task

Display a summary of the current project state:

1. **Branch**: Current branch and tracking status
2. **Changes**: Staged, unstaged, and untracked files
3. **Sync status**: How far ahead/behind main
4. **Stashes**: Any stashed changes

### Suggestions

Based on the status, suggest next actions:
- If uncommitted changes: suggest `/commit`
- If behind main: suggest `git pull --rebase origin main`
- If ahead and pushed: suggest `/pr`
- If stashes exist: remind about them
