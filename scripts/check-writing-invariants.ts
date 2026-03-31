import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildRootSitemapXml, buildVersion3SitemapXml } from "../shared-data/seoArtifacts";
import { ROUTE_PATHS, getLegacyWritingPath, getWritingPath } from "../shared-data/siteRoutes";

type RedirectRule = {
    source: string;
    destination: string;
    permanent?: boolean;
};

type VercelConfig = {
    redirects?: RedirectRule[];
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const assert = (condition: unknown, message: string) => {
    if (!condition) {
        throw new Error(message);
    }
};

const readJson = <T>(filePath: string): T =>
    JSON.parse(fs.readFileSync(path.join(repoRoot, filePath), "utf8")) as T;

const hasRedirect = (config: VercelConfig, source: string, destination: string) =>
    config.redirects?.some((rule) => rule.source === source && rule.destination === destination && rule.permanent === true);

const validateRedirects = () => {
    const rootConfig = readJson<VercelConfig>("vercel.json");
    const version1Config = readJson<VercelConfig>("Version1/vercel.json");
    const version2Config = readJson<VercelConfig>("Version2/vercel.json");
    const version3Config = readJson<VercelConfig>("Version3/vercel.json");

    assert(
        hasRedirect(rootConfig, getLegacyWritingPath(), ROUTE_PATHS.writing),
        "Root vercel.json must permanently redirect /blogs to /writing.",
    );
    assert(
        hasRedirect(rootConfig, `${getLegacyWritingPath()}/:path*`, `${ROUTE_PATHS.writing}/:path*`),
        "Root vercel.json must permanently redirect /blogs/:path* to /writing/:path*.",
    );
    assert(
        hasRedirect(rootConfig, `/v1${getLegacyWritingPath()}`, `/v1${ROUTE_PATHS.writing}`),
        "Root vercel.json must permanently redirect /v1/blogs to /v1/writing.",
    );
    assert(
        hasRedirect(rootConfig, `/v1${getLegacyWritingPath()}/:path*`, `/v1${ROUTE_PATHS.writing}/:path*`),
        "Root vercel.json must permanently redirect /v1/blogs/:path* to /v1/writing/:path*.",
    );

    [version1Config, version2Config, version3Config].forEach((config, index) => {
        const label = `Version${index + 1}`;
        assert(
            hasRedirect(config, getLegacyWritingPath(), ROUTE_PATHS.writing),
            `${label} vercel.json must permanently redirect /blogs to /writing.`,
        );
        assert(
            hasRedirect(config, `${getLegacyWritingPath()}/:path*`, `${ROUTE_PATHS.writing}/:path*`),
            `${label} vercel.json must permanently redirect /blogs/:path* to /writing/:path*.`,
        );
    });
};

const validateSitemaps = () => {
    const rootSitemap = buildRootSitemapXml();
    const version3Sitemap = buildVersion3SitemapXml();

    assert(rootSitemap.includes("<loc>https://saiii.in/writing</loc>"), "Root sitemap must include /writing.");
    assert(rootSitemap.includes("<loc>https://saiii.in/v1/writing</loc>"), "Root sitemap must include /v1/writing.");
    assert(rootSitemap.includes(`<loc>https://saiii.in${getWritingPath("openai-codex")}</loc>`), "Root sitemap must include writing detail URLs.");
    assert(!rootSitemap.includes("<loc>https://saiii.in/blogs</loc>"), "Root sitemap must not include /blogs.");
    assert(!rootSitemap.includes("<loc>https://saiii.in/v1/blogs</loc>"), "Root sitemap must not include /v1/blogs.");

    assert(version3Sitemap.includes("<loc>https://saiii.in/v3/writing</loc>"), "Version3 sitemap must include /v3/writing.");
    assert(!version3Sitemap.includes("<loc>https://saiii.in/v3/blogs</loc>"), "Version3 sitemap must not include /v3/blogs.");
};

const validateAliases = () => {
    const requiredFiles = [
        "shared-data/siteRoutes.ts",
        "Version1/src/data/siteRoutes.ts",
        "Version2/src/data/siteRoutes.ts",
        "Version3/src/data/siteRoutes.ts",
        "Version1/src/features/writing/index.ts",
        "Version2/src/features/writing/index.ts",
        "Version3/src/features/writing/index.ts",
        "api/writing-subscribe.ts",
    ];

    requiredFiles.forEach((filePath) => {
        assert(fs.existsSync(path.join(repoRoot, filePath)), `Missing required long-term maintenance file: ${filePath}`);
    });
};

validateRedirects();
validateSitemaps();
validateAliases();

console.log("Writing invariants passed.");
