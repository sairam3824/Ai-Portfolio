import { Card } from "@/shared/ui/card";
import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "🧠 HireMind (Job Cloud)",
    description:
      "Automated job crawler and matching platform connecting job seekers with ideal roles. Features intelligent resume matching, company insights, and real-time data integration.",
    tech: ["Next.js", "Supabase", "Python", "AWS EC2", "Docker", "Redis"],
    github: "https://github.com/sairam3824/job-cloud",
    category: "AI Job Platform",
  },
  {
    title: "🚀 AI Research Platform (Orravyn.cloud)",
    description:
      "Enterprise-grade collaborative AI research and deployment platform enabling scalable LLM experimentation, model fine-tuning, and cloud-based ML workflows. Features automated deployment pipelines and real-time collaboration tools.",
    tech: ["Node.js", "Python", "AWS", "n8n", "Docker", "LLMs"],
    github: "https://github.com/Somisetti-Sridhar/research-portal-test-save",
    category: "AI Platform",
  },
  {
    title: "🤖 AI-Powered Portfolio (saiii.in)",
    description:
      "Next-generation AI-integrated portfolio featuring intelligent chat assistance, automated content generation, and dynamic AI-driven user interactions. Showcases cutting-edge AI/ML project implementations.",
    tech: ["React", "TypeScript", "Tailwind CSS", "n8n", "AI APIs"],
    github: "https://github.com/sairam3824/Ai-Portfolio",
    category: "AI Integration",
  },
  {
    title: "🏥 Medical AI: Bone Fracture Classification",
    description:
      "Advanced computer vision system using deep CNN architectures (WideResNet) to detect and classify bone fractures from X-ray images with 94% accuracy. Deployed for clinical decision support.",
    tech: ["PyTorch", "TensorFlow", "WideResNet", "OpenCV", "Medical AI"],
    github: "https://github.com/sairam3824/Bone-Fracture-Classification",
    category: "Computer Vision",
  },
  {
    title: "📊 ML-Powered Customer Churn Prediction",
    description:
      "Production-ready predictive analytics system using ensemble ML algorithms and advanced feature engineering to identify at-risk customers. Achieved 89% precision with real-time inference capabilities.",
    tech: ["Scikit-learn", "Pandas", "XGBoost", "Feature Engineering", "MLOps"],
    github: "https://github.com/sairam3824/Customer-Churn-Prediction",
    category: "Machine Learning",
  },
  {
    title: "🫁 Lung Cancer Detection System",
    description:
      "Deep learning-based medical imaging system for early detection and classification of lung cancer from CT scans. Utilizes advanced CNN architectures for accurate diagnosis and clinical decision support.",
    tech: ["Deep Learning", "Medical Imaging", "CNN", "Python", "Healthcare AI"],
    github: "https://github.com/sairam3824/lungcancer",
    category: "Medical AI",
  },
  {
    title: "🧠 Enterprise RAG System (unthinkable-RAG)",
    description:
      "Sophisticated Retrieval-Augmented Generation system combining vector databases, semantic search, and LLMs for intelligent document processing and knowledge extraction at enterprise scale.",
    tech: ["Python", "RAG", "Vector DB", "Embeddings"],
    github: "https://github.com/sairam3824/unthinkable-RAG",
    category: "NLP & RAG",
  },
  {
    title: "🚀 SpaceX ML: Landing Success Prediction",
    description:
      "Aerospace ML project analyzing SpaceX launch data to predict booster landing success using ensemble methods and time-series analysis. Features real-time prediction dashboard.",
    tech: ["Machine Learning", "Python", "Pandas", "Time Series", "Aerospace"],
    github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
    category: "Predictive Analytics",
  },
  {
    title: "🚦 Traffic Prediction System",
    description:
      "Machine learning system for predicting traffic patterns and congestion using historical data analysis. Features time-series forecasting, pattern recognition, and real-time traffic flow prediction for urban planning.",
    tech: ["Machine Learning", "Python", "Time Series", "Data Analysis", "Predictive Modeling"],
    github: "https://github.com/sairam3824/Traffic-prediction",
    category: "Predictive Analytics",
  },
  {
    title: "🤖 Integrated AI Text Assistant",
    description:
      "Multi-modal AI assistant leveraging state-of-the-art NLP models for advanced reasoning, document summarization, and intelligent automation. Features custom fine-tuned models and API integrations.",
    tech: ["LLMs", "React", "Node.js", "NLP", "Fine-tuning"],
    github: "https://github.com/sairam3824/Integrated-AI-Text-Assistant",
    category: "AI Assistant",
  },
  {
    title: "🔗 MCP Server Architecture (AI Agents)",
    description:
      "Foundational implementation of Model Context Protocol (MCP) servers for AI agent interoperability, enabling seamless communication between different AI systems and tools.",
    tech: ["MCP", "Python", "LangChain", "Groq API", "Agent Architecture"],
    github: "https://github.com/sairam3824/Basic-MCP-Server-Practice",
    category: "AI Infrastructure",
  },
  {
    title: "🍎 NutriVision: AI Nutrition Analyzer",
    description:
      "Computer vision-powered nutrition analysis system that identifies food items from images and provides detailed nutritional information, calorie counts, and dietary recommendations using deep learning.",
    tech: ["Computer Vision", "Deep Learning", "Nutrition AI", "Python", "Image Recognition"],
    github: "https://github.com/sairam3824/NutriVision",
    category: "Computer Vision",
  },
  {
    title: "🐾 LangChain AI Agent & Pet Namer",
    description:
      "Conversational AI agent built with LangChain framework, featuring creative pet naming, personality analysis, and multi-turn dialogue capabilities using advanced prompt engineering.",
    tech: ["LangChain", "Gemini API", "Prompt Engineering", "Conversational AI"],
    github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
    category: "Conversational AI",
  },
  {
    title: "🏆 Competitive Programming Solutions",
    description:
      "Comprehensive collection of algorithmic problem-solving solutions from competitive programming platforms. Features optimized implementations of data structures, algorithms, and problem-solving techniques with detailed explanations.",
    tech: ["C++", "Python", "Algorithms", "Data Structures", "Problem Solving"],
    github: "https://github.com/sairam3824/Competitive-Programming",
    category: "Algorithms",
  },
];

export const ProjectsSection = () => {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(projects);
  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      ref.current?.focus();
    }
    if (!open) {
      setQ("");
      setList(projects);
    }
  }, [open]);

  useEffect(() => {
    if (!q) {
      setList(projects);
      return;
    }
    const s = q.toLowerCase().trim();
    const f = projects.filter((p) => {
      if (p.title.toLowerCase().includes(s)) return true;
      if (p.category.toLowerCase().includes(s)) return true;
      if (p.description.toLowerCase().includes(s)) return true;
      if (p.tech.some((t) => t.toLowerCase().includes(s))) return true;
      return false;
    });
    setList(f);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="animate-fade-in space-y-8">
      {/* TITLE + SEARCH (side-by-side, search expands to LEFT) */}
      <div className="flex flex-col items-center space-y-4">

        {/* Title + Search Row */}
        <div className="flex items-center gap-4">

          {/* Heading */}
          <h2 className="text-3xl font-bold text-foreground select-none">
            AI &amp; ML Projects
          </h2>

          {/* Search box wrapper */}
          <div className="flex items-center">

            {/* Expanding search input (opens RIGHT) */}
            <div
              className={`overflow-hidden bg-background border border-border rounded-full transition-all duration-300 flex items-center
            ${open ? "w-64 px-3 py-2 shadow ml-2" : "w-0 px-0 py-0 ml-2"}`}
            >
              <input
                ref={ref}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-transparent outline-none text-sm"
              />
              {q && (
                <button onClick={() => setQ("")} className="ml-2">
                  ✖
                </button>
              )}
            </div>

            {/* Search Icon */}
            <button
              aria-label="open search"
              onClick={() => setOpen((v) => !v)}
              className="h-10 w-10 rounded-full flex items-center justify-center 
          bg-secondary/10 hover:bg-secondary/20 transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

          </div>
        </div>

        {/* Subtitle */}
        <p className="text-muted-foreground max-w-2xl text-center">
          Cutting-edge AI/ML projects spanning computer vision, NLP, RAG systems,
          and intelligent automation. Each project demonstrates practical AI
          applications with real-world impact.
        </p>
      </div>

      {/* Live Projects (insert below the subtitle paragraph) */}
      <div className="mt-6 flex flex-col items-center">
        <h4 className="text-lg font-semibold text-foreground mb-3">Live Projects</h4>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://saiii.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
          >
            AI Portfolio <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://orravyn.cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
          >
            Research Platform <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://sairam.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
          >
            Portfolio <ExternalLink className="w-4 h-4" />
          </a>

          <a
            href="https://job-cloud.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-card/40 hover:bg-card/60 transition text-base font-semibold"
          >
            HireMind <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>


      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((project, index) => (
          <Card
            key={index}
            className="
              relative p-6
              border-2 border-border
              transition-all duration-300
              hover:shadow-xl hover:scale-105
              group
              overflow-hidden
            "
          >
            <span
              className="
                absolute left-0 top-0 h-full w-1
                bg-blue-500
                scale-y-0
                origin-top
                transition-transform duration-300
                group-hover:scale-y-100
              "
            />
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>

            <div className="mb-3">
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                {project.category}
              </span>
            </div>

            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Project
              </a>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-16 pt-8 border-t border-border">
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Other Projects</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Django AI Interview Platform</h4>
            <p className="text-muted-foreground text-sm mb-3">
              AI-powered interview platform built with Django, featuring automated interview scheduling, candidate assessment, and intelligent feedback generation.
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Django</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Python</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">AI</span>
            </div>
            <a
              href="https://github.com/sairam3824/django-ai-interview-platform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Project
            </a>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Portfolio</h4>
            <p className="text-muted-foreground text-sm mb-3">
              Personal portfolio website showcasing projects and skills with interactive animations and responsive design.
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">HTML</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">CSS</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">JavaScript</span>
            </div>
            <a
              href="https://github.com/sairam3824/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Project
            </a>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">School Management System</h4>
            <p className="text-muted-foreground text-sm mb-3">
              Full-stack web application for managing students, teachers, and administration with secure role-based access controls.
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Python</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">MySQL</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Web App</span>
            </div>
            <a
              href="https://github.com/sairam3824/School-Management-System"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Project
            </a>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Quiz Website</h4>
            <p className="text-muted-foreground text-sm mb-3">
              Interactive quiz platform featuring category-based questions, timer integration, and real-time scoring system.
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">React</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">MongoDB</span>
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs">Node.js</span>
            </div>
            <a
              href="https://github.com/sairam3824/Quiz-Website"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium w-full justify-center"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Project
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};
