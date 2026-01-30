# nessra-ui Figma Sync - Plan de Développement

## Vision

Créer le premier système open-source de synchronisation bidirectionnelle entre un registry de composants shadcn-like et Figma, où le **code est la source de vérité** et Figma peut proposer des modifications via un workflow Git-like.

```
┌─────────────────────────────────────────────────────────────────┐
│                    NESSRA FIGMA SYNC                            │
│                                                                 │
│  registry/new-york/ui/*.tsx  ←── Source of Truth (Code)         │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐                                           │
│  │ Schema Extractor│  Parse: cva(), props, tokens              │
│  └────────┬────────┘                                           │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────┐      ┌─────────────────┐                  │
│  │ component.json  │ ───► │ Figma Plugin    │                  │
│  │ (schema)        │      │ Generate/Update │                  │
│  └─────────────────┘      └────────┬────────┘                  │
│                                    │                            │
│                                    ▼                            │
│                           ┌─────────────────┐                  │
│                           │ Figma Component │                  │
│                           │ (Auto-generated)│                  │
│                           └─────────────────┘                  │
│                                                                 │
│  REVERSE FLOW (Designer → Developer):                          │
│  Designer modifie Figma → Plugin détecte → PR auto sur GitHub  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Analyse du Marché

### Concurrents Existants

| Outil                  | Prix             | Figma→Code | Code→Figma   | Bidirectionnel | Open Source |
| ---------------------- | ---------------- | ---------- | ------------ | -------------- | ----------- |
| **Builder.io**         | $24-30/mois      | ✅         | ❌           | ❌             | ❌          |
| **Locofy.ai**          | $0.20-0.40/token | ✅         | ❌           | ❌             | ❌          |
| **Anima**              | $20-500/mois     | ✅         | ❌           | ❌             | ❌          |
| **shadcndesign**       | $119-699         | ✅         | ❌           | ❌             | ❌          |
| **shadcnstudio**       | $99-849          | ✅         | ❌           | ❌             | Partiel     |
| **Obra**               | Gratuit          | ⚠️ CSS     | ❌           | ❌             | ✅          |
| **Figma Code Connect** | Enterprise       | ❌         | ✅ (one-way) | ❌             | ✅          |
| **Tokens Studio**      | Gratuit          | Tokens     | Tokens       | ✅ Tokens      | ✅          |
| **nessra-sync**        | TBD              | ✅         | ✅           | ✅             | ✅          |

### Gap du Marché

1. ❌ Aucun outil ne fait de sync **Code → Figma** au niveau composant
2. ❌ Aucun outil n'offre de workflow **Git-like** (branches, PRs, merge)
3. ❌ Aucun outil **open-source complet** pour l'écosystème shadcn
4. ✅ Les tokens ont une bonne solution (Tokens Studio, GitFig)

---

## Architecture Technique

### Phase 1: Schema Extractor (POC) ✅ DONE

```
scripts/figma-sync/
├── extract-schema.ts    # Extracteur principal
├── types.ts             # Types partagés
└── README.md            # Documentation
```

**Ce que l'extracteur fait:**

- Parse les fichiers `.tsx` du registry
- Extrait les variants CVA (noms, valeurs, défauts)
- Extrait les props TypeScript
- Identifie les design tokens Tailwind utilisés
- Génère un mapping Figma suggéré
- Output: `schemas/{component}.schema.json`

**Exemple de sortie (Button):**

```json
{
  "name": "Button",
  "variants": [
    {
      "name": "variant",
      "values": {
        "default": { "classes": "bg-primary text-primary-foreground..." },
        "destructive": { "classes": "bg-destructive text-white..." }
      },
      "defaultValue": "default"
    },
    {
      "name": "size",
      "values": {
        "default": { "classes": "h-9 px-4 py-2..." },
        "sm": { "classes": "h-8 rounded-md..." }
      }
    }
  ],
  "figmaMapping": {
    "componentName": "Button",
    "variantProperties": [
      { "name": "Variant", "values": ["Default", "Destructive", "Outline"...] },
      { "name": "Size", "values": ["Default", "Sm", "Lg", "Icon"...] }
    ]
  }
}
```

### Phase 2: Design Tokens Sync

```
tokens/
├── colors.json          # W3C Design Tokens format
├── spacing.json
├── radius.json
├── shadows.json
└── typography.json
```

**Features:**

- Export CSS variables → JSON (W3C format)
- Import JSON → CSS variables
- Figma Variables ↔ JSON bidirectionnel
- Compatible avec Tokens Studio

### Phase 3: Figma Plugin

```
figma-plugin/
├── manifest.json
├── src/
│   ├── code.ts          # Main plugin logic
│   ├── ui.tsx           # Plugin UI (React)
│   ├── sync/
│   │   ├── pull.ts      # Registry → Figma
│   │   ├── push.ts      # Figma → Registry (PR)
│   │   └── diff.ts      # Conflict detection
│   └── generators/
│       ├── component.ts # Generate Figma components
│       └── variants.ts  # Generate variant combinations
└── package.json
```

**Fonctionnalités:**

1. **Pull from Registry**: Génère/met à jour les composants Figma depuis les schemas
2. **Push to Registry**: Détecte les changements Figma, crée une PR GitHub
3. **Diff View**: Affiche les différences entre code et Figma
4. **Conflict Resolution**: Interface pour résoudre les conflits

### Phase 4: CLI

```bash
# Token sync
npx nessra-sync tokens pull    # Figma → Code
npx nessra-sync tokens push    # Code → Figma

# Component sync
npx nessra-sync extract        # Generate schemas from code
npx nessra-sync diff           # Show differences
npx nessra-sync push           # Push schemas to Figma
npx nessra-sync pull           # Pull changes from Figma (creates PR)

# Watch mode
npx nessra-sync watch          # Auto-sync on file changes
```

### Phase 5: GitHub Integration

```yaml
# .github/workflows/figma-sync.yml
name: Figma Sync

on:
  push:
    paths:
      - "registry/new-york/ui/**"
  workflow_dispatch:
    inputs:
      action:
        description: "Sync action"
        options: ["push", "pull", "diff"]

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: nessra/figma-sync-action@v1
        with:
          figma-token: ${{ secrets.FIGMA_ACCESS_TOKEN }}
          figma-file-id: ${{ vars.FIGMA_FILE_ID }}
          action: ${{ github.event.inputs.action || 'push' }}
```

---

## Roadmap

### MVP (v0.1.0) - 4-6 semaines ✅ COMPLETE

- [x] Schema Extractor (POC)
- [x] Token Extractor (CSS → JSON W3C, Figma, Tailwind)
- [x] CLI basique (`extract`, `tokens`, `diff`)
- [x] Documentation

### Alpha (v0.2.0) - 6-8 semaines - IN PROGRESS

- [x] Figma Plugin structure (manifest, code, UI)
- [x] Token import/export in plugin
- [x] Component generation from schemas
- [x] API routes for schemas and tokens
- [ ] Full variant styling in generated components
- [ ] GitHub Action basique

### Beta (v0.3.0) - 8-12 semaines

- [ ] Push Figma → Registry (PR creation)
- [ ] Conflict detection & resolution UI
- [ ] Watch mode
- [ ] Full documentation

### v1.0.0 - 12-16 semaines

- [ ] Stable API
- [ ] Enterprise features (SSO, audit logs)
- [ ] Marketplace listing (Figma Community)
- [ ] VS Code extension

---

## Structure des Fichiers

```
nessra-ui/
├── registry/
│   └── new-york/
│       └── ui/
│           └── *.tsx           # Source of truth
├── schemas/                     # Generated schemas
│   ├── index.json
│   ├── button.schema.json
│   └── ...
├── tokens/                      # Design tokens (W3C format)
│   ├── colors.json
│   └── ...
├── scripts/
│   └── figma-sync/
│       ├── extract-schema.ts
│       ├── extract-tokens.ts
│       ├── types.ts
│       └── cli.ts
├── figma-plugin/                # Figma plugin source
│   └── ...
└── docs/
    └── FIGMA_SYNC_PLAN.md      # This file
```

---

## Modèle Business

### Open Source (Core)

- Schema extractor
- Token sync (CLI)
- Figma plugin (basic features)
- GitHub Action

### Pro ($29/mois)

- Sync illimité
- Conflict resolution UI avancé
- Historique des syncs
- Support prioritaire

### Team ($99/mois)

- Multi-utilisateurs
- Analytics (quels composants sync, qui modifie)
- Webhooks
- API access

### Enterprise ($299/mois)

- Self-hosted option
- SSO/SAML
- Audit logs
- SLA
- Custom integrations

---

## Différenciateurs Clés

1. **Code-First**: Le code est toujours la source de vérité
2. **Git-Native**: Les designers proposent des changements via PR
3. **Open Source**: Core 100% open source
4. **shadcn-Compatible**: Conçu spécifiquement pour l'écosystème shadcn
5. **W3C Tokens**: Standard ouvert pour les design tokens
6. **No Vendor Lock-in**: Export/import standards ouverts

---

## Prochaines Étapes

1. **Tester l'extracteur**: `npx tsx scripts/figma-sync/extract-schema.ts`
2. **Créer le token extractor**: Parser `global.css` → JSON
3. **Évaluer partenariat Obra**: Leur plugin CSS est open-source
4. **Setup Figma plugin dev env**: Créer le squelette du plugin
5. **Documentation**: README, contributing guide

---

## Ressources

- [Figma Plugin API](https://www.figma.com/plugin-docs/)
- [Figma REST API](https://www.figma.com/developers/api)
- [W3C Design Tokens](https://design-tokens.github.io/community-group/format/)
- [Tokens Studio](https://tokens.studio/)
- [Obra shadcn Kit](https://shadcn.obra.studio/)
- [shadcn/ui Registry](https://ui.shadcn.com/docs/registry)
