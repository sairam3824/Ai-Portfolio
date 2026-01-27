import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAIChat } from './useAIChat';

interface AIChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialQuery?: string;
}

export const AIChatDialog = ({ open, onOpenChange, initialQuery }: AIChatDialogProps) => {
  const [input, setInput] = useState('');
  const { messages, isLoading, error, sendMessage, clearChat } = useAIChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send initial query if provided
  useEffect(() => {
    if (open && initialQuery && messages.length === 0) {
      sendMessage(initialQuery);
    }
  }, [open, initialQuery]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
  };

  const handleClose = () => {
    onOpenChange(false);
    clearChat();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col m-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 mt-8">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-blue-400" />
              <p className="text-lg font-medium">Ask me anything!</p>
              <p className="text-sm mt-2">I can help answer questions about tech, AI, and more.</p>
            </div>
          )}

          {messages.map((message, index) => {
            const isRedirectMessage = message.role === 'assistant' && 
              message.content.includes('Ask me anything');
            
            return (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {isRedirectMessage && (
                    <button
                      onClick={() => {
                        navigate('/');
                        onOpenChange(false);
                        setTimeout(() => {
                          const chatButton = document.querySelector('[aria-label="Ask me anything"]');
                          if (chatButton) {
                            (chatButton as HTMLElement).click();
                          }
                        }, 500);
                      }}
                      className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Go to "Ask me anything" Chat
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
