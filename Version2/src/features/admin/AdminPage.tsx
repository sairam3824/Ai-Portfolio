
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Lock, User, Key, LogOut, MessageSquare, Clock, Smartphone, RefreshCw, Trash2, AlertCircle } from "lucide-react";

interface Message {
    id: number;
    content: string;
    timestamp: string;
    user_agent: string;
    created_at: string;
}

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Dashboard state
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin123") {
            setIsAuthenticated(true);
            setError("");
            fetchMessages();
        } else {
            setError("Invalid credentials access denied.");
        }
    };

    const fetchMessages = async () => {
        if (!supabase) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('portfolio_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching messages:", error);
            setError(error.message);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    const handleDelete = (id: number) => {
        setConfirmDeleteId(id);
    };

    const executeDelete = async () => {
        if (!supabase || confirmDeleteId === null) return;

        const { error } = await supabase
            .from('portfolio_messages')
            .delete()
            .eq('id', confirmDeleteId);

        if (error) {
            alert("Failed to delete");
        } else {
            setMessages(messages.filter(m => m.id !== confirmDeleteId));
        }
        setConfirmDeleteId(null);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-sm space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Terminal</h1>
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Secure Buffer Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-rose-50 border border-rose-100/50 text-rose-600 text-xs font-bold rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-5">Username</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:outline-none font-bold text-gray-800 transition-all placeholder:text-gray-300"
                                        placeholder="Identification"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-5">Password</label>
                                <div className="relative">
                                    <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:outline-none font-bold text-gray-800 transition-all placeholder:text-gray-300"
                                        placeholder="Encryption Key"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-5 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all active:scale-[0.98] shadow-xl shadow-gray-900/10 hover:shadow-blue-600/20 mt-8">
                            Initialize Auth
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-black text-gray-900 tracking-tight leading-none">Command Center</h1>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Incoming Transmissions</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsAuthenticated(false)}
                        className="p-3 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Messages ({messages.length})</h2>
                    <button
                        onClick={fetchMessages}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Sync
                    </button>
                </div>

                {error && error.includes('policy') && (
                    <div className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-2xl">
                        <h3 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            Database Policy Restriction
                        </h3>
                        <p className="text-amber-600 text-sm mb-4">You need to enable READ access for this table in Supabase to view messages.</p>
                        <code className="block bg-amber-100/50 p-4 rounded-xl text-xs font-mono text-amber-900 overflow-x-auto">
                            create policy "Allow generic select" on public.portfolio_messages for select to anon using (true);
                        </code>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                    {messages.length === 0 && !loading && (
                        <div className="text-center py-32">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MessageSquare className="w-8 h-8 text-gray-200" />
                            </div>
                            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Nexus Terminal Empty</p>
                            <p className="text-gray-300 text-sm mt-2 font-medium">No incoming transmissions detected in the secure buffer.</p>
                        </div>
                    )}

                    {messages.map((msg) => (
                        <div key={msg.id} className="group py-12 border-b border-gray-100 last:border-0 hover:bg-gray-50/30 transition-colors px-4 -mx-4 rounded-3xl">
                            <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                                <div className="flex-1 space-y-5">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Transmission Node</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                            <Clock className="w-3.5 h-3.5" />
                                            {new Date(msg.created_at).toLocaleString()}
                                        </div>
                                    </div>

                                    <p className="text-gray-900 text-xl md:text-2xl font-medium leading-relaxed max-w-4xl whitespace-pre-wrap">
                                        {msg.content}
                                    </p>

                                    <div className="flex items-center gap-3 pt-2">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg text-[10px] font-mono text-gray-500">
                                            <Smartphone className="w-3.5 h-3.5" />
                                            <span className="truncate max-w-[200px] md:max-w-md">{msg.user_agent}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="p-4 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all md:opacity-0 md:group-hover:opacity-100"
                                    title="Delete Message"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {/* Custom Confirmation Modal */}
            {confirmDeleteId !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setConfirmDeleteId(null)}
                    />
                    <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 space-y-8 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>

                        <div className="text-center space-y-3">
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Purge Data?</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                You are about to permanently delete this transmission from the nexus terminal. This action is irreversible.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={executeDelete}
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-rose-600 transition-all active:scale-95"
                            >
                                Confirm Purge
                            </button>
                            <button
                                onClick={() => setConfirmDeleteId(null)}
                                className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-gray-100 transition-all active:scale-95"
                            >
                                Abort
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
