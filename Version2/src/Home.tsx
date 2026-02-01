import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight, Code, Target, Activity, Globe, Cpu, Zap } from "lucide-react";
import { useTypewriter } from "./hooks/useTypewriter";
import avatar from "./assets/avatar_optimized.jpg";
import { projectsData } from "./features/projects/projectsData";
import { skillCategories } from "./features/skills/skillsData";
import { codingProfilesData } from "./features/coding-profiles/codingProfilesData";
import { blogPosts } from "./features/blog/blogData";
import CredentialsSection from "./features/home/CredentialsSection";

/* ─── colour maps ─── */
const skillColorMap: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-700",
    blue: "bg-blue-100 text-blue-700",
    emerald: "bg-emerald-100 text-emerald-700",
    sky: "bg-sky-100 text-sky-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
};

const vibeColorMap: Record<string, string> = {
    emerald: "bg-emerald-100 text-emerald-700",
    indigo: "bg-indigo-100 text-indigo-700",
    blue: "bg-blue-100 text-blue-700",
};

/* ─── static data ─── */
const featuredProjects = projectsData.filter((p) => p.featured).slice(0, 4);
const topBlogPosts = blogPosts.slice(0, 3);

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
        ]
    },
    {
        label: "GenAI & Models",
        color: "indigo",
        tools: [
            { name: "GPT-4o", company: "OpenAI" },
            { name: "Claude 3.5 Sonnet", company: "Anthropic" },
            { name: "Gemini 1.5 Pro", company: "Google" },
            { name: "Llama 3", company: "Meta" },
            { name: "Mistral", company: "Mistral AI" },
            { name: "Qwen", company: "Alibaba" },
        ]
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
        ]
    },
];


/* ─── section header helper ─── */
/* ─── section header helper ─── */
const SectionHeader = ({ number, title, description }: { number: string; title: string, description?: string }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative">
        <div>
            <span className="editorial-number mb-2 block text-blue-600 font-mono">{number}</span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {title}<span className="text-blue-600">.</span>
            </h2>
        </div>
        {description && (
            <p className="max-w-md text-gray-500 font-medium leading-relaxed text-right md:text-left">
                {description}
            </p>
        )}
    </div>
);

/* ─── main component ─── */
const Home = () => {
    const title = useTypewriter({
        texts: [
            "GenAI Engineer",
            "Software Developer",
            "Cloud Architect",
            "AI Agent Builder",
            "Vibe Coder",
            "Competitive Programmer",
            "Full Stack Developer",
        ],
        speed: 80,
        deleteSpeed: 40,
        delayBetweenTexts: 2000,
    });

    return (
        <div className="relative min-h-full w-full">
            <Helmet>
                <title>Sai Ram Maruri | GenAI Pioneer &amp; Full Stack Engineer</title>
                <meta
                    name="description"
                    content="Portfolio of Sai Ram Maruri - GenAI Pioneer specializing in autonomous systems, LLM agents, and full-stack engineering. Transforming complexity into intelligent solutions."
                />
            </Helmet>

            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ═══════════════════════════════════════════
                    HERO — Magazine Cover
                ═══════════════════════════════════════════ */}
                <section className="py-16 md:py-24 animate-fade-in-up">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400 mb-8">
                        Vol. 01 — 2026 Edition
                    </p>

                    <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-10 md:gap-16">
                        <div className="flex-1">
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-4">
                                Sairam{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                                    Maruri.
                                </span>
                            </h1>

                            <div className="h-9 sm:h-10 mb-6">
                                <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-400 tracking-tight">
                                    {title}
                                    <span className="text-blue-400 animate-pulse ml-px">|</span>
                                </span>
                            </div>

                            <p className="text-base sm:text-lg text-gray-500 font-medium max-w-xl leading-relaxed mb-6">
                                Building scalable agentic workflows and next-generation cloud architectures.
                                Transforming complexity into intelligent solutions.
                            </p>



                            {/* Status pill */}
                            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-blue-500/[0.1] text-blue-600 rounded-full text-sm font-semibold tracking-wide w-fit">
                                <span className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500" />
                                </span>
                                Available for Opportunities
                            </div>
                        </div>

                        {/* Right Column: Avatar + Connect */}
                        <div className="flex flex-col items-center gap-6 shrink-0">
                            {/* Avatar */}
                            <div className="relative w-36 h-36 md:w-48 md:h-48">
                                <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-blue-400/30 via-indigo-400/20 to-purple-400/30 blur-sm" />
                                <img
                                    src={avatar}
                                    alt="Sai Ram Maruri"
                                    className="relative w-full h-full rounded-full object-cover shadow-lg ring-2 ring-white"
                                    width="192"
                                    height="192"
                                    loading="eager"
                                />
                                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-[2.5px] border-white shadow-sm" />
                            </div>

                            {/* Let's Connect List */}
                            <div className="w-full max-w-[320px] flex flex-col gap-6 mt-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Let's Connect</h3>

                                <a
                                    href="https://github.com/sairam3824"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 px-2 py-2 group"
                                >
                                    <Github className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-lg text-gray-900">github.com/sairam3824</span>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/sairam-maruri/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 px-2 py-2 group"
                                >
                                    <Linkedin className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-lg text-gray-900 truncate">linkedin.com/in/sairam-maruri</span>
                                </a>

                                <a
                                    href="mailto:sairam.maruri@gmail.com"
                                    className="flex items-center gap-5 px-2 py-2 group"
                                >
                                    <Mail className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-lg text-gray-900 truncate">sairam.maruri@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200/80" />

                {/* ═══════════════════════════════════════════
                    01 / FEATURED WORK
                ═══════════════════════════════════════════ */}
                <section className="py-10 md:py-16 animate-fade-in-up stagger-2">
                    <SectionHeader
                        number="01"
                        title="Featured Work"
                        description="A selection of projects that define my engineering journey."
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {featuredProjects.map((project) => (
                            <div key={project.title} className="group flex flex-col rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                <div className="mb-4">
                                    <span className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 mb-2 block">
                                        {project.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">
                                        {project.title}
                                    </h3>
                                    {project.tagline && (
                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Zap className="w-3 h-3 text-blue-500 shrink-0" />
                                            <p className="text-[11px] font-black uppercase tracking-widest text-blue-500">
                                                {project.tagline}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-500 leading-relaxed mb-6 flex-1">
                                    {project.description}
                                </p>
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.tech.slice(0, 5).map((t) => (
                                            <span key={t} className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-6 text-[10px] font-bold tracking-tight overflow-hidden">
                                        {project.github && (
                                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="min-w-0 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                                                <Github className="w-3.5 h-3.5 shrink-0" />
                                                <span className="truncate lowercase">{project.github.replace("https://github.com/", "").replace(/\/$/, "")}</span>
                                            </a>
                                        )}
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="min-w-0 flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors">
                                                <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                                <span className="truncate lowercase">{project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            View All {projectsData.length} Projects <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                <hr className="border-gray-200/80" />

                {/* ═══════════════════════════════════════════
                    02 / THE ARSENAL
                ═══════════════════════════════════════════ */}
                <section className="py-10 md:py-16 animate-fade-in-up stagger-4">
                    <SectionHeader
                        number="02"
                        title="The Arsenal"
                        description="The tools, frameworks, and technologies I use to build."
                    />

                    <div className="flex flex-col gap-20">
                        {/* 1. Vibe Coder Toolbox */}
                        <div>
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Vibe Coder Toolbox</h3>
                                <p className="text-sm font-medium text-gray-500">Tools I ship with daily</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {vibeTools.map((group) => (
                                    <div key={group.label} className="flex flex-col gap-4">
                                        <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400">
                                            {group.label}
                                        </h4>
                                        <div className="flex flex-wrap gap-x-4 gap-y-3">
                                            {group.tools.map((tool) => {
                                                const showCompany = tool.company && !tool.name.startsWith(tool.company);
                                                return (
                                                    <div key={tool.name} className="flex items-center gap-2 group">
                                                        {showCompany && (
                                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                                                                {tool.company}
                                                            </span>
                                                        )}
                                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${vibeColorMap[group.color]} shadow-sm transition-transform hover:-translate-y-0.5`}>
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

                        {/* 2. Skills Matrix */}
                        <div>
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-gray-900 tracking-tight mb-2">Skills Matrix</h3>
                                <p className="text-sm font-medium text-gray-500">Core competencies across the stack</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                                {skillCategories.map((cat) => (
                                    <div key={cat.category} className="flex flex-col gap-4">
                                        <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400">
                                            {cat.category}
                                        </h4>
                                        <div className="flex flex-wrap gap-x-4 gap-y-3">
                                            {cat.skills.map((skill) => {
                                                const showCompany = !!skill.company;

                                                return (
                                                    <div key={skill.name} className="flex items-center gap-2 group">
                                                        {showCompany && (
                                                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                                                                {skill.company}
                                                            </span>
                                                        )}
                                                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${skillColorMap[cat.color] || "bg-gray-100 text-gray-600"} shadow-sm transition-transform hover:-translate-y-0.5`}>
                                                            {skill.name}
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

                    <div className="mt-12">
                        <Link to="/skills" className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors">
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
                <section className="py-10 md:py-16 animate-fade-in-up stagger-6">
                    <SectionHeader
                        number="04"
                        title="Coding DNA"
                        description="Quantifiable metrics of my programming and problem-solving skills."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {codingProfilesData.slice(0, 3).map((profile) => {
                            const colorStyles: Record<string, string> = {
                                orange: "border-orange-100 bg-orange-50/50 group-hover:border-orange-500",
                                yellow: "border-yellow-100 bg-yellow-50/50 group-hover:border-yellow-500",
                                cyan: "border-cyan-100 bg-cyan-50/50 group-hover:border-cyan-500",
                                indigo: "border-indigo-100 bg-indigo-50/50 group-hover:border-indigo-500",
                                emerald: "border-emerald-100 bg-emerald-50/50 group-hover:border-emerald-500",
                                rose: "border-rose-100 bg-rose-50/50 group-hover:border-rose-500",
                                slate: "border-slate-100 bg-slate-50/50 group-hover:border-slate-500",
                            };

                            const textStyles: Record<string, string> = {
                                orange: "text-orange-600",
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
                            if (profile.iconName === "leetcode-img") IconComponent = <img src="/LeetCode_logo_rvs.webp" alt="LeetCode" className="w-6 h-6 object-contain" />;
                            else if (profile.iconName === "codechef-img") IconComponent = <img src="/codechef.webp" alt="CodeChef" className="w-6 h-6 object-contain" />;
                            else if (profile.iconName === "Activity") IconComponent = <Activity className="w-6 h-6" />;
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
                                    className={`group relative p-6 rounded-3xl border shadow-sm bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${styleClass}`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`p-2.5 rounded-xl bg-white shadow-sm ${textClass}`}>
                                            {IconComponent}
                                        </div>
                                        <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${textClass}`} />
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-1">{profile.label}</h3>
                                    <p className={`text-sm font-bold mb-3 ${textClass}`}>{profile.stats}</p>
                                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                                        {profile.desc}
                                    </p>
                                </a>
                            );
                        })}
                    </div>

                    <div className="mt-10">
                        <Link to="/coding-profiles" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            View All Profiles <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>

                <hr className="border-gray-200/80" />

                {/* ═══════════════════════════════════════════
                    05 / DISPATCHES (Blog)
                ═══════════════════════════════════════════ */}
                <section className="py-10 md:py-16 animate-fade-in-up stagger-8">
                    <SectionHeader
                        number="05"
                        title="Dispatches"
                        description="Thoughts, tutorials, and deep dives into the world of AI."
                    />

                    <div className="space-y-0">
                        {topBlogPosts.map((post) => (
                            <Link
                                key={post.id}
                                to={post.externalLink || `/blogs/${post.id}`}
                                {...(post.externalLink ? { target: "_blank", rel: "noopener noreferrer" } as React.AnchorHTMLAttributes<HTMLAnchorElement> : {})}
                                className="group block py-8 transition-transform duration-300 hover:-translate-y-1"
                            >
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">
                                    {post.date} · {post.readTime}
                                </p>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors mb-4 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 max-w-3xl">
                                    {post.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-10">
                        <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            Read All {blogPosts.length} Posts <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </section>


                <hr className="border-gray-200/80" />

                {/* ═══════════════════════════════════════════
                    CONTACT CTA
                ═══════════════════════════════════════════ */}
                <section className="py-10 md:py-16 animate-fade-in-up stagger-12">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-8 sm:px-12 py-14 sm:py-20 text-center">
                        {/* Grid pattern */}
                        <div
                            className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, #fff 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />
                        {/* Ambient glows */}
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
                        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />

                        <div className="relative z-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
                                Let's Build Something
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
                                Open to collaborations, opportunities, and interesting conversations about AI and engineering.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100 transition-colors"
                                >
                                    <Mail className="w-4 h-4" /> Contact
                                </Link>
                                <Link
                                    to="/resume"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-600 text-gray-300 text-sm font-semibold hover:bg-gray-800 transition-colors"
                                >
                                    Resume <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
