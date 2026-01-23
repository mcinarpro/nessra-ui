"use client"

import * as React from "react"

import { Tabs } from "@/components/ui/tabs"

const INSTALL_TYPE_KEY = "nessra-ui-install-type"

export function CodeTabs({ children }: React.ComponentProps<typeof Tabs>) {
  const [installationType, setInstallationType] = React.useState<
    "cli" | "manual"
  >("cli")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(INSTALL_TYPE_KEY) as
      | "cli"
      | "manual"
      | null
    if (stored && ["cli", "manual"].includes(stored)) {
      setInstallationType(stored)
    }
  }, [])

  const handleValueChange = (value: string) => {
    const type = value as "cli" | "manual"
    setInstallationType(type)
    localStorage.setItem(INSTALL_TYPE_KEY, type)
  }

  if (!mounted) {
    return (
      <Tabs value="cli" className="relative mt-6 w-full gap-4">
        {children}
      </Tabs>
    )
  }

  return (
    <Tabs
      value={installationType}
      onValueChange={handleValueChange}
      className="relative mt-6 w-full gap-4"
    >
      {children}
    </Tabs>
  )
}
