export interface EducationEntry {
    title: string;
    major?: string;
    org: string;
    campus?: string;
    date: string;
    place: string;
    grade: string;
    type: "University" | "College" | "School";
    featured?: boolean;
    color?: "blue" | "indigo" | "emerald";
    courses: string[];
}

export const educationData: EducationEntry[] = [
    {
        title: "Bachelor of Technology",
        major: "Computer Science",
        org: "Vellore Institute of Technology",
        campus: "AP",
        date: "2022 - 2026",
        place: "Amaravati, Andhra Pradesh, India",
        grade: "8.31 CGPA",
        type: "University",
        featured: true,
        color: "blue",
        courses: [
            "Data Structures & Algorithms",
            "Operating Systems",
            "OOP",
            "Software Engineering (Design Patterns, System Design)",
            "Computer Networks",
            "Deep Learning",
            "NoSQL databases",
        ],
    },
    {
        title: "Intermediate Education",
        major: "MPC",
        org: "Sri Chaitanya Junior College",
        date: "2020 - 2022",
        place: "Vijayawada, Andhra Pradesh, India",
        grade: "83.7%",
        type: "College",
        color: "indigo",
        courses: ["Mathematics", "Physics", "Chemistry"],
    },
    {
        title: "Secondary Education",
        org: "Sri Chaitanya High School",
        date: "2020",
        place: "Vijayawada, Andhra Pradesh, India",
        grade: "97.1%",
        type: "School",
        color: "emerald",
        courses: ["Foundation", "General Sciences", "Mathematics"],
    },
];
