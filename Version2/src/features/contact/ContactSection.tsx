import { useState } from "react";
import {
    Mail,
    Phone,
    Github,
    Linkedin,
    Code2,
    Trophy,
    MessageSquare,
    Download,

    ExternalLink,
    MapPin,
    Share2,
    Zap
} from "lucide-react";
import { MessageDialog } from "./MessageDialog";

export const ContactSection = () => {
    const [anonymousDialogOpen, setAnonymousDialogOpen] = useState(false);

    const stats = [
        { label: "LeetCode Mastery", value: "800+", rating: "2500+ (Guardian)", href: "https://leetcode.com/u/programmer3824/", color: "blue" },
        { label: "CodeChef Ranking", value: "500+", rating: "3⭐ (1600+)", href: "https://www.codechef.com/users/sairam2004", color: "indigo" },
        { label: "GitHub Presence", value: "20+", rating: "Open Source", href: "https://github.com/sairam3824", color: "emerald" },
    ];

    const socials = [
        { icon: <Github className="w-5 h-5" />, label: "GitHub", href: "https://github.com/sairam3824", color: "blue" },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", href: "https://www.linkedin.com/in/sairam-maruri", color: "blue" },
    ];

    const getColorClasses = (color: string) => {
        const maps: { [key: string]: string } = {
            blue: "text-blue-600 bg-blue-50 border-blue-100",
            indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
            emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
            gray: "text-gray-600 bg-gray-50 border-gray-100",
        };
        return maps[color] || maps.blue;
    };

    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Share2 className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Node Synchronization</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[1.0]">
                    The Human <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Interface.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    Initiate a connection protocol via digital channels or explore the underlying architectural DNA.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10">
                {/* Primary Contact Card - Message Dialog CTA */}
                <div
                    onClick={() => setAnonymousDialogOpen(true)}
                    className="lg:col-span-8 group relative flex flex-col p-8 md:p-14 rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl shadow-blue-500/20 hover:scale-[1.01] transition-all cursor-pointer overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-48 h-48 md:w-80 md:h-80" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full justify-between gap-10 md:gap-16">
                        <div className="space-y-6 md:space-y-8">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl shadow-black/5">
                                <Zap className="w-7 h-7 md:w-8 md:h-8 text-white" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1]">
                                    Send a Secure <br />Message.
                                </h2>
                                <p className="text-blue-100 text-base md:text-xl font-medium max-w-sm md:max-w-xl leading-relaxed">
                                    Encrypted and anonymous channel for direct feedback, collaboration proposals, or technical inquiries.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 font-black uppercase tracking-widest text-[10px] md:text-xs">
                            <span className="px-5 py-2 rounded-full bg-white text-blue-600 shadow-lg shadow-black/5">Open Interface</span>
                            <span className="text-blue-200">256-bit Proto</span>
                        </div>
                    </div>
                </div>

                {/* Direct Connect Grid */}
                <div className="lg:col-span-4 grid grid-cols-1 gap-4 md:gap-6">
                    <a
                        href="mailto:sairam.maruri@gmail.com"
                        className="group flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 hover:border-blue-200/50 transition-all overflow-hidden"
                    >
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex-shrink-0 bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <Mail className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="space-y-1 min-w-0">
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Email Node</p>
                            <p className="text-xs sm:text-sm md:text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">sairam.maruri@gmail.com</p>
                        </div>
                    </a>

                    <a
                        href="tel:+917893865644"
                        className="group flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 hover:border-indigo-200/50 transition-all overflow-hidden"
                    >
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex-shrink-0 bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                            <Phone className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="space-y-1 min-w-0">
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Voice Protocol</p>
                            <p className="text-sm sm:text-base md:text-xl font-extrabold text-gray-900 group-hover:text-indigo-600 transition-colors break-words">+91 7893865644</p>
                        </div>
                    </a>

                    <div className="group flex items-center gap-4 md:gap-6 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 hover:border-blue-200/50 transition-all">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex-shrink-0 bg-gray-50 flex items-center justify-center text-gray-400 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <MapPin className="w-6 h-6 md:w-7 md:h-7" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">Base Loc</p>
                            <p className="text-base md:text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">Amaravati, India</p>
                        </div>
                    </div>
                </div>

                {/* Social Cluster */}
                <div className="lg:col-span-4 bg-white border border-gray-100 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 shadow-xl shadow-gray-200/30 relative h-full">
                    <div className="flex flex-col h-full gap-8 md:gap-12">
                        <div>
                            <h3 className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6 md:mb-10">Network Nodes</h3>
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {socials.map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group flex flex-col items-center gap-4 p-6 md:p-8 rounded-3xl md:rounded-[2rem] bg-gray-50/50 hover:bg-white border border-transparent hover:border-blue-200/50 hover:shadow-2xl transition-all"
                                    >
                                        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shadow-sm transition-all group-hover:bg-blue-600 group-hover:text-white ${getColorClasses(social.color)}`}>
                                            {social.icon}
                                        </div>
                                        <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-gray-900 transition-colors group-hover:text-blue-600">{social.label}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <a
                            href="/Sai_Ram_Maruri_Resume_2025.pdf"
                            download
                            className="mt-auto group flex items-center justify-between p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-gray-900 text-white hover:bg-blue-600 transition-all shadow-xl shadow-gray-900/20 hover:shadow-blue-500/30"
                        >
                            <div className="flex items-center gap-3 md:gap-6 min-w-0">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <Download className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-left min-w-0">
                                    <p className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase tracking-widest truncate">MANIFESTO</p>
                                    <p className="text-sm md:text-lg font-extrabold tracking-tight truncate">Resume</p>
                                </div>
                            </div>
                            <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                        </a>
                    </div>
                </div>

                {/* Coding DNA Stats */}
                <div className="lg:col-span-8 bg-white border border-gray-100 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-14 shadow-xl shadow-gray-200/30 overflow-hidden relative">
                    <div className="flex items-center gap-5 mb-10 md:mb-16">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner flex-shrink-0">
                            <Trophy className="w-6 h-6 md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h3 className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Competitive Profile</h3>
                            <p className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Architectural DNA</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 relative z-10">
                        {stats.map((stat, i) => (
                            <a
                                key={i}
                                href={stat.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-gray-50/50 hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-2xl transition-all"
                            >
                                <div className="space-y-4 md:space-y-6">
                                    <p className="text-[10px] md:text-[11px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    <div>
                                        <p className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter group-hover:text-blue-600 transition-colors">{stat.value}</p>
                                        <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-50/50 text-blue-600 text-[10px] md:text-[11px] font-black uppercase tracking-widest border border-blue-100/50">
                                            {stat.rating}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    <div className="absolute -bottom-10 -right-10 text-[200px] md:text-[300px] font-black text-gray-900/[0.02] select-none pointer-events-none group-hover:scale-110 transition-transform">
                        <Code2 className="w-full h-full" />
                    </div>
                </div>
            </div>

            <MessageDialog
                open={anonymousDialogOpen}
                onOpenChange={setAnonymousDialogOpen}
            />

            {/* Journey Footer */}
            <footer className="mt-24 text-center pb-20 animate-fade-in">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    Initiate Protocol • Establish Connection
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default ContactSection;
