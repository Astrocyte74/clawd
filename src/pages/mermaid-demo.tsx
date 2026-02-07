import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import content from '../content/mermaid-demo.md?raw'

export default function MermaidDemoPage() {
  return <MarkdownPageWithMeta rawContent={content} />
}
