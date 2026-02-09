import { FolderOpen } from "lucide-react"
import { ProjectCard } from "./ProjectCard"
import { projects } from "@/lib/projects"
import type { NavItem } from "./NavSidebar"

interface ProjectsViewProps {
  activeNav: NavItem
}

export function ProjectsView({ activeNav }: ProjectsViewProps) {
  // Filter projects based on active nav
  const filteredProjects = [...projects]
    .filter((project) => {
      if (activeNav === "projects") return true
      if (activeNav === "home-renovation") return project.category === "home-renovation"
      if (activeNav === "ai-research") return project.category === "ai-research"
      return true
    })
    .sort((a, b) => {
      // Sort by updatedAt (newest first)
      const timeDiff = b.updatedAt.getTime() - a.updatedAt.getTime()
      if (timeDiff !== 0) return timeDiff
      // Secondary sort by date string
      return b.date.localeCompare(a.date)
    })

  const getCategoryTitle = () => {
    switch (activeNav) {
      case "projects": return "All Projects"
      case "home-renovation": return "Home Renovation"
      case "ai-research": return "AI Research"
      default: return "Projects"
    }
  }

  const getCategoryIcon = () => {
    switch (activeNav) {
      case "projects": return "📁"
      case "home-renovation": return "🏠"
      case "ai-research": return "🤖"
      default: return "📁"
    }
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="p-6 lg:p-8">
        {/* Section header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{getCategoryIcon()}</span>
            <h2 className="text-2xl font-bold">{getCategoryTitle()}</h2>
          </div>
          <p className="text-muted-foreground ml-14">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} available
          </p>
        </div>

        {/* Projects grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 rounded-2xl border-2 border-dashed border-border/50 text-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Projects for this category will appear here soon.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
