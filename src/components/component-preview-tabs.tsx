"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/registry/new-york/ui/button"

export function ComponentPreviewTabs({
  className,
  previewClassName,
  align = "center",
  hideCode = false,
  chromeLessOnMobile = false,
  component,
  source,
  sourcePreview,
  ...props
}: React.ComponentProps<"div"> & {
  previewClassName?: string
  align?: "center" | "start" | "end"
  hideCode?: boolean
  chromeLessOnMobile?: boolean
  component: React.ReactNode
  source: React.ReactNode
  sourcePreview?: React.ReactNode
}) {
  const [isCodeVisible, setIsCodeVisible] = React.useState(false)

  return (
    <div
      data-slot="component-preview"
      className={cn(
        "group relative mt-4 mb-12 flex flex-col gap-2 overflow-hidden rounded-xl border",
        className
      )}
      {...props}
    >
      <div data-slot="preview">
        <div
          data-align={align}
          data-chromeless={chromeLessOnMobile}
          className={cn(
            "preview not-prose flex h-72 w-full justify-center p-10 data-[align=center]:items-center data-[align=end]:items-end data-[align=start]:items-start data-[chromeless=true]:h-auto data-[chromeless=true]:p-0",
            previewClassName
          )}
        >
          {component}
        </div>
        {!hideCode && (
          <div
            data-slot="code"
            data-code-visible={isCodeVisible}
            className="relative overflow-hidden [&_[data-rehype-pretty-code-figure]]:!m-0 [&_[data-rehype-pretty-code-figure]]:rounded-t-none [&_[data-rehype-pretty-code-figure]]:border-t [&_pre]:max-h-72"
          >
            {isCodeVisible ? (
              source
            ) : (
              <div className="relative">
                {sourcePreview}
                <div className="absolute inset-0 flex items-center justify-center pb-4">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, var(--color-code), color-mix(in oklab, var(--color-code) 60%, transparent), transparent)",
                    }}
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="bg-background text-foreground dark:bg-background dark:text-foreground hover:bg-muted dark:hover:bg-muted relative z-10"
                    onClick={() => setIsCodeVisible(true)}
                  >
                    View Code
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
