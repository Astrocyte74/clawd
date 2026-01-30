import { ArrowLeft, Calendar, MapPin, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { ThemeSwitcher } from "../components/ThemeSwitcher"
import { getStoredColorMode, toggleColorMode, type ColorMode, type ThemeKey } from "@/lib/themes"
import { useState } from "react"

export default function AstronomicalEventsPage() {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("clawd")
  const currentMode = getStoredColorMode()

  const handleModeChange = (_mode: ColorMode) => {
    toggleColorMode()
  }

  // Upcoming astronomical events for 2025
  const events = [
    {
      date: "February 17, 2025",
      time: "Best viewing: 9:00 PM - 11:00 PM MST",
      title: "Close Venus-Moon Conjunction",
      type: "planetary",
      icon: "🌙",
      description: "The crescent Moon and Venus will appear incredibly close in the evening sky, creating a stunning visual pairing. Look to the southwest shortly after sunset.",
      visibility: "Visible to naked eye",
      highlights: ["Ultra-close approach", "Great photo opportunity", "Low western horizon"]
    },
    {
      date: "March 14, 2025",
      time: "All night",
      title: "Total Lunar Eclipse",
      type: "eclipse",
      icon: "🌑",
      description: "A dramatic total lunar eclipse will turn the Moon a deep red color during totality. The entire eclipse will be visible from Carstairs.",
      visibility: "Visible to naked eye",
      highlights: ["Totality lasts ~65 minutes", "Blood Moon effect", "No special equipment needed"]
    },
    {
      date: "April 22-23, 2025",
      time: "Best viewing: 2:00 AM - 4:00 AM MST",
      title: "Lyrid Meteor Shower Peak",
      type: "meteor",
      icon: "🌠",
      description: "The Lyrids bring 15-20 meteors per hour at their peak. This year's display benefits from a waxing crescent moon that won't interfere.",
      visibility: "Dark sky location recommended",
      highlights: ["~18 meteors/hour expected", "Possible fireball activity", "Ancient shower (2700 years observed)"]
    },
    {
      date: "June 11, 2025",
      time: "Best viewing: 10:00 PM - 1:00 AM MST",
      title: "Saturn at Opposition",
      type: "planetary",
      icon: "🪐",
      description: "Saturn reaches opposition, making it appear brighter and larger than usual. The rings will be spectacular through even small telescopes.",
      visibility: "Visible to naked eye, best with telescope",
      highlights: ["Closest approach to Earth", "Rings at ~18° tilt", "Great for astrophotography"]
    },
    {
      date: "August 12-13, 2025",
      time: "Best viewing: 11:00 PM - 4:00 AM MST",
      title: "Perseid Meteor Shower Peak",
      type: "meteor",
      icon: "🌠",
      description: "The year's most popular meteor shower! The Perseids typically produce 50-100 meteors per hour, including many bright fireballs.",
      visibility: "Dark sky location recommended",
      highlights: ["~75 meteors/hour expected", "Fast & bright meteors", "New Moon - perfect conditions!"]
    },
    {
      date: "September 7, 2025",
      time: "All night",
      title: "Total Lunar Eclipse",
      type: "eclipse",
      icon: "🌑",
      description: "Another total lunar eclipse, this one well-positioned for evening viewing. The Moon will rise already partially eclipsed.",
      visibility: "Visible to naked eye",
      highlights: ["Convenient evening timing", "Blood Moon returns", "Second eclipse of 2025"]
    },
    {
      date: "September 21, 2025",
      time: "Evening twilight",
      title: "Venus at Greatest Eastern Elongation",
      type: "planetary",
      icon: "✨",
      description: "Venus reaches its maximum separation from the Sun, shining as the 'Evening Star' at its brightest. Visible for hours after sunset.",
      visibility: "Visible to naked eye",
      highlights: ["Maximum brightness", "Telescopic crescent phase", 'Dominated evening sky']
    },
    {
      date: "December 13-14, 2025",
      time: "Best viewing: 10:00 PM - 2:00 AM MST",
      title: "Geminid Meteor Shower Peak",
      type: "meteor",
      icon: "🌠",
      description: "The Geminids are often the year's best shower, with up to 120 multicolored meteors per hour. Unlike most showers, these are visible before midnight.",
      visibility: "Dark sky location recommended",
      highlights: ["~100 meteors/hour expected", "Slow, bright meteors", "Unique asteroid origin"]
    }
  ]

  const eventCardStyle = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
    transition: "all 0.3s ease"
  }

  const typeBadgeColors = {
    planetary: { bg: "oklch(0.65 0.15 250 / 0.15)", border: "oklch(0.65 0.15 250 / 0.3)", text: "oklch(0.55 0.15 250)" },
    meteor: { bg: "oklch(0.75 0.15 45 / 0.15)", border: "oklch(0.75 0.15 45 / 0.3)", text: "oklch(0.55 0.15 45)" },
    eclipse: { bg: "oklch(0.55 0.15 0 / 0.15)", border: "oklch(0.55 0.15 0 / 0.3)", text: "oklch(0.45 0.15 0)" }
  }

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
      <section className="relative py-16 sm:py-20 bg-card border-b border-border/50 overflow-hidden">
        {/* Animated stars background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 text-4xl animate-pulse" style={{ animationDuration: '3s' }}>✨</div>
          <div className="absolute top-20 right-20 text-2xl animate-pulse" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute bottom-10 left-1/4 text-3xl animate-pulse" style={{ animationDuration: '2.8s', animationDelay: '1s' }}>🌟</div>
          <div className="absolute bottom-20 right-1/3 text-xl animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '1.5s' }}>✨</div>
          <div className="absolute top-1/2 left-20 text-2xl animate-pulse" style={{ animationDuration: '2.7s', animationDelay: '0.3s' }}>⭐</div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="text-6xl animate-bounce" style={{ animationDuration: '2s' }}>🌌</div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Astronomical Events
            </h1>
            <div className="text-6xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>🔭</div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
            Your celestial event guide for 2025
          </p>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Carstairs, Alberta, Canada</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Mountain Standard Time (MST)</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-xl border border-border/50 p-6 text-center hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2">{events.length}</div>
                <div className="text-sm text-muted-foreground">Major Events</div>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-6 text-center hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2">3</div>
                <div className="text-sm text-muted-foreground">Meteor Showers</div>
              </div>
              <div className="bg-card rounded-xl border border-border/50 p-6 text-center hover:border-primary/50 transition-all">
                <div className="text-3xl mb-2">2</div>
                <div className="text-sm text-muted-foreground">Lunar Eclipses</div>
              </div>
            </div>

            {/* Events List */}
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              2025 Celestial Calendar
            </h2>

            {events.map((event, index) => (
              <div 
                key={index} 
                className="hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                style={eventCardStyle}
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl flex-shrink-0">{event.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span 
                        className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{
                          background: typeBadgeColors[event.type as keyof typeof typeBadgeColors]?.bg || typeBadgeColors.planetary.bg,
                          border: `1px solid ${typeBadgeColors[event.type as keyof typeof typeBadgeColors]?.border || typeBadgeColors.planetary.border}`,
                          color: typeBadgeColors[event.type as keyof typeof typeBadgeColors]?.text || typeBadgeColors.planetary.text
                        }}
                      >
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </span>
                      <span className="text-xs font-semibold text-primary">{event.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    
                    <p className="text-muted-foreground text-sm mb-3">{event.description}</p>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="text-xs font-medium text-muted-foreground mb-3">
                      Visibility: <span className="text-foreground">{event.visibility}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded-md bg-muted border border-border/50"
                        >
                          ✓ {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Viewing Tips */}
            <div className="mt-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 p-6">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                <Star className="w-5 h-5 text-purple-400" />
                Viewing Tips for Carstairs Area
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong>Dark Sky Locations:</strong> Drive 15-20 minutes north or east of town for darker skies. Avoid lights from Calgary (south).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong>Equipment:</strong> Most events are visible to the naked eye. Binoculars enhance the experience. A telescope is great for Saturn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong>Weather:</strong> Check the forecast! Clear winter nights offer the best viewing, though they can be very cold.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span><strong>Timing:</strong> All times listed in Mountain Standard Time (MST). Events are best viewed when the Moon is new or in its crescent phases.</span>
                </li>
              </ul>
            </div>

            {/* Last Updated */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Last updated: January 30, 2026 • This page is regularly updated with new events</p>
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
