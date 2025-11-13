import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, TrendingUp } from "lucide-react";

interface ProgressBarProps {
  progress: number;
  completed: number;
  total: number;
}

export const ProgressBar = ({ progress, completed, total }: ProgressBarProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Progress</h2>
          </div>
          <div className="text-2xl font-bold text-primary">
            {Math.round(progress)}%
          </div>
        </div>

        <Progress value={progress} className="h-3" />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {completed} completed
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Circle className="h-4 w-4" />
            <span>
              {total - completed} remaining
            </span>
          </div>
        </div>

        {total === 0 && (
          <p className="text-center text-sm text-muted-foreground">
            No tasks yet. Create your first task to get started!
          </p>
        )}

        {completed === total && total > 0 && (
          <div className="text-center">
            <p className="text-sm font-medium text-primary">
              🎉 All tasks completed! Great job!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
