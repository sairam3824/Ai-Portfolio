import { ArrowUpRight, FileText, Github, Linkedin, Mail, Phone } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { portfolioContent } from "@/data/portfolioContent";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);

    return null;
};

const RouteContentFallback = () => (
    <div className="rounded-[2.4rem] border border-[#e3dccf] bg-[#fffdf8] px-6 py-12 shadow-[0_20px_60px_rgba(61,52,36,0.05)] sm:px-8 sm:py-14">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#8a8377]">
            Loading
        </p>
        <div className="mt-6 h-6 w-40 animate-pulse rounded-full bg-[#ece7db]" />
        <div className="mt-8 space-y-4">
            <div className="h-24 animate-pulse rounded-[1.8rem] bg-[#f4efe4]" />
            <div className="h-24 animate-pulse rounded-[1.8rem] bg-[#f7f3eb]" />
            <div className="h-24 animate-pulse rounded-[1.8rem] bg-[#f4efe4]" />
        </div>
    </div>
);

export const SiteLayout = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
    <div className="portfolio-page min-h-screen bg-[#f7f4ee] text-[#17140f]">
        <ScrollToTop />

        <header className="sticky top-0 z-50 pointer-events-none pt-2 sm:pt-4">
            <div className="mx-auto flex max-w-[1520px] flex-wrap items-center justify-between gap-3 px-4 sm:gap-4 sm:px-8">
                <NavLink
                    to="/"
                    className="pointer-events-auto inline-flex min-w-0 max-w-full items-center rounded-[1.1rem] border border-white/55 bg-white/38 px-4 py-2.5 backdrop-blur-xl shadow-[0_14px_30px_rgba(34,31,22,0.06)] sm:rounded-[1.35rem] sm:px-5 sm:py-3"
                >
                    <span className="portfolio-sans block truncate text-[1.15rem] font-semibold tracking-[-0.06em] text-[#13110c] sm:text-[1.7rem]">
                        {portfolioContent.profile.brand}
                    </span>
                </NavLink>

                <nav className={`pointer-events-auto order-3 w-full overflow-x-auto rounded-[1.15rem] border border-white/55 bg-white/38 px-2 py-1.5 text-[0.82rem] font-semibold text-[#13120d] backdrop-blur-xl shadow-[0_14px_30px_rgba(34,31,22,0.06)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] sm:order-2 sm:mx-auto sm:w-auto sm:max-w-[66vw] sm:rounded-[1.35rem] sm:px-3 sm:py-2 sm:text-sm ${
                    isScrolled ? "scale-[0.92] -translate-y-1 shadow-[0_10px_25px_rgba(34,31,22,0.04)]" : "scale-100 translate-y-0"
                }`}>
                    <div className="flex min-w-max items-center gap-1">
                        {portfolioContent.nav.map((item, index) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                style={{ animationDelay: `${index * 80}ms` }}
                                className={({ isActive }) =>
                                    `relative rounded-full border px-3.5 py-2 transition-all duration-300 group nav-item-animate sm:px-5 ${
                                        isActive 
                                            ? "bg-white/80 border-white/60 shadow-sm text-[#11100c] scale-[1.05]" 
                                            : "border-transparent hover:bg-white/40 text-[#6f695c] hover:text-[#11100c] hover:scale-[1.02]"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {item.label}
                                        {isActive && (
                                            <div className="absolute inset-0 rounded-full bg-[linear-gradient(120deg,rgba(255,255,255,0)_20%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0)_80%)] opacity-20 pointer-events-none" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                <a
                    href={portfolioContent.profile.resumeHref}
                    target="_blank"
                    rel="noreferrer"
                    className={`pointer-events-auto order-2 inline-flex h-[52px] items-center gap-0 overflow-hidden rounded-[1.1rem] bg-[#dbe7ae] text-[#17150f] shadow-[0_14px_30px_rgba(185,199,141,0.15)] transition-all duration-700 [transition-timing-function:cubic-bezier(0.19,1,0.22,1)] hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(185,199,141,0.25)] group sm:order-3 sm:w-auto sm:rounded-[1.35rem] ${
                        isScrolled ? "max-w-[52px] sm:hover:max-w-[220px]" : "max-w-[52px] sm:max-w-[220px]"
                    }`}
                >
                    <div className="flex w-[52px] shrink-0 items-center justify-center">
                        <FileText className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className={`flex items-center gap-2 pr-5 transition-all duration-500 ${
                        isScrolled 
                            ? "opacity-0 -translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0" 
                            : "opacity-0 -translate-x-2 sm:opacity-100 sm:translate-x-0"
                    }`}>
                        <span className="portfolio-sans whitespace-nowrap text-sm font-bold tracking-tight">
                            View Resume
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                </a>
            </div>
        </header>

        <main className="mx-auto flex max-w-[1520px] flex-col gap-12 px-4 pb-16 pt-2 sm:px-8 sm:pt-4 lg:gap-24 lg:pb-12 lg:pt-6">
            <Suspense fallback={<RouteContentFallback />}>
                <Outlet />
            </Suspense>
        </main>

        <footer className="mx-auto max-w-[1520px] px-4 pb-8 pt-2 sm:px-8">
            <div className="border-t border-[#ddd7cb] pt-10">
                <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.8fr]">
                    <div>
                        <p className="portfolio-sans text-[2rem] font-semibold tracking-[-0.06em] text-[#13110c] sm:text-[2.2rem]">
                            {portfolioContent.profile.brand}
                        </p>
                        <p className="mt-5 max-w-[36ch] text-[0.98rem] leading-7 text-[#6b6557]">
                            Product-minded GenAI engineer shipping agent workflows, retrieval systems, cloud deployments, and interfaces that feel intentional.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-[#7a735f]">
                            <span>{profileDetails.shortRole}</span>
                            <span className="hidden h-1 w-1 rounded-full bg-[#b9b09e] sm:inline-block" />
                            <span>{profileDetails.availability}</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#7f8760]">Explore</p>
                        <div className="mt-5 grid gap-3 text-[0.98rem] font-semibold text-[#17140f]">
                            {portfolioContent.footerLinks.map((item) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    className="transition-colors hover:text-[#5d7414]"
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                            <NavLink to="/certifications" className="transition-colors hover:text-[#5d7414]">
                                Certifications
                            </NavLink>
                            <NavLink to="/privacy" className="transition-colors hover:text-[#5d7414]">
                                Privacy Policy
                            </NavLink>
                            <NavLink to="/terms" className="transition-colors hover:text-[#5d7414]">
                                Terms & Conditions
                            </NavLink>
                        </div>
                    </div>

                    <div>
                        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#7f8760]">Connect</p>
                        <div className="mt-5 space-y-3">
                            <a
                                href={`mailto:${profileDetails.email}`}
                                className="flex items-center gap-3 text-[0.98rem] font-semibold text-[#17140f] transition-colors hover:text-[#5d7414]"
                            >
                                <Mail className="h-4 w-4" />
                                {profileDetails.email}
                            </a>
                            <a
                                href={`tel:${profileDetails.phone.replace(/\s+/g, "")}`}
                                className="flex items-center gap-3 text-[0.98rem] font-semibold text-[#17140f] transition-colors hover:text-[#5d7414]"
                            >
                                <Phone className="h-4 w-4" />
                                {profileDetails.phone}
                            </a>
                            <a
                                href={profileDetails.socials.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-[0.98rem] font-semibold text-[#17140f] transition-colors hover:text-[#5d7414]"
                            >
                                <Github className="h-4 w-4" />
                                github.com/sairam3824
                            </a>
                            <a
                                href={profileDetails.socials.linkedin}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-[0.98rem] font-semibold text-[#17140f] transition-colors hover:text-[#5d7414]"
                            >
                                <Linkedin className="h-4 w-4" />
                                linkedin.com/in/sairam-maruri
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-[#ddd7cb] pt-6 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#7f8760] sm:flex-row sm:items-center sm:justify-between">
                    <p>&copy; {siteMetadata.copyrightYear} Sai Rama Linga Reddy Maruri</p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full bg-[#1b2433] px-6 py-2.5 text-[0.82rem] font-semibold text-white normal-case tracking-wide shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:bg-[#253044]"
                    >
                        ← Switch to Version 2
                    </a>
                    <p>Built for shipping, not placeholders.</p>
                </div>
            </div>
        </footer>
    </div>
    );
};
