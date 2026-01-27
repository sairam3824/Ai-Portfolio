import {
    GraduationCap,
    Calendar,
    MapPin,
    BookOpen,
    Award,
    Sparkles,
    TrendingUp,
    Library
} from "lucide-react";

export const EducationSection = () => {
    const education = [
        {
            title: "Bachelor of Technology",
            major: "Computer Science",
            org: "Vellore Institute of Technology",
            campus: "AP",
            date: "2022 — 2026",
            place: "Amaravati, India",
            grade: "8.31 CGPA",
            type: "University",
            featured: true,
            icon: <Library className="w-6 h-6" />,
            color: "blue",
            courses: [
                "Data Structures", "Algorithms", "Operating Systems", "OOP",
                "System Design", "Computer Networks", "Deep Learning", "NoSQL"
            ]
        },
        {
            title: "Intermediate Education",
            major: "MPC",
            org: "Sri Chaitanya Junior College",
            date: "2020 — 2022",
            place: "Vijayawada, India",
            grade: "83.7%",
            type: "College",
            icon: <BookOpen className="w-6 h-6" />,
            color: "indigo",
            courses: ["Mathematics", "Physics", "Chemistry"]
        },
        {
            title: "Secondary Education",
            org: "Sri Chaitanya High School",
            date: "2020",
            place: "Vijayawada, India",
            grade: "97.1%",
            type: "School",
            icon: <GraduationCap className="w-6 h-6" />,
            color: "emerald",
            courses: ["Foundation", "General Sciences", "Mathematics"]
        }
    ];

    const getColorClasses = (color: string) => {
        const maps: { [key: string]: string } = {
            blue: "text-blue-600 bg-blue-50 border-blue-100",
            indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
            emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
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
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Knowledge Acquisition</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    Academic <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Odyssey.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    The foundations of my engineering mental model, built through rigorous study and technical specialization.
                </p>
            </header>

            {/* Education Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 relative z-10">
                {education.map((it, i) => (
                    <div
                        key={i}
                        className={`group relative flex flex-col p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:border-blue-200/50 transition-all duration-500 overflow-hidden ${it.featured ? 'lg:col-span-12' : 'lg:col-span-6'}`}
                    >
                        {/* Status Label */}
                        <div className="absolute top-6 right-6 md:top-8 md:right-8">
                            <div className={`flex items-center gap-2 px-3 py-1 md:px-4 md:py-1.5 rounded-full ${getColorClasses(it.color)}`}>
                                <Award className="w-3.5 h-3.5" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">{it.grade}</span>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 md:gap-10 items-start">
                            <div className="flex-1 space-y-6">
                                <div className="space-y-4">
                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shadow-inner ${getColorClasses(it.color)}`}>
                                        {it.icon}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className={`text-2xl md:text-4xl font-black text-gray-900 tracking-tight`}>
                                            {it.org}
                                        </h3>
                                        <p className="text-blue-600 font-black uppercase text-[10px] md:text-xs tracking-widest flex flex-wrap items-center gap-2">
                                            {it.title} {it.major && <span className="text-gray-300">•</span>} {it.major}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 md:gap-6 text-gray-400 font-medium text-xs md:text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{it.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5" />
                                        <span>{it.place}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-50">
                                    <h4 className="text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Core Track</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {it.courses.map((course, j) => (
                                            <span key={j} className="px-2.5 py-1 md:px-3 md:py-1.5 bg-gray-50 text-gray-500 rounded-lg text-[9px] md:text-[10px] font-bold border border-transparent hover:border-blue-100 hover:text-blue-600 transition-all">
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Ghost Typography */}
                            <div className="absolute -bottom-10 -right-10 text-[150px] md:text-[200px] font-black text-gray-900/[0.02] select-none pointer-events-none group-hover:scale-110 transition-transform">
                                {it.org[0]}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Journey Footer */}
            <footer className="mt-24 text-center pb-20 animate-fade-in">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    B.Tech CS • VIT • 2022-2026
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default EducationSection;
