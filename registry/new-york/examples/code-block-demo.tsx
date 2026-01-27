import { CodeBlock } from "@/registry/new-york/ui/code-block"

const code = `import { Button } from "@/components/ui/button"

export function MyComponent() {
  return <Button>Click me</Button>
}`

export default function CodeBlockDemo() {
  return <CodeBlock code={code} language="tsx" />
}
