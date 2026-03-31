import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const distAssetsDir = path.resolve("Version3", "dist", "assets");

if (!fs.existsSync(distAssetsDir)) {
    throw new Error("Version3 build output was not found. Run the Version3 build before checking bundle budgets.");
}

const budgets = [
    { label: "Version3 CSS", prefix: "index-", extension: ".css", maxGzipBytes: 23 * 1024 },
    { label: "Version3 Shell", prefix: "index-", extension: ".js", maxGzipBytes: 8 * 1024 },
    { label: "Version3 HomePage", prefix: "HomePage-", extension: ".js", maxGzipBytes: 5 * 1024 },
    { label: "Version3 ChatWidget", prefix: "ChatWidget-", extension: ".js", maxGzipBytes: 3 * 1024 },
    { label: "Version3 Contact Page", prefix: "ContactPage-", extension: ".js", maxGzipBytes: 3 * 1024 },
    { label: "Version3 Message Dialog", prefix: "MessageDialog-", extension: ".js", maxGzipBytes: 3 * 1024 },
    { label: "Version3 Featured Work", prefix: "HomeFeaturedWorkSection-", extension: ".js", maxGzipBytes: 3 * 1024 },
    { label: "Version3 Arsenal", prefix: "HomeArsenalSection-", extension: ".js", maxGzipBytes: 2 * 1024 },
    { label: "Version3 Credentials", prefix: "HomeCredentialsSection-", extension: ".js", maxGzipBytes: 4 * 1024 },
    { label: "Version3 Dispatches", prefix: "HomeDispatchesSection-", extension: ".js", maxGzipBytes: 3 * 1024 },
    { label: "Version3 Vendor", prefix: "vendor-", extension: ".js", maxGzipBytes: 70 * 1024 },
    { label: "Version3 Writing", prefix: "writing-", extension: ".js", maxGzipBytes: 12 * 1024 },
];

const assetNames = fs.readdirSync(distAssetsDir);

const formatKiB = (bytes: number) => `${(bytes / 1024).toFixed(2)} KiB`;

for (const budget of budgets) {
    const assetName = assetNames.find(
        (fileName) => fileName.startsWith(budget.prefix) && fileName.endsWith(budget.extension),
    );

    if (!assetName) {
        throw new Error(`Missing asset for budget check: ${budget.label} (${budget.prefix}*${budget.extension})`);
    }

    const assetPath = path.join(distAssetsDir, assetName);
    const gzipSize = zlib.gzipSync(fs.readFileSync(assetPath)).length;

    if (gzipSize > budget.maxGzipBytes) {
        throw new Error(
            `${budget.label} exceeded budget.\nBudget: ${formatKiB(budget.maxGzipBytes)}\nActual: ${formatKiB(gzipSize)}\nAsset: ${assetName}`,
        );
    }
}

console.log("Version3 bundle budgets passed.");
