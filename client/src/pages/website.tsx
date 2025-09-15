import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Edit3, Eye, Users, BarChart3, Settings } from "lucide-react";

export default function Website() {
  const pages = [
    { name: "Home", url: "/", status: "published", visitors: 1247, updated: "2024-01-15" },
    { name: "About Us", url: "/about", status: "published", visitors: 856, updated: "2024-01-12" },
    { name: "Products", url: "/products", status: "published", visitors: 2341, updated: "2024-01-14" },
    { name: "Contact", url: "/contact", status: "draft", visitors: 0, updated: "2024-01-16" }
  ];

  const analytics = [
    { metric: "Page Views", value: "12,847", change: "+15.2%", trend: "up" },
    { metric: "Unique Visitors", value: "3,291", change: "+8.7%", trend: "up" },
    { metric: "Bounce Rate", value: "34.2%", change: "-2.1%", trend: "down" },
    { metric: "Avg. Session", value: "3m 24s", change: "+12.3%", trend: "up" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="website-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="website-title">
            Website
          </h1>
          <p className="text-muted-foreground">Build and manage your company website</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-view-website">
            <Eye className="w-4 h-4 mr-2" />
            View Website
          </Button>
          <Button data-testid="button-create-page">
            <Edit3 className="w-4 h-4 mr-2" />
            New Page
          </Button>
        </div>
      </div>

      {/* Website Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {analytics.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.metric}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                  <p className={`text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pages Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Website Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`page-${index}`}>
                  <div>
                    <p className="font-medium">{page.name}</p>
                    <p className="text-sm text-muted-foreground">{page.url}</p>
                    <p className="text-sm text-muted-foreground">Updated: {page.updated}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={page.status === "published" ? "default" : "secondary"}>
                      {page.status}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-1">{page.visitors} visitors</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" data-testid="button-edit-homepage">
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Homepage
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-customize-theme">
              <Settings className="w-4 h-4 mr-2" />
              Customize Theme
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-configure-domain">
              <Globe className="w-4 h-4 mr-2" />
              Configure Domain
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-seo-settings">
              <BarChart3 className="w-4 h-4 mr-2" />
              SEO Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Website Builder Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Website Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Edit3 className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-2">Page Editor</h3>
              <p className="text-sm text-muted-foreground">Drag & drop page builder with live preview</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Settings className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-2">Theme Designer</h3>
              <p className="text-sm text-muted-foreground">Customize colors, fonts, and layouts</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-2">Analytics</h3>
              <p className="text-sm text-muted-foreground">Track visitor behavior and performance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}