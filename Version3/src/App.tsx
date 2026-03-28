import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { SiteLayout } from "@/features/site/SiteLayout";

const routerBasename = import.meta.env.DEV ? "/" : "/v3";

const HomePage = lazy(() =>
    import("@/features/home/HomePage").then((module) => ({ default: module.HomePage })),
);
const AboutPage = lazy(() =>
    import("@/features/about/AboutPage").then((module) => ({ default: module.AboutPage })),
);
const ProjectsPage = lazy(() =>
    import("@/features/projects/ProjectsPage").then((module) => ({ default: module.ProjectsPage })),
);
const SkillsPage = lazy(() =>
    import("@/features/skills/SkillsPage").then((module) => ({ default: module.SkillsPage })),
);
const EducationPage = lazy(() => import("@/features/education/EducationPage"));
const ResumePage = lazy(() =>
    import("@/features/resume/ResumePage").then((module) => ({ default: module.ResumePage })),
);
const CodingProfilesPage = lazy(() =>
    import("@/features/coding-profiles/CodingProfilesPage").then((module) => ({ default: module.CodingProfilesPage })),
);
const ContactPage = lazy(() =>
    import("@/features/contact/ContactPage").then((module) => ({ default: module.ContactPage })),
);
const CertificationsPage = lazy(() => import("@/features/certifications/CertificationsPage"));
const BlogsPage = lazy(() => import("@/features/blog/BlogsPage"));
const BlogPostPage = lazy(() => import("@/features/blog/BlogPostPage"));
const AdminPage = lazy(() => import("@/features/admin/AdminPage"));
const PrivacyPage = lazy(() => import("@/features/legal/PrivacyPage"));
const TermsPage = lazy(() => import("@/features/legal/TermsPage"));
const NotFoundPage = lazy(() => import("@/NotFoundPage"));
const ChatWidget = lazy(() => import("../../shared-components/ChatWidget"));

export default function App() {
    return (
        <HelmetProvider>
            <Router basename={routerBasename}>
                <Routes>
                    <Route element={<SiteLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/projects" element={<ProjectsPage />} />
                        <Route path="/skills" element={<SkillsPage />} />
                        <Route path="/education" element={<EducationPage />} />
                        <Route path="/resume" element={<ResumePage />} />
                        <Route path="/coding-profiles" element={<CodingProfilesPage />} />
                        <Route path="/blogs" element={<BlogsPage />} />
                        <Route path="/blogs/:id" element={<BlogPostPage />} />
                        <Route path="/certifications" element={<CertificationsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
                <Suspense fallback={null}>
                    <ChatWidget
                        renderLink={({ to, className, children }) => (
                            <Link to={to} className={className}>{children}</Link>
                        )}
                    />
                </Suspense>
            </Router>
        </HelmetProvider>
    );
}
