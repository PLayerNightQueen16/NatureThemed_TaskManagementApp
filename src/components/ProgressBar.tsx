import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Circle, Sprout, Flower2 } from "lucide-react";

interface ProgressBarProps {
  progress: number;
  completed: number;
  total: number;
}

const RainingFlowers = () => {
  const flowerEmojis = ['🌸', '🌺', '🌻', '🌼', '🌷', '🏵️', '💐', '🌹'];
  const flowers = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
    size: 24 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.left}%`,
            fontSize: `${flower.size}px`,
            animation: `petal-fall ${flower.duration}s ease-in forwards`,
            animationDelay: `${flower.delay}s`,
          }}
        >
          {flower.emoji}
        </div>
      ))}
    </div>
  );
};

export const ProgressBar = ({ progress, completed, total }: ProgressBarProps) => {
  const isComplete = completed === total && total > 0;
  
  return (
    <Card className="p-6 shadow-medium bg-card/70 backdrop-blur-sm border-border/50 animate-gentle-fade-in relative overflow-hidden">
      <Flower2 className="absolute -right-4 -top-4 h-24 w-24 text-accent/10 animate-gentle-bounce" />
      
      {isComplete && <RainingFlowers />}
      
      <div className="space-y-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sprout className="h-6 w-6 text-accent animate-gentle-bounce" />
            <h2 className="text-xl font-semibold">Garden Growth</h2>
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
            🌱 Your garden awaits. Plant your first seed to begin growing!
          </p>
        )}

        {isComplete && (
          <div className="text-center">
            <p className="text-sm font-medium text-accent flex items-center justify-center gap-2">
              <Flower2 className="h-5 w-5 animate-gentle-bounce" />
              Garden in full bloom! Beautiful work! 🌸
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
