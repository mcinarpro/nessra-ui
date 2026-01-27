import { resolve } from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["registry/new-york/ui/**/*.tsx"],
      exclude: ["**/*.test.tsx", "**/index.ts"],
    },
  },
  resolve: {
    alias: {
      "@/registry/new-york/lib/utils": resolve(
        __dirname,
        "./registry/new-york/lib/utils.ts"
      ),
      "@/registry": resolve(__dirname, "./registry"),
      "@/lib/utils": resolve(__dirname, "./registry/new-york/lib/utils.ts"),
      "@/components/ui": resolve(__dirname, "./registry/new-york/ui"),
      "@/hooks": resolve(__dirname, "./registry/new-york/hooks"),
      "@": resolve(__dirname, "./src"),
    },
  },
})
