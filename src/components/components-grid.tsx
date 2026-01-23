import Link from "next/link"

const components = [
  { name: "Accordion", href: "/docs/components/accordion" },
  { name: "Alert Dialog", href: "/docs/components/alert-dialog" },
  { name: "Avatar", href: "/docs/components/avatar" },
  { name: "Badge", href: "/docs/components/badge" },
  { name: "Button", href: "/docs/components/button" },
  { name: "Card", href: "/docs/components/card" },
  { name: "Checkbox", href: "/docs/components/checkbox" },
  { name: "Collapsible", href: "/docs/components/collapsible" },
  { name: "Dialog", href: "/docs/components/dialog" },
  { name: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
  { name: "Input", href: "/docs/components/input" },
  { name: "Label", href: "/docs/components/label" },
  { name: "Select", href: "/docs/components/select" },
  { name: "Separator", href: "/docs/components/separator" },
  { name: "Switch", href: "/docs/components/switch" },
  { name: "Tabs", href: "/docs/components/tabs" },
  { name: "Textarea", href: "/docs/components/textarea" },
  { name: "Tooltip", href: "/docs/components/tooltip" },
]

export function ComponentsGrid() {
  return (
    <div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {components.map((component) => (
        <Link
          key={component.name}
          href={component.href}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {component.name}
        </Link>
      ))}
    </div>
  )
}
