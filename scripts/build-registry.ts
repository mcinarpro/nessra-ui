import * as fs from "node:fs"
import * as path from "node:path"

const EXAMPLES_DIR = "registry/new-york/examples"
const OUTPUT_FILE = "registry/__index__.tsx"

interface ExampleFile {
  name: string
  group: string
  filePath: string
}

function getGroupFromFileName(fileName: string): string {
  // Remove .tsx extension
  const baseName = fileName.replace(".tsx", "")

  // Extract prefix (everything before the first hyphen that's followed by a known suffix)
  // e.g., "button-demo" → "button", "button-secondary" → "button"
  const parts = baseName.split("-")

  // For compound component names like "alert-dialog-demo", we need to handle them
  // Strategy: find the longest prefix that matches a known pattern
  // Simple approach: use first part, unless it's a two-word component
  const twoWordComponents = [
    "alert-dialog",
    "dropdown-menu",
    "context-menu",
    "navigation-menu",
    "radio-group",
    "toggle-group",
    "scroll-area",
    "hover-card",
    "aspect-ratio",
    "data-table",
  ]

  const firstTwoParts = parts.slice(0, 2).join("-")
  if (twoWordComponents.includes(firstTwoParts)) {
    return firstTwoParts
  }

  return parts[0]
}

function capitalizeGroup(group: string): string {
  return group
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function main() {
  // Scan examples directory
  const examplesPath = path.resolve(EXAMPLES_DIR)

  if (!fs.existsSync(examplesPath)) {
    console.error(`Directory not found: ${examplesPath}`)
    process.exit(1)
  }

  const files = fs
    .readdirSync(examplesPath)
    .filter((file) => file.endsWith(".tsx"))
    .sort()

  // Parse files into groups
  const examples: ExampleFile[] = files.map((file) => ({
    name: file.replace(".tsx", ""),
    group: getGroupFromFileName(file),
    filePath: `${EXAMPLES_DIR}/${file}`,
  }))

  // Group by component
  const grouped = examples.reduce(
    (acc, example) => {
      if (!acc[example.group]) {
        acc[example.group] = []
      }
      acc[example.group].push(example)
      return acc
    },
    {} as Record<string, ExampleFile[]>
  )

  // Generate output
  const groups = Object.keys(grouped).sort()
  let output = `import * as React from "react"

export interface RegistryEntry {
  name: string
  component: React.LazyExoticComponent<React.ComponentType<unknown>>
  files: string[]
}

export const Index: Record<string, RegistryEntry> = {
`

  groups.forEach((group, groupIndex) => {
    const groupExamples = grouped[group]
    output += `  // ${capitalizeGroup(group)} examples\n`

    groupExamples.forEach((example, exampleIndex) => {
      const isLastInGroup = exampleIndex === groupExamples.length - 1
      const isLastGroup = groupIndex === groups.length - 1
      const needsTrailingNewline = !isLastInGroup || !isLastGroup

      output += `  "${example.name}": {
    name: "${example.name}",
    component: React.lazy(() => import("./new-york/examples/${example.name}")),
    files: ["${example.filePath}"],
  },${needsTrailingNewline ? "\n" : ""}`
    })

    // Add blank line between groups (except after last group)
    if (groupIndex < groups.length - 1) {
      output += "\n"
    }
  })

  output += `\n}\n`

  // Write output
  fs.writeFileSync(OUTPUT_FILE, output)
  console.log(`✅ Generated ${OUTPUT_FILE}`)
  console.log(`   ${files.length} examples in ${groups.length} groups`)
  groups.forEach((group) => {
    console.log(
      `   - ${capitalizeGroup(group)}: ${grouped[group].length} examples`
    )
  })
}

main()
