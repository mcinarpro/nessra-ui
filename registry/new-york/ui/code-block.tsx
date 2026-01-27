"use client"

import * as React from "react"
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from "shiki"

import { cn } from "@/registry/new-york/lib/utils"
import { CopyButton } from "@/registry/new-york/ui/copy-button"
import { ScrollArea, ScrollBar } from "@/registry/new-york/ui/scroll-area"

// Singleton highlighter cache
let highlighterPromise: Promise<
  HighlighterGeneric<BundledLanguage, BundledTheme>
> | null = null

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((shiki) =>
      shiki.createHighlighter({
        themes: ["github-dark-default", "github-light-default"],
        langs: [
          "typescript",
          "javascript",
          "tsx",
          "jsx",
          "json",
          "html",
          "css",
          "bash",
          "markdown",
          "plaintext",
        ],
      })
    )
  }
  return highlighterPromise
}

interface CodeBlockProps extends React.ComponentProps<"div"> {
  code: string
  language?: string
  showLineNumbers?: boolean
  showCopyButton?: boolean
  maxHeight?: string | number
}

function CodeBlock({
  code,
  language = "plaintext",
  showLineNumbers = false,
  showCopyButton = true,
  maxHeight,
  className,
  ...props
}: CodeBlockProps) {
  const [html, setHtml] = React.useState<string | null>(null)
  const [resolvedTheme, setResolvedTheme] = React.useState<string>(
    "github-dark-default"
  )

  const lineCount = code.split("\n").length

  // Get background color based on theme
  const bgColor =
    resolvedTheme === "github-light-default" ? "#ffffff" : "#0d1117"

  // Detect system/page theme
  React.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark")
    setResolvedTheme(isDark ? "github-dark-default" : "github-light-default")

    const observer = new MutationObserver(() => {
      const isDarkNow = document.documentElement.classList.contains("dark")
      setResolvedTheme(
        isDarkNow ? "github-dark-default" : "github-light-default"
      )
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    let cancelled = false

    async function highlight() {
      const highlighter = await getHighlighter()

      // Load language if not already loaded
      const loadedLangs = highlighter.getLoadedLanguages()
      if (!loadedLangs.includes(language as BundledLanguage)) {
        try {
          await highlighter.loadLanguage(language as BundledLanguage)
        } catch {
          // Fallback to plaintext if language not supported
        }
      }

      const result = highlighter.codeToHtml(code, {
        lang: loadedLangs.includes(language as BundledLanguage)
          ? language
          : "plaintext",
        theme: resolvedTheme as BundledTheme,
      })

      if (!cancelled) {
        setHtml(result)
      }
    }

    highlight()

    return () => {
      cancelled = true
    }
  }, [code, language, resolvedTheme])

  return (
    <div
      data-slot="code-block"
      className={cn("relative overflow-hidden rounded-lg border", className)}
      {...props}
    >
      {(language || showCopyButton) && (
        <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-2">
          {language && (
            <span className="text-muted-foreground text-xs font-medium uppercase">
              {language}
            </span>
          )}
          {showCopyButton && (
            <CopyButton
              value={code}
              variant="ghost"
              size="sm"
              className="h-7 w-7"
            />
          )}
        </div>
      )}
      <ScrollArea
        style={{ maxHeight: maxHeight ?? "400px" }}
        className="relative"
      >
        <div className="flex" style={{ backgroundColor: bgColor }}>
          {showLineNumbers && (
            <div
              className="shrink-0 py-4 pr-2 pl-4 text-right text-sm leading-relaxed select-none"
              style={{
                color:
                  resolvedTheme === "github-light-default"
                    ? "#636c76"
                    : "#6e7681",
              }}
              aria-hidden="true"
            >
              {Array.from({ length: lineCount }, (_, i) => (
                <div key={i + 1}>{i + 1}</div>
              ))}
            </div>
          )}
          {html ? (
            <div
              className={cn(
                "min-w-0 flex-1 text-sm [&>pre]:overflow-x-auto [&>pre]:!bg-transparent [&>pre]:py-4 [&>pre]:pr-4 [&>pre]:leading-relaxed",
                showLineNumbers ? "[&>pre]:pl-0" : "[&>pre]:pl-4"
              )}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre
              className={cn(
                "min-w-0 flex-1 overflow-x-auto py-4 pr-4 text-sm leading-relaxed",
                showLineNumbers ? "pl-0" : "pl-4"
              )}
            >
              <code className="font-mono">{code}</code>
            </pre>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
