import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Users, BarChart3, Phone, Clock } from "lucide-react";

export default function SMS() {
  const campaigns = [
    { id: "SMS001", name: "Appointment Reminders", status: "active", sent: 1234, delivered: 1201, clicked: 89, date: "2024-01-15" },
    { id: "SMS002", name: "Product Launch Alert", status: "scheduled", sent: 0, delivered: 0, clicked: 0, date: "2024-01-20" },
    { id: "SMS003", name: "Payment Reminder", status: "draft", sent: 0, delivered: 0, clicked: 0, date: null }
  ];

  const templates = [
    { name: "Appointment Reminder", category: "Healthcare", usage: 234, success_rate: "97.2%" },
    { name: "Payment Due Notice", category: "Finance", usage: 189, success_rate: "94.8%" },
    { name: "Order Confirmation", category: "eCommerce", usage: 456, success_rate: "98.5%" },
    { name: "Event Notification", category: "Events", usage: 123, success_rate: "96.1%" }
  ];

  const analytics = [
    { metric: "Messages Sent", value: "12,847", change: "+8.2%", trend: "up" },
    { metric: "Delivery Rate", value: "97.3%", change: "+0.5%", trend: "up" },
    { metric: "Click Rate", value: "7.2%", change: "+1.1%", trend: "up" },
    { metric: "Response Rate", value: "23.4%", change: "+2.3%", trend: "up" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="sms-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="sms-title">
            SMS Marketing
          </h1>
          <p className="text-muted-foreground">Send targeted SMS campaigns and notifications</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-sms-templates">
            <MessageSquare className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button data-testid="button-send-sms">
            <Send className="w-4 h-4 mr-2" />
            Send SMS
          </Button>
        </div>
      </div>

      {/* SMS Analytics */}
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
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Campaigns & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>SMS Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-3 border rounded-lg" data-testid={`campaign-${campaign.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.id}</p>
                    </div>
                    <Badge variant={
                      campaign.status === "active" ? "default" :
                      campaign.status === "scheduled" ? "secondary" :
                      "outline"
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  {campaign.status === "active" && (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Delivered</p>
                        <p className="font-medium">{campaign.delivered.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicked</p>
                        <p className="font-medium">{campaign.clicked}</p>
                      </div>
                    </div>
                  )}

                  {campaign.status === "scheduled" && (
                    <p className="text-sm text-muted-foreground">Scheduled for: {campaign.date}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SMS Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`template-${index}`}>
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.category} • {template.usage} uses</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{template.success_rate}</p>
                    <p className="text-sm text-muted-foreground">success rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SMS Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>SMS Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">Scheduled Messaging</p>
                  <p className="text-sm text-muted-foreground">Send messages at optimal times</p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">Audience Segmentation</p>
                  <p className="text-sm text-muted-foreground">Target specific customer groups</p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">Real-time Analytics</p>
                  <p className="text-sm text-muted-foreground">Track delivery and engagement</p>
                </div>
              </div>
              <Badge variant="default">Active</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" data-testid="button-bulk-sms">
              <MessageSquare className="w-4 h-4 mr-2" />
              Send Bulk SMS
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-two-way-sms">
              <Phone className="w-4 h-4 mr-2" />
              Two-way Messaging
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-autoresponder">
              <Send className="w-4 h-4 mr-2" />
              Auto-responder
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-compliance">
              <Users className="w-4 h-4 mr-2" />
              Compliance Center
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">2,847</p>
              <p className="text-sm text-muted-foreground">Messages Today</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">$245.60</p>
              <p className="text-sm text-muted-foreground">Cost This Month</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">4,523</p>
              <p className="text-sm text-muted-foreground">Active Contacts</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <p className="text-2xl font-bold">$0.086</p>
              <p className="text-sm text-muted-foreground">Avg. Cost Per SMS</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}