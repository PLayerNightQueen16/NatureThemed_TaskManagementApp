export type Priority = "critical" | "high" | "medium" | "low";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

export type FilterStatus = "all" | "active" | "completed";
export type SortOption = "date" | "priority" | "alphabetical";
