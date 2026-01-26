# nessra-ui

Component library built with Radix UI and Tailwind CSS v4, distributed via shadcn CLI.

See @package.json for available scripts and dependencies.

## Commands

- `pnpm dev` - Start development server
- `pnpm build` - Full build (registry + next build)
- `pnpm check` - Lint + format + types + registry validation
- `pnpm registry:build` - Generate `public/r/*.json` files
- `pnpm registry:generate` - Generate `registry/__index__.tsx`
- `pnpm registry:validate` - Type-check registry components

## Project Structure

```
registry/new-york/       # Component source (single source of truth)
├── ui/                  # UI components
├── hooks/               # Custom hooks
└── lib/                 # Utilities (utils.ts)
public/r/                # Generated JSON files (DO NOT edit)
content/docs/            # MDX documentation
```

## Code Conventions

- Use `cn()` from `@/lib/utils` for merging Tailwind classes
- Use `cva()` from `class-variance-authority` for component variants
- Export component props as `ComponentNameProps` type
- Use `React.forwardRef` for components that need ref forwarding
- Use Radix UI primitives for accessible interactive components
- Tailwind CSS v4 syntax (no `@apply`, use CSS variables via `--color-*`)

## Adding a New Component

Update these files in order:

1. `registry/new-york/ui/<component>.tsx` - Component source
2. `registry.json` - Registry entry with dependencies
3. `content/docs/components/<component>.mdx` - Documentation
4. `content/docs/components/meta.json` - Add to `pages` array (alphabetical)
5. `src/components/components-grid.tsx` - Add to `components` array (alphabetical)
6. `CHANGELOG.md` - Document in `[Unreleased]` section
7. Run `pnpm registry:build` to generate JSON files

## Critical Rules

- Files in `public/r/` are generated - never edit manually
- Run `pnpm check` before committing
- Commit messages follow conventional commits (enforced by commitlint)
- Do not push automatically - only push when explicitly requested

## CHANGELOG Requirement

ALWAYS update `CHANGELOG.md` before every commit:

- Add entry to `[Unreleased]` section
- Include: new components, bug fixes, config changes, dependency updates, refactors
- Format: `- **Category:** Description of change`
- This is mandatory for ALL code changes, not optional

## Changelog Workflow

- Each commit: Add changes to `[Unreleased]` section
- Release: `[Unreleased]` becomes `[x.y.z] - date`, create new empty `[Unreleased]`

## Release Process

1. Update `CHANGELOG.md`: `[Unreleased]` → `[x.y.z] - date`
2. Update `version` in `package.json`
3. Commit: `git commit -m "chore(release): vX.Y.Z"`
4. Tag: `git tag vX.Y.Z`
5. Push: `git push && git push --tags`
6. Create GitHub release: `gh release create vX.Y.Z --title "vX.Y.Z" --notes "<changelog section>"`

## Versioning

- PATCH (0.1.1 → 0.1.2): Bug fixes, docs, minor improvements
- MINOR (0.1.x → 0.2.0): New components, new features
- MAJOR (0.x → 1.0): Stable release or breaking changes
