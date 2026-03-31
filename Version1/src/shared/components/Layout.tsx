import { useState, lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import SectionNavigation from "./SectionNavigation";
import { ModeToggle } from "./mode-toggle";
import { SEO } from "./SEO";
import avatar from "@/assets/avatar.webp";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { ROUTE_PATHS, WRITING_LABEL } from "@/data/siteRoutes";

const ChatDialog = lazy(() => import("@/features/chat").then(m => ({ default: m.ChatDialog })));

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string | string[];
  robots?: string;
  type?: "website" | "article" | "profile";
  canonicalPath?: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  publishedTime?: string;
  modifiedTime?: string;
}

const routeSeo: Record<string, Omit<LayoutProps, "children">> = {
  "/about": {
    title: `About | ${profileDetails.name}`,
    description: `About ${profileDetails.name}: AI engineer, builder, and competitive programmer focused on practical ML, GenAI, and shipping real products.`,
    keywords: [`About ${profileDetails.name}`, "AI Engineer India", "GenAI Engineer", "Competitive Programmer"],
    pageType: "AboutPage",
  },
  "/projects": {
    title: `Projects | ${profileDetails.name}`,
    description: `Explore AI, ML, and software engineering projects by ${profileDetails.name} across SaaS, research platforms, automation, and full-stack development.`,
    keywords: [`${profileDetails.name} Projects`, "AI Portfolio Projects", "ML Projects", "Software Engineering Portfolio"],
    pageType: "CollectionPage",
  },
  "/skills": {
    title: `Skills | ${profileDetails.name}`,
    description: `Technical skills of ${profileDetails.name} across AI/ML, cloud, full-stack development, competitive programming, and developer tooling.`,
    keywords: [`${profileDetails.name} Skills`, "AI Skills", "Full Stack Skills", "Cloud Skills"],
    pageType: "CollectionPage",
  },
  "/education": {
    title: `Education | ${profileDetails.name}`,
    description: `Academic background of ${profileDetails.name} including B.Tech in Computer Science at VIT-AP and strong foundations in engineering and algorithms.`,
    keywords: [`${profileDetails.name} Education`, "VIT-AP", "Computer Science Student"],
    pageType: "ProfilePage",
  },
  [ROUTE_PATHS.writing]: {
    title: `${WRITING_LABEL} | ${profileDetails.name}`,
    description: `Technical writing by ${profileDetails.name} on AI, ML, cloud, software engineering, and competitive programming.`,
    keywords: [`${profileDetails.name} Writing`, "AI Writing", "Machine Learning Writing", "Software Engineering Writing"],
    pageType: "CollectionPage",
  },
  "/certifications": {
    title: `Certifications | ${profileDetails.name}`,
    description: `Professional certifications earned by ${profileDetails.name} across AI, cloud computing, data, and engineering domains.`,
    keywords: [`${profileDetails.name} Certifications`, "AI Certifications", "Cloud Certifications"],
    pageType: "CollectionPage",
  },
  "/contact": {
    title: `Contact | ${profileDetails.name}`,
    description: `Get in touch with ${profileDetails.name} for opportunities, collaboration, consulting, or engineering discussions.`,
    keywords: [`Contact ${profileDetails.name}`, "Hire AI Engineer", "Portfolio Contact"],
    pageType: "ContactPage",
  },
};

const Layout = ({ children, title, description, keywords, robots, type, canonicalPath, pageType, publishedTime, modifiedTime }: LayoutProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  const location = useLocation();
  const routeDefaults = routeSeo[location.pathname] ?? {};

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <SEO
        title={title ?? routeDefaults.title}
        description={description ?? routeDefaults.description}
        keywords={keywords ?? routeDefaults.keywords}
        robots={robots}
        type={type ?? routeDefaults.type}
        url={canonicalPath ?? routeDefaults.canonicalPath}
        pageType={pageType ?? routeDefaults.pageType}
        publishedTime={publishedTime}
        modifiedTime={modifiedTime}
      />
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <img
                src={avatar}
                alt="Logo"
                className="w-8 h-8 object-cover rounded-full"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <SectionNavigation />
            </div>
          </div>

          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-shrink-0 sm:justify-end">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatOpen(true)}
              className="flex flex-1 items-center justify-center gap-2 sm:flex-none"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Ask me anything</span>
              <span className="sm:hidden">Ask</span>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center justify-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
                <span className="sm:hidden">Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 pb-24 sm:py-8 sm:pb-8">
          {children}
        </div>
      </main>

      <footer className="w-full py-6 border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {siteMetadata.copyrightYear} {profileDetails.name}. All Rights Reserved.
          </p>
        </div>
      </footer>

      {chatOpen && (
        <Suspense fallback={null}>
          <ChatDialog
            open={chatOpen}
            onOpenChange={setChatOpen}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Layout;
