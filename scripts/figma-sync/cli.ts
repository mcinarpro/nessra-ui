#!/usr/bin/env node
/**
 * nessra-sync CLI
 *
 * Unified command-line interface for Figma synchronization tools.
 *
 * Commands:
 *   extract    Extract component schemas from registry
 *   tokens     Extract design tokens from CSS
 *   diff       Compare schemas with Figma (coming soon)
 *   push       Push changes to Figma (coming soon)
 *   pull       Pull changes from Figma (coming soon)
 */
import * as fs from "node:fs"
import * as path from "node:path"

// ============================================================================
// CLI PARSING
// ============================================================================

interface CliOptions {
  command: string
  args: string[]
  flags: Record<string, string | boolean>
}

function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2)
  const command = args[0] || "help"
  const flags: Record<string, string | boolean> = {}
  const positionalArgs: string[] = []

  for (let i = 1; i < args.length; i++) {
    const arg = args[i]

    if (arg.startsWith("--")) {
      const [key, value] = arg.slice(2).split("=")
      if (value !== undefined) {
        flags[key] = value
      } else if (args[i + 1] && !args[i + 1].startsWith("-")) {
        flags[key] = args[++i]
      } else {
        flags[key] = true
      }
    } else if (arg.startsWith("-")) {
      const key = arg.slice(1)
      if (args[i + 1] && !args[i + 1].startsWith("-")) {
        flags[key] = args[++i]
      } else {
        flags[key] = true
      }
    } else {
      positionalArgs.push(arg)
    }
  }

  return { command, args: positionalArgs, flags }
}

// ============================================================================
// COMMANDS
// ============================================================================

async function commandExtract(flags: Record<string, string | boolean>) {
  const { extractComponentSchema } = await import("./extract-schema.js")

  console.log("🔍 nessra-sync extract\n")

  const outputDir = (flags.output as string) || "schemas"
  const registryPath = path.resolve("registry.json")

  if (!fs.existsSync(registryPath)) {
    console.error("❌ registry.json not found")
    process.exit(1)
  }

  const registry = JSON.parse(fs.readFileSync(registryPath, "utf-8"))
  const uiComponents = registry.items.filter(
    (item: { type: string }) => item.type === "registry:ui"
  )

  console.log(`📦 Registry: ${registry.name}`)
  console.log(`📝 Components: ${uiComponents.length}\n`)

  // Create output directory
  const outputPath = path.resolve(outputDir)
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  const schemas: unknown[] = []
  let successCount = 0
  let errorCount = 0

  for (const item of uiComponents) {
    const filePath = item.files[0]?.path
    if (!filePath || !fs.existsSync(path.resolve(filePath))) {
      errorCount++
      continue
    }

    try {
      const schema = extractComponentSchema(path.resolve(filePath), item)
      schemas.push(schema)

      const schemaPath = path.join(outputPath, `${item.name}.schema.json`)
      fs.writeFileSync(schemaPath, JSON.stringify(schema, null, 2))
      successCount++

      if (flags.verbose) {
        console.log(`  ✅ ${schema.name}`)
      }
    } catch {
      errorCount++
    }
  }

  // Write index
  const indexPath = path.join(outputPath, "index.json")
  fs.writeFileSync(
    indexPath,
    JSON.stringify(
      {
        name: registry.name,
        version: "0.1.0",
        generatedAt: new Date().toISOString(),
        componentCount: schemas.length,
      },
      null,
      2
    )
  )

  console.log(`\n✅ Extracted ${successCount} schemas`)
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} errors`)
  }
  console.log(`📁 Output: ${outputPath}`)
}

async function commandTokens(flags: Record<string, string | boolean>) {
  const { extractTokens } = await import("./extract-tokens.js")

  await extractTokens({
    input: (flags.input as string) || "src/app/global.css",
    outputDir: (flags.output as string) || "tokens",
    formats: flags.format
      ? ((flags.format as string).split(",") as (
          | "w3c"
          | "figma"
          | "tailwind"
        )[])
      : ["w3c", "figma"],
  })
}

async function commandDiff(flags: Record<string, string | boolean>) {
  console.log("🔄 nessra-sync diff\n")

  const schemasDir = (flags.schemas as string) || "schemas"
  const component = flags.component as string

  if (!fs.existsSync(schemasDir)) {
    console.error(`❌ Schemas directory not found: ${schemasDir}`)
    console.log("   Run 'nessra-sync extract' first")
    process.exit(1)
  }

  // Load schemas
  const schemaFiles = fs
    .readdirSync(schemasDir)
    .filter((f) => f.endsWith(".schema.json"))

  if (component) {
    const schemaPath = path.join(schemasDir, `${component}.schema.json`)
    if (!fs.existsSync(schemaPath)) {
      console.error(`❌ Schema not found: ${component}`)
      process.exit(1)
    }

    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"))
    console.log(`📋 Component: ${schema.name}`)
    console.log(`📁 File: ${schema.filePath}`)
    console.log(`\n🎨 Variants:`)
    for (const variant of schema.variants || []) {
      console.log(
        `   ${variant.name}: ${Object.keys(variant.values).join(", ")}`
      )
    }
    console.log(`\n📊 Props: ${schema.props?.length || 0}`)
    console.log(`🎯 Tokens: ${schema.baseTokens?.length || 0}`)

    console.log(`\n🔗 Figma Mapping:`)
    console.log(JSON.stringify(schema.figmaMapping, null, 2))
  } else {
    console.log(`📁 Found ${schemaFiles.length} component schemas\n`)

    const withVariants = schemaFiles.filter((f) => {
      const schema = JSON.parse(
        fs.readFileSync(path.join(schemasDir, f), "utf-8")
      )
      return (schema.variants?.length || 0) > 0
    })

    console.log(`🎨 Components with variants: ${withVariants.length}`)
    for (const f of withVariants) {
      const name = f.replace(".schema.json", "")
      const schema = JSON.parse(
        fs.readFileSync(path.join(schemasDir, f), "utf-8")
      )
      const variants = schema.variants
        ?.map((v: { name: string }) => v.name)
        .join(", ")
      console.log(`   ${name}: ${variants}`)
    }

    console.log("\n💡 Tip: Use --component=button to see details")
  }
}

function commandHelp() {
  console.log(`
🎨 nessra-sync - Figma Synchronization CLI

Usage: npx tsx scripts/figma-sync/cli.ts <command> [options]

Commands:
  extract     Extract component schemas from registry
  tokens      Extract design tokens from CSS
  diff        Show schema details and differences
  help        Show this help message

Options:
  --output    Output directory (default: schemas or tokens)
  --input     Input file (for tokens command)
  --format    Token formats: w3c,figma,tailwind (default: w3c,figma)
  --component Show details for specific component (diff command)
  --verbose   Show detailed output

Examples:
  npx tsx scripts/figma-sync/cli.ts extract
  npx tsx scripts/figma-sync/cli.ts tokens --format w3c,figma,tailwind
  npx tsx scripts/figma-sync/cli.ts diff --component button

Coming Soon:
  push        Push schemas to Figma
  pull        Pull changes from Figma
  watch       Watch for changes and auto-sync
`)
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const { command, flags } = parseArgs(process.argv)

  try {
    switch (command) {
      case "extract":
        await commandExtract(flags)
        break

      case "tokens":
        await commandTokens(flags)
        break

      case "diff":
        await commandDiff(flags)
        break

      case "help":
      case "--help":
      case "-h":
        commandHelp()
        break

      default:
        console.error(`❌ Unknown command: ${command}`)
        commandHelp()
        process.exit(1)
    }
  } catch (error) {
    console.error("❌ Error:", error)
    process.exit(1)
  }
}

main()
