import { Trophy } from "lucide-react";
import BentoCard from "./BentoCard";

const achievements = [
    "LeetCode Guardian (Top 1%)",
    "CodeChef 3-Star (1600+ Rating)",
    "Solved 1000+ Algorithmic Problems",
    "Can built SaaS Product in < 8 Hours using Vibe Coding",
];

const AchievementsPreview = () => {
    return (
        <BentoCard className="w-full" ghostChar="A" delay={550}>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-2xl bg-amber-50 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Achievements</h3>
            </div>

            <div className="flex flex-col gap-2">
                {achievements.map((achievement, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-2xl bg-amber-50/50 border border-amber-100/50 hover:bg-amber-50 transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span className="text-sm font-medium text-gray-700 leading-snug">{achievement}</span>
                    </div>
                ))}
            </div>
        </BentoCard>
    );
};

export default AchievementsPreview;
