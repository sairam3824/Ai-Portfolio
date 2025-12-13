import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Send } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";
import avatar from "@/assets/avatar.png";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMessage?: string;
}

export const ChatDialog = ({ open, onOpenChange, initialMessage }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `web-session-${Date.now()}-${Math.random().toString(36).substring(7)}`);

  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (initialMessage && open) {
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    if (!webhookUrl) {
      toast({
        title: "Error!!!",
        description: "Unexpected Error occured.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: textToSend,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
      }

      // Get response text first to check if it's valid
      const responseText = await response.text();
      
      // Check if response is empty
      if (!responseText || responseText.trim() === '') {
        throw new Error('Empty response from webhook. Please check your n8n workflow is active and returning data.');
      }

      // Try to parse JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Failed to parse response:', responseText);
        throw new Error(`Invalid JSON response from webhook. Response: ${responseText.substring(0, 100)}...`);
      }

      // Check if the response has the expected structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format from webhook');
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply || data.response || data.message || "Sorry, I couldn't process that response.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message to n8n:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error occurred";

      toast({
        title: "Chatbot Error",
        description: `Failed to get response: ${errorMsg}`,
        variant: "destructive",
      });

      const errorMessage: Message = {
        role: "assistant",
        content: `Sorry, I'm having trouble connecting right now. Error: ${errorMsg}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl h-[600px] flex flex-col" aria-labelledby="chat-title" aria-describedby="chat-description">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle id="chat-title" className="flex items-center gap-2">
              <img src={avatar} alt="Sairam's avatar" className="w-8 h-8 rounded-full" aria-hidden="true" />
              Chat with Sairam
            </DialogTitle>
          </div>
          <div id="chat-description" className="sr-only">
            Interactive chat interface to ask questions about Sai Ram's portfolio, projects, and experience
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 p-4" role="log" aria-live="polite" aria-label="Chat conversation">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-8" role="status">
              <p>Start a conversation! Ask me anything about my work, projects, or interests.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              role="article"
              aria-label={`${message.role === "user" ? "Your message" : "Sairam's response"} at ${message.timestamp.toLocaleTimeString()}`}
            >
              {message.role === "assistant" && (
                <img src={avatar} alt="Sairam's avatar" className="w-8 h-8 rounded-full" aria-hidden="true" />
              )}
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  message.role === "user" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-60 mt-1" aria-label={`Sent at ${message.timestamp.toLocaleTimeString()}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3" role="status" aria-live="polite" aria-label="Sairam is typing">
              <img src={avatar} alt="Sairam's avatar" className="w-8 h-8 rounded-full" aria-hidden="true" />
              <div className="bg-secondary rounded-2xl px-4 py-3">
                <div className="flex gap-1" aria-hidden="true">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="sr-only">Sairam is typing a response</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
            role="form"
            aria-label="Send message form"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1"
              aria-label="Type your message to Sairam"
              aria-describedby="send-help"
            />
            <div id="send-help" className="sr-only">
              Press Enter or click the send button to send your message
            </div>
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};