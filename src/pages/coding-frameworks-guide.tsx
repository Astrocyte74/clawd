import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import markdownContent from './coding-frameworks-guide.md?raw'

/**
 * Coding Frameworks Guide
 *
 * Practical comparison of React, Next.js, Vite, and shadcn/ui.
 * Learn when to use each tool with code examples and real-world use cases.
 */
export default function CodingFrameworksGuidePage() {
  return <MarkdownPageWithMeta rawContent={markdownContent} />
}
