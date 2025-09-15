import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Users, BarChart3, Edit, Calendar } from "lucide-react";

export default function Email() {
  const campaigns = [
    { id: "EM001", name: "Monthly Newsletter", status: "sent", recipients: 2547, opened: 1823, clicked: 456, sent_date: "2024-01-15" },
    { id: "EM002", name: "Product Launch", status: "scheduled", recipients: 1200, opened: 0, clicked: 0, sent_date: "2024-01-20" },
    { id: "EM003", name: "Customer Survey", status: "draft", recipients: 850, opened: 0, clicked: 0, sent_date: null }
  ];

  const templates = [
    { name: "Newsletter Template", category: "Newsletter", opens: "24.5%", clicks: "4.2%" },
    { name: "Product Announcement", category: "Marketing", opens: "31.2%", clicks: "6.8%" },
    { name: "Event Invitation", category: "Events", opens: "28.7%", clicks: "8.1%" },
    { name: "Welcome Series", category: "Onboarding", opens: "42.3%", clicks: "12.4%" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="email-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="email-title">
            Email Marketing
          </h1>
          <p className="text-muted-foreground">Create and manage email campaigns and newsletters</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-email-templates">
            <Edit className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button data-testid="button-create-campaign">
            <Mail className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Email Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Campaigns Sent</p>
                <p className="text-2xl font-bold">47</p>
                <p className="text-sm text-green-600">+8 this month</p>
              </div>
              <Send className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Rate</p>
                <p className="text-2xl font-bold">28.4%</p>
                <p className="text-sm text-green-600">+2.1% improvement</p>
              </div>
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Click Rate</p>
                <p className="text-2xl font-bold">5.7%</p>
                <p className="text-sm text-green-600">+0.8% improvement</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Subscribers</p>
                <p className="text-2xl font-bold">12,847</p>
                <p className="text-sm text-blue-600">+234 this week</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="p-3 border rounded-lg" data-testid={`campaign-${campaign.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.id} • {campaign.recipients} recipients</p>
                    </div>
                    <Badge variant={
                      campaign.status === "sent" ? "default" :
                      campaign.status === "scheduled" ? "secondary" :
                      "outline"
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  
                  {campaign.status === "sent" && (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Opened</p>
                        <p className="font-medium">{campaign.opened} ({Math.round((campaign.opened / campaign.recipients) * 100)}%)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicked</p>
                        <p className="font-medium">{campaign.clicked} ({Math.round((campaign.clicked / campaign.recipients) * 100)}%)</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Sent Date</p>
                        <p className="font-medium">{campaign.sent_date}</p>
                      </div>
                    </div>
                  )}

                  {campaign.status === "scheduled" && (
                    <p className="text-sm text-muted-foreground">Scheduled for: {campaign.sent_date}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Email Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`template-${index}`}>
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="text-sm text-muted-foreground">{template.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Opens: {template.opens}</p>
                    <p className="text-sm">Clicks: {template.clicks}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Email Marketing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-drag-drop-editor">
              <Edit className="w-6 h-6 mb-2" />
              <span>Drag & Drop Editor</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-automation">
              <Calendar className="w-6 h-6 mb-2" />
              <span>Automation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-segmentation">
              <Users className="w-6 h-6 mb-2" />
              <span>Segmentation</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-analytics">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}