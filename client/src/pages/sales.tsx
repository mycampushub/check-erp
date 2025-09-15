import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ViewTabs from "@/components/common/view-tabs";
import { Plus, Search, Filter } from "lucide-react";

export default function Sales() {
  const [view, setView] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: salesOrders = [], isLoading } = useQuery<any[]>({
    queryKey: ["/api/sales-orders"],
  });

  const filteredOrders = salesOrders.filter((order: any) =>
    order.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.partner?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Button data-testid="button-create-order">
          <Plus className="w-4 h-4 mr-2" />
          Create
        </Button>
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
              <Button data-testid="button-create-first-order">
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
                      <p className="text-sm text-muted-foreground">{order.partner}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">${order.totalAmount}</p>
                      <p className="text-sm text-muted-foreground">{order.currency}</p>
                    </div>
                    <Badge variant={order.state === "confirmed" ? "default" : "secondary"}>
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
