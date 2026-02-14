import { useState, useMemo, useEffect } from "react";
import { Search, X, BookOpen } from "lucide-react";
import { BlogCard } from "./BlogCard";
import { useBlogPosts } from "./useBlogPosts";

const PRESET_CATEGORIES = [
    { id: "all", label: "All" },
    { id: "ai", label: "AI & ML" },
    { id: "cloud", label: "Cloud" },
    { id: "programming", label: "Engineering" },
    { id: "career", label: "Career" },
];

const categoryKeywords: [string, string[]][] = [
    ["ai", ["ai", "ml", "llm", "gpt"]],
    ["cloud", ["cloud", "aws"]],
    ["programming", ["code", "dev", "react"]],
    ["career", ["career", "interview"]],
];

const tagCategoryCache = new Map<string, string>();

const mapTagToCategory = (tag: string): string => {
    const cached = tagCategoryCache.get(tag);
    if (cached) return cached;
    const t = tag.toLowerCase();
    for (const [cat, keywords] of categoryKeywords) {
        if (keywords.some(k => t.includes(k))) {
            tagCategoryCache.set(tag, cat);
            return cat;
        }
    }
    tagCategoryCache.set(tag, "all");
    return "all";
};

export const BlogSection = () => {
    const { posts: blogPosts, loading } = useBlogPosts();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const handleTagClick = (tag: string) => {
        setSelectedTag(tag);
        setSelectedCategory("all");
        setSearchQuery("");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setSelectedTag(null);
                setSearchQuery("");
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const filteredPosts = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return blogPosts.filter((post) => {
            if (selectedTag) return post.tags.includes(selectedTag);

            const matchesQuery = !q ||
                post.title.toLowerCase().includes(q) ||
                post.excerpt.toLowerCase().includes(q) ||
                post.tags.some((tag: string) => tag.toLowerCase().includes(q));

            if (!matchesQuery) return false;
            if (selectedCategory === "all") return true;

            return post.tags.some((t: string) => mapTagToCategory(t) === selectedCategory);
        });
    }, [blogPosts, searchQuery, selectedCategory, selectedTag]);

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Loading articles...</div>;
    }

    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Technical Publication</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Nexus <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Inklings.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    Exploration of AI architectures, engineering protocols, and the future of digital intelligence.
                </p>
            </header>

            <div className="max-w-5xl mx-auto">
                <div className="sticky top-6 z-40 mb-12 flex flex-col md:flex-row gap-6 items-center justify-center animate-fade-in-up">
                    <div className="flex gap-1 overflow-x-auto p-1 no-scrollbar">
                        {PRESET_CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap duration-300 ${selectedCategory === cat.id
                                    ? "bg-gray-900 text-white shadow-md scale-105"
                                    : "text-gray-500 hover:bg-white hover:text-gray-800 border border-transparent hover:border-gray-100"
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-[280px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search archives..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-100 rounded-full text-sm font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-600/20 transition-all uppercase tracking-wide shadow-sm text-center"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <BlogCard key={post.id} post={post} onTagClick={handleTagClick} />
                        ))
                    ) : (
                        <div className="py-20 text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                                <Search className="w-8 h-8" />
                            </div>
                            <p className="text-gray-500 font-medium">No signal found matching your query.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedCategory("all");
                                    setSelectedTag(null);
                                }}
                                className="text-blue-600 hover:text-blue-700 text-sm font-black uppercase tracking-widest"
                            >
                                Reset Analysis
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Engineering Note */}
            <footer className="mt-20 text-center pb-8 animate-fade-in relative z-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    Sharing Insights • Documenting Journey
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};
