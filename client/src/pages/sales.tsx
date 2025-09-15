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
import { Plus, Search, Filter, Save, Calendar, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const salesOrderSchema = z.object({
  name: z.string().min(1, "Order name is required"),
  partnerId: z.string().min(1, "Partner is required"),
  state: z.string().default("draft"),
  totalAmount: z.string().default("0"),
  currency: z.string().default("USD"),
  orderDate: z.string().default(new Date().toISOString().split('T')[0]),
  deliveryDate: z.string().optional(),
  salespersonId: z.string().optional(),
  description: z.string().optional(),
});

type SalesOrderForm = z.infer<typeof salesOrderSchema>;

export default function Sales() {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: salesOrders = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/sales-orders"],
  });

  const { data: partners = [] } = useQuery<any[]>({
    queryKey: ["/api/partners"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const createSalesOrderMutation = useMutation({
    mutationFn: async (data: SalesOrderForm) => {
      const response = await fetch('/api/sales-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create sales order');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/sales-orders'] });
      setIsOrderDialogOpen(false);
      toast({ title: "Success", description: "Sales order created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const salesOrderForm = useForm<SalesOrderForm>({
    resolver: zodResolver(salesOrderSchema),
    defaultValues: {
      state: "draft",
      totalAmount: "0",
      currency: "USD",
      orderDate: new Date().toISOString().split('T')[0],
    },
  });

  const filteredOrders = salesOrders.filter((order: any) =>
    order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partners.find((p: any) => p.id === order.partnerId)?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = salesOrders
    .filter((order: any) => order.state === "confirmed" || order.state === "done")
    .reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);

  const pendingOrders = salesOrders.filter((order: any) => order.state === "draft" || order.state === "sent").length;
  const confirmedOrders = salesOrders.filter((order: any) => order.state === "confirmed").length;

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="sales-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="sales-title">
            Sales
          </h1>
          <p className="text-muted-foreground">Manage your sales orders and quotations</p>
        </div>
        <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-order">
              <Plus className="w-4 h-4 mr-2" />
              Create Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Sales Order</DialogTitle>
            </DialogHeader>
            <form onSubmit={salesOrderForm.handleSubmit((data) => createSalesOrderMutation.mutate(data))} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Order Name *</Label>
                <Input {...salesOrderForm.register("name")} placeholder="Order name" />
                {salesOrderForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{salesOrderForm.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="partnerId">Customer *</Label>
                <Select onValueChange={(value) => salesOrderForm.setValue("partnerId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {partners.filter((p: any) => p.isCustomer).map((partner) => (
                      <SelectItem key={partner.id} value={partner.id}>
                        {partner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {salesOrderForm.formState.errors.partnerId && (
                  <p className="text-sm text-red-500">{salesOrderForm.formState.errors.partnerId.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAmount">Total Amount</Label>
                  <Input {...salesOrderForm.register("totalAmount")} type="number" step="0.01" placeholder="0.00" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select onValueChange={(value) => salesOrderForm.setValue("currency", value)} defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="JPY">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date</Label>
                  <Input {...salesOrderForm.register("orderDate")} type="date" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input {...salesOrderForm.register("deliveryDate")} type="date" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state">Status</Label>
                <Select onValueChange={(value) => salesOrderForm.setValue("state", value)} defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                    <SelectItem value="cancel">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salespersonId">Salesperson</Label>
                <Select onValueChange={(value) => salesOrderForm.setValue("salespersonId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select salesperson" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea {...salesOrderForm.register("description")} placeholder="Order description" />
              </div>
              
              <Button type="submit" className="w-full" disabled={createSalesOrderMutation.isPending}>
                <Save className="w-4 h-4 mr-2" />
                {createSalesOrderMutation.isPending ? "Creating..." : "Create Sales Order"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{salesOrders.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">📋</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Orders</p>
                <p className="text-2xl font-bold">{pendingOrders}</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600">⏳</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed Orders</p>
                <p className="text-2xl font-bold">{confirmedOrders}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">✓</span>
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
            placeholder="Search sales orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-orders"
          />
        </div>
        <Button variant="outline" data-testid="button-filter">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <ViewTabs activeView={view} onViewChange={setView} />
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="text-muted-foreground">Loading sales orders...</div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No sales orders found</div>
              <Button onClick={() => setIsOrderDialogOpen(true)} data-testid="button-create-first-order">
                <Plus className="w-4 h-4 mr-2" />
                Create your first sales order
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`order-item-${order.id}`}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-medium">{order.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {partners.find((p: any) => p.id === order.partnerId)?.name || 'No customer'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 inline mr-1" />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${Number(order.totalAmount || 0).toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{order.currency}</p>
                    </div>
                    <Badge 
                      variant={
                        order.state === "done" ? "default" : 
                        order.state === "confirmed" ? "default" :
                        order.state === "cancel" ? "destructive" : "secondary"
                      }
                    >
                      {order.state}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
