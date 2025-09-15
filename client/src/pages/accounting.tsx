import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, DollarSign, FileText, CreditCard } from "lucide-react";

export default function Accounting() {
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="accounting-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="accounting-title">
            Accounting
          </h1>
          <p className="text-muted-foreground">Manage your financial records and reporting</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-bank-reconciliation">
            <CreditCard className="w-4 h-4 mr-2" />
            Bank Reconciliation
          </Button>
          <Button data-testid="button-create-journal-entry">
            <Plus className="w-4 h-4 mr-2" />
            Journal Entry
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$142,350</p>
                <p className="text-sm text-green-600">+12.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Expenses</p>
                <p className="text-2xl font-bold">$89,240</p>
                <p className="text-sm text-red-600">+8.2%</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Profit</p>
                <p className="text-2xl font-bold">$53,110</p>
                <p className="text-sm text-green-600">+15.8%</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cash Flow</p>
                <p className="text-2xl font-bold">$78,450</p>
                <p className="text-sm text-blue-600">Positive</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">💧</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-view-all-transactions">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, description: "Customer Payment - ABC Corp", amount: "+$5,000", type: "income", date: "Today" },
                { id: 2, description: "Office Supplies", amount: "-$250", type: "expense", date: "Yesterday" },
                { id: 3, description: "Software License", amount: "-$1,200", type: "expense", date: "2 days ago" },
                { id: 4, description: "Consulting Revenue", amount: "+$3,500", type: "income", date: "3 days ago" },
                { id: 5, description: "Rent Payment", amount: "-$2,800", type: "expense", date: "1 week ago" },
              ].map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`transaction-${transaction.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {transaction.type === "income" ? "↗" : "↙"}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.description}</p>
                      <p className="text-xs text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <p className={`font-medium ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.amount}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Outstanding Items */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Outstanding Items</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-manage-outstanding">
                Manage
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Accounts Receivable */}
              <div>
                <h4 className="font-medium text-sm mb-3 text-green-600">Accounts Receivable</h4>
                <div className="space-y-2">
                  {[
                    { customer: "ABC Corporation", amount: "$12,500", due: "15 days", overdue: false },
                    { customer: "XYZ Limited", amount: "$8,750", due: "5 days", overdue: false },
                    { customer: "TechStart Inc", amount: "$4,200", due: "Overdue 3 days", overdue: true },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                      data-testid={`receivable-${index}`}
                    >
                      <div>
                        <p className="text-sm font-medium">{item.customer}</p>
                        <p className={`text-xs ${item.overdue ? "text-red-600" : "text-muted-foreground"}`}>
                          {item.due}
                        </p>
                      </div>
                      <p className="font-medium text-sm">{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accounts Payable */}
              <div>
                <h4 className="font-medium text-sm mb-3 text-red-600">Accounts Payable</h4>
                <div className="space-y-2">
                  {[
                    { vendor: "Office Supplies Co", amount: "$1,250", due: "20 days", overdue: false },
                    { vendor: "Software Provider", amount: "$2,400", due: "10 days", overdue: false },
                    { vendor: "Utilities Company", amount: "$680", due: "Overdue 1 day", overdue: true },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-muted rounded"
                      data-testid={`payable-${index}`}
                    >
                      <div>
                        <p className="text-sm font-medium">{item.vendor}</p>
                        <p className={`text-xs ${item.overdue ? "text-red-600" : "text-muted-foreground"}`}>
                          {item.due}
                        </p>
                      </div>
                      <p className="font-medium text-sm">{item.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Profit & Loss", description: "Income and expenses overview", icon: TrendingUp },
                { name: "Balance Sheet", description: "Assets, liabilities & equity", icon: FileText },
                { name: "Cash Flow", description: "Cash inflows and outflows", icon: DollarSign },
              ].map((report, index) => (
                <div
                  key={index}
                  className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                  data-testid={`report-${report.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <report.icon className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">{report.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
