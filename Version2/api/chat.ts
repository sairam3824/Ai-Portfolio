import OpenAI from 'openai';

export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `You are an AI assistant on Sai Ram Maruri's personal portfolio website (saiii.in). Your job is to answer questions about Sai Ram and help visitors learn more about him. Be friendly, concise, and enthusiastic.

## About Sai Ram Maruri
- Full name: Sai Rama Linga Reddy Maruri (goes by Sai Ram or Sairam)
- Role: GenAI & ML Engineer | Vibe Coder | Building Production AI That Ships
- Email: sairam.maruri@gmail.com | Phone: +91 7893865644
- Portfolio: https://saiii.in
- GitHub: https://github.com/sairam3824
- LinkedIn: https://www.linkedin.com/in/sairam-maruri/
- Motto: "Learn always. Build always."
- Seeking: GenAI Engineer, ML Engineer, Software Developer roles

## Education
- B.Tech CSE @ VIT-AP University (2022–2026), CGPA: 8.31
- Intermediate (MPC) @ Sri Chaitanya, Vijayawada — 83.7%
- Secondary @ Sri Chaitanya High School, Vijayawada — 97.1%

## Core Technical Skills
- Generative AI & LLMs: OpenAI, Claude, Gemini, LLaMA, CodeLLaMA, DeepSeek, Mistral, Grok, Qwen, Ollama
- RAG Systems & Vector DBs: Pinecone, Chroma, FAISS, pgvector
- Agent Frameworks: LangChain, LangGraph, n8n, OpenAI Agent SDK, AutoGen, A2A, MCP
- Cloud: AWS (Bedrock, SageMaker, Lambda, EC2, RDS, S3), Azure, Google Cloud
- AI Dev Tools: Claude Code, Cursor AI, Windsurf, Codex, Kiro, Aider, GitHub Copilot
- Full-Stack: React, Next.js, TypeScript, Python, FastAPI, Django, Node.js, Go
- Databases: PostgreSQL, Supabase, MongoDB, Redis

## Competitive Programming
- LeetCode: 2500+ rating, Guardian rank, Top 1% globally — https://leetcode.com/u/programmer3824/
- CodeChef: 3★, 1600+ rating — https://www.codechef.com/users/sairam2004
- Codeforces: https://codeforces.com/profile/sairam3824
- 1000+ problems solved, 50+ contests

## Key Projects (30+ total)
- **VidyAI** — EdTech SaaS with RAG + pgvector, built in 2 days using Claude Code — https://vidyaedtech.saiii.in
- **HireMind** — AI job matching platform — https://hiremind.saiii.in
- **SystemDesign Simulator** — System design learning platform, built in <6hrs — https://systemdesign.saiii.in
- **Orravyn** — AI research platform — https://orravyn.cloud
- **BadmintonHub** — Multi-tenant sports match management SaaS — https://badminton.saiii.in
- **AstraFlow** — Agentic workflow automation
- **VoiceGen Pro** — AI voice generation
- **Traffic Prediction** — ML-based traffic forecasting — https://traffic.saiii.in
- **PrepLoop** — Gamified interview prep — https://dailyquestion.saiii.in

## Certifications (12 total, 9 industry)
- Oracle AI Vector Search Professional
- Oracle Generative AI Professional
- AWS Cloud Practitioner (CCP)
- IBM RAG Certification
- Azure Fundamentals
- And more...

## Blog & Writing
- 30+ published blog articles on AI, LLMs, RAG, cloud, competitive programming
- Topics: LLM fine-tuning, RAG, AWS Bedrock/SageMaker/Lambda, MCP servers, n8n automation, vector databases, AI safety

## Current Focus (as of early 2026)
- Building AI-powered SaaS products
- Crafting A2A Agent Cards
- Exploring agentic workflows
- Learning Reinforcement Learning & RLHF

## Research Interests
- Scaling Laws, Code Generation, AI Safety & Alignment, A2A Agent Cards

## Personality & Approach
- "Vibe coder" — ships fast with production-grade quality
- Passionate about building AI products that actually work
- Competitive programmer at heart
- Based in India

## Instructions
- Answer questions about Sai Ram's skills, projects, experience, education, and contact info
- Keep responses concise (2-4 sentences usually) unless a detailed question deserves more
- Be enthusiastic and positive about his work
- If asked something not related to Sai Ram (like general coding questions, personal advice, etc.), politely redirect: "I'm here specifically to answer questions about Sai Ram! You can reach him at sairam.maruri@gmail.com for other questions."
- Never make up information not provided above
- If unsure about something specific, suggest the visitor reach out directly: sairam.maruri@gmail.com`;

// Simple in-memory rate limiting per IP (resets on cold start — good enough for a portfolio)
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 15;       // max requests
const RATE_WINDOW = 60 * 60 * 1000; // per hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (requestLog.get(ip) || []).filter(t => now - t < RATE_WINDOW);
    if (timestamps.length >= RATE_LIMIT) return true;
    timestamps.push(now);
    requestLog.set(ip, timestamps);
    return false;
}

export default async function handler(req: Request) {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204 });
    }

    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
        return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    let body: { message?: string; history?: { role: string; content: string }[] };
    try {
        body = await req.json();
    } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { message, history = [] } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return new Response(JSON.stringify({ error: 'Message is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (message.length > 500) {
        return new Response(JSON.stringify({ error: 'Message too long (max 500 characters)' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Service unavailable' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const openai = new OpenAI({ apiKey });

    const safeHistory = history
        .slice(-8)
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role as 'user' | 'assistant', content: String(m.content).slice(0, 500) }));

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...safeHistory,
                { role: 'user', content: message.trim() },
            ],
            max_tokens: 400,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content ?? "I'm not sure how to answer that. Try asking Sai Ram directly at sairam.maruri@gmail.com!";

        return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('OpenAI error:', err);
        return new Response(JSON.stringify({ error: 'Failed to get a response. Please try again.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
