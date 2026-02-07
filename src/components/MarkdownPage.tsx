import { ArrowLeft, ArrowUp, Lightbulb, AlertTriangle, Info } from "lucide-react"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect, useRef } from 'react'
import { motion } from "motion/react"
import { Header } from "./Header"
import { getStoredTheme, type ThemeKey, type ColorMode, initializeColorMode } from "../lib/themes"
import mermaid from 'mermaid'

interface MarkdownPageProps {
  content: string
  title?: string
  description?: string
}

interface Heading {
  id: string
  text: string
  level: number
}

// Parse GitHub-style callout syntax
function parseCallouts(content: string): { content: string; hasCallouts: boolean } {
  const calloutRegex = />\s*\[!(TIP|WARNING|NOTE)\]\s*\n([\s\S]*?)(?=\n\s*>\s*\[!(TIP|WARNING|NOTE)\]|$)/g
  const callouts: { type: string; content: string }[] = []
  let match

  while ((match = calloutRegex.exec(content)) !== null) {
    callouts.push({
      type: match[1],
      content: match[2].trim()
    })
  }

  // Replace callouts with placeholders
  let processedContent = content.replace(
    calloutRegex,
    (match) => `__CALLOUT_${callouts.findIndex(c => match.includes(c.type))}__`
  )

  return { content: processedContent, hasCallouts: callouts.length > 0 }
}

// Generate ID from heading text
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 50)
}

// Initialize Mermaid with theme
function initializeMermaid(isDark: boolean) {
  mermaid.initialize({
    startOnLoad: false,
    theme: isDark ? 'dark' : 'default',
    securityLevel: 'loose',
    themeVariables: {
      darkMode: isDark,
      background: isDark ? '#1a1a1a' : '#ffffff',
      primaryColor: isDark ? '#bb86fc' : '#6200ee',
      primaryTextColor: isDark ? '#ffffff' : '#000000',
      primaryBorderColor: isDark ? '#bb86fc' : '#6200ee',
      lineColor: isDark ? '#e0e0e0' : '#333333',
      secondaryColor: isDark ? '#3700b3' : '#03dac6',
      tertiaryColor: isDark ? '#3700b3' : '#f5f5f5',
    },
  })
}

// Mermaid Diagram Component
function MermaidDiagram({ chart, isDark }: { chart: string; isDark: boolean }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      mermaid.render(id, chart).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg
        }
      }).catch((error) => {
        console.error('Mermaid rendering error:', error)
        if (ref.current) {
          ref.current.innerHTML = `<pre class="text-red-500">Error rendering diagram: ${error.message}</pre>`
        }
      })
    }
  }, [chart, isDark])

  return <div ref={ref} className="mermaid-diagram flex justify-center my-6" />
}

/**
 * Generic Markdown Page Component
 *
 * Usage:
 * 1. Create a .md file in `src/content/` with YAML frontmatter
 * 2. Import it with `?raw` suffix: import content from '../content/my-page.md?raw'
 * 3. Create a page component: export default () => <MarkdownPage content={content} />
 *
 * For frontmatter with metadata, use MarkdownPageWithMeta instead
 */
export function MarkdownPage({ content, title, description }: MarkdownPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeHeading, setActiveHeading] = useState<string>('')
  const [callouts, setCallouts] = useState<{ type: string; content: string }[]>([])
  const currentTheme = getStoredTheme() as ThemeKey

  // Get color mode from localStorage
  const getColorMode = (): ColorMode => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('clawd:colorMode')
      if (stored === 'light' || stored === 'dark') return stored
    }
    return 'dark'
  }
  const currentMode = getColorMode()
  const isDark = currentMode === 'dark'

  // Initialize Mermaid on mount and when theme changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      initializeColorMode()
      initializeMermaid(isDark)
    }
  }, [isDark])

  // Parse callouts on mount
  useEffect(() => {
    const { content: _, hasCallouts } = parseCallouts(content)
    if (hasCallouts) {
      const matches = content.matchAll(/>\s*\[!(TIP|WARNING|NOTE)\]\s*\n([\s\S]*?)(?=\n\s*>|$(?![\s\S]*>))/g)
      const parsed = Array.from(matches).map(m => ({
        type: m[1],
        content: m[2].trim()
      }))
      setCallouts(parsed)
    }
  }, [content])

  // Scroll progress and back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = (window.scrollY / documentHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, scrolled)))
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Extract headings for table of contents
  useEffect(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const extracted: Heading[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      extracted.push({
        id: generateId(text),
        text,
        level
      })
    }
    setHeadings(extracted)
  }, [content])

  // Active heading on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    document.querySelectorAll('h1, h2, h3').forEach((heading) => {
      observer.observe(heading)
    })

    return () => observer.disconnect()
  }, [headings])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case 'TIP': return <Lightbulb className="h-4 w-4" />
      case 'WARNING': return <AlertTriangle className="h-4 w-4" />
      case 'NOTE': return <Info className="h-4 w-4" />
      default: return null
    }
  }

  const getCalloutLabel = (type: string) => {
    switch (type) {
      case 'TIP': return 'Tip'
      case 'WARNING': return 'Warning'
      case 'NOTE': return 'Note'
      default: return type
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          title="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}

      <Header
        currentTheme={currentTheme}
        onThemeChange={() => {}}
        currentMode={currentMode}
        onModeChange={() => {}}
      />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        {title && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            {description && (
              <p className="text-xl text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <div className="flex gap-8">
          {/* Main Content */}
          <article className="flex-1 max-w-3xl">
            <div className="bg-card border border-border/50 rounded-xl p-8 prose dark:prose-invert max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '')
                    const language = match?.[1]

                    // Handle Mermaid diagrams
                    if (!inline && language === 'mermaid') {
                      return <MermaidDiagram chart={String(children).replace(/\n$/, '')} isDark={isDark} />
                    }

                    // Handle syntax highlighting for other languages
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={isDark ? vscDarkPlus : vs}
                        language={language}
                        PreTag="div"
                        className="rounded-lg"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                  h1({ children }) {
                    const text = children?.toString() || ''
                    const id = generateId(text)
                    return <h1 id={id}>{children}</h1>
                  },
                  h2({ children }) {
                    const text = children?.toString() || ''
                    const id = generateId(text)
                    return (
                      <h2 id={id} className="scroll-mt-20">
                        <a href={`#${id}`} className="group">
                          {children}
                          <span className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-sm">#</span>
                        </a>
                      </h2>
                    )
                  },
                  h3({ children }) {
                    const text = children?.toString() || ''
                    const id = generateId(text)
                    return (
                      <h3 id={id} className="scroll-mt-20">
                        <a href={`#${id}`} className="group">
                          {children}
                          <span className="opacity-0 group-hover:opacity-100 ml-2 text-primary text-sm">#</span>
                        </a>
                      </h3>
                    )
                  },
                  blockquote({ children }) {
                    const content = children?.toString() || ''
                    const calloutMatch = callouts.find(c => content.includes(c.content))

                    if (calloutMatch) {
                      return (
                        <div className={`prose-callout ${calloutMatch.type.toLowerCase()}`}>
                          <div className="prose-callout-title">
                            {getCalloutIcon(calloutMatch.type)}
                            {getCalloutLabel(calloutMatch.type)}
                          </div>
                          <div>{calloutMatch.content}</div>
                        </div>
                      )
                    }

                    return <blockquote>{children}</blockquote>
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </article>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  Contents
                  <span className="text-xs text-muted-foreground font-normal">({headings.length})</span>
                </h3>
                <nav className="space-y-1">
                  {headings.map((heading) => (
                    <div key={heading.id}>
                      {heading.level === 1 && (
                        <a
                          href={`#${heading.id}`}
                          className={`block text-sm py-1.5 px-2 rounded-lg transition-colors ${
                            activeHeading === heading.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {heading.text}
                        </a>
                      )}
                      {heading.level === 2 && (
                        <a
                          href={`#${heading.id}`}
                          className={`block text-sm py-1.5 px-2 rounded-lg transition-colors pl-4 ${
                            activeHeading === heading.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {heading.text}
                        </a>
                      )}
                      {heading.level === 3 && (
                        <a
                          href={`#${heading.id}`}
                          className={`block text-xs py-1 px-2 rounded-lg transition-colors pl-8 ${
                            activeHeading === heading.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-muted-foreground hover:bg-muted'
                          }`}
                        >
                          {heading.text}
                        </a>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  )
}

interface MarkdownMeta {
  title?: string
  description?: string
  date?: string
  category?: string
  [key: string]: string | undefined
}

export function parseFrontmatter(content: string): { meta: MarkdownMeta; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { meta: {}, content }
  }

  const meta: MarkdownMeta = {}
  const frontmatterContent = match[1]

  frontmatterContent.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      meta[key] = value
    }
  })

  return { meta, content: match[2] }
}

interface MarkdownPageWithMetaProps {
  rawContent: string
}

export function MarkdownPageWithMeta({ rawContent }: MarkdownPageWithMetaProps) {
  const { meta, content } = parseFrontmatter(rawContent)

  return (
    <MarkdownPage
      content={content}
      title={meta.title}
      description={meta.description}
    />
  )
}
