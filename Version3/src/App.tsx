import { lazy, startTransition, Suspense, useEffect, useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom";
import { SiteLayout } from "@/features/site/SiteLayout";
import { getWritingPath, ROUTE_PATHS } from "@/data/siteRoutes";
import {
    loadAboutPage,
    loadAdminPage,
    loadBlogPostPage,
    loadBlogsPage,
    loadCertificationsPage,
    loadChatWidget,
    loadCodingProfilesPage,
    loadContactPage,
    loadEducationPage,
    loadHomePage,
    loadNotFoundPage,
    loadPrivacyPage,
    loadProjectsPage,
    loadResumePage,
    loadSkillsPage,
    loadTermsPage,
} from "@/app/routeLoaders";

const routerBasename =
    import.meta.env.BASE_URL === "/"
        ? "/"
        : import.meta.env.BASE_URL.replace(/\/$/, "");

const HomePage = lazy(loadHomePage);
const AboutPage = lazy(loadAboutPage);
const ProjectsPage = lazy(loadProjectsPage);
const SkillsPage = lazy(loadSkillsPage);
const EducationPage = lazy(loadEducationPage);
const ResumePage = lazy(loadResumePage);
const CodingProfilesPage = lazy(loadCodingProfilesPage);
const ContactPage = lazy(loadContactPage);
const CertificationsPage = lazy(loadCertificationsPage);
const BlogsPage = lazy(loadBlogsPage);
const BlogPostPage = lazy(loadBlogPostPage);
const AdminPage = lazy(loadAdminPage);
const PrivacyPage = lazy(loadPrivacyPage);
const TermsPage = lazy(loadTermsPage);
const NotFoundPage = lazy(loadNotFoundPage);
const ChatWidget = lazy(loadChatWidget);

const CHAT_WIDGET_IDLE_DELAY_MS = 2500;

const LegacyWritingRedirect = () => <Navigate to={ROUTE_PATHS.writing} replace />;

const LegacyWritingPostRedirect = () => {
    const { id } = useParams<{ id: string }>();
    return <Navigate to={getWritingPath(id)} replace />;
};

const DeferredChatWidget = () => {
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (shouldRender) return;

        const loadChatWidget = () => {
            startTransition(() => {
                setShouldRender(true);
            });
        };

        const interactionEvents: Array<keyof WindowEventMap> = ["pointerdown", "keydown", "touchstart"];
        const listenerOptions = { once: true, passive: true } as const;

        for (const eventName of interactionEvents) {
            window.addEventListener(eventName, loadChatWidget, listenerOptions);
        }

        const timerId = window.setTimeout(loadChatWidget, CHAT_WIDGET_IDLE_DELAY_MS);

        return () => {
            window.clearTimeout(timerId);
            for (const eventName of interactionEvents) {
                window.removeEventListener(eventName, loadChatWidget);
            }
        };
    }, [shouldRender]);

    if (!shouldRender) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <ChatWidget />
        </Suspense>
    );
};

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
                        <Route path={ROUTE_PATHS.writing} element={<BlogsPage />} />
                        <Route path={`${ROUTE_PATHS.writing}/:id`} element={<BlogPostPage />} />
                        <Route path={ROUTE_PATHS.legacyWriting} element={<LegacyWritingRedirect />} />
                        <Route path={`${ROUTE_PATHS.legacyWriting}/:id`} element={<LegacyWritingPostRedirect />} />
                        <Route path="/certifications" element={<CertificationsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path="/privacy" element={<PrivacyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
                <DeferredChatWidget />
            </Router>
        </HelmetProvider>
    );
}
