const contentLoaders: Record<string, () => Promise<{ default?: { content: string }; [key: string]: any }>> = {
    "mcp-servers": () => import('./posts/MCP-server'),
    "ai-vs-genai": () => import('./posts/ai-vs-genai'),
    "aws-bedrock": () => import('./posts/aws-bedrock'),
    "aws-lambda": () => import('./posts/aws-lambda'),
    "aws-sagemaker": () => import('./posts/aws-sagemaker'),
    "claude-code": () => import('./posts/claude-code'),
    "cpp": () => import('./posts/cpp'),
    "dl-algorithms": () => import('./posts/dl-algorithms'),
    "fine-tuning-llms": () => import('./posts/fineTuning-LLMs'),
    "java": () => import('./posts/java'),
    "langchain": () => import('./posts/langchain-Orchestration-For-AI'),
    "llm-hallucination": () => import('./posts/llm-Hallucination'),
    "llm-poisoning": () => import('./posts/llm-poisoning-hidden-threat'),
    "llms": () => import('./posts/llm'),
    "ml-algorithms": () => import('./posts/ml-algorithms'),
    "modern-ides-2025": () => import('./posts/modren-ides'),
    "coding-journey": () => import('./posts/my-coding-journey-0-to-3-star'),
    "n8n": () => import('./posts/n8n-automation'),
    "openai-agent-builder": () => import('./posts/openAI-Agent-Builder'),
    "openai-codex": () => import('./posts/openai-codex'),
    "python": () => import('./posts/python'),
    "rag": () => import('./posts/rag-transforming-llm-knowledge-access'),
    "biweekly-tech-2025-11-23-12-07": () => import('./posts/tech-biweekly-digest-dec-7-2025'),
    "weekly-nov3": () => import('./posts/tech-biweekly-digest-nov-3-2025'),
    "weekly-novmid": () => import('./posts/tech-biweekly-digest-nov-mid-2025'),
    "weekly-oct20": () => import('./posts/tech-biweekly-digest-oct-20-2025'),
    "vector-database": () => import('./posts/vector-databases-foundation-modern-ai'),
};

export async function getBlogContent(id: string): Promise<string | null> {
    const loader = contentLoaders[id];
    if (!loader) return null;

    const mod = await loader();
    // Each module exports a named const with { content, ... }
    const post = Object.values(mod).find(
        (v) => v && typeof v === 'object' && 'content' in v
    ) as { content: string } | undefined;

    return post?.content ?? null;
}
