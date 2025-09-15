import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Layout, Settings, Zap, Database } from "lucide-react";

export default function Studio() {
  const customizations = [
    { name: "Sales Pipeline", type: "Model", status: "active", modified: "2024-01-15", description: "Custom sales stages and automation" },
    { name: "Product Form", type: "View", status: "draft", modified: "2024-01-16", description: "Enhanced product creation form" },
    { name: "Customer Report", type: "Report", status: "active", modified: "2024-01-14", description: "Monthly customer analysis" }
  ];

  const templates = [
    { name: "Project Management", category: "Business", fields: 12, views: 4, description: "Complete project tracking system" },
    { name: "Event Planning", category: "Events", fields: 8, views: 3, description: "Event organization and management" },
    { name: "Asset Tracking", category: "Inventory", fields: 15, views: 5, description: "Track company assets and equipment" }
  ];

  const automations = [
    { name: "Lead Follow-up", trigger: "New Lead", action: "Send Email", status: "active" },
    { name: "Invoice Reminder", trigger: "Due Date", action: "Email + SMS", status: "active" },
    { name: "Task Assignment", trigger: "Project Update", action: "Assign Task", status: "paused" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="studio-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="studio-title">
            Studio
          </h1>
          <p className="text-muted-foreground">Customize and extend your Odoo experience with no-code tools</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-automation-builder">
            <Zap className="w-4 h-4 mr-2" />
            Automation
          </Button>
          <Button data-testid="button-create-app">
            <Code className="w-4 h-4 mr-2" />
            Create App
          </Button>
        </div>
      </div>

      {/* Studio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Apps</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-green-600">3 published</p>
              </div>
              <Code className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Fields</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-blue-600">Across 8 models</p>
              </div>
              <Database className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Automations</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-green-600">16 active</p>
              </div>
              <Zap className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Custom Views</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-orange-600">Forms & Lists</p>
              </div>
              <Layout className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customizations & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Customizations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customizations.map((custom, index) => (
                <div key={index} className="p-3 border rounded-lg" data-testid={`customization-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{custom.name}</p>
                      <p className="text-sm text-muted-foreground">{custom.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={custom.status === "active" ? "default" : "secondary"}>
                        {custom.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{custom.type}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Modified: {custom.modified}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="p-3 border rounded-lg" data-testid={`template-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Badge variant="outline">{template.category}</Badge>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{template.fields} fields</span>
                    <span>{template.views} views</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Development Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Automations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {automations.map((automation, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`automation-${index}`}>
                  <div>
                    <p className="font-medium">{automation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {automation.trigger} → {automation.action}
                    </p>
                  </div>
                  <Badge variant={automation.status === "active" ? "default" : "secondary"}>
                    {automation.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Studio Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-start" variant="outline" data-testid="button-model-builder">
              <Database className="w-4 h-4 mr-2" />
              Model Builder
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-view-designer">
              <Layout className="w-4 h-4 mr-2" />
              View Designer
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-automation-builder-detailed">
              <Zap className="w-4 h-4 mr-2" />
              Automation Builder
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-report-designer">
              <Settings className="w-4 h-4 mr-2" />
              Report Designer
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Development Environment */}
      <Card>
        <CardHeader>
          <CardTitle>Development Environment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Code className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-2">Code Editor</h3>
              <p className="text-sm text-muted-foreground">Write custom Python code and XML views</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Palette className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-2">Theme Designer</h3>
              <p className="text-sm text-muted-foreground">Customize the look and feel of your apps</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Database className="w-12 h-12 mx-auto mb-2 text-primary" />
              <h3 className="font-medium mb-2">Database Schema</h3>
              <p className="text-sm text-muted-foreground">Manage models, fields, and relationships</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}