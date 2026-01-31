import { ReactNode } from "react";
import BentoCard from "./BentoCard";

interface StatCardProps {
    label: string;
    value: string;
    icon: ReactNode;
    color: string;
    href: string;
    ghostChar: string;
    delay?: number;
}

const StatCard = ({ label, value, icon, color, href, ghostChar, delay = 0 }: StatCardProps) => {
    const colorMap: Record<string, { bg: string; text: string; border: string; hoverBg: string }> = {
        orange: { bg: "bg-orange-50", text: "text-orange-500", border: "border-orange-100", hoverBg: "group-hover:bg-orange-500" },
        yellow: { bg: "bg-yellow-50", text: "text-yellow-500", border: "border-yellow-100", hoverBg: "group-hover:bg-yellow-500" },
        emerald: { bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-100", hoverBg: "group-hover:bg-emerald-500" },
        blue: { bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-100", hoverBg: "group-hover:bg-blue-500" },
    };

    const colors = colorMap[color] || colorMap.blue;

    return (
        <a href={href} target={href.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">
            <BentoCard className="col-span-6 md:col-span-3 cursor-pointer h-full" ghostChar={ghostChar} delay={delay}>
                <div className={`w-9 h-9 rounded-lg ${colors.bg} ${colors.text} ${colors.hoverBg} group-hover:text-white flex items-center justify-center mb-3 transition-all duration-300 border ${colors.border}`}>
                    {icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5 block">{label}</span>
                <span className="text-sm sm:text-base font-bold text-gray-900 tracking-tight">{value}</span>
            </BentoCard>
        </a>
    );
};

export default StatCard;
