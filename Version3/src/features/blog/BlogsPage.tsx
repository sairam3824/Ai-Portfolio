import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BellRing, Calendar, Clock, Mail, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "../../shared/Seo";
import { blogPosts } from "./blogData";
import { useBlogSubscription } from "./useBlogSubscription";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { ROUTE_PATHS, WRITING_LABEL, WRITING_UPDATES_LABEL, getWritingPath } from "@/data/siteRoutes";
import { NotificationToast } from "@/shared/ui/NotificationToast";

const VERSION_BASE_PATH =
    import.meta.env.BASE_URL === "/"
        ? ""
        : import.meta.env.BASE_URL.replace(/\/$/, "");

const PRESET_CATEGORIES = [
    { id: "all", label: "All" },
    { id: "ai", label: "AI & ML" },
    { id: "cloud", label: "Cloud" },
    { id: "programming", label: "Engineering" },
    { id: "career", label: "Career" },
];

const categoryKeywords: [string, string[]][] = [
    ["ai", ["ai", "ml", "llm", "gpt", "rag", "agents", "a2a", "mcp"]],
    ["cloud", ["cloud", "aws", "serverless", "infra", "bedrock", "sagemaker"]],
    ["programming", ["code", "coding", "dev", "react", "python", "java", "cpp", "ide"]],
    ["career", ["career", "interview", "journey", "leetcode", "codechef"]],
];

const tagCategoryCache = new Map<string, string>();

const mapTagToCategory = (tag: string): string => {
    const cached = tagCategoryCache.get(tag);
    if (cached) return cached;

    const value = tag.toLowerCase();
    for (const [category, keywords] of categoryKeywords) {
        if (keywords.some((keyword) => value.includes(keyword))) {
            tagCategoryCache.set(tag, category);
            return category;
        }
    }

    tagCategoryCache.set(tag, "all");
    return "all";
};

const topicCount = new Set(blogPosts.flatMap((post) => post.tags)).size;
const SUBSCRIBE_DIALOG_AUTO_DISMISS_MS = 3500;

const BlogsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [mobileSummaryId, setMobileSummaryId] = useState<string | null>(null);
    const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(true);
    const { email, setEmail, isLoading, notification, closeNotification, handleSubscribe } = useBlogSubscription();

    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return blogPosts.filter((post) => {
            const matchesQuery =
                !query ||
                post.title.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query));

            if (!matchesQuery) return false;
            if (selectedCategory === "all") return true;

            return post.tags.some((tag) => mapTagToCategory(tag) === selectedCategory);
        });
    }, [searchQuery, selectedCategory]);

    useEffect(() => {
        if (!isSubscribeDialogOpen || email.trim()) return;

        document.body.style.overflow = "hidden";
        const timeoutId = window.setTimeout(() => {
            setIsSubscribeDialogOpen(false);
        }, SUBSCRIBE_DIALOG_AUTO_DISMISS_MS);

        return () => {
            document.body.style.overflow = "";
            window.clearTimeout(timeoutId);
        };
    }, [email, isSubscribeDialogOpen]);

    useEffect(() => {
        if (!isSubscribeDialogOpen || notification?.type !== "success") return;

        const timeoutId = window.setTimeout(() => {
            setIsSubscribeDialogOpen(false);
        }, 1400);

        return () => window.clearTimeout(timeoutId);
    }, [isSubscribeDialogOpen, notification]);

    return (
        <div className="flex flex-col gap-8">
            {isSubscribeDialogOpen && (
                <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-[#17140f]/55 backdrop-blur-md animate-fade-in"
                        onClick={() => !isLoading && setIsSubscribeDialogOpen(false)}
                    />

                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="blog-subscribe-title"
                        className="relative w-full max-w-lg overflow-hidden rounded-[2.4rem] border border-[#dfe4cb] bg-[#fffdf8] shadow-[0_30px_90px_rgba(35,31,24,0.2)] animate-scale-in"
                    >
                        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7b8d42_0%,#c2d18f_100%)]" />

                        <div className="p-7 md:p-9">
                            <div className="mb-7 flex items-start justify-between gap-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef2df] text-[#5d7414]">
                                            <BellRing className="h-5 w-5" />
                                        </div>
                                        <div className="flex items-center gap-2 rounded-full border border-[#d4ddba] bg-[#fdfef8] px-3 py-1">
                                            <Mail className="h-3.5 w-3.5 text-[#5d7414]" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7b7467]">
                                                {WRITING_UPDATES_LABEL}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 id="blog-subscribe-title" className="text-3xl font-black tracking-tight text-[#1c1a14]">
                                            Subscribe to new writing.
                                        </h2>
                                        <p className="mt-2 max-w-[34ch] text-sm font-medium leading-relaxed text-[#7b7467]">
                                            Get fresh essays on AI systems, agents, cloud delivery, and developer workflows straight in your inbox.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsSubscribeDialogOpen(false)}
                                    disabled={isLoading}
                                    aria-label="Close subscribe dialog"
                                    className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#e3dccf] bg-[#fbfaf6] text-[#9a9388] transition-all hover:border-[#d5cebf] hover:text-[#17140f] disabled:opacity-30"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubscribe} className="space-y-4">
                                <label className="block">
                                    <span className="mb-2 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7e8660]">
                                        <Mail className="h-3.5 w-3.5" />
                                        Email Address
                                    </span>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@company.com"
                                        autoComplete="email"
                                        disabled={isLoading}
                                        className="w-full rounded-[1.6rem] border border-[#d8dcbf] bg-[#fbfbf6] px-5 py-4 text-[0.96rem] text-[#17150f] outline-none transition-colors placeholder:text-[#9aa08a] focus:border-[#7b8d42] focus:ring-4 focus:ring-[#dce6b8]/40"
                                    />
                                </label>

                                <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-[#9a9388]">
                                    This popup closes automatically in a few seconds.
                                </p>

                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <button
                                        type="button"
                                        onClick={() => setIsSubscribeDialogOpen(false)}
                                        disabled={isLoading}
                                        className="flex-1 rounded-[1.35rem] border border-[#e3dccf] bg-[#f6f3eb] px-5 py-4 text-xs font-black uppercase tracking-widest text-[#8f887c] transition-all hover:bg-[#f0eadf] disabled:opacity-30"
                                    >
                                        Maybe Later
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-[1.35rem] bg-[#171d10] px-5 py-4 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#5d7414] disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                Subscribing...
                                            </>
                                        ) : (
                                            <>
                                                <BellRing className="h-4 w-4" />
                                                Subscribe
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Seo
                title={`${WRITING_LABEL} | Sai Ram Maruri — AI & Engineering Writing`}
                description="Technical writing by Sai Ram Maruri on GenAI, LLM systems, RAG, cloud infrastructure, agent workflows, MCP, A2A, competitive programming, and software engineering."
                pageType="CollectionPage"
                keywords={["AI Blog", "GenAI Blog", "LLM Tutorial", "RAG Tutorial", "AWS Blog", "Competitive Programming Blog", "Tech Writing", "Sai Ram Maruri Blog", "Context Engineering", "Agentic AI"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: WRITING_LABEL, url: ROUTE_PATHS.writing },
                ]}
            />
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "@id": `${siteMetadata.siteUrl}${VERSION_BASE_PATH}${ROUTE_PATHS.writing}`,
                        "name": `${WRITING_LABEL} | Sai Ram Maruri`,
                        "description": "Technical writing on GenAI, LLM systems, RAG, cloud infrastructure, agent workflows, and software engineering.",
                        "url": `${siteMetadata.siteUrl}${VERSION_BASE_PATH}${ROUTE_PATHS.writing}`,
                        "isPartOf": { "@id": `${siteMetadata.siteUrl}${VERSION_BASE_PATH}/#website` },
                        "about": { "@id": `${siteMetadata.siteUrl}/#person` },
                        "numberOfItems": blogPosts.length,
                        "hasPart": blogPosts.map((post) => ({
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "description": post.excerpt,
                            "url": post.externalLink || `${siteMetadata.siteUrl}${VERSION_BASE_PATH}${getWritingPath(post.id)}`,
                            "datePublished": post.date ? new Date(post.date).toISOString() : undefined,
                            "author": { "@type": "Person", "name": profileDetails.name },
                            "keywords": post.tags?.join(", "),
                        })),
                    })}
                </script>
            </Helmet>

            <section className="rounded-[2.8rem] border border-[#e3ded2] bg-[linear-gradient(180deg,#fcfaf5_0%,#f7f2e8_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(36,32,20,0.05)] sm:px-10 sm:py-12 lg:px-14 lg:py-16">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#868071]">
                    Writing / Research Notes
                </p>

                <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
                    <div className="max-w-[1080px]">
                        <h1 className="portfolio-sans max-w-[10ch] text-[clamp(3.4rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#11100c]">
                            Essays for builders shipping AI.
                        </h1>
                        <p className="mt-7 max-w-[46ch] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.6] text-[#6f695c]">
                            I write about production AI systems, cloud delivery, agent protocols, developer tools, and the habits that help ideas survive contact with the real world.
                        </p>
                    </div>

                    <div className="rounded-[2rem] border border-[#dbe3bf] bg-[linear-gradient(135deg,#fbfcf6_0%,#eef4d8_100%)] p-5 shadow-[0_20px_60px_rgba(95,114,33,0.08)]">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#d4ddba] bg-[#fdfef8] px-3 py-1.5">
                            <BellRing className="h-3.5 w-3.5 text-[#5d7414]" />
                            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#6a7343]">
                                Subscribe
                            </span>
                        </div>

                        <h2 className="mt-4 text-[1.65rem] font-semibold leading-tight tracking-[-0.05em] text-[#17150f]">
                            Get new essays in your inbox.
                        </h2>
                        <p className="mt-3 text-[0.95rem] leading-7 text-[#5f6650]">
                            A quiet stream of writing updates on AI systems, shipping, and developer workflows.
                        </p>

                        <form onSubmit={handleSubscribe} className="mt-5 space-y-3">
                            <label className="block">
                                <span className="mb-2 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#7e8660]">
                                    <Mail className="h-3.5 w-3.5" />
                                    Email Address
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="you@company.com"
                                    autoComplete="email"
                                    disabled={isLoading}
                                    className="w-full rounded-[1.35rem] border border-[#d8dcbf] bg-[#fbfbf6] px-5 py-4 text-[0.96rem] text-[#17150f] outline-none transition-colors placeholder:text-[#9aa08a] focus:border-[#7b8d42]"
                                />
                            </label>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-[1.35rem] bg-[#171d10] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#5d7414] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? (
                                    <>
                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                        Subscribing...
                                    </>
                                ) : (
                                    <>
                                        <BellRing className="h-4 w-4" />
                                        Subscribe to Updates
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-5">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#81806e]">Posts Published</p>
                        <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#11100c]">{blogPosts.length}</p>
                        <p className="mt-3 text-[0.98rem] leading-7 text-[#6f695c]">Long-form notes across AI, cloud, engineering, and competitive programming.</p>
                    </div>
                    <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-5">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#81806e]">Topics Tracked</p>
                        <p className="mt-3 text-[3rem] font-semibold leading-none tracking-[-0.08em] text-[#11100c]">{topicCount}+</p>
                        <p className="mt-3 text-[0.98rem] leading-7 text-[#6f695c]">A rolling archive of agents, retrieval, cloud systems, and developer workflows.</p>
                    </div>
                    <div className="rounded-[1.8rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-5">
                        <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#81806e]">Current Focus</p>
                        <p className="mt-3 text-[1.8rem] font-semibold leading-tight tracking-[-0.05em] text-[#11100c]">Agents, security, and practical shipping velocity.</p>
                    </div>
                </div>
            </section>

            <section className="border-t border-[#e1dbcf] pt-10">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <p className="text-[4.5rem] font-light leading-none tracking-[-0.1em] text-[#ebe7de]">01</p>
                        <h2 className="portfolio-sans -mt-2 text-[clamp(2.2rem,3.8vw,3.6rem)] font-semibold tracking-[-0.06em] text-[#1b2433]">
                            Archive
                            <span className="text-[#4c74ff]">.</span>
                        </h2>
                    </div>

                    <div className="flex w-full flex-col gap-4 lg:max-w-[34rem]">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9aa3b4]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search essays, tools, tags, or topics"
                                className="w-full rounded-full border border-[#d8d0c3] bg-[#fffdf8] py-4 pl-12 pr-12 text-[0.94rem] text-[#243042] outline-none transition-colors placeholder:text-[#9aa3b4] focus:border-[#b8c782]"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[#a0a8b7] transition-colors hover:text-[#243042]"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {PRESET_CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    type="button"
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`rounded-full border px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.16em] transition-colors ${selectedCategory === category.id
                                        ? "border-[#728c1a] bg-[#728c1a] text-white"
                                        : "border-[#d8d0c3] bg-[#fffdf8] text-[#5c564a] hover:border-[#b8c782] hover:text-[#243042]"
                                        }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 space-y-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group relative rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-6 shadow-[0_14px_40px_rgba(61,52,36,0.04)] transition-transform duration-200 hover:-translate-y-0.5"
                            >
                                {post.externalLink ? (
                                    <a href={post.externalLink} target="_blank" rel="noreferrer" className="block">
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#8e97a8]">
                                                    <span className="inline-flex items-center gap-2">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {post.date}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                                <h3 className="mt-4 text-[1.45rem] font-semibold leading-[1.25] tracking-[-0.05em] text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-3 max-w-[72ch] text-[0.96rem] leading-7 text-[#667085]">
                                                    {post.excerpt}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {post.tags.slice(0, 4).map((tag) => (
                                                        <span key={tag} className="rounded-full border border-[#dde2eb] bg-[#f8fafc] px-3 py-1 text-[0.72rem] font-medium text-[#536072]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                                Read
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </a>
                                ) : (
                                    <Link to={getWritingPath(post.id)} className="block">
                                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-[#8e97a8]">
                                                    <span className="inline-flex items-center gap-2">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {post.date}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2">
                                                        <Clock className="h-3.5 w-3.5" />
                                                        {post.readTime}
                                                    </span>
                                                </div>
                                                <h3 className="mt-4 text-[1.45rem] font-semibold leading-[1.25] tracking-[-0.05em] text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                                    {post.title}
                                                </h3>
                                                <p className="mt-3 max-w-[72ch] text-[0.96rem] leading-7 text-[#667085]">
                                                    {post.excerpt}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {post.tags.slice(0, 4).map((tag) => (
                                                        <span key={tag} className="rounded-full border border-[#dde2eb] bg-[#f8fafc] px-3 py-1 text-[0.72rem] font-medium text-[#536072]">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-2 text-[0.9rem] font-semibold text-[#243042] transition-colors group-hover:text-[#4c74ff]">
                                                Read
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </Link>
                                )}

                                <div className="mt-4 lg:hidden">
                                    <button
                                        type="button"
                                        onClick={() => setMobileSummaryId((current) => (current === post.id ? null : post.id))}
                                        className="inline-flex items-center gap-2 rounded-full border border-[#ddd6c9] bg-[#f7f2e8] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#5f594c] transition-colors hover:border-[#c9d793] hover:text-[#243042]"
                                    >
                                        {mobileSummaryId === post.id ? "Hide Summary" : "Quick Summary"}
                                    </button>

                                    {mobileSummaryId === post.id && (
                                        <div className="mt-3 rounded-[1.2rem] border border-[#ded8ca] bg-white/95 p-4 shadow-[0_16px_40px_rgba(36,32,20,0.08)]">
                                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">
                                                Quick Summary
                                            </p>
                                            <p className="mt-3 text-[0.92rem] leading-6 text-[#5f594c]">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="pointer-events-none absolute right-6 top-6 z-20 hidden w-[18rem] rounded-[1.4rem] border border-[#ded8ca] bg-white/95 p-4 opacity-0 shadow-[0_20px_60px_rgba(36,32,20,0.14)] backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:block lg:translate-y-3">
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">
                                        Quick Summary
                                    </p>
                                    <p className="mt-3 overflow-hidden text-[0.92rem] leading-6 text-[#5f594c] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-12 text-center shadow-[0_14px_40px_rgba(61,52,36,0.04)]">
                            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.24em] text-[#8e97a8]">No Match</p>
                            <p className="mx-auto mt-4 max-w-[30ch] text-[1rem] leading-7 text-[#6f695c]">
                                No essay matched the current search and filter combination. Try a broader topic or reset the search.
                            </p>
                        </div>
                    )}
                </div>
            </section>
            {notification && <NotificationToast {...notification} onClose={closeNotification} />}
        </div>
    );
};

export default BlogsPage;
