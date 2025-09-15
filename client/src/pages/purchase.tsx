import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, ShoppingCart, Package, Clock, TrendingUp, Edit, Trash2 } from "lucide-react";
import { insertPurchaseOrderSchema, type PurchaseOrder, type Partner } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const purchaseOrderFormSchema = insertPurchaseOrderSchema.extend({
  vendorId: z.string().min(1, "Vendor is required"),
  totalAmount: z.string().min(1, "Amount is required")
});

type PurchaseOrderForm = z.infer<typeof purchaseOrderFormSchema>;

export default function Purchase() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<PurchaseOrder | null>(null);
  const { toast } = useToast();

  // Fetch purchase orders
  const { data: purchaseOrders = [], isLoading: isLoadingOrders } = useQuery<PurchaseOrder[]>({
    queryKey: ["/api/purchase-orders"],
  });

  // Fetch vendors (partners who are vendors)
  const { data: vendors = [] } = useQuery<Partner[]>({
    queryKey: ["/api/partners"],
    select: (data) => data.filter(partner => partner.isVendor)
  });

  // Create purchase order mutation
  const createOrderMutation = useMutation({
    mutationFn: (data: PurchaseOrderForm) => apiRequest("/api/purchase-orders", {
      method: "POST",
      body: JSON.stringify(data)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purchase-orders"] });
      setIsCreateOpen(false);
      form.reset();
      toast({ title: "Purchase order created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create purchase order", variant: "destructive" });
    }
  });

  // Update purchase order mutation
  const updateOrderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PurchaseOrderForm> }) => 
      apiRequest(`/api/purchase-orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purchase-orders"] });
      setEditingOrder(null);
      editForm.reset();
      toast({ title: "Purchase order updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update purchase order", variant: "destructive" });
    }
  });

  // Delete purchase order mutation
  const deleteOrderMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/purchase-orders/${id}`, {
      method: "DELETE"
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/purchase-orders"] });
      toast({ title: "Purchase order deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete purchase order", variant: "destructive" });
    }
  });

  const form = useForm<PurchaseOrderForm>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      name: "",
      vendorId: "",
      state: "draft",
      totalAmount: "0",
      currency: "USD"
    }
  });

  const editForm = useForm<PurchaseOrderForm>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      name: "",
      vendorId: "",
      state: "draft",
      totalAmount: "0",
      currency: "USD"
    }
  });

  const onSubmit = (data: PurchaseOrderForm) => {
    createOrderMutation.mutate(data);
  };

  const onEditSubmit = (data: PurchaseOrderForm) => {
    if (editingOrder) {
      updateOrderMutation.mutate({ id: editingOrder.id, data });
    }
  };

  const handleEdit = (order: PurchaseOrder) => {
    setEditingOrder(order);
    editForm.reset({
      name: order.name,
      vendorId: order.vendorId || "",
      state: order.state,
      totalAmount: order.totalAmount || "0",
      currency: order.currency
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this purchase order?")) {
      deleteOrderMutation.mutate(id);
    }
  };

  const totalSpent = purchaseOrders.reduce((sum, order) => sum + Number(order.totalAmount || 0), 0);
  const confirmedOrders = purchaseOrders.filter(o => o.state === "confirmed").length;
  const draftOrders = purchaseOrders.filter(o => o.state === "draft").length;

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="purchase-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="purchase-title">
            Purchase
          </h1>
          <p className="text-muted-foreground">Manage purchase orders, vendors, and procurement</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-request-quotation">
            <Package className="w-4 h-4 mr-2" />
            Request Quotation
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} data-testid="button-create-purchase-order">
            <Plus className="w-4 h-4 mr-2" />
            Purchase Order
          </Button>
        </div>
      </div>

      {/* Purchase Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Purchase Orders</p>
                <p className="text-2xl font-bold">{purchaseOrders.length}</p>
                <p className="text-sm text-blue-600">{draftOrders} draft</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed Orders</p>
                <p className="text-2xl font-bold">{confirmedOrders}</p>
                <p className="text-sm text-green-600">Active</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">${totalSpent.toLocaleString()}</p>
                <p className="text-sm text-green-600">All orders</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Vendors</p>
                <p className="text-2xl font-bold">{vendors.length}</p>
                <p className="text-sm text-muted-foreground">Suppliers</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Orders & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Purchase Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingOrders ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {purchaseOrders.map((order) => {
                  const vendor = vendors.find(v => v.id === order.vendorId);
                  return (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`purchase-order-${order.id}`}>
                      <div>
                        <p className="font-medium">{order.name}</p>
                        <p className="text-sm text-muted-foreground">{vendor?.name || 'Unknown Vendor'}</p>
                        <p className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="font-medium">${Number(order.totalAmount || 0).toLocaleString()}</p>
                          <Badge variant={order.state === "confirmed" ? "default" : order.state === "received" ? "default" : "secondary"}>
                            {order.state}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(order)} data-testid={`edit-order-${order.id}`}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            onClick={() => handleDelete(order.id)}
                            data-testid={`delete-order-${order.id}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {purchaseOrders.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No purchase orders found. Create your first one!
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Draft Orders</span>
                <Badge variant="secondary">{draftOrders}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Confirmed Orders</span>
                <Badge variant="default">{confirmedOrders}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Received Orders</span>
                <Badge variant="default">{purchaseOrders.filter(o => o.state === "received").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Value</span>
                <span className="font-medium">${totalSpent.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Vendor Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">95%</p>
              <p className="text-sm text-muted-foreground">On-time Delivery</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">4.8/5</p>
              <p className="text-sm text-muted-foreground">Quality Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">2.3 days</p>
              <p className="text-sm text-muted-foreground">Avg Lead Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Create Purchase Order Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Order Name</FormLabel>
                    <FormControl>
                      <Input placeholder="PO001 - Office Supplies" {...field} data-testid="input-po-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="vendorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-vendor">
                          <SelectValue placeholder="Select a vendor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} data-testid="input-po-amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-po-state">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createOrderMutation.isPending} data-testid="button-create-po">
                  {createOrderMutation.isPending ? "Creating..." : "Create Purchase Order"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Purchase Order Dialog */}
      <Dialog open={!!editingOrder} onOpenChange={() => setEditingOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Purchase Order</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Purchase Order Name</FormLabel>
                    <FormControl>
                      <Input placeholder="PO001 - Office Supplies" {...field} data-testid="input-edit-po-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="vendorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vendor</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-edit-vendor">
                          <SelectValue placeholder="Select a vendor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vendors.map((vendor) => (
                          <SelectItem key={vendor.id} value={vendor.id}>
                            {vendor.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="totalAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} data-testid="input-edit-po-amount" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={editForm.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-edit-po-state">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setEditingOrder(null)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={updateOrderMutation.isPending} data-testid="button-update-po">
                  {updateOrderMutation.isPending ? "Updating..." : "Update Purchase Order"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}