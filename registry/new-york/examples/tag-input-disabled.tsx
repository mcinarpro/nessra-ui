import { TagInput } from "@/registry/new-york/ui/tag-input"

export default function TagInputDisabled() {
  return <TagInput defaultValue={["React", "TypeScript"]} disabled />
}
