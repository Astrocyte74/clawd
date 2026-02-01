import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import portfolioContent from '../content/portfolio.md?raw'

/**
 * Portfolio Page
 *
 * Showcase of web development projects, skills, and technologies.
 * Built using the Markdown page system for easy content updates.
 */
export default function PortfolioPage() {
  return <MarkdownPageWithMeta rawContent={portfolioContent} />
}
