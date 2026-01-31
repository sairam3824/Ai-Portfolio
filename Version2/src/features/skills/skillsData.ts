export interface Skill {
    name: string;
    level: "Advanced" | "Intermediate" | "Beginner";
    url?: string;
    company?: string;
}

export interface SkillCategory {
    category: string;
    iconName: string;
    color: string;
    description: string;
    skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
    {
        category: "GenAI & LLMs",
        iconName: "Brain",
        color: "indigo",
        description: "Architecting intelligent systems with cutting-edge models.",
        skills: [
            { name: "Llama 3.1/3.2", level: "Advanced", url: "https://llama.meta.com/", company: "Meta" },
            { name: "Grok", level: "Advanced", url: "https://grok.x.ai/", company: "xAI" },
            { name: "GPT-4", level: "Advanced", url: "https://openai.com/gpt-4", company: "OpenAI" },
            { name: "Claude 3.5 Sonnet", level: "Advanced", url: "https://www.anthropic.com/news/claude-3-5-sonnet", company: "Anthropic" },
            { name: "Gemini Pro/Ultra", level: "Advanced", url: "https://deepmind.google/technologies/gemini/", company: "Google" },
        ],
    },
    {
        category: "AI Coding",
        iconName: "Code2",
        color: "blue",
        description: "Next-gen AI coding assistants and environments.",
        skills: [
            { name: "Cursor AI", level: "Advanced", url: "https://cursor.sh/", company: "Cursor" },
            { name: "Windsurf", level: "Advanced", url: "https://windsurf.ai/", company: "Codeium" },
            { name: "Claude Code", level: "Advanced", url: "https://www.anthropic.com/", company: "Anthropic" },
            { name: "GitHub Copilot", level: "Advanced", url: "https://github.com/features/copilot", company: "GitHub" },
            { name: "Codex", level: "Advanced", url: "https://openai.com/blog/openai-codex", company: "OpenAI" },
            { name: "Kiro", level: "Intermediate", url: "#", company: "Kiro" },
            { name: "Antigravity", level: "Advanced", url: "#", company: "Google DeepMind" },
        ],
    },
    {
        category: "Vector DB",
        iconName: "Database",
        color: "emerald",
        description: "Efficient storage and retrieval for high-dimensional vectors.",
        skills: [
            { name: "Pinecone", level: "Advanced", url: "https://www.pinecone.io/", company: "Pinecone" },
            { name: "Chroma", level: "Advanced", url: "https://www.trychroma.com/", company: "Chroma" },
            { name: "FAISS", level: "Advanced", url: "https://faiss.ai/", company: "Meta" },
            { name: "text-embedding-3-small", level: "Advanced", url: "https://platform.openai.com/docs/guides/embeddings", company: "OpenAI" },
            { name: "all-MiniLM-L6-v2", level: "Advanced", url: "https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2", company: "Hugging Face" },
        ],
    },
    {
        category: "Cloud & DevOps",
        iconName: "Cloud",
        color: "sky",
        description: "Deploying and scaling applications on modern infrastructure.",
        skills: [
            { name: "AWS Bedrock", level: "Advanced", url: "https://aws.amazon.com/bedrock/", company: "AWS" },
            { name: "Vertex AI", level: "Advanced", url: "https://cloud.google.com/vertex-ai", company: "Google Cloud" },
            { name: "Docker", level: "Advanced", url: "https://www.docker.com/", company: "Docker" },
            { name: "Kubernetes", level: "Advanced", url: "https://kubernetes.io/", company: "CNCF" },
            { name: "Terraform", level: "Advanced", url: "https://www.terraform.io/", company: "HashiCorp" },
        ],
    },
    {
        category: "Intelligence Stack",
        iconName: "Brain",
        color: "amber",
        description: "Developing predictive models and computer vision pipelines.",
        skills: [
            { name: "TensorFlow", level: "Intermediate", url: "https://www.tensorflow.org/", company: "Google" },
            { name: "PyTorch", level: "Intermediate", url: "https://pytorch.org/", company: "Meta" },
            { name: "OpenCV", level: "Advanced", url: "https://opencv.org/", company: "OpenCV" },
            { name: "HuggingFace", level: "Advanced", url: "https://huggingface.co/", company: "Hugging Face" },
            { name: "RAG", level: "Advanced", url: "https://arxiv.org/abs/2005.11401", company: "Technique" },
            { name: "Fine-tuning", level: "Advanced", url: "https://platform.openai.com/docs/guides/fine-tuning", company: "Technique" },
            { name: "Prompt Engineering", level: "Advanced", url: "https://www.promptingguide.ai/", company: "Technique" },
        ],
    },
    {
        category: "Agent Frameworks",
        iconName: "Zap",
        color: "rose",
        description: "Building autonomous agents and multi-agent systems.",
        skills: [
            { name: "LangChain", level: "Advanced", url: "https://www.langchain.com/", company: "LangChain" },
            { name: "LangGraph", level: "Advanced", url: "https://langchain-ai.github.io/langgraph/", company: "LangChain" },
            { name: "n8n", level: "Advanced", url: "https://n8n.io/", company: "n8n" },
            { name: "Zapier", level: "Advanced", url: "https://zapier.com/", company: "Zapier" },
            { name: "OpenAI Agent Builder", level: "Advanced", url: "https://platform.openai.com/docs/assistants/overview", company: "OpenAI" },
        ],
    },
];
