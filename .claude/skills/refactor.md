---
name: refactor
description: Safe refactoring workflow with testing before and after. Triggers on "refactor", "restructure", "clean up code". No behavior changes, only structure improvements.
allowed-tools: Bash, Read, Write, Edit, Grep, Glob
---

# Refactoring Workflow

Safe workflow for restructuring code without changing behavior.

## Golden Rules

1. **Tests first**: Ensure tests exist and pass before refactoring
2. **Small steps**: Make incremental changes
3. **Verify often**: Run tests after each change
4. **No features**: Refactoring ≠ adding functionality

## Workflow Steps

### 1. Preparation
- Identify what to refactor from `$ARGUMENTS`
- Understand current behavior
- Ensure test coverage exists

### 2. Baseline
```bash
pnpm test
```
Save this output - all tests must still pass after refactoring.

### 3. Create Branch
```bash
git checkout -b refactor/<scope> origin/main
```

### 4. Refactor Incrementally

For each change:
1. Make a small, focused change
2. Run `pnpm test`
3. If tests pass, continue
4. If tests fail, revert and reconsider

### 5. Code Review
Use the **reviewer** agent to verify:
- No behavior changes
- Code quality improved
- No regressions introduced

### 6. Final Verification
```bash
pnpm check
```

### 7. Commit
- CHANGELOG: `### Changed` - description of refactoring
- Commit: `refactor(<scope>): <description>`

## Common Refactoring Patterns

| Pattern | When to use |
|---------|-------------|
| Extract component | Repeated JSX patterns |
| Extract hook | Shared stateful logic |
| Rename | Unclear naming |
| Consolidate | Duplicate code |
| Split | Component too large |
