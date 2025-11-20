import { CheckCircle2, ShieldCheck, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "./BlogCard";
import { useBlogPosts } from "./useBlogPosts";
import { useSubscription } from "./useSubscription";
import { SubscriptionDialog } from "@/features/chat/SubscriptionDialog";
import { Input } from "@/shared/ui/input";

export const BlogSection = () => {
  const { posts: blogPosts, loading } = useBlogPosts();
  const { subscribe, isSubmitting } = useSubscription();
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

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
        Blog
      </h2>

      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search blogs by title, content, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No blogs found matching "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>

      <section
        aria-labelledby="subscribe-title"
        className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 mt-6"
      >
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
              <input
                type="email"
                name="email"
                required
                aria-label="Email address"
                placeholder="you@example.com"
                className="w-full sm:w-auto flex-1 rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>

          </div>
        </div>
      </section>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-8">
        <p className="text-amber-900 text-sm text-center">
          <strong>Disclaimer:</strong> These articles feature curated industry updates and AI-assisted writing. Information is accurate as of publication but may change over time. Please verify technical or business decisions independently. We’re not responsible for third-party content linked here.
        </p>
      </div>

      <footer className="flex items-center justify-center gap-6 text-sm text-gray-600">
        <Link
          to="/privacy-policy"
          className="hover:text-gray-900 underline underline-offset-4 transition-colors"
        >
          Privacy Policy
        </Link>
        <Link
          to="/terms-and-conditions"
          className="hover:text-gray-900 underline underline-offset-4 transition-colors"
        >
          Terms & Conditions
        </Link>
      </footer>

      <SubscriptionDialog
        open={subscriptionDialogOpen}
        onOpenChange={setSubscriptionDialogOpen}
      />
    </div>
  );
};
