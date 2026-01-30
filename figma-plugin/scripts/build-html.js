/**
 * Build script to inline JS into HTML for Figma plugin
 *
 * Figma plugins require all UI code to be in a single HTML file
 */

const fs = require("fs")
const path = require("path")

const distDir = path.join(__dirname, "..", "dist")
const srcDir = path.join(__dirname, "..", "src")

// Read the built JS
const uiJs = fs.readFileSync(path.join(distDir, "ui.js"), "utf-8")

// Read the HTML template
const htmlTemplate = fs.readFileSync(path.join(srcDir, "ui.html"), "utf-8")

// Escape $ in the replacement string to prevent special replacement patterns
// ($&, $`, $', $n, $$) from being interpreted by String.replace()
const escapedJs = uiJs.replace(/\$/g, "$$$$")

// Inline the JS
const html = htmlTemplate.replace(
  '<script src="ui.js"></script>',
  `<script>${escapedJs}</script>`
)

// Write the final HTML
fs.writeFileSync(path.join(distDir, "ui.html"), html)

console.log("✅ Built ui.html with inlined JS")
