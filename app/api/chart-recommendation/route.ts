import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { data, columns } = await req.json()

    // Generate chart recommendations using AI
    const { text: recommendation } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt: `Based on this dataset, recommend the best chart types to visualize the data:
      
      Columns: ${columns.join(", ")}
      
      Sample data (first 5 rows):
      ${JSON.stringify(data.slice(0, 5), null, 2)}
      
      Provide recommendations in a JSON format with the following structure:
      {
        "recommendations": [
          {
            "chartType": "bar|line|pie|scatter",
            "xAxis": "column_name",
            "yAxis": "column_name",
            "title": "Suggested chart title",
            "description": "Why this chart is recommended"
          }
        ]
      }
      
      Focus on providing 3-4 different visualization options that would best represent the data.`,
    })

    return NextResponse.json(JSON.parse(recommendation))
  } catch (error) {
    console.error("Chart recommendation error:", error)
    return NextResponse.json({ error: "Failed to generate chart recommendations" }, { status: 500 })
  }
}
