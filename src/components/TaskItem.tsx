import { Task, Priority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Clock, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
  isSelected: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSelect: () => void;
}

const priorityConfig: Record<
  Priority,
  { label: string; className: string; emoji: string }
> = {
  critical: {
    label: "Critical",
    className: "bg-priority-critical text-priority-critical-foreground",
    emoji: "🔴",
  },
  high: {
    label: "High",
    className: "bg-priority-high text-priority-high-foreground",
    emoji: "🟠",
  },
  medium: {
    label: "Medium",
    className: "bg-priority-medium text-priority-medium-foreground",
    emoji: "🟡",
  },
  low: {
    label: "Low",
    className: "bg-priority-low text-priority-low-foreground",
    emoji: "🟢",
  },
};

export const TaskItem = ({
  task,
  isSelected,
  onToggle,
  onEdit,
  onDelete,
  onSelect,
}: TaskItemProps) => {
  const priorityInfo = priorityConfig[task.priority];

  return (
    <Card
      className={cn(
        "p-4 transition-all hover:shadow-md cursor-pointer",
        isSelected && "ring-2 ring-primary ring-offset-2",
        task.completed && "bg-task-completed"
      )}
      onClick={onSelect}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={onToggle}
          onClick={(e) => e.stopPropagation()}
          className="mt-1"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-2">
            <h3
              className={cn(
                "text-lg font-medium flex-1",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
            <Badge className={priorityConfig[task.priority].className}>
              {priorityInfo.emoji} {priorityInfo.label}
            </Badge>
          </div>

          {task.description && (
            <p
              className={cn(
                "text-sm mb-3",
                task.completed
                  ? "text-muted-foreground line-through"
                  : "text-foreground"
              )}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Created: {format(task.createdAt, "MMM d, yyyy HH:mm")}</span>
            </div>
            {task.completed && task.completedAt && (
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                <span>
                  Completed: {format(task.completedAt, "MMM d, yyyy HH:mm")}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEdit}
            className="h-8 w-8"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            className="h-8 w-8 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
