import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, FileText, Users, AlertTriangle } from "lucide-react";

export default function Approvals() {
  const requests = [
    { id: "AR001", title: "Equipment Purchase Request", type: "Purchase", requester: "John Smith", amount: "$2,500", status: "pending", submitted: "2024-01-15", priority: "medium" },
    { id: "AR002", title: "Vacation Request", type: "Time Off", requester: "Sarah Wilson", amount: "5 days", status: "approved", submitted: "2024-01-14", priority: "low" },
    { id: "AR003", title: "Budget Increase", type: "Budget", requester: "Mike Johnson", amount: "$15,000", status: "rejected", submitted: "2024-01-13", priority: "high" }
  ];

  const templates = [
    { name: "Purchase Request", category: "Procurement", approvers: 2, avg_time: "2.5 days" },
    { name: "Time Off Request", category: "HR", approvers: 1, avg_time: "1 day" },
    { name: "Budget Approval", category: "Finance", approvers: 3, avg_time: "5 days" },
    { name: "Contract Approval", category: "Legal", approvers: 2, avg_time: "7 days" }
  ];

  const myTasks = [
    { request: "Equipment Purchase Request", requester: "John Smith", amount: "$2,500", due: "2024-01-18", priority: "medium" },
    { request: "Software License", requester: "Lisa Brown", amount: "$1,200", due: "2024-01-19", priority: "low" },
    { request: "Travel Expense", requester: "David Lee", amount: "$800", due: "2024-01-17", priority: "high" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="approvals-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="approvals-title">
            Approvals
          </h1>
          <p className="text-muted-foreground">Manage approval workflows and requests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-approval-templates">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button data-testid="button-new-request">
            <CheckCircle className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Approvals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-orange-600">Awaiting approval</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Approved Today</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-green-600">+5 vs yesterday</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Approval Time</p>
                <p className="text-2xl font-bold">2.8</p>
                <p className="text-sm text-blue-600">days</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overdue Requests</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-sm text-red-600">Need attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests & My Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="p-3 border rounded-lg" data-testid={`request-${request.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{request.title}</p>
                      <p className="text-sm text-muted-foreground">{request.requester} • {request.submitted}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        request.status === "approved" ? "default" :
                        request.status === "pending" ? "secondary" :
                        "destructive"
                      }>
                        {request.status}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">{request.amount}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{request.type}</Badge>
                    <Badge variant={
                      request.priority === "high" ? "destructive" :
                      request.priority === "medium" ? "secondary" :
                      "outline"
                    }>
                      {request.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Approval Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myTasks.map((task, index) => (
                <div key={index} className="p-3 border rounded-lg" data-testid={`task-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{task.request}</p>
                      <p className="text-sm text-muted-foreground">From: {task.requester}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{task.amount}</p>
                      <Badge variant={
                        task.priority === "high" ? "destructive" :
                        task.priority === "medium" ? "secondary" :
                        "outline"
                      }>
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Due: {task.due}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" data-testid={`approve-${index}`}>
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" data-testid={`reject-${index}`}>
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approval Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Approval Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((template, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`template-${index}`}>
                <div>
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-muted-foreground">{template.category} • {template.approvers} approvers</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{template.avg_time}</p>
                  <p className="text-sm text-muted-foreground">avg. time</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}