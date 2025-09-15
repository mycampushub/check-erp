import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, List, BarChart3, Calendar } from "lucide-react";

interface ViewTabsProps {
  activeView: string;
  onViewChange: (view: string) => void;
  views?: Array<{
    id: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  className?: string;
  "data-testid"?: string;
}

const defaultViews = [
  { id: "kanban", label: "Kanban", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "graph", label: "Graph", icon: BarChart3 },
];

export default function ViewTabs({ 
  activeView, 
  onViewChange, 
  views = defaultViews.slice(0, 3), // Default to first 3 views
  className,
  "data-testid": testId 
}: ViewTabsProps) {
  return (
    <div className={cn("flex space-x-1", className)} data-testid={testId}>
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = activeView === view.id;
        
        return (
          <Button
            key={view.id}
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewChange(view.id)}
            className={cn(
              "view-tab px-3 py-1 text-sm rounded-md transition-colors",
              isActive && "active"
            )}
            data-testid={`button-view-${view.id}`}
          >
            {Icon && <Icon className="w-4 h-4 mr-1" />}
            {view.label}
          </Button>
        );
      })}
    </div>
  );
}
