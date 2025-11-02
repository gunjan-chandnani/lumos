import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import { streamChat } from "@/utils/chatApi";
import { useToast } from "@/hooks/use-toast";

type Message = { role: "user" | "assistant"; content: string };

const ChatCompanion = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI companion here to provide a safe, confidential space for you to share your thoughts and feelings. How are you feeling today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (input: string) => {
    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantContent = "";
    const upsertAssistant = (nextChunk: string) => {
      assistantContent += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantContent } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantContent }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg],
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
        onError: (error) => {
          console.error("Chat error:", error);
          setIsLoading(false);
          toast({
            title: "Error",
            description: error.message || "Failed to get response. Please try again.",
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="absolute inset-0 wellness-gradient-bg rounded-full blur-md opacity-50"></div>
            <div className="relative w-12 h-12 rounded-full wellness-gradient-bg flex items-center justify-center gentle-shadow">
              <Heart className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Companion
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              Your mental health companion
            </p>
          </div>
        </div>
        <p className="text-muted-foreground">
          Your confidential space for mental wellness support. Everything shared here is private and judgment-free.
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="h-[600px] flex flex-col gentle-shadow border-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          <div className="space-y-1">
            {messages.map((msg, idx) => (
              <ChatMessage key={idx} role={msg.role} content={msg.content} />
            ))}
            {isLoading && <TypingIndicator />}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-6 border-t border-border/50">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
          <p className="text-xs text-muted-foreground text-center mt-3">
            AI Companion provides supportive conversation but is not a substitute for professional mental health care.
          </p>
        </div>
      </Card>

      {/* Crisis Support Banner */}
      <Card className="mt-6 p-6 uplifting-gradient-bg text-white gentle-shadow border-0">
        <div className="flex items-start space-x-4">
          <Heart className="w-8 h-8 text-white flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-lg mb-2">Need Immediate Support?</h3>
            <p className="text-white/90 mb-4">
              If you're experiencing a mental health crisis, please reach out to professional help immediately.
            </p>
            <div className="space-y-2 text-sm text-white/90">
              <p><strong>Suicide Prevention Helpline:</strong> 108 (24/7)</p>
              <p><strong>NIMHANS Helpline:</strong> +91 80 4611 0007</p>
              <p><strong>Sneha Foundation:</strong> +91 44 2464 0050</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ChatCompanion;