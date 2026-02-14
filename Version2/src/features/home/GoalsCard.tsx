import { Rocket, BookOpen, Code2, Compass, Bot } from "lucide-react";
import BentoCard from "./BentoCard";

const currentlyItems = [
    {
        icon: Rocket,
        label: "Building",
        value: "AI-Powered SaaS Products",
        containerBg: "bg-emerald-50/40",
        containerBorder: "border-emerald-100/50",
        containerHover: "hover:bg-emerald-50/70",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        labelColor: "text-emerald-600",
    },
    {
        icon: Code2,
        label: "Solving",
        value: "1000+ DSA Problems & Counting",
        containerBg: "bg-amber-50/40",
        containerBorder: "border-amber-100/50",
        containerHover: "hover:bg-amber-50/70",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        labelColor: "text-amber-600",
    },
    {
        icon: Bot,
        label: "Crafting",
        value: "A2A Agent Cards",
        containerBg: "bg-rose-50/40",
        containerBorder: "border-rose-100/50",
        containerHover: "hover:bg-rose-50/70",
        iconBg: "bg-rose-50",
        iconColor: "text-rose-500",
        labelColor: "text-rose-600",
    },
    {
        icon: Compass,
        label: "Exploring",
        value: "Agentic Workflows",
        containerBg: "bg-violet-50/40",
        containerBorder: "border-violet-100/50",
        containerHover: "hover:bg-violet-50/70",
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        labelColor: "text-violet-600",
    },
    {
        icon: BookOpen,
        label: "Learning",
        value: "Reinforcement Learning & RLHF",
        containerBg: "bg-blue-50/40",
        containerBorder: "border-blue-100/50",
        containerHover: "hover:bg-blue-50/70",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        labelColor: "text-blue-600",
    },
];

const GoalsCard = ({ className = "" }: { className?: string }) => {
    return (
        <BentoCard className={`col-span-12 ${className}`} delay={700}>
            <div className="flex flex-col h-full">
                <h3 className="text-xl font-bold text-gray-800 tracking-tight mb-3">
                    Right Now
                </h3>
                <div className="flex flex-col gap-2 flex-1">
                    {currentlyItems.map((item, i) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={i}
                                className={`flex items-center gap-2.5 p-2 rounded-2xl ${item.containerBg} border ${item.containerBorder} ${item.containerHover} transition-colors`}
                            >
                                <div
                                    className={`w-7 h-7 rounded-2xl ${item.iconBg} flex items-center justify-center shrink-0`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                                </div>
                                <div className="min-w-0">
                                    <span
                                        className={`text-[9px] font-bold uppercase tracking-widest ${item.labelColor}`}
                                    >
                                        {item.label}
                                    </span>
                                    <p className="text-[13px] font-medium text-gray-700 truncate">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </BentoCard>
    );
};

export default GoalsCard;
