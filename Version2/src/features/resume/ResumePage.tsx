import {
    Download,
    Mail,
    Phone,
    MapPin,
    Github,
    Linkedin,
    ExternalLink,
    Award,
    Code2,
    BookOpen,
    Eye
} from "lucide-react";

export const ResumePage = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-4 md:px-8 print:p-0 print:bg-white flex flex-col">
            {/* Actions Bar - Hidden on Print */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center w-full print:hidden animate-fade-in">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Digital Resume</h1>
                <div className="flex gap-4">
                    <a
                        href="/Sai_Ram_Maruri_Resume_2025.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
                    >
                        <Eye className="w-4 h-4" />
                        View Original
                    </a>
                    <a
                        href="/Sai_Ram_Maruri_Resume_2025.pdf"
                        download
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </a>
                </div>
            </div>

            {/* Resume Sheet */}
            <div className="max-w-[210mm] mx-auto bg-white shadow-2xl shadow-gray-200/50 print:shadow-none print:w-full print:max-w-none rounded-none md:rounded-[2px] overflow-hidden relative flex-1">
                {/* Top Accent Line */}
                <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600 print:h-1" />

                <div className="p-8 md:p-12 print:p-8 space-y-8">
                    {/* Header */}
                    <header className="border-b border-gray-100 pb-8 flex flex-col md:flex-row justify-between gap-6 md:items-start">
                        <div className="space-y-2">
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase leading-none">
                                Sai Ram <span className="text-blue-600">Maruri</span>
                            </h1>
                            <p className="text-lg font-medium text-gray-500 tracking-wide uppercase">GenAI Engineer & Architect</p>
                        </div>

                        <div className="flex flex-col gap-2 text-sm text-gray-600 font-medium">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-400" />
                                <a href="mailto:sairam.maruri@gmail.com" className="hover:text-blue-600">sairam.maruri@gmail.com</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-400" />
                                <span>+91 7893865644</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>Amaravati, India</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                                <a href="https://github.com/sairam3824" className="text-gray-400 hover:text-gray-900"><Github className="w-5 h-5" /></a>
                                <a href="https://www.linkedin.com/in/sairam-maruri" className="text-gray-400 hover:text-blue-600"><Linkedin className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </header>

                    {/* Summary */}
                    <section>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                            <span className="w-8 h-px bg-blue-600" />
                            Professional Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                            Advanced GenAI Engineer and Competitive Programmer (LeetCode Guardian) with expertise in building scalable AI agents, RAG pipelines, and cloud-native inputs architectures. Proven track record of solving 1,500+ algorithmic problems and deploying enterprise-grade AI solutions on AWS. Passionate about bridging the gap between theoretical research and production systems.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3">
                        {/* Main Column */}
                        <div className="md:col-span-2 space-y-8">

                            {/* Projects */}
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-px bg-blue-600" />
                                    Selected Projects
                                </h3>

                                <div className="space-y-6">
                                    <div className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">HireMind (Job Cloud)</h4>
                                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Next.js, Python, AWS</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                            Automated job crawler and matching platform connecting job seekers with ideal roles. Features intelligent resume matching, company insights, and real-time data integration using Supabase and Docker.
                                        </p>
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Enterprise RAG Platform</h4>
                                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">LangChain, Vector DB, LLMs</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                            Sophisticated Retrieval-Augmented Generation system combining vector databases and LLMs for intelligent document processing and semantic search across large corporate knowledge bases.
                                        </p>
                                    </div>

                                    <div className="group">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">AI Research Portal</h4>
                                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded">Node.js, Docker, AWS</span>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-2">
                                            Collaborative AI research and deployment platform enabling scalable LLM experimentation. Implemented n8n workflows for automated model fine-tuning pipelines.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-px bg-blue-600" />
                                    Education
                                </h3>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="text-base font-bold text-gray-900">Vellore Institute of Technology</h4>
                                        <span className="text-sm font-bold text-gray-500">2022 - 2026</span>
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">Bachelor of Technology - Computer Science & Engineering</p>
                                    <p className="text-sm text-blue-600 font-bold mt-1">CGPA: 9.0</p>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-px bg-blue-600" />
                                    Technical Skills
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Languages</h5>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["Java", "C++", "Python", "TypeScript", "SQL"].map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded uppercase">{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">AI / ML</h5>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["PyTorch", "LangChain", "RAG", "LLMs", "OpenCV", "Vectors"].map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded uppercase">{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h5 className="text-xs font-bold text-gray-900 uppercase mb-2">Cloud & Dev</h5>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["AWS", "Docker", "Git", "Likux", "React", "Next.js"].map(s => (
                                                <span key={s} className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold rounded uppercase">{s}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-px bg-blue-600" />
                                    Achievements
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                        <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                        <span>LeetCode Guardian (Top 2% globally)</span>
                                    </li>
                                    <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                        <Award className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                        <span>CodeChef 3-Star (1600+ Rating)</span>
                                    </li>
                                    <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                        <Award className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                        <span>Solved 1,500+ Algorithmic Problems</span>
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2">
                                    <span className="w-8 h-px bg-blue-600" />
                                    Certifications
                                </h3>
                                <ul className="space-y-3">
                                    <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                        <Code2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <span>Oracle Cloud Infrastructure 2024 GenAI</span>
                                    </li>
                                    <li className="text-xs text-gray-600 leading-relaxed flex gap-2">
                                        <Code2 className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                        <span>AWS Certified Cloud Practitioner (In Progress)</span>
                                    </li>
                                </ul>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Footer on Print */}
                <div className="hidden print:block text-center mt-12 pt-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                        Generated from portfolio.saiii.in
                    </p>
                </div>
            </div>

            {/* Global Footer (Screen Only) */}
            <footer className="mt-auto pt-16 text-center pb-8 animate-fade-in print:hidden">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
                    <span className="w-16 h-px bg-gray-300" />
                    B.Tech CS • VIT • 2022-2026
                    <span className="w-16 h-px bg-gray-300" />
                </p>
            </footer>
        </div>
    );
};

export default ResumePage;
