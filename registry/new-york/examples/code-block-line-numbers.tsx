import { CodeBlock } from "@/registry/new-york/ui/code-block"

const code = `function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

// Calculate first 10 fibonacci numbers
for (let i = 0; i < 10; i++) {
  console.log(fibonacci(i))
}`

export default function CodeBlockLineNumbers() {
  return <CodeBlock code={code} language="typescript" showLineNumbers />
}
