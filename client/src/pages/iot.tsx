import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Wifi, Thermometer, Activity, AlertTriangle, Settings, Gauge, Battery } from "lucide-react";

export default function IoT() {
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="iot-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="iot-title">
            Internet of Things
          </h1>
          <p className="text-muted-foreground">Monitor and manage connected devices and sensors</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-device-settings">
            <Settings className="w-4 h-4 mr-2" />
            Device Settings
          </Button>
          <Button data-testid="button-add-device">
            <Plus className="w-4 h-4 mr-2" />
            Add Device
          </Button>
        </div>
      </div>

      {/* IoT Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connected Devices</p>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-green-600">124 online</p>
              </div>
              <Wifi className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Data Points Today</p>
                <p className="text-2xl font-bold">2.4M</p>
                <p className="text-sm text-blue-600">+15% from yesterday</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alerts</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-orange-600">Requires attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-green-600">All systems normal</p>
              </div>
              <Gauge className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Device Status</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-devices">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "DEV001", name: "Temperature Sensor A1", type: "Sensor", location: "Factory Floor", status: "Online", battery: 85, lastUpdate: "2 min ago" },
                { id: "DEV002", name: "Humidity Monitor B2", type: "Sensor", location: "Warehouse", status: "Online", battery: 72, lastUpdate: "1 min ago" },
                { id: "DEV003", name: "Smart Controller C3", type: "Controller", location: "Production Line", status: "Warning", battery: 15, lastUpdate: "5 min ago" },
                { id: "DEV004", name: "Pressure Gauge D4", type: "Gauge", location: "Tank Farm", status: "Online", battery: 91, lastUpdate: "3 min ago" },
                { id: "DEV005", name: "Motion Sensor E5", type: "Sensor", location: "Office", status: "Offline", battery: 0, lastUpdate: "2 hours ago" },
              ].map((device, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`device-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      device.status === "Online" ? "bg-green-500" : 
                      device.status === "Warning" ? "bg-yellow-500" : "bg-red-500"
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{device.id} - {device.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {device.type} • {device.location} • {device.lastUpdate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Battery className="w-4 h-4 text-muted-foreground" />
                      <span className="text-xs">{device.battery}%</span>
                    </div>
                    <Badge variant={
                      device.status === "Online" ? "default" : 
                      device.status === "Warning" ? "secondary" : "destructive"
                    }>
                      {device.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Data */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Sensor Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { sensor: "Temperature A1", value: "24.5°C", unit: "Temperature", trend: "stable", icon: "🌡️" },
                { sensor: "Humidity B2", value: "65%", unit: "Humidity", trend: "rising", icon: "💧" },
                { sensor: "Pressure D4", value: "101.3 kPa", unit: "Pressure", trend: "stable", icon: "📊" },
                { sensor: "Motion E5", value: "Active", unit: "Motion", trend: "stable", icon: "🚶" },
              ].map((data, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  data-testid={`sensor-data-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">{data.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{data.sensor}</p>
                      <p className="text-xs text-muted-foreground">{data.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{data.value}</p>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        data.trend === "rising" ? "bg-green-500" : 
                        data.trend === "falling" ? "bg-red-500" : "bg-gray-500"
                      }`} />
                      <span className="text-xs text-muted-foreground">{data.trend}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Alerts</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-alerts">
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ALT001", device: "Smart Controller C3", message: "Low battery warning", severity: "Warning", time: "10 min ago", acknowledged: false },
                { id: "ALT002", device: "Motion Sensor E5", message: "Device offline", severity: "Critical", time: "2 hours ago", acknowledged: false },
                { id: "ALT003", device: "Temperature Sensor A1", message: "High temperature threshold", severity: "Warning", time: "1 hour ago", acknowledged: true },
              ].map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`alert-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === "Critical" ? "bg-red-500" : "bg-yellow-500"
                    } ${!alert.acknowledged ? "animate-pulse" : ""}`} />
                    <div>
                      <p className="font-medium text-sm">{alert.device}</p>
                      <p className="text-xs text-muted-foreground">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={alert.severity === "Critical" ? "destructive" : "secondary"}>
                      {alert.severity}
                    </Badge>
                    <Badge variant="outline">{alert.time}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Device Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Device Types Distribution */}
              <div>
                <h4 className="font-medium text-sm mb-3">Device Types</h4>
                <div className="space-y-2">
                  {[
                    { type: "Sensors", count: 89, percentage: 70, color: "bg-blue-500" },
                    { type: "Controllers", count: 23, percentage: 18, color: "bg-green-500" },
                    { type: "Gauges", count: 15, percentage: 12, color: "bg-purple-500" },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.type}</span>
                        <span>{item.count} ({item.percentage}%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`${item.color} h-2 rounded-full`} 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Uptime</p>
                  <p className="text-lg font-bold">99.2%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Data Accuracy</p>
                  <p className="text-lg font-bold">99.8%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="text-lg font-bold">45ms</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Energy Usage</p>
                  <p className="text-lg font-bold">2.4kW</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}