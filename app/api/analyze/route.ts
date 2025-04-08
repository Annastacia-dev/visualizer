import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { data, columns } = await req.json()

    // Generate insights using AI
    const { text: insights } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Analyze this dataset and provide 3-5 key insights:
      
      Columns: ${columns.join(", ")}
      
      Sample data (first 5 rows):
      ${JSON.stringify(data.slice(0, 5), null, 2)}
      
      Provide insights in a JSON format with the following structure:
      {
        "insights": [
          { "title": "Insight title", "description": "Detailed explanation" },
          ...
        ],
        "recommendedVisualizations": [
          { "type": "bar|line|pie|scatter", "title": "Chart title", "description": "Why this visualization is useful" }
        ]
      }`,
    })

    return NextResponse.json(JSON.parse(insights))
  } catch (error) {
    console.error("Analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze data" }, { status: 500 })
  }
}
