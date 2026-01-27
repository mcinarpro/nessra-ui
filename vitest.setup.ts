import "@testing-library/jest-dom/vitest"

import { vi } from "vitest"

// Radix UI components need these browser APIs that jsdom doesn't provide
window.PointerEvent = MouseEvent as typeof PointerEvent
window.HTMLElement.prototype.scrollIntoView = vi.fn()
window.HTMLElement.prototype.hasPointerCapture = vi.fn()
window.HTMLElement.prototype.releasePointerCapture = vi.fn()

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
window.ResizeObserver = ResizeObserver
