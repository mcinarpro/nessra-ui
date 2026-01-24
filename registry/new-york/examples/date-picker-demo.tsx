"use client"

import * as React from "react"

import { DatePicker } from "@/registry/new-york/ui/date-picker"

export default function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return <DatePicker date={date} onDateChange={setDate} />
}
