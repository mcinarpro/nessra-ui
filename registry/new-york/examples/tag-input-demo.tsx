import { TagInput } from "@/registry/new-york/ui/tag-input"

const frameworks = [
  "React",
  "Vue",
  "Angular",
  "Svelte",
  "Next.js",
  "Nuxt",
  "Remix",
  "Astro",
]

export default function TagInputDemo() {
  return (
    <TagInput
      defaultValue={["React"]}
      suggestions={frameworks}
      placeholder="Add framework..."
    />
  )
}
