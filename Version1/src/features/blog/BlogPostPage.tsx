import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Eye, Share2, Link as LinkIcon, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import Layout from "@/shared/components/Layout";
import { getBlogContent, getBlogPost } from "@/data/blogData";
import { profileDetails } from "@/data/siteMetadata";
import { Button } from "@/shared/ui/button";
import { MessageDialog } from "../contact/MessageDialog";

const BlogPostPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [copied, setCopied] = useState(false);
    const post = getBlogPost(slug || "");
    const [content, setContent] = useState("");
    const [contentLoading, setContentLoading] = useState(false);
    const [messageOpen, setMessageOpen] = useState(false);

    useEffect(() => {
        if (!post) {
            setContent("");
            setContentLoading(false);
            return;
        }

        let cancelled = false;

        const loadContent = async () => {
            if (post.content) {
                setContent(post.content);
                return;
            }

            setContentLoading(true);

            try {
                const loadedContent = await getBlogContent(post.id);
                if (!cancelled) {
                    setContent(loadedContent ?? "");
                }
            } finally {
                if (!cancelled) {
                    setContentLoading(false);
                }
            }
        };

        loadContent();

        return () => {
            cancelled = true;
        };
    }, [post]);

    if (!post) {
        return <Navigate to="/blogs" replace />;
    }

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const publishedDate = post.date ? new Date(post.date) : null;
    const publishedTime = publishedDate && !Number.isNaN(publishedDate.getTime())
        ? publishedDate.toISOString()
        : undefined;

    const handleNativeShare = async () => {
        try {
            if (navigator.share) {
                await navigator.share({ title: post.title, url: shareUrl });
            } else {
                await navigator.clipboard.writeText(shareUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
            }
        } catch {
            // Ignore errors
        }
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // Ignore errors
        }
    };

    return (
        <Layout
            title={`${post.title} | ${profileDetails.name}`}
            description={post.excerpt}
            canonicalPath={`/blogs/${slug}`}
            type="article"
            pageType="CollectionPage"
            keywords={post.tags}
            publishedTime={publishedTime}
            modifiedTime={publishedTime}
        >
            <div className="max-w-4xl mx-auto px-4 py-8">
                <Link
                    to="/blogs"
                    className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blogs
                </Link>

                <article className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="p-6 md:p-10">
                        <header className="mb-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground text-sm">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Eye className="w-4 h-4" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </header>

                        <div className="prose prose-lg max-w-none dark:prose-invert leading-relaxed text-foreground [&>p]:text-foreground/90 [&>ul>li]:text-foreground/90 [&>ol>li]:text-foreground/90">
                            {contentLoading ? <p>Loading article...</p> : null}
                            {content ? <div dangerouslySetInnerHTML={{ __html: content }} /> : null}
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleNativeShare}
                                className="gap-2"
                            >
                                <Share2 className="w-4 h-4" /> Share
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={copyLink}
                                className="gap-2"
                            >
                                <LinkIcon className="w-4 h-4" /> {copied ? "Copied" : "Copy link"}
                            </Button>
                        </div>

                        {/* Feedback / Message Section */}
                        <div className="mt-8 pt-8 border-t border-border">
                            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 text-center">
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Have thoughts or suggestions?
                                </h3>
                                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                                    I'd love to hear your feedback on this article. Whether it's a suggestion,
                                    correction, or just a friendly hello, feel free to reach out!
                                </p>
                                <Button
                                    onClick={() => setMessageOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>

            <MessageDialog
                open={messageOpen}
                onOpenChange={setMessageOpen}
            />
        </Layout>
    );
};

export default BlogPostPage;
