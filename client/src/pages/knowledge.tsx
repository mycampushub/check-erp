import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Edit, Share, Star, FolderOpen } from "lucide-react";

export default function Knowledge() {
  const articles = [
    { id: "KB001", title: "Product Installation Guide", category: "Technical", author: "John Smith", views: 1247, rating: 4.8, updated: "2024-01-15", status: "published" },
    { id: "KB002", title: "Company Policies & Procedures", category: "HR", author: "Sarah Wilson", views: 856, rating: 4.6, updated: "2024-01-12", status: "published" },
    { id: "KB003", title: "Sales Process Workflow", category: "Sales", author: "Mike Johnson", views: 2341, rating: 4.9, updated: "2024-01-14", status: "draft" }
  ];

  const categories = [
    { name: "Technical Documentation", articles: 45, icon: "🔧", color: "blue" },
    { name: "HR Policies", articles: 23, icon: "👥", color: "green" },
    { name: "Sales & Marketing", articles: 34, icon: "📈", color: "orange" },
    { name: "Product Guides", articles: 67, icon: "📚", color: "purple" }
  ];

  const recentActivity = [
    { user: "John Smith", action: "created", article: "API Integration Guide", time: "2 hours ago" },
    { user: "Sarah Wilson", action: "updated", article: "Employee Handbook", time: "4 hours ago" },
    { user: "Mike Johnson", action: "reviewed", article: "Customer Onboarding", time: "6 hours ago" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="knowledge-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="knowledge-title">
            Knowledge
          </h1>
          <p className="text-muted-foreground">Create and manage your company knowledge base</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-search-knowledge">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <Button data-testid="button-create-article">
            <Edit className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Knowledge Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Articles</p>
                <p className="text-2xl font-bold">169</p>
                <p className="text-sm text-green-600">+12 this month</p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">45.2K</p>
                <p className="text-sm text-blue-600">+18% vs last month</p>
              </div>
              <Search className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Contributors</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-green-600">Active authors</p>
              </div>
              <Edit className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">4.7</p>
                <p className="text-sm text-orange-600">out of 5</p>
              </div>
              <Star className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories & Recent Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" data-testid={`category-${index}`}>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground">{category.articles} articles</p>
                    </div>
                  </div>
                  <FolderOpen className="w-5 h-5 text-muted-foreground" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {articles.map((article) => (
                <div key={article.id} className="p-3 border rounded-lg" data-testid={`article-${article.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{article.title}</p>
                      <p className="text-sm text-muted-foreground">{article.author} • {article.views} views</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={article.status === "published" ? "default" : "secondary"}>
                        {article.status}
                      </Badge>
                      <div className="flex items-center mt-1">
                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                        <span className="text-sm">{article.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{article.category}</Badge>
                    <p className="text-sm text-muted-foreground">{article.updated}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`activity-${index}`}>
                <div>
                  <p className="font-medium">{activity.user} {activity.action} "{activity.article}"</p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}