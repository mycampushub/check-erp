import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Gauge, ChartLine, Users, Package, Calculator, Bus, 
  FolderOpen, Factory, ShoppingCart, Globe, Store, 
  ScanBarcode, Megaphone, Calendar, LifeBuoy, Book, 
  FileText, BarChart3, Share2, Mail, MessageSquare, 
  CheckCircle, Car, Wrench, Award, Settings, Barcode, 
  Wifi, Palette, Box
} from "lucide-react";

const modules = [
  { id: "dashboard", name: "Dashboard", icon: Gauge, path: "/" },
  { id: "sales", name: "Sales", icon: ChartLine, path: "/sales" },
  { id: "crm", name: "CRM", icon: Users, path: "/crm" },
  { id: "inventory", name: "Inventory", icon: Package, path: "/inventory" },
  { id: "accounting", name: "Accounting", icon: Calculator, path: "/accounting" },
  { id: "hr", name: "HR", icon: Bus, path: "/hr" },
  { id: "project", name: "Project", icon: FolderOpen, path: "/project" },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, path: "/manufacturing" },
  { id: "purchase", name: "Purchase", icon: ShoppingCart, path: "/purchase" },
  { id: "website", name: "Website", icon: Globe, path: "/website" },
  { id: "ecommerce", name: "eCommerce", icon: Store, path: "/ecommerce" },
  { id: "pos", name: "Point of Sale", icon: ScanBarcode, path: "/pos" },
  { id: "marketing", name: "Marketing", icon: Megaphone, path: "/marketing" },
  { id: "events", name: "Events", icon: Calendar, path: "/events" },
  { id: "helpdesk", name: "Helpdesk", icon: LifeBuoy, path: "/helpdesk" },
  { id: "knowledge", name: "Knowledge", icon: Book, path: "/knowledge" },
  { id: "documents", name: "Documents", icon: FileText, path: "/documents" },
  { id: "surveys", name: "Surveys", icon: BarChart3, path: "/surveys" },
  { id: "social", name: "Social Marketing", icon: Share2, path: "/social" },
  { id: "email", name: "Email Marketing", icon: Mail, path: "/email" },
  { id: "sms", name: "SMS Marketing", icon: MessageSquare, path: "/sms" },
  { id: "approvals", name: "Approvals", icon: CheckCircle, path: "/approvals" },
  { id: "fleet", name: "Fleet", icon: Car, path: "/fleet" },
  { id: "maintenance", name: "Maintenance", icon: Wrench, path: "/maintenance" },
  { id: "quality", name: "Quality", icon: Award, path: "/quality" },
  { id: "plm", name: "PLM", icon: Settings, path: "/plm" },
  { id: "barcode", name: "Barcode", icon: Barcode, path: "/barcode" },
  { id: "iot", name: "IoT", icon: Wifi, path: "/iot" },
  { id: "studio", name: "Studio", icon: Palette, path: "/studio" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-60 bg-card border-r border-border flex flex-col" data-testid="sidebar">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Box className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-lg" data-testid="app-title">Odoo</h1>
            <p className="text-xs text-muted-foreground">v17.0 Enterprise</p>
          </div>
        </div>
      </div>

      {/* Apps Menu */}
      <div className="flex-1 overflow-y-auto sidebar-scrollbar">
        <div className="p-2 space-y-1">
          {modules.map((module) => {
            const Icon = module.icon;
            const isActive = location === module.path;
            
            return (
              <Link key={module.id} href={module.path}>
                <div
                  className={cn(
                    "menu-item p-2 rounded-md cursor-pointer",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  )}
                  data-testid={`menu-item-${module.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{module.name}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-muted rounded-md p-2" data-testid="user-profile">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-sm font-medium text-primary-foreground">JD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Demo Company</p>
          </div>
          <div className="w-4 h-4 text-muted-foreground">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
