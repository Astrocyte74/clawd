import { Github } from "lucide-react"
import { Button } from "./ui/button"
import { ThemeSwitcher } from "./ThemeSwitcher"
import { type ThemeKey } from "@/lib/themes"

interface HeaderProps {
  currentTheme: ThemeKey
  onThemeChange: (theme: ThemeKey) => void
}

export function Header({ currentTheme, onThemeChange }: HeaderProps) {
  return (
    <header className="flex-shrink-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br text-primary-foreground transition-colors duration-300"
            style={{ backgroundImage: `linear-gradient(to bottom right, var(--primary), var(--primary) / 0.6)` }}
          >
            <span className="font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="text-sm font-bold">Clawd Hub</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Projects</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Projects Dashboard</span>
          </div>

          {/* Theme switcher dropdown */}
          <ThemeSwitcher currentTheme={currentTheme} onThemeChange={onThemeChange} />

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            asChild
          >
            <a
              href="https://github.com/astrocyte74/clawd"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
