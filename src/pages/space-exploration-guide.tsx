import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, Calendar, Rocket, Globe2, Zap, Users, TrendingUp, Play } from "lucide-react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { getStoredTheme, type ThemeKey, type ColorMode, initializeColorMode } from "../lib/themes"
import { useState } from "react"

/**
 * Space Exploration Guide - Interactive Edition
 *
 * Features:
 * - Animated starfield background
 * - 3D rotating rockets
 * - Interactive comparison cards
 * - Scroll-triggered animations
 * - Animated stat counters
 * - Glassmorphism UI
 * - Particle effects
 */
export default function SpaceExplorationGuidePage() {
  const currentTheme = getStoredTheme() as ThemeKey
  const currentMode: ColorMode = 'light'
  const [activeTab, setActiveTab] = useState<'artemis' | 'starship' | 'mars'>('artemis')

  if (typeof window !== 'undefined') {
    initializeColorMode()
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Starfield Background */}
      <StarField />

      {/* Animated Gradient Overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <Header
        currentTheme={currentTheme}
        onThemeChange={() => {}}
        currentMode={currentMode}
        onModeChange={() => {}}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Interactive Tabs */}
      <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Rocket Comparison */}
      <RocketComparison activeTab={activeTab} />

      {/* Stats Section */}
      <StatsSection />

      {/* Mission Timeline */}
      <TimelineSection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

// Animated Starfield Background
function StarField() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
  }))

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + star.delay,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Hero Section with 3D Rocket
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <Rocket3D />
        </motion.div>

        <motion.h1
          className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Space Exploration
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Journey to the Moon and Mars with NASA's Artemis program and SpaceX's Starship
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/50"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </Link>
          <a
            href="#explore"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl font-semibold hover:bg-card transition-all hover:scale-105"
          >
            <Play className="h-5 w-5" />
            Start Exploring
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-border/50 flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

// 3D Rotating Rocket
function Rocket3D() {
  return (
    <motion.div
      className="relative w-48 h-48 mx-auto"
      animate={{ rotateY: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ perspective: "1000px" }}
    >
      <div className="text-[12rem] leading-none transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        🚀
      </div>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl -z-10" />
    </motion.div>
  )
}

// Interactive Tabs
function TabSection({ activeTab, setActiveTab }: { activeTab: 'artemis' | 'starship' | 'mars', setActiveTab: (tab: any) => void }) {
  const tabs = [
    { id: 'artemis' as const, label: 'Artemis', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { id: 'starship' as const, label: 'Starship', icon: Rocket, color: 'from-purple-500 to-pink-500' },
    { id: 'mars' as const, label: 'Mars', icon: Globe2, color: 'from-orange-500 to-red-500' },
  ]

  return (
    <section id="explore" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Mission</h2>
          <p className="text-xl text-muted-foreground">Explore different aspects of space exploration</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-8 py-4 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </div>
              {activeTab === tab.id && (
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.color} opacity-20 -z-10`}
                  layoutId="activeTab"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}

// Rocket Comparison Cards
function RocketComparison({ activeTab }: { activeTab: 'artemis' | 'starship' | 'mars' }) {
  const content = {
    artemis: {
      title: "NASA's Artemis Program",
      subtitle: "Returning humans to the Moon",
      color: "from-blue-500 to-cyan-500",
      stats: [
        { label: "Artemis II", value: "Feb 2026", icon: Calendar },
        { label: "Artemis III", value: "2027-28", icon: Rocket },
        { label: "Crew", value: "4", icon: Users },
      ],
      facts: [
        "First woman and person of color on the Moon",
        "Establish lunar outpost for long-term presence",
        "Test technologies for Mars missions",
        "International partnership with ESA, JAXA, CSA",
      ],
    },
    starship: {
      title: "SpaceX Starship",
      subtitle: "Most powerful rocket ever built",
      color: "from-purple-500 to-pink-500",
      stats: [
        { label: "Thrust", value: "17M lbs", icon: Zap },
        { label: "Height", value: "394 ft", icon: TrendingUp },
        { label: "Payload", value: "100-150t", icon: Rocket },
      ],
      facts: [
        "Fully reusable (both stages)",
        "Methane fuel (can be made on Mars)",
        "Will serve as lunar lander for Artemis",
        "Key to Musk's Mars colonization vision",
      ],
    },
    mars: {
      title: "Path to Mars",
      subtitle: "The next giant leap",
      color: "from-orange-500 to-red-500",
      stats: [
        { label: "Uncrewed", value: "2026", icon: Calendar },
        { label: "Crewed", value: "2028+", icon: Users },
        { label: "Distance", value: "225M km", icon: Globe2 },
      ],
      facts: [
        "6-9 month journey each way",
        "Starship HLS will be the lander",
        "Need in-situ resource utilization (ISRU)",
        "Goal: Establish self-sustaining city",
      ],
    },
  }

  const current = content[activeTab]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Main Card */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${current.color} rounded-3xl blur-3xl opacity-20 -z-10`} />

              <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 md:p-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-2">{current.title}</h3>
                <p className="text-xl text-muted-foreground mb-8">{current.subtitle}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {current.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background/50 rounded-xl p-6 border border-border/50"
                    >
                      <stat.icon className="h-8 w-8 mb-2 text-primary" />
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Facts List */}
                <div className="space-y-3">
                  {current.facts.map((fact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${current.color} mt-2 flex-shrink-0`} />
                      <p className="text-lg">{fact}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// Animated Stats Section
function StatsSection() {
  const stats = [
    { value: "17M", label: "Pounds of Thrust", sublabel: "Starship Super Heavy" },
    { value: "394", label: "Feet Tall", sublabel: "Starship Height" },
    { value: "2026", label: "First Moon Flyby", sublabel: "Artemis II Mission" },
    { value: "225M", label: "KM to Mars", sublabel: "Average Distance" },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">By The Numbers</h2>
          <p className="text-xl text-muted-foreground">Space exploration by the numbers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Individual Stat Card with Counter Animation
function StatCard({ stat, index }: { stat: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8">
        <motion.div
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-2"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: index * 0.1 + 0.2 }}
        >
          {stat.value}
        </motion.div>
        <div className="text-xl font-semibold mb-1">{stat.label}</div>
        <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
      </div>
    </motion.div>
  )
}

// Mission Timeline
function TimelineSection() {
  const missions = [
    {
      date: "Feb 2026",
      title: "Artemis II",
      description: "First crewed lunar flyby - 4 astronauts orbit the Moon",
      status: "upcoming",
    },
    {
      date: "2027-28",
      title: "Artemis III",
      description: "First lunar landing - Starship HLS delivers crew to surface",
      status: "planned",
    },
    {
      date: "2026",
      title: "Starship to Mars (Uncrewed)",
      description: "First Starship test flight to Mars",
      status: "planned",
    },
    {
      date: "2028+",
      title: "Human Mars Mission",
      description: "First humans land on Mars",
      status: "future",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Mission Timeline</h2>
          <p className="text-xl text-muted-foreground">The path to the Moon and Mars</p>
        </motion.div>

        <div className="space-y-6">
          {missions.map((mission, index) => (
            <TimelineItem key={index} mission={mission} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Timeline Item
function TimelineItem({ mission, index }: { mission: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-8 border-l-2 border-primary/20 last:pb-0"
    >
      <motion.div
        className="absolute left-0 top-0 w-4 h-4 -translate-x-1/2 bg-primary rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2 }}
      />
      <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-colors">
        <div className="text-sm font-semibold text-primary mb-2">{mission.date}</div>
        <h3 className="text-xl font-bold mb-2">{mission.title}</h3>
        <p className="text-muted-foreground">{mission.description}</p>
      </div>
    </motion.div>
  )
}

// Footer
function FooterSection() {
  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="container mx-auto text-center">
        <p className="text-muted-foreground mb-4">
          Exploring the cosmos, one mission at a time 🚀
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
      </div>
    </footer>
  )
}
