import { Palette, Check, Sun, Moon } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { applyTheme, toggleColorMode, themes, type ThemeKey, type ColorMode } from "@/lib/themes"

interface ThemeSwitcherProps {
  currentTheme: ThemeKey
  onThemeChange: (theme: ThemeKey) => void
  currentMode: ColorMode
  onModeChange: (mode: ColorMode) => void
}

export function ThemeSwitcher({ currentTheme, onThemeChange, currentMode, onModeChange }: ThemeSwitcherProps) {
  const handleThemeSelect = (themeKey: ThemeKey) => {
    applyTheme(themeKey)
    onThemeChange(themeKey)
  }

  const handleModeToggle = () => {
    const newMode = toggleColorMode()
    onModeChange(newMode)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 gap-2 pr-3"
        >
          <div
            className="h-4 w-4 rounded-full border-2 border-background transition-colors duration-300"
            style={{ backgroundColor: themes[currentTheme].swatch }}
          />
          <Palette className="h-3.5 w-3.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        {/* Light/Dark Mode Section */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Appearance</p>
          <DropdownMenuItem
            onClick={handleModeToggle}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {currentMode === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span>{currentMode === 'dark' ? 'Dark' : 'Light'} Mode</span>
            </div>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        {/* Color Theme Section */}
        <div className="px-2 py-1.5">
          <p className="text-xs font-medium text-muted-foreground mb-1">Accent Color</p>
          {Object.entries(themes).map(([key, theme]) => (
            <DropdownMenuItem
              key={key}
              onClick={() => handleThemeSelect(key as ThemeKey)}
              className="flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full border-2 border-background"
                  style={{ backgroundColor: theme.swatch }}
                />
                <span>{theme.name}</span>
              </div>
              {currentTheme === key && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
