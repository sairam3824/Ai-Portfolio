import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight, Code, Target, Activity, Globe, Cpu, Zap } from "lucide-react";
import { projectsData } from "../projects/projectsData";
import { codingProfilesData } from "../coding-profiles/codingProfilesData";
import { blogPosts } from "../blog/blogData";
import CredentialsSection from "./CredentialsSection";
import { ROUTE_PATHS, getWritingPath } from "@/data/siteRoutes";

const vibeColorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    indigo: "bg-indigo-100 text-indigo-700",
    blue: "bg-blue-100 text-blue-700",
};

const vibeTools = [
    {
        label: "AI Coding Assistants",
        color: "emerald",
        tools: [
            { name: "Claude Code", company: "Anthropic" },
            { name: "Codex", company: "OpenAI" },
            { name: "Cursor", company: "Cursor" },
            { name: "VS Code", company: "Microsoft" },
            { name: "Kiro", company: "Kiro" },
            { name: "Copilot", company: "GitHub" },
            { name: "Ollama", company: "Ollama" },
        ],
    },
    {
        label: "GenAI & Models",
        color: "indigo",
        tools: [
            { name: "GPT-4o", company: "OpenAI" },
            { name: "Claude 3.5 Sonnet", company: "Anthropic" },
            { name: "Claude Opus 4.5", company: "Anthropic" },
            { name: "Gemini 3 Pro", company: "Google" },
            { name: "Llama 3", company: "Meta" },
            { name: "Llama 8B", company: "Meta" },
            { name: "Code Llama", company: "Meta" },
            { name: "DeepSeek", company: "DeepSeek" },
            { name: "Mistral", company: "Mistral AI" },
            { name: "Qwen", company: "Alibaba" },
        ],
    },
    {
        label: "Cloud & Infra",
        color: "blue",
        tools: [
            { name: "Bedrock", company: "AWS" },
            { name: "Vertex AI", company: "Google" },
            { name: "OpenAI", company: "Azure" },
            { name: "Pinecone", company: "Pinecone" },
            { name: "Weaviate", company: "Weaviate" },
            { name: "Supabase", company: "Supabase" },
            { name: "Vercel", company: "Vercel" },
            { name: "Render", company: "Render" },
        ],
    },
];

const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 2);
const topBlogPosts = blogPosts.slice(0, 3);

const SectionHeader = ({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description?: string;
}) => (
    <div className="relative mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
        <div>
            <span className="editorial-number mb-2 block text-blue-600 font-mono">{number}</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">
                {title}
                <span className="text-blue-600">.</span>
            </h2>
        </div>
        {description && (
            <p className="max-w-md text-left text-sm font-medium leading-relaxed text-gray-500 sm:text-base">
                {description}
            </p>
        )}
    </div>
);

const HomeSections = () => {
    return (
        <>
            <hr className="border-gray-200/80" />

            {/* ═══════════════════════════════════════════
                01 / FEATURED WORK
            ═══════════════════════════════════════════ */}
            <section className="py-6 md:py-10 animate-fade-in-up stagger-2 content-auto">
                <SectionHeader
                    number="01"
                    title="Featured Work"
                    description="A selection of projects that define my engineering journey."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredProjects.map((project) => (
                        <div
                            key={project.title}
                            className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="mb-4">
                                <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-800 tracking-tight mb-1">
                                    {project.title}
                                </h3>
                                {project.tagline && (
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <Zap className="w-3 h-3 text-blue-500 shrink-0" />
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-blue-500">
                                            {project.tagline}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-500 leading-relaxed mb-6 flex-1">{project.description}</p>
                            <div className="mt-auto">
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {project.tech.slice(0, 5).map((t) => (
                                        <span
                                            key={t}
                                            className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3 overflow-hidden text-[10px] font-bold tracking-tight sm:flex-row sm:items-center sm:gap-6">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="min-w-0 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                                        >
                                            <Github className="w-3.5 h-3.5 shrink-0" />
                                            <span className="truncate lowercase">
                                                {project.github.replace("https://github.com/", "").replace(/\/$/, "")}
                                            </span>
                                        </a>
                                    )}
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="min-w-0 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                            <span className="truncate lowercase">
                                                {project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        View All {projectsData.length} Projects <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <hr className="border-gray-200/80" />

            {/* ═══════════════════════════════════════════
                02 / THE ARSENAL
            ═══════════════════════════════════════════ */}
            <section className="py-6 md:py-10 animate-fade-in-up stagger-4 content-auto">
                <SectionHeader
                    number="02"
                    title="The Arsenal"
                    description="The tools, frameworks, and technologies I use to build."
                />

                <div className="flex flex-col gap-12 md:gap-20">
                    {/* 1. Vibe Coder Toolbox */}
                    <div>
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 tracking-tight mb-2">Vibe Coder Toolbox</h3>
                            <p className="text-sm font-medium text-gray-500">Tools I ship with daily</p>
                        </div>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
                            {vibeTools.map((group) => (
                                <div key={group.label} className="flex flex-col gap-4">
                                    <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400">{group.label}</h4>
                                    <div className="flex flex-wrap gap-x-3 gap-y-2.5 sm:gap-x-4 sm:gap-y-3">
                                        {group.tools.map((tool) => {
                                            const showCompany = tool.company && !tool.name.startsWith(tool.company);
                                            return (
                                                <div key={tool.name} className="flex items-center gap-2 group">
                                                    {showCompany && (
                                                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                                                            {tool.company}
                                                        </span>
                                                    )}
                                                    <span
                                                        className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold shadow-sm transition-transform hover:-translate-y-0.5 sm:px-3 sm:text-xs ${vibeColorMap[group.color]}`}
                                                    >
                                                        {tool.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                <div className="mt-8">
                    <Link to="/skills" className="inline-flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors">
                        Explore Full Arsenal <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </section>

            <hr className="border-gray-200/80" />

            {/* ═══════════════════════════════════════════
                03 / CREDENTIALS
            ═══════════════════════════════════════════ */}
            <CredentialsSection />

            <hr className="border-gray-200/80" />

            {/* ═══════════════════════════════════════════
                04 / CODING DNA
            ═══════════════════════════════════════════ */}
            <section className="py-6 md:py-10 animate-fade-in-up stagger-6 content-auto">
                <SectionHeader
                    number="04"
                    title="Coding DNA"
                    description="Quantifiable metrics of my programming and problem-solving skills."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                    {codingProfilesData.slice(0, 3).map((profile) => {
                        const colorStyles: Record<string, string> = {
                            orange: "border-orange-100 bg-orange-50 group-hover:border-orange-500",
                            blue: "border-blue-100 bg-blue-50 group-hover:border-blue-500",
                            yellow: "border-yellow-100 bg-yellow-50 group-hover:border-yellow-500",
                            cyan: "border-cyan-100 bg-cyan-50 group-hover:border-cyan-500",
                            indigo: "border-indigo-100 bg-indigo-50 group-hover:border-indigo-500",
                            emerald: "border-emerald-100 bg-emerald-50 group-hover:border-emerald-500",
                            rose: "border-rose-100 bg-rose-50 group-hover:border-rose-500",
                            slate: "border-slate-100 bg-slate-50 group-hover:border-slate-500",
                        };

                        const textStyles: Record<string, string> = {
                            orange: "text-orange-600",
                            blue: "text-blue-600",
                            yellow: "text-yellow-600",
                            cyan: "text-cyan-600",
                            indigo: "text-indigo-600",
                            emerald: "text-emerald-600",
                            rose: "text-rose-600",
                            slate: "text-slate-600",
                        };

                        const styleClass = colorStyles[profile.color] || colorStyles.slate;
                        const textClass = textStyles[profile.color] || textStyles.slate;

                        let IconComponent = <Code className="w-6 h-6" />;
                        if (profile.iconName === "leetcode-img") {
                            IconComponent = (
                                <img
                                    src="/LeetCode_logo_rvs.webp"
                                    alt="LeetCode"
                                    className="w-6 h-6 object-contain"
                                    width="24"
                                    height="24"
                                    loading="lazy"
                                    decoding="async"
                                />
                            );
                        } else if (profile.iconName === "codechef-img") {
                            IconComponent = (
                                <img
                                    src="/codechef.webp"
                                    alt="CodeChef"
                                    className="w-6 h-6 object-contain"
                                    width="24"
                                    height="24"
                                    loading="lazy"
                                    decoding="async"
                                />
                            );
                        } else if (profile.iconName === "Activity") IconComponent = <Activity className="w-6 h-6" />;
                        else if (profile.iconName === "Target") IconComponent = <Target className="w-6 h-6" />;
                        else if (profile.iconName === "Cpu") IconComponent = <Cpu className="w-6 h-6" />;
                        else if (profile.iconName === "Globe") IconComponent = <Globe className="w-6 h-6" />;
                        else if (profile.iconName === "Code") IconComponent = <Code className="w-6 h-6" />;

                        return (
                            <a
                                key={profile.label}
                                href={profile.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative rounded-3xl border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${styleClass}`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className={`p-2.5 rounded-2xl bg-white shadow-sm ${textClass}`}>{IconComponent}</div>
                                    <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${textClass}`} />
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-1">{profile.label}</h3>
                                <p className={`text-sm font-bold mb-3 ${textClass}`}>{profile.stats}</p>
                                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{profile.desc}</p>
                            </a>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <Link to="/coding-profiles" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        View All Profiles <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <hr className="border-gray-200/80" />

            {/* ═══════════════════════════════════════════
                05 / DISPATCHES (Writing)
            ═══════════════════════════════════════════ */}
            <section className="py-6 md:py-10 animate-fade-in-up stagger-8 content-auto">
                <SectionHeader number="05" title="Dispatches" description="Thoughts, tutorials, and deep dives into the world of AI." />

                <div className="space-y-0">
                    {topBlogPosts.map((post) => {
                        const externalLinkProps = post.externalLink
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {};

                        return (
                            <Link
                                key={post.id}
                                to={post.externalLink || getWritingPath(post.id)}
                                {...externalLinkProps}
                                className="group block py-8 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
                                    {post.date} · {post.readTime}
                                </p>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 max-w-3xl">{post.excerpt}</p>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-8">
                    <Link to={ROUTE_PATHS.writing} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        Read All {blogPosts.length} Pieces <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            <hr className="border-gray-200/80" />

            {/* ═══════════════════════════════════════════
                CONTACT CTA
            ═══════════════════════════════════════════ */}
            {/* ═══════════════════════════════════════════
                CONTACT CTA
            ═══════════════════════════════════════════ */}
            <section className="py-6 md:py-10 animate-fade-in-up stagger-12 content-auto">
                <div className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow duration-500 hover:shadow-md sm:p-8 md:p-12">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gray-50/50 -skew-x-12 translate-x-1/2 opacity-0 md:opacity-100 transition-opacity" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                        <div className="max-w-2xl">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-4">
                                Ready to ship your next breakthrough?
                            </h2>
                            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-0">
                                I specialize in turning complex AI concepts into production-grade software. Whether you need a full-stack overhaul or a custom GenAI integration, I deliver engineering excellence.
                            </p>
                        </div>

                        <div className="flex w-full flex-col gap-4 shrink-0 sm:w-auto sm:flex-row">
                            <Link
                                to="/contact"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-8 py-4 font-bold text-white shadow-xl shadow-gray-200 transition-all hover:scale-[1.02] hover:bg-black active:scale-95 sm:w-auto sm:hover:scale-105"
                            >
                                <ArrowRight className="w-4 h-4" />
                                Start a Conversation
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomeSections;
