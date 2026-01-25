/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import { z } from "zod"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email"),
})

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      // Simulate API call - replace with your auth logic
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Reset password request for:", value.email)
      setIsSubmitted(true)
    },
  })

  return (
    <div className="bg-muted/50 flex min-h-screen w-full flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <a href="/" className="flex items-center gap-2">
          <img src="/nessra-ui-logo.svg" alt="nessra ui" className="size-14" />
        </a>
      </div>

      {/* Card */}
      {isSubmitted ? (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CheckCircle className="size-4" />
              <AlertDescription>
                If an account exists with this email, you will receive a
                password reset link shortly.
              </AlertDescription>
            </Alert>

            <Button variant="outline" className="mt-6 w-full" asChild>
              <a href="/sign-in">
                <ArrowLeft className="size-4" />
                Back to sign in
              </a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Forgot password?</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <form.Field name="email">
                {(field) => (
                  <FormField
                    name={field.name}
                    errors={field.state.meta.errors}
                    isTouched={field.state.meta.isTouched}
                  >
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <Mail className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput
                          type="email"
                          placeholder="you@example.com"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormField>
                )}
              </form.Field>

              <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    className="mt-6 w-full"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner />
                        Sending...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </Button>
                )}
              </form.Subscribe>

              <p className="text-muted-foreground mt-6 text-center text-sm">
                Remember your password?{" "}
                <a
                  href="/sign-in"
                  className="text-primary font-medium underline-offset-4 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <p className="text-muted-foreground mt-8 text-center text-xs">
        © 2025 nessra ui. All rights reserved.
      </p>
    </div>
  )
}
