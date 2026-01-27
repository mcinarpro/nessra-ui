"use client"

import * as React from "react"

import { NumberInput } from "@/registry/new-york/ui/number-input"

export default function NumberInputControlled() {
  const [value, setValue] = React.useState<number | undefined>(10)

  return (
    <div className="space-y-2">
      <NumberInput
        value={value}
        onChange={setValue}
        min={0}
        max={100}
        className="max-w-32"
      />
      <p className="text-muted-foreground text-sm">
        Value: <span className="font-mono">{value ?? "empty"}</span>
      </p>
    </div>
  )
}
