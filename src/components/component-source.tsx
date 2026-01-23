import { promises as fs } from "fs"
import path from "path"
import * as React from "react"

import { highlightCode } from "@/lib/highlight-code"
import { cn } from "@/lib/utils"
import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper"
import { CopyButton } from "@/components/copy-button"

export async function ComponentSource({
  name,
  src,
  title,
  language,
  collapsible = true,
  className,
  maxLines,
}: React.ComponentProps<"div"> & {
  name?: string
  src?: string
  title?: string
  language?: string
  collapsible?: boolean
  maxLines?: number
}) {
  if (!name && !src) {
    return null
  }

  let code: string | undefined

  if (name) {
    // Try to load from examples first, then from ui
    const examplePath = path.join(
      process.cwd(),
      `registry/new-york/examples/${name}.tsx`
    )
    const uiPath = path.join(process.cwd(), `registry/new-york/ui/${name}.tsx`)

    try {
      code = await fs.readFile(examplePath, "utf-8")
    } catch {
      try {
        code = await fs.readFile(uiPath, "utf-8")
      } catch {
        // File not found
      }
    }
  }

  if (src) {
    try {
      const file = await fs.readFile(path.join(process.cwd(), src), "utf-8")
      code = file
    } catch {
      // File not found
    }
  }

  if (!code) {
    return null
  }

  // Fix imports
  code = code.replaceAll(`@/registry/new-york/`, "@/components/")
  code = code.replaceAll(`@/registry/default/`, "@/components/")
  code = code.replaceAll("export default", "export")

  // Truncate code if maxLines is set
  if (maxLines) {
    code = code.split("\n").slice(0, maxLines).join("\n")
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx"
  const highlightedCode = await highlightCode(code, lang)

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    )
  }

  return (
    <CodeCollapsibleWrapper className={className}>
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  )
}

function ComponentCode({
  code,
  highlightedCode,
  language,
  title,
}: {
  code: string
  highlightedCode: string
  language: string
  title: string | undefined
}) {
  return (
    <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
      {title && (
        <figcaption
          data-rehype-pretty-code-title=""
          className="text-code-foreground flex items-center gap-2"
          data-language={language}
        >
          {title}
        </figcaption>
      )}
      <CopyButton value={code} />
      <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
    </figure>
  )
}
