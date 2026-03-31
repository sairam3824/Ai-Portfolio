import { lazy } from "react";
import { ArrowRight, Award, FileText, Mail, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/shared/Seo";
import { useTypewriter } from "@/hooks/useTypewriter";
import { prefetchRoute } from "@/app/routeLoaders";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";
import { StatsSection } from "@/features/home/StatsSection";
import { DeferredSection } from "@/features/home/components/DeferredSection";
import { ROUTE_PATHS, WRITING_LABEL } from "@/data/siteRoutes";

const HomeFeaturedWorkSection = lazy(() => import("./sections/HomeFeaturedWorkSection"));
const HomeArsenalSection = lazy(() => import("./sections/HomeArsenalSection"));
const HomeCredentialsSection = lazy(() => import("./sections/HomeCredentialsSection"));
const HomeDispatchesSection = lazy(() => import("./sections/HomeDispatchesSection"));

export const HomePage = () => {
    const title = useTypewriter({
        texts: ["GenAI Engineer", "ML Engineer", "Software Developer", "Cloud Architect", "AI Agent Builder", "Vibe Coder", "Competitive Programmer", "Full Stack Developer"],
        speed: 80,
        deleteSpeed: 40,
        delayBetweenTexts: 2000,
    });

    const getPrefetchProps = (href: string) => ({
        onMouseEnter: () => prefetchRoute(href),
        onFocus: () => prefetchRoute(href),
        onTouchStart: () => prefetchRoute(href),
    });

    return (
        <>
            <Seo
                title={siteMetadata.defaultTitle}
                description={siteMetadata.defaultDescription}
                pageType="ProfilePage"
                keywords={siteMetadata.keywords}
            />

            <section className="pb-8">
                <div className="rounded-[2.8rem] border border-[#e3ded2] bg-[linear-gradient(180deg,#fcfaf5_0%,#f7f2e8_100%)] px-6 py-4 pb-8 shadow-[0_24px_80px_rgba(36,32,20,0.05)] sm:px-10 sm:py-8 sm:pb-12 lg:px-14 lg:py-10 lg:pb-16">
                    <p className="text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#868071]">Version 03 / Editorial Portfolio</p>

                    <div className="mt-12 max-w-[1040px]">
                        <h1 className="portfolio-sans max-w-[12ch] text-[clamp(2.8rem,9vw,8.4rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-[#11100c] sm:leading-[0.88]">
                            Build intelligence that ships.
                        </h1>
                        <p className="mt-10 max-w-[48ch] text-[clamp(1.1rem,1.8vw,1.45rem)] leading-[1.6] text-[#6f695c]">
                            I turn ambitious AI ideas into polished products, combining agent workflows, retrieval systems, cloud delivery, and user-first interface design into experiences that actually ship.
                        </p>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Link to="/projects" {...getPrefetchProps("/projects")} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#dbe7ae] px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Discover Work <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link to="/skills" {...getPrefetchProps("/skills")} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Skills <Zap className="h-4 w-4" />
                        </Link>
                        <Link to="/certifications" {...getPrefetchProps("/certifications")} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Certifications <Award className="h-4 w-4" />
                        </Link>
                        <Link to={ROUTE_PATHS.writing} {...getPrefetchProps(ROUTE_PATHS.writing)} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            {WRITING_LABEL} <FileText className="h-4 w-4" />
                        </Link>
                        <Link to="/contact" {...getPrefetchProps("/contact")} className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d7d0c4] bg-white px-7 py-4 text-base font-semibold text-[#17150f] transition-transform duration-200 hover:-translate-y-0.5 sm:w-auto">
                            Contact Me <Mail className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.82rem] font-semibold uppercase tracking-[0.22em] text-[#8b8578]">
                        <span>{profileDetails.availability}</span>
                        <span className="hidden h-1 w-1 rounded-full bg-[#b9b09e] sm:inline-block" />
                        <span className="inline-flex min-w-[23ch] text-[#4c74ff]">
                            {title || profileDetails.shortRole}
                            <span className="ml-0.5 animate-[blink_1s_step-end_infinite] text-[#4c74ff]">|</span>
                        </span>
                    </div>

                    <div className="mt-12 rounded-[2.2rem] border border-[#e1dbcf] bg-white/40 p-6 shadow-sm backdrop-blur-[2px] sm:p-8 lg:p-10">
                        <StatsSection />
                    </div>
                </div>

                <DeferredSection component={HomeFeaturedWorkSection} />
                <DeferredSection component={HomeArsenalSection} />
                <DeferredSection component={HomeCredentialsSection} />
                <DeferredSection component={HomeDispatchesSection} />

                <div className="mt-24 border-t border-[#e1dbcf] px-1 pt-14">
                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-xl">
                            <h2 className="portfolio-sans text-[clamp(2.2rem,4.5vw,3.6rem)] font-semibold tracking-[-0.06em] text-[#11100c]">
                                Ready to ship your next breakthrough?
                            </h2>
                            <p className="mt-4 text-[1.05rem] leading-8 text-[#6f695c]">
                                I specialize in turning complex AI concepts into production-grade software. Let&apos;s build something real.
                            </p>
                        </div>
                        <Link to="/contact" {...getPrefetchProps("/contact")} className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-[#1b2433] px-8 py-4 text-base font-semibold text-white shadow-[0_12px_40px_rgba(27,36,51,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_rgba(27,36,51,0.3)]">
                            Start a Conversation <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
