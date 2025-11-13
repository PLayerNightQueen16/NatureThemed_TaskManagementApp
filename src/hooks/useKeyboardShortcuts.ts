import { useEffect, useCallback } from "react";
import { Priority } from "@/types/task";

export interface KeyboardShortcutHandlers {
  onNewTask: () => void;
  onToggleHelp: () => void;
  onSearch: () => void;
  onFilterPriority: (priority: Priority | "all") => void;
  onToggleTask: () => void;
  onEditTask: () => void;
  onDeleteTask: () => void;
  onNavigateNext: () => void;
  onNavigatePrev: () => void;
  onEscape: () => void;
  onSelectAll: () => void;
}

export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignore shortcuts when typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        if (e.key === "Escape") {
          handlers.onEscape();
        }
        return;
      }

      // Single key shortcuts
      switch (e.key.toLowerCase()) {
        case "n":
          e.preventDefault();
          handlers.onNewTask();
          break;
        case "?":
          e.preventDefault();
          handlers.onToggleHelp();
          break;
        case "/":
          e.preventDefault();
          handlers.onSearch();
          break;
        case " ":
          e.preventDefault();
          handlers.onToggleTask();
          break;
        case "e":
          e.preventDefault();
          handlers.onEditTask();
          break;
        case "d":
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            handlers.onDeleteTask();
          }
          break;
        case "escape":
          handlers.onEscape();
          break;
        case "arrowdown":
          e.preventDefault();
          handlers.onNavigateNext();
          break;
        case "arrowup":
          e.preventDefault();
          handlers.onNavigatePrev();
          break;
        case "1":
          e.preventDefault();
          handlers.onFilterPriority("critical");
          break;
        case "2":
          e.preventDefault();
          handlers.onFilterPriority("high");
          break;
        case "3":
          e.preventDefault();
          handlers.onFilterPriority("medium");
          break;
        case "4":
          e.preventDefault();
          handlers.onFilterPriority("low");
          break;
        case "0":
          e.preventDefault();
          handlers.onFilterPriority("all");
          break;
        case "a":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handlers.onSelectAll();
          }
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

export const KEYBOARD_SHORTCUTS = [
  { key: "N", description: "Plant a new task" },
  { key: "Space", description: "Toggle task growth status" },
  { key: "E", description: "Tend to selected task" },
  { key: "D", description: "Remove task from garden" },
  { key: "/", description: "Search your garden" },
  { key: "?", description: "View garden shortcuts" },
  { key: "↑/↓", description: "Browse through plants" },
  { key: "1", description: "Filter urgent blooms" },
  { key: "2", description: "Filter high growth" },
  { key: "3", description: "Filter medium growth" },
  { key: "4", description: "Filter low growth" },
  { key: "0", description: "View entire garden" },
  { key: "Esc", description: "Close garden tools" },
  { key: "Ctrl+A", description: "Select all plants" },
];
