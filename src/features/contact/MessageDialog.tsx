import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/shared/ui/dialog";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { Send, MessageSquare } from "lucide-react";
import { useToast } from "@/shared/hooks/use-toast";
import { supabase } from "@/config/supabase";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MessageDialog = ({ open, onOpenChange }: MessageDialogProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please write a message before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("contact_messages")
        .insert([{ 
          message: message.trim(),
          user_agent: navigator.userAgent 
        }]);

      if (!error) {
        toast({
          title: "Message Sent! 🎉",
          description: "Your anonymous message has been delivered successfully.",
        });

        setMessage("");
        onOpenChange(false);
      } else {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error sending anonymous message:", error);
      
      toast({
        title: "Failed to Send",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Send Message
          </DialogTitle>
          <DialogDescription>
            Your message will be sent anonymously. No personal information will be collected.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSendMessage} className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message here... (feedback, suggestions, questions, etc.)"
            className="min-h-[150px] resize-none"
            disabled={isLoading}
          />

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
