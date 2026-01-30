---
description: Create a conventional commit with automatic changelog update
argument-hint: [message] (optional - will be generated if not provided)
allowed-tools: Bash(git add:*), Bash(git commit:*), Bash(git status:*), Bash(git diff:*), Bash(git log:*), Read, Edit
---

## Context

- Current branch: !`git branch --show-current`
- Staged changes: !`git diff --cached --stat`
- Unstaged changes: !`git diff --stat`
- Recent commits: !`git log --oneline -5`

## Conventional Commit Types

- `feat`: New feature (MINOR version)
- `fix`: Bug fix (PATCH version)
- `docs`: Documentation only
- `style`: Formatting, no code change
- `refactor`: Code restructuring
- `perf`: Performance improvement
- `test`: Adding/updating tests
- `chore`: Maintenance, dependencies

## Task

Create a git commit following conventional commits format.

### Steps

1. **Check for changes**: If no staged changes, show unstaged changes and ask what to stage
2. **Determine commit type**: Based on the changes, suggest the appropriate type
3. **Update CHANGELOG.md**: Add entry to `[Unreleased]` section following the existing format:
   - Added: New features
   - Changed: Changes to existing features
   - Fixed: Bug fixes
   - Removed: Removed features
4. **Stage CHANGELOG.md**: `git add CHANGELOG.md`
5. **Create commit**: Use message provided or generate one based on changes

### Commit message format

```
<type>(<scope>): <description>

[optional body]
```

Examples:
- `feat(button): add loading state variant`
- `fix(input): correct padding in number input`
- `docs: update installation guide`
- `chore(deps): update radix-ui packages`

### Important

- Keep commit messages concise (50 chars for subject)
- Always update CHANGELOG.md before committing
- Use imperative mood ("add" not "added")
