# 🚀 AI-Powered Portfolio Website

> A modern, high-performance portfolio website featuring an AI chatbot assistant powered by RAG (Retrieval-Augmented Generation), built with React 18, TypeScript, and Supabase. Showcasing competitive programming achievements, technical projects, and professional expertise with an emphasis on accessibility and performance.

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://saiii.in)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF)](https://vitejs.dev/)

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

- **Supabase Backend** - PostgreSQL database with Row Level Security and real-time subscriptions
- **TanStack Query** - Efficient data fetching, caching, and optimistic updates
- **React Router v6** - Client-side routing with nested routes and loading states
- **Form Validation** - Type-safe Zod schema validation with React Hook Form
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, sitemap.xml, and robots.txt
- **Performance Optimized** - Code splitting, lazy loading, route-based chunking, and asset optimization
- **Accessibility** - WCAG 2.1 AA compliant with ARIA labels, keyboard navigation, and screen reader support
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints (sm, md, lg, xl, 2xl)
- **Theme Support** - Dark/Light mode with next-themes and system preference detection
- **Interactive UI** - Custom cursor effects, smooth Framer Motion animations, and micro-interactions
- **Error Handling** - Comprehensive ErrorBoundary and graceful degradation
- **Analytics** - Vercel Analytics integration for performance monitoring

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
│   ├── assets/                    # Images and static assets
│   │   ├── avatar.png             # Profile picture
│   │   ├── logo.png               # Primary logo
│   │   └── logo2.png              # Alternate logo
│   ├── config/
│   │   └── supabase.ts            # Supabase client setup
│   ├── core/                      # Application shell & routing
│   │   ├── App.tsx                # Route definitions + loaders
│   │   ├── Index.tsx              # Landing page
│   │   ├── CodingRedirect.tsx     # Easter-egg redirect
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsAndConditions.tsx
│   │   ├── NotFound.tsx
│   │   └── main.tsx               # Vite entry point
│   ├── features/                  # Feature-first slices (expanded below)
│   │   ├── about/
│   │   │   ├── AboutSection.tsx   # Hero + bio module
│   │   │   ├── AboutPage.tsx      # Standalone route wrapper
│   │   │   └── index.ts           # Barrel exports
│   │   ├── admin/
│   │   │   ├── AdminDashboard.tsx # Contact + subscriber overview
│   │   │   ├── AnalyticsDashboard.tsx # Charts powered by Recharts
│   │   │   ├── AdminLogin.tsx     # Supabase auth gate
│   │   │   ├── DatabaseViewer.tsx # Read-only Supabase tables
│   │   │   └── index.ts
│   │   ├── blog/
│   │   │   ├── BlogSection.tsx    # Homepage feed
│   │   │   ├── BlogCard.tsx       # Reusable card UI
│   │   │   ├── BlogPostPage.tsx / BlogsPage.tsx
│   │   │   ├── BlogResources.tsx  # CTA + subscription copy
│   │   │   ├── useBlogPosts.ts    # Loader for typed blog metadata
│   │   │   ├── useSubscription.ts # Newsletter subscribe hook
│   │   │   └── *.ts               # Individual MDX-like posts (cpp.ts, n8n-automation.ts, etc.)
│   │   ├── certifications/
│   │   │   ├── CertificationSection.tsx
│   │   │   ├── CertificationsPage.tsx
│   │   │   └── index.ts
│   │   ├── chat/
│   │   │   ├── ChatDialog.tsx     # Chatbot UI surface
│   │   │   ├── SubscriptionDialog.tsx # Lead capture modal
│   │   │   └── index.ts
│   │   ├── contact/
│   │   │   ├── ContactSection.tsx # Form with validation + toasts
│   │   │   ├── ContactPage.tsx
│   │   │   ├── MessageDialog.tsx  # Admin message detail
│   │   │   └── index.ts
│   │   ├── education/
│   │   │   ├── EducationSection.tsx # Timeline cards
│   │   │   ├── EducationPage.tsx
│   │   │   └── index.ts
│   │   ├── profile/
│   │   │   ├── ProfilePage.tsx    # Hidden achievements hub
│   │   │   ├── BadgesPage.tsx     # Badge gallery
│   │   │   └── index.ts
│   │   ├── projects/
│   │   │   ├── ProjectsSection.tsx # Highlight reel grid
│   │   │   ├── ProjectsPage.tsx
│   │   │   └── index.ts
│   │   ├── skills/
│   │   │   ├── SkillsSection.tsx  # Skill radar + bar charts
│   │   │   ├── SkillsPage.tsx
│   │   │   └── index.ts
│   ├── shared/
│   │   ├── components/            # Reusable UI (CursorBlast, Layout, NavigationCard, SEO, etc.)
│   │   ├── hooks/                 # `use-mobile`, `use-toast`, ...
│   │   ├── lib/                   # Cross-cutting utilities
│   │   └── ui/                    # Generated shadcn/ui primitives
│   ├── styles/
│   │   └── App.css, index.css     # Tailwind layer + globals
│   └── vite-env.d.ts              # Vite type helpers
├── public/
│   ├── favicon.ico*
│   ├── preview.png                # OG image
│   ├── robots.txt, sitemap.xml
│   ├── placeholder.svg
│   └── Sai_Ram_Maruri_Resume_2025.pdf
├── extra/                         # N8N + Qdrant tooling
│   ├── Ai portfolio chatbot.json
│   ├── Load docs into Qdrant.json
│   └── qdrantpost.py
├── supabase-schema.sql            # DB tables, policies, indexes
├── components.json                # shadcn/ui registry
├── eslint.config.js               # Flat ESLint config
├── index.html                     # Root HTML template
├── package.json / pnpm-lock.yaml / bun.lockb
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig*.json
├── vercel.json
└── vite.config.ts
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
npm run dev:api      # Start Express API server with watch mode (if using)
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
- Use `npm run build:dev` to debug production builds with source maps
- Preview builds with `npm run preview` before deploying
- Check bundle size with `npm run build -- --mode analyze` (requires plugin)

## 🧪 Testing

### Current Status
Testing infrastructure is planned for future implementation.

### Planned Testing Stack
- **Vitest** - Fast unit testing framework powered by Vite
- **React Testing Library** - Component testing with user-centric queries
- **Playwright** - End-to-end testing for critical user flows
- **MSW (Mock Service Worker)** - API mocking for reliable tests

### Future Test Scripts
```bash
npm run test              # Run unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
npm run test:e2e          # Run end-to-end tests
```

## 📈 Performance

### Optimization Strategies
- **Code Splitting** - Route-based chunks reduce initial bundle size
- **Lazy Loading** - Components load on-demand for faster initial render
- **Asset Optimization** - Images optimized and served with proper formats
- **Tree Shaking** - Unused code eliminated during build
- **Minification** - JavaScript and CSS minified for production
- **Caching** - TanStack Query provides intelligent caching layer

### Performance Metrics (Target)
- **First Contentful Paint (FCP)** - < 1.5s
- **Largest Contentful Paint (LCP)** - < 2.5s
- **Time to Interactive (TTI)** - < 3.5s
- **Cumulative Layout Shift (CLS)** - < 0.1
- **First Input Delay (FID)** - < 100ms

### Monitoring
- Vercel Analytics tracks Core Web Vitals
- Performance metrics available in Vercel dashboard
- Real user monitoring for production insights

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

## 🐛 Known Issues & Limitations

### Current Known Issues
1. **Image Optimization** - Badge images in `/public/badges/` are not optimized (500KB+ each)
2. **Dependencies** - Some peer dependencies need to be installed (`npm install` to fix)
3. **Console Logs** - Development console statements present in some production files

### Limitations
- No automated testing suite (planned for future)
- Limited offline functionality (PWA support planned)
- No real-time collaboration features
- Email notifications require manual SMTP configuration
- AI chatbot requires separate N8N instance setup

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve this portfolio:

### Getting Started
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- **Code Style**: Follow the existing ESLint configuration
- **Commits**: Use conventional commit messages (feat:, fix:, docs:, etc.)
- **Testing**: Add tests for new features (when testing infrastructure is implemented)
- **Documentation**: Update README and inline comments for significant changes
- **Types**: Maintain TypeScript type safety throughout the codebase

### Priority Areas for Contribution
- 🧪 Setting up Vitest testing infrastructure
- 🖼️ Image optimization and lazy loading implementation
- ♿ Accessibility improvements and WCAG compliance
- 📝 Documentation enhancements and tutorials
- 🐛 Bug fixes and issue resolution
- 🎨 UI/UX improvements and new components

## 🗺️ Roadmap & Future Enhancements

### 🎯 High Priority
- [ ] **Testing Infrastructure** - Set up Vitest, React Testing Library, and Playwright
- [ ] **Image Optimization** - Convert badge images to WebP and implement lazy loading
- [ ] **Performance** - Implement lazy loading for route components
- [ ] **Accessibility Audit** - Ensure WCAG 2.1 AA compliance across all pages
- [ ] **Error Monitoring** - Integrate Sentry or similar for production error tracking

### 🚀 Feature Enhancements
- [ ] **Blog Search & Filtering** - Add search bar and tag-based filtering for blog posts
- [ ] **Project Filtering** - Filter projects by technology stack and category
- [ ] **Blog Comments** - Implement comment system with moderation
- [ ] **Email Notifications** - Automated alerts for new contact form submissions
- [ ] **RSS Feed** - Generate RSS/Atom feed for blog subscribers
- [ ] **PWA Support** - Add service worker and manifest for offline functionality
- [ ] **Blog Post Views** - Track and display view counts for blog posts
- [ ] **Newsletter System** - Automated email campaigns for blog subscribers

### 🎨 UI/UX Improvements
- [ ] **Dark Mode Animation** - Smooth transition animation for theme toggle
- [ ] **Loading Skeletons** - Add skeleton screens for better perceived performance
- [ ] **Breadcrumb Navigation** - Implement breadcrumbs for better navigation context
- [ ] **Storybook** - Component library documentation and showcase

### 🔧 Developer Experience
- [ ] **API Documentation** - OpenAPI/Swagger docs for API endpoints
- [ ] **Contributing Guidelines** - Detailed contribution guide for open source contributors
- [ ] **Code Coverage** - Achieve 80%+ test coverage
- [ ] **CI/CD Pipeline** - Automated testing and deployment workflows
- [ ] **TypeScript Strict Mode** - Enable strict mode for better type safety

### 📊 Analytics & SEO
- [ ] **Advanced Analytics** - Custom event tracking for user interactions
- [ ] **JSON-LD Structured Data** - Rich snippets for better search engine visibility
- [ ] **Dynamic OG Images** - Auto-generated Open Graph images per blog post
- [ ] **Performance Monitoring** - Real-time performance dashboards

### 🔐 Security & Compliance
- [ ] **Rate Limiting** - API rate limiting to prevent abuse
- [ ] **Input Sanitization** - Enhanced XSS protection and input validation
- [ ] **Security Headers** - Implement comprehensive security headers
- [ ] **GDPR Compliance** - Cookie consent and data privacy features

## 📞 Contact & Support

For questions, suggestions, or collaboration opportunities:

- **Website**: [saiii.in](https://saiii.in)
- **Email**: contact@saiii.in
- **LinkedIn**: [Connect with me](https://www.linkedin.com/in/sairam-maruri/)
- **GitHub**: [Follow for more projects](https://github.com/yourusername)

### Reporting Issues
Found a bug or have a feature request? Please open an issue on GitHub with:
- Clear description of the issue or feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots (if applicable)

---

<div align="center">
  
### ⭐ Star this repo if you found it helpful!

<p>Built with ❤️ by <strong>Sai Ram Maruri</strong></p>

<p>
  <a href="https://saiii.in">Portfolio</a> •
  <a href="https://saiii.in/blogs">Blog</a> •
  <a href="https://saiii.in/projects">Projects</a> •
  <a href="https://saiii.in/contact">Contact</a>
</p>

<p>
  <img src="https://img.shields.io/badge/Made%20with-React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Styled%20with-Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/Powered%20by-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase">
  <img src="https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

<p>
  <sub>If you like this project, consider giving it a ⭐ on GitHub!</sub>
</p>

</div>
