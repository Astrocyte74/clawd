export type ThemeKey = 'clawd' | 'ocean' | 'forest' | 'sunset'

export interface Theme {
  name: string
  primary: string
  swatch: string
}

export const themes: Record<ThemeKey, Theme> = {
  clawd: {
    name: 'Clawd Purple',
    primary: 'oklch(0.65 0.20 280)',
    swatch: '#8b5cf6'
  },
  ocean: {
    name: 'Ocean Blue',
    primary: 'oklch(0.65 0.15 250)',
    swatch: '#3b82f6'
  },
  forest: {
    name: 'Forest Green',
    primary: 'oklch(0.65 0.15 145)',
    swatch: '#22c55e'
  },
  sunset: {
    name: 'Sunset Orange',
    primary: 'oklch(0.65 0.20 45)',
    swatch: '#f97316'
  }
}

const THEME_STORAGE_KEY = 'clawd:theme'

export function getStoredTheme(): ThemeKey {
  if (typeof localStorage === 'undefined') return 'clawd'
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  return (stored as ThemeKey) || 'clawd'
}

export function applyTheme(themeKey: ThemeKey) {
  const theme = themes[themeKey]
  if (!theme) return

  document.documentElement.style.setProperty('--primary', theme.primary)

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, themeKey)
  }
}
