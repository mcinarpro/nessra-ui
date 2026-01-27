import { TagInput } from "@/registry/new-york/ui/tag-input"

export default function TagInputMax() {
  return (
    <TagInput
      defaultValue={["One", "Two"]}
      maxTags={5}
      placeholder="Max 5 tags..."
    />
  )
}
