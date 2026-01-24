"use client"

import * as React from "react"

import { Calendar } from "@/registry/new-york/ui/calendar"

export default function CalendarMultipleMonths() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      numberOfMonths={2}
      className="rounded-md border shadow"
    />
  )
}
