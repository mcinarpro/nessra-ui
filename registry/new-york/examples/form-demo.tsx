"use client"

import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function FormDemo() {
  const form = useForm({
    defaultValues: { email: "" },
    onSubmit: async ({ value }) => {
      console.log("Submitted:", value)
    },
  })

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <form.Field
        name="email"
        validators={{
          onChange: ({ value }) => (!value ? "Email is required" : undefined),
        }}
      >
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="you@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormDescription>Your email address.</FormDescription>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  )
}
