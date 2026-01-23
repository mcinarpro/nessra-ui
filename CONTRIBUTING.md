# Contributing to nessra-ui

Thank you for your interest in contributing to nessra-ui! This document provides guidelines and instructions for contributing.

## Development Setup

1. **Fork & Clone**

   ```bash
   git clone https://github.com/your-username/nessra-ui.git
   cd nessra-ui
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Start Development Server**
   ```bash
   pnpm dev
   ```

## Project Structure

```
nessra-ui/
├── content/docs/components/  # Component documentation (MDX)
├── registry/new-york/
│   ├── ui/                   # UI components
│   ├── lib/                  # Utility functions
│   └── hooks/                # Custom hooks
├── src/
│   ├── app/                  # Next.js app router
│   ├── components/           # Site components
│   └── lib/                  # Site utilities
├── public/r/                 # Generated registry JSON files
└── registry.json             # Component registry definitions
```

## Adding a Component

### Step 1: Create the Component

Create your component in `registry/new-york/ui/{component-name}.tsx`:

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function MyComponent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="my-component"
      className={cn("base-classes", className)}
      {...props}
    />
  )
}

export { MyComponent }
```

### Step 2: Register the Component

Add an entry to `registry.json`:

```json
{
  "name": "my-component",
  "type": "registry:ui",
  "title": "My Component",
  "description": "A brief description of what the component does.",
  "dependencies": [],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "registry/new-york/ui/my-component.tsx",
      "type": "registry:ui"
    }
  ]
}
```

### Step 3: Create Documentation

Create `content/docs/components/my-component.mdx`:

````mdx
---
title: My Component
description: A brief description of what the component does.
links:
  doc: https://example.com/docs
  api: https://example.com/api
---

<ComponentPreview name="my-component-demo" />

## Installation

<Tabs defaultValue="cli">
  <TabsList>
    <TabsTrigger value="cli">CLI</TabsTrigger>
    <TabsTrigger value="manual">Manual</TabsTrigger>
  </TabsList>
  <TabsContent value="cli">
    ```bash npx shadcn@latest add
    https://nessra-ui.vercel.app/r/my-component.json ```
  </TabsContent>
  <TabsContent value="manual">
    <Steps>
      <Step>Copy and paste the following code into your project.</Step>
      <ComponentSource name="my-component" />
      <Step>Update the import paths to match your project setup.</Step>
    </Steps>
  </TabsContent>
</Tabs>

## Usage

\`\`\`tsx
import { MyComponent } from "@/components/ui/my-component"

export default function Example() {
  return <MyComponent>Content</MyComponent>
}
\`\`\`

## Examples

### Default

<ComponentPreview name="my-component-demo" />
````

### Step 4: Add to Navigation

Update `content/docs/components/meta.json` to include your component in the `pages` array.

### Step 5: Build & Test

```bash
pnpm build   # Auto: registry:generate + registry:build + next build
pnpm dev     # Test locally
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Type       | Description                           |
| ---------- | ------------------------------------- |
| `feat`     | New feature                           |
| `fix`      | Bug fix                               |
| `docs`     | Documentation changes                 |
| `style`    | Code formatting (no logic changes)    |
| `refactor` | Code restructure (no feature changes) |
| `test`     | Adding or updating tests              |
| `chore`    | Maintenance tasks                     |

**Examples:**

```
feat(components): add tooltip component
fix(button): correct hover state in dark mode
docs: update installation instructions
chore: update dependencies
```

## Pull Request Process

1. **Before submitting:**

   ```bash
   pnpm check  # Runs lint, format check, and type check
   ```

2. **Create a focused PR:**
   - One component or feature per PR
   - Include documentation updates
   - Add examples if applicable

3. **PR Title:**
   - Follow the commit convention
   - Example: `feat(components): add sheet component`

4. **Description:**
   - Explain what changes were made
   - Link to any related issues
   - Include screenshots for UI changes

## Code Style

### Component Template

```tsx
"use client"

import * as React from "react"
import * as PrimitiveName from "@radix-ui/react-primitive"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const componentVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
    },
    size: {
      sm: "h-8 px-3 text-sm",
      default: "h-10 px-4",
      lg: "h-12 px-6 text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

function Component({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof PrimitiveName.Root> &
  VariantProps<typeof componentVariants>) {
  return (
    <PrimitiveName.Root
      data-slot="component"
      className={cn(componentVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Component, componentVariants }
```

### Conventions

| Element         | Convention           | Example                |
| --------------- | -------------------- | ---------------------- |
| File names      | kebab-case           | `alert-dialog.tsx`     |
| Component names | PascalCase           | `AlertDialog`          |
| Variant exports | camelCase + Variants | `buttonVariants`       |
| Hooks           | camelCase + use      | `useMobile`            |
| CSS variables   | kebab-case           | `--primary-foreground` |

## Release Workflow

### Versioning (SemVer)

```
MAJOR.MINOR.PATCH
  │     │     └── Bug fixes (0.1.1)
  │     └──────── New features (0.2.0)
  └────────────── Breaking changes (1.0.0)
```

| Change              | Version | Example       |
| ------------------- | ------- | ------------- |
| Bug fix             | PATCH   | 0.1.0 → 0.1.1 |
| New component       | MINOR   | 0.1.1 → 0.2.0 |
| New variant         | MINOR   | 0.2.0 → 0.3.0 |
| Breaking API change | MAJOR   | 0.9.0 → 1.0.0 |

### Release Steps

```bash
# 1. Validate everything
pnpm prerelease

# 2. Update CHANGELOG.md with changes

# 3. Commit and tag
git add .
git commit -m "chore(release): v0.2.0"
git tag v0.2.0

# 4. Push
git push && git push --tags
```

### CHANGELOG Format

```markdown
## [0.2.0] - YYYY-MM-DD

### Added

- New `tooltip` component

### Changed

- Updated button hover styles

### Fixed

- Fixed checkbox alignment in dark mode
```

## Automated Workflows

### Pre-commit (via Husky + lint-staged)

Runs automatically on `git commit`:

- ESLint fix on `.ts`, `.tsx`
- Prettier on all staged files

### Pre-build (via npm lifecycle)

Runs automatically on `pnpm build`:

- `registry:generate` → generates `registry/__index__.tsx`
- `registry:build` → generates `public/r/*.json`
- Prettier on generated files

### Pre-release (manual)

Run before creating a release tag:

```bash
pnpm prerelease
# → format → check → build
```

## Questions?

If you have questions, feel free to open an issue or discussion on GitHub.
