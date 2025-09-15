import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Users, TrendingUp, Target, Calendar, BarChart3 } from "lucide-react";

export default function Marketing() {
  const campaigns = [
    { name: "Spring Sale", type: "Email", status: "active", sent: 2547, opened: 1023, clicked: 156, date: "2024-01-15" },
    { name: "Product Launch", type: "Social", status: "scheduled", sent: 0, opened: 0, clicked: 0, date: "2024-01-20" },
    { name: "Newsletter", type: "Email", status: "completed", sent: 5234, opened: 2847, clicked: 423, date: "2024-01-10" }
  ];

  const leads = [
    { source: "Website", count: 247, conversion: "18.2%", cost: "$45" },
    { source: "Social Media", count: 189, conversion: "12.4%", cost: "$28" },
    { source: "Email Campaign", count: 156, conversion: "24.1%", cost: "$15" },
    { source: "Google Ads", count: 134, conversion: "9.8%", cost: "$67" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="marketing-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="marketing-title">
            Marketing
          </h1>
          <p className="text-muted-foreground">Manage campaigns, leads, and marketing automation</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-create-lead-form">
            <Target className="w-4 h-4 mr-2" />
            Lead Form
          </Button>
          <Button data-testid="button-create-campaign">
            <Mail className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>
      </div>

      {/* Marketing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">1,547</p>
                <p className="text-sm text-green-600">+15.2% this month</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">16.8%</p>
                <p className="text-sm text-green-600">+2.1% improvement</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-blue-600">3 scheduled</p>
              </div>
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Marketing ROI</p>
                <p className="text-2xl font-bold">324%</p>
                <p className="text-sm text-green-600">+45% vs last quarter</p>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns & Lead Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <div key={index} className="p-3 border rounded-lg" data-testid={`campaign-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{campaign.name}</p>
                      <p className="text-sm text-muted-foreground">{campaign.type} • {campaign.date}</p>
                    </div>
                    <Badge variant={
                      campaign.status === "active" ? "default" : 
                      campaign.status === "scheduled" ? "secondary" : 
                      "outline"
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  {campaign.status !== "scheduled" && (
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Sent</p>
                        <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Opened</p>
                        <p className="font-medium">{campaign.opened.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicked</p>
                        <p className="font-medium">{campaign.clicked.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`lead-source-${index}`}>
                  <div>
                    <p className="font-medium">{lead.source}</p>
                    <p className="text-sm text-muted-foreground">{lead.count} leads</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{lead.conversion}</p>
                    <p className="text-sm text-muted-foreground">{lead.cost} per lead</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Marketing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-email-marketing">
              <Mail className="w-6 h-6 mb-2" />
              <span>Email Marketing</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-social-media">
              <Users className="w-6 h-6 mb-2" />
              <span>Social Media</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-automation">
              <Target className="w-6 h-6 mb-2" />
              <span>Automation</span>
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