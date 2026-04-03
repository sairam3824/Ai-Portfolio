import { Search, Sparkles } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { useBlogPosts } from "./useBlogPosts";
import { AIChatDialog } from "./AIChatDialog";
import { Input } from "@/shared/ui/input";

const PRESET_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "dsa", label: "DSA" },
  { id: "languages", label: "Languages" },
  { id: "llms", label: "LLMs" },
  { id: "ai", label: "AI/ML" },
  { id: "cloud", label: "Cloud" },
  { id: "weekly", label: "BiWeekly Digest" }
];

const mapTagToCategory = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes("dsa") || t.includes("leetcode") || t.includes("codechef") || t.includes("competitive")) return "dsa";
  if (t.includes("java") || t.includes("python") || t.includes("cpp") || t.includes("programming") || t.includes("languages")) return "languages";
  if (t.includes("llm") || t.includes("llms") || t.includes("langchain") || t.includes("gpt")) return "llms";
  if (t.includes("ai") || t.includes("ml") || t.includes("machine")) return "ai";
  if (t.includes("cloud") || t.includes("aws") || t.includes("sagemaker") || t.includes("bedrock")) return "cloud";
  if (t.includes("digest") || t.includes("biweekly") || t.includes("weekly")) return "weekly";
  return "";
};

export const BlogSection = () => {
  const { posts: blogPosts, loading } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState("");

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
    setSelectedCategory("all");
    setSearchQuery("");
  };

  // Add ESC key listener to clear tag filter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedTag) {
        setSelectedTag(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTag]);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    PRESET_CATEGORIES.forEach((c) => seen.add(c.id));
    blogPosts.forEach((p) => {
      p.tags.forEach((t: string) => {
        const c = mapTagToCategory(t);
        if (c && !seen.has(c)) seen.add(c);
      });
    });
    return PRESET_CATEGORIES.filter(c => seen.has(c.id)).concat(
      Array.from(seen).filter(s => !PRESET_CATEGORIES.map(pc => pc.id).includes(s) && s !== "all").map(s => ({ id: s, label: s[0].toUpperCase() + s.slice(1) }))
    );
  }, [blogPosts]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();

    blogPosts.forEach((post) => {
      // count each post once per matched category (based on tags)
      const seenForPost = new Set<string>();
      post.tags.forEach((tag: string) => {
        const c = mapTagToCategory(tag);
        if (c) seenForPost.add(c);
      });
      // increment counts for the categories identified for this post
      seenForPost.forEach((c) => m.set(c, (m.get(c) || 0) + 1));
    });

    // set total for 'all'
    m.set("all", blogPosts.length);

    return m;
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return blogPosts.filter((post) => {
      // First check if a specific tag is selected
      if (selectedTag) {
        return post.tags.includes(selectedTag);
      }

      const matchesQuery = !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q) || post.tags.some((tag: string) => tag.toLowerCase().includes(q));
      if (!matchesQuery) return false;
      if (selectedCategory === "all") return true;
      if (selectedCategory === "languages") return post.tags.some((t: string) => mapTagToCategory(t) === "languages");
      if (selectedCategory === "dsa") return post.tags.some((t: string) => mapTagToCategory(t) === "dsa");
      if (selectedCategory === "llms") return post.tags.some((t: string) => mapTagToCategory(t) === "llms");
      if (selectedCategory === "ai") return post.tags.some((t: string) => mapTagToCategory(t) === "ai");
      if (selectedCategory === "cloud") return post.tags.some((t: string) => mapTagToCategory(t) === "cloud");
      if (selectedCategory === "weekly") return post.tags.some((t: string) => mapTagToCategory(t) === "weekly");
      return post.tags.some((t: string) => mapTagToCategory(t) === selectedCategory || t.toLowerCase() === selectedCategory);
    });
  }, [blogPosts, searchQuery, selectedCategory, selectedTag]);

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        <h2 className="text-3xl font-bold text-foreground text-center">Writing</h2>
        <div className="text-center py-8">Loading writing...</div>
      </div>
    );
  }

  return (
    <section className="animate-fade-in space-y-6" aria-labelledby="writing-title">
      <h2 id="writing-title" className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        Writing
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" role="region" aria-label="Writing search options">
          {/* Left Box - Local Writing Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" aria-hidden="true" />
            <Input
              type="text"
              placeholder="Search my writing..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search writing by title, content, or tags"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Search through writing by typing keywords. Press Escape to clear.
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search query"
              >
                ×
              </button>
            )}
          </div>

          {/* Right Box - AI Chat Search */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (aiQuery.trim()) {
                setAiChatOpen(true);
              }
            }}
            className="relative"
            role="search"
            aria-label="AI-powered writing search"
          >
            <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" aria-hidden="true" />
            <Input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask AI anything..."
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              aria-label="Ask AI questions about writing"
              aria-describedby="ai-search-help"
            />
            <div id="ai-search-help" className="sr-only">
              Ask AI questions about writing and get intelligent responses
            </div>
          </form>
        </div>



        {/* Horizontally scrollable chips */}
        <div className="mt-4">
          <div className="overflow-x-auto no-scrollbar px-1">
            <div
              className="inline-flex gap-2 py-2 whitespace-nowrap justify-center w-max mx-auto"
              role="tablist"
              aria-label="Writing categories"
            >
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`inline-block shrink-0 px-3 py-1 rounded-full text-sm font-medium focus:outline-none transition ${selectedCategory === c.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                  role="tab"
                  aria-selected={selectedCategory === c.id}
                >
                  {c.label} ({counts.get(c.id) || 0})
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Active Tag Filter Display */}
        {selectedTag && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-600">Filtering by tag:</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="hover:text-blue-900"
                aria-label="Clear tag filter"
              >
                ×
              </button>
            </span>
          </div>
        )}

        <div className="space-y-5" role="region" aria-label="Writing pieces" aria-live="polite">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} onTagClick={handleTagClick} />
            ))
          ) : (
            <div className="text-center py-8" role="status">
              <p className="text-gray-500 text-base">
                No writing found {selectedTag ? `with tag "${selectedTag}"` : searchQuery ? `matching "${searchQuery}"` : ""}
              </p>
              <p className="text-gray-400 text-sm mt-2">Try a different search or category</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 p-4 rounded-lg mt-8 max-w-4xl mx-auto px-4">
        <p className="text-amber-900 dark:text-amber-200 text-sm text-center">
          <strong>Disclaimer:</strong> These articles feature curated industry updates and AI-assisted writing. Information is accurate as of publication but may change over time. Please verify technical or business decisions independently.
        </p>
      </div>

      <footer className="flex items-center justify-center gap-6 text-sm text-muted-foreground max-w-4xl mx-auto px-4">
        <Link to="/privacy-policy" className="hover:text-foreground underline underline-offset-4 transition-colors">Privacy Policy</Link>
        <Link to="/terms-and-conditions" className="hover:text-foreground underline underline-offset-4 transition-colors">Terms & Conditions</Link>
      </footer>

      <AIChatDialog
        open={aiChatOpen}
        onOpenChange={(open) => {
          setAiChatOpen(open);
          if (!open) setAiQuery('');
        }}
        initialQuery={aiQuery}
      />
    </section>
  );
};
