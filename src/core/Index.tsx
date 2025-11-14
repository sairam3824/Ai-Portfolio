import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, FolderKanban, Layers, GraduationCap, BookOpen, Sparkles, Send, Mail, FileText } from "lucide-react";
import { NavigationCard, CursorBlast } from "@/shared/components";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
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
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10 flex-1">
        <div className="flex justify-center mb-8 animate-fade-in">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <p className="text-xl text-muted-foreground">Hey, I'm Sai Rama Linga Reddy Maruri 👋</p>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">AI & Software Developer</h1>
        </div>

        <div className="flex justify-center mb-12 animate-fade-in">
          <img
            src={avatar}
            alt="Sai Ram Avatar"
            className="w-48 h-48 object-cover rounded-full shadow-2xl"
          />
        </div>

        <div className="mb-12 animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 px-6 text-lg rounded-full border-2 border-border focus:border-accent transition-colors pr-14"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-2 w-10 h-10 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16 animate-fade-in">
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
            />
          ))}
        </div>

        <div ref={contentRef} className="max-w-3xl mx-auto px-4">
          {activeSection ? (
            renderSection()
          ) : null}
        </div>

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