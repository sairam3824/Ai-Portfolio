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
    href: "https://takeuforward.org/plus/profile/3824", 
    category: "coding" 
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-28 animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground">About Me</h2>

      <div className="space-y-6 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          I'm Sairam, a dedicated DSA problem solver and AI-driven technologist with 3 years of programming experience. 
          I've solved over 750+ problems on LeetCode to strengthen my grasp of data structures and algorithms — 
          the foundation of scalable and efficient systems.
        </p>

        <p className="leading-relaxed">
          My core interests include Artificial Intelligence, Machine Learning, AI Agents, and Generative AI, 
          with growing proficiency in Large Language Models (LLMs) and their real-world applications. 
          I continuously explore model architectures, optimization techniques, and cutting-edge AI advancements.
        </p>

        <p className="leading-relaxed">
          Beyond algorithms, I bring hands-on experience with cloud technologies, particularly Amazon Web Services (AWS),
          enabling me to design and deploy scalable, secure, and cost-efficient ML workflows and data pipelines. 
          For me, it's not just about using powerful tools—it's about mastering them to build impactful solutions. 
        </p>

        <p className="leading-relaxed">Learn always, Build always.</p>

        <div className="pt-4 space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>3 Years of Programming Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>Completed 9+ Projects</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>Expertise in Data Structures & Algorithms</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent"></div>
            <span>Proficient in AI, ML, LLMs & AWS</span>
          </div>
        </div>

        {/* Social Media Section */}
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

        {/* Coding Profiles Section */}
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
