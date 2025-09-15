import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, Factory, Package, AlertTriangle, TrendingUp } from "lucide-react";

export default function Manufacturing() {
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="manufacturing-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="manufacturing-title">
            Manufacturing
          </h1>
          <p className="text-muted-foreground">Manage production orders, work orders, and manufacturing operations</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-work-order">
            <Settings className="w-4 h-4 mr-2" />
            Work Order
          </Button>
          <Button data-testid="button-production-order">
            <Plus className="w-4 h-4 mr-2" />
            Production Order
          </Button>
        </div>
      </div>

      {/* Manufacturing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Production Orders</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-green-600">18 in progress</p>
              </div>
              <Factory className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Manufactured Today</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-blue-600">Units completed</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency Rate</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-green-600">+2% from yesterday</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Issues</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-orange-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Production Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Production Orders</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-orders">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "MO001", product: "Widget A", quantity: 500, completed: 350, status: "In Progress", priority: "High" },
                { id: "MO002", product: "Component B", quantity: 200, completed: 200, status: "Done", priority: "Normal" },
                { id: "MO003", product: "Assembly C", quantity: 100, completed: 45, status: "In Progress", priority: "High" },
                { id: "MO004", product: "Widget D", quantity: 300, completed: 0, status: "Ready", priority: "Low" },
                { id: "MO005", product: "Part E", quantity: 150, completed: 75, status: "In Progress", priority: "Normal" },
              ].map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`production-order-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Factory className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.id} - {order.product}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.completed}/{order.quantity} units • {Math.round((order.completed / order.quantity) * 100)}% complete
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={order.priority === "High" ? "destructive" : order.priority === "Normal" ? "default" : "secondary"}>
                      {order.priority}
                    </Badge>
                    <Badge variant={order.status === "Done" ? "default" : order.status === "In Progress" ? "secondary" : "outline"}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Work Centers Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Work Centers</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-workcenters">
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Assembly Line 1", status: "Running", efficiency: 96, currentOrder: "MO001" },
                { name: "CNC Machine 1", status: "Running", efficiency: 89, currentOrder: "MO003" },
                { name: "Quality Control", status: "Idle", efficiency: 100, currentOrder: null },
                { name: "Packaging Station", status: "Running", efficiency: 92, currentOrder: "MO002" },
                { name: "Assembly Line 2", status: "Maintenance", efficiency: 0, currentOrder: null },
              ].map((center, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  data-testid={`work-center-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      center.status === "Running" ? "bg-green-500" : 
                      center.status === "Idle" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{center.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {center.currentOrder ? `Working on ${center.currentOrder}` : center.status}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{center.efficiency}%</p>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Material Requirements */}
        <Card>
          <CardHeader>
            <CardTitle>Material Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { material: "Steel Plate 5mm", required: 50, available: 45, unit: "pcs", status: "shortage" },
                { material: "Bolts M6x20", required: 1000, available: 1500, unit: "pcs", status: "sufficient" },
                { material: "Electronic Component A", required: 200, available: 180, unit: "pcs", status: "low" },
                { material: "Packaging Box", required: 100, available: 250, unit: "pcs", status: "sufficient" },
                { material: "Label Stickers", required: 500, available: 50, unit: "pcs", status: "shortage" },
              ].map((material, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`material-${index}`}
                >
                  <div>
                    <p className="font-medium text-sm">{material.material}</p>
                    <p className="text-xs text-muted-foreground">
                      Required: {material.required} {material.unit} • Available: {material.available} {material.unit}
                    </p>
                  </div>
                  <Badge variant={
                    material.status === "shortage" ? "destructive" : 
                    material.status === "low" ? "secondary" : "default"
                  }>
                    {material.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Production Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Production Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Daily Production Chart */}
              <div>
                <h4 className="font-medium text-sm mb-3">Daily Production (Last 7 Days)</h4>
                <div className="h-32 flex items-end justify-between space-x-2">
                  {[120, 135, 142, 118, 156, 149, 163].map((value, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-8 bg-primary rounded-t-md"
                        style={{ height: `${(value / 200) * 100}%` }}
                      />
                      <span className="text-xs text-muted-foreground">
                        {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('en', { weekday: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Lead Time</p>
                  <p className="text-lg font-bold">3.2 days</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  <p className="text-lg font-bold">94.5%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Scrap Rate</p>
                  <p className="text-lg font-bold">2.1%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Cost per Unit</p>
                  <p className="text-lg font-bold">$12.45</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
