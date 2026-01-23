import * as React from "react"

export interface RegistryEntry {
  name: string
  component: React.LazyExoticComponent<React.ComponentType<unknown>>
  files: string[]
}

export const Index: Record<string, RegistryEntry> = {
  // Button examples
  "button-demo": {
    name: "button-demo",
    component: React.lazy(() => import("./new-york/examples/button-demo")),
    files: ["registry/new-york/examples/button-demo.tsx"],
  },
  "button-secondary": {
    name: "button-secondary",
    component: React.lazy(() => import("./new-york/examples/button-secondary")),
    files: ["registry/new-york/examples/button-secondary.tsx"],
  },
  "button-destructive": {
    name: "button-destructive",
    component: React.lazy(
      () => import("./new-york/examples/button-destructive")
    ),
    files: ["registry/new-york/examples/button-destructive.tsx"],
  },
  "button-outline": {
    name: "button-outline",
    component: React.lazy(() => import("./new-york/examples/button-outline")),
    files: ["registry/new-york/examples/button-outline.tsx"],
  },
  "button-ghost": {
    name: "button-ghost",
    component: React.lazy(() => import("./new-york/examples/button-ghost")),
    files: ["registry/new-york/examples/button-ghost.tsx"],
  },
  "button-link": {
    name: "button-link",
    component: React.lazy(() => import("./new-york/examples/button-link")),
    files: ["registry/new-york/examples/button-link.tsx"],
  },
  "button-icon": {
    name: "button-icon",
    component: React.lazy(() => import("./new-york/examples/button-icon")),
    files: ["registry/new-york/examples/button-icon.tsx"],
  },
  "button-with-icon": {
    name: "button-with-icon",
    component: React.lazy(() => import("./new-york/examples/button-with-icon")),
    files: ["registry/new-york/examples/button-with-icon.tsx"],
  },
  "button-loading": {
    name: "button-loading",
    component: React.lazy(() => import("./new-york/examples/button-loading")),
    files: ["registry/new-york/examples/button-loading.tsx"],
  },
  // Tooltip examples
  "tooltip-demo": {
    name: "tooltip-demo",
    component: React.lazy(() => import("./new-york/examples/tooltip-demo")),
    files: ["registry/new-york/examples/tooltip-demo.tsx"],
  },
  // Collapsible examples
  "collapsible-demo": {
    name: "collapsible-demo",
    component: React.lazy(() => import("./new-york/examples/collapsible-demo")),
    files: ["registry/new-york/examples/collapsible-demo.tsx"],
  },
}
