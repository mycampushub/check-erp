import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Opportunity {
  id: string;
  name: string;
  partnerId?: string;
  stage: string;
  probability: number;
  expectedRevenue?: string;
}

interface KanbanBoardProps {
  opportunities: Opportunity[];
  loading?: boolean;
  "data-testid"?: string;
}

const stageConfig = {
  new: { name: "New", color: "bg-primary text-primary-foreground" },
  qualified: { name: "Qualified", color: "bg-primary text-primary-foreground" },
  proposition: { name: "Proposition", color: "bg-primary text-primary-foreground" },
  won: { name: "Won", color: "bg-green-600 text-white" }
};

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    name: "ABC Corp - Cloud Migration",
    partnerId: "ABC Corporation",
    stage: "new",
    probability: 80,
    expectedRevenue: "45000"
  },
  {
    id: "2",
    name: "XYZ Ltd - ERP Implementation",
    partnerId: "XYZ Limited",
    stage: "new",
    probability: 60,
    expectedRevenue: "78500"
  },
  {
    id: "3",
    name: "TechStart - Software Licensing",
    partnerId: "TechStart Inc",
    stage: "qualified",
    probability: 90,
    expectedRevenue: "23750"
  },
  {
    id: "4",
    name: "GlobalTech - Consulting",
    partnerId: "GlobalTech Solutions",
    stage: "proposition",
    probability: 70,
    expectedRevenue: "156000"
  },
  {
    id: "5",
    name: "MegaCorp - Platform Upgrade",
    partnerId: "MegaCorp Industries",
    stage: "won",
    probability: 100,
    expectedRevenue: "89250"
  }
];

export default function KanbanBoard({ opportunities, loading = false, "data-testid": testId }: KanbanBoardProps) {
  const [activeView, setActiveView] = useState("kanban");
  
  // Use mock data if no opportunities provided (for demo purposes)
  const displayOpportunities = opportunities.length > 0 ? opportunities : mockOpportunities;
  
  const stages = Object.keys(stageConfig) as Array<keyof typeof stageConfig>;

  if (loading) {
    return (
      <Card data-testid={testId}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stages.map((stage) => (
              <div key={stage} className="bg-muted rounded-lg p-4">
                <Skeleton className="h-6 w-20 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid={testId}>
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Sales Pipeline</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={activeView === "kanban" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("kanban")}
              className={cn(
                "view-tab px-3 py-1 text-sm rounded-md",
                activeView === "kanban" && "active"
              )}
              data-testid="button-kanban-view"
            >
              Kanban
            </Button>
            <Button
              variant={activeView === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("list")}
              className="view-tab px-3 py-1 text-sm rounded-md text-muted-foreground"
              data-testid="button-list-view"
            >
              List
            </Button>
            <Button
              variant={activeView === "graph" ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveView("graph")}
              className="view-tab px-3 py-1 text-sm rounded-md text-muted-foreground"
              data-testid="button-graph-view"
            >
              Graph
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const stageOpportunities = displayOpportunities.filter(opp => opp.stage === stage);
            const stageInfo = stageConfig[stage];
            
            return (
              <div key={stage} className="bg-muted rounded-lg p-4" data-testid={`kanban-stage-${stage}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm">{stageInfo.name}</h3>
                  <Badge className={stageInfo.color}>
                    {stageOpportunities.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {stageOpportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="kanban-card bg-card p-3 rounded-md border border-border cursor-pointer"
                      data-testid={`opportunity-card-${opportunity.id}`}
                    >
                      <h4 className="font-medium text-sm mb-2">{opportunity.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{opportunity.partnerId}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600">
                          ${Number(opportunity.expectedRevenue || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {opportunity.probability}%
                        </span>
                      </div>
                    </div>
                  ))}
                  {stageOpportunities.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground text-sm">
                      No opportunities
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
