import { ArrowRight, Brain, Cloud, Code2, Cpu, Database, Monitor, Search, Server, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/shared/Seo";
import { profileDetails } from "@/data/siteMetadata";
import { skillCategories } from "@/features/skills/skillsData";

const iconMap = {
    Brain,
    Code2,
    Zap,
    Cloud,
    Database,
    Monitor,
    Server,
} as const;

const totalSkills = skillCategories.reduce((count, category) => count + category.skills.length, 0);
const advancedSkills = skillCategories.reduce(
    (count, category) => count + category.skills.filter((skill) => skill.level === "Advanced").length,
    0,
);
const highlightedTools = skillCategories
    .flatMap((category) => category.skills)
    .filter((skill) =>
        [
            "Claude Code",
            "Cursor AI",
            "Codex",
            "LangGraph",
            "AWS Bedrock",
            "Docker",
            "Next.js",
            "FastAPI",
        ].includes(skill.name),
    );

export const SkillsPage = () => {
    const [query, setQuery] = useState("");
    const normalizedQuery = query.trim().toLowerCase();

    const filteredCategories = skillCategories.filter((category) => {
        if (!normalizedQuery) return true;

        return (
            category.category.toLowerCase().includes(normalizedQuery) ||
            category.description.toLowerCase().includes(normalizedQuery) ||
            category.skills.some((skill) => {
                const company = skill.company?.toLowerCase() ?? "";
                return skill.name.toLowerCase().includes(normalizedQuery) || company.includes(normalizedQuery);
            })
        );
    });

    return (
        <>
            <Seo
                title={`${profileDetails.name} | Skills`}
                description="Technical skills page for Sai Ram Maruri covering GenAI, agent systems, cloud platforms, full-stack engineering, and production tooling."
                pageType="CollectionPage"
                keywords={[
                    "GenAI Skills",
                    "LLM Engineer Skills",
                    "AWS Skills",
                    "Full Stack Developer Skills",
                    "AI Agent Builder Skills",
                    "Sai Ram Maruri Skills",
                ]}
                breadcrumbs={[
                    { name: "Home", url: "/" },
                    { name: "Skills", url: "/skills" },
                ]}
            />

            <div className="flex flex-col gap-6">
                <section>
                    <div className="relative overflow-hidden rounded-[2.8rem] bg-[linear-gradient(180deg,#fbf8f1_0%,#f4eee1_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(61,52,36,0.05)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                        <div className="pointer-events-none absolute left-[8%] top-10 h-40 w-40 rounded-full bg-[#dce6b8]/45 blur-3xl" />
                        <div className="pointer-events-none absolute right-[10%] top-24 h-40 w-40 rounded-full bg-[#e6dbc2]/65 blur-3xl" />

                        <p className="relative text-sm font-semibold uppercase tracking-[0.24em] text-[#798255]">Skills</p>

                        <div className="relative mt-6 max-w-[1100px]">
                            <h1 className="portfolio-sans text-[clamp(4rem,10vw,8rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#11100c]">
                                Capability stack.{" "}
                                <span className="bg-[linear-gradient(180deg,#72873a_0%,#5a6f1f_100%)] bg-clip-text text-transparent">
                                    Built for shipping.
                                </span>
                            </h1>
                            <p className="mt-8 max-w-[46ch] text-[clamp(1.12rem,1.9vw,1.55rem)] leading-[1.6] text-[#6f695c]">
                                This page maps the actual tools, frameworks, and platforms I use to build production-grade
                                AI systems, full-stack products, and deployable cloud workflows.
                            </p>
                        </div>

                        <div className="relative mt-10 grid gap-5 md:grid-cols-3">
                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-7 shadow-[0_18px_50px_rgba(61,52,36,0.05)]">
                                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">Skill Categories</p>
                                <p className="mt-4 text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#11100c]">
                                    {skillCategories.length}
                                </p>
                                <p className="mt-4 text-lg leading-8 text-[#6f695c]">A structured mix of GenAI, cloud, vector search, infra, and full-stack delivery.</p>
                            </article>

                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-7 shadow-[0_18px_50px_rgba(61,52,36,0.05)]">
                                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">Total Tools</p>
                                <p className="mt-4 text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#11100c]">
                                    {totalSkills}+
                                </p>
                                <p className="mt-4 text-lg leading-8 text-[#6f695c]">Models, frameworks, platforms, and engineering tools I work with regularly.</p>
                            </article>

                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-7 shadow-[0_18px_50px_rgba(61,52,36,0.05)]">
                                <p className="text-[0.82rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">Advanced Depth</p>
                                <p className="mt-4 text-[clamp(2.6rem,5vw,3.6rem)] font-semibold leading-none tracking-[-0.06em] text-[#11100c]">
                                    {advancedSkills}+
                                </p>
                                <p className="mt-4 text-lg leading-8 text-[#6f695c]">The strongest part of my stack, used across shipped projects and production workflows.</p>
                            </article>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-6 shadow-[0_24px_70px_rgba(61,52,36,0.06)] sm:px-8">
                        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                            <article>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Core Toolkit</p>
                                <h2 className="portfolio-sans mt-3 text-[clamp(2rem,3vw,3.2rem)] font-semibold tracking-[-0.05em] text-[#11100c]">
                                    The tools behind my day-to-day build process.
                                </h2>
                                <p className="mt-5 max-w-[46ch] text-lg leading-8 text-[#6f695c]">
                                    From LLM orchestration to deployment and product delivery, these are the tools I lean on most when building real systems.
                                </p>

                                <div className="mt-7 flex flex-wrap gap-3">
                                    {highlightedTools.map((skill) => (
                                        <a
                                            key={skill.name}
                                            href={skill.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-full border border-[#d9d2c2] bg-[#fbfaf6] px-4 py-2 text-sm font-semibold text-[#4d473b] shadow-[0_8px_18px_rgba(91,83,64,0.06)]"
                                        >
                                            {skill.name}
                                        </a>
                                    ))}
                                </div>
                            </article>

                            <article className="rounded-[2rem] border border-[#e3dccf] bg-[#f7f3eb] px-6 py-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Search Skills</p>
                                <div className="relative mt-5">
                                    <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8377]" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search tools, categories, or companies"
                                        className="w-full rounded-full border border-[#d9d2c2] bg-[#fffdf8] py-4 pl-12 pr-5 text-sm font-medium text-[#17140f] outline-none transition-colors placeholder:text-[#9a9388] focus:border-[#7b8d42]"
                                    />
                                </div>
                                <div className="mt-6 flex items-start gap-3 rounded-[1.4rem] bg-[#fffdf8] px-5 py-4">
                                    <Cpu className="mt-0.5 h-5 w-5 text-[#5d7414]" />
                                    <p className="text-sm leading-7 text-[#6f695c]">
                                        Search by model, framework, platform, or company name. The results below are powered directly by your real skills dataset.
                                    </p>
                                </div>
                            </article>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="grid gap-6 md:grid-cols-2">
                        {filteredCategories.map((category) => {
                            const Icon = iconMap[category.iconName as keyof typeof iconMap] ?? Brain;
                            const advancedCount = category.skills.filter((skill) => skill.level === "Advanced").length;

                            return (
                                <article
                                    key={category.category}
                                    className="group flex h-full flex-col rounded-[2.2rem] border border-[#e3dccf] bg-[#fffdf8] px-7 py-7 shadow-[0_20px_60px_rgba(61,52,36,0.05)] transition-transform duration-200 hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-[1.1rem] bg-[#f4efe4] text-[#5d7414]">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <span className="rounded-full bg-[#eef2df] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#63772c]">
                                            {advancedCount} advanced
                                        </span>
                                    </div>

                                    <h3 className="portfolio-serif mt-6 text-[2rem] leading-[1.02] tracking-[-0.04em] text-[#17150f]">
                                        {category.category}
                                    </h3>
                                    <p className="mt-4 text-base leading-8 text-[#686154]">{category.description}</p>

                                    <div className="mt-7 flex flex-wrap gap-3">
                                        {category.skills.map((skill) => (
                                            skill.url ? (
                                                <a
                                                    key={skill.name}
                                                    href={skill.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="rounded-full border border-[#d7d0c4] bg-[#fbfaf6] px-4 py-2 text-sm font-semibold text-[#4d473b]"
                                                >
                                                    {skill.name}
                                                </a>
                                            ) : (
                                                <span
                                                    key={skill.name}
                                                    className="rounded-full border border-[#d7d0c4] bg-[#fbfaf6] px-4 py-2 text-sm font-semibold text-[#4d473b]"
                                                >
                                                    {skill.name}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {filteredCategories.length === 0 && (
                        <div className="mt-8 rounded-[2rem] border border-dashed border-[#d9d2c2] px-6 py-12 text-center text-[#7b7467]">
                            No skills matched that search yet. Try a different tool, category, or company keyword.
                        </div>
                    )}
                </section>

                <section>
                    <div className="rounded-[2.2rem] border border-[#e3dccf] bg-[linear-gradient(180deg,#fbf8f1_0%,#f3eee3_100%)] px-8 py-10 shadow-[0_20px_60px_rgba(61,52,36,0.05)]">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#798255]">Next Step</p>
                                <h2 className="portfolio-serif mt-3 text-[clamp(2.4rem,4vw,4rem)] leading-[1.02] tracking-[-0.05em] text-[#11100c]">
                                    Want to see these skills applied?
                                </h2>
                                <p className="mt-5 max-w-[40ch] text-lg leading-8 text-[#6f695c]">
                                    The projects page shows how this stack comes together in shipped AI products, tools, and full systems.
                                </p>
                            </div>

                            <Link
                                to="/projects"
                                className="inline-flex items-center gap-2 rounded-full bg-[#5d7414] px-7 py-4 text-base font-semibold text-white"
                            >
                                See Projects
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default SkillsPage;
