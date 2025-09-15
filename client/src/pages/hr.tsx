import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Calendar, DollarSign, Clock } from "lucide-react";

export default function HR() {
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="hr-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="hr-title">
            Human Resources
          </h1>
          <p className="text-muted-foreground">Manage employees, attendance, and payroll</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-timesheet">
            <Clock className="w-4 h-4 mr-2" />
            Timesheet
          </Button>
          <Button data-testid="button-new-employee">
            <Plus className="w-4 h-4 mr-2" />
            New Employee
          </Button>
        </div>
      </div>

      {/* HR Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-green-600">+3 this month</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave Today</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">10.6% of staff</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold">$285K</p>
                <p className="text-sm text-blue-600">Processing</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Positions</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Recruiting</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">📋</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Directory */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Employee Directory</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-employees">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", position: "Software Engineer", department: "IT", status: "Active" },
                { name: "Jane Smith", position: "Marketing Manager", department: "Marketing", status: "Active" },
                { name: "Mike Johnson", position: "Sales Representative", department: "Sales", status: "On Leave" },
                { name: "Sarah Wilson", position: "HR Specialist", department: "Human Resources", status: "Active" },
                { name: "David Brown", position: "Accountant", department: "Finance", status: "Active" },
              ].map((employee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`employee-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{employee.name}</p>
                      <p className="text-xs text-muted-foreground">{employee.position} • {employee.department}</p>
                    </div>
                  </div>
                  <Badge variant={employee.status === "Active" ? "default" : "secondary"}>
                    {employee.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent HR Activities</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-hr-reports">
                Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "hire", description: "New employee onboarding - Alex Chen", time: "2 hours ago", icon: "👋" },
                { type: "leave", description: "Leave request approved - Mike Johnson", time: "4 hours ago", icon: "📅" },
                { type: "promotion", description: "Promotion processed - Jane Smith", time: "1 day ago", icon: "🎉" },
                { type: "training", description: "Training completed - Team Security Workshop", time: "2 days ago", icon: "🎓" },
                { type: "payroll", description: "Payroll processed for November", time: "3 days ago", icon: "💰" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-muted rounded-lg"
                  data-testid={`hr-activity-${index}`}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Present</p>
                  <p className="text-2xl font-bold text-green-900">42</p>
                </div>
                <div className="text-green-600">
                  <Users className="w-8 h-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-orange-800">On Leave</p>
                  <p className="text-2xl font-bold text-orange-900">5</p>
                </div>
                <div className="text-orange-600">
                  <Calendar className="w-8 h-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-800">Late</p>
                  <p className="text-2xl font-bold text-red-900">2</p>
                </div>
                <div className="text-red-600">
                  <Clock className="w-8 h-8" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming HR Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Team Building Workshop", date: "Nov 20", time: "2:00 PM", attendees: 25 },
                { event: "Performance Reviews", date: "Nov 25", time: "All Day", attendees: 47 },
                { event: "New Employee Orientation", date: "Dec 1", time: "9:00 AM", attendees: 3 },
                { event: "Holiday Party Planning", date: "Dec 5", time: "3:00 PM", attendees: 8 },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`hr-event-${index}`}
                >
                  <div>
                    <p className="font-medium text-sm">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                  </div>
                  <Badge variant="outline">{event.attendees} people</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
