// Re-export cn from registry for convenience
export { cn } from "../../registry/new-york/lib/utils"

// Site-specific utility (not distributed to users)
export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || "https://nessra-ui.vercel.app"}${path}`
}
