import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Clock, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Seo from "../../shared/Seo";
import { blogPosts } from "./blogData";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { ROUTE_PATHS, WRITING_LABEL, getWritingPath } from "@/data/siteRoutes";

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

const BlogsPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [mobileSummaryId, setMobileSummaryId] = useState<string | null>(null);

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

    return (
        <div className="flex flex-col gap-8">
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

                <div className="mt-8 grid gap-8 xl:items-end">
                    <div className="max-w-[1080px]">
                        <h1 className="portfolio-sans max-w-[10ch] text-[clamp(3.4rem,8vw,7rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#11100c]">
                            Essays for builders shipping AI.
                        </h1>
                        <p className="mt-7 max-w-[46ch] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.6] text-[#6f695c]">
                            I write about production AI systems, cloud delivery, agent protocols, developer tools, and the habits that help ideas survive contact with the real world.
                        </p>
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
        </div>
    );
};

export default BlogsPage;
