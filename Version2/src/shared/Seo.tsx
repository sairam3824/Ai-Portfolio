import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";

const SITE_URL = siteMetadata.siteUrl;
const DEFAULT_IMAGE = `${SITE_URL}${siteMetadata.previewImage}`;
const SITE_NAME = profileDetails.name;
const AUTHOR_NAME = profileDetails.name;
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const getImageMimeType = (imageUrl: string) => {
    if (imageUrl.endsWith(".png")) return "image/png";
    if (imageUrl.endsWith(".webp")) return "image/webp";
    if (imageUrl.endsWith(".jpg") || imageUrl.endsWith(".jpeg")) return "image/jpeg";
    if (imageUrl.endsWith(".svg")) return "image/svg+xml";
    return siteMetadata.previewImageType;
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
    keywords?: string[];
};

const Seo = ({
    title,
    description,
    image = DEFAULT_IMAGE,
    type = "website",
    pageType = "WebPage",
    canonical,
    robots = DEFAULT_ROBOTS,
    publishedTime,
    modifiedTime,
    breadcrumbs,
    keywords,
}: SeoProps) => {
    const { pathname } = useLocation();
    const url = canonical ?? `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
    const imageType = getImageMimeType(fullImage);
    const imageAlt = `${title} | ${SITE_NAME}`;

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
            "@id": `${SITE_URL}/#website`
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
            <meta name="googlebot" content={robots} />
            <meta name="bingbot" content={robots} />
            <link rel="canonical" href={url} />
            {keywords && keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(", ")} />
            )}

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:image:url" content={fullImage} />
            <meta property="og:image:secure_url" content={fullImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={imageAlt} />
            <meta property="og:image:type" content={imageType} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_US" />
            {modifiedTime && <meta property="og:updated_time" content={modifiedTime} />}

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImage} />
            <meta name="twitter:image:alt" content={imageAlt} />
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
