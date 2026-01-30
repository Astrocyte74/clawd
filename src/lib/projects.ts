export interface Project {
  id: string
  title: string
  description: string
  category: 'home-renovation' | 'ai-research'
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
  }
]
