"use client"

import * as React from "react"
import { Check, Copy, Terminal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { copyToClipboardWithMeta } from "@/components/copy-button"

type PackageManager = "pnpm" | "npm" | "yarn" | "bun"
const PM_STORAGE_KEY = "nessra-ui-pm"

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string
  __yarn__?: string
  __pnpm__?: string
  __bun__?: string
}) {
  const [packageManager, setPackageManager] =
    React.useState<PackageManager>("pnpm")
  const [hasCopied, setHasCopied] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(PM_STORAGE_KEY) as PackageManager | null
    if (stored && ["pnpm", "npm", "yarn", "bun"].includes(stored)) {
      setPackageManager(stored)
    }
  }, [])

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [hasCopied])

  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    }
  }, [__npm__, __pnpm__, __yarn__, __bun__])

  const handleValueChange = (value: string) => {
    const pm = value as PackageManager
    setPackageManager(pm)
    localStorage.setItem(PM_STORAGE_KEY, pm)
  }

  const copyCommand = React.useCallback(() => {
    const command = tabs[packageManager]
    if (!command) return
    copyToClipboardWithMeta(command)
    setHasCopied(true)
  }, [packageManager, tabs])

  if (!mounted) {
    return (
      <div className="overflow-x-auto">
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <Terminal className="text-code size-3" />
          </div>
          <div className="text-muted-foreground flex gap-4 font-sans text-sm">
            {Object.keys(tabs).map((key) => (
              <span key={key} className="py-1">
                {key}
              </span>
            ))}
          </div>
        </div>
        <div className="no-scrollbar overflow-x-auto px-4 py-3.5">
          <pre>
            <code
              className="relative font-mono text-sm leading-none"
              data-language="bash"
            >
              {__pnpm__ || __npm__}
            </code>
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={handleValueChange}
      >
        <div className="border-border/50 flex items-center gap-2 border-b px-3 py-1">
          <div className="bg-foreground flex size-4 items-center justify-center rounded-[1px] opacity-70">
            <Terminal className="text-code size-3" />
          </div>
          <TabsList className="rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="bg-transparent font-sans"
              >
                {key}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto">
          {Object.entries(tabs).map(([key, value]) => (
            <TabsContent key={key} value={key} className="mt-0 px-4 py-3.5">
              <pre>
                <code
                  className="relative font-mono text-sm leading-none"
                  data-language="bash"
                >
                  {value}
                </code>
              </pre>
            </TabsContent>
          ))}
        </div>
      </Tabs>
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
      </Button>
    </div>
  )
}
