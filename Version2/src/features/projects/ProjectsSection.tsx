import { useState, useMemo, ReactNode } from "react";
import {
    Search,
    Code2,
    ExternalLink,
    Github,
    Cpu,
    Globe,
    Zap,
    Brain,
    Rocket,
    Folder,
    Terminal
} from "lucide-react";
import { projectsData } from "./projectsData";

const iconMap: Record<string, ReactNode> = {
    Zap: <Zap className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
    Rocket: <Rocket className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    Code2: <Code2 className="w-5 h-5" />,
    Terminal: <Terminal className="w-5 h-5" />,
};

const projects = projectsData.map(p => ({
    ...p,
    icon: iconMap[p.iconName] || <Code2 className="w-5 h-5" />,
})).sort((a, b) => {
    // Prioritize projects with a live link
    const aHasLink = !!a.link;
    const bHasLink = !!b.link;

    if (aHasLink && !bHasLink) return -1;
    if (!aHasLink && bHasLink) return 1;
    return 0;
});

export const ProjectsSection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredProjects = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return projects;
        return projects.filter((p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            (p.tagline && p.tagline.toLowerCase().includes(query)) ||
            p.tech.some(t => t.toLowerCase().includes(query))
        );
    }, [searchQuery]);

    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Rocket className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Innovation Portfolio</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Project <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Forge.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    A curated collection of mission-critical AI systems, machine learning architectures, and cloud-native solutions.
                </p>
            </header>

            {/* Controls: Search & Filters */}
            {/* Controls: Search */}
            <div className="flex justify-center mb-20 relative z-10 px-4">
                <div className="bg-white p-2 rounded-full shadow-xl shadow-gray-200/40 border border-gray-100 flex items-center max-w-lg w-full group focus-within:border-blue-300 focus-within:shadow-blue-500/10 transition-all duration-300">
                    <div className="pl-4 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                        <Search className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-bold text-gray-700 placeholder-gray-400 h-12 px-4 uppercase tracking-wider"
                    />
                </div>
            </div>

            {/* Projects Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {filteredProjects.map((project, i) => (
                    <div
                        key={i}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 hover:border-blue-200/50 transition-all duration-500"
                    >
                        {/* Status Label */}
                        <div className="absolute top-8 right-8">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-black uppercase tracking-widest">Active</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                                {project.icon}
                            </div>
                        </div>

                        <div className="space-y-3 flex-1">
                            <div className="space-y-1">
                                <h3 className="text-xl font-black text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">
                                    {project.title}
                                </h3>
                                {project.tagline && (
                                    <div className="flex items-center gap-1.5">
                                        <Zap className="w-2.5 h-2.5 text-blue-500 shrink-0" />
                                        <p className="text-blue-500 text-[10px] font-black uppercase tracking-widest">
                                            {project.tagline}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <p className="text-gray-500 font-medium leading-relaxed italic text-sm md:text-base">
                                "{project.description}"
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, j) => (
                                    <span key={j} className="px-2.5 py-1 bg-gray-50 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-3 pt-4 border-t border-gray-50 overflow-hidden">
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-xl text-[10px] font-bold tracking-tight hover:bg-gray-800 transition-colors active:scale-95 px-2">
                                        <Github className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{project.github.replace("https://github.com/", "").replace(/\/$/, "").toLowerCase()}</span>
                                    </a>
                                )}
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-bold tracking-tight hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20 active:scale-95 px-2">
                                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                                        <span className="truncate">{project.link.replace(/^https?:\/\//, "").replace(/\/$/, "").toLowerCase()}</span>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Background Decor */}
                        <div className="hidden sm:block absolute -bottom-8 -right-8 text-[120px] font-black text-gray-900/[0.02] select-none group-hover:scale-110 transition-transform">
                            {project.title[0]}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <Folder className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">No artifacts found matching your query</p>
                </div>
            )}

            {/* Journey Footer */}
            <footer className="mt-24 text-center pb-8 animate-fade-in">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    Building Solutions • Solving Problems
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default ProjectsSection;
