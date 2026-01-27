"use client"

import * as React from "react"
import { XIcon } from "lucide-react"

import { cn } from "@/registry/new-york/lib/utils"
import { Badge } from "@/registry/new-york/ui/badge"

interface TagInputProps extends Omit<
  React.ComponentProps<"div">,
  "onChange" | "defaultValue"
> {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  suggestions?: string[]
  placeholder?: string
  disabled?: boolean
  maxTags?: number
  allowDuplicates?: boolean
  allowCustom?: boolean
  delimiter?: string | RegExp
}

function TagInput({
  value: controlledValue,
  defaultValue = [],
  onChange,
  suggestions = [],
  placeholder = "Add tag...",
  disabled,
  maxTags,
  allowDuplicates = false,
  allowCustom = true,
  delimiter = /[,\n]/,
  className,
  ...props
}: TagInputProps) {
  const [internalValue, setInternalValue] =
    React.useState<string[]>(defaultValue)
  const [inputValue, setInputValue] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const tags = isControlled ? controlledValue : internalValue

  // Filter suggestions based on input and already selected tags
  const filteredSuggestions = React.useMemo(() => {
    if (!inputValue.trim()) return []
    const search = inputValue.toLowerCase()
    return suggestions.filter(
      (s) =>
        s.toLowerCase().includes(search) &&
        (allowDuplicates || !tags.includes(s))
    )
  }, [inputValue, suggestions, tags, allowDuplicates])

  const updateTags = React.useCallback(
    (newTags: string[]) => {
      if (!isControlled) {
        setInternalValue(newTags)
      }
      onChange?.(newTags)
    },
    [isControlled, onChange]
  )

  const addTag = React.useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim()
      if (!trimmedTag) return
      if (!allowDuplicates && tags.includes(trimmedTag)) return
      if (maxTags !== undefined && tags.length >= maxTags) return
      if (!allowCustom && !suggestions.includes(trimmedTag)) return

      updateTags([...tags, trimmedTag])
      setInputValue("")
      setIsOpen(false)
      setHighlightedIndex(0)
    },
    [tags, allowDuplicates, allowCustom, maxTags, suggestions, updateTags]
  )

  const removeTag = React.useCallback(
    (index: number) => {
      updateTags(tags.filter((_, i) => i !== index))
    },
    [tags, updateTags]
  )

  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      // Check if delimiter is in the input
      if (
        delimiter instanceof RegExp
          ? delimiter.test(value)
          : value.includes(delimiter)
      ) {
        const parts = value.split(delimiter)
        parts.forEach((part, index) => {
          if (index < parts.length - 1) {
            addTag(part)
          } else {
            setInputValue(part)
            setIsOpen(part.trim().length > 0)
          }
        })
      } else {
        setInputValue(value)
        setIsOpen(value.trim().length > 0)
        setHighlightedIndex(0)
      }
    },
    [delimiter, addTag]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setHighlightedIndex((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filteredSuggestions.length > 0 && isOpen) {
          addTag(filteredSuggestions[highlightedIndex])
        } else if (allowCustom) {
          addTag(inputValue)
        }
      } else if (e.key === "Escape") {
        setIsOpen(false)
      } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
        removeTag(tags.length - 1)
      }
    },
    [
      inputValue,
      tags,
      filteredSuggestions,
      highlightedIndex,
      isOpen,
      allowCustom,
      addTag,
      removeTag,
    ]
  )

  const handleContainerClick = React.useCallback(() => {
    inputRef.current?.focus()
  }, [])

  const handleBlur = React.useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <div
        data-slot="tag-input"
        onClick={handleContainerClick}
        className={cn(
          "border-input focus-within:border-ring focus-within:ring-ring/50 flex min-h-9 w-full flex-wrap items-center gap-1.5 rounded-md border bg-transparent px-3 py-1.5 shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {tags.map((tag, index) => (
          <Badge
            key={`${tag}-${index}`}
            variant="secondary"
            className="gap-1 pr-1"
          >
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeTag(index)
                }}
                className="hover:bg-muted-foreground/20 rounded-sm p-0.5"
                aria-label={`Remove ${tag}`}
              >
                <XIcon className="size-3" />
              </button>
            )}
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={() => inputValue.trim() && setIsOpen(true)}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={
            disabled || (maxTags !== undefined && tags.length >= maxTags)
          }
          className="placeholder:text-muted-foreground min-w-[80px] flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
          role="combobox"
          aria-expanded={isOpen && filteredSuggestions.length > 0}
          aria-autocomplete="list"
        />
      </div>

      {/* Suggestions dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="bg-popover text-popover-foreground absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border p-1 shadow-md">
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              onMouseDown={(e) => {
                e.preventDefault()
                addTag(suggestion)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                "cursor-pointer rounded-sm px-2 py-1.5 text-sm",
                index === highlightedIndex && "bg-accent text-accent-foreground"
              )}
              role="option"
              aria-selected={index === highlightedIndex}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export { TagInput }
export type { TagInputProps }
