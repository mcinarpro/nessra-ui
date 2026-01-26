---
paths:
  - "registry.json"
  - "scripts/build-registry.ts"
---

# Registry Rules

## registry.json Structure

Each component entry requires:

```json
{
  "name": "component-name",
  "type": "registry:ui",
  "title": "Component Name",
  "description": "Brief description",
  "dependencies": ["npm-package"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "registry/new-york/ui/component-name.tsx",
      "type": "registry:ui"
    }
  ]
}
```

## Types

- `registry:ui` - UI components
- `registry:example` - Demo/example components
- `registry:block` - Complete compositions (signin form, etc.)
- `registry:hook` - Custom hooks
- `registry:lib` - Utility libraries

## After Changes

Run `pnpm registry:build` to regenerate `public/r/*.json` files.
