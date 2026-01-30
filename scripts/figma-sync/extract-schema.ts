/**
 * nessra-ui Figma Schema Extractor (POC)
 *
 * Extracts component metadata from registry files to generate
 * schemas that can be used for Figma synchronization.
 *
 * What it extracts:
 * - CVA variants (variant names, values, default values)
 * - Component props (from TypeScript types)
 * - Tailwind classes used (design tokens)
 * - Sub-components (slots)
 * - Dependencies
 */

import * as fs from "node:fs"
import * as path from "node:path"

// ============================================================================
// TYPES
// ============================================================================

export interface VariantValue {
  name: string
  classes: string
  /** Parsed design tokens from classes */
  tokens: DesignToken[]
}

export interface Variant {
  name: string
  values: Record<string, VariantValue>
  defaultValue: string | null
}

export interface DesignToken {
  type: "color" | "spacing" | "radius" | "shadow" | "typography" | "other"
  name: string
  rawClass: string
  /** CSS variable if applicable */
  cssVar?: string
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description?: string
}

export interface SubComponent {
  name: string
  dataSlot: string
  classes: string
  tokens: DesignToken[]
}

export interface ComponentSchema {
  /** Component name (e.g., "Button") */
  name: string
  /** File path relative to project root */
  filePath: string
  /** Component description from registry.json */
  description?: string
  /** Base classes applied to all variants */
  baseClasses: string
  /** Extracted design tokens from base classes */
  baseTokens: DesignToken[]
  /** CVA variants */
  variants: Variant[]
  /** Component props */
  props: ComponentProp[]
  /** Sub-components (e.g., AlertTitle, AlertDescription) */
  subComponents: SubComponent[]
  /** NPM dependencies */
  dependencies: string[]
  /** Registry dependencies */
  registryDependencies: string[]
  /** Figma mapping suggestions */
  figmaMapping: FigmaMapping
  /** Extraction metadata */
  meta: {
    extractedAt: string
    extractorVersion: string
  }
}

export interface FigmaMapping {
  /** Suggested Figma component name */
  componentName: string
  /** Suggested variant properties for Figma */
  variantProperties: FigmaVariantProperty[]
  /** Suggested boolean properties */
  booleanProperties: string[]
  /** Suggested text properties */
  textProperties: string[]
}

export interface FigmaVariantProperty {
  name: string
  values: string[]
  defaultValue: string
}

// ============================================================================
// TOKEN EXTRACTION
// ============================================================================

const TOKEN_PATTERNS: Record<DesignToken["type"], RegExp[]> = {
  color: [
    /\b(bg|text|border|ring|outline|fill|stroke)-(primary|secondary|destructive|muted|accent|card|popover|background|foreground|input|ring)(-foreground)?\b/g,
    /\b(bg|text|border)-(white|black|transparent)\b/g,
    /\b(bg|text|border|ring)-\w+\/\d+\b/g, // opacity variants like bg-primary/90
  ],
  spacing: [
    /\b(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|space-x|space-y)-(\d+(\.\d+)?|auto)\b/g,
    /\b(w|h|min-w|min-h|max-w|max-h|size)-(\d+(\.\d+)?|auto|full|screen|fit|min|max)\b/g,
    /\b(inset|top|right|bottom|left)-(\d+(\.\d+)?|auto)\b/g,
  ],
  radius: [/\b(rounded|rounded-[a-z]+)(-sm|-md|-lg|-xl|-2xl|-3xl|-full)?\b/g],
  shadow: [/\b(shadow|shadow-[a-z]+)(-xs|-sm|-md|-lg|-xl|-2xl|-inner|-none)?\b/g],
  typography: [
    /\b(text)-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)\b/g,
    /\b(font)-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)\b/g,
    /\b(leading|tracking)-[a-z]+\b/g,
  ],
  other: [],
}

function extractTokensFromClasses(classes: string): DesignToken[] {
  const tokens: DesignToken[] = []
  const seenTokens = new Set<string>()

  for (const [type, patterns] of Object.entries(TOKEN_PATTERNS)) {
    for (const pattern of patterns) {
      const regex = new RegExp(pattern.source, pattern.flags)
      let match

      while ((match = regex.exec(classes)) !== null) {
        const rawClass = match[0]
        if (seenTokens.has(rawClass)) continue
        seenTokens.add(rawClass)

        const token: DesignToken = {
          type: type as DesignToken["type"],
          name: rawClass,
          rawClass,
        }

        // Extract CSS variable references
        const cssVarMatch = rawClass.match(
          /-(primary|secondary|destructive|muted|accent|card|popover|background|foreground|input|ring|border)/
        )
        if (cssVarMatch) {
          token.cssVar = `--${cssVarMatch[1]}`
        }

        tokens.push(token)
      }
    }
  }

  return tokens
}

// ============================================================================
// CVA EXTRACTION
// ============================================================================

interface CvaExtraction {
  baseClasses: string
  variants: Variant[]
}

/**
 * Parse top-level key-value pairs from a JS object string
 * Handles nested braces and multiline string values
 */
function parseTopLevelObject(objStr: string): Record<string, string> {
  const result: Record<string, string> = {}

  // Remove outer braces
  const inner = objStr.trim().replace(/^\{|\}$/g, "").trim()

  let i = 0
  while (i < inner.length) {
    // Skip whitespace and commas
    while (i < inner.length && /[\s,]/.test(inner[i])) i++
    if (i >= inner.length) break

    // Read key (can be quoted or unquoted)
    let key = ""
    if (inner[i] === '"' || inner[i] === "'") {
      const quote = inner[i]
      i++
      while (i < inner.length && inner[i] !== quote) {
        key += inner[i]
        i++
      }
      i++ // skip closing quote
    } else {
      while (i < inner.length && /[\w-]/.test(inner[i])) {
        key += inner[i]
        i++
      }
    }

    // Skip to colon
    while (i < inner.length && inner[i] !== ":") i++
    i++ // skip colon

    // Skip whitespace
    while (i < inner.length && /\s/.test(inner[i])) i++

    // Read value
    let value = ""
    const startChar = inner[i]

    if (startChar === "{") {
      // Object value - find matching brace
      let braceCount = 0
      const valueStart = i
      while (i < inner.length) {
        if (inner[i] === "{") braceCount++
        else if (inner[i] === "}") {
          braceCount--
          if (braceCount === 0) {
            i++
            break
          }
        }
        i++
      }
      value = inner.slice(valueStart, i)
    } else if (startChar === '"' || startChar === "'" || startChar === "`") {
      // String value
      const quote = startChar
      i++ // skip opening quote
      while (i < inner.length && inner[i] !== quote) {
        // Handle escape sequences
        if (inner[i] === "\\" && i + 1 < inner.length) {
          value += inner[i + 1]
          i += 2
        } else {
          value += inner[i]
          i++
        }
      }
      i++ // skip closing quote
    } else {
      // Other value (number, boolean, etc.)
      while (i < inner.length && !/[,}\n]/.test(inner[i])) {
        value += inner[i]
        i++
      }
      value = value.trim()
    }

    if (key) {
      result[key] = value
    }
  }

  return result
}

function extractCva(content: string): CvaExtraction | null {
  // Match cva() call - find the base classes first
  const baseMatch = content.match(
    /(?:const\s+\w+Variants\s*=\s*)?cva\s*\(\s*["'`]([\s\S]*?)["'`]/
  )

  if (!baseMatch) {
    return null
  }

  const baseClasses = baseMatch[1].replace(/\s+/g, " ").trim()
  const variants: Variant[] = []

  // Find the cva call and extract everything after it
  const cvaStart = content.indexOf("cva(")
  if (cvaStart === -1) return { baseClasses, variants }

  // Find matching closing paren for cva()
  let parenCount = 0
  let cvaEnd = cvaStart
  let foundOpen = false

  for (let i = cvaStart; i < content.length; i++) {
    if (content[i] === "(") {
      parenCount++
      foundOpen = true
    } else if (content[i] === ")") {
      parenCount--
      if (foundOpen && parenCount === 0) {
        cvaEnd = i
        break
      }
    }
  }

  const cvaContent = content.slice(cvaStart, cvaEnd + 1)

  // Find variants: { ... } block
  const variantsMatch = cvaContent.match(/variants\s*:\s*\{/)
  if (!variantsMatch || variantsMatch.index === undefined) {
    return { baseClasses, variants }
  }

  // Extract the variants block with balanced braces
  const variantsStart = variantsMatch.index + variantsMatch[0].length - 1
  let braceCount = 0
  let variantsEnd = variantsStart

  for (let i = variantsStart; i < cvaContent.length; i++) {
    if (cvaContent[i] === "{") braceCount++
    else if (cvaContent[i] === "}") {
      braceCount--
      if (braceCount === 0) {
        variantsEnd = i + 1
        break
      }
    }
  }

  const variantsBlock = cvaContent.slice(variantsStart, variantsEnd)

  // Now parse individual variants (variant: {...}, size: {...})
  // Find each top-level property in the variants block
  const topLevelVariants = parseTopLevelObject(variantsBlock)

  for (const [variantName, variantContent] of Object.entries(topLevelVariants)) {
    const values: Record<string, VariantValue> = {}

    // Parse the values inside this variant
    const valueEntries = parseTopLevelObject(variantContent)

    for (const [valueName, valueClasses] of Object.entries(valueEntries)) {
      // valueClasses might still have quotes, clean it up
      const cleanClasses = valueClasses
        .replace(/^["'`]|["'`]$/g, "")
        .replace(/\s+/g, " ")
        .trim()

      values[valueName] = {
        name: valueName,
        classes: cleanClasses,
        tokens: extractTokensFromClasses(cleanClasses),
      }
    }

    if (Object.keys(values).length > 0) {
      variants.push({
        name: variantName,
        values,
        defaultValue: null,
      })
    }
  }

  // Extract defaultVariants
  const defaultVariantsMatch = cvaContent.match(
    /defaultVariants\s*:\s*\{([^}]+)\}/
  )
  if (defaultVariantsMatch) {
    const defaultsBlock = defaultVariantsMatch[1]
    const defaultRegex = /(\w+)\s*:\s*["']?(\w+(?:-\w+)*)["']?/g
    let defaultMatch

    while ((defaultMatch = defaultRegex.exec(defaultsBlock)) !== null) {
      const variantName = defaultMatch[1]
      const defaultValue = defaultMatch[2]

      const variant = variants.find((v) => v.name === variantName)
      if (variant) {
        variant.defaultValue = defaultValue
      }
    }
  }

  return { baseClasses, variants }
}

// ============================================================================
// PROPS EXTRACTION
// ============================================================================

function extractProps(content: string, componentName: string): ComponentProp[] {
  const props: ComponentProp[] = []

  // Look for the component function and its props
  const funcPatterns = [
    // function Button({ className, variant, ... }: Props)
    new RegExp(
      `function\\s+${componentName}\\s*\\(\\s*\\{([^}]+)\\}\\s*:\\s*([^)]+)\\)`,
      "s"
    ),
    // const Button = ({ className, ... }: Props) =>
    new RegExp(
      `(?:const|let)\\s+${componentName}\\s*=\\s*\\(\\s*\\{([^}]+)\\}\\s*:\\s*([^)]+)\\)`,
      "s"
    ),
  ]

  for (const pattern of funcPatterns) {
    const match = content.match(pattern)
    if (match) {
      const destructuredProps = match[1]

      // Extract each prop from destructuring
      const propRegex = /(\w+)(?:\s*=\s*([^,}]+))?/g
      let propMatch

      while ((propMatch = propRegex.exec(destructuredProps)) !== null) {
        const propName = propMatch[1]
        const defaultValue = propMatch[2]?.trim().replace(/["']/g, "")

        // Skip spread operator
        if (propName === "props" || propName.startsWith("...")) continue

        props.push({
          name: propName,
          type: inferPropType(propName, content),
          required: !defaultValue,
          defaultValue,
        })
      }
      break
    }
  }

  return props
}

function inferPropType(propName: string, content: string): string {
  // Try to find type annotation
  const typePatterns = [
    new RegExp(`${propName}\\??:\\s*([^,;\\n}]+)`),
    new RegExp(`["']${propName}["']\\??:\\s*([^,;\\n}]+)`),
  ]

  for (const pattern of typePatterns) {
    const match = content.match(pattern)
    if (match) {
      return match[1].trim()
    }
  }

  // Infer from common prop names
  const inferredTypes: Record<string, string> = {
    className: "string",
    children: "React.ReactNode",
    disabled: "boolean",
    asChild: "boolean",
    variant: "string",
    size: "string",
    onClick: "() => void",
    onChange: "(value: unknown) => void",
    value: "string | number",
    defaultValue: "string | number",
    placeholder: "string",
    id: "string",
    name: "string",
    type: "string",
    ref: "React.Ref<HTMLElement>",
  }

  return inferredTypes[propName] || "unknown"
}

// ============================================================================
// SUB-COMPONENTS EXTRACTION
// ============================================================================

function extractSubComponents(content: string): SubComponent[] {
  const subComponents: SubComponent[] = []

  // Match function declarations with data-slot
  const funcRegex =
    /function\s+(\w+)\s*\([^)]*\)\s*\{[\s\S]*?data-slot=["']([^"']+)["'][\s\S]*?className=\{?(?:cn\()?\s*["'`]([^"'`]+)/g

  let match
  while ((match = funcRegex.exec(content)) !== null) {
    const [, name, dataSlot, classes] = match

    // Skip main component (usually first one)
    if (subComponents.length === 0) continue

    subComponents.push({
      name,
      dataSlot,
      classes: classes.replace(/\s+/g, " ").trim(),
      tokens: extractTokensFromClasses(classes),
    })
  }

  // Also try to find all data-slot usages
  const slotRegex = /data-slot=["']([^"']+)["']/g
  const slots = new Set<string>()

  while ((match = slotRegex.exec(content)) !== null) {
    slots.add(match[1])
  }

  return subComponents
}

// ============================================================================
// FIGMA MAPPING GENERATION
// ============================================================================

function generateFigmaMapping(
  componentName: string,
  variants: Variant[],
  props: ComponentProp[]
): FigmaMapping {
  const variantProperties: FigmaVariantProperty[] = variants.map((v) => ({
    name: capitalizeFirst(v.name),
    values: Object.keys(v.values).map(capitalizeFirst),
    defaultValue: v.defaultValue ? capitalizeFirst(v.defaultValue) : "Default",
  }))

  const booleanProperties = props
    .filter(
      (p) => p.type === "boolean" || p.name === "disabled" || p.name === "asChild"
    )
    .map((p) => capitalizeFirst(p.name))

  const textProperties = props
    .filter(
      (p) =>
        (p.type === "string" || p.type.includes("ReactNode")) &&
        !["className", "id", "name"].includes(p.name)
    )
    .map((p) => capitalizeFirst(p.name))

  return {
    componentName,
    variantProperties,
    booleanProperties,
    textProperties,
  }
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// ============================================================================
// REGISTRY INTEGRATION
// ============================================================================

interface RegistryItem {
  name: string
  type: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: { path: string; type: string }[]
}

interface Registry {
  name: string
  items: RegistryItem[]
}

function loadRegistry(registryPath: string): Registry {
  const content = fs.readFileSync(registryPath, "utf-8")
  return JSON.parse(content)
}

// ============================================================================
// MAIN EXTRACTION
// ============================================================================

export function extractComponentSchema(
  filePath: string,
  registryItem?: RegistryItem
): ComponentSchema {
  const content = fs.readFileSync(filePath, "utf-8")
  const fileName = path.basename(filePath, ".tsx")
  const componentName = kebabToPascal(fileName)

  // Extract CVA variants
  const cvaExtraction = extractCva(content)

  // Extract props
  const props = extractProps(content, componentName)

  // Extract sub-components
  const subComponents = extractSubComponents(content)

  // Build schema
  const schema: ComponentSchema = {
    name: componentName,
    filePath,
    description: registryItem?.description,
    baseClasses: cvaExtraction?.baseClasses || "",
    baseTokens: cvaExtraction
      ? extractTokensFromClasses(cvaExtraction.baseClasses)
      : [],
    variants: cvaExtraction?.variants || [],
    props,
    subComponents,
    dependencies: registryItem?.dependencies || [],
    registryDependencies: registryItem?.registryDependencies || [],
    figmaMapping: generateFigmaMapping(
      componentName,
      cvaExtraction?.variants || [],
      props
    ),
    meta: {
      extractedAt: new Date().toISOString(),
      extractorVersion: "0.1.0",
    },
  }

  return schema
}

function kebabToPascal(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const args = process.argv.slice(2)
  const outputDir = args.includes("--output")
    ? args[args.indexOf("--output") + 1]
    : "schemas"

  console.log("🔍 nessra-ui Schema Extractor v0.1.0\n")

  // Load registry
  const registryPath = path.resolve("registry.json")
  if (!fs.existsSync(registryPath)) {
    console.error("❌ registry.json not found")
    process.exit(1)
  }

  const registry = loadRegistry(registryPath)
  console.log(`📦 Loaded registry: ${registry.name}`)

  // Create output directory
  const outputPath = path.resolve(outputDir)
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // Filter UI components only
  const uiComponents = registry.items.filter(
    (item) => item.type === "registry:ui"
  )
  console.log(`📝 Found ${uiComponents.length} UI components\n`)

  const schemas: ComponentSchema[] = []
  const errors: { name: string; error: string }[] = []

  for (const item of uiComponents) {
    const filePath = item.files[0]?.path
    if (!filePath) {
      errors.push({ name: item.name, error: "No file path" })
      continue
    }

    const fullPath = path.resolve(filePath)
    if (!fs.existsSync(fullPath)) {
      errors.push({ name: item.name, error: "File not found" })
      continue
    }

    try {
      const schema = extractComponentSchema(fullPath, item)
      schemas.push(schema)

      // Write individual schema
      const schemaPath = path.join(outputPath, `${item.name}.schema.json`)
      fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))

      const variantCount = schema.variants.length
      const propsCount = schema.props.length
      const tokenCount = schema.baseTokens.length

      console.log(
        `  ✅ ${schema.name.padEnd(20)} ${variantCount} variants, ${propsCount} props, ${tokenCount} tokens`
      )
    } catch (error) {
      errors.push({
        name: item.name,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  }

  // Write combined index
  const indexPath = path.join(outputPath, "index.json")
  const index = {
    name: registry.name,
    version: "0.1.0",
    generatedAt: new Date().toISOString(),
    components: schemas.map((s) => ({
      name: s.name,
      filePath: s.filePath,
      variantCount: s.variants.length,
      propsCount: s.props.length,
    })),
  }
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2))

  // Summary
  console.log("\n" + "=".repeat(60))
  console.log(`✅ Extracted ${schemas.length} component schemas`)
  console.log(`📁 Output: ${outputPath}`)

  if (errors.length > 0) {
    console.log(`\n⚠️  ${errors.length} errors:`)
    errors.forEach((e) => console.log(`   - ${e.name}: ${e.error}`))
  }

  // Print sample output for Button
  const buttonSchema = schemas.find((s) => s.name === "Button")
  if (buttonSchema) {
    console.log("\n" + "=".repeat(60))
    console.log("📋 Sample Output: Button\n")
    console.log("Variants:")
    buttonSchema.variants.forEach((v) => {
      console.log(`  ${v.name}: ${Object.keys(v.values).join(", ")}`)
    })
    console.log("\nFigma Mapping:")
    console.log(JSON.stringify(buttonSchema.figmaMapping, null, 2))
  }
}

main().catch(console.error)
