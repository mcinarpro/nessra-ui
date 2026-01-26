---
paths:
  - "registry/new-york/ui/**/*.tsx"
---

# Component Development Rules

## Structure

- One component per file, named after the component
- Export main component as default or named export matching filename
- Export all sub-components (e.g., `Card`, `CardHeader`, `CardContent`)
- Export props type as `{ComponentName}Props`

## Patterns

```tsx
// Standard component pattern (React 19 - no forwardRef needed)
function Component({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="component"
      className={cn("base-classes", className)}
      {...props}
    />
  )
}
// ref is automatically included in ComponentProps and passed via ...props
```

## Variants with CVA

```tsx
const componentVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", destructive: "..." },
    size: { default: "...", sm: "...", lg: "..." },
  },
  defaultVariants: { variant: "default", size: "default" },
})
```

## Dependencies

- Always declare npm dependencies in `registry.json`
- Use `registryDependencies` for internal dependencies (e.g., `["utils"]`)
- Import from `@/lib/utils` for `cn()` function
