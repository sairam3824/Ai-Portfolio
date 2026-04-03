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

        const authStateChange = supabase.auth.onAuthStateChange((_event, session) => {
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

        const authListener = Object.values(authStateChange.data)[0];
        const cleanupAuthListener = authListener && Object.values(authListener)[0];

        return () => cleanupAuthListener?.call(authListener);
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

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 sm:p-12">
                <Seo
                    title="Admin | Sai Ram Maruri"
                    description="Administrative access for portfolio messages and management."
                    robots="noindex,nofollow"
                />
                <div className="w-full max-w-sm space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Lock className="w-7 h-7" />
                        </div>
                        <h1 className="text-3xl font-black text-gray-800 tracking-tight">Admin Terminal</h1>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">Secure Buffer Access Only</p>
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
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-5">Email</label>
                                <div className="relative">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        type="email"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        className="w-full pl-14 pr-6 py-5 bg-gray-50 border-none rounded-full focus:ring-2 focus:ring-blue-600/20 focus:bg-white focus:outline-none font-bold text-gray-800 transition-all placeholder:text-gray-300"
                                        placeholder="Identification"
                                    />
                                </div>
                            </div>

                            <div className="group space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-5">Password</label>
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
            <Seo
                title="Admin Dashboard | Sai Ram Maruri"
                description="Administrative dashboard for portfolio messages."
                robots="noindex,nofollow"
            />
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-black text-gray-800 tracking-tight leading-none">Command Center</h1>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dashboard & Management</span>
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
                        className="p-3 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-red-500 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
                {/* Tabs */}
                <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4 overflow-x-auto hide-scrollbar">
                    <button onClick={() => { setActiveTab('messages'); setEditingNote(null); setEditingDeadline(null); setShowAddNote(false); setShowAddDeadline(false); }} className={`flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest text-[10px] rounded-lg transition-colors whitespace-nowrap ${activeTab === 'messages' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                        <MessageSquare className="w-4 h-4" /> Messages
                    </button>
                    <button onClick={() => { setActiveTab('notes'); setEditingNote(null); setEditingDeadline(null); setShowAddNote(false); setShowAddDeadline(false); }} className={`flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest text-[10px] rounded-lg transition-colors whitespace-nowrap ${activeTab === 'notes' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                        <FileText className="w-4 h-4" /> Notes
                    </button>
                    <button onClick={() => { setActiveTab('deadlines'); setEditingNote(null); setEditingDeadline(null); setShowAddNote(false); setShowAddDeadline(false); }} className={`flex items-center gap-2 px-4 py-2 font-bold uppercase tracking-widest text-[10px] rounded-lg transition-colors whitespace-nowrap ${activeTab === 'deadlines' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                        <Calendar className="w-4 h-4" /> Deadlines
                    </button>
                </div>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight uppercase">
                        {activeTab === 'messages' && `Messages (${messages.length})`}
                        {activeTab === 'notes' && `Notes (${notes.length})`}
                        {activeTab === 'deadlines' && `Deadlines (${deadlines.length})`}
                    </h2>
                    <div className="flex items-center gap-3">
                        {activeTab === 'deadlines' && (
                            <button
                                onClick={toggleDeadlineSort}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors"
                            >
                                <ArrowUpDown className="w-4 h-4" />
                                {deadlineSort === 'asc' ? 'Earliest First' : 'Latest First'}
                            </button>
                        )}
                        <button
                            onClick={fetchAllData}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            Sync
                        </button>
                    </div>
                </div>

                {error && error.includes('policy') && (
                    <div className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-2xl">
                        <h3 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            Database Policy Restriction
                        </h3>
                        <p className="text-amber-600 text-sm mb-4">You need to enable READ access for this table in Supabase to view items.</p>
                    </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
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
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Transmission Node</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                                <Clock className="w-3.5 h-3.5" />
                                                {new Date(msg.created_at).toLocaleString()}
                                            </div>
                                        </div>

                                        <p className="text-gray-800 text-xl md:text-2xl font-medium leading-relaxed max-w-4xl whitespace-pre-wrap">
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
                                        onClick={() => handleDelete('messages', msg.id)}
                                        className="p-4 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all md:opacity-0 md:group-hover:opacity-100"
                                        title="Delete Message"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Notes Tab */}
                {activeTab === 'notes' && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Notes</h3>
                            <button
                                onClick={() => setShowAddNote(!showAddNote)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                            >
                                {showAddNote ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                {showAddNote ? "Cancel" : "Add Note"}
                            </button>
                        </div>

                        {/* Add Note Form */}
                        {showAddNote && (
                            <form onSubmit={handleAddNote} className="bg-gray-50 p-6 rounded-3xl space-y-4 animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Add New Note
                                </h3>
                                <textarea
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    placeholder="Enter your note here..."
                                    className="w-full min-h-[120px] p-4 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 resize-none font-medium"
                                    required
                                />
                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading || !newNote.trim()}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-colors disabled:opacity-50"
                                    >
                                        Save Note
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {notes.map((note) => (
                                <div key={note.id} className="group relative bg-white border border-gray-100 p-6 rounded-3xl hover:shadow-xl hover:shadow-gray-200/50 transition-all flex flex-col justify-between">
                                    {editingNote?.id === note.id ? (
                                        <form onSubmit={handleEditNote} className="flex flex-col gap-4 h-full">
                                            <textarea
                                                value={editNoteContent}
                                                onChange={(e) => setEditNoteContent(e.target.value)}
                                                className="w-full h-full min-h-[120px] p-3 rounded-xl border border-blue-500/30 outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 resize-none font-medium bg-blue-50/30"
                                                required
                                            />
                                            <div className="flex gap-2 justify-end mt-auto">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingNote(null)}
                                                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading || !editNoteContent.trim()}
                                                    className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(note.created_at).toLocaleString()}
                                                </div>
                                                <p className="text-gray-700 font-medium whitespace-pre-wrap">{note.content}</p>
                                            </div>
                                            <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => {
                                                        setEditingNote(note);
                                                        setEditNoteContent(note.content);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                    title="Edit Note"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('notes', note.id)}
                                                    className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
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
                            <div className="text-center py-12 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                No notes found.
                            </div>
                        )}
                    </div>
                )}

                {/* Deadlines Tab */}
                {activeTab === 'deadlines' && (
                    <div className="space-y-12">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Deadlines</h3>
                            <button
                                onClick={() => setShowAddDeadline(!showAddDeadline)}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 transition-colors"
                            >
                                {showAddDeadline ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                                {showAddDeadline ? "Cancel" : "Add Deadline"}
                            </button>
                        </div>

                        {/* Add Deadline Form */}
                        {showAddDeadline && (
                            <form onSubmit={handleAddDeadline} className="bg-gray-50 p-6 rounded-3xl space-y-6 animate-in fade-in slide-in-from-top-4">
                                <h3 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Add New Deadline
                                </h3>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Description</label>
                                        <input
                                            type="text"
                                            value={newDeadlineDesc}
                                            onChange={(e) => setNewDeadlineDesc(e.target.value)}
                                            placeholder="Project delivery, Task due..."
                                            className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Date</label>
                                            <input
                                                type="date"
                                                value={newDeadlineDate}
                                                onChange={(e) => setNewDeadlineDate(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-2">Time (Optional)</label>
                                            <input
                                                type="time"
                                                value={newDeadlineTime}
                                                onChange={(e) => setNewDeadlineTime(e.target.value)}
                                                className="w-full px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={loading || !newDeadlineDesc.trim() || !newDeadlineDate}
                                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-colors disabled:opacity-50"
                                    >
                                        Save Deadline
                                    </button>
                                </div>
                            </form>
                        )}

                        <div className="space-y-4">
                            {deadlines.map((deadline) => {
                                const isPast = new Date(`${deadline.deadline_date}T${deadline.deadline_time || '23:59'}`) < new Date();

                                if (editingDeadline?.id === deadline.id) {
                                    return (
                                        <form key={deadline.id} onSubmit={handleEditDeadline} className="p-6 bg-blue-50/50 border border-blue-500/20 rounded-3xl space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                                                <div className="md:col-span-6 space-y-1">
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-2">Description</label>
                                                    <input
                                                        type="text"
                                                        value={editDeadlineDesc}
                                                        onChange={(e) => setEditDeadlineDesc(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-blue-100 outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-3 space-y-1">
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-2">Date</label>
                                                    <input
                                                        type="date"
                                                        value={editDeadlineDate}
                                                        onChange={(e) => setEditDeadlineDate(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-blue-100 outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium"
                                                        required
                                                    />
                                                </div>
                                                <div className="md:col-span-3 space-y-1">
                                                    <label className="text-[10px] font-bold text-blue-400 uppercase tracking-widest ml-2">Time</label>
                                                    <input
                                                        type="time"
                                                        value={editDeadlineTime}
                                                        onChange={(e) => setEditDeadlineTime(e.target.value)}
                                                        className="w-full px-4 py-3 rounded-xl border border-blue-100 outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-700 font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingDeadline(null)}
                                                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={loading || !editDeadlineDesc.trim() || !editDeadlineDate}
                                                    className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        </form>
                                    );
                                }

                                return (
                                    <div key={deadline.id} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-gray-100 rounded-3xl hover:border-gray-200 transition-colors">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${isPast ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className={`text-lg font-bold ${isPast ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                                    {deadline.description}
                                                </h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={`text-xs font-bold uppercase tracking-widest ${isPast ? 'text-red-400' : 'text-blue-500'}`}>
                                                        {new Date(deadline.deadline_date).toLocaleDateString()}
                                                    </span>
                                                    {deadline.deadline_time && (
                                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
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
                                                className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                                title="Edit Deadline"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete('deadlines', deadline.id)}
                                                className="p-3 text-gray-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                                                title="Delete Deadline"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                            {deadlines.length === 0 && !loading && (
                                <div className="text-center py-12 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                                    No deadlines scheduled.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Custom Confirmation Modal */}
            {confirmDelete !== null && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setConfirmDelete(null)}
                    />
                    <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 space-y-8 animate-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto">
                            <Trash2 className="w-8 h-8" />
                        </div>

                        <div className="text-center space-y-3">
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Purge Data?</h3>
                            <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                You are about to permanently delete this {confirmDelete.type.slice(0, -1)}. This action is irreversible.
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
                                onClick={() => setConfirmDelete(null)}
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
