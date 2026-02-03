import { motion } from "motion/react"
import { ArrowLeft, Calendar, Rocket, Star, Globe2 } from "lucide-react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { getStoredTheme, type ThemeKey, type ColorMode, initializeColorMode } from "../lib/themes"
import markdownContent from './space-exploration-guide.md?raw'

/**
 * Space Exploration Guide
 *
 * Comprehensive guide to NASA's Artemis program, SpaceX's Starship,
 * and the path to Mars. Enhanced with custom UI and visual design.
 */
export default function SpaceExplorationGuidePage() {
  const currentTheme = getStoredTheme() as ThemeKey
  const currentMode: ColorMode = 'light'

  if (typeof window !== 'undefined') {
    initializeColorMode()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/5"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <Header
        currentTheme={currentTheme}
        onThemeChange={() => {}}
        currentMode={currentMode}
        onModeChange={() => {}}
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent"></div>
        <div className="container mx-auto px-4 py-16 relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Dashboard
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="text-8xl"
              >
                🚀
              </motion.div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Space Exploration Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Journey to the Moon and Mars with NASA's Artemis program and SpaceX's Starship
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">2026</div>
              <div className="text-sm text-muted-foreground">Artemis II Moon Flyby</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <Rocket className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">Starship</div>
              <div className="text-sm text-muted-foreground">SpaceX Lunar Lander</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center">
              <Globe2 className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">2028+</div>
              <div className="text-sm text-muted-foreground">Human Missions to Mars</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-primary" />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Artemis Program</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Starship Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Rocket Comparison</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Mars Timeline</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 pb-16">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 md:p-12">
            {(() => {
              const { content } = parseFrontmatter(markdownContent)
              return (
                <div className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-bold
                  prose-h1:text-4xl prose-h1:mb-4 prose-h1:mt-8
                  prose-h2:text-3xl prose-h2:mb-3 prose-h2:mt-6
                  prose-h3:text-2xl prose-h3:mb-2 prose-h3:mt-4
                  prose-p:leading-relaxed prose-p:text-base
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-semibold prose-strong:text-foreground
                  prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-muted prose-pre:border prose-pre:border-border
                  prose-table:width-full prose-table:border-collapse
                  prose-th:bg-muted prose-th:px-4 prose-th:py-2 prose-th:text-left
                  prose-td:border-b prose-td:px-4 prose-td:py-2
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic
                  prose-ul:list-disc prose-ul:pl-6
                  prose-ol:list-decimal prose-ol:pl-6
                  prose-li:mb-1
                ">
                  <ContentRenderer content={content} />
                </div>
              )
            })()}
          </div>
        </motion.article>
      </div>
    </div>
  )
}

// Simple frontmatter parser
function parseFrontmatter(content: string): { meta: any; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { meta: {}, content }
  }

  const meta: any = {}
  const frontmatterContent = match[1]

  frontmatterContent.split('\n').forEach((line: string) => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      meta[key] = value
    }
  })

  return { meta, content: match[2] }
}

// Simple markdown renderer (you can replace with react-markdown if needed)
function ContentRenderer({ content }: { content: string }) {
  // For now, return as HTML with basic formatting
  // You can enhance this with react-markdown if needed
  return (
    <div dangerouslySetInnerHTML={{
      __html: content
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        .replace(/^\d+\. (.*$)/gm, '<li class="list-decimal">$1</li>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    }} />
  )
}
