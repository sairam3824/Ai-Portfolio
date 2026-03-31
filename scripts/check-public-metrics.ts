import { certifications } from "../shared-data/certificationsData";
import { codingProfilesData } from "../shared-data/codingProfilesData";
import { projectsData } from "../shared-data/projectsData";
import { publicMetrics } from "../shared-data/publicMetrics";
import { skillCategories } from "../shared-data/skillsData";

const metricMap = new Map(publicMetrics.map((metric) => [metric.label, metric]));

const expectMetric = (label: string) => {
    const metric = metricMap.get(label);
    if (!metric) {
        throw new Error(`Missing public metric: ${label}`);
    }
    return metric;
};

const assertEqual = (actual: string, expected: string, message: string) => {
    if (actual !== expected) {
        throw new Error(`${message}\nExpected: ${expected}\nReceived: ${actual}`);
    }
};

const totalSkills = skillCategories.reduce((count, category) => count + category.skills.length, 0);
const liveProjects = projectsData.filter((project) => project.link).length;

const leetCodeProfile = codingProfilesData.find((profile) => profile.label === "LeetCode");
const streakProfile = codingProfilesData.find((profile) => profile.label === "LeetCode Streak");
const codeChefProfile = codingProfilesData.find((profile) => profile.label === "CodeChef");

if (!leetCodeProfile || !streakProfile || !codeChefProfile) {
    throw new Error("Required coding profiles for public metrics are missing.");
}

const [leetCodeValue, leetCodeSub] = leetCodeProfile.stats.split("•").map((part) => part.trim());
const [codeChefValue, codeChefSubValue] = codeChefProfile.stats.split("•").map((part) => part.trim());
const dsaValue = streakProfile.stats.replace(" problems solved", "");

assertEqual(expectMetric("LeetCode").value, leetCodeValue, "LeetCode metric value drifted from coding profile data.");
assertEqual(expectMetric("LeetCode").sub, leetCodeSub, "LeetCode metric subtitle drifted from coding profile data.");
assertEqual(expectMetric("DSA Solved").value, dsaValue, "DSA solved metric value drifted from coding profile data.");
assertEqual(expectMetric("Projects").value, `${projectsData.length}+`, "Projects metric drifted from projects data.");
assertEqual(expectMetric("CodeChef").value, codeChefValue, "CodeChef metric value drifted from coding profile data.");
assertEqual(expectMetric("CodeChef").sub, `${codeChefSubValue} Rating`, "CodeChef metric subtitle drifted from coding profile data.");
assertEqual(expectMetric("Skills").value, `${totalSkills}+`, "Skills metric drifted from skills data.");
assertEqual(expectMetric("Live SaaS").value, `${liveProjects}+`, "Live SaaS metric drifted from projects data.");
assertEqual(expectMetric("Certs").value, `${certifications.length}+`, "Certs metric drifted from certifications data.");

console.log("Public metrics passed.");
