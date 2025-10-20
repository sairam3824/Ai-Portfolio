# 🚀 Sai Ram Maruri - AI & Software Developer Portfolio

A modern, interactive portfolio website showcasing my expertise in AI, Machine Learning, and Software Development. Built with React, TypeScript, and Tailwind CSS, featuring an AI-powered chat interface and beautiful animations.

## ✨ Features

- **🎨 Modern Design**: Clean, responsive UI with smooth animations and hover effects
- **🤖 AI Chat Interface**: Interactive chat powered by n8n webhooks for real-time conversations
- **📱 Fully Responsive**: Optimized for all devices and screen sizes
- **🌙 Dark Mode**: Beautiful dark theme with smooth transitions
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🎯 Interactive Elements**: Cursor blast effects, smooth scrolling, and engaging animations
- **📊 Comprehensive Sections**: About, Projects, Skills, Education, Certifications, and Contact

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **AI Integration**: n8n webhooks
- **Build Tool**: Vite with SWC
- **Package Manager**: npm/pnpm/bun

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm, pnpm, or bun package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sairam3824/my-cool-comeback-main.git
   cd my-cool-comeback-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your n8n webhook URL:
   ```env
   VITE_N8N_WEBHOOK_URL=https://your-n8n-instance.app.n8n.cloud/webhook/your-webhook-id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` to view the portfolio.

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/           # Portfolio sections
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── CertificationSection.tsx
│   │   └── ContactSection.tsx
│   ├── ui/                 # Reusable UI components
│   ├── ChatDialog.tsx      # AI chat interface
│   ├── CursorBlast.tsx     # Interactive cursor effects
│   └── NavigationCard.tsx  # Navigation components
├── pages/
│   ├── Index.tsx          # Main portfolio page
│   └── NotFound.tsx       # 404 page
├── assets/                # Images and static assets
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤖 AI Chat Integration

The portfolio includes an AI-powered chat interface that connects to n8n workflows:

1. **Setup n8n Webhook**: Create a webhook in your n8n instance
2. **Configure Environment**: Add your webhook URL to `.env`
3. **Test Integration**: Use the search box or chat dialog to interact

### Chat Features

- Real-time conversation with AI
- Session management
- Error handling and user feedback
- Responsive design

## 🎨 Customization

### Personal Information

Update the following files with your information:

- `src/pages/Index.tsx` - Hero section and navigation
- `src/components/sections/AboutSection.tsx` - Personal details
- `src/components/sections/ProjectsSection.tsx` - Your projects
- `src/components/sections/SkillsSection.tsx` - Skills and expertise
- `src/components/sections/EducationSection.tsx` - Education background
- `src/components/sections/FunSection.tsx` - Certifications
- `src/components/sections/ContactSection.tsx` - Contact information

### Styling

- Modify `tailwind.config.ts` for theme customization
- Update `src/index.css` for global styles
- Customize component styles in individual files

### Assets

- Replace `src/assets/avatar.png` with your photo
- Update `src/assets/logo.png` with your logo
- Add your resume to `public/` directory

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- **Desktop**: Full experience with all animations
- **Tablet**: Adapted layout with touch-friendly interactions
- **Mobile**: Streamlined interface with optimized navigation

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_N8N_WEBHOOK_URL` | n8n webhook URL for AI chat | Yes |

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Other Platforms

The project can be deployed to any static hosting service that supports SPA routing.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [Apache 2.0 License](LICENSE).

## 📞 Contact

**Sai Rama Linga Reddy Maruri**

- 📧 Email: [sairam.maruri@gmail.com](mailto:sairam.maruri@gmail.com)
- 📱 Phone: +91 7893865644
- 💼 LinkedIn: [sairam-maruri](https://www.linkedin.com/in/sairam-maruri)
- 🐙 GitHub: [sairam3824](https://github.com/sairam3824)

## 🙏 Acknowledgments

- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/) components
- **Icons**: Powered by [Lucide React](https://lucide.dev/)
- **Styling**: Styled with [Tailwind CSS](https://tailwindcss.com/)
- **Development**: Enhanced with [Lovable](https://lovable.dev/) for rapid prototyping

---

<div align="center">
  <p>⭐ Star this repository if you found it helpful!</p>
</div># Security update completed
