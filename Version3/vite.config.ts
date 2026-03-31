import fs from 'fs';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { profileDetails, siteMetadata } from '../shared-data/siteMetadata';
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

function injectSiteMetadataPlugin(): Plugin {
    const replacements: Record<string, string> = {
        '%SITE_URL%': siteMetadata.siteUrl,
        '%CANONICAL_SITE_URL%': siteMetadata.siteUrl,
        '%SITE_SEARCH_URL%': `${siteMetadata.siteUrl}/writing`,
        '%SITE_TITLE%': siteMetadata.defaultTitle,
        '%SITE_DESCRIPTION%': siteMetadata.defaultDescription,
        '%SITE_NAME%': profileDetails.name,
        '%APPLICATION_NAME%': siteMetadata.applicationName,
        '%SITE_BRAND%': profileDetails.brand,
        '%ALTERNATE_NAME%': profileDetails.alternateName,
        '%EMAIL%': profileDetails.email,
        '%PREVIEW_IMAGE_URL%': `${siteMetadata.siteUrl}${siteMetadata.previewImage}`,
        '%PREVIEW_IMAGE_TYPE%': siteMetadata.previewImageType,
        '%SHORT_ROLE%': profileDetails.shortRole,
        '%JOB_TITLE%': profileDetails.jobTitle,
        '%ALUMNI_NAME%': siteMetadata.alumniOf.name,
        '%ALUMNI_URL%': siteMetadata.alumniOf.url,
        '%KNOWS_ABOUT_JSON%': JSON.stringify(siteMetadata.knowsAbout),
        '%SAME_AS_JSON%': JSON.stringify(siteMetadata.sameAs),
    };

    return {
        name: 'inject-site-metadata',
        transformIndexHtml(html) {
            return Object.entries(replacements).reduce(
                (content, [token, value]) => content.replaceAll(token, value),
                html,
            );
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
export default defineConfig(({ mode }) => {
    const envDir = path.resolve(__dirname, '..');
    const env = loadEnv(mode, envDir, '');
    const chatProxyTarget = env.VITE_CHAT_PROXY_TARGET || 'http://127.0.0.1:3000';

    return {
        base: '/',
        envDir,
        publicDir: path.resolve(__dirname, "../shared-public"),
        plugins: [
        react(),
        preloadAvatarPlugin(),
        injectSiteMetadataPlugin(),
        writeSeoArtifactsPlugin()
        ],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "lucide-react": path.resolve(__dirname, "./node_modules/lucide-react"),
            },
        },
        server: {
            fs: {
                allow: [path.resolve(__dirname, "..")],
            },
            proxy: {
                // Forward Vite dev requests to the root Vercel dev server so
                // `/api/chat` works locally without changing the frontend URL.
                '/api': {
                    target: chatProxyTarget,
                    changeOrigin: true,
                },
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
    };
});
