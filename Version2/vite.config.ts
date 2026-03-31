import fs from 'fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { buildRootRobotsTxt, buildRootSitemapXml } from '../shared-data/seoArtifacts';

// Inject <link rel="preload"> for the hashed avatar image so the browser
// can start downloading it immediately instead of waiting for React to render.
function preloadAvatarPlugin(): Plugin {
    return {
        name: 'preload-avatar',
        enforce: 'post',
        transformIndexHtml(html, ctx) {
            const bundle = ctx.bundle;
            if (!bundle) return html;
            for (const fileName of Object.keys(bundle)) {
                if (fileName.includes('avatar_optimized') && fileName.endsWith('.jpg')) {
                    const tag = `<link rel="preload" as="image" href="/${fileName}" fetchpriority="high" />`;
                    return html.replace('</head>', `    ${tag}\n</head>`);
                }
            }
            return html;
        },
    };
}

function writeSeoArtifactsPlugin(): Plugin {
    let outDir = '';

    return {
        name: 'write-seo-artifacts',
        apply: 'build',
        configResolved(config) {
            outDir = path.resolve(config.root, config.build.outDir);
        },
        closeBundle() {
            if (!outDir) return;
            fs.mkdirSync(outDir, { recursive: true });
            fs.writeFileSync(path.join(outDir, 'robots.txt'), buildRootRobotsTxt(), 'utf8');
            fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildRootSitemapXml(), 'utf8');
        },
    };
}

// https://vitejs.dev/config/
export default defineConfig({
    envDir: path.resolve(__dirname, ".."),
    publicDir: path.resolve(__dirname, "../shared-public"),
    plugins: [
        react(),
        preloadAvatarPlugin(),
        writeSeoArtifactsPlugin(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        target: 'esnext',
        modulePreload: {
            polyfill: false,
        },
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom') || id.includes('react-router') || id.includes('react-helmet-async')) {
                            return 'vendor';
                        }
                        if (id.includes('lucide-react')) return 'icons';
                        if (id.includes('@supabase')) return 'supabase';
                        if (id.includes('web-vitals')) return 'web-vitals';
                    }
                },
            },
        },
        chunkSizeWarningLimit: 1000,
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 2,
            },
        },
    },
});
