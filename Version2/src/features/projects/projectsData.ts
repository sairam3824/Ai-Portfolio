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
        title: "System Design Simulator",
        description:
            "Master-level platform for system design interviews. Features privacy-first local LLM integration via Ollama, RAG-powered assistants, and automated ATS resume analysis.",
        tech: ["Next.js", "Ollama", "Python", "Prisma", "FastAPI"],
        github: "https://github.com/sairam3824/system-design-simulator",
        link: "https://systemdesign.saiii.in",
        category: "AI Engineering",
        iconName: "Terminal",
        featured: true,
        tagline: "Privacy-First Engineering Platform • Vibe Coded in 6hrs using Claude Code",
    },
    {
        title: "HireMind",
        description:
            "Automated job crawler and matching platform. Features intelligent resume matching, company insights, and real-time data integration to connect seekers with ideal roles.",
        tech: ["Next.js", "Supabase", "Python", "AWS EC2", "Docker"],
        github: "https://github.com/sairam3824/job-cloud",
        link: "https://hiremind.saiii.in",
        category: "AI Job Platform",
        iconName: "Zap",
        featured: true,
        tagline: "Automated AI Career Agent Built in 12 hrs",
    },
    {
        title: "AI Research Platform",
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
        category: "AI Integration",
        iconName: "Rocket",
        featured: true,
        tagline: "AI-Native Interaction & Agentic Search",
    },
    {
        title: "Traffic Congestion Prediction",
        description:
            "Hybrid deep learning system (LSTM-CNN-GRU) for real-time traffic forecasting. Features Graph Neural Networks for spatial city-wide analysis and interactive Google Maps routing.",
        tech: [
            "LSTM-CNN-GRU",
            "PyTorch Geometric",
            "Next.js 16",
            "Google Maps API",
            "Flask",
        ],
        github: "https://github.com/sairam3824/Traffic-prediction",
        link: "https://traffic.saiii.in",
        category: "Deep Learning",
        iconName: "Activity",
        featured: true,
        tagline: "LSTM-CNN-GRU Ensemble • 92% Prediction Accuracy",
    },
    {
        title: "Classic Personal Portfolio",
        description:
            "Clean, responsive personal portfolio built with vanilla web technologies. Features smooth Swiper.js animations, dark/light theme toggling, and optimized SEO structure.",
        tech: ["HTML5", "CSS3", "JavaScript", "MixItUp"],
        github: "https://github.com/sairam3824/Portfolio",
        link: "https://oldportfolio.saiii.in",
        category: "Web Development",
        iconName: "Globe",
        featured: true,
        tagline: "Responsive Vanilla Stack",
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
        title: "Bone Fracture Classification",
        description:
            "Deep learning system using WideResNet to automate bone fracture detection from X-rays. Achieved 92% accuracy using transfer learning and optimized medical imaging pipelines.",
        tech: ["WideResNet", "TensorFlow", "Keras", "OpenCV", "Python"],
        github: "https://github.com/sairam3824/Bone-Fracture-Classification",
        category: "Computer Vision",
        iconName: "Cpu",
        tagline: "Automated Medical Diagnostics • 92% Accuracy",
    },
    {
        title: "Customer Churn Prediction",
        description:
            "Advanced ML system utilizing Random Forest and XGBoost to predict customer attrition. Reached 99.9% precision with high-performance production-ready classification models.",
        tech: ["XGBoost", "Random Forest", "Scikit-learn", "Pandas", "Python"],
        github: "https://github.com/sairam3824/Customer-Churn-Prediction",
        category: "Machine Learning",
        iconName: "Globe",
        tagline: "High-Precision Predictive Engine • 99.9% Recall",
    },
    {
        title: "ShopInsight: Shopify Analytics",
        description:
            "Multi-tenant analytics dashboard for Shopify merchants. Features secure OAuth integration, real-time webhook processing, and interactive revenue/product insights.",
        tech: ["Next.js 14", "Node.js", "PostgreSQL", "Prisma", "Shopify API"],
        github: "https://github.com/sairam3824/ShopInsight",
        category: "Enterprise SaaS",
        iconName: "Globe",
        featured: true,
        tagline: "Multi-Tenant Analytics • Real-time Data Sync",
    },
    {
        title: "Sentinel-AI: Autonomous QA",
        description:
            "AI-powered test automation system leveraging RAG to generate comprehensive test cases and executable Selenium scripts. Features semantic search with ChromaDB and multi-document ingestion.",
        tech: ["FastAPI", "Selenium", "ChromaDB", "GPT-3.5", "Streamlit"],
        github: "https://github.com/sairam3824/sentinel-ai",
        category: "AI Automation",
        iconName: "Shield",
        featured: true,
        tagline: "Autonomous Testing • RAG-Powered QA Agent",
    },
    {
        title: "CareerBlueprint: AI Career Bot",
        description:
            "Intelligent career assistant using semantic skill analysis and GPT-powered matching. Features multi-source job fetching, skill gap identification, and automated application tracking.",
        tech: ["Flask", "Transformers", "OpenAI", "React", "Adzuna API"],
        github: "https://github.com/sairam3824/CareerBlueprint-",
        category: "AI Career Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Semantic Career Matching • Skill Gap Analysis",
    },
    {
        title: "Insight RAG - AI Search Engine",
        description:
            "Sophisticated knowledge-base search engine using OpenAI's Agent SDK and o1 models. Features intelligent PDF processing, vector-based semantic search, and reasoning-driven context retrieval.",
        tech: ["FastAPI", "OpenAI o1", "Agent SDK", "Streamlit", "Node.js"],
        github: "https://github.com/sairam3824/Insight-RAG",
        category: "AI Integration",
        iconName: "Search",
        featured: true,
        tagline: "o1 Reasoning • Agentic Knowledge Discovery",
    },
    {
        title: "AI Interview Platform",
        description:
            "AI-powered recruitment system using Django and Google Gemini and OPENAI GPT. Features automated technical question generation, intelligent candidate evaluation, and resume parsing.",
        tech: ["Django", "Google Gemini", "OPENAI", "REST Framework", "PyPDF2", "Python"],
        github: "https://github.com/sairam3824/django-ai-interview-platform",
        category: "AI Recruitment",
        iconName: "Terminal",
        featured: true,
        tagline: "AI-Powered Hiring • Automated Evaluation",
    },
    {
        title: "Lung Cancer Detection",
        description:
            "Advanced DL system using CSPDarkNet architectures to classify lung CT scans into Benign, Malignant, and Normal cases. Features real-time predictions and visual explanations via Grad-CAM heatmaps.",
        tech: ["PyTorch", "CSPDarkNet", "Flask", "Grad-CAM", "Python"],
        github: "https://github.com/sairam3824/lungcancer",
        category: "Medical AI",
        iconName: "Brain",
        tagline: "Automated CT Analysis • CSPDarkNet Architectures",
    },
    {
        title: "SpaceX ML: Landing Success",
        description:
            "Predictive ML system analyzing Falcon 9 launch data to forecast booster landing success. Achieved 91% accuracy using XGBoost and interactive geographic mapping with Folium.",
        tech: ["XGBoost", "Python", "Plotly", "Folium", "Scikit-learn"],
        github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
        category: "Predictive Analytics",
        iconName: "Rocket",
        tagline: "91% Prediction Accuracy • Real-time Aerospace ML",
    },
    {
        title: "Integrated AI Text Assistant",
        description:
            "Intelligent NLP assistant leveraging T5 and OpenAI for text generation, translation, and analysis. Features a robust FastAPI backend with Redis caching.",
        tech: ["Python", "FastAPI", "T5", "Docker", "OpenAI", "Redis"],
        github: "https://github.com/sairam3824/Integrated-AI-Text-Assistant",
        category: "AI Assistant",
        iconName: "Terminal",
        tagline: "T5-Powered NLP Engine • Generation & Analysis",
    },
    {
        title: "MCP Server Architecture",
        description:
            "Multi-server implementation of Model Context Protocol (MCP) using Groq. Features standardized tool discovery, secure request routing, and real-time weather/math service integration.",
        tech: ["MCP", "Python", "Groq API", "LangChain", "FastMCP"],
        github: "https://github.com/sairam3824/Basic-MCP-Server-Practice",
        category: "AI Infrastructure",
        iconName: "Code2",
        tagline: "Standardized AI Tool Protocols • Multi-Server Routing",
    },
    {
        title: "NutriVision: AI NutriDecode",
        description:
            "AI-powered food recognition system classifying 101 dish types with MobileNetV2. Features real-time macronutrient analysis (calories, protein, carbs) and a modern Flask web interface.",
        tech: ["MobileNetV2", "TensorFlow", "Flask", "Pandas", "Python"],
        github: "https://github.com/sairam3824/NutriVision",
        category: "Computer Vision",
        iconName: "Cpu",
        tagline: "Nutritional Analysis for 101 Food Classes",
    },
    {
        title: "LangChain AI Agents",
        description:
            "Agentic AI application powered by Gemini-1.5-Flash and Wikipedia tools. Demonstrates intelligent chain architecture, tool selection, and complex reasoning workflows.",
        tech: ["LangChain", "Gemini 1.5", "Python", "Prompt Engineering"],
        github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
        category: "Conversational AI",
        iconName: "Brain",
        tagline: "Agentic Reasoning Framework • 1.5-Flash LLM",
    },
    {
        title: "School Management System",
        description:
            "Enterprise-scale platform for academic administration built with Python and MySQL. Features automated student/teacher record management and graded course tracking.",
        tech: ["Python", "Tkinter", "MySQL", "Database Design"],
        github: "https://github.com/sairam3824/School-Management-System",
        category: "Enterprise Software",
        iconName: "Globe",
        tagline: "Scalable Academic ERP • MySQL Backend",
    },
    {
        title: "Interactive Quiz Platform",
        description:
            "Full-stack quiz engine featuring real-time scoring, timers, and category randomization. Developed with a focus on responsive UI and performance optimization.",
        tech: ["JavaScript", "HTML5", "CSS3", "Vite", "Web APIs"],
        github: "https://github.com/sairam3824/Quiz-Website",
        category: "Web Development",
        iconName: "Zap",
        tagline: "Responsive EdTech Platform • Real-time Scoring",
    },
    {
        title: "Algorithm Solutions",
        description:
            "Optimized solutions for Codeforces and competitive programming. Features advanced data structures for high-performance algorithmic problem solving.",
        tech: ["C++", "Java", "Python", "Algorithms", "Data Structures"],
        github: "https://github.com/sairam3824/Competitive-Programming",
        category: "Algorithms",
        iconName: "Code2",
        tagline: "Codeforces Specialist • 1000+ Algorithmic Solutions",
    },
];
