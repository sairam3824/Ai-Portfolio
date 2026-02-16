
import { projectsData } from "../projects/projectsData";
import { codingProfilesData } from "../coding-profiles/codingProfilesData";
import { skillCategories } from "../skills/skillsData";
import { Code2, Zap, Layers, Trophy, Star } from "lucide-react";

export const StatsSection = () => {
    // Calculate stats
    const totalProjects = projectsData.length;
    // Calculate total skills across all categories
    const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

    // Find LeetCode stats
    const leetCodeProfile = codingProfilesData.find(p => p.label === "LeetCode");
    const leetCodeRating = leetCodeProfile ? leetCodeProfile.stats.split("•")[0].trim() : "2500+";

    // Find solved problems count (using the Streak profile which has "1000+ problems solved")
    const streakProfile = codingProfilesData.find(p => p.label === "LeetCode Streak");
    const totalProblems = streakProfile ? streakProfile.stats.replace(" problems solved", "") : "1000+";

    const stats = [
        {
            label: "LeetCode Rating",
            value: leetCodeRating,
            icon: Trophy,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            label: "DSA Problems Solved",
            value: totalProblems,
            icon: Code2,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            label: "Projects Built",
            value: `${totalProjects}+`,
            icon: Layers,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            label: "CodeChef Rating",
            value: "3 Star",
            icon: Star,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            label: "Skills Mastered",
            value: `${totalSkills}+`,
            icon: Zap,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <section className="py-2 md:py-4 animate-fade-in-up stagger-1">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 md:gap-y-0">
                {stats.map((stat) => (
                    <div
                        key={stat.label}
                        className="group flex flex-col items-center justify-center p-2 last:col-span-2 last:md:col-span-1 last:justify-self-center"
                    >
                        <div className={`p-2.5 rounded-full ${stat.bg} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <span className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1">
                            {stat.value}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-500 text-center">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};
