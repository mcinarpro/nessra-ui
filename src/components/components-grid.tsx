import Link from "next/link"

const components = [
  { name: "Accordion", href: "/docs/components/accordion" },
  { name: "Alert", href: "/docs/components/alert" },
  { name: "Alert Dialog", href: "/docs/components/alert-dialog" },
  { name: "Aspect Ratio", href: "/docs/components/aspect-ratio" },
  { name: "Avatar", href: "/docs/components/avatar" },
  { name: "Badge", href: "/docs/components/badge" },
  { name: "Breadcrumb", href: "/docs/components/breadcrumb" },
  { name: "Button", href: "/docs/components/button" },
  { name: "Button Group", href: "/docs/components/button-group" },
  { name: "Calendar", href: "/docs/components/calendar" },
  { name: "Card", href: "/docs/components/card" },
  { name: "Chart", href: "/docs/components/chart" },
  { name: "Checkbox", href: "/docs/components/checkbox" },
  { name: "Code Block", href: "/docs/components/code-block" },
  { name: "Collapsible", href: "/docs/components/collapsible" },
  { name: "Combobox", href: "/docs/components/combobox" },
  { name: "Command", href: "/docs/components/command" },
  { name: "Copy Button", href: "/docs/components/copy-button" },
  { name: "Data Table", href: "/docs/components/data-table" },
  { name: "Date Picker", href: "/docs/components/date-picker" },
  { name: "Dialog", href: "/docs/components/dialog" },
  { name: "Drawer", href: "/docs/components/drawer" },
  { name: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
  { name: "Empty", href: "/docs/components/empty" },
  { name: "Field", href: "/docs/components/field" },
  { name: "Form", href: "/docs/components/form" },
  { name: "Hover Card", href: "/docs/components/hover-card" },
  { name: "Input", href: "/docs/components/input" },
  { name: "Input Group", href: "/docs/components/input-group" },
  { name: "Input OTP", href: "/docs/components/input-otp" },
  { name: "Number Input", href: "/docs/components/number-input" },
  { name: "Label", href: "/docs/components/label" },
  { name: "Pagination", href: "/docs/components/pagination" },
  { name: "Popover", href: "/docs/components/popover" },
  { name: "Progress", href: "/docs/components/progress" },
  { name: "Radio Group", href: "/docs/components/radio-group" },
  { name: "Scroll Area", href: "/docs/components/scroll-area" },
  { name: "Select", href: "/docs/components/select" },
  { name: "Separator", href: "/docs/components/separator" },
  { name: "Sheet", href: "/docs/components/sheet" },
  { name: "Sidebar", href: "/docs/components/sidebar" },
  { name: "Skeleton", href: "/docs/components/skeleton" },
  { name: "Slider", href: "/docs/components/slider" },
  { name: "Sonner", href: "/docs/components/sonner" },
  { name: "Spinner", href: "/docs/components/spinner" },
  { name: "Stat Card", href: "/docs/components/stat-card" },
  { name: "Switch", href: "/docs/components/switch" },
  { name: "Table", href: "/docs/components/table" },
  { name: "Tag Input", href: "/docs/components/tag-input" },
  { name: "Tabs", href: "/docs/components/tabs" },
  { name: "Textarea", href: "/docs/components/textarea" },
  { name: "Toggle", href: "/docs/components/toggle" },
  { name: "Toggle Group", href: "/docs/components/toggle-group" },
  { name: "Tooltip", href: "/docs/components/tooltip" },
  { name: "Typography", href: "/docs/components/typography" },
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
