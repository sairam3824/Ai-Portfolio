import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";

const SITE_URL = siteMetadata.siteUrl;
const SITE_PATH_PREFIX = "/v3";
const DEFAULT_IMAGE = `${SITE_URL}${siteMetadata.previewImage}`;
const SITE_NAME = profileDetails.name;
const AUTHOR_NAME = profileDetails.name;

const toCanonicalUrl = (path: string) => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    const withBasePath = normalizedPath.startsWith(SITE_PATH_PREFIX)
        ? normalizedPath
        : `${SITE_PATH_PREFIX}${normalizedPath === "/" ? "" : normalizedPath}`;

    return `${SITE_URL}${withBasePath === SITE_PATH_PREFIX ? `${SITE_PATH_PREFIX}/` : withBasePath}`;
};

type BreadcrumbItem = {
    name: string;
    url: string;
};

type PageType = "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";

type SeoProps = {
    title: string;
    description: string;
    image?: string;
    type?: "website" | "article";
    pageType?: PageType;
    canonical?: string;
    robots?: string;
    publishedTime?: string;
    modifiedTime?: string;
    breadcrumbs?: BreadcrumbItem[];
    keywords?: readonly string[];
};

const Seo = ({
    title,
    description,
    image = DEFAULT_IMAGE,
    type = "website",
    pageType = "WebPage",
    canonical,
    robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    publishedTime,
    modifiedTime,
    breadcrumbs,
    keywords,
}: SeoProps) => {
    const { pathname } = useLocation();
    const url = canonical ? toCanonicalUrl(canonical) : toCanonicalUrl(pathname);
    const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": toCanonicalUrl(item.url)
        }))
    } : null;

    const schemaType = type === "article" ? "Article" : pageType;

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": schemaType,
        "@id": url,
        "name": title,
        ...(type === "article" ? { "headline": title } : {}),
        "description": description,
        "url": url,
        "image": fullImage,
        "isPartOf": {
            "@id": `${toCanonicalUrl("/")}#website`
        },
        "about": {
            "@id": `${SITE_URL}/#person`
        },
        "inLanguage": "en-US",
        ...(type === "article" ? {
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": url,
            },
            "author": {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                "name": AUTHOR_NAME,
                "url": SITE_URL,
            },
            "publisher": {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                "name": AUTHOR_NAME,
                "url": SITE_URL,
            },
        } : {}),
        ...(publishedTime && { "datePublished": publishedTime }),
        ...(modifiedTime && { "dateModified": modifiedTime }),
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="author" content={AUTHOR_NAME} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={url} />
            {keywords && keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(", ")} />
            )}

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:secure_url" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={`${profileDetails.name} — ${profileDetails.shortRole} Portfolio`} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            {modifiedTime && <meta property="og:updated_time" content={modifiedTime} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:image:alt" content={`${profileDetails.name} — ${profileDetails.shortRole} Portfolio`} />
            <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
            <meta name="twitter:site" content={siteMetadata.twitterHandle} />

            {type === "article" && (
                <>
                    <meta property="article:author" content={AUTHOR_NAME} />
                    {keywords?.map((keyword) => (
                        <meta key={keyword} property="article:tag" content={keyword} />
                    ))}
                    {publishedTime && (
                        <meta property="article:published_time" content={publishedTime} />
                    )}
                    {modifiedTime && (
                        <meta property="article:modified_time" content={modifiedTime} />
                    )}
                </>
            )}

            <script type="application/ld+json">
                {JSON.stringify(webPageSchema)}
            </script>

            {breadcrumbSchema && (
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            )}
        </Helmet>
    );
};

export default Seo;
