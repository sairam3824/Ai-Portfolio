import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { blogPosts } from "../shared-data/blogData";
import { certifications } from "../shared-data/certificationsData";
import { codingProfilesData } from "../shared-data/codingProfilesData";
import { educationData } from "../shared-data/educationData";
import { projectsData } from "../shared-data/projectsData";
import { ROUTE_PATHS } from "../shared-data/siteRoutes";
import { profileDetails, siteMetadata } from "../shared-data/siteMetadata";
import { skillCategories } from "../shared-data/skillsData";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const snapshotDir = path.join(repoRoot, "backups", "shared-data");
const exportedAt = new Date().toISOString();

const snapshot = {
    schemaVersion: 1,
    exportedAt,
    profileDetails,
    siteMetadata,
    routePaths: ROUTE_PATHS,
    counts: {
        blogPosts: blogPosts.length,
        certifications: certifications.length,
        codingProfiles: codingProfilesData.length,
        educationEntries: educationData.length,
        projects: projectsData.length,
        skillCategories: skillCategories.length,
    },
    data: {
        blogPosts,
        certifications,
        codingProfilesData,
        educationData,
        projectsData,
        skillCategories,
    },
} as const;

fs.mkdirSync(snapshotDir, { recursive: true });

const latestPath = path.join(snapshotDir, "latest.json");

for (const fileName of fs.readdirSync(snapshotDir)) {
    if (fileName.endsWith(".json")) {
        fs.unlinkSync(path.join(snapshotDir, fileName));
    }
}

const serialized = `${JSON.stringify(snapshot, null, 2)}\n`;

fs.writeFileSync(latestPath, serialized, "utf8");

console.log(`Shared-data snapshot written to:\n- ${latestPath}`);
