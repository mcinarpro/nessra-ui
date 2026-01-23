"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Check, ChevronDown, Copy } from "lucide-react"

import { cn } from "@/lib/utils"
import { useCopyToClipboard } from "@/registry/new-york/hooks/use-copy-to-clipboard"
import { Button } from "@/registry/new-york/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu"

import { Icons } from "./icons"

function getPromptUrl(baseURL: string, url: string) {
  return `${baseURL}?q=${encodeURIComponent(
    `I'm looking at this @nessra-ui documentation: ${url}. Help me understand how to use it. Be ready to explain concepts, give examples, or help debug based on it.`
  )}`
}

interface DocsCopyPageProps extends React.ComponentProps<"div"> {
  page: string
  url: string
}

export function DocsCopyPage({
  page,
  url,
  className,
  ...props
}: DocsCopyPageProps) {
  const { slug } = useParams<{ slug: string[] }>()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  if (!slug) return null

  const menuItems = [
    {
      label: "View as Markdown",
      href: `/llms.mdx/docs/${slug.join("/")}`,
      icon: <Icons.markdown />,
    },
    {
      label: "Open in ChatGPT",
      href: getPromptUrl("https://chatgpt.com", url),
      icon: <Icons.openai />,
    },
    {
      label: "Open in Claude",
      href: getPromptUrl("https://claude.ai/new", url),
      icon: <Icons.claude />,
    },
    {
      label: "Open in v0",
      href: getPromptUrl("https://v0.dev", url),
      icon: <Icons.v0 />,
    },
  ]

  return (
    <div className={cn("relative flex items-center", className)} {...props}>
      <Button
        variant="secondary"
        size="sm"
        className="h-8 rounded-e-none border-e-0 text-xs"
        onClick={() => copyToClipboard(page)}
      >
        {isCopied ? (
          <Check className="size-3.5" />
        ) : (
          <Copy className="size-3.5" />
        )}
        Copy Page
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon-sm"
            variant="secondary"
            className="border-s-foreground/10 size-8 rounded-s-none border-s"
          >
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {menuItems.map((menuItem) => (
            <DropdownMenuItem key={menuItem.label} asChild>
              <Link
                href={menuItem.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                {menuItem.icon} {menuItem.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
