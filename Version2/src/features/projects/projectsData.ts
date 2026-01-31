import { ReactNode } from "react";

export interface Project {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    link?: string;
    category: string;
    icon: ReactNode;
    featured?: boolean;
}

// Icon creation helpers — icons are passed during component usage
// This file exports raw data without JSX; icons are mapped in components.
export interface ProjectData {
    title: string;
    description: string;
    tech: string[];
    github?: string;
    link?: string;
    category: string;
    iconName: string;
    featured?: boolean;
    tagline?: string;
}

export const projectsData: ProjectData[] = [
    {
        title: "HireMind (Job Cloud)",
        description:
            "Automated job crawler and matching platform connecting job seekers with ideal roles. Features intelligent resume matching, company insights, and real-time data integration.",
        tech: ["Next.js", "Supabase", "Python", "AWS EC2", "Docker"],
        github: "https://github.com/sairam3824/job-cloud",
        link: "https://hiremind.saiii.in",
        category: "AI Job Platform",
        iconName: "Zap",
        featured: true,
        tagline: "Vibecoded with Antigravity in 12 hrs",
    },
    {
        title: "AI Research Platform",
        description:
            "Enterprise-grade collaborative AI research and deployment platform enabling scalable LLM experimentation and model fine-tuning.",
        tech: ["Node.js", "Python", "AWS", "n8n", "Docker", "LLMs"],
        github: "https://github.com/Somisetti-Sridhar/research-portal-test-save",
        link: "https://orravyn.cloud",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Written research paper",
    },
    {
        title: "AI-Powered Portfolio",
        description:
            "Next-generation AI-integrated portfolio featuring intelligent chat assistance and dynamic AI-driven user interactions.",
        tech: ["React", "TypeScript", "Tailwind CSS", "n8n", "AI APIs"],
        github: "https://github.com/sairam3824/Ai-Portfolio",
        link: "https://saiii.in",
        category: "AI Integration",
        iconName: "Rocket",
        featured: true,
        tagline: "Vibecoded using Claude Code in 6 hrs",
    },
    {
        title: "Bone Fracture Classification",
        description:
            "Advanced computer vision system using Deep CNN architectures to detect and classify bone fractures with 94% accuracy.",
        tech: ["PyTorch", "WideResNet", "OpenCV", "Medical AI"],
        github: "https://github.com/sairam3824/Bone-Fracture-Classification",
        category: "Computer Vision",
        iconName: "Cpu",
    },
    {
        title: "Customer Churn Prediction",
        description:
            "Production-ready predictive analytics system using ensemble ML algorithms to identify at-risk customers with 89% precision.",
        tech: ["Scikit-learn", "Pandas", "XGBoost", "MLOps"],
        github: "https://github.com/sairam3824/Customer-Churn-Prediction",
        category: "Machine Learning",
        iconName: "Globe",
    },
    {
        title: "Lung Cancer Detection",
        description:
            "Deep learning-based medical imaging system for early detection and classification of lung cancer from CT scans.",
        tech: ["Deep Learning", "CNN", "Python", "Healthcare AI"],
        github: "https://github.com/sairam3824/lungcancer",
        category: "Medical AI",
        iconName: "Brain",
    },
    {
        title: "Enterprise RAG System",
        description:
            "Sophisticated Retrieval-Augmented Generation system combining vector databases and LLMs for intelligent document processing.",
        tech: ["Python", "RAG", "Vector DB", "Embeddings"],
        github: "https://github.com/sairam3824/unthinkable-RAG",
        category: "NLP & RAG",
        iconName: "Code2",
    },
    {
        title: "SpaceX ML: Landing Success",
        description:
            "Aerospace ML project analyzing SpaceX launch data to predict booster landing success using ensemble methods.",
        tech: ["Machine Learning", "Python", "Pandas", "Aerospace"],
        github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
        category: "Predictive Analytics",
        iconName: "Rocket",
    },
    {
        title: "Traffic Prediction System",
        description:
            "Machine learning system for predicting traffic patterns and congestion using historical data analysis and forecasting.",
        tech: ["Machine Learning", "Python", "Time Series", "Data Analysis"],
        github: "https://github.com/sairam3824/Traffic-prediction",
        category: "Predictive Analytics",
        iconName: "Globe",
    },
    {
        title: "Integrated AI Text Assistant",
        description:
            "Multi-modal AI assistant leveraging state-of-the-art NLP models for advanced reasoning and intelligent automation.",
        tech: ["LLMs", "React", "Node.js", "Fine-tuning"],
        github: "https://github.com/sairam3824/Integrated-AI-Text-Assistant",
        category: "AI Assistant",
        iconName: "Terminal",
    },
    {
        title: "MCP Server Architecture",
        description:
            "Foundational implementation of Model Context Protocol (MCP) servers for AI agent interoperability and communication.",
        tech: ["MCP", "Python", "LangChain", "Agent Architecture"],
        github: "https://github.com/sairam3824/Basic-MCP-Server-Practice",
        category: "AI Infrastructure",
        iconName: "Code2",
    },
    {
        title: "NutriVision: AI Analyzer",
        description:
            "Computer vision-powered nutrition system that identifies food items from images and provides detailed nutritional info.",
        tech: ["Computer Vision", "Deep Learning", "Python"],
        github: "https://github.com/sairam3824/NutriVision",
        category: "Computer Vision",
        iconName: "Cpu",
    },
    {
        title: "LangChain AI Agents",
        description:
            "Conversational AI agent built with LangChain, featuring creative pet naming and personality analysis.",
        tech: ["LangChain", "Gemini API", "Prompt Engineering"],
        github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
        category: "Conversational AI",
        iconName: "Brain",
    },
    {
        title: "Algorithm Solutions",
        description:
            "Comprehensive collection of algorithmic problem-solving solutions from competitive programming platforms.",
        tech: ["C++", "Python", "Algorithms", "Data Structures"],
        github: "https://github.com/sairam3824/Competitive-Programming",
        category: "Algorithms",
        iconName: "Code2",
    },
];
