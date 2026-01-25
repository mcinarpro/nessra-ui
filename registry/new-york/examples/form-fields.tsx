"use client"

import { useForm } from "@tanstack/react-form"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export default function FormFields() {
  const form = useForm({
    defaultValues: {
      name: "",
      bio: "",
      notifications: false,
      marketing: false,
      theme: "system",
      role: "",
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
      className="max-w-md space-y-8"
    >
      {/* Text Input */}
      <form.Field
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? "Name is required" : undefined),
        }}
      >
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Your name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      {/* Textarea */}
      <form.Field name="bio">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about yourself"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormDescription>Max 500 characters.</FormDescription>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      {/* Select */}
      <form.Field name="role">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Role</FormLabel>
            <Select
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value)}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      {/* Radio Group */}
      <form.Field name="theme">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Theme</FormLabel>
            <FormControl>
              <RadioGroup
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="theme-light" />
                  <Label htmlFor="theme-light" className="font-normal">
                    Light
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="theme-dark" />
                  <Label htmlFor="theme-dark" className="font-normal">
                    Dark
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="theme-system" />
                  <Label htmlFor="theme-system" className="font-normal">
                    System
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      {/* Checkbox with orientation="horizontal" */}
      <form.Field name="notifications">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
            orientation="horizontal"
          >
            <FormControl>
              <Checkbox
                checked={field.state.value}
                onCheckedChange={(checked) =>
                  field.handleChange(checked === true)
                }
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>Email notifications</FormLabel>
              <FormDescription>
                Receive emails about your account activity.
              </FormDescription>
            </div>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      {/* Switch */}
      <form.Field name="marketing">
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors}
            isTouched={field.state.meta.isTouched}
          >
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Marketing emails</FormLabel>
                <FormDescription>
                  Receive emails about new products and features.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={(checked) => field.handleChange(checked)}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Saving..." : "Save preferences"}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  )
}
