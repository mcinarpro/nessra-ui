import * as React from "react"

export interface RegistryEntry {
  name: string
  component: React.LazyExoticComponent<React.ComponentType<unknown>>
  files: string[]
}

export const Index: Record<string, RegistryEntry> = {
  // Accordion examples
  "accordion-demo": {
    name: "accordion-demo",
    component: React.lazy(() => import("./new-york/examples/accordion-demo")),
    files: ["registry/new-york/examples/accordion-demo.tsx"],
  },
  "accordion-multiple": {
    name: "accordion-multiple",
    component: React.lazy(
      () => import("./new-york/examples/accordion-multiple")
    ),
    files: ["registry/new-york/examples/accordion-multiple.tsx"],
  },
  "accordion-single": {
    name: "accordion-single",
    component: React.lazy(() => import("./new-york/examples/accordion-single")),
    files: ["registry/new-york/examples/accordion-single.tsx"],
  },

  // Alert Dialog examples
  "alert-dialog-delete": {
    name: "alert-dialog-delete",
    component: React.lazy(
      () => import("./new-york/examples/alert-dialog-delete")
    ),
    files: ["registry/new-york/examples/alert-dialog-delete.tsx"],
  },
  "alert-dialog-demo": {
    name: "alert-dialog-demo",
    component: React.lazy(
      () => import("./new-york/examples/alert-dialog-demo")
    ),
    files: ["registry/new-york/examples/alert-dialog-demo.tsx"],
  },

  // Avatar examples
  "avatar-demo": {
    name: "avatar-demo",
    component: React.lazy(() => import("./new-york/examples/avatar-demo")),
    files: ["registry/new-york/examples/avatar-demo.tsx"],
  },
  "avatar-fallback": {
    name: "avatar-fallback",
    component: React.lazy(() => import("./new-york/examples/avatar-fallback")),
    files: ["registry/new-york/examples/avatar-fallback.tsx"],
  },
  "avatar-sizes": {
    name: "avatar-sizes",
    component: React.lazy(() => import("./new-york/examples/avatar-sizes")),
    files: ["registry/new-york/examples/avatar-sizes.tsx"],
  },

  // Badge examples
  "badge-default": {
    name: "badge-default",
    component: React.lazy(() => import("./new-york/examples/badge-default")),
    files: ["registry/new-york/examples/badge-default.tsx"],
  },
  "badge-demo": {
    name: "badge-demo",
    component: React.lazy(() => import("./new-york/examples/badge-demo")),
    files: ["registry/new-york/examples/badge-demo.tsx"],
  },
  "badge-destructive": {
    name: "badge-destructive",
    component: React.lazy(
      () => import("./new-york/examples/badge-destructive")
    ),
    files: ["registry/new-york/examples/badge-destructive.tsx"],
  },
  "badge-outline": {
    name: "badge-outline",
    component: React.lazy(() => import("./new-york/examples/badge-outline")),
    files: ["registry/new-york/examples/badge-outline.tsx"],
  },
  "badge-secondary": {
    name: "badge-secondary",
    component: React.lazy(() => import("./new-york/examples/badge-secondary")),
    files: ["registry/new-york/examples/badge-secondary.tsx"],
  },
  "badge-with-icon": {
    name: "badge-with-icon",
    component: React.lazy(() => import("./new-york/examples/badge-with-icon")),
    files: ["registry/new-york/examples/badge-with-icon.tsx"],
  },

  // Button examples
  "button-demo": {
    name: "button-demo",
    component: React.lazy(() => import("./new-york/examples/button-demo")),
    files: ["registry/new-york/examples/button-demo.tsx"],
  },
  "button-destructive": {
    name: "button-destructive",
    component: React.lazy(
      () => import("./new-york/examples/button-destructive")
    ),
    files: ["registry/new-york/examples/button-destructive.tsx"],
  },
  "button-ghost": {
    name: "button-ghost",
    component: React.lazy(() => import("./new-york/examples/button-ghost")),
    files: ["registry/new-york/examples/button-ghost.tsx"],
  },
  "button-icon": {
    name: "button-icon",
    component: React.lazy(() => import("./new-york/examples/button-icon")),
    files: ["registry/new-york/examples/button-icon.tsx"],
  },
  "button-link": {
    name: "button-link",
    component: React.lazy(() => import("./new-york/examples/button-link")),
    files: ["registry/new-york/examples/button-link.tsx"],
  },
  "button-loading": {
    name: "button-loading",
    component: React.lazy(() => import("./new-york/examples/button-loading")),
    files: ["registry/new-york/examples/button-loading.tsx"],
  },
  "button-outline": {
    name: "button-outline",
    component: React.lazy(() => import("./new-york/examples/button-outline")),
    files: ["registry/new-york/examples/button-outline.tsx"],
  },
  "button-secondary": {
    name: "button-secondary",
    component: React.lazy(() => import("./new-york/examples/button-secondary")),
    files: ["registry/new-york/examples/button-secondary.tsx"],
  },
  "button-with-icon": {
    name: "button-with-icon",
    component: React.lazy(() => import("./new-york/examples/button-with-icon")),
    files: ["registry/new-york/examples/button-with-icon.tsx"],
  },

  // Card examples
  "card-demo": {
    name: "card-demo",
    component: React.lazy(() => import("./new-york/examples/card-demo")),
    files: ["registry/new-york/examples/card-demo.tsx"],
  },
  "card-simple": {
    name: "card-simple",
    component: React.lazy(() => import("./new-york/examples/card-simple")),
    files: ["registry/new-york/examples/card-simple.tsx"],
  },

  // Checkbox examples
  "checkbox-demo": {
    name: "checkbox-demo",
    component: React.lazy(() => import("./new-york/examples/checkbox-demo")),
    files: ["registry/new-york/examples/checkbox-demo.tsx"],
  },
  "checkbox-disabled": {
    name: "checkbox-disabled",
    component: React.lazy(
      () => import("./new-york/examples/checkbox-disabled")
    ),
    files: ["registry/new-york/examples/checkbox-disabled.tsx"],
  },
  "checkbox-with-label": {
    name: "checkbox-with-label",
    component: React.lazy(
      () => import("./new-york/examples/checkbox-with-label")
    ),
    files: ["registry/new-york/examples/checkbox-with-label.tsx"],
  },
  "checkbox-with-text": {
    name: "checkbox-with-text",
    component: React.lazy(
      () => import("./new-york/examples/checkbox-with-text")
    ),
    files: ["registry/new-york/examples/checkbox-with-text.tsx"],
  },

  // Collapsible examples
  "collapsible-demo": {
    name: "collapsible-demo",
    component: React.lazy(() => import("./new-york/examples/collapsible-demo")),
    files: ["registry/new-york/examples/collapsible-demo.tsx"],
  },

  // Dialog examples
  "dialog-basic": {
    name: "dialog-basic",
    component: React.lazy(() => import("./new-york/examples/dialog-basic")),
    files: ["registry/new-york/examples/dialog-basic.tsx"],
  },
  "dialog-demo": {
    name: "dialog-demo",
    component: React.lazy(() => import("./new-york/examples/dialog-demo")),
    files: ["registry/new-york/examples/dialog-demo.tsx"],
  },

  // Dropdown Menu examples
  "dropdown-menu-checkboxes": {
    name: "dropdown-menu-checkboxes",
    component: React.lazy(
      () => import("./new-york/examples/dropdown-menu-checkboxes")
    ),
    files: ["registry/new-york/examples/dropdown-menu-checkboxes.tsx"],
  },
  "dropdown-menu-demo": {
    name: "dropdown-menu-demo",
    component: React.lazy(
      () => import("./new-york/examples/dropdown-menu-demo")
    ),
    files: ["registry/new-york/examples/dropdown-menu-demo.tsx"],
  },
  "dropdown-menu-radio": {
    name: "dropdown-menu-radio",
    component: React.lazy(
      () => import("./new-york/examples/dropdown-menu-radio")
    ),
    files: ["registry/new-york/examples/dropdown-menu-radio.tsx"],
  },
  "dropdown-menu-with-icons": {
    name: "dropdown-menu-with-icons",
    component: React.lazy(
      () => import("./new-york/examples/dropdown-menu-with-icons")
    ),
    files: ["registry/new-york/examples/dropdown-menu-with-icons.tsx"],
  },

  // Input examples
  "input-default": {
    name: "input-default",
    component: React.lazy(() => import("./new-york/examples/input-default")),
    files: ["registry/new-york/examples/input-default.tsx"],
  },
  "input-demo": {
    name: "input-demo",
    component: React.lazy(() => import("./new-york/examples/input-demo")),
    files: ["registry/new-york/examples/input-demo.tsx"],
  },
  "input-disabled": {
    name: "input-disabled",
    component: React.lazy(() => import("./new-york/examples/input-disabled")),
    files: ["registry/new-york/examples/input-disabled.tsx"],
  },
  "input-file": {
    name: "input-file",
    component: React.lazy(() => import("./new-york/examples/input-file")),
    files: ["registry/new-york/examples/input-file.tsx"],
  },
  "input-with-button": {
    name: "input-with-button",
    component: React.lazy(
      () => import("./new-york/examples/input-with-button")
    ),
    files: ["registry/new-york/examples/input-with-button.tsx"],
  },
  "input-with-label": {
    name: "input-with-label",
    component: React.lazy(() => import("./new-york/examples/input-with-label")),
    files: ["registry/new-york/examples/input-with-label.tsx"],
  },

  // Label examples
  "label-demo": {
    name: "label-demo",
    component: React.lazy(() => import("./new-york/examples/label-demo")),
    files: ["registry/new-york/examples/label-demo.tsx"],
  },
  "label-with-checkbox": {
    name: "label-with-checkbox",
    component: React.lazy(
      () => import("./new-york/examples/label-with-checkbox")
    ),
    files: ["registry/new-york/examples/label-with-checkbox.tsx"],
  },
  "label-with-input": {
    name: "label-with-input",
    component: React.lazy(() => import("./new-york/examples/label-with-input")),
    files: ["registry/new-york/examples/label-with-input.tsx"],
  },

  // Select examples
  "select-demo": {
    name: "select-demo",
    component: React.lazy(() => import("./new-york/examples/select-demo")),
    files: ["registry/new-york/examples/select-demo.tsx"],
  },
  "select-with-groups": {
    name: "select-with-groups",
    component: React.lazy(
      () => import("./new-york/examples/select-with-groups")
    ),
    files: ["registry/new-york/examples/select-with-groups.tsx"],
  },

  // Separator examples
  "separator-demo": {
    name: "separator-demo",
    component: React.lazy(() => import("./new-york/examples/separator-demo")),
    files: ["registry/new-york/examples/separator-demo.tsx"],
  },
  "separator-horizontal": {
    name: "separator-horizontal",
    component: React.lazy(
      () => import("./new-york/examples/separator-horizontal")
    ),
    files: ["registry/new-york/examples/separator-horizontal.tsx"],
  },
  "separator-vertical": {
    name: "separator-vertical",
    component: React.lazy(
      () => import("./new-york/examples/separator-vertical")
    ),
    files: ["registry/new-york/examples/separator-vertical.tsx"],
  },

  // Switch examples
  "switch-demo": {
    name: "switch-demo",
    component: React.lazy(() => import("./new-york/examples/switch-demo")),
    files: ["registry/new-york/examples/switch-demo.tsx"],
  },
  "switch-disabled": {
    name: "switch-disabled",
    component: React.lazy(() => import("./new-york/examples/switch-disabled")),
    files: ["registry/new-york/examples/switch-disabled.tsx"],
  },
  "switch-with-label": {
    name: "switch-with-label",
    component: React.lazy(
      () => import("./new-york/examples/switch-with-label")
    ),
    files: ["registry/new-york/examples/switch-with-label.tsx"],
  },

  // Tabs examples
  "tabs-demo": {
    name: "tabs-demo",
    component: React.lazy(() => import("./new-york/examples/tabs-demo")),
    files: ["registry/new-york/examples/tabs-demo.tsx"],
  },
  "tabs-underline": {
    name: "tabs-underline",
    component: React.lazy(() => import("./new-york/examples/tabs-underline")),
    files: ["registry/new-york/examples/tabs-underline.tsx"],
  },
  "tabs-with-cards": {
    name: "tabs-with-cards",
    component: React.lazy(() => import("./new-york/examples/tabs-with-cards")),
    files: ["registry/new-york/examples/tabs-with-cards.tsx"],
  },

  // Textarea examples
  "textarea-default": {
    name: "textarea-default",
    component: React.lazy(() => import("./new-york/examples/textarea-default")),
    files: ["registry/new-york/examples/textarea-default.tsx"],
  },
  "textarea-demo": {
    name: "textarea-demo",
    component: React.lazy(() => import("./new-york/examples/textarea-demo")),
    files: ["registry/new-york/examples/textarea-demo.tsx"],
  },
  "textarea-disabled": {
    name: "textarea-disabled",
    component: React.lazy(
      () => import("./new-york/examples/textarea-disabled")
    ),
    files: ["registry/new-york/examples/textarea-disabled.tsx"],
  },
  "textarea-with-label": {
    name: "textarea-with-label",
    component: React.lazy(
      () => import("./new-york/examples/textarea-with-label")
    ),
    files: ["registry/new-york/examples/textarea-with-label.tsx"],
  },
  "textarea-with-text": {
    name: "textarea-with-text",
    component: React.lazy(
      () => import("./new-york/examples/textarea-with-text")
    ),
    files: ["registry/new-york/examples/textarea-with-text.tsx"],
  },

  // Tooltip examples
  "tooltip-demo": {
    name: "tooltip-demo",
    component: React.lazy(() => import("./new-york/examples/tooltip-demo")),
    files: ["registry/new-york/examples/tooltip-demo.tsx"],
  },
}
