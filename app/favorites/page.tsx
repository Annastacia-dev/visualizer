import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, Star } from "lucide-react"
import Link from "next/link"

// Sample data for favorite projects
const favoriteProjects = [
  {
    id: "f1",
    name: "Weekly Sales",
    folder: "Shopify/Orders/2025/January",
    lastUpdated: "2 days ago",
    chartType: "bar",
    folderId: "1-1-1-1",
    description: "Analysis of weekly sales performance for January 2025",
  },
  {
    id: "f4",
    name: "Funnel Visualization",
    folder: "Analytics/Conversions",
    lastUpdated: "1 week ago",
    chartType: "line",
    folderId: "2-2",
    description: "Conversion funnel analysis",
  },
]

export default function FavoritesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Favorites</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {favoriteProjects.map((project) => (
          <Link key={project.id} href={`/projects/${project.folderId}/files/${project.id}`} className="block">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{project.name}</CardTitle>
                <div className="bg-primary/10 p-2 rounded-full">
                  {project.chartType === "bar" ? (
                    <BarChart className="h-5 w-5 text-primary" />
                  ) : (
                    <LineChart className="h-5 w-5 text-primary" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">{project.folder}</div>
                <p className="text-sm mb-4">{project.description}</p>
                <div className="flex items-center mt-auto">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-2" />
                  <span className="text-sm text-muted-foreground">Updated {project.lastUpdated}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {favoriteProjects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Star className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-center text-muted-foreground">
              You don't have any favorite projects yet. Star a project to add it to your favorites.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
