import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ViewTabs from "@/components/common/view-tabs";
import { Plus, Search, Filter, Users, TrendingUp } from "lucide-react";

export default function CRM() {
  const [view, setView] = useState("kanban");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: opportunities = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/opportunities"],
  });

  const { data: partners = [] } = useQuery<any[]>({
    queryKey: ["/api/partners"],
  });

  const filteredOpportunities = opportunities.filter((opp: any) =>
    opp.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stages = ["new", "qualified", "proposition", "won"];
  const stageNames = {
    new: "New",
    qualified: "Qualified",
    proposition: "Proposition",
    won: "Won"
  };

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="crm-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="crm-title">
            CRM
          </h1>
          <p className="text-muted-foreground">Manage your customer relationships and opportunities</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-create-lead">
            <Users className="w-4 h-4 mr-2" />
            New Lead
          </Button>
          <Button data-testid="button-create-opportunity">
            <Plus className="w-4 h-4 mr-2" />
            New Opportunity
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Opportunities</p>
                <p className="text-2xl font-bold">{(opportunities as any[]).length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">{(partners as any[]).filter((p: any) => p.isCustomer).length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Won This Month</p>
                <p className="text-2xl font-bold">{(opportunities as any[]).filter((o: any) => o.stage === "won").length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600">%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search opportunities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-opportunities"
          />
        </div>
        <Button variant="outline" data-testid="button-filter-crm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <ViewTabs activeView={view} onViewChange={setView} />
      </div>

      {/* Kanban Board */}
      {view === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const stageOpportunities = filteredOpportunities.filter((opp: any) => opp.stage === stage);
            return (
              <Card key={stage} className="bg-muted">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {stageNames[stage as keyof typeof stageNames]}
                    </CardTitle>
                    <Badge variant="secondary">{stageOpportunities.length}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {stageOpportunities.map((opportunity: any) => (
                    <div
                      key={opportunity.id}
                      className="kanban-card bg-card p-3 rounded-md border border-border cursor-pointer"
                      data-testid={`opportunity-card-${opportunity.id}`}
                    >
                      <h4 className="font-medium text-sm mb-2">{opportunity.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{opportunity.partner}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600">
                          ${opportunity.expectedRevenue?.toLocaleString() || '0'}
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-muted-foreground">Loading opportunities...</div>
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No opportunities found</div>
                <Button data-testid="button-create-first-opportunity">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first opportunity
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOpportunities.map((opportunity: any) => (
                  <div
                    key={opportunity.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                    data-testid={`opportunity-item-${opportunity.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{opportunity.name}</h3>
                        <p className="text-sm text-muted-foreground">{opportunity.partner}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${opportunity.expectedRevenue?.toLocaleString() || '0'}</p>
                        <p className="text-sm text-muted-foreground">{opportunity.probability}% probability</p>
                      </div>
                      <Badge variant={opportunity.stage === "won" ? "default" : "secondary"}>
                        {opportunity.stage}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
