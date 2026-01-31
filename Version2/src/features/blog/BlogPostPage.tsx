import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { getBlogPost } from "./blogData";
import { getBlogContent } from "./blogContent";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";

const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>();
    const post = getBlogPost(id || "");
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getBlogContent(id).then((html) => {
            setContent(html);
            setLoading(false);
        });
    }, [id]);

    if (!post) {
        return <Navigate to="/blogs" replace />;
    }

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    const handleShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: post.title, url: shareUrl });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                alert("Link copied to clipboard");
            }
        } catch (error) {
            console.error("Error sharing:", error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-screen bg-white">
            <Helmet>
                <title>{post.title} | Sai Ram Maruri</title>
                <meta name="description" content={post.excerpt} />
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.excerpt} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        "headline": post.title,
                        "datePublished": post.date,
                        "author": {
                            "@type": "Person",
                            "name": "Sai Ram Maruri"
                        },
                        "description": post.excerpt
                    })}
                </script>
            </Helmet>
            <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Writing
            </Link>

            <article>
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime}</span>
                        </div>
                        <button
                            onClick={handleShare}
                            className="ml-auto inline-flex items-center gap-2 hover:text-blue-600 transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                            Share
                        </button>
                    </div>
                </header>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                ) : (
                    <div
                        className="prose prose-lg prose-slate max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900
                    prose-p:text-gray-700 prose-p:leading-relaxed
                    prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-xl prose-img:shadow-md"
                        dangerouslySetInnerHTML={{ __html: content || "<p>Content not found.</p>" }}
                    />
                )}

                <div className="mt-16 pt-8 border-t border-gray-100">
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPostPage;
