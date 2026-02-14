import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    ghostChar?: string;
    delay?: number;
}

const BentoCard = ({ children, className = "", ghostChar, delay = 0 }: BentoCardProps) => {
    return (
        <div
            className={`group relative flex flex-col p-5 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-3 hover:border-gray-200 transition-all duration-500 overflow-hidden animate-fade-in-up ${className}`}
            style={{ animationDelay: `${delay}ms` }}
        >
            {children}
            {ghostChar && (
                <div className="absolute -bottom-3 -right-1 text-[90px] font-black text-gray-800/[0.015] select-none pointer-events-none group-hover:text-gray-800/[0.03] transition-all duration-700">
                    {ghostChar}
                </div>
            )}
        </div>
    );
};

export default BentoCard;
