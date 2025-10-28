import { X, Share2, Link as LinkIcon, CheckCircle2, ShieldCheck, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts, getBlogPost } from "@/content/blogs";
import { SubscriptionDialog } from "@/components/SubscriptionDialog";
import { Input } from "@/components/ui/input";

export const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [subscriptionDialogOpen, setSubscriptionDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const openModal = (postId: string) => {
    lastFocusedRef.current = document.activeElement as HTMLElement;
    setSelectedPost(postId);
    document.body.style.overflow = "hidden"; // lock scroll
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = ""; // restore scroll
    setTimeout(() => lastFocusedRef.current?.focus?.(), 0); // restore focus
  };

  // Handle ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPost !== null) closeModal();
    };
    if (selectedPost !== null) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selectedPost]);

  // Focus the close button when modal opens
  useEffect(() => {
    if (selectedPost !== null) {
      setTimeout(() => closeBtnRef.current?.focus(), 0);
    }
  }, [selectedPost]);

  const currentPost = selectedPost ? getBlogPost(selectedPost) : null;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "https://saiii.in";
  const shareTitle = currentPost?.title || "Blog Post";

  const handleNativeShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch {
      /* ignore */
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter((post) => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        Blog
      </h2>

      {/* Search Bar */}
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

      {/* Dynamic Blog Posts */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onReadMore={post.content ? openModal : undefined}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No blogs found matching "{searchQuery}"</p>
            <p className="text-gray-400 text-sm mt-2">Try searching with different keywords</p>
          </div>
        )}
      </div>

      {/* 2️⃣ Subscribe CTA (moved up) */}
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

                try {
                  const response = await fetch("https://formspree.io/f/mnnoqkzr", {
                    method: "POST",
                    headers: {
                      Accept: "application/json",
                    },
                    body: formData,
                  });

                  if (response.ok) {
                    setSubscriptionDialogOpen(true);
                    form.reset();
                  } else {
                    alert("❌ Something went wrong, please try again.");
                  }
                } catch {
                  alert("⚠️ Network issue! Try again later.");
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                <CheckCircle2 className="w-4 h-4" /> Subscribe
              </button>
            </form>

          </div>
        </div>
      </section>

      {/* 3️⃣ Disclaimer (moved below Subscribe) */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mt-8">
        <p className="text-amber-900 text-sm text-center">
          <strong>Disclaimer:</strong> These articles feature curated industry updates and AI-assisted writing. Information is accurate as of publication but may change over time. Please verify technical or business decisions independently. We’re not responsible for third-party content linked here.
        </p>
      </div>

      {/* 4️⃣ Legal footer links (last) */}
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

      {/* Modal */}
      {selectedPost && (
        <div
          id="digest-modal-backdrop"
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
          aria-hidden="true"
        >
          <div
            id="digest-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="digest-title"
            aria-describedby="digest-content"
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-gray-200 p-4 sm:p-6 flex justify-between items-center rounded-t-2xl">
              <h3 id="digest-title" className="text-2xl font-bold text-gray-900">
                {currentPost?.title || "Blog Post"}
              </h3>
              <button
                ref={closeBtnRef}
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div id="digest-content" className="p-6">
              <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
                {currentPost?.content && (
                  <div dangerouslySetInnerHTML={{ __html: currentPost.content }} />
                )}

                {/* Share buttons for modal */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleNativeShare}
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
                  >
                    <Share2 className="w-4 h-4" /> Share
                  </button>
                  <button
                    onClick={copyLink}
                    className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm transition-colors"
                  >
                    <LinkIcon className="w-4 h-4" /> {copied ? "Copied" : "Copy link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Success Dialog */}
      <SubscriptionDialog
        open={subscriptionDialogOpen}
        onOpenChange={setSubscriptionDialogOpen}
      />
    </div>
  );
};
