/**
 * nessra-ui Design Tokens Extractor
 *
 * Extracts CSS variables from global.css and converts them to
 * W3C Design Tokens format (https://design-tokens.github.io/community-group/format/)
 *
 * Supports:
 * - Light and dark mode tokens
 * - OKLCH color values
 * - Semantic token grouping
 */

import * as fs from "node:fs"
import * as path from "node:path"

// ============================================================================
// TYPES (W3C Design Tokens Format)
// ============================================================================

interface DesignToken {
  $value: string
  $type?: string
  $description?: string
}

interface DesignTokenGroup {
  [key: string]: DesignToken | DesignTokenGroup
}

interface DesignTokensFile {
  $schema: string
  name: string
  version: string
  tokens: {
    color: DesignTokenGroup
    spacing: DesignTokenGroup
    radius: DesignTokenGroup
    shadow: DesignTokenGroup
    typography: DesignTokenGroup
  }
  modes: {
    light: DesignTokenGroup
    dark: DesignTokenGroup
  }
  meta: {
    generatedAt: string
    source: string
    extractorVersion: string
  }
}

// ============================================================================
// CSS PARSING
// ============================================================================

interface CssVariable {
  name: string
  value: string
  mode: "light" | "dark"
}

function parseCssVariables(cssContent: string): CssVariable[] {
  const variables: CssVariable[] = []

  // Parse :root block (light mode)
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/s)
  if (rootMatch) {
    const rootVars = parseVariablesFromBlock(rootMatch[1], "light")
    variables.push(...rootVars)
  }

  // Parse .dark block (dark mode)
  const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/s)
  if (darkMatch) {
    const darkVars = parseVariablesFromBlock(darkMatch[1], "dark")
    variables.push(...darkVars)
  }

  return variables
}

function parseVariablesFromBlock(
  block: string,
  mode: "light" | "dark"
): CssVariable[] {
  const variables: CssVariable[] = []
  const varRegex = /--([\w-]+)\s*:\s*([^;]+);/g

  let match
  while ((match = varRegex.exec(block)) !== null) {
    const name = match[1].trim()
    const value = match[2].trim()

    // Skip internal/framework variables
    if (name.startsWith("color-fd-") || name.startsWith("font-")) continue

    variables.push({ name, value, mode })
  }

  return variables
}

// ============================================================================
// TOKEN CATEGORIZATION
// ============================================================================

type TokenCategory =
  | "color"
  | "spacing"
  | "radius"
  | "shadow"
  | "typography"
  | "other"

interface CategorizedToken {
  category: TokenCategory
  group: string
  name: string
  value: string
  mode: "light" | "dark"
}

const TOKEN_CATEGORIES: Record<
  string,
  { category: TokenCategory; group: string }
> = {
  // Colors - semantic
  background: { category: "color", group: "background" },
  foreground: { category: "color", group: "foreground" },
  primary: { category: "color", group: "primary" },
  "primary-foreground": { category: "color", group: "primary" },
  secondary: { category: "color", group: "secondary" },
  "secondary-foreground": { category: "color", group: "secondary" },
  muted: { category: "color", group: "muted" },
  "muted-foreground": { category: "color", group: "muted" },
  accent: { category: "color", group: "accent" },
  "accent-foreground": { category: "color", group: "accent" },
  destructive: { category: "color", group: "destructive" },
  card: { category: "color", group: "card" },
  "card-foreground": { category: "color", group: "card" },
  popover: { category: "color", group: "popover" },
  "popover-foreground": { category: "color", group: "popover" },
  border: { category: "color", group: "border" },
  input: { category: "color", group: "input" },
  ring: { category: "color", group: "ring" },
  // Charts
  "chart-1": { category: "color", group: "chart" },
  "chart-2": { category: "color", group: "chart" },
  "chart-3": { category: "color", group: "chart" },
  "chart-4": { category: "color", group: "chart" },
  "chart-5": { category: "color", group: "chart" },
  // Sidebar
  sidebar: { category: "color", group: "sidebar" },
  "sidebar-foreground": { category: "color", group: "sidebar" },
  "sidebar-primary": { category: "color", group: "sidebar" },
  "sidebar-primary-foreground": { category: "color", group: "sidebar" },
  "sidebar-accent": { category: "color", group: "sidebar" },
  "sidebar-accent-foreground": { category: "color", group: "sidebar" },
  "sidebar-border": { category: "color", group: "sidebar" },
  "sidebar-ring": { category: "color", group: "sidebar" },
  // Surface & Code
  surface: { category: "color", group: "surface" },
  "surface-foreground": { category: "color", group: "surface" },
  code: { category: "color", group: "code" },
  "code-foreground": { category: "color", group: "code" },
  "code-highlight": { category: "color", group: "code" },
  "code-number": { category: "color", group: "code" },
  // Selection
  selection: { category: "color", group: "selection" },
  "selection-foreground": { category: "color", group: "selection" },
  // Trends
  "trend-up": { category: "color", group: "trend" },
  "trend-down": { category: "color", group: "trend" },
  // Radius
  radius: { category: "radius", group: "base" },
}

function categorizeToken(variable: CssVariable): CategorizedToken {
  const mapping = TOKEN_CATEGORIES[variable.name]

  if (mapping) {
    return {
      category: mapping.category,
      group: mapping.group,
      name: variable.name,
      value: variable.value,
      mode: variable.mode,
    }
  }

  // Default categorization based on name patterns
  if (variable.name.includes("radius")) {
    return {
      category: "radius",
      group: "base",
      name: variable.name,
      value: variable.value,
      mode: variable.mode,
    }
  }

  if (variable.name.includes("shadow")) {
    return {
      category: "shadow",
      group: "base",
      name: variable.name,
      value: variable.value,
      mode: variable.mode,
    }
  }

  return {
    category: "other",
    group: "misc",
    name: variable.name,
    value: variable.value,
    mode: variable.mode,
  }
}

// ============================================================================
// W3C FORMAT CONVERSION
// ============================================================================

function convertToW3CFormat(tokens: CategorizedToken[]): DesignTokensFile {
  const lightTokens: DesignTokenGroup = {}
  const darkTokens: DesignTokenGroup = {}

  // Group tokens by category and mode
  for (const token of tokens) {
    const targetGroup = token.mode === "light" ? lightTokens : darkTokens

    // Ensure category group exists
    if (!targetGroup[token.category]) {
      targetGroup[token.category] = {}
    }

    const categoryGroup = targetGroup[token.category] as DesignTokenGroup

    // Ensure subgroup exists
    if (!categoryGroup[token.group]) {
      categoryGroup[token.group] = {}
    }

    const subGroup = categoryGroup[token.group] as DesignTokenGroup

    // Determine W3C $type based on category
    const $type = getW3CType(token.category, token.value)

    // Add token
    subGroup[token.name] = {
      $value: token.value,
      $type,
    }
  }

  return {
    $schema: "https://design-tokens.github.io/community-group/format/",
    name: "nessra-ui",
    version: "0.1.0",
    tokens: {
      color: {},
      spacing: {},
      radius: {},
      shadow: {},
      typography: {},
    },
    modes: {
      light: lightTokens,
      dark: darkTokens,
    },
    meta: {
      generatedAt: new Date().toISOString(),
      source: "src/app/global.css",
      extractorVersion: "0.1.0",
    },
  }
}

function getW3CType(category: TokenCategory, value: string): string {
  switch (category) {
    case "color":
      return "color"
    case "spacing":
      return "dimension"
    case "radius":
      return "dimension"
    case "shadow":
      return "shadow"
    case "typography":
      return "fontWeight"
    default:
      // Infer from value
      if (
        value.startsWith("oklch") ||
        value.startsWith("#") ||
        value.startsWith("rgb")
      ) {
        return "color"
      }
      if (value.match(/^\d+(\.\d+)?(px|rem|em|%)$/)) {
        return "dimension"
      }
      return "string"
  }
}

// ============================================================================
// FIGMA VARIABLES FORMAT
// ============================================================================

interface FigmaVariable {
  name: string
  resolvedType: "COLOR" | "FLOAT" | "STRING"
  valuesByMode: {
    light: string | number
    dark: string | number
  }
  scopes: string[]
}

function convertToFigmaFormat(tokens: CategorizedToken[]): FigmaVariable[] {
  const figmaVars: FigmaVariable[] = []
  const tokensByName = new Map<string, { light?: string; dark?: string }>()

  // Group by name
  for (const token of tokens) {
    if (!tokensByName.has(token.name)) {
      tokensByName.set(token.name, {})
    }
    const entry = tokensByName.get(token.name)!
    entry[token.mode] = token.value
  }

  // Convert to Figma format
  for (const [name, values] of tokensByName) {
    const category = TOKEN_CATEGORIES[name]?.category || "other"

    figmaVars.push({
      name: formatFigmaName(name),
      resolvedType: category === "color" ? "COLOR" : "STRING",
      valuesByMode: {
        light: values.light || "",
        dark: values.dark || values.light || "",
      },
      scopes: getFigmaScopes(category),
    })
  }

  return figmaVars
}

function formatFigmaName(cssVarName: string): string {
  // Convert kebab-case to Title Case with /
  // background -> Background
  // primary-foreground -> Primary/Foreground
  // chart-1 -> Chart/1
  return cssVarName
    .split("-")
    .map((part, i) => {
      if (i === 0) return capitalize(part)
      if (/^\d+$/.test(part)) return part
      return "/" + capitalize(part)
    })
    .join("")
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function getFigmaScopes(category: TokenCategory): string[] {
  switch (category) {
    case "color":
      return ["ALL_FILLS", "STROKE_COLOR", "EFFECT_COLOR"]
    case "radius":
      return ["CORNER_RADIUS"]
    case "spacing":
      return ["GAP", "WIDTH_HEIGHT"]
    default:
      return ["ALL_SCOPES"]
  }
}

// ============================================================================
// TAILWIND CONFIG FORMAT
// ============================================================================

function convertToTailwindFormat(tokens: CategorizedToken[]): string {
  const colorTokens = tokens.filter(
    (t) => t.category === "color" && t.mode === "light"
  )

  const colors: Record<string, string> = {}
  for (const token of colorTokens) {
    colors[token.name] = `var(--${token.name})`
  }

  return `// Auto-generated from design tokens
// Usage: import into tailwind.config.ts

export const colors = ${JSON.stringify(colors, null, 2)}
`
}

// ============================================================================
// MAIN
// ============================================================================

interface ExtractOptions {
  input?: string
  outputDir?: string
  formats?: ("w3c" | "figma" | "tailwind")[]
}

export async function extractTokens(options: ExtractOptions = {}) {
  const {
    input = "src/app/global.css",
    outputDir = "tokens",
    formats = ["w3c", "figma"],
  } = options

  console.log("🎨 nessra-ui Token Extractor v0.1.0\n")

  // Read CSS file
  const cssPath = path.resolve(input)
  if (!fs.existsSync(cssPath)) {
    console.error(`❌ CSS file not found: ${cssPath}`)
    process.exit(1)
  }

  const cssContent = fs.readFileSync(cssPath, "utf-8")
  console.log(`📄 Reading: ${input}`)

  // Parse CSS variables
  const variables = parseCssVariables(cssContent)
  console.log(`🔍 Found ${variables.length} CSS variables`)

  // Categorize tokens
  const categorizedTokens = variables.map(categorizeToken)

  // Count by category
  const byCategory = categorizedTokens.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  console.log("\n📊 Token breakdown:")
  for (const [cat, count] of Object.entries(byCategory)) {
    console.log(`   ${cat}: ${count}`)
  }

  // Create output directory
  const outputPath = path.resolve(outputDir)
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  // Generate outputs
  console.log("\n📁 Generating outputs:")

  if (formats.includes("w3c")) {
    const w3cTokens = convertToW3CFormat(categorizedTokens)
    const w3cPath = path.join(outputPath, "design-tokens.json")
    fs.writeFileSync(w3cPath, JSON.stringify(w3cTokens, null, 2))
    console.log(`   ✅ W3C Format: ${w3cPath}`)
  }

  if (formats.includes("figma")) {
    const figmaVars = convertToFigmaFormat(categorizedTokens)
    const figmaPath = path.join(outputPath, "figma-variables.json")
    fs.writeFileSync(figmaPath, JSON.stringify(figmaVars, null, 2))
    console.log(`   ✅ Figma Format: ${figmaPath}`)
  }

  if (formats.includes("tailwind")) {
    const tailwindConfig = convertToTailwindFormat(categorizedTokens)
    const tailwindPath = path.join(outputPath, "tailwind-colors.ts")
    fs.writeFileSync(tailwindPath, tailwindConfig)
    console.log(`   ✅ Tailwind Format: ${tailwindPath}`)
  }

  // Summary
  console.log("\n" + "=".repeat(50))
  console.log(`✅ Extracted ${categorizedTokens.length / 2} unique tokens`)
  console.log(
    `   Light mode: ${variables.filter((v) => v.mode === "light").length}`
  )
  console.log(
    `   Dark mode: ${variables.filter((v) => v.mode === "dark").length}`
  )

  return { variables, categorizedTokens }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2)

  const options: ExtractOptions = {}

  if (args.includes("--input")) {
    options.input = args[args.indexOf("--input") + 1]
  }

  if (args.includes("--output")) {
    options.outputDir = args[args.indexOf("--output") + 1]
  }

  if (args.includes("--format")) {
    const formatArg = args[args.indexOf("--format") + 1]
    options.formats = formatArg.split(",") as ("w3c" | "figma" | "tailwind")[]
  }

  extractTokens(options).catch(console.error)
}
