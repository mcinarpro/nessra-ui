/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { ArrowLeft, CheckCircle, Eye, EyeOff, Lock } from "lucide-react"
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
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onChange: resetPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      // Simulate API call - replace with your auth logic
      // You'll need to get the reset token from URL params
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Reset password:", value)
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
            <CardTitle className="text-2xl">Password reset</CardTitle>
            <CardDescription>
              Your password has been successfully reset
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              <CheckCircle className="size-4" />
              <AlertDescription>
                You can now sign in with your new password.
              </AlertDescription>
            </Alert>

            <Button className="mt-6 w-full" asChild>
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
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>
          <CardContent>
            <Form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <form.Field name="password">
                {(field) => (
                  <FormField
                    name={field.name}
                    errors={field.state.meta.errors}
                    isTouched={field.state.meta.isTouched}
                  >
                    <FormLabel>New Password</FormLabel>
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

              <form.Field name="confirmPassword">
                {(field) => (
                  <FormField
                    name={field.name}
                    errors={field.state.meta.errors}
                    isTouched={field.state.meta.isTouched}
                  >
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupAddon>
                          <Lock className="size-4" />
                        </InputGroupAddon>
                        <InputGroupInput
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            size="icon-xs"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide password"
                                : "Show password"
                            }
                          >
                            {showConfirmPassword ? (
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
                        Resetting...
                      </>
                    ) : (
                      "Reset password"
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
