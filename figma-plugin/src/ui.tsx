/**
 * nessra-sync Figma Plugin - UI
 *
 * React-based UI for the Figma plugin
 */

import * as React from "react"
import { createRoot } from "react-dom/client"

// ============================================================================
// TYPES
// ============================================================================

interface TokenVariable {
  name: string
  resolvedType: "COLOR" | "FLOAT" | "STRING"
  valuesByMode: { light: string; dark: string }
  scopes: string[]
}

interface ComponentSchema {
  name: string
  description?: string
  variants: { name: string; values: Record<string, unknown> }[]
  figmaMapping: {
    componentName: string
    variantProperties: { name: string; values: string[] }[]
  }
}

interface SyncState {
  lastSync: string
  componentsCount: number
  tokensCount: number
  status: "synced" | "pending" | "error"
}

type View = "home" | "tokens" | "components" | "settings"

// ============================================================================
// STYLES
// ============================================================================

const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "16px",
    fontSize: "13px",
    color: "#333",
    minHeight: "100vh",
    backgroundColor: "#fff",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
    paddingBottom: "12px",
    borderBottom: "1px solid #e5e5e5",
  },
  logo: {
    width: "24px",
    height: "24px",
    backgroundColor: "#18181b",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold" as const,
  },
  title: {
    fontSize: "16px",
    fontWeight: 600,
    margin: 0,
  },
  nav: {
    display: "flex",
    gap: "4px",
    marginBottom: "16px",
  },
  navButton: {
    padding: "8px 12px",
    border: "none",
    backgroundColor: "transparent",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    color: "#666",
  },
  navButtonActive: {
    backgroundColor: "#f4f4f5",
    color: "#18181b",
    fontWeight: 500,
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "12px",
    color: "#18181b",
  },
  card: {
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  button: {
    padding: "10px 16px",
    backgroundColor: "#18181b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    width: "100%",
    marginBottom: "8px",
  },
  buttonSecondary: {
    backgroundColor: "#fff",
    color: "#18181b",
    border: "1px solid #e5e5e5",
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  input: {
    padding: "10px 12px",
    border: "1px solid #e5e5e5",
    borderRadius: "6px",
    fontSize: "13px",
    width: "100%",
    boxSizing: "border-box" as const,
    marginBottom: "12px",
  },
  label: {
    display: "block",
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "4px",
    color: "#666",
  },
  status: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "12px",
  },
  statusSynced: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  statusPending: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
  },
  statusError: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: "12px",
    borderBottom: "1px solid #f4f4f5",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    fontSize: "11px",
    padding: "2px 6px",
    backgroundColor: "#f4f4f5",
    borderRadius: "4px",
    color: "#666",
  },
  message: {
    padding: "12px",
    borderRadius: "6px",
    marginBottom: "12px",
    fontSize: "12px",
  },
  messageSuccess: {
    backgroundColor: "#dcfce7",
    color: "#166534",
  },
  messageError: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
  },
}

// ============================================================================
// COMPONENTS
// ============================================================================

function StatusBadge({ status }: { status: SyncState["status"] }) {
  const statusStyles = {
    synced: styles.statusSynced,
    pending: styles.statusPending,
    error: styles.statusError,
  }

  const statusText = {
    synced: "✓ Synced",
    pending: "● Pending",
    error: "✕ Error",
  }

  return (
    <span style={{ ...styles.status, ...statusStyles[status] }}>
      {statusText[status]}
    </span>
  )
}

function HomeView({
  state,
  onSync,
}: {
  state: SyncState | null
  onSync: () => void
}) {
  return (
    <div>
      <div style={styles.card}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontWeight: 500 }}>Sync Status</span>
          {state && <StatusBadge status={state.status} />}
        </div>

        {state ? (
          <div style={{ fontSize: "12px", color: "#666" }}>
            <div>Last sync: {new Date(state.lastSync).toLocaleString()}</div>
            <div>Components: {state.componentsCount}</div>
            <div>Tokens: {state.tokensCount}</div>
          </div>
        ) : (
          <div style={{ fontSize: "12px", color: "#666" }}>
            Not synced yet. Connect to your registry to get started.
          </div>
        )}
      </div>

      <button style={styles.button} onClick={onSync}>
        Sync from Registry
      </button>

      <button style={{ ...styles.button, ...styles.buttonSecondary }}>
        Push Changes to Registry
      </button>
    </div>
  )
}

function TokensView({
  onImport,
  onExport,
  message,
}: {
  onImport: (tokens: TokenVariable[]) => void
  onExport: () => void
  message: { type: "success" | "error"; text: string } | null
}) {
  const [jsonInput, setJsonInput] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleImport = async () => {
    try {
      setLoading(true)
      const tokens = JSON.parse(jsonInput)
      onImport(tokens)
    } catch (e) {
      console.error("Invalid JSON:", e)
    } finally {
      setLoading(false)
    }
  }

  const handleFetchFromRegistry = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://nessra-ui.vercel.app/api/tokens?format=figma"
      )
      if (response.ok) {
        const tokens = await response.json()
        setJsonInput(JSON.stringify(tokens, null, 2))
      }
    } catch (e) {
      console.error("Failed to fetch:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {message && (
        <div
          style={{
            ...styles.message,
            ...(message.type === "success"
              ? styles.messageSuccess
              : styles.messageError),
          }}
        >
          {message.text}
        </div>
      )}

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Import Tokens</h3>

        <button
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={handleFetchFromRegistry}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch from nessra-ui Registry"}
        </button>

        <label style={styles.label}>Or paste JSON:</label>
        <textarea
          style={{ ...styles.input, minHeight: "120px", resize: "vertical" }}
          placeholder='[{ "name": "Primary", "resolvedType": "COLOR", ... }]'
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />

        <button
          style={{
            ...styles.button,
            ...(jsonInput ? {} : styles.buttonDisabled),
          }}
          onClick={handleImport}
          disabled={!jsonInput || loading}
        >
          Import to Figma Variables
        </button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Export Tokens</h3>
        <p style={{ fontSize: "12px", color: "#666", marginBottom: "12px" }}>
          Export current Figma variables to JSON format for syncing back to
          code.
        </p>
        <button
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={onExport}
        >
          Export Variables to JSON
        </button>
      </div>
    </div>
  )
}

function ComponentsView({
  onGenerate,
}: {
  onGenerate: (schema: ComponentSchema) => void
}) {
  const [schemas, setSchemas] = React.useState<ComponentSchema[]>([])
  const [loading, setLoading] = React.useState(false)
  const [selectedSchema, setSelectedSchema] =
    React.useState<ComponentSchema | null>(null)

  const fetchSchemas = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://nessra-ui.vercel.app/api/schemas/index.json"
      )
      if (response.ok) {
        const data = await response.json()
        // Fetch individual schemas
        const schemaPromises = data.components
          .slice(0, 10)
          .map(async (c: { name: string }) => {
            const res = await fetch(
              `https://nessra-ui.vercel.app/api/schemas/${c.name.toLowerCase()}.schema.json`
            )
            if (res.ok) return res.json()
            return null
          })
        const results = await Promise.all(schemaPromises)
        setSchemas(results.filter(Boolean))
      }
    } catch (e) {
      console.error("Failed to fetch schemas:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Component Schemas</h3>

        <button
          style={{ ...styles.button, ...styles.buttonSecondary }}
          onClick={fetchSchemas}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch from Registry"}
        </button>

        {schemas.length > 0 && (
          <ul style={styles.list}>
            {schemas.map((schema) => (
              <li
                key={schema.name}
                style={{
                  ...styles.listItem,
                  cursor: "pointer",
                  backgroundColor:
                    selectedSchema?.name === schema.name
                      ? "#f4f4f5"
                      : "transparent",
                }}
                onClick={() => setSelectedSchema(schema)}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>{schema.name}</div>
                  <div style={{ fontSize: "11px", color: "#666" }}>
                    {schema.variants?.length || 0} variants
                  </div>
                </div>
                <span style={styles.badge}>
                  {schema.figmaMapping?.variantProperties?.length || 0} props
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedSchema && (
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Generate: {selectedSchema.name}</h3>

          <div style={styles.card}>
            <div style={{ marginBottom: "8px" }}>
              <strong>Variants:</strong>
            </div>
            {selectedSchema.figmaMapping?.variantProperties?.map((prop) => (
              <div
                key={prop.name}
                style={{ fontSize: "12px", marginBottom: "4px" }}
              >
                {prop.name}: {prop.values.join(", ")}
              </div>
            ))}
          </div>

          <button
            style={styles.button}
            onClick={() => onGenerate(selectedSchema)}
          >
            Generate Component in Figma
          </button>
        </div>
      )}
    </div>
  )
}

function SettingsView() {
  const [registryUrl, setRegistryUrl] = React.useState(
    "https://nessra-ui.vercel.app"
  )

  return (
    <div>
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Registry Settings</h3>

        <label style={styles.label}>Registry URL</label>
        <input
          type="text"
          style={styles.input}
          value={registryUrl}
          onChange={(e) => setRegistryUrl(e.target.value)}
        />

        <button style={styles.button}>Save Settings</button>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>About</h3>
        <div style={{ fontSize: "12px", color: "#666" }}>
          <p>nessra-sync v0.1.0</p>
          <p>
            Bidirectional sync between nessra-ui component registry and Figma.
          </p>
          <p style={{ marginTop: "8px" }}>
            <a
              href="https://github.com/nessra/nessra-ui"
              target="_blank"
              rel="noopener"
              style={{ color: "#2563eb" }}
            >
              GitHub
            </a>
            {" · "}
            <a
              href="https://nessra-ui.vercel.app/docs"
              target="_blank"
              rel="noopener"
              style={{ color: "#2563eb" }}
            >
              Documentation
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// MAIN APP
// ============================================================================

function App() {
  const [view, setView] = React.useState<View>("home")
  const [state, setState] = React.useState<SyncState | null>(null)
  const [message, setMessage] = React.useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  // Listen for messages from plugin code
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const msg = event.data.pluginMessage
      if (!msg) return

      switch (msg.type) {
        case "init":
          // Handle initial command
          if (msg.payload?.command === "import-tokens") {
            setView("tokens")
          } else if (msg.payload?.command === "settings") {
            setView("settings")
          }
          break

        case "state":
          setState(msg.payload)
          break

        case "import-tokens-result":
          const result = msg.payload
          if (result.errors.length === 0) {
            setMessage({
              type: "success",
              text: `Imported ${result.created} new, updated ${result.updated} tokens`,
            })
          } else {
            setMessage({
              type: "error",
              text: `Errors: ${result.errors.join(", ")}`,
            })
          }
          break

        case "export-tokens-result":
          // Download the tokens
          const blob = new Blob([JSON.stringify(msg.payload, null, 2)], {
            type: "application/json",
          })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = "figma-tokens-export.json"
          a.click()
          break

        case "generate-component-result":
          if (msg.payload.success) {
            setMessage({
              type: "success",
              text: `Created component: ${msg.payload.name}`,
            })
          } else {
            setMessage({
              type: "error",
              text: msg.payload.error,
            })
          }
          break
      }
    }

    window.addEventListener("message", handleMessage)

    // Request initial state
    parent.postMessage({ pluginMessage: { type: "get-state" } }, "*")

    return () => window.removeEventListener("message", handleMessage)
  }, [])

  const sendMessage = (type: string, payload?: unknown) => {
    parent.postMessage({ pluginMessage: { type, payload } }, "*")
  }

  const handleSync = () => {
    // TODO: Implement full sync
    console.log("Syncing...")
  }

  const handleImportTokens = (tokens: TokenVariable[]) => {
    sendMessage("import-tokens", tokens)
  }

  const handleExportTokens = () => {
    sendMessage("export-tokens")
  }

  const handleGenerateComponent = (schema: ComponentSchema) => {
    sendMessage("generate-component", schema)
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>N</div>
        <h1 style={styles.title}>nessra-sync</h1>
      </header>

      <nav style={styles.nav}>
        {(["home", "tokens", "components", "settings"] as View[]).map((v) => (
          <button
            key={v}
            style={{
              ...styles.navButton,
              ...(view === v ? styles.navButtonActive : {}),
            }}
            onClick={() => {
              setView(v)
              setMessage(null)
            }}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
      </nav>

      {view === "home" && <HomeView state={state} onSync={handleSync} />}
      {view === "tokens" && (
        <TokensView
          onImport={handleImportTokens}
          onExport={handleExportTokens}
          message={message}
        />
      )}
      {view === "components" && (
        <ComponentsView onGenerate={handleGenerateComponent} />
      )}
      {view === "settings" && <SettingsView />}
    </div>
  )
}

// ============================================================================
// RENDER
// ============================================================================

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
