/**
 * nessra-sync Figma Plugin - Main Code
 *
 * This file runs in Figma's sandbox and handles:
 * - Component generation from schemas
 * - Token/variable synchronization
 * - Change detection
 * - Communication with the UI
 */

// ============================================================================
// TYPES
// ============================================================================

interface PluginMessage {
  type: string
  payload?: unknown
}

interface ComponentSchema {
  name: string
  variants: VariantDef[]
  baseClasses: string
  figmaMapping: FigmaMapping
}

interface VariantDef {
  name: string
  values: Record<string, { name: string; classes: string }>
  defaultValue: string | null
}

interface FigmaMapping {
  componentName: string
  variantProperties: {
    name: string
    values: string[]
    defaultValue: string
  }[]
  booleanProperties: string[]
  textProperties: string[]
}

interface TokenVariable {
  name: string
  resolvedType: "COLOR" | "FLOAT" | "STRING"
  valuesByMode: {
    light: string
    dark: string
  }
  scopes: string[]
}

interface SyncState {
  lastSync: string
  componentsCount: number
  tokensCount: number
  status: "synced" | "pending" | "error"
}

// ============================================================================
// PLUGIN STATE
// ============================================================================

const STORAGE_KEY = "nessra-sync-state"

async function loadState(): Promise<SyncState | null> {
  try {
    const data = await figma.clientStorage.getAsync(STORAGE_KEY)
    return data as SyncState | null
  } catch (_e) {
    return null
  }
}

async function saveState(state: SyncState): Promise<void> {
  await figma.clientStorage.setAsync(STORAGE_KEY, state)
}

// ============================================================================
// COLOR UTILITIES
// ============================================================================

/**
 * Parse OKLCH color string to Figma RGB
 * oklch(0.21 0.006 285.885) -> { r, g, b }
 */
function parseOklchToRgb(oklch: string): RGB | null {
  const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)/)
  if (!match) return null

  const [, l, c, h] = match.map(Number)

  // Simplified OKLCH to sRGB conversion
  // For production, use a proper color library
  const L = l
  const C = c
  const H = (h * Math.PI) / 180

  // OKLCH -> OKLab
  const a = C * Math.cos(H)
  const b = C * Math.sin(H)

  // OKLab -> Linear sRGB (simplified)
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b

  const l3 = l_ * l_ * l_
  const m3 = m_ * m_ * m_
  const s3 = s_ * s_ * s_

  const r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3
  const bVal = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3

  // Clamp to 0-1
  return {
    r: Math.max(0, Math.min(1, r)),
    g: Math.max(0, Math.min(1, g)),
    b: Math.max(0, Math.min(1, bVal)),
  }
}

/**
 * Parse any color string to Figma RGB
 */
function parseColorToRgb(color: string): RGB | null {
  if (color.startsWith("oklch")) {
    return parseOklchToRgb(color)
  }

  // Handle hex colors
  if (color.startsWith("#")) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16) / 255
    const g = parseInt(hex.slice(2, 4), 16) / 255
    const b = parseInt(hex.slice(4, 6), 16) / 255
    return { r, g, b }
  }

  return null
}

// ============================================================================
// VARIABLE MANAGEMENT
// ============================================================================

async function getOrCreateCollection(
  name: string
): Promise<VariableCollection> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const existing = collections.find((c) => c.name === name)

  if (existing) {
    return existing
  }

  return figma.variables.createVariableCollection(name)
}

async function importTokensToVariables(
  tokens: TokenVariable[]
): Promise<{ created: number; updated: number; errors: string[] }> {
  const result = { created: 0, updated: 0, errors: [] as string[] }

  try {
    // Get or create the nessra-ui collection
    const collection = await getOrCreateCollection("nessra-ui")

    // Get available modes
    let lightModeId = collection.defaultModeId
    let darkModeId: string | null = null

    for (const mode of collection.modes) {
      if (mode.name.toLowerCase() === "dark") {
        darkModeId = mode.modeId
      } else if (mode.name.toLowerCase() === "light") {
        lightModeId = mode.modeId
      }
    }

    // Try to create dark mode (may fail on free accounts - limited to 1 mode)
    if (!darkModeId) {
      try {
        darkModeId = collection.addMode("Dark")
        collection.renameMode(lightModeId, "Light")
      } catch (_e) {
        // Free account - single mode only, use light values
        console.log("Single mode only (free account), using light values")
      }
    }

    // Get existing variables
    const existingVars = await figma.variables.getLocalVariablesAsync()
    const varsByName = new Map(
      existingVars
        .filter((v) => v.variableCollectionId === collection.id)
        .map((v) => [v.name, v])
    )

    // Import each token
    for (const token of tokens) {
      try {
        let variable = varsByName.get(token.name)

        if (!variable) {
          // Create new variable
          variable = figma.variables.createVariable(
            token.name,
            collection,
            token.resolvedType
          )
          result.created++
        } else {
          result.updated++
        }

        // Set light mode value
        if (token.resolvedType === "COLOR") {
          const lightRgb = parseColorToRgb(token.valuesByMode.light)
          const darkRgb = parseColorToRgb(token.valuesByMode.dark)

          if (lightRgb) {
            variable.setValueForMode(lightModeId, lightRgb)
          }
          if (darkRgb && darkModeId) {
            variable.setValueForMode(darkModeId, darkRgb)
          }
        } else {
          variable.setValueForMode(lightModeId, token.valuesByMode.light)
          if (darkModeId) {
            variable.setValueForMode(darkModeId, token.valuesByMode.dark)
          }
        }

        // Set scopes
        if (token.scopes && token.scopes.length > 0) {
          variable.scopes = token.scopes as VariableScope[]
        }
      } catch (err) {
        result.errors.push(`${token.name}: ${err}`)
      }
    }
  } catch (err) {
    result.errors.push(`Collection error: ${err}`)
  }

  return result
}

async function exportVariablesToTokens(): Promise<TokenVariable[]> {
  const tokens: TokenVariable[] = []

  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const nessraCollection = collections.find((c) => c.name === "nessra-ui")

  if (!nessraCollection) {
    return tokens
  }

  const variables = await figma.variables.getLocalVariablesAsync()
  const collectionVars = variables.filter(
    (v) => v.variableCollectionId === nessraCollection.id
  )

  // Find mode IDs
  let lightModeId = nessraCollection.defaultModeId
  let darkModeId = nessraCollection.defaultModeId

  for (const mode of nessraCollection.modes) {
    if (mode.name.toLowerCase() === "dark") {
      darkModeId = mode.modeId
    } else if (mode.name.toLowerCase() === "light") {
      lightModeId = mode.modeId
    }
  }

  for (const variable of collectionVars) {
    const lightValue = variable.valuesByMode[lightModeId]
    const darkValue = variable.valuesByMode[darkModeId]

    tokens.push({
      name: variable.name,
      resolvedType: variable.resolvedType as "COLOR" | "FLOAT" | "STRING",
      valuesByMode: {
        light: formatVariableValue(lightValue, variable.resolvedType),
        dark: formatVariableValue(darkValue, variable.resolvedType),
      },
      scopes: variable.scopes as string[],
    })
  }

  return tokens
}

function formatVariableValue(value: VariableValue, type: string): string {
  if (type === "COLOR" && typeof value === "object" && "r" in value) {
    const rgb = value as RGB
    const r = Math.round(rgb.r * 255)
    const g = Math.round(rgb.g * 255)
    const b = Math.round(rgb.b * 255)
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
  }
  return String(value)
}

// ============================================================================
// COMPONENT GENERATION
// ============================================================================

async function generateComponentFromSchema(
  schema: ComponentSchema
): Promise<ComponentSetNode | ComponentNode | null> {
  const { figmaMapping, variants } = schema

  if (variants.length === 0) {
    // Simple component without variants
    const component = figma.createComponent()
    component.name = figmaMapping.componentName

    // Create basic structure
    await setupComponentStructure(component, schema)

    return component
  }

  // Component with variants - create ComponentSet
  const components: ComponentNode[] = []

  // Generate all variant combinations
  const combinations = generateVariantCombinations(variants)

  for (const combo of combinations) {
    const component = figma.createComponent()
    component.name = formatVariantName(combo)

    await setupComponentStructure(component, schema)

    components.push(component)
  }

  // Combine into ComponentSet
  if (components.length > 0) {
    const componentSet = figma.combineAsVariants(components, figma.currentPage)
    componentSet.name = figmaMapping.componentName

    return componentSet
  }

  return null
}

function generateVariantCombinations(
  variants: VariantDef[]
): Record<string, string>[] {
  if (variants.length === 0) return [{}]

  const [first, ...rest] = variants
  const restCombinations = generateVariantCombinations(rest)

  const combinations: Record<string, string>[] = []

  for (const valueName of Object.keys(first.values)) {
    for (const restCombo of restCombinations) {
      combinations.push({
        [first.name]: valueName,
        ...restCombo,
      })
    }
  }

  return combinations
}

function formatVariantName(combo: Record<string, string>): string {
  return Object.entries(combo)
    .map(([key, value]) => `${capitalize(key)}=${capitalize(value)}`)
    .join(", ")
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function setupComponentStructure(
  component: ComponentNode,
  schema: ComponentSchema
): Promise<void> {
  // Set auto-layout
  component.layoutMode = "HORIZONTAL"
  component.primaryAxisAlignItems = "CENTER"
  component.counterAxisAlignItems = "CENTER"
  component.paddingLeft = 16
  component.paddingRight = 16
  component.paddingTop = 8
  component.paddingBottom = 8
  component.itemSpacing = 8
  component.cornerRadius = 6

  // Add text layer
  const text = figma.createText()
  await figma.loadFontAsync({ family: "Inter", style: "Medium" })
  text.fontName = { family: "Inter", style: "Medium" }
  text.characters = schema.name
  text.fontSize = 14

  component.appendChild(text)

  // Resize to hug contents
  component.layoutSizingHorizontal = "HUG"
  component.layoutSizingVertical = "HUG"
}

// ============================================================================
// MESSAGE HANDLERS
// ============================================================================

figma.ui.onmessage = async (msg: PluginMessage) => {
  console.log("Received message:", msg.type)

  switch (msg.type) {
    case "import-tokens": {
      const tokens = msg.payload as TokenVariable[]
      const result = await importTokensToVariables(tokens)

      figma.ui.postMessage({
        type: "import-tokens-result",
        payload: result,
      })

      figma.notify(
        `Imported ${result.created} new, updated ${result.updated} tokens`
      )
      break
    }

    case "export-tokens": {
      const tokens = await exportVariablesToTokens()

      figma.ui.postMessage({
        type: "export-tokens-result",
        payload: tokens,
      })
      break
    }

    case "generate-component": {
      const schema = msg.payload as ComponentSchema
      const result = await generateComponentFromSchema(schema)

      if (result) {
        // Center in viewport
        figma.viewport.scrollAndZoomIntoView([result])

        figma.ui.postMessage({
          type: "generate-component-result",
          payload: { success: true, name: result.name },
        })

        figma.notify(`Created component: ${result.name}`)
      } else {
        figma.ui.postMessage({
          type: "generate-component-result",
          payload: { success: false, error: "Failed to create component" },
        })
      }
      break
    }

    case "get-state": {
      const state = await loadState()
      figma.ui.postMessage({
        type: "state",
        payload: state,
      })
      break
    }

    case "save-state": {
      await saveState(msg.payload as SyncState)
      break
    }

    case "close": {
      figma.closePlugin()
      break
    }

    default:
      console.log("Unknown message type:", msg.type)
  }
}

// ============================================================================
// MENU COMMANDS
// ============================================================================

figma.on("run", ({ command }: { command: string }) => {
  // Show UI for all commands
  figma.showUI(__html__, {
    width: 400,
    height: 600,
    title: "nessra-sync",
  })

  // Send initial command to UI
  setTimeout(() => {
    figma.ui.postMessage({
      type: "init",
      payload: { command },
    })
  }, 100)
})

// Keep plugin running
figma.on("close", () => {
  // Cleanup if needed
})
