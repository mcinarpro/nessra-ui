"use client"

import { useForm } from "@tanstack/react-form"
import { z } from "zod"

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

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(13, "You must be at least 13 years old"),
})

export default function FormValidation() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      age: 0,
    },
    validators: {
      onChange: userSchema,
    },
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
      <form.Field name="username">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input
                placeholder="johndoe"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormDescription>3-20 characters.</FormDescription>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      <form.Field name="email">
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
                placeholder="john@example.com"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      <form.Field name="age">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Age</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="18"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>Must be at least 13.</FormDescription>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  )
}
