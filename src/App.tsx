import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { NavSidebar, type NavItem } from './components/NavSidebar'
import { ProjectsView } from './components/ProjectsView'
import { getStoredTheme, type ThemeKey } from './lib/themes'

function App() {
  const [activeNav, setActiveNav] = useState<NavItem>('projects')
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>(() => getStoredTheme())

  useEffect(() => {
    const theme = getStoredTheme()
    setCurrentTheme(theme)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Animated background mesh */}
      <div className="fixed inset-0 -z-10 opacity-10 pointer-events-none mesh-gradient"></div>

      {/* Header */}
      <Header
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
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

export default App
