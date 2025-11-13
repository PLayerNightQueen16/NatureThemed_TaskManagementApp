import { useState, useEffect } from "react";
import { Task, Priority, FilterStatus, SortOption } from "@/types/task";

const STORAGE_KEY = "taskmaster-tasks";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const tasksWithDates = parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
        }));
        setTasks(tasksWithDates);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, priority: Priority, description?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date() : undefined,
            }
          : task
      )
    );
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    if (selectedTaskId === id) {
      setSelectedTaskId(null);
    }
  };

  const deleteAllCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const filterTasks = (
    filterStatus: FilterStatus,
    priorityFilter: Priority | "all",
    searchQuery: string
  ) => {
    return tasks.filter((task) => {
      const statusMatch =
        filterStatus === "all" ||
        (filterStatus === "active" && !task.completed) ||
        (filterStatus === "completed" && task.completed);

      const priorityMatch =
        priorityFilter === "all" || task.priority === priorityFilter;

      const searchMatch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return statusMatch && priorityMatch && searchMatch;
    });
  };

  const sortTasks = (tasksToSort: Task[], sortBy: SortOption) => {
    const sorted = [...tasksToSort];
    switch (sortBy) {
      case "date":
        return sorted.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        );
      case "priority":
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return sorted.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      case "alphabetical":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : (completed / total) * 100;

    const byPriority = {
      critical: tasks.filter((t) => t.priority === "critical").length,
      high: tasks.filter((t) => t.priority === "high").length,
      medium: tasks.filter((t) => t.priority === "medium").length,
      low: tasks.filter((t) => t.priority === "low").length,
    };

    return { total, completed, active, progress, byPriority };
  };

  return {
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
  };
};
