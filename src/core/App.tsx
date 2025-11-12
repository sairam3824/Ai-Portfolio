import { Toaster } from "@/shared/ui/toaster";
import { Toaster as Sonner } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SEO, RouteLoadingBar } from "@/shared/components";
import Index from "./Index";
import { AboutPage } from "@/features/about";
import { ProjectsPage } from "@/features/projects";
import { SkillsPage } from "@/features/skills";
import { EducationPage } from "@/features/education";
import { BlogsPage } from "@/features/blog";
import { CertificationsPage } from "@/features/certifications";
import { ContactPage } from "@/features/contact";
import NotFound from "./NotFound";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SEO />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteLoadingBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
