"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { cn } from "@/registry/new-york/lib/utils"
import { Button } from "@/registry/new-york/ui/button"

interface CopyButtonProps extends Omit<
  React.ComponentProps<typeof Button>,
  "onClick"
> {
  value: string
  onCopy?: () => void
  timeout?: number
}

function CopyButton({
  value,
  onCopy,
  timeout = 2000,
  className,
  variant = "outline",
  size = "icon",
  children,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      onCopy?.()
      setTimeout(() => setCopied(false), timeout)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [value, onCopy, timeout])

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={cn("relative", className)}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      {...props}
    >
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity",
          copied ? "opacity-100" : "opacity-0"
        )}
      >
        <CheckIcon className="size-4 text-green-500" />
      </span>
      <span
        className={cn(
          "flex items-center justify-center transition-opacity",
          copied ? "opacity-0" : "opacity-100"
        )}
      >
        {children ?? <CopyIcon className="size-4" />}
      </span>
    </Button>
  )
}

export { CopyButton }
export type { CopyButtonProps }
