import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function FieldWithError() {
  return (
    <Field data-invalid="true">
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" aria-invalid="true" />
      <FieldDescription>We will never share your email.</FieldDescription>
      <FieldError>Please enter a valid email address.</FieldError>
    </Field>
  )
}
