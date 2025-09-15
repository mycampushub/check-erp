import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const revenueData = [
  { month: "Jan", value: 32, height: 32 },
  { month: "Feb", value: 40, height: 40 },
  { month: "Mar", value: 36, height: 36 },
  { month: "Apr", value: 48, height: 48 },
  { month: "May", value: 44, height: 44 },
  { month: "Jun", value: 52, height: 52 }
];

interface RevenueChartProps {
  "data-testid"?: string;
}

export default function RevenueChart({ "data-testid": testId }: RevenueChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");

  return (
    <Card data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40" data-testid="select-revenue-period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="2years">Last 2 years</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Simple Chart Representation */}
        <div className="h-64 flex items-end justify-between space-x-2" data-testid="revenue-chart-bars">
          {revenueData.map((data, index) => (
            <div 
              key={index}
              className="flex flex-col items-center space-y-2"
              data-testid={`chart-bar-${data.month.toLowerCase()}`}
            >
              <div 
                className="w-8 bg-primary rounded-t-md transition-all hover:bg-primary/80"
                style={{ height: `${data.height * 2}px` }}
                title={`${data.month}: $${data.value}K`}
              />
              <span className="text-xs text-muted-foreground">{data.month}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
