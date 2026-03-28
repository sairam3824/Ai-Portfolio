import { useState, useEffect, useRef } from "react";
import { projectsData } from "../projects/projectsData";
import { codingProfilesData } from "../coding-profiles/codingProfilesData";
import { skillCategories } from "../skills/skillsData";
import { certifications } from "../certifications/certificationsData";
import { Link } from "react-router-dom";

const Counter = ({ value, duration = 1200 }: { value: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    // Extract numbers and non-numeric parts (like +, ★, Rating)
    const numericMatch = value.match(/\d+/);
    const numericValue = numericMatch ? parseInt(numericMatch[0]) : 0;
    const prefix = value.split(/\d+/)[0] || "";
    const suffix = value.split(/\d+/)[1] || "";

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let startTime: number | null = null;
                    
                    const animate = (timestamp: number) => {
                        if (!startTime) startTime = timestamp;
                        const progress = Math.min((timestamp - startTime) / duration, 1);
                        // Easing function: easeOutExpo
                        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                        setCount(Math.floor(easeProgress * numericValue));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) observer.observe(countRef.current);
        return () => observer.disconnect();
    }, [numericValue, duration, hasAnimated]);

    return (
        <span ref={countRef}>
            {prefix}{hasAnimated ? count : 0}{suffix}
        </span>
    );
};

export const StatsSection = () => {
    const totalProjects = projectsData.length;
    const liveSaasProjects = projectsData.filter(p => p.link).length;
    const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
    const leetCodeProfile = codingProfilesData.find(p => p.label === "LeetCode");
    const leetCodeRating = leetCodeProfile ? leetCodeProfile.stats.split("\u2022")[0].trim() : "2400+";
    const streakProfile = codingProfilesData.find(p => p.label === "LeetCode Streak");
    const totalProblems = streakProfile ? streakProfile.stats.replace(" problems solved", "") : "1000+";
    const codeChefProfile = codingProfilesData.find(p => p.label === "CodeChef");
    const codeChefRating = codeChefProfile ? codeChefProfile.stats.split("\u2022")[0].trim() : "3\u2605";
    const codeChefSub = codeChefProfile ? codeChefProfile.stats.split("\u2022")[1]?.trim() ?? "Rating" : "1600+ Rating";

    const stats = [
        { label: "LeetCode", value: leetCodeRating, sub: "Guardian", href: leetCodeProfile?.href, external: true },
        { label: "DSA Solved", value: totalProblems, sub: "Problems", href: streakProfile?.href, external: true },
        { label: "Projects", value: `${totalProjects}+`, sub: "Built", href: "/projects" },
        { label: "CodeChef", value: codeChefRating, sub: `${codeChefSub} Rating`, href: codeChefProfile?.href, external: true },
        { label: "Skills", value: `${totalSkills}+`, sub: "Mastered", href: "/skills" },
        { label: "Live SaaS", value: `${liveSaasProjects}+`, sub: "Deployed", href: "/projects" },
        { label: "Certs", value: `${certifications.length}+`, sub: "Earned", href: "/certifications" },
    ];

    return (
        <div className="relative py-2">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-12 sm:gap-x-12 lg:gap-x-16 xl:flex-nowrap xl:justify-between xl:gap-x-10">
                {stats.map((stat) => {
                    const content = (
                        <div className="flex flex-col items-center justify-center min-w-[120px] cursor-pointer group transition-transform duration-200 hover:-translate-y-1">
                            <p className="text-[clamp(1.6rem,4vw,2.4rem)] font-bold leading-none tracking-[-0.06em] text-[#11100c] transition-colors group-hover:text-[#4c74ff]">
                                <Counter value={stat.value} />
                            </p>
                            <p className="mt-2.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#8b8578] transition-colors group-hover:text-[#4c74ff]">
                                {stat.label}
                            </p>
                        </div>
                    );

                    if (stat.external && stat.href) {
                        return (
                            <a key={stat.label} href={stat.href} target="_blank" rel="noreferrer">
                                {content}
                            </a>
                        );
                    }

                    if (stat.href) {
                        return (
                            <Link key={stat.label} to={stat.href}>
                                {content}
                            </Link>
                        );
                    }

                    return (
                        <div key={stat.label}>
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};



