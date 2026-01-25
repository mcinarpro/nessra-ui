"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function SpinnerButton() {
  const [loading, setLoading] = React.useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading && <Spinner />}
      {loading ? "Loading..." : "Submit"}
    </Button>
  )
}
