import { render, screen } from "@testing-library/react"
import { describe, expect, test } from "vitest"

import { Badge } from "@/components/ui/badge"

describe("Badge", () => {
  test("renders with children", () => {
    render(<Badge>New</Badge>)

    expect(screen.getByText("New")).toBeInTheDocument()
  })

  test("has data-slot attribute", () => {
    render(<Badge>Status</Badge>)

    expect(screen.getByText("Status")).toHaveAttribute("data-slot", "badge")
  })

  test("applies default variant styles", () => {
    render(<Badge>Default</Badge>)

    const badge = screen.getByText("Default")
    expect(badge).toHaveClass("bg-primary")
  })

  test("applies secondary variant styles", () => {
    render(<Badge variant="secondary">Secondary</Badge>)

    const badge = screen.getByText("Secondary")
    expect(badge).toHaveClass("bg-secondary")
  })

  test("applies destructive variant styles", () => {
    render(<Badge variant="destructive">Error</Badge>)

    const badge = screen.getByText("Error")
    expect(badge).toHaveClass("bg-destructive")
  })

  test("applies outline variant styles", () => {
    render(<Badge variant="outline">Outline</Badge>)

    const badge = screen.getByText("Outline")
    expect(badge).not.toHaveClass("bg-primary")
    expect(badge).toHaveClass("text-foreground")
  })

  test("applies custom className", () => {
    render(<Badge className="custom-class">Styled</Badge>)

    expect(screen.getByText("Styled")).toHaveClass("custom-class")
  })

  test("renders as child component when asChild is true", () => {
    render(
      <Badge asChild>
        <a href="/notifications">3 new</a>
      </Badge>
    )

    const link = screen.getByRole("link", { name: "3 new" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/notifications")
    expect(link).toHaveAttribute("data-slot", "badge")
  })
})
