import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Users, BarChart3, Send, Eye, Plus } from "lucide-react";

export default function Surveys() {
  const surveys = [
    { id: "SV001", title: "Customer Satisfaction Survey", status: "active", responses: 234, target: 500, created: "2024-01-10", completion: 89 },
    { id: "SV002", title: "Employee Feedback Q1", status: "closed", responses: 156, target: 200, created: "2024-01-05", completion: 78 },
    { id: "SV003", title: "Product Feature Requests", status: "draft", responses: 0, target: 300, created: "2024-01-15", completion: 0 }
  ];

  const templates = [
    { name: "Customer Satisfaction", category: "Customer", questions: 12, icon: "😊" },
    { name: "Employee Engagement", category: "HR", questions: 15, icon: "👥" },
    { name: "Product Feedback", category: "Product", questions: 8, icon: "📦" },
    { name: "Event Evaluation", category: "Events", questions: 10, icon: "🎉" }
  ];

  const analytics = [
    { metric: "Response Rate", value: "73.5%", change: "+5.2%", trend: "up" },
    { metric: "Avg. Completion", value: "82.1%", change: "+12.3%", trend: "up" },
    { metric: "Total Responses", value: "1,547", change: "+23.4%", trend: "up" },
    { metric: "Active Surveys", value: "8", change: "+2", trend: "up" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="surveys-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="surveys-title">
            Surveys
          </h1>
          <p className="text-muted-foreground">Create and manage surveys to collect feedback and insights</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-survey-templates">
            <ClipboardList className="w-4 h-4 mr-2" />
            Templates
          </Button>
          <Button data-testid="button-create-survey">
            <Plus className="w-4 h-4 mr-2" />
            New Survey
          </Button>
        </div>
      </div>

      {/* Survey Analytics */}
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
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Surveys & Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {surveys.map((survey) => (
                <div key={survey.id} className="p-3 border rounded-lg" data-testid={`survey-${survey.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{survey.title}</p>
                      <p className="text-sm text-muted-foreground">{survey.id} • Created {survey.created}</p>
                    </div>
                    <Badge variant={
                      survey.status === "active" ? "default" :
                      survey.status === "closed" ? "secondary" :
                      "outline"
                    }>
                      {survey.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Responses: {survey.responses} / {survey.target}</span>
                      <span>Completion: {survey.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(survey.responses / survey.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm" variant="outline" data-testid={`view-survey-${survey.id}`}>
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" data-testid={`send-survey-${survey.id}`}>
                      <Send className="w-3 h-3 mr-1" />
                      Send
                    </Button>
                    <Button size="sm" variant="outline" data-testid={`analyze-survey-${survey.id}`}>
                      <BarChart3 className="w-3 h-3 mr-1" />
                      Analyze
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Survey Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {templates.map((template, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" data-testid={`template-${index}`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{template.icon}</span>
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.questions} questions • {template.category}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Survey Builder */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-question-builder">
              <ClipboardList className="w-6 h-6 mb-2" />
              <span>Question Builder</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-survey-logic">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Survey Logic</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-distribution">
              <Send className="w-6 h-6 mb-2" />
              <span>Distribution</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-analytics">
              <Users className="w-6 h-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}