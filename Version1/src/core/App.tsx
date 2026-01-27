import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SEO, RouteLoadingBar, PageLoader } from "@/shared/components";

// Eager load: Homepage (Index) - Critical for initial render
import Index from "./Index";

// Lazy load: Feature pages - Load on demand
const AboutPage = lazy(() => import("@/features/about").then(m => ({ default: m.AboutPage })));
const ProjectsPage = lazy(() => import("@/features/projects").then(m => ({ default: m.ProjectsPage })));
const SkillsPage = lazy(() => import("@/features/skills").then(m => ({ default: m.SkillsPage })));
const EducationPage = lazy(() => import("@/features/education").then(m => ({ default: m.EducationPage })));
const BlogsPage = lazy(() => import("@/features/blog").then(m => ({ default: m.BlogsPage })));
const BlogPostPage = lazy(() => import("@/features/blog").then(m => ({ default: m.BlogPostPage })));
const CertificationsPage = lazy(() => import("@/features/certifications").then(m => ({ default: m.CertificationsPage })));
const ContactPage = lazy(() => import("@/features/contact").then(m => ({ default: m.ContactPage })));

// Lazy load: Profile pages - Less frequently accessed
const ProfilePage = lazy(() => import("@/features/profile").then(m => ({ default: m.ProfilePage })));
const BadgesPage = lazy(() => import("@/features/profile").then(m => ({ default: m.BadgesPage })));

// Lazy load: Admin pages - Only for authenticated users
const AdminLogin = lazy(() => import("@/features/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("@/features/admin/AdminDashboard"));

// Lazy load: Utility pages - Rarely accessed
const NotFound = lazy(() => import("./NotFound"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./TermsAndConditions"));
const CodingRedirect = lazy(() => import("./CodingRedirect"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SEO />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <RouteLoadingBar />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/badges" element={<BadgesPage />} />
            <Route path="/coding" element={<CodingRedirect />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
