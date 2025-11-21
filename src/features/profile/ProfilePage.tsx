import { useNavigate } from "react-router-dom";
import { Code, Trophy, FileText, Download, ExternalLink, Github, Linkedin } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const codingProfiles = [
    { label: "LeetCode", href: "https://leetcode.com/u/programmer3824/", stats: "2150+ • Guardian" },
    { label: "CodeChef", href: "https://www.codechef.com/users/sairam2004", stats: "3★ • 1600+" },
    { label: "LeetCode", href: "https://leetcode.com/u/sairam3824/", stats: "Streak" },
    { label: "InterviewBit", href: "https://www.interviewbit.com/profile/sai-rama-linga-reddy-maruri/", stats: "Active" },
    { label: "TakeUForward", href: "https://takeuforward.org/plus/profile/sairam3824", stats: "Active" },
    { label: "Codeforces", href: "https://codeforces.com/profile/sairam3824", stats: "Active" },
    { label: "Codolio", href: "https://codolio.com/profile/sairam3824", stats: "All Profiles" },
  ];

  const projects = [
    { title: "AI Research Platform", tech: "Node.js, Python, AWS, LLMs", link: "https://orravyn.cloud" },
    { title: "AI Portfolio", tech: "React, TypeScript, Supabase, n8n", link: "https://saiii.in" },
    { title: "Bone Fracture Classification", tech: "PyTorch, WideResNet, 94% accuracy", link: "https://github.com/sairam3824/Bone-Fracture-Classification" },
    { title: "Customer Churn Prediction", tech: "Machine Leaning, 89% precision", link: "https://github.com/sairam3824/Customer-Churn-Prediction" },
  ];

  const skills = [
    { category: "AI/ML", items: "TensorFlow, PyTorch, LangChain, RAG, LLMs" },
    { category: "Languages", items: "Python, Java, C++, JavaScript" },
    { category: "Cloud & Tools", items: "AWS, Docker, n8n, Git" },
    { category: "Specialization", items: "Computer Vision, NLP, Deep Learning" },
  ];



  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-foreground">Professional Profile</h1>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl space-y-12">
        {/* Coding Profiles & Stats */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Coding Profiles
          </h2>
          <p className="text-sm text-muted-foreground mb-4">1000+ DSA problems solved • LeetCode Guardian (2150+) • CodeChef 3★</p>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Left: Coding Profiles List */}
            <div className="flex-1 space-y-3">
              {codingProfiles.map((profile, i) => (
                <div key={i} className="block">
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 hover:text-primary transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-base group-hover:text-primary">{profile.label}</p>
                      <p className={`text-sm text-muted-foreground ${profile.stats !== 'Active' && profile.stats !== 'Streak' && profile.stats !== 'All Profiles' ? 'font-bold' : ''}`}>{profile.stats}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                </div>
              ))}
            </div>
            
            {/* Right: Stats Circles */}
            <div className="grid grid-cols-2 gap-6 md:gap-4">
              <div className="flex flex-col items-center group cursor-default -ml-16 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl z-50 whitespace-nowrap">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45"></div>
                  <div className="flex flex-col gap-2">
                    <a href="https://orravyn.cloud" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2">🌐 Orravyn Cloud</a>
                    <a href="https://saiii.in" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2">💼 Portfolio (saiii.in)</a>
                    <a href="https://myportfilo-azure.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2">🎨 Portfolio (Vercel)</a>
                  </div>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-3xl font-bold text-primary/80">3</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-3 text-center">Live<br/>Projects</p>
              </div>
              <div className="flex flex-col items-center group cursor-default relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl z-50 whitespace-nowrap">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45"></div>
                  <div className="flex flex-col gap-2">
                    <a href="https://github.com/sairam3824" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2"><Github className="w-4 h-4" /> GitHub Profile</a>
                    <button onClick={() => navigate("/projects")} className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2 text-left"><Trophy className="w-4 h-4" /> Projects Section</button>
                  </div>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-3xl font-bold text-primary/80">15+</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-3 text-center">Total<br/>Projects</p>
              </div>
              <div className="flex flex-col items-center group cursor-default -ml-16 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-card/95 backdrop-blur-sm border border-border rounded-2xl p-4 shadow-xl z-50 whitespace-nowrap">
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-card border-r border-b border-border rotate-45"></div>
                  <div className="flex flex-col gap-2">
                    <a href="https://codolio.com/profile/sairam3824" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-foreground hover:text-primary flex items-center gap-2">👨‍💻 Codolio Profile</a>
                  </div>
                </div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-2xl font-bold text-primary/80">1000+</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-3 text-center">Problems<br/>Solved</p>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-3xl font-bold text-primary/80">3</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-3 text-center">Years<br/>Coding Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resume */}
        <section>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Resume
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => window.open("/Sai_Ram_Maruri_Resume_2025.pdf", "_blank")} size="sm">
                <FileText className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/Sai_Ram_Maruri_Resume_2025.pdf";
                  link.download = "Sai_Ram_Maruri_Resume_2025.pdf";
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Key Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <Card key={i} className="p-4 hover:border-primary transition-all">
                <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{project.tech}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* About */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
          <Card className="p-6">
            <p className="text-muted-foreground mb-4">
              AI-driven technologist with 3 years of programming experience. Specialized in AI/ML, LLMs, and cloud technologies.
              LeetCode Guardian (2150+), CodeChef 3★ with 1000+ problems solved. Passionate about building impactful AI solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/sairam3824"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/sairam-maruri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </Card>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Skills</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {skills.map((skill, i) => (
              <Card key={i} className="p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{skill.category}</p>
                <p className="text-xs text-muted-foreground">{skill.items}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
          <Card className="p-6">
            <h3 className="font-semibold text-foreground">B.Tech Computer Science</h3>
            <p className="text-sm text-muted-foreground">Vellore Institute of Technology • 2022-2026 • CGPA: 8.24/10</p>
            <p className="text-xs text-muted-foreground mt-2">DSA, OOP, Deep Learning, Software Engineering, NoSQL</p>
          </Card>
        </section>
      </div>

      <footer className="w-full py-4 border-t border-border bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">© 2025 Sai Rama Linga Reddy Maruri</p>
        </div>
      </footer>
    </div>
  );
};
