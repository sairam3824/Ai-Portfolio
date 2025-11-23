# 🚀 AI-Powered Portfolio Website

> A modern, interactive portfolio website featuring an AI chatbot assistant, built with React, TypeScript, and Supabase. Showcasing competitive programming achievements, projects, and technical expertise.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://saiii.in)
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
- **About** - Personal introduction and background with competitive programming achievements
- **Resume** - Downloadable PDF resume with complete professional history
- **Projects** - Showcase of development work and achievements with live demos
- **Skills** - Technical expertise and proficiency levels across multiple domains
- **Education** - Academic background and qualifications
- **Blog** - Articles and technical writing with subscription feature
- **Certifications** - Professional credentials and achievements
- **Contact** - Direct communication channel with form validation
- **Profile** - Hidden profile page (double-click avatar to access)

### 🔐 Admin Dashboard
- **Message Tracking** - View and manage contact form submissions with read/unread status
- **Subscriber Management** - Track blog subscribers and manage email list
- **Secure Authentication** - Protected admin routes with Supabase auth

### 🛠️ Technical Features
- **Supabase Backend** - PostgreSQL database with Row Level Security
- **TanStack Query** - Efficient data fetching and caching with optimistic updates
- **React Router v6** - Client-side routing with nested routes and loading states
- **Form Validation** - Zod schema validation with React Hook Form
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, and sitemap
- **Performance Optimized** - Code splitting, lazy loading, and route-based chunking
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints
- **Theme Support** - Dark/Light mode with next-themes and system preference detection
- **Interactive UI** - Custom cursor effects, smooth animations, and micro-interactions

## 🏗️ Tech Stack

### Frontend
- **React 18.3** - UI library with concurrent features
- **TypeScript 5.8** - Type safety and developer experience
- **Vite 5.4** - Lightning-fast build tool and dev server
- **TailwindCSS 3.4** - Utility-first styling with custom configuration
- **shadcn/ui** - Accessible component library built on Radix UI
- **Lucide React** - Beautiful, consistent icon library
- **React Router DOM 6.30** - Declarative routing

### Backend & Database
- **Supabase 2.81** - Backend as a Service with real-time capabilities
- **PostgreSQL** - Relational database with advanced features
- **Row Level Security** - Fine-grained data access control
- **Supabase Auth** - User authentication and authorization

### AI & Automation
- **N8N** - Workflow automation platform
- **Qdrant** - Vector database for semantic search
- **Custom AI Pipeline** - Document processing and embedding generation
- **Python Scripts** - Data processing and vector embedding utilities

### State Management & Data Fetching
- **TanStack Query 5.83** - Powerful server state management
- **React Hook Form 7.61** - Performant form state management
- **Zod 3.25** - TypeScript-first schema validation

### UI Components & Styling
- **Radix UI** - Unstyled, accessible component primitives
- **next-themes** - Theme management with system preference detection
- **class-variance-authority** - Type-safe component variants
- **tailwind-merge** - Intelligent Tailwind class merging
- **React Quill** - Rich text editor for blog posts
- **Recharts** - Composable charting library
- **Embla Carousel** - Lightweight carousel library
- **@dnd-kit** - Modern drag-and-drop toolkit

### Developer Experience
- **ESLint 9** - Code linting with modern flat config
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite SWC Plugin** - Fast React refresh with SWC compiler
- **React Helmet Async** - Document head management for SEO

## 📦 Installation

### Prerequisites
- **Node.js 18+** or **Bun** runtime
- **npm**, **pnpm**, or **bun** package manager
- **Supabase account** (free tier available)
- **N8N instance** (optional, for AI chatbot functionality)
- **Qdrant instance** (optional, for vector search)

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
# or
pnpm dev
# or
bun dev
```

Visit `http://localhost:5173` (Vite default) to see your portfolio.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project in Vercel dashboard
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automatically

The `vercel.json` configuration handles SPA routing and redirects automatically.

### Build for Production
```bash
# Production build
npm run build

# Development build (with source maps)
npm run build:dev

# Preview production build locally
npm run preview
```

The optimized build will be in the `dist/` folder, ready for deployment to any static hosting service.

### Other Deployment Options
- **Netlify** - Drag and drop the `dist/` folder
- **GitHub Pages** - Use GitHub Actions for automated deployment
- **Cloudflare Pages** - Connect your repository for automatic builds
- **AWS S3 + CloudFront** - For enterprise-grade hosting

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── assets/              # Images and static assets
│   │   ├── avatar.png       # Profile picture
│   │   ├── logo.png         # Site logo
│   │   └── logo2.png        # Alternative logo
│   ├── config/              # Configuration files
│   │   └── supabase.ts      # Supabase client setup
│   ├── core/                # Core app components
│   │   ├── App.tsx          # Main app with routing
│   │   ├── Index.tsx        # Landing page
│   │   ├── NotFound.tsx     # 404 page
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsAndConditions.tsx
│   │   ├── CodingRedirect.tsx
│   │   └── main.tsx         # App entry point
│   ├── features/            # Feature-based modules
│   │   ├── about/           # About section
│   │   ├── admin/           # Admin dashboard
│   │   ├── blog/            # Blog posts and management
│   │   ├── certifications/  # Certifications showcase
│   │   ├── chat/            # AI chatbot integration
│   │   ├── contact/         # Contact form
│   │   ├── education/       # Education timeline
│   │   ├── profile/         # Hidden profile page
│   │   ├── projects/        # Projects showcase
│   │   └── skills/          # Skills visualization
│   ├── shared/              # Shared utilities and components
│   │   ├── components/      # Reusable components
│   │   │   ├── NavigationCard.tsx
│   │   │   ├── CursorBlast.tsx
│   │   │   ├── SEO.tsx
│   │   │   └── RouteLoadingBar.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   │   └── utils.ts     # Helper functions
│   │   └── ui/              # shadcn/ui components
│   ├── styles/              # Global styles
│   │   └── globals.css      # Tailwind imports and custom styles
│   └── vite-env.d.ts        # Vite type definitions
├── public/                  # Static files
│   ├── Sai_Ram_Maruri_Resume_2025.pdf
│   ├── favicon.ico
│   ├── preview.png          # OG image
│   ├── robots.txt           # SEO crawler rules
│   └── sitemap.xml          # SEO sitemap
├── extra/                   # N8N workflows and scripts
│   ├── Ai portfolio chatbot.json
│   ├── Load docs into Qdrant.json
│   └── qdrantpost.py        # Vector embedding script
├── .env                     # Environment variables (gitignored)
├── .gitignore
├── components.json          # shadcn/ui configuration
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── supabase-schema.sql      # Database schema
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node-specific TS config
├── vercel.json              # Vercel deployment config
└── vite.config.ts           # Vite configuration
```

## 🎨 Customization

### Update Personal Information
1. **Content**: Edit feature components in `src/features/` directories
2. **Images**: Replace `avatar.png` and `logo.png` in `src/assets/`
3. **Resume**: Update PDF in `public/` folder
4. **SEO**: Modify meta tags in `index.html` and `src/shared/components/SEO.tsx`
5. **Landing Page**: Update name, title, and achievements in `src/core/Index.tsx`

### Modify Theme
- **Colors**: Edit `tailwind.config.ts` for custom color schemes
- **Components**: Customize shadcn/ui components in `src/shared/ui/`
- **Global Styles**: Modify `src/styles/globals.css` for custom CSS
- **Dark Mode**: Theme toggle is built-in with next-themes

### Add New Sections
1. Create a new feature folder: `src/features/your-section/`
2. Add route in `src/core/App.tsx`:
   ```tsx
   <Route path="/your-section" element={<YourSectionPage />} />
   ```
3. Add navigation card in `src/core/Index.tsx`:
   ```tsx
   { id: "your-section", icon: YourIcon, label: "Your Section" }
   ```
4. Create the page component with consistent styling

### Customize AI Chatbot
- Update N8N webhook URL in chat component
- Modify chatbot personality in N8N workflow
- Adjust vector search parameters in Qdrant configuration

## 🤖 AI Chatbot Configuration

The chatbot uses a sophisticated multi-step RAG (Retrieval-Augmented Generation) pipeline:

### Architecture
1. **Document Processing** - Portfolio content is processed and chunked into semantic segments
2. **Embedding Generation** - Text chunks are converted to vector embeddings using AI models
3. **Qdrant Storage** - Embeddings stored in Qdrant vector database with metadata
4. **Query Processing** - User questions are embedded and semantically matched
5. **Context Retrieval** - Most relevant content chunks are retrieved based on similarity
6. **Response Generation** - LLM generates contextual answers using retrieved information

### Setup Instructions
1. **Import N8N Workflows**:
   - Import `extra/Ai portfolio chatbot.json` for the main chatbot logic
   - Import `extra/Load docs into Qdrant.json` for document ingestion

2. **Configure Qdrant**:
   - Set up a Qdrant instance (cloud or self-hosted)
   - Run `extra/qdrantpost.py` to populate the vector database
   - Update collection name and API keys in N8N workflow

3. **Update Webhook**:
   - Get the webhook URL from your N8N workflow
   - Update the webhook URL in `src/features/chat/` component

4. **Customize Responses**:
   - Modify the system prompt in N8N workflow
   - Adjust temperature and max tokens for response generation
   - Fine-tune similarity threshold for context retrieval

### Features
- **Semantic Search** - Understands intent, not just keywords
- **Context-Aware** - Maintains conversation context
- **Real-time** - Instant responses via webhook
- **Scalable** - Handles multiple concurrent users

## 📊 Database Schema

### Tables

#### blog_subscribers
```sql
- id: UUID (primary key)
- email: TEXT (unique, not null)
- subscribed_at: TIMESTAMP (default: now())
- unsubscribe_token: UUID (unique)
- is_active: BOOLEAN (default: true)
```
**Features**:
- Email validation and uniqueness
- Unsubscribe token for one-click unsubscribe
- RLS policies for public insert access
- Indexes on email and token for fast lookups

#### contact_messages
```sql
- id: UUID (primary key)
- name: TEXT (not null)
- email: TEXT (not null)
- message: TEXT (not null)
- created_at: TIMESTAMP (default: now())
- is_read: BOOLEAN (default: false)
- ip_address: TEXT
- user_agent: TEXT
```
**Features**:
- Tracks message read status for admin dashboard
- Stores metadata (IP, user agent) for security
- RLS policies for public insert, admin read
- Indexes on created_at and is_read for filtering

### Row Level Security (RLS)
- **Public Access**: Insert-only for contact forms and subscriptions
- **Admin Access**: Full CRUD operations with authentication
- **Data Privacy**: Users can only access their own data
- **Audit Trail**: Timestamps and metadata for all operations

### Indexes
- Email indexes for fast subscriber lookups
- Timestamp indexes for chronological queries
- Composite indexes for filtered admin queries

## 🔒 Security

### Database Security
- **Row Level Security (RLS)** - Enabled on all tables with granular policies
- **Prepared Statements** - Supabase client prevents SQL injection
- **Data Validation** - Server-side validation in addition to client-side

### Application Security
- **Environment Variables** - Sensitive data never committed to repository
- **CORS Configuration** - Restricted origins in Supabase dashboard
- **Input Validation** - Zod schemas validate all user inputs
- **XSS Protection** - React's built-in escaping prevents XSS attacks
- **CSRF Protection** - Supabase handles CSRF tokens automatically

### Authentication
- **Supabase Auth** - Industry-standard authentication
- **JWT Tokens** - Secure, stateless authentication
- **Admin Routes** - Protected with authentication middleware
- **Session Management** - Automatic token refresh and expiration

### Best Practices
- **HTTPS Only** - All production traffic over HTTPS
- **Content Security Policy** - Configured in Vercel deployment
- **Rate Limiting** - Supabase provides built-in rate limiting
- **Audit Logging** - Track all database operations with timestamps
- **Dependency Updates** - Regular security updates via npm audit

## 🧪 Development Scripts

```bash
# Development
npm run dev          # Start Vite dev server with HMR (Hot Module Replacement)
npm run preview      # Preview production build locally

# Building
npm run build        # Production build (optimized, minified)
npm run build:dev    # Development build (with source maps)

# Code Quality
npm run lint         # Run ESLint to check code quality

# Package Managers
npm install          # Install with npm
pnpm install         # Install with pnpm (faster)
bun install          # Install with bun (fastest)
```

### Development Tips
- Use `npm run dev` for hot reload during development
- Run `npm run lint` before committing to catch issues
- Use `npm run build:dev` to debug production builds
- Preview builds with `npm run preview` before deploying

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Sai Rama Linga Reddy Maruri**
- 🌐 Portfolio: [saiii.in](https://saiii.in)
- 💼 LinkedIn: [Connect with me](https://www.linkedin.com/in/sairam-maruri/)


## 🙏 Acknowledgments

### Technologies
- [React](https://react.dev/) - The library for web and native user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components

### Backend & Infrastructure
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [N8N](https://n8n.io/) - Workflow automation for technical people
- [Qdrant](https://qdrant.tech/) - Vector database for AI applications

### Deployment & Hosting
- [Vercel](https://vercel.com/) - Platform for frontend developers
- [GitHub](https://github.com/) - Where the world builds software

### Tools & Libraries
- [TanStack Query](https://tanstack.com/query) - Powerful asynchronous state management
- [React Router](https://reactrouter.com/) - Declarative routing for React
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icon toolkit
- [Zod](https://zod.dev/) - TypeScript-first schema validation


## 🤝 Contributing

Contributions are welcome! If you'd like to improve this portfolio template:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🗺️ Roadmap

- [ ] Add blog post search and filtering
- [ ] Implement dark mode toggle animation
- [ ] Add project filtering by technology
- [ ] Create admin analytics dashboard
- [ ] Add email notifications for contact form
- [ ] Implement blog post comments
- [ ] Add RSS feed for blog
- [ ] Create API documentation
