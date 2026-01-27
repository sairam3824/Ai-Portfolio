
import { ArrowRight } from "lucide-react";

export const VersionSwitch = () => {
    return (
        <a
            href="/"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium group animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
            <span>Switch to New Version</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
    );
};
