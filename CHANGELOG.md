# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Spinner**: Loading indicator component with accessible attributes
- **Empty**: Empty state component with media, title, description, and action slots
- **Typography**: Styled text components (H1-H4, P, Blockquote, List, InlineCode, Lead, Large, Small, Muted)

### Fixed

- Form component missing from components grid page

### Changed

- `CLAUDE.md` updated with checklist for adding new components

## [0.3.0] - 2025-01-25

### Added

- **Form**: TanStack Form integration with Zod validation support
  - `Form`, `FormField`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` UI components
  - Context-based field state management with error handling
  - Accessible form controls with auto `aria-invalid` and `aria-describedby`
  - `FormField` accepts `unknown[]` for errors and normalizes automatically
  - `orientation` prop for horizontal layouts (checkbox/switch)
  - Examples: basic form, Zod validation, all field types, dynamic array fields
  - Dependencies: `@tanstack/react-form`, `zod`
- **DataTable**: Complete rewrite with all shadcn features
  - `DataTableColumnHeader` - Sortable column header with dropdown (Asc/Desc/Hide)
  - `DataTableViewOptions` - Toggle column visibility
  - `DataTableFacetedFilter` - Multi-select faceted filters with count
  - `DataTableToolbar` - Toolbar with filter input, faceted filters, reset button
  - `DataTablePagination` - Pagination with page numbers or simple navigation
  - Loading skeleton state (`isLoading`)
  - Custom empty state (`emptyState`)
  - Row click callback (`onRowClick`)
  - Controlled state for URL sync (`pagination`, `sorting`, `columnFilters` + callbacks)
  - New props: `facetedFilters`, `showPageNumbers`, `enableRowSelection`, `getRowId`, `toolbarChildren`

### Changed

- Dependabot config optimized: monthly schedule, grouped minor/patch updates, ignore patches
- `CLAUDE.md` changelog rule clarified: any notable change, not just user-facing

## [0.2.0] - 2025-01-24

### Added

- 21 new UI components:
  - Alert
  - Aspect Ratio
  - Breadcrumb
  - Calendar (with react-day-picker)
  - Command (with cmdk)
  - Date Picker (DatePicker + DateRangePicker)
  - Drawer (with vaul)
  - Hover Card
  - Pagination
  - Popover
  - Progress
  - Radio Group
  - Scroll Area
  - Sheet
  - Skeleton
  - Slider
  - Sonner (toast notifications)
  - Table
  - Toggle
- Date Picker examples: basic, range, presets, date of birth
- Calendar examples: basic, range, multiple months, dropdown navigation
- Documentation for all new components

## [0.1.2] - 2025-01-24

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
