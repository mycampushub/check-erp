import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wrench, Calendar, AlertTriangle, CheckCircle, Clock, Settings } from "lucide-react";

export default function Maintenance() {
  const maintenanceRequests = [
    { id: "MR001", equipment: "Printer - Floor 2", type: "Repair", priority: "high", status: "in_progress", assigned: "John Smith", created: "2024-01-15", due: "2024-01-17" },
    { id: "MR002", equipment: "HVAC System", type: "Preventive", priority: "medium", status: "scheduled", assigned: "Sarah Wilson", created: "2024-01-14", due: "2024-01-20" },
    { id: "MR003", equipment: "Coffee Machine", type: "Repair", priority: "low", status: "completed", assigned: "Mike Johnson", created: "2024-01-13", due: "2024-01-16" }
  ];

  const equipment = [
    { name: "HVAC System", location: "Building A", status: "operational", last_maintenance: "2024-01-01", next_maintenance: "2024-03-01" },
    { name: "Generator", location: "Basement", status: "maintenance_needed", last_maintenance: "2023-11-15", next_maintenance: "2024-01-15" },
    { name: "Elevator 1", location: "Main Building", status: "operational", last_maintenance: "2024-01-10", next_maintenance: "2024-04-10" },
    { name: "Security System", location: "All Floors", status: "operational", last_maintenance: "2024-01-05", next_maintenance: "2024-02-05" }
  ];

  const analytics = [
    { metric: "Active Requests", value: "23", change: "+3", trend: "up" },
    { metric: "Avg. Response Time", value: "2.4h", change: "-0.5h", trend: "down" },
    { metric: "Equipment Uptime", value: "97.8%", change: "+1.2%", trend: "up" },
    { metric: "Preventive Maintenance", value: "89%", change: "+5%", trend: "up" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="maintenance-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="maintenance-title">
            Maintenance
          </h1>
          <p className="text-muted-foreground">Manage equipment maintenance and repair requests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-preventive-schedule">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button data-testid="button-new-request">
            <Wrench className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Maintenance Overview */}
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
                <Wrench className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Maintenance Requests & Equipment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="p-3 border rounded-lg" data-testid={`request-${request.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{request.equipment}</p>
                      <p className="text-sm text-muted-foreground">{request.id} • {request.assigned}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        request.status === "completed" ? "default" :
                        request.status === "in_progress" ? "secondary" :
                        "outline"
                      }>
                        {request.status}
                      </Badge>
                      <Badge variant={
                        request.priority === "high" ? "destructive" :
                        request.priority === "medium" ? "secondary" :
                        "outline"
                      } className="ml-2">
                        {request.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{request.type} • Created: {request.created}</span>
                    <span className="text-muted-foreground">Due: {request.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equipment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {equipment.map((item, index) => (
                <div key={index} className="p-3 border rounded-lg" data-testid={`equipment-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.location}</p>
                    </div>
                    <Badge variant={
                      item.status === "operational" ? "default" :
                      "destructive"
                    }>
                      {item.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Last Maintenance</p>
                      <p className="font-medium">{item.last_maintenance}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Maintenance</p>
                      <p className="font-medium">{item.next_maintenance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-preventive-maintenance">
              <Calendar className="w-6 h-6 mb-2" />
              <span>Preventive Maintenance</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-work-orders">
              <Wrench className="w-6 h-6 mb-2" />
              <span>Work Orders</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-equipment-tracking">
              <Settings className="w-6 h-6 mb-2" />
              <span>Equipment Tracking</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-maintenance-analytics">
              <CheckCircle className="w-6 h-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}