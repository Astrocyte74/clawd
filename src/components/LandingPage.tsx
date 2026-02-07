import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Rocket, Home, Brain, Beaker, BookOpen, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { ProjectCard } from "./ProjectCardNew"
import { projects, type Project } from "@/lib/projects"

type FilterCategory = 'all' | 'home-renovation' | 'ai-research' | 'recipes' | 'demo' | 'guide'

interface CategoryTile {
  id: FilterCategory
  label: string
  icon: React.ElementType
  category: Project['category'] | 'all'
}

const categoryTiles: CategoryTile[] = [
  { id: 'all', label: 'All Projects', icon: Sparkles, category: 'all' },
  { id: 'ai-research', label: 'AI Research', icon: Brain, category: 'ai-research' },
  { id: 'home-renovation', label: 'Home Projects', icon: Home, category: 'home-renovation' },
  { id: 'recipes', label: 'Cooking', icon: Beaker, category: 'recipes' },
  { id: 'demo', label: 'Demos', icon: Sparkles, category: 'demo' },
  { id: 'guide', label: 'Guides', icon: BookOpen, category: 'guide' },
]

// Get 3 most recent projects
function getRecentProjects(count: number = 3): Project[] {
  return [...projects]
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, count)
}

export function LandingPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')

  // Sync URL with filter
  useEffect(() => {
    const url = new URL(window.location.href)
    const filterParam = url.searchParams.get('filter')
    if (filterParam && categoryTiles.find(t => t.id === filterParam)) {
      setActiveFilter(filterParam as FilterCategory)
    }
  }, [])

  // Update URL when filter changes
  const handleFilterChange = (filter: FilterCategory) => {
    if (filter === activeFilter) return

    setActiveFilter(filter)

    // Update URL
    const url = new URL(window.location.href)
    if (filter === 'all') {
      url.searchParams.delete('filter')
    } else {
      url.searchParams.set('filter', filter)
    }
    window.history.pushState({}, '', url.toString())
  }

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  // Get "What's New" (max 3, auto-collapses if < 3)
  const recentProjects = useMemo(() => getRecentProjects(3), [])

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: projects.length }
    projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  // Scroll to "What's New"
  const scrollToLatest = () => {
    document.getElementById('latest')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      {/* Hero Section */}
      <section className="p-6 lg:p-8 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-8 lg:p-12 text-center"
        >
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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground mb-6">
              <Rocket className="h-8 w-8" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Stonebot Hub
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore AI-powered projects, guides, and experiments.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-xl" asChild>
                <Link to="/projects">
                  Explore All Projects
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl" onClick={scrollToLatest}>
                What's New
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {projects.length} projects · Updated today
            </p>
          </div>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="px-6 lg:px-8 py-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold mb-4">Browse by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categoryTiles.map((tile) => {
              const Icon = tile.icon
              const isActive = activeFilter === tile.id
              const count = categoryCounts[tile.id] || 0

              return (
                <motion.button
                  key={tile.id}
                  onClick={() => handleFilterChange(tile.id)}
                  className={`relative px-4 py-3 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card border-border hover:border-primary/50 hover:bg-muted'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4 inline mr-2" />
                  <span className="font-medium">{tile.label}</span>
                  <span className={`ml-2 text-xs ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    ({count})
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* What's New Section */}
      {recentProjects.length > 0 && (
        <section id="latest" className="px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold mb-4">What's New</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* All Projects Section */}
      <section className="px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">
            {activeFilter === 'all' ? 'All Projects' : `${categoryTiles.find(t => t.id === activeFilter)?.label || 'Projects'} (${filteredProjects.length})`}
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-muted-foreground">No projects found in this category.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => handleFilterChange('all')}
              >
                View All Projects
              </Button>
            </div>
          )}
        </motion.div>
      </section>
    </div>
  )
}
