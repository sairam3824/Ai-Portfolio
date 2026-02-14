import {
  Sparkles,
  Layers,
  Binary,
  Code,
  Zap,
  Target
} from "lucide-react";
import Seo from "../../shared/Seo";
import { projectsData } from "../projects/projectsData";

export const AboutPage = () => {
  const stats = [
    { label: "Building", value: "3+ Years", icon: <Layers className="w-4 h-4" />, color: "blue" },
    { label: "Projects", value: `${projectsData.length}+`, icon: <Zap className="w-4 h-4" />, color: "amber" },
    { label: "Problems", value: "1000+", icon: <Binary className="w-4 h-4" />, color: "emerald" },
    { label: "Blog Articles", value: "30+", icon: <Sparkles className="w-4 h-4" />, color: "blue" },
    { label: "Certifications", value: "9+", icon: <Target className="w-4 h-4" />, color: "amber" },
    { label: "Skills", value: "43+", icon: <Code className="w-4 h-4" />, color: "emerald" },
  ];

  const badges = [
    { label: "LeetCode", value: "Guardian", sub: "2500+ Rating", color: "blue" },
    { label: "CodeChef", value: "3 Star", sub: "1600+ Rating", color: "orange" },
    { label: "Contests", value: "50+", sub: "Participated", color: "emerald" },
  ];

  const devTools = [
    "Cursor AI", "Claude Code", "Codex", "VS Code", "Kiro", "Surf", "Antigravity", "Rovo Dev"
  ];

  const llmEcosystem = [
    "OpenAI", "Anthropic Claude", "Google Gemini", "Meta LLaMA", "DeepSeek", "Mistral", "Grok", "CodeLLaMA"
  ];

  return (
    <div className="relative py-12 px-4 max-w-6xl mx-auto min-h-full overflow-visible flex flex-col">
      <Seo
        title="About | Sai Ram Maruri"
        description="Learn about Sai Ram Maruri - GenAI & ML Engineer with 3+ years experience, 1000+ problems solved, 30+ blog articles, and 9 industry certifications. Building production AI that ships."
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ]}
      />
      {/* Background Narrative blurs — hidden on mobile for GPU perf */}
      <div className="hidden md:block absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />
      <div className="hidden md:block absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full -z-10" />

      {/* Header: Pure Impact */}
      <header className="relative z-10 mb-20 animate-fade-in w-full text-left">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/40 rounded-full shadow-sm mb-6">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Evolution of an Engineer</span>
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] text-gray-900 leading-tight mb-8">
          GenAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600">Engineer.</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-3xl leading-relaxed">
          I am Sai Ram Maruri — I architect and ship production SaaS AI on AWS, powered by Claude Code. From RAG pipelines to agentic workflows, I build AI that scales.
        </p>
      </header>

      {/* The Bento Masterclass */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10 w-full">

        {/* Main Bio Card - Span 8 */}
        <div className="md:col-span-8 p-10 rounded-[3rem] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col justify-between group hover:border-blue-200/50 hover:-translate-y-2 transition-all duration-700">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-full text-white">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight italic">Learn always. Build always.</h2>
            </div>
            <div className="space-y-6 text-gray-600 font-medium text-lg leading-relaxed max-w-2xl">
              <p>
                With a foundation built on <span className="text-gray-800 font-bold">1,000+ solved algorithmic challenges</span>, I've evolved from competitive programming (LeetCode Guardian) to architecting and shipping production-grade SaaS AI systems on AWS.
              </p>
              <p>
                I specialize in <span className="text-blue-600 font-bold">cloud-native AI pipelines</span> — building agentic workflows, RAG systems, and LLM-powered applications using Claude Code, Cursor AI, and the modern vibe coding stack. Every system I build balances cost, speed, and intelligence.
              </p>
            </div>
          </div>
        </div>

        {/* Stat Strip - Span 4 (2 columns x 3 rows) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-5 rounded-[1.5rem] bg-white border border-gray-100 shadow-sm flex flex-col gap-2 group hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className={`p-2.5 rounded-full bg-white shadow-sm w-fit group-hover:scale-110 transition-transform ${stat.color === 'blue' ? 'text-blue-500' :
                stat.color === 'amber' ? 'text-amber-500' :
                  'text-emerald-500'
                }`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Badge Grid - Span 4 */}
        <div className="md:col-span-4 p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col justify-start overflow-hidden relative group hover:border-blue-200/50 hover:-translate-y-2 transition-all duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 blur-[60px] rounded-full group-hover:bg-blue-500/10 transition-all" />
          <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-4 flex items-center gap-3">
            Verified Authority <div className="h-px flex-1 bg-gray-100" />
          </h3>
          <p className="text-sm text-gray-400 font-bold italic mb-8">
            <span className="text-gray-500">That's not practice</span><br />
            — that's how I architect and ship production AI.
          </p>
          <div className="flex-1 flex flex-col justify-evenly">
            {badges.map((badge, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`w-1.5 h-10 rounded-full ${badge.color === 'blue' ? 'bg-blue-500' :
                  badge.color === 'orange' ? 'bg-orange-500' :
                    'bg-emerald-500'
                  }`} />
                <div>
                  <p className="text-xl font-bold tracking-tight text-gray-800">{badge.label}</p>
                  <p className="text-sm font-bold text-gray-500">{badge.value}</p>
                  <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expertise List - Span 8 */}
        <div className="md:col-span-8 p-10 rounded-[3rem] bg-white border border-gray-100 shadow-xl shadow-gray-200/40 flex flex-col justify-start relative overflow-hidden group hover:border-blue-200/50 hover:-translate-y-2 transition-all duration-500">
          <div className="hidden sm:block absolute -bottom-10 -right-10 text-[180px] font-black text-gray-800/[0.02] select-none">AI</div>
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              Core Expertise
              <span className="text-blue-600 font-mono text-lg">&gt;_</span>
            </h3>
            <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
              Building production SaaS AI with LLM-powered apps, RAG pipelines, vector search, and agentic workflows — powered by OpenAI, Anthropic, Google, Meta, DeepSeek, and Mistral.
            </p>
          </div>
          <div className="space-y-6 mt-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Dev Tools</p>
              <div className="flex flex-wrap gap-3">
                {devTools.map((tool, i) => (
                  <div key={i} className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default flex items-center gap-2">
                    <span className="text-blue-500 font-mono text-[10px] leading-none">&gt;_</span>
                    {tool}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">LLM Ecosystem</p>
              <div className="flex flex-wrap gap-3">
                {llmEcosystem.map((model, i) => (
                  <div key={i} className="px-5 py-2.5 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-default flex items-center gap-2">
                    <span className="text-indigo-500 font-mono text-[10px] leading-none">&gt;_</span>
                    {model}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Tagline */}
      <div className="mt-20 w-full text-center animate-fade-in">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em] flex items-center justify-center gap-6">
          <span className="w-16 h-px bg-gray-200" />
          Passionate Engineer • Creative Thinker
          <span className="w-16 h-px bg-gray-200" />
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
