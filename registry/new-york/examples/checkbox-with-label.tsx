import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { Label } from "@/registry/new-york/ui/label"

export default function CheckboxWithLabel() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="conditions" />
      <Label htmlFor="conditions">Accept terms and conditions</Label>
    </div>
  )
}
