import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ViewTabs from "@/components/common/view-tabs";
import { Plus, Search, Filter, Users, TrendingUp, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  company: z.string().optional(),
  source: z.string().optional(),
  stage: z.string().default("new"),
  probability: z.number().min(0).max(100).default(0),
  expectedRevenue: z.string().optional(),
  description: z.string().optional(),
});

const opportunitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  partnerId: z.string().optional(),
  stage: z.string().default("new"),
  probability: z.number().min(0).max(100).default(0),
  expectedRevenue: z.string().optional(),
  closeDate: z.string().optional(),
  description: z.string().optional(),
});

type LeadForm = z.infer<typeof leadSchema>;
type OpportunityForm = z.infer<typeof opportunitySchema>;

export default function CRM() {
  const [view, setView] = useState("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false);
  const [isOpportunityDialogOpen, setIsOpportunityDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: opportunities = [], isLoading: opportunitiesLoading } = useQuery<any[]>({
    queryKey: ["/api/opportunities"],
  });

  const { data: partners = [] } = useQuery<any[]>({
    queryKey: ["/api/partners"],
  });

  const { data: leads = [] } = useQuery<any[]>({
    queryKey: ["/api/leads"],
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: LeadForm) => {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create lead');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/leads'] });
      setIsLeadDialogOpen(false);
      toast({ title: "Success", description: "Lead created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const createOpportunityMutation = useMutation({
    mutationFn: async (data: OpportunityForm) => {
      const response = await fetch('/api/opportunities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create opportunity');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      setIsOpportunityDialogOpen(false);
      toast({ title: "Success", description: "Opportunity created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const leadForm = useForm<LeadForm>({
    resolver: zodResolver(leadSchema),
  });

  const opportunityForm = useForm<OpportunityForm>({
    resolver: zodResolver(opportunitySchema),
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
          <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-create-lead">
                <Users className="w-4 h-4 mr-2" />
                New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Lead</DialogTitle>
              </DialogHeader>
              <form onSubmit={leadForm.handleSubmit((data) => createLeadMutation.mutate(data))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input {...leadForm.register("name")} placeholder="Lead name" />
                  {leadForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{leadForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input {...leadForm.register("email")} type="email" placeholder="Email address" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input {...leadForm.register("phone")} placeholder="Phone number" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input {...leadForm.register("company")} placeholder="Company name" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="source">Source</Label>
                  <Select onValueChange={(value) => leadForm.setValue("source", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="cold_call">Cold Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select onValueChange={(value) => leadForm.setValue("stage", value)} defaultValue="new">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposition">Proposition</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="probability">Probability (%)</Label>
                  <Input 
                    {...leadForm.register("probability", { valueAsNumber: true })} 
                    type="number" 
                    min="0" 
                    max="100" 
                    placeholder="0" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedRevenue">Expected Revenue</Label>
                  <Input {...leadForm.register("expectedRevenue")} placeholder="0.00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea {...leadForm.register("description")} placeholder="Lead description" />
                </div>
                
                <Button type="submit" className="w-full" disabled={createLeadMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {createLeadMutation.isPending ? "Creating..." : "Create Lead"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isOpportunityDialogOpen} onOpenChange={setIsOpportunityDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-opportunity">
                <Plus className="w-4 h-4 mr-2" />
                New Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Opportunity</DialogTitle>
              </DialogHeader>
              <form onSubmit={opportunityForm.handleSubmit((data) => createOpportunityMutation.mutate(data))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input {...opportunityForm.register("name")} placeholder="Opportunity name" />
                  {opportunityForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{opportunityForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="partnerId">Partner</Label>
                  <Select onValueChange={(value) => opportunityForm.setValue("partnerId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partner" />
                    </SelectTrigger>
                    <SelectContent>
                      {partners.map((partner) => (
                        <SelectItem key={partner.id} value={partner.id}>
                          {partner.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="stage">Stage</Label>
                  <Select onValueChange={(value) => opportunityForm.setValue("stage", value)} defaultValue="new">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposition">Proposition</SelectItem>
                      <SelectItem value="won">Won</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="probability">Probability (%)</Label>
                  <Input 
                    {...opportunityForm.register("probability", { valueAsNumber: true })} 
                    type="number" 
                    min="0" 
                    max="100" 
                    placeholder="0" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedRevenue">Expected Revenue</Label>
                  <Input {...opportunityForm.register("expectedRevenue")} placeholder="0.00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="closeDate">Close Date</Label>
                  <Input {...opportunityForm.register("closeDate")} type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea {...opportunityForm.register("description")} placeholder="Opportunity description" />
                </div>
                
                <Button type="submit" className="w-full" disabled={createOpportunityMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {createOpportunityMutation.isPending ? "Creating..." : "Create Opportunity"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
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
                <p className="text-sm text-muted-foreground">Total Leads</p>
                <p className="text-2xl font-bold">{(leads as any[]).length}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600">📋</span>
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
                      className="kanban-card bg-card p-3 rounded-md border border-border cursor-pointer hover:shadow-md transition-shadow"
                      data-testid={`opportunity-card-${opportunity.id}`}
                    >
                      <h4 className="font-medium text-sm mb-2">{opportunity.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {partners.find((p: any) => p.id === opportunity.partnerId)?.name || 'No partner'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-green-600">
                          ${opportunity.expectedRevenue || '0'}
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
            {opportunitiesLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-muted-foreground">Loading opportunities...</div>
              </div>
            ) : filteredOpportunities.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No opportunities found</div>
                <Button onClick={() => setIsOpportunityDialogOpen(true)} data-testid="button-create-first-opportunity">
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
                        <p className="text-sm text-muted-foreground">
                          {partners.find((p: any) => p.id === opportunity.partnerId)?.name || 'No partner'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${opportunity.expectedRevenue || '0'}</p>
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
