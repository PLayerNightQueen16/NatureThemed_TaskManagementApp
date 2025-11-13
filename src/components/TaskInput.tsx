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
import { Plus, X, Sprout } from "lucide-react";

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
      <Button onClick={onClose} size="lg" className="w-full shadow-medium hover:shadow-soft transition-all">
        <Sprout className="mr-2 h-5 w-5" />
        Plant a New Task (N)
      </Button>
    );
  }

  return (
    <Card className="p-6 border-2 border-accent/30 shadow-medium bg-card/80 backdrop-blur-sm animate-gentle-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Sprout className="h-5 w-5 text-accent" />
            Plant a New Task
          </h3>
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
              <SelectItem value="critical">🌺 Urgent</SelectItem>
              <SelectItem value="high">🌲 High</SelectItem>
              <SelectItem value="medium">🌻 Medium</SelectItem>
              <SelectItem value="low">🌱 Low</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" className="flex-1 shadow-soft" disabled={!title.trim()}>
            <Sprout className="mr-2 h-4 w-4" />
            Plant Task
          </Button>
        </div>
      </form>
    </Card>
  );
};
