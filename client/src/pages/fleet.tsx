import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, MapPin, Fuel, Wrench, Calendar, AlertTriangle } from "lucide-react";

export default function Fleet() {
  const vehicles = [
    { id: "VH001", model: "Toyota Camry", year: 2022, driver: "John Smith", status: "active", mileage: 45678, nextService: "2024-02-15", location: "Downtown Office" },
    { id: "VH002", model: "Ford Transit", year: 2021, driver: "Sarah Wilson", status: "maintenance", mileage: 67890, nextService: "2024-01-25", location: "Service Center" },
    { id: "VH003", model: "Honda Civic", year: 2023, driver: "Mike Johnson", status: "available", mileage: 23456, nextService: "2024-03-10", location: "Main Parking" }
  ];

  const maintenance = [
    { vehicle: "Toyota Camry", type: "Oil Change", date: "2024-01-20", cost: "$45", status: "scheduled" },
    { vehicle: "Ford Transit", type: "Brake Inspection", date: "2024-01-18", cost: "$120", status: "in_progress" },
    { vehicle: "Honda Civic", type: "Tire Rotation", date: "2024-01-22", cost: "$35", status: "pending" }
  ];

  const expenses = [
    { category: "Fuel", amount: "$2,847", percentage: 45, color: "blue" },
    { category: "Maintenance", amount: "$1,234", percentage: 20, color: "orange" },
    { category: "Insurance", amount: "$956", percentage: 15, color: "green" },
    { category: "Other", amount: "$1,263", percentage: 20, color: "purple" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="fleet-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="fleet-title">
            Fleet Management
          </h1>
          <p className="text-muted-foreground">Manage vehicles, drivers, and maintenance schedules</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-schedule-maintenance">
            <Wrench className="w-4 h-4 mr-2" />
            Schedule Maintenance
          </Button>
          <Button data-testid="button-add-vehicle">
            <Car className="w-4 h-4 mr-2" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vehicles</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-green-600">42 active</p>
              </div>
              <Car className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Fuel Costs</p>
                <p className="text-2xl font-bold">$2,847</p>
                <p className="text-sm text-red-600">This month</p>
              </div>
              <Fuel className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance Due</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-orange-600">Next 30 days</p>
              </div>
              <Wrench className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Mileage</p>
                <p className="text-2xl font-bold">28.5</p>
                <p className="text-sm text-green-600">MPG</p>
              </div>
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicles & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-3 border rounded-lg" data-testid={`vehicle-${vehicle.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{vehicle.model} ({vehicle.year})</p>
                      <p className="text-sm text-muted-foreground">{vehicle.id} • {vehicle.driver}</p>
                    </div>
                    <Badge variant={
                      vehicle.status === "active" ? "default" :
                      vehicle.status === "maintenance" ? "destructive" :
                      "secondary"
                    }>
                      {vehicle.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mileage</p>
                      <p className="font-medium">{vehicle.mileage.toLocaleString()} miles</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Next Service</p>
                      <p className="font-medium">{vehicle.nextService}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{vehicle.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenance.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`maintenance-${index}`}>
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-muted-foreground">{item.vehicle}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.cost}</p>
                    <Badge variant={
                      item.status === "in_progress" ? "default" :
                      item.status === "scheduled" ? "secondary" :
                      "outline"
                    }>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Fleet Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {expenses.map((expense, index) => (
              <div key={index} className="text-center p-4 border rounded-lg" data-testid={`expense-${index}`}>
                <p className="text-2xl font-bold">{expense.amount}</p>
                <p className="text-sm text-muted-foreground">{expense.category}</p>
                <p className="text-sm text-muted-foreground">{expense.percentage}% of total</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}