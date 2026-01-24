# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `CLAUDE.md` with project instructions for Claude Code
- Version badge on homepage linking to GitHub releases
- `tabs-underline` example to showcase underline variant

### Fixed

- Component preview now uses `not-prose` to prevent prose styles bleeding into demos
- `alert-dialog` import path for `buttonVariants`
- `alert-dialog-delete` example now uses destructive variant for action button
- Removed duplicated code blocks in docs (label, separator, switch, tabs, textarea)
- `tabs-with-cards` preview height increased to show full content

### Changed

- `absoluteUrl` removed from registry utils (users only get `cn`)

## [0.1.1] - 2025-01-24

### Added

- MIT License file
- `.env.example` for environment variables documentation
- `.prettierignore` to skip generated files
- `tsconfig.registry.json` for registry type validation
- Registry validation in `check` script
- Commitlint for conventional commit message validation
- Dependabot for automated dependency updates

### Changed

- README translated to English with badges
- Build scripts optimized (Prettier formatting moved into generators)

## [0.1.0] - 2025-01-23

### Added

- Initial release of nessra-ui registry
- 18 UI components based on Radix UI primitives:
  - Accordion
  - Alert Dialog
  - Avatar
  - Badge
  - Button
  - Card
  - Checkbox
  - Collapsible
  - Dialog
  - Dropdown Menu
  - Input
  - Label
  - Select
  - Separator
  - Switch
  - Tabs
  - Textarea
  - Tooltip
- 2 custom hooks:
  - use-mobile
- Utility functions:
  - cn (class name merger)
- Documentation site powered by Fumadocs
- shadcn CLI compatibility for component installation
- Dark mode support
- Tailwind CSS v4 with oklch color space
- TypeScript strict mode
- Production tooling:
  - Prettier with import sorting
  - ESLint with Next.js Core Web Vitals
  - Husky pre-commit hooks
  - lint-staged for staged file linting
