import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calculator, CreditCard, Printer, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function POS() {
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const products = [
    { id: 1, name: "Coffee", price: 4.50, category: "Beverages" },
    { id: 2, name: "Sandwich", price: 8.95, category: "Food" },
    { id: 3, name: "Tea", price: 3.25, category: "Beverages" },
    { id: 4, name: "Pastry", price: 5.50, category: "Food" }
  ];

  const recentSales = [
    { id: "S001", amount: "$24.50", items: 3, time: "10:30 AM", payment: "Card" },
    { id: "S002", amount: "$18.75", items: 2, time: "10:25 AM", payment: "Cash" },
    { id: "S003", amount: "$31.20", items: 4, time: "10:18 AM", payment: "Card" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="pos-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="pos-title">
            Point of Sale
          </h1>
          <p className="text-muted-foreground">Process sales transactions and manage payments</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-open-register">
            <Calculator className="w-4 h-4 mr-2" />
            Open Register
          </Button>
          <Button variant="outline" data-testid="button-close-register">
            <DollarSign className="w-4 h-4 mr-2" />
            Close Register
          </Button>
        </div>
      </div>

      {/* POS Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Product Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((product) => (
                  <Button
                    key={product.id}
                    variant="outline"
                    className="h-24 flex flex-col items-center justify-center"
                    data-testid={`product-${product.id}`}
                    onClick={() => {
                      const existingItem = cart.find(item => item.id === product.id);
                      if (existingItem) {
                        setCart(cart.map(item => 
                          item.id === product.id 
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                        ));
                      } else {
                        setCart([...cart, { ...product, quantity: 1 }]);
                      }
                      setTotal(total + product.price);
                    }}
                  >
                    <ShoppingBag className="w-6 h-6 mb-2" />
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-xs text-muted-foreground">${product.price}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shopping Cart & Payment */}
        <Card>
          <CardHeader>
            <CardTitle>Current Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No items in cart</p>
              ) : (
                <>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {cart.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded" data-testid={`cart-item-${item.id}`}>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span data-testid="cart-total">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" data-testid="button-pay-card">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay by Card
                    </Button>
                    <Button variant="outline" className="w-full" data-testid="button-pay-cash">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Pay by Cash
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      data-testid="button-clear-cart"
                      onClick={() => {
                        setCart([]);
                        setTotal(0);
                      }}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Summary & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold">$1,247</p>
                <p className="text-sm text-muted-foreground">Total Sales</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Transactions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">$14.01</p>
                <p className="text-sm text-muted-foreground">Avg. Sale</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">67</p>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`recent-sale-${sale.id}`}>
                  <div>
                    <p className="font-medium">{sale.id}</p>
                    <p className="text-sm text-muted-foreground">{sale.items} items • {sale.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{sale.amount}</p>
                    <Badge variant={sale.payment === "Card" ? "default" : "secondary"}>
                      {sale.payment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}