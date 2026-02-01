import { ArrowLeft, Code, Sparkles, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { motion } from "motion/react"
import { Header } from "../components/Header"
import { getStoredTheme, type ThemeKey, type ColorMode, initializeColorMode } from "../lib/themes"

// Sample markdown content with GitHub Flavored Markdown
const markdownContent = `# 🚀 New Features Demo

Welcome to the **Clawd Hub** feature showcase! This page demonstrates our new capabilities.

## ✨ Motion Animations

We've added **Motion** (the modern successor to Framer Motion) for smooth, polished animations:

- Entrance animations with stagger effects
- Smooth hover interactions
- Page transitions
- Gesture support (drag, pan, hover)

\`\`\`typescript
import { motion } from "motion/react"

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  Content fades in smoothly
</motion.div>
\`\`\`

## 📝 Markdown Rendering

We can now render **Markdown content** directly in React components with full GitHub Flavored Markdown support:

| Feature | Status |
|---------|--------|
| Tables | ✅ Supported |
| Code blocks | ✅ Supported |
| *Emphasis* | ✅ Supported |
| **Bold** | ✅ Supported |
| ~~Strikethrough~~ | ✅ Supported |

### Lists work too:

1. Numbered lists
2. With multiple items
3. All properly formatted

- Unordered lists
- With bullet points
- Also supported

> **Pro tip:** We use \`remark-gfm\` for full GitHub Flavored Markdown support including tables, strikethrough, and more!

## 🎨 Try It Out

Look around this page to see the animations in action. Notice how elements:
1. **Fade in** smoothly when the page loads
2. **Respond** to hover interactions
3. **Animate** with natural easing curves

---

*Built with ❤️ using React, Vite, and Tailwind CSS*
`

const features = [
  {
    icon: Sparkles,
    title: "Smooth Animations",
    description: "Motion-powered entrance effects and hover states",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Code,
    title: "Markdown Support",
    description: "Render formatted content with react-markdown",
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    icon: Zap,
    title: "GitHub Pages Ready",
    description: "Fully static, fast, and SEO-friendly",
    gradient: "from-amber-500/20 to-orange-500/20"
  }
]

export default function DemoFeaturesPage() {
  const currentTheme = getStoredTheme() as ThemeKey
  const currentMode: ColorMode = 'light' // Default for demo

  // Initialize color mode
  if (typeof window !== 'undefined') {
    initializeColorMode()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Header */}
      <Header
        currentTheme={currentTheme}
        onThemeChange={() => {}}
        currentMode={currentMode}
        onModeChange={() => {}}
      />

      {/* Back button */}
      <div className="container mx-auto px-4 pt-6 pb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </motion.div>
      </div>

      {/* Hero section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            New Features Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing Motion animations and Markdown rendering in Clawd Hub
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="relative group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative bg-card border border-border/50 rounded-xl p-6 h-full">
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Markdown content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border/50 rounded-xl p-8">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          </div>
        </motion.div>

        {/* Interactive demo section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <h2 className="text-2xl font-bold mb-6">Interactive Demo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Scale', 'Rotate', 'Fade', 'Bounce'].map((effect) => (
              <motion.button
                key={effect}
                className="bg-primary/10 hover:bg-primary/20 text-primary rounded-lg p-4 font-medium transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotate: effect === 'Rotate' ? [0, 5, -5, 0] : 0,
                  y: effect === 'Bounce' ? [0, -10, 0] : 0,
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, repeatDelay: 1 },
                  y: { duration: 0.5, repeat: Infinity, repeatDelay: 2 },
                }}
              >
                {effect}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          Clawd Hub — Powered by Motion + react-markdown
        </div>
      </footer>
    </div>
  )
}
