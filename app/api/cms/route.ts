import { NextResponse } from "next/server"
import { getCMSContent, updateCMSContent } from "@/lib/cms"

export async function GET() {
  try {
    const content = getCMSContent()
    return NextResponse.json(content)
  } catch (error) {
    console.error("Error fetching CMS content:", error)
    return NextResponse.json({ error: "Failed to fetch CMS content" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json()
    updateCMSContent(newContent)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating CMS content:", error)
    return NextResponse.json({ error: "Failed to update CMS content" }, { status: 500 })
  }
}
