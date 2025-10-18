import { useState } from "react";
import { User, FolderKanban, Layers, GraduationCap, Sparkles, Send, Mail, Trophy } from "lucide-react";
import { NavigationCard } from "@/components/NavigationCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { FunSection } from "@/components/sections/FunSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CompetitiveProgrammingSection } from "@/components/sections/CompetitiveProgrammingSection";
import { CursorBlast } from "@/components/CursorBlast";
import { ChatDialog } from "@/components/ChatDialog";
import logo from "@/assets/logo.png";
import avatar from "@/assets/avatar.png";

type Section = "me" | "projects" | "skills" | "education" | "fun" | "competitive" | "contact";

const Index = () => {
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState<string>();

  const navigationItems = [
    { id: "me" as Section, icon: User, label: "Me" },
    { id: "projects" as Section, icon: FolderKanban, label: "Projects" },
    { id: "skills" as Section, icon: Layers, label: "Skills" },
    { id: "education" as Section, icon: GraduationCap, label: "Education" },
    { id: "fun" as Section, icon: Sparkles, label: "Certifications" },
    { id: "competitive" as Section, icon: Trophy, label: "Competitive" },
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
      case "fun":
        return <FunSection />;
      case "competitive":
        return <CompetitiveProgrammingSection />;
      case "contact":
        return <ContactSection />;
      default:
        return null;
    }
  };

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
          <p className="text-xl text-muted-foreground">Hey, Sai Rama Linga Reddy Maruri 👋</p>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground">Ai & Software Developer</h1>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <img
            src={avatar}
            alt="Raphael's Avatar"
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
              onClick={() => setActiveSection(item.id)}
              isActive={activeSection === item.id}
            />
          ))}
        </div>

        {/* Content Section */}
        {activeSection && (
          <div className="max-w-3xl mx-auto px-4 pb-16">
            {renderSection()}
          </div>
        )}

        {/* Watermark */}
        {!activeSection && (
          <div className="text-center text-[120px] md:text-[180px] font-bold text-muted/10 select-none pointer-events-none animate-fade-in">
            SAI RAM
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
