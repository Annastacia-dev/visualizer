"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb, Loader2 } from "lucide-react"

interface ChartRecommendation {
  chartType: "bar" | "line" | "pie" | "scatter"
  xAxis: string
  yAxis: string
  title: string
  description: string
}

interface ChartRecommendationsProps {
  data: any[]
  columns: string[]
  onSelect: (chartType: string, xAxis: string, yAxis: string) => void
}

export function ChartRecommendations({ data, columns, onSelect }: ChartRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<ChartRecommendation[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const getRecommendations = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/chart-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, columns }),
      })

      if (!response.ok) {
        throw new Error("Failed to get recommendations")
      }

      const result = await response.json()
      setRecommendations(result.recommendations)
    } catch (error) {
      console.error("Error getting chart recommendations:", error)
      toast({
        title: "Error",
        description: "Failed to generate chart recommendations",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (data.length > 0 && columns.length > 0) {
      getRecommendations()
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Chart Recommendations
        </CardTitle>
        <CardDescription>Smart suggestions for visualizing your data</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium text-lg">{rec.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <span className="px-2 py-1 bg-muted rounded-md">{rec.chartType}</span>
                  <span>•</span>
                  <span>X: {rec.xAxis}</span>
                  <span>•</span>
                  <span>Y: {rec.yAxis}</span>
                </div>
                <Button variant="outline" size="sm" onClick={() => onSelect(rec.chartType, rec.xAxis, rec.yAxis)}>
                  Apply This Chart
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No recommendations available</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={getRecommendations} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Recommendations"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
