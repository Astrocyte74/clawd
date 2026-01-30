import { ArrowLeft, ExternalLink } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { getStoredColorMode, toggleColorMode, type ColorMode, type ThemeKey } from "@/lib/themes"
import { useState } from "react"

export default function AINewsJan2026() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("clawd")
  const currentMode = getStoredColorMode()

  const handleModeChange = (_mode: ColorMode) => {
    toggleColorMode()
  }

  const highlightBoxStyle = {
    background: "var(--muted)",
    borderLeft: "3px solid var(--primary)",
    padding: "20px",
    borderRadius: "8px",
  }

  const insightBoxStyle = {
    background: "linear-gradient(135deg, oklch(0.65 0.15 145 / 0.1) 0%, oklch(0.65 0.15 145 / 0.05) 100%)",
    border: "2px solid oklch(0.65 0.15 145 / 0.2)",
    padding: "24px",
    borderRadius: "12px",
  }

  const newsItems = [
    {
      title: "Moonshot AI Releases Kimi K2.5 with 1 Trillion Parameters",
      date: "January 27, 2026",
      category: "Open Source",
      icon: "🚀",
      description: "Chinese AI company Moonshot AI has released Kimi K2.5 as an open-source model featuring a staggering 1 trillion parameters. The model uses an innovative Muon algorithm to speed up training.",
      details: [
        "Derived from Kimi K2-Base released in early November",
        "Muon algorithm significantly reduces training time",
        "Open-source release challenges proprietary models",
        "Massive scale pushes boundaries of open AI"
      ],
      impact: "This release demonstrates that open-source initiatives can compete at the highest levels of AI development, potentially democratizing access to cutting-edge models.",
      link: "https://siliconangle.com/2026/01/27/moonshot-ai-releases-open-source-kimi-k2-5-model-1t-parameters/"
    },
    {
      title: "DeepSeek R1: Reasoning Model at 27x Lower Cost",
      date: "January 2025",
      category: "Cost Efficiency",
      icon: "💰",
      description: "DeepSeek released R1, a 671-billion-parameter open-weight reasoning model that achieves performance comparable to OpenAI's o1 at a fraction of the cost.",
      details: [
        "671B parameters specialized for logical inference",
        "Outperforms OpenAI o1 on AIME math benchmarks",
        "27x lower computational cost than proprietary alternatives",
        "Available in 14B and 32B versions for consumer GPUs",
        "Open weights under MIT license"
      ],
      impact: "R1 proves that efficiency innovations can dramatically reduce AI costs, making advanced reasoning capabilities accessible to researchers and smaller organizations.",
      link: "https://en.wikipedia.org/wiki/DeepSeek"
    },
    {
      title: "Arcee AI's Trinity: 400B Open Source Model",
      date: "January 2026",
      category: "Startup Innovation",
      icon: "🦾",
      description: "Tiny startup Arcee AI (just 30 people) has built Trinity, a 400-billion-parameter open source model that competes with Meta's Llama family.",
      details: [
        "Built from scratch by small team",
        "One of the biggest open-source models from a US company",
        "Challenges industry giants with minimal resources",
        "Demonstrates efficiency of modern AI development"
      ],
      impact: "Proves that focused teams can build frontier models without massive corporate infrastructure, potentially reshaping the AI development landscape.",
      link: "https://tech.yahoo.com/ai/meta-ai/articles/tiny-startup-arcee-ai-built-173000680.html"
    },
    {
      title: "Top LLMs of Early 2026: Claude Opus 4.5, Gemini 3 Pro, GPT-5.2",
      date: "January 2026",
      category: "Market Leaders",
      icon: "🏆",
      description: "The competitive landscape continues to intensify with new releases from major players showing breakthrough capabilities in coding, reasoning, and context windows.",
      details: [
        "Claude Opus 4.5: Breakthrough coding performance",
        "Gemini 3 Pro: Massive context windows, thinking model architecture",
        "GPT-5.2: Expanded 400K context, near-perfect AIME math scores",
        "Grok 4.1: Strong reasoning lead on LMSYS/EQ-Bench",
        "Claude Sonnet 4.5: Top choice for agent workflows"
      ],
      impact: "The diversity of strengths across models suggests specialization is becoming the norm, with different models excelling at different tasks.",
      link: "https://azumo.com/artificial-intelligence/ai-insights/top-10-llms-0625"
    },
    {
      title: "Yann LeCun: AGI Is Overrated, Scaling Alone Won't Work",
      date: "January 2026",
      category: "AI Research",
      icon: "🧠",
      description: "The 'Godfather of AI' argues that current LLMs lack crucial capabilities for true AGI, specifically the ability to predict consequences of actions.",
      details: [
        "Scaling laws insufficient for AGI",
        "LLMs lack causal reasoning and world models",
        "New architectures beyond transformers needed",
        "Calls for focus on embodied AI and planning"
      ],
      impact: "LeCun's skepticism highlights growing debate about whether current approaches will lead to AGI or if paradigm shifts are needed.",
      link: "https://indianexpress.com/article/technology/artificial-intelligence/godfather-of-ai-yann-lecun-calls-agi-overrated-says-scaling-ai-wont-work-10503183/"
    },
    {
      title: "AI Trading Revolution: LLMs Transform Wall Street",
      date: "January 2026",
      category: "Finance",
      icon: "📈",
      description: "LLMs are revolutionizing algorithmic trading by understanding nuance, sentiment, and context that traditional algorithms miss.",
      details: [
        "LLMs parse Fed minutes and earnings calls for tonality shifts",
        "Detect hesitation and sentiment in executive communications",
        "Understand context beyond simple headline-based trading",
        "'Deep digitization of meaning' gives competitive edge"
      ],
      impact: "Financial markets may see fundamental shifts as AI trading systems that truly understand language begin to dominate over traditional algorithms.",
      link: "https://ai-era.pro/2026/01/04/ai-trading-future-wall-street-trading-bot/"
    }
  ]

  const trends = [
    {
      title: "Cost Efficiency Revolution",
      description: "DeepSeek R1's 27x cost reduction demonstrates that architectural innovation matters as much as raw scale."
    },
    {
      title: "Open Source Competition",
      description: "Moonshot K2.5, Arcee Trinity, and DeepSeek R1 prove open-source can compete with proprietary giants."
    },
    {
      title: "Specialization Over Generalization",
      description: "Different models excelling at coding, reasoning, or math suggests a future of specialized AI tools."
    },
    {
      title: "Reasoning Models Mature",
      description: "Chain-of-thought and thinking architectures are becoming standard for complex problem-solving."
    },
    {
      title: "Democratization of AI",
      description: "Smaller teams and organizations can now build and deploy frontier models, not just big tech."
    }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Animated background mesh */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Navigation */}
      <nav className="flex-shrink-0 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br text-primary-foreground transition-all duration-300 group-hover:scale-105 group-hover:rotate-12"
                  style={{ backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--primary) / 0.6)` }}
                >
                  <span className="font-bold text-sm">C</span>
                </div>
                <div>
                  <div className="text-sm font-bold">Clawd Hub</div>
                  <div className="text-xs text-muted-foreground">AI-Powered Projects</div>
                </div>
              </Link>

              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted px-3 py-2 rounded-lg text-sm font-medium">
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <ThemeSwitcher
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
                currentMode={currentMode}
                onModeChange={handleModeChange}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 bg-card border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">🤖</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI News & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            January 2026 Edition: The latest breakthroughs in large language models, reasoning systems, and the rapidly evolving AI landscape.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              📅 January 2026
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              🌍 Global Developments
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              💡 Industry Trends
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Insights */}
          <div className="max-w-4xl mx-auto mb-12" style={insightBoxStyle}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              🔑 Key Trends This Month
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {trends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-0.5">•</span>
                  <div>
                    <strong className="text-foreground">{trend.title}:</strong>
                    <p className="text-sm text-muted-foreground mt-1">{trend.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* News Items */}
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <div key={index} className="max-w-4xl mx-auto">
                <div className="bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 p-6 sm:p-8 border-b border-border/50">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{item.icon}</div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {item.category}
                          </span>
                          <span className="text-sm text-muted-foreground">{item.date}</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{item.title}</h2>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Details */}
                    <div className="mb-6">
                      <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
                        📋 Key Points
                      </h4>
                      <ul className="space-y-2">
                        {item.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Impact */}
                    <div className="mb-6" style={highlightBoxStyle}>
                      <strong className="text-primary flex items-center gap-2 mb-2">
                        💡 Impact & Significance
                      </strong>
                      <p className="text-muted-foreground">{item.impact}</p>
                    </div>

                    {/* Link */}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                      >
                        Read more <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="max-w-4xl mx-auto mt-16 text-center">
            <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-border/50">
              <h3 className="text-2xl font-bold mb-3">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                The AI landscape is evolving rapidly. Check back monthly for updates on the latest breakthroughs, model releases, and industry shifts.
              </p>
              <Link to="/" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                <ArrowLeft className="w-4 h-4" />
                Back to Hub
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Generated by Clawdbot AI Assistant • {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>
    </div>
  )
}
