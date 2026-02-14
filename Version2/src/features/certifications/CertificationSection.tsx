import { memo } from "react";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "./certificationsData";

const CertificationItem = memo(({ cert }: { cert: { title: string; link: string } }) => (
    <li
        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white/40 
               backdrop-blur-md border border-white/40 rounded-2xl 
               px-6 sm:px-12 py-5 transition-all duration-300 
               hover:bg-white/60 hover:border-blue-400/40 hover:scale-[1.01]
               shadow-sm gap-4 sm:gap-8"
        style={{ contentVisibility: 'auto' }}
    >
        <div className="flex items-center gap-4 sm:gap-6 flex-1 w-full">
            <Award className="w-6 h-6 text-blue-500 shrink-0" />
            <span className="text-base md:text-lg font-medium text-gray-800 leading-tight">
                {cert.title}
            </span>
        </div>

        <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm md:text-base text-blue-600 font-bold uppercase tracking-widest
                 opacity-90 hover:opacity-100 transition-opacity hover:text-blue-700 shrink-0 self-end sm:self-center"
        >
            View <ExternalLink className="w-4 h-4" />
        </a>
    </li>
));

CertificationItem.displayName = 'CertificationItem';

export const CertificationSection = () => {
    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="hidden md:block absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-16 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Verified Authority</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Credential <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Vault.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    Industry-recognized certifications validating technical mastery across cloud architectures and AI systems.
                </p>
            </header>

            <ul className="max-w-5xl mx-auto space-y-4 px-2 pb-12 animate-fade-in relative z-10">
                {certifications.map((cert, index) => (
                    <CertificationItem key={index} cert={cert} />
                ))}
            </ul>

            {/* Journey Footer */}
            <footer className="mt-12 text-center pb-8 animate-fade-in text-gray-400">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    Verified Expertise • Lifelong Learning
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default CertificationSection;
