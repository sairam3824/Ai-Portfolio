import fs from "node:fs";
import path from "node:path";

type AuditMetadata = {
    vulnerabilities?: {
        info?: number;
        low?: number;
        moderate?: number;
        high?: number;
        critical?: number;
        total?: number;
    };
};

type AuditReport = {
    metadata?: AuditMetadata;
};

const reportPath = path.resolve(process.argv[2] || "audit-report.json");

if (!fs.existsSync(reportPath)) {
    throw new Error(`Audit report not found: ${reportPath}`);
}

const report = JSON.parse(fs.readFileSync(reportPath, "utf8")) as AuditReport;
const vulnerabilities = report.metadata?.vulnerabilities ?? {};

const counts = {
    info: vulnerabilities.info ?? 0,
    low: vulnerabilities.low ?? 0,
    moderate: vulnerabilities.moderate ?? 0,
    high: vulnerabilities.high ?? 0,
    critical: vulnerabilities.critical ?? 0,
    total: vulnerabilities.total ?? 0,
};

console.log("npm audit summary:");
console.log(`- info: ${counts.info}`);
console.log(`- low: ${counts.low}`);
console.log(`- moderate: ${counts.moderate}`);
console.log(`- high: ${counts.high}`);
console.log(`- critical: ${counts.critical}`);
console.log(`- total: ${counts.total}`);

if (counts.high > 0 || counts.critical > 0) {
    throw new Error(`High-severity vulnerabilities detected (high=${counts.high}, critical=${counts.critical}).`);
}

console.log("Audit report passed.");
