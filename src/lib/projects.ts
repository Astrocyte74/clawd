export interface Project {
  id: string
  title: string
  description: string
  category: 'home-renovation' | 'ai-research' | 'recipes'
  categoryLabel: string
  categoryIcon: string
  href: string
  date: string
  metadata?: Array<{
    icon: string
    label: string
  }>
}

export const projects: Project[] = [
  {
    id: 'basement-flooring',
    title: 'Basement Flooring Plan',
    description: 'Complete flooring specification and material calculation for a 311 sq ft multi-purpose basement room featuring Tennessee Bluegrass LVP with acoustic backing.',
    category: 'home-renovation',
    categoryLabel: 'Home Improvement',
    categoryIcon: '🏠',
    href: 'flooring-basement/',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4',
        label: '342 sq ft'
      }
    ]
  },
  {
    id: 'astronomical-events',
    title: 'Astronomical Events 2025',
    description: 'Your guide to celestial events visible from Carstairs, Alberta. Features meteor showers, lunar eclipses, planetary conjunctions, and stargazing tips.',
    category: 'ai-research',
    categoryLabel: 'Astronomy',
    categoryIcon: '🌌',
    href: 'astronomical-events/',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
        label: '8 major events'
      },
      {
        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
        label: 'Peak viewing times'
      }
    ]
  },
  {
    id: 'tofu-recipes',
    title: 'Creative Tofu Recipes',
    description: 'Delicious, protein-packed plant-based recipes featuring crispy maple-Sriracha tofu, Korean BBQ bowls, coconut curry, and smoky BLT sandwiches.',
    category: 'recipes',
    categoryLabel: 'Cooking',
    categoryIcon: '🥢',
    href: 'tofu-recipes/',
    date: 'Jan 30, 2026',
    metadata: [
      {
        icon: '⏱️',
        label: '20-40 mins each'
      },
      {
        icon: '🌱',
        label: '4 recipes'
      }
    ]
  }
]
