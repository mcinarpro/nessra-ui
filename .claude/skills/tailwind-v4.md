---
name: tailwind-v4
description: Tailwind CSS v4 conventions and CSS variables for nessra-ui. Use when styling components, fixing dark mode issues, migrating from Tailwind v3, or debugging style problems.
user-invocable: false
---

# Tailwind CSS v4 for nessra-ui

## Key differences from v3

1. **CSS variables instead of color classes**
2. **No `@apply` in components** (use className directly)
3. **Theme via CSS custom properties**
4. **oklch color space** for better color manipulation

## Color mapping (v3 → v4)

| Tailwind v3 | nessra-ui v4 |
|-------------|--------------|
| `text-gray-900` | `text-foreground` |
| `text-gray-500` | `text-muted-foreground` |
| `bg-white` | `bg-background` |
| `bg-gray-100` | `bg-muted` |
| `bg-gray-900` | `bg-card` |
| `border-gray-200` | `border-border` |
| `bg-blue-500` | `bg-primary` |
| `text-white` (on primary) | `text-primary-foreground` |
| `bg-red-500` | `bg-destructive` |
| `ring-blue-500` | `ring-ring` |

## Component styling pattern

```tsx
// ❌ Don't use @apply
const Button = styled.button`
  @apply px-4 py-2 rounded;
`

// ✅ Use className with cn()
const Button = ({ className, ...props }) => (
  <button
    className={cn(
      "inline-flex items-center justify-center rounded-md",
      "bg-primary text-primary-foreground",
      "hover:bg-primary/90",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      className
    )}
    {...props}
  />
)
```

## Dark mode

Automatic via CSS variables. No need for `dark:` prefixes on semantic colors:

```tsx
// ❌ Unnecessary dark: prefix
<div className="bg-white dark:bg-gray-900">

// ✅ Semantic color handles both modes
<div className="bg-background">
```

## Troubleshooting

### Color not changing in dark mode
- Check if using semantic color (`bg-background`) vs raw color (`bg-white`)
- Verify CSS variable is defined in both `:root` and `.dark`
