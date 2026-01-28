import { useState, useEffect } from "react";
import { Send, MessageSquare, X, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { supabase } from "../../lib/supabase";

// Memory storage to persist draft across internal route navigation
// This resets to "" automatically if the browser session is refreshed (page reload)
let draftSharedMemory = "";

interface MessageDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const MessageDialog = ({ open, onOpenChange }: MessageDialogProps) => {
    const [message, setMessage] = useState(draftSharedMemory);

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
            showNotification("Missing Input", "Please provide message content before initializing transmission.", "error");
            return;
        }

        setIsLoading(true);

        try {
            if (!supabase) throw new Error("Supabase not configured");

            const { error } = await supabase
                .from('portfolio_messages')
                .insert([
                    {
                        content: message.trim(),
                        timestamp: new Date().toISOString(),
                        user_agent: navigator.userAgent
                    }
                ]);

            if (error) throw error;

            showNotification("Transmission Success", "Your message has been dispatched to the secure terminal.", "success");
            setMessage("");
            draftSharedMemory = "";
            setTimeout(() => onOpenChange(false), 2000);
        } catch (error: any) {
            console.error("Error sending message:", error);

            // Fallback for demo if supabase keys are still placeholders
            const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
            if (!supabaseUrl || supabaseUrl.includes("YOUR_SUPABASE")) {
                setTimeout(() => {
                    showNotification("Transmission Success", "Message simulated (Supabase not configured).", "success");
                    setMessage("");
                    draftSharedMemory = "";
                    setIsLoading(false);
                    setTimeout(() => onOpenChange(false), 2000);
                }, 1000);
                return;
            }

            // Show actual error from Supabase
            showNotification("Transmission Failure", error?.message || "Check console for details.", "error");
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
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-white/50 animate-scale-in overflow-hidden shadow-2xl">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-pulse" />

                <div className="p-8 md:p-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="px-3 py-1 rounded-full bg-gray-50 border border-gray-100 flex items-center gap-2">
                                    <Shield className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Anonymous Protocol</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                                    Establish Link.
                                </h2>
                                <p className="text-gray-400 text-sm font-medium mt-1 leading-relaxed">
                                    Your data is scrubbed of all identity markers and dispatched directly to my secure terminal.
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => onOpenChange(false)}
                            disabled={isLoading}
                            className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all disabled:opacity-30"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSendMessage} className="space-y-6">
                        <div className="relative group">
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your message here..."
                                className="w-full min-h-[180px] p-6 bg-gray-50 border border-gray-100 rounded-3xl resize-none outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-gray-700 font-medium placeholder:text-gray-300"
                                disabled={isLoading}
                            />
                            <div className="absolute bottom-4 right-4 text-[10px] font-black text-gray-300 uppercase tracking-widest pointer-events-none group-focus-within:text-blue-200 transition-colors">
                                Nexus Terminal v2
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={() => onOpenChange(false)}
                                disabled={isLoading}
                                className="flex-1 px-8 py-4 rounded-2xl bg-gray-50 text-gray-400 font-black uppercase tracking-widest text-xs hover:bg-gray-100 transition-all border border-transparent disabled:opacity-30"
                            >
                                Abort
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading || !message.trim()}
                                className="flex-[2] relative overflow-hidden px-8 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-95"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Syncing...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Initialize Sync
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Premium Notification Toast */}
            {notification && (
                <div className={`fixed top-8 right-8 z-[110] max-w-xs w-full animate-fade-in`}>
                    <div className={`p-5 rounded-3xl shadow-2xl flex gap-4 border bg-white ${notification.type === 'success' ? 'border-emerald-100' : 'border-rose-100'
                        }`}>
                        <div className={`w-12 h-12 rounded-2xl flex flex-shrink-0 items-center justify-center ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                            }`}>
                            {notification.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-sm font-black text-gray-900 uppercase tracking-tight">{notification.title}</h4>
                            <p className="text-xs text-gray-400 font-medium leading-relaxed">{notification.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
