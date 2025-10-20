import { useState, useRef, useEffect } from "react";
import { User, FolderKanban, Layers, GraduationCap, Sparkles, Send, Mail, FileText } from "lucide-react";
import { NavigationCard } from "@/components/NavigationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { CertificationSection } from "@/components/sections/CertificationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CursorBlast } from "@/components/CursorBlast";
import { ChatDialog } from "@/components/ChatDialog";
import logo from "@/assets/logo.png";
import avatar from "@/assets/avatar.png";

type Section = "me" | "resume" | "projects" | "skills" | "education" | "certification" | "contact";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState<string>();

  const navigationItems = [
    { id: "me" as Section, icon: User, label: "Me" },
    { id: "resume" as Section, icon: FileText, label: "Resume" },
    { id: "projects" as Section, icon: FolderKanban, label: "Projects" },
    { id: "skills" as Section, icon: Layers, label: "Skills" },
    { id: "education" as Section, icon: GraduationCap, label: "Education" },
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
      case "certification":
        return <CertificationSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

  // ref to the content wrapper that will be scrolled into view
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Scroll into view when activeSection changes
  useEffect(() => {
    if (activeSection && contentRef.current) {
      // Smooth scroll to the content wrapper
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

      // Accessibility: focus first heading inside the section so keyboard/screen reader users know context
      // Use a small timeout to ensure the rendered section DOM is ready (usually not needed but safe)
      setTimeout(() => {
        if (!contentRef.current) return;
        const firstHeading = contentRef.current.querySelector("h1, h2, h3");
        if (firstHeading instanceof HTMLElement) {
          // make sure it's focusable
          if (!firstHeading.hasAttribute("tabindex")) firstHeading.setAttribute("tabindex", "-1");
          firstHeading.focus({ preventScroll: true });
        }
      }, 50);
    }
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CursorBlast />
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-6 mb-12 animate-fade-in">
          <p className="text-xl text-muted-foreground">Hey, I'm Sai Rama Linga Reddy Maruri 👋</p>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">AI & Software Developer</h1>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <img
            src={avatar}
            alt="Sai Ram Avatar"
            className="w-48 h-48 object-cover rounded-full shadow-2xl"
          />
        </div>

        {/* Search Box */}
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

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16 animate-fade-in">
          {navigationItems.map((item) => (
            <NavigationCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                if (item.id === "resume") {
                  window.open("/Sai_Ram_Maruri_Resume_2025.pdf", "_blank");
                } else {
                  setActiveSection(item.id as Section);
                }
              }}
              isActive={activeSection === item.id}
            />
          ))}
        </div>

        {/* Content Section - stable wrapper so we can reliably scroll to it */}
        <div ref={contentRef} className="max-w-3xl mx-auto px-4 pb-16">
          {activeSection ? (
            renderSection()
          ) : null}
        </div>

        {/* Watermark */}
        {!activeSection && (
          <div className="fixed bottom-[-40px] md:bottom-[-60px] left-0 right-0 text-center text-[150px] md:text-[250px] font-extrabold text-muted/25 select-none pointer-events-none -z-10">
            SAIRAM
          </div>
        )}

        {/* Chat Dialog */}
        <ChatDialog
          open={chatOpen}
          onOpenChange={setChatOpen}
          initialMessage={initialChatMessage}
        />
      </div>
    </div>
  );
};

export default Index;