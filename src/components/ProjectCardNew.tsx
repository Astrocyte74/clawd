import { Link } from "react-router-dom"
import { Card, CardContent } from "./ui/card"
import { motion } from "motion/react"
import type { Project } from "@/lib/projects"
import { getUpdatedText } from "@/lib/projects"

interface ProjectCardProps {
  project: Project
  index?: number
}

/**
 * ProjectCard - One interaction model
 *
 * Entire card is clickable. No nested links.
 * Minimal metadata: title, blurb, updated text.
 * Motion: stagger entrance, hover lift, tap scale.
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index || 0) * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
    >
      <Link to={project.href} className="block h-full">
        <Card className="group cursor-pointer border border-border/50 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 overflow-hidden h-full transition-all duration-300">
          <CardContent className="p-6">
            {/* Icon + Category */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{project.categoryIcon}</span>
              <span className="text-xs font-medium text-muted-foreground">
                {project.categoryLabel}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            {/* Blurb - one line */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {project.blurb}
            </p>

            {/* Updated text - minimal */}
            <p className="text-xs text-muted-foreground">
              {getUpdatedText(project.date)}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
