import { useEffect, useCallback, Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { HelmetProvider } from 'react-helmet-async';
import Home from './Home';
import ChatWidget from './features/home/ChatWidget';
import { getWritingPath, ROUTE_PATHS, WRITING_LABEL } from './data/siteRoutes';

// Route chunk loaders — stored for prefetching on hover
const routeLoaders = {
    about: () => import('./features/about'),
    education: () => import('./features/education'),
    contact: () => import('./features/contact'),
    certifications: () => import('./features/certifications'),
    skills: () => import('./features/skills'),
    writing: () => import('./features/writing'),
    projects: () => import('./features/projects'),
    resume: () => import('./features/resume'),
    codingProfiles: () => import('./features/coding-profiles'),
};

// Lazy load feature pages
const AboutPage = lazy(() => routeLoaders.about().then(module => ({ default: module.AboutPage })));
const EducationPage = lazy(() => routeLoaders.education().then(module => ({ default: module.EducationPage })));
const ContactPage = lazy(() => routeLoaders.contact().then(module => ({ default: module.ContactPage })));
const CertificationsPage = lazy(() => routeLoaders.certifications().then(module => ({ default: module.CertificationsPage })));
const SkillsPage = lazy(() => routeLoaders.skills().then(module => ({ default: module.SkillsPage })));
const BlogsPage = lazy(() => routeLoaders.writing().then(module => ({ default: module.BlogsPage })));
const BlogPostPage = lazy(() => routeLoaders.writing().then(module => ({ default: module.BlogPostPage })));
const ProjectsPage = lazy(() => routeLoaders.projects().then(module => ({ default: module.ProjectsPage })));
const ResumePage = lazy(() => routeLoaders.resume().then(module => ({ default: module.ResumePage })));
const AdminPage = lazy(() => import('./features/admin/AdminPage'));
const PrivacyPage = lazy(() => import('./features/legal').then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import('./features/legal').then(module => ({ default: module.TermsPage })));
const CodingProfilesPage = lazy(() => routeLoaders.codingProfiles().then(module => ({ default: module.CodingProfilesPage })));
const NotFoundPage = lazy(() => import('./NotFoundPage'));

// Map nav paths to route loaders for prefetching
const pathToLoader: Record<string, () => Promise<unknown>> = {
    '/about': routeLoaders.about,
    '/education': routeLoaders.education,
    '/contact': routeLoaders.contact,
    '/certifications': routeLoaders.certifications,
    '/skills': routeLoaders.skills,
    [ROUTE_PATHS.writing]: routeLoaders.writing,
    [ROUTE_PATHS.legacyWriting]: routeLoaders.writing,
    '/projects': routeLoaders.projects,
    '/resume': routeLoaders.resume,
    '/coding-profiles': routeLoaders.codingProfiles,
};

import {
    Home as HomeIcon,
    User,
    Code2,
    Folder,
    Mail,
    Award,
    FileText,
    BrainCircuit,
    Menu,
    Shield,
    CreditCard,
    Users,
    X
} from 'lucide-react';

const NAV_ITEMS = [
    { path: '/', label: 'Home', icon: HomeIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
    { path: '/about', label: 'About', icon: User, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { path: '/resume', label: 'Resume', icon: FileText, color: 'text-purple-600', bg: 'bg-purple-100' },
    { path: '/coding-profiles', label: 'CP Stats', icon: Users, color: 'text-pink-500', bg: 'bg-pink-100' },
    { path: '/projects', label: 'Projects', icon: Folder, color: 'text-blue-500', bg: 'bg-blue-100' },
    { path: '/skills', label: 'Skills', icon: Shield, color: 'text-orange-500', bg: 'bg-orange-100' },
    { path: '/education', label: 'Education', icon: CreditCard, color: 'text-yellow-600', bg: 'bg-yellow-100' },
    { path: ROUTE_PATHS.writing, label: WRITING_LABEL, icon: Code2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { path: '/certifications', label: 'Certifications', icon: Award, color: 'text-cyan-600', bg: 'bg-cyan-100' },
    { path: '/contact', label: 'Contact', icon: Mail, color: 'text-blue-600', bg: 'bg-blue-100' },
];

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }, [pathname]);

    return null;
};

const LoadingFallback = () => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in duration-700">
        <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative z-10 bg-white p-4 rounded-2xl shadow-xl shadow-blue-500/10 border border-blue-50">
                <BrainCircuit className="w-10 h-10 text-blue-600 animate-pulse" />
            </div>
            {/* Spinning Ring */}
            <div className="absolute -inset-2 border-2 border-blue-100 rounded-full animate-spin" style={{ animationDuration: '3s', borderTopColor: 'transparent', borderRightColor: 'transparent' }} />
        </div>

        <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-black text-gray-800 uppercase tracking-[0.2em]">Initializing</h3>
            <div className="flex gap-1.5">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
);

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    // Prefetch individual route on touch/hover instead of all at once
    const prefetchRoute = useCallback((path: string) => {
        const loader = pathToLoader[path];
        if (loader) loader();
    }, []);

    if (!isOpen) return null;

    return (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col animate-in fade-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
                <Link to="/" onClick={onClose} className="min-w-0 flex-1 text-base font-medium text-gray-800 sm:text-lg">
                    <span className="block truncate">Sai Rama Linga Reddy Maruri</span>
                </Link>
                <button onClick={onClose} className="shrink-0 rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 overflow-y-auto">
                {NAV_ITEMS.map((item, i) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        onTouchStart={() => prefetchRoute(item.path)}
                        onMouseEnter={() => prefetchRoute(item.path)}
                        className="flex items-center gap-3 px-4 py-3.5 transition-opacity active:opacity-50 sm:px-6 sm:py-4"
                    >
                        <span className="text-[10px] font-mono text-gray-400 w-4 shrink-0">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[1rem] font-semibold tracking-tight text-gray-800 sm:text-lg">{item.label}</span>
                    </Link>
                ))}
            </nav>

        </div>
    );
};

const VersionSwitch = () => (
    <div className="fixed inset-x-4 bottom-24 z-40 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:flex-row sm:items-center">
        <a
            href="/v1/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-gray-600 to-gray-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium group sm:px-5"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm sm:text-base">Classic Version (V1)</span>
        </a>
        <a
            href="/v3/"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-medium group sm:px-5"
        >
            <span className="text-sm sm:text-base">Latest Version (V3)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
    </div>
);

const ExternalRedirect = ({ url }: { url: string }) => {
    useEffect(() => {
        window.location.href = url;
    }, [url]);
    return null;
};

const LegacyWritingRedirect = () => <Navigate to={ROUTE_PATHS.writing} replace />;

const LegacyWritingPostRedirect = () => {
    const { id } = useParams<{ id: string }>();
    return <Navigate to={getWritingPath(id)} replace />;
};

function App() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen]);

    return (
        <HelmetProvider>
            <Router>
                <ScrollToTop />
                <div className="flex min-h-screen flex-col overflow-hidden bg-white font-sans text-gray-800 selection:bg-blue-100 selection:text-blue-900 lg:h-screen lg:flex-row">
                    <Sidebar />

                    {/* Main Content Wrapper - Scrolls independently */}
                    <div id="main-content" className="relative flex min-h-0 flex-1 flex-col overflow-y-auto transition-all duration-300 lg:h-full">
                        <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

                        <main className="mx-auto flex-1 w-full max-w-[1600px] px-4 pb-32 pt-4 sm:px-5 md:px-12 md:pb-12 md:pt-12">
                            <Suspense fallback={<LoadingFallback />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/coding-profiles" element={<CodingProfilesPage />} />
                                    <Route path="/about" element={<AboutPage />} />
                                    <Route path="/education" element={<EducationPage />} />
                                    <Route path="/skills" element={<SkillsPage />} />
                                    <Route path="/resume" element={<ResumePage />} />
                                    <Route path="/projects" element={<ProjectsPage />} />
                                    <Route path={ROUTE_PATHS.writing} element={<BlogsPage />} />
                                    <Route path={`${ROUTE_PATHS.writing}/:id`} element={<BlogPostPage />} />
                                    <Route path={ROUTE_PATHS.legacyWriting} element={<LegacyWritingRedirect />} />
                                    <Route path={`${ROUTE_PATHS.legacyWriting}/:id`} element={<LegacyWritingPostRedirect />} />
                                    <Route path="/certifications" element={<CertificationsPage />} />
                                    <Route path="/contact" element={<ContactPage />} />
                                    <Route path="/admin" element={<AdminPage />} />
                                    <Route path="/privacy" element={<PrivacyPage />} />
                                    <Route path="/terms" element={<TermsPage />} />
                                    <Route path="/linkedin" element={<ExternalRedirect url="https://www.linkedin.com/in/sairam-maruri/" />} />
                                    <Route path="/github" element={<ExternalRedirect url="https://github.com/sairam3824" />} />
                                    <Route path="/leetcode" element={<ExternalRedirect url="https://leetcode.com/u/sairam3824/" />} />
                                    <Route path="/leetcode-contests" element={<ExternalRedirect url="https://leetcode.com/u/programmer3824/" />} />
                                    <Route path="/leetcode-problems" element={<ExternalRedirect url="https://leetcode.com/u/sairam3824/" />} />
                                    <Route path="/codechef" element={<ExternalRedirect url="https://www.codechef.com/users/sairam2004" />} />
                                    <Route path="/codeforces" element={<ExternalRedirect url="https://codeforces.com/profile/sairam3824" />} />
                                    <Route path="/cv" element={<ExternalRedirect url="/Sai_Ram_Maruri_Resume_2025.pdf" />} />
                                    <Route path="/resumepdf" element={<ExternalRedirect url="/Sai_Ram_Maruri_Resume_2025.pdf" />} />
                                    <Route path="/mail" element={<ExternalRedirect url="mailto:sairam.maruri@gmail.com" />} />
                                    <Route path="*" element={<NotFoundPage />} />
                                </Routes>
                            </Suspense>
                        </main>

                        <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                    </div>
                </div>
                <ChatWidget />
                <VersionSwitch />
            </Router>
        </HelmetProvider>
    );
}

const Sidebar = () => {
    const location = useLocation();
    const prefetch = useCallback((path: string) => {
        const loader = pathToLoader[path];
        if (loader) loader();
    }, []);

    return (
        <nav className="hidden lg:flex flex-col w-60 h-full py-6 pl-3 pr-5 bg-white shrink-0 overflow-y-auto no-scrollbar border-r border-gray-50/50">
            <div className="pl-4 mb-8">
                <Link to="/" className="block">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Sai Rama Linga Reddy Maruri
                    </h1>
                    <p className="text-sm font-medium text-gray-500">sairam.maruri@gmail.com</p>
                    <p className="text-sm font-medium text-gray-500">+91 7893865644</p>
                </Link>
            </div>

            <div className="flex-1 space-y-1">
                {NAV_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onMouseEnter={() => prefetch(item.path)}
                            onFocus={() => prefetch(item.path)}
                            className={`flex items-center px-4 py-3.5 rounded-r-full transition-all duration-300 font-semibold text-[15px] ${isActive
                                ? 'bg-blue-50 text-blue-800'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-4 ${item.bg}`}>
                                <item.icon className={`w-[18px] h-[18px] ${item.color}`} />
                            </div>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>

            {/* Footer Links */}
            <div className="mt-auto px-8 pb-4 pt-4">
                <div className="flex gap-4 flex-wrap">
                    <Link to="/privacy" className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline">Privacy</Link>
                    <Link to="/terms" className="text-xs font-medium text-gray-400 hover:text-gray-600 hover:underline">Terms</Link>
                    <a href="/v1/" className="text-xs font-medium text-gray-400 hover:text-blue-600 hover:underline">Classic Version</a>
                </div>
            </div>
        </nav>
    );
};

const MobileHeader = ({ onMenuClick }: { onMenuClick: () => void }) => {
    return (
        <div className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-white/80 px-4 py-3 backdrop-blur-md lg:hidden">
            <Link to="/" className="min-w-0 flex-1">
                <span className="block truncate text-base font-medium text-gray-800 sm:text-lg">Sai Rama Linga Reddy Maruri</span>
            </Link>
            <div className="flex items-center gap-1">
                <a
                    href="/Sai_Ram_Maruri_Resume_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                    aria-label="Open resume PDF"
                >
                    <FileText className="w-5 h-5" />
                </a>
                <button onClick={onMenuClick} className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900" aria-label="Open navigation menu">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}


export default App;
