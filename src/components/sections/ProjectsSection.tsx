import { Card } from "@/components/ui/card";

const projects = [
  {
    title: "AI Research Platform (Orravn.cloud)",
    description:
      "A collaborative AI research and deployment platform built for scalable LLM and ML experimentation in the cloud.",
    tech: ["Next.js", "Python", "AWS"],
    github: "https://orravyn.cloud",
  },
  {
    title: "Bone Fracture Classification",
    description:
      "A deep learning model that detects and classifies bone fractures from X-ray images using CNN architectures.",
    tech: ["PyTorch", "FastAPI", "OpenCV"],
    github: "https://github.com/sairam3824/Bone-Fracture-Classification",
  },
  {
    title: "Customer Churn Prediction",
    description:
      "A predictive analytics model identifying customers likely to churn using advanced feature engineering and ML algorithms.",
    tech: ["scikit-learn", "Pandas", "Matplotlib"],
    github: "https://github.com/sairam3824/Customer-Churn-Prediction",
  },
  {
    title: "Integrated AI Text Assistant",
    description:
      "A unified AI assistant integrating NLP models to perform reasoning, summarization, and text-based automation tasks.",
    tech: ["LLMs", "React", "Node.js"],
    github: "https://github.com/sairam3824/Integrated-AI-Text-Assistant",
  },
  {
    title: "unthinkable-RAG",
    description:
      "A Retrieval-Augmented Generation (RAG) system for enhanced AI text generation and knowledge retrieval capabilities.",
    tech: ["Python", "RAG", "LLMs"],
    github: "https://github.com/sairam3824/unthinkable-RAG",
  },
  {
    title: "My Portfolio",
    description:
      "A personal portfolio built with React/Next.js showcasing AI, ML, and DSA projects with interactive animations and dark mode.",
    tech: ["React", "TailwindCSS", "TypeScript"],
    github: "https://github.com/sairam3824/Myportfilo",
  },
  {
    title: "Basic-MCP-Server-Practice",
    description:
      "A foundational project for understanding Model Context Protocol (MCP) servers, focusing on AI agent interoperability.",
    tech: ["Node.js", "Express", "LangChain"],
    github: "https://github.com/sairam3824/Basic-MCP-Server-Practice",
  },
  {
    title: "SpaceX Booster Landing Prediction",
    description:
      "A machine learning project predicting the success of SpaceX rocket landings using launch data and regression models.",
    tech: ["Python", "Pandas", "Matplotlib"],
    github: "https://github.com/sairam3824/SpaceX-Booster-Landing-Prediction",
  },
  {
    title: "LangChain Pet Namer & Agent",
    description:
      "An AI-powered agent using LangChain and OpenAI APIs to generate creative pet names and assist in conversational tasks.",
    tech: ["LangChain", "OpenAI", "TypeScript"],
    github: "https://github.com/sairam3824/Langchain-LLM-PET-app",
  },
  {
    title: "School Management System",
    description:
      "A full-stack web app for managing students, teachers, and administration using secure role-based access controls.",
    tech: ["Django", "PostgreSQL", "Bootstrap"],
    github: "https://github.com/sairam3824/School-Management-System",
  },
  {
    title: "Quiz Website",
    description:
      "An interactive quiz platform featuring category-based questions, timer integration, and real-time scoring.",
    tech: ["React", "Firebase", "TailwindCSS"],
    github: "https://github.com/sairam3824/Quiz-Website",
  },
];

export const ProjectsSection = () => {
  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-3xl font-bold text-foreground text-center">My Projects</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-border"
          >
            <h3 className="text-xl font-semibold mb-3 text-foreground">{project.title}</h3>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
