import type { VercelRequest, VercelResponse } from '@vercel/node';
import { ChatOpenAI } from '@langchain/openai';
import { BufferMemory } from 'langchain/memory';
import { ConversationChain } from 'langchain/chains';

// In-memory storage for chat sessions (for demo purposes)
// In production, use Redis or a database
const sessions = new Map<string, BufferMemory>();

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, sessionId = 'default' } = req.body;

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Get or create session memory
    let memory = sessions.get(sessionId);
    if (!memory) {
      memory = new BufferMemory({
        returnMessages: true,
        memoryKey: 'history',
      });
      sessions.set(sessionId, memory);
    }

    // Initialize ChatOpenAI
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    // Create conversation chain with memory
    const chain = new ConversationChain({
      llm: model,
      memory: memory,
    });

    // Get response from OpenAI
    const response = await chain.call({
      input: query,
    });

    return res.status(200).json({
      success: true,
      response: response.response,
      sessionId,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message,
    });
  }
}
