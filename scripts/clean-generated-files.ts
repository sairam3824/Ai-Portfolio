import fs from "node:fs";
import path from "node:path";

const targets = [
    path.resolve("Version1", "dist"),
    path.resolve("Version2", "dist"),
    path.resolve("Version3", "dist"),
    path.resolve("backups", "shared-data", "latest.json"),
];

for (const target of targets) {
    fs.rmSync(target, { force: true, recursive: true });
}

console.log("Generated files cleaned.");
