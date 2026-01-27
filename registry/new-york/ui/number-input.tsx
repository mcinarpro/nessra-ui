"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { cn } from "@/registry/new-york/lib/utils"

interface NumberInputProps extends Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "type"
> {
  value?: number
  defaultValue?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  allowEmpty?: boolean
}

function NumberInput({
  className,
  value: controlledValue,
  defaultValue,
  onChange,
  min,
  max,
  step = 1,
  disabled,
  allowEmpty = false,
  ...props
}: NumberInputProps) {
  const [internalValue, setInternalValue] = React.useState<number | undefined>(
    defaultValue
  )
  const isControlled = controlledValue !== undefined
  const value = isControlled ? controlledValue : internalValue

  const updateValue = React.useCallback(
    (newValue: number | undefined) => {
      if (newValue !== undefined) {
        if (min !== undefined && newValue < min) newValue = min
        if (max !== undefined && newValue > max) newValue = max
      }
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, onChange, min, max]
  )

  const increment = React.useCallback(() => {
    const current = value ?? min ?? 0
    updateValue(current + step)
  }, [value, min, step, updateValue])

  const decrement = React.useCallback(() => {
    const current = value ?? max ?? 0
    updateValue(current - step)
  }, [value, max, step, updateValue])

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      if (inputValue === "" && allowEmpty) {
        updateValue(undefined)
      } else {
        const num = parseFloat(inputValue)
        if (!isNaN(num)) {
          updateValue(num)
        }
      }
    },
    [allowEmpty, updateValue]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault()
        increment()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        decrement()
      }
    },
    [increment, decrement]
  )

  const canDecrement = min === undefined || (value ?? 0) > min
  const canIncrement = max === undefined || (value ?? 0) < max

  return (
    <div
      data-slot="number-input"
      className={cn(
        "border-input focus-within:border-ring focus-within:ring-ring/50 flex h-9 w-full items-center overflow-hidden rounded-md border shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <button
        type="button"
        onClick={decrement}
        disabled={disabled || !canDecrement}
        tabIndex={-1}
        aria-label="Decrease value"
        className="hover:bg-muted flex h-full shrink-0 items-center justify-center border-r px-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <MinusIcon className="size-4" />
      </button>
      <input
        type="text"
        inputMode="decimal"
        value={value ?? ""}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="h-full min-w-0 flex-1 bg-transparent px-2 text-center text-sm outline-none disabled:cursor-not-allowed [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        {...props}
      />
      <button
        type="button"
        onClick={increment}
        disabled={disabled || !canIncrement}
        tabIndex={-1}
        aria-label="Increase value"
        className="hover:bg-muted flex h-full shrink-0 items-center justify-center border-l px-2 disabled:pointer-events-none disabled:opacity-50"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}

export { NumberInput }
export type { NumberInputProps }
