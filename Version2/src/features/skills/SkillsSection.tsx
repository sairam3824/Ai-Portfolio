import { Target } from "lucide-react";
import { skillCategories as skillCategoriesData } from "./skillsData";

export const SkillsSection = () => {

    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Technical Arsenal</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Skill <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Matrix.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    A comprehensive architecture of technical competencies across AI, cloud systems, and algorithmic engineering.
                </p>
            </header>


            {/* Skills Grid - Clean Text Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {skillCategoriesData.map((cat, i) => (
                    <div
                        key={i}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300"
                    >
                        {/* Category Header */}
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 tracking-tight leading-tight mb-2">
                                {cat.category}
                            </h3>
                            <p className="text-sm font-medium text-gray-500 leading-relaxed">
                                {cat.description}
                            </p>
                        </div>

                        {/* Skills as comma-separated text */}
                        <div className="text-gray-700 leading-relaxed">
                            {cat.skills.map((skill, j) => (
                                <span key={j}>
                                    {skill.url ? (
                                        <a
                                            href={skill.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold hover:text-blue-600 transition-colors cursor-pointer"
                                        >
                                            {skill.name}
                                        </a>
                                    ) : (
                                        <span className="font-semibold">
                                            {skill.name}
                                        </span>
                                    )}
                                    {j < cat.skills.length - 1 && (
                                        <span className="text-gray-400"> • </span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Journey Footer */}
            <footer className="mt-24 text-center pb-8 animate-fade-in">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    Continuously Improving • Mastering New Tech
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default SkillsSection;
