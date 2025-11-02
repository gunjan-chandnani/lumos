import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isAssistant = role === "assistant";

  return (
    <div
      className={`flex gap-3 mb-4 animate-in slide-in-from-bottom-2 duration-300 ${
        isAssistant ? "justify-start" : "justify-end"
      }`}
    >
      {isAssistant && (
        <Avatar className="h-9 w-9 border-2 border-primary/20 gentle-shadow">
          <AvatarFallback className="wellness-gradient-bg text-white">
            <Bot className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={`rounded-2xl px-4 py-3 max-w-[80%] ${
          isAssistant
            ? "bg-card text-card-foreground gentle-shadow border border-border/50"
            : "wellness-gradient-bg text-white warm-shadow"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
      {!isAssistant && (
        <Avatar className="h-9 w-9 border-2 border-muted">
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;