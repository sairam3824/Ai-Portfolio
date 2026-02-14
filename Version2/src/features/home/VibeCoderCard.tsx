import BentoCard from "./BentoCard";

const codingAssistants = [
    "Claude Code",
    "Codex",
    "Cursor",
    "VS Code",
    "Kiro",
    "GitHub Copilot",
    "Ollama",
];

const models = [
    "GPT-4o",
    "Claude 3.5 Sonnet",
    "Claude Opus 4.5",
    "Gemini 3 Pro",
    "Llama 3",
    "Llama 8B",
    "Code Llama",
    "DeepSeek",
    "Mistral",
    "Qwen",
];

const cloud = [
    "AWS Bedrock",
    "Vertex AI",
    "Azure OpenAI",
    "Pinecone",
    "Weaviate",
    "Supabase",
];

const VibeCoderCard = () => {
    return (
        <BentoCard className="col-span-12 sm:col-span-6 md:col-span-4 row-span-2 !bg-gradient-to-br !from-blue-50/40 !to-white" ghostChar="~" delay={420}>
            <div className="flex items-center gap-4 mb-6">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 tracking-tight">Vibe Coder</h3>
                </div>
            </div>

            <div className="flex flex-col gap-3 justify-between flex-1">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1.5 block">AI Coding Assistants</span>
                    <div className="flex flex-wrap gap-1.5">
                        {codingAssistants.map((item, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100/50"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1.5 block">GenAI & Models</span>
                    <div className="flex flex-wrap gap-1.5">
                        {models.map((item, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100/50"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-1.5 block">Cloud & Infra</span>
                    <div className="flex flex-wrap gap-1.5">
                        {cloud.map((item, i) => (
                            <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100/50"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </BentoCard>
    );
};

export default VibeCoderCard;
