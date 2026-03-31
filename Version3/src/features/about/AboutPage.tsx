import { Award, BookOpen, BrainCircuit, Calendar, Code2, GraduationCap, Layers3, Library, MapPin, Sparkles, Target } from "lucide-react";
import Seo from "@/shared/Seo";
import { profileDetails } from "@/data/siteMetadata";
import { codingProfilesData } from "@/features/coding-profiles/codingProfilesData";
import { projectsData } from "@/features/projects/projectsData";

const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");
const streakProfile = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");

const statCards = [
    {
        label: "Experience",
        value: "3+ Years",
        icon: Layers3,
        iconClassName: "text-[#63772c]",
    },
    {
        label: "Projects",
        value: `${projectsData.length}+`,
        icon: Sparkles,
        iconClassName: "text-[#8f6c32]",
    },
    {
        label: "Problems",
        value: streakProfile ? streakProfile.stats.replace(" problems solved", "") : "1000+",
        icon: Target,
        iconClassName: "text-[#4f7b57]",
    },
] as const;

const authorityItems = [
    {
        label: "LeetCode",
        detail: "Guardian",
        meta: leetCodeProfile ? leetCodeProfile.stats.split("•")[0].trim() : "2500+",
        href: profileDetails.socials.leetcodePrimary,
        accent: "bg-[#6b7f33]",
    },
    {
        label: "CodeChef",
        detail: "3 Star",
        meta: codeChefProfile ? codeChefProfile.stats.split("•")[1]?.trim() ?? "1600+" : "1600+",
        href: profileDetails.socials.codechef,
        accent: "bg-[#b17b3d]",
    },
    {
        label: "Contests",
        detail: "50+",
        meta: "Participated",
        href: profileDetails.socials.leetcodeSecondary,
        accent: "bg-[#5b7d4c]",
    },
] as const;

const coreTools = [
    "Cursor AI",
    "Claude Code",
    "Codex",
    "VS Code",
    "Kiro",
    "Surf",
    "Antigravity",
    "Rovo Dev",
] as const;

const educationItems = [
    {
        title: "Bachelor of Technology",
        major: "Computer Science",
        org: "Vellore Institute of Technology, AP",
        date: "2022 - 2026",
        place: "Amaravati, India",
        grade: "8.31 CGPA",
        icon: Library,
        featured: true,
        courses: ["Data Structures", "Algorithms", "Operating Systems", "System Design", "Deep Learning", "Computer Networks"],
    },
    {
        title: "Intermediate Education",
        major: "MPC",
        org: "Sri Chaitanya Junior College",
        date: "2020 - 2022",
        place: "Vijayawada, India",
        grade: "83.7%",
        icon: BookOpen,
        featured: false,
        courses: ["Mathematics", "Physics", "Chemistry"],
    },
    {
        title: "Secondary Education",
        major: "Schooling",
        org: "Sri Chaitanya High School",
        date: "2020",
        place: "Vijayawada, India",
        grade: "97.1%",
        icon: GraduationCap,
        featured: false,
        courses: ["Foundation", "General Sciences", "Mathematics"],
    },
] as const;

export const AboutPage = () => (
    <>
        <Seo
            title={`${profileDetails.name} | About`}
            description="Editorial about page highlighting Sai Ram Maruri's GenAI strengths, portfolio proof points, and core expertise."
            pageType="AboutPage"
            keywords={[
                "About Sai Ram Maruri",
                "GenAI Engineer India",
                "AI Engineer Portfolio",
                "LLM Engineer",
                "AWS AI Engineer",
                "Competitive Programmer India",
            ]}
            breadcrumbs={[
                { name: "Home", url: "/" },
                { name: "About", url: "/about" },
            ]}
        />

        <section className="pb-16">
            <div className="relative overflow-hidden rounded-[2.3rem] bg-[linear-gradient(180deg,#fbf8f1_0%,#f4eee1_100%)] px-5 py-7 shadow-[0_24px_80px_rgba(61,52,36,0.05)] sm:rounded-[2.8rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
                <div className="pointer-events-none absolute inset-x-[20%] top-16 h-44 rounded-full bg-[#dce6b8]/40 blur-3xl" />

                <p className="relative text-sm font-semibold uppercase tracking-[0.24em] text-[#798255]">About</p>

                <div className="relative mt-6 max-w-[1100px]">
                    <h1 className="portfolio-sans text-[clamp(4.2rem,10vw,8.4rem)] font-semibold leading-[0.9] tracking-[-0.08em] text-[#111827]">
                        GenAI{" "}
                        <span className="bg-[linear-gradient(180deg,#72873a_0%,#5a6f1f_100%)] bg-clip-text text-transparent">
                            Pioneer.
                        </span>
                    </h1>
                    <p className="mt-6 max-w-[20ch] text-[clamp(1.2rem,5vw,2.35rem)] font-medium leading-[1.32] tracking-[-0.04em] text-[#6b7280] sm:mt-8 sm:max-w-[17ch]">
                        I am {profileDetails.name} - engineering autonomous systems that solve complexity with surgical precision.
                    </p>
                </div>

                <div className="relative mt-10 grid gap-6 sm:mt-14 lg:grid-cols-[1.8fr_0.88fr]">
                    <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-6 shadow-[0_24px_70px_rgba(61,52,36,0.07)] sm:rounded-[2.2rem] sm:px-8 sm:py-9">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[linear-gradient(180deg,#738939_0%,#5d7221_100%)] text-white shadow-[0_14px_30px_rgba(93,114,33,0.22)]">
                                <Code2 className="h-6 w-6" />
                            </div>
                            <h2 className="portfolio-sans text-[clamp(2rem,3vw,3rem)] font-semibold italic tracking-[-0.05em] text-[#111827]">
                                Learn always. Build always.
                            </h2>
                        </div>

                        <div className="mt-8 max-w-[58ch] space-y-6 text-[clamp(1rem,1.6vw,1.45rem)] font-medium leading-[1.75] text-[#4b5563] sm:mt-10 sm:space-y-7 sm:leading-[1.8]">
                            <p>
                                With a foundation built on{" "}
                                <span className="font-semibold text-[#111827]">1,000+ solved algorithmic challenges</span>,
                                I&apos;ve transitioned from competitive programming to architecting production-grade GenAI systems.
                            </p>
                            <p>
                                I specialize in{" "}
                                <span className="font-semibold text-[#5d7414]">cloud-native AI pipelines</span> on AWS,
                                deploying agentic workflows, RAG systems, and LLM-powered applications that balance cost,
                                speed, and intelligence.
                            </p>
                            <p>
                                {profileDetails.summary}
                            </p>
                        </div>
                    </article>

                    <div className="grid gap-6">
                        {statCards.map((card) => (
                            <article
                                key={card.label}
                                className="flex items-center justify-between rounded-[1.6rem] border border-[#e3dccf] bg-[#f7f3eb] px-5 py-5 shadow-[0_18px_50px_rgba(61,52,36,0.05)] sm:rounded-[2rem] sm:px-8 sm:py-8"
                            >
                                <div>
                                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#978f81]">
                                        {card.label}
                                    </p>
                                    <p className="mt-2 text-[clamp(2rem,3vw,2.6rem)] font-semibold tracking-[-0.05em] text-[#111827]">
                                        {card.value}
                                    </p>
                                </div>
                                <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-[#fffdf8] shadow-[0_12px_30px_rgba(61,52,36,0.08)]">
                                    <card.icon className={`h-5 w-5 ${card.iconClassName}`} />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <div className="relative mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.7fr]">
                    <article className="rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-6 shadow-[0_24px_70px_rgba(61,52,36,0.07)] sm:rounded-[2.2rem] sm:px-8 sm:py-9">
                        <div className="flex items-center gap-4">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#5d7414]">Verified Authority</p>
                            <div className="h-px flex-1 bg-[#e7e0d3]" />
                        </div>

                        <div className="mt-8 space-y-7 sm:mt-10 sm:space-y-10">
                            {authorityItems.map((item) => (
                                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="flex gap-4 sm:gap-5">
                                    <div className={`mt-1 h-10 w-1.5 rounded-full ${item.accent}`} />
                                    <div>
                                        <p className="text-[1.7rem] font-semibold tracking-[-0.05em] text-[#111827] sm:text-[2rem]">{item.label}</p>
                                        <p className="mt-1 text-lg font-semibold text-[#4b5563] sm:text-xl">{item.detail}</p>
                                        <p className="mt-1 text-[0.84rem] font-semibold uppercase tracking-[0.16em] text-[#8a8377]">
                                            {item.meta}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </article>

                    <article className="relative overflow-hidden rounded-[2rem] border border-[#e3dccf] bg-[#fffdf8] px-5 py-6 shadow-[0_24px_70px_rgba(61,52,36,0.07)] sm:rounded-[2.2rem] sm:px-8 sm:py-9">
                        <div className="flex items-center gap-3">
                            <h2 className="portfolio-sans text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.05em] text-[#111827]">
                                Core Expertise
                            </h2>
                            <BrainCircuit className="h-6 w-6 text-[#5d7414]" />
                        </div>

                        <p className="mt-8 max-w-[48ch] text-[clamp(1.1rem,1.5vw,1.4rem)] font-medium leading-[1.75] text-[#6b7280]">
                            Designing LLM-powered applications, RAG pipelines, vector-database search systems, and agentic workflows for SaaS-grade optimization.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3 sm:mt-10 sm:gap-4">
                            {coreTools.map((tool) => (
                                <div
                                    key={tool}
                                    className="inline-flex items-center gap-2.5 rounded-full border border-[#e3dccf] bg-[#fffdf8] px-4 py-2.5 text-sm font-semibold text-[#374151] shadow-[0_8px_18px_rgba(91,83,64,0.08)] sm:gap-3 sm:px-5 sm:py-3 sm:text-base"
                                >
                                    <span className="text-[#5d7414]">↘</span>
                                    <span>{tool}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pointer-events-none absolute bottom-1 right-8 text-[12rem] font-semibold leading-none tracking-[-0.12em] text-[#f2ede1]">
                            A
                        </div>
                    </article>
                </div>

                <div className="relative mt-8 border-t border-[#e6dece] pt-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#5d7414]">Education</p>
                            <h2 className="portfolio-sans mt-3 text-[clamp(2rem,3vw,3rem)] font-semibold tracking-[-0.05em] text-[#111827]">
                                Academic foundation behind the build.
                            </h2>
                        </div>
                        <p className="max-w-[34ch] text-base leading-7 text-[#6b7280]">
                            The coursework and academic environment that shaped my systems thinking, algorithmic depth, and engineering discipline.
                        </p>
                    </div>

                    <div className="mt-8 space-y-6">
                        {educationItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    key={item.org}
                                    className="border-b border-[#e6dece] pb-6 last:border-b-0 last:pb-0"
                                >
                                    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                                        <div className="flex items-start gap-3 sm:gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#eef2df] text-[#5d7414]">
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#8a8377]">
                                                    {item.title}
                                                </p>
                                                <h3 className="mt-2 text-[1.35rem] font-semibold tracking-[-0.04em] text-[#17150f] sm:text-[1.65rem]">
                                                    {item.org}
                                                </h3>
                                                <p className="mt-2 text-base font-medium text-[#5a5549]">
                                                    {item.major}
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-[#7a7468]">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-4 w-4 text-[#5d7414]" />
                                                    <span>{item.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-[#5d7414]" />
                                                    <span>{item.place}</span>
                                                </div>
                                                <div className="inline-flex items-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-4 py-2 text-sm font-semibold text-[#5d7414]">
                                                    <Award className="h-4 w-4" />
                                                    {item.grade}
                                                </div>
                                            </div>

                                            <div className="mt-5 flex flex-wrap gap-2">
                                                {item.courses.map((course) => (
                                                    <span
                                                        key={course}
                                                        className="rounded-full border border-[#d7d0c4] bg-white px-3 py-1 text-xs font-medium text-[#5f584a]"
                                                    >
                                                        {course}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    </>
);

export default AboutPage;
