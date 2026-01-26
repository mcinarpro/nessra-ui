---
paths:
  - "content/docs/**/*.mdx"
---

# Documentation Rules

## MDX File Structure

```mdx
---
title: Component Name
description: Brief description for SEO
---

## Installation

\`\`\`bash
npx shadcn@latest add https://nessra-ui.vercel.app/r/component-name.json
\`\`\`

## Usage

\`\`\`tsx
import { Component } from "@/components/ui/component"
\`\`\`

## Examples

### Default

<ComponentPreview name="component-demo" />

### With Variants

<ComponentPreview name="component-variants" />

## API Reference

### Component

| Prop    | Type   | Default   | Description |
| ------- | ------ | --------- | ----------- |
| variant | string | "default" | ...         |
```

## Demo Components

- Place demos in `registry/new-york/examples/`
- Name pattern: `{component}-demo.tsx` or `{component}-{variant}.tsx`
- Demos are auto-registered via `registry/__index__.tsx`
