import * as fs from "node:fs"
import * as path from "node:path"
import { NextRequest, NextResponse } from "next/server"

/**
 * GET /api/schemas/[name]
 *
 * Returns a specific component schema by name
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  try {
    const { name } = await params
    const schemasDir = path.join(process.cwd(), "schemas")
    const schemaPath = path.join(schemasDir, `${name}.schema.json`)

    if (!fs.existsSync(schemaPath)) {
      return NextResponse.json(
        { error: `Schema not found: ${name}` },
        { status: 404 }
      )
    }

    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"))

    return NextResponse.json(schema)
  } catch (error) {
    console.error("Error reading schema:", error)
    return NextResponse.json(
      { error: "Failed to read schema" },
      { status: 500 }
    )
  }
}
