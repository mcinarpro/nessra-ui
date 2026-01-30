"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const {{name}}Variants = cva(
  // Base styles
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface {{Name}}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {{name}}Variants> {
  ref?: React.Ref<HTMLDivElement>
  // Add component-specific props here
}

function {{Name}}({ className, variant, size, ref, ...props }: {{Name}}Props) {
  return (
    <div
      ref={ref}
      className={cn({{name}}Variants({ variant, size, className }))}
      {...props}
    />
  )
}

export { {{Name}}, {{name}}Variants }
