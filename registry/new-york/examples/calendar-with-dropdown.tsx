"use client"

import * as React from "react"

import { Calendar } from "@/registry/new-york/ui/calendar"

export default function CalendarWithDropdown() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      fromYear={2020}
      toYear={2030}
      className="rounded-md border shadow"
    />
  )
}
