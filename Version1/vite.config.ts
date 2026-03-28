import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { profileDetails, siteMetadata } from "../shared-data/siteMetadata";

function injectSiteMetadataPlugin(): Plugin {
  const replacements: Record<string, string> = {
    "__SITE_URL__": siteMetadata.siteUrl,
    "__CANONICAL_SITE_URL__": `${siteMetadata.siteUrl}/v1/`,
    "__SITE_TITLE__": `${profileDetails.name} | Legacy Portfolio`,
    "__SITE_DESCRIPTION__": `Legacy portfolio of ${profileDetails.name} highlighting AI projects, technical writing, skills, education, and contact information.`,
    "__SITE_NAME__": `${profileDetails.name} Legacy Portfolio`,
    "__AUTHOR_NAME__": profileDetails.name,
    "__PREVIEW_IMAGE_URL__": `${siteMetadata.siteUrl}${siteMetadata.previewImage}`,
    "__TWITTER_HANDLE__": siteMetadata.twitterHandle,
  };

  return {
    name: "inject-site-metadata",
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (content, [token, value]) => content.replaceAll(token, value),
        html,
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: '/v1/',
  publicDir: path.resolve(__dirname, "../shared-public"),
  server: {
    host: "::",
    port: 3000,
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react(), injectSiteMetadataPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
}));
