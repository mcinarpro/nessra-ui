import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import { Checkbox } from "@/components/ui/checkbox"

describe("Checkbox", () => {
  test("renders unchecked by default", () => {
    render(<Checkbox aria-label="Accept terms" />)

    const checkbox = screen.getByRole("checkbox", { name: "Accept terms" })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).not.toBeChecked()
  })

  test("renders checked when defaultChecked is true", () => {
    render(<Checkbox aria-label="Accept terms" defaultChecked />)

    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  test("toggles checked state on click", async () => {
    const user = userEvent.setup()

    render(<Checkbox aria-label="Accept terms" />)
    const checkbox = screen.getByRole("checkbox")

    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  test("calls onCheckedChange when clicked", async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Checkbox aria-label="Accept terms" onCheckedChange={handleChange} />
    )
    await user.click(screen.getByRole("checkbox"))

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  test("is disabled when disabled prop is true", () => {
    render(<Checkbox aria-label="Accept terms" disabled />)

    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  test("does not toggle when disabled", async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <Checkbox
        aria-label="Accept terms"
        disabled
        onCheckedChange={handleChange}
      />
    )
    await user.click(screen.getByRole("checkbox"))

    expect(handleChange).not.toHaveBeenCalled()
  })

  test("has data-slot attribute", () => {
    render(<Checkbox aria-label="Accept terms" />)

    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "data-slot",
      "checkbox"
    )
  })

  test("applies custom className", () => {
    render(<Checkbox aria-label="Accept terms" className="custom-class" />)

    expect(screen.getByRole("checkbox")).toHaveClass("custom-class")
  })

  test("supports indeterminate state", () => {
    render(<Checkbox aria-label="Select all" checked="indeterminate" />)

    const checkbox = screen.getByRole("checkbox")
    expect(checkbox).toHaveAttribute("data-state", "indeterminate")
    expect(checkbox).toHaveAttribute("aria-checked", "mixed")
  })
})
