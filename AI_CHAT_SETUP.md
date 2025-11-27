# AI Chat Setup Guide

## ✅ What's Been Implemented

1. **Serverless API Route** (`/api/chat.ts`)
   - Uses LangChain with OpenAI GPT-3.5-turbo
   - Implements BufferMemory for conversation history
   - Secure API key handling (server-side only)

2. **Frontend Components**
   - `AIChatDialog.tsx` - Beautiful chat interface
   - `useAIChat.ts` - Custom hook for chat functionality
   - Integrated into BlogSection with sparkle icon

3. **Features**
   - Conversational AI with memory
   - Real-time chat interface
   - Error handling
   - Loading states
   - Session management

## 🚀 Local Testing

### Option 1: Using Vercel Dev (Recommended)

```bash
# Terminal 1: Start Vercel dev server (API)
npm run dev:api

# Terminal 2: Start Vite dev server (Frontend)
npm run dev
```

Then open http://localhost:3000

### Option 2: Using Vercel Dev Only

```bash
vercel dev
```

This will run both frontend and API together.

## 🧪 How to Test

1. Go to the Blogs page
2. Look for the right search box with sparkle icon (✨)
3. Type a question like "What is AI?" or "Explain machine learning"
4. Press Enter
5. A chat dialog will open with AI response
6. Continue the conversation - it remembers context!

## 📝 Environment Variables

### Local (.env)
```
OPENAI_API_KEY=your-key-here
```

### Vercel Dashboard
1. Go to your project settings
2. Environment Variables section
3. Add: `OPENAI_API_KEY` = `your-key-here`
4. Select all environments

## 🔧 Troubleshooting

### API not working locally?
- Make sure both terminals are running
- Check that port 3001 is not in use
- Verify .env file has OPENAI_API_KEY

### Chat dialog not opening?
- Check browser console for errors
- Ensure you pressed Enter after typing

### OpenAI errors?
- Verify API key is valid
- Check OpenAI account has credits
- Look at API response in Network tab

## 📦 Dependencies Installed

```json
{
  "dependencies": {
    "langchain": "^latest",
    "@langchain/openai": "^latest",
    "@langchain/core": "^latest"
  },
  "devDependencies": {
    "@vercel/node": "^latest",
    "vercel": "^latest"
  }
}
```

## 🚢 Deployment to Vercel

1. Push code to GitHub
2. Vercel will auto-deploy
3. Add OPENAI_API_KEY in Vercel dashboard
4. Done! API routes work automatically

## 🎨 Customization

### Change AI Model
Edit `api/chat.ts`:
```typescript
const model = new ChatOpenAI({
  modelName: 'gpt-4', // or 'gpt-4-turbo'
  temperature: 0.7,
});
```

### Adjust Memory
```typescript
const memory = new BufferWindowMemory({
  k: 5, // Remember last 5 messages
});
```

### Styling
Edit `AIChatDialog.tsx` for UI changes.

## 🔐 Security Notes

- ✅ API key is server-side only
- ✅ Not exposed in frontend bundle
- ✅ .env is gitignored
- ✅ Vercel environment variables are encrypted
