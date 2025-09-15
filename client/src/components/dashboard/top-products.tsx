import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Laptop, Settings, GraduationCap } from "lucide-react";

const topProducts = [
  {
    id: 1,
    name: "Professional Services",
    category: "Services",
    revenue: 45200,
    growth: "+15%",
    icon: Package,
    color: "bg-primary"
  },
  {
    id: 2,
    name: "Software Licenses",
    category: "Products",
    revenue: 38750,
    growth: "+8%",
    icon: Laptop,
    color: "bg-secondary"
  },
  {
    id: 3,
    name: "Hardware Components",
    category: "Products",
    revenue: 29180,
    growth: "-3%",
    icon: Settings,
    color: "bg-accent"
  },
  {
    id: 4,
    name: "Training & Support",
    category: "Services",
    revenue: 22340,
    growth: "+12%",
    icon: GraduationCap,
    color: "bg-orange-500"
  }
];

interface TopProductsProps {
  "data-testid"?: string;
}

export default function TopProducts({ "data-testid": testId }: TopProductsProps) {
  return (
    <Card data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Products</CardTitle>
          <Button 
            variant="link" 
            className="text-primary text-sm hover:underline p-0"
            data-testid="button-view-report"
          >
            View Report
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {topProducts.map((product) => {
            const Icon = product.icon;
            const isPositiveGrowth = product.growth.startsWith('+');
            
            return (
              <div 
                key={product.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/70 cursor-pointer"
                data-testid={`product-item-${product.id}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${product.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm" data-testid={`product-name-${product.id}`}>
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground" data-testid={`product-category-${product.id}`}>
                      {product.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm" data-testid={`product-revenue-${product.id}`}>
                    ${product.revenue.toLocaleString()}
                  </p>
                  <p 
                    className={`text-xs ${isPositiveGrowth ? 'text-green-600' : 'text-red-600'}`}
                    data-testid={`product-growth-${product.id}`}
                  >
                    {product.growth}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
