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
import { Plus, Search, Filter, FolderOpen, Users, Calendar, CheckCircle, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  partnerId: z.string().optional(),
  managerId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  state: z.string().default("active"),
});

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  projectId: z.string().min(1, "Project is required"),
  assignedTo: z.string().optional(),
  stage: z.string().default("todo"),
  priority: z.string().default("normal"),
  dueDate: z.string().optional(),
});

type ProjectForm = z.infer<typeof projectSchema>;
type TaskForm = z.infer<typeof taskSchema>;

export default function Project() {
  const [view, setView] = useState("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery<any[]>({
    queryKey: ["/api/tasks"],
  });

  const { data: users = [] } = useQuery<any[]>({
    queryKey: ["/api/users"],
  });

  const { data: partners = [] } = useQuery<any[]>({
    queryKey: ["/api/partners"],
  });

  // Project mutations
  const createProjectMutation = useMutation({
    mutationFn: async (data: ProjectForm) => {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create project');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsProjectDialogOpen(false);
      toast({ title: "Success", description: "Project created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProjectForm }) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update project');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setIsEditProjectDialogOpen(false);
      setEditingProject(null);
      toast({ title: "Success", description: "Project updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({ title: "Success", description: "Project deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  // Task mutations
  const createTaskMutation = useMutation({
    mutationFn: async (data: TaskForm) => {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to create task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      setIsTaskDialogOpen(false);
      toast({ title: "Success", description: "Task created successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TaskForm }) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      setIsEditTaskDialogOpen(false);
      setEditingTask(null);
      toast({ title: "Success", description: "Task updated successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
      toast({ title: "Success", description: "Task deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });

  const filteredProjects = projects.filter((project: any) =>
    project.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tasksByStage = {
    todo: (tasks as any[]).filter((task: any) => task.stage === "todo"),
    doing: (tasks as any[]).filter((task: any) => task.stage === "doing"),
    done: (tasks as any[]).filter((task: any) => task.stage === "done"),
  };

  return (
    <div className="flex-1 overflow-y-auto p-6" data-testid="project-content">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="project-title">
            Project Management
          </h1>
          <p className="text-muted-foreground">Plan, track, and manage your projects and tasks</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setIsTaskDialogOpen(true)} data-testid="button-create-task">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
          <Button onClick={() => setIsProjectDialogOpen(true)} data-testid="button-create-project">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{(projects as any[]).filter((p: any) => p.state === "active").length}</p>
                <p className="text-sm text-green-600">On Track</p>
              </div>
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{(tasks as any[]).length}</p>
                <p className="text-sm text-blue-600">Across all projects</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Team Members</p>
                <p className="text-2xl font-bold">28</p>
                <p className="text-sm text-purple-600">Available</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Deadlines This Week</p>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-orange-600">Upcoming</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-projects"
          />
        </div>
        <Button variant="outline" data-testid="button-filter-projects">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <ViewTabs activeView={view} onViewChange={setView} />
      </div>

      {/* Kanban View - Task Board */}
      {view === "kanban" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(tasksByStage).map(([stage, stageTasks]) => (
            <Card key={stage} className="bg-muted">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium capitalize">
                    {stage === "todo" ? "To Do" : stage === "doing" ? "In Progress" : "Done"}
                  </CardTitle>
                  <Badge variant="secondary">{stageTasks.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {stageTasks.map((task: any) => (
                  <div
                    key={task.id}
                    className="kanban-card bg-card p-3 rounded-md border border-border cursor-pointer"
                    data-testid={`task-card-${task.id}`}
                  >
                    <h4 className="font-medium text-sm mb-2">{task.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{task.project}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {task.priority || "Normal"}
                      </Badge>
                      {task.dueDate && (
                        <span className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {stageTasks.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No tasks
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View - Projects */}
      {view === "list" && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projectsLoading ? (
              <div className="flex items-center justify-center h-48">
                <div className="text-muted-foreground">Loading projects...</div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">No projects found</div>
                <Button data-testid="button-create-first-project">
                  <Plus className="w-4 h-4 mr-2" />
                  Create your first project
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project: any) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer"
                    data-testid={`project-item-${project.id}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <FolderOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {(tasks as any[]).filter((t: any) => t.projectId === project.id).length} tasks
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {project.startDate ? `Started: ${new Date(project.startDate).toLocaleDateString()}` : "Not started"}
                        </p>
                      </div>
                      <Badge variant={project.state === "active" ? "default" : "secondary"}>
                        {project.state}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Calendar View */}
      {view === "calendar" && (
        <Card>
          <CardHeader>
            <CardTitle>Project Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <div className="text-muted-foreground mb-2">Calendar view coming soon</div>
              <p className="text-sm text-muted-foreground">
                Visual timeline for project milestones and deadlines
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Create Project Dialog */}
      <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            createProjectMutation.mutate(data as ProjectForm);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input id="project-name" name="name" placeholder="Enter project name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea id="project-description" name="description" placeholder="Project description" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project-start">Start Date</Label>
                <Input id="project-start" name="startDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-end">End Date</Label>
                <Input id="project-end" name="endDate" type="date" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-partner">Customer/Partner</Label>
              <Select name="partnerId">
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {partners.filter((p: any) => p.isCustomer).map((partner: any) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-manager">Project Manager</Label>
              <Select name="managerId">
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
            
            <div className="space-y-2">
              <Label htmlFor="project-state">Status</Label>
              <Select name="state" defaultValue="active">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={createProjectMutation.isPending}>
                {createProjectMutation.isPending ? "Creating..." : "Create Project"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsProjectDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Task Dialog */}
      <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const data = Object.fromEntries(formData);
            createTaskMutation.mutate(data as TaskForm);
          }} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="task-name">Task Name *</Label>
              <Input id="task-name" name="name" placeholder="Enter task name" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-description">Description</Label>
              <Textarea id="task-description" name="description" placeholder="Task description" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="task-project">Project *</Label>
              <Select name="projectId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project: any) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-assignee">Assign To</Label>
                <Select name="assignedTo">
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
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
              
              <div className="space-y-2">
                <Label htmlFor="task-priority">Priority</Label>
                <Select name="priority" defaultValue="normal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="task-stage">Stage</Label>
                <Select name="stage" defaultValue="todo">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="doing">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-due">Due Date</Label>
                <Input id="task-due" name="dueDate" type="date" />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="flex-1" disabled={createTaskMutation.isPending}>
                {createTaskMutation.isPending ? "Creating..." : "Create Task"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsTaskDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
