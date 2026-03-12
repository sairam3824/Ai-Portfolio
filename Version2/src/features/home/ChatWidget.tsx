import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const SUGGESTED_QUESTIONS = [
    "What projects has Sai built?",
    "What are his top skills?",
    "How's his competitive programming?",
    "How can I contact him?",
];

const WELCOME_MESSAGE: Message = {
    role: 'assistant',
    content: "Hi! I'm Sai Ram's AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!",
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: 'user', content: trimmed };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const history = newMessages.slice(1, -1); // exclude welcome + last user msg
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: trimmed, history }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.error || 'Something went wrong. Please try again.',
                }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
                if (!isOpen) setHasUnread(true);
            }
        } catch {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Connection error. Please try again or email sairam.maruri@gmail.com directly.',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const showSuggestions = messages.length === 1; // only show after welcome

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300"
                    style={{ maxHeight: 'min(520px, calc(100vh - 120px))' }}>

                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                <Bot className="w-4.5 h-4.5 text-white w-[18px] h-[18px]" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Ask about Sai Ram</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <p className="text-xs text-gray-500">AI-powered · gpt-4o-mini</p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                                        <Bot className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                )}
                                <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-tr-sm'
                                    : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-0.5">
                                        <User className="w-3.5 h-3.5 text-gray-600" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Loading */}
                        {isLoading && (
                            <div className="flex gap-2.5 justify-start">
                                <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                    <Bot className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
                                    <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />
                                </div>
                            </div>
                        )}

                        {/* Suggested questions */}
                        {showSuggestions && !isLoading && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {SUGGESTED_QUESTIONS.map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => sendMessage(q)}
                                        className="text-xs px-3 py-1.5 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors font-medium"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="px-4 py-3 border-t border-gray-100 shrink-0">
                        <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                maxLength={500}
                                disabled={isLoading}
                                className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-400 disabled:opacity-50"
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                                className="p-1.5 rounded-full bg-blue-600 text-white disabled:opacity-40 hover:bg-blue-700 transition-all active:scale-95 disabled:cursor-not-allowed shrink-0"
                            >
                                <Send className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400 text-center mt-2">Powered by OpenAI · May make mistakes</p>
    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-14 h-14 rounded-full bg-blue-600 text-white shadow-xl hover:bg-blue-700 transition-all active:scale-95 hover:scale-105 flex items-center justify-center relative"
                aria-label={isOpen ? 'Close chat' : 'Chat with AI about Sai Ram'}
            >
                {isOpen ? (
                    <X className="w-6 h-6" />
                ) : (
                    <MessageCircle className="w-6 h-6" />
                )}
                {hasUnread && !isOpen && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white" />
                )}
            </button>
        </div>
    );
}
