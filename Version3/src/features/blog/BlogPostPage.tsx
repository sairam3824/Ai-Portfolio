import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { blogPosts, getBlogPost } from "./blogData";
import { getBlogContent } from "./blogContent";
import { ArrowLeft, ArrowRight, BookOpenText, Calendar, Clock3, Copy, MessageCircle, Share2 } from "lucide-react";
import Seo from "../../shared/Seo";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";

const SITE_URL = siteMetadata.siteUrl;
const VERSION_BASE_PATH =
    import.meta.env.BASE_URL === "/"
        ? ""
        : import.meta.env.BASE_URL.replace(/\/$/, "");

interface TocHeading {
    id: string;
    text: string;
    level: 2 | 3;
}

const slugifyHeading = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const parseReadTimeMinutes = (value: string) => {
    const match = value.match(/\d+/);
    return match ? Number(match[0]) : null;
};

const enrichBlogHtml = (html: string | null) => {
    if (!html || typeof DOMParser === "undefined") {
        return { html, headings: [] as TocHeading[] };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const headingCounts = new Map<string, number>();

    const headings = Array.from(doc.querySelectorAll("h2, h3")).map((heading) => {
        const text = heading.textContent?.trim() || "";
        const baseId = slugifyHeading(text) || "section";
        const count = headingCounts.get(baseId) ?? 0;
        headingCounts.set(baseId, count + 1);
        const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

        heading.id = id;

        return {
            id,
            text,
            level: Number(heading.tagName.slice(1)) as 2 | 3,
        };
    });

    return {
        html: doc.body.innerHTML,
        headings,
    };
};

const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>();
    const post = getBlogPost(id || "");
    const [content, setContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [shareLabel, setShareLabel] = useState("Share");
    const [readingProgress, setReadingProgress] = useState(0);
    const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);

    const { html: renderedContent, headings } = useMemo(() => enrichBlogHtml(content), [content]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
        setReadingProgress(0);
        setActiveHeadingId(null);
    }, [id]);

    useEffect(() => {
        if (!id) return;

        let isActive = true;
        setLoading(true);

        getBlogContent(id)
            .then((html) => {
                if (!isActive) return;
                setContent(html);
            })
            .catch((error) => {
                console.error("Error loading blog content:", error);
                if (!isActive) return;
                setContent(null);
            })
            .finally(() => {
                if (isActive) {
                    setLoading(false);
                }
            });

        return () => {
            isActive = false;
        };
    }, [id]);

    const wordCount = useMemo(() => {
        if (!renderedContent) return 0;
        const text = renderedContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
        return text.split(" ").filter((word) => word.length > 0).length;
    }, [renderedContent]);

    const relatedPosts = useMemo(() => {
        if (!post) return [];

        const currentTags = new Set(post.tags);

        return blogPosts
            .map((candidate, index) => ({
                candidate,
                index,
                score:
                    candidate.id === post.id || candidate.externalLink
                        ? -1
                        : candidate.tags.reduce((sum, tag) => sum + (currentTags.has(tag) ? 1 : 0), 0),
            }))
            .filter((entry) => entry.score > 0)
            .sort((left, right) => right.score - left.score || left.index - right.index)
            .slice(0, 2)
            .map((entry) => entry.candidate);
    }, [post]);

    useEffect(() => {
        if (shareLabel === "Share") return;

        const timer = window.setTimeout(() => {
            setShareLabel("Share");
        }, 2200);

        return () => window.clearTimeout(timer);
    }, [shareLabel]);

    useEffect(() => {
        if (loading || !renderedContent) {
            setReadingProgress(0);
            return;
        }

        const updateProgress = () => {
            const article = document.getElementById("blog-article-content");
            if (!article) {
                setReadingProgress(0);
                return;
            }

            const rect = article.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollTop = window.scrollY || window.pageYOffset;
            const articleTop = scrollTop + rect.top;
            const articleBottom = articleTop + article.offsetHeight;
            const start = Math.max(articleTop - 120, 0);
            const end = Math.max(articleBottom - viewportHeight + 160, start + 1);

            if (scrollTop <= start) {
                setReadingProgress((current) => current);
                return;
            }

            if (scrollTop >= end) {
                setReadingProgress(100);
                return;
            }

            const nextValue = ((scrollTop - start) / (end - start)) * 100;
            setReadingProgress((current) => Math.max(current, Math.min(100, Math.max(0, nextValue))));
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, [loading, renderedContent]);

    useEffect(() => {
        if (loading || headings.length === 0) {
            setActiveHeadingId(null);
            return;
        }

        const headingElements = headings
            .map((heading) => document.getElementById(heading.id))
            .filter((element): element is HTMLElement => Boolean(element));

        if (headingElements.length === 0) {
            setActiveHeadingId(null);
            return;
        }

        setActiveHeadingId(headingElements[0].id);

        const observer = new IntersectionObserver(
            (entries) => {
                const nextVisible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)[0];

                if (nextVisible?.target.id) {
                    setActiveHeadingId(nextVisible.target.id);
                }
            },
            {
                rootMargin: "-18% 0px -68% 0px",
                threshold: [0, 1],
            },
        );

        headingElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, [headings, loading]);

    if (!post) {
        return <Navigate to="/blogs" replace />;
    }

    const postUrl = `${SITE_URL}${VERSION_BASE_PATH}/blogs/${id}`;
    const readingMinutes = parseReadTimeMinutes(post.readTime);

    const handleShare = async () => {
        const shareUrl = typeof window !== "undefined" ? window.location.href : postUrl;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: shareUrl,
                });
                setShareLabel("Shared");
                return;
            }

            if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareUrl);
                setShareLabel("Copied");
                return;
            }

            setShareLabel("Open URL");
        } catch (error) {
            console.error("Error sharing:", error);
            setShareLabel("Try again");
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
            "name": profileDetails.name,
            "url": SITE_URL
        },
        "publisher": {
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            "name": profileDetails.name,
            "url": SITE_URL
        },
        "keywords": post.tags?.join(", "),
        "articleSection": "Technology",
        "inLanguage": "en-US"
    };

    return (
        <div className="mx-auto min-h-screen max-w-[1320px] px-4 py-6 animate-fade-in sm:px-6 md:py-10">
            <div
                className="fixed left-0 top-0 z-[70] h-1 bg-[#728c1a] shadow-[0_0_24px_rgba(114,140,26,0.45)] transition-[width] duration-150"
                style={{ width: `${readingProgress}%` }}
            />
            <Seo
                title={`${post.title} | Sai Ram Maruri`}
                description={post.excerpt}
                type="article"
                canonical={postUrl}
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
            <article className="space-y-8">
                <section className="relative overflow-hidden rounded-[2.8rem] border border-[#e3dccf] bg-[linear-gradient(180deg,rgba(255,253,248,0.98)_0%,rgba(246,241,231,0.98)_100%)] px-6 py-8 shadow-[0_30px_90px_rgba(36,32,20,0.06)] sm:px-10 sm:py-12 lg:px-14">
                    <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(114,140,26,0.14),transparent_65%)]" />
                    <div className="relative">
                        <Link
                            to="/blogs"
                            className="inline-flex items-center gap-2 rounded-full border border-[#ddd6c8] bg-white/80 px-4 py-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#5f594c] transition-colors hover:border-[#c9d793] hover:text-[#243042]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Writing
                        </Link>

                        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start">
                            <div>
                                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-[#7b8361]">
                                    Essay / Long-form Notes
                                </p>
                                <h1 className="portfolio-sans mt-5 max-w-[12ch] text-[clamp(2.8rem,6vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-[#11100c]">
                                    {post.title}
                                </h1>
                                <p className="portfolio-serif mt-6 max-w-[58ch] text-[clamp(1.12rem,1.7vw,1.45rem)] leading-[1.8] text-[#5f594c]">
                                    {post.excerpt}
                                </p>

                                <div className="mt-8 flex flex-wrap gap-3 text-[0.82rem] font-semibold text-[#4f5a2d]">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-[#d9d5c8] bg-white/78 px-4 py-2">
                                        <Calendar className="h-4 w-4" />
                                        {post.date}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-[#d9d5c8] bg-white/78 px-4 py-2">
                                        <Clock3 className="h-4 w-4" />
                                        {post.readTime}
                                    </span>
                                    {wordCount > 0 && (
                                        <span className="inline-flex items-center gap-2 rounded-full border border-[#d9d5c8] bg-white/78 px-4 py-2">
                                            <BookOpenText className="h-4 w-4" />
                                            {wordCount.toLocaleString()} words
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-[2rem] border border-[#e1dbcf] bg-white/72 p-5 shadow-[0_18px_45px_rgba(61,52,36,0.05)] backdrop-blur-sm">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">
                                    Reading Snapshot
                                </p>
                                <div className="mt-4 space-y-4">
                                    <div>
                                        <p className="text-[2.3rem] font-semibold leading-none tracking-[-0.08em] text-[#11100c]">
                                            {readingMinutes ? `${readingMinutes}m` : post.readTime}
                                        </p>
                                        <p className="mt-2 text-[0.94rem] leading-7 text-[#6f695c]">
                                            Settle in for a focused read with cleaner spacing, calmer type, and quicker section jumps.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleShare}
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c3] bg-[#fffdf8] px-4 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.18em] text-[#243042] transition-colors hover:border-[#b8c782] hover:text-[#4c74ff]"
                                    >
                                        {shareLabel === "Copied" ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                                        {shareLabel}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,780px)_280px] xl:items-start xl:justify-between">
                    <div className="min-w-0">
                        {headings.length > 0 && (
                            <details className="mb-5 rounded-[1.7rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-4 shadow-[0_16px_40px_rgba(61,52,36,0.04)] xl:hidden">
                                <summary className="cursor-pointer list-none text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-[#243042]">
                                    Jump Through The Essay
                                </summary>
                                <div className="mt-4 space-y-2">
                                    {headings.map((heading) => (
                                        <a
                                            key={heading.id}
                                            href={`#${heading.id}`}
                                            className={`block rounded-2xl px-3 py-2 text-sm transition-colors ${
                                                heading.level === 3 ? "ml-4" : ""
                                            } ${
                                                activeHeadingId === heading.id
                                                    ? "bg-[#eef4d4] text-[#34451a]"
                                                    : "text-[#5f594c] hover:bg-[#f6f2e8] hover:text-[#243042]"
                                            }`}
                                        >
                                            {heading.text}
                                        </a>
                                    ))}
                                </div>
                            </details>
                        )}

                        <div
                            id="blog-article-content"
                            className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8]/95 px-5 py-8 shadow-[0_18px_50px_rgba(61,52,36,0.05)] sm:px-8 sm:py-10 lg:px-10"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center py-24">
                                    <div className="h-10 w-10 rounded-full border-2 border-[#d5e0aa] border-t-[#728c1a] animate-spin" />
                                </div>
                            ) : (
                                <div
                                    className="blog-content prose prose-lg max-w-none prose-slate lg:prose-xl"
                                    dangerouslySetInnerHTML={{ __html: renderedContent || "<p>Content not found.</p>" }}
                                />
                            )}
                        </div>

                        <div className="mt-8 rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-6 shadow-[0_16px_40px_rgba(61,52,36,0.04)] sm:px-6">
                            <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#8a8377]">
                                Topics In This Essay
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="rounded-full border border-[#ddd6c9] bg-[#f6f2e8] px-3.5 py-1.5 text-[0.78rem] font-medium text-[#5f594c]"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {relatedPosts.length > 0 && (
                            <section className="mt-8 rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-6 shadow-[0_16px_40px_rgba(61,52,36,0.04)] sm:px-6">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#8a8377]">
                                            Continue Reading
                                        </p>
                                        <h2 className="portfolio-sans mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.05em] text-[#11100c]">
                                            Related essays worth opening next.
                                        </h2>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    {relatedPosts.map((relatedPost) => (
                                        <Link
                                            key={relatedPost.id}
                                            to={`/blogs/${relatedPost.id}`}
                                            className="group rounded-[1.6rem] border border-[#e1dbcf] bg-[#fdfaf4] p-5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#cfd8ab]"
                                        >
                                            <div className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[#8e97a8]">
                                                <span className="inline-flex items-center gap-2">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {relatedPost.date}
                                                </span>
                                                <span className="inline-flex items-center gap-2">
                                                    <Clock3 className="h-3.5 w-3.5" />
                                                    {relatedPost.readTime}
                                                </span>
                                            </div>
                                            <h3 className="mt-4 text-[1.3rem] font-semibold leading-[1.25] tracking-[-0.04em] text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                                {relatedPost.title}
                                            </h3>
                                            <p className="mt-3 text-[0.96rem] leading-7 text-[#6f695c]">
                                                {relatedPost.excerpt}
                                            </p>
                                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                                Read next
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="mt-8 rounded-[2rem] border border-[#dae5b5] bg-[linear-gradient(135deg,#f6f9ea_0%,#eef4d8_45%,#f9fbf1_100%)] p-5 shadow-[0_18px_50px_rgba(96,122,34,0.08)] sm:p-6 md:p-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#dfe9b8] text-[#5d7414]">
                                    <MessageCircle className="h-5 w-5" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="portfolio-sans text-[1.45rem] font-semibold tracking-[-0.04em] text-[#11100c]">
                                        Have a counterpoint, idea, or question?
                                    </h3>
                                    <p className="max-w-[58ch] text-[0.98rem] leading-7 text-[#5f594c]">
                                        If the piece sparked a thought or you want to discuss the system behind it, send me a note. I read every message and enjoy good technical conversations.
                                    </p>
                                    <Link
                                        to="/contact"
                                        className="inline-flex items-center gap-2 rounded-full bg-[#1b2433] px-5 py-3 text-[0.82rem] font-semibold uppercase tracking-[0.16em] text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#253044]"
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        Get in Touch
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <aside className="hidden xl:block">
                        <div className="sticky top-28 space-y-4">
                            <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] p-5 shadow-[0_16px_40px_rgba(61,52,36,0.04)]">
                                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">
                                    Reading Progress
                                </p>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ece6da]">
                                    <div
                                        className="h-full rounded-full bg-[#728c1a] transition-[width] duration-150"
                                        style={{ width: `${readingProgress}%` }}
                                    />
                                </div>
                                <p className="mt-3 text-[0.92rem] leading-7 text-[#5f594c]">
                                    {Math.round(readingProgress)}% through this essay.
                                </p>
                            </div>

                            {headings.length > 0 && (
                                <nav className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] p-5 shadow-[0_16px_40px_rgba(61,52,36,0.04)]">
                                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">
                                        On This Page
                                    </p>
                                    <div className="mt-4 space-y-1.5">
                                        {headings.map((heading) => (
                                            <a
                                                key={heading.id}
                                                href={`#${heading.id}`}
                                                className={`block rounded-2xl px-3 py-2 text-sm leading-6 transition-colors ${
                                                    heading.level === 3 ? "ml-4" : ""
                                                } ${
                                                    activeHeadingId === heading.id
                                                        ? "bg-[#eef4d4] text-[#34451a]"
                                                        : "text-[#5f594c] hover:bg-[#f6f2e8] hover:text-[#243042]"
                                                }`}
                                            >
                                                {heading.text}
                                            </a>
                                        ))}
                                    </div>
                                </nav>
                            )}
                        </div>
                    </aside>
                </div>
            </article>
        </div>
    );
};

export default BlogPostPage;
