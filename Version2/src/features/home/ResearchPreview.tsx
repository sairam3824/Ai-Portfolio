import { Microscope } from "lucide-react";
import BentoCard from "./BentoCard";

const researchInterests = [
    "Reinforcement Learning",
    "Scaling Laws",
    "Code Generation",
    "AI Safety & Alignment",
    "Interpretability",
];

const ResearchPreview = () => {
    return (
        <BentoCard className="w-full" ghostChar="R" delay={500}>
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                    <Microscope className="w-4 h-4 text-violet-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Research</h3>
            </div>

            <div className="flex flex-col gap-2">
                {researchInterests.map((interest, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 p-2 rounded-xl bg-violet-50/50 border border-violet-100/50 hover:bg-violet-50 transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                        <span className="text-sm font-medium text-gray-700 leading-snug">{interest}</span>
                    </div>
                ))}
            </div>
        </BentoCard>
    );
};

export default ResearchPreview;
