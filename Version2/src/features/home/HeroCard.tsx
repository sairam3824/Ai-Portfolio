import { useTypewriter } from "../../hooks/useTypewriter";
import avatar from "../../assets/avatar_optimized.jpg";
import BentoCard from "./BentoCard";

const HeroCard = () => {
    const title = useTypewriter({
        texts: [
            "GenAI Engineer",
            "Software Developer",
            "Cloud Architect",
            "AI Agent Builder",
            "Vibe Coder",
            "Competitive Programmer",
            "Full Stack Developer",
        ],
        speed: 80,
        deleteSpeed: 40,
        delayBetweenTexts: 2000,
    });

    return (
        <BentoCard className="col-span-12 md:col-span-8 row-span-2 justify-center !bg-gradient-to-br !from-white !to-blue-50/40" delay={0}>
            {/* Accent line */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/[0.07] text-blue-600 rounded-full text-[11px] font-semibold tracking-wide mb-6 w-fit">
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                </span>
                Available for Opportunities
            </div>

            <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8">
                <div className="flex-1">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-[0.95] mb-3">
                        Sairam{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                            Maruri.
                        </span>
                    </h1>

                    <div className="h-8 sm:h-9 mb-4">
                        <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-400 tracking-tight">
                            {title}
                            <span className="text-blue-400 animate-pulse ml-px">|</span>
                        </span>
                    </div>

                    <p className="text-[15px] sm:text-base text-gray-500 font-medium max-w-lg leading-relaxed">
                        Building scalable agentic workflows and next-generation cloud architectures. Transforming complexity into intelligent solutions.
                    </p>
                </div>

                <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-400/30 via-indigo-400/20 to-purple-400/30 blur-sm" />
                    <img
                        src={avatar}
                        alt="Sai Ram Maruri"
                        className="relative w-full h-full rounded-full object-cover shadow-lg ring-2 ring-white"
                        width="160"
                        height="160"
                        loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-[2.5px] border-white shadow-sm" />
                </div>
            </div>
        </BentoCard>
    );
};

export default HeroCard;
