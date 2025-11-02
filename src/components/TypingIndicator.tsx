import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4 animate-in slide-in-from-bottom-2 duration-300">
      <Avatar className="h-9 w-9 border-2 border-primary/20 gentle-shadow">
        <AvatarFallback className="wellness-gradient-bg text-white">
          <Bot className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="rounded-2xl px-4 py-3 bg-card border border-border/50 gentle-shadow">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary/60 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;