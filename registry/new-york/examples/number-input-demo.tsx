import { NumberInput } from "@/registry/new-york/ui/number-input"

export default function NumberInputDemo() {
  return <NumberInput defaultValue={5} min={0} max={100} className="max-w-32" />
}
