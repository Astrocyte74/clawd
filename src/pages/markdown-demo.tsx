import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import markdownContent from '../content/markdown-demo.md?raw'

/**
 * Markdown Demo Page
 *
 * This page demonstrates how easy it is to create content using Markdown.
 * The AI agent (or you) only needs to:
 *
 * 1. Write a .md file in src/content/
 * 2. Import it with ?raw suffix
 * 3. Pass it to MarkdownPageWithMeta
 *
 * No React components, no JSX, no styling concerns — just Markdown!
 */
export default function MarkdownDemoPage() {
  return <MarkdownPageWithMeta rawContent={markdownContent} />
}
