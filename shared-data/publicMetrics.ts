import { profileDetails } from "./siteMetadata";

export type PublicMetric = {
    label: string;
    value: string;
    sub: string;
    href: string;
    external?: boolean;
};

export const publicMetrics: readonly PublicMetric[] = [
    {
        label: "LeetCode",
        value: "2400+",
        sub: "Guardian",
        href: profileDetails.socials.leetcodePrimary,
        external: true,
    },
    {
        label: "DSA Solved",
        value: "1000+",
        sub: "Problems",
        href: profileDetails.socials.leetcodeSecondary,
        external: true,
    },
    {
        label: "Projects",
        value: "64+",
        sub: "Built",
        href: "/projects",
    },
    {
        label: "CodeChef",
        value: "3★",
        sub: "1600+ Rating",
        href: profileDetails.socials.codechef,
        external: true,
    },
    {
        label: "Skills",
        value: "79+",
        sub: "Mastered",
        href: "/skills",
    },
    {
        label: "Live SaaS",
        value: "11+",
        sub: "Deployed",
        href: "/projects",
    },
    {
        label: "Certs",
        value: "12+",
        sub: "Earned",
        href: "/certifications",
    },
];
