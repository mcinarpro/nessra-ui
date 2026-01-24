"use client"

import * as React from "react"

import { DatePicker } from "@/registry/new-york/ui/date-picker"

export default function DatePickerDOB() {
  const [date, setDate] = React.useState<Date>()

  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="Date of birth"
      captionLayout="dropdown"
      fromYear={1920}
      toYear={new Date().getFullYear()}
      disabled={(date) => date > new Date()}
      defaultMonth={new Date(2000, 0)}
    />
  )
}
