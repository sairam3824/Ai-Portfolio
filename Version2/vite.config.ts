import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

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

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        preloadAvatarPlugin(),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
            threshold: 512,
            deleteOriginFile: false,
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
            threshold: 512,
            deleteOriginFile: false,
        }),
        VitePWA({
            registerType: 'autoUpdate',
            minify: true,
            disable: process.env.DISABLE_PWA === 'true',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif,woff2}'],
                navigateFallback: '/index.html',
                navigateFallbackDenylist: [/^\/v1/, /^\/api/],
                cleanupOutdatedCaches: true,
                skipWaiting: true,
                clientsClaim: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'gstatic-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /^https:\/\/.*\.supabase\.co\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'supabase-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 5
                            },
                            networkTimeoutSeconds: 10,
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            },
            manifest: {
                name: 'Sai Ram Maruri Portfolio',
                short_name: 'Sai Ram',
                description: 'AI Engineer & Software Developer Portfolio',
                lang: 'en',
                dir: 'ltr',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                scope: '/',
                orientation: 'portrait-primary',
                icons: [
                    {
                        src: 'favicon.ico',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon'
                    },
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any'
                    },
                    {
                        src: 'pwa-maskable-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'maskable'
                    }
                ]
            }
        })
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
