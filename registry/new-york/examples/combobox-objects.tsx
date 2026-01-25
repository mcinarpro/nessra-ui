"use client"

import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

interface Country {
  code: string
  value: string
  label: string
  continent: string
}

const countries: Country[] = [
  {
    code: "ar",
    value: "argentina",
    label: "Argentina",
    continent: "South America",
  },
  { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
  { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
  { code: "ca", value: "canada", label: "Canada", continent: "North America" },
  { code: "cn", value: "china", label: "China", continent: "Asia" },
  { code: "fr", value: "france", label: "France", continent: "Europe" },
  { code: "de", value: "germany", label: "Germany", continent: "Europe" },
  { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
  { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
  {
    code: "gb",
    value: "united-kingdom",
    label: "United Kingdom",
    continent: "Europe",
  },
  {
    code: "us",
    value: "united-states",
    label: "United States",
    continent: "North America",
  },
]

export default function ComboboxObjects() {
  const [selected, setSelected] = React.useState<Country | null>(null)

  return (
    <div className="space-y-4">
      <Combobox items={countries} value={selected} onValueChange={setSelected}>
        <ComboboxInput placeholder="Select country..." />
        <ComboboxContent>
          <ComboboxEmpty>No country found.</ComboboxEmpty>
          <ComboboxList>
            {(item: Country) => (
              <ComboboxItem key={item.code} value={item}>
                <span className="mr-2">{item.code.toUpperCase()}</span>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      {selected && (
        <pre className="bg-muted rounded-md p-4 text-sm">
          {JSON.stringify(selected, null, 2)}
        </pre>
      )}
    </div>
  )
}
