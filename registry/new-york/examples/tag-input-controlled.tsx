"use client"

import * as React from "react"

import { TagInput } from "@/registry/new-york/ui/tag-input"

export default function TagInputControlled() {
  const [tags, setTags] = React.useState<string[]>(["Next.js", "Tailwind"])

  return (
    <div className="space-y-2">
      <TagInput value={tags} onChange={setTags} />
      <p className="text-muted-foreground text-sm">
        Tags: <span className="font-mono">{tags.join(", ") || "none"}</span>
      </p>
    </div>
  )
}
