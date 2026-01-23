import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - Core dependencies
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            
            // UI library - Radix UI components
            if (id.includes('@radix-ui')) {
              return 'radix-vendor';
            }
            
            // Form libraries
            if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) {
              return 'form-vendor';
            }
            
            // Animation library
            if (id.includes('framer-motion')) {
              return 'animation-vendor';
            }
            
            // Query and data fetching
            if (id.includes('@tanstack/react-query')) {
              return 'query-vendor';
            }
            
            // Icons
            if (id.includes('lucide-react')) {
              return 'icons-vendor';
            }
            
            // Remaining node_modules
            return 'vendor';
          }
          
          // Feature-based chunks - Lazy loaded routes
          if (id.includes('src/features/blog')) {
            return 'blog-feature';
          }
          
          if (id.includes('src/features/admin')) {
            return 'admin-feature';
          }
          
          if (id.includes('src/features/projects')) {
            return 'projects-feature';
          }
          
          if (id.includes('src/features/about')) {
            return 'about-feature';
          }
          
          if (id.includes('src/features/skills')) {
            return 'skills-feature';
          }
          
          if (id.includes('src/features/education')) {
            return 'education-feature';
          }
          
          if (id.includes('src/features/certifications')) {
            return 'certifications-feature';
          }
          
          if (id.includes('src/features/contact')) {
            return 'contact-feature';
          }
          
          if (id.includes('src/features/profile')) {
            return 'profile-feature';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));
