# Claude Code Instructions

This file contains instructions and context for Claude Code when working on this project.

## Project Overview

nessra-ui is a component library built with Radix UI and Tailwind CSS, distributed via shadcn CLI.

## Key Commands

| Command                  | Description                        |
| ------------------------ | ---------------------------------- |
| `pnpm dev`               | Start development server           |
| `pnpm build`             | Full build (registry + next build) |
| `pnpm check`             | Lint + format + types + registry   |
| `pnpm registry:build`    | Generate `public/r/*.json` files   |
| `pnpm registry:generate` | Generate `registry/__index__.tsx`  |
| `pnpm registry:validate` | Type-check registry components     |

## Project Structure

```
registry/new-york/       # Component source (single source of truth)
├── ui/                  # UI components
├── hooks/               # Custom hooks
└── lib/                 # Utilities (utils.ts)
public/r/                # Generated JSON files (DO NOT edit manually)
content/docs/            # MDX documentation
```

## Important Notes

- Files in `public/r/` are generated — do not format or edit manually
- **Update CHANGELOG.md before committing** for any notable change (components, features, config, tooling — not just user-facing)
- Always run `pnpm check` before committing
- Commit messages must follow conventional commits (enforced by commitlint)
- **Do not push automatically** — only push when explicitly requested by the user

## Adding a New Component

When adding a new component, update these files:

1. `registry/new-york/ui/<component>.tsx` — Component source
2. `registry.json` — Registry entry with dependencies
3. `content/docs/components/<component>.mdx` — Documentation
4. `content/docs/components/meta.json` — Add to `pages` array (alphabetical)
5. `src/components/components-grid.tsx` — Add to `components` array (alphabetical)
6. `CHANGELOG.md` — Document in `[Unreleased]` section

Then run `pnpm registry:build` to generate `public/r/*.json` files.

## Changelog Workflow

| When        | Action                                                       |
| ----------- | ------------------------------------------------------------ |
| Each commit | Add changes to `[Unreleased]` section in CHANGELOG.md        |
| Release     | `[Unreleased]` → `[x.y.z] - date` + new empty `[Unreleased]` |

## Release Process

```bash
# 1. Update CHANGELOG.md: [Unreleased] → [x.y.z] - date
# 2. Update version in package.json
# 3. Commit and tag
git add CHANGELOG.md package.json
git commit -m "chore(release): vX.Y.Z"
git tag vX.Y.Z
git push && git push --tags
```

## Versioning

- `x.y.PATCH` (0.1.1 → 0.1.2): Bug fixes, docs, minor improvements
- `x.MINOR.0` (0.1.x → 0.2.0): New components, new features
- `MAJOR.0.0` (0.x → 1.0): Stable release or breaking changes
