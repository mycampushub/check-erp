import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Barcode, Scan, Package, Settings, Download, Upload } from "lucide-react";

export default function BarcodePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGenerateDialogOpen, setIsGenerateDialogOpen] = useState(false);
  const [isScanDialogOpen, setIsScanDialogOpen] = useState(false);

  // Mock barcode data
  const barcodes = [
    { id: "BC001", type: "Code 128", value: "1234567890128", product: "Widget A", quantity: 100, status: "Active" },
    { id: "BC002", type: "QR Code", value: "https://example.com/widget-b", product: "Widget B", quantity: 50, status: "Active" },
    { id: "BC003", type: "EAN-13", value: "1234567890123", product: "Component C", quantity: 200, status: "Active" },
    { id: "BC004", type: "UPC-A", value: "123456789012", product: "Assembly D", quantity: 75, status: "Inactive" },
    { id: "BC005", type: "Code 39", value: "ABC123XYZ", product: "Part E", quantity: 150, status: "Active" },
  ];

  const filteredBarcodes = barcodes.filter(barcode =>
    barcode.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barcode.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    barcode.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="barcode-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="barcode-title">
            Barcode Management
          </h1>
          <p className="text-muted-foreground">Generate, scan, and manage barcodes and QR codes</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isScanDialogOpen} onOpenChange={setIsScanDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" data-testid="button-scan-barcode">
                <Scan className="w-4 h-4 mr-2" />
                Scan
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Scan Barcode</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-8 border-2 border-dashed border-border rounded-lg text-center">
                  <Scan className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Camera preview would appear here</p>
                  <p className="text-xs text-muted-foreground mt-2">Point camera at barcode to scan</p>
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Package className="w-4 h-4 mr-2" />
                    Manual Entry
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isGenerateDialogOpen} onOpenChange={setIsGenerateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-generate-barcode">
                <Plus className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Barcode</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="barcode-type">Barcode Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select barcode type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="code128">Code 128</SelectItem>
                      <SelectItem value="ean13">EAN-13</SelectItem>
                      <SelectItem value="upca">UPC-A</SelectItem>
                      <SelectItem value="code39">Code 39</SelectItem>
                      <SelectItem value="qrcode">QR Code</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="barcode-value">Value</Label>
                  <Input placeholder="Enter barcode value" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="widget-a">Widget A</SelectItem>
                      <SelectItem value="widget-b">Widget B</SelectItem>
                      <SelectItem value="component-c">Component C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input type="number" placeholder="100" />
                </div>
                
                <Button className="w-full">
                  <Barcode className="w-4 h-4 mr-2" />
                  Generate Barcode
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Barcode Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Barcodes</p>
                <p className="text-2xl font-bold">{barcodes.length}</p>
                <p className="text-sm text-green-600">Active: {barcodes.filter(b => b.status === 'Active').length}</p>
              </div>
              <Barcode className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scanned Today</p>
                <p className="text-2xl font-bold">247</p>
                <p className="text-sm text-blue-600">+12% from yesterday</p>
              </div>
              <Scan className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Types Used</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-purple-600">Code 128 most popular</p>
              </div>
              <Package className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Error Rate</p>
                <p className="text-2xl font-bold">0.2%</p>
                <p className="text-sm text-orange-600">Within acceptable range</p>
              </div>
              <Settings className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search barcodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-barcodes"
          />
        </div>
        <Button variant="outline" data-testid="button-filter">
          Filter
        </Button>
        <Button variant="outline" data-testid="button-export">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      {/* Barcode List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Barcode Library</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" data-testid="button-bulk-generate">
                Bulk Generate
              </Button>
              <Button variant="outline" size="sm" data-testid="button-print-labels">
                Print Labels
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBarcodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-2">No barcodes found</div>
              <Button onClick={() => setIsGenerateDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Generate your first barcode
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBarcodes.map((barcode, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`barcode-item-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <Barcode className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{barcode.id}</h3>
                      <p className="text-sm text-muted-foreground">{barcode.product}</p>
                      <p className="text-xs text-muted-foreground">
                        Type: {barcode.type} • Value: {barcode.value}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">{barcode.quantity}</p>
                      <p className="text-sm text-muted-foreground">labels</p>
                    </div>
                    <Badge variant={barcode.status === "Active" ? "default" : "secondary"}>
                      {barcode.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Scans */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { barcode: "1234567890128", product: "Widget A", time: "2 minutes ago", user: "John Doe" },
              { barcode: "https://example.com/widget-b", product: "Widget B", time: "5 minutes ago", user: "Jane Smith" },
              { barcode: "1234567890123", product: "Component C", time: "8 minutes ago", user: "Mike Johnson" },
              { barcode: "ABC123XYZ", product: "Part E", time: "12 minutes ago", user: "Sarah Wilson" },
            ].map((scan, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
                data-testid={`recent-scan-${index}`}
              >
                <div className="flex items-center space-x-3">
                  <Scan className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="font-medium text-sm">{scan.barcode}</p>
                    <p className="text-xs text-muted-foreground">
                      {scan.product} • {scan.user}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">{scan.time}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}