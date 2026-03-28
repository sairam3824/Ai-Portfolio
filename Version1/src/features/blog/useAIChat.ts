import { useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatResponse {
  response?: string;
  error?: string;
  details?: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (query: string) => Promise<void>;
  clearChat: () => void;
}

export const useAIChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => `session-${Date.now()}`);

  const sendMessage = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    // Add user message
    const userMessage: ChatMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          sessionId,
        }),
      });

      if (!response.ok) {
        const errorData: ChatResponse = await response.json().catch(() => ({}));
        const errorMessage = errorData.error || errorData.details || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = (await response.json()) as ChatResponse;

      // Add assistant message
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: data.response ?? 'No response received.',
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // If it's a redirect to contact suggestion, you could handle it here
      // For now, just show the message
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
};
