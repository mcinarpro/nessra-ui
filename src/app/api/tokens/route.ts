import { NextRequest, NextResponse } from "next/server"
import * as fs from "node:fs"
import * as path from "node:path"

/**
 * GET /api/tokens
 * GET /api/tokens?format=w3c|figma|tailwind
 *
 * Returns design tokens in the specified format
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const format = searchParams.get("format") || "figma"

    const tokensDir = path.join(process.cwd(), "tokens")

    // Check if tokens directory exists
    if (!fs.existsSync(tokensDir)) {
      return NextResponse.json(
        {
          error:
            "Tokens not generated. Run: npx tsx scripts/figma-sync/cli.ts tokens",
        },
        { status: 404 }
      )
    }

    // Map format to file
    const formatFiles: Record<string, string> = {
      w3c: "design-tokens.json",
      figma: "figma-variables.json",
      tailwind: "tailwind-colors.ts",
    }

    const fileName = formatFiles[format]
    if (!fileName) {
      return NextResponse.json(
        { error: `Invalid format: ${format}. Use: w3c, figma, or tailwind` },
        { status: 400 }
      )
    }

    const filePath = path.join(tokensDir, fileName)
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Token file not found: ${fileName}` },
        { status: 404 }
      )
    }

    const content = fs.readFileSync(filePath, "utf-8")

    // Return JSON for JSON files, text for TypeScript
    if (fileName.endsWith(".json")) {
      return NextResponse.json(JSON.parse(content))
    }

    return new NextResponse(content, {
      headers: {
        "Content-Type": "text/plain",
      },
    })
  } catch (error) {
    console.error("Error reading tokens:", error)
    return NextResponse.json(
      { error: "Failed to read tokens" },
      { status: 500 }
    )
  }
}
