import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: string;
  color: "green" | "blue" | "orange" | "red" | "purple";
  loading?: boolean;
  "data-testid"?: string;
}

const colorConfig = {
  green: {
    iconBg: "bg-green-100",
    iconText: "text-green-600",
    changeText: "text-green-600"
  },
  blue: {
    iconBg: "bg-blue-100",
    iconText: "text-blue-600",
    changeText: "text-blue-600"
  },
  orange: {
    iconBg: "bg-orange-100",
    iconText: "text-orange-600",
    changeText: "text-orange-600"
  },
  red: {
    iconBg: "bg-red-100",
    iconText: "text-red-600",
    changeText: "text-red-600"
  },
  purple: {
    iconBg: "bg-purple-100",
    iconText: "text-purple-600",
    changeText: "text-purple-600"
  }
};

export default function KPICard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  color, 
  loading = false,
  "data-testid": testId
}: KPICardProps) {
  const config = colorConfig[color];
  
  if (loading) {
    return (
      <Card data-testid={testId}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-12 w-12 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid={testId}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground" data-testid={`${testId}-title`}>
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground" data-testid={`${testId}-value`}>
              {value}
            </p>
            <p className={cn(
              "text-sm mt-1",
              changeType === "positive" ? "text-green-600" : "text-red-600"
            )} data-testid={`${testId}-change`}>
              {change}
            </p>
          </div>
          <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", config.iconBg)}>
            <i className={cn(icon, "text-xl", config.iconText)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
