import {
    Code2,
    Brain,
    Cloud,
    Terminal,
    Zap,
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
                { name: "OpenAI API", level: "Advanced", url: "https://platform.openai.com/docs" },
                { name: "Claude API", level: "Advanced", url: "https://docs.anthropic.com/claude/docs" },
                { name: "Gemini API", level: "Advanced", url: "https://ai.google.dev/docs" },
                { name: "Hugging Face", level: "Advanced", url: "https://huggingface.co/docs" },
                { name: "LangChain", level: "Advanced", url: "https://python.langchain.com/docs/get_started/introduction" },
                { name: "RAG Systems", level: "Advanced", url: "https://python.langchain.com/docs/use_cases/question_answering/" },
                { name: "Prompt Engineering", level: "Advanced", url: "https://www.promptingguide.ai/" },
                { name: "Model Fine-tuning", level: "Intermediate", url: "https://huggingface.co/docs/transformers/training" },
                { name: "AI Agent Development", level: "Advanced", url: "https://python.langchain.com/docs/use_cases/agents/" },
                { name: "Vector Databases", level: "Intermediate", url: "https://www.pinecone.io/learn/vector-database/" },
            ],
        },
        {
            category: "Programming Core",
            icon: <Code2 className="w-5 h-5" />,
            color: "blue",
            description: "Building robust, scalable applications with precision.",
            skills: [
                { name: "Java", level: "Advanced", url: "https://dev.java/" },
                { name: "C++", level: "Advanced", url: "https://isocpp.org/" },
                { name: "Python", level: "Advanced", url: "https://www.python.org/" },
                { name: "DataStructures & Algorithms", level: "Advanced", url: "https://www.geeksforgeeks.org/data-structures/" },
                { name: "Competitive Programming", level: "Advanced", url: "https://cp-algorithms.com/" },
                { name: "Problem Solving", level: "Advanced", url: "https://leetcode.com/" },
                { name: "Object Oriented Programming", level: "Advanced", url: "https://en.wikipedia.org/wiki/Object-oriented_programming" },
            ],
        },
        {
            category: "Intelligence Stack",
            icon: <Zap className="w-5 h-5" />,
            color: "amber",
            description: "Developing predictive models and computer vision pipelines.",
            skills: [
                { name: "TensorFlow", level: "Intermediate", url: "https://www.tensorflow.org/" },
                { name: "PyTorch", level: "Intermediate", url: "https://pytorch.org/" },
                { name: "Scikit-learn", level: "Intermediate", url: "https://scikit-learn.org/" },
                { name: "Computer Vision", level: "Advanced", url: "https://opencv.org/" },
                { name: "NLP", level: "Advanced", url: "https://huggingface.co/tasks/natural-language-processing" },
                { name: "Deep Learning", level: "Advanced", url: "https://www.deeplearning.ai/" },
                { name: "Machine Learning", level: "Advanced", url: "https://en.wikipedia.org/wiki/Machine_learning" },
                { name: "Reinforcement Learning", level: "Beginner", url: "https://spinningup.openai.com/en/latest/" },
            ],
        },
        {
            category: "Cloud & Dev",
            icon: <Cloud className="w-5 h-5" />,
            color: "sky",
            description: "Deploying and scaling applications on modern infrastructure.",
            skills: [
                { name: "AWS", level: "Intermediate", url: "https://aws.amazon.com/" },
                { name: "Azure", level: "Intermediate", url: "https://azure.microsoft.com/" },
                { name: "n8n", level: "Intermediate", url: "https://n8n.io/" },
                { name: "Docker", level: "Beginner", url: "https://www.docker.com/" },
                { name: "Git", level: "Advanced", url: "https://git-scm.com/" },
                { name: "Linux", level: "Intermediate", url: "https://www.linux.org/" },
            ],
        },
        {
            category: "App Development",
            icon: <Terminal className="w-5 h-5" />,
            color: "rose",
            description: "Creating full-stack functional applications.",
            skills: [
                { name: "Django", level: "Intermediate", url: "https://www.djangoproject.com/" },
                { name: "Node.js", level: "Intermediate", url: "https://nodejs.org/" },
                { name: "React.js", level: "Intermediate", url: "https://react.dev/" },
                { name: "MySQL", level: "Intermediate", url: "https://www.mysql.com/" },
                { name: "MongoDB", level: "Intermediate", url: "https://www.mongodb.com/" },
                { name: "Streamlit", level: "Advanced", url: "https://streamlit.io/" },
            ],
        },
        {
            category: "Core Computer Science",
            icon: <Cpu className="w-5 h-5" />,
            color: "emerald",
            description: "Foundational knowledge for systems engineering.",
            skills: [
                { name: "DBMS", level: "Intermediate", url: "https://www.geeksforgeeks.org/dbms/" },
                { name: "Computer Networks", level: "Intermediate", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" },
                { name: "Operating Systems", level: "Intermediate", url: "https://www.geeksforgeeks.org/operating-systems/" },
                { name: "System Design", level: "Beginner", url: "https://github.com/donnemartin/system-design-primer" },
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
                        className="w-full pl-16 pr-6 py-4 bg-white border border-gray-100 rounded-full outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-gray-700 text-lg shadow-xl shadow-gray-200/40"
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
                            {cat.skills.map((s: any, j) => (
                                <a
                                    key={j}
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors group/skill cursor-pointer"
                                >
                                    <span className="font-bold text-gray-700 text-sm tracking-tight group-hover/skill:text-blue-600 transition-colors">{s.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${s.level === 'Advanced' ? 'bg-blue-100 text-blue-700' :
                                            s.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-orange-100 text-orange-700'
                                            }`}>
                                            {s.level}
                                        </span>
                                    </div>
                                </a>
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
                    Continuously Improving • Mastering New Tech
                    <span className="w-16 h-px bg-gray-200" />
                </p>
            </footer>
        </div>
    );
};

export default SkillsSection;
