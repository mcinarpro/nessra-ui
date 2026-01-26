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

  // Alert examples
  "alert-demo": {
    name: "alert-demo",
    component: React.lazy(() => import("./new-york/examples/alert-demo")),
    files: ["registry/new-york/examples/alert-demo.tsx"],
  },
  "alert-destructive": {
    name: "alert-destructive",
    component: React.lazy(
      () => import("./new-york/examples/alert-destructive")
    ),
    files: ["registry/new-york/examples/alert-destructive.tsx"],
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

  // Aspect Ratio examples
  "aspect-ratio-demo": {
    name: "aspect-ratio-demo",
    component: React.lazy(
      () => import("./new-york/examples/aspect-ratio-demo")
    ),
    files: ["registry/new-york/examples/aspect-ratio-demo.tsx"],
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

  // Breadcrumb examples
  "breadcrumb-demo": {
    name: "breadcrumb-demo",
    component: React.lazy(() => import("./new-york/examples/breadcrumb-demo")),
    files: ["registry/new-york/examples/breadcrumb-demo.tsx"],
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
  "button-group-demo": {
    name: "button-group-demo",
    component: React.lazy(
      () => import("./new-york/examples/button-group-demo")
    ),
    files: ["registry/new-york/examples/button-group-demo.tsx"],
  },
  "button-group-vertical": {
    name: "button-group-vertical",
    component: React.lazy(
      () => import("./new-york/examples/button-group-vertical")
    ),
    files: ["registry/new-york/examples/button-group-vertical.tsx"],
  },
  "button-group-with-icons": {
    name: "button-group-with-icons",
    component: React.lazy(
      () => import("./new-york/examples/button-group-with-icons")
    ),
    files: ["registry/new-york/examples/button-group-with-icons.tsx"],
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

  // Calendar examples
  "calendar-demo": {
    name: "calendar-demo",
    component: React.lazy(() => import("./new-york/examples/calendar-demo")),
    files: ["registry/new-york/examples/calendar-demo.tsx"],
  },
  "calendar-multiple-months": {
    name: "calendar-multiple-months",
    component: React.lazy(
      () => import("./new-york/examples/calendar-multiple-months")
    ),
    files: ["registry/new-york/examples/calendar-multiple-months.tsx"],
  },
  "calendar-with-dropdown": {
    name: "calendar-with-dropdown",
    component: React.lazy(
      () => import("./new-york/examples/calendar-with-dropdown")
    ),
    files: ["registry/new-york/examples/calendar-with-dropdown.tsx"],
  },
  "calendar-with-range": {
    name: "calendar-with-range",
    component: React.lazy(
      () => import("./new-york/examples/calendar-with-range")
    ),
    files: ["registry/new-york/examples/calendar-with-range.tsx"],
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

  // Chart examples
  "chart-area": {
    name: "chart-area",
    component: React.lazy(() => import("./new-york/examples/chart-area")),
    files: ["registry/new-york/examples/chart-area.tsx"],
  },
  "chart-demo": {
    name: "chart-demo",
    component: React.lazy(() => import("./new-york/examples/chart-demo")),
    files: ["registry/new-york/examples/chart-demo.tsx"],
  },
  "chart-line": {
    name: "chart-line",
    component: React.lazy(() => import("./new-york/examples/chart-line")),
    files: ["registry/new-york/examples/chart-line.tsx"],
  },
  "chart-pie": {
    name: "chart-pie",
    component: React.lazy(() => import("./new-york/examples/chart-pie")),
    files: ["registry/new-york/examples/chart-pie.tsx"],
  },
  "chart-radar": {
    name: "chart-radar",
    component: React.lazy(() => import("./new-york/examples/chart-radar")),
    files: ["registry/new-york/examples/chart-radar.tsx"],
  },
  "chart-with-legend": {
    name: "chart-with-legend",
    component: React.lazy(
      () => import("./new-york/examples/chart-with-legend")
    ),
    files: ["registry/new-york/examples/chart-with-legend.tsx"],
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

  // Code examples
  "code-block-demo": {
    name: "code-block-demo",
    component: React.lazy(() => import("./new-york/examples/code-block-demo")),
    files: ["registry/new-york/examples/code-block-demo.tsx"],
  },
  "code-block-line-numbers": {
    name: "code-block-line-numbers",
    component: React.lazy(
      () => import("./new-york/examples/code-block-line-numbers")
    ),
    files: ["registry/new-york/examples/code-block-line-numbers.tsx"],
  },
  "code-block-simple": {
    name: "code-block-simple",
    component: React.lazy(
      () => import("./new-york/examples/code-block-simple")
    ),
    files: ["registry/new-york/examples/code-block-simple.tsx"],
  },

  // Collapsible examples
  "collapsible-demo": {
    name: "collapsible-demo",
    component: React.lazy(() => import("./new-york/examples/collapsible-demo")),
    files: ["registry/new-york/examples/collapsible-demo.tsx"],
  },

  // Combobox examples
  "combobox-clear": {
    name: "combobox-clear",
    component: React.lazy(() => import("./new-york/examples/combobox-clear")),
    files: ["registry/new-york/examples/combobox-clear.tsx"],
  },
  "combobox-demo": {
    name: "combobox-demo",
    component: React.lazy(() => import("./new-york/examples/combobox-demo")),
    files: ["registry/new-york/examples/combobox-demo.tsx"],
  },
  "combobox-multiple": {
    name: "combobox-multiple",
    component: React.lazy(
      () => import("./new-york/examples/combobox-multiple")
    ),
    files: ["registry/new-york/examples/combobox-multiple.tsx"],
  },
  "combobox-objects": {
    name: "combobox-objects",
    component: React.lazy(() => import("./new-york/examples/combobox-objects")),
    files: ["registry/new-york/examples/combobox-objects.tsx"],
  },

  // Command examples
  "command-demo": {
    name: "command-demo",
    component: React.lazy(() => import("./new-york/examples/command-demo")),
    files: ["registry/new-york/examples/command-demo.tsx"],
  },
  "command-dialog": {
    name: "command-dialog",
    component: React.lazy(() => import("./new-york/examples/command-dialog")),
    files: ["registry/new-york/examples/command-dialog.tsx"],
  },

  // Copy examples
  "copy-button-custom": {
    name: "copy-button-custom",
    component: React.lazy(
      () => import("./new-york/examples/copy-button-custom")
    ),
    files: ["registry/new-york/examples/copy-button-custom.tsx"],
  },
  "copy-button-demo": {
    name: "copy-button-demo",
    component: React.lazy(() => import("./new-york/examples/copy-button-demo")),
    files: ["registry/new-york/examples/copy-button-demo.tsx"],
  },
  "copy-button-with-text": {
    name: "copy-button-with-text",
    component: React.lazy(
      () => import("./new-york/examples/copy-button-with-text")
    ),
    files: ["registry/new-york/examples/copy-button-with-text.tsx"],
  },

  // Data Table examples
  "data-table-advanced": {
    name: "data-table-advanced",
    component: React.lazy(
      () => import("./new-york/examples/data-table-advanced")
    ),
    files: ["registry/new-york/examples/data-table-advanced.tsx"],
  },
  "data-table-demo": {
    name: "data-table-demo",
    component: React.lazy(() => import("./new-york/examples/data-table-demo")),
    files: ["registry/new-york/examples/data-table-demo.tsx"],
  },
  "data-table-loading": {
    name: "data-table-loading",
    component: React.lazy(
      () => import("./new-york/examples/data-table-loading")
    ),
    files: ["registry/new-york/examples/data-table-loading.tsx"],
  },

  // Date examples
  "date-picker-demo": {
    name: "date-picker-demo",
    component: React.lazy(() => import("./new-york/examples/date-picker-demo")),
    files: ["registry/new-york/examples/date-picker-demo.tsx"],
  },
  "date-picker-dob": {
    name: "date-picker-dob",
    component: React.lazy(() => import("./new-york/examples/date-picker-dob")),
    files: ["registry/new-york/examples/date-picker-dob.tsx"],
  },
  "date-picker-with-presets": {
    name: "date-picker-with-presets",
    component: React.lazy(
      () => import("./new-york/examples/date-picker-with-presets")
    ),
    files: ["registry/new-york/examples/date-picker-with-presets.tsx"],
  },
  "date-picker-with-range": {
    name: "date-picker-with-range",
    component: React.lazy(
      () => import("./new-york/examples/date-picker-with-range")
    ),
    files: ["registry/new-york/examples/date-picker-with-range.tsx"],
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

  // Drawer examples
  "drawer-demo": {
    name: "drawer-demo",
    component: React.lazy(() => import("./new-york/examples/drawer-demo")),
    files: ["registry/new-york/examples/drawer-demo.tsx"],
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

  // Empty examples
  "empty-demo": {
    name: "empty-demo",
    component: React.lazy(() => import("./new-york/examples/empty-demo")),
    files: ["registry/new-york/examples/empty-demo.tsx"],
  },
  "empty-icon": {
    name: "empty-icon",
    component: React.lazy(() => import("./new-york/examples/empty-icon")),
    files: ["registry/new-york/examples/empty-icon.tsx"],
  },

  // Field examples
  "field-demo": {
    name: "field-demo",
    component: React.lazy(() => import("./new-york/examples/field-demo")),
    files: ["registry/new-york/examples/field-demo.tsx"],
  },
  "field-horizontal": {
    name: "field-horizontal",
    component: React.lazy(() => import("./new-york/examples/field-horizontal")),
    files: ["registry/new-york/examples/field-horizontal.tsx"],
  },
  "field-with-error": {
    name: "field-with-error",
    component: React.lazy(() => import("./new-york/examples/field-with-error")),
    files: ["registry/new-york/examples/field-with-error.tsx"],
  },

  // Form examples
  "form-array": {
    name: "form-array",
    component: React.lazy(() => import("./new-york/examples/form-array")),
    files: ["registry/new-york/examples/form-array.tsx"],
  },
  "form-demo": {
    name: "form-demo",
    component: React.lazy(() => import("./new-york/examples/form-demo")),
    files: ["registry/new-york/examples/form-demo.tsx"],
  },
  "form-fields": {
    name: "form-fields",
    component: React.lazy(() => import("./new-york/examples/form-fields")),
    files: ["registry/new-york/examples/form-fields.tsx"],
  },
  "form-validation": {
    name: "form-validation",
    component: React.lazy(() => import("./new-york/examples/form-validation")),
    files: ["registry/new-york/examples/form-validation.tsx"],
  },

  // Hover Card examples
  "hover-card-demo": {
    name: "hover-card-demo",
    component: React.lazy(() => import("./new-york/examples/hover-card-demo")),
    files: ["registry/new-york/examples/hover-card-demo.tsx"],
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
  "input-group-button": {
    name: "input-group-button",
    component: React.lazy(
      () => import("./new-york/examples/input-group-button")
    ),
    files: ["registry/new-york/examples/input-group-button.tsx"],
  },
  "input-group-demo": {
    name: "input-group-demo",
    component: React.lazy(() => import("./new-york/examples/input-group-demo")),
    files: ["registry/new-york/examples/input-group-demo.tsx"],
  },
  "input-group-text": {
    name: "input-group-text",
    component: React.lazy(() => import("./new-york/examples/input-group-text")),
    files: ["registry/new-york/examples/input-group-text.tsx"],
  },
  "input-otp-controlled": {
    name: "input-otp-controlled",
    component: React.lazy(
      () => import("./new-york/examples/input-otp-controlled")
    ),
    files: ["registry/new-york/examples/input-otp-controlled.tsx"],
  },
  "input-otp-demo": {
    name: "input-otp-demo",
    component: React.lazy(() => import("./new-york/examples/input-otp-demo")),
    files: ["registry/new-york/examples/input-otp-demo.tsx"],
  },
  "input-otp-pattern": {
    name: "input-otp-pattern",
    component: React.lazy(
      () => import("./new-york/examples/input-otp-pattern")
    ),
    files: ["registry/new-york/examples/input-otp-pattern.tsx"],
  },
  "input-otp-separator": {
    name: "input-otp-separator",
    component: React.lazy(
      () => import("./new-york/examples/input-otp-separator")
    ),
    files: ["registry/new-york/examples/input-otp-separator.tsx"],
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

  // Number examples
  "number-input-controlled": {
    name: "number-input-controlled",
    component: React.lazy(
      () => import("./new-york/examples/number-input-controlled")
    ),
    files: ["registry/new-york/examples/number-input-controlled.tsx"],
  },
  "number-input-demo": {
    name: "number-input-demo",
    component: React.lazy(
      () => import("./new-york/examples/number-input-demo")
    ),
    files: ["registry/new-york/examples/number-input-demo.tsx"],
  },
  "number-input-disabled": {
    name: "number-input-disabled",
    component: React.lazy(
      () => import("./new-york/examples/number-input-disabled")
    ),
    files: ["registry/new-york/examples/number-input-disabled.tsx"],
  },
  "number-input-step": {
    name: "number-input-step",
    component: React.lazy(
      () => import("./new-york/examples/number-input-step")
    ),
    files: ["registry/new-york/examples/number-input-step.tsx"],
  },

  // Pagination examples
  "pagination-demo": {
    name: "pagination-demo",
    component: React.lazy(() => import("./new-york/examples/pagination-demo")),
    files: ["registry/new-york/examples/pagination-demo.tsx"],
  },

  // Popover examples
  "popover-demo": {
    name: "popover-demo",
    component: React.lazy(() => import("./new-york/examples/popover-demo")),
    files: ["registry/new-york/examples/popover-demo.tsx"],
  },

  // Progress examples
  "progress-demo": {
    name: "progress-demo",
    component: React.lazy(() => import("./new-york/examples/progress-demo")),
    files: ["registry/new-york/examples/progress-demo.tsx"],
  },

  // Radio Group examples
  "radio-group-demo": {
    name: "radio-group-demo",
    component: React.lazy(() => import("./new-york/examples/radio-group-demo")),
    files: ["registry/new-york/examples/radio-group-demo.tsx"],
  },

  // Scroll Area examples
  "scroll-area-demo": {
    name: "scroll-area-demo",
    component: React.lazy(() => import("./new-york/examples/scroll-area-demo")),
    files: ["registry/new-york/examples/scroll-area-demo.tsx"],
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

  // Sheet examples
  "sheet-demo": {
    name: "sheet-demo",
    component: React.lazy(() => import("./new-york/examples/sheet-demo")),
    files: ["registry/new-york/examples/sheet-demo.tsx"],
  },
  "sheet-side": {
    name: "sheet-side",
    component: React.lazy(() => import("./new-york/examples/sheet-side")),
    files: ["registry/new-york/examples/sheet-side.tsx"],
  },

  // Sidebar examples
  "sidebar-demo": {
    name: "sidebar-demo",
    component: React.lazy(() => import("./new-york/examples/sidebar-demo")),
    files: ["registry/new-york/examples/sidebar-demo.tsx"],
  },

  // Skeleton examples
  "skeleton-card": {
    name: "skeleton-card",
    component: React.lazy(() => import("./new-york/examples/skeleton-card")),
    files: ["registry/new-york/examples/skeleton-card.tsx"],
  },
  "skeleton-demo": {
    name: "skeleton-demo",
    component: React.lazy(() => import("./new-york/examples/skeleton-demo")),
    files: ["registry/new-york/examples/skeleton-demo.tsx"],
  },

  // Slider examples
  "slider-demo": {
    name: "slider-demo",
    component: React.lazy(() => import("./new-york/examples/slider-demo")),
    files: ["registry/new-york/examples/slider-demo.tsx"],
  },

  // Sonner examples
  "sonner-demo": {
    name: "sonner-demo",
    component: React.lazy(() => import("./new-york/examples/sonner-demo")),
    files: ["registry/new-york/examples/sonner-demo.tsx"],
  },
  "sonner-types": {
    name: "sonner-types",
    component: React.lazy(() => import("./new-york/examples/sonner-types")),
    files: ["registry/new-york/examples/sonner-types.tsx"],
  },

  // Spinner examples
  "spinner-button": {
    name: "spinner-button",
    component: React.lazy(() => import("./new-york/examples/spinner-button")),
    files: ["registry/new-york/examples/spinner-button.tsx"],
  },
  "spinner-demo": {
    name: "spinner-demo",
    component: React.lazy(() => import("./new-york/examples/spinner-demo")),
    files: ["registry/new-york/examples/spinner-demo.tsx"],
  },
  "spinner-sizes": {
    name: "spinner-sizes",
    component: React.lazy(() => import("./new-york/examples/spinner-sizes")),
    files: ["registry/new-york/examples/spinner-sizes.tsx"],
  },

  // Stat examples
  "stat-card-basic": {
    name: "stat-card-basic",
    component: React.lazy(() => import("./new-york/examples/stat-card-basic")),
    files: ["registry/new-york/examples/stat-card-basic.tsx"],
  },
  "stat-card-demo": {
    name: "stat-card-demo",
    component: React.lazy(() => import("./new-york/examples/stat-card-demo")),
    files: ["registry/new-york/examples/stat-card-demo.tsx"],
  },
  "stat-card-grid": {
    name: "stat-card-grid",
    component: React.lazy(() => import("./new-york/examples/stat-card-grid")),
    files: ["registry/new-york/examples/stat-card-grid.tsx"],
  },
  "stat-card-negative-trend": {
    name: "stat-card-negative-trend",
    component: React.lazy(
      () => import("./new-york/examples/stat-card-negative-trend")
    ),
    files: ["registry/new-york/examples/stat-card-negative-trend.tsx"],
  },
  "stat-card-with-icon": {
    name: "stat-card-with-icon",
    component: React.lazy(
      () => import("./new-york/examples/stat-card-with-icon")
    ),
    files: ["registry/new-york/examples/stat-card-with-icon.tsx"],
  },
  "stat-card-with-trend": {
    name: "stat-card-with-trend",
    component: React.lazy(
      () => import("./new-york/examples/stat-card-with-trend")
    ),
    files: ["registry/new-york/examples/stat-card-with-trend.tsx"],
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

  // Table examples
  "table-demo": {
    name: "table-demo",
    component: React.lazy(() => import("./new-york/examples/table-demo")),
    files: ["registry/new-york/examples/table-demo.tsx"],
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

  // Tag examples
  "tag-input-controlled": {
    name: "tag-input-controlled",
    component: React.lazy(
      () => import("./new-york/examples/tag-input-controlled")
    ),
    files: ["registry/new-york/examples/tag-input-controlled.tsx"],
  },
  "tag-input-demo": {
    name: "tag-input-demo",
    component: React.lazy(() => import("./new-york/examples/tag-input-demo")),
    files: ["registry/new-york/examples/tag-input-demo.tsx"],
  },
  "tag-input-disabled": {
    name: "tag-input-disabled",
    component: React.lazy(
      () => import("./new-york/examples/tag-input-disabled")
    ),
    files: ["registry/new-york/examples/tag-input-disabled.tsx"],
  },
  "tag-input-max": {
    name: "tag-input-max",
    component: React.lazy(() => import("./new-york/examples/tag-input-max")),
    files: ["registry/new-york/examples/tag-input-max.tsx"],
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

  // Toggle examples
  "toggle-demo": {
    name: "toggle-demo",
    component: React.lazy(() => import("./new-york/examples/toggle-demo")),
    files: ["registry/new-york/examples/toggle-demo.tsx"],
  },
  "toggle-disabled": {
    name: "toggle-disabled",
    component: React.lazy(() => import("./new-york/examples/toggle-disabled")),
    files: ["registry/new-york/examples/toggle-disabled.tsx"],
  },
  "toggle-outline": {
    name: "toggle-outline",
    component: React.lazy(() => import("./new-york/examples/toggle-outline")),
    files: ["registry/new-york/examples/toggle-outline.tsx"],
  },
  "toggle-with-text": {
    name: "toggle-with-text",
    component: React.lazy(() => import("./new-york/examples/toggle-with-text")),
    files: ["registry/new-york/examples/toggle-with-text.tsx"],
  },

  // Toggle Group examples
  "toggle-group-demo": {
    name: "toggle-group-demo",
    component: React.lazy(
      () => import("./new-york/examples/toggle-group-demo")
    ),
    files: ["registry/new-york/examples/toggle-group-demo.tsx"],
  },
  "toggle-group-outline": {
    name: "toggle-group-outline",
    component: React.lazy(
      () => import("./new-york/examples/toggle-group-outline")
    ),
    files: ["registry/new-york/examples/toggle-group-outline.tsx"],
  },
  "toggle-group-single": {
    name: "toggle-group-single",
    component: React.lazy(
      () => import("./new-york/examples/toggle-group-single")
    ),
    files: ["registry/new-york/examples/toggle-group-single.tsx"],
  },

  // Tooltip examples
  "tooltip-demo": {
    name: "tooltip-demo",
    component: React.lazy(() => import("./new-york/examples/tooltip-demo")),
    files: ["registry/new-york/examples/tooltip-demo.tsx"],
  },

  // Typography examples
  "typography-demo": {
    name: "typography-demo",
    component: React.lazy(() => import("./new-york/examples/typography-demo")),
    files: ["registry/new-york/examples/typography-demo.tsx"],
  },
  // Blocks
  "dashboard-stats": {
    name: "dashboard-stats",
    component: React.lazy(() =>
      import("./new-york/blocks/dashboard-stats").then((m) => ({
        default: m.DashboardStats,
      }))
    ),
    files: ["registry/new-york/blocks/dashboard-stats.tsx"],
  },
  "forgot-password-form": {
    name: "forgot-password-form",
    component: React.lazy(() =>
      import("./new-york/blocks/forgot-password-form").then((m) => ({
        default: m.ForgotPasswordForm,
      }))
    ),
    files: ["registry/new-york/blocks/forgot-password-form.tsx"],
  },
  "reset-password-form": {
    name: "reset-password-form",
    component: React.lazy(() =>
      import("./new-york/blocks/reset-password-form").then((m) => ({
        default: m.ResetPasswordForm,
      }))
    ),
    files: ["registry/new-york/blocks/reset-password-form.tsx"],
  },
  "signin-form": {
    name: "signin-form",
    component: React.lazy(() =>
      import("./new-york/blocks/signin-form").then((m) => ({
        default: m.SigninForm,
      }))
    ),
    files: ["registry/new-york/blocks/signin-form.tsx"],
  },
  "signup-form": {
    name: "signup-form",
    component: React.lazy(() =>
      import("./new-york/blocks/signup-form").then((m) => ({
        default: m.SignupForm,
      }))
    ),
    files: ["registry/new-york/blocks/signup-form.tsx"],
  },
}
