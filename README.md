# nessra ui

A beautiful component library built with Radix UI and Tailwind CSS. Install components directly into your project.

## Development

```bash
# Start dev server
pnpm dev

# Build
pnpm build
```

## Project Structure

```
nessra-ui/
├── registry/new-york/       # Source des composants (single source of truth)
│   ├── ui/                  # Composants UI
│   ├── hooks/               # Hooks
│   └── lib/                 # Utilitaires (utils.ts)
├── public/r/                # JSON générés par shadcn build
├── content/docs/            # Documentation MDX
│   ├── components/          # Doc par composant
│   └── ...
├── registry.json            # Manifest du registry
└── components.json          # Config shadcn
```

---

## Ajouter un nouveau composant

### Étape 1 : Installer le composant

```bash
npx shadcn@latest add <nom-du-composant>
```

Le composant sera installé dans `registry/new-york/ui/`.

### Étape 2 : Ajouter au registry.json

Ouvrir `registry.json` et ajouter une entrée dans le tableau `items` :

```json
{
  "name": "nom-du-composant",
  "type": "registry:ui",
  "title": "Nom Du Composant",
  "description": "Description courte du composant.",
  "dependencies": ["@radix-ui/react-xxx"],
  "registryDependencies": ["utils"],
  "files": [
    {
      "path": "registry/new-york/ui/nom-du-composant.tsx",
      "type": "registry:ui"
    }
  ]
}
```

**Notes :**

- `dependencies` : packages npm requis (regarder les imports du composant)
- `registryDependencies` : autres composants du registry requis (ex: `["utils", "button"]`)

### Étape 3 : Rebuild le registry

```bash
npx shadcn@latest build --output ./public/r
```

Cela génère `public/r/nom-du-composant.json`.

### Étape 4 : Créer la documentation MDX

Créer `content/docs/components/nom-du-composant.mdx` :

```mdx
---
title: Nom Du Composant
description: Description courte du composant.
---

## Installation

\`\`\`bash
npx shadcn@latest add https://nessra-ui.vercel.app/r/nom-du-composant.json
\`\`\`

## Usage

\`\`\`tsx
import { NomDuComposant } from "@/components/ui/nom-du-composant"
\`\`\`

\`\`\`tsx

<NomDuComposant>Example</NomDuComposant>
\`\`\`

## Examples

### Basic

\`\`\`tsx

<NomDuComposant>Basic example</NomDuComposant>
\`\`\`
```

### Étape 5 : Ajouter au menu de navigation

Ouvrir `content/docs/components/meta.json` et ajouter le nom du composant :

```json
{
  "title": "Components",
  "pages": ["button", "card", "nom-du-composant"]
}
```

### Étape 6 : Tester

```bash
# Rebuild et vérifier
pnpm build

# Tester l'installation depuis un autre projet
npx shadcn@latest add http://localhost:3000/r/nom-du-composant.json
```

---

## Commandes utiles

| Commande                                      | Description                  |
| --------------------------------------------- | ---------------------------- |
| `pnpm dev`                                    | Démarrer le serveur de dev   |
| `pnpm build`                                  | Build complet                |
| `npx shadcn@latest add <component>`           | Ajouter un composant shadcn  |
| `npx shadcn@latest build --output ./public/r` | Générer les JSON du registry |

---

## Utilisation (pour les autres projets)

### Installation directe

```bash
npx shadcn@latest add https://nessra-ui.vercel.app/r/button.json
```

### Avec namespace (recommandé)

Ajouter dans `components.json` du projet cible :

```json
{
  "registries": {
    "@nessra-ui": "https://nessra-ui.vercel.app/r/{name}.json"
  }
}
```

Puis utiliser :

```bash
npx shadcn@latest add @nessra-ui/button
npx shadcn@latest add @nessra-ui/card
```

---

## Stack

- [Next.js 16](https://nextjs.org/)
- [Fumadocs](https://fumadocs.dev/) - Documentation
- [shadcn/ui](https://ui.shadcn.com/) - Components
- [Radix UI](https://www.radix-ui.com/) - Primitives
- [Tailwind CSS v4](https://tailwindcss.com/)
