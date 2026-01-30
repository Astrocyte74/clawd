import { Home, Hammer, Bot, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export type NavItem = "projects" | "home-renovation" | "ai-research" | "settings"

interface NavItemConfig {
  id: NavItem
  label: string
  icon: React.ElementType
  comingSoon?: boolean
}

const NAV_ITEMS: NavItemConfig[] = [
  { id: "projects", label: "All Projects", icon: Home },
  { id: "home-renovation", label: "Home Renovation", icon: Hammer },
  { id: "ai-research", label: "AI Research", icon: Bot },
  { id: "settings", label: "Settings", icon: Settings, comingSoon: true },
]

interface NavSidebarProps {
  activeItem: NavItem
  onItemClick: (item: NavItem) => void
}

export function NavSidebar({ activeItem, onItemClick }: NavSidebarProps) {
  return (
    <div className="w-14 bg-muted/30 border-r border-border flex flex-col items-center py-4 gap-2">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = activeItem === item.id

        return (
          <button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            disabled={item.comingSoon}
            className={cn(
              "relative group w-10 h-10 rounded-lg flex items-center justify-center transition-all",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-primary text-primary-foreground shadow-sm",
              !isActive && "text-muted-foreground",
              item.comingSoon && "opacity-50 cursor-not-allowed hover:bg-transparent hover:text-muted-foreground"
            )}
            title={item.comingSoon ? `${item.label} (Coming Soon)` : item.label}
          >
            <Icon className="h-5 w-5" />

            {/* Tooltip */}
            <div className="absolute left-full ml-2 px-2 py-1 bg-popover border border-border rounded-md shadow-md text-xs whitespace-nowrap text-foreground opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
              {item.comingSoon ? `${item.label} (Coming Soon)` : item.label}
            </div>
          </button>
        )
      })}
    </div>
  )
}
