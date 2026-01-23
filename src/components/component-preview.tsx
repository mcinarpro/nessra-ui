import * as React from "react"

import { ComponentPreviewTabs } from "@/components/component-preview-tabs"
import { ComponentSource } from "@/components/component-source"
import { Index } from "@/registry/__index__"

export function ComponentPreview({
  name,
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  ...props
}: React.ComponentProps<"div"> & {
  name: string
  previewClassName?: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  chromeLessOnMobile?: boolean
}) {
  const Component = Index[name]?.component

  if (!Component) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    )
  }

  return (
    <ComponentPreviewTabs
      className={className}
      previewClassName={previewClassName}
      align={align}
      hideCode={hideCode}
      component={
        <React.Suspense
          fallback={
            <div className="text-muted-foreground flex items-center text-sm">
              Loading...
            </div>
          }
        >
          <Component />
        </React.Suspense>
      }
      source={<ComponentSource name={name} collapsible={false} />}
      sourcePreview={
        <ComponentSource name={name} collapsible={false} maxLines={3} />
      }
      chromeLessOnMobile={chromeLessOnMobile}
      {...props}
    />
  )
}
