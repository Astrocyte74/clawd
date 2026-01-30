import { Rocket, Github, FolderOpen } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"

export function WelcomeView() {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="p-6 lg:p-8">
        {/* Hero section */}
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-8 text-center mb-8">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20 mesh-gradient"></div>
          <div className="absolute -top-20 -right-20 h-64 w-64">
            <div className="h-full w-full rounded-full bg-gradient-to-br from-primary/30 to-purple-500/30 blur-3xl"></div>
          </div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64">
            <div className="h-full w-full rounded-full bg-gradient-to-tr from-pink-500/30 to-orange-500/30 blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground mb-4">
              <Rocket className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Welcome to Clawd Hub</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              A modern dashboard for AI-powered projects, home improvement plans, and research documentation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" className="rounded-xl" asChild>
                <a
                  href="https://github.com/astrocyte74/clawd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl">
                <FolderOpen className="h-5 w-5 mr-2" />
                Browse Projects
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Total Projects</CardDescription>
              <CardTitle className="text-3xl">1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>Home Improvement</CardDescription>
              <CardTitle className="text-3xl">1</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Renovation projects</p>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader className="pb-2">
              <CardDescription>AI Research</CardDescription>
              <CardTitle className="text-3xl">0</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Research reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick start */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <CardDescription>Get started with Clawd Hub</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Navigate using the sidebar</p>
                  <p className="text-sm text-muted-foreground">Click the icons on the left to browse different project categories</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Explore project details</p>
                  <p className="text-sm text-muted-foreground">Click on any project card to view detailed information</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Customize your experience</p>
                  <p className="text-sm text-muted-foreground">Use the theme button in the header to switch between color schemes</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
