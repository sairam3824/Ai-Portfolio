import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { codingProfilesData } from "../coding-profiles/codingProfilesData";
import BentoCard from "./BentoCard";

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-100" },
    cyan: { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
    rose: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
    slate: { bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-100" },
};

const CodingPreview = () => {
    const top3 = codingProfilesData.slice(0, 3);

    return (
        <BentoCard className="col-span-12 sm:col-span-6 md:col-span-3 row-span-2 flex flex-col" ghostChar="C" delay={500}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Coding DNA</h3>
                <Link
                    to="/coding-profiles"
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 tracking-wide transition-colors"
                >
                    View All <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            </div>

            <div className="flex flex-col gap-4 justify-between flex-1">
                {top3.map((profile, i) => {
                    const colors = colorMap[profile.color] || colorMap.slate;
                    return (
                        <a
                            key={i}
                            href={profile.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50/80 hover:bg-white border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group/item"
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-lg font-bold ${colors.bg} ${colors.text} border ${colors.border}`}>
                                {profile.label[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-[15px] font-bold text-gray-800 mb-0.5">{profile.label}</h4>
                                <span className="text-xs text-gray-500 font-medium block truncate">{profile.stats}</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-300 group-hover/item:text-indigo-500 transition-colors shrink-0" />
                        </a>
                    );
                })}
            </div>
        </BentoCard>
    );
};

export default CodingPreview;
