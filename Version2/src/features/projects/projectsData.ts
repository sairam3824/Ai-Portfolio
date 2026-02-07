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

/**
 * Standardized Project Categories:
 * - AI Platform: Enterprise AI/LLM platforms and orchestration
 * - AI Agent: Autonomous agents, career bots, assistants
 * - AI Search & RAG: Search engines, knowledge bases, RAG systems
 * - AI Automation: Test automation, workflow automation
 * - Computer Vision: Image classification, object detection, medical imaging
 * - Deep Learning: Neural networks, prediction models
 * - Machine Learning: Traditional ML, predictive analytics
 * - Web Development: Full-stack web applications, portfolios
 * - Enterprise Software: SaaS, management systems
 * - Infrastructure: MCP servers, microservices, DevOps
 *
 * Standardized Icons:
 * - Brain: AI platforms, LLM-based projects
 * - Search: RAG, search engines, knowledge bases
 * - Zap: Agents, automation, real-time systems
 * - Shield: Security, QA, testing
 * - Activity: Predictions, analytics, monitoring
 * - Cpu: Computer vision, image processing
 * - Terminal: Developer tools, CLI, interview platforms
 * - Rocket: Showcase projects, portfolios, aerospace
 * - Globe: Web apps, enterprise software
 * - Code2: Algorithms, infrastructure, protocols
 */

export const projectsData: ProjectData[] = [
    // ═══════════════════════════════════════════════════════════════════════════
    // FEATURED PROJECTS - AI Platforms & Flagship Projects
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "System Design Simulator",
        description:
            "Master-level platform for system design interviews. Features privacy-first local LLM integration via Ollama, RAG-powered assistants, and automated ATS resume analysis.",
        tech: ["Next.js", "Ollama", "Python", "Prisma", "FastAPI"],
        github: "https://github.com/sairam3824/system-design-simulator",
        link: "https://systemdesign.saiii.in",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Built with Claude Code under 6hrs.",
    },
    {
        title: "HireMind",
        description:
            "Automated job crawler and matching platform. Features intelligent resume matching, company insights, and real-time data integration to connect seekers with ideal roles.",
        tech: ["Next.js", "Supabase", "Python", "AWS EC2", "Docker"],
        github: "https://github.com/sairam3824/job-cloud",
        link: "https://hiremind.saiii.in",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Automated AI Career Agent • Build with Antigravity under 10hrs.",
    },
    {
        title: "AI Research Platform (Orravyn)",
        description:
            "Enterprise-grade collaborative platform for AI deployment. Enables scalable LLM experimentation and model fine-tuning within a production-ready environment.",
        tech: ["Node.js", "Python", "AWS", "n8n", "Docker", "LLMs"],
        github: "https://github.com/sairam3824/Orravyn-Research-Platform-with-LLM",
        link: "https://orravyn.cloud",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Enterprise-Grade LLM Orchestration Platform",
    },
    {
        title: "AI-Powered Portfolio",
        description:
            "Next-generation AI portfolio featuring intelligent chat assistance. Built with agentic search and dynamic AI-driven interactions for personalized user experiences.",
        tech: ["React", "TypeScript", "Tailwind CSS", "n8n", "AI APIs"],
        github: "https://github.com/sairam3824/Ai-Portfolio",
        link: "https://saiii.in",
        category: "Web Development",
        iconName: "Rocket",
        featured: true,
        tagline: "AI-Native Interaction",
    },
    {
        title: "Traffic Congestion Prediction",
        description:
            "Hybrid deep learning system (LSTM-CNN-GRU) for real-time traffic forecasting. Features Graph Neural Networks for spatial city-wide analysis and interactive Google Maps routing.",
        tech: ["PyTorch", "LSTM-CNN-GRU", "Next.js", "Google Maps API", "Flask"],
        github: "https://github.com/sairam3824/Traffic-prediction",
        link: "https://traffic.saiii.in",
        category: "Deep Learning",
        iconName: "Activity",
        featured: true,
        tagline: "LSTM-CNN-GRU Ensemble • 92% Prediction Accuracy",
    },
    {
        title: "AstraFlow: AI Intelligence Platform",
        description:
            "Comprehensive microservices-based AI platform featuring RAG knowledge bases, real-time stock market analysis with Kafka, and autonomous agent workflows.",
        tech: ["Microservices", "Kafka", "Redis", "ChromaDB", "Docker"],
        github: "https://github.com/sairam3824/astraflow",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Microservices Architecture • Real-time Intelligence",
    },
    {
        title: "ShopInsight: Shopify Analytics",
        description:
            "Multi-tenant analytics dashboard for Shopify merchants. Features secure OAuth integration, real-time webhook processing, and interactive revenue/product insights.",
        tech: ["Next.js", "Node.js", "PostgreSQL", "Prisma", "Shopify API"],
        github: "https://github.com/sairam3824/ShopInsight",
        category: "Enterprise Software",
        iconName: "Activity",
        featured: true,
        tagline: "Multi-Tenant Analytics • Real-time Data Sync",
    },
    {
        title: "Sentinel-AI: Autonomous QA",
        description:
            "AI-powered test automation system leveraging RAG to generate comprehensive test cases and executable Selenium scripts. Features semantic search with ChromaDB.",
        tech: ["FastAPI", "Selenium", "ChromaDB", "OpenAI", "Streamlit"],
        github: "https://github.com/sairam3824/sentinel-ai",
        category: "AI Automation",
        iconName: "Shield",
        featured: true,
        tagline: "Autonomous Testing • RAG-Powered QA Agent",
    },
    {
        title: "CareerBlueprint: AI Career Bot",
        description:
            "Intelligent career assistant using semantic skill analysis and GPT-powered matching. Features multi-source job fetching, skill gap identification, and application tracking.",
        tech: ["Flask", "Transformers", "OpenAI", "React", "Adzuna API"],
        github: "https://github.com/sairam3824/CareerBlueprint-",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Semantic Career Matching • Skill Gap Analysis",
    },
    {
        title: "Insight RAG - AI Search Engine",
        description:
            "Sophisticated knowledge-base search engine using OpenAI's Agent SDK and o1 models. Features intelligent PDF processing, vector-based semantic search, and reasoning-driven retrieval.",
        tech: ["FastAPI", "OpenAI", "Agent SDK", "Streamlit", "Node.js"],
        github: "https://github.com/sairam3824/Insight-RAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "o1 Reasoning • Agentic Knowledge Discovery",
    },
    {
        title: "AI Interview Platform",
        description:
            "AI-powered recruitment system using Django, Google Gemini, and OpenAI GPT. Features automated technical question generation, intelligent candidate evaluation, and resume parsing.",
        tech: ["Django", "Google Gemini", "OpenAI", "REST Framework", "Python"],
        github: "https://github.com/sairam3824/django-ai-interview-platform",
        category: "AI Platform",
        iconName: "Terminal",
        featured: true,
        tagline: "AI-Powered Hiring • Automated Evaluation",
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // COMPUTER VISION & MEDICAL AI
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Bone Fracture Classification",
        description:
            "Deep learning system using WideResNet to automate bone fracture detection from X-rays. Achieved 92% accuracy using transfer learning and optimized medical imaging pipelines.",
        tech: ["TensorFlow", "WideResNet", "Keras", "OpenCV", "Python"],
        github: "https://github.com/sairam3824/Bone-Fracture-Classification",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "Automated Medical Diagnostics • 92% Accuracy",
    },
    {
        title: "Lung Cancer Detection",
        description:
            "Advanced deep learning system using CSPDarkNet to classify lung CT scans into Benign, Malignant, and Normal cases. Features real-time predictions and Grad-CAM visual explanations.",
        tech: ["PyTorch", "CSPDarkNet", "Flask", "Grad-CAM", "Python"],
        github: "https://github.com/sairam3824/lungcancer",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "Automated CT Analysis • Grad-CAM Explainability",
    },
    {
        title: "NutriVision: AI NutriDecode",
        description:
            "AI-powered food recognition system classifying 101 dish types with MobileNetV2. Features real-time macronutrient analysis (calories, protein, carbs) and a modern Flask interface.",
        tech: ["TensorFlow", "MobileNetV2", "Flask", "Pandas", "Python"],
        github: "https://github.com/sairam3824/NutriVision",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "101 Food Classes • Real-time Nutritional Analysis",
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MACHINE LEARNING & PREDICTIVE ANALYTICS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Customer Churn Prediction",
        description:
            "Advanced ML system utilizing Random Forest and XGBoost to predict customer attrition. Reached 99.9% precision with high-performance production-ready classification models.",
        tech: ["XGBoost", "Random Forest", "Scikit-learn", "Pandas", "Python"],
        github: "https://github.com/sairam3824/Customer-Churn-Prediction",
        category: "Machine Learning",
        iconName: "Activity",
        featured: false,
        tagline: "High-Precision Predictive Engine • 99.9% Recall",
    },
    {
        title: "SpaceX ML: Landing Success",
        description:
            "Predictive ML system analyzing Falcon 9 launch data to forecast booster landing success. Achieved 91% accuracy using XGBoost and interactive geographic mapping with Folium.",
        tech: ["XGBoost", "Scikit-learn", "Plotly", "Folium", "Python"],
        github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
        category: "Machine Learning",
        iconName: "Rocket",
        featured: false,
        tagline: "91% Prediction Accuracy • Aerospace Analytics",
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // AI AGENTS & ASSISTANTS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Integrated AI Text Assistant",
        description:
            "Intelligent NLP assistant leveraging T5 and OpenAI for text generation, translation, and analysis. Features a robust FastAPI backend with Redis caching for performance.",
        tech: ["FastAPI", "T5", "OpenAI", "Redis", "Docker"],
        github: "https://github.com/sairam3824/Integrated-AI-Text-Assistant",
        category: "AI Agent",
        iconName: "Zap",
        featured: false,
        tagline: "T5-Powered NLP Engine • Generation & Analysis",
    },
    {
        title: "LangChain AI Agents",
        description:
            "Agentic AI application powered by Gemini-1.5-Flash and Wikipedia tools. Demonstrates intelligent chain architecture, tool selection, and complex reasoning workflows.",
        tech: ["LangChain", "Google Gemini", "Python", "Prompt Engineering"],
        github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
        category: "AI Agent",
        iconName: "Brain",
        featured: false,
        tagline: "Agentic Reasoning Framework • Gemini 1.5 Flash",
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // INFRASTRUCTURE & DEVELOPER TOOLS
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "MCP Server Architecture",
        description:
            "Multi-server implementation of Model Context Protocol (MCP) using Groq. Features standardized tool discovery, secure request routing, and real-time service integration.",
        tech: ["MCP", "Python", "Groq API", "LangChain", "FastMCP"],
        github: "https://github.com/sairam3824/Basic-MCP-Server-Practice",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Standardized AI Tool Protocols • Multi-Server Routing",
    },
    {
        title: "Algorithm Solutions",
        description:
            "Optimized solutions for Codeforces and competitive programming challenges. Features advanced data structures and algorithms for high-performance problem solving.",
        tech: ["C++", "Java", "Python", "Algorithms", "Data Structures"],
        github: "https://github.com/sairam3824/Competitive-Programming",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Codeforces Specialist • 1000+ Solutions",
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // WEB DEVELOPMENT & ENTERPRISE SOFTWARE
    // ═══════════════════════════════════════════════════════════════════════════
    {
        title: "Classic Personal Portfolio",
        description:
            "Clean, responsive personal portfolio built with vanilla web technologies. Features smooth Swiper.js animations, dark/light theme toggling, and optimized SEO structure.",
        tech: ["HTML5", "CSS3", "JavaScript", "MixItUp", "Swiper.js"],
        github: "https://github.com/sairam3824/Portfolio",
        link: "https://oldportfolio.saiii.in",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "Responsive Vanilla Stack • Theme Switching",
    },
    {
        title: "Interactive Quiz Platform",
        description:
            "Full-stack quiz engine featuring real-time scoring, timers, and category randomization. Developed with a focus on responsive UI and performance optimization.",
        tech: ["JavaScript", "HTML5", "CSS3", "Vite", "Web APIs"],
        github: "https://github.com/sairam3824/Quiz-Website",
        category: "Web Development",
        iconName: "Globe",
        featured: false,
        tagline: "EdTech Platform • Real-time Scoring",
    },
    {
        title: "School Management System",
        description:
            "Enterprise-scale platform for academic administration built with Python and MySQL. Features automated student/teacher record management and graded course tracking.",
        tech: ["Python", "Tkinter", "MySQL", "Database Design"],
        github: "https://github.com/sairam3824/School-Management-System",
        category: "Enterprise Software",
        iconName: "Globe",
        featured: false,
        tagline: "Academic ERP • MySQL Backend",
    },
];
