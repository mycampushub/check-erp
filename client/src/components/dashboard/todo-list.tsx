import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    task: "Follow up with ABC Corp on proposal",
    due: "Today 5:00 PM",
    priority: "High",
    completed: false
  },
  {
    id: 2,
    task: "Review inventory levels for Q4",
    due: "Tomorrow 2:00 PM",
    priority: "Medium",
    completed: false
  },
  {
    id: 3,
    task: "Send quarterly report to stakeholders",
    due: "Completed: Yesterday",
    priority: "Done",
    completed: true
  },
  {
    id: 4,
    task: "Prepare for board meeting presentation",
    due: "Friday 10:00 AM",
    priority: "Normal",
    completed: false
  }
];

const priorityConfig = {
  High: { variant: "destructive" as const, color: "bg-red-100 text-red-600" },
  Medium: { variant: "secondary" as const, color: "bg-orange-100 text-orange-600" },
  Normal: { variant: "outline" as const, color: "bg-blue-100 text-blue-600" },
  Done: { variant: "default" as const, color: "bg-green-100 text-green-600" }
};

interface TodoListProps {
  "data-testid"?: string;
}

export default function TodoList({ "data-testid": testId }: TodoListProps) {
  const [todos, setTodos] = useState(initialTodos);

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <Card data-testid={testId}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">My To-Do</CardTitle>
          <Button 
            variant="link" 
            className="text-primary text-sm hover:underline p-0"
            data-testid="button-add-task"
          >
            Add Task
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {todos.map((todo) => {
            const priorityStyle = priorityConfig[todo.priority as keyof typeof priorityConfig];
            
            return (
              <div 
                key={todo.id}
                className={`flex items-center space-x-3 p-3 bg-muted rounded-lg ${
                  todo.completed ? 'opacity-75' : ''
                }`}
                data-testid={`todo-item-${todo.id}`}
              >
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                  className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  data-testid={`checkbox-todo-${todo.id}`}
                />
                <div className="flex-1">
                  <p 
                    className={`text-sm ${todo.completed ? 'line-through' : ''}`}
                    data-testid={`todo-task-${todo.id}`}
                  >
                    {todo.task}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`todo-due-${todo.id}`}>
                    {todo.due}
                  </p>
                </div>
                <Badge 
                  variant={priorityStyle.variant}
                  data-testid={`todo-priority-${todo.id}`}
                >
                  {todo.priority}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
