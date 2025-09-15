import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Bell, MessageCircle, Settings } from "lucide-react";
import { useLocation } from "wouter";

const breadcrumbMap: Record<string, string> = {
  "/": "Dashboard",
  "/sales": "Sales",
  "/crm": "CRM",
  "/inventory": "Inventory",
  "/accounting": "Accounting",
  "/hr": "Human Resources",
  "/project": "Project Management",
  "/manufacturing": "Manufacturing",
  "/purchase": "Purchase",
  "/website": "Website",
  "/ecommerce": "eCommerce",
  "/pos": "Point of Sale",
  "/marketing": "Marketing",
  "/events": "Events",
  "/helpdesk": "Helpdesk",
  "/knowledge": "Knowledge",
  "/documents": "Documents",
  "/surveys": "Surveys",
  "/social": "Social Marketing",
  "/email": "Email Marketing",
  "/sms": "SMS Marketing",
  "/approvals": "Approvals",
  "/fleet": "Fleet",
  "/maintenance": "Maintenance",
  "/quality": "Quality",
  "/plm": "PLM",
  "/barcode": "Barcode",
  "/iot": "IoT",
  "/studio": "Studio",
};

export default function TopBar() {
  const [location] = useLocation();
  const currentPage = breadcrumbMap[location] || "Dashboard";

  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-6" data-testid="top-bar">
      <div className="flex items-center space-x-4">
        <nav className="flex space-x-1 text-sm text-muted-foreground">
          <span data-testid="breadcrumb-current">{currentPage}</span>
        </nav>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-2 text-sm"
            data-testid="input-global-search"
          />
        </div>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative p-2"
          data-testid="button-notifications"
        >
          <Bell className="w-4 h-4" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 text-xs flex items-center justify-center p-0"
          >
            3
          </Badge>
        </Button>

        {/* Messages */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2"
          data-testid="button-messages"
        >
          <MessageCircle className="w-4 h-4" />
        </Button>

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-2"
          data-testid="button-settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
