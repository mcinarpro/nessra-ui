---
name: component
description: Create new UI components for nessra-ui. Triggers on "create component", "add component", "new component", "scaffold component". Creates source, registry, docs, and tests.
allowed-tools: Bash, Read, Write, Edit, Grep, Glob
---

# New Component Workflow

Complete workflow for adding a new component to nessra-ui.

## Supporting files

This skill includes templates you should use:

- [TEMPLATE.tsx](TEMPLATE.tsx) - Component source template
- [REGISTRY-ENTRY.json](REGISTRY-ENTRY.json) - Registry entry template
- [TEST-TEMPLATE.tsx](TEST-TEMPLATE.tsx) - Test file template
- [DOC-TEMPLATE.mdx](DOC-TEMPLATE.mdx) - Documentation template

Replace `{{name}}`, `{{Name}}`, `{{Title}}`, `{{description}}` with actual values.

## Files to Create/Update

| File | Template | Purpose |
|------|----------|---------|
| `registry/new-york/ui/<name>.tsx` | TEMPLATE.tsx | Component source |
| `registry/new-york/examples/<name>-demo.tsx` | - | Demo example |
| `registry.json` | REGISTRY-ENTRY.json | Registry entry |
| `content/docs/components/<name>.mdx` | DOC-TEMPLATE.mdx | Documentation |
| `content/docs/components/meta.json` | - | Navigation (add to pages array) |
| `src/components/components-grid.tsx` | - | Homepage grid |
| `__tests__/<name>.test.tsx` | TEST-TEMPLATE.tsx | Tests |
| `CHANGELOG.md` | - | Changelog entry |

## Workflow Steps

### 1. Research
- Check if similar component exists in codebase
- Look at Radix UI primitives for the pattern
- Review shadcn/ui for inspiration

### 2. Create Component
Use **TEMPLATE.tsx** as starting point:
- Replace placeholders with actual component name
- Add component-specific props
- Implement logic using Radix primitives if interactive

### 3. Add Registry Entry
Use **REGISTRY-ENTRY.json** template:
- Add to `items` array in `registry.json`
- Include all npm dependencies
- Use full URLs for registryDependencies

### 4. Create Example
Create `registry/new-york/examples/<name>-demo.tsx`:
```tsx
import { ComponentName } from "@/registry/new-york/ui/component-name"

export default function ComponentNameDemo() {
  return <ComponentName>Demo content</ComponentName>
}
```

### 5. Write Documentation
Use **DOC-TEMPLATE.mdx** template:
- Installation instructions
- Usage examples
- API reference table

### 6. Add to Navigation
- `content/docs/components/meta.json` → add to `pages` array (alphabetical)
- `src/components/components-grid.tsx` → add to components array (alphabetical)

### 7. Write Tests
Use **TEST-TEMPLATE.tsx** template:
- Rendering tests
- Variant tests
- Ref forwarding test
- Interaction tests if applicable

### 8. Generate & Verify
```bash
pnpm registry:build
pnpm check
```

### 9. Commit
- CHANGELOG: `### Added` - **ComponentName:** description
- Commit: `feat(<name>): add <name> component`

## Quality Checklist

- [ ] Component accepts ref as prop (React 19 pattern)
- [ ] Props exported as `<Name>Props`
- [ ] Uses cn() for class merging
- [ ] Uses cva() for variants (if applicable)
- [ ] Accessible (Radix primitives, ARIA)
- [ ] Dark mode works (semantic colors)
- [ ] Tests pass
- [ ] Docs complete with examples
- [ ] Registry validates
