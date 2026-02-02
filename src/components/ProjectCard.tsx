import { ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import type { Project } from "@/lib/projects"
import { motion } from "motion/react"

interface ProjectCardProps {
  project: Project
  index?: number
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 overflow-hidden h-full">
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
                {/* Check if icon is an emoji (contains non-ASCII) or SVG path */}
                {/\p{Emoji}/u.test(meta.icon) || meta.icon.length < 20 ? (
                  // Render emoji as text
                  <span className="text-sm">{meta.icon}</span>
                ) : (
                  // Render as SVG path (Lucide icon style)
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
                )}
                <span>{meta.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      )}

      <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground">{project.date}</span>
        <div className="flex items-center gap-1.5">
          {project.href.startsWith('http') ? (
            <Button size="icon-xs" variant="ghost" asChild className="rounded-md">
              <a href={project.href} target="_blank" rel="noopener noreferrer" className="not-document">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          ) : (
            <Button size="icon-xs" variant="ghost" asChild className="rounded-md">
              <Link to={project.href}>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
    </motion.div>
  )
}
