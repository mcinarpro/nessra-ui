import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, test, vi } from "vitest"

import { Input } from "@/components/ui/input"

describe("Input", () => {
  test("renders with placeholder", () => {
    render(<Input placeholder="Enter email" />)

    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument()
  })

  test("accepts user input", async () => {
    const user = userEvent.setup()

    render(<Input placeholder="Email" />)
    const input = screen.getByPlaceholderText("Email")

    await user.type(input, "test@example.com")

    expect(input).toHaveValue("test@example.com")
  })

  test("calls onChange when typing", async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input placeholder="Email" onChange={handleChange} />)
    await user.type(screen.getByPlaceholderText("Email"), "a")

    expect(handleChange).toHaveBeenCalled()
  })

  test("is disabled when disabled prop is true", () => {
    render(<Input placeholder="Email" disabled />)

    expect(screen.getByPlaceholderText("Email")).toBeDisabled()
  })

  test("does not accept input when disabled", async () => {
    const user = userEvent.setup()

    render(<Input placeholder="Email" disabled />)
    const input = screen.getByPlaceholderText("Email")

    await user.type(input, "test")

    expect(input).toHaveValue("")
  })

  test("renders with correct type", () => {
    render(<Input type="password" placeholder="Password" />)

    expect(screen.getByPlaceholderText("Password")).toHaveAttribute(
      "type",
      "password"
    )
  })

  test("has data-slot attribute", () => {
    render(<Input placeholder="Email" />)

    expect(screen.getByPlaceholderText("Email")).toHaveAttribute(
      "data-slot",
      "input"
    )
  })

  test("applies custom className", () => {
    render(<Input placeholder="Email" className="custom-class" />)

    expect(screen.getByPlaceholderText("Email")).toHaveClass("custom-class")
  })

  test("supports controlled value", () => {
    const { rerender } = render(
      <Input placeholder="Email" value="initial" readOnly />
    )

    expect(screen.getByPlaceholderText("Email")).toHaveValue("initial")

    rerender(<Input placeholder="Email" value="updated" readOnly />)

    expect(screen.getByPlaceholderText("Email")).toHaveValue("updated")
  })
})
