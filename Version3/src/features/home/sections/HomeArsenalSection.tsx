import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { skillCategories } from "@/features/skills/skillsData";
import { HomeSectionHeader } from "@/features/home/components/HomeSectionHeader";

const arsenalGroups = skillCategories
    .filter((category) => ["AI Coding", "GenAI & LLMs", "Cloud & DevOps"].includes(category.category))
    .map((category) => ({
        label:
            category.category === "AI Coding"
                ? "AI Coding Assistants"
                : category.category === "GenAI & LLMs"
                  ? "GenAI & Models"
                  : "Cloud & Infra",
        tools: category.skills.slice(0, 8).map((skill) => ({ name: skill.name })),
        chip:
            category.category === "AI Coding"
                ? "bg-[#d7f2df] text-[#1f7a4f]"
                : category.category === "GenAI & LLMs"
                  ? "bg-[#dee2ff] text-[#4c57d6]"
                  : "bg-[#dce8fb] text-[#3561bf]",
    }));

export default function HomeArsenalSection() {
    return (
        <div className="mt-24 border-t border-[#e1dbcf] pt-12">
            <HomeSectionHeader
                num="02"
                title={<>The Arsenal<span className="text-[#4c74ff]">.</span></>}
                subtitle="The tools, frameworks, and technologies I use to build."
            />

            <div className="mt-12">
                <p className="text-[1.4rem] font-semibold tracking-[-0.04em] text-[#243042]">Vibe Coder Toolbox</p>
                <p className="mt-1.5 text-[0.92rem] text-[#8a8377]">Tools I ship with daily</p>

                <div className="mt-10 grid gap-x-10 gap-y-12 lg:grid-cols-3">
                    {arsenalGroups.map((group) => (
                        <div key={group.label}>
                            <p className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[#9aa3b4]">{group.label}</p>
                            <div className="flex flex-wrap gap-2.5">
                                {group.tools.map((tool) => (
                                    <span key={`${group.label}-${tool.name}`} className={`rounded-full px-3.5 py-1.5 text-[0.78rem] font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${group.chip}`}>
                                        {tool.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10">
                <Link to="/skills" className="inline-flex items-center gap-2 text-[1.05rem] font-semibold text-[#17150f] transition-colors hover:text-[#5d7414]">
                    Explore Full Arsenal <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
