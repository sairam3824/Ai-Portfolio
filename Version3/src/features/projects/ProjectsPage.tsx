import { useState } from "react";
import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Brain,
    Code2,
    Cpu,
    Github,
    Globe,
    Search,
    Shield,
    Terminal,
    Zap,
} from "lucide-react";
import Seo from "@/shared/Seo";
import { profileDetails } from "@/data/siteMetadata";
import { projectsData } from "@/features/projects/projectsData";

const iconMap = {
    Zap,
    Brain,
    Code2,
    Cpu,
    Globe,
    Terminal,
    Shield,
    Search,
    Activity,
} as const;

const allProjects = [...projectsData].sort((a, b) => {
    if (!!a.link !== !!b.link) return a.link ? -1 : 1;
    if (!!a.featured !== !!b.featured) return a.featured ? -1 : 1;
    return a.title.localeCompare(b.title);
});

const projectCategories = ["All", ...Array.from(new Set(allProjects.map((project) => project.category)))];
const liveProjectsCount = allProjects.filter((project) => project.link).length;

const formatGithubLabel = (url: string) => {
    try {
        const { pathname } = new URL(url);
        return pathname.replace(/^\/+|\/+$/g, "") || "GitHub";
    } catch {
        return url.replace("https://github.com/", "").replace(/\/$/, "") || "GitHub";
    }
};

const formatProjectLinkLabel = (url: string) => {
    try {
        const { hostname, pathname } = new URL(url);
        const cleanPath = pathname.replace(/^\/+|\/+$/g, "");
        return [hostname.replace(/^www\./, ""), cleanPath].filter(Boolean).join("/") || "Visit";
    } catch {
        return url.replace(/^https?:\/\//, "").replace(/\/$/, "") || "Visit";
    }
};

export const ProjectsPage = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [query, setQuery] = useState("");

    const normalizedQuery = query.trim().toLowerCase();
    const filteredProjects = allProjects.filter((project) => {
        const matchesCategory = activeCategory === "All" || project.category === activeCategory;
        const matchesQuery =
            normalizedQuery.length === 0 ||
            project.title.toLowerCase().includes(normalizedQuery) ||
            project.description.toLowerCase().includes(normalizedQuery) ||
            project.tech.some((tech) => tech.toLowerCase().includes(normalizedQuery)) ||
            project.category.toLowerCase().includes(normalizedQuery) ||
            project.tagline?.toLowerCase().includes(normalizedQuery);

        return matchesCategory && matchesQuery;
    });

    return (
        <>
            <Seo
                title={`${profileDetails.name} | Projects`}
                description="Project archive for Sai Ram Maruri featuring shipped AI products, agent systems, RAG applications, and production-ready engineering work."
                pageType="CollectionPage"
                keywords={[
                    "AI Projects Portfolio",
                    "GenAI Projects",
                    "RAG Projects",
                    "Agentic AI Projects",
                    "Full Stack AI Engineer Projects",
                    "Sai Ram Maruri Projects",
                ]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Projects", url: "/projects" },
                ]}
            />

            <div className="flex flex-col gap-6">
                <section>
                    <div className="relative overflow-hidden rounded-[2.8rem] bg-[linear-gradient(180deg,#fbf8f1_0%,#f4eee1_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(61,52,36,0.05)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <div className="pointer-events-none absolute left-[8%] top-10 h-40 w-40 rounded-full bg-[#dce6b8]/45 blur-3xl" />
                        <div className="pointer-events-none absolute right-[8%] top-24 h-44 w-44 rounded-full bg-[#e7dcc4]/70 blur-3xl" />

                        <p className="relative text-sm font-semibold uppercase tracking-[0.24em] text-[#798255]">Projects</p>

                        <div className="relative mt-6 max-w-[1100px]">
                            <h1 className="portfolio-sans text-[clamp(4rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#11100c]">
                                Built systems.{" "}
                                <span className="bg-[linear-gradient(180deg,#72873a_0%,#5a6f1f_100%)] bg-clip-text text-transparent">
                                    Shipped products.
                                </span>
                            </h1>
                            <p className="mt-8 max-w-[45ch] text-[clamp(1.12rem,1.9vw,1.55rem)] leading-[1.6] text-[#6f695c]">
                                This is the working archive behind my portfolio: GenAI systems, agent frameworks, RAG products,
                                infrastructure tooling, and production apps built to solve real problems.
                            </p>
                        </div>

                        <div className="relative mt-10 grid gap-5 md:grid-cols-3">
                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-7 shadow-[0_18px_50px_rgba(61,52,36,0.05)]">
                                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">Total Projects</p>
                                <p className="mt-4 text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#11100c]">
                                    {allProjects.length}+
                                </p>
                                <p className="mt-4 text-lg leading-8 text-[#6f695c]">A deep mix of AI products, infra tools, and experimental systems.</p>
                            </article>

                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-7 shadow-[0_18px_50px_rgba(61,52,36,0.05)]">
                                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">Live Deployments</p>
                                <p className="mt-4 text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#11100c]">
                                    {liveProjectsCount}+
                                </p>
                                <p className="mt-4 text-lg leading-8 text-[#6f695c]">Products with public demos, live workflows, or production interfaces.</p>
                            </article>

                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-7 shadow-[0_18px_50px_rgba(61,52,36,0.05)]">
                                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">Project Categories</p>
                                <p className="mt-4 text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#11100c]">
                                    {projectCategories.length - 1}
                                </p>
                                <p className="mt-4 text-lg leading-8 text-[#6f695c]">A mix of AI products, infrastructure tooling, automation, and applied ML systems.</p>
                            </article>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-5 shadow-[0_24px_70px_rgba(61,52,36,0.06)] sm:px-8 sm:py-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Project Library</p>
                                <h2 className="portfolio-sans mt-2 text-[clamp(2rem,3vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#11100c]">
                                    Browse the full archive.
                                </h2>
                            </div>

                            <div className="relative w-full lg:max-w-[420px]">
                                <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8377]" />
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search projects, stacks, or categories"
                                    className="w-full rounded-full border border-[#d9d2c2] bg-[#fbfaf6] py-4 pl-12 pr-5 text-sm font-medium text-[#17140f] outline-none transition-colors placeholder:text-[#9a9388] focus:border-[#7b8d42]"
                                />
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                            {projectCategories.map((category) => {
                                const isActive = category === activeCategory;

                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                                            isActive
                                                ? "bg-[#5d7414] text-white"
                                                : "border border-[#d9d2c2] bg-[#fbfaf6] text-[#4d473b] hover:bg-[#f3eee4]"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {filteredProjects.map((project) => {
                            const Icon = iconMap[project.iconName as keyof typeof iconMap] ?? Code2;

                            return (
                                <article
                                    key={project.title}
                                    className="group flex h-full flex-col rounded-[2.1rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-6 shadow-[0_20px_60px_rgba(61,52,36,0.05)] transition-transform duration-200 hover:-translate-y-1"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-[#f4efe4] text-[#5d7414]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#8a8377]">
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 className="mt-6 text-2xl font-semibold tracking-[-0.04em] text-[#17150f]">
                                        {project.title}
                                    </h3>
                                    {project.tagline && (
                                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#7b8459]">
                                            {project.tagline}
                                        </p>
                                    )}
                                    <p className="mt-4 flex-1 text-[0.98rem] leading-7 text-[#686154]">{project.description}</p>

                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {project.tech.slice(0, 6).map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full border border-[#d7d0c4] bg-[#fbfaf6] px-3 py-1 text-xs font-medium text-[#5f584a]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-7 flex flex-wrap gap-3">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full border border-[#d0c8bc] px-4 py-2.5 text-sm font-semibold text-[#18160f]"
                                            >
                                                {formatGithubLabel(project.github)}
                                                <Github className="h-4 w-4" />
                                            </a>
                                        )}
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 rounded-full bg-[#e2edbf] px-4 py-2.5 text-sm font-semibold text-[#18160f]"
                                            >
                                                {formatProjectLinkLabel(project.link)}
                                                <ArrowUpRight className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="mt-8 rounded-[2rem] border border-dashed border-[#d9d2c2] px-6 py-12 text-center text-[#7b7467]">
                            No projects matched that search yet. Try another keyword or switch back to `All`.
                        </div>
                    )}
                </section>

                <section>
                    <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[linear-gradient(180deg,#fbf8f1_0%,#f3eee3_100%)] px-8 py-10 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Next Step</p>
                                <h2 className="portfolio-serif mt-3 text-[clamp(2.4rem,4vw,4rem)] leading-[1.02] tracking-[-0.05em] text-[#11100c]">
                                    Want the full story behind a build?
                                </h2>
                                <p className="mt-5 max-w-[40ch] text-lg leading-8 text-[#6f695c]">
                                    I can walk through the architecture, tradeoffs, and engineering decisions behind any project in this archive.
                                </p>
                            </div>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full bg-[#5d7414] px-7 py-4 text-base font-semibold text-white"
                            >
                                Contact Me
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectsPage;
