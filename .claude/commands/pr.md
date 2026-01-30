---
description: Create a Pull Request with auto-generated title and description
argument-hint: [title] (optional - will be generated from commits)
allowed-tools: Bash(git branch:*), Bash(git log:*), Bash(git diff:*), Bash(git push:*), Bash(git status:*), Bash(git remote:*), Bash(gh pr:*), Read
---

## Context

- Current branch: !`git branch --show-current`
- Commits since main: !`git log origin/main..HEAD --oneline`
- Changed files: !`git diff origin/main --stat`
- Remote tracking: !`git remote -v`

## Task

Create a Pull Request following GitHub Flow conventions.

### Pre-flight checks

1. **Verify branch**: Ensure we're not on `main`
2. **Check for unpushed commits**: `git status -sb`
3. **Run checks**: Suggest running `pnpm check` if not already done

### Steps

1. **Push branch**: If not pushed, run `git push -u origin HEAD`
2. **Generate PR content**:
   - Title: From argument or first commit message
   - Body: Summary of changes from commits and CHANGELOG.md

### PR Template

```markdown
## Summary

[Brief description of changes]

## Changes

[List of main changes from commits]

## Changelog

[Copy relevant entries from CHANGELOG.md [Unreleased] section]

## Checklist

- [ ] `pnpm check` passes
- [ ] Documentation updated (if applicable)
- [ ] CHANGELOG.md updated
```

### Create PR

```bash
gh pr create --title "<title>" --body "<body>"
```

After creation, display the PR URL.
