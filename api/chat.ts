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
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, sessionId = 'default' } = req.body;

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        details: 'Please add OPENAI_API_KEY to environment variables'
      });
    }

    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Check if user is asking about Sai Ram Maruri
    const lowerQuery = query.toLowerCase();
    const personalKeywords = [
      'who is sai',
      'sai ram',
      'sai rama',
      'maruri',
      'who is he',
      'tell about him',
      'tell me about him',
      'about sai',
      'who are you',
      'your name',
      'about you',
      'about yourself'
    ];

    const isPersonalQuery = personalKeywords.some(keyword => lowerQuery.includes(keyword));

    if (isPersonalQuery) {
      return res.status(200).json({
        success: true,
        response: "I'd love to tell you about Sai Ram Maruri! For personalized information about him, his experience, projects, and skills, please use the 'Ask me anything' chat feature on the homepage. You can click on the chat icon in the navigation bar or visit the Contact section. That chat is specifically designed to answer questions about Sai Ram's background, expertise, and work! 😊",
        sessionId,
        redirectToContact: true,
      });
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
