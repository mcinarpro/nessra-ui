"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

const languages = [
  "English",
  "French",
  "German",
  "Spanish",
  "Portuguese",
] as const

export default function ComboboxClearDemo() {
  return (
    <Combobox items={languages}>
      <ComboboxInput placeholder="Select language..." showClear />
      <ComboboxContent>
        <ComboboxEmpty>No language found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
