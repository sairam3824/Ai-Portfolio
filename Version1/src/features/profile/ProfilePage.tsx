import { useNavigate } from "react-router-dom";
import {
  Code,
  Trophy,
  FileText,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  User,
  FolderKanban,
  Layers,
  GraduationCap,
  BookOpen,
  Sparkles,
  Mail,
  Home
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { useState, useRef, useEffect } from "react";

/* BadgeBox — permanent rectangular badges section (glass / semi-transparent) */
function BadgeBox() {
  const badgeFileNames = [
    "CodeChefBadge (1).png",
    "CodeChefBadge (2).png",
    "CodeChefBadge (3).png",
    "download.png",
    "download (1).png",
    "download (2).png",
    "download (3).png",
    "download (4).png",
    "download (5).png",
    "download (6).png",
    "download (7).png",
    "download (8).png",
    "download (9).png",
    "inb.png",
  ];

  // safe public urls (encode to handle spaces/parenthesis)
  const badges = badgeFileNames.map((n) => `/badges/${encodeURIComponent(n)}`);

  return (
    <div
      className={
        "badge-box z-30 bg-card/60 backdrop-blur-sm border border-border rounded-xl shadow-lg p-4 w-full md:w-[720px] mx-auto"
      }
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-foreground">Badges</h4>
        <a
          href="/profile/badges"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline text-muted-foreground hover:text-primary"
        >
          View all badges
        </a>
      </div>

      {/* Horizontal scrolling carousel */}
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-2 px-1 snap-x snap-mandatory">
        {badges.map((b, i) => {
          const name = badgeFileNames[i].replace(".png", "");
          return (
            <div key={i} className="group relative flex items-center justify-center snap-start">
              {/* Tooltip on hover (desktop) */}
              <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-50 rounded-md bg-foreground/95 text-card text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {name}
              </span>

              <a
                href={b}
                target="_blank"
                rel="noopener noreferrer"
                download
                title={name}
                className="block w-24 h-32 md:w-28 md:h-36 rounded-md overflow-hidden border border-border hover:shadow-xl transition-transform transform hover:-translate-y-1 bg-transparent flex items-center justify-center p-1"
                aria-label={name}
              >
                <img src={b} alt={name} className="w-full h-full object-contain" />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================
   ProfilePage (main) — CODING FIRST
   Sections order: Coding Profiles -> About -> Resume -> Badges -> Projects -> Skills -> Education
   ================================ */
export const ProfilePage = () => {
  const navigate = useNavigate();

  const sectionIcons = [
    { id: "coding", icon: Code, label: "Coding", onClick: () => navigate("/profile") },
    { id: "resume", icon: FileText, label: "Resume", onClick: () => window.open("/Sai_Ram_Maruri_Resume_2025.pdf", "_blank") },
    { id: "projects", icon: FolderKanban, label: "Projects", onClick: () => navigate("/projects") },
    { id: "about", icon: User, label: "About", onClick: () => navigate("/about") },
    { id: "skills", icon: Layers, label: "Skills", onClick: () => navigate("/skills") },
    { id: "education", icon: GraduationCap, label: "Education", onClick: () => navigate("/education") },
    { id: "certifications", icon: Sparkles, label: "Certifications", onClick: () => navigate("/certifications") },
    { id: "blog", icon: BookOpen, label: "Blog", onClick: () => navigate("/blogs") },
    { id: "contact", icon: Mail, label: "Contact", onClick: () => navigate("/contact") },
  ];

  const codingProfiles = [
    { label: "LeetCode", href: "https://leetcode.com/u/programmer3824/", stats: "2500+ • Guardian" },
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
    { title: "HireMind (Job Cloud)", tech: "Next.js, Supabase, Python, AWS", link: "https://job-cloud.vercel.app" },
    { title: "Bone Fracture Classification", tech: "PyTorch, WideResNet, 94% accuracy", link: "https://github.com/sairam3824/Bone-Fracture-Classification" },
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

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main container with coding section first */}
      <div className="container mx-auto px-4 py-8 max-w-6xl space-y-12">
        {/* Coding Profiles & Stats (moved to top) */}
        <section id="coding-section" className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Code className="w-6 h-6" />
            Coding Profiles
          </h2>
          <p className="text-sm font-semibold text-muted-foreground mb-6">1000+ DSA problems solved • LeetCode Guardian (2500+) • CodeChef 3★</p>

          {/* Grid with left (fixed-ish), right (stats) */}
          <div className="grid gap-8 items-start md:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
            {/* Left column: coding profiles */}
            <div className="space-y-3">
              {codingProfiles.map((profile, i) => (
                <div key={i} className="block">
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 hover:text-primary transition-colors group"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-lg group-hover:text-primary">
                        {profile.label}
                      </p>
                      <p
                        className={`text-sm text-muted-foreground ${profile.stats !== "Active" &&
                          profile.stats !== "Streak" &&
                          profile.stats !== "All Profiles"
                          ? "font-bold"
                          : ""
                          }`}
                      >
                        {profile.stats}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </a>
                </div>
              ))}
            </div>

            {/* Right column: stat circles */}
            <div className="grid grid-cols-2 grid-rows-2 gap-6 place-items-center w-fit mx-auto">
              {/* Circle 1 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <p className="text-3xl font-bold text-primary/80">4</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2 text-center">Live<br />Projects</p>
              </div>

              {/* Circle 2 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <p className="text-3xl font-bold text-primary/80">20+</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2 text-center">Total<br />Projects</p>
              </div>

              {/* Circle 3 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <p className="text-2xl font-bold text-primary/80">1000+</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2 text-center">Problems<br />Solved</p>
              </div>

              {/* Circle 4 */}
              <div className="flex flex-col items-center group cursor-default">
                <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                  <p className="text-3xl font-bold text-primary/80">3</p>
                </div>
                <p className="text-sm font-medium text-foreground mt-2 text-center">Years<br />Coding Experience</p>
              </div>
            </div>
          </div>
        </section>

        {/* About (moved below coding) */}
        <section id="about-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
          <Card className="p-6">
            <p className="text-muted-foreground mb-4">
              AI-driven technologist with 3 years of programming experience. Specialized in AI/ML, LLMs, and cloud technologies.
              LeetCode Guardian (2500+), CodeChef 3★ with 1000+ problems solved. Passionate about building impactful AI solutions.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/sairam3824" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/sairam-maruri" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-sm">
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </Card>
        </section>

        {/* Resume */}
        <section id="resume-section">
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

        {/* Badges section */}
        <section id="badges-section" className="pt-2 pb-6">
          <BadgeBox />
        </section>

        {/* Key Projects */}
        <section id="projects-section">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Key Projects
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Card
                key={i}
                className="p-6 hover:border-primary hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between min-h-[140px] rounded-2xl"
              >
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{project.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4">{project.tech}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    View
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Live Projects — compact pill buttons */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-foreground mb-3">Live Projects</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://saiii.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
              >
                AI Portfolio <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://orravyn.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
              >
                Research Platform <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://sairam.orravyn.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
              >
                Portfolio <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://job-cloud.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
              >
                HireMind <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>


        {/* Skills */}
        <section id="skills-section">
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

        {/* Certifications (inserted after Skills) */}
        <section id="certifications-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">Certifications</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                title: "Oracle Vector AI Search Professional",
                link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C3418835C36967F3D176B27533502B55888A3CFBEEC3D339189559E070D0F939",
              },
              {
                title: "Oracle Generative AI Professional",
                link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=CC2371A772A07EC0926BE492904B67F3AA59912C48FE5488BAB54F87F914D350",
              },
              {
                title: "AWS Cloud Practitioner",
                link: "https://www.credly.com/badges/eeb97be1-16e8-475b-8f08-d3ffdf051f2e/linked_in_profile",
              },
              {
                title: "IBM RAG and Agentic AI Professional Certificate",
                link: "https://www.credly.com/badges/84dabd2f-4c54-4ad8-b424-8ff9ab85d263/public_url",
              },
            ].map((c, i) => (
              <Card key={i} className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{c.title}</h3>
                <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                  View Certificate <ExternalLink className="w-3 h-3" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section id="education-section">
          <h2 className="text-2xl font-bold text-foreground mb-4">Education</h2>
          <Card className="p-6">
            <h3 className="font-semibold text-foreground">B.Tech Computer Science</h3>
            <p className="text-sm text-muted-foreground">Vellore Institute of Technology • 2022-2026 • CGPA: 8.31/10</p>
            <p className="text-xs text-muted-foreground mt-2"> Data Structures & Algorithms, Operating Systems, OOP, Software Engineering (Design Patterns, System Design), Computer Networks, Deep Learning, NoSQL databases</p>
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