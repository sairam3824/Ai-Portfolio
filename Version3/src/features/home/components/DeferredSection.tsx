import { Suspense, useEffect, useRef, useState, type ComponentType } from "react";

const SectionFallback = () => (
    <div className="mt-20 animate-pulse rounded-[2.4rem] border border-[#e3dccf] bg-[#fffdf8] p-8 shadow-[0_20px_60px_rgba(61,52,36,0.05)] sm:p-10">
        <div className="h-12 w-24 rounded-full bg-[#ece7db]" />
        <div className="mt-6 h-10 w-72 max-w-full rounded-full bg-[#f1ebde]" />
        <div className="mt-4 h-5 w-[28rem] max-w-full rounded-full bg-[#f4efe4]" />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="h-48 rounded-[1.8rem] bg-[#f7f3eb]" />
            <div className="h-48 rounded-[1.8rem] bg-[#f4efe4]" />
        </div>
    </div>
);

type DeferredSectionProps = {
    component: ComponentType;
    rootMargin?: string;
};

export const DeferredSection = ({
    component: Component,
    rootMargin = "320px 0px",
}: DeferredSectionProps) => {
    const [shouldRender, setShouldRender] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shouldRender || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold: 0.01 },
        );

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [rootMargin, shouldRender]);

    return (
        <div ref={containerRef}>
            {shouldRender ? (
                <Suspense fallback={<SectionFallback />}>
                    <Component />
                </Suspense>
            ) : (
                <SectionFallback />
            )}
        </div>
    );
};
