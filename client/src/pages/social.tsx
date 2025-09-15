import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Users, Heart, MessageCircle, BarChart3, Calendar } from "lucide-react";

export default function Social() {
  const posts = [
    { id: "SP001", content: "Excited to announce our new product launch! 🚀", platform: "LinkedIn", status: "published", likes: 247, comments: 18, shares: 34, date: "2024-01-15" },
    { id: "SP002", content: "Join us at the industry conference next week", platform: "Twitter", status: "scheduled", likes: 0, comments: 0, shares: 0, date: "2024-01-20" },
    { id: "SP003", content: "Behind the scenes at our development team", platform: "Instagram", status: "draft", likes: 0, comments: 0, shares: 0, date: null }
  ];

  const platforms = [
    { name: "LinkedIn", followers: 12847, engagement: "4.2%", posts: 24, color: "blue" },
    { name: "Twitter", followers: 8932, engagement: "2.8%", posts: 45, color: "cyan" },
    { name: "Instagram", followers: 15634, engagement: "6.1%", posts: 18, color: "pink" },
    { name: "Facebook", followers: 9876, engagement: "3.5%", posts: 12, color: "indigo" }
  ];

  const analytics = [
    { metric: "Total Followers", value: "47.2K", change: "+1.2K", trend: "up" },
    { metric: "Engagement Rate", value: "4.1%", change: "+0.3%", trend: "up" },
    { metric: "Posts This Month", value: "99", change: "+15", trend: "up" },
    { metric: "Reach", value: "156K", change: "+23K", trend: "up" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="social-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="social-title">
            Social Marketing
          </h1>
          <p className="text-muted-foreground">Manage social media presence and campaigns</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-content-calendar">
            <Calendar className="w-4 h-4 mr-2" />
            Content Calendar
          </Button>
          <Button data-testid="button-create-post">
            <Share2 className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      </div>

      {/* Social Analytics */}
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

      {/* Posts & Platforms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="p-3 border rounded-lg" data-testid={`post-${post.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.platform}</Badge>
                    <Badge variant={
                      post.status === "published" ? "default" :
                      post.status === "scheduled" ? "secondary" :
                      "outline"
                    }>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm mb-3">{post.content}</p>
                  
                  {post.status === "published" && (
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Heart className="w-3 h-3 mr-1" />
                        {post.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        {post.comments}
                      </div>
                      <div className="flex items-center">
                        <Share2 className="w-3 h-3 mr-1" />
                        {post.shares}
                      </div>
                    </div>
                  )}

                  {post.status === "scheduled" && (
                    <p className="text-sm text-muted-foreground">Scheduled for: {post.date}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platforms.map((platform, index) => (
                <div key={index} className="p-3 border rounded-lg" data-testid={`platform-${index}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <p className="text-sm text-muted-foreground">{platform.followers.toLocaleString()} followers</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{platform.engagement}</p>
                      <p className="text-sm text-muted-foreground">engagement</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{platform.posts} posts this month</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-post-scheduler">
              <Calendar className="w-6 h-6 mb-2" />
              <span>Post Scheduler</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-content-library">
              <Share2 className="w-6 h-6 mb-2" />
              <span>Content Library</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-social-listening">
              <MessageCircle className="w-6 h-6 mb-2" />
              <span>Social Listening</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col" data-testid="button-performance-analytics">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}