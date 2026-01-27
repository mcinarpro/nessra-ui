import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import { Button } from "@/components/ui/button"

describe("Button", () => {
  test("renders with children", () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  test("calls onClick when clicked", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)
    await user.click(screen.getByRole("button"))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  test("does not call onClick when disabled", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button disabled onClick={handleClick}>
        Click me
      </Button>
    )
    await user.click(screen.getByRole("button"))

    expect(handleClick).not.toHaveBeenCalled()
  })

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>)

    expect(screen.getByRole("button")).toBeDisabled()
  })

  test("applies variant data attribute", () => {
    render(<Button variant="destructive">Delete</Button>)

    expect(screen.getByRole("button")).toHaveAttribute(
      "data-variant",
      "destructive"
    )
  })

  test("applies size data attribute", () => {
    render(<Button size="sm">Small</Button>)

    expect(screen.getByRole("button")).toHaveAttribute("data-size", "sm")
  })

  test("has data-slot attribute", () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole("button")).toHaveAttribute("data-slot", "button")
  })

  test("renders as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    )

    const link = screen.getByRole("link", { name: "Link Button" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/test")
  })

  test("applies custom className", () => {
    render(<Button className="custom-class">Styled</Button>)

    expect(screen.getByRole("button")).toHaveClass("custom-class")
  })
})
