import {
    Send,
    Zap,
    Code2,
    Trophy,
    Globe,
    Search,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import avatar from './assets/avatar.webp';

const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/projects?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="home-container relative min-h-full flex flex-col items-center py-12 px-4">
            <Helmet>
                <title>Sai Ram Maruri | GenAI Pioneer & Full Stack Engineer</title>
                <meta name="description" content="Portfolio of Sai Ram Maruri - GenAI Pioneer specializing in autonomous systems, LLM agents, and full-stack engineering. Transforming complexity into intelligent solutions." />
            </Helmet>

            {/* Profile Avatar - Floating Clean */}
            <div className="mb-10 relative group">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full">
                    <img
                        src={avatar}
                        alt="Sai Ram Maruri"
                        className="w-full h-full rounded-full object-cover shadow-2xl"
                        fetchPriority="high"
                        width="192"
                        height="192"
                    />
                </div>
            </div>

            {/* Main Headline */}
            <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
                {/* Status Pill */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    System Online
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9]">
                    Architecting <br />
                    <span className="text-blue-600">
                        Intelligence.
                    </span>
                </h1>

                <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                    GenAI Engineer building scalable agentic workflows and <br /> next-generation cloud architectures.
                </p>
            </div>

            {/* Command Center Input - Clean Pill */}
            <div className="w-full max-w-2xl mx-auto mb-20 relative z-10">
                <form onSubmit={handleSearch} className="relative transition-all hover:scale-[1.01]">
                    <div className="relative flex items-center bg-white border border-gray-200 rounded-full p-2 pr-2 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-200/80 transition-shadow h-16">
                        <div className="pl-6 pr-4 text-gray-400">
                            <Search className="w-6 h-6" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Ask about my skills, projects, or experience..."
                            className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder:text-gray-400 font-medium text-lg h-full"
                        />
                    </div>
                </form>
            </div>

            {/* Stats - Clean Minimalist (No Boxes) */}
            <div className="w-full max-w-5xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    <a
                        href="https://leetcode.com/u/programmer3824/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-orange-50 text-orange-600 rounded-full mb-3 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">LeetCode</span>
                            <span className="block text-base font-bold text-gray-900">Guardian (2500+)</span>
                        </div>
                    </a>

                    <a
                        href="https://www.codechef.com/users/sairam2004"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-yellow-50 text-yellow-600 rounded-full mb-3 group-hover:bg-yellow-500 group-hover:text-white transition-colors">
                            <Code2 className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">CodeChef</span>
                            <span className="block text-base font-bold text-gray-900">3★ Rated (1600+)</span>
                        </div>
                    </a>

                    <a
                        href="https://leetcode.com/u/sairam3824"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-emerald-50 text-emerald-600 rounded-full mb-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Problem Solving</span>
                            <span className="block text-base font-bold text-gray-900">1000+ Solved</span>
                        </div>
                    </a>

                    <a
                        href="https://codolio.com/profile/sairam3824"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col items-center hover:scale-105 transition-transform cursor-pointer"
                    >
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-3 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Globe className="w-6 h-6" />
                        </div>
                        <div className="text-center">
                            <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Global Rank</span>
                            <span className="block text-base font-bold text-gray-900">Top 1%</span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Home;
