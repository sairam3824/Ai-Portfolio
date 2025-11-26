import { CheckCircle2, ShieldCheck, Search } from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { useBlogPosts } from "./useBlogPosts";
import { useSubscription } from "./useSubscription";
import { SubscriptionDialog } from "@/features/chat/SubscriptionDialog";
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
  const { subscribe, isSubmitting } = useSubscription();
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

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
  }, [blogPosts, searchQuery, selectedCategory]);

  if (loading) {
    return (
      <div className="animate-fade-in space-y-6">
        <h2 className="text-3xl font-bold text-foreground text-center">Blog</h2>
        <div className="text-center py-8">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
      Tech Insights...
      </h2>

      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search blogs by title, content, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>


        
        {/* Horizontally scrollable chips */}
        <div className="mt-4">
          <div className="overflow-x-auto no-scrollbar px-1">
            <div
              className="inline-flex gap-2 py-2 whitespace-nowrap justify-center w-max mx-auto"
              role="tablist"
              aria-label="Blog categories"
            >
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`inline-block shrink-0 px-3 py-1 rounded-full text-sm font-medium focus:outline-none transition ${
                    selectedCategory === c.id
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

      <div className="max-w-4xl mx-auto px-4 space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No blogs found matching "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try a different search or category</p>
          </div>
        )}
      </div>

      <section aria-labelledby="subscribe-title" className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 mt-6 max-w-4xl mx-auto px-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 id="subscribe-title" className="text-lg font-semibold text-gray-900">
              Subscribe to Blog Updates
            </h4>
            <p className="text-gray-700 text-sm mb-3">
              Get email notifications whenever I publish new blog on GenAI, cloud, and dev-tools highlights. No fixed schedule, no spam — unsubscribe anytime.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                const email = formData.get("email") as string;
                const success = await subscribe(email);
                if (success) {
                  setSubscriptionDialogOpen(true);
                  form.reset();
                }
              }}
            >
              <input type="email" name="email" required aria-label="Email address" placeholder="you@example.com" className="w-full sm:w-auto flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" disabled={isSubmitting} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                <CheckCircle2 className="w-4 h-4" />
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-8 max-w-4xl mx-auto px-4">
        <p className="text-amber-900 text-sm text-center">
          <strong>Disclaimer:</strong> These articles feature curated industry updates and AI-assisted writing. Information is accurate as of publication but may change over time. Please verify technical or business decisions independently.
        </p>
      </div>

      <footer className="flex items-center justify-center gap-6 text-sm text-gray-600 max-w-4xl mx-auto px-4">
        <Link to="/privacy-policy" className="hover:text-gray-900 underline underline-offset-4 transition-colors">Privacy Policy</Link>
        <Link to="/terms-and-conditions" className="hover:text-gray-900 underline underline-offset-4 transition-colors">Terms & Conditions</Link>
      </footer>

      <SubscriptionDialog open={subscriptionDialogOpen} onOpenChange={setSubscriptionDialogOpen} />
    </div>
  );
};
