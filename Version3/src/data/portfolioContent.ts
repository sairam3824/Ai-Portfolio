export type NavItem = {
    label: string;
    href: string;
};

export type LinkItem = {
    label: string;
    href: string;
};

export type StrengthItem = {
    title: string;
    description: string;
};

export type FeaturedProject = {
    title: string;
    tagline: string;
    description: string;
    tech: string[];
    href?: string;
    github?: string;
};

export type ComparisonRow = {
    primary: string;
    secondary: string;
    tertiary: string;
};

export type ProfileHighlight = {
    number: string;
    title: string;
    detail: string;
    href: string;
};

import { profileDetails } from "@/data/siteMetadata";

export const portfolioContent = {
    profile: {
        name: profileDetails.name,
        brand: profileDetails.brand,
        role: profileDetails.role,
        summary: profileDetails.summary,
        location: profileDetails.location,
        email: profileDetails.email,
        resumeHref: profileDetails.resumeHref,
    },
    nav: [
        { label: "About", href: "/about" },
        { label: "Skills", href: "/skills" },
        { label: "Projects", href: "/projects" },
        { label: "Writings", href: "/blogs" },
        { label: "Contact", href: "/contact" },
    ] satisfies NavItem[],
    trustedStack: ["OpenAI", "LangGraph", "AWS", "Supabase", "Vercel", "Docker"],
    strengths: [
        {
            title: "Amplify Insights",
            description: "Turn dense technical work into sharp, understandable product stories without flattening the engineering depth.",
        },
        {
            title: "Control Your Build",
            description: "Move from product framing to UI design to backend delivery while keeping one clear point of view end to end.",
        },
        {
            title: "Remove Complexity",
            description: "Shape AI systems, retrieval flows, and cloud infrastructure into interfaces that still feel calm and readable.",
        },
        {
            title: "Visualize Growth",
            description: "Present projects, skills, and proof points in a way that feels editorial rather than like a list of boxes.",
        },
    ] satisfies StrengthItem[],
    featuredProjects: [
        {
            title: "Orravyn Research Platform",
            tagline: "Enterprise-grade LLM orchestration platform.",
            description: "Collaborative AI deployment platform for experimentation, model operations, and production-ready workflows.",
            tech: ["Node.js", "Python", "AWS", "n8n"],
            href: "https://orravyn.cloud",
            github: "https://github.com/sairam3824/Orravyn-Research-Platform-with-LLM",
        },
        {
            title: "VidyAI",
            tagline: "Curriculum-aware test generation from textbooks.",
            description: "EdTech SaaS using retrieval and GPT-powered reasoning to turn PDFs into chapter-level tests.",
            tech: ["FastAPI", "Next.js", "pgvector", "OpenAI"],
            href: "https://vidyaiedtech.saiii.in",
            github: "https://github.com/sairam3824/vidyai",
        },
        {
            title: "Prompt Shield",
            tagline: "Prompt-injection defense engine for LLM apps.",
            description: "Detection engine blending heuristics, statistical signals, and model-based classification.",
            tech: ["Python", "Next.js", "OpenAI", "React"],
            github: "https://github.com/sairam3824/Prompt-Injection-Detector",
        },
        {
            title: "System Design Simulator",
            tagline: "Interview preparation with local LLM privacy controls.",
            description: "Deeply interactive prep product that combines Ollama, RAG assistants, and resume analysis.",
            tech: ["Next.js", "Ollama", "Python", "FastAPI"],
            href: "https://systemdesign.saiii.in",
            github: "https://github.com/sairam3824/system-design-simulator",
        },
    ] satisfies FeaturedProject[],
    comparisonRows: [
        {
            primary: "AI-native product thinking",
            secondary: "Nice visuals, shallow technical framing",
            tertiary: "Static resume summary",
        },
        {
            primary: "Live products and shipped systems",
            secondary: "Placeholder case studies",
            tertiary: "No working demos",
        },
        {
            primary: "LLM, RAG, agents, and cloud depth",
            secondary: "Broad buzzwords only",
            tertiary: "Very limited technical context",
        },
        {
            primary: "Competitive programming proof",
            secondary: "No signal-based proof",
            tertiary: "No external validation",
        },
        {
            primary: "Writing plus certifications",
            secondary: "Occasional blog posts",
            tertiary: "No supporting proof",
        },
        {
            primary: "Direct, polished contact flow",
            secondary: "Buried CTA",
            tertiary: "Offline-only contact",
        },
    ] satisfies ComparisonRow[],
    profileHighlights: [
        {
            number: "01",
            title: "Guardian-level problem solving",
            detail: "LeetCode Guardian with 2500+ rating and strong contest credibility.",
            href: profileDetails.socials.leetcodePrimary,
        },
        {
            number: "02",
            title: "Daily technical reps",
            detail: "1000+ solved problems and consistent interview-prep discipline.",
            href: profileDetails.socials.leetcodeSecondary,
        },
        {
            number: "03",
            title: "Cross-domain credibility",
            detail: "Cloud, ML, and GenAI certifications supporting shipped product work.",
            href: profileDetails.socials.credly,
        },
    ] satisfies ProfileHighlight[],
    footerLinks: [
        { label: "About", href: "/about" },
        { label: "Skills", href: "/skills" },
        { label: "Projects", href: "/projects" },
        { label: "Writings", href: "/blogs" },
        { label: "Contact", href: "/contact" },
    ] satisfies LinkItem[],
} as const;
