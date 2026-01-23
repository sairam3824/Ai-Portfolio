import { Github, Linkedin, Code, Trophy, BookOpen, Target } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/sairam3824", category: "social" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sairam-maruri", category: "social" },
];

const codingProfiles = [
  {
    icon: Code,
    label: "LeetCode",
    href: "https://leetcode.com/u/sairam3824/",
    category: "coding"
  },
  {
    icon: Trophy,
    label: "CodeChef",
    href: "https://www.codechef.com/users/sairam2004",
    category: "coding"
  },
  {
    icon: BookOpen,
    label: "InterviewBit",
    href: "https://www.interviewbit.com/profile/sai-rama-linga-reddy-maruri/",
    category: "coding"
  },
  {
    icon: Target,
    label: "TakeUForward",
    href: "https://takeuforward.org/plus/profile/sairam3824",
    category: "coding"
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-28 animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center select-none pointer-events-none focus:outline-none">
        About Me
      </h2>


      <div className="space-y-6 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          I am a GenAI & ML Engineer with a strong foundation in data structures, algorithms, and scalable system design, backed by solving 1,000+ problems, earning the LeetCode Guardian badge (2400+ rating) and a 3★ CodeChef rating (1600+). This discipline has shaped my ability to build efficient, reliable, and production-grade AI and cloud systems.
        </p>

        <p className="leading-relaxed">
          My core expertise lies in Artificial Intelligence, Machine Learning, AI Agents, and Generative AI, with hands-on experience designing LLM-powered applications, RAG pipelines, vector-database search systems, and agentic workflows. I actively work on SaaS-grade optimization, production-ready GenAI systems, and scalable cloud-based AI pipelines.
        </p>

        <p className="leading-relaxed">
          I specialize in building cloud-native GenAI systems on AWS, deploying secure, cost-efficient, and scalable AI/ML pipelines — from experimentation to production.
        </p>

        <p className="leading-relaxed">
          I work extensively with modern AI developer tooling including Cursor AI, Claude Code, Codex, VS Code, Kiro, Surf, Antigravity, and Rovo Dev to design high-performance, agent-driven applications.
        </p>

        <p className="leading-relaxed">
          For me, it's not just about using powerful tools — it's about engineering intelligent systems that solve real-world problems at scale.
        </p>

        <p className="leading-relaxed">Learn always. Build always.</p>

        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>3 Years of Programming Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>Completed 20+ Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>Proficient in AI, ML, LLMs & AWS</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>LeetCode 2400+ Rating • Guardian Badge</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>CodeChef 1600+ Rating • 3 Star</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>50+ Contests Participated •  1000+ Problems</span>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <p className="text-sm font-medium text-foreground">Connect with me</p>
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-card border-2 border-border hover:border-accent transition-all duration-300 hover:scale-105 flex items-center gap-3"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{social.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <p className="text-sm font-medium text-foreground">My coding profiles</p>
          <div className="grid grid-cols-2 gap-4">
            {codingProfiles.map((profile, index) => (
              <a
                key={index}
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-card border-2 border-border hover:border-accent transition-all duration-300 hover:scale-105 flex items-center gap-3"
                aria-label={profile.label}
              >
                <profile.icon className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">{profile.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
