import { BarChart3 } from "lucide-react"

export function DashboardHeader() {
  return (
    <div className="w-full max-w-5xl flex flex-col items-center text-center">
      <div className="flex items-center gap-2">
        <BarChart3 className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-bold">Visualizer</h1>
      </div>
      <p className="mt-4 text-xl text-muted-foreground">
        Upload your data and get instant visual insights with AI-powered analysis
      </p>
    </div>
  )
}
