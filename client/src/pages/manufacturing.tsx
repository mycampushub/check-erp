import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Settings, Factory, Package, AlertTriangle, TrendingUp, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const productionOrderSchema = z.object({
  name: z.string().min(1, "Order name is required"),
  productId: z.string().min(1, "Product is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().default("pcs"),
  state: z.string().default("draft"),
  priority: z.string().default("normal"),
  plannedStartDate: z.string().optional(),
  plannedEndDate: z.string().optional(),
  description: z.string().optional(),
});

const workOrderSchema = z.object({
  name: z.string().min(1, "Work order name is required"),
  productionOrderId: z.string().optional(),
  workCenterId: z.string().optional(),
  operation: z.string().min(1, "Operation is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().default("pcs"),
  state: z.string().default("pending"),
  plannedStartDate: z.string().optional(),
  plannedEndDate: z.string().optional(),
  description: z.string().optional(),
});

type ProductionOrderForm = z.infer<typeof productionOrderSchema>;
type WorkOrderForm = z.infer<typeof workOrderSchema>;

export default function Manufacturing() {
  const [isProductionOrderDialogOpen, setIsProductionOrderDialogOpen] = useState(false);
  const [isWorkOrderDialogOpen, setIsWorkOrderDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: productionOrders = [] } = useQuery<any[]>({
    queryKey: ["/api/production-orders"],
  });

  const { data: workOrders = [] } = useQuery<any[]>({
    queryKey: ["/api/work-orders"],
  });

  const { data: workCenters = [] } = useQuery<any[]>({
    queryKey: ["/api/work-centers"],
  });

  const { data: products = [] } = useQuery<any[]>({
    queryKey: ["/api/products"],
  });

  const createProductionOrderMutation = useMutation({
    mutationFn: async (data: ProductionOrderForm) => {
      const response = await fetch('/api/production-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create production order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/production-orders'] });
      setIsProductionOrderDialogOpen(false);
      toast({ title: "Success", description: "Production order created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const createWorkOrderMutation = useMutation({
    mutationFn: async (data: WorkOrderForm) => {
      const response = await fetch('/api/work-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create work order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/work-orders'] });
      setIsWorkOrderDialogOpen(false);
      toast({ title: "Success", description: "Work order created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const productionOrderForm = useForm<ProductionOrderForm>({
    resolver: zodResolver(productionOrderSchema),
    defaultValues: {
      unit: "pcs",
      state: "draft",
      priority: "normal",
    },
  });

  const workOrderForm = useForm<WorkOrderForm>({
    resolver: zodResolver(workOrderSchema),
    defaultValues: {
      unit: "pcs",
      state: "pending",
    },
  });

  // Calculate real statistics
  const totalOrders = productionOrders.length;
  const activeOrders = productionOrders.filter((order: any) => 
    order.state !== "done" && order.state !== "cancel"
  ).length;
  const completedToday = workOrders.filter((order: any) => 
    order.state === "done" && new Date(order.actualEndDate).toDateString() === new Date().toDateString()
  ).length;
  const qualityIssues = workOrders.filter((order: any) => 
    order.state === "blocked" || order.state === "quality_issue"
  ).length;

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="manufacturing-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="manufacturing-title">
            Manufacturing
          </h1>
          <p className="text-muted-foreground">Manage production orders, work orders, and manufacturing operations</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isWorkOrderDialogOpen} onOpenChange={setIsWorkOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-work-order">
                <Settings className="w-4 h-4 mr-2" />
                Work Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Work Order</DialogTitle>
              </DialogHeader>
              <form onSubmit={workOrderForm.handleSubmit((data) => createWorkOrderMutation.mutate(data))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Work Order Name *</Label>
                  <Input {...workOrderForm.register("name")} placeholder="Work order name" />
                  {workOrderForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{workOrderForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productionOrderId">Production Order</Label>
                  <Select onValueChange={(value) => workOrderForm.setValue("productionOrderId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select production order" />
                    </SelectTrigger>
                    <SelectContent>
                      {productionOrders.map((order) => (
                        <SelectItem key={order.id} value={order.id}>
                          {order.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workCenterId">Work Center</Label>
                  <Select onValueChange={(value) => workOrderForm.setValue("workCenterId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select work center" />
                    </SelectTrigger>
                    <SelectContent>
                      {workCenters.map((center) => (
                        <SelectItem key={center.id} value={center.id}>
                          {center.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="operation">Operation *</Label>
                  <Input {...workOrderForm.register("operation")} placeholder="Operation description" />
                  {workOrderForm.formState.errors.operation && (
                    <p className="text-sm text-red-500">{workOrderForm.formState.errors.operation.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input {...workOrderForm.register("quantity")} type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select onValueChange={(value) => workOrderForm.setValue("unit", value)} defaultValue="pcs">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="m">Meters</SelectItem>
                        <SelectItem value="l">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea {...workOrderForm.register("description")} placeholder="Work order description" />
                </div>
                
                <Button type="submit" className="w-full" disabled={createWorkOrderMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {createWorkOrderMutation.isPending ? "Creating..." : "Create Work Order"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isProductionOrderDialogOpen} onOpenChange={setIsProductionOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-production-order">
                <Plus className="w-4 h-4 mr-2" />
                Production Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Production Order</DialogTitle>
              </DialogHeader>
              <form onSubmit={productionOrderForm.handleSubmit((data) => createProductionOrderMutation.mutate(data))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Order Name *</Label>
                  <Input {...productionOrderForm.register("name")} placeholder="Production order name" />
                  {productionOrderForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{productionOrderForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="productId">Product *</Label>
                  <Select onValueChange={(value) => productionOrderForm.setValue("productId", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {productionOrderForm.formState.errors.productId && (
                    <p className="text-sm text-red-500">{productionOrderForm.formState.errors.productId.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input {...productionOrderForm.register("quantity")} type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select onValueChange={(value) => productionOrderForm.setValue("unit", value)} defaultValue="pcs">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Pieces</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="m">Meters</SelectItem>
                        <SelectItem value="l">Liters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => productionOrderForm.setValue("priority", value)} defaultValue="normal">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">Status</Label>
                    <Select onValueChange={(value) => productionOrderForm.setValue("state", value)} defaultValue="draft">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="cancel">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="plannedStartDate">Start Date</Label>
                    <Input {...productionOrderForm.register("plannedStartDate")} type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="plannedEndDate">End Date</Label>
                    <Input {...productionOrderForm.register("plannedEndDate")} type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea {...productionOrderForm.register("description")} placeholder="Production order description" />
                </div>
                
                <Button type="submit" className="w-full" disabled={createProductionOrderMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {createProductionOrderMutation.isPending ? "Creating..." : "Create Production Order"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Manufacturing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Production Orders</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
                <p className="text-sm text-green-600">{activeOrders} in progress</p>
              </div>
              <Factory className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold">{completedToday}</p>
                <p className="text-sm text-blue-600">Units completed</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Efficiency Rate</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-green-600">+2% from yesterday</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quality Issues</p>
                <p className="text-2xl font-bold">{qualityIssues}</p>
                <p className="text-sm text-orange-600">Needs attention</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Production Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Active Production Orders</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-orders">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productionOrders
                .filter((order: any) => order.state !== "done" && order.state !== "cancel")
                .slice(0, 5)
                .map((order: any, index: number) => {
                  const product = products.find((p: any) => p.id === order.productId);
                  const progress = order.state === "done" ? 100 : 
                               order.state === "in_progress" ? 65 : 
                               order.state === "confirmed" ? 30 : 0;
                  
                  return (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                      data-testid={`production-order-${index}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Factory className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{order.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product?.name || 'Unknown Product'} • {progress}% complete
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          order.priority === "urgent" ? "destructive" : 
                          order.priority === "high" ? "destructive" : 
                          order.priority === "normal" ? "default" : "secondary"
                        }>
                          {order.priority}
                        </Badge>
                        <Badge variant={
                          order.state === "done" ? "default" : 
                          order.state === "in_progress" ? "secondary" : "outline"
                        }>
                          {order.state.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              {productionOrders.filter((order: any) => order.state !== "done" && order.state !== "cancel").length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No active production orders
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Work Centers Status */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Work Centers</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-workcenters">
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workCenters.slice(0, 5).map((center: any, index: number) => {
                const currentWorkOrders = workOrders.filter((wo: any) => 
                  wo.workCenterId === center.id && wo.state === "in_progress"
                );
                const efficiency = Math.floor(Math.random() * 20) + 80; // Mock efficiency for now
                
                return (
                  <div
                    key={center.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                    data-testid={`work-center-${index}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        currentWorkOrders.length > 0 ? "bg-green-500" : "bg-yellow-500"
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{center.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {currentWorkOrders.length > 0 ? 
                            `Working on ${currentWorkOrders[0]?.name || 'order'}` : 
                            center.status
                          }
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{efficiency}%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                    </div>
                  </div>
                );
              })}
              {workCenters.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No work centers configured
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Work Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Work Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workOrders.slice(0, 5).map((order: any, index: number) => {
                const productionOrder = productionOrders.find((po: any) => po.id === order.productionOrderId);
                const workCenter = workCenters.find((wc: any) => wc.id === order.workCenterId);
                
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                    data-testid={`work-order-${index}`}
                  >
                    <div>
                      <p className="font-medium text-sm">{order.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {productionOrder?.name || 'No PO'} • {workCenter?.name || 'No WC'} • {order.operation}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        order.state === "done" ? "default" : 
                        order.state === "in_progress" ? "secondary" : 
                        order.state === "blocked" ? "destructive" : "outline"
                      }>
                        {order.state.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {workOrders.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No work orders found
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Manufacturing Analytics */}
        <Card>
          <CardHeader>
            <CardTitle>Manufacturing Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Avg. Lead Time</p>
                  <p className="text-lg font-bold">3.2 days</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                  <p className="text-lg font-bold">94.5%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Scrap Rate</p>
                  <p className="text-lg font-bold">2.1%</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Capacity Utilization</p>
                  <p className="text-lg font-bold">87%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
