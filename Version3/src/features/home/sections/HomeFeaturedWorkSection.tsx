import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projectsData } from "@/features/projects/projectsData";
import { HomeSectionHeader } from "@/features/home/components/HomeSectionHeader";

type FeaturedProject = (typeof projectsData)[number];

const liveProjects = projectsData.filter((project) => project.link).slice(0, 2);

const FeaturedProjectCard = ({ project, index }: { project: FeaturedProject; index: number }) => (
    <div className="group relative overflow-hidden rounded-[2.4rem] border border-[#e3dccf] bg-[#fffdf8] p-8 shadow-[0_20px_60px_rgba(61,52,36,0.05)] transition-shadow duration-500 hover:shadow-[0_40px_100px_rgba(61,52,36,0.1)] sm:p-10">
        <span className="pointer-events-none absolute -right-4 -top-6 text-[12rem] font-bold leading-none text-[#ebe7de] select-none transition-transform duration-700 ease-out group-hover:scale-110 group-hover:translate-x-4 group-hover:-translate-y-4">
            {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative z-20">
            <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-[#e3dccf] px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#9aa3b4]">
                    {project.category}
                </span>
                {project.link && (
                    <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#8b8578]">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#11100c] opacity-30" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#11100c]" />
                        </span>
                        Live
                    </span>
                )}
            </div>

            <h3 className="portfolio-sans text-[clamp(1.8rem,3.5vw,2.8rem)] font-semibold tracking-[-0.05em] leading-[1.05] text-[#11100c] transition-colors group-hover:text-[#4c74ff]">
                {project.title}
            </h3>

            {project.tagline && (
                <p className="mt-3 text-[0.82rem] font-semibold uppercase tracking-[0.1em] text-[#8b8578]">{project.tagline}</p>
            )}

            <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-7 text-[#6f695c]">{project.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((tech) => (
                    <span key={tech} className="rounded-full border border-[#e3dccf] bg-[#f7f4ee] px-3 py-1 text-[0.72rem] font-semibold text-[#6f695c]">
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#1b2433] px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#253044]"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {project.link.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                    </a>
                )}
                {project.github && (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[#e3dccf] bg-[#f7f4ee] px-4 py-2.5 text-[0.78rem] font-semibold text-[#3d485a] transition-colors hover:border-[#b0a998] hover:bg-white"
                    >
                        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                )}
            </div>
        </div>
    </div>
);

export default function HomeFeaturedWorkSection() {
    return (
        <div className="mt-20">
            <HomeSectionHeader
                num="01"
                title={<>Featured Work<span className="text-[#4c74ff]">.</span></>}
                subtitle="Live products and shipped projects that define my engineering journey."
            />

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
                {liveProjects.map((project, index) => (
                    <FeaturedProjectCard key={project.title} project={project} index={index} />
                ))}
            </div>

            <div className="mt-10">
                <Link to="/projects" className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#17150f] transition-colors hover:text-[#5d7414]">
                    View All {projectsData.length} Projects <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
