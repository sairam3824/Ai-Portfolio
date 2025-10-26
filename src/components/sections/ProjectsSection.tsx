import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "🚀 AI Research Platform (Orravyn.cloud)",
    description:
      "Enterprise-grade collaborative AI research and deployment platform enabling scalable LLM experimentation, model fine-tuning, and cloud-based ML workflows. Features automated deployment pipelines and real-time collaboration tools.",
    tech: ["Node.js", "Python", "AWS", "n8n", "Docker", "LLMs"],
    github: "https://orravyn.cloud",
    category: "AI Platform",
  },
  {
    title: "🤖 AI-Powered Portfolio (saiii.in)",
    description:
      "Next-generation AI-integrated portfolio featuring intelligent chat assistance, automated content generation, and dynamic AI-driven user interactions. Showcases cutting-edge AI/ML project implementations.",
    tech: ["React", "TypeScript", "Tailwind CSS", "n8n", "AI APIs"],
    github: "https://orravyn.cloud",
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
    title: "🧠 Enterprise RAG System (unthinkable-RAG)",
    description:
      "Sophisticated Retrieval-Augmented Generation system combining vector databases, semantic search, and LLMs for intelligent document processing and knowledge extraction at enterprise scale.",
    tech: ["Python", "RAG", "Vector DB", "Embeddings"],
    github: "https://github.com/sairam3824/unthinkable-RAG",
    category: "NLP & RAG",
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
    title: "🚀 SpaceX ML: Landing Success Prediction",
    description:
      "Aerospace ML project analyzing SpaceX launch data to predict booster landing success using ensemble methods and time-series analysis. Features real-time prediction dashboard.",
    tech: ["Machine Learning", "Python", "Pandas", "Time Series", "Aerospace"],
    github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
    category: "Predictive Analytics",
  },
  {
    title: "🐾 LangChain AI Agent & Pet Namer",
    description:
      "Conversational AI agent built with LangChain framework, featuring creative pet naming, personality analysis, and multi-turn dialogue capabilities using advanced prompt engineering.",
    tech: ["LangChain", "Gemini API", "Prompt Engineering", "Conversational AI"],
    github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
    category: "Conversational AI",
  },
];

export const ProjectsSection = () => {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground select-none pointer-events-none focus:outline-none">AI & ML Projects</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Cutting-edge AI/ML projects spanning computer vision, NLP, RAG systems, and intelligent automation.
          Each project demonstrates practical AI applications with real-world impact.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-border group"
          >
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

      {/* Other Projects Section */}
      <div className="mt-16 pt-8 border-t border-border">
        <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Other Projects</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {/* School Management System */}
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

          {/* Quiz Website */}
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
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Project
            </a>
          </Card>

          {/* Portfolio */}
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
        </div>
      </div>
    </div>
  );
};
