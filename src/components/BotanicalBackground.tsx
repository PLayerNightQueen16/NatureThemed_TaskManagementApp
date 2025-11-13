import { Leaf, Droplet, Flower2, Sprout } from "lucide-react";

export const BotanicalBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20 z-0">
      {/* Floating leaves */}
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
      <Sprout
        className="absolute bottom-40 left-1/4 text-accent animate-gentle-bounce"
        size={35}
        style={{ animationDelay: "2s" }}
      />
      <Flower2
        className="absolute top-1/2 right-10 text-accent/60 animate-gentle-bounce"
        size={45}
        style={{ animationDelay: "0.5s" }}
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

      {/* More botanical elements */}
      <Leaf
        className="absolute bottom-20 right-1/4 text-accent/70 animate-leaf-float"
        size={35}
        style={{ animationDelay: "2.5s" }}
      />
      <Sprout
        className="absolute top-1/4 right-1/2 text-accent animate-gentle-bounce"
        size={28}
        style={{ animationDelay: "1.2s" }}
      />
    </div>
  );
};
