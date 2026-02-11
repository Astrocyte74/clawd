import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { NavSidebar, type NavItem } from './components/NavSidebar'
import { LandingPage } from './components/LandingPage'
import FlooringBasementPage from './pages/flooring-basement'
import AstronomicalEventsPage from './pages/astronomical-events'
import TofuRecipesPage from './pages/tofu-recipes'
import AINewsJan2026Page from './pages/ai-news-jan2026'
import DemoFeaturesPage from './pages/demo-features'
import MarkdownDemoPage from './pages/markdown-demo'
import CodingFrameworksGuidePage from './pages/coding-frameworks-guide'
import SpaceExplorationGuidePage from './pages/space-exploration-guide'
import SlsVsStarshipPage from './pages/sls-vs-starship'
import BestMarathonShoes2026Page from './pages/best-marathon-shoes-2026'
import HokaMach7ReviewPage from './pages/hoka-mach-7-review'
import PlantTouchCommunicationPage from './pages/plant-touch-communication'
import AncientAdvancedKnowledgePage from './pages/ancient-advanced-knowledge'
import OpenClawSkillsAnalysisPage from './pages/openclaw-skills-analysis'
import FolderMonitoringImageGeneratorPage from './pages/folder-monitoring-image-generator'
import OpenclawPlaywrightCliPage from './pages/openclaw-playwright-cli'
import AlibabaZvecVectorDatabasePage from './pages/alibaba-zvec-vector-database'
import MermaidDemoPage from './pages/mermaid-demo'
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
            <LandingPage />
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
    <BrowserRouter basename="/">
      <AppRouter
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
        currentMode={currentMode}
        setCurrentMode={setCurrentMode}
      />
    </BrowserRouter>
  )
}

function AppRouter({ activeNav, setActiveNav, currentTheme, setCurrentTheme, currentMode, setCurrentMode }: {
  activeNav: NavItem
  setActiveNav: (nav: NavItem) => void
  currentTheme: ThemeKey
  setCurrentTheme: (theme: ThemeKey) => void
  currentMode: ColorMode
  setCurrentMode: (mode: ColorMode) => void
}) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if we have a ?p= query parameter from 404.html redirect
    const params = new URLSearchParams(location.search)
    const path = params.get('p')

    if (path) {
      // Redirect to the actual path and remove the query parameter
      navigate('/' + path, { replace: true })
    }
  }, [location, navigate])

  return (
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
        <Route path="/markdown-demo" element={<MarkdownDemoPage />} />
        <Route path="/coding-frameworks-guide" element={<CodingFrameworksGuidePage />} />
        <Route path="/space-exploration-guide" element={<SpaceExplorationGuidePage />} />
        <Route path="/sls-vs-starship" element={<SlsVsStarshipPage />} />
        <Route path="/best-marathon-shoes-2026" element={<BestMarathonShoes2026Page />} />
        <Route path="/hoka-mach-7-review" element={<HokaMach7ReviewPage />} />
        <Route path="/plant-touch-communication" element={<PlantTouchCommunicationPage />} />
        <Route path="/ancient-advanced-knowledge" element={<AncientAdvancedKnowledgePage />} />
        <Route path="/openclaw-skills-analysis" element={<OpenClawSkillsAnalysisPage />} />
        <Route path="/folder-monitoring-image-generator" element={<FolderMonitoringImageGeneratorPage />} />
        <Route path="/mermaid-demo" element={<MermaidDemoPage />} />
        <Route path="/openclaw-playwright-cli" element={<OpenclawPlaywrightCliPage />} />
        <Route path="/alibaba-zvec-vector-database" element={<AlibabaZvecVectorDatabasePage />} />
      </Routes>
    )
}

export default App
