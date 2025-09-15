import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Award, AlertTriangle, CheckCircle, TrendingUp, Settings } from "lucide-react";

export default function Quality() {
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="quality-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="quality-title">
            Quality Management
          </h1>
          <p className="text-muted-foreground">Manage quality control, inspections, and compliance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-quality-check">
            <Award className="w-4 h-4 mr-2" />
            Quality Check
          </Button>
          <Button data-testid="button-inspection">
            <Plus className="w-4 h-4 mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Quality Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Score</p>
                <p className="text-2xl font-bold">96.5%</p>
                <p className="text-sm text-green-600">+1.2% improvement</p>
              </div>
              <Award className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inspections Today</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-blue-600">18 passed</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Defect Rate</p>
                <p className="text-2xl font-bold">1.2%</p>
                <p className="text-sm text-orange-600">Within target</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Non-Conformances</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-red-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inspections */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Inspections</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-inspections">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "INS001", product: "Widget A", type: "Incoming", result: "Passed", inspector: "John Doe", date: "2024-01-15" },
                { id: "INS002", product: "Component B", type: "In-Process", result: "Failed", inspector: "Jane Smith", date: "2024-01-15" },
                { id: "INS003", product: "Assembly C", type: "Final", result: "Passed", inspector: "Mike Johnson", date: "2024-01-14" },
                { id: "INS004", product: "Widget D", type: "Incoming", result: "Passed", inspector: "Sarah Wilson", date: "2024-01-14" },
                { id: "INS005", product: "Part E", type: "In-Process", result: "Passed", inspector: "Tom Brown", date: "2024-01-13" },
              ].map((inspection, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`inspection-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{inspection.id} - {inspection.product}</p>
                      <p className="text-xs text-muted-foreground">
                        {inspection.type} • {inspection.inspector} • {inspection.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant={inspection.result === "Passed" ? "default" : "destructive"}>
                    {inspection.result}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Quality Trend Chart */}
              <div>
                <h4 className="font-medium text-sm mb-3">Quality Trend (Last 7 Days)</h4>
                <div className="h-32 flex items-end justify-between space-x-2">
                  {[94.2, 95.1, 94.8, 95.5, 96.2, 95.8, 96.5].map((value, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div 
                        className="w-8 bg-green-500 rounded-t-md"
                        style={{ height: `${(value - 90) * 4}%` }}
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
                  <p className="text-sm text-muted-foreground">First Pass Yield</p>
                  <p className="text-lg font-bold">98.2%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Customer Returns</p>
                  <p className="text-lg font-bold">0.8%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Supplier Quality</p>
                  <p className="text-lg font-bold">97.5%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Audit Score</p>
                  <p className="text-lg font-bold">92/100</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Non-Conformances */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Open Non-Conformances</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-nc">
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "NC001", description: "Dimensional deviation on Part A", severity: "Major", status: "Open", assignee: "Quality Team", date: "2024-01-15" },
                { id: "NC002", description: "Surface finish issue", severity: "Minor", status: "In Progress", assignee: "John Doe", date: "2024-01-14" },
                { id: "NC003", description: "Documentation missing", severity: "Minor", status: "Open", assignee: "Jane Smith", date: "2024-01-13" },
              ].map((nc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`non-conformance-${index}`}
                >
                  <div>
                    <p className="font-medium text-sm">{nc.id} - {nc.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Assigned to: {nc.assignee} • {nc.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={nc.severity === "Major" ? "destructive" : "secondary"}>
                      {nc.severity}
                    </Badge>
                    <Badge variant={nc.status === "Open" ? "destructive" : "default"}>
                      {nc.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Control Plans */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Control Plans</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-plans">
                Manage Plans
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Incoming Inspection", active: true, coverage: "95%", lastUpdated: "2024-01-10" },
                { name: "In-Process Control", active: true, coverage: "88%", lastUpdated: "2024-01-08" },
                { name: "Final Inspection", active: true, coverage: "92%", lastUpdated: "2024-01-12" },
                { name: "Supplier Quality", active: false, coverage: "75%", lastUpdated: "2024-01-05" },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  data-testid={`control-plan-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${plan.active ? "bg-green-500" : "bg-gray-400"}`} />
                    <div>
                      <p className="font-medium text-sm">{plan.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Coverage: {plan.coverage} • Updated: {plan.lastUpdated}
                      </p>
                    </div>
                  </div>
                  <Badge variant={plan.active ? "default" : "secondary"}>
                    {plan.active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}