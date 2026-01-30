/**
 * nessra-ui Figma Sync Types
 *
 * Shared type definitions for the Figma synchronization system.
 */

// ============================================================================
// DESIGN TOKENS (W3C Design Tokens Format Compatible)
// ============================================================================

export interface DesignTokenValue {
  $value: string | number
  $type?: string
  $description?: string
}

export interface DesignTokenGroup {
  [key: string]: DesignTokenValue | DesignTokenGroup
}

export interface DesignTokensFile {
  $schema?: string
  name: string
  version: string
  tokens: {
    color: DesignTokenGroup
    spacing: DesignTokenGroup
    radius: DesignTokenGroup
    shadow: DesignTokenGroup
    typography: DesignTokenGroup
  }
  meta: {
    generatedAt: string
    source: "code" | "figma"
  }
}

// ============================================================================
// COMPONENT SCHEMA (Registry → Figma)
// ============================================================================

export interface ComponentSchema {
  /** Unique component identifier */
  id: string
  /** Display name */
  name: string
  /** Source file path */
  filePath: string
  /** Component description */
  description?: string
  /** Schema version */
  schemaVersion: string
  /** Base Tailwind classes */
  baseClasses: string
  /** CVA variants */
  variants: ComponentVariant[]
  /** Component props */
  props: ComponentProp[]
  /** Sub-components/slots */
  slots: ComponentSlot[]
  /** NPM dependencies */
  dependencies: string[]
  /** Figma component mapping */
  figma: FigmaComponentMapping
  /** Extraction metadata */
  meta: SchemaMeta
}

export interface ComponentVariant {
  /** Variant name (e.g., "variant", "size") */
  name: string
  /** Possible values */
  values: VariantValue[]
  /** Default value */
  defaultValue: string | null
}

export interface VariantValue {
  /** Value name (e.g., "default", "destructive") */
  name: string
  /** Tailwind classes for this value */
  classes: string
  /** Extracted design tokens */
  tokens: ExtractedToken[]
}

export interface ExtractedToken {
  type: "color" | "spacing" | "radius" | "shadow" | "typography" | "other"
  /** Token name (e.g., "bg-primary") */
  name: string
  /** Raw Tailwind class */
  rawClass: string
  /** Corresponding CSS variable */
  cssVar?: string
  /** Resolved value (if available) */
  resolvedValue?: string
}

export interface ComponentProp {
  name: string
  type: string
  required: boolean
  defaultValue?: string
  description?: string
  /** For enum/union types */
  options?: string[]
}

export interface ComponentSlot {
  /** Slot name (e.g., "icon", "label") */
  name: string
  /** data-slot attribute value */
  dataSlot: string
  /** Whether the slot is optional */
  optional: boolean
  /** Slot-specific classes */
  classes?: string
}

export interface FigmaComponentMapping {
  /** Figma component name */
  componentName: string
  /** Figma component set name (if applicable) */
  componentSetName?: string
  /** Variant properties for Figma */
  variants: FigmaVariant[]
  /** Boolean properties */
  booleans: FigmaBoolean[]
  /** Text/instance swap properties */
  properties: FigmaProperty[]
}

export interface FigmaVariant {
  /** Property name in Figma */
  property: string
  /** Maps code values to Figma values */
  valueMapping: Record<string, string>
  /** Default value */
  defaultValue: string
}

export interface FigmaBoolean {
  property: string
  defaultValue: boolean
}

export interface FigmaProperty {
  property: string
  type: "text" | "instance-swap"
  defaultValue?: string
}

export interface SchemaMeta {
  extractedAt: string
  extractorVersion: string
  sourceHash?: string
}

// ============================================================================
// SYNC STATE & DIFF
// ============================================================================

export interface SyncState {
  /** Last sync timestamp */
  lastSync: string
  /** Component states */
  components: ComponentSyncState[]
  /** Token states */
  tokens: TokenSyncState
}

export interface ComponentSyncState {
  componentId: string
  /** Hash of code source */
  codeHash: string
  /** Hash of Figma component (if available) */
  figmaHash?: string
  /** Sync status */
  status: "synced" | "code-ahead" | "figma-ahead" | "conflict" | "new"
  /** Last modification times */
  codeModifiedAt: string
  figmaModifiedAt?: string
}

export interface TokenSyncState {
  /** Hash of tokens in code */
  codeHash: string
  /** Hash of tokens in Figma */
  figmaHash?: string
  /** Sync status */
  status: "synced" | "code-ahead" | "figma-ahead" | "conflict"
}

export interface SyncDiff {
  type: "component" | "token"
  componentId?: string
  tokenPath?: string
  /** What changed */
  changes: DiffChange[]
  /** Suggested resolution */
  resolution: "use-code" | "use-figma" | "manual"
}

export interface DiffChange {
  path: string
  codeValue: unknown
  figmaValue: unknown
  changeType: "added" | "removed" | "modified"
}

// ============================================================================
// FIGMA PLUGIN API TYPES
// ============================================================================

export interface FigmaPluginMessage {
  type:
    | "SYNC_REQUEST"
    | "SYNC_RESPONSE"
    | "PUSH_SCHEMA"
    | "PULL_CHANGES"
    | "RESOLVE_CONFLICT"
  payload: unknown
}

export interface FigmaSyncRequest {
  action: "pull" | "push" | "diff"
  componentIds?: string[]
  includeTokens?: boolean
}

export interface FigmaSyncResponse {
  success: boolean
  data?: unknown
  error?: string
  diffs?: SyncDiff[]
}

// ============================================================================
// CLI CONFIG
// ============================================================================

export interface FigmaSyncConfig {
  /** Figma file ID */
  figmaFileId?: string
  /** Figma access token (use env var) */
  figmaTokenEnvVar: string
  /** Registry path */
  registryPath: string
  /** Output schemas path */
  schemasPath: string
  /** Design tokens path */
  tokensPath: string
  /** Components to include (glob patterns) */
  include: string[]
  /** Components to exclude */
  exclude: string[]
  /** Sync options */
  sync: {
    /** Auto-create PR on Figma changes */
    autoCreatePR: boolean
    /** Branch name pattern */
    branchPattern: string
    /** Commit message pattern */
    commitPattern: string
  }
}

export const defaultConfig: FigmaSyncConfig = {
  figmaTokenEnvVar: "FIGMA_ACCESS_TOKEN",
  registryPath: "registry.json",
  schemasPath: "schemas",
  tokensPath: "tokens",
  include: ["registry/new-york/ui/**/*.tsx"],
  exclude: [],
  sync: {
    autoCreatePR: true,
    branchPattern: "figma-sync/{component}",
    commitPattern: "feat(figma): sync {component} from Figma",
  },
}
