# nessra-sync Figma Plugin

Bidirectional synchronization between nessra-ui component registry and Figma.

## Features

- **Import Tokens** - Import design tokens from registry to Figma Variables
- **Export Tokens** - Export Figma Variables back to registry format
- **Generate Components** - Create Figma components from registry schemas
- **Sync Status** - Track synchronization state between code and design

## Installation

### Development

```bash
cd figma-plugin

# Install dependencies
npm install

# Build the plugin
npm run build

# Or watch for changes during development
npm run dev
```

### Load in Figma

1. Open Figma Desktop
2. Go to Plugins > Development > Import plugin from manifest
3. Select `figma-plugin/manifest.json`

## Project Structure

```
figma-plugin/
├── manifest.json       # Figma plugin manifest
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── src/
│   ├── code.ts         # Plugin main code (runs in Figma sandbox)
│   ├── ui.tsx          # Plugin UI (React)
│   └── ui.html         # HTML template for UI
├── scripts/
│   └── build-html.js   # Inlines JS into HTML for Figma
└── dist/               # Build output
    ├── code.js
    └── ui.html
```

## Usage

### Import Tokens

1. Open the plugin in Figma
2. Go to "Tokens" tab
3. Click "Fetch from nessra-ui Registry" or paste JSON
4. Click "Import to Figma Variables"

The plugin will create a "nessra-ui" Variable Collection with:

- Light mode values
- Dark mode values
- Proper scopes (fills, strokes, etc.)

### Export Tokens

1. Open the plugin in Figma
2. Go to "Tokens" tab
3. Click "Export Variables to JSON"
4. Save the JSON file

### Generate Components

1. Open the plugin in Figma
2. Go to "Components" tab
3. Click "Fetch from Registry"
4. Select a component schema
5. Click "Generate Component in Figma"

The plugin creates:

- ComponentSet with all variant combinations
- Proper naming (e.g., "Variant=Default, Size=Lg")
- Auto-layout structure

## API Endpoints (Registry)

The plugin fetches from these endpoints:

- `GET /api/tokens/figma-variables.json` - Token definitions
- `GET /api/schemas/index.json` - Component list
- `GET /api/schemas/{name}.schema.json` - Individual schema

## Development

### Architecture

```
┌──────────────────────────────────────┐
│          Figma Plugin                │
│  ┌────────────┐    ┌──────────────┐  │
│  │   code.ts  │◄──►│    ui.tsx    │  │
│  │  (sandbox) │    │   (iframe)   │  │
│  └────────────┘    └──────────────┘  │
│        │                  │          │
│        ▼                  ▼          │
│  ┌────────────┐    ┌──────────────┐  │
│  │   Figma    │    │   Registry   │  │
│  │    API     │    │     API      │  │
│  └────────────┘    └──────────────┘  │
└──────────────────────────────────────┘
```

### Message Types

| Type                 | Direction | Description            |
| -------------------- | --------- | ---------------------- |
| `import-tokens`      | UI → Code | Import tokens to Figma |
| `export-tokens`      | UI → Code | Export Figma variables |
| `generate-component` | UI → Code | Create component       |
| `get-state`          | UI → Code | Request sync state     |
| `*-result`           | Code → UI | Operation results      |

## Roadmap

- [x] Token import/export
- [x] Basic component generation
- [ ] Full variant styling
- [ ] Two-way component sync
- [ ] GitHub PR integration
- [ ] Change detection & diff view

## License

MIT
