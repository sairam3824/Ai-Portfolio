import { Link } from 'react-router-dom';
import { Ghost, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="home-container relative min-h-full flex flex-col items-center justify-center p-4">
            {/* Ambient Background Elements — hidden on mobile for GPU perf */}
            <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />

            <div className="text-center space-y-8 animate-fade-in relative z-10 max-w-lg mx-auto">
                <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-100 blur-3xl opacity-20" />
                    <Ghost className="w-32 h-32 md:w-40 md:h-40 text-blue-100 mx-auto animate-bounce-slow opacity-80" strokeWidth={0.5} />
                    <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl sm:text-9xl font-black text-gray-900/5 select-none">
                        404
                    </h1>
                </div>

                <div className="space-y-4">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 text-[10px] font-black uppercase tracking-widest">
                        Protocol Error
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                        Page Not Found
                    </h2>
                    <p className="text-gray-500 text-lg font-medium leading-relaxed">
                        The requested digital artifact has been moved, deleted, or never existed in this dimension.
                    </p>
                </div>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-gray-200/50 hover:shadow-blue-500/30 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Return to Base
                </Link>
            </div>

            <div className="absolute bottom-10 left-0 right-0 text-center">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">
                    System Malfunction • 0x404
                </p>
            </div>
        </div>
    );
};

export default NotFoundPage;
