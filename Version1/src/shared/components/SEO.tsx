import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
  keywords?: string;
}

export const SEO = ({
  title = "Sai Ram - AI & Software Developer",
  description = "Portfolio of Sai Rama Linga Reddy Maruri - AI & Software Developer specializing in modern web technologies, machine learning, and innovative solutions.",
  image = "https://saiii.in/preview.png",
  url = "https://saiii.in",
  type = "website",
  keywords = "AI Developer, Software Engineer, React, TypeScript, Machine Learning, Web Development, Portfolio",
}: SEOProps) => {
  const fullTitle = title.includes("Sai Ram") ? title : `${title} | Sai Ram`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sai Rama Linga Reddy Maruri" />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Sai Ram Portfolio" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};
