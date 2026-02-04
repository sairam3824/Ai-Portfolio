import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://sairammaruri.com";
const DEFAULT_IMAGE = `${SITE_URL}/preview.webp`;
const SITE_NAME = "Sai Ram Maruri";

type SeoProps = {
    title: string;
    description: string;
    image?: string;
    type?: "website" | "article";
    canonical?: string;
    robots?: string;
    publishedTime?: string;
};

const Seo = ({
    title,
    description,
    image = DEFAULT_IMAGE,
    type = "website",
    canonical,
    robots = "index,follow",
    publishedTime,
}: SeoProps) => {
    const { pathname } = useLocation();
    const url = canonical ?? `${SITE_URL}${pathname === "/" ? "" : pathname}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={url} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={SITE_NAME} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {publishedTime ? (
                <meta property="article:published_time" content={publishedTime} />
            ) : null}
        </Helmet>
    );
};

export default Seo;
