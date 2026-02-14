import { ArrowRight, Award, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { certifications } from "../certifications/certificationsData";
import BentoCard from "./BentoCard";

const CertsPreview = () => {
    const top4 = certifications.slice(0, 4);

    return (
        <BentoCard className="col-span-12" ghostChar="V" delay={550}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Certifications</h3>
                <Link
                    to="/certifications"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-cyan-600 hover:text-cyan-700 tracking-wide transition-colors"
                >
                    All {certifications.length} <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="flex flex-col gap-2">
                {top4.map((cert, i) => (
                    <a
                        key={i}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50/60 hover:bg-gray-100/70 border border-transparent hover:border-gray-200/60 transition-all duration-300 group/item"
                    >
                        <div className="w-7 h-7 rounded-2xl bg-cyan-50 text-cyan-500 flex items-center justify-center shrink-0 border border-cyan-100">
                            <Award className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[15px] font-medium text-gray-700 truncate flex-1">{cert.title}</span>
                        <ExternalLink className="w-3 h-3 text-gray-300 group-hover/item:text-gray-500 transition-colors shrink-0" />
                    </a>
                ))}
            </div>
        </BentoCard>
    );
};

export default CertsPreview;
