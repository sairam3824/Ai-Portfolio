import { useEffect } from "react";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { SEO, RouteLoadingBar } from "@/shared/components";
import Index from "./Index";
import { AboutPage } from "@/features/about";
import { ProjectsPage } from "@/features/projects";
import { SkillsPage } from "@/features/skills";
import { EducationPage } from "@/features/education";
import { BlogsPage, BlogPostPage } from "@/features/blog";
import { CertificationsPage } from "@/features/certifications";
import { ContactPage } from "@/features/contact";
import { AdminLogin, AdminDashboard } from "@/features/admin";
import { ProfilePage, BadgesPage } from "@/features/profile";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import CodingRedirect from "./CodingRedirect";

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
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
