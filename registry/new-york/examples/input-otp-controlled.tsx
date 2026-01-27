"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/registry/new-york/ui/input-otp"

export default function InputOtpControlled() {
  const [value, setValue] = React.useState("")

  return (
    <div className="space-y-2">
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-muted-foreground text-sm">
        Value: <span className="font-mono">{value || "empty"}</span>
      </p>
    </div>
  )
}
