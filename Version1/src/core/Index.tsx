import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { User, FolderKanban, Layers, GraduationCap, BookOpen, Sparkles, Send, Mail, FileText } from "lucide-react";
import { NavigationCard, CursorBlast, ModeToggle, PageLoader, SEO } from "@/shared/components";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useTypewriter } from "@/shared/hooks/useTypewriter";
import { codingProfilesData } from "@/data/codingProfilesData";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import avatar from "@/assets/avatar.webp";

const AboutSection = lazy(() => import("@/features/about").then((m) => ({ default: m.AboutSection })));
const ProjectsSection = lazy(() => import("@/features/projects").then((m) => ({ default: m.ProjectsSection })));
const SkillsSection = lazy(() => import("@/features/skills").then((m) => ({ default: m.SkillsSection })));
const EducationSection = lazy(() => import("@/features/education").then((m) => ({ default: m.EducationSection })));
const BlogSection = lazy(() => import("@/features/blog").then((m) => ({ default: m.BlogSection })));
const CertificationSection = lazy(() => import("@/features/certifications").then((m) => ({ default: m.CertificationSection })));
const ContactSection = lazy(() => import("@/features/contact").then((m) => ({ default: m.ContactSection })));
const ChatDialog = lazy(() => import("@/features/chat").then((m) => ({ default: m.ChatDialog })));

type Section = "me" | "resume" | "projects" | "skills" | "education" | "blog" | "certification" | "contact";

const Index = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<Section | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatMessage, setInitialChatMessage] = useState<string>();
  const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
  const leetCodeStreak = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");
  const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");
  const codolioProfile = codingProfilesData.find((profile) => profile.label === "Codolio");

  // Typewriter effect for placeholder
  const placeholderText = useTypewriter({
    texts: [
      "Ask me anything...",
      "What are my skills?",
      "Tell me about my projects...",
      "What's my experience?",
      "How can I help you?",
      "Ask about my education...",
      `${profileDetails.shortRole} legacy portfolio`,
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
    <div className="min-h-screen bg-background relative overflow-x-hidden flex flex-col">
      <SEO
        title={`${profileDetails.name} | Legacy Portfolio`}
        description={`Legacy portfolio of ${profileDetails.name} featuring AI projects, technical sections, an interactive assistant, and key engineering highlights.`}
        keywords={[profileDetails.name, "Legacy Portfolio", "AI Engineer", "Machine Learning Engineer", "Software Developer"]}
      />
      <CursorBlast />
      <div className="absolute right-4 top-4 z-50">
        <ModeToggle />
      </div>
      <div className="container relative z-10 mx-auto flex-1 max-w-4xl px-4 py-6 sm:py-8">
        <div className="flex justify-center mb-8 animate-fade-in">
          <img
            src={avatar}
            alt="Logo"
            className="w-12 h-12 object-cover rounded-full"
            loading="eager"
            fetchPriority="high"
          />
        </div>

        <div className="mb-10 animate-fade-in space-y-5 text-center sm:mb-12 sm:space-y-6">
          <p className="text-lg sm:text-xl text-muted-foreground">
            Hey, I'm {profileDetails.name} 👋
          </p>

          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen px-4">
            <h1
              className="
                text-[clamp(2.5rem,10vw,4.5rem)]
                font-bold
                text-foreground
                whitespace-normal
                text-center
              "
              role="banner"
            >
              {profileDetails.jobTitle}
            </h1>
          </div>
        </div>


        <div className="mb-10 flex justify-center animate-fade-in sm:mb-12">
          <div
            className="
              h-40 w-40 sm:h-56 sm:w-56 rounded-full
              flex items-center justify-center
              bg-muted
              dark:bg-muted
              shadow-xl
            "
          >
            <div
              className="
                h-32 w-32 sm:h-48 sm:w-48 rounded-full
                bg-white
                flex items-center justify-center
                cursor-pointer hover:scale-105 transition-transform
              "
              onDoubleClick={() => navigate('/profile')}
            >
              <img
                src={avatar}
                alt={`${profileDetails.name} avatar`}
                className="h-32 w-32 sm:h-48 sm:w-48 rounded-full object-cover transition-transform hover:scale-105 cursor-pointer"
                onDoubleClick={() => navigate('/profile')}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>


        <div className="mb-10 animate-fade-in sm:mb-12">
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl mx-auto" role="search">
            <Input
              type="text"
              placeholder={placeholderText}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 w-full rounded-full border-2 border-border px-5 pr-14 text-base transition-colors focus:border-accent sm:h-14 sm:px-6 sm:text-lg"
              aria-label="Search or ask questions about Sai Ram's portfolio"
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              Type your question and press enter to start a conversation with the AI assistant
            </div>
            <Button
              type="submit"
              size="icon"
              className="absolute right-1.5 top-1.5 h-9 w-9 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 sm:right-2 sm:top-2 sm:h-10 sm:w-10"
              aria-label="Submit search query"
            >
              <Send className="w-5 h-5" aria-hidden="true" />
            </Button>
          </form>
        </div>

        {/* Achievement Stats Bar */}
        <div className="mb-8 animate-fade-in overflow-x-auto px-2 pt-20 -mt-20 sm:px-4 sm:pt-24 sm:-mt-24">
          <div className="mx-auto max-w-5xl rounded-[1.75rem] border-2 border-border bg-card/80 px-4 py-3 backdrop-blur-md sm:rounded-full sm:px-6" role="region" aria-label="Coding achievements and statistics">
            <div className="flex items-center justify-start gap-2 whitespace-nowrap text-xs sm:justify-center sm:text-sm">
              <a
                href={leetCodeProfile?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent hover:scale-105 transition-all duration-200"
              >
                <span className="text-foreground">LEETCODE: {leetCodeProfile?.stats ?? "2400+ • Guardian"}</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href={codeChefProfile?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent hover:scale-105 transition-all duration-200"
              >
                <span className="text-foreground">CODECHEF: {codeChefProfile?.stats ?? "3★ • 1600+"}</span>
              </a>
              <span className="text-muted-foreground">•</span>
              <div className="relative group">
                <div className="flex items-center gap-2 cursor-pointer hover:text-accent hover:scale-105 transition-all duration-200">
                  <span className="text-foreground">{leetCodeStreak?.stats?.toUpperCase() ?? "1000+ PROBLEMS SOLVED"}</span>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col gap-1 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl z-[100] whitespace-nowrap">
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-card border-r border-b border-border rotate-45"></div>
                  <a
                    href={profileDetails.socials.leetcodeSecondary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 hover:bg-accent/10 rounded text-foreground hover:text-accent transition-colors text-sm font-medium"
                  >
                    🏆 LeetCode Profile
                  </a>
                  <a
                    href={codeChefProfile?.href}
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
                href={codolioProfile?.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent hover:scale-105 transition-all duration-200"
              >
                <span className="text-foreground">CODING PROFILES</span>
              </a>
            </div>
          </div>
        </div>

        <nav className="mb-12 grid grid-cols-2 gap-3 animate-fade-in sm:grid-cols-3 sm:gap-4 md:mb-16 md:grid-cols-4" role="navigation" aria-label="Main navigation menu">
          {navigationItems.map((item) => (
            <NavigationCard
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => {
                if (item.id === "resume") {
                  window.open(profileDetails.resumeHref, "_blank");
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

        <main ref={contentRef} className="mx-auto max-w-3xl px-1 sm:px-4" role="main" aria-live="polite">
          {activeSection ? (
            <Suspense fallback={<PageLoader />}>
              {renderSection()}
            </Suspense>
          ) : null}
        </main>

        {!activeSection && (
          <div className="fixed bottom-[-40px] md:bottom-[-60px] left-0 right-0 text-center text-[150px] md:text-[250px] font-extrabold text-muted/25 select-none pointer-events-none -z-10">
            {profileDetails.brand.toUpperCase()}
          </div>
        )}

        <Suspense fallback={null}>
          <ChatDialog
            open={chatOpen}
            onOpenChange={setChatOpen}
            initialMessage={initialChatMessage}
          />
        </Suspense>
      </div>

      <footer className="w-full py-6 border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {siteMetadata.copyrightYear} {profileDetails.name}. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
