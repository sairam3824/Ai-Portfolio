export const ROUTE_PATHS = {
    home: "/",
    about: "/about",
    projects: "/projects",
    skills: "/skills",
    education: "/education",
    resume: "/resume",
    codingProfiles: "/coding-profiles",
    writing: "/writing",
    legacyWriting: "/blogs",
    certifications: "/certifications",
    contact: "/contact",
    privacy: "/privacy",
    terms: "/terms",
} as const;

export const WRITING_LABEL = "Writing";

export const getWritingPath = (slug?: string) =>
    slug ? `${ROUTE_PATHS.writing}/${slug}` : ROUTE_PATHS.writing;

export const getLegacyWritingPath = (slug?: string) =>
    slug ? `${ROUTE_PATHS.legacyWriting}/${slug}` : ROUTE_PATHS.legacyWriting;
