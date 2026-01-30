# nessra-sync - Figma Synchronization Tools

CLI tools for bidirectional synchronization between nessra-ui component registry and Figma.

## Quick Start

```bash
# Extract component schemas
npx tsx scripts/figma-sync/cli.ts extract

# Extract design tokens
npx tsx scripts/figma-sync/cli.ts tokens

# View component details
npx tsx scripts/figma-sync/cli.ts diff --component button

# Show all commands
npx tsx scripts/figma-sync/cli.ts help
```

## Commands

### `extract` - Component Schema Extraction

Parses registry components and extracts:

- CVA variants (names, values, defaults)
- Component props with types
- Design tokens from Tailwind classes
- Suggested Figma component mapping

```bash
npx tsx scripts/figma-sync/cli.ts extract [--output schemas] [--verbose]
```

**Output:** `schemas/{component}.schema.json`

### `tokens` - Design Token Extraction

Extracts CSS variables from `global.css` and converts to multiple formats:

- **W3C Design Tokens** - Standard JSON format
- **Figma Variables** - Ready for Figma import
- **Tailwind Config** - TypeScript color exports

```bash
npx tsx scripts/figma-sync/cli.ts tokens [--input src/app/global.css] [--output tokens] [--format w3c,figma,tailwind]
```

**Output:**

- `tokens/design-tokens.json` (W3C format)
- `tokens/figma-variables.json` (Figma format)
- `tokens/tailwind-colors.ts` (Tailwind config)

### `diff` - Schema Comparison

View extracted schema details for a component.

```bash
# List all components with variants
npx tsx scripts/figma-sync/cli.ts diff

# View specific component
npx tsx scripts/figma-sync/cli.ts diff --component button
```

## Output Formats

### Component Schema

```json
{
  "name": "Button",
  "variants": [
    {
      "name": "variant",
      "values": {
        "default": { "classes": "bg-primary...", "tokens": [...] },
        "destructive": { "classes": "bg-destructive...", "tokens": [...] }
      },
      "defaultValue": "default"
    }
  ],
  "props": [
    { "name": "asChild", "type": "boolean", "defaultValue": "false" }
  ],
  "figmaMapping": {
    "componentName": "Button",
    "variantProperties": [
      { "name": "Variant", "values": ["Default", "Destructive", ...] }
    ]
  }
}
```

### W3C Design Tokens

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "modes": {
    "light": {
      "color": {
        "primary": {
          "primary": { "$value": "oklch(0.21 0.006 285.885)", "$type": "color" }
        }
      }
    }
  }
}
```

### Figma Variables

```json
[
  {
    "name": "Primary",
    "resolvedType": "COLOR",
    "valuesByMode": {
      "light": "oklch(0.21 0.006 285.885)",
      "dark": "oklch(0.92 0.004 286.32)"
    },
    "scopes": ["ALL_FILLS", "STROKE_COLOR"]
  }
]
```

## File Structure

```
scripts/figma-sync/
├── cli.ts              # Unified CLI
├── extract-schema.ts   # Component schema extractor
├── extract-tokens.ts   # Design token extractor
├── types.ts            # Shared type definitions
└── README.md           # This file

schemas/                # Generated (gitignored)
├── index.json
├── button.schema.json
└── ...

tokens/                 # Generated (gitignored)
├── design-tokens.json
├── figma-variables.json
└── tailwind-colors.ts
```

## Roadmap

- [x] Component schema extraction
- [x] Design token extraction (W3C, Figma, Tailwind)
- [x] CLI with extract, tokens, diff commands
- [ ] Figma Plugin for sync
- [ ] `push` command - Push to Figma
- [ ] `pull` command - Pull from Figma (create PR)
- [ ] `watch` command - Auto-sync on changes
- [ ] GitHub Action

## Development

```bash
# Run extractor directly
npx tsx scripts/figma-sync/extract-schema.ts

# Run token extractor
npx tsx scripts/figma-sync/extract-tokens.ts

# Type check
npx tsc --noEmit scripts/figma-sync/*.ts
```

See [FIGMA_SYNC_PLAN.md](/docs/FIGMA_SYNC_PLAN.md) for the full development roadmap.
