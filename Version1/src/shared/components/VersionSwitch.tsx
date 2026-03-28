
import { ArrowRight } from "lucide-react";

export const VersionSwitch = () => {
    return (
        <a
            href="/"
            className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all duration-700 hover:scale-105 hover:shadow-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:px-6 sm:text-base group animate-in fade-in slide-in-from-bottom-4"
        >
            <span>Switch to Version 2</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
    );
};
