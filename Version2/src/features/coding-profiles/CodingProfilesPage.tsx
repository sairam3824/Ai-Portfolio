import {
    Code,
    ExternalLink,
    Target,
    Activity,
    Globe,
    Cpu
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { codingProfilesData } from "./codingProfilesData";

export const CodingProfilesPage = () => {
    const colorStyles = {
        blue: {
            border: "border-blue-100",
            hoverBorder: "group-hover:border-blue-500",
            iconBg: "bg-blue-50",
            iconText: "text-blue-600",
            text: "text-blue-600",
            gradient: "from-blue-500/10",
            badge: "bg-blue-100 text-blue-700"
        },
        orange: {
            border: "border-orange-100",
            hoverBorder: "group-hover:border-orange-500",
            iconBg: "bg-orange-50",
            iconText: "text-orange-600",
            text: "text-orange-600",
            gradient: "from-orange-500/10",
            badge: "bg-orange-100 text-orange-700"
        },
        yellow: {
            border: "border-yellow-100",
            hoverBorder: "group-hover:border-yellow-500",
            iconBg: "bg-yellow-50",
            iconText: "text-yellow-600",
            text: "text-yellow-600",
            gradient: "from-yellow-500/10",
            badge: "bg-yellow-100 text-yellow-700"
        },
        cyan: {
            border: "border-cyan-100",
            hoverBorder: "group-hover:border-cyan-500",
            iconBg: "bg-cyan-50",
            iconText: "text-cyan-600",
            text: "text-cyan-600",
            gradient: "from-cyan-500/10",
            badge: "bg-cyan-100 text-cyan-700"
        },
        indigo: {
            border: "border-indigo-100",
            hoverBorder: "group-hover:border-indigo-500",
            iconBg: "bg-indigo-50",
            iconText: "text-indigo-600",
            text: "text-indigo-600",
            gradient: "from-indigo-500/10",
            badge: "bg-indigo-100 text-indigo-700"
        },
        emerald: {
            border: "border-emerald-100",
            hoverBorder: "group-hover:border-emerald-500",
            iconBg: "bg-emerald-50",
            iconText: "text-emerald-600",
            text: "text-emerald-600",
            gradient: "from-emerald-500/10",
            badge: "bg-emerald-100 text-emerald-700"
        },
        rose: {
            border: "border-rose-100",
            hoverBorder: "group-hover:border-rose-500",
            iconBg: "bg-rose-50",
            iconText: "text-rose-600",
            text: "text-rose-600",
            gradient: "from-rose-500/10",
            badge: "bg-rose-100 text-rose-700"
        },
        slate: {
            border: "border-slate-100",
            hoverBorder: "group-hover:border-slate-500",
            iconBg: "bg-slate-50",
            iconText: "text-slate-600",
            text: "text-slate-600",
            gradient: "from-slate-500/10",
            badge: "bg-slate-100 text-slate-700"
        }
    };

    const iconMap: Record<string, React.ReactNode> = {
        "leetcode-img": <img src="/LeetCode_logo_rvs.webp" alt="LeetCode" className="w-full h-full object-contain" loading="lazy" />,
        "codechef-img": <img src="/codechef.webp" alt="CodeChef" className="w-full h-full object-cover" loading="lazy" />,
        Activity: <Activity className="w-5 h-5" />,
        Target: <Target className="w-5 h-5" />,
        Cpu: <Cpu className="w-5 h-5" />,
        Globe: <Globe className="w-5 h-5" />,
        Code: <Code className="w-5 h-5" />,
    };

    const codingProfiles = codingProfilesData.map(p => ({
        ...p,
        icon: iconMap[p.iconName] || <Code className="w-5 h-5" />,
    }));

    return (
        <div className="home-container relative py-12 px-4 max-w-6xl mx-auto min-h-full overflow-hidden">
            <Helmet>
                <title>Coding Profiles | Sai Ram Maruri</title>
                <meta name="description" content="Explore Sai Ram Maruri's competitive programming profiles — LeetCode Guardian, CodeChef 3-Star rankings and more." />
            </Helmet>
            {/* Ambient Background Elements — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 -left-20 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="hidden md:block absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

            {/* Header section with distinct typography */}
            <header className="text-center space-y-6 mb-20 animate-fade-in">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Code className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Global Leaderboards</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-gray-900 leading-tight">
                    Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">DNA</span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    Quantifying analytical prowess through rigorous competitive metrics and verified achievements.
                </p>
                <div className="flex justify-center gap-6 pt-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                        Live Metrics
                    </span>
                    <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping delay-300" />
                        Verified Skills
                    </span>
                </div>
            </header>

            {/* Bento Style Grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-4 gap-6 auto-rows-[140px]">
                {codingProfiles.map((profile, i) => {
                    const isFeatured = profile.featured;
                    const colSpan = isFeatured ? 'md:col-span-3' : 'md:col-span-2';
                    const rowSpan = isFeatured ? 'md:row-span-2' : 'md:row-span-1';
                    // @ts-ignore
                    const styles = colorStyles[profile.color] || colorStyles.blue;

                    return (
                        <a
                            key={i}
                            href={profile.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative flex flex-col justify-between p-8 rounded-[2.5rem] bg-white border shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden ${colSpan} ${rowSpan} ${styles.border} ${styles.hoverBorder}`}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex items-start justify-between">
                                {(profile.label === "LeetCode" || profile.label === "CodeChef") ? (
                                    <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-sm bg-white p-1 group-hover:scale-110 transition-transform duration-500">
                                        {profile.icon}
                                    </div>
                                ) : (
                                    <div className={`p-4 rounded-3xl shadow-inner group-hover:scale-110 transition-transform duration-500 ${styles.iconBg} ${styles.iconText}`}>
                                        {profile.icon}
                                    </div>
                                )}
                                <div className="p-2 rounded-full border border-gray-100 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-2">
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">
                                        {profile.label}
                                    </h3>
                                    {isFeatured && <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full ${styles.badge}`}>Top Performer</span>}
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className={`text-lg font-bold ${styles.text}`}>
                                        {profile.stats}
                                    </p>
                                </div>

                                {isFeatured && (
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs mt-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {profile.desc}
                                    </p>
                                )}
                            </div>

                            {/* Decorative background number/letter */}
                            <div className="hidden sm:block absolute -bottom-6 -right-4 text-[120px] font-black text-gray-900/5 select-none transition-all group-hover:text-gray-900/[0.08] group-hover:scale-110">
                                {profile.label[0]}
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Bottom Accent */}
            <div className="mt-20 text-center animate-fade-in">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-gray-200" />
                    Built for the next billion coders
                    <span className="w-12 h-px bg-gray-200" />
                </p>
            </div>
        </div>
    );
};

export default CodingProfilesPage;
