---
description: Add an entry to CHANGELOG.md [Unreleased] section
argument-hint: <type> <description> (e.g., "Added new Button loading state")
allowed-tools: Read, Edit, Bash(head:*)
---

## Context

- Current CHANGELOG structure: !`head -30 CHANGELOG.md`

## Changelog Categories

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Features to be removed
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes

## Task

Add an entry to the `[Unreleased]` section of CHANGELOG.md.

### Input format

`$ARGUMENTS` should be: `<category> <description>`

Examples:
- `Added new Spinner component with size variants`
- `Fixed Button focus ring not visible in dark mode`
- `Changed Card padding from 4 to 6`

### Steps

1. Parse the category from the first word (Added, Changed, Fixed, etc.)
2. Read current CHANGELOG.md
3. Find the `## [Unreleased]` section
4. Add or create the `### <Category>` subsection if needed
5. Add the entry with format: `- **Component/Scope:** Description`
6. Preserve existing entries in alphabetical order by component

### Entry format

```markdown
### Added

- **Button:** Add loading state with spinner
- **Input:** Add error state styling
```

If the description includes a component name, extract it for the bold prefix.
If no component, use a general description.
