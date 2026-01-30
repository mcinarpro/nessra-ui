---
description: Merge a PR and cleanup local branch
argument-hint: [pr-number] (optional - uses current branch's PR)
allowed-tools: Bash(git checkout:*), Bash(git pull:*), Bash(git branch:*), Bash(git fetch:*), Bash(gh pr:*)
---

## Context

- Current branch: !`git branch --show-current`
- Open PRs: !`gh pr list --state open --limit 5`

## Task

Merge a Pull Request and clean up the local branch.

### Steps

1. **Identify PR**:
   - If PR number provided: use that
   - If on feature branch: find associated PR

2. **Pre-merge checks**:
   - Verify PR is approved
   - Verify CI checks pass: `gh pr checks`

3. **Merge PR**:
   ```bash
   gh pr merge <number> --squash --delete-branch
   ```

   Options:
   - `--squash`: Squash commits into one (default for features)
   - `--merge`: Create merge commit (for releases)
   - `--rebase`: Rebase and merge

4. **Local cleanup**:
   ```bash
   git checkout main
   git pull origin main
   git branch -d <branch-name>
   ```

5. **Prune remote branches**:
   ```bash
   git fetch --prune
   ```

### Output

Confirm:
- PR merged successfully
- Local branch deleted
- Now on main with latest changes
