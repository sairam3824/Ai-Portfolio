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

    // ═══════════════════════════════════════════════════════════════════════════
    // LIVE & SHIPPED — Production AI products with real users
    // ═══════════════════════════════════════════════════════════════════════════

    {
        title: "A2A Startup Builder",
        description:
            "Autonomous multi-agent system that takes a single startup idea and produces a complete startup blueprint — market research, competitor analysis, PRD, system architecture, MVP code, go-to-market strategy, and investor pitch deck. Built on Google's A2A protocol with 8 specialized agents (Perplexity, Claude, GPT-4.1, Gemini) and real-time SSE streaming.",
        tech: ["Python", "FastAPI", "A2A Protocol", "OpenRouter", "Claude", "GPT-4.1", "Gemini", "Perplexity", "SQLite", "SSE"],
        github: "https://github.com/sairam3824/A2A-startup-builder",
        category: "AI Agent",
        iconName: "Rocket",
        featured: true,
        tagline: "8-Agent A2A Pipeline • Startup Blueprint in Minutes",
    },
    {
        title: "Voice AI Agent",
        description:
            "A Next.js 14 starter kit for building conversational voice agents in the browser. Features voice input with Web Speech API, live waveform visualization, streaming LLM responses for low latency, and optional ElevenLabs TTS integration. Supports function calling tools (weather, web search, math) and persists conversation memory across sessions.",
        tech: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "Web Speech API", "Web Audio API", "Vercel AI SDK", "OpenAI", "Anthropic"],
        github: "https://github.com/sairam3824/Voice-Ai-Agent",
        category: "AI Agent",
        iconName: "Mic",
        featured: true,
        tagline: "Conversational Voice Interface • Low-Latency Streaming • Function Calling",
    },

    {
        title: "Prompt Injection Detector (Prompt Shield)",
        description:
            "A robust detection engine safeguarding LLM applications against prompt injections, jailbreaks, and system prompt leaks. Features rule-based heuristics, statistical analysis, and LLM-powered classification, complete with an interactive Next.js dashboard.",
        tech: ["Python", "Next.js", "OpenAI", "React", "pytest", "Tailwind CSS"],
        github: "https://github.com/sairam3824/Prompt-Injection-Detector",
        category: "AI Security",
        iconName: "Shield",
        featured: true,
        tagline: "LLM Security Engine • Rule-based + LLM Detection",
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
        title: "VidyAI: AI Test Generator",
        description:
            "EdTech SaaS platform generating curriculum-aligned MCQs from textbook PDFs using RAG and GPT-4o. Students select a chapter and receive a 10-question test with difficulty-distributed explanations in seconds.",
        tech: ["FastAPI", "Next.js", "pgvector", "OpenAI", "Supabase", "Celery", "Redis", "Docker"],
        github: "https://github.com/sairam3824/vidyai",
        link: "https://vidyaiedtech.saiii.in",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Built SaaS Product in 2 Days with Claude Code.",
    },
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
        tagline: "Automated AI Career Agent • Built with Antigravity under 10hrs.",
    },
    {
        title: "PrepLoop: Gamified Interview Prep",
        description:
            "Gamified daily interview preparation platform delivering curated questions with AI coaching (GPT-4o-mini), XP/leveling system (Beginner→Elite), daily streaks, topic mastery tracking, and achievement missions to build sharper interview skills through consistent practice.",
        tech: ["Next.js", "TypeScript", "React", "Supabase", "PostgreSQL", "OpenAI", "Vercel"],
        github: "https://github.com/sairam3824/preploop",
        link: "https://dailyquestion.saiii.in",
        category: "AI Platform",
        iconName: "Terminal",
        featured: true,
        tagline: "Gamified Interview Prep • AI Coaching & XP Progression",
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
        title: "BadmintonHub: Match Management SaaS",
        description:
            "Production-ready multi-tenant SaaS platform for managing badminton matches across teams. Features real-time scoring with official rules (first to 21, best of 3), AI-powered doubles pairing, player leaderboards, venue management, and mobile-first courtside UX.",
        tech: ["Next.js", "TypeScript", "Prisma", "SQLite", "NextAuth.js", "Recharts", "Tailwind CSS"],
        github: "https://github.com/sairam3824/Badminton-hub",
        link: "https://badminton.saiii.in",
        category: "Web Development",
        iconName: "Globe",
        featured: true,
        tagline: "Multi-Tenant Sports SaaS • Real-time Scoring & Leaderboards",
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
        title: "Minimalist Portfolio V3",
        description:
            "A modern, minimalist portfolio website emphasizing performance and clean design. Features route-based code splitting, lazy loading, glass morphism aesthetics, WCAG-compliant accessibility, and SEO optimization — achieving 95+ Lighthouse scores with a ~200KB gzipped bundle.",
        tech: ["React 18", "TypeScript", "Vite 5", "Tailwind CSS", "React Router DOM"],
        github: "https://github.com/sairam3824/portfolio-version3",
        link: "https://saiii.in",
        category: "Web Development",
        iconName: "Globe",
        featured: true,
        tagline: "Minimalist Design • 95+ Lighthouse • ~200KB Bundle",
    },
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
        title: "DevOps Agent Platform",
        description:
            "Self-hosted multi-agent system for infrastructure management, CI/CD optimization, and automated diagnostics. Features 4 autonomous agents — Infrastructure (Docker/K8s/Terraform generation), Pipeline (CI/CD analysis & optimization), Heal (CrashLoopBackOff/OOMKilled diagnosis with remediation), and Orchestrator (sequential & parallel workflows). Powered by Ollama (Llama3 + CodeLlama) with FAISS-based RAG. Zero cloud dependencies.",
        tech: ["Next.js 15", "FastAPI", "Python", "TypeScript", "Ollama", "FAISS", "Redis", "Docker", "Kubernetes", "SQLite"],
        github: "https://github.com/sairam3824/devops-agent-platform",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "4 Autonomous Agents • Self-Hosted DevOps • Zero Cloud Dependencies",
    },
    {
        title: "AI Competitive Analysis Agent",
        description:
            "Autonomous multi-agent system that researches and analyzes competitive landscapes in real time. Agents crawl company data, news, and market signals to generate structured competitor profiles, SWOT analyses, positioning maps, and strategic recommendations — delivered as interactive reports.",
        tech: ["Python", "LangGraph", "OpenAI", "FastAPI", "Next.js", "Tavily", "Docker"],
        github: "https://github.com/sairam3824/AI-Competitive-Analysis-Agent",
        link: "https://analysisagent.saiii.in",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Autonomous Competitive Intelligence • SWOT & Positioning Analysis",
    },
    {
        title: "A2A Task Marketplace",
        description:
            "One of the first open-source implementations of Google's Agent-to-Agent (A2A) protocol. A marketplace where specialized AI agents discover and collaborate on complex tasks via natural language decomposition. Features 6 agents (code, content, data, research, translation, design), dependency-aware execution, and real-time SSE progress tracking.",
        tech: ["Python", "FastAPI", "Next.js", "Redis", "OpenAI", "Anthropic", "Docker"],
        github: "https://github.com/sairam3824/a2a-task-marketplace",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "First Open-Source A2A Protocol • 6 Specialized Agents",
    },
    {
        title: "Guardian Agent Framework",
        description:
            "Python framework that wraps any AI agent with production-grade safety guardrails — compatible with LangChain, LangGraph, CrewAI, or custom callables. Features prompt injection detection, PII/secrets filtering, cost budget controls, hallucination reduction, human escalation workflows, and full observability via Prometheus metrics and a Streamlit dashboard.",
        tech: ["Python", "LangChain", "LangGraph", "CrewAI", "Redis", "Prometheus", "Docker", "Streamlit"],
        github: "https://github.com/sairam3824/Guardian-Agent-Framework",
        category: "AI Agent",
        iconName: "Shield",
        featured: true,
        tagline: "Production AI Safety Guardrails • 12 Configurable Rules • Prometheus Observability",
    },
    {
        title: "Agent Code Reviewer",
        description:
            "Multi-agent PR review system deploying 5 specialized AI agents in parallel: code quality, security vulnerability scanning, performance bottlenecks, test coverage, and an orchestrator that synthesizes results. Features LangGraph orchestration, SHA-256 caching, and GitHub PR commenting.",
        tech: ["Python", "LangGraph", "LangChain", "OpenAI", "PyGithub", "Click"],
        github: "https://github.com/sairam3824/agent-code-reviewer",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "5-Agent PR Review • LangGraph Orchestration • Security Scanning",
    },
    {
        title: "Agent Research Assistant",
        description:
            "Autonomous research assistant with FastAPI backend and Next.js frontend. Processes research questions through multi-step LangGraph agent workflows, delivering markdown reports, extracted findings, credibility-scored sources, and quality critiques — all streamed live via Server-Sent Events.",
        tech: ["FastAPI", "LangGraph", "LangChain", "Tavily", "Next.js", "OpenAI", "arXiv API"],
        github: "https://github.com/sairam3824/agent-research-assistant",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "Multi-Step Research Agent • LangGraph + SSE Streaming",
    },
    {
        title: "AI Resume Tailor",
        description:
            "AI-powered resume customization tool that analyzes skill gaps between your resume and a job description, rewrites bullet points to match JD keywords, scores your ATS fit, and generates a fully tailored resume — powered by GPT-4o-mini with spaCy NER and scikit-learn keyword extraction.",
        tech: ["Next.js", "TypeScript", "FastAPI", "OpenAI", "spaCy", "Scikit-learn", "Tailwind CSS", "shadcn/ui"],
        github: "https://github.com/sairam3824/AI-Resume-Tailor",
        category: "AI Agent",
        iconName: "Zap",
        featured: true,
        tagline: "ATS Scoring • Skill Gap Analysis • Auto-Tailored Resume",
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
        title: "Agentic RAG Engine",
        description:
            "Intelligent RAG system where an LLM agent autonomously decides when retrieval is needed, what to query, which sources to consult, and when to re-query. Implements a retrieve → evaluate → refine → re-retrieve production loop with multi-source retrieval (vector, web, SQL), relevance evaluation, and optional fact-checking — orchestrated by LangGraph.",
        tech: ["Python", "LangGraph", "FastAPI", "Chroma", "Tavily", "OpenAI", "Streamlit"],
        github: "https://github.com/sairam3824/Agentic-RAG-Engine",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Agentic Retrieve → Evaluate → Refine Loop • Multi-Source RAG",
    },
    {
        title: "Graph RAG",
        description:
            "Knowledge Graph-Enhanced RAG that combines vector search with graph traversal for deeper question answering. Extracts entities and relationships from documents, builds a NetworkX knowledge graph, and traverses entity connections to discover context that vector-only search misses — with interactive pyvis visualization.",
        tech: ["Python", "LangChain", "ChromaDB", "NetworkX", "OpenAI", "Streamlit", "pyvis"],
        github: "https://github.com/sairam3824/graph-rag",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Knowledge Graph + Vector Search • Entity Relationships • Graph Traversal",
    },
    {
        title: "Multi-Modal RAG Engine",
        description:
            "Production-ready RAG pipeline processing PDFs with text, images, tables, and charts. Uses GPT-4o Vision for visual understanding, generates semantic descriptions for indexing, and provides unified hybrid retrieval across all content modalities with page-level source attribution.",
        tech: ["Python", "FastAPI", "GPT-4o Vision", "Qdrant", "PyMuPDF", "Streamlit", "Docker"],
        github: "https://github.com/sairam3824/multi-modal-engine",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Multimodal PDF RAG • GPT-4o Vision • Hybrid Retrieval",
    },
    {
        title: "CacheForge: Cache-Augmented Generation",
        description:
            "Retrieval-free document Q&A system using Cache-Augmented Generation (CAG) as a faster alternative to RAG. Preloads the complete knowledge base into GPT-4o's KV cache, eliminating vector search latency entirely — achieving 50–200ms response times vs RAG's 200–600ms with 50% cost savings on cached tokens.",
        tech: ["Next.js", "TypeScript", "FastAPI", "Python", "OpenAI", "Redis", "SQLite", "Docker"],
        github: "https://github.com/sairam3824/CacheForge-CAG",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Cache-Augmented Generation • 50–200ms Latency • 50% Cost Savings vs RAG",
    },
    {
        title: "Codebase RAG Assistant",
        description:
            "RAG system for querying any GitHub repo or local codebase via natural language. Uses Tree-sitter for semantic code chunking (functions/classes), ChromaDB for vector storage, cross-encoder reranking, and dependency graphs for impact analysis. Supports 15+ languages with CLI and REST API interfaces.",
        tech: ["Python", "FastAPI", "ChromaDB", "OpenAI", "Tree-sitter", "Sentence-Transformers"],
        github: "https://github.com/sairam3824/codebase-rag-assistant",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Semantic Code Search • 15+ Languages • Dependency Graphs",
    },
    {
        title: "Legal Doc Analyzer (RAG)",
        description:
            "AI-powered contract review system with clause extraction, risk scoring, and document-grounded Q&A. Features hybrid retrieval (semantic 70% + BM25 30%), risk classification (Low/Medium/High), streaming chat, and markdown report export across PDF, DOCX, and TXT formats.",
        tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "pdf-parse", "Vercel AI SDK"],
        github: "https://github.com/sairam3824/legal-doc-analyzer-rag",
        category: "AI Search & RAG",
        iconName: "Search",
        featured: true,
        tagline: "Contract Review AI • Hybrid Retrieval • Risk Scoring",
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
    {
        title: "VoiceGen Pro",
        description:
            "Full-stack text-to-speech SaaS platform built with FastAPI and React. Supports multi-speaker scripts using voice tags, optional duration control, and downloadable WAV audio — powered by Coqui TTS with a modern glassmorphism UI.",
        tech: ["FastAPI", "React", "Vite", "Coqui TTS", "Python", "CSS"],
        github: "https://github.com/sairam3824/voicegen-pro",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Multi-Speaker TTS SaaS • Coqui TTS Engine",
    },
    {
        title: "AI Flashcard Generator",
        description:
            "Transform documents into study-ready flashcards with AI. Supports PDF/TXT/MD uploads, URL ingestion, and manual text entry. Configurable quantity, question types, difficulty, and focus areas — with an interactive study mode, keyboard shortcuts, and Anki CSV export.",
        tech: ["Next.js", "TypeScript", "OpenAI", "Tailwind CSS", "Framer Motion", "pdf-parse"],
        github: "https://github.com/sairam3824/ai-flashcard-generator",
        category: "AI Platform",
        iconName: "Brain",
        featured: true,
        tagline: "Multi-Source Ingestion • Anki Export • GPT-4o-mini",
    },
    {
        title: "APIProbe: AI Key Guard",
        description:
            "Professional dashboard for validating and stress-testing API keys across 9 AI providers (OpenAI, Anthropic, Gemini, Groq, Mistral, Perplexity, OpenRouter, DeepSeek, Together AI). All validation runs server-side via Next.js Server Actions — keys never leave the browser. Features model stress testing with latency benchmarks, searchable audit logs, JSON export, and 15-second timeout protection.",
        tech: ["Next.js 15", "React 19", "TypeScript", "Framer Motion", "Server Actions"],
        github: "https://github.com/sairam3824/APIProbe",
        category: "Infrastructure",
        iconName: "Key",
        featured: true,
        tagline: "9-Provider API Key Validator • Server-Side Security • Stress Testing",
    },
    {
        title: "LLM Token Debugger",
        description:
            "An interactive, client-side developer tool that visualizes exactly how LLMs and embedding models tokenize your text. Supports 50 models across 8 providers, featuring side-by-side comparison and real-time stats without sending any data to a backend.",
        tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "gpt-tokenizer"],
        github: "https://github.com/sairam3824/LLM-Token-Debugger",
        category: "Infrastructure",
        iconName: "Terminal",
        featured: true,
        tagline: "Interactive Tokenizer Visualizer • 50 Models • 8 Providers",
    },
    {
        title: "LLM Eval Bench",
        description:
            "Comprehensive benchmarking tool for comparing LLMs across OpenAI, Anthropic, Google, Mistral, and Ollama. Uses GPT-4o as LLM-as-Judge to score responses (1–10) on quality, latency, cost, and consistency. Features 70 built-in tests across 5 categories, radar/scatter chart visualizations, CLI + web dashboard, and zero-infrastructure SQLite storage.",
        tech: ["Next.js", "TypeScript", "SQLite", "OpenAI", "Anthropic", "Recharts", "Framer Motion"],
        github: "https://github.com/sairam3824/llm-eval-bench",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "LLM-as-Judge • 70 Built-in Tests • 5 Provider Comparison",
    },
    {
        title: "Agent Eval Framework",
        description:
            "Testing and evaluation framework for AI agents inspired by Anthropic's methodology. Supports LLM-as-Judge grading, deterministic validation, composite scoring, and parallel test suite execution with retry logic and JSON output for CI integration. Tracks performance over time in SQLite with a Next.js dashboard for regression detection.",
        tech: ["Python", "Next.js", "TypeScript", "SQLite", "OpenAI", "LangChain", "Pytest"],
        github: "https://github.com/sairam3824/Agent-Eval-Framework",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "AI Agent Testing • LLM-as-Judge • CI/CD Integration",
    },
    {
        title: "LLM Cost Calculator",
        description:
            "Web app for comparing AI API costs across 6+ providers (OpenAI, Anthropic, Google, Mistral, DeepSeek, open-source). Calculates per-request to yearly costs, supports use-case presets (chat, code, RAG, agents), batch discount toggles, Recharts visualizations, shareable URLs, and CSV export.",
        tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Recharts"],
        github: "https://github.com/sairam3824/llm-cost-calculator",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Multi-Provider Cost Compare • 6+ LLMs • CSV Export",
    },
    {
        title: "README Generator AI",
        description:
            "AI-powered tool generating high-quality README.md files from local codebases or GitHub repos. Offers web UI, CLI, and API interfaces with 3 README styles (minimal, detailed, enterprise), customizable sections, built-in caching, and support for JS/TS, Python, Go, Rust, and Java projects.",
        tech: ["Next.js", "TypeScript", "OpenAI", "GitHub API", "Node.js"],
        github: "https://github.com/sairam3824/readme-generator-ai",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Web + CLI + API • 3 README Styles • Multi-Language Support",
    },
    {
        title: "MCP Orchestrator",
        description:
            "The 'Nginx for MCP servers' — a single meta-endpoint that manages and routes requests across multiple downstream MCP servers. Features dynamic tool discovery with namespace prefixing (e.g., arxiv.search_papers), hot-reload config, load balancing with failover, health-aware routing, rate limiting, and CLI monitoring — enabling any MCP client to access dozens of tool servers through one gateway.",
        tech: ["TypeScript", "Node.js", "MCP SDK"],
        github: "https://github.com/sairam3824/MCP-Orchestrator",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "MCP Gateway • Dynamic Tool Discovery • Load Balancing & Failover",
    },
    {
        title: "MCP Server Template",
        description:
            "Production-ready TypeScript framework for building MCP servers. Includes strict typing, Zod input validation, Pino structured logging, token-bucket rate limiting, Jest tests, GitHub Actions CI/CD, multi-stage Docker builds, and an interactive setup script for rapid project initialization.",
        tech: ["TypeScript", "MCP SDK", "Zod", "Jest", "Docker", "GitHub Actions"],
        github: "https://github.com/sairam3824/mcp-server-template",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Production MCP Boilerplate • TypeScript + Docker + CI/CD",
    },
    {
        title: "arXiv MCP Server",
        description:
            "TypeScript MCP server giving LLMs full access to arXiv research papers. Supports flexible search (title, author, category, abstract), PDF text extraction with chunking, citation parsing, similar-paper discovery, author-focused lookups, and side-by-side paper comparison — with rate limiting and 30-min caching.",
        tech: ["TypeScript", "MCP SDK", "arXiv API", "pdf-parse", "Node.js"],
        github: "https://github.com/sairam3824/mcp-arxiv-server",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "LLM ↔ arXiv Bridge • PDF Extraction & Citation Parsing",
    },
    {
        title: "GitHub Analytics MCP",
        description:
            "MCP server enabling deep GitHub repository analysis via natural language. Covers commit patterns, contributor activity, PR velocity, issue response times, bus factor risk, technology stack detection, and repository comparison — powered by Octokit and surfaced through any MCP client.",
        tech: ["TypeScript", "MCP SDK", "Octokit", "GitHub API", "Node.js"],
        github: "https://github.com/sairam3824/github-analytics",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Natural Language Repo Insights • Bus Factor & PR Metrics",
    },
    {
        title: "LeetCode MCP Server",
        description:
            "TypeScript MCP server bridging LLMs with LeetCode via Model Context Protocol. Offers 10 tools: problem fetching, daily challenge, random selection with filters, progressive hint generation, approach validation, similar problem discovery, and AI-curated learning paths — with local practice history and intelligent caching.",
        tech: ["TypeScript", "MCP SDK", "LeetCode GraphQL", "Node.js"],
        github: "https://github.com/sairam3824/leetcode-server-mcp",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "LLM ↔ LeetCode Bridge • 10 MCP Tools",
    },
    {
        title: "AI Open Source License Picker",
        description:
            "AI-powered tool that recommends the ideal open-source license for any project. Analyzes project goals, use cases, and requirements through a conversational interface to suggest the best-fit license from a curated library — with plain-language explanations of key terms, permissions, and restrictions.",
        tech: ["Python", "OpenAI", "Next.js", "TypeScript", "Tailwind CSS"],
        github: "https://github.com/sairam3824/AI-Open-Source-License-Picker",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "AI License Recommender • Plain-Language Explanations",
    },
    {
        title: "AI Commit Messages",
        description:
            "CLI tool that generates conventional commit messages (feat, fix, chore, etc.) by analyzing staged git diffs with LLMs. Offers 3 interactive message choices, gitmoji support, auto language/framework detection, dry-run preview, and supports OpenAI, Claude, and Gemini providers.",
        tech: ["Node.js", "JavaScript", "OpenAI", "Anthropic Claude", "Google Gemini"],
        github: "https://github.com/sairam3824/ai-commit-messages",
        category: "Infrastructure",
        iconName: "Code2",
        featured: false,
        tagline: "Conventional Commits • Multi-LLM Provider CLI",
    },
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
        title: "Brain Tumor Classification (TDA & ML)",
        description:
            "ML pipeline classifying brain tumor MRI scans into 4 categories (Glioma, Meningioma, No Tumor, Pituitary). Uses PCA-based dimensionality reduction (62,500→1,031 features) with KNN achieving 93.75% accuracy across 7 classical ML models.",
        tech: ["Python", "Scikit-learn", "XGBoost", "LightGBM", "PCA", "KNN"],
        github: "https://github.com/sairam3824/Brain-Tumor-Classification-using-TDA-and-ML",
        category: "Computer Vision",
        iconName: "Cpu",
        featured: false,
        tagline: "4-Class MRI Diagnosis • 93.75% Accuracy",
    },
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
