import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { skillCategories } from "../skills/skillsData";
import BentoCard from "./BentoCard";

const colorClasses: Record<string, { bg: string; text: string; gradient: string; ring: string; pill: string }> = {
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", gradient: "from-indigo-500 to-indigo-600", ring: "ring-indigo-100", pill: "bg-indigo-50 text-indigo-600 border-indigo-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", gradient: "from-blue-500 to-blue-600", ring: "ring-blue-100", pill: "bg-blue-50 text-blue-600 border-blue-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-600", gradient: "from-amber-500 to-amber-600", ring: "ring-amber-100", pill: "bg-amber-50 text-amber-600 border-amber-100" },
    sky: { bg: "bg-sky-50", text: "text-sky-600", gradient: "from-sky-500 to-sky-600", ring: "ring-sky-100", pill: "bg-sky-50 text-sky-600 border-sky-100" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", gradient: "from-rose-500 to-rose-600", ring: "ring-rose-100", pill: "bg-rose-50 text-rose-600 border-rose-100" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", gradient: "from-emerald-500 to-emerald-600", ring: "ring-emerald-100", pill: "bg-emerald-50 text-emerald-600 border-emerald-100" },
};

const SkillsPreview = () => {
    return (
        <BentoCard className="col-span-12 md:col-span-9" ghostChar="S" delay={450}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Skills Matrix</h3>
                <Link
                    to="/skills"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 tracking-wide transition-colors"
                >
                    Explore Full <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="flex flex-col h-full justify-between">
                {skillCategories.map((cat, i) => {
                    const colors = colorClasses[cat.color] || colorClasses.blue;


                    // Group skills by company
                    const groupedSkills: Record<string, typeof cat.skills> = {};
                    const noCompanySkills: typeof cat.skills = [];

                    cat.skills.forEach(skill => {
                        if (skill.company) {
                            if (!groupedSkills[skill.company]) groupedSkills[skill.company] = [];
                            groupedSkills[skill.company].push(skill);
                        } else {
                            noCompanySkills.push(skill);
                        }
                    });

                    return (
                        <Link
                            key={i}
                            to="/skills"
                            className="group/cat flex flex-col sm:flex-row sm:items-start gap-4 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-all px-2 -mx-2 rounded-2xl"
                        >
                            {/* Header / Left Side */}
                            <div className="sm:w-48 shrink-0 pt-1">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h4 className="text-base font-medium text-gray-800 tracking-tight">{cat.category}</h4>
                                    <ExternalLink className="w-3 h-3 text-gray-300 opacity-0 group-hover/cat:opacity-100 transition-opacity" />
                                </div>
                            </div>

                            {/* Skill groups */}
                            <div className="flex flex-wrap gap-x-6 gap-y-2 flex-1 items-center">
                                {/* Company Groups */}
                                {Object.entries(groupedSkills).map(([company, skills]) => (
                                    <div key={company} className="flex items-center gap-2">
                                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{company}</span>
                                        <div className="flex flex-wrap gap-1">
                                            {skills.map((s, j) => (
                                                <span
                                                    key={j}
                                                    className={`px-2 py-0.5 rounded text-xs font-semibold border ${colors.pill}`}
                                                >
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                {/* No Company / Misc Skills */}
                                {noCompanySkills.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        {Object.keys(groupedSkills).length > 0 && (
                                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Other</span>
                                        )}
                                        <div className="flex flex-wrap gap-1">
                                            {noCompanySkills.map((s, j) => (
                                                <span
                                                    key={j}
                                                    className={`px-2 py-0.5 rounded text-xs font-semibold border ${colors.pill}`}
                                                >
                                                    {s.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </BentoCard>
    );
};

export default SkillsPreview;
