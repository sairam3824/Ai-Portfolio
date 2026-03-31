import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = path.join(repoRoot, "Version1", "dist");
const destinationDir = path.join(repoRoot, "Version3", "dist", "v1");

if (!fs.existsSync(sourceDir)) {
    throw new Error(`Version1 build output is missing at ${sourceDir}. Run the Version1 build before copying.`);
}

fs.rmSync(destinationDir, { recursive: true, force: true });
fs.mkdirSync(destinationDir, { recursive: true });
fs.cpSync(sourceDir, destinationDir, { recursive: true });

console.log(`Copied ${sourceDir} -> ${destinationDir}`);
