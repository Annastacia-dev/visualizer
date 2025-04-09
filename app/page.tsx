"use client"

import { useState, useContext } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, FolderOpen, LineChart, Plus, Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FoldersContext, NewProjectDialog } from "@/components/app-sidebar"

// Add a redirect to the landing page for new users at the top of the file
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"

// Sample data for dashboard statistics
const stats = {
  totalFolders: 8,
  totalFiles: 5,
  totalAnalyses: 12,
  favoriteProjects: [
    {
      id: "f1",
      name: "Weekly Sales",
      folder: "Shopify/Orders/2025/January",
      lastUpdated: "2 days ago",
      chartType: "bar",
      folderId: "1-1-1-1",
    },
    {
      id: "f4",
      name: "Funnel Visualization",
      folder: "Analytics/Conversions",
      lastUpdated: "1 week ago",
      chartType: "line",
      folderId: "2-2",
    },
  ],
}

// Update the Dashboard component to include the redirect
export default function Dashboard() {
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false)
  const { folders } = useContext(FoldersContext)
  const { user } = useAuth()
  const router = useRouter()

  // Redirect to landing page if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/landing")
    }
  }, [user, router])

  // Calculate actual stats based on the current folders state
  const currentStats = {
    totalFolders: folders.length,
    totalFiles: folders.reduce((acc, folder) => {
      const countFiles = (f) => {
        let count = f.files?.length || 0
        if (f.folders?.length) {
          f.folders.forEach((subFolder) => {
            count += countFiles(subFolder)
          })
        }
        return count
      }
      return acc + countFiles(folder)
    }, 0),
    totalAnalyses: stats.totalAnalyses, // This would be calculated from actual data in a real app
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Button onClick={() => setShowNewProjectDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Folders</CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.totalFolders}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.totalFiles}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentStats.totalAnalyses}</div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Favorite Projects</CardTitle>
                <CardDescription>Quick access to your starred projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.favoriteProjects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.folderId}/files/${project.id}`} className="block">
                      <Card className="hover:bg-muted/50 transition-colors">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary/10 p-2 rounded-full">
                              {project.chartType === "bar" ? (
                                <BarChart className="h-5 w-5 text-primary" />
                              ) : (
                                <LineChart className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div>
                              <div className="font-medium">{project.name}</div>
                              <div className="text-sm text-muted-foreground">{project.folder}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-2" />
                            <span className="text-sm text-muted-foreground">Updated {project.lastUpdated}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent file and folder activities</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Recent activity will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <NewProjectDialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog} />
    </div>
  )
}
