import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldDemo() {
  return (
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" placeholder="Enter your username" />
      <FieldDescription>This is your public display name.</FieldDescription>
    </Field>
  )
}
