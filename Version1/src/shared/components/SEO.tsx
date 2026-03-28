import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { profileDetails, siteMetadata } from "@/data/siteMetadata";

const SITE_URL = siteMetadata.siteUrl;
const VERSION_BASE_PATH = "/v1";
const DEFAULT_IMAGE = `${SITE_URL}${siteMetadata.previewImage}`;
const AUTHOR_NAME = profileDetails.name;
const SITE_NAME = siteMetadata.applicationName;

const toCanonicalUrl = (path: string) => {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const withBasePath = normalizedPath.startsWith(VERSION_BASE_PATH)
    ? normalizedPath
    : `${VERSION_BASE_PATH}${normalizedPath === "/" ? "" : normalizedPath}`;

  return `${SITE_URL}${withBasePath === VERSION_BASE_PATH ? `${VERSION_BASE_PATH}/` : withBasePath}`;
};

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  canonicalPath?: string;
  type?: "website" | "article" | "profile";
  keywords?: string | string[];
  robots?: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEO = ({
  title = `${profileDetails.name} | Legacy Portfolio`,
  description = `Legacy portfolio of ${profileDetails.name} showcasing AI projects, technical writing, skills, education, and contact details.`,
  image = DEFAULT_IMAGE,
  url,
  canonicalPath,
  type = "website",
  keywords = [...siteMetadata.keywords],
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  pageType = "WebPage",
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  const { pathname } = useLocation();
  const fullTitle = title.includes(profileDetails.name) ? title : `${title} | ${profileDetails.name}`;
  const canonicalUrl = toCanonicalUrl(url ?? canonicalPath ?? pathname);
  const fullImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const keywordContent = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  const schemaType = type === "article" ? "Article" : pageType;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": canonicalUrl,
    "name": fullTitle,
    ...(type === "article" ? { "headline": fullTitle } : {}),
    "description": description,
    "url": canonicalUrl,
    "image": fullImage,
    "isPartOf": {
      "@id": `${toCanonicalUrl("/")}#website`,
    },
    "about": {
      "@id": `${SITE_URL}/#person`,
    },
    "inLanguage": "en-US",
    ...(type === "article"
      ? {
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl,
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
        }
      : {}),
    ...(publishedTime ? { "datePublished": publishedTime } : {}),
    ...(modifiedTime ? { "dateModified": modifiedTime } : {}),
  };

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordContent} />
      <meta name="author" content={AUTHOR_NAME} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:secure_url" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${AUTHOR_NAME} legacy portfolio preview`} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content={siteMetadata.twitterHandle} />
      <meta name="twitter:site" content={siteMetadata.twitterHandle} />

      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {type === "article" && Array.isArray(keywords)
        ? keywords.map((keyword) => (
            <meta key={keyword} property="article:tag" content={keyword} />
          ))
        : null}

      {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
      {modifiedTime ? <meta property="article:modified_time" content={modifiedTime} /> : null}

      <script type="application/ld+json">
        {JSON.stringify(pageSchema)}
      </script>
    </Helmet>
  );
};
