/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { z } from "zod"

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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

const signinSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function SigninForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: signinSchema,
    },
    onSubmit: async ({ value }) => {
      // Simulate API call - replace with your auth logic
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Sign in:", value)
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access your account
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

            <form.Field name="password">
              {(field) => (
                <FormField
                  name={field.name}
                  errors={field.state.meta.errors}
                  isTouched={field.state.meta.isTouched}
                >
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="/forgot-password"
                      className="text-muted-foreground text-sm underline-offset-4 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <FormControl>
                    <InputGroup>
                      <InputGroupAddon>
                        <Lock className="size-4" />
                      </InputGroupAddon>
                      <InputGroupInput
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          size="icon-xs"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </InputGroupButton>
                      </InputGroupAddon>
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
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              )}
            </form.Subscribe>

            <p className="text-muted-foreground mt-6 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/sign-up"
                className="text-primary font-medium underline-offset-4 hover:underline"
              >
                Sign up
              </a>
            </p>
          </Form>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-muted-foreground mt-8 text-center text-xs">
        © 2025 nessra ui. All rights reserved.
      </p>
    </div>
  )
}
