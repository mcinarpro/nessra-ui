---
name: radix-patterns
description: Radix UI component patterns and accessibility best practices. Use when building interactive components, handling focus management, implementing ARIA patterns, or debugging Radix issues.
user-invocable: false
---

# Radix UI Patterns for nessra-ui

## When to use Radix primitives

Use Radix when building:
- **Overlays**: Dialog, AlertDialog, Sheet, Drawer
- **Dropdowns**: DropdownMenu, Select, Combobox
- **Popovers**: Tooltip, Popover, HoverCard
- **Navigation**: Tabs, Accordion, Collapsible
- **Inputs**: Toggle, Switch, Checkbox, Radio, Slider

## Composition pattern

```tsx
import * as DialogPrimitive from "@radix-ui/react-dialog"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
interface DialogContentProps extends React.ComponentProps<typeof DialogPrimitive.Content> {}

function DialogContent({ className, children, ref, ...props }: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={cn("fixed inset-0 bg-black/50")} />
      <DialogPrimitive.Content ref={ref} className={cn(className)} {...props}>
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
```

## Controlled vs Uncontrolled

```tsx
// Uncontrolled (internal state)
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>

// Controlled (external state)
const [open, setOpen] = useState(false)
<Dialog open={open} onOpenChange={setOpen}>
  ...
</Dialog>
```

## asChild pattern

```tsx
// Radix renders its own element
<DialogTrigger>Open</DialogTrigger>

// Radix passes props to your element
<DialogTrigger asChild>
  <Button variant="outline">Open</Button>
</DialogTrigger>
```

## Accessibility checklist

- [ ] Focus trapped in modals/dialogs
- [ ] ESC closes overlays
- [ ] Arrow keys navigate menus
- [ ] ARIA labels on interactive elements
- [ ] Focus visible on keyboard navigation
