"use client"

import { useState, useContext } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, PieChart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FoldersContext } from "@/components/app-sidebar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

// Sample data for file visualization
const sampleData = {
  f1: {
    name: "Weekly Sales",
    folder: "Shopify/Orders/2025/January",
    lastUpdated: "2 days ago",
    description: "Analysis of weekly sales performance for January 2025",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [1200, 1900, 1500, 2100],
    },
  },
  f2: {
    name: "Monthly Report",
    folder: "Shopify/Orders/2025/February",
    lastUpdated: "1 week ago",
    description: "Monthly sales report for February 2025",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      values: [1400, 1600, 1800, 2200],
    },
  },
  f3: {
    name: "Q1 Analysis",
    folder: "Analytics/Website Traffic",
    lastUpdated: "3 days ago",
    description: "Q1 website traffic analysis",
    data: {
      labels: ["January", "February", "March"],
      values: [5000, 6200, 7100],
    },
  },
  f4: {
    name: "Funnel Visualization",
    folder: "Analytics/Conversions",
    lastUpdated: "1 week ago",
    description: "Conversion funnel analysis",
    data: {
      labels: ["Visitors", "Leads", "Prospects", "Customers"],
      values: [10000, 3500, 1200, 450],
    },
  },
  f5: {
    name: "Email Performance",
    folder: "Marketing/Campaigns",
    lastUpdated: "5 days ago",
    description: "Email campaign performance metrics",
    data: {
      labels: ["Open Rate", "Click Rate", "Conversion", "Unsubscribe"],
      values: [32, 12, 5, 1],
    },
  },
}

export default function FileDashboard() {
  const params = useParams()
  const { folderId, fileId } = params
  const { getFolderById } = useContext(FoldersContext)

  const folder = getFolderById(folderId)
  let fileData = sampleData[fileId] || {
    name: "Unknown File",
    folder: "Unknown",
    lastUpdated: "Unknown",
    description: "No data available",
    data: { labels: [], values: [] },
  }

  // If we have the actual file in our folder structure, use its name
  if (folder?.files) {
    const file = folder.files.find((f) => f.id === fileId)
    if (file) {
      fileData = {
        ...fileData,
        name: file.name,
      }
    }
  }

  const [isFavorite, setIsFavorite] = useState(fileId === "f1" || fileId === "f4")

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="mb-6">
        <BreadcrumbNav folderId={folderId} fileId={fileId} />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{fileData.name}</h2>
          <p className="text-muted-foreground">{fileData.folder}</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsFavorite(!isFavorite)} className="ml-auto">
          <Star className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : ""}`} />
          <span className="sr-only">Toggle favorite</span>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>File Information</CardTitle>
          <CardDescription>{fileData.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Last updated: {fileData.lastUpdated}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="bar" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          <TabsTrigger value="line">Line Chart</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="bar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bar Chart Visualization</CardTitle>
              <CardDescription>Data represented as a bar chart</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="w-full h-full flex items-end justify-around px-4">
                {fileData.data.labels.map((label, index) => (
                  <div key={label} className="flex flex-col items-center">
                    <div
                      className="bg-primary w-16 rounded-t-md"
                      style={{
                        height: `${(fileData.data.values[index] / Math.max(...fileData.data.values)) * 200}px`,
                      }}
                    ></div>
                    <div className="mt-2 text-sm">{label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="line" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Line Chart Visualization</CardTitle>
              <CardDescription>Data represented as a line chart</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 mx-auto text-primary" />
                <p className="mt-2">Line chart visualization would be rendered here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pie Chart Visualization</CardTitle>
              <CardDescription>Data represented as a pie chart</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-primary" />
                <p className="mt-2">Pie chart visualization would be rendered here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
