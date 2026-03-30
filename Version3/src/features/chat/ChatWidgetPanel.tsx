import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Send, X } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string | React.ReactNode;
}

const SUGGESTED_QUESTIONS = [
    "What projects has Sai built?",
    "What are his top skills?",
    "How's his competitive programming?",
    "How can I contact him?",
];

const WELCOME_MESSAGE: Message = {
    role: "assistant",
    content: "Hi! I'm Sai Ram's AI assistant. Ask me about his projects, skills, experience, or how to get in touch.",
};

const CHAT_API_ENDPOINT = "/api/chat";

export default function ChatWidgetPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasUnread, setHasUnread] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            setHasUnread(false);
            window.setTimeout(() => inputRef.current?.focus(), 120);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const sendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed || isLoading) return;

        const userMessage: Message = { role: "user", content: trimmed };
        const nextMessages = [...messages, userMessage];
        setMessages(nextMessages);
        setInput("");
        setIsLoading(true);

        try {
            const history = nextMessages.slice(1, -1);
            const response = await fetch(CHAT_API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: trimmed, history }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        content: data.error || "Something went wrong. Please try again.",
                    },
                ]);
            } else {
                setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
                if (!isOpen) setHasUnread(true);
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: (
                        <>
                            Connection error.{" "}
                            {import.meta.env.DEV ? (
                                <>For local chat, run `vercel dev` so `/api/chat` is available on port 3000. </>
                            ) : null}
                            Please try again, email me at{" "}
                            <a
                                href="mailto:sairam.maruri@gmail.com"
                                className="text-[#5d7414] underline underline-offset-2 transition-colors hover:text-[#718b18]"
                            >
                                sairam.maruri@gmail.com
                            </a>
                            , or visit my{" "}
                            <Link
                                to="/contact"
                                className="text-[#5d7414] underline underline-offset-2 transition-colors hover:text-[#718b18]"
                            >
                                Contact page
                            </Link>
                            .
                        </>
                    ),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage(input);
        }
    };

    const showSuggestions = messages.length === 1;

    return (
        <div className="fixed bottom-5 right-5 z-[220] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            {isOpen && (
                <div
                    className="w-[min(390px,calc(100vw-2rem))] overflow-hidden rounded-[2rem] border border-[#dfe5cf] bg-[#fffdf8] shadow-[0_30px_90px_rgba(35,31,24,0.18)]"
                    style={{ maxHeight: "min(560px, calc(100vh - 110px))" }}
                >
                    <div className="flex items-center justify-between border-b border-[#ebe6db] bg-[linear-gradient(180deg,#fbfaf6_0%,#f4efe4_100%)] px-5 py-4">
                        <div>
                            <h3 className="text-[1rem] font-bold tracking-tight text-[#17140f]">Ask Sai AI</h3>
                            <div className="mt-1 flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                                </span>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7f786b]">
                                    AI-powered helper
                                </p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e6e0d3] bg-white text-[#8d8678] transition-colors hover:text-[#17140f]"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-4">
                        {messages.map((message, index) => (
                            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                                        message.role === "user"
                                            ? "rounded-tr-sm bg-[#171d10] text-white"
                                            : "rounded-tl-sm border border-[#ece6da] bg-white text-[#4f4a3f]"
                                    }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="rounded-2xl rounded-tl-sm border border-[#ece6da] bg-white px-4 py-3 shadow-sm">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b9b09e] [animation-delay:-0.3s]" />
                                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b9b09e] [animation-delay:-0.15s]" />
                                        <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#b9b09e]" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {showSuggestions && !isLoading && (
                            <div className="flex flex-wrap gap-2 pt-1">
                                {SUGGESTED_QUESTIONS.map((question) => (
                                    <button
                                        key={question}
                                        type="button"
                                        onClick={() => sendMessage(question)}
                                        className="rounded-full border border-[#d7e1b7] bg-[#f4f8e7] px-3 py-1.5 text-xs font-medium text-[#5d7414] transition-colors hover:bg-[#e9f0d0]"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-[#ebe6db] px-4 py-3">
                        <div className="flex items-center gap-2 rounded-[1.2rem] border border-[#ddd6c9] bg-[#fbfaf6] px-4 py-2.5 transition-colors focus-within:border-[#7b8d42]">
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                maxLength={500}
                                disabled={isLoading}
                                className="flex-1 bg-transparent text-sm text-[#17140f] outline-none placeholder:text-[#a59d90] disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => sendMessage(input)}
                                disabled={!input.trim() || isLoading}
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#5d7414] text-white transition-colors hover:bg-[#718b18] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                <Send className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center gap-3">
                {!isOpen && (
                    <button
                        type="button"
                        onClick={() => setIsOpen(true)}
                        className="hidden rounded-full border border-[#d7e1b7] bg-[#fffdf8] px-4 py-2.5 text-sm font-semibold text-[#17140f] shadow-lg shadow-[#cfd8ab]/30 transition-all hover:-translate-y-0.5 hover:text-[#5d7414] sm:inline-flex"
                    >
                        Ask Sai AI
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#5d7414] text-white shadow-[0_18px_40px_rgba(93,116,20,0.35)] ring-4 ring-white/85 transition-all hover:scale-105 hover:bg-[#718b18] active:scale-95"
                    aria-label={isOpen ? "Close chat" : "Chat with AI about Sai Ram"}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
                    {hasUnread && !isOpen && (
                        <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500" />
                    )}
                </button>
            </div>
        </div>
    );
}
