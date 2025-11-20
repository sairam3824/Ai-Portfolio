# 🚀 AI-Powered Portfolio Website

> A modern, interactive portfolio website featuring an AI chatbot assistant, built with React, TypeScript, and Supabase.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://sairam.orravyn.cloud/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## ✨ Features

### 🎨 Modern UI/UX
- **Responsive Design** - Seamless experience across all devices
- **Dark/Light Mode** - Theme switching with next-themes
- **Smooth Animations** - Polished transitions and interactions
- **Accessible Components** - Built with Radix UI primitives

### 🤖 AI Chatbot Integration
- **Interactive Assistant** - Ask questions about skills, projects, and experience
- **N8N Workflow** - Powered by custom n8n automation workflows
- **Qdrant Vector Database** - Semantic search through portfolio content
- **Real-time Responses** - Instant answers to visitor queries

### 📱 Core Sections
- **About** - Personal introduction and background
- **Projects** - Showcase of development work and achievements
- **Skills** - Technical expertise and proficiency levels
- **Education** - Academic background and qualifications
- **Blog** - Articles and technical writing
- **Certifications** - Professional credentials and achievements
- **Contact** - Direct communication channel

### 🔐 Admin Dashboard
- **Content Management** - Update portfolio content dynamically
- **Message Tracking** - View and manage contact form submissions
- **Blog Management** - Create, edit, and publish blog posts
- **Subscriber Management** - Track blog subscribers

### 🛠️ Technical Features
- **Supabase Backend** - PostgreSQL database with Row Level Security
- **React Query** - Efficient data fetching and caching
- **React Router** - Client-side routing with code splitting
- **Form Validation** - Zod schema validation with React Hook Form
- **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- **Performance Optimized** - Code splitting and lazy loading

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first styling
- **shadcn/ui** - Component library
- **Lucide React** - Icon library

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - Relational database
- **Row Level Security** - Data access control

### AI & Automation
- **N8N** - Workflow automation
- **Qdrant** - Vector database for semantic search
- **Custom AI Pipeline** - Document processing and embedding

### State Management & Data Fetching
- **TanStack Query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Schema validation

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- npm, pnpm, or bun
- Supabase account
- N8N instance (optional, for chatbot)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
# or
bun install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Database Setup
1. Create a new Supabase project
2. Run the SQL schema from `supabase-schema.sql` in the Supabase SQL editor
3. This will create:
   - `blog_subscribers` table
   - `contact_messages` table
   - RLS policies
   - Indexes and views

### 5. N8N Chatbot Setup (Optional)
1. Import `n8n-workflow-template.json` into your N8N instance
2. Configure the webhook URL in your chatbot component
3. For advanced AI features, use the workflows in the `extra/` folder:
   - `Ai portfolio chatbot.json` - Main chatbot workflow
   - `Load docs into Qdrant.json` - Document embedding workflow

### 6. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

The `vercel.json` configuration handles SPA routing automatically.

### Build for Production
```bash
npm run build
```

The optimized build will be in the `dist/` folder.

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/          # Images and static assets
│   ├── config/          # Configuration files (Supabase)
│   ├── core/            # Core app components (App, routing)
│   ├── features/        # Feature-based modules
│   │   ├── about/
│   │   ├── admin/
│   │   ├── blog/
│   │   ├── certifications/
│   │   ├── chat/        # AI chatbot
│   │   ├── contact/
│   │   ├── education/
│   │   ├── projects/
│   │   └── skills/
│   ├── shared/          # Shared utilities and components
│   │   ├── components/  # Reusable components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions
│   │   └── ui/          # UI components (shadcn)
│   └── styles/          # Global styles
├── public/              # Static files
├── extra/               # N8N workflows and scripts
├── supabase-schema.sql  # Database schema
└── package.json
```

## 🎨 Customization

### Update Personal Information
1. Edit content in feature components (`src/features/`)
2. Replace images in `src/assets/` and `public/`
3. Update SEO metadata in `index.html`

### Modify Theme
- Edit `tailwind.config.ts` for color schemes
- Customize components in `src/shared/ui/`

### Add New Sections
1. Create a new feature folder in `src/features/`
2. Add route in `src/core/App.tsx`
3. Create navigation card in `src/core/Index.tsx`

## 🤖 AI Chatbot Configuration

The chatbot uses a multi-step pipeline:

1. **Document Processing** - Portfolio content is processed and chunked
2. **Embedding Generation** - Text is converted to vector embeddings
3. **Qdrant Storage** - Embeddings stored in Qdrant vector database
4. **Query Processing** - User questions are embedded and matched
5. **Response Generation** - Relevant context is used to generate answers

See `extra/qdrantpost.py` for the embedding script.

## 📊 Database Schema

### blog_subscribers
- Stores email subscriptions
- Includes unsubscribe tokens
- RLS policies for public access

### contact_messages
- Stores contact form submissions
- Tracks read/unread status
- IP and user agent logging

## 🔒 Security

- Row Level Security (RLS) enabled on all tables
- Environment variables for sensitive data
- CORS configuration in Supabase
- Input validation with Zod schemas
- XSS protection with React

## 🧪 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sai Rama Linga Reddy Maruri**
- Portfolio: [sairam.orravyn.cloud](https://sairam.orravyn.cloud/)
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Supabase](https://supabase.com/) - Backend infrastructure
- [N8N](https://n8n.io/) - Workflow automation
- [Qdrant](https://qdrant.tech/) - Vector database
- [Vercel](https://vercel.com/) - Hosting platform

## 🐛 Issues & Support

Found a bug or have a feature request? Please open an issue on GitHub.

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript, and AI</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
