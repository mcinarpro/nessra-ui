---
name: feature
description: Complete GitHub Flow workflow for implementing a new feature. Triggers on "new feature", "implement feature", "start feature", "add feature". Includes branch creation, implementation, testing, and PR.
allowed-tools: Bash, Read, Write, Edit, Grep, Glob
---

# Feature Development Workflow

Complete workflow for implementing a new feature following GitHub Flow.

## Workflow Steps

### 1. Planning
- Understand the feature requirements from `$ARGUMENTS`
- Identify which files need to be created/modified
- Check for similar patterns in the codebase

### 2. Branch Creation
```bash
git fetch origin
git checkout -b feat/<feature-name> origin/main
```

### 3. Implementation
- Write the code following project conventions
- Use the **component-creator** agent if creating new components
- Use the **reviewer** agent to check code quality as you go

### 4. Testing
- Write tests for new functionality
- Run `pnpm test` to verify
- Use the **tester** agent if tests fail

### 5. Documentation
- Update documentation if needed
- Use the **doc-writer** agent for MDX files

### 6. Pre-commit Checks
```bash
pnpm check
```

### 7. Changelog & Commit
- Add entry to CHANGELOG.md `[Unreleased]` section
- Create conventional commit: `feat(<scope>): <description>`

### 8. Pull Request
- Push branch: `git push -u origin HEAD`
- Create PR with summary of changes

## Output

At the end, provide:
- Summary of files created/modified
- Tests status
- PR URL (if created)
- Any remaining TODOs
