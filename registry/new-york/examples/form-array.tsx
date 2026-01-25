"use client"

import { useForm } from "@tanstack/react-form"
import { PlusIcon, Trash2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function FormArray() {
  const form = useForm({
    defaultValues: {
      teamName: "",
      members: [] as Array<{ name: string; email: string }>,
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
      className="max-w-lg space-y-6"
    >
      <form.Field
        name="teamName"
        validators={{
          onChange: ({ value }) =>
            !value ? "Team name is required" : undefined,
        }}
      >
        {(field) => (
          <FormField
            name={field.name}
            errors={field.state.meta.errors.map(String)}
            isTouched={field.state.meta.isTouched}
          >
            <FormLabel>Team Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Engineering Team"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </FormControl>
            <FormMessage />
          </FormField>
        )}
      </form.Field>

      <form.Field name="members" mode="array">
        {(membersField) => (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Team Members</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => membersField.pushValue({ name: "", email: "" })}
              >
                <PlusIcon className="mr-2 size-4" />
                Add Member
              </Button>
            </div>

            {membersField.state.value.length === 0 ? (
              <p className="text-muted-foreground text-sm">
                No members added yet. Click &quot;Add Member&quot; to get
                started.
              </p>
            ) : (
              <div className="space-y-3">
                {membersField.state.value.map((_, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-lg border p-3"
                  >
                    <form.Field
                      name={`members[${index}].name`}
                      validators={{
                        onChange: ({ value }) =>
                          !value ? "Required" : undefined,
                      }}
                    >
                      {(field) => (
                        <FormField
                          name={field.name}
                          errors={field.state.meta.errors.map(String)}
                          isTouched={field.state.meta.isTouched}
                          className="flex-1"
                        >
                          <FormControl>
                            <Input
                              placeholder="Name"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormField>
                      )}
                    </form.Field>

                    <form.Field
                      name={`members[${index}].email`}
                      validators={{
                        onChange: ({ value }) => {
                          if (!value) return "Required"
                          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                          return emailRegex.test(value) ? undefined : "Invalid"
                        },
                      }}
                    >
                      {(field) => (
                        <FormField
                          name={field.name}
                          errors={field.state.meta.errors.map(String)}
                          isTouched={field.state.meta.isTouched}
                          className="flex-1"
                        >
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormField>
                      )}
                    </form.Field>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="shrink-0"
                      onClick={() => membersField.removeValue(index)}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit} className="w-full">
            {isSubmitting ? "Creating team..." : "Create Team"}
          </Button>
        )}
      </form.Subscribe>
    </Form>
  )
}
