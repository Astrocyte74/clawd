import { Sun, Moon } from "lucide-react"
import { Button } from "./ui/button"
import { toggleColorMode, type ColorMode } from "@/lib/themes"

interface ColorModeToggleProps {
  currentMode: ColorMode
  onModeChange: (mode: ColorMode) => void
}

export function ColorModeToggle({ currentMode, onModeChange }: ColorModeToggleProps) {
  const handleToggle = () => {
    const newMode = toggleColorMode()
    onModeChange(newMode)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 relative overflow-hidden"
      onClick={handleToggle}
      title={`Switch to ${currentMode === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle {currentMode === 'dark' ? 'light' : 'dark'} mode</span>
    </Button>
  )
}
