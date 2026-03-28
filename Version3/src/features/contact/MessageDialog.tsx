import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare, X, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import type { SupabaseClient } from "@supabase/supabase-js";

// Memory storage to persist draft across internal route navigation
// This resets to "" automatically if the browser session is refreshed (page reload)
let draftSharedMemory = "";

interface MessageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const MessageDialog = ({ open, onOpenChange }: MessageDialogProps) => {
    const [message, setMessage] = useState(draftSharedMemory);
    const supabaseRef = useRef<SupabaseClient | null | undefined>(undefined);

    // Sync local state to shared draft memory
    useEffect(() => {
        draftSharedMemory = message;
    }, [message]);
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState<{ title: string; description: string; type: 'success' | 'error' } | null>(null);

    // Lock scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [open]);

    const showNotification = (title: string, description: string, type: 'success' | 'error') => {
        setNotification({ title, description, type });
        setTimeout(() => setNotification(null), 4000);
    };



    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!message.trim()) {
            showNotification("Missing message", "Please write a message before sending it.", "error");
            return;
        }

        setIsLoading(true);

        try {
            // Lazy load supabase only when user actually sends a message
            if (supabaseRef.current === undefined) {
                const { supabase } = await import("../../lib/supabase");
                supabaseRef.current = supabase;
            }

            if (!supabaseRef.current) throw new Error("Supabase not configured");

            const { error } = await supabaseRef.current
                .from('portfolio_messages')
                .insert([
                    {
                        content: message.trim(),
                        timestamp: new Date().toISOString(),
                        user_agent: navigator.userAgent
                    }
                ]);

            if (error) throw error;

            showNotification("Message sent", "Your message was sent successfully.", "success");
            setMessage("");
            draftSharedMemory = "";
            setTimeout(() => onOpenChange(false), 2000);
        } catch (error: any) {
            console.error("Error sending message:", error);

            // Fallback for demo if supabase keys are still placeholders
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
            if (!supabaseUrl || supabaseUrl.includes("YOUR_SUPABASE")) {
                setTimeout(() => {
                    showNotification("Message sent", "Message simulated because Supabase is not configured yet.", "success");
                    setMessage("");
                    draftSharedMemory = "";
                    setIsLoading(false);
                    setTimeout(() => onOpenChange(false), 2000);
                }, 1000);
                return;
            }

            // Show actual error from Supabase
            showNotification("Send failed", error?.message || "Please try again in a moment.", "error");
            setIsLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/60 backdrop-blur-md animate-fade-in"
                onClick={() => !isLoading && onOpenChange(false)}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-xl overflow-hidden rounded-[2.4rem] border border-[#e3dccf] bg-[#fffdf8] shadow-[0_28px_90px_rgba(35,31,24,0.18)] animate-scale-in">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 h-1 w-full bg-[linear-gradient(90deg,#7b8d42_0%,#5d7414_100%)]" />

                <div className="p-7 md:p-9">
                    {/* Header */}
                    <div className="mb-7 flex items-start justify-between gap-4">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef2df] text-[#5d7414]">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="flex items-center gap-2 rounded-full border border-[#e3dccf] bg-[#fbfaf6] px-3 py-1">
                                    <Shield className="w-3 h-3 text-[#5d7414]" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#7b7467]">Private Message</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tight text-[#1c1a14]">
                                    Send a Message.
                                </h2>
                                <p className="mt-2 max-w-[34ch] text-sm font-medium leading-relaxed text-[#7b7467]">
                                    Share a note, project idea, or collaboration message. It goes directly to my inbox.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e3dccf] bg-[#fbfaf6] text-[#9a9388] transition-all hover:text-[#17140f] hover:border-[#d5cebf] disabled:opacity-30"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSendMessage} className="space-y-5">
                        <div className="relative group">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Tell me what you want to build, ask, or discuss..."
                                className="min-h-[210px] w-full resize-none rounded-[2rem] border border-[#e3dccf] bg-[#fbfaf6] p-6 text-[1rem] font-medium text-[#2e2a22] outline-none transition-all placeholder:text-[#aaa296] focus:border-[#7b8d42] focus:ring-4 focus:ring-[#dce6b8]/40"
                                disabled={isLoading}
                            />
                            <div className="pointer-events-none absolute bottom-5 left-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#b1aa9f] transition-colors group-focus-within:text-[#7b8d42]">
                                Private contact form
                            </div>
                            <div className="pointer-events-none absolute bottom-5 right-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d0cac0]">
                                Direct inbox
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="flex-1 rounded-2xl border border-[#e3dccf] bg-[#f6f3eb] px-8 py-4 text-xs font-black uppercase tracking-widest text-[#8f887c] transition-all hover:bg-[#f0eadf] disabled:opacity-30"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="relative flex-[2] items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#171d10] px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-[#5d7414] disabled:opacity-50 active:scale-95 flex"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Premium Notification Toast */}
            {notification && (
                <div className={`fixed top-4 left-4 right-4 sm:left-auto sm:right-8 sm:max-w-xs z-[110] w-auto animate-fade-in`}>
                    <div className={`flex gap-4 rounded-3xl border bg-[#fffdf8] p-5 shadow-2xl ${notification.type === 'success' ? 'border-emerald-100' : 'border-rose-100'
                        }`}>
                        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                            }`}>
                            {notification.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-black uppercase tracking-tight text-[#17140f]">{notification.title}</h4>
                            <p className="text-xs font-medium leading-relaxed text-[#7b7467]">{notification.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
