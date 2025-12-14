import { useState, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Home, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import SectionNavigation from "./SectionNavigation";
import { ModeToggle } from "./mode-toggle";
import logo from "@/assets/logo.png";

const ChatDialog = lazy(() => import("@/features/chat").then(m => ({ default: m.ChatDialog })));

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="w-8 h-8 object-contain"
                loading="eager"
                fetchPriority="high"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <SectionNavigation />
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <ModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Ask me anything</span>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      <footer className="w-full py-6 border-t border-border bg-background mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Sai Rama Linga Reddy Maruri. All Rights Reserved.
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