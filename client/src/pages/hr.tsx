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
import { Plus, Search, Users, Calendar, DollarSign, Clock, Edit, Trash2, UserCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const employeeSchema = z.object({
  name: z.string().min(1, "Employee name is required"),
  employeeId: z.string().optional(),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z.string().min(1, "Department is required"),
  managerId: z.string().optional(),
  hireDate: z.string().optional(),
  salary: z.string().optional(),
  currency: z.string().default("USD"),
});

type EmployeeForm = z.infer<typeof employeeSchema>;

export default function HR() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEmployeeDialogOpen, setIsEmployeeDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: employees = [], isLoading: employeesLoading } = useQuery<any[]>({
    queryKey: ["/api/employees"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  // Calculate real statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((emp: any) => {
    // Assuming active status based on user data or employee status
    return users.find((user: any) => user.id === emp.userId)?.isActive !== false;
  }).length;
  
  // Mock payroll calculation - in real app this would come from API
  const monthlyPayroll = employees.reduce((sum, emp: any) => {
    return sum + Number(emp.salary || 0);
  }, 0);

  // Employee mutations
  const createEmployeeMutation = useMutation({
    mutationFn: async (data: EmployeeForm) => {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create employee');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/employees'] });
      setIsEmployeeDialogOpen(false);
      toast({ title: "Success", description: "Employee created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateEmployeeMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EmployeeForm }) => {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update employee');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/employees'] });
      setIsEditDialogOpen(false);
      setEditingEmployee(null);
      toast({ title: "Success", description: "Employee updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteEmployeeMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete employee');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/employees'] });
      toast({ title: "Success", description: "Employee deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const employeeForm = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      currency: "USD",
    },
  });

  const editForm = useForm<EmployeeForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      currency: "USD",
    },
  });

  const handleEditEmployee = (employee: any) => {
    setEditingEmployee(employee);
    editForm.reset({
      name: employee.name,
      employeeId: employee.employeeId || "",
      jobTitle: employee.jobTitle || "",
      department: employee.department || "",
      managerId: employee.managerId || "",
      hireDate: employee.hireDate ? new Date(employee.hireDate).toISOString().split('T')[0] : "",
      salary: employee.salary || "",
      currency: employee.currency || "USD",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
      deleteEmployeeMutation.mutate(employeeId);
    }
  };

  const filteredEmployees = employees.filter((employee: any) =>
    employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="hr-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="hr-title">
            Human Resources
          </h1>
          <p className="text-muted-foreground">Manage employees, attendance, and payroll</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" data-testid="button-timesheet">
            <Clock className="w-4 h-4 mr-2" />
            Timesheet
          </Button>
          <Button onClick={() => setIsEmployeeDialogOpen(true)} data-testid="button-new-employee">
            <Plus className="w-4 h-4 mr-2" />
            New Employee
          </Button>
        </div>
      </div>

      {/* HR Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-2xl font-bold">{totalEmployees}</p>
                <p className="text-sm text-green-600">+{Math.max(0, totalEmployees - 44)} this month</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Leave Today</p>
                <p className="text-2xl font-bold">{Math.max(0, totalEmployees - activeEmployees)}</p>
                <p className="text-sm text-muted-foreground">
                  {totalEmployees > 0 ? `${((Math.max(0, totalEmployees - activeEmployees) / totalEmployees) * 100).toFixed(1)}% of staff` : '0% of staff'}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payroll</p>
                <p className="text-2xl font-bold">${(monthlyPayroll / 1000).toFixed(1)}K</p>
                <p className="text-sm text-blue-600">Processing</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Positions</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Recruiting</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">📋</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Employee Directory */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Employee Directory</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search employees..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm" data-testid="button-view-all-employees">
                  View All
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {employeesLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-muted-foreground">Loading employees...</div>
              </div>
            ) : filteredEmployees.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No employees found</div>
                <Button onClick={() => setIsEmployeeDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first employee
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEmployees.slice(0, 5).map((employee: any) => {
                  const user = users.find((u: any) => u.id === employee.userId);
                  const isActive = user?.isActive !== false;
                  
                  return (
                    <div
                      key={employee.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                      data-testid={`employee-${employee.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {employee.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {employee.jobTitle} • {employee.department}
                            {employee.employeeId && ` • ID: ${employee.employeeId}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditEmployee(employee);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEmployee(employee.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                {filteredEmployees.length > 5 && (
                  <div className="text-center pt-2">
                    <Button variant="outline" size="sm">
                      View all {filteredEmployees.length} employees
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent HR Activities</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-hr-reports">
                Reports
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "hire", description: "New employee onboarding - Alex Chen", time: "2 hours ago", icon: "👋" },
                { type: "leave", description: "Leave request approved - Mike Johnson", time: "4 hours ago", icon: "📅" },
                { type: "promotion", description: "Promotion processed - Jane Smith", time: "1 day ago", icon: "🎉" },
                { type: "training", description: "Training completed - Team Security Workshop", time: "2 days ago", icon: "🎓" },
                { type: "payroll", description: "Payroll processed for November", time: "3 days ago", icon: "💰" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-muted rounded-lg"
                  data-testid={`hr-activity-${index}`}
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">{activity.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Present</p>
                  <p className="text-2xl font-bold text-green-900">{activeEmployees}</p>
                </div>
                <div className="text-green-600">
                  <UserCheck className="w-8 h-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-orange-800">On Leave</p>
                  <p className="text-2xl font-bold text-orange-900">{Math.max(0, totalEmployees - activeEmployees)}</p>
                </div>
                <div className="text-orange-600">
                  <Calendar className="w-8 h-8" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-800">Late</p>
                  <p className="text-2xl font-bold text-red-900">2</p>
                </div>
                <div className="text-red-600">
                  <Clock className="w-8 h-8" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming HR Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { event: "Team Building Workshop", date: "Nov 20", time: "2:00 PM", attendees: 25 },
                { event: "Performance Reviews", date: "Nov 25", time: "All Day", attendees: 47 },
                { event: "New Employee Orientation", date: "Dec 1", time: "9:00 AM", attendees: 3 },
                { event: "Holiday Party Planning", date: "Dec 5", time: "3:00 PM", attendees: 8 },
              ].map((event, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-border rounded-lg"
                  data-testid={`hr-event-${index}`}
                >
                  <div>
                    <p className="font-medium text-sm">{event.event}</p>
                    <p className="text-xs text-muted-foreground">{event.date} • {event.time}</p>
                  </div>
                  <Badge variant="outline">{event.attendees} people</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Create Employee Dialog */}
      <Dialog open={isEmployeeDialogOpen} onOpenChange={setIsEmployeeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={employeeForm.handleSubmit((data) => createEmployeeMutation.mutate(data))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="employee-name">Full Name *</Label>
                <Input {...employeeForm.register("name")} placeholder="Enter full name" />
                {employeeForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{employeeForm.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input {...employeeForm.register("employeeId")} placeholder="E.g. EMP001" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title *</Label>
                <Input {...employeeForm.register("jobTitle")} placeholder="Enter job title" />
                {employeeForm.formState.errors.jobTitle && (
                  <p className="text-sm text-red-500">{employeeForm.formState.errors.jobTitle.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Input {...employeeForm.register("department")} placeholder="Enter department" />
                {employeeForm.formState.errors.department && (
                  <p className="text-sm text-red-500">{employeeForm.formState.errors.department.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hire-date">Hire Date</Label>
                <Input {...employeeForm.register("hireDate")} type="date" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Select onValueChange={(value) => employeeForm.setValue("managerId", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user: any) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary">Salary</Label>
                <Input {...employeeForm.register("salary")} type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select onValueChange={(value) => employeeForm.setValue("currency", value)} defaultValue="USD">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={createEmployeeMutation.isPending}>
                {createEmployeeMutation.isPending ? "Creating..." : "Add Employee"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEmployeeDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Employee Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <form onSubmit={editForm.handleSubmit((data) => updateEmployeeMutation.mutate({ id: editingEmployee?.id, data }))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-employee-name">Full Name *</Label>
                <Input {...editForm.register("name")} placeholder="Enter full name" />
                {editForm.formState.errors.name && (
                  <p className="text-sm text-red-500">{editForm.formState.errors.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-employee-id">Employee ID</Label>
                <Input {...editForm.register("employeeId")} placeholder="E.g. EMP001" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-job-title">Job Title *</Label>
                <Input {...editForm.register("jobTitle")} placeholder="Enter job title" />
                {editForm.formState.errors.jobTitle && (
                  <p className="text-sm text-red-500">{editForm.formState.errors.jobTitle.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department *</Label>
                <Input {...editForm.register("department")} placeholder="Enter department" />
                {editForm.formState.errors.department && (
                  <p className="text-sm text-red-500">{editForm.formState.errors.department.message}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-hire-date">Hire Date</Label>
                <Input {...editForm.register("hireDate")} type="date" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-manager">Manager</Label>
                <Select onValueChange={(value) => editForm.setValue("managerId", value)} defaultValue={editingEmployee?.managerId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user: any) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-salary">Salary</Label>
                <Input {...editForm.register("salary")} type="number" placeholder="0.00" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-currency">Currency</Label>
                <Select onValueChange={(value) => editForm.setValue("currency", value)} defaultValue={editingEmployee?.currency || "USD"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={updateEmployeeMutation.isPending}>
                {updateEmployeeMutation.isPending ? "Updating..." : "Update Employee"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
