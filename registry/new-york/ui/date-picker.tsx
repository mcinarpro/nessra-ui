"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"

import { cn } from "@/registry/new-york/lib/utils"
import { Button } from "@/registry/new-york/ui/button"
import { Calendar } from "@/registry/new-york/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/new-york/ui/popover"

function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  ...props
}: {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
} & Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect"
>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-slot="date-picker-trigger"
          data-empty={!date}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

function DateRangePicker({
  dateRange,
  onDateRangeChange,
  placeholder = "Pick a date range",
  className,
  numberOfMonths = 2,
  ...props
}: {
  dateRange?: DateRange
  onDateRangeChange?: (dateRange: DateRange | undefined) => void
  placeholder?: string
  className?: string
  numberOfMonths?: number
} & Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect"
>) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-slot="date-range-picker-trigger"
          data-empty={!dateRange?.from}
          className={cn(
            "data-[empty=true]:text-muted-foreground w-[300px] justify-start text-left font-normal",
            className
          )}
        >
          <CalendarIcon className="size-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "LLL dd, y")} -{" "}
                {format(dateRange.to, "LLL dd, y")}
              </>
            ) : (
              format(dateRange.from, "LLL dd, y")
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={onDateRangeChange}
          numberOfMonths={numberOfMonths}
          {...props}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
