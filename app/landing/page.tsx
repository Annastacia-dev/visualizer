import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LineChart, BarChart3, Layers, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Visualizer</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Login
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-4 py-24 text-center md:py-32">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Visualize Your Data with Ease</h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Create beautiful visualizations, organize your projects, and gain insights from your data.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link href="/signup">
            <Button size="lg" className="w-full">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="w-full">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Multiple Chart Types</h3>
            <p className="text-muted-foreground">
              Visualize your data with bar charts, line charts, pie charts, and more.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Project Organization</h3>
            <p className="text-muted-foreground">
              Organize your visualizations into folders and projects for easy access.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Secure Access</h3>
            <p className="text-muted-foreground">
              Your data is protected with secure authentication and access controls.
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powerful Dashboard</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Get a comprehensive view of your data with our intuitive dashboard.
          </p>
        </div>
        <div className="mx-auto mt-12 max-w-6xl rounded-lg border shadow-lg">
          <div className="aspect-[16/9] overflow-hidden rounded-t-lg bg-muted/40">
            <div className="flex h-full items-center justify-center">
              <div className="grid w-full max-w-4xl grid-cols-3 gap-4 p-8">
                <div className="col-span-3 h-16 rounded-lg bg-muted"></div>
                <div className="h-32 rounded-lg bg-muted"></div>
                <div className="h-32 rounded-lg bg-muted"></div>
                <div className="h-32 rounded-lg bg-muted"></div>
                <div className="col-span-3 h-64 rounded-lg bg-muted"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 p-6">
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Hear from people who have transformed their data visualization workflow.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          <div className="rounded-lg border p-6">
            <p className="mb-4 italic text-muted-foreground">
              "Visualizer has completely changed how I analyze my e-commerce data. The organization features are
              intuitive and the charts are beautiful."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">E-commerce Manager</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-6">
            <p className="mb-4 italic text-muted-foreground">
              "I've tried many visualization tools, but Visualizer stands out with its project organization and ease of
              use. It's now an essential part of my workflow."
            </p>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div>
                <p className="font-medium">Michael Chen</p>
                <p className="text-sm text-muted-foreground">Data Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto max-w-5xl rounded-lg bg-primary/10 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            Join thousands of users who are already visualizing their data with ease.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Visualizer</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Visualizer. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
