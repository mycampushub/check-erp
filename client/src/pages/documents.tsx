import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Search, Share, FolderOpen, Download } from "lucide-react";

export default function Documents() {
  const documents = [
    { id: "DOC001", name: "Annual Report 2023.pdf", type: "PDF", size: "2.4 MB", modified: "2024-01-15", owner: "John Smith", tags: ["Financial", "Report"] },
    { id: "DOC002", name: "Product Specifications.docx", type: "Word", size: "856 KB", modified: "2024-01-14", owner: "Sarah Wilson", tags: ["Product", "Technical"] },
    { id: "DOC003", name: "Marketing Presentation.pptx", type: "PowerPoint", size: "15.2 MB", modified: "2024-01-13", owner: "Mike Johnson", tags: ["Marketing", "Presentation"] }
  ];

  const folders = [
    { name: "Finance", documents: 24, size: "45.2 MB", modified: "2024-01-15" },
    { name: "HR Policies", documents: 18, size: "12.8 MB", modified: "2024-01-12" },
    { name: "Marketing Assets", documents: 67, size: "234.5 MB", modified: "2024-01-14" },
    { name: "Legal Documents", documents: 12, size: "8.9 MB", modified: "2024-01-10" }
  ];

  const recentActivity = [
    { user: "John Smith", action: "uploaded", document: "Q4 Budget.xlsx", time: "2 hours ago" },
    { user: "Sarah Wilson", action: "shared", document: "Project Plan.pdf", time: "4 hours ago" },
    { user: "Mike Johnson", action: "edited", document: "Company Policy.docx", time: "6 hours ago" }
  ];

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="documents-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="documents-title">
            Documents
          </h1>
          <p className="text-muted-foreground">Manage and organize your company documents</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-create-folder">
            <FolderOpen className="w-4 h-4 mr-2" />
            New Folder
          </Button>
          <Button data-testid="button-upload-document">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
      </div>

      {/* Document Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Documents</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-blue-600">+45 this week</p>
              </div>
              <FileText className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">2.4 GB</p>
                <p className="text-sm text-muted-foreground">of 10 GB</p>
              </div>
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shared Documents</p>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-green-600">Active shares</p>
              </div>
              <Share className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-orange-600">This month</p>
              </div>
              <Download className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Folders & Recent Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Folders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {folders.map((folder, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer" data-testid={`folder-${index}`}>
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{folder.name}</p>
                      <p className="text-sm text-muted-foreground">{folder.documents} documents • {folder.size}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{folder.modified}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="p-3 border rounded-lg" data-testid={`document-${doc.id}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.owner} • {doc.size}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{doc.modified}</p>
                  </div>
                  <div className="flex space-x-2">
                    {doc.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg" data-testid={`activity-${index}`}>
                <div>
                  <p className="font-medium">{activity.user} {activity.action} {activity.document}</p>
                </div>
                <p className="text-sm text-muted-foreground">{activity.time}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}