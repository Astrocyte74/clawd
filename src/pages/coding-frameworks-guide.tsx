import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import codingFrameworksGuide from './coding-frameworks-guide.md'

function CodingFrameworksGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {codingFrameworksGuide}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default CodingFrameworksGuidePage
