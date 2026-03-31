type LazyModule<T> = Promise<{ default: T }>;

export const loadHomePage = () =>
    import("@/features/home/HomePage").then((module) => ({ default: module.HomePage }));

export const loadAboutPage = () =>
    import("@/features/about/AboutPage").then((module) => ({ default: module.AboutPage }));

export const loadProjectsPage = () =>
    import("@/features/projects/ProjectsPage").then((module) => ({ default: module.ProjectsPage }));

export const loadSkillsPage = () =>
    import("@/features/skills/SkillsPage").then((module) => ({ default: module.SkillsPage }));

export const loadEducationPage = () => import("@/features/education/EducationPage");

export const loadResumePage = () =>
    import("@/features/resume/ResumePage").then((module) => ({ default: module.ResumePage }));

export const loadCodingProfilesPage = () =>
    import("@/features/coding-profiles/CodingProfilesPage").then((module) => ({ default: module.CodingProfilesPage }));

export const loadContactPage = () =>
    import("@/features/contact/ContactPage").then((module) => ({ default: module.ContactPage }));

export const loadCertificationsPage = () => import("@/features/certifications/CertificationsPage");

export const loadWritingModule = () => import("@/features/writing");

export const loadBlogsPage = () =>
    loadWritingModule().then((module) => ({ default: module.BlogsPage }));

export const loadBlogPostPage = () =>
    loadWritingModule().then((module) => ({ default: module.BlogPostPage }));

export const loadAdminPage = () => import("@/features/admin/AdminPage");

export const loadPrivacyPage = () => import("@/features/legal/PrivacyPage");

export const loadTermsPage = () => import("@/features/legal/TermsPage");

export const loadNotFoundPage = () => import("@/NotFoundPage");

export const loadChatWidget = () => import("@/features/chat/ChatWidget");

export const loadMessageDialog = () =>
    import("@/features/contact/MessageDialog").then((module) => ({ default: module.MessageDialog }));

const prefetchers = new Map<string, () => Promise<unknown>>([
    ["/", loadHomePage],
    ["/about", loadAboutPage],
    ["/projects", loadProjectsPage],
    ["/skills", loadSkillsPage],
    ["/education", loadEducationPage],
    ["/resume", loadResumePage],
    ["/coding-profiles", loadCodingProfilesPage],
    ["/contact", loadContactPage],
    ["/certifications", loadCertificationsPage],
    ["/writing", loadBlogsPage],
    ["/privacy", loadPrivacyPage],
    ["/terms", loadTermsPage],
]);

const getNormalizedRouteKey = (href: string) => {
    if (!href) return null;
    if (/^https?:\/\//.test(href)) return null;
    if (href.startsWith("/writing/")) return "/writing";
    return href;
};

export const prefetchRoute = (href: string) => {
    const routeKey = getNormalizedRouteKey(href);
    if (!routeKey) return;

    const prefetch = prefetchers.get(routeKey);
    if (!prefetch) return;

    void prefetch();
};

export const schedulePrefetch = (href: string, delayMs = 120) => {
    if (typeof window === "undefined") return undefined;

    return window.setTimeout(() => {
        prefetchRoute(href);
    }, delayMs);
};

export type LazyRouteLoader<T> = () => LazyModule<T>;
