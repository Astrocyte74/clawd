import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { Rocket, Home, Brain, Beaker, BookOpen, Sparkles, ArrowUpDown } from "lucide-react"
import { Button } from "./ui/button"
import { ProjectCard } from "./ProjectCardNew"
import { projects, type Project } from "@/lib/projects"

type FilterCategory = 'all' | 'home-renovation' | 'ai-research' | 'recipes' | 'demo' | 'guide'
type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'category'

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
    .sort((a, b) => {
      // Primary sort by updatedAt timestamp
      const timeDiff = b.updatedAt.getTime() - a.updatedAt.getTime()
      if (timeDiff !== 0) return timeDiff

      // Secondary sort by date string (most recent first)
      const dateDiff = b.date.localeCompare(a.date)
      if (dateDiff !== 0) return dateDiff

      // Tertiary sort by title (alphabetical) for consistency
      return a.title.localeCompare(b.title)
    })
    .slice(0, count)
}

// Sort projects based on selected option
function sortProjects(projectList: Project[], sortOption: SortOption): Project[] {
  const sorted = [...projectList]

  switch (sortOption) {
    case 'newest':
      return sorted.sort((a, b) => {
        const timeDiff = b.updatedAt.getTime() - a.updatedAt.getTime()
        if (timeDiff !== 0) return timeDiff
        const dateDiff = b.date.localeCompare(a.date)
        if (dateDiff !== 0) return dateDiff
        return a.title.localeCompare(b.title)
      })
    case 'oldest':
      return sorted.sort((a, b) => {
        const timeDiff = a.updatedAt.getTime() - b.updatedAt.getTime()
        if (timeDiff !== 0) return timeDiff
        const dateDiff = a.date.localeCompare(b.date)
        if (dateDiff !== 0) return dateDiff
        return a.title.localeCompare(b.title)
      })
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'category':
      return sorted.sort((a, b) => {
        const catDiff = a.categoryLabel.localeCompare(b.categoryLabel)
        if (catDiff !== 0) return catDiff
        return a.title.localeCompare(b.title)
      })
    default:
      return sorted
  }
}

export function LandingPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')

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

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter)
    return sortProjects(filtered, sortBy)
  }, [activeFilter, sortBy])

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
      {/* Hero Section - Compressed */}
      <section className="p-4 lg:p-6 pb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-4 lg:p-6 text-center"
        >
          {/* Content */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
              <Rocket className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                Stonebot Hub
              </h1>
              <p className="text-sm lg:text-base text-muted-foreground">
                Explore AI-powered projects, guides, and experiments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button size="default" className="rounded-lg" asChild>
                <Link to="/projects">
                  Explore All
                </Link>
              </Button>
              <Button size="default" variant="outline" className="rounded-lg" onClick={scrollToLatest}>
                What's New
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {projects.length} projects · Updated today
          </p>
        </motion.div>
      </section>

      {/* Category Filters */}
      <section className="px-4 lg:px-6 py-3">
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {activeFilter === 'all' ? 'All Projects' : `${categoryTiles.find(t => t.id === activeFilter)?.label || 'Projects'} (${filteredProjects.length})`}
            </h2>

            {/* Sort Controls */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-sm bg-background border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="category">By Category</option>
              </select>
            </div>
          </div>

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
