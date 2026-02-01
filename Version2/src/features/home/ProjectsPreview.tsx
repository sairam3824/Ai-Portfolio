import { ArrowRight, ExternalLink, Github, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "../projects/projectsData";
import BentoCard from "./BentoCard";

const ProjectsPreview = () => {
    const featured = projectsData.filter(p => p.featured).slice(0, 3);

    return (
        <BentoCard className="col-span-12 md:col-span-5 row-span-2" ghostChar="P" delay={400}>
            <div className="flex items-center justify-between mb-5">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Projects</h3>
                <Link
                    to="/projects"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 tracking-wide transition-colors"
                >
                    View All {projectsData.length} <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="flex flex-col gap-2 flex-1">
                {featured.map((project, i) => (
                    <a
                        key={i}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 p-3 rounded-2xl bg-transparent hover:bg-gray-50/60 border border-transparent hover:border-gray-200/60 transition-all duration-300 group cursor-pointer"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex items-center justify-center shrink-0 text-base font-black shadow-sm group-hover:scale-110 transition-transform duration-300">
                            {project.title[0]}
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                            <h4 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{project.title}</h4>
                            {project.tagline ? (
                                <div className="flex items-center gap-1.5 mt-1">
                                    <Zap className="w-3 h-3 text-blue-500 shrink-0" />
                                    <span className="text-xs font-semibold text-blue-500 truncate">{project.tagline}</span>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{project.description}</p>
                            )}
                            <div className="flex flex-wrap gap-1 mt-2">
                                {project.tech.slice(0, 3).map((t, j) => (
                                    <span key={j} className="px-1.5 py-0.5 bg-white/80 rounded-md text-[9px] font-semibold text-gray-500 border border-gray-100">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5 mt-2 overflow-hidden">
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link min-w-0">
                                    <Github className="w-3 h-3 text-blue-400 group-hover/link:text-blue-500 transition-colors shrink-0" />
                                    <span className="text-[10px] font-bold text-blue-400 group-hover/link:text-blue-500 transition-colors truncate lowercase">{project.github.replace("https://github.com/", "").replace(/\/$/, "")}</span>
                                </a>
                            )}
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/link min-w-0">
                                    <ExternalLink className="w-3 h-3 text-blue-400 group-hover/link:text-blue-500 transition-colors shrink-0" />
                                    <span className="text-[10px] font-bold text-blue-400 group-hover/link:text-blue-500 transition-colors truncate lowercase">{project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                                </a>
                            )}
                        </div>
                    </a>
                ))}
            </div>
        </BentoCard>
    );
};

export default ProjectsPreview;
