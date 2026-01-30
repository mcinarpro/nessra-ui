import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import { {{Name}} } from "@/registry/new-york/ui/{{name}}"

describe("{{Name}}", () => {
  it("renders correctly", () => {
    render(<{{Name}}>Content</{{Name}}>)
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<{{Name}} className="custom-class">Content</{{Name}}>)
    expect(screen.getByText("Content")).toHaveClass("custom-class")
  })

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<{{Name}} ref={ref}>Content</{{Name}}>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("handles click interaction", async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    render(<{{Name}} onClick={handleClick}>Content</{{Name}}>)

    await user.click(screen.getByText("Content"))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  describe("variants", () => {
    it("renders default variant", () => {
      render(<{{Name}} variant="default">Content</{{Name}}>)
      expect(screen.getByText("Content")).toHaveClass("bg-primary")
    })

    it("renders secondary variant", () => {
      render(<{{Name}} variant="secondary">Content</{{Name}}>)
      expect(screen.getByText("Content")).toHaveClass("bg-secondary")
    })
  })

  describe("sizes", () => {
    it("renders default size", () => {
      render(<{{Name}} size="default">Content</{{Name}}>)
      expect(screen.getByText("Content")).toHaveClass("h-10")
    })

    it("renders small size", () => {
      render(<{{Name}} size="sm">Content</{{Name}}>)
      expect(screen.getByText("Content")).toHaveClass("h-9")
    })
  })
})
