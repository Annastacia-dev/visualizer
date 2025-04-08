"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Chart } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Lightbulb, Download, Share2 } from "lucide-react"
import { ChartRecommendations } from "@/components/chart-recommendations"

// Mock data - in a real app, this would come from the file upload
const mockData = [
  { category: "Category A", value: 400, count: 120 },
  { category: "Category B", value: 300, count: 80 },
  { category: "Category C", value: 500, count: 150 },
  { category: "Category D", value: 200, count: 60 },
  { category: "Category E", value: 350, count: 100 },
]

// Mock insights - in a real app, these would come from the AI analysis
const mockInsights = [
  {
    title: "Category C has the highest value",
    description: "Category C represents the largest portion of your data with a value of 500.",
  },
  {
    title: "Strong correlation between value and count",
    description: "There appears to be a direct relationship between the value and count metrics across all categories.",
  },
  {
    title: "Category D underperforming",
    description: "Category D has the lowest metrics across both value and count, suggesting an area for improvement.",
  },
]

export default function Dashboard() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("visualizations")
  const [selectedXAxis, setSelectedXAxis] = useState("category")
  const [selectedYAxis, setSelectedYAxis] = useState("value")

  // In a real app, we would parse the file data from the URL or context
  const [data, setData] = useState(mockData)
  const [insights, setInsights] = useState(mockInsights)
  const [columns, setColumns] = useState(["category", "value", "count"])

  // Simulate loading data from a file
  useEffect(() => {
    const fileId = searchParams.get("fileId")
    if (fileId) {
      // In a real app, we would fetch the processed data here
      console.log(`Loading data for file: ${fileId}`)
    }
  }, [searchParams])

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("visualizerData")
    const storedColumns = localStorage.getItem("visualizerColumns")

    if (storedData) {
      setData(JSON.parse(storedData))
    }

    if (storedColumns) {
      setColumns(JSON.parse(storedColumns))
    }
  }, [])

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Data Dashboard</h1>
          <p className="text-muted-foreground">Visualize and analyze your data</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="visualizations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Chart Configuration</CardTitle>
                <CardDescription>Customize your visualization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">X-Axis</label>
                  <Select value={selectedXAxis} onValueChange={setSelectedXAxis}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select X-Axis" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Y-Axis</label>
                  <Select value={selectedYAxis} onValueChange={setSelectedYAxis}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Y-Axis" />
                    </SelectTrigger>
                    <SelectContent>
                      {columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Summary</CardTitle>
                <CardDescription>Overview of your dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Records:</span>
                    <span className="font-medium">{data.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Columns:</span>
                    <span className="font-medium">{columns.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-medium">
                      {data.reduce((sum, item) => sum + (item[selectedYAxis] || 0), 0)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Chart
            data={data}
            title="Data Visualization"
            description={`${selectedXAxis} vs ${selectedYAxis}`}
            xKey={selectedXAxis}
            yKey={selectedYAxis}
          />

          <ChartRecommendations
            data={data}
            columns={columns}
            onSelect={(chartType, xAxis, yAxis) => {
              setSelectedXAxis(xAxis)
              setSelectedYAxis(yAxis)
              setActiveTab("visualizations")
            }}
          />
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                AI-Generated Insights
              </CardTitle>
              <CardDescription>Automatically generated analysis based on your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insights.map((insight, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-semibold text-lg mb-1">{insight.title}</h3>
                    <p className="text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
