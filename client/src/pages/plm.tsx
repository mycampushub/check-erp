import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Settings, FolderOpen, Clock, CheckCircle, AlertTriangle, Users } from "lucide-react";

export default function PLM() {
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="plm-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="plm-title">
            Product Lifecycle Management
          </h1>
          <p className="text-muted-foreground">Manage product development, BOMs, and engineering changes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-ecr">
            <Settings className="w-4 h-4 mr-2" />
            ECR
          </Button>
          <Button data-testid="button-new-product">
            <Plus className="w-4 h-4 mr-2" />
            New Product
          </Button>
        </div>
      </div>

      {/* PLM Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Products</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-green-600">12 in development</p>
              </div>
              <FolderOpen className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engineering Changes</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-orange-600">Pending approval</p>
              </div>
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">BOMs Managed</p>
                <p className="text-2xl font-bold">342</p>
                <p className="text-sm text-blue-600">Up to date</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Documents</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-purple-600">Version controlled</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products in Development */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Products in Development</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-products">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "PRD001", name: "Smart Widget Pro", stage: "Design Review", progress: 65, manager: "Alice Johnson", deadline: "2024-02-15" },
                { id: "PRD002", name: "Eco Component", stage: "Prototype", progress: 40, manager: "Bob Smith", deadline: "2024-03-01" },
                { id: "PRD003", name: "AI Controller", stage: "Testing", progress: 85, manager: "Carol Davis", deadline: "2024-01-30" },
                { id: "PRD004", name: "Wireless Sensor", stage: "Design", progress: 25, manager: "David Wilson", deadline: "2024-03-15" },
                { id: "PRD005", name: "Smart Hub", stage: "Validation", progress: 90, manager: "Eva Brown", deadline: "2024-01-25" },
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`product-dev-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FolderOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{product.id} - {product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {product.stage} • {product.manager} • Due: {product.deadline}
                      </p>
                      <div className="w-full bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${product.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Badge variant={product.progress >= 80 ? "default" : product.progress >= 50 ? "secondary" : "outline"}>
                    {product.progress}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Engineering Change Requests */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Engineering Change Requests</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-new-ecr">
                New ECR
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ECR001", title: "Material substitution", product: "Widget A", priority: "High", status: "Pending", requester: "John Doe", date: "2024-01-15" },
                { id: "ECR002", title: "Design optimization", product: "Component B", priority: "Medium", status: "In Review", requester: "Jane Smith", date: "2024-01-14" },
                { id: "ECR003", title: "Tolerance adjustment", product: "Assembly C", priority: "Low", status: "Approved", requester: "Mike Johnson", date: "2024-01-13" },
                { id: "ECR004", title: "Process improvement", product: "Widget D", priority: "Medium", status: "Pending", requester: "Sarah Wilson", date: "2024-01-12" },
              ].map((ecr, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`ecr-${index}`}
                >
                  <div>
                    <p className="font-medium text-sm">{ecr.id} - {ecr.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {ecr.product} • {ecr.requester} • {ecr.date}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={ecr.priority === "High" ? "destructive" : ecr.priority === "Medium" ? "default" : "secondary"}>
                      {ecr.priority}
                    </Badge>
                    <Badge variant={ecr.status === "Approved" ? "default" : ecr.status === "In Review" ? "secondary" : "outline"}>
                      {ecr.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bill of Materials */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent BOM Updates</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-boms">
                Manage BOMs
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { product: "Smart Widget Pro", version: "v2.1", components: 45, updated: "2024-01-15", updatedBy: "Alice Johnson" },
                { product: "Eco Component", version: "v1.3", components: 23, updated: "2024-01-14", updatedBy: "Bob Smith" },
                { product: "AI Controller", version: "v3.0", components: 67, updated: "2024-01-13", updatedBy: "Carol Davis" },
                { product: "Wireless Sensor", version: "v1.1", components: 34, updated: "2024-01-12", updatedBy: "David Wilson" },
              ].map((bom, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  data-testid={`bom-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{bom.product}</p>
                      <p className="text-xs text-muted-foreground">
                        {bom.version} • {bom.components} components • Updated by {bom.updatedBy}
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">{bom.updated}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Document Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Documents</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-documents">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Design Specification", type: "PDF", product: "Smart Widget Pro", version: "v2.1", size: "2.4 MB", author: "Alice Johnson" },
                { title: "Test Report", type: "DOCX", product: "Eco Component", version: "v1.3", size: "1.8 MB", author: "Bob Smith" },
                { title: "Assembly Instructions", type: "PDF", product: "AI Controller", version: "v3.0", size: "3.2 MB", author: "Carol Davis" },
                { title: "Material Certificate", type: "PDF", product: "Wireless Sensor", version: "v1.1", size: "856 KB", author: "David Wilson" },
              ].map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`document-${index}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} • {doc.product} • {doc.version} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">{doc.author}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}