import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, TrendingUp, Users, DollarSign, Eye } from "lucide-react";

export default function Ecommerce() {
  const orders = [
    { id: "ORD001", customer: "John Smith", total: "$127.50", status: "shipped", date: "2024-01-15" },
    { id: "ORD002", customer: "Sarah Wilson", total: "$89.99", status: "processing", date: "2024-01-16" },
    { id: "ORD003", customer: "Mike Johnson", total: "$234.75", status: "delivered", date: "2024-01-14" }
  ];

  const topProducts = [
    { name: "Wireless Headphones", sales: 124, revenue: "$18,600", trend: "+15%" },
    { name: "Smartphone Case", sales: 89, revenue: "$2,670", trend: "+8%" },
    { name: "Laptop Stand", sales: 67, revenue: "$6,030", trend: "-2%" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="ecommerce-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="ecommerce-title">
            eCommerce
          </h1>
          <p className="text-muted-foreground">Manage your online store, orders, and products</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-view-store">
            <Eye className="w-4 h-4 mr-2" />
            View Store
          </Button>
          <Button data-testid="button-add-product">
            <Package className="w-4 h-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>

      {/* eCommerce Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">$24,567</p>
                <p className="text-sm text-green-600">+18.2% this month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Orders</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-blue-600">42 this week</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Customers</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-green-600">+23 new</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-orange-600">12 out of stock</p>
              </div>
              <Package className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`order-${order.id}`}>
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <Badge variant={
                      order.status === "delivered" ? "default" : 
                      order.status === "shipped" ? "default" : 
                      "secondary"
                    }>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`top-product-${index}`}>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.revenue}</p>
                    <p className={`text-sm ${product.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {product.trend}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Store Management */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>In Stock</span>
                <span className="font-medium text-green-600">77 products</span>
              </div>
              <div className="flex justify-between">
                <span>Low Stock</span>
                <span className="font-medium text-orange-600">8 products</span>
              </div>
              <div className="flex justify-between">
                <span>Out of Stock</span>
                <span className="font-medium text-red-600">4 products</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Credit Card</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between">
                <span>PayPal</span>
                <span className="font-medium">16%</span>
              </div>
              <div className="flex justify-between">
                <span>Bank Transfer</span>
                <span className="font-medium">6%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Store Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline" data-testid="button-shipping-rules">
              Configure Shipping
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-tax-settings">
              Tax Settings
            </Button>
            <Button className="w-full justify-start" variant="outline" data-testid="button-payment-gateway">
              Payment Gateway
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}