"use client"

import * as React from "react"
import { addDays } from "date-fns"
import type { DateRange } from "react-day-picker"

import { DateRangePicker } from "@/registry/new-york/ui/date-picker"

export default function DatePickerWithRange() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  })

  return (
    <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
  )
}
