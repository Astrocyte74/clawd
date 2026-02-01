import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Header } from './components/Header'
import { NavSidebar, type NavItem } from './components/NavSidebar'
import { ProjectsView } from './components/ProjectsView'
import FlooringBasementPage from './pages/flooring-basement'
import AstronomicalEventsPage from './pages/astronomical-events'
import TofuRecipesPage from './pages/tofu-recipes'
import AINewsJan2026Page from './pages/ai-news-jan2026'
import DemoFeaturesPage from './pages/demo-features'
import { getStoredTheme, initializeColorMode, type ThemeKey, type ColorMode } from './lib/themes'

function DashboardLayout({ activeNav, setActiveNav, currentTheme, setCurrentTheme, currentMode, setCurrentMode }: {
  activeNav: NavItem
  setActiveNav: (nav: NavItem) => void
  currentTheme: ThemeKey
  setCurrentTheme: (theme: ThemeKey) => void
  currentMode: ColorMode
  setCurrentMode: (mode: ColorMode) => void
}) {
  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Animated background mesh */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Header */}
      <Header
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        currentMode={currentMode}
        onModeChange={setCurrentMode}
      />

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation sidebar */}
        <NavSidebar activeItem={activeNav} onItemClick={setActiveNav} />

        {/* Content area */}
        <div className="flex-1 h-full overflow-hidden">
          {activeNav === 'settings' ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <p className="text-6xl mb-4">⚙️</p>
              <h3 className="text-lg font-semibold">Settings</h3>
              <p className="text-sm text-muted-foreground max-w-md mt-2">
                This feature is coming soon.
              </p>
            </div>
          ) : (
            <ProjectsView activeNav={activeNav} />
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex-shrink-0 border-t bg-muted/20 px-4 py-1">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Clawd Hub v1.0.0</span>
          <span>AI-Powered Projects Dashboard</span>
        </div>
      </footer>
    </div>
  )
}

function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('projects')
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(() => getStoredTheme())
  const [currentMode, setCurrentMode] = useState<ColorMode>(() => {
    // Initialize from localStorage or system preference
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('clawd:colorMode')
      if (stored === 'light' || stored === 'dark') return stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    // Initialize color mode on mount
    initializeColorMode()

    // Get initial theme
    const theme = getStoredTheme()
    setCurrentTheme(theme)
  }, [])

  return (
    <BrowserRouter basename="/clawd">
      <Routes>
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/" element={
          <DashboardLayout
            activeNav={activeNav}
            setActiveNav={setActiveNav}
            currentTheme={currentTheme}
            setCurrentTheme={setCurrentTheme}
            currentMode={currentMode}
            setCurrentMode={setCurrentMode}
          />
        } />
        <Route path="/flooring-basement" element={<FlooringBasementPage />} />
        <Route path="/astronomical-events" element={<AstronomicalEventsPage />} />
        <Route path="/tofu-recipes" element={<TofuRecipesPage />} />
        <Route path="/ai-news-jan2026" element={<AINewsJan2026Page />} />
        <Route path="/demo-features" element={<DemoFeaturesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
