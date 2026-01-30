---
description: Prepare and publish a new version release
argument-hint: <version> (e.g., 0.8.0)
disable-model-invocation: true
allowed-tools: Bash(git status:*), Bash(git checkout:*), Bash(git pull:*), Bash(pnpm prerelease:*), Bash(./scripts/release.sh:*), Read, Edit
---

# Release Workflow

Prepare and publish a new version release.

## Pre-release Checklist

Before releasing, verify:
- [ ] All features for this version are merged
- [ ] All tests pass: `pnpm test`
- [ ] Build succeeds: `pnpm build`
- [ ] CHANGELOG.md has entries in `[Unreleased]`

## Version Guidelines

- **PATCH** (0.7.0 → 0.7.1): Bug fixes, docs, minor improvements
- **MINOR** (0.7.x → 0.8.0): New components, new features
- **MAJOR** (0.x → 1.0): Breaking changes or stable release

## Release Steps

### 1. Verify Clean State
```bash
git status
git checkout main
git pull origin main
```

### 2. Run Pre-release Checks
```bash
pnpm prerelease
```
This runs: format → check → build

### 3. Execute Release Script
```bash
./scripts/release.sh $ARGUMENTS
```

The script automatically:
1. Updates CHANGELOG.md (`[Unreleased]` → `[X.Y.Z] - date`)
2. Updates `version` in package.json
3. Commits changes
4. Creates git tag
5. Pushes to remote
6. Creates GitHub release

### 4. Verify Release
- Check GitHub releases page
- Verify tag was created
- Test installation: `npx shadcn@latest add "https://nessra-ui.vercel.app/r/button.json"`

## Rollback (if needed)

```bash
git tag -d vX.Y.Z
git push origin :refs/tags/vX.Y.Z
git reset --hard HEAD~1
git push --force-with-lease
```
