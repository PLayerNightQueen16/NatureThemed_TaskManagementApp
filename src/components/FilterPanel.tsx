import { Priority, FilterStatus } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, ListTodo, Leaf } from "lucide-react";

interface FilterPanelProps {
  priorityFilter: Priority | "all";
  statusFilter: FilterStatus;
  onPriorityChange: (priority: Priority | "all") => void;
  onStatusChange: (status: FilterStatus) => void;
  stats: {
    total: number;
    active: number;
    completed: number;
    byPriority: Record<Priority, number>;
  };
}

export const FilterPanel = ({
  priorityFilter,
  statusFilter,
  onPriorityChange,
  onStatusChange,
  stats,
}: FilterPanelProps) => {
  const priorityButtons = [
    { value: "all" as const, label: "All", emoji: "🌿", shortcut: "0" },
    { value: "critical" as const, label: "Urgent", emoji: "🌺", shortcut: "1" },
    { value: "high" as const, label: "High", emoji: "🌲", shortcut: "2" },
    { value: "medium" as const, label: "Medium", emoji: "🌻", shortcut: "3" },
    { value: "low" as const, label: "Low", emoji: "🌱", shortcut: "4" },
  ];

  return (
    <Card className="p-5 space-y-5 shadow-medium bg-card/70 backdrop-blur-sm border-border/50 animate-gentle-fade-in">
      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Leaf className="h-4 w-4 text-accent" />
          Garden Status
        </h3>
        <Tabs value={statusFilter} onValueChange={(v) => onStatusChange(v as FilterStatus)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all" className="gap-2">
              <ListTodo className="h-4 w-4" />
              All
              <Badge variant="secondary" className="ml-1">
                {stats.total}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="active" className="gap-2">
              <Circle className="h-4 w-4" />
              Active
              <Badge variant="secondary" className="ml-1">
                {stats.active}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="gap-2">
              <CheckCircle2 className="h-4 w-4" />
              Done
              <Badge variant="secondary" className="ml-1">
                {stats.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <Leaf className="h-4 w-4 text-accent" />
          Growth Priority
        </h3>
        <div className="flex flex-wrap gap-2">
          {priorityButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={priorityFilter === btn.value ? "default" : "outline"}
              size="sm"
              onClick={() => onPriorityChange(btn.value)}
              className="gap-1.5 shadow-soft hover:shadow-medium transition-all"
            >
              <span>{btn.emoji}</span>
              <span>{btn.label}</span>
              {btn.value !== "all" && (
                <Badge variant="secondary" className="ml-1">
                  {stats.byPriority[btn.value as Priority]}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground ml-1">
                {btn.shortcut}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};
