import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://saiii.in";
const DEFAULT_IMAGE = `${SITE_URL}/preview.png`;
const SITE_NAME = "Sai Ram Maruri";
const AUTHOR_NAME = "Sai Ram Maruri";

type BreadcrumbItem = {
    name: string;
    url: string;
};

type SeoProps = {
    title: string;
    description: string;
    image?: string;
    type?: "website" | "article";
    canonical?: string;
    robots?: string;
    publishedTime?: string;
    modifiedTime?: string;
    breadcrumbs?: BreadcrumbItem[];
    keywords?: string[];
};

const Seo = ({
    title,
    description,
    image = DEFAULT_IMAGE,
    type = "website",
    canonical,
    robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    publishedTime,
    modifiedTime,
    breadcrumbs,
    keywords,
}: SeoProps) => {
    const { pathname } = useLocation();
    const url = canonical ?? `${SITE_URL}${pathname === "/" ? "" : pathname}`;
    const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
        }))
    } : null;

    const webPageSchema = {
        "@context": "https://schema.org",
        "@type": type === "article" ? "Article" : "WebPage",
        "@id": url,
        "name": title,
        "description": description,
        "url": url,
        "image": fullImage,
        "isPartOf": {
            "@id": "https://saiii.in/#website"
        },
        "about": {
            "@id": "https://saiii.in/#person"
        },
        "inLanguage": "en-US",
        ...(publishedTime && { "datePublished": publishedTime }),
        ...(modifiedTime && { "dateModified": modifiedTime }),
    };

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
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
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:site" content="Sai Ram Maruri" />

            {type === "article" && (
                <>
                    <meta property="article:author" content={AUTHOR_NAME} />
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
