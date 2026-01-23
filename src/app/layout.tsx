import type { Metadata } from "next"
import { RootProvider } from "fumadocs-ui/provider/next"

import "./global.css"

import { Geist, Geist_Mono } from "next/font/google"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://nessra-ui.vercel.app"),
  title: {
    default: "nessra ui",
    template: "%s | nessra ui",
  },
  description:
    "A beautiful component library built with Radix UI and Tailwind CSS.",
}

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <div className="root flex min-h-screen flex-col">
          <RootProvider theme={{ defaultTheme: "dark" }}>
            {children}
          </RootProvider>
        </div>
      </body>
    </html>
  )
}
