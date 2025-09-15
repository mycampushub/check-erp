import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Headphones, Clock, Users, CheckCircle, AlertTriangle, MessageSquare } from "lucide-react";

export default function Helpdesk() {
  const tickets = [
    { id: "TK001", title: "Login Issues", customer: "John Smith", priority: "high", status: "open", assigned: "Sarah Wilson", created: "2024-01-16" },
    { id: "TK002", title: "Payment Problem", customer: "Lisa Brown", priority: "urgent", status: "in_progress", assigned: "Mike Johnson", created: "2024-01-16" },
    { id: "TK003", title: "Feature Request", customer: "David Lee", priority: "low", status: "resolved", assigned: "Emma Davis", created: "2024-01-15" }
  ];

  const knowledge_base = [
    { title: "How to Reset Password", category: "Account", views: 1247, updated: "2024-01-10" },
    { title: "Billing and Payments", category: "Finance", views: 856, updated: "2024-01-12" },
    { title: "Product Installation Guide", category: "Technical", views: 2341, updated: "2024-01-14" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="helpdesk-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="helpdesk-title">
            Helpdesk
          </h1>
          <p className="text-muted-foreground">Manage customer support tickets and knowledge base</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-knowledge-base">
            <MessageSquare className="w-4 h-4 mr-2" />
            Knowledge Base
          </Button>
          <Button data-testid="button-create-ticket">
            <Headphones className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Helpdesk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Tickets</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-orange-600">5 urgent</p>
              </div>
              <Headphones className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                <p className="text-2xl font-bold">2.4h</p>
                <p className="text-sm text-green-600">-15% improvement</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
                <p className="text-2xl font-bold">94.8%</p>
                <p className="text-sm text-green-600">+2.1% this month</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved Today</p>
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-blue-600">Target: 20</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets & Knowledge Base */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="p-3 border rounded-lg" data-testid={`ticket-${ticket.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{ticket.title}</p>
                      <p className="text-sm text-muted-foreground">{ticket.id} • {ticket.customer}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Badge variant={
                        ticket.priority === "urgent" ? "destructive" :
                        ticket.priority === "high" ? "destructive" :
                        "secondary"
                      }>
                        {ticket.priority}
                      </Badge>
                      <Badge variant={
                        ticket.status === "resolved" ? "default" :
                        ticket.status === "in_progress" ? "secondary" :
                        "outline"
                      }>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Assigned to: {ticket.assigned}</span>
                    <span>{ticket.created}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Knowledge Base Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledge_base.map((article, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`kb-article-${index}`}>
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-sm text-muted-foreground">{article.category}</p>
                    <p className="text-sm text-muted-foreground">Updated: {article.updated}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{article.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Support Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-live-chat">
              <MessageSquare className="w-6 h-6 mb-2" />
              <span>Live Chat</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-ticket-automation">
              <AlertTriangle className="w-6 h-6 mb-2" />
              <span>Automation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-sla-management">
              <Clock className="w-6 h-6 mb-2" />
              <span>SLA Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-customer-portal">
              <Users className="w-6 h-6 mb-2" />
              <span>Customer Portal</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}