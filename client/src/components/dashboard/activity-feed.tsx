import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, CheckCircle, AlertTriangle, Calendar, FileText } from "lucide-react";

const mockActivities = [
  {
    id: 1,
    type: "customer",
    description: "New customer \"Acme Corp\" added to CRM",
    time: "2 hours ago",
    icon: UserPlus,
    iconBg: "bg-primary",
    iconColor: "text-primary-foreground"
  },
  {
    id: 2,
    type: "sale",
    description: "Quote #SO001234 confirmed and converted to sale",
    time: "4 hours ago",
    icon: CheckCircle,
    iconBg: "bg-green-600",
    iconColor: "text-white"
  },
  {
    id: 3,
    type: "inventory",
    description: "Low stock alert: Widget A quantity below minimum",
    time: "6 hours ago",
    icon: AlertTriangle,
    iconBg: "bg-orange-500",
    iconColor: "text-white"
  },
  {
    id: 4,
    type: "meeting",
    description: "Meeting scheduled with XYZ Corp for tomorrow 2PM",
    time: "1 day ago",
    icon: Calendar,
    iconBg: "bg-blue-600",
    iconColor: "text-white"
  },
  {
    id: 5,
    type: "invoice",
    description: "Invoice #INV001456 sent to customer",
    time: "2 days ago",
    icon: FileText,
    iconBg: "bg-purple-600",
    iconColor: "text-white"
  }
];

interface ActivityFeedProps {
  "data-testid"?: string;
}

export default function ActivityFeed({ "data-testid": testId }: ActivityFeedProps) {
  return (
    <Card data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
          <Button 
            variant="link" 
            className="text-primary text-sm hover:underline p-0"
            data-testid="button-view-all-activities"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => {
            const Icon = activity.icon;
            
            return (
              <div 
                key={activity.id}
                className="flex items-start space-x-3"
                data-testid={`activity-item-${activity.id}`}
              >
                <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm" data-testid={`activity-description-${activity.id}`}>
                    {activity.description}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`activity-time-${activity.id}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
