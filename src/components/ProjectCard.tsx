import { ExternalLink } from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import type { Project } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  delay?: string
}

export function ProjectCard({ project, delay = "0s" }: ProjectCardProps) {
  return (
    <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden animate-in" style={{ animationDelay: delay }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{project.categoryIcon}</span>
            <Badge variant="secondary" className="text-xs">
              {project.categoryLabel}
            </Badge>
          </div>
        </div>
        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>

      {project.metadata && project.metadata.length > 0 && (
        <CardContent className="pb-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {project.metadata.map((meta, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <svg
                  className="h-3.5 w-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d={meta.icon} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{meta.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground">{project.date}</span>
        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="icon-xs" variant="ghost" asChild className="rounded-md">
            <a href={project.href} className="not-document">
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
