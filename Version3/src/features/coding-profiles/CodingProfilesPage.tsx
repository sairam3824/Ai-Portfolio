import {
    Code,
    ExternalLink,
    Target,
    Activity,
    Globe,
    Cpu
} from "lucide-react";
import { codingProfilesData } from "./codingProfilesData";
import Seo from "../../shared/Seo";

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
        "leetcode-img": <img src="/LeetCode_logo_rvs.webp" alt="LeetCode" className="w-full h-full object-contain" width="24" height="24" loading="lazy" decoding="async" />,
        "codechef-img": <img src="/codechef.webp" alt="CodeChef" className="w-full h-full object-cover" width="24" height="24" loading="lazy" decoding="async" />,
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
        <div className="home-container relative mx-auto min-h-full max-w-6xl overflow-hidden px-4 py-10 sm:py-12">
            <Seo
                title="Coding Profiles | Sai Ram Maruri — LeetCode Guardian"
                description="Competitive programming profiles of Sai Ram Maruri: LeetCode Guardian (2500+ rating, Top 1%), CodeChef 3-Star (1600+), Codeforces, InterviewBit, TakeUForward. 1000+ problems solved across 50+ contests."
                keywords={["LeetCode Guardian", "LeetCode 2500 Rating", "CodeChef 3 Star", "Competitive Programming India", "Codeforces", "1000 Problems Solved", "Sai Ram Maruri LeetCode", "Top 1 Percent LeetCode"]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Coding Profiles", url: "/coding-profiles" },
                ]}
            />
            {/* Ambient Background Elements — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 -left-20 w-96 h-96 bg-blue-400/10 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="hidden md:block absolute bottom-0 -right-20 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full -z-10 animate-pulse delay-700" />

            {/* Header section with distinct typography */}
            <header className="text-center space-y-6 mb-10 sm:mb-16 md:mb-20 animate-fade-in">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/40 px-4 py-2 shadow-sm">
                    <Code className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Global Leaderboards</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-gray-800 leading-tight">
                    Coding <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">DNA</span>
                </h1>
                <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-gray-500 md:text-xl">
                    Quantifying analytical prowess through rigorous competitive metrics and verified achievements.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 pt-4 text-[11px] font-bold uppercase tracking-widest text-gray-400 sm:flex-row sm:gap-6 sm:text-xs">
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
            <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-4 gap-6 auto-rows-auto md:auto-rows-[140px]">
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
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border bg-white p-5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl sm:rounded-[2.5rem] sm:p-8 sm:hover:-translate-y-2 ${colSpan} ${rowSpan} ${styles.border} ${styles.hoverBorder}`}
                        >
                            {/* Gradient Overlay on Hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex items-start justify-between">
                                {(profile.label === "LeetCode" || profile.label === "CodeChef") ? (
                                    <div className="h-12 w-12 overflow-hidden rounded-2xl bg-white p-1 shadow-sm transition-transform duration-500 group-hover:scale-110 sm:h-14 sm:w-14">
                                        {profile.icon}
                                    </div>
                                ) : (
                                    <div className={`rounded-3xl p-3 shadow-inner transition-transform duration-500 group-hover:scale-110 sm:p-4 ${styles.iconBg} ${styles.iconText}`}>
                                        {profile.icon}
                                    </div>
                                )}
                                <div className="p-2 rounded-full border border-gray-100 bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="relative z-10 space-y-2">
                                <div className="flex flex-wrap items-baseline gap-2">
                                    <h3 className="text-xl font-bold tracking-tight text-gray-800 sm:text-2xl">
                                        {profile.label}
                                    </h3>
                                    {isFeatured && <span className={`text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 rounded-full ${styles.badge}`}>Top Performer</span>}
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className={`text-lg font-bold ${styles.text}`}>
                                        {profile.stats}
                                    </p>
                                </div>

                                {isFeatured && (
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-xs mt-2 md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                                        {profile.desc}
                                    </p>
                                )}
                            </div>

                            {/* Decorative background number/letter */}
                            <div className="hidden sm:block absolute -bottom-6 -right-4 text-[120px] font-black text-gray-800/5 select-none transition-all group-hover:text-gray-800/[0.08] group-hover:scale-110">
                                {profile.label[0]}
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* Bottom Accent */}
            <div className="mt-20 text-center animate-fade-in">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-4">
                    <span className="w-12 h-px bg-gray-200" />
                    Built for the next billion coders
                    <span className="w-12 h-px bg-gray-200" />
                </p>
            </div>
        </div>
    );
};

export default CodingProfilesPage;
