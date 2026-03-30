import { useState, useEffect, useRef } from "react";
import { Activity, ArrowRight, ArrowUpRight, Award, Brain, Code, Cpu, ExternalLink, FileText, Globe, GraduationCap, Mail, Sparkles, Target, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/shared/Seo";
import { useTypewriter } from "@/hooks/useTypewriter";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { StatsSection } from "@/features/home/StatsSection";
import { projectsData } from "@/features/projects/projectsData";
import { skillCategories } from "@/features/skills/skillsData";
import { certifications } from "@/features/certifications/certificationsData";
import { codingProfilesData } from "@/features/coding-profiles/codingProfilesData";
import { blogPosts } from "@/features/blog/blogData";

/* ─── scroll hook ─── */
const useScrollPosition = () => {
    const [scrollPos, setScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPos(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return scrollPos;
};

/* ─── data ─── */

const liveProjects = projectsData.filter(p => p.link).slice(0, 2);
const topCerts = certifications.slice(0, 5);
const latestPosts = blogPosts.slice(0, 3);

const arsenalGroups = skillCategories
    .filter((c) => ["AI Coding", "GenAI & LLMs", "Cloud & DevOps"].includes(c.category))
    .map((c) => ({
        label: c.category === "AI Coding" ? "AI Coding Assistants" : c.category === "GenAI & LLMs" ? "GenAI & Models" : "Cloud & Infra",
        tools: c.skills.slice(0, 8).map((s) => ({ name: s.name, company: s.company ?? "" })),
        chip: c.category === "AI Coding" ? "bg-[#d7f2df] text-[#1f7a4f]" : c.category === "GenAI & LLMs" ? "bg-[#dee2ff] text-[#4c57d6]" : "bg-[#dce8fb] text-[#3561bf]",
    }));

const cpIcons: Record<string, JSX.Element> = {
    "leetcode-img": <img src="/LeetCode_logo_rvs.webp" alt="LeetCode" className="h-full w-full object-contain" width="24" height="24" loading="lazy" decoding="async" />,
    "codechef-img": <img src="/codechef.webp" alt="CodeChef" className="h-full w-full object-cover" width="24" height="24" loading="lazy" decoding="async" />,
    Activity: <Activity className="h-5 w-5" />, Target: <Target className="h-5 w-5" />,
    Cpu: <Cpu className="h-5 w-5" />, Globe: <Globe className="h-5 w-5" />, Code: <Code className="h-5 w-5" />,
};

const accentMap: Record<string, string> = {
    orange: "#e66a00", blue: "#3561bf", cyan: "#1395c7", indigo: "#4c57d6",
    emerald: "#12915a", rose: "#e11d48", slate: "#556274",
};

const researchThemes = [
    { name: "Scaling Laws", desc: "How model performance scales with data, compute, and parameters — the backbone of modern LLM research." },
    { name: "Code Generation", desc: "LLM-driven code synthesis, automated debugging, and next-gen programming assistants." },
    { name: "AI Safety & Alignment", desc: "Ensuring AI systems behave as intended, remain controllable, and stay beneficial long-term." },
    { name: "A2A Agent Cards", desc: "Standardized capability declarations for agent-to-agent communication in multi-agent systems." },
];

const focusItems = [
    { label: "Building", title: "AI-powered SaaS products", detail: "Shipping production-grade GenAI tools, RAG systems, and agent-powered SaaS apps end-to-end.", icon: Brain, cls: "text-[#158f5a]" },
    { label: "Solving", title: "1000+ DSA problems and counting", detail: "LeetCode Guardian (top 1%), competitive programming on CodeChef, Codeforces & more.", icon: Trophy, cls: "text-[#dd7a00]" },
    { label: "Crafting", title: "A2A agent cards", detail: "Designing standardized agent identity cards for the emerging A2A protocol ecosystem.", icon: Sparkles, cls: "text-[#ff4d6d]" },
    { label: "Exploring", title: "Agentic workflows", detail: "Building multi-agent pipelines with LangGraph, n8n, OpenAI Agent SDK, and AutoGen.", icon: Zap, cls: "text-[#7c3aed]" },
    { label: "Learning", title: "Reinforcement learning and RLHF", detail: "Studying policy gradient methods, reward modeling, and alignment through human feedback.", icon: GraduationCap, cls: "text-[#4c74ff]" },
];

const blogAccent: Record<string, string> = {
    blue: "#3561bf", red: "#dc2626", purple: "#7c3aed", green: "#158f5a",
    orange: "#e66a00", teal: "#0f766e", indigo: "#4c57d6",
};

/* ─── components ─── */

const ParallaxSectionHeader = ({ num, title, subtitle }: { num: string; title: string | any; subtitle: string }) => {
    const scrollPos = useScrollPosition();
    const [offset, setOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        // Calculate distance from center of window
        const mid = rect.top + rect.height / 2;
        const dist = (mid - winH / 2) / (winH / 2);
        setOffset(dist * -30); // Max 30px drift
    }, [scrollPos]);

    return (
        <div ref={containerRef} className="px-1">
            <p 
                style={{ transform: `translateY(${offset}px)` }} 
                className="text-[5rem] font-light leading-none tracking-[-0.12em] text-[#ebe7de] select-none sm:text-[6rem] transition-transform duration-200 ease-out"
            >
                {num}
            </p>
            <h2 className="portfolio-sans -mt-3 text-[clamp(2.4rem,4vw,3.8rem)] font-semibold tracking-[-0.06em] text-[#1b2433]">
                {title}
            </h2>
            <p className="mt-3 max-w-[42ch] text-[1.05rem] leading-8 text-[#6f7a8d]">{subtitle}</p>
        </div>
    );
};

const FeaturedProjectCard = ({ project, index }: { project: any; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [shine, setShine] = useState({ x: 0, y: 0, opacity: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4; 
        const rotateY = ((x - centerX) / centerX) * 4;

        setTilt({ x: rotateX, y: rotateY });
        setShine({ x, y, opacity: 1 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setShine((prev) => ({ ...prev, opacity: 0 }));
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 ? "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)" : "none",
            }}
            className="group relative overflow-hidden rounded-[2.4rem] border border-[#e3dccf] bg-[#fffdf8] p-8 sm:p-10 shadow-[0_20px_60px_rgba(61,52,36,0.05)] transition-shadow duration-500 hover:shadow-[0_40px_100px_rgba(61,52,36,0.1)]"
        >
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
                style={{
                    opacity: shine.opacity,
                    background: `radial-gradient(circle at ${shine.x}px ${shine.y}px, rgba(255,255,255,0.22), transparent 60%)`,
                }}
            />

            <span 
                className="pointer-events-none absolute -right-4 -top-6 text-[12rem] font-bold leading-none text-[#ebe7de] select-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-4 group-hover:-translate-y-4"
                style={{ transform: `translate(${tilt.y * 2}px, ${tilt.x * -2}px)` }}
            >
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="relative z-20">
                <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="rounded-full border border-[#e3dccf] px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9aa3b4]">
                        {project.category}
                    </span>
                    {project.link && (
                        <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8b8578]">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#11100c] opacity-30" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#11100c]" />
                            </span>
                            Live
                        </span>
                    )}
                </div>

                <h3 className="portfolio-sans text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.05em] leading-[1.05] text-[#11100c] transition-colors group-hover:text-[#4c74ff]">
                    {project.title}
                </h3>

                {project.tagline && (
                    <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#8b8578]">{project.tagline}</p>
                )}

                <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-7 text-[#6f695c]">{project.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 6).map((t: string) => (
                        <span key={t} className="rounded-full border border-[#e3dccf] bg-[#f7f4ee] px-3 py-1 text-[0.72rem] font-semibold text-[#6f695c]">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1b2433] px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#253044]">
                            <ExternalLink className="h-3.5 w-3.5" />
                            {project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </a>
                    )}
                    {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-[#e3dccf] bg-[#f7f4ee] px-4 py-2.5 text-[0.78rem] font-semibold text-[#3d485a] transition-colors hover:border-[#b0a998] hover:bg-white">
                            <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

/* ─── component ─── */

export const HomePage = () => {
    const [mobileBlogSummaryId, setMobileBlogSummaryId] = useState<string | null>(null);
    const title = useTypewriter({
        texts: ["GenAI Engineer", "ML Engineer", "Software Developer", "Cloud Architect", "AI Agent Builder", "Vibe Coder", "Competitive Programmer", "Full Stack Developer"],
        speed: 80, deleteSpeed: 40, delayBetweenTexts: 2000,
    });

    return (
        <>
            <Seo
                title={siteMetadata.defaultTitle}
                description={siteMetadata.defaultDescription}
                pageType="ProfilePage"
                keywords={siteMetadata.keywords}
            />

            <section className="pb-8">

                {/* ═══ HERO ═══ */}
                <div className="rounded-[2.8rem] border border-[#e3ded2] bg-[linear-gradient(180deg,#fcfaf5_0%,#f7f2e8_100%)] px-6 py-4 pb-8 shadow-[0_24px_80px_rgba(36,32,20,0.05)] sm:px-10 sm:py-8 sm:pb-12 lg:px-14 lg:py-10 lg:pb-16">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#868071]">Version 03 / Editorial Portfolio</p>

                    <div className="mt-12 max-w-[1040px]">
                        <h1 className="portfolio-sans max-w-[12ch] text-[clamp(2.8rem,9vw,8.4rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-[#11100c] sm:leading-[0.88]">
                            Build intelligence that ships.
                        </h1>
                        <p className="mt-10 max-w-[48ch] text-[clamp(1.1rem,1.8vw,1.45rem)] leading-[1.6] text-[#6f695c]">
                            I turn ambitious AI ideas into polished products, combining agent workflows, retrieval systems, cloud delivery, and user-first interface design into experiences that actually ship.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link to="/projects" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#dbe7ae] px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Discover Work <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/skills" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Skills <Zap className="h-4 w-4" />
                        </Link>
                        <Link to="/certifications" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Certifications <Award className="h-4 w-4" />
                        </Link>
                        <Link to="/blogs" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Writings <FileText className="h-4 w-4" />
                        </Link>
                        <Link to="/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Contact Me <Mail className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[#8b8578]">
                        <span>{profileDetails.availability}</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#b9b09e] sm:inline-block" />
                        <span className="inline-flex min-w-[23ch] text-[#4c74ff]">
                            {title || profileDetails.shortRole}
                            <span className="ml-0.5 animate-[blink_1s_step-end_infinite] text-[#4c74ff]">|</span>
                        </span>
                    </div>

                    <div className="mt-12 rounded-[2.2rem] border border-[#e1dbcf] bg-white/40 p-6 shadow-sm backdrop-blur-[2px] sm:p-8 lg:p-10">
                        <StatsSection />
                    </div>
                </div>

                {/* ═══ 01 / FEATURED WORK ═══ */}
                <div className="mt-20">
                    <ParallaxSectionHeader 
                        num="01" 
                        title={<>Featured Work<span className="text-[#4c74ff]">.</span></>} 
                        subtitle="Live products and shipped projects that define my engineering journey." 
                    />

                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {liveProjects.map((project, i) => (
                            <FeaturedProjectCard key={project.title} project={project} index={i} />
                        ))}
                    </div>


                    <div className="mt-10">
                        <Link to="/projects" className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#17150f] transition-colors hover:text-[#5d7414]">
                            View All {projectsData.length} Projects <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* ═══ 02 / THE ARSENAL ═══ */}
                <div className="mt-24 border-t border-[#e1dbcf] pt-12">
                    <ParallaxSectionHeader 
                        num="02" 
                        title={<>The Arsenal<span className="text-[#4c74ff]">.</span></>} 
                        subtitle="The tools, frameworks, and technologies I use to build." 
                    />

                    <div className="mt-12">
                        <p className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[#243042]">Vibe Coder Toolbox</p>
                        <p className="mt-1.5 text-[0.92rem] text-[#8a8377]">Tools I ship with daily</p>

                        <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-3">
                            {arsenalGroups.map((group) => (
                                <div key={group.label}>
                                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#9aa3b4] mb-5">{group.label}</p>
                                    <div className="flex flex-wrap gap-2.5">
                                        {group.tools.map((tool) => (
                                            <span key={`${group.label}-${tool.name}`} className={`rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${group.chip}`}>
                                                {tool.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-10">
                        <Link to="/skills" className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#17150f] transition-colors hover:text-[#5d7414]">
                            Explore Full Arsenal <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* ═══ 03 / CREDENTIALS ═══ */}
                <div className="mt-24 border-t border-[#e1dbcf] pt-12">
                    <ParallaxSectionHeader 
                        num="03" 
                        title={<>Credentials<span className="text-[#4c74ff]">.</span></>} 
                        subtitle="Professional validation and technical expertise." 
                    />

                    {/* Coding profiles — large stat numbers, no boxes */}
                    <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                        {codingProfilesData.map((p) => {
                            const accent = accentMap[p.color] ?? "#556274";
                            const icon = cpIcons[p.iconName] ?? <Code className="h-5 w-5" />;
                            return (
                                <a key={p.label} href={p.href} target="_blank" rel="noreferrer" className="group relative">
                                    {/* Hover popup */}
                                    <div className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2 z-50 w-52 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out">
                                        <div className="rounded-2xl border border-[#e3dccf] bg-white p-4 shadow-[0_16px_48px_rgba(61,52,36,0.16)]">
                                            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg" style={{ backgroundColor: `${accent}14` }}>
                                                <span style={{ color: accent, transform: 'scale(0.8)', display: 'flex' }}>{icon}</span>
                                            </div>
                                            <p className="text-[1rem] font-bold tracking-[-0.04em] leading-none" style={{ color: accent }}>{p.stats}</p>
                                            <p className="mt-1 text-[0.82rem] font-semibold text-[#243042]">{p.label}</p>
                                            <p className="mt-2 text-[0.75rem] leading-5 text-[#6f695c]">{p.desc}</p>
                                        </div>
                                        {/* Arrow */}
                                        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-[#e3dccf] bg-white" />
                                    </div>

                                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl" style={{ backgroundColor: `${accent}12` }}>
                                        <span style={{ color: accent }}>{icon}</span>
                                    </div>
                                    <p className="text-[1.6rem] font-bold tracking-[-0.05em] leading-none transition-colors group-hover:text-[#4c74ff]" style={{ color: accent }}>
                                        {p.stats}
                                    </p>
                                    <p className="mt-2 text-[0.92rem] font-semibold text-[#243042] group-hover:text-[#4c74ff] transition-colors">{p.label}</p>
                                    <p className="mt-1 text-[0.78rem] text-[#8a8377] leading-relaxed">{p.desc.slice(0, 60)}...</p>
                                </a>
                            );
                        })}
                    </div>

                    {/* Research + Right Now + Certs — 3-column grid */}
                    <div className="mt-20 grid gap-6 lg:grid-cols-3">
                        {/* Research Interests */}
                        <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                            <div className="flex items-center gap-3 mb-6">
                                <Brain className="h-5 w-5 text-[#8b8578]" />
                                <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#11100c]">Research Interests</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 mb-5">
                                {researchThemes.map((t) => (
                                    <span key={t.name} className="group/pill relative">
                                        <span className="inline-block rounded-full border border-[#e3dccf] bg-[#f7f4ee] px-3 py-1 text-[0.78rem] font-semibold text-[#3d485a] cursor-default transition-colors group-hover/pill:border-[#b0a08c] group-hover/pill:bg-[#ede9e0]">{t.name}</span>
                                        {/* Popup */}
                                        <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 z-50 w-52 opacity-0 translate-y-2 group-hover/pill:opacity-100 group-hover/pill:translate-y-0 transition-all duration-200 ease-out">
                                            <div className="rounded-2xl border border-[#e3dccf] bg-white p-4 shadow-[0_16px_48px_rgba(61,52,36,0.16)]">
                                                <p className="text-[0.82rem] font-bold text-[#11100c] mb-1.5">{t.name}</p>
                                                <p className="text-[0.75rem] leading-5 text-[#6f695c]">{t.desc}</p>
                                            </div>
                                            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 border-r border-b border-[#e3dccf] bg-white" />
                                        </div>
                                    </span>
                                ))}
                            </div>
                            <p className="text-[0.88rem] leading-7 text-[#6f695c]">
                                Exploring scaling laws, autonomous systems, and production-grade agent workflows.
                            </p>
                        </div>

                        {/* Right Now */}
                        <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                            <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#11100c] mb-6">Right Now</h3>
                            <div className="space-y-4">
                                {focusItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="group/focus relative flex items-start gap-3 cursor-default">
                                            <Icon className="h-4 w-4 shrink-0 mt-1 text-[#8b8578]" />
                                            <div>
                                                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#8b8578]">{item.label}</span>
                                                <p className="text-[0.92rem] font-semibold tracking-[-0.02em] text-[#11100c]">{item.title}</p>
                                            </div>
                                            {/* Popup */}
                                            <div className="pointer-events-none absolute left-0 top-[calc(100%+10px)] z-50 w-[min(18rem,calc(100vw-5rem))] opacity-0 translate-y-2 group-hover/focus:opacity-100 group-hover/focus:translate-y-0 transition-all duration-200 ease-out xl:left-[calc(100%+12px)] xl:top-1/2 xl:w-52 xl:-translate-y-1/2 xl:translate-x-[-4px] xl:group-hover/focus:-translate-y-1/2 xl:group-hover/focus:translate-x-0">
                                                <div className="rounded-2xl border border-[#e3dccf] bg-white p-4 shadow-[0_16px_48px_rgba(61,52,36,0.16)]">
                                                    <span className={`text-[0.62rem] font-semibold uppercase tracking-[0.2em] ${item.cls}`}>{item.label}</span>
                                                    <p className="mt-1 text-[0.82rem] font-bold text-[#11100c]">{item.title}</p>
                                                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6f695c]">{item.detail}</p>
                                                </div>
                                                <div className="absolute -top-1.5 left-6 h-3 w-3 rotate-45 border-l border-t border-[#e3dccf] bg-white xl:left-auto xl:top-1/2 xl:-left-1.5 xl:-translate-y-1/2 xl:border-b xl:border-l xl:border-t-0" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Certifications */}
                        <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-3">
                                    <Award className="h-5 w-5 text-[#8b8578]" />
                                    <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#11100c]">Certifications</h3>
                                </div>
                                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#9aa3b4]">{certifications.length}+</span>
                            </div>
                            <div className="divide-y divide-[#e4ddd1]">
                                {topCerts.map((cert) => (
                                    <a key={cert.title} href={cert.link} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-3 transition-colors">
                                        <p className="text-[0.88rem] font-semibold text-[#3d485a] group-hover:text-[#11100c] transition-colors">{cert.title}</p>
                                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#c0c5cf] group-hover:text-[#11100c] transition-colors" />
                                    </a>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Link to="/certifications" className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#8b8578] hover:text-[#11100c] transition-colors">
                                    View all <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ 04 / DISPATCHES ═══ */}
                <div className="mt-24 border-t border-[#e1dbcf] pt-12">
                    <ParallaxSectionHeader 
                        num="04" 
                        title={<>Dispatches<span className="text-[#4c74ff]">.</span></>} 
                        subtitle="Thoughts, tutorials, and deep dives into the world of AI." 
                    />

                    <div className="mt-12">
                        {latestPosts.map((post, i) => {
                            const accent = blogAccent[post.iconColor] ?? "#4c74ff";
                            const inner = (
                                <div className="flex gap-6 py-6 transition-transform duration-200 hover:-translate-y-0.5">
                                    {/* Accent line */}
                                    <div className="hidden sm:flex flex-col items-center pt-2">
                                        <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: accent }} />
                                        <span className="mt-2 w-px flex-1 bg-[#e4ddd1]" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#9aa3b4]">
                                                {post.date}
                                            </span>
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

                                    <span className="hidden md:inline-flex shrink-0 self-start mt-2 h-10 w-10 items-center justify-center rounded-full text-[#c0c5cf] group-hover:text-[#4c74ff] transition-colors">
                                        <ArrowUpRight className="h-5 w-5" />
                                    </span>
                                </div>
                            );

                            return post.externalLink ? (
                                <a
                                    key={post.id}
                                    href={post.externalLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`group relative block ${i < latestPosts.length - 1 ? "border-b border-[#e4ddd1] pb-6" : ""}`}
                                >
                                    {inner}
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
                                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">
                                                    Quick Summary
                                                </p>
                                                <p className="mt-3 text-[0.92rem] leading-6 text-[#5f594c]">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pointer-events-none absolute right-4 top-5 z-20 hidden w-[18rem] rounded-[1.4rem] border border-[#ded8ca] bg-white/95 p-4 opacity-0 shadow-[0_20px_60px_rgba(36,32,20,0.14)] backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:block lg:translate-y-3">
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">
                                            Quick Summary
                                        </p>
                                        <p className="mt-3 overflow-hidden text-[0.92rem] leading-6 text-[#5f594c] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </a>
                            ) : (
                                <Link
                                    key={post.id}
                                    to={`/blogs/${post.id}`}
                                    className={`group relative block ${i < latestPosts.length - 1 ? "border-b border-[#e4ddd1] pb-6" : ""}`}
                                >
                                    {inner}
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
                                                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">
                                                    Quick Summary
                                                </p>
                                                <p className="mt-3 text-[0.92rem] leading-6 text-[#5f594c]">
                                                    {post.excerpt}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="pointer-events-none absolute right-4 top-5 z-20 hidden w-[18rem] rounded-[1.4rem] border border-[#ded8ca] bg-white/95 p-4 opacity-0 shadow-[0_20px_60px_rgba(36,32,20,0.14)] backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 lg:block lg:translate-y-3">
                                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#7f8760]">
                                            Quick Summary
                                        </p>
                                        <p className="mt-3 overflow-hidden text-[0.92rem] leading-6 text-[#5f594c] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-8">
                        <Link to="/blogs" className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#17150f] transition-colors hover:text-[#5d7414]">
                            Read All {blogPosts.length} Posts <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* ═══ CTA ═══ */}
                <div className="mt-24 border-t border-[#e1dbcf] pt-14 px-1">
                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <h2 className="portfolio-sans text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold tracking-[-0.06em] text-[#11100c]">
                                Ready to ship your next breakthrough?
                            </h2>
                            <p className="mt-4 text-[1.05rem] leading-8 text-[#6f695c]">
                                I specialize in turning complex AI concepts into production-grade software. Let's build something real.
                            </p>
                        </div>
                        <Link to="/contact" className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#1b2433] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(27,36,51,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(27,36,51,0.3)] shrink-0">
                            Start a Conversation <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

            </section>
        </>
    );
};

export default HomePage;
