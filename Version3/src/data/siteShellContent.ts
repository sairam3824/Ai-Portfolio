import { profileDetails } from "@/data/siteMetadata";
import { ROUTE_PATHS, WRITING_LABEL } from "@/data/siteRoutes";

export const siteShellContent = {
    brand: profileDetails.brand,
    resumeHref: profileDetails.resumeHref,
    nav: [
        { label: "About", href: "/about" },
        { label: "Skills", href: "/skills" },
        { label: "Projects", href: "/projects" },
        { label: WRITING_LABEL, href: ROUTE_PATHS.writing },
        { label: "Contact", href: "/contact" },
    ],
    footerLinks: [
        { label: "About", href: "/about" },
        { label: "Skills", href: "/skills" },
        { label: "Projects", href: "/projects" },
        { label: WRITING_LABEL, href: ROUTE_PATHS.writing },
        { label: "Contact", href: "/contact" },
    ],
} as const;
