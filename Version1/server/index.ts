import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, BaseMessage } from '@langchain/core/messages';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for chat history
const sessions = new Map<string, BaseMessage[]>();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AI Chat API is running' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { query, sessionId = 'default' } = req.body;

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

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenAI API key not configured',
        details: 'Please add OPENAI_API_KEY to your .env file'
      });
    }

    // Get or create session history
    let history = sessions.get(sessionId);
    if (!history) {
      history = [];
      sessions.set(sessionId, history);
    }

    // Initialize ChatOpenAI
    const model = new ChatOpenAI({
      modelName: 'gpt-3.5-turbo',
      temperature: 0.7,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    console.log(`Processing query: "${query}" for session: ${sessionId}`);

    // Add user message to history
    const userMessage = new HumanMessage(query);
    history.push(userMessage);

    // Get response from OpenAI with conversation history
    const response = await model.invoke(history);

    // Add AI response to history
    history.push(response);

    // Keep only last 10 messages to avoid token limits
    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }

    console.log('Response received successfully');

    return res.status(200).json({
      success: true,
      response: response.content,
      sessionId,
    });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Failed to process chat request',
      details: error.message,
    });
  }
});

// Clear session endpoint
app.post('/api/chat/clear', (req, res) => {
  const { sessionId = 'default' } = req.body;
  sessions.delete(sessionId);
  res.json({ success: true, message: 'Session cleared' });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Chat API server running on http://localhost:${PORT}`);
  console.log(`📝 Health check: http://localhost:${PORT}/api/health`);
  console.log(`💬 Chat endpoint: http://localhost:${PORT}/api/chat`);
});
