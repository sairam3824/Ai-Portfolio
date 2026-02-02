import { Trophy, ExternalLink, Globe, Bot, Activity, Cpu, Sparkles, Rocket, Code, Compass, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { certifications } from "../certifications/certificationsData";

const topCerts = certifications.slice(0, 4);

const researchInterests = [
    "Scaling Laws",
    "Code Generation",
    "AI Safety & Alignment",
    "A2A Agent Cards",
];

const achievements = [
    { label: "LeetCode Guardian", sub: "Top 1% Global", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50", border: "border-gray-100 hover:border-amber-200" },
    { label: "CodeChef 3-Star", sub: "1600+ Rating", icon: Sparkles, color: "text-purple-600", bg: "bg-purple-50", border: "border-gray-100 hover:border-purple-200" },
    { label: "1000+ Problems", sub: "DSA Solved", icon: Cpu, color: "text-blue-600", bg: "bg-blue-50", border: "border-gray-100 hover:border-blue-200" },
    { label: "Vibe Coding", sub: "SaaS in < 10h", icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-gray-100 hover:border-emerald-200" },
];

const rightNowItems = [
    { label: "BUILDING", text: "AI-Powered SaaS Products", icon: Rocket, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-gray-100 hover:border-emerald-200", labelColor: "text-emerald-600" },
    { label: "SOLVING", text: "1000+ DSA Problems & Counting", icon: Code, color: "text-amber-600", bg: "bg-amber-50", border: "border-gray-100 hover:border-amber-200", labelColor: "text-amber-600" },
    { label: "CRAFTING", text: "A2A Agent Cards", icon: Bot, color: "text-rose-600", bg: "bg-rose-50", border: "border-gray-100 hover:border-rose-200", labelColor: "text-rose-600" },
    { label: "EXPLORING", text: "Agentic Workflows", icon: Compass, color: "text-violet-600", bg: "bg-violet-50", border: "border-gray-100 hover:border-violet-200", labelColor: "text-violet-600" },
    { label: "LEARNING", text: "Reinforcement Learning & RLHF", icon: BookOpen, color: "text-blue-600", bg: "bg-blue-50", border: "border-gray-100 hover:border-blue-200", labelColor: "text-blue-600" },
];

const CredentialsSection = () => {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <span className="editorial-number mb-2 block text-blue-600 font-mono">03</span>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Credentials<span className="text-blue-600">.</span>
                    </h2>
                </div>
                <p className="max-w-md text-gray-500 font-medium leading-relaxed">
                    Showcasing expertise in AI research, competitive programming, and professional certifications.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* 1. Achievements - High Impact Stats (Span 8) */}
                <div className="col-span-1 md:col-span-8 group relative overflow-hidden rounded-3xl bg-white p-8 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 rounded-lg bg-gray-50 border border-gray-100">
                                <Trophy className="w-5 h-5 text-gray-900" />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-gray-900">Key Achievements</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {achievements.map((item, idx) => (
                                <div key={idx} className={`flex items-center gap-4 p-4 rounded-2xl bg-white border ${item.border} shadow-sm transition-all hover:bg-gray-50`}>
                                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-lg">{item.label}</div>
                                        <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Research Interests (Span 4) */}
                <div className="col-span-1 md:col-span-4 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-10 -mt-10" />

                    <div className="relative z-10 h-full flex flex-col">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                                <Globe className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Research</h3>
                        </div>

                        <div className="flex flex-wrap gap-2 content-start">
                            {researchInterests.map((item) => (
                                <span key={item} className="px-3 py-1.5 rounded-lg bg-indigo-50/50 border border-indigo-100 text-xs font-bold text-indigo-700 hover:bg-indigo-100 transition-colors cursor-default">
                                    {item}
                                </span>
                            ))}
                        </div>

                        <div className="mt-auto pt-8">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Focus</div>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                Exploring the intersection of Scaling Laws and Agentic Workflows.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. Right Now / Next Milestones (Span 6) */}
                <div className="col-span-1 md:col-span-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-lg font-black text-gray-900 tracking-tight">Right Now</h3>
                    </div>

                    <div className="space-y-2">
                        {rightNowItems.map((item, idx) => (
                            <div key={idx} className={`flex items-center gap-3 p-3 rounded-2xl bg-white border ${item.border} transition-all hover:bg-gray-50 hover:-translate-y-0.5`}>
                                <div className={`p-2 rounded-xl ${item.bg} ${item.color} shadow-sm shrink-0 border border-gray-100`}>
                                    <item.icon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${item.labelColor} mb-0.5`}>
                                        {item.label}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900 leading-tight">
                                        {item.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 4. Certifications (Span 6) */}
                <div className="col-span-1 md:col-span-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                                <Activity className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight">Certifications</h3>
                        </div>
                        <Link to="/certifications" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors">
                            View All
                        </Link>
                    </div>

                    <div className="space-y-1 flex-1">
                        {topCerts.map((cert) => (
                            <a
                                key={cert.title}
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0 hover:pl-2 transition-all duration-300"
                            >
                                <span className="text-base font-bold text-gray-700 group-hover:text-blue-600 truncate mr-4">
                                    {cert.title}
                                </span>
                                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                            </a>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <span>Professional Growth</span>
                        <span className="font-semibold text-gray-900">Continuous Learning</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CredentialsSection;
