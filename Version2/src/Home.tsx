import { Suspense, lazy } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTypewriter } from "./hooks/useTypewriter";
import avatar from "./assets/avatar_optimized.jpg";
import Seo from "./shared/Seo";
import { StatsSection } from "./features/home/StatsSection";

// Start loading HomeSections immediately (don't wait for render)
const homeSectionsPromise = import("./features/home/HomeSections");
const HomeSections = lazy(() => homeSectionsPromise);

const Home = () => {
    const title = useTypewriter({
        texts: [
            "GenAI Engineer",
            "ML Engineer",
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
            <Seo
                title="Sai Ram Maruri | GenAI & ML Engineer"
                description="Portfolio of Sai Ram Maruri - GenAI & ML Engineer building production AI that ships. Specializing in LLM agents, RAG systems, agentic workflows, and cloud-native AI on AWS."
            />

            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* ═══════════════════════════════════════════
                    HERO — Magazine Cover
                ═══════════════════════════════════════════ */}
                <section className="pt-12 md:pt-20 pb-6 md:pb-10 animate-fade-in-up">
                    <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4">Vol. 01 — 2026 Edition</p>

                    <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-12">
                        <div className="flex-1">
                            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-4">
                                Sairam{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Maruri.</span>
                            </h1>

                            <div className="h-9 sm:h-10 mb-6">
                                <span className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-500 tracking-tight font-display">
                                    {title}
                                    <span className="text-blue-400 animate-pulse ml-px">|</span>
                                </span>
                            </div>

                            <p className="text-base sm:text-lg text-gray-500 font-medium max-w-xl leading-relaxed mb-6">
                                GenAI & ML Engineer & Vibe Coder who architects and ships production SaaS AI on cloud — powered by Claude Code, built to scale, designed to deliver.
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
                                    decoding="async"
                                    fetchPriority="high"
                                />
                                <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-[2.5px] border-white shadow-sm" />
                            </div>

                            {/* Let's Connect List */}
                            <div className="w-full max-w-[280px] sm:max-w-[320px] flex flex-col gap-6 mt-4">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">Let's Connect</h3>

                                <a
                                    href="https://github.com/sairam3824"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 px-2 py-2 group"
                                >
                                    <Github className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-lg text-gray-800">github.com/sairam3824</span>
                                </a>

                                <a
                                    href="https://www.linkedin.com/in/sairam-maruri/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 px-2 py-2 group"
                                >
                                    <Linkedin className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-lg text-gray-800 truncate">linkedin.com/in/sairam-maruri</span>
                                </a>

                                <a href="mailto:sairam.maruri@gmail.com" className="flex items-center gap-5 px-2 py-2 group">
                                    <Mail className="w-6 h-6 text-blue-600" />
                                    <span className="font-medium text-sm sm:text-lg text-gray-800 truncate">sairam.maruri@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    STATS — Key Metrics
                ═══════════════════════════════════════════ */}
                <StatsSection />

                <Suspense
                    fallback={
                        <div className="py-16 text-center text-sm font-semibold text-gray-400">
                            Loading sections...
                        </div>
                    }
                >
                    <HomeSections />
                </Suspense>
            </div>
        </div>
    );
};

export default Home;
