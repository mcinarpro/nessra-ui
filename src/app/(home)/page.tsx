import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="mx-auto flex w-full max-w-(--fd-layout-width) flex-1 flex-col items-center justify-center border-x px-4 text-center">
      <Image
        src="/nessra-ui-logo.svg"
        alt="nessra ui"
        width={80}
        height={80}
        className="mb-4"
        priority
      />

      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        nessra ui
      </h1>
      <p className="text-muted-foreground max-w-xxl mt-4 text-lg text-balance">
        Beautiful, accessible React components built on Radix UI. Copy, paste,
        and customize.
      </p>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span>Open source</span>
        <span>·</span>
        <span>Fully typed</span>
        <span>·</span>
        <span>Production ready</span>
      </div>
      <div className="mt-8 flex gap-3">
        <Link
          href="/docs/get-started"
          className="bg-primary text-primary-foreground hover:bg-primary/80 inline-flex h-10 items-center justify-center rounded-4xl px-6 text-sm font-medium transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/docs/components"
          className="border-border bg-background text-foreground hover:bg-muted inline-flex h-10 items-center justify-center gap-2 rounded-4xl border px-6 text-sm font-medium transition-colors"
        >
          Components
        </Link>
      </div>
    </div>
  )
}
