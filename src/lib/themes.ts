export type ThemeKey = 'clawd' | 'ocean' | 'forest' | 'sunset'
export type ColorMode = 'light' | 'dark'

export interface Theme {
  name: string
  primary: string
  ring: string
  swatch: string
}

export const themes: Record<ThemeKey, Theme> = {
  clawd: {
    name: 'Clawd Purple',
    primary: 'oklch(0.65 0.20 280)',
    ring: 'oklch(0.551 0.027 264.364)',
    swatch: '#8b5cf6'
  },
  ocean: {
    name: 'Ocean Blue',
    primary: 'oklch(0.65 0.15 250)',
    ring: 'oklch(0.551 0.027 250)',
    swatch: '#3b82f6'
  },
  forest: {
    name: 'Forest Green',
    primary: 'oklch(0.65 0.15 145)',
    ring: 'oklch(0.551 0.027 145)',
    swatch: '#22c55e'
  },
  sunset: {
    name: 'Sunset Orange',
    primary: 'oklch(0.65 0.20 45)',
    ring: 'oklch(0.551 0.027 45)',
    swatch: '#f97316'
  }
}

const THEME_STORAGE_KEY = 'clawd:theme'
const COLOR_MODE_STORAGE_KEY = 'clawd:colorMode'

export function getStoredTheme(): ThemeKey {
  if (typeof localStorage === 'undefined') return 'clawd'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return (stored as ThemeKey) || 'clawd'
}

export function getStoredColorMode(): ColorMode {
  if (typeof localStorage === 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const stored = localStorage.getItem(COLOR_MODE_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  // Check system preference
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function applyTheme(themeKey: ThemeKey) {
  const theme = themes[themeKey]
  if (!theme) return

  // Update all theme-related CSS variables
  document.documentElement.style.setProperty('--primary', theme.primary)
  document.documentElement.style.setProperty('--ring', theme.ring)

  // Store preference
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, themeKey)
  }
}

export function applyColorMode(mode: ColorMode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  // Store preference
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, mode)
  }
}

export function toggleColorMode(): ColorMode {
  const currentMode = getStoredColorMode()
  const newMode: ColorMode = currentMode === 'dark' ? 'light' : 'dark'
  applyColorMode(newMode)
  return newMode
}

// Initialize color mode on load
export function initializeColorMode() {
  const mode = getStoredColorMode()
  applyColorMode(mode)
}
