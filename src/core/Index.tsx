import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, FolderKanban, Layers, GraduationCap, BookOpen, Sparkles, Send, Mail, FileText } from "lucide-react";
import { NavigationCard, CursorBlast, ModeToggle } from "@/shared/components";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useTypewriter } from "@/shared/hooks/useTypewriter";
import { AboutSection } from "@/features/about";
import { ProjectsSection } from "@/features/projects";
import { SkillsSection } from "@/features/skills";
import { EducationSection } from "@/features/education";
import { BlogSection } from "@/features/blog";
import { CertificationSection } from "@/features/certifications";
import { ContactSection } from "@/features/contact";
import { ChatDialog } from "@/features/chat";
import logo from "@/assets/logo.png";
import avatar from "@/assets/avatar.png";

type Section = "me" | "resume" | "projects" | "skills" | "education" | "blog" | "certification" | "contact";

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState<string>();

  // Typewriter effect for placeholder
  const placeholderText = useTypewriter({
    texts: [
      "Ask me anything...",
      "What are my skills?",
      "Tell me about my projects...",
      "What's my experience?",
      "How can I help you?",
      "Ask about my education...",
      "This is beta version 🚀"
    ],
    speed: 100,
    deleteSpeed: 50,
    delayBetweenTexts: 2000,
    loop: true,
  });

  useEffect(() => {
    const sectionParam = searchParams.get("section");
    if (sectionParam && ["me", "projects", "skills", "education", "blog", "certification", "contact"].includes(sectionParam)) {
      setActiveSection(sectionParam as Section);
    }
  }, [searchParams]);

  const navigationItems = [
    { id: "me" as Section, icon: User, label: "Me" },
    { id: "resume" as Section, icon: FileText, label: "Resume" },
    { id: "projects" as Section, icon: FolderKanban, label: "Projects" },
    { id: "skills" as Section, icon: Layers, label: "Skills" },
    { id: "education" as Section, icon: GraduationCap, label: "Education" },
    { id: "blog" as Section, icon: BookOpen, label: "Blog" },
    { id: "certification" as Section, icon: Sparkles, label: "Certifications" },
    { id: "contact" as Section, icon: Mail, label: "Contact" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setInitialChatMessage(searchQuery);
      setChatOpen(true);
      setSearchQuery("");
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "me":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "education":
        return <EducationSection />;
      case "blog":
        return <BlogSection />;
      case "certification":
        return <CertificationSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeSection && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      setTimeout(() => {
        if (!contentRef.current) return;
        const firstHeading = contentRef.current.querySelector("h1, h2, h3");
        if (firstHeading instanceof HTMLElement) {
          if (!firstHeading.hasAttribute("tabindex")) firstHeading.setAttribute("tabindex", "-1");
          firstHeading.focus({ preventScroll: true });
        }
      }, 50);
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <CursorBlast />
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 flex-1">
        <div className="flex justify-center mb-8 animate-fade-in">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <p className="text-xl text-muted-foreground">
            Hey, I'm Sai Rama Linga Reddy Maruri 👋
          </p>

          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
            <h1
              className="
                text-5xl
                md:text-6xl
                lg:text-7xl
                font-bold
                text-foreground
                whitespace-nowrap
                text-center
              "
              role="banner"
            >
              AI Engineer & Software Developer
            </h1>
          </div>
        </div>


        <div className="flex justify-center mb-12 animate-fade-in">
          <div
            className="
              w-56 h-56 rounded-full
              flex items-center justify-center
              bg-muted
              dark:bg-muted
              shadow-xl
            "
          >
            <div
              className="
                w-48 h-48 rounded-full
                bg-white
                flex items-center justify-center
                cursor-pointer hover:scale-105 transition-transform
              "
              onDoubleClick={() => navigate('/profile')}
            >
              <img
                src={avatar}
                alt="Sai Ram Avatar - Professional headshot of Sai Rama Linga Reddy Maruri"
                className="w-48 h-48 object-cover rounded-full cursor-pointer hover:scale-105 transition-transform"
                onDoubleClick={() => navigate('/profile')}
              />
            </div>
          </div>
        </div>


        <div className="mb-12 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto" role="search">
            <Input
              type="text"
              placeholder={placeholderText}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 px-6 text-lg rounded-full border-2 border-border focus:border-accent transition-colors pr-14"
              aria-label="Search or ask questions about Sai Ram's portfolio"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Type your question and press enter to start a conversation with the AI assistant
            </div>
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 w-10 h-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
              aria-label="Submit search query"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </Button>
          </form>
        </div>

        {/* Achievement Stats Bar */}
        <div className="mb-8 animate-fade-in overflow-x-auto pt-24 -mt-24 px-4">
          <div className="max-w-5xl mx-auto bg-card/80 backdrop-blur-md border-2 border-border rounded-full px-6 py-3" role="region" aria-label="Coding achievements and statistics">
            <div className="flex items-center justify-center gap-2 text-sm whitespace-nowrap">
              <a
                href="https://leetcode.com/u/programmer3824/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent hover:scale-105 transition-all duration-200"
              >
                <span className="text-foreground">LEETCODE: GUARDIAN (2400+)</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://www.codechef.com/users/sairam2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent hover:scale-105 transition-all duration-200"
              >
                <span className="text-foreground">CODECHEF: 3★ (1600+)</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer hover:text-accent hover:scale-105 transition-all duration-200">
                  <span className="text-foreground">1000+ PROBLEMS SOLVED</span>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl z-[100] whitespace-nowrap">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45"></div>
                  <a
                    href="https://leetcode.com/u/sairam3824/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 hover:bg-accent/10 rounded text-foreground hover:text-accent transition-colors text-sm font-medium"
                  >
                    🏆 LeetCode Profile
                  </a>
                  <a
                    href="https://www.codechef.com/users/sairam2004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 hover:bg-accent/10 rounded text-foreground hover:text-accent transition-colors text-sm font-medium"
                  >
                    ⭐ CodeChef Profile
                  </a>
                </div>
              </div>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://codolio.com/profile/sairam3824"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent hover:scale-105 transition-all duration-200"
              >
                <span className="text-foreground">CODING PROFILES</span>
              </a>
            </div>
          </div>
        </div>

        <nav className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16 animate-fade-in" role="navigation" aria-label="Main navigation menu">
          {navigationItems.map((item) => (
            <NavigationCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                if (item.id === "resume") {
                  window.open("/Sai_Ram_Maruri_Resume_2025.pdf", "_blank");
                } else if (item.id === "me") {
                  navigate("/about");
                } else {
                  const routeMap = {
                    projects: "/projects",
                    skills: "/skills",
                    education: "/education",
                    blog: "/blogs",
                    certification: "/certifications",
                    contact: "/contact"
                  };
                  const route = routeMap[item.id as keyof typeof routeMap];
                  if (route) {
                    navigate(route);
                  }
                }
              }}
              isActive={activeSection === item.id}
              aria-label={`Navigate to ${item.label} section`}
            />
          ))}
        </nav>

        <main ref={contentRef} className="max-w-3xl mx-auto px-4" role="main" aria-live="polite">
          {activeSection ? (
            renderSection()
          ) : null}
        </main>

        {!activeSection && (
          <div className="fixed bottom-[-40px] md:bottom-[-60px] left-0 right-0 text-center text-[150px] md:text-[250px] font-extrabold text-muted/25 select-none pointer-events-none -z-10">
            SAIRAM
          </div>
        )}

        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          initialMessage={initialChatMessage}
        />
      </div>

      <footer className="w-full py-6 border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Sai Rama Linga Reddy Maruri. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
