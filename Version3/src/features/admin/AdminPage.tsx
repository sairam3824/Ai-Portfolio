import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Lock, User, Key, LogOut, MessageSquare, Clock, Smartphone, RefreshCw, Trash2, AlertCircle, FileText, Calendar, Plus, ArrowUpDown, Edit2, X } from "lucide-react";
import Seo from "../../shared/Seo";

interface Message {
    id: number;
    content: string;
    timestamp: string;
    user_agent: string;
    created_at: string;
}

interface Note {
    id: number;
    content: string;
    created_at: string;
}

interface Deadline {
    id: number;
    description: string;
    deadline_date: string;
    deadline_time?: string;
    created_at: string;
}

type Tab = 'messages' | 'notes' | 'deadlines';

const AdminPage = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [activeTab, setActiveTab] = useState<Tab>('messages');

    // Dashboard state
    const [messages, setMessages] = useState<Message[]>([]);
    const [notes, setNotes] = useState<Note[]>([]);
    const [deadlines, setDeadlines] = useState<Deadline[]>([]);

    const [loading, setLoading] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState<{ type: Tab, id: number } | null>(null);

    // Form states
    const [newNote, setNewNote] = useState("");
    const [newDeadlineDesc, setNewDeadlineDesc] = useState("");
    const [newDeadlineDate, setNewDeadlineDate] = useState("");
    const [newDeadlineTime, setNewDeadlineTime] = useState("");
    const [deadlineSort, setDeadlineSort] = useState<'asc' | 'desc'>('asc');

    // UI toggle states
    const [showAddNote, setShowAddNote] = useState(false);
    const [showAddDeadline, setShowAddDeadline] = useState(false);

    // Edit states
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [editNoteContent, setEditNoteContent] = useState("");

    const [editingDeadline, setEditingDeadline] = useState<Deadline | null>(null);
    const [editDeadlineDesc, setEditDeadlineDesc] = useState("");
    const [editDeadlineDate, setEditDeadlineDate] = useState("");
    const [editDeadlineTime, setEditDeadlineTime] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase) return;

        setLoading(true);
        setError("");

        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });

        if (authError) {
            setError(authError.message);
        } else if (data.session) {
            setIsAuthenticated(true);
            setError("");
            fetchAllData();
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!supabase) return;

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setIsAuthenticated(true);
                fetchAllData();
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setIsAuthenticated(true);
                fetchAllData();
            } else {
                setIsAuthenticated(false);
                setMessages([]);
                setNotes([]);
                setDeadlines([]);
            }
        });

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAllData = () => {
        fetchMessages();
        fetchNotes();
        fetchDeadlines();
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

    const fetchNotes = async () => {
        if (!supabase) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('portfolio_notes')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            setNotes(data || []);
        }
        setLoading(false);
    };

    const fetchDeadlines = async () => {
        if (!supabase) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('portfolio_deadlines')
            .select('*')
            .order('deadline_date', { ascending: deadlineSort === 'asc' });

        if (!error) {
            setDeadlines(data || []);
        }
        setLoading(false);
    };

    const toggleDeadlineSort = () => {
        setDeadlineSort(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchDeadlines();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deadlineSort]);

    const handleAddNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !newNote.trim()) return;

        setLoading(true);
        const { error } = await supabase
            .from('portfolio_notes')
            .insert([{ content: newNote.trim() }]);

        if (!error) {
            setNewNote("");
            fetchNotes();
        }
        setLoading(false);
    };

    const handleAddDeadline = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !newDeadlineDesc.trim() || !newDeadlineDate) return;

        setLoading(true);
        const { error } = await supabase
            .from('portfolio_deadlines')
            .insert([{
                description: newDeadlineDesc.trim(),
                deadline_date: newDeadlineDate,
                deadline_time: newDeadlineTime || null
            }]);

        if (!error) {
            setNewDeadlineDesc("");
            setNewDeadlineDate("");
            setNewDeadlineTime("");
            setShowAddDeadline(false);
            fetchDeadlines();
        }
        setLoading(false);
    };

    const handleEditNote = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !editingNote || !editNoteContent.trim()) return;

        setLoading(true);
        const { error } = await supabase
            .from('portfolio_notes')
            .update({ content: editNoteContent.trim() })
            .eq('id', editingNote.id);

        if (!error) {
            setEditingNote(null);
            fetchNotes();
        }
        setLoading(false);
    };

    const handleEditDeadline = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!supabase || !editingDeadline || !editDeadlineDesc.trim() || !editDeadlineDate) return;

        setLoading(true);
        const { error } = await supabase
            .from('portfolio_deadlines')
            .update({
                description: editDeadlineDesc.trim(),
                deadline_date: editDeadlineDate,
                deadline_time: editDeadlineTime || null
            })
            .eq('id', editingDeadline.id);

        if (!error) {
            setEditingDeadline(null);
            fetchDeadlines();
        }
        setLoading(false);
    };

    const handleDelete = (type: Tab, id: number) => {
        setConfirmDelete({ type, id });
    };

    const executeDelete = async () => {
        if (!supabase || !confirmDelete) return;

        let table = '';
        if (confirmDelete.type === 'messages') table = 'portfolio_messages';
        if (confirmDelete.type === 'notes') table = 'portfolio_notes';
        if (confirmDelete.type === 'deadlines') table = 'portfolio_deadlines';

        const { error } = await supabase
            .from(table)
            .delete()
            .eq('id', confirmDelete.id);

        if (error) {
            alert("Failed to delete");
        } else {
            if (confirmDelete.type === 'messages') setMessages(messages.filter(m => m.id !== confirmDelete.id));
            if (confirmDelete.type === 'notes') setNotes(notes.filter(n => n.id !== confirmDelete.id));
            if (confirmDelete.type === 'deadlines') setDeadlines(deadlines.filter(d => d.id !== confirmDelete.id));
        }
        setConfirmDelete(null);
    };

    /* ─── LOGIN SCREEN ─── */
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#f7f4ee] flex flex-col items-center justify-center p-6 sm:p-12">
                <Seo
                    title="Admin | Sai Ram Maruri"
                    description="Administrative access for portfolio messages and management."
                    robots="noindex,nofollow"
                />
                <div className="w-full max-w-sm space-y-12">
                    <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-[#eef2df] text-[#5d7414] rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h1 className="portfolio-sans text-3xl font-semibold text-[#11100c] tracking-[-0.04em]">Admin Terminal</h1>
                        <p className="text-[#8b8578] text-[0.68rem] font-semibold uppercase tracking-[0.28em]">Secure Buffer Access Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-8">
                        {error && (
                            <div className="p-4 bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs font-semibold rounded-2xl flex items-center gap-3">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="group space-y-2">
                                <label className="text-[0.68rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em] ml-5">Email</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c0b9ab] group-focus-within:text-[#5d7414] transition-colors" />
                                    <input
                                        type="email"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-[#fffdf8] border border-[#e3dccf] rounded-full focus:ring-2 focus:ring-[#5d7414]/20 focus:border-[#5d7414] focus:outline-none font-semibold text-[#11100c] transition-all placeholder:text-[#c0b9ab]"
                                        placeholder="Identification"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[0.68rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em] ml-5">Password</label>
                                <div className="relative">
                                    <Key className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c0b9ab] group-focus-within:text-[#5d7414] transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-[#fffdf8] border border-[#e3dccf] rounded-full focus:ring-2 focus:ring-[#5d7414]/20 focus:border-[#5d7414] focus:outline-none font-semibold text-[#11100c] transition-all placeholder:text-[#c0b9ab]"
                                        placeholder="Encryption Key"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full flex items-center justify-center gap-3 bg-[#1b2433] text-white py-5 rounded-full font-semibold uppercase tracking-[0.18em] text-xs hover:bg-[#5d7414] transition-all active:scale-[0.98] shadow-[0_14px_30px_rgba(27,36,51,0.15)] hover:shadow-[0_14px_30px_rgba(93,116,20,0.2)] mt-8">
                            Initialize Auth
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    /* ─── DASHBOARD ─── */
    return (
        <div className="min-h-screen bg-[#f7f4ee]">
            <Seo
                title="Admin Dashboard | Sai Ram Maruri"
                description="Administrative dashboard for portfolio messages."
                robots="noindex,nofollow"
            />

            {/* Header */}
            <header className="bg-[#fffdf8]/80 backdrop-blur-xl border-b border-[#e3dccf] sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1b2433] rounded-xl flex items-center justify-center text-white">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="portfolio-sans font-semibold text-[#11100c] tracking-[-0.03em] leading-none">Command Center</h1>
                            <span className="text-[0.62rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em]">Dashboard & Management</span>
                        </div>
                    </div>

                    <button
                        onClick={async () => {
                            if (supabase) await supabase.auth.signOut();
                            setIsAuthenticated(false);
                            setMessages([]);
                            setNotes([]);
                            setDeadlines([]);
                        }}
                        className="p-3 hover:bg-[#fef2f2] rounded-xl text-[#8b8578] hover:text-[#dc2626] transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Tabs */}
                <div className="flex items-center gap-3 mb-8 border-b border-[#e3dccf] pb-4 overflow-x-auto hide-scrollbar">
                    {([
                        { key: 'messages' as Tab, icon: MessageSquare, label: 'Messages' },
                        { key: 'notes' as Tab, icon: FileText, label: 'Notes' },
                        { key: 'deadlines' as Tab, icon: Calendar, label: 'Deadlines' },
                    ]).map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => { setActiveTab(tab.key); setEditingNote(null); setEditingDeadline(null); setShowAddNote(false); setShowAddDeadline(false); }}
                            className={`flex items-center gap-2 px-5 py-2.5 font-semibold uppercase tracking-[0.16em] text-[0.68rem] rounded-full transition-all whitespace-nowrap ${activeTab === tab.key
                                ? 'bg-[#1b2433] text-white shadow-[0_8px_20px_rgba(27,36,51,0.15)]'
                                : 'bg-[#fffdf8] border border-[#e3dccf] text-[#8b8578] hover:border-[#5d7414]/30 hover:text-[#5d7414]'
                                }`}
                        >
                            <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="portfolio-sans text-xl font-semibold text-[#11100c] tracking-[-0.03em]">
                        {activeTab === 'messages' && `Messages (${messages.length})`}
                        {activeTab === 'notes' && `Notes (${notes.length})`}
                        {activeTab === 'deadlines' && `Deadlines (${deadlines.length})`}
                    </h2>
                    <div className="flex items-center gap-3">
                        {activeTab === 'deadlines' && (
                            <button
                                onClick={toggleDeadlineSort}
                                className="flex items-center gap-2 px-4 py-2 bg-[#fffdf8] border border-[#e3dccf] rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#8b8578] hover:border-[#5d7414]/30 hover:text-[#5d7414] transition-colors"
                            >
                                <ArrowUpDown className="w-3.5 h-3.5" />
                                {deadlineSort === 'asc' ? 'Earliest First' : 'Latest First'}
                            </button>
                        )}
                        <button
                            onClick={fetchAllData}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-[#fffdf8] border border-[#e3dccf] rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#8b8578] hover:border-[#5d7414]/30 hover:text-[#5d7414] transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                            Sync
                        </button>
                    </div>
                </div>

                {error && error.includes('policy') && (
                    <div className="mb-8 p-6 bg-[#fff8eb] border border-[#fde68a] rounded-2xl">
                        <h3 className="text-[#b45309] font-semibold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            Database Policy Restriction
                        </h3>
                        <p className="text-[#d97706] text-sm mb-4">You need to enable READ access for this table in Supabase to view items.</p>
                    </div>
                )}

                {/* ─── Messages Tab ─── */}
                {activeTab === 'messages' && (
                    <div className="grid grid-cols-1 gap-0">
                        {messages.length === 0 && !loading && (
                            <div className="text-center py-32">
                                <div className="w-16 h-16 bg-[#eef2df] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MessageSquare className="w-8 h-8 text-[#c0b9ab]" />
                                </div>
                                <p className="text-[#8b8578] font-semibold uppercase tracking-[0.22em] text-[0.68rem]">Nexus Terminal Empty</p>
                                <p className="text-[#b0a998] text-sm mt-2">No incoming transmissions detected in the secure buffer.</p>
                            </div>
                        )}

                        {messages.map((msg) => (
                            <div key={msg.id} className="group py-10 border-b border-[#e4ddd1] last:border-0 hover:bg-[#fffdf8]/50 transition-colors px-4 -mx-4 rounded-2xl">
                                <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex flex-wrap items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5d7414] opacity-60" />
                                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5d7414]" />
                                                </span>
                                                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d7414]">Transmission</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[#8b8578] text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(msg.created_at).toLocaleString()}
                                            </div>
                                        </div>

                                        <p className="text-[#11100c] text-xl md:text-2xl font-medium leading-relaxed max-w-4xl whitespace-pre-wrap">
                                            {msg.content}
                                        </p>

                                        <div className="flex items-center gap-3 pt-2">
                                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f4eee1] rounded-full text-[0.62rem] font-mono text-[#8b8578]">
                                                <Smartphone className="w-3.5 h-3.5" />
                                                <span className="truncate max-w-[200px] md:max-w-md">{msg.user_agent}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDelete('messages', msg.id)}
                                        className="p-4 text-[#c0b9ab] hover:text-[#dc2626] hover:bg-[#fef2f2] rounded-2xl transition-all md:opacity-0 md:group-hover:opacity-100"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ─── Notes Tab ─── */}
                {activeTab === 'notes' && (
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <p className="text-[0.72rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em]">Your Notes</p>
                            <button
                                onClick={() => setShowAddNote(!showAddNote)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#1b2433] text-white rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.16em] hover:bg-[#5d7414] transition-colors shadow-[0_8px_20px_rgba(27,36,51,0.15)]"
                            >
                                {showAddNote ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                {showAddNote ? "Cancel" : "Add Note"}
                            </button>
                        </div>

                        {showAddNote && (
                            <form onSubmit={handleAddNote} className="bg-[#fffdf8] border border-[#e3dccf] p-6 rounded-[2rem] space-y-4">
                                <p className="font-semibold text-[#11100c] uppercase text-[0.68rem] tracking-[0.22em] flex items-center gap-2">
                                    <Plus className="w-4 h-4 text-[#5d7414]" /> Add New Note
                                </p>
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Enter your note here..."
                                    className="w-full min-h-[120px] p-4 rounded-[1.5rem] border border-[#e3dccf] bg-[#fbfaf6] outline-none focus:ring-2 focus:ring-[#5d7414]/20 focus:border-[#5d7414] text-[#11100c] resize-none font-medium placeholder:text-[#c0b9ab]"
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={loading || !newNote.trim()}
                                    className="px-6 py-3 bg-[#1b2433] text-white rounded-full font-semibold uppercase tracking-[0.16em] text-[0.68rem] hover:bg-[#5d7414] transition-colors disabled:opacity-50"
                                >
                                    Save Note
                                </button>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {notes.map((note) => (
                                <div key={note.id} className="group relative bg-[#fffdf8] border border-[#e3dccf] p-6 rounded-[2rem] hover:shadow-[0_20px_60px_rgba(61,52,36,0.08)] hover:-translate-y-0.5 transition-all flex flex-col justify-between">
                                    {editingNote?.id === note.id ? (
                                        <form onSubmit={handleEditNote} className="flex flex-col gap-4 h-full">
                                            <textarea
                                                value={editNoteContent}
                                                onChange={(e) => setEditNoteContent(e.target.value)}
                                                className="w-full h-full min-h-[120px] p-3 rounded-xl border border-[#5d7414]/30 outline-none focus:ring-2 focus:ring-[#5d7414]/20 text-[#11100c] resize-none font-medium bg-[#eef2df]/30"
                                                required
                                            />
                                            <div className="flex gap-2 justify-end mt-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingNote(null)}
                                                    className="px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#8b8578] hover:bg-[#f4eee1] rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading || !editNoteContent.trim()}
                                                    className="px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] bg-[#5d7414] text-white hover:bg-[#4c6010] rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[#8b8578] text-[0.62rem] font-semibold uppercase tracking-[0.2em]">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(note.created_at).toLocaleString()}
                                                </div>
                                                <p className="text-[#3d485a] font-medium whitespace-pre-wrap leading-relaxed">{note.content}</p>
                                            </div>
                                            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingNote(note);
                                                        setEditNoteContent(note.content);
                                                    }}
                                                    className="p-2 text-[#8b8578] hover:text-[#5d7414] hover:bg-[#eef2df] rounded-xl transition-colors"
                                                    title="Edit Note"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('notes', note.id)}
                                                    className="p-2 text-[#c0b9ab] hover:text-[#dc2626] hover:bg-[#fef2f2] rounded-xl transition-colors"
                                                    title="Delete Note"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        {notes.length === 0 && !loading && (
                            <div className="text-center py-12 text-[#8b8578] font-semibold uppercase tracking-[0.22em] text-[0.68rem]">
                                No notes found.
                            </div>
                        )}
                    </div>
                )}

                {/* ─── Deadlines Tab ─── */}
                {activeTab === 'deadlines' && (
                    <div className="space-y-10">
                        <div className="flex items-center justify-between">
                            <p className="text-[0.72rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em]">Your Deadlines</p>
                            <button
                                onClick={() => setShowAddDeadline(!showAddDeadline)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-[#1b2433] text-white rounded-full text-[0.68rem] font-semibold uppercase tracking-[0.16em] hover:bg-[#5d7414] transition-colors shadow-[0_8px_20px_rgba(27,36,51,0.15)]"
                            >
                                {showAddDeadline ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                {showAddDeadline ? "Cancel" : "Add Deadline"}
                            </button>
                        </div>

                        {showAddDeadline && (
                            <form onSubmit={handleAddDeadline} className="bg-[#fffdf8] border border-[#e3dccf] p-6 rounded-[2rem] space-y-6">
                                <p className="font-semibold text-[#11100c] uppercase text-[0.68rem] tracking-[0.22em] flex items-center gap-2">
                                    <Plus className="w-4 h-4 text-[#5d7414]" /> Add New Deadline
                                </p>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[0.62rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em] ml-2">Description</label>
                                        <input
                                            type="text"
                                            value={newDeadlineDesc}
                                            onChange={(e) => setNewDeadlineDesc(e.target.value)}
                                            placeholder="Project delivery, Task due..."
                                            className="w-full px-4 py-3 rounded-xl border border-[#e3dccf] bg-[#fbfaf6] outline-none focus:ring-2 focus:ring-[#5d7414]/20 focus:border-[#5d7414] text-[#11100c] font-medium placeholder:text-[#c0b9ab]"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[0.62rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em] ml-2">Date</label>
                                            <input
                                                type="date"
                                                value={newDeadlineDate}
                                                onChange={(e) => setNewDeadlineDate(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-[#e3dccf] bg-[#fbfaf6] outline-none focus:ring-2 focus:ring-[#5d7414]/20 focus:border-[#5d7414] text-[#11100c] font-medium"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[0.62rem] font-semibold text-[#8b8578] uppercase tracking-[0.22em] ml-2">Time (Optional)</label>
                                            <input
                                                type="time"
                                                value={newDeadlineTime}
                                                onChange={(e) => setNewDeadlineTime(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border border-[#e3dccf] bg-[#fbfaf6] outline-none focus:ring-2 focus:ring-[#5d7414]/20 focus:border-[#5d7414] text-[#11100c] font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !newDeadlineDesc.trim() || !newDeadlineDate}
                                    className="px-6 py-3 bg-[#1b2433] text-white rounded-full font-semibold uppercase tracking-[0.16em] text-[0.68rem] hover:bg-[#5d7414] transition-colors disabled:opacity-50"
                                >
                                    Save Deadline
                                </button>
                            </form>
                        )}

                        <div className="space-y-4">
                            {deadlines.map((deadline) => {
                                const isPast = new Date(`${deadline.deadline_date}T${deadline.deadline_time || '23:59'}`) < new Date();

                                if (editingDeadline?.id === deadline.id) {
                                    return (
                                        <form key={deadline.id} onSubmit={handleEditDeadline} className="p-6 bg-[#eef2df]/40 border border-[#5d7414]/20 rounded-[2rem] space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                <div className="md:col-span-6 space-y-1">
                                                    <label className="text-[0.62rem] font-semibold text-[#5d7414] uppercase tracking-[0.22em] ml-2">Description</label>
                                                    <input
                                                        type="text"
                                                        value={editDeadlineDesc}
                                                        onChange={(e) => setEditDeadlineDesc(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-[#5d7414]/20 bg-white outline-none focus:ring-2 focus:ring-[#5d7414]/20 text-[#11100c] font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-3 space-y-1">
                                                    <label className="text-[0.62rem] font-semibold text-[#5d7414] uppercase tracking-[0.22em] ml-2">Date</label>
                                                    <input
                                                        type="date"
                                                        value={editDeadlineDate}
                                                        onChange={(e) => setEditDeadlineDate(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-[#5d7414]/20 bg-white outline-none focus:ring-2 focus:ring-[#5d7414]/20 text-[#11100c] font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-3 space-y-1">
                                                    <label className="text-[0.62rem] font-semibold text-[#5d7414] uppercase tracking-[0.22em] ml-2">Time</label>
                                                    <input
                                                        type="time"
                                                        value={editDeadlineTime}
                                                        onChange={(e) => setEditDeadlineTime(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-[#5d7414]/20 bg-white outline-none focus:ring-2 focus:ring-[#5d7414]/20 text-[#11100c] font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingDeadline(null)}
                                                    className="px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#8b8578] hover:bg-[#f4eee1] rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading || !editDeadlineDesc.trim() || !editDeadlineDate}
                                                    className="px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] bg-[#5d7414] text-white hover:bg-[#4c6010] rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    );
                                }

                                return (
                                    <div key={deadline.id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-[#fffdf8] border border-[#e3dccf] rounded-[2rem] hover:shadow-[0_20px_60px_rgba(61,52,36,0.06)] hover:-translate-y-0.5 transition-all">
                                        <div className="flex items-center gap-5">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isPast ? 'bg-[#fef2f2] text-[#dc2626]' : 'bg-[#eef2df] text-[#5d7414]'}`}>
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-semibold ${isPast ? 'text-[#b0a998] line-through' : 'text-[#11100c]'}`}>
                                                    {deadline.description}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={`text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${isPast ? 'text-[#dc2626]' : 'text-[#5d7414]'}`}>
                                                        {new Date(deadline.deadline_date).toLocaleDateString()}
                                                    </span>
                                                    {deadline.deadline_time && (
                                                        <span className="text-[0.68rem] font-semibold text-[#8b8578] uppercase tracking-[0.16em]">
                                                            @ {deadline.deadline_time}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 justify-end sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => {
                                                    setEditingDeadline(deadline);
                                                    setEditDeadlineDesc(deadline.description);
                                                    setEditDeadlineDate(deadline.deadline_date);
                                                    setEditDeadlineTime(deadline.deadline_time || "");
                                                }}
                                                className="p-3 text-[#8b8578] hover:text-[#5d7414] hover:bg-[#eef2df] rounded-xl transition-colors"
                                                title="Edit Deadline"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete('deadlines', deadline.id)}
                                                className="p-3 text-[#c0b9ab] hover:text-[#dc2626] hover:bg-[#fef2f2] rounded-xl transition-colors"
                                                title="Delete Deadline"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            {deadlines.length === 0 && !loading && (
                                <div className="text-center py-12 text-[#8b8578] font-semibold uppercase tracking-[0.22em] text-[0.68rem]">
                                    No deadlines scheduled.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Delete Confirmation Modal */}
            {confirmDelete !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-[#11100c]/40 backdrop-blur-sm"
                        onClick={() => setConfirmDelete(null)}
                    />
                    <div className="relative bg-[#fffdf8] w-full max-w-sm rounded-[2.5rem] border border-[#e3dccf] shadow-[0_28px_90px_rgba(35,31,24,0.18)] p-8 space-y-8">
                        <div className="w-16 h-16 bg-[#fef2f2] text-[#dc2626] rounded-[1.5rem] flex items-center justify-center mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>

                        <div className="text-center space-y-3">
                            <h3 className="portfolio-sans text-2xl font-semibold text-[#11100c] tracking-[-0.04em]">Purge Data?</h3>
                            <p className="text-[#6f695c] text-sm leading-relaxed">
                                You are about to permanently delete this {confirmDelete.type.slice(0, -1)}. This action is irreversible.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={executeDelete}
                                className="w-full py-4 bg-[#1b2433] text-white rounded-full font-semibold uppercase tracking-[0.16em] text-[0.68rem] hover:bg-[#dc2626] transition-all active:scale-95"
                            >
                                Confirm Purge
                            </button>
                            <button
                                onClick={() => setConfirmDelete(null)}
                                className="w-full py-4 bg-[#f4eee1] text-[#8b8578] rounded-full font-semibold uppercase tracking-[0.16em] text-[0.68rem] hover:bg-[#ebe4d5] transition-all active:scale-95"
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
