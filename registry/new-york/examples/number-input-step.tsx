import { NumberInput } from "@/registry/new-york/ui/number-input"

export default function NumberInputStep() {
  return (
    <NumberInput
      defaultValue={0}
      step={5}
      min={0}
      max={100}
      className="max-w-32"
    />
  )
}
