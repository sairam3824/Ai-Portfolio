# Deployment Error Fixes

## Issues Found

1. **"Chat with Sairam" Error**: Missing `VITE_N8N_WEBHOOK_URL` environment variable
2. **"AI Assistant" Error**: Already fixed - `OPENAI_API_KEY` is configured in Vercel

## Solutions

### 1. Fix n8n Webhook Error

#### Step 1: Get your n8n webhook URL
- Go to your n8n instance
- Find your chat workflow
- Copy the webhook URL (should look like: `https://your-n8n-instance.com/webhook/xxxxx`)

#### Step 2: Add to Vercel
1. Go to https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `VITE_N8N_WEBHOOK_URL`
   - **Value**: Your n8n webhook URL
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**

#### Step 3: Update local .env
Replace `your_n8n_webhook_url_here` in `.env` with your actual webhook URL

### 2. Verify OpenAI API Key

The `OPENAI_API_KEY` is already configured in Vercel (you showed me the screenshot).
The API should work after the latest deployment.

## After Configuration

1. **Redeploy** your project:
   ```bash
   git add .
   git commit -m "Add n8n webhook configuration"
   git push
   ```

2. **Test both features**:
   - Homepage: "Ask me anything" → Should connect to n8n
   - Blog page: AI Assistant icon → Should connect to OpenAI

## Environment Variables Checklist

Make sure these are in Vercel:
- ✅ `OPENAI_API_KEY` (already added)
- ⚠️ `VITE_N8N_WEBHOOK_URL` (needs to be added)
- ⚠️ `VITE_SUPABASE_URL` (if using Supabase)
- ⚠️ `VITE_SUPABASE_ANON_KEY` (if using Supabase)

## Testing Locally

```bash
# Make sure .env has all variables
npm run dev

# Test both chat features
```

## Common Issues

### "Failed to get response"
- Check if environment variable is set in Vercel
- Verify the webhook URL is correct
- Check n8n workflow is active

### "Unexpected end of JSON input"
- n8n webhook is not returning proper JSON
- Check n8n workflow response format
- Should return: `{ "reply": "your response here" }`
