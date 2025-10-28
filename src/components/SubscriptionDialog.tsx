import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SubscriptionDialog = ({ open, onOpenChange }: SubscriptionDialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-title"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <h3 id="subscription-title" className="text-lg font-semibold text-gray-900">
              You're on the list!
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Thanks for subscribing! Stay tuned for updates on GenAI, cloud, and dev-tools. 
          You'll receive notifications whenever new content is published.
        </p>
        
        <Button 
          onClick={() => onOpenChange(false)}
          className="w-full"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
};