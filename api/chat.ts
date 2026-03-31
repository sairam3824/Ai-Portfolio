import OpenAI from 'openai';
import type { ApiRequest, ApiResponse } from './types';
import { buildPortfolioAssistantSystemPrompt } from '../shared-data/chatContext';

const SYSTEM_PROMPT = buildPortfolioAssistantSystemPrompt();
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini';

// Simple in-memory rate limiting per IP
const requestLog = new Map<string, number[]>();
const RATE_LIMIT = 15;
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const timestamps = (requestLog.get(ip) || []).filter(t => now - t < RATE_WINDOW);
    if (timestamps.length >= RATE_LIMIT) return true;
    timestamps.push(now);
    requestLog.set(ip, timestamps);
    return false;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (message.length > 500) {
        return res.status(400).json({ error: 'Message too long (max 500 characters)' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(503).json({ error: 'Service unavailable' });
    }

    const openai = new OpenAI({ apiKey });

    const safeHistory = (Array.isArray(history) ? history : [])
        .slice(-8)
        .filter((m: { role: string; content: string }) => m.role === 'user' || m.role === 'assistant')
        .map((m: { role: string; content: string }) => ({
            role: m.role as 'user' | 'assistant',
            content: String(m.content).slice(0, 500),
        }));

    try {
        const completion = await openai.chat.completions.create({
            model: CHAT_MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                ...safeHistory,
                { role: 'user', content: message.trim() },
            ],
            max_tokens: 400,
            temperature: 0.7,
        });

        const reply = completion.choices[0]?.message?.content
            ?? "I'm not sure how to answer that. Try asking Sai Ram directly at sairam.maruri@gmail.com!";

        return res.status(200).json({ reply });
    } catch (err) {
        console.error('OpenAI error:', err);
        return res.status(500).json({ error: 'Failed to get a response. Please try again.' });
    }
}
