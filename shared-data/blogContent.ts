const contentLoaders: Record<string, () => Promise<{ default?: { content: string }; [key: string]: any }>> = {
    "anthropic-q1-2026": () => import('./blog/posts/anthropic-q1-2026'),
    "a2a-agent-protocol": () => import('./blog/posts/a2a-agent-protocol'),
    "prompt-injection": () => import('./blog/posts/prompt-injection'),
    "mcp-servers": () => import('./blog/posts/MCP-server'),
    "ai-vs-genai": () => import('./blog/posts/ai-vs-genai'),
    "aws-bedrock": () => import('./blog/posts/aws-bedrock'),
    "aws-lambda": () => import('./blog/posts/aws-lambda'),
    "aws-sagemaker": () => import('./blog/posts/aws-sagemaker'),
    "claude-code": () => import('./blog/posts/claude-code'),
    "cursor-ai": () => import('./blog/posts/cursor-ai'),
    "cpp": () => import('./blog/posts/cpp'),
    "dl-algorithms": () => import('./blog/posts/dl-algorithms'),
    "fine-tuning-llms": () => import('./blog/posts/fineTuning-LLMs'),
    "java": () => import('./blog/posts/java'),
    "langchain": () => import('./blog/posts/langchain-Orchestration-For-AI'),
    "llm-hallucination": () => import('./blog/posts/llm-Hallucination'),
    "llm-poisoning": () => import('./blog/posts/llm-poisoning-hidden-threat'),
    "llms": () => import('./blog/posts/llm'),
    "ml-algorithms": () => import('./blog/posts/ml-algorithms'),
    "modern-ides-2025": () => import('./blog/posts/modren-ides'),
    "coding-journey": () => import('./blog/posts/my-coding-journey-0-to-3-star'),
    "n8n": () => import('./blog/posts/n8n-automation'),
    "openai-agent-builder": () => import('./blog/posts/openAI-Agent-Builder'),
    "openai-codex": () => import('./blog/posts/openai-codex'),
    "python": () => import('./blog/posts/python'),
    "rag": () => import('./blog/posts/rag-transforming-llm-knowledge-access'),
    "biweekly-tech-2025-11-23-12-07": () => import('./blog/posts/tech-biweekly-digest-dec-7-2025'),
    "weekly-nov3": () => import('./blog/posts/tech-biweekly-digest-nov-3-2025'),
    "weekly-novmid": () => import('./blog/posts/tech-biweekly-digest-nov-mid-2025'),
    "weekly-oct20": () => import('./blog/posts/tech-biweekly-digest-oct-20-2025'),
    "vector-database": () => import('./blog/posts/vector-databases-foundation-modern-ai'),
    "tech-monthly-digest-jan-2026": () => import('./blog/posts/tech-monthly-digest-jan-2026'),
    "tech-monthly-digest-feb-2026": () => import('./blog/posts/tech-monthly-digest-feb-2026'),
    "context-engineering": () => import('./blog/posts/context-engineering'),
};

export async function getBlogContent(id: string): Promise<string | null> {
    const loader = contentLoaders[id];
    if (!loader) return null;

    const mod = await loader();
    const post = Object.values(mod).find(
        (v) => v && typeof v === 'object' && 'content' in v
    ) as { content: string } | undefined;

    return post?.content ?? null;
}
