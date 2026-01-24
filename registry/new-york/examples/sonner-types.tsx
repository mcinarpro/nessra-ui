"use client"

import { toast } from "sonner"

import { Button } from "@/registry/new-york/ui/button"

export default function SonnerTypes() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast("Default toast")}>
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("Success! Operation completed.")}
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("Error! Something went wrong.")}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.warning("Warning! Please review.")}
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.info("Info: New updates available.")}
      >
        Info
      </Button>
    </div>
  )
}
