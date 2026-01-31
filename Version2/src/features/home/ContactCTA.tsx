import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const ContactCTA = () => {
    return (
        <div
            className="col-span-12 group relative flex flex-col justify-center items-center p-6 md:p-8 rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-500 overflow-hidden animate-fade-in-up text-center"
            style={{ animationDelay: "750ms" }}
        >
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            <h3 className="relative text-xl font-black tracking-tight mb-2">Let's Build Together</h3>
            <p className="relative text-sm text-gray-400 mb-6 max-w-xs leading-relaxed">
                Open to collaborations, research, and innovative AI projects.
            </p>

            <div className="relative flex flex-col sm:flex-row gap-2.5 w-full max-w-xs">
                <Link
                    to="/contact"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white text-gray-900 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-blue-50 transition-colors shadow-sm"
                >
                    Contact <ArrowRight className="w-3 h-3" />
                </Link>
                <Link
                    to="/resume"
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-white/[0.08] text-white/90 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-white/[0.15] transition-colors border border-white/[0.08]"
                >
                    <FileText className="w-3 h-3" />
                    Resume
                </Link>
            </div>

            {/* Ambient glows */}
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-blue-500/20 rounded-full blur-[50px] pointer-events-none" />
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />
        </div>
    );
};

export default ContactCTA;
