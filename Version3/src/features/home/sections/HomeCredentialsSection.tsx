import { Activity, ArrowRight, ArrowUpRight, Award, Brain, Code, Cpu, Globe, Target, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { certifications } from "@/features/certifications/certificationsData";
import { codingProfilesData } from "@/features/coding-profiles/codingProfilesData";
import { HomeSectionHeader } from "@/features/home/components/HomeSectionHeader";

const topCerts = certifications.slice(0, 5);

const cpIcons: Record<string, JSX.Element> = {
    "leetcode-img": <img src="/LeetCode_logo_rvs.webp" alt="LeetCode" className="h-full w-full object-contain" width="24" height="24" loading="lazy" decoding="async" />,
    "codechef-img": <img src="/codechef.webp" alt="CodeChef" className="h-full w-full object-cover" width="24" height="24" loading="lazy" decoding="async" />,
    Activity: <Activity className="h-5 w-5" />,
    Target: <Target className="h-5 w-5" />,
    Cpu: <Cpu className="h-5 w-5" />,
    Globe: <Globe className="h-5 w-5" />,
    Code: <Code className="h-5 w-5" />,
};

const accentMap: Record<string, string> = {
    orange: "#e66a00",
    blue: "#3561bf",
    cyan: "#1395c7",
    indigo: "#4c57d6",
    emerald: "#12915a",
    rose: "#e11d48",
    slate: "#556274",
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
    { label: "Crafting", title: "A2A agent cards", detail: "Designing standardized agent identity cards for the emerging A2A protocol ecosystem.", icon: Zap, cls: "text-[#ff4d6d]" },
    { label: "Exploring", title: "Agentic workflows", detail: "Building multi-agent pipelines with LangGraph, n8n, OpenAI Agent SDK, and AutoGen.", icon: Zap, cls: "text-[#7c3aed]" },
    { label: "Learning", title: "Reinforcement learning and RLHF", detail: "Studying policy gradient methods, reward modeling, and alignment through human feedback.", icon: Award, cls: "text-[#4c74ff]" },
];

export default function HomeCredentialsSection() {
    return (
        <div className="mt-24 border-t border-[#e1dbcf] pt-12">
            <HomeSectionHeader
                num="03"
                title={<>Credentials<span className="text-[#4c74ff]">.</span></>}
                subtitle="Professional validation and technical expertise."
            />

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
                {codingProfilesData.map((profile) => {
                    const accent = accentMap[profile.color] ?? "#556274";
                    const icon = cpIcons[profile.iconName] ?? <Code className="h-5 w-5" />;

                    return (
                        <a key={profile.label} href={profile.href} target="_blank" rel="noreferrer" className="group relative">
                            <div className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-50 w-52 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                <div className="rounded-2xl border border-[#e3dccf] bg-white p-4 shadow-[0_16px_48px_rgba(61,52,36,0.16)]">
                                    <div className="mb-3 inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg" style={{ backgroundColor: `${accent}14` }}>
                                        <span style={{ color: accent, transform: "scale(0.8)", display: "flex" }}>{icon}</span>
                                    </div>
                                    <p className="text-[1rem] font-bold tracking-[-0.04em] leading-none" style={{ color: accent }}>{profile.stats}</p>
                                    <p className="mt-1 text-[0.82rem] font-semibold text-[#243042]">{profile.label}</p>
                                    <p className="mt-2 text-[0.75rem] leading-5 text-[#6f695c]">{profile.desc}</p>
                                </div>
                                <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-[#e3dccf] bg-white" />
                            </div>

                            <div className="mb-3 inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl" style={{ backgroundColor: `${accent}12` }}>
                                <span style={{ color: accent }}>{icon}</span>
                            </div>
                            <p className="text-[1.6rem] font-bold tracking-[-0.05em] leading-none transition-colors group-hover:text-[#4c74ff]" style={{ color: accent }}>
                                {profile.stats}
                            </p>
                            <p className="mt-2 text-[0.92rem] font-semibold text-[#243042] transition-colors group-hover:text-[#4c74ff]">{profile.label}</p>
                            <p className="mt-1 text-[0.78rem] leading-relaxed text-[#8a8377]">{profile.desc.slice(0, 60)}...</p>
                        </a>
                    );
                })}
            </div>

            <div className="mt-20 grid gap-6 lg:grid-cols-3">
                <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                    <div className="mb-6 flex items-center gap-3">
                        <Brain className="h-5 w-5 text-[#8b8578]" />
                        <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#11100c]">Research Interests</h3>
                    </div>
                    <div className="mb-5 flex flex-wrap gap-2">
                        {researchThemes.map((theme) => (
                            <span key={theme.name} className="group/pill relative">
                                <span className="inline-block cursor-default rounded-full border border-[#e3dccf] bg-[#f7f4ee] px-3 py-1 text-[0.78rem] font-semibold text-[#3d485a] transition-colors group-hover/pill:border-[#b0a08c] group-hover/pill:bg-[#ede9e0]">
                                    {theme.name}
                                </span>
                                <div className="pointer-events-none absolute bottom-[calc(100%+10px)] left-1/2 z-50 w-52 -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover/pill:translate-y-0 group-hover/pill:opacity-100">
                                    <div className="rounded-2xl border border-[#e3dccf] bg-white p-4 shadow-[0_16px_48px_rgba(61,52,36,0.16)]">
                                        <p className="mb-1.5 text-[0.82rem] font-bold text-[#11100c]">{theme.name}</p>
                                        <p className="text-[0.75rem] leading-5 text-[#6f695c]">{theme.desc}</p>
                                    </div>
                                    <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-r border-b border-[#e3dccf] bg-white" />
                                </div>
                            </span>
                        ))}
                    </div>
                    <p className="text-[0.88rem] leading-7 text-[#6f695c]">
                        Exploring scaling laws, autonomous systems, and production-grade agent workflows.
                    </p>
                </div>

                <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                    <h3 className="mb-6 text-[1.15rem] font-semibold tracking-[-0.03em] text-[#11100c]">Right Now</h3>
                    <div className="space-y-4">
                        {focusItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.title} className="group/focus relative flex cursor-default items-start gap-3">
                                    <Icon className="mt-1 h-4 w-4 shrink-0 text-[#8b8578]" />
                                    <div>
                                        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#8b8578]">{item.label}</span>
                                        <p className="text-[0.92rem] font-semibold tracking-[-0.02em] text-[#11100c]">{item.title}</p>
                                    </div>
                                    <div className="pointer-events-none absolute left-0 top-[calc(100%+10px)] z-50 w-[min(18rem,calc(100vw-5rem))] translate-y-2 opacity-0 transition-all duration-200 ease-out group-hover/focus:translate-y-0 group-hover/focus:opacity-100 xl:left-[calc(100%+12px)] xl:top-1/2 xl:w-52 xl:translate-x-[-4px] xl:-translate-y-1/2 xl:group-hover/focus:translate-x-0 xl:group-hover/focus:-translate-y-1/2">
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

                <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] p-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Award className="h-5 w-5 text-[#8b8578]" />
                            <h3 className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#11100c]">Certifications</h3>
                        </div>
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[#9aa3b4]">{certifications.length}+</span>
                    </div>
                    <div className="divide-y divide-[#e4ddd1]">
                        {topCerts.map((certification) => (
                            <a key={certification.title} href={certification.link} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-3 transition-colors">
                                <p className="text-[0.88rem] font-semibold text-[#3d485a] transition-colors group-hover:text-[#11100c]">{certification.title}</p>
                                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#c0c5cf] transition-colors group-hover:text-[#11100c]" />
                            </a>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Link to="/certifications" className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-[#8b8578] transition-colors hover:text-[#11100c]">
                            View all <ArrowRight className="h-3 w-3" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
