import { Palette, Check } from "lucide-react"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { applyTheme, themes, type ThemeKey } from "@/lib/themes"

interface ThemeSwitcherProps {
  currentTheme: ThemeKey
  onThemeChange: (theme: ThemeKey) => void
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const handleThemeSelect = (themeKey: ThemeKey) => {
    applyTheme(themeKey)
    onThemeChange(themeKey)
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
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(themes).map(([key, theme]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => handleThemeSelect(key as ThemeKey)}
            className="flex items-center justify-between gap-2"
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
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
