import { useState, useRef, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { FilterPanel } from "@/components/FilterPanel";
import { ProgressBar } from "@/components/ProgressBar";
import { KeyboardShortcutsDialog } from "@/components/KeyboardShortcutsDialog";
import { EditTaskDialog } from "@/components/EditTaskDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority, FilterStatus, SortOption } from "@/types/task";
import { Search, Keyboard, Trash2, Leaf, Flower, TreeDeciduous } from "lucide-react";
import { BotanicalBackground } from "@/components/BotanicalBackground";
import { toast } from "sonner";

const Index = () => {
  const {
    tasks,
    selectedTaskId,
    setSelectedTaskId,
    addTask,
    toggleTask,
    updateTask,
    deleteTask,
    deleteAllCompleted,
    filterTasks,
    sortTasks,
    getStats,
  } = useTasks();

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const stats = getStats();
  const filteredTasks = filterTasks(statusFilter, priorityFilter, searchQuery);
  const sortedTasks = sortTasks(filteredTasks, sortBy);

  const selectedTask = tasks.find((t) => t.id === selectedTaskId) || null;
  const editingTaskObj = tasks.find((t) => t.id === editingTask) || null;

  // Auto-select first task if none selected
  useEffect(() => {
    if (sortedTasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(sortedTasks[0].id);
    }
  }, [sortedTasks, selectedTaskId, setSelectedTaskId]);

  const handleNavigateNext = () => {
    const currentIndex = sortedTasks.findIndex((t) => t.id === selectedTaskId);
    if (currentIndex < sortedTasks.length - 1) {
      setSelectedTaskId(sortedTasks[currentIndex + 1].id);
    }
  };

  const handleNavigatePrev = () => {
    const currentIndex = sortedTasks.findIndex((t) => t.id === selectedTaskId);
    if (currentIndex > 0) {
      setSelectedTaskId(sortedTasks[currentIndex - 1].id);
    }
  };

  useKeyboardShortcuts({
    onNewTask: () => setIsInputOpen(true),
    onToggleHelp: () => setShowHelp((prev) => !prev),
    onSearch: () => searchInputRef.current?.focus(),
    onFilterPriority: setPriorityFilter,
    onToggleTask: () => {
      if (selectedTaskId) {
        toggleTask(selectedTaskId);
        toast.success("Task toggled");
      }
    },
    onEditTask: () => {
      if (selectedTaskId) {
        setEditingTask(selectedTaskId);
      }
    },
    onDeleteTask: () => {
      if (selectedTaskId) {
        deleteTask(selectedTaskId);
        toast.success("Task deleted");
      }
    },
    onNavigateNext: handleNavigateNext,
    onNavigatePrev: handleNavigatePrev,
    onEscape: () => {
      setIsInputOpen(false);
      setEditingTask(null);
    },
    onSelectAll: () => {
      toast.info("Select all functionality - future feature");
    },
  });

  const handleAddTask = (title: string, priority: Priority, description?: string) => {
    addTask(title, priority, description);
    toast.success("Task created successfully!");
  };

  const handleDeleteAllCompleted = () => {
    const completedCount = stats.completed;
    if (completedCount > 0) {
      deleteAllCompleted();
      toast.success(`Deleted ${completedCount} completed task${completedCount > 1 ? 's' : ''}`);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <BotanicalBackground />
      
      <div className="container max-w-7xl mx-auto py-10 px-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-gentle-fade-in">
          <div>
            <h1 className="text-5xl font-bold mb-2 flex items-center gap-3 text-accent">
              <TreeDeciduous className="h-12 w-12 animate-gentle-bounce" />
              Garden of Tasks
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-lg">
              <Leaf className="h-4 w-4 text-accent" />
              Cultivate productivity in your peaceful digital meadow
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowHelp(true)}
            className="gap-2 shadow-soft hover:shadow-medium transition-all"
          >
            <Flower className="h-4 w-4 text-accent" />
            Shortcuts (?)
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <ProgressBar
            progress={stats.progress}
            completed={stats.completed}
            total={stats.total}
          />
        </div>

        <div className="grid lg:grid-cols-[300px,1fr] gap-6">
          {/* Sidebar */}
          <aside className="space-y-6">
            <FilterPanel
              priorityFilter={priorityFilter}
              statusFilter={statusFilter}
              onPriorityChange={setPriorityFilter}
              onStatusChange={setStatusFilter}
              stats={stats}
            />

            {stats.completed > 0 && (
              <Button
                variant="destructive"
                className="w-full gap-2 shadow-soft hover:shadow-medium transition-all"
                onClick={handleDeleteAllCompleted}
              >
                <Trash2 className="h-4 w-4" />
                Clear Harvested ({stats.completed})
              </Button>
            )}
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            {/* Task Input */}
            <TaskInput
              onAdd={handleAddTask}
              isOpen={isInputOpen}
              onClose={() => setIsInputOpen(!isInputOpen)}
            />

            {/* Search & Sort */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  placeholder="Search tasks... (/)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="priority">Sort by Priority</SelectItem>
                  <SelectItem value="alphabetical">Sort A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Task List */}
            <div className="space-y-4">
              {sortedTasks.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  {searchQuery || priorityFilter !== "all" || statusFilter !== "all" ? (
                    <div className="flex flex-col items-center gap-2">
                      <Leaf className="h-12 w-12 text-accent/50 animate-gentle-bounce" />
                      <p>No plants match your search in this garden</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <TreeDeciduous className="h-16 w-16 text-accent/50 animate-gentle-bounce" />
                      <p className="text-lg">Your garden is waiting to bloom!</p>
                      <p className="text-sm">Press <kbd className="px-2 py-1 bg-accent/10 rounded">N</kbd> to plant your first seed</p>
                    </div>
                  )}
                </div>
              ) : (
                sortedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    isSelected={task.id === selectedTaskId}
                    onToggle={() => toggleTask(task.id)}
                    onEdit={() => setEditingTask(task.id)}
                    onDelete={() => {
                      deleteTask(task.id);
                      toast.success("Task deleted");
                    }}
                    onSelect={() => setSelectedTaskId(task.id)}
                  />
                ))
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Dialogs */}
      <KeyboardShortcutsDialog open={showHelp} onOpenChange={setShowHelp} />
      <EditTaskDialog
        task={editingTaskObj}
        open={!!editingTask}
        onOpenChange={(open) => !open && setEditingTask(null)}
        onUpdate={updateTask}
      />
    </div>
  );
};

export default Index;
