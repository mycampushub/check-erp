import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ViewTabs from "@/components/common/view-tabs";
import { Plus, Search, Filter, FolderOpen, Users, Calendar, CheckCircle } from "lucide-react";

export default function Project() {
  const [view, setView] = useState("kanban");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: projects = [], isLoading: projectsLoading } = useQuery<any[]>({
    queryKey: ["/api/projects"],
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery<any[]>({
    queryKey: ["/api/tasks"],
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
          <Button variant="outline" data-testid="button-create-task">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
          <Button data-testid="button-create-project">
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
    </div>
  );
}
