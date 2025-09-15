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
import { Plus, Search, Filter, Package, AlertTriangle, Truck, Save, DollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  internalReference: z.string().optional(),
  barcode: z.string().optional(),
  salePrice: z.string().optional(),
  cost: z.string().optional(),
  category: z.string().optional(),
  type: z.string().default("storable"),
  description: z.string().optional(),
  active: z.boolean().default(true),
});

const inventorySchema = z.object({
  productId: z.string().min(1, "Product is required"),
  location: z.string().default("WH/Stock"),
  quantityOnHand: z.string().default("0"),
  quantityReserved: z.string().default("0"),
});

type ProductForm = z.infer<typeof productSchema>;
type InventoryForm = z.infer<typeof inventorySchema>;

export default function Inventory() {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/products"],
  });

  const { data: inventory = [] } = useQuery<any[]>({
    queryKey: ["/api/inventory"],
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: ProductForm) => {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create product');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsProductDialogOpen(false);
      toast({ title: "Success", description: "Product created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateInventoryMutation = useMutation({
    mutationFn: async (data: InventoryForm) => {
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update inventory');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/inventory'] });
      setIsInventoryDialogOpen(false);
      toast({ title: "Success", description: "Inventory updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const productForm = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      type: "storable",
      active: true,
    },
  });

  const inventoryForm = useForm<InventoryForm>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      location: "WH/Stock",
      quantityOnHand: "0",
      quantityReserved: "0",
    },
  });

  const filteredProducts = products.filter((product: any) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.internalReference?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate inventory statistics
  const totalInventoryValue = products.reduce((sum, product) => {
    const inventoryItem = inventory.find((inv: any) => inv.productId === product.id);
    const quantity = Number(inventoryItem?.quantityOnHand || 0);
    const cost = Number(product.cost || 0);
    return sum + (quantity * cost);
  }, 0);

  const lowStockItems = inventory.filter((item: any) => Number(item.quantityOnHand) <= 10).length;
  const outOfStockItems = inventory.filter((item: any) => Number(item.quantityOnHand) === 0).length;

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="inventory-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="inventory-title">
            Inventory
          </h1>
          <p className="text-muted-foreground">Manage your products and stock levels</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isInventoryDialogOpen} onOpenChange={setIsInventoryDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-inventory-adjustment">
                <Truck className="w-4 h-4 mr-2" />
                Receive Products
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Inventory</DialogTitle>
              </DialogHeader>
              <form onSubmit={inventoryForm.handleSubmit((data) => updateInventoryMutation.mutate(data))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">Product *</Label>
                  <Select onValueChange={(value) => inventoryForm.setValue("productId", value)}>
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
                  {inventoryForm.formState.errors.productId && (
                    <p className="text-sm text-red-500">{inventoryForm.formState.errors.productId.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input {...inventoryForm.register("location")} placeholder="WH/Stock" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantityOnHand">Quantity On Hand</Label>
                    <Input {...inventoryForm.register("quantityOnHand")} type="number" placeholder="0" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantityReserved">Quantity Reserved</Label>
                    <Input {...inventoryForm.register("quantityReserved")} type="number" placeholder="0" />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={updateInventoryMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {updateInventoryMutation.isPending ? "Updating..." : "Update Inventory"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-product">
                <Plus className="w-4 h-4 mr-2" />
                New Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={productForm.handleSubmit((data) => createProductMutation.mutate(data))} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input {...productForm.register("name")} placeholder="Product name" />
                  {productForm.formState.errors.name && (
                    <p className="text-sm text-red-500">{productForm.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="internalReference">Internal Reference</Label>
                    <Input {...productForm.register("internalReference")} placeholder="SKU/Reference" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input {...productForm.register("barcode")} placeholder="Barcode" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price</Label>
                    <Input {...productForm.register("salePrice")} type="number" step="0.01" placeholder="0.00" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost</Label>
                    <Input {...productForm.register("cost")} type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => productForm.setValue("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="books">Books</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select onValueChange={(value) => productForm.setValue("type", value)} defaultValue="storable">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="storable">Storable</SelectItem>
                      <SelectItem value="consumable">Consumable</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea {...productForm.register("description")} placeholder="Product description" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="active"
                    {...productForm.register("active")}
                    className="rounded"
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
                
                <Button type="submit" className="w-full" disabled={createProductMutation.isPending}>
                  <Save className="w-4 h-4 mr-2" />
                  {createProductMutation.isPending ? "Creating..." : "Create Product"}
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
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{(products as any[]).length}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock Items</p>
                <p className="text-2xl font-bold">{lowStockItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Inventory Value</p>
                <p className="text-2xl font-bold">${(totalInventoryValue / 1000).toFixed(1)}K</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold">{outOfStockItems}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">!</span>
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
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-products"
          />
        </div>
        <Button variant="outline" data-testid="button-filter-inventory">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <ViewTabs activeView={view} onViewChange={setView} />
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              <div className="text-muted-foreground">Loading products...</div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No products found</div>
              <Button onClick={() => setIsProductDialogOpen(true)} data-testid="button-create-first-product">
                <Plus className="w-4 h-4 mr-2" />
                Create your first product
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product: any) => {
                const inventoryItem = inventory.find((inv: any) => inv.productId === product.id);
                const quantityOnHand = Number(inventoryItem?.quantityOnHand || 0);
                const quantityReserved = Number(inventoryItem?.quantityReserved || 0);
                const quantityAvailable = quantityOnHand - quantityReserved;
                
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                    data-testid={`product-item-${product.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {product.internalReference || 'No ref'} • {product.category || 'No category'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {product.barcode && `Barcode: ${product.barcode}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">${Number(product.salePrice || 0).toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Cost: ${Number(product.cost || 0).toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${quantityAvailable <= 5 ? 'text-red-600' : quantityAvailable <= 10 ? 'text-orange-600' : 'text-green-600'}`}>
                          {quantityAvailable}
                        </p>
                        <p className="text-sm text-muted-foreground">Available</p>
                        <p className="text-xs text-muted-foreground">
                          On Hand: {quantityOnHand} | Reserved: {quantityReserved}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={product.active ? "default" : "secondary"}>
                          {product.active ? "Active" : "Inactive"}
                        </Badge>
                        {quantityAvailable <= 0 && (
                          <Badge variant="destructive">Out of Stock</Badge>
                        )}
                        {quantityAvailable > 0 && quantityAvailable <= 5 && (
                          <Badge variant="outline" className="border-orange-500 text-orange-600">Low Stock</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
