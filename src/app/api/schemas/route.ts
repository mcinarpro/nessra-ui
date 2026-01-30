import * as fs from "node:fs"
import * as path from "node:path"
import { NextResponse } from "next/server"

/**
 * GET /api/schemas
 *
 * Returns the list of all component schemas
 */
export async function GET() {
  try {
    const schemasDir = path.join(process.cwd(), "schemas")

    // Check if schemas directory exists
    if (!fs.existsSync(schemasDir)) {
      return NextResponse.json(
        {
          error:
            "Schemas not generated. Run: npx tsx scripts/figma-sync/cli.ts extract",
        },
        { status: 404 }
      )
    }

    // Read index.json
    const indexPath = path.join(schemasDir, "index.json")
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json(
        { error: "Schema index not found" },
        { status: 404 }
      )
    }

    const index = JSON.parse(fs.readFileSync(indexPath, "utf-8"))

    return NextResponse.json(index)
  } catch (error) {
    console.error("Error reading schemas:", error)
    return NextResponse.json(
      { error: "Failed to read schemas" },
      { status: 500 }
    )
  }
}
