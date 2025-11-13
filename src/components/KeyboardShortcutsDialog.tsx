import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { KEYBOARD_SHORTCUTS } from "@/hooks/useKeyboardShortcuts";
import { Keyboard, Leaf } from "lucide-react";

interface KeyboardShortcutsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const KeyboardShortcutsDialog = ({
  open,
  onOpenChange,
}: KeyboardShortcutsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl shadow-medium border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Leaf className="h-6 w-6 text-accent animate-gentle-bounce" />
            Garden Shortcuts
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Keyboard className="h-4 w-4" />
            Tend to your garden with ease using these shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <span className="text-sm">{shortcut.description}</span>
              <Badge variant="outline" className="font-mono text-xs">
                {shortcut.key}
              </Badge>
            </div>
          ))}
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border/50 shadow-soft">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Leaf className="h-4 w-4 text-accent" />
            <strong>Garden tip:</strong> Press <Badge variant="outline" className="mx-1">?</Badge> anytime to see these shortcuts
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
