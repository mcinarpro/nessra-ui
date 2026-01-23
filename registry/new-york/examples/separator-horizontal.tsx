import { Separator } from "@/registry/new-york/ui/separator"

export default function SeparatorHorizontal() {
  return (
    <div className="w-full">
      <div className="text-sm">Content above</div>
      <Separator className="my-4" />
      <div className="text-sm">Content below</div>
    </div>
  )
}
