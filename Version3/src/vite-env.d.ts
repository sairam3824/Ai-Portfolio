/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_ADMIN_USERNAME: string
    readonly VITE_ADMIN_PASSWORD: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_N8N_WEBHOOK_URL: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
