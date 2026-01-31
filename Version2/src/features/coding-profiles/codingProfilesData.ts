export interface CodingProfileData {
    label: string;
    href: string;
    stats: string;
    desc: string;
    color: string;
    iconName: string;
    featured?: boolean;
}

export const codingProfilesData: CodingProfileData[] = [
    {
        label: "LeetCode",
        href: "https://leetcode.com/u/programmer3824/",
        stats: "2500+ \u2022 Guardian",
        desc: "Expert algorithmic proficiency with Guardian rank among the top 1% of global coders.",
        color: "orange",
        iconName: "leetcode-img",
        featured: true,
    },
    {
        label: "CodeChef",
        href: "https://www.codechef.com/users/sairam2004",
        stats: "3\u2605 \u2022 1600+",
        desc: "Consistent performance in long and short format competitive programming contests.",
        color: "yellow",
        iconName: "codechef-img",
        featured: true,
    },
    {
        label: "LeetCode Streak",
        href: "https://leetcode.com/u/sairam3824/",
        stats: "1000+ problems solved",
        desc: "Dedicated daily problem-solving regimen maintaining high analytical momentum.",
        color: "cyan",
        iconName: "Activity",
    },
    {
        label: "InterviewBit",
        href: "https://www.interviewbit.com/profile/sai-rama-linga-reddy-maruri/",
        stats: "Active",
        desc: "Mastering complex data structures and curated interview patterns.",
        color: "indigo",
        iconName: "Target",
    },
    {
        label: "TakeUForward",
        href: "https://takeuforward.org/plus/profile/sairam3824",
        stats: "Active",
        desc: "Deep-diving into high-level DSA concepts and technical interview preparation.",
        color: "emerald",
        iconName: "Cpu",
    },
    {
        label: "Codeforces",
        href: "https://codeforces.com/profile/sairam3824",
        stats: "Active",
        desc: "Engaging in rapid problem-solving and real-time algorithmic competitions.",
        color: "rose",
        iconName: "Globe",
    },
    {
        label: "Codolio",
        href: "https://codolio.com/profile/sairam3824",
        stats: "Global Rank",
        desc: "Unified analytics dashboard showcasing global programming footprint.",
        color: "slate",
        iconName: "Code",
    },
];
