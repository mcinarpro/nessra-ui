import Link from "next/link"

const blocks = [
  { name: "Sign In", href: "/docs/blocks/signin-form" },
  { name: "Sign Up", href: "/docs/blocks/signup-form" },
  { name: "Forgot Password", href: "/docs/blocks/forgot-password-form" },
  { name: "Reset Password", href: "/docs/blocks/reset-password-form" },
]

export function BlocksGrid() {
  return (
    <div className="not-prose grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {blocks.map((block) => (
        <Link
          key={block.name}
          href={block.href}
          className="text-foreground underline-offset-4 hover:underline"
        >
          {block.name}
        </Link>
      ))}
    </div>
  )
}
