import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import rehypePrettyCode from "rehype-pretty-code"

import { transformers } from "./src/lib/highlight-code"

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: frontmatterSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      // Remove default rehype-pretty-code plugin
      plugins.shift()
      // Add our configured rehype-pretty-code
      plugins.push([
        rehypePrettyCode as never,
        {
          theme: {
            dark: "github-dark",
            light: "github-light",
          },
          transformers,
        },
      ])

      return plugins
    },
  },
})
