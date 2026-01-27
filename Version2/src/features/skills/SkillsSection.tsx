import {
    Code2,
    Brain,
    Database,
    Cloud,
    Terminal,
    Zap,
    ExternalLink,
    Search,
    Cpu,
    Target
} from "lucide-react";
import { useState, useMemo } from "react";

export const SkillsSection = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const skillCategories = [
        {
            category: "GenAI & LLMs",
            icon: <Brain className="w-5 h-5" />,
            color: "indigo",
            description: "Architecting intelligent systems with cutting-edge models.",
            skills: [
                { name: "OpenAI API", level: "Advanced" },
                { name: "Claude API", level: "Advanced" },
                { name: "Gemini API", level: "Advanced" },
                { name: "Hugging Face", level: "Advanced" },
                { name: "LangChain", level: "Advanced" },
                { name: "RAG Systems", level: "Advanced" },
                { name: "Prompt Engineering", level: "Advanced" },
                { name: "Model Fine-tuning", level: "Intermediate" },
                { name: "AI Agent Development", level: "Advanced" },
                { name: "Vector Databases", level: "Intermediate" },
            ],
        },
        {
            category: "Programming Core",
            icon: <Code2 className="w-5 h-5" />,
            color: "blue",
            description: "Building robust, scalable applications with precision.",
            skills: [
                { name: "Java", level: "Advanced" },
                { name: "C++", level: "Advanced" },
                { name: "Python", level: "Advanced" },
                { name: "DataStructures & Algorithms", level: "Advanced" },
                { name: "Competitive Programming", level: "Advanced" },
                { name: "Problem Solving", level: "Advanced" },
                { name: "Object Oriented Programming", level: "Advanced" },
            ],
        },
        {
            category: "Intelligence Stack",
            icon: <Zap className="w-5 h-5" />,
            color: "amber",
            description: "Developing predictive models and computer vision pipelines.",
            skills: [
                { name: "TensorFlow", level: "Intermediate" },
                { name: "PyTorch", level: "Intermediate" },
                { name: "Scikit-learn", level: "Intermediate" },
                { name: "Computer Vision", level: "Advanced" },
                { name: "NLP", level: "Advanced" },
                { name: "Deep Learning", level: "Advanced" },
                { name: "Machine Learning", level: "Advanced" },
                { name: "Reinforcement Learning", level: "Beginner" },
            ],
        },
        {
            category: "Cloud & Dev",
            icon: <Cloud className="w-5 h-5" />,
            color: "sky",
            description: "Deploying and scaling applications on modern infrastructure.",
            skills: [
                { name: "AWS", level: "Intermediate" },
                { name: "Azure", level: "Intermediate" },
                { name: "n8n", level: "Intermediate" },
                { name: "Docker", level: "Beginner" },
                { name: "Git", level: "Advanced" },
                { name: "Linux", level: "Intermediate" },
            ],
        },
        {
            category: "App Development",
            icon: <Terminal className="w-5 h-5" />,
            color: "rose",
            description: "Creating full-stack functional applications.",
            skills: [
                { name: "Django", level: "Intermediate" },
                { name: "Node.js", level: "Intermediate" },
                { name: "React.js", level: "Intermediate" },
                { name: "MySQL", level: "Intermediate" },
                { name: "MongoDB", level: "Intermediate" },
                { name: "Streamlit", level: "Advanced" },
            ],
        },
        {
            category: "Core Computer Science",
            icon: <Cpu className="w-5 h-5" />,
            color: "emerald",
            description: "Foundational knowledge for systems engineering.",
            skills: [
                { name: "DBMS", level: "Intermediate" },
                { name: "Computer Networks", level: "Intermediate" },
                { name: "Operating Systems", level: "Intermediate" },
                { name: "System Design", level: "Beginner" },
            ],
        },
    ];

    const filteredCategories = useMemo(() => {
        if (!searchQuery) return skillCategories;
        const query = searchQuery.toLowerCase().trim();
        return skillCategories.map(cat => ({
            ...cat,
            skills: cat.skills.filter(s => s.name.toLowerCase().includes(query))
        })).filter(cat => cat.skills.length > 0);
    }, [searchQuery]);

    const getColorClasses = (color: string) => {
        const maps: { [key: string]: string } = {
            blue: "text-blue-600 bg-blue-50/50 border-blue-100",
            indigo: "text-indigo-600 bg-indigo-50/50 border-indigo-100",
            amber: "text-amber-600 bg-amber-50/50 border-amber-100",
            emerald: "text-emerald-600 bg-emerald-50/50 border-emerald-100",
            sky: "text-sky-600 bg-sky-50/50 border-sky-100",
            rose: "text-rose-600 bg-rose-50/50 border-rose-100",
        };
        return maps[color] || maps.blue;
    };

    return (
        <div className="home-container relative py-12 px-4 max-w-7xl mx-auto min-h-full">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

            {/* Header section */}
            <header className="text-center space-y-8 mb-20 animate-fade-in px-4">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Technical Arsenal</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-gray-900 leading-[0.9]">
                    The Skill <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Matrix.
                    </span>
                </h1>
                <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                    A comprehensive architecture of technical competencies across AI, cloud systems, and algorithmic engineering.
                </p>
            </header>

            {/* Search Control */}
            <div className="max-w-2xl mx-auto mb-16 relative z-10 px-4">
                <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter skills by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-16 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700 text-lg shadow-xl shadow-gray-200/40"
                    />
                </div>
            </div>

            {/* Skills Bento Grid - Lists Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {filteredCategories.map((cat, i) => (
                    <div
                        key={i}
                        className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:border-blue-200/50 transition-all duration-300 h-full"
                    >
                        {/* Category Header */}
                        <div className="flex items-start gap-4 mb-8">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${getColorClasses(cat.color)}`}>
                                {cat.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight mb-1">
                                    {cat.category}
                                </h3>
                                <p className="text-xs font-medium text-gray-400 leading-relaxed">
                                    {cat.description}
                                </p>
                            </div>
                        </div>

                        {/* Skills List */}
                        <div className="flex flex-col gap-3 flex-1">
                            {cat.skills.map((s, j) => (
                                <div
                                    key={j}
                                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors group/skill"
                                >
                                    <span className="font-bold text-gray-700 text-sm tracking-tight">{s.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${s.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                                            s.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            {s.level}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredCategories.length === 0 && (
                <div className="text-center py-20 animate-fade-in">
                    <Code2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">No skill matching your query</p>
                </div>
            )}
            {/* Journey Footer */}
            <footer className="mt-24 text-center pb-20 animate-fade-in">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-200" />
                    B.Tech CS • VIT • 2022-2026
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default SkillsSection;
