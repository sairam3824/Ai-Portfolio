import { useParams, Navigate, Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { getBlogPost } from "./blogData";
import { getBlogContent } from "./blogContent";
import { ArrowLeft, Calendar, Clock, Share2, MessageCircle } from "lucide-react";
import Seo from "../../shared/Seo";

const SITE_URL = "https://saiii.in";

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

    const wordCount = useMemo(() => {
        if (!content) return 0;
        const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        return text.split(' ').filter(word => word.length > 0).length;
    }, [content]);

    if (!post) {
        return <Navigate to="/blogs" replace />;
    }

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const postUrl = `${SITE_URL}/blogs/${id}`;

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

    const publishedDate = post.date ? new Date(post.date) : null;
    const publishedTime = publishedDate && !Number.isNaN(publishedDate.getTime())
        ? publishedDate.toISOString()
        : undefined;

    const breadcrumbs = [
        { name: "Home", url: "/" },
        { name: "Blogs", url: "/blogs" },
        { name: post.title, url: `/blogs/${id}` }
    ];

    const blogPostingSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${postUrl}#article`,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": postUrl
        },
        "headline": post.title,
        "description": post.excerpt,
        "image": `${SITE_URL}/preview.png`,
        "datePublished": publishedTime,
        "dateModified": publishedTime,
        "wordCount": wordCount > 0 ? wordCount : undefined,
        "author": {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            "name": "Sai Ram Maruri",
            "url": SITE_URL
        },
        "publisher": {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            "name": "Sai Ram Maruri",
            "url": SITE_URL
        },
        "keywords": post.tags?.join(", "),
        "articleSection": "Technology",
        "inLanguage": "en-US"
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-20 animate-fade-in min-h-screen bg-white">
            <Seo
                title={`${post.title} | Sai Ram Maruri`}
                description={post.excerpt}
                type="article"
                publishedTime={publishedTime}
                modifiedTime={publishedTime}
                breadcrumbs={breadcrumbs}
                keywords={post.tags}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(blogPostingSchema)}
                </script>
            </Helmet>
            <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-12 font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Writing
            </Link>

            <article>
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight tracking-tight">
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
                    prose-headings:font-bold prose-headings:text-gray-800
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

                {/* Contact CTA */}
                <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <MessageCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Have suggestions or want to discuss?
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Found something interesting, have feedback, or want to discuss ideas around this topic? I'd love to hear from you. Drop me a message — I read and respond to every one.
                            </p>
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default BlogPostPage;
