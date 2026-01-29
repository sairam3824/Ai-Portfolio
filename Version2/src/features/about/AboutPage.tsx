import {
  Sparkles,
  Terminal,
  Layers,
  Binary,
  Code,
  Zap,
  Target
} from "lucide-react";
import { Helmet } from "react-helmet-async";

export const AboutPage = () => {
  const stats = [
    { label: "Experience", value: "3+ Years", icon: <Layers className="w-4 h-4" />, color: "blue" },
    { label: "Projects", value: "20+", icon: <Zap className="w-4 h-4" />, color: "amber" },
    { label: "Problems", value: "1000+", icon: <Binary className="w-4 h-4" />, color: "emerald" },
  ];

  const badges = [
    { label: "LeetCode", value: "Guardian", sub: "2500+ Rating", color: "blue" },
    { label: "CodeChef", value: "3 Star", sub: "1600+ Rating", color: "orange" },
    { label: "Contests", value: "50+", sub: "Participated", color: "emerald" },
  ];

  const tools = [
    "Cursor AI", "Claude Code", "Codex", "VS Code", "Kiro", "Surf", "Antigravity", "Rovo Dev"
  ];

  return (
    <div className="relative py-12 px-4 max-w-6xl mx-auto min-h-full overflow-visible flex flex-col items-start">
      <Helmet>
        <title>Sai Ram Maruri | GenAI Engineer & Architect</title>
        <meta name="description" content="Learn about Sai Ram Maruri's journey from competitive programmer to GenAI Architect. Expertise in LLMs, RAG systems, and cloud-native AI solutions." />
      </Helmet>
      {/* Background Narrative blurs */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      {/* Header: Pure Impact */}
      <header className="relative z-10 mb-20 animate-fade-in w-full text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50/50 backdrop-blur-sm border border-blue-100 rounded-full mb-6 text-blue-600 font-bold text-[10px] uppercase tracking-widest">
          <Sparkles className="w-3 h-3" />
          Evolution of an Engineer
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] text-gray-900 leading-tight mb-8">
          GenAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">Pioneer.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-3xl leading-relaxed">
          I am Sai Ram Maruri — engineering autonomous systems that solve complexity with surgical precision.
        </p>
      </header>

      {/* The Bento Masterclass */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 w-full">

        {/* Main Bio Card - Span 8 */}
        <div className="md:col-span-8 p-10 rounded-[3rem] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col justify-between group hover:border-blue-200/50 hover:-translate-y-2 transition-all duration-700">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-2xl text-white">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">Learn always. Build always.</h2>
            </div>
            <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed max-w-2xl">
              <p>
                With a foundation built on <span className="text-gray-900 font-bold">1,000+ solved algorithmic challenges</span>, I've transitioned from competitive programming (LeetCode Guardian) to architecting production-grade GenAI systems.
              </p>
              <p>
                I specialize in <span className="text-blue-600 font-bold">cloud-native AI pipelines</span> on AWS, deploying agentic workflows, RAG systems, and LLM-powered applications that balance cost, speed, and intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Vertical Stat Strip - Span 4 */}
        <div className="md:col-span-4 grid grid-rows-3 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform ${stat.color === 'blue' ? 'text-blue-500' :
                stat.color === 'amber' ? 'text-amber-500' :
                  'text-emerald-500'
                }`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Badge Grid - Span 4 */}
        <div className="md:col-span-4 p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col justify-between overflow-hidden relative group hover:border-blue-200/50 hover:-translate-y-2 transition-all duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full group-hover:bg-blue-500/10 transition-all" />
          <h3 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-8 flex items-center gap-3">
            Verified Authority <div className="h-px flex-1 bg-gray-100" />
          </h3>
          <div className="space-y-8">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-1.5 h-10 rounded-full ${badge.color === 'blue' ? 'bg-blue-500' :
                  badge.color === 'orange' ? 'bg-orange-500' :
                    'bg-emerald-500'
                  }`} />
                <div>
                  <p className="text-xl font-black tracking-tight text-gray-900">{badge.label}</p>
                  <p className="text-sm font-bold text-gray-500">{badge.value}</p>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise List - Span 8 */}
        <div className="md:col-span-8 p-10 rounded-[3rem] bg-gray-50/50 backdrop-blur-xl border border-gray-100 flex flex-col justify-start relative overflow-hidden group hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
          <div className="absolute -bottom-10 -right-10 text-[180px] font-black text-gray-900/[0.02] select-none">AI</div>
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
              Core Expertise
              <Target className="w-5 h-5 text-blue-600" />
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
              Designing LLM-powered applications, RAG pipelines, vector-database search systems, and agentic workflows for SaaS-grade optimization.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            {tools.map((tool, i) => (
              <div key={i} className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default flex items-center gap-2">
                <Terminal className="w-3 h-3 text-blue-500" />
                {tool}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Closing Tagline */}
      <div className="mt-20 text-center animate-fade-in">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
          <span className="w-16 h-px bg-gray-200" />
          Passionate Engineer • Creative Thinker
          <span className="w-16 h-px bg-gray-200" />
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
