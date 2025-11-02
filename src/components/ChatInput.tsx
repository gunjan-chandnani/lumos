import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Share what's on your mind..."
        disabled={disabled}
        className="resize-none min-h-[60px] max-h-[120px] rounded-2xl border-2 focus:border-primary/50 transition-colors"
        rows={2}
      />
      <Button
        type="submit"
        disabled={disabled || !input.trim()}
        className="h-[60px] px-6 rounded-2xl wellness-gradient-bg hover:opacity-90 transition-opacity warm-shadow text-white"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};

export default ChatInput;