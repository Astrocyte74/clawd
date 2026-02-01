import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Header } from "./Header"
import { getStoredTheme, type ThemeKey, type ColorMode, initializeColorMode } from "../lib/themes"

interface MarkdownPageProps {
  content: string
  title?: string
  description?: string
}

/**
 * Generic Markdown Page Component
 *
 * Usage:
 * 1. Create a .md file in src/content/
 * 2. Import it with ?raw suffix: import content from '../content/my-page.md?raw'
 * 3. Create a page component: export default () => <MarkdownPage content={content} />
 *
 * For frontmatter with metadata, use MarkdownPageWithMeta instead
 */
export function MarkdownPage({ content, title, description }: MarkdownPageProps) {
  const currentTheme = getStoredTheme() as ThemeKey
  const currentMode: ColorMode = 'light'

  if (typeof window !== 'undefined') {
    initializeColorMode()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

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

        <article className="max-w-3xl mx-auto">
          <div className="bg-card border border-border/50 rounded-xl p-8 prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}

/**
 * Markdown Page with Frontmatter Support
 *
 * Parses YAML frontmatter for metadata:
 * ---
 * title: "My Title"
 * description: "My Description"
 * date: "2026-01-31"
 * ---
 */
export interface MarkdownMeta {
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

  // Simple YAML parser for basic key-value pairs
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
