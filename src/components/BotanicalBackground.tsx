import { Leaf, Droplet, Flower2, Sprout, Trees, Flower } from "lucide-react";

export const BotanicalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {/* Floating leaves - more variety */}
      <Leaf
        className="absolute top-20 left-10 text-accent animate-leaf-float"
        size={40}
        style={{ animationDelay: "0s" }}
      />
      <Leaf
        className="absolute top-40 right-20 text-accent animate-leaf-float"
        size={30}
        style={{ animationDelay: "1s" }}
      />
      <Leaf
        className="absolute top-60 left-1/3 text-accent/80 animate-leaf-float"
        size={35}
        style={{ animationDelay: "0.7s" }}
      />
      <Leaf
        className="absolute bottom-60 right-2/3 text-accent/70 animate-leaf-float"
        size={38}
        style={{ animationDelay: "1.8s" }}
      />
      <Leaf
        className="absolute top-1/2 left-20 text-accent/60 animate-leaf-float"
        size={32}
        style={{ animationDelay: "2.2s" }}
      />
      
      {/* Sprouts and growth */}
      <Sprout
        className="absolute bottom-40 left-1/4 text-accent animate-gentle-bounce"
        size={35}
        style={{ animationDelay: "2s" }}
      />
      <Sprout
        className="absolute top-1/4 right-1/2 text-accent animate-gentle-bounce"
        size={28}
        style={{ animationDelay: "1.2s" }}
      />
      <Sprout
        className="absolute bottom-1/3 right-1/4 text-accent/80 animate-gentle-bounce"
        size={32}
        style={{ animationDelay: "2.8s" }}
      />
      
      {/* Colorful flowers */}
      <Flower2
        className="absolute top-1/2 right-10 text-destructive/70 animate-gentle-bounce"
        size={45}
        style={{ animationDelay: "0.5s" }}
      />
      <Flower2
        className="absolute bottom-1/4 left-1/3 text-destructive/60 animate-gentle-bounce"
        size={38}
        style={{ animationDelay: "1.6s" }}
      />
      <Flower
        className="absolute top-1/3 left-1/4 text-priority-medium/70 animate-gentle-bounce"
        size={42}
        style={{ animationDelay: "0.9s" }}
      />
      <Flower
        className="absolute bottom-1/2 right-1/3 text-priority-medium/80 animate-gentle-bounce"
        size={36}
        style={{ animationDelay: "2.4s" }}
      />
      <Flower2
        className="absolute top-3/4 right-1/4 text-destructive/50 animate-gentle-bounce"
        size={40}
        style={{ animationDelay: "1.9s" }}
      />
      
      {/* Trees and branches */}
      <Trees
        className="absolute bottom-10 left-10 text-accent/40 animate-sway"
        size={60}
        style={{ animationDelay: "0s" }}
      />
      <Trees
        className="absolute top-10 right-1/3 text-accent/50 animate-sway"
        size={55}
        style={{ animationDelay: "1.5s" }}
      />
      
      {/* Water droplets */}
      <Droplet
        className="absolute top-1/3 left-1/3 text-primary animate-water-shimmer"
        size={25}
        style={{ animationDelay: "0s" }}
      />
      <Droplet
        className="absolute bottom-1/3 right-1/3 text-primary animate-water-shimmer"
        size={20}
        style={{ animationDelay: "1.5s" }}
      />
      <Droplet
        className="absolute top-2/3 left-1/2 text-primary animate-water-shimmer"
        size={18}
        style={{ animationDelay: "3s" }}
      />
      <Droplet
        className="absolute top-1/4 right-1/4 text-primary/80 animate-water-shimmer"
        size={22}
        style={{ animationDelay: "2.1s" }}
      />
      <Droplet
        className="absolute bottom-1/4 left-2/3 text-primary/70 animate-water-shimmer"
        size={19}
        style={{ animationDelay: "0.8s" }}
      />
      
      {/* More botanical elements */}
      <Leaf
        className="absolute bottom-20 right-1/4 text-accent/70 animate-leaf-float"
        size={35}
        style={{ animationDelay: "2.5s" }}
      />
      <Leaf
        className="absolute top-1/3 right-10 text-accent/50 animate-leaf-float"
        size={28}
        style={{ animationDelay: "3.2s" }}
      />
      <Sprout
        className="absolute top-3/4 left-1/4 text-accent/90 animate-gentle-bounce"
        size={30}
        style={{ animationDelay: "3.5s" }}
      />
    </div>
  );
};
