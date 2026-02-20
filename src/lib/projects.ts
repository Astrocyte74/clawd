export interface Project {
  id: string
  title: string
  description: string
  blurb: string // One-line description for cards
  category: 'home-renovation' | 'ai-research' | 'recipes' | 'demo' | 'guide'
  categoryLabel: string
  categoryIcon: string
  href: string
  date: string
  updatedAt: Date // For "What's New" sorting
  metadata?: Array<{
    icon: string
    label: string
  }>
}

// Helper: Get blurb from first line of description
export function getBlurb(description: string): string {
  const firstLine = description.split('.')[0]
  return firstLine.length > 60 ? firstLine.substring(0, 57) + '...' : firstLine + '.'
}

// Helper: Normalize href to absolute path without trailing slash
export function normalizeHref(path: string): string {
  const normalized = path.startsWith('/') ? path : '/' + path
  return normalized.endsWith('/') ? normalized.slice(0, -1) : normalized
}

// Helper: Get "Updated X days ago" text
export function getUpdatedText(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const daysAgo = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (daysAgo === 0) return 'Updated today'
  if (daysAgo === 1) return 'Updated yesterday'
  if (daysAgo < 7) return `Updated ${daysAgo} days ago`
  if (daysAgo < 30) return `Updated ${Math.floor(daysAgo / 7)} weeks ago`
  return `Updated ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
}

export const projects: Project[] = [
  {
    id: 'basement-flooring',
    title: 'Basement Flooring Plan',
    description: 'Complete flooring specification and material calculation for a 311 sq ft multi-purpose basement room featuring Tennessee Bluegrass LVP with acoustic backing.',
    blurb: 'Complete flooring spec for 311 sq ft basement with LVP.',
    category: 'home-renovation',
    updatedAt: new Date('2026-01-30'),
    categoryLabel: 'Home Improvement',
    categoryIcon: '🏠',
    href: '/flooring-basement',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
        label: '342 sq ft'
      }
    ]
  },
  {
    id: 'astronomical-events',
    title: 'Astronomical Events 2025',
    description: 'Your guide to celestial events visible from Carstairs, Alberta. Features meteor showers, lunar eclipses, planetary conjunctions, and stargazing tips.',
    blurb: 'Guide to celestial events visible from Alberta.',
    category: 'ai-research',
    updatedAt: new Date('2026-01-30'),
    categoryLabel: 'Astronomy',
    categoryIcon: '🌌',
    href: '/astronomical-events',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
        label: '8 major events'
      },
      {
        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
        label: 'Peak viewing times'
      }
    ]
  },
  {
    id: 'tofu-recipes',
    title: 'Creative Tofu Recipes',
    description: 'Delicious, protein-packed plant-based recipes featuring crispy maple-Sriracha tofu, Korean BBQ bowls, coconut curry, and smoky BLT sandwiches.',
    blurb: '4 delicious plant-based tofu recipes with bold flavors.',
    category: 'recipes',
    updatedAt: new Date('2026-01-30'),
    categoryLabel: 'Cooking',
    categoryIcon: '🥢',
    href: '/tofu-recipes',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: '⏱️',
        label: '20-40 mins each'
      },
      {
        icon: '🌱',
        label: '4 recipes'
      }
    ]
  },
  {
    id: 'ai-news-jan2026',
    title: 'AI News & Updates - January 2026',
    description: 'Latest developments in LLMs: Moonshot K2.5 (1T params), DeepSeek R1 (cost revolution), Arcee Trinity (400B), and market leaders Claude Opus 4.5, Gemini 3 Pro, and GPT-5.2.',
    blurb: 'Latest LLM developments: Moonshot K2.5, DeepSeek R1, Claude Opus 4.5.',
    category: 'ai-research',
    updatedAt: new Date('2026-01-30'),
    categoryLabel: 'AI Research',
    categoryIcon: '🤖',
    href: '/ai-news-jan2026',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: '📰',
        label: '6 major stories'
      },
      {
        icon: '🌍',
        label: 'Global coverage'
      }
    ]
  },
  {
    id: 'demo-features',
    title: 'Feature Demo: Motion + Markdown',
    description: 'Interactive showcase of new Motion animations and react-markdown rendering capabilities. See smooth entrance effects, hover states, and formatted content rendering.',
    blurb: 'Interactive showcase: Motion animations + Markdown rendering.',
    category: 'demo',
    updatedAt: new Date('2026-01-31'),
    categoryLabel: 'Demo',
    categoryIcon: '🎨',
    href: '/demo-features',
    date: 'Jan 31, 2026',
    metadata: [
      {
        icon: '✨',
        label: 'Motion animations'
      },
      {
        icon: '📝',
        label: 'Markdown rendering'
      }
    ]
  },
  {
    id: 'markdown-demo',
    title: 'Markdown Page Template',
    description: 'Demo showing how AI agents can create pages using only Markdown files. Just write .md content and it renders beautifully with frontmatter support.',
    blurb: 'Demo: AI agents create pages with just Markdown files.',
    category: 'demo',
    updatedAt: new Date('2026-01-31'),
    categoryLabel: 'Demo',
    categoryIcon: '📄',
    href: '/markdown-demo',
    date: 'Jan 31, 2026',
    metadata: [
      {
        icon: '✍️',
        label: 'AI-friendly'
      },
      {
        icon: '📝',
        label: 'Markdown only'
      }
    ]
  },
  {
    id: 'coding-frameworks-guide',
    title: 'Coding Frameworks Guide',
    description: 'Practical comparison of React, Next.js, Vite, and shadcn/ui. Learn when to use each tool with code examples, project structures, and real-world use cases.',
    blurb: 'React, Next.js, Vite, shadcn/ui: when to use each tool.',
    category: 'guide',
    updatedAt: new Date('2026-01-31'),
    categoryLabel: 'Guide',
    categoryIcon: '📚',
    href: '/coding-frameworks-guide',
    date: 'Jan 31, 2026',
    metadata: [
      {
        icon: '⚛️',
        label: 'React'
      },
      {
        icon: '⚡',
        label: 'Next.js'
      },
      {
        icon: '🔧',
        label: 'Vite'
      },
      {
        icon: '🎨',
        label: 'shadcn/ui'
      }
    ]
  },
  {
    id: 'space-exploration-guide',
    title: 'Space Exploration Guide',
    description: 'Understanding NASA Artemis, SpaceX Starship, and the race to the Moon and Mars. Learn rocket tech, timelines, and how they work together.',
    blurb: 'NASA Artemis, SpaceX Starship, and the race to Mars.',
    category: 'guide',
    updatedAt: new Date('2026-02-02'),
    categoryLabel: 'Guide',
    categoryIcon: '🚀',
    href: '/space-exploration-guide',
    date: 'Feb 2, 2026',
    metadata: [
      {
        icon: '🌙',
        label: 'Artemis'
      },
      {
        icon: '🚀',
        label: 'Starship'
      },
      {
        icon: '🔴',
        label: 'Mars'
      }
    ]
  },
  {
    id: 'sls-vs-starship',
    title: 'SLS vs Starship: Comprehensive Comparison',
    description: 'Deep technical comparison of NASA\'s Space Launch System and SpaceX\'s Starship. Specs, costs, pros/cons, lunar and Mars mission profiles, and future outlook for human space exploration.',
    blurb: 'Technical comparison: NASA SLS vs SpaceX Starship for Moon and Mars.',
    category: 'guide',
    updatedAt: new Date('2026-02-07'),
    categoryLabel: 'Space Analysis',
    categoryIcon: '🔬',
    href: '/sls-vs-starship',
    date: 'Feb 7, 2026',
    metadata: [
      {
        icon: '📊',
        label: '15K+ words'
      },
      {
        icon: '💰',
        label: 'Cost analysis'
      },
      {
        icon: '🌙',
        label: 'Artemis'
      },
      {
        icon: '🔴',
        label: 'Mars'
      }
    ]
  },
  {
    id: 'best-marathon-shoes-2026',
    title: 'Best Marathon Running Shoes 2026',
    description: 'Complete guide to the best marathon shoes across 5 categories: Carbon Plate Racing, Beginners, Value, Training & Racing, and Comfort. Expert picks from Run Testers for Spring 2026 marathon season.',
    blurb: 'Best marathon shoes 2026: Racing, training, comfort, value picks.',
    category: 'guide',
    updatedAt: new Date('2026-02-07T15:00:00'),
    categoryLabel: 'Running Guide',
    categoryIcon: '🏃',
    href: '/best-marathon-shoes-2026',
    date: 'Feb 7, 2026',
    metadata: [
      {
        icon: '👟',
        label: '25+ shoes'
      },
      {
        icon: '🏆',
        label: '5 categories'
      },
      {
        icon: '💰',
        label: 'Value picks'
      },
      {
        icon: '🎯',
        label: 'Goal times'
      }
    ]
  },
  {
    id: 'hoka-mach-7-review',
    title: 'Hoka Mach 7 Review',
    description: 'First run review of the Hoka Mach 7 vs Mach 6. Minor update with improved outsole grip and cosmetic refresh. Same super critical EVA midsole, 5mm drop, 237g weight. Release: March 5, 2026 at $145.',
    blurb: 'Hoka Mach 7 first run review: Improved grip, same great ride.',
    category: 'guide',
    updatedAt: new Date('2026-02-07T17:00:00'),
    categoryLabel: 'Shoe Review',
    categoryIcon: '👟',
    href: '/hoka-mach-7-review',
    date: 'Feb 7, 2026',
    metadata: [
      {
        icon: '🆕',
        label: 'March 2026'
      },
      {
        icon: '💵',
        label: '$145'
      },
      {
        icon: '⚖️',
        label: '237g'
      }
    ]
  },
  {
    id: 'plant-touch-communication',
    title: 'Plants That Touch Are More Resilient',
    description: 'Fascinating research on plant communication through physical contact. When leaves touch, plants form biological signaling networks that warn each other about stress, boosting collective resilience by up to 50%.',
    blurb: 'Plant communication: Touching leaves create stress-warning networks.',
    category: 'ai-research',
    updatedAt: new Date('2026-02-07'),
    categoryLabel: 'Plant Biology',
    categoryIcon: '🌱',
    href: '/plant-touch-communication',
    date: 'Feb 7, 2026',
    metadata: [
      {
        icon: '🔬',
        label: 'Univ. of Missouri'
      },
      {
        icon: '⚡',
        label: 'Electrical signals'
      },
      {
        icon: '🧪',
        label: 'Hydrogen peroxide'
      }
    ]
  },
  {
    id: 'ancient-advanced-knowledge',
    title: 'Ancient Civilizations Had Advanced Knowledge',
    description: 'From precision stonework to acoustic engineering, ancient civilizations possessed sophisticated knowledge that modern science is only now fully appreciating. Explore the spiral of knowledge rediscovery.',
    blurb: 'Ancient civilizations had advanced knowledge we\'re just rediscovering.',
    category: 'ai-research',
    updatedAt: new Date('2026-02-08T10:00:00'),
    categoryLabel: 'Archaeology',
    categoryIcon: '🏺',
    href: '/ancient-advanced-knowledge',
    date: 'Feb 8, 2026',
    metadata: [
      {
        icon: '🔬',
        label: 'Engineering'
      },
      {
        icon: '🔊',
        label: 'Acoustics'
      },
      {
        icon: '🌟',
        label: 'Astronomy'
      },
      {
        icon: '📜',
        label: 'Lost knowledge'
      }
    ]
  },
  {
    id: 'openclaw-skills-analysis',
    title: 'OpenClaw Skills Analysis',
    description: 'Evaluating 7 potential OpenClaw skills for integration: GitHub, Gog (Google Workspace), Coding-Agent, Nano-PDF, Skill-Creator, Sonoscli, and Peekaboo. Priority recommendations and use cases for a physician-runner-AI-enthusiast.',
    blurb: 'Analysis of 7 OpenClaw skills: Which to install, priorities, and use cases.',
    category: 'guide',
    updatedAt: new Date('2026-02-08T16:00:00'),
    categoryLabel: 'Productivity Guide',
    categoryIcon: '🛠️',
    href: '/openclaw-skills-analysis',
    date: 'Feb 8, 2026',
    metadata: [
      {
        icon: '🐙',
        label: 'GitHub'
      },
      {
        icon: '📧',
        label: 'Google Workspace'
      },
      {
        icon: '🧩',
        label: 'Skill-Creator'
      },
      {
        icon: '⭐',
        label: 'Priority rankings'
      }
    ]
  },
  {
    id: 'mermaid-demo',
    title: 'Mermaid Diagram Demo',
    description: 'Testing Mermaid.js integration with Markdown for beautiful, responsive diagrams.',
    blurb: 'Test page for Mermaid diagram rendering in Markdown.',
    category: 'demo',
    updatedAt: new Date('2026-02-07T12:00:00'),
    categoryLabel: 'Demo',
    categoryIcon: '🎨',
    href: '/mermaid-demo',
    date: 'Feb 7, 2026',
    metadata: [
      {
        icon: '📊',
        label: 'Flowcharts'
      },
      {
        icon: '🔄',
        label: 'Sequence diagrams'
      },
      {
        icon: '✨',
        label: 'Interactive'
      }
    ]
  },
  {
    id: 'folder-monitoring-image-generator',
    title: 'Automated Folder Monitoring & AI Image Generation',
    description: 'Monitor any folder on your Mac for text files and automatically generate AI images using Z-Image API. Two production-ready scripts with fswatch integration, Tailscale support, and automatic transparency via recipe system.',
    blurb: 'Drop text files → Get AI images automatically. Folder monitoring + Z-Image integration.',
    category: 'guide',
    updatedAt: new Date('2026-02-08T20:00:00'),
    categoryLabel: 'Automation Guide',
    categoryIcon: '📁',
    href: '/folder-monitoring-image-generator',
    date: 'Feb 8, 2026',
    metadata: [
      {
        icon: '📁',
        label: 'Folder watcher'
      },
      {
        icon: '🎨',
        label: 'AI image generation'
      },
      {
        icon: '⚡',
        label: '6-second generation'
      },
      {
        icon: '🔐',
        label: 'Tailscale secure'
      }
    ]
  }
,
  {
    id: 'openclaw-playwright-cli',
    title: 'OpenClaw Playwright CLI: Giving Text Models Vision',
    description: 'How OpenClaw\'s Playwright CLI enables text-only models like GLM 4.7 to interact with web pages through structured accessibility snapshots, without native vision capabilities. Explores whether this provides genuinely new capabilities or duplicates existing tools.',
    blurb: 'Enables text-only models to interact with web browsers via ARIA snapshots',
    category: 'ai-research',
    updatedAt: new Date(),
    categoryLabel: 'AI Research',
    categoryIcon: '🌌',
    href: '/openclaw-playwright-cli',
    date: 'Feb 10, 2026',
    metadata: [
      {
        icon: '🎭',
        label: 'Playwright CLI'
      },
      {
        icon: '👁️',
        label: 'Text-based vision'
      },
      {
        icon: '🌐',
        label: 'Web automation'
      },
      {
        icon: '⚡',
        label: 'No vision model'
      }
    ]
  }
,
  {
    id: 'alibaba-zvec-vector-database',
    title: 'Alibaba Zvec: SQLite-Like Vector Database for Edge RAG',
    description: 'Analysis of Alibaba\'s Zvec embedded vector database - whether it could enhance OpenClaw\'s local memory system and provide better on-device RAG capabilities for edge applications. Compares Zvec to OpenClaw\'s current SQLite-based memory architecture.',
    blurb: 'Analysis of Alibaba\'s Zvec embedded vector database for edge AI',
    category: 'ai-research',
    updatedAt: new Date(),
    categoryLabel: 'AI Research',
    categoryIcon: '🌌',
    href: '/alibaba-zvec-vector-database',
    date: 'Feb 10, 2026',
    metadata: [
      {
        icon: '🗄️',
        label: 'Vector database'
      },
      {
        icon: '⚡',
        label: '8,000+ QPS'
      },
      {
        icon: '📱',
        label: 'Edge AI'
      },
      {
        icon: '🔍',
        label: 'RAG analysis'
      }
    ]
  },
  {
    id: 'nas-hard-drive-research',
    title: 'NAS Hard Drive Research - Zettlab D6 Ultra',
    description: 'Comparison of 6-bay NAS hard drives for Plex + AI workloads. Price per TB analysis, RAID capacity calculator (RAID 5/6/10), and recommendations for WD Red Pro 24TB vs Toshiba N300 Pro 20TB vs Seagate IronWolf Pro.',
    blurb: 'NAS drive comparison: WD Red Pro vs Toshiba N300 vs Seagate IronWolf',
    category: 'home-renovation',
    updatedAt: new Date('2026-02-19'),
    categoryLabel: 'Home Improvement',
    categoryIcon: '🏠',
    href: '/nas-hard-drive-research',
    date: 'Feb 19, 2026',
    metadata: [
      {
        icon: '💾',
        label: '6-bay NAS'
      },
      {
        icon: '📊',
        label: 'RAID calculator'
      },
      {
        icon: '💰',
        label: '$25-31/TB'
      },
      {
        icon: '🎬',
        label: 'Plex + AI'
      }
    ]
  }
]
