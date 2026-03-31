import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts } from "@/features/blog/blogData";
import { HomeSectionHeader } from "@/features/home/components/HomeSectionHeader";
import { ROUTE_PATHS, getWritingPath } from "@/data/siteRoutes";

const latestPosts = blogPosts.slice(0, 3);

const blogAccent: Record<string, string> = {
    blue: "#3561bf",
    red: "#dc2626",
    purple: "#7c3aed",
    green: "#158f5a",
    orange: "#e66a00",
    teal: "#0f766e",
    indigo: "#4c57d6",
};

export default function HomeDispatchesSection() {
    const [mobileBlogSummaryId, setMobileBlogSummaryId] = useState<string | null>(null);

    return (
        <div className="mt-24 border-t border-[#e1dbcf] pt-12">
            <HomeSectionHeader
                num="04"
                title={<>Dispatches<span className="text-[#4c74ff]">.</span></>}
                subtitle="Thoughts, tutorials, and deep dives into the world of AI."
            />

            <div className="mt-12">
                {latestPosts.map((post, index) => {
                    const accent = blogAccent[post.iconColor] ?? "#4c74ff";
                    const content = (
                        <div className="flex gap-6 py-6 transition-transform duration-200 hover:-translate-y-0.5">
                            <div className="hidden sm:flex flex-col items-center pt-2">
                                <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: accent }} />
                                <span className="mt-2 w-px flex-1 bg-[#e4ddd1]" />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="mb-3 flex flex-wrap items-center gap-3">
                                    <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#9aa3b4]">{post.date}</span>
                                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#c0c5cf]">{post.readTime}</span>
                                    <span className="rounded-full px-2.5 py-0.5 text-[0.64rem] font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: `${accent}14`, color: accent }}>
                                        {post.tags[0]}
                                    </span>
                                </div>

                                <h3 className="portfolio-sans text-[clamp(1rem,1.6vw,1.35rem)] font-semibold leading-[1.3] tracking-[-0.03em] text-[#11100c] transition-colors group-hover:text-[#4c74ff]">
                                    {post.title}
                                </h3>

                                <p className="mt-3 max-w-[72ch] text-[0.88rem] leading-7 text-[#667085]">{post.excerpt}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {post.tags.slice(1, 4).map((tag) => (
                                        <span key={tag} className="text-[0.72rem] font-semibold text-[#b0a998]">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <span className="hidden md:inline-flex shrink-0 self-start mt-2 h-10 w-10 items-center justify-center rounded-full text-[#c0c5cf] transition-colors group-hover:text-[#4c74ff]">
                                <ArrowUpRight className="h-5 w-5" />
                            </span>
                        </div>
                    );

                    const mobileSummary = (
                        <div className="mt-3 lg:hidden">
                            <button
                                type="button"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setMobileBlogSummaryId((current) => (current === post.id ? null : post.id));
                                }}
                                className="inline-flex items-center gap-2 rounded-full border border-[#ddd6c9] bg-[#f7f2e8] px-3.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#5f594c] transition-colors hover:border-[#c9d793] hover:text-[#243042]"
                            >
                                {mobileBlogSummaryId === post.id ? "Hide Summary" : "Quick Summary"}
                            </button>

                            {mobileBlogSummaryId === post.id && (
                                <div className="mt-3 rounded-[1.2rem] border border-[#ded8ca] bg-white/95 p-4 shadow-[0_16px_40px_rgba(36,32,20,0.08)]">
                                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">Quick Summary</p>
                                    <p className="mt-3 text-[0.92rem] leading-6 text-[#5f594c]">{post.excerpt}</p>
                                </div>
                            )}
                        </div>
                    );

                    const desktopSummary = (
                        <div className="pointer-events-none absolute right-4 top-5 z-20 hidden w-[18rem] rounded-[1.4rem] border border-[#ded8ca] bg-white/95 p-4 opacity-0 shadow-[0_20px_60px_rgba(36,32,20,0.14)] backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:block lg:translate-y-3">
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">Quick Summary</p>
                            <p className="mt-3 overflow-hidden text-[0.92rem] leading-6 text-[#5f594c] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                                {post.excerpt}
                            </p>
                        </div>
                    );

                    const className = `group relative block ${index < latestPosts.length - 1 ? "border-b border-[#e4ddd1] pb-6" : ""}`;

                    return post.externalLink ? (
                        <a key={post.id} href={post.externalLink} target="_blank" rel="noreferrer" className={className}>
                            {content}
                            {mobileSummary}
                            {desktopSummary}
                        </a>
                    ) : (
                        <Link key={post.id} to={getWritingPath(post.id)} className={className}>
                            {content}
                            {mobileSummary}
                            {desktopSummary}
                        </Link>
                    );
                })}
            </div>

            <div className="mt-8">
                <Link to={ROUTE_PATHS.writing} className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#17150f] transition-colors hover:text-[#5d7414]">
                    Read All {blogPosts.length} Pieces <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
