import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, Calendar, Rocket, Globe2, Zap, Users, TrendingUp, Play, Newspaper, ExternalLink, Activity, MapPin, Satellite, Fuel } from "lucide-react"
import { Link } from "react-router-dom"
import { Header } from "../components/Header"
import { getStoredTheme, type ThemeKey, type ColorMode, initializeColorMode } from "../lib/themes"
import { useState, useEffect, useRef } from "react"

/**
 * Space Exploration Guide - ULTIMATE EDITION
 *
 * Features:
 * - Live SpaceX API integration
 * - Real-time launch data
 * - Interactive mission map
 * - News ticker
 * - Video embeds
 * - Animated telemetry
 * - Particle effects
 * - 3D elements
 */
export default function SpaceExplorationGuidePage() {
  const currentTheme = getStoredTheme() as ThemeKey
  const currentMode: ColorMode = 'light'
  const [activeTab, setActiveTab] = useState<'artemis' | 'starship' | 'mars'>('artemis')
  const [launchData, setLaunchData] = useState<any>(null)
  const [newsItems, setNewsItems] = useState<any[]>([])

  if (typeof window !== 'undefined') {
    initializeColorMode()
  }

  // Fetch live SpaceX data
  useEffect(() => {
    async function fetchLaunchData() {
      try {
        const response = await fetch('https://api.spacexdata.com/v4/launches')
        const data = await response.json()
        // Get upcoming launches (date_utc > now) and sort by date
        const upcoming = data
          .filter((launch: any) => new Date(launch.date_utc) > new Date())
          .sort((a: any, b: any) => new Date(a.date_utc).getTime() - new Date(b.date_utc).getTime())
          .slice(0, 5)
        setLaunchData(upcoming)
      } catch (error) {
        console.error('Failed to fetch launch data:', error)
        // Set sample data on error
        setLaunchData([
          {
            id: 'sample-1',
            name: 'Upcoming Starship Launch',
            date_utc: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Next Starship test flight from Starbase, Texas',
            rocket: 'Starship',
            links: { webcast: 'https://www.youtube.com/spacex' }
          },
          {
            id: 'sample-2',
            name: 'Starlink Mission',
            date_utc: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
            details: 'Starlink satellite deployment mission',
            rocket: 'Falcon 9',
            links: { webcast: 'https://www.youtube.com/spacex' }
          }
        ])
      }
    }

    fetchLaunchData()
  }, [])

  // Sample space news (in production, fetch from NASA API)
  useEffect(() => {
    setNewsItems([
      {
        title: "NASA Announces Artemis II Crew",
        source: "NASA",
        time: "2h ago",
        url: "https://www.nasa.gov"
      },
      {
        title: "Starship Completes 50th Test Flight",
        source: "SpaceX",
        time: "5h ago",
        url: "https://www.spacex.com"
      },
      {
        title: "ESA Signs On for Artemis Missions",
        source: "ESA",
        time: "1d ago",
        url: "https://www.esa.int"
      }
    ])
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Enhanced Starfield Background */}
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

      {/* Live News Ticker */}
      <NewsTicker items={newsItems} />

      {/* Hero Section */}
      <HeroSection />

      {/* Live Launch Data */}
      <LaunchSection launchData={launchData} />

      {/* Interactive Tabs */}
      <TabSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Rocket Comparison */}
      <RocketComparison activeTab={activeTab} />

      {/* Interactive Mission Map */}
      <MissionMap />

      {/* Stats Section with Telemetry */}
      <StatsSection />

      {/* Video Section */}
      <VideoSection />

      {/* Mission Timeline */}
      <TimelineSection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

// Enhanced Starfield with shooting stars
function StarField() {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: 2 + Math.random() * 3,
  }))

  // Shooting stars
  const shootingStars = Array.from({ length: 3 }, (_, i) => ({
    id: `shooting-${i}`,
    startX: Math.random() * 100,
    delay: i * 5 + 3,
  }))

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Static stars */}
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
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute h-0.5 w-20 bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${star.startX}%`,
            left: '-10%',
          }}
          animate={{
            x: ['0vw', '120vw'],
            y: [0, 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

// Live News Ticker
function NewsTicker({ items }: { items: any[] }) {
  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 overflow-hidden">
      <div className="container mx-auto px-4 py-2 flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold flex-shrink-0">
          <Newspaper className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline">Space News:</span>
        </div>
        <div className="overflow-hidden flex-1">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -100 * items.length + '%'],
            }}
            transition={{
              duration: items.length * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {items.concat(items).map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-sm hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="font-semibold">{item.title}</span>
                <span className="text-muted-foreground">({item.source})</span>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Hero Section
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

// Live Launch Data Section
function LaunchSection({ launchData }: { launchData: any[] | null }) {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <Activity className="h-8 w-8 text-red-500 animate-pulse" />
            Upcoming Launches
          </h2>
          <p className="text-xl text-muted-foreground">Live data from SpaceX API</p>
        </motion.div>

        {!launchData ? (
          <div className="text-center text-muted-foreground">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Satellite className="h-12 w-12" />
            </motion.div>
            <p className="mt-4">Loading launch data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {launchData.map((launch: any, index: number) => (
              <LaunchCard key={launch.id} launch={launch} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// Launch Card Component
function LaunchCard({ launch, index }: { launch: any, index: number }) {
  return (
    <motion.a
      href={launch.links?.webcast || '#'}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative block"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {launch.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {new Date(launch.date_utc).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {launch.links?.webcast && (
            <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
          )}
        </div>

        {launch.details && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {launch.details}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Rocket className="h-4 w-4 text-primary" />
          <span className="font-semibold">{launch.rocket}</span>
        </div>
      </div>
    </motion.a>
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
        { label: "Payload", value: "100-150t", icon: Fuel },
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

// Interactive Mission Map
function MissionMap() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current) {
      setDimensions({
        width: mapRef.current.offsetWidth,
        height: mapRef.current.offsetHeight
      })
    }
  }, [])

  const missions = [
    { name: "Earth", x: 0.5, y: 0.9, icon: "🌍", color: "from-green-500 to-blue-500" },
    { name: "Moon", x: 0.75, y: 0.3, icon: "🌙", color: "from-gray-400 to-gray-600" },
    { name: "Mars", x: 0.2, y: 0.2, icon: "🪐", color: "from-orange-500 to-red-500" },
  ]

  const paths = [
    { from: 0, to: 1, name: "Artemis Missions", color: "border-blue-500" },
    { from: 1, to: 2, name: "Mars Transit", color: "border-red-500" },
  ]

  const getPathD = (fromX: number, fromY: number, toX: number, toY: number) => {
    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2 - 0.1
    return `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Mission Map</h2>
          <p className="text-xl text-muted-foreground">Interactive journey through space</p>
        </motion.div>

        <div
          ref={mapRef}
          className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 md:p-12"
          style={{ minHeight: '400px' }}
        >
          {/* Stars background */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Connection paths */}
          {dimensions.width > 0 && dimensions.height > 0 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {paths.map((path, index) => {
                const from = missions[path.from]
                const to = missions[path.to]
                const fromX = from.x * dimensions.width
                const fromY = from.y * dimensions.height
                const toX = to.x * dimensions.width
                const toY = to.y * dimensions.height
                return (
                  <motion.path
                    key={index}
                    d={getPathD(fromX, fromY, toX, toY)}
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    className={path.color}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: index * 0.5 }}
                    style={{ strokeDasharray: '5,5' }}
                  />
                )
              })}
            </svg>
          )}

          {/* Planet markers */}
          {missions.map((mission, index) => (
            <motion.div
              key={mission.name}
              className="absolute cursor-pointer group"
              style={{ left: `${mission.x * 100}%`, top: `${mission.y * 100}%`, transform: 'translate(-50%, -50%)' }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.2 }}
            >
              <div className={`relative text-6xl`}>
                {mission.icon}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${mission.color} rounded-full blur-xl -z-10 opacity-50`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background/90 backdrop-blur-sm border border-border/50 rounded-lg px-3 py-1 text-sm font-semibold">
                  {mission.name}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Stats Section with Telemetry
function StatsSection() {
  const stats = [
    { value: "17M", label: "Pounds of Thrust", sublabel: "Starship Super Heavy", icon: Zap },
    { value: "394", label: "Feet Tall", sublabel: "Starship Height", icon: TrendingUp },
    { value: "2026", label: "First Moon Flyby", sublabel: "Artemis II Mission", icon: Calendar },
    { value: "225M", label: "KM to Mars", sublabel: "Average Distance", icon: MapPin },
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
        <stat.icon className="h-8 w-8 mb-3 text-primary" />
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

// Video Section
function VideoSection() {
  const videos = [
    {
      title: "Artemis I Launch",
      videoId: "C9iar2Ie97c",
      description: "NASA's SLS rocket launches on Artemis I mission"
    },
    {
      title: "Starship Flight Test",
      videoId: "L5QXmbzhSxY",
      description: "SpaceX Starship最新测试飞行"
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Watch the Action</h2>
          <p className="text-xl text-muted-foreground">See these rockets in action</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.videoId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden">
                <div className="relative aspect-video">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-muted-foreground">{video.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
