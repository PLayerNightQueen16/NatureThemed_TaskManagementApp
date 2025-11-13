import { useState, useRef, useEffect } from "react";
import { Priority } from "@/types/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

interface TaskInputProps {
  onAdd: (title: string, priority: Priority, description?: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskInput = ({ onAdd, isOpen, onClose }: TaskInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      titleInputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, priority, description || undefined);
      setTitle("");
      setDescription("");
      setPriority("medium");
      onClose();
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={onClose} size="lg" className="w-full">
        <Plus className="mr-2 h-5 w-5" />
        New Task (N)
      </Button>
    );
  }

  return (
    <Card className="p-4 border-2 border-primary">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Create New Task</h3>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Input
          ref={titleInputRef}
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg"
        />

        <Textarea
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex gap-3">
          <Select
            value={priority}
            onValueChange={(value) => setPriority(value as Priority)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="critical">🔴 Critical</SelectItem>
              <SelectItem value="high">🟠 High</SelectItem>
              <SelectItem value="medium">🟡 Medium</SelectItem>
              <SelectItem value="low">🟢 Low</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="flex-1" disabled={!title.trim()}>
            Create Task
          </Button>
        </div>
      </form>
    </Card>
  );
};
