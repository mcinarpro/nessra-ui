"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

type TabsVariant = "default" | "underline"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  variant = "default",
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & {
  variant?: TabsVariant
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(
        "text-muted-foreground inline-flex h-9 w-fit items-center",
        variant === "default"
          ? "bg-muted justify-center rounded-lg p-[3px]"
          : "justify-start gap-4 rounded-none bg-transparent p-[3px] px-0",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 py-1 font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        // Default variant styles
        "[[data-variant=default]_&]:data-[state=active]:bg-background [[data-variant=default]_&]:dark:data-[state=active]:border-input [[data-variant=default]_&]:dark:data-[state=active]:bg-input/30 [[data-variant=default]_&]:rounded-md [[data-variant=default]_&]:border [[data-variant=default]_&]:border-transparent [[data-variant=default]_&]:px-2 [[data-variant=default]_&]:text-sm [[data-variant=default]_&]:data-[state=active]:shadow-sm",
        // Underline variant styles (exact shadcn/ui style)
        "[[data-variant=underline]_&]:text-muted-foreground [[data-variant=underline]_&]:data-[state=active]:text-foreground [[data-variant=underline]_&]:data-[state=active]:border-primary [[data-variant=underline]_&]:dark:data-[state=active]:border-primary [[data-variant=underline]_&]:hover:text-primary [[data-variant=underline]_&]:rounded-none [[data-variant=underline]_&]:border-0 [[data-variant=underline]_&]:border-b-2 [[data-variant=underline]_&]:border-transparent [[data-variant=underline]_&]:bg-transparent [[data-variant=underline]_&]:px-0 [[data-variant=underline]_&]:pb-3 [[data-variant=underline]_&]:text-base [[data-variant=underline]_&]:data-[state=active]:bg-transparent [[data-variant=underline]_&]:data-[state=active]:shadow-none [[data-variant=underline]_&]:dark:data-[state=active]:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
